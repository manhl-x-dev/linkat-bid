'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { AlertTriangle, Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminReportsPage() {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { language } = useAppStore();

  useEffect(() => { if (!authLoading && !firebaseUser) router.push('/login'); }, [authLoading, firebaseUser, router]);
  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const reports = [
    { id: 1, link: 'abc123', reporter: 'user@test.com', reason: 'Spam', status: 'pending' },
    { id: 2, link: 'xyz789', reporter: 'demo@test.com', reason: 'Malware', status: 'resolved' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar type="admin" />
        <main className="flex-1 md:mr-64 p-6">
          <h1 className="text-2xl font-bold mb-6">{language === 'ar' ? 'البلاغات' : 'Reports'}</h1>
          <div className="space-y-4">
            {reports.map((r) => (
              <Card key={r.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`w-5 h-5 ${r.status === 'pending' ? 'text-amber-500' : 'text-emerald-500'}`} />
                      <div>
                        <p className="font-medium">lalinky.com/{r.link}</p>
                        <p className="text-sm text-muted-foreground">{language === 'ar' ? 'السبب:' : 'Reason:'} {r.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${r.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{r.status}</span>
                      {r.status === 'pending' && <div className="flex gap-1"><Button size="sm" variant="outline"><Check className="w-4 h-4 text-emerald-500" /></Button><Button size="sm" variant="outline"><X className="w-4 h-4 text-red-500" /></Button></div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
