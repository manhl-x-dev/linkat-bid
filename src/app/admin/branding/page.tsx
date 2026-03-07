'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, Save, Upload, ImageIcon, Loader2, Check, RotateCcw, X, AlertCircle } from 'lucide-react';
import { SettingsNav } from '@/components/admin/SettingsNav';
import { toast } from 'sonner';

interface BrandingSettings {
  siteName: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string | null;
  favicon: string | null;
}

const defaultBranding: BrandingSettings = {
  siteName: 'lalinky.com',
  primaryColor: '#10b981',
  secondaryColor: '#14b8a6',
  logo: null,
  favicon: null,
};

export default function AdminBrandingPage() {
  const { language } = useAppStore();
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [branding, setBranding] = useState<BrandingSettings>(defaultBranding);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load branding from database
  const loadBranding = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/branding');
      const data = await res.json();
      if (data.success && data.branding) {
        setBranding({
          siteName: data.branding.siteName || defaultBranding.siteName,
          primaryColor: data.branding.primaryColor || defaultBranding.primaryColor,
          secondaryColor: data.branding.secondaryColor || defaultBranding.secondaryColor,
          logo: data.branding.logo || null,
          favicon: data.branding.favicon || null
        });
      }
    } catch (error) {
      console.error('Error loading branding:', error);
    } finally {
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBranding();
  }, [loadBranding]);

  // Apply colors to CSS variables when they change
  useEffect(() => {
    if (!initialLoading) {
      applyColors(branding.primaryColor, branding.secondaryColor);
    }
  }, [branding.primaryColor, branding.secondaryColor, initialLoading]);

  // Track unsaved changes
  useEffect(() => {
    if (!initialLoading) {
      setHasUnsavedChanges(true);
    }
  }, [branding.siteName, branding.primaryColor, branding.secondaryColor, branding.logo, branding.favicon]);

  const applyColors = (primary: string, secondary: string) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', primary);
    root.style.setProperty('--color-primary-foreground', '#ffffff');
    
    // Convert hex to HSL for better CSS variable support
    const hexToHSL = (hex: string): string => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0;
      const l = (max + min) / 2;
      
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      
      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };
    
    const primaryHSL = hexToHSL(primary);
    const secondaryHSL = hexToHSL(secondary);
    
    root.style.setProperty('--primary', primaryHSL);
    root.style.setProperty('--ring', primaryHSL);
    root.style.setProperty('--secondary', secondaryHSL);
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      const res = await fetch('/api/admin/branding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(branding)
      });
      
      const data = await res.json();
      
      if (data.success) {
        toast.success(language === 'ar' ? 'تم حفظ التغييرات بنجاح' : 'Changes saved successfully');
        setHasUnsavedChanges(false);
        // Apply colors immediately after save
        applyColors(branding.primaryColor, branding.secondaryColor);
      } else {
        toast.error(language === 'ar' ? 'فشل حفظ التغييرات' : 'Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving branding:', error);
      toast.error(language === 'ar' ? 'حدث خطأ أثناء الحفظ' : 'Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setResetting(true);
    
    try {
      const res = await fetch('/api/admin/branding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(defaultBranding)
      });
      
      const data = await res.json();
      
      if (data.success) {
        setBranding(defaultBranding);
        applyColors(defaultBranding.primaryColor, defaultBranding.secondaryColor);
        setHasUnsavedChanges(false);
        toast.info(language === 'ar' ? 'تم إعادة الإعدادات الافتراضية' : 'Reset to default settings');
      }
    } catch (error) {
      console.error('Error resetting branding:', error);
    } finally {
      setResetting(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error(language === 'ar' ? 'حجم الملف كبير جداً (الحد الأقصى 2MB)' : 'File too large (max 2MB)');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setBranding({ ...branding, logo: reader.result as string });
        toast.success(language === 'ar' ? 'تم رفع الشعار - اضغط حفظ للتأكيد' : 'Logo uploaded - Click save to confirm');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 1MB)
      if (file.size > 1 * 1024 * 1024) {
        toast.error(language === 'ar' ? 'حجم الملف كبير جداً (الحد الأقصى 1MB)' : 'File too large (max 1MB)');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setBranding({ ...branding, favicon: reader.result as string });
        toast.success(language === 'ar' ? 'تم رفع الأيقونة - اضغط حفظ للتأكيد' : 'Favicon uploaded - Click save to confirm');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setBranding({ ...branding, logo: null });
    toast.info(language === 'ar' ? 'تم إزالة الشعار - اضغط حفظ للتأكيد' : 'Logo removed - Click save to confirm');
  };

  const handleRemoveFavicon = () => {
    setBranding({ ...branding, favicon: null });
    toast.info(language === 'ar' ? 'تم إزالة الأيقونة - اضغط حفظ للتأكيد' : 'Favicon removed - Click save to confirm');
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

      {initialLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        /* Content */
        <div className="space-y-6">
          {/* Unsaved Changes Warning */}
          {hasUnsavedChanges && (
            <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm">
                    {language === 'ar' 
                      ? 'لديك تغييرات غير محفوظة. اضغط "حفظ التغييرات" لحفظها.'
                      : 'You have unsaved changes. Click "Save Changes" to save them.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

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
                {language === 'ar' ? 'ألوان الموقع الرئيسية - يتم تطبيقها تلقائياً' : 'Main site colors - applied automatically'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>{language === 'ar' ? 'اللون الأساسي' : 'Primary Color'}</Label>
                  <div className="flex gap-2 mt-2">
                    <div 
                      className="w-12 h-10 rounded border transition-colors"
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
                      className="w-12 h-10 rounded border transition-colors"
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

          {/* Logo & Favicon */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ImageIcon className="w-5 h-5" />
                {language === 'ar' ? 'الشعار والأيقونة' : 'Logo & Favicon'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' ? 'شعار الموقع وأيقونة المتصفح (يُحفظ في قاعدة البيانات)' : 'Site logo and browser icon (saved to database)'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label>{language === 'ar' ? 'الشعار' : 'Logo'}</Label>
                  {branding.logo ? (
                    <div className="border-2 border-emerald-500 rounded-lg p-4 bg-emerald-50 dark:bg-emerald-950">
                      <div className="flex flex-col items-center gap-3">
                        {branding.logo.startsWith('data:image') ? (
                          <img src={branding.logo} alt="Logo" className="max-h-16 max-w-full object-contain" />
                        ) : (
                          <img src={branding.logo} alt="Logo" className="max-h-16 max-w-full object-contain" />
                        )}
                        <div className="flex gap-2">
                          <label className="cursor-pointer">
                            <Button variant="outline" size="sm" asChild>
                              <span>
                                <Upload className="w-4 h-4 mr-1" />
                                {language === 'ar' ? 'تغيير' : 'Change'}
                              </span>
                            </Button>
                            <input 
                              type="file" 
                              accept="image/png,image/svg+xml,image/jpeg"
                              className="hidden"
                              onChange={handleLogoUpload}
                            />
                          </label>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={handleRemoveLogo}
                          >
                            <X className="w-4 h-4 mr-1" />
                            {language === 'ar' ? 'حذف' : 'Remove'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {language === 'ar' ? 'اضغط لرفع الشعار' : 'Click to upload logo'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, SVG, JPG {language === 'ar' ? '(الحد الأقصى 2MB)' : '(max 2MB)'}
                        </p>
                      </div>
                      <input 
                        type="file" 
                        accept="image/png,image/svg+xml,image/jpeg"
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                    </label>
                  )}
                </div>
                
                {/* Favicon Upload */}
                <div className="space-y-2">
                  <Label>{language === 'ar' ? 'أيقونة المتصفح (Favicon)' : 'Favicon'}</Label>
                  {branding.favicon ? (
                    <div className="border-2 border-emerald-500 rounded-lg p-4 bg-emerald-50 dark:bg-emerald-950">
                      <div className="flex flex-col items-center gap-3">
                        {branding.favicon.startsWith('data:image') ? (
                          <img src={branding.favicon} alt="Favicon" className="max-h-12 max-w-full object-contain" />
                        ) : (
                          <img src={branding.favicon} alt="Favicon" className="max-h-12 max-w-full object-contain" />
                        )}
                        <div className="flex gap-2">
                          <label className="cursor-pointer">
                            <Button variant="outline" size="sm" asChild>
                              <span>
                                <Upload className="w-4 h-4 mr-1" />
                                {language === 'ar' ? 'تغيير' : 'Change'}
                              </span>
                            </Button>
                            <input 
                              type="file" 
                              accept="image/png,image/x-icon,image/ico"
                              className="hidden"
                              onChange={handleFaviconUpload}
                            />
                          </label>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={handleRemoveFavicon}
                          >
                            <X className="w-4 h-4 mr-1" />
                            {language === 'ar' ? 'حذف' : 'Remove'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {language === 'ar' ? 'اضغط لرفع الأيقونة' : 'Click to upload favicon'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, ICO {language === 'ar' ? '(الحد الأقصى 1MB)' : '(max 1MB)'}
                        </p>
                      </div>
                      <input 
                        type="file" 
                        accept="image/png,image/x-icon,image/ico"
                        className="hidden"
                        onChange={handleFaviconUpload}
                      />
                    </label>
                  )}
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
                  {branding.logo ? (
                    <img 
                      src={branding.logo} 
                      alt="Logo" 
                      className="h-10 max-w-32 object-contain"
                    />
                  ) : (
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: branding.primaryColor }}
                    >
                      {branding.siteName[0].toUpperCase()}
                    </div>
                  )}
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
      )}
    </div>
  );
}
