'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, FileText, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminPagesPage() {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { language } = useAppStore();

  useEffect(() => { if (!authLoading && !firebaseUser) router.push('/login'); }, [authLoading, firebaseUser, router]);
  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const pages = [{ slug: 'privacy', title: language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy' }, { slug: 'terms', title: language === 'ar' ? 'شروط الخدمة' : 'Terms of Service' }, { slug: 'faq', title: language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ' }];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b p-4 flex items-center justify-between"><Link href="/admin" className="font-bold text-emerald-600">lalinky.com Admin</Link></nav>
      <main className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{language === 'ar' ? 'الصفحات' : 'Pages'}</h1>
          <Button className="bg-emerald-500 hover:bg-emerald-600"><Plus className="w-4 h-4 ml-2" />{language === 'ar' ? 'جديد' : 'New'}</Button>
        </div>
        <Card><CardContent className="pt-6">
          <div className="space-y-3">
            {pages.map((p) => (
              <div key={p.slug} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3"><FileText className="w-5 h-5 text-muted-foreground" /><div><p className="font-medium">{p.title}</p><p className="text-sm text-muted-foreground">/{p.slug}</p></div></div>
                <div className="flex gap-2"><Button variant="outline" size="sm"><Edit className="w-4 h-4" /></Button><Button variant="outline" size="sm"><Trash2 className="w-4 h-4 text-red-500" /></Button></div>
              </div>
            ))}
          </div>
        </CardContent></Card>
      </main>
    </div>
  );
}
