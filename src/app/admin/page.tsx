'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { 
  Users, 
  Link2, 
  Wallet,
  AlertTriangle,
  DollarSign,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  const { language } = useAppStore();
  const [stats] = useState({
    totalUsers: 1234,
    totalLinks: 5678,
    totalClicks: 123456,
    totalEarnings: 1234.56,
    pendingWithdrawals: 5,
    pendingReports: 2,
    todaySignups: 12,
    todayClicks: 1234
  });

  const statCards = [
    {
      title: language === 'ar' ? 'المستخدمين' : 'Users',
      value: stats.totalUsers.toLocaleString(),
      change: `+${stats.todaySignups} ${language === 'ar' ? 'اليوم' : 'today'}`,
      icon: Users,
      color: 'text-emerald-500'
    },
    {
      title: language === 'ar' ? 'الروابط' : 'Links',
      value: stats.totalLinks.toLocaleString(),
      change: '+23 ' + (language === 'ar' ? 'جديد' : 'new'),
      icon: Link2,
      color: 'text-blue-500'
    },
    {
      title: language === 'ar' ? 'النقرات' : 'Clicks',
      value: stats.totalClicks.toLocaleString(),
      change: `+${stats.todayClicks.toLocaleString()} ${language === 'ar' ? 'اليوم' : 'today'}`,
      icon: Activity,
      color: 'text-purple-500'
    },
    {
      title: language === 'ar' ? 'الأرباح' : 'Revenue',
      value: `$${stats.totalEarnings.toFixed(2)}`,
      change: '+$45.23 ' + (language === 'ar' ? 'اليوم' : 'today'),
      icon: DollarSign,
      color: 'text-amber-500'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {language === 'ar' ? 'لوحة تحكم المدير' : 'Admin Dashboard'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' ? 'إحصائيات وإدارة الموقع' : 'Site statistics and management'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-emerald-600">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Card className="border-amber-200 dark:border-amber-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-amber-500" />
                {language === 'ar' ? 'طلبات السحب المعلقة' : 'Pending Withdrawals'}
              </CardTitle>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/withdrawals">
                {language === 'ar' ? 'عرض' : 'View'}
                <ArrowUpRight className="w-4 h-4 mr-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{stats.pendingWithdrawals}</div>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'بانتظار المعالجة' : 'Awaiting processing'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-200 dark:border-red-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                {language === 'ar' ? 'البلاغات المعلقة' : 'Pending Reports'}
              </CardTitle>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/reports">
                {language === 'ar' ? 'عرض' : 'View'}
                <ArrowUpRight className="w-4 h-4 mr-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.pendingReports}</div>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'بانتظار المراجعة' : 'Awaiting review'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button asChild variant="outline" className="h-20 flex-col gap-2">
              <Link href="/admin/users">
                <Users className="w-5 h-5" />
                <span className="text-xs">{language === 'ar' ? 'المستخدمين' : 'Users'}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2">
              <Link href="/admin/links">
                <Link2 className="w-5 h-5" />
                <span className="text-xs">{language === 'ar' ? 'الروابط' : 'Links'}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2">
              <Link href="/admin/cms">
                <Activity className="w-5 h-5" />
                <span className="text-xs">{language === 'ar' ? 'المحتوى' : 'CMS'}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2">
              <Link href="/admin/settings">
                <DollarSign className="w-5 h-5" />
                <span className="text-xs">{language === 'ar' ? 'الإعدادات' : 'Settings'}</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
