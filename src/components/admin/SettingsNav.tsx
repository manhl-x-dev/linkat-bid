'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Settings, ShieldCheck, Mail, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

const settingsTabs = [
  { 
    id: 'general', 
    href: '/admin/settings',
    icon: Settings, 
    labelAr: 'الإعدادات العامة', 
    labelEn: 'General Settings' 
  },
  { 
    id: 'reserved-words', 
    href: '/admin/reserved-words',
    icon: ShieldCheck, 
    labelAr: 'الكلمات المحجوزة', 
    labelEn: 'Reserved Words' 
  },
  { 
    id: 'email-templates', 
    href: '/admin/email-templates',
    icon: Mail, 
    labelAr: 'قوالب الإيميل', 
    labelEn: 'Email Templates' 
  },
  { 
    id: 'branding', 
    href: '/admin/branding',
    icon: Palette, 
    labelAr: 'الهوية البصرية', 
    labelEn: 'Branding' 
  },
];

export function SettingsNav() {
  const pathname = usePathname();
  const { language } = useAppStore();

  return (
    <div className="flex flex-wrap gap-2 mb-6 p-1 bg-muted/50 rounded-lg">
      {settingsTabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
              isActive 
                ? "bg-background shadow-sm text-emerald-600" 
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {language === 'ar' ? tab.labelAr : tab.labelEn}
          </Link>
        );
      })}
    </div>
  );
}
