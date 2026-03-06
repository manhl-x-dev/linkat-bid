import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateReferralCode } from '@/lib/auth';

// Helper function to create or get Google user
async function createOrGetGoogleUser() {
  // Create a mock Google user directly (for demo purposes)
  const mockEmail = `google_user_${Date.now()}@gmail.com`;
  const mockName = 'Google User';
  
  // Check if user exists
  let user = await db.user.findUnique({
    where: { email: mockEmail }
  });

  if (!user) {
    // Create new user
    const referralCode = generateReferralCode();
    
    user = await db.user.create({
      data: {
        email: mockEmail,
        name: mockName,
        password: null,
        referralCode
      }
    });
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    balance: user.balance,
    referralBalance: user.referralBalance,
    referralCode: user.referralCode,
    isVip: user.role === 'vip'
  };
}

// POST handler - used by client-side fetch
export async function POST(request: NextRequest) {
  try {
    const user = await createOrGetGoogleUser();
    
    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Google OAuth mock error:', error);
    return NextResponse.json(
      { error: 'OAuth failed' },
      { status: 500 }
    );
  }
}

// GET handler - also returns JSON (no redirects to avoid redirect loops)
export async function GET(request: NextRequest) {
  try {
    const user = await createOrGetGoogleUser();
    
    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Google OAuth mock error:', error);
    return NextResponse.json(
      { error: 'OAuth failed' },
      { status: 500 }
    );
  }
}
