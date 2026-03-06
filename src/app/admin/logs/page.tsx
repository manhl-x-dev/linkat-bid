'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Link2, Wallet, Database, Search, Filter, UserPlus, Settings, Shield, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function AdminLogsPage() {
  const { language } = useAppStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const logs = [
    { id: 1, action: 'user_login', user: 'test@test.com', details: 'IP: 192.168.1.1', date: '2024-01-15 10:30', type: 'user' },
    { id: 2, action: 'link_created', user: 'demo@test.com', details: 'Short: abc123', date: '2024-01-15 10:25', type: 'link' },
    { id: 3, action: 'withdrawal_request', user: 'vip@test.com', details: 'Amount: $50', date: '2024-01-15 10:20', type: 'wallet' },
    { id: 4, action: 'user_register', user: 'new@test.com', details: 'Referred by: promo@test.com', date: '2024-01-15 10:15', type: 'user' },
    { id: 5, action: 'link_paused', user: 'admin@lalinky.com', details: 'Link: xyz789', date: '2024-01-15 10:10', type: 'link' },
    { id: 6, action: 'settings_updated', user: 'admin@lalinky.com', details: 'Changed: commission_rate', date: '2024-01-15 10:00', type: 'settings' },
    { id: 7, action: 'user_banned', user: 'admin@lalinky.com', details: 'Banned: spam@test.com', date: '2024-01-14 16:45', type: 'security' },
    { id: 8, action: 'report_created', user: 'user@test.com', details: 'Link: bad123, Reason: Spam', date: '2024-01-14 16:30', type: 'security' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'user': return UserPlus;
      case 'link': return Link2;
      case 'wallet': return Wallet;
      case 'settings': return Settings;
      case 'security': return Shield;
      default: return Database;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'user': return 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900';
      case 'link': return 'text-blue-500 bg-blue-100 dark:bg-blue-900';
      case 'wallet': return 'text-amber-500 bg-amber-100 dark:bg-amber-900';
      case 'settings': return 'text-purple-500 bg-purple-100 dark:bg-purple-900';
      case 'security': return 'text-red-500 bg-red-100 dark:bg-red-900';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getActionLabel = (action: string) => {
    const labels: Record<string, { ar: string; en: string }> = {
      user_login: { ar: 'تسجيل دخول', en: 'User Login' },
      user_register: { ar: 'تسجيل مستخدم جديد', en: 'User Registration' },
      user_banned: { ar: 'حظر مستخدم', en: 'User Banned' },
      link_created: { ar: 'إنشاء رابط', en: 'Link Created' },
      link_paused: { ar: 'إيقاف رابط', en: 'Link Paused' },
      withdrawal_request: { ar: 'طلب سحب', en: 'Withdrawal Request' },
      settings_updated: { ar: 'تحديث الإعدادات', en: 'Settings Updated' },
      report_created: { ar: 'بلاغ جديد', en: 'Report Created' },
    };
    return labels[action] || { ar: action, en: action };
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(search.toLowerCase()) ||
                          log.details.toLowerCase().includes(search.toLowerCase()) ||
                          log.action.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || log.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'ar' ? 'سجل النشاط' : 'Activity Logs'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' ? 'تتبع جميع الأنشطة في الموقع' : 'Track all site activities'}
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all', 'user', 'link', 'wallet', 'settings', 'security'].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(f)}
                  className={filter === f ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
                >
                  {f === 'all' ? (language === 'ar' ? 'الكل' : 'All') :
                   f === 'user' ? (language === 'ar' ? 'مستخدمين' : 'Users') :
                   f === 'link' ? (language === 'ar' ? 'روابط' : 'Links') :
                   f === 'wallet' ? (language === 'ar' ? 'محفظة' : 'Wallet') :
                   f === 'settings' ? (language === 'ar' ? 'إعدادات' : 'Settings') :
                   (language === 'ar' ? 'أمان' : 'Security')}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredLogs.map((log) => {
              const Icon = getIcon(log.type);
              const iconColor = getIconColor(log.type);
              const label = getActionLabel(log.action);
              
              return (
                <div key={log.id} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-medium">
                          {language === 'ar' ? label.ar : label.en}
                        </span>
                        <code className="text-xs bg-muted px-2 py-0.5 rounded">
                          {log.action}
                        </code>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.details}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{language === 'ar' ? 'المستخدم:' : 'User:'} {log.user}</span>
                        <span>{log.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
