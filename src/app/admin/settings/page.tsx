'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminSettingsPage() {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { user, language } = useAppStore();
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (!authLoading && !firebaseUser) router.push('/login'); }, [authLoading, firebaseUser, router]);
  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const handleSave = async () => { setSaving(true); await new Promise(r => setTimeout(r, 1000)); setSaving(false); };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b p-4 flex items-center justify-between">
        <Link href="/admin" className="font-bold text-emerald-600">lalinky.com Admin</Link>
        <div className="flex gap-4">{language === 'ar' ? 'لوحة المدير' : 'Admin Panel'}</div>
      </nav>
      <div className="flex">
        <aside className="hidden md:block w-64 border-l min-h-[calc(100vh-57px)] p-4">
          <nav className="space-y-2">
            <Link href="/admin" className="block p-2 rounded hover:bg-muted">{language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}</Link>
            <Link href="/admin/users" className="block p-2 rounded hover:bg-muted">{language === 'ar' ? 'المستخدمين' : 'Users'}</Link>
            <Link href="/admin/links" className="block p-2 rounded hover:bg-muted">{language === 'ar' ? 'الروابط' : 'Links'}</Link>
            <Link href="/admin/withdrawals" className="block p-2 rounded hover:bg-muted">{language === 'ar' ? 'السحوبات' : 'Withdrawals'}</Link>
            <Link href="/admin/settings" className="block p-2 rounded bg-emerald-50 text-emerald-700">{language === 'ar' ? 'الإعدادات' : 'Settings'}</Link>
          </nav>
        </aside>
        <main className="flex-1 p-6 max-w-2xl">
          <h1 className="text-2xl font-bold mb-6">{language === 'ar' ? 'الإعدادات العامة' : 'General Settings'}</h1>
          <div className="space-y-6">
            <Card><CardHeader><CardTitle>{language === 'ar' ? 'إعدادات الموقع' : 'Site Settings'}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div><Label>{language === 'ar' ? 'اسم الموقع' : 'Site Name'}</Label><Input defaultValue="lalinky.com" /></div>
                <div><Label>{language === 'ar' ? 'وصف الموقع' : 'Site Description'}</Label><Input defaultValue="URL Shortener" /></div>
              </CardContent>
            </Card>
            <Card><CardHeader><CardTitle>{language === 'ar' ? 'إعدادات الأرباح' : 'Earnings Settings'}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div><Label>{language === 'ar' ? 'عمولة الإحالة (%)' : 'Referral Commission (%)'}</Label><Input type="number" defaultValue="20" /></div>
                <div><Label>{language === 'ar' ? 'الحد الأدنى للسحب ($)' : 'Min Withdrawal ($)'}</Label><Input type="number" defaultValue="10" /></div>
              </CardContent>
            </Card>
            <Button onClick={handleSave} disabled={saving} className="w-full bg-emerald-500 hover:bg-emerald-600">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 ml-2" />}
              {language === 'ar' ? 'حفظ' : 'Save'}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
