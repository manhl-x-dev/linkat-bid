'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Link2, Pause, Play, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminLinksPage() {
  const { language } = useAppStore();

  const links = [
    { id: 1, short: 'abc123', url: 'https://example.com/page', owner: 'user@test.com', clicks: 1234, status: 'active' },
    { id: 2, short: 'xyz789', url: 'https://demo.com/test', owner: 'demo@test.com', clicks: 567, status: 'paused' },
    { id: 3, short: 'pro456', url: 'https://promo.com/offer', owner: 'promo@test.com', clicks: 8901, status: 'active' },
    { id: 4, short: 'sal999', url: 'https://sale.com/discount', owner: 'sale@test.com', clicks: 234, status: 'banned' },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
      paused: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
      banned: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    };
    const labels: Record<string, string> = {
      active: language === 'ar' ? 'نشط' : 'Active',
      paused: language === 'ar' ? 'موقفف' : 'Paused',
      banned: language === 'ar' ? 'محظور' : 'Banned',
    };
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'ar' ? 'إدارة الروابط' : 'Manage Links'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' ? 'عرض وإدارة جميع الروابط' : 'View and manage all links'}
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'الرابط المختصر' : 'Short Link'}</th>
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'الرابط الأصلي' : 'Original URL'}</th>
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'المالك' : 'Owner'}</th>
                  <th className="text-center p-4 font-medium">{language === 'ar' ? 'النقرات' : 'Clicks'}</th>
                  <th className="text-center p-4 font-medium">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="text-center p-4 font-medium">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr key={link.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-emerald-500" />
                        <span className="font-mono text-emerald-600">lalinky.com/{link.short}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="max-w-xs truncate text-muted-foreground">
                        {link.url}
                      </div>
                    </td>
                    <td className="p-4">{link.owner}</td>
                    <td className="p-4 text-center font-medium">{link.clicks.toLocaleString()}</td>
                    <td className="p-4 text-center">{getStatusBadge(link.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          {link.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
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
