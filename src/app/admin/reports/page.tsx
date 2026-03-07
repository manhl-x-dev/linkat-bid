'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Check, X, ExternalLink, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Report {
  id: number;
  link: string;
  url: string;
  reporter: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  date: string;
}

export default function AdminReportsPage() {
  const { language } = useAppStore();
  const [reports, setReports] = useState<Report[]>([
    { id: 1, link: 'abc123', url: 'https://spam-site.com/page', reporter: 'user@test.com', reason: 'Spam', status: 'pending', date: '2024-01-15' },
    { id: 2, link: 'xyz789', url: 'https://malware-site.com/virus', reporter: 'demo@test.com', reason: 'Malware', status: 'resolved', date: '2024-01-14' },
    { id: 3, link: 'pro456', url: 'https://phishing-site.com/fake', reporter: 'promo@test.com', reason: 'Phishing', status: 'pending', date: '2024-01-15' },
    { id: 4, link: 'sal999', url: 'https://scam-site.com/fraud', reporter: 'vip@test.com', reason: 'Scam', status: 'dismissed', date: '2024-01-13' },
  ]);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
      resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
      dismissed: 'bg-muted text-muted-foreground',
    };
    const labels: Record<string, string> = {
      pending: language === 'ar' ? 'معلق' : 'Pending',
      resolved: language === 'ar' ? 'تم الحل' : 'Resolved',
      dismissed: language === 'ar' ? 'مرفوض' : 'Dismissed',
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

  const handleBanLink = async (report: Report) => {
    setActionLoading(report.id);
    await new Promise(r => setTimeout(r, 600));
    setReports(prev => prev.map(r => 
      r.id === report.id ? { ...r, status: 'resolved' as const } : r
    ));
    toast.error(language === 'ar' 
      ? `تم حظر الرابط ${report.link}` 
      : `Link ${report.link} has been banned`
    );
    setActionLoading(null);
  };

  const handleDismiss = async (report: Report) => {
    setActionLoading(report.id);
    await new Promise(r => setTimeout(r, 600));
    setReports(prev => prev.map(r => 
      r.id === report.id ? { ...r, status: 'dismissed' as const } : r
    ));
    toast.info(language === 'ar' 
      ? `تم رفض البلاغ على الرابط ${report.link}` 
      : `Report for ${report.link} has been dismissed`
    );
    setActionLoading(null);
  };

  const handleViewLink = (url: string) => {
    window.open(url, '_blank');
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

      <div className="space-y-2">
        {reports.map((r) => (
          <Card 
            key={r.id} 
            className={`transition-colors ${r.status === 'pending' ? 'border-amber-200 dark:border-amber-800' : ''}`}
          >
            <CardContent className="p-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className={`p-1.5 rounded-full ${r.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900' : 'bg-muted'}`}>
                    <AlertTriangle className={`w-4 h-4 ${r.status === 'pending' ? 'text-amber-500' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="font-mono text-emerald-600 text-sm font-medium truncate">
                      lalinky.com/{r.link}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 shrink-0"
                      onClick={() => handleViewLink(r.url)}
                      title={language === 'ar' ? 'فتح الرابط' : 'Open link'}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                    {getReasonBadge(r.reason)}
                    <span className="text-xs text-muted-foreground truncate hidden md:inline">
                      {r.reporter}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  {getStatusBadge(r.status)}
                  {r.status === 'pending' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 h-7"
                        onClick={() => handleBanLink(r)}
                        disabled={actionLoading === r.id}
                      >
                        {actionLoading === r.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <>
                            <X className="w-3 h-3 mr-1" />
                            {language === 'ar' ? 'حظر' : 'Ban'}
                          </>
                        )}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-muted-foreground/30 text-muted-foreground hover:bg-muted h-7"
                        onClick={() => handleDismiss(r)}
                        disabled={actionLoading === r.id}
                      >
                        {actionLoading === r.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            {language === 'ar' ? 'رفض' : 'Dismiss'}
                          </>
                        )}
                      </Button>
                    </>
                  )}
                  {r.status === 'resolved' && (
                    <span className="text-xs text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {language === 'ar' ? 'تم الحظر' : 'Banned'}
                    </span>
                  )}
                  {r.status === 'dismissed' && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      {language === 'ar' ? 'مرفوض' : 'Dismissed'}
                    </span>
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
