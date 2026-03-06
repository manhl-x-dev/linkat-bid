'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, Edit } from 'lucide-react';
import Link from 'next/link';

export default function AdminEmailTemplatesPage() {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { language } = useAppStore();

  useEffect(() => { if (!authLoading && !firebaseUser) router.push('/login'); }, [authLoading, firebaseUser, router]);
  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const templates = [{ name: language === 'ar' ? 'ترحيب' : 'Welcome', subject: language === 'ar' ? 'مرحباً بك!' : 'Welcome!' }, { name: language === 'ar' ? 'تأكيد السحب' : 'Withdrawal', subject: language === 'ar' ? 'تم السحب' : 'Withdrawn' }];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b p-4"><Link href="/admin" className="font-bold text-emerald-600">lalinky.com Admin</Link></nav>
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">{language === 'ar' ? 'قوالب الإيميل' : 'Email Templates'}</h1>
        <Card><CardContent className="pt-6">
          <div className="space-y-3">
            {templates.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><Mail className="w-5 h-5 text-blue-600" /></div><div><p className="font-medium">{t.name}</p><p className="text-sm text-muted-foreground">{t.subject}</p></div></div>
                <Button variant="outline" size="sm"><Edit className="w-4 h-4" /></Button>
              </div>
            ))}
          </div>
        </CardContent></Card>
      </main>
    </div>
  );
}
