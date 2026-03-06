'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Check, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function DashboardPage() {
  const router = useRouter();
  const { user: firebaseUser, loading } = useAuth();
  const { user, isAuthenticated, language, setUser } = useAppStore();

  // Sync Firebase user with app store
  useEffect(() => {
    if (firebaseUser && !isAuthenticated) {
      setUser({
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
        role: 'user',
        balance: 0,
        referralBalance: 0,
        referralCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
        isVip: false
      });
    }
  }, [firebaseUser, isAuthenticated, setUser]);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !firebaseUser) {
      router.push('/login');
    }
  }, [loading, firebaseUser, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!firebaseUser || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="mb-4 text-muted-foreground">
              {language === 'ar' ? 'يرجى تسجيل الدخول للمتابعة' : 'Please login to continue'}
            </p>
            <a 
              href="/login" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 h-10 px-4 py-2"
            >
              {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950 dark:to-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Banner */}
        <Card className="mb-8 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                <Check className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
                  {language === 'ar' ? 'مرحباً، ' : 'Welcome, '}{user.name}! 👋
                </h2>
                <p className="text-emerald-600 dark:text-emerald-400">
                  {language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Login successful'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Info */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">
              {language === 'ar' ? 'معلومات الحساب' : 'Account Information'}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">{language === 'ar' ? 'الاسم:' : 'Name:'}</span>
                <span className="mr-2 font-medium">{user.name}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{language === 'ar' ? 'البريد:' : 'Email:'}</span>
                <span className="mr-2 font-medium">{user.email}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{language === 'ar' ? 'الرصيد:' : 'Balance:'}</span>
                <span className="mr-2 font-medium text-emerald-600">${user.balance.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{language === 'ar' ? 'رصيد الإحالة:' : 'Referral Balance:'}</span>
                <span className="mr-2 font-medium text-amber-600">${user.referralBalance.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🔗</span>
              </div>
              <p className="text-sm font-medium">
                {language === 'ar' ? 'إنشاء رابط' : 'Create Link'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">💰</span>
              </div>
              <p className="text-sm font-medium">
                {language === 'ar' ? 'المحفظة' : 'Wallet'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">👥</span>
              </div>
              <p className="text-sm font-medium">
                {language === 'ar' ? 'الإحالة' : 'Referral'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">📊</span>
              </div>
              <p className="text-sm font-medium">
                {language === 'ar' ? 'الإحصائيات' : 'Analytics'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Referral Code */}
        <Card className="mt-8 border-amber-200 dark:border-amber-800">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-amber-500">👥</span>
              {language === 'ar' ? 'كود الإحالة الخاص بك' : 'Your Referral Code'}
            </h3>
            <div className="flex items-center gap-2">
              <code className="flex-1 p-3 bg-muted rounded-lg text-center font-mono text-lg">
                linkat.bid/ref/{user.referralCode}
              </code>
              <button 
                onClick={() => navigator.clipboard.writeText(`linkat.bid/ref/${user.referralCode}`)}
                className="p-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                📋
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {language === 'ar' 
                ? 'شارك هذا الرابط واكسب 20% من أرباح المسجلين' 
                : 'Share this link and earn 20% from referred users'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
