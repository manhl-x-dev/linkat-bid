'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Edit, Trash2, Eye, ExternalLink } from 'lucide-react';

export default function AdminPagesPage() {
  const { language } = useAppStore();

  const pages = [
    { slug: 'privacy', title: language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy', views: 2345, lastUpdated: '2024-01-15' },
    { slug: 'terms', title: language === 'ar' ? 'شروط الخدمة' : 'Terms of Service', views: 1876, lastUpdated: '2024-01-10' },
    { slug: 'faq', title: language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ', views: 3421, lastUpdated: '2024-01-08' },
    { slug: 'about', title: language === 'ar' ? 'حول الموقع' : 'About Us', views: 987, lastUpdated: '2024-01-05' },
    { slug: 'contact', title: language === 'ar' ? 'اتصل بنا' : 'Contact Us', views: 654, lastUpdated: '2024-01-01' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {language === 'ar' ? 'الصفحات' : 'Pages'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar' ? 'إدارة صفحات الموقع الثابتة' : 'Manage static site pages'}
          </p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 ml-2" />
          {language === 'ar' ? 'صفحة جديدة' : 'New Page'}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'الصفحة' : 'Page'}</th>
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'الرابط' : 'URL'}</th>
                  <th className="text-center p-4 font-medium">{language === 'ar' ? 'المشاهدات' : 'Views'}</th>
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'آخر تحديث' : 'Last Updated'}</th>
                  <th className="text-center p-4 font-medium">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((p) => (
                  <tr key={p.slug} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">{p.title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <a 
                        href={`/${p.slug}`} 
                        className="text-emerald-600 hover:underline flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        /{p.slug}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        {p.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{p.lastUpdated}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
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
