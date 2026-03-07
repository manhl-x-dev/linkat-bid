'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, Plus, Trash2, Check, Loader2 } from 'lucide-react';

export default function PaymentMethodsPage() {
  const { user, language } = useAppStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newNetwork, setNewNetwork] = useState('TRC20');
  const [wallets, setWallets] = useState(user?.walletAddress ? [{ id: 1, address: user.walletAddress, network: user.walletNetwork || 'TRC20', isDefault: true }] : [
    { id: 1, address: 'TKx...abc123', network: 'TRC20', isDefault: true }
  ]);
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!newAddress) return;
    setSaving(true);
    try {
      const res = await fetch('/api/user/wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user?.id || ''
        },
        body: JSON.stringify({
          walletAddress: newAddress,
          walletNetwork: newNetwork
        })
      });
      if (res.ok) {
        setWallets([{ id: Date.now(), address: newAddress, network: newNetwork, isDefault: true }]);
        setShowAdd(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const oldHandleAdd = async () => {
    if (!newAddress) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setWallets([
      ...wallets, 
      { 
        id: Date.now(), 
        address: newAddress.slice(0, 6) + '...' + newAddress.slice(-6), 
        network: newNetwork, 
        isDefault: false 
      }
    ]);
    setNewAddress('');
    setShowAdd(false);
    setSaving(false);
  };

  const handleSetDefault = (id: number) => {
    setWallets(wallets.map(w => ({ ...w, isDefault: w.id === id })));
  };

  const handleRemove = (id: number) => {
    setWallets(wallets.filter(w => w.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {language === 'ar' ? 'Ø·Ø±Ù Ø§ÙØ¯ÙØ¹' : 'Payment Methods'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar' ? 'Ø¥Ø¯Ø§Ø±Ø© ÙØ­Ø§ÙØ¸ USDT ÙÙØ³Ø­Ø¨' : 'Manage USDT wallets for withdrawals'}
          </p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 ml-2" />
          {language === 'ar' ? 'Ø¥Ø¶Ø§ÙØ© ÙØ­ÙØ¸Ø©' : 'Add Wallet'}
        </Button>
      </div>

      {/* Add Wallet Form */}
      {showAdd && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">{language === 'ar' ? 'Ø¥Ø¶Ø§ÙØ© ÙØ­ÙØ¸Ø© USDT' : 'Add USDT Wallet'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>{language === 'ar' ? 'Ø¹ÙÙØ§Ù Ø§ÙÙØ­ÙØ¸Ø©' : 'Wallet Address'}</Label>
              <Input 
                placeholder="T..." 
                value={newAddress} 
                onChange={(e) => setNewAddress(e.target.value)} 
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>{language === 'ar' ? 'Ø§ÙØ´Ø¨ÙØ©' : 'Network'}</Label>
              <div className="flex gap-2 mt-1.5">
                <Button 
                  variant={newNetwork === 'TRC20' ? 'default' : 'outline'} 
                  onClick={() => setNewNetwork('TRC20')} 
                  className={newNetwork === 'TRC20' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
                >
                  TRC20
                </Button>
                <Button 
                  variant={newNetwork === 'BEP20' ? 'default' : 'outline'} 
                  onClick={() => setNewNetwork('BEP20')}
                  className={newNetwork === 'BEP20' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
                >
                  BEP20
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} disabled={saving || !newAddress} className="bg-emerald-500 hover:bg-emerald-600">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : language === 'ar' ? 'Ø­ÙØ¸' : 'Save'}
              </Button>
              <Button variant="outline" onClick={() => setShowAdd(false)}>
                {language === 'ar' ? 'Ø¥ÙØºØ§Ø¡' : 'Cancel'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wallets List */}
      <div className="space-y-3">
        {wallets.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              <Wallet className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>{language === 'ar' ? 'ÙØ§ ØªÙØ¬Ø¯ ÙØ­Ø§ÙØ¸ ÙØ­ÙÙØ¸Ø©' : 'No saved wallets'}</p>
            </CardContent>
          </Card>
        ) : (
          wallets.map((w) => (
            <Card key={w.id} className={w.isDefault ? 'border-emerald-500 dark:border-emerald-600' : ''}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-mono">{w.address}</p>
                        {w.isDefault && (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 rounded text-xs">
                            {language === 'ar' ? 'Ø§ÙØªØ±Ø§Ø¶ÙØ©' : 'Default'}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{w.network}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!w.isDefault && (
                      <Button variant="outline" size="sm" onClick={() => handleSetDefault(w.id)}>
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleRemove(w.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
