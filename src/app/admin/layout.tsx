'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { user, language, sidebarCollapsed } = useAppStore();

  useEffect(() => {
    if (!authLoading && !firebaseUser) {
      router.push('/login');
    }
  }, [authLoading, firebaseUser, router]);

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  // Not logged in
  if (!firebaseUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  // Not admin
  const OWNER_EMAIL = 'manhl.aboufakher@gmail.com';
  const isAdmin = user?.role?.toLowerCase() === 'admin' || user?.email?.toLowerCase() === OWNER_EMAIL.toLowerCase();
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">
              {language === 'ar' ? 'ÙØµÙÙ ÙØ±ÙÙØ¶' : 'Access Denied'}
            </h2>
            <p className="mb-4 text-muted-foreground">
              {language === 'ar' 
                ? 'ÙÙØ³ ÙØ¯ÙÙ ØµÙØ§Ø­ÙØ© ÙÙÙØµÙÙ Ø¥ÙÙ ÙØ°Ù Ø§ÙØµÙØ­Ø©' 
                : 'You do not have permission to access this page'}
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              {language === 'ar' ? 'Ø¯ÙØ±Ù Ø§ÙØ­Ø§ÙÙ:' : 'Your current role:'} {user?.role || 'ØºÙØ± ÙØ­Ø¯Ø¯'}
            </p>
            <Button onClick={() => router.push('/')} className="w-full">
              {language === 'ar' ? 'Ø§ÙØ¹ÙØ¯Ø© ÙÙØ±Ø¦ÙØ³ÙØ©' : 'Go Home'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar type="admin" />
        
        <main 
          className={cn(
            "flex-1 p-6 transition-all duration-300",
            sidebarCollapsed ? "mr-16" : "mr-64"
          )}
        >
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
