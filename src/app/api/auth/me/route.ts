import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get user ID from header (set by client)
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ user: null });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        balance: true,
        referralBalance: true,
        referralCode: true,
        walletAddress: true,
        walletNetwork: true,
        status: true,
        vipExpiresAt: true,
        totalLinks: true,
        totalClicks: true,
        totalEarnings: true,
        createdAt: true
      }
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    const isVip = user.role === 'vip' && (!user.vipExpiresAt || user.vipExpiresAt > new Date());

    return NextResponse.json({
      user: {
        ...user,
        isVip
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ user: null });
  }
}
