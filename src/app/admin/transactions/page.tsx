'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { Loader2 } from 'lucide-react';

export default function AdminTransactionsPage() {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { language } = useAppStore();

  useEffect(() => { if (!authLoading && !firebaseUser) router.push('/login'); }, [authLoading, firebaseUser, router]);
  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const transactions = [
    { id: 1, type: 'earning', user: 'user@test.com', amount: 2.34, date: '2024-01-15' },
    { id: 2, type: 'withdrawal', user: 'demo@test.com', amount: -50, date: '2024-01-14' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar type="admin" />
        <main className="flex-1 md:mr-64 p-6">
          <h1 className="text-2xl font-bold mb-6">{language === 'ar' ? 'المعاملات' : 'Transactions'}</h1>
          <Card><CardContent className="pt-6">
            <table className="w-full text-sm">
              <thead><tr className="border-b">
                <th className="text-right p-3">{language === 'ar' ? 'النوع' : 'Type'}</th>
                <th className="text-right p-3">{language === 'ar' ? 'المستخدم' : 'User'}</th>
                <th className="text-right p-3">{language === 'ar' ? 'المبلغ' : 'Amount'}</th>
                <th className="text-right p-3">{language === 'ar' ? 'التاريخ' : 'Date'}</th>
              </tr></thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b">
                    <td className="p-3">{tx.type}</td>
                    <td className="p-3">{tx.user}</td>
                    <td className={`p-3 font-medium ${tx.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>{tx.amount > 0 ? '+' : ''}{tx.amount}$</td>
                    <td className="p-3 text-muted-foreground">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent></Card>
        </main>
      </div>
      <Footer />
    </div>
  );
}
