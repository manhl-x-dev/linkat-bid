import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateReferralCode } from '@/lib/auth';

// Simple hash function (in production, use bcrypt)
function simpleHash(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, referralCode } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني مستخدم بالفعل' },
        { status: 400 }
      );
    }

    // Generate referral code
    const userReferralCode = generateReferralCode();

    // Find referrer if provided
    let referredBy = null;
    if (referralCode) {
      const referrer = await db.user.findUnique({
        where: { referralCode: referralCode.toUpperCase() }
      });
      if (referrer) {
        referredBy = referrer.id;
      }
    }

    // Create user
    const user = await db.user.create({
      data: {
        email,
        name: name || email.split('@')[0],
        password: simpleHash(password),
        referralCode: userReferralCode,
        referredBy
      }
    });

    // Log activity
    await db.activityLog.create({
      data: {
        userId: user.id,
        action: 'register',
        details: JSON.stringify({ email, referralCode })
      }
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        referralCode: user.referralCode,
        role: user.role,
        balance: user.balance,
        referralBalance: user.referralBalance
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء التسجيل' },
      { status: 500 }
    );
  }
}
