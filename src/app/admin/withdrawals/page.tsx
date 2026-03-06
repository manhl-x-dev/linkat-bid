'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X, Wallet, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminWithdrawalsPage() {
  const { language } = useAppStore();

  const withdrawals = [
    { id: 1, user: 'user@test.com', amount: 50, wallet: 'TKx...abc', network: 'TRC20', status: 'pending', date: '2024-01-15' },
    { id: 2, user: 'demo@test.com', amount: 25, wallet: '0x...def', network: 'BEP20', status: 'completed', date: '2024-01-14' },
    { id: 3, user: 'promo@test.com', amount: 100, wallet: 'TKp...xyz', network: 'TRC20', status: 'pending', date: '2024-01-15' },
    { id: 4, user: 'vip@test.com', amount: 75, wallet: '0x...123', network: 'BEP20', status: 'rejected', date: '2024-01-13' },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
      completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
      rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    };
    const labels: Record<string, string> = {
      pending: language === 'ar' ? 'معلق' : 'Pending',
      completed: language === 'ar' ? 'مكتمل' : 'Completed',
      rejected: language === 'ar' ? 'مرفوض' : 'Rejected',
    };
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'ar' ? 'طلبات السحب' : 'Withdrawal Requests'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' ? 'إدارة طلبات سحب الأرباح' : 'Manage withdrawal requests'}
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'المستخدم' : 'User'}</th>
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'المبلغ' : 'Amount'}</th>
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'الشبكة' : 'Network'}</th>
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'المحفظة' : 'Wallet'}</th>
                  <th className="text-center p-4 font-medium">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="text-center p-4 font-medium">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w) => (
                  <tr key={w.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-muted-foreground" />
                        {w.user}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-emerald-600">${w.amount}</td>
                    <td className="p-4">
                      <Badge variant="outline">{w.network}</Badge>
                    </td>
                    <td className="p-4 font-mono text-xs">{w.wallet}</td>
                    <td className="p-4 text-center">{getStatusBadge(w.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {w.status === 'pending' && (
                          <>
                            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        {w.status === 'completed' && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {language === 'ar' ? 'تم' : 'Done'}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
