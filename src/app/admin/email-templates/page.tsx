'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Edit, Eye, Send, UserPlus, Wallet, AlertCircle, Gift } from 'lucide-react';
import { SettingsNav } from '@/components/admin/SettingsNav';

export default function AdminEmailTemplatesPage() {
  const { language } = useAppStore();

  const templates = [
    { 
      id: 'welcome',
      name: language === 'ar' ? 'ترحيب بالمستخدم الجديد' : 'Welcome New User', 
      subject: language === 'ar' ? 'مرحباً بك في lalinky.com!' : 'Welcome to lalinky.com!',
      icon: UserPlus,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900',
      lastUpdated: '2024-01-15'
    },
    { 
      id: 'withdrawal',
      name: language === 'ar' ? 'تأكيد طلب السحب' : 'Withdrawal Confirmation', 
      subject: language === 'ar' ? 'تم استلام طلب السحب' : 'Withdrawal Request Received',
      icon: Wallet,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100 dark:bg-amber-900',
      lastUpdated: '2024-01-10'
    },
    { 
      id: 'withdrawal-complete',
      name: language === 'ar' ? 'تم السحب بنجاح' : 'Withdrawal Complete', 
      subject: language === 'ar' ? 'تم إرسال المبلغ إلى محفظتك' : 'Amount sent to your wallet',
      icon: Send,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      lastUpdated: '2024-01-10'
    },
    { 
      id: 'referral',
      name: language === 'ar' ? 'إشعار إحالة جديدة' : 'New Referral Notification', 
      subject: language === 'ar' ? 'انضم شخص جديد من خلال رابطك!' : 'Someone joined through your link!',
      icon: Gift,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
      lastUpdated: '2024-01-08'
    },
    { 
      id: 'report',
      name: language === 'ar' ? 'تنبيه بلاغ' : 'Report Alert', 
      subject: language === 'ar' ? 'تم الإبلاغ عن رابط' : 'Link reported',
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900',
      lastUpdated: '2024-01-05'
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'ar' ? 'الإعدادات' : 'Settings'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' ? 'إدارة إعدادات الموقع والتخصيص' : 'Manage site settings and customization'}
        </p>
      </div>

      {/* Sub Navigation */}
      <SettingsNav />

      {/* Content */}
      <div className="space-y-4">
        {templates.map((t) => (
          <Card key={t.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${t.bgColor} flex items-center justify-center`}>
                    <t.icon className={`w-6 h-6 ${t.color}`} />
                  </div>
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.subject}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {language === 'ar' ? 'آخر تحديث:' : 'Last updated:'} {t.lastUpdated}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'معاينة' : 'Preview'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    {language === 'ar' ? 'تعديل' : 'Edit'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mail className="w-4 h-4" />
            {language === 'ar' ? 'ملاحظة' : 'Note'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {language === 'ar' 
              ? 'يمكنك استخدام المتغيرات التالية في القوالب: {username}, {email}, {amount}, {link}, {date}'
              : 'You can use these variables in templates: {username}, {email}, {amount}, {link}, {date}'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
