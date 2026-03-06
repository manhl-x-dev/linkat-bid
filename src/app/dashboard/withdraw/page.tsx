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
        ? `الحد الأدنى للسحب هو $${minWithdrawal}` 
        : `Minimum withdrawal is $${minWithdrawal}`);
      return;
    }

    if (numAmount > balance) {
      setError(language === 'ar' ? 'الرصيد غير كافٍ' : 'Insufficient balance');
      return;
    }

    if (!walletAddress) {
      setError(language === 'ar' ? 'يرجى إدخال عنوان المحفظة' : 'Please enter wallet address');
      return;
    }

    setLoading(true);
    
    // Simulate withdrawal
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'ar' ? 'سحب الأرباح' : 'Withdraw Earnings'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' ? 'سحب أرباحك بالعملات الرقمية' : 'Withdraw your earnings in cryptocurrency'}
        </p>
      </div>

      {success ? (
        <Card className="border-emerald-200 dark:border-emerald-800">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              {language === 'ar' ? 'تم إرسال طلب السحب!' : 'Withdrawal request sent!'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {language === 'ar' 
                ? 'سيتم معالجة طلبك خلال 24 ساعة'
                : 'Your request will be processed within 24 hours'}
            </p>
            <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
              <Link href="/dashboard">
                {language === 'ar' ? 'العودة للوحة التحكم' : 'Back to Dashboard'}
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
                    {language === 'ar' ? 'الرصيد المتاح' : 'Available Balance'}
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
              <CardTitle>{language === 'ar' ? 'تفاصيل السحب' : 'Withdrawal Details'}</CardTitle>
              <CardDescription>
                {language === 'ar' 
                  ? 'الحد الأدنى للسحب: $' + minWithdrawal
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
                    {language === 'ar' ? 'المبلغ (USD)' : 'Amount (USD)'}
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
                      {language === 'ar' ? 'الكل' : 'All'}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{language === 'ar' ? 'شبكة العملة' : 'Network'}</Label>
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
                    {language === 'ar' ? 'عنوان المحفظة USDT' : 'USDT Wallet Address'}
                  </Label>
                  <Input
                    id="wallet"
                    type="text"
                    placeholder={language === 'ar' ? 'أدخل عنوان محفظتك' : 'Enter your wallet address'}
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    required
                  />
                </div>

                <Alert>
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription className="text-xs">
                    {language === 'ar' 
                      ? 'تأكد من صحة عنوان المحفظة. لا يمكن التراجع عن المعاملة بعد إرسالها.'
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
                    'طلب السحب'
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
