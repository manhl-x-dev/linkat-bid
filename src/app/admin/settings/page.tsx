'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, Globe, DollarSign, Shield, Bell, Loader2, Check } from 'lucide-react';
import { SettingsNav } from '@/components/admin/SettingsNav';
import { toast } from 'sonner';

interface SiteSettings {
  siteName: string;
  domain: string;
  description: string;
  email: string;
  defaultLanguage: string;
  referralCommission: number;
  minWithdrawal: number;
  cpmRate: number;
  userShare: number;
  autoWithdrawal: boolean;
  twoFactorAuth: boolean;
  spamProtection: boolean;
  contentFilter: boolean;
  emailNotifications: boolean;
  withdrawalAlerts: boolean;
  reportAlerts: boolean;
}

export default function AdminSettingsPage() {
  const { language } = useAppStore();
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'lalinky.com',
    domain: 'lalinky.com',
    description: 'Smart URL Shortener with real earnings',
    email: 'support@lalinky.com',
    defaultLanguage: 'ar',
    referralCommission: 20,
    minWithdrawal: 10,
    cpmRate: 50,
    userShare: 50,
    autoWithdrawal: false,
    twoFactorAuth: true,
    spamProtection: true,
    contentFilter: true,
    emailNotifications: true,
    withdrawalAlerts: true,
    reportAlerts: true,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    toast.success(language === 'ar' ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
  };

  const handleReset = () => {
    setSettings({
      siteName: 'lalinky.com',
      domain: 'lalinky.com',
      description: 'Smart URL Shortener with real earnings',
      email: 'support@lalinky.com',
      defaultLanguage: 'ar',
      referralCommission: 20,
      minWithdrawal: 10,
      cpmRate: 50,
      userShare: 50,
      autoWithdrawal: false,
      twoFactorAuth: true,
      spamProtection: true,
      contentFilter: true,
      emailNotifications: true,
      withdrawalAlerts: true,
      reportAlerts: true,
    });
    toast.info(language === 'ar' ? 'تم إعادة الإعدادات الافتراضية' : 'Settings reset to defaults');
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
                <Input 
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  className="mt-1.5" 
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'النطاق' : 'Domain'}</Label>
                <Input 
                  value={settings.domain}
                  onChange={(e) => setSettings({...settings, domain: e.target.value})}
                  className="mt-1.5" 
                />
              </div>
            </div>
            <div>
              <Label>{language === 'ar' ? 'وصف الموقع' : 'Site Description'}</Label>
              <Input 
                value={settings.description}
                onChange={(e) => setSettings({...settings, description: e.target.value})}
                className="mt-1.5" 
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                <Input 
                  value={settings.email}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                  className="mt-1.5" 
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'اللغة الافتراضية' : 'Default Language'}</Label>
                <Input 
                  value={settings.defaultLanguage}
                  onChange={(e) => setSettings({...settings, defaultLanguage: e.target.value})}
                  className="mt-1.5" 
                />
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
                <Input 
                  type="number" 
                  value={settings.referralCommission}
                  onChange={(e) => setSettings({...settings, referralCommission: Number(e.target.value)})}
                  className="mt-1.5" 
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'الحد الأدنى للسحب ($)' : 'Min Withdrawal ($)'}</Label>
                <Input 
                  type="number" 
                  value={settings.minWithdrawal}
                  onChange={(e) => setSettings({...settings, minWithdrawal: Number(e.target.value)})}
                  className="mt-1.5" 
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>{language === 'ar' ? 'أجرة النقرة (سنت)' : 'CPM Rate (cents)'}</Label>
                <Input 
                  type="number" 
                  value={settings.cpmRate}
                  onChange={(e) => setSettings({...settings, cpmRate: Number(e.target.value)})}
                  className="mt-1.5" 
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'نسبة المستخدم (%)' : 'User Share (%)'}</Label>
                <Input 
                  type="number" 
                  value={settings.userShare}
                  onChange={(e) => setSettings({...settings, userShare: Number(e.target.value)})}
                  className="mt-1.5" 
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{language === 'ar' ? 'السحب التلقائي' : 'Auto Withdrawal'}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'معالجة طلبات السحب تلقائياً' : 'Process withdrawal requests automatically'}
                </p>
              </div>
              <Switch 
                checked={settings.autoWithdrawal}
                onCheckedChange={(checked) => setSettings({...settings, autoWithdrawal: checked})}
              />
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
              <Switch 
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{language === 'ar' ? 'حماية من السبام' : 'Spam Protection'}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'حماية الروابط من السبام' : 'Protect links from spam'}
                </p>
              </div>
              <Switch 
                checked={settings.spamProtection}
                onCheckedChange={(checked) => setSettings({...settings, spamProtection: checked})}
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{language === 'ar' ? 'فلترة المحتوى' : 'Content Filter'}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'فلترة الروابط الضارة تلقائياً' : 'Auto-filter malicious links'}
                </p>
              </div>
              <Switch 
                checked={settings.contentFilter}
                onCheckedChange={(checked) => setSettings({...settings, contentFilter: checked})}
              />
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
              <Switch 
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{language === 'ar' ? 'إشعارات السحب' : 'Withdrawal Alerts'}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'إشعار المدير عند طلب سحب جديد' : 'Notify admin on new withdrawal'}
                </p>
              </div>
              <Switch 
                checked={settings.withdrawalAlerts}
                onCheckedChange={(checked) => setSettings({...settings, withdrawalAlerts: checked})}
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{language === 'ar' ? 'إشعارات البلاغات' : 'Report Alerts'}</p>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'إشعار المدير عند بلاغ جديد' : 'Notify admin on new report'}
                </p>
              </div>
              <Switch 
                checked={settings.reportAlerts}
                onCheckedChange={(checked) => setSettings({...settings, reportAlerts: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleReset}>
            {language === 'ar' ? 'إعادة الافتراضي' : 'Reset Defaults'}
          </Button>
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
