'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, Save, Upload, ImageIcon, Loader2, Check, RotateCcw } from 'lucide-react';
import { SettingsNav } from '@/components/admin/SettingsNav';
import { toast } from 'sonner';

interface BrandingSettings {
  siteName: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string | null;
  favicon: string | null;
}

export default function AdminBrandingPage() {
  const { language } = useAppStore();
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [branding, setBranding] = useState<BrandingSettings>({
    siteName: 'lalinky.com',
    primaryColor: '#10b981',
    secondaryColor: '#14b8a6',
    logo: null,
    favicon: null,
  });

  const defaultBranding: BrandingSettings = {
    siteName: 'lalinky.com',
    primaryColor: '#10b981',
    secondaryColor: '#14b8a6',
    logo: null,
    favicon: null,
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    toast.success(language === 'ar' ? 'تم حفظ التغييرات بنجاح' : 'Changes saved successfully');
  };

  const handleReset = async () => {
    setResetting(true);
    await new Promise(r => setTimeout(r, 500));
    setBranding(defaultBranding);
    setResetting(false);
    toast.info(language === 'ar' ? 'تم إعادة الإعدادات الافتراضية' : 'Reset to default settings');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In real app, would upload to storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setBranding({ ...branding, logo: reader.result as string });
        toast.success(language === 'ar' ? 'تم رفع الشعار بنجاح' : 'Logo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In real app, would upload to storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setBranding({ ...branding, favicon: reader.result as string });
        toast.success(language === 'ar' ? 'تم رفع الأيقونة بنجاح' : 'Favicon uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
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

      {/* Content */}
      <div className="space-y-6">
        {/* Site Name */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Palette className="w-5 h-5" />
              {language === 'ar' ? 'اسم الموقع' : 'Site Name'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' ? 'الاسم الذي سيظهر في العنوان والهيدر' : 'Name shown in title and header'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input 
              value={branding.siteName}
              onChange={(e) => setBranding({...branding, siteName: e.target.value})}
              className="max-w-md"
            />
          </CardContent>
        </Card>

        {/* Colors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Palette className="w-5 h-5" />
              {language === 'ar' ? 'الألوان' : 'Colors'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' ? 'ألوان الموقع الرئيسية' : 'Main site colors'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>{language === 'ar' ? 'اللون الأساسي' : 'Primary Color'}</Label>
                <div className="flex gap-2 mt-2">
                  <div 
                    className="w-12 h-10 rounded border"
                    style={{ backgroundColor: branding.primaryColor }}
                  />
                  <Input 
                    type="color" 
                    value={branding.primaryColor} 
                    onChange={(e) => setBranding({...branding, primaryColor: e.target.value})} 
                    className="w-16 h-10 p-1 cursor-pointer" 
                  />
                  <Input 
                    value={branding.primaryColor} 
                    onChange={(e) => setBranding({...branding, primaryColor: e.target.value})} 
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
              <div>
                <Label>{language === 'ar' ? 'اللون الثانوي' : 'Secondary Color'}</Label>
                <div className="flex gap-2 mt-2">
                  <div 
                    className="w-12 h-10 rounded border"
                    style={{ backgroundColor: branding.secondaryColor }}
                  />
                  <Input 
                    type="color" 
                    value={branding.secondaryColor} 
                    onChange={(e) => setBranding({...branding, secondaryColor: e.target.value})} 
                    className="w-16 h-10 p-1 cursor-pointer" 
                  />
                  <Input 
                    value={branding.secondaryColor} 
                    onChange={(e) => setBranding({...branding, secondaryColor: e.target.value})} 
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ImageIcon className="w-5 h-5" />
              {language === 'ar' ? 'الشعار' : 'Logo'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' ? 'شعار الموقع (PNG, SVG)' : 'Site logo (PNG, SVG)'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Logo Upload */}
              <label className="cursor-pointer">
                <div className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-emerald-500 transition-colors ${branding.logo ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950' : ''}`}>
                  {branding.logo ? (
                    <div className="flex flex-col items-center gap-2">
                      <Check className="w-8 h-8 text-emerald-500" />
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        {language === 'ar' ? 'تم رفع الشعار' : 'Logo uploaded'}
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' ? 'اسحب أو اضغط لرفع الشعار' : 'Drag or click to upload logo'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {language === 'ar' ? 'الأبعاد المثالية: 200x60' : 'Ideal dimensions: 200x60'}
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  accept="image/png,image/svg+xml"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </label>
              
              {/* Favicon Upload */}
              <label className="cursor-pointer">
                <div className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-emerald-500 transition-colors ${branding.favicon ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950' : ''}`}>
                  {branding.favicon ? (
                    <div className="flex flex-col items-center gap-2">
                      <Check className="w-8 h-8 text-emerald-500" />
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        {language === 'ar' ? 'تم رفع الأيقونة' : 'Favicon uploaded'}
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {language === 'ar' ? 'اسحب أو اضغط لرفع الأيقونة' : 'Drag or click to upload favicon'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {language === 'ar' ? 'الأبعاد المثالية: 32x32' : 'Ideal dimensions: 32x32'}
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  accept="image/png,image/x-icon"
                  className="hidden"
                  onChange={handleFaviconUpload}
                />
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {language === 'ar' ? 'معاينة' : 'Preview'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-lg bg-background">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  {branding.siteName[0].toUpperCase()}
                </div>
                <span className="font-bold text-lg">{branding.siteName}</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  {language === 'ar' ? 'زر أساسي' : 'Primary Button'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  style={{ borderColor: branding.secondaryColor, color: branding.secondaryColor }}
                >
                  {language === 'ar' ? 'زر ثانوي' : 'Secondary Button'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={resetting}
          >
            {resetting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <RotateCcw className="w-4 h-4 ml-2" />
                {language === 'ar' ? 'إعادة الافتراضي' : 'Reset Defaults'}
              </>
            )}
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={saving} 
            className="bg-emerald-500 hover:bg-emerald-600 min-w-32"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4 ml-2" />
                {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
