'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Gift, ArrowUpRight } from 'lucide-react';

export default function HistoryPage() {
  const { language } = useAppStore();
  const [filter, setFilter] = useState('all');

  const transactions = [
    { id: 1, type: 'earning', amount: 2.34, date: '2024-01-15', desc: language === 'ar' ? 'أرباح من رابط abc123' : 'Earnings from link abc123' },
    { id: 2, type: 'referral', amount: 5.00, date: '2024-01-14', desc: language === 'ar' ? 'عمولة إحالة من user@test.com' : 'Referral commission from user@test.com' },
    { id: 3, type: 'withdrawal', amount: -50.00, date: '2024-01-13', desc: language === 'ar' ? 'سحب إلى USDT TRC20' : 'Withdrawal to USDT TRC20' },
    { id: 4, type: 'earning', amount: 1.25, date: '2024-01-12', desc: language === 'ar' ? 'أرباح من رابط xyz789' : 'Earnings from link xyz789' },
    { id: 5, type: 'referral', amount: 3.50, date: '2024-01-11', desc: language === 'ar' ? 'عمولة إحالة من demo@test.com' : 'Referral commission from demo@test.com' },
  ];

  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.type === filter);

  const getTypeIcon = (t: string) => {
    switch (t) {
      case 'earning': return <DollarSign className="w-4 h-4 text-emerald-500" />;
      case 'referral': return <Gift className="w-4 h-4 text-amber-500" />;
      case 'withdrawal': return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getTypeLabel = (t: string) => {
    const labels: Record<string, string> = {
      earning: language === 'ar' ? 'أرباح' : 'Earning',
      referral: language === 'ar' ? 'إحالة' : 'Referral',
      withdrawal: language === 'ar' ? 'سحب' : 'Withdrawal',
    };
    return labels[t] || t;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'ar' ? 'سجل المعاملات' : 'Transaction History'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' ? 'عرض جميع معاملاتك المالية' : 'View all your financial transactions'}
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'} 
          onClick={() => setFilter('all')} 
          className={filter === 'all' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
        >
          {language === 'ar' ? 'الكل' : 'All'}
        </Button>
        <Button 
          variant={filter === 'earning' ? 'default' : 'outline'} 
          onClick={() => setFilter('earning')}
        >
          {language === 'ar' ? 'أرباح' : 'Earnings'}
        </Button>
        <Button 
          variant={filter === 'referral' ? 'default' : 'outline'} 
          onClick={() => setFilter('referral')}
        >
          {language === 'ar' ? 'إحالات' : 'Referrals'}
        </Button>
        <Button 
          variant={filter === 'withdrawal' ? 'default' : 'outline'} 
          onClick={() => setFilter('withdrawal')}
        >
          {language === 'ar' ? 'سحوبات' : 'Withdrawals'}
        </Button>
      </div>

      {/* Transactions List */}
      <Card>
        <CardContent className="pt-6">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {language === 'ar' ? 'لا توجد معاملات' : 'No transactions found'}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      {getTypeIcon(tx.type)}
                    </div>
                    <div>
                      <p className="font-medium">{tx.desc}</p>
                      <p className="text-sm text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className={`font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} $
                    </span>
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
