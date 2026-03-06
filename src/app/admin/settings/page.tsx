'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, Globe, DollarSign, Shield, Bell, Loader2 } from 'lucide-react';
import { SettingsNav } from '@/components/admin/SettingsNav';

export default function AdminSettingsPage() {
  const { language } = useAppStore();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
  };

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

      {/* Settings Content */}
      <div className="space-y-6">
        {/* Site Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="w-5 h-5" />
              {language === 'ar' ? 'إعدادات الموقع' : 'Site Settings'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' ? 'إعدادات أساسية للموقع' : 'Basic site configuration'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>{language === 'ar' ? 'اسم الموقع' : 'Site Name'}</Label>
                <Input defaultValue="lalinky.com" className="mt-1.5" />
              </div>
              <div>
                <Label>{language === 'ar' ? 'النطاق' : 'Domain'}</Label>
                <Input defaultValue="lalinky.com" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label>{language === 'ar' ? 'وصف الموقع' : 'Site Description'}</Label>
              <Input defaultValue="Smart URL Shortener with real earnings" className="mt-1.5" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                <Input defaultValue="support@lalinky.com" className="mt-1.5" />
              </div>
              <div>
                <Label>{language === 'ar' ? 'اللغة الافتراضية' : 'Default Language'}</Label>
                <Input defaultValue="ar" className="mt-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earnings Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <DollarSign className="w-5 h-5" />
              {language === 'ar' ? 'إعدادات الأرباح' : 'Earnings Settings'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' ? 'إعدادات نظام الأرباح والسحب' : 'Earnings and withdrawal system settings'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>{language === 'ar' ? 'عمولة الإحالة (%)' : 'Referral Commission (%)'}</Label>
                <Input type="number" defaultValue="20" className="mt-1.5" />
              </div>
              <div>
                <Label>{language === 'ar' ? 'الحد الأدنى للسحب ($)' : 'Min Withdrawal ($)'}</Label>
                <Input type="number" defaultValue="10" className="mt-1.5" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>{language === 'ar' ? 'أجرأة النقرة (سنت)' : 'CPM Rate (cents)'}</Label>
                <Input type="number" defaultValue="50" className="mt-1.5" />
              </div>
              <div>
                <Label>{language === 'ar' ? 'نسبة المستخدم (%)' : 'User Share (%)'}</Label>
                <Input type="number" defaultValue="50" className="mt-1.5" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{language === 'ar' ? 'السحب التلقائي' : 'Auto Withdrawal'}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'معالجة طلبات السحب تلقائياً' : 'Process withdrawal requests automatically'}
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="w-5 h-5" />
              {language === 'ar' ? 'إعدادات الأمان' : 'Security Settings'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' ? 'إعدادات أمان وحماية الموقع' : 'Site security and protection settings'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{language === 'ar' ? 'التحقق بخطوتين' : 'Two-Factor Auth'}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'تفعيل التحقق بخطوتين للمدراء' : 'Enable 2FA for admins'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{language === 'ar' ? 'حماية من السبام' : 'Spam Protection'}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'حماية الروابط من السبام' : 'Protect links from spam'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{language === 'ar' ? 'فلترة المحتوى' : 'Content Filter'}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'فلترة الروابط الضارة تلقائياً' : 'Auto-filter malicious links'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="w-5 h-5" />
              {language === 'ar' ? 'إعدادات الإشعارات' : 'Notification Settings'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' ? 'إدارة إشعارات البريد والنظام' : 'Manage email and system notifications'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{language === 'ar' ? 'إشعارات البريد' : 'Email Notifications'}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'إرسال إشعارات بالبريد للمستخدمين' : 'Send email notifications to users'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{language === 'ar' ? 'إشعارات السحب' : 'Withdrawal Alerts'}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'إشعار المدير عند طلب سحب جديد' : 'Notify admin on new withdrawal'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{language === 'ar' ? 'إشعارات البلاغات' : 'Report Alerts'}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'إشعار المدير عند بلاغ جديد' : 'Notify admin on new report'}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="bg-emerald-500 hover:bg-emerald-600 min-w-32">
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4 ml-2" />
                {language === 'ar' ? 'حفظ الإعدادات' : 'Save Settings'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
