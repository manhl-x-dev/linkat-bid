'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Check, X, ExternalLink, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminReportsPage() {
  const { language } = useAppStore();

  const reports = [
    { id: 1, link: 'abc123', url: 'https://spam-site.com/page', reporter: 'user@test.com', reason: 'Spam', status: 'pending', date: '2024-01-15' },
    { id: 2, link: 'xyz789', url: 'https://malware-site.com/virus', reporter: 'demo@test.com', reason: 'Malware', status: 'resolved', date: '2024-01-14' },
    { id: 3, link: 'pro456', url: 'https://phishing-site.com/fake', reporter: 'promo@test.com', reason: 'Phishing', status: 'pending', date: '2024-01-15' },
    { id: 4, link: 'sal999', url: 'https://scam-site.com/fraud', reporter: 'vip@test.com', reason: 'Scam', status: 'dismissed', date: '2024-01-13' },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
      resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
      dismissed: 'bg-muted text-muted-foreground',
    };
    const labels: Record<string, string> = {
      pending: language === 'ar' ? 'معلق' : 'Pending',
      resolved: language === 'ar' ? 'تم الحل' : 'Resolved',
      dismissed: language === 'ar' ? 'تم الرفض' : 'Dismissed',
    };
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  const getReasonBadge = (reason: string) => {
    const styles: Record<string, string> = {
      Spam: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      Malware: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      Phishing: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      Scam: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    };
    return <Badge className={styles[reason] || ''}>{reason}</Badge>;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'ar' ? 'البلاغات' : 'Reports'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' ? 'إدارة بلاغات المستخدمين' : 'Manage user reports'}
        </p>
      </div>

      <div className="space-y-4">
        {reports.map((r) => (
          <Card key={r.id} className={r.status === 'pending' ? 'border-amber-200 dark:border-amber-800' : ''}>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${r.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900' : 'bg-muted'}`}>
                    <AlertTriangle className={`w-5 h-5 ${r.status === 'pending' ? 'text-amber-500' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-emerald-600 font-medium">lalinky.com/{r.link}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 truncate max-w-md">{r.url}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {getReasonBadge(r.reason)}
                      <span className="text-xs text-muted-foreground">
                        {language === 'ar' ? 'المُبلغ:' : 'Reporter:'} {r.reporter}
                      </span>
                      <span className="text-xs text-muted-foreground">• {r.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {getStatusBadge(r.status)}
                  {r.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                        <Check className="w-4 h-4 mr-1" />
                        {language === 'ar' ? 'حظر' : 'Ban'}
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                        <X className="w-4 h-4 mr-1" />
                        {language === 'ar' ? 'رفض' : 'Dismiss'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
