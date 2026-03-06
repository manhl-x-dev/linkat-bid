'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MousePointer, Users, TrendingUp, Globe } from 'lucide-react';

export default function AnalyticsPage() {
  const { language } = useAppStore();

  const stats = [
    { label: language === 'ar' ? 'النقرات' : 'Clicks', value: '12,345', icon: MousePointer, color: 'text-emerald-500' },
    { label: language === 'ar' ? 'فريدة' : 'Unique', value: '8,901', icon: Users, color: 'text-blue-500' },
    { label: language === 'ar' ? 'الأرباح' : 'Earnings', value: '$45.67', icon: TrendingUp, color: 'text-amber-500' }
  ];

  const topLinks = [
    { short: 'abc123', clicks: 1234, earnings: '$12.34' },
    { short: 'xyz789', clicks: 987, earnings: '$9.87' },
    { short: 'pro456', clicks: 654, earnings: '$6.54' },
  ];

  const countries = [
    { name: language === 'ar' ? 'السعودية' : 'Saudi Arabia', percent: 36 },
    { name: language === 'ar' ? 'مصر' : 'Egypt', percent: 19 },
    { name: language === 'ar' ? 'الإمارات' : 'UAE', percent: 15 },
    { name: language === 'ar' ? 'الكويت' : 'Kuwait', percent: 12 },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'ar' ? 'الإحصائيات' : 'Analytics'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' ? 'تحليلات وأداء روابطك' : 'Analytics and link performance'}
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

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Top Links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{language === 'ar' ? 'أفضل الروابط' : 'Top Links'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topLinks.map((l, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-muted px-2 py-1 rounded">#{i + 1}</span>
                    <span className="font-mono text-sm text-emerald-600">lalinky.com/{l.short}</span>
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-emerald-600">{l.earnings}</span>
                    <span className="text-xs text-muted-foreground mr-2">({l.clicks})</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="w-5 h-5" />
              {language === 'ar' ? 'التوزيع الجغرافي' : 'Geographic Distribution'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {countries.map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{c.name}</span>
                    <span className="text-muted-foreground">{c.percent}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all" 
                      style={{ width: `${c.percent}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{language === 'ar' ? 'الأجهزة' : 'Devices'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-6 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-emerald-600">65%</p>
              <p className="text-sm text-muted-foreground">{language === 'ar' ? 'موبايل' : 'Mobile'}</p>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">30%</p>
              <p className="text-sm text-muted-foreground">{language === 'ar' ? 'كمبيوتر' : 'Desktop'}</p>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg">
              <p className="text-3xl font-bold text-amber-600">5%</p>
              <p className="text-sm text-muted-foreground">{language === 'ar' ? 'تابلت' : 'Tablet'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
