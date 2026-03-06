'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, FileText, Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AdminBlogPage() {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { language } = useAppStore();

  useEffect(() => { if (!authLoading && !firebaseUser) router.push('/login'); }, [authLoading, firebaseUser, router]);
  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const posts = [{ slug: 'how-to-earn', title: language === 'ar' ? 'كيف تربح من الروابط' : 'How to Earn from Links', views: 1234, status: 'published' }, { slug: 'referral-guide', title: language === 'ar' ? 'دليل الإحالة' : 'Referral Guide', views: 567, status: 'draft' }];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b p-4"><Link href="/admin" className="font-bold text-emerald-600">lalinky.com Admin</Link></nav>
      <main className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{language === 'ar' ? 'المدونة' : 'Blog'}</h1>
          <Button className="bg-emerald-500 hover:bg-emerald-600"><Plus className="w-4 h-4 ml-2" />{language === 'ar' ? 'مقال جديد' : 'New Post'}</Button>
        </div>
        <Card><CardContent className="pt-6">
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-right p-3">{language === 'ar' ? 'العنوان' : 'Title'}</th><th className="text-right p-3">{language === 'ar' ? 'المشاهدات' : 'Views'}</th><th className="text-right p-3">{language === 'ar' ? 'الحالة' : 'Status'}</th><th className="text-right p-3">{language === 'ar' ? 'إجراءات' : 'Actions'}</th></tr></thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.slug} className="border-b">
                  <td className="p-3 flex items-center gap-2"><FileText className="w-4 h-4 text-muted-foreground" />{p.title}</td>
                  <td className="p-3"><div className="flex items-center gap-1"><Eye className="w-4 h-4 text-muted-foreground" />{p.views}</div></td>
                  <td className="p-3"><span className={`px-2 py-1 rounded text-xs ${p.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>{p.status}</span></td>
                  <td className="p-3"><div className="flex gap-1"><Button variant="outline" size="sm"><Edit className="w-4 h-4" /></Button><Button variant="outline" size="sm"><Trash2 className="w-4 h-4 text-red-500" /></Button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent></Card>
      </main>
    </div>
  );
}
