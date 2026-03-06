'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Link2,
  BarChart3,
  Wallet,
  Users,
  Settings,
  HelpCircle,
  Crown,
  FileText,
  TrendingUp,
  History,
  CreditCard,
  Globe,
  Database,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  type: 'user' | 'vip' | 'admin';
}

const userMenuItems = [
  { href: '/dashboard', icon: LayoutDashboard, labelAr: 'لوحة التحكم', labelEn: 'Dashboard' },
  { href: '/dashboard/create', icon: Link2, labelAr: 'إنشاء رابط', labelEn: 'Create Link' },
  { href: '/dashboard/links', icon: FileText, labelAr: 'روابطي', labelEn: 'My Links' },
  { href: '/dashboard/analytics', icon: BarChart3, labelAr: 'الإحصائيات', labelEn: 'Analytics' },
  { href: '/dashboard/wallet', icon: Wallet, labelAr: 'المحفظة', labelEn: 'Wallet' },
  { href: '/dashboard/withdraw', icon: CreditCard, labelAr: 'سحب الأرباح', labelEn: 'Withdraw' },
  { href: '/dashboard/referral', icon: Users, labelAr: 'الإحالة', labelEn: 'Referral' },
  { href: '/dashboard/history', icon: History, labelAr: 'سجل المعاملات', labelEn: 'Transactions' },
  { href: '/dashboard/payment-methods', icon: CreditCard, labelAr: 'طرق الدفع', labelEn: 'Payment Methods' },
];

const vipMenuItems = [
  ...userMenuItems,
  { href: '/dashboard/vip-benefits', icon: Crown, labelAr: 'مميزات VIP', labelEn: 'VIP Benefits' },
];

const adminMenuItems = [
  { href: '/admin', icon: LayoutDashboard, labelAr: 'لوحة التحكم', labelEn: 'Dashboard' },
  { href: '/admin/users', icon: Users, labelAr: 'إدارة المستخدمين', labelEn: 'Users' },
  { href: '/admin/links', icon: Link2, labelAr: 'إدارة الروابط', labelEn: 'Links' },
  { href: '/admin/withdrawals', icon: CreditCard, labelAr: 'طلبات السحب', labelEn: 'Withdrawals' },
  { href: '/admin/transactions', icon: History, labelAr: 'المعاملات', labelEn: 'Transactions' },
  { href: '/admin/reports', icon: AlertTriangle, labelAr: 'البلاغات', labelEn: 'Reports' },
  { href: '/admin/settings', icon: Settings, labelAr: 'الإعدادات', labelEn: 'Settings' },
  { href: '/admin/referral', icon: TrendingUp, labelAr: 'نظام الإحالة', labelEn: 'Referral System' },
  { href: '/admin/cms', icon: Globe, labelAr: 'إدارة المحتوى', labelEn: 'CMS' },
  { href: '/admin/pages', icon: FileText, labelAr: 'الصفحات', labelEn: 'Pages' },
  { href: '/admin/blog', icon: FileText, labelAr: 'المدونة', labelEn: 'Blog' },
  { href: '/admin/logs', icon: Database, labelAr: 'سجل النشاط', labelEn: 'Activity Logs' },
];

export function Sidebar({ type }: SidebarProps) {
  const pathname = usePathname();
  const { language, sidebarCollapsed, toggleSidebar } = useAppStore();

  const menuItems = type === 'admin' ? adminMenuItems : type === 'vip' ? vipMenuItems : userMenuItems;

  return (
    <aside
      className={cn(
        "fixed right-0 top-16 h-[calc(100vh-4rem)] border-l bg-background z-40 transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Collapse Button */}
        <div className="flex justify-end p-2 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
          >
            {sidebarCollapsed ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Menu Items */}
        <ScrollArea className="flex-1 py-2">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  title={sidebarCollapsed ? (language === 'ar' ? item.labelAr : item.labelEn) : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="text-sm font-medium">
                      {language === 'ar' ? item.labelAr : item.labelEn}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-2">
          <Link
            href="/help"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title={sidebarCollapsed ? (language === 'ar' ? 'المساعدة' : 'Help') : undefined}
          >
            <HelpCircle className="h-5 w-5 flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="text-sm font-medium">
                {language === 'ar' ? 'المساعدة' : 'Help'}
              </span>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
}
