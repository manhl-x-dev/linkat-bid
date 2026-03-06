'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, TrendingUp, Gift, UserPlus, ArrowUpRight } from 'lucide-react';

export default function AdminReferralPage() {
  const { language } = useAppStore();

  const stats = [
    { 
      label: language === 'ar' ? 'إجمالي الإحالات' : 'Total Referrals', 
      value: '1,234', 
      icon: Users,
      color: 'text-emerald-500'
    },
    { 
      label: language === 'ar' ? 'العمولات المدفوعة' : 'Paid Commissions', 
      value: '$2,345', 
      icon: DollarSign,
      color: 'text-amber-500'
    },
    { 
      label: language === 'ar' ? 'نسبة العمولة' : 'Commission Rate', 
      value: '20%', 
      icon: TrendingUp,
      color: 'text-blue-500'
    }
  ];

  const topReferrers = [
    { name: 'Ahmed Mohamed', referrals: 156, earnings: '$234.50' },
    { name: 'Sarah Johnson', referrals: 134, earnings: '$198.75' },
    { name: 'محمد علي', referrals: 98, earnings: '$145.20' },
    { name: 'John Doe', referrals: 87, earnings: '$132.30' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'ar' ? 'نظام الإحالة' : 'Referral System'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' ? 'إدارة وتتبع نظام الإحالة' : 'Manage and track the referral system'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((s, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold">{s.value}</p>
                </div>
                <s.icon className={`w-8 h-8 ${s.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="mb-6 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Gift className="w-8 h-8 text-emerald-500" />
            <div>
              <p className="font-medium text-emerald-700 dark:text-emerald-300">
                {language === 'ar' ? 'نظام العمولات' : 'Commission System'}
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                {language === 'ar' 
                  ? 'المحيل يحصل على 20% من أرباح المستخدم المحال مدى الحياة' 
                  : 'Referrer earns 20% of referred user earnings for lifetime'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Referrers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            {language === 'ar' ? 'أفضل المحيلين' : 'Top Referrers'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'المحيل' : 'Referrer'}</th>
                  <th className="text-center p-4 font-medium">{language === 'ar' ? 'الإحالات' : 'Referrals'}</th>
                  <th className="text-center p-4 font-medium">{language === 'ar' ? 'الأرباح' : 'Earnings'}</th>
                </tr>
              </thead>
              <tbody>
                {topReferrers.map((r, i) => (
                  <tr key={i} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-medium">
                          {r.name[0]}
                        </div>
                        <span className="font-medium">{r.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {r.referrals}
                      </div>
                    </td>
                    <td className="p-4 text-center font-medium text-emerald-600">{r.earnings}</td>
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
