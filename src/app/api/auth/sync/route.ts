import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, displayName, photoURL, uid } = body;

    if (!email || !uid) {
      return NextResponse.json(
        { error: 'Email and UID are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = await db.user.findUnique({
      where: { email },
    });

    if (user) {
      // Update existing user with Firebase UID if not set
      if (!user.firebaseUid) {
        user = await db.user.update({
          where: { id: user.id },
          data: {
            firebaseUid: uid,
            name: displayName || user.name,
            image: photoURL || user.image,
          },
        });
      }
    } else {
      // Create new user
      user = await db.user.create({
        data: {
          email,
          name: displayName || email.split('@')[0],
          image: photoURL,
          firebaseUid: uid,
          role: 'user',
          balance: 0,
          referralBalance: 0,
          totalEarnings: 0,
          referralCode: generateReferralCode(),
        },
      });
    }

    // Return user data with role in lowercase for frontend
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.toLowerCase(),
        balance: user.balance,
        referralBalance: user.referralBalance,
        referralCode: user.referralCode,
        image: user.image,
      }
    });
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json(
      { error: 'Failed to sync user' },
      { status: 500 }
    );
  }
}

function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
