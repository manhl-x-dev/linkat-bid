import { db } from './db';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { randomBytes, randomUUID } from 'crypto';

// Generate unique referral code
export function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Check if short code is reserved
export async function isReservedWord(code: string): Promise<{ isReserved: boolean; reason?: string }> {
  const reserved = await db.reservedWord.findUnique({
    where: { word: code.toLowerCase() }
  });
  
  if (reserved && reserved.isActive) {
    return { isReserved: true, reason: reserved.reason || 'system' };
  }
  
  return { isReserved: false };
}

// Check if short code conflicts with CMS page
export async function isCmsPage(code: string): Promise<boolean> {
  const page = await db.cmsPage.findUnique({
    where: { slug: code.toLowerCase() }
  });
  
  return !!page;
}

// Get next available symbol for smart processing
export async function getNextAvailableSymbol(baseCode: string): Promise<string | null> {
  const symbols = await db.smartSymbol.findMany({
    where: { isActive: true },
    orderBy: { priority: 'asc' }
  });
  
  for (const symbol of symbols) {
    const testCode = `${baseCode}${symbol.symbol}`;
    const existing = await db.shortLink.findUnique({
      where: { shortCode: testCode }
    });
    
    if (!existing) {
      return symbol.symbol;
    }
  }
  
  // Default symbols if not configured
  const defaultSymbols = ['!', '@', '#', '$', '%', '^', '&', '*'];
  for (const sym of defaultSymbols) {
    const testCode = `${baseCode}${sym}`;
    const existing = await db.shortLink.findUnique({
      where: { shortCode: testCode }
    });
    
    if (!existing) {
      return sym;
    }
  }
  
  return null;
}

// Smart link processing
export async function processShortCode(desiredCode: string): Promise<{
  finalCode: string;
  originalCode: string;
  symbol: string | null;
  isReserved: boolean;
  isCmsConflict: boolean;
}> {
  const code = desiredCode.toLowerCase().trim();
  const originalCode = code;
  
  // Check if reserved word
  const reserved = await isReservedWord(code);
  if (reserved.isReserved) {
    const symbol = await getNextAvailableSymbol(code);
    if (symbol) {
      return {
        finalCode: `${code}${symbol}`,
        originalCode,
        symbol,
        isReserved: true,
        isCmsConflict: false
      };
    }
  }
  
  // Check if CMS page
  const isCms = await isCmsPage(code);
  if (isCms) {
    const symbol = await getNextAvailableSymbol(code);
    if (symbol) {
      return {
        finalCode: `${code}${symbol}`,
        originalCode,
        symbol,
        isReserved: false,
        isCmsConflict: true
      };
    }
  }
  
  // Check if already exists
  const existing = await db.shortLink.findUnique({
    where: { shortCode: code }
  });
  
  if (existing) {
    const symbol = await getNextAvailableSymbol(code);
    if (symbol) {
      return {
        finalCode: `${code}${symbol}`,
        originalCode,
        symbol,
        isReserved: false,
        isCmsConflict: false
      };
    }
  }
  
  return {
    finalCode: code,
    originalCode,
    symbol: null,
    isReserved: false,
    isCmsConflict: false
  };
}

// Auth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          return null;
        }

        // Simple password check (in production, use bcrypt)
        if (user.password !== credentials.password) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString('hex');
    }
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  }
};
