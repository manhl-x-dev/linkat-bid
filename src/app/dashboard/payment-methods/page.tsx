'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Wallet, Plus, Trash2, Check } from 'lucide-react';
import Link from 'next/link';

export default function PaymentMethodsPage() {
  const router = useRouter();
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const { language } = useAppStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newNetwork, setNewNetwork] = useState('TRC20');
  const [wallets, setWallets] = useState([{ id: 1, address: 'TKx...abc123', network: 'TRC20', isDefault: true }]);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (!authLoading && !firebaseUser) router.push('/login'); }, [authLoading, firebaseUser, router]);
  if (authLoading || !firebaseUser) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const handleAdd = async () => { if (!newAddress) return; setSaving(true); await new Promise(r => setTimeout(r, 1000)); setWallets([...wallets, { id: Date.now(), address: newAddress.slice(0, 6) + '...' + newAddress.slice(-6), network: newNetwork, isDefault: false }]); setNewAddress(''); setShowAdd(false); setSaving(false); };
  const handleSetDefault = (id: number) => setWallets(wallets.map(w => ({ ...w, isDefault: w.id === id })));

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b p-4"><Link href="/dashboard" className="font-bold text-emerald-600">lalinky.com</Link></nav>
      <main className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{language === 'ar' ? 'طرق الدفع' : 'Payment Methods'}</h1>
          <Button onClick={() => setShowAdd(!showAdd)} className="bg-emerald-500 hover:bg-emerald-600"><Plus className="w-4 h-4 ml-2" />{language === 'ar' ? 'إضافة محفظة' : 'Add Wallet'}</Button>
        </div>
        {showAdd && (
          <Card className="mb-6"><CardHeader><CardTitle>{language === 'ar' ? 'إضافة محفظة USDT' : 'Add USDT Wallet'}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>{language === 'ar' ? 'عنوان المحفظة' : 'Wallet Address'}</Label><Input placeholder="T..." value={newAddress} onChange={(e) => setNewAddress(e.target.value)} /></div>
              <div><Label>{language === 'ar' ? 'الشبكة' : 'Network'}</Label><div className="flex gap-2 mt-2">
                <Button variant={newNetwork === 'TRC20' ? 'default' : 'outline'} onClick={() => setNewNetwork('TRC20')} className={newNetwork === 'TRC20' ? 'bg-emerald-500' : ''}>TRC20</Button>
                <Button variant={newNetwork === 'BEP20' ? 'default' : 'outline'} onClick={() => setNewNetwork('BEP20')} className={newNetwork === 'BEP20' ? 'bg-emerald-500' : ''}>BEP20</Button>
              </div></div>
              <div className="flex gap-2"><Button onClick={handleAdd} disabled={saving}>{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : language === 'ar' ? 'حفظ' : 'Save'}</Button><Button variant="outline" onClick={() => setShowAdd(false)}>{language === 'ar' ? 'إلغاء' : 'Cancel'}</Button></div>
            </CardContent>
          </Card>
        )}
        <div className="space-y-3">
          {wallets.map((w) => (
            <Card key={w.id} className={w.isDefault ? 'border-emerald-500' : ''}><CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><Wallet className="w-6 h-6" /></div><div><p className="font-mono">{w.address}</p><p className="text-sm text-muted-foreground">{w.network}</p></div>{w.isDefault && <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">{language === 'ar' ? 'افتراضية' : 'Default'}</span>}</div>
                <div className="flex gap-2">{!w.isDefault && <Button variant="outline" size="sm" onClick={() => handleSetDefault(w.id)}><Check className="w-4 h-4" /></Button>}<Button variant="outline" size="sm"><Trash2 className="w-4 h-4 text-red-500" /></Button></div>
              </div>
            </CardContent></Card>
          ))}
        </div>
      </main>
    </div>
  );
}
