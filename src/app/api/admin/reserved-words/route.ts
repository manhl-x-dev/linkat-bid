import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Default reserved words
const DEFAULT_WORDS = [
  'admin', 'api', 'login', 'register', 'dashboard', 'settings', 
  'wallet', 'withdraw', 'user', 'users', 'links', 'blog',
  'privacy', 'terms', 'faq', 'contact', 'help', 'referral',
  'logout', 'profile', 'account', 'verify', 'reset', 'password',
  'email', 'notifications', 'earnings', 'stats', 'analytics'
];

// GET - Fetch all reserved words
export async function GET() {
  try {
    let words = await db.reservedWord.findMany({
      where: { isActive: true },
      orderBy: { word: 'asc' }
    });
    
    // If no words in database, seed with defaults
    if (words.length === 0) {
      // Insert one by one to handle SQLite limitation
      for (const word of DEFAULT_WORDS) {
        try {
          await db.reservedWord.create({
            data: { word, reason: 'system', isActive: true }
          });
        } catch {
          // Skip if already exists
        }
      }
      
      words = await db.reservedWord.findMany({
        where: { isActive: true },
        orderBy: { word: 'asc' }
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      words: words.map(w => w.word)
    });
  } catch (error) {
    console.error('Error fetching reserved words:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch reserved words' }, { status: 500 });
  }
}

// POST - Add a reserved word
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { word } = body;
    
    if (!word || typeof word !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid word' }, { status: 400 });
    }
    
    const normalizedWord = word.toLowerCase().trim();
    
    if (normalizedWord.length < 1) {
      return NextResponse.json({ success: false, error: 'Word too short' }, { status: 400 });
    }
    
    // Check if word already exists
    const existing = await db.reservedWord.findUnique({
      where: { word: normalizedWord }
    });
    
    if (existing) {
      if (existing.isActive) {
        return NextResponse.json({ success: false, error: 'Word already exists' }, { status: 400 });
      }
      // Reactivate if it was deleted
      await db.reservedWord.update({
        where: { word: normalizedWord },
        data: { isActive: true }
      });
    } else {
      // Create new
      await db.reservedWord.create({
        data: { word: normalizedWord, reason: 'admin', isActive: true }
      });
    }
    
    return NextResponse.json({ success: true, message: 'Word added successfully' });
  } catch (error) {
    console.error('Error adding reserved word:', error);
    return NextResponse.json({ success: false, error: 'Failed to add reserved word' }, { status: 500 });
  }
}

// DELETE - Remove a reserved word
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { word } = body;
    
    if (!word) {
      return NextResponse.json({ success: false, error: 'Word is required' }, { status: 400 });
    }
    
    const normalizedWord = word.toLowerCase().trim();
    
    const existing = await db.reservedWord.findUnique({
      where: { word: normalizedWord }
    });
    
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Word not found' }, { status: 404 });
    }
    
    await db.reservedWord.update({
      where: { word: normalizedWord },
      data: { isActive: false }
    });
    
    return NextResponse.json({ success: true, message: 'Word removed successfully' });
  } catch (error) {
    console.error('Error removing reserved word:', error);
    return NextResponse.json({ success: false, error: 'Failed to remove reserved word' }, { status: 500 });
  }
}
