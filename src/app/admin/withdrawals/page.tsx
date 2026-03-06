'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminWithdrawalsPage() {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { user, language } = useAppStore();

  useEffect(() => { if (!authLoading && !firebaseUser) router.push('/login'); }, [authLoading, firebaseUser, router]);
  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const withdrawals = [
    { id: 1, user: 'user@test.com', amount: 50, wallet: 'TKx...abc', status: 'pending' },
    { id: 2, user: 'demo@test.com', amount: 25, wallet: '0x...def', status: 'completed' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar type="admin" />
        <main className="flex-1 md:mr-64 p-6">
          <h1 className="text-2xl font-bold mb-6">{language === 'ar' ? 'طلبات السحب' : 'Withdrawal Requests'}</h1>
          <Card><CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b">
                  <th className="text-right p-3">{language === 'ar' ? 'المستخدم' : 'User'}</th>
                  <th className="text-right p-3">{language === 'ar' ? 'المبلغ' : 'Amount'}</th>
                  <th className="text-right p-3">{language === 'ar' ? 'المحفظة' : 'Wallet'}</th>
                  <th className="text-right p-3">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="text-right p-3">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
                </tr></thead>
                <tbody>
                  {withdrawals.map((w) => (
                    <tr key={w.id} className="border-b">
                      <td className="p-3">{w.user}</td>
                      <td className="p-3 font-medium">${w.amount}</td>
                      <td className="p-3 font-mono text-sm">{w.wallet}</td>
                      <td className="p-3"><span className={`px-2 py-1 rounded text-xs ${w.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{w.status}</span></td>
                      <td className="p-3">{w.status === 'pending' && <div className="flex gap-1"><Button size="sm" className="bg-emerald-500"><Check className="w-4 h-4" /></Button><Button size="sm" variant="destructive"><X className="w-4 h-4" /></Button></div>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent></Card>
        </main>
      </div>
      <Footer />
    </div>
  );
}
