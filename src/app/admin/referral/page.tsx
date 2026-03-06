'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Users, DollarSign, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminReferralPage() {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { language } = useAppStore();

  useEffect(() => { if (!authLoading && !firebaseUser) router.push('/login'); }, [authLoading, firebaseUser, router]);
  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const stats = [{ label: language === 'ar' ? 'إجمالي الإحالات' : 'Total Referrals', value: '1,234', icon: Users }, { label: language === 'ar' ? 'العمولات المدفوعة' : 'Paid Commissions', value: '$2,345', icon: DollarSign }, { label: language === 'ar' ? 'نسبة العمولة' : 'Commission Rate', value: '20%', icon: TrendingUp }];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b p-4 flex items-center justify-between">
        <Link href="/admin" className="font-bold text-emerald-600">lalinky.com Admin</Link>
        <div className="flex gap-4">{language === 'ar' ? 'لوحة المدير' : 'Admin Panel'}</div>
      </nav>
      <div className="flex">
        <aside className="hidden md:block w-64 border-l min-h-[calc(100vh-57px)] p-4">
          <nav className="space-y-2">
            <Link href="/admin" className="block p-2 rounded hover:bg-muted">{language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}</Link>
            <Link href="/admin/users" className="block p-2 rounded hover:bg-muted">{language === 'ar' ? 'المستخدمين' : 'Users'}</Link>
            <Link href="/admin/links" className="block p-2 rounded hover:bg-muted">{language === 'ar' ? 'الروابط' : 'Links'}</Link>
            <Link href="/admin/referral" className="block p-2 rounded bg-emerald-50 text-emerald-700">{language === 'ar' ? 'نظام الإحالة' : 'Referral'}</Link>
            <Link href="/admin/settings" className="block p-2 rounded hover:bg-muted">{language === 'ar' ? 'الإعدادات' : 'Settings'}</Link>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">{language === 'ar' ? 'نظام الإحالة' : 'Referral System'}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {stats.map((s, i) => (
              <Card key={i}><CardContent className="pt-6">
                <div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div><s.icon className="w-8 h-8 text-emerald-500" /></div>
              </CardContent></Card>
            ))}
          </div>
          <Card><CardContent className="pt-6"><p className="text-muted-foreground">{language === 'ar' ? 'المحيل يحصل على 20% من أرباح المستخدم المحال' : 'Referrer earns 20% of referred user earnings'}</p></CardContent></Card>
        </main>
      </div>
    </div>
  );
}
