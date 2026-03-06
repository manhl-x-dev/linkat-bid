'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Palette, Save, Upload } from 'lucide-react';
import Link from 'next/link';

export default function AdminBrandingPage() {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { language } = useAppStore();
  const [saving, setSaving] = useState(false);
  const [branding, setBranding] = useState({ primaryColor: '#10b981', secondaryColor: '#14b8a6' });

  useEffect(() => { if (!authLoading && !firebaseUser) router.push('/login'); }, [authLoading, firebaseUser, router]);
  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const handleSave = async () => { setSaving(true); await new Promise(r => setTimeout(r, 1000)); setSaving(false); };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b p-4"><Link href="/admin" className="font-bold text-emerald-600">lalinky.com Admin</Link></nav>
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">{language === 'ar' ? 'الهوية البصرية' : 'Branding'}</h1>
        <div className="space-y-6">
          <Card><CardHeader><CardTitle>{language === 'ar' ? 'الألوان' : 'Colors'}</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div><Label>{language === 'ar' ? 'الأساسي' : 'Primary'}</Label><div className="flex gap-2 mt-2"><Input type="color" value={branding.primaryColor} onChange={(e) => setBranding({...branding, primaryColor: e.target.value})} className="w-16 h-10 p-1" /><Input value={branding.primaryColor} onChange={(e) => setBranding({...branding, primaryColor: e.target.value})} /></div></div>
              <div><Label>{language === 'ar' ? 'الثانوي' : 'Secondary'}</Label><div className="flex gap-2 mt-2"><Input type="color" value={branding.secondaryColor} onChange={(e) => setBranding({...branding, secondaryColor: e.target.value})} className="w-16 h-10 p-1" /><Input value={branding.secondaryColor} onChange={(e) => setBranding({...branding, secondaryColor: e.target.value})} /></div></div>
            </CardContent>
          </Card>
          <Card><CardHeader><CardTitle>{language === 'ar' ? 'الشعار' : 'Logo'}</CardTitle></CardHeader>
            <CardContent><div className="border-2 border-dashed rounded-lg p-8 text-center"><Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" /><p className="text-sm text-muted-foreground">{language === 'ar' ? 'اسحب أو اضغط للرفع' : 'Drag or click to upload'}</p></div></CardContent>
          </Card>
          <Button onClick={handleSave} disabled={saving} className="w-full bg-emerald-500 hover:bg-emerald-600">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 ml-2" />}{language === 'ar' ? 'حفظ' : 'Save'}</Button>
        </div>
      </main>
    </div>
  );
}
