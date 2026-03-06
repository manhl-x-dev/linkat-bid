'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { Link2, Pause, Play, Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLinksPage() {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { user, language } = useAppStore();

  useEffect(() => {
    if (!authLoading && !firebaseUser) router.push('/login');
  }, [authLoading, firebaseUser, router]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;
  }

  if (!firebaseUser || user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">{language === 'ar' ? 'وصول مرفوض' : 'Access Denied'}</h2>
            <Button onClick={() => router.push('/')} className="w-full">{language === 'ar' ? 'العودة' : 'Go Back'}</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const links = [
    { id: 1, short: 'abc123', url: 'https://example.com/page', owner: 'user@test.com', clicks: 1234, status: 'active' },
    { id: 2, short: 'xyz789', url: 'https://demo.com/test', owner: 'demo@test.com', clicks: 567, status: 'paused' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar type="admin" />
        <main className="flex-1 mr-0 md:mr-64 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">{language === 'ar' ? 'إدارة الروابط' : 'Manage Links'}</h1>
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b">
                      <th className="text-right p-3">{language === 'ar' ? 'الرابط' : 'Link'}</th>
                      <th className="text-right p-3">{language === 'ar' ? 'الأصلي' : 'Original'}</th>
                      <th className="text-right p-3">{language === 'ar' ? 'المالك' : 'Owner'}</th>
                      <th className="text-right p-3">{language === 'ar' ? 'النقرات' : 'Clicks'}</th>
                      <th className="text-right p-3">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
                    </tr></thead>
                    <tbody>
                      {links.map((link) => (
                        <tr key={link.id} className="border-b">
                          <td className="p-3 font-mono text-emerald-600">lalinky.com/{link.short}</td>
                          <td className="p-3 max-w-xs truncate">{link.url}</td>
                          <td className="p-3">{link.owner}</td>
                          <td className="p-3">{link.clicks.toLocaleString()}</td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">{link.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}</Button>
                              <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4 text-red-500" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
