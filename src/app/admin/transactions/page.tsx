'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AdminTransactionsPage() {
  const { language } = useAppStore();

  const transactions = [
    { id: 1, type: 'earning', user: 'user@test.com', amount: 2.34, link: 'abc123', date: '2024-01-15 14:30' },
    { id: 2, type: 'withdrawal', user: 'demo@test.com', amount: -50, link: '-', date: '2024-01-14 10:15' },
    { id: 3, type: 'earning', user: 'promo@test.com', amount: 5.67, link: 'xyz789', date: '2024-01-14 09:45' },
    { id: 4, type: 'referral', user: 'vip@test.com', amount: 10.00, link: '-', date: '2024-01-13 16:20' },
    { id: 5, type: 'earning', user: 'user@test.com', amount: 1.23, link: 'pro456', date: '2024-01-13 11:00' },
  ];

  const getTypeInfo = (type: string) => {
    const info: Record<string, { labelAr: string; labelEn: string; color: string; icon: typeof TrendingUp }> = {
      earning: { labelAr: 'أرباح', labelEn: 'Earning', color: 'text-emerald-600', icon: TrendingUp },
      withdrawal: { labelAr: 'سحب', labelEn: 'Withdrawal', color: 'text-red-600', icon: TrendingDown },
      referral: { labelAr: 'إحالة', labelEn: 'Referral', color: 'text-blue-600', icon: TrendingUp },
    };
    return info[type] || info.earning;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'ar' ? 'المعاملات' : 'Transactions'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' ? 'سجل جميع المعاملات المالية' : 'All financial transactions history'}
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'النوع' : 'Type'}</th>
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'المستخدم' : 'User'}</th>
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'الرابط' : 'Link'}</th>
                  <th className="text-center p-4 font-medium">{language === 'ar' ? 'المبلغ' : 'Amount'}</th>
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'التاريخ' : 'Date'}</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => {
                  const typeInfo = getTypeInfo(tx.type);
                  const Icon = tx.amount > 0 ? ArrowUpRight : ArrowDownRight;
                  return (
                    <tr key={tx.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className={`flex items-center gap-2 ${typeInfo.color}`}>
                          <typeInfo.icon className="w-4 h-4" />
                          <span className="font-medium">
                            {language === 'ar' ? typeInfo.labelAr : typeInfo.labelEn}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">{tx.user}</td>
                      <td className="p-4">
                        {tx.link !== '-' ? (
                          <span className="font-mono text-emerald-600 text-xs">lalinky.com/{tx.link}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground text-xs">{tx.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
