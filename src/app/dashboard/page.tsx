'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Check, Link2, Wallet, Users, BarChart3, Copy, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!firebaseUser || !user) {
    return null;
  }

  const quickActions = [
    { 
      title: language === 'ar' ? 'إنشاء رابط' : 'Create Link',
      href: '/dashboard/create',
      icon: Link2,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900'
    },
    { 
      title: language === 'ar' ? 'المحفظة' : 'Wallet',
      href: '/dashboard/wallet',
      icon: Wallet,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100 dark:bg-amber-900'
    },
    { 
      title: language === 'ar' ? 'الإحالة' : 'Referral',
      href: '/dashboard/referral',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900'
    },
    { 
      title: language === 'ar' ? 'الإحصائيات' : 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Welcome Banner */}
      <Card className="mb-6 border-emerald-200 dark:border-emerald-800 bg-gradient-to-l from-emerald-50 to-white dark:from-emerald-950 dark:to-background">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
              <Check className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {language === 'ar' ? 'مرحباً، ' : 'Welcome, '}{user.name}! 👋
              </h2>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Login successful'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">{language === 'ar' ? 'الرصيد' : 'Balance'}</p>
            <p className="text-2xl font-bold text-emerald-600">${user.balance.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">{language === 'ar' ? 'رصيد الإحالة' : 'Referral'}</p>
            <p className="text-2xl font-bold text-amber-600">${user.referralBalance.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">{language === 'ar' ? 'الروابط' : 'Links'}</p>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">{language === 'ar' ? 'النقرات' : 'Clicks'}</p>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">{language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, i) => (
              <Link key={i} href={action.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-4 text-center">
                    <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center mx-auto mb-2`}>
                      <action.icon className={`w-5 h-5 ${action.color}`} />
                    </div>
                    <p className="text-sm font-medium">{action.title}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Referral Code */}
      <Card className="border-amber-200 dark:border-amber-800">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" />
            {language === 'ar' ? 'كود الإحالة الخاص بك' : 'Your Referral Code'}
          </h3>
          <div className="flex items-center gap-2">
            <code className="flex-1 p-3 bg-muted rounded-lg text-center font-mono text-lg">
              lalinky.com/ref/{user.referralCode}
            </code>
            <Button 
              onClick={() => navigator.clipboard.writeText(`lalinky.com/ref/${user.referralCode}`)}
              size="icon"
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {language === 'ar' 
              ? 'شارك هذا الرابط واكسب 20% من أرباح المسجلين' 
              : 'Share this link and earn 20% from referred users'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
