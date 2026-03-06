import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Simple hash function
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
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني غير مسجل' },
        { status: 401 }
      );
    }

    if (user.status === 'banned') {
      return NextResponse.json(
        { error: 'تم حظر حسابك. يرجى التواصل مع الدعم' },
        { status: 403 }
      );
    }

    if (user.status === 'suspended') {
      return NextResponse.json(
        { error: 'تم تعليق حسابك مؤقتاً' },
        { status: 403 }
      );
    }

    if (!user.password || user.password !== simpleHash(password)) {
      return NextResponse.json(
        { error: 'كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // Log activity
    await db.activityLog.create({
      data: {
        userId: user.id,
        action: 'login',
        details: JSON.stringify({ email })
      }
    });

    const isVip = user.role === 'vip' && (!user.vipExpiresAt || user.vipExpiresAt > new Date());

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        balance: user.balance,
        referralBalance: user.referralBalance,
        referralCode: user.referralCode,
        isVip
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تسجيل الدخول' },
      { status: 500 }
    );
  }
}
