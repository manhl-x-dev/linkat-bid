'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, User, Link2, Wallet, Database } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogsPage() {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { language } = useAppStore();

  useEffect(() => { if (!authLoading && !firebaseUser) router.push('/login'); }, [authLoading, firebaseUser, router]);
  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const logs = [{ action: 'user_login', user: 'test@test.com', details: 'IP: 192.168.1.1', date: '2024-01-15 10:30' }, { action: 'link_created', user: 'demo@test.com', details: 'Short: abc123', date: '2024-01-15 10:25' }];

  const getIcon = (a: string) => a.includes('user') ? User : a.includes('link') ? Link2 : a.includes('withdraw') ? Wallet : Database;

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b p-4"><Link href="/admin" className="font-bold text-emerald-600">lalinky.com Admin</Link></nav>
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">{language === 'ar' ? 'سجل النشاط' : 'Activity Logs'}</h1>
        <Card><CardContent className="pt-6">
          <div className="space-y-2">
            {logs.map((l, i) => {
              const Icon = getIcon(l.action);
              return <div key={i} className="flex items-center gap-3 p-3 border rounded-lg text-sm"><Icon className="w-4 h-4 text-muted-foreground" /><span className="font-mono text-xs bg-muted px-1 rounded">{l.action}</span><span className="text-muted-foreground">{l.details}</span><span className="ml-auto text-xs text-muted-foreground">{l.date}</span></div>;
            })}
          </div>
        </CardContent></Card>
      </main>
    </div>
  );
}
