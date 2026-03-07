'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { 
  Wallet, 
  AlertCircle,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function WithdrawPage() {
  const { user, language } = useAppStore();
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState(user?.walletAddress || '');
  const [network, setNetwork] = useState(user?.walletNetwork || 'TRC20');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const minWithdrawal = 5;
  const balance = (user?.balance || 0) + (user?.referralBalance || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const numAmount = parseFloat(amount);
    
    if (numAmount < minWithdrawal) {
      setError(language === 'ar' 
        ? `Ø§ÙØ­Ø¯ Ø§ÙØ£Ø¯ÙÙ ÙÙØ³Ø­Ø¨ ÙÙ $${minWithdrawal}` 
        : `Minimum withdrawal is $${minWithdrawal}`);
      return;
    }

    if (numAmount > balance) {
      setError(language === 'ar' ? 'Ø§ÙØ±ØµÙØ¯ ØºÙØ± ÙØ§ÙÙ' : 'Insufficient balance');
      return;
    }

    if (!walletAddress) {
      setError(language === 'ar' ? 'ÙØ±Ø¬Ù Ø¥Ø¯Ø®Ø§Ù Ø¹ÙÙØ§Ù Ø§ÙÙØ­ÙØ¸Ø©' : 'Please enter wallet address');
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch('/api/user/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user?.id || ''
        },
        body: JSON.stringify({
          amount: numAmount,
          walletAddress,
          walletNetwork: network
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Error processing withdrawal');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'ar' ? 'Ø³Ø­Ø¨ Ø§ÙØ£Ø±Ø¨Ø§Ø­' : 'Withdraw Earnings'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' ? 'Ø³Ø­Ø¨ Ø£Ø±Ø¨Ø§Ø­Ù Ø¨Ø§ÙØ¹ÙÙØ§Øª Ø§ÙØ±ÙÙÙØ©' : 'Withdraw your earnings in cryptocurrency'}
        </p>
      </div>

      {success ? (
        <Card className="border-emerald-200 dark:border-emerald-800">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              {language === 'ar' ? 'ØªÙ Ø¥Ø±Ø³Ø§Ù Ø·ÙØ¨ Ø§ÙØ³Ø­Ø¨!' : 'Withdrawal request sent!'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {language === 'ar' 
                ? 'Ø³ÙØªÙ ÙØ¹Ø§ÙØ¬Ø© Ø·ÙØ¨Ù Ø®ÙØ§Ù 24 Ø³Ø§Ø¹Ø©'
                : 'Your request will be processed within 24 hours'}
            </p>
            <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
              <Link href="/dashboard">
                {language === 'ar' ? 'Ø§ÙØ¹ÙØ¯Ø© ÙÙÙØ­Ø© Ø§ÙØªØ­ÙÙ' : 'Back to Dashboard'}
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Balance Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'Ø§ÙØ±ØµÙØ¯ Ø§ÙÙØªØ§Ø­' : 'Available Balance'}
                  </p>
                  <p className="text-3xl font-bold text-emerald-600">
                    ${balance.toFixed(2)}
                  </p>
                </div>
                <Wallet className="w-12 h-12 text-emerald-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === 'ar' ? 'ØªÙØ§ØµÙÙ Ø§ÙØ³Ø­Ø¨' : 'Withdrawal Details'}</CardTitle>
              <CardDescription>
                {language === 'ar' 
                  ? 'Ø§ÙØ­Ø¯ Ø§ÙØ£Ø¯ÙÙ ÙÙØ³Ø­Ø¨: $' + minWithdrawal
                  : 'Minimum withdrawal: $' + minWithdrawal}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="amount">
                    {language === 'ar' ? 'Ø§ÙÙØ¨ÙØº (USD)' : 'Amount (USD)'}
                  </Label>
                  <div className="relative">
                    <span className="absolute right-3 top-3 text-muted-foreground">$</span>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min={minWithdrawal}
                      max={balance}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pr-8"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAmount(minWithdrawal.toString())}
                    >
                      ${minWithdrawal}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAmount((balance * 0.5).toFixed(2))}
                    >
                      50%
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAmount(balance.toFixed(2))}
                    >
                      {language === 'ar' ? 'Ø§ÙÙÙ' : 'All'}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{language === 'ar' ? 'Ø´Ø¨ÙØ© Ø§ÙØ¹ÙÙØ©' : 'Network'}</Label>
                  <RadioGroup value={network} onValueChange={setNetwork} className="flex gap-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="TRC20" id="trc20" />
                      <Label htmlFor="trc20" className="cursor-pointer">TRC20 (Tron)</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="BEP20" id="bep20" />
                      <Label htmlFor="bep20" className="cursor-pointer">BEP20 (BSC)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wallet">
                    {language === 'ar' ? 'Ø¹ÙÙØ§Ù Ø§ÙÙØ­ÙØ¸Ø© USDT' : 'USDT Wallet Address'}
                  </Label>
                  <Input
                    id="wallet"
                    type="text"
                    placeholder={language === 'ar' ? 'Ø£Ø¯Ø®Ù Ø¹ÙÙØ§Ù ÙØ­ÙØ¸ØªÙ' : 'Enter your wallet address'}
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    required
                  />
                </div>

                <Alert>
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription className="text-xs">
                    {language === 'ar' 
                      ? 'ØªØ£ÙØ¯ ÙÙ ØµØ­Ø© Ø¹ÙÙØ§Ù Ø§ÙÙØ­ÙØ¸Ø©. ÙØ§ ÙÙÙÙ Ø§ÙØªØ±Ø§Ø¬Ø¹ Ø¹Ù Ø§ÙÙØ¹Ø§ÙÙØ© Ø¨Ø¹Ø¯ Ø¥Ø±Ø³Ø§ÙÙØ§.'
                      : 'Make sure the wallet address is correct. Transactions cannot be reversed.'}
                  </AlertDescription>
                </Alert>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-pulse">...</span>
                  ) : language === 'ar' ? (
                    'Ø·ÙØ¨ Ø§ÙØ³Ø­Ø¨'
                  ) : (
                    'Request Withdrawal'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
