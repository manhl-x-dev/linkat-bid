import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        { error: 'الكود مطلوب' },
        { status: 400 }
      );
    }

    // Find the short link
    const link = await db.shortLink.findUnique({
      where: { shortCode: code }
    });

    if (!link) {
      return NextResponse.json(
        { error: 'الرابط غير موجود' },
        { status: 404 }
      );
    }

    if (link.status !== 'active') {
      return NextResponse.json(
        { error: 'الرابط غير متاح' },
        { status: 410 }
      );
    }

    // Check expiration
    if (link.expiresAt && link.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'الرابط منتهي الصلاحية' },
        { status: 410 }
      );
    }

    // Record analytics
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';
    
    // Simple device detection
    let device = 'desktop';
    if (/mobile/i.test(userAgent)) device = 'mobile';
    else if (/tablet/i.test(userAgent)) device = 'tablet';

    // Simple browser detection
    let browser = 'other';
    if (/firefox/i.test(userAgent)) browser = 'firefox';
    else if (/chrome/i.test(userAgent)) browser = 'chrome';
    else if (/safari/i.test(userAgent)) browser = 'safari';
    else if (/edge/i.test(userAgent)) browser = 'edge';

    // Simple OS detection
    let os = 'other';
    if (/windows/i.test(userAgent)) os = 'windows';
    else if (/mac/i.test(userAgent)) os = 'macos';
    else if (/linux/i.test(userAgent)) os = 'linux';
    else if (/android/i.test(userAgent)) os = 'android';
    else if (/ios|iphone|ipad/i.test(userAgent)) os = 'ios';

    await db.linkAnalytics.create({
      data: {
        linkId: link.id,
        ipAddress: ip,
        userAgent,
        device,
        browser,
        os,
        referer: request.headers.get('referer') || ''
      }
    });

    // Update link stats
    await db.shortLink.update({
      where: { id: link.id },
      data: {
        clicks: { increment: 1 }
      }
    });

    // Update user stats
    await db.user.update({
      where: { id: link.userId },
      data: {
        totalClicks: { increment: 1 }
      }
    });

    // Add earnings (mock calculation - $0.001 per click for standard, $0.0014 for VIP)
    const user = await db.user.findUnique({
      where: { id: link.userId }
    });
    
    if (user) {
      const isVip = user.role === 'vip';
      const earning = isVip ? 0.0014 : 0.001;
      
      await db.shortLink.update({
        where: { id: link.id },
        data: { earnings: { increment: earning } }
      });
      
      await db.user.update({
        where: { id: link.userId },
        data: {
          balance: { increment: earning },
          totalEarnings: { increment: earning }
        }
      });
      
      // Create transaction
      await db.transaction.create({
        data: {
          userId: link.userId,
          type: 'earning',
          amount: earning,
          balance: user.balance + earning,
          description: `أرباح من الرابط ${link.shortCode}`,
          referenceId: link.id
        }
      });
      
      // If referred, give commission to referrer
      if (user.referredBy) {
        const commission = earning * 0.2; // 20% commission
        await db.user.update({
          where: { id: user.referredBy },
          data: {
            referralBalance: { increment: commission }
          }
        });
        
        await db.transaction.create({
          data: {
            userId: user.referredBy,
            type: 'referral',
            amount: commission,
            balance: (await db.user.findUnique({ where: { id: user.referredBy } }))!.referralBalance + commission,
            description: `عمولة إحالة من ${user.email}`,
            referenceId: user.id
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      targetUrl: link.targetUrl,
      showAds: link.showAds,
      adSkipTime: link.adSkipTime
    });
  } catch (error) {
    console.error('Resolve link error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ' },
      { status: 500 }
    );
  }
}
