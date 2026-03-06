'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, History, DollarSign, Gift, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { language } = useAppStore();
  const [filter, setFilter] = useState('all');

  useEffect(() => { if (!authLoading && !firebaseUser) router.push('/login'); }, [authLoading, firebaseUser, router]);
  if (authLoading || !firebaseUser) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const transactions = [
    { id: 1, type: 'earning', amount: 2.34, date: '2024-01-15', desc: language === 'ar' ? 'أرباح من رابط' : 'Earnings from link' },
    { id: 2, type: 'referral', amount: 5.00, date: '2024-01-14', desc: language === 'ar' ? 'عمولة إحالة' : 'Referral commission' },
    { id: 3, type: 'withdrawal', amount: -50.00, date: '2024-01-13', desc: language === 'ar' ? 'سحب إلى USDT' : 'Withdrawal to USDT' },
  ];

  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.type === filter);
  const getTypeIcon = (t: string) => t === 'earning' ? <DollarSign className="w-4 h-4 text-emerald-500" /> : t === 'referral' ? <Gift className="w-4 h-4 text-blue-500" /> : <ArrowUpRight className="w-4 h-4 text-red-500" />;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b p-4"><Link href="/dashboard" className="font-bold text-emerald-600">lalinky.com</Link></nav>
      <div className="flex">
        <aside className="hidden md:block w-64 border-l min-h-[calc(100vh-57px)] p-4"><nav className="space-y-2">
          <Link href="/dashboard" className="block p-2 rounded hover:bg-muted">{language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}</Link>
          <Link href="/dashboard/history" className="block p-2 rounded bg-emerald-50 text-emerald-700">{language === 'ar' ? 'السجل' : 'History'}</Link>
          <Link href="/dashboard/wallet" className="block p-2 rounded hover:bg-muted">{language === 'ar' ? 'المحفظة' : 'Wallet'}</Link>
        </nav></aside>
        <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6">{language === 'ar' ? 'سجل المعاملات' : 'Transaction History'}</h1>
          <div className="flex gap-2 mb-6 flex-wrap">
            <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')} className={filter === 'all' ? 'bg-emerald-500' : ''}>{language === 'ar' ? 'الكل' : 'All'}</Button>
            <Button variant={filter === 'earning' ? 'default' : 'outline'} onClick={() => setFilter('earning')}>{language === 'ar' ? 'أرباح' : 'Earnings'}</Button>
            <Button variant={filter === 'referral' ? 'default' : 'outline'} onClick={() => setFilter('referral')}>{language === 'ar' ? 'إحالات' : 'Referrals'}</Button>
            <Button variant={filter === 'withdrawal' ? 'default' : 'outline'} onClick={() => setFilter('withdrawal')}>{language === 'ar' ? 'سحوبات' : 'Withdrawals'}</Button>
          </div>
          <Card><CardContent className="pt-6">
            <div className="space-y-3">
              {filtered.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">{getTypeIcon(tx.type)}</div><div><p className="font-medium">{tx.desc}</p><p className="text-sm text-muted-foreground">{tx.date}</p></div></div>
                  <span className={`font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>{tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} $</span>
                </div>
              ))}
            </div>
          </CardContent></Card>
        </main>
      </div>
    </div>
  );
}
