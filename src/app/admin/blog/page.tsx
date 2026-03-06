'use client';

import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';

export default function AdminBlogPage() {
  const { language } = useAppStore();

  const posts = [
    { 
      slug: 'how-to-earn', 
      title: language === 'ar' ? 'كيف تربح من الروابط' : 'How to Earn from Links', 
      views: 1234, 
      status: 'published',
      date: '2024-01-15',
      author: 'Admin'
    },
    { 
      slug: 'referral-guide', 
      title: language === 'ar' ? 'دليل الإحالة الشامل' : 'Complete Referral Guide', 
      views: 567, 
      status: 'draft',
      date: '2024-01-14',
      author: 'Admin'
    },
    { 
      slug: 'usdt-withdrawal', 
      title: language === 'ar' ? 'كيفية السحب بالـ USDT' : 'How to Withdraw USDT', 
      views: 2341, 
      status: 'published',
      date: '2024-01-10',
      author: 'Admin'
    },
    { 
      slug: 'vip-benefits', 
      title: language === 'ar' ? 'مميزات حساب VIP' : 'VIP Account Benefits', 
      views: 890, 
      status: 'published',
      date: '2024-01-05',
      author: 'Admin'
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      published: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
      draft: 'bg-muted text-muted-foreground',
    };
    const labels: Record<string, string> = {
      published: language === 'ar' ? 'منشور' : 'Published',
      draft: language === 'ar' ? 'مسودة' : 'Draft',
    };
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {language === 'ar' ? 'المدونة' : 'Blog'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar' ? 'إدارة المقالات والمحتوى' : 'Manage articles and content'}
          </p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 ml-2" />
          {language === 'ar' ? 'مقال جديد' : 'New Post'}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'المقال' : 'Post'}</th>
                  <th className="text-center p-4 font-medium">{language === 'ar' ? 'المشاهدات' : 'Views'}</th>
                  <th className="text-center p-4 font-medium">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="text-right p-4 font-medium">{language === 'ar' ? 'التاريخ' : 'Date'}</th>
                  <th className="text-center p-4 font-medium">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.slug} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{p.title}</p>
                          <p className="text-xs text-muted-foreground">/{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        {p.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4 text-center">{getStatusBadge(p.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {p.date}
                      </div>
                    </td>
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
