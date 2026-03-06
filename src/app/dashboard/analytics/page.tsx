'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MousePointer, Users, TrendingUp, BarChart3, Globe, Monitor } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { user, language } = useAppStore();

  useEffect(() => { if (!authLoading && !firebaseUser) router.push('/login'); }, [authLoading, firebaseUser, router]);
  if (authLoading || !firebaseUser) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const stats = [{ label: language === 'ar' ? 'النقرات' : 'Clicks', value: '12,345', icon: MousePointer }, { label: language === 'ar' ? 'فريدة' : 'Unique', value: '8,901', icon: Users }, { label: language === 'ar' ? 'الأرباح' : 'Earnings', value: '$45.67', icon: TrendingUp }];
  const topLinks = [{ short: 'abc123', clicks: 1234, earnings: '$12.34' }, { short: 'xyz789', clicks: 987, earnings: '$9.87' }];
  const countries = [{ name: language === 'ar' ? 'السعودية' : 'Saudi', percent: 36 }, { name: language === 'ar' ? 'مصر' : 'Egypt', percent: 19 }, { name: language === 'ar' ? 'الإمارات' : 'UAE', percent: 15 }];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b p-4"><Link href="/dashboard" className="font-bold text-emerald-600">lalinky.com</Link></nav>
      <div className="flex">
        <aside className="hidden md:block w-64 border-l min-h-[calc(100vh-57px)] p-4"><nav className="space-y-2">
          <Link href="/dashboard" className="block p-2 rounded hover:bg-muted">{language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}</Link>
          <Link href="/dashboard/create" className="block p-2 rounded hover:bg-muted">{language === 'ar' ? 'إنشاء رابط' : 'Create Link'}</Link>
          <Link href="/dashboard/analytics" className="block p-2 rounded bg-emerald-50 text-emerald-700">{language === 'ar' ? 'الإحصائيات' : 'Analytics'}</Link>
          <Link href="/dashboard/wallet" className="block p-2 rounded hover:bg-muted">{language === 'ar' ? 'المحفظة' : 'Wallet'}</Link>
        </nav></aside>
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">{language === 'ar' ? 'الإحصائيات' : 'Analytics'}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {stats.map((s, i) => (
              <Card key={i}><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div><s.icon className="w-8 h-8 text-emerald-500" /></div></CardContent></Card>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card><CardHeader><CardTitle>{language === 'ar' ? 'أفضل الروابط' : 'Top Links'}</CardTitle></CardHeader>
              <CardContent><div className="space-y-3">{topLinks.map((l, i) => <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg"><span className="font-mono text-sm">lalinky.com/{l.short}</span><span className="font-medium text-emerald-600">{l.earnings}</span></div>)}</div></CardContent>
            </Card>
            <Card><CardHeader><CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5" />{language === 'ar' ? 'التوزيع الجغرافي' : 'Geographic'}</CardTitle></CardHeader>
              <CardContent><div className="space-y-3">{countries.map((c, i) => <div key={i}><div className="flex justify-between text-sm mb-1"><span>{c.name}</span><span>{c.percent}%</span></div><div className="w-full bg-muted rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${c.percent}%` }} /></div></div>)}</div></CardContent>
            </Card>
          </div>
          <Card className="mt-6"><CardContent className="pt-6"><div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-muted rounded-lg"><p className="text-2xl font-bold">65%</p><p className="text-sm text-muted-foreground">{language === 'ar' ? 'موبايل' : 'Mobile'}</p></div>
            <div className="p-4 bg-muted rounded-lg"><p className="text-2xl font-bold">30%</p><p className="text-sm text-muted-foreground">{language === 'ar' ? 'كمبيوتر' : 'Desktop'}</p></div>
            <div className="p-4 bg-muted rounded-lg"><p className="text-2xl font-bold">5%</p><p className="text-sm text-muted-foreground">{language === 'ar' ? 'تابلت' : 'Tablet'}</p></div>
          </div></CardContent></Card>
        </main>
      </div>
    </div>
  );
}
