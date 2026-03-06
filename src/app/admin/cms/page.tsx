'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { 
  Plus,
  Search,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  Globe,
  FileText,
  Layout
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock CMS pages
const mockPages = [
  { id: '1', slug: 'blog', title: 'المدونة', type: 'blog', isPublished: true, views: 1234, createdAt: '2024-01-15' },
  { id: '2', slug: 'about', title: 'حول الموقع', type: 'page', isPublished: true, views: 567, createdAt: '2024-01-10' },
  { id: '3', slug: 'offers', title: 'العروض', type: 'landing', isPublished: false, views: 0, createdAt: '2024-01-08' },
  { id: '4', slug: 'vip-benefits', title: 'مميزات VIP', type: 'landing', isPublished: true, views: 890, createdAt: '2024-01-05' },
];

export default function AdminCMSPage() {
  const { language } = useAppStore();
  const [search, setSearch] = useState('');

  const filteredPages = mockPages.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const getTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      page: 'bg-muted text-muted-foreground',
      blog: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
      landing: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    };
    const labels: Record<string, string> = {
      page: language === 'ar' ? 'صفحة' : 'Page',
      blog: language === 'ar' ? 'مدونة' : 'Blog',
      landing: language === 'ar' ? 'هبوط' : 'Landing',
    };
    return <Badge className={styles[type]}>{labels[type]}</Badge>;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {language === 'ar' ? 'إدارة المحتوى (CMS)' : 'Content Management (CMS)'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar' ? 'إنشاء وتحرير صفحات الموقع' : 'Create and edit site pages'}
          </p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'صفحة جديدة' : 'New Page'}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'ar' ? 'العنوان' : 'Title'}</TableHead>
                  <TableHead>{language === 'ar' ? 'الرابط' : 'Slug'}</TableHead>
                  <TableHead>{language === 'ar' ? 'النوع' : 'Type'}</TableHead>
                  <TableHead className="text-center">{language === 'ar' ? 'المشاهدات' : 'Views'}</TableHead>
                  <TableHead className="text-center">{language === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        /{page.slug}
                      </code>
                    </TableCell>
                    <TableCell>{getTypeBadge(page.type)}</TableCell>
                    <TableCell className="text-center">{page.views.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      {page.isPublished ? (
                        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                          {language === 'ar' ? 'منشور' : 'Published'}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          {language === 'ar' ? 'مسودة' : 'Draft'}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            {language === 'ar' ? 'تعديل' : 'Edit'}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            {language === 'ar' ? 'معاينة' : 'Preview'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            {language === 'ar' ? 'حذف' : 'Delete'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="w-4 h-4" />
            {language === 'ar' ? 'ملاحظة' : 'Note'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {language === 'ar' 
              ? 'عندما يحاول مستخدم إنشاء رابط بنفس اسم صفحة CMS، سيتم تطبيق المعالجة الذكية وإضافة رمز خاص (مثل blog!) لتمييز الرابط.'
              : 'When a user tries to create a link with the same name as a CMS page, smart processing will be applied and a special symbol (like blog!) will be added to distinguish the link.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
