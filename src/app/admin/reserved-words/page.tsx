'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Shield, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminReservedWordsPage() {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { language } = useAppStore();
  const [newWord, setNewWord] = useState('');

  useEffect(() => { if (!authLoading && !firebaseUser) router.push('/login'); }, [authLoading, firebaseUser, router]);
  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const words = ['admin', 'api', 'login', 'register', 'dashboard', 'settings'];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b p-4"><Link href="/admin" className="font-bold text-emerald-600">lalinky.com Admin</Link></nav>
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">{language === 'ar' ? 'الكلمات المحجوزة' : 'Reserved Words'}</h1>
        <Card className="mb-6"><CardHeader><CardTitle>{language === 'ar' ? 'إضافة كلمة' : 'Add Word'}</CardTitle></CardHeader>
          <CardContent><div className="flex gap-2"><Input placeholder={language === 'ar' ? 'الكلمة...' : 'Word...'} value={newWord} onChange={(e) => setNewWord(e.target.value)} /><Button className="bg-emerald-500 hover:bg-emerald-600"><Plus className="w-4 h-4" /></Button></div></CardContent>
        </Card>
        <Card><CardContent className="pt-6">
          <div className="space-y-2">
            {words.map((w) => (
              <div key={w} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-amber-500" /><span className="font-mono">{w}</span></div>
                <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4 text-red-500" /></Button>
              </div>
            ))}
          </div>
        </CardContent></Card>
      </main>
    </div>
  );
}
