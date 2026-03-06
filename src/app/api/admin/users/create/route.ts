import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role = 'user' } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Validate role
    if (!['user', 'vip'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be user or vip' },
        { status: 400 }
      );
    }

    // Check if user already exists in database
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Generate referral code
    const generateReferralCode = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    };

    let referralCode = generateReferralCode();
    
    // Ensure unique referral code
    let codeExists = true;
    while (codeExists) {
      const existingCode = await db.user.findUnique({
        where: { referralCode }
      });
      if (!existingCode) {
        codeExists = false;
      } else {
        referralCode = generateReferralCode();
      }
    }

    // Create user in Firebase Auth (if available)
    let firebaseUid: string | null = null;
    
    if (adminAuth) {
      try {
        const userRecord = await adminAuth.createUser({
          email: email.toLowerCase(),
          password,
          displayName: name,
          emailVerified: false,
        });
        firebaseUid = userRecord.uid;

        // Set custom claims for role
        await adminAuth.setCustomUserClaims(firebaseUid, { role });
      } catch (firebaseError: any) {
        console.error('Firebase user creation failed:', firebaseError.message);
        
        // Check if it's because user already exists in Firebase
        if (firebaseError.code === 'auth/email-already-exists') {
          return NextResponse.json(
            { error: 'User with this email already exists in Firebase' },
            { status: 409 }
          );
        }
        // Continue with database-only creation for other errors
      }
    } else {
      console.log('Firebase Admin not available, creating user in database only');
    }

    // Create user in database
    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        password, // In production, this should be hashed
        firebaseUid,
        role,
        status: 'active',
        balance: 0,
        referralBalance: 0,
        referralCode,
      }
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        referralCode: user.referralCode,
        firebaseUid: user.firebaseUid,
      }
    });

  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create user' },
      { status: 500 }
    );
  }
}
