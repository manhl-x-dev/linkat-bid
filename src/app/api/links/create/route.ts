import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { processShortCode } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, targetUrl, customCode, title, description } = body;

    if (!userId || !targetUrl) {
      return NextResponse.json(
        { error: 'الرابط المستهدف مطلوب' },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(targetUrl);
    } catch {
      return NextResponse.json(
        { error: 'الرابط غير صالح' },
        { status: 400 }
      );
    }

    // Check user
    const user = await db.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' },
        { status: 401 }
      );
    }

    let shortCode: string;
    let originalCode: string;
    let symbol: string | null = null;
    let isReserved = false;
    let isCmsConflict = false;

    if (customCode) {
      // Process custom code with smart handling
      const processed = await processShortCode(customCode);
      shortCode = processed.finalCode;
      originalCode = processed.originalCode;
      symbol = processed.symbol;
      isReserved = processed.isReserved;
      isCmsConflict = processed.isCmsConflict;
    } else {
      // Generate random code
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      shortCode = code;
      originalCode = code;
    }

    // Create the short link
    const link = await db.shortLink.create({
      data: {
        shortCode,
        originalCode,
        symbol,
        targetUrl,
        title,
        description,
        userId,
        isReserved,
        isCmsConflict
      }
    });

    // Update user stats
    await db.user.update({
      where: { id: userId },
      data: { totalLinks: { increment: 1 } }
    });

    // Log activity
    await db.activityLog.create({
      data: {
        userId,
        action: 'create_link',
        details: JSON.stringify({ shortCode, targetUrl })
      }
    });

    return NextResponse.json({
      success: true,
      link: {
        id: link.id,
        shortCode: link.shortCode,
        originalCode: link.originalCode,
        symbol: link.symbol,
        targetUrl: link.targetUrl,
        displayCode: symbol ? originalCode : shortCode, // Hide symbol for reserved words
        wasProcessed: !!(symbol)
      }
    });
  } catch (error) {
    console.error('Create link error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء الرابط' },
      { status: 500 }
    );
  }
}
