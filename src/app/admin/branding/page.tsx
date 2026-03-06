'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, Save, Upload, ImageIcon, Loader2 } from 'lucide-react';
import { SettingsNav } from '@/components/admin/SettingsNav';

export default function AdminBrandingPage() {
  const { language } = useAppStore();
  const [saving, setSaving] = useState(false);
  const [branding, setBranding] = useState({
    siteName: 'lalinky.com',
    primaryColor: '#10b981',
    secondaryColor: '#14b8a6',
    logo: null as string | null,
    favicon: null as string | null,
  });

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
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'اسحب أو اضغط لرفع الشعار' : 'Drag or click to upload logo'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'ar' ? 'الأبعاد المثالية: 200x60' : 'Ideal dimensions: 200x60'}
                </p>
              </div>
              {/* Favicon Upload */}
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'اسحب أو اضغط لرفع الأيقونة' : 'Drag or click to upload favicon'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'ar' ? 'الأبعاد المثالية: 32x32' : 'Ideal dimensions: 32x32'}
                </p>
              </div>
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
                  L
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

        {/* Save Button */}
        <Button 
          onClick={handleSave} 
          disabled={saving} 
          className="w-full bg-emerald-500 hover:bg-emerald-600 h-12"
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
  );
}
