import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userIds } = body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: 'No user IDs provided' },
        { status: 400 }
      );
    }

    const results = {
      success: [] as string[],
      failed: [] as { id: string; error: string }[],
    };

    for (const userId of userIds) {
      try {
        // Get user from database
        const user = await db.user.findUnique({
          where: { id: userId }
        });

        if (!user) {
          results.failed.push({ id: userId, error: 'User not found in database' });
          continue;
        }

        // Delete from Firebase Auth if available and user has firebaseUid
        if (adminAuth && user.firebaseUid) {
          try {
            await adminAuth.deleteUser(user.firebaseUid);
          } catch (firebaseError: any) {
            console.error(`Failed to delete Firebase user ${user.firebaseUid}:`, firebaseError.message);
            // Continue with database deletion even if Firebase fails
          }
        }

        // Delete from database
        await db.user.delete({
          where: { id: userId }
        });

        results.success.push(userId);
      } catch (error: any) {
        results.failed.push({ id: userId, error: error.message });
      }
    }

    return NextResponse.json({
      success: true,
      deleted: results.success.length,
      failed: results.failed.length,
      details: results,
    });

  } catch (error: any) {
    console.error('Error deleting users:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete users' },
      { status: 500 }
    );
  }
}
