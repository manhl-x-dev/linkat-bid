'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { 
  Wallet, 
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Transaction {
  id: string;
  type: 'earning' | 'referral' | 'withdrawal' | 'bonus';
  amount: number;
  balance: number;
  description: string;
  createdAt: string;
}

// Initial transactions data
const initialTransactions: Transaction[] = [
  { id: '1', type: 'earning', amount: 0.05, balance: 1.25, description: 'Ø£Ø±Ø¨Ø§Ø­ ÙÙ link abc123', createdAt: new Date().toISOString() },
  { id: '2', type: 'referral', amount: 0.02, balance: 1.20, description: 'Ø¹ÙÙÙØ© Ø¥Ø­Ø§ÙØ©', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', type: 'withdrawal', amount: -5.00, balance: 1.18, description: 'Ø³Ø­Ø¨ Ø¥ÙÙ USDT TRC20', createdAt: new Date(Date.now() - 172800000).toISOString() },
  { id: '4', type: 'earning', amount: 0.08, balance: 6.18, description: 'Ø£Ø±Ø¨Ø§Ø­ ÙÙ link xyz789', createdAt: new Date(Date.now() - 259200000).toISOString() },
];

export default function WalletPage() {
  const { user, language } = useAppStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch('/api/user/wallet', {
          headers: { 'x-user-id': user.id }
        });
        const data = await res.json();
        if (data.success) setTransactions(data.transactions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, [user?.id]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'earning': return <ArrowDownLeft className="w-4 h-4 text-emerald-500" />;
      case 'referral': return <Gift className="w-4 h-4 text-amber-500" />;
      case 'withdrawal': return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      case 'bonus': return <Gift className="w-4 h-4 text-purple-500" />;
      default: return null;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, { ar: string; en: string }> = {
      earning: { ar: 'Ø£Ø±Ø¨Ø§Ø­', en: 'Earning' },
      referral: { ar: 'Ø¥Ø­Ø§ÙØ©', en: 'Referral' },
      withdrawal: { ar: 'Ø³Ø­Ø¨', en: 'Withdrawal' },
      bonus: { ar: 'ÙÙØ§ÙØ£Ø©', en: 'Bonus' },
    };
    return labels[type]?.[language === 'ar' ? 'ar' : 'en'] || type;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'ar' ? 'Ø§ÙÙØ­ÙØ¸Ø© Ø§ÙØ±ÙÙÙØ©' : 'Digital Wallet'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' ? 'Ø¥Ø¯Ø§Ø±Ø© Ø£Ø±Ø¨Ø§Ø­Ù ÙØ±ØµÙØ¯Ù' : 'Manage your earnings and balance'}
        </p>
      </div>

      {/* Balance Cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Card className="border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-card">
          <CardHeader>
            <CardDescription>{language === 'ar' ? 'Ø±ØµÙØ¯ Ø§ÙØ£Ø±Ø¨Ø§Ø­' : 'Earnings Balance'}</CardDescription>
            <CardTitle className="text-3xl text-emerald-600">
              ${user?.balance.toFixed(2) || '0.00'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-emerald-500 hover:bg-emerald-600">
              <Link href="/dashboard/withdraw">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'Ø³Ø­Ø¨ Ø§ÙØ£Ø±Ø¨Ø§Ø­' : 'Withdraw'}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-white dark:from-amber-950 dark:to-card">
          <CardHeader>
            <CardDescription>{language === 'ar' ? 'Ø±ØµÙØ¯ Ø§ÙØ¥Ø­Ø§ÙØ©' : 'Referral Balance'}</CardDescription>
            <CardTitle className="text-3xl text-amber-600">
              ${user?.referralBalance.toFixed(2) || '0.00'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Gift className="w-4 h-4" />
              <span>
                {language === 'ar' ? '20% ÙÙ Ø£Ø±Ø¨Ø§Ø­ Ø§ÙÙØ³Ø¬ÙÙÙ Ø¨Ø±Ø§Ø¨Ø·Ù' : '20% from referred users'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">{language === 'ar' ? 'Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª Ø³Ø±ÙØ¹Ø©' : 'Quick Actions'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/dashboard/withdraw">
                <ArrowUpRight className="w-5 h-5" />
                <span className="text-xs">{language === 'ar' ? 'Ø³Ø­Ø¨' : 'Withdraw'}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/dashboard/referral">
                <Gift className="w-5 h-5" />
                <span className="text-xs">{language === 'ar' ? 'Ø§ÙØ¥Ø­Ø§ÙØ©' : 'Referral'}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/dashboard/history">
                <Clock className="w-5 h-5" />
                <span className="text-xs">{language === 'ar' ? 'Ø§ÙØ³Ø¬Ù' : 'History'}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
              <Link href="/dashboard/payment-methods">
                <Wallet className="w-5 h-5" />
                <span className="text-xs">{language === 'ar' ? 'Ø·Ø±Ù Ø§ÙØ¯ÙØ¹' : 'Payments'}</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ar' ? 'Ø¢Ø®Ø± Ø§ÙÙØ¹Ø§ÙÙØ§Øª' : 'Recent Transactions'}</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {language === 'ar' ? 'ÙØ§ ØªÙØ¬Ø¯ ÙØ¹Ø§ÙÙØ§Øª Ø¨Ø¹Ø¯' : 'No transactions yet'}
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      {getTypeIcon(tx.type)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{tx.description}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {getTypeLabel(tx.type)}
                        </Badge>
                        <span>{new Date(tx.createdAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className={`font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ${tx.balance.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
