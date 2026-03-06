'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { 
  Link2, 
  Copy,
  Trash2,
  Edit,
  BarChart3,
  Eye,
  Pause,
  Play,
  MoreVertical,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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

interface LinkItem {
  id: string;
  shortCode: string;
  targetUrl: string;
  clicks: number;
  earnings: number;
  status: string;
  createdAt: string;
}

export default function LinksPage() {
  const { language } = useAppStore();
  const [links, setLinks] = useState<LinkItem[]>([
    { id: '1', shortCode: 'abc123', targetUrl: 'https://example.com/1', clicks: 150, earnings: 0.15, status: 'active', createdAt: new Date().toISOString() },
    { id: '2', shortCode: 'xyz789', targetUrl: 'https://example.com/2', clicks: 89, earnings: 0.09, status: 'active', createdAt: new Date().toISOString() },
    { id: '3', shortCode: 'test!', targetUrl: 'https://example.com/3', clicks: 45, earnings: 0.05, status: 'paused', createdAt: new Date().toISOString() },
  ]);
  const [search, setSearch] = useState('');

  const filteredLinks = links.filter(link => 
    link.shortCode.toLowerCase().includes(search.toLowerCase()) ||
    link.targetUrl.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = async (code: string) => {
    await navigator.clipboard.writeText(`lalinky.com/${code}`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {language === 'ar' ? 'روابطي' : 'My Links'}
          </h1>
          <p className="text-muted-foreground">
            {links.length} {language === 'ar' ? 'رابط' : 'links'}
          </p>
        </div>
        <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
          <Link href="/dashboard/create">
            <Link2 className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'إنشاء رابط جديد' : 'Create New Link'}
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === 'ar' ? 'بحث في الروابط...' : 'Search links...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredLinks.length === 0 ? (
            <div className="text-center py-8">
              <Link2 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                {search 
                  ? (language === 'ar' ? 'لا توجد نتائج' : 'No results found')
                  : (language === 'ar' ? 'لا توجد روابط بعد' : 'No links yet')}
              </p>
              {!search && (
                <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
                  <Link href="/dashboard/create">
                    {language === 'ar' ? 'إنشاء أول رابط' : 'Create your first link'}
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{language === 'ar' ? 'الرابط المختصر' : 'Short Link'}</TableHead>
                    <TableHead className="hidden md:table-cell">{language === 'ar' ? 'الهدف' : 'Target'}</TableHead>
                    <TableHead className="text-center">{language === 'ar' ? 'النقرات' : 'Clicks'}</TableHead>
                    <TableHead className="text-center">{language === 'ar' ? 'الأرباح' : 'Earnings'}</TableHead>
                    <TableHead className="text-center">{language === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLinks.map((link) => (
                    <TableRow key={link.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-medium text-emerald-600">lalinky.com/{link.shortCode}</code>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-6 w-6"
                            onClick={() => handleCopy(link.shortCode)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm text-muted-foreground truncate max-w-[200px] block">
                          {link.targetUrl}
                        </span>
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {link.clicks}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-emerald-600 font-medium">
                          ${link.earnings.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant={link.status === 'active' ? 'default' : 'secondary'}
                          className={link.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : ''}
                        >
                          {link.status === 'active' 
                            ? (language === 'ar' ? 'نشط' : 'Active')
                            : (language === 'ar' ? 'متوقف' : 'Paused')}
                        </Badge>
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
                              <Eye className="w-4 h-4 mr-2" />
                              {language === 'ar' ? 'عرض' : 'View'}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="w-4 h-4 mr-2" />
                              {language === 'ar' ? 'الإحصائيات' : 'Analytics'}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              {language === 'ar' ? 'تعديل' : 'Edit'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              {link.status === 'active' ? (
                                <>
                                  <Pause className="w-4 h-4 mr-2" />
                                  {language === 'ar' ? 'إيقاف' : 'Pause'}
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 mr-2" />
                                  {language === 'ar' ? 'تفعيل' : 'Activate'}
                                </>
                              )}
                            </DropdownMenuItem>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
