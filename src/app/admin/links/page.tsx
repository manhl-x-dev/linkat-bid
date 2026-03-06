'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Link2, Pause, Play, Trash2, ExternalLink, Eye, Copy, Check, Loader2, Search, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface LinkItem {
  id: number;
  short: string;
  url: string;
  owner: string;
  clicks: number;
  status: 'active' | 'paused' | 'banned';
}

export default function AdminLinksPage() {
  const { language } = useAppStore();
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [links, setLinks] = useState<LinkItem[]>([
    { id: 1, short: 'abc123', url: 'https://example.com/page', owner: 'user@test.com', clicks: 1234, status: 'active' },
    { id: 2, short: 'xyz789', url: 'https://demo.com/test', owner: 'demo@test.com', clicks: 567, status: 'paused' },
    { id: 3, short: 'pro456', url: 'https://promo.com/offer', owner: 'promo@test.com', clicks: 8901, status: 'active' },
    { id: 4, short: 'sal999', url: 'https://sale.com/discount', owner: 'sale@test.com', clicks: 234, status: 'banned' },
  ]);

  const filteredLinks = links.filter(link => 
    link.short.toLowerCase().includes(search.toLowerCase()) ||
    link.url.toLowerCase().includes(search.toLowerCase()) ||
    link.owner.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
      paused: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
      banned: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    };
    const labels: Record<string, string> = {
      active: language === 'ar' ? 'نشط' : 'Active',
      paused: language === 'ar' ? 'موقوف' : 'Paused',
      banned: language === 'ar' ? 'محظور' : 'Banned',
    };
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  const handleCopy = async (short: string) => {
    await navigator.clipboard.writeText(`lalinky.com/${short}`);
    setCopied(short);
    toast.success(language === 'ar' ? 'تم نسخ الرابط' : 'Link copied');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleView = (link: LinkItem) => {
    window.open(link.url, '_blank');
    toast.success(language === 'ar' ? 'تم فتح الرابط في نافذة جديدة' : 'Link opened in new tab');
  };

  const handleToggleStatus = async (link: LinkItem) => {
    if (link.status === 'banned') return;
    
    setActionLoading(link.id);
    await new Promise(r => setTimeout(r, 500));
    
    const newStatus = link.status === 'active' ? 'paused' : 'active';
    setLinks(prev => prev.map(l => l.id === link.id ? { ...l, status: newStatus } : l));
    
    toast.success(language === 'ar' 
      ? newStatus === 'paused' ? `تم إيقاف الرابط ${link.short}` : `تم تفعيل الرابط ${link.short}`
      : newStatus === 'paused' ? `Link ${link.short} paused` : `Link ${link.short} activated`
    );
    setActionLoading(null);
  };

  const handleBan = async (link: LinkItem) => {
    setActionLoading(link.id);
    await new Promise(r => setTimeout(r, 500));
    
    const newStatus = link.status === 'banned' ? 'active' : 'banned';
    setLinks(prev => prev.map(l => l.id === link.id ? { ...l, status: newStatus } : l));
    
    if (newStatus === 'banned') {
      toast.error(language === 'ar' ? `تم حظر الرابط ${link.short}` : `Link ${link.short} banned`);
    } else {
      toast.success(language === 'ar' ? `تم فك الحظر عن الرابط ${link.short}` : `Link ${link.short} unbanned`);
    }
    setActionLoading(null);
  };

  const handleDelete = async (link: LinkItem) => {
    setActionLoading(link.id);
    await new Promise(r => setTimeout(r, 500));
    
    setLinks(prev => prev.filter(l => l.id !== link.id));
    toast.success(language === 'ar' ? `تم حذف الرابط ${link.short}` : `Link ${link.short} deleted`);
    setActionLoading(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {language === 'ar' ? 'إدارة الروابط' : 'Manage Links'}
          </h1>
          <p className="text-muted-foreground">
            {filteredLinks.length} {language === 'ar' ? 'رابط' : 'links'}
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
        </div>
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
                {filteredLinks.map((link) => (
                  <tr key={link.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-emerald-500" />
                        <span className="font-mono text-emerald-600">lalinky.com/{link.short}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => handleCopy(link.short)}
                        >
                          {copied === link.short ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleView(link)}
                          title={language === 'ar' ? 'فتح الرابط' : 'Open link'}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        {link.status !== 'banned' ? (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleToggleStatus(link)}
                            disabled={actionLoading === link.id}
                            title={link.status === 'active' 
                              ? (language === 'ar' ? 'إيقاف' : 'Pause')
                              : (language === 'ar' ? 'تفعيل' : 'Activate')
                            }
                          >
                            {actionLoading === link.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : link.status === 'active' ? (
                              <Pause className="w-4 h-4 text-amber-500" />
                            ) : (
                              <Play className="w-4 h-4 text-emerald-500" />
                            )}
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleBan(link)}
                            disabled={actionLoading === link.id}
                            title={language === 'ar' ? 'فك الحظر' : 'Unban'}
                          >
                            {actionLoading === link.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4 text-emerald-500" />
                            )}
                          </Button>
                        )}
                        {link.status !== 'banned' && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleBan(link)}
                            disabled={actionLoading === link.id}
                            title={language === 'ar' ? 'حظر' : 'Ban'}
                          >
                            <Ban className="w-4 h-4 text-red-500" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDelete(link)}
                          disabled={actionLoading === link.id}
                          title={language === 'ar' ? 'حذف' : 'Delete'}
                        >
                          {actionLoading === link.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 text-red-500" />
                          )}
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
