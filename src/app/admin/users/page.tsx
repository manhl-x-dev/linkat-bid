'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { 
  Search,
  MoreVertical,
  Ban,
  Crown,
  Edit,
  Mail,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
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

// Mock data
const mockUsers = [
  { id: '1', name: 'أحمد محمد', email: 'ahmed@example.com', role: 'user', status: 'active', balance: 12.50, links: 45, createdAt: '2024-01-15' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'vip', status: 'active', balance: 45.20, links: 120, createdAt: '2024-01-10' },
  { id: '3', name: 'محمد علي', email: 'mohamed@example.com', role: 'user', status: 'suspended', balance: 5.00, links: 12, createdAt: '2024-01-08' },
  { id: '4', name: 'Admin User', email: 'admin@linkat.bid', role: 'admin', status: 'active', balance: 0, links: 0, createdAt: '2024-01-01' },
];

export default function AdminUsersPage() {
  const { language } = useAppStore();
  const [search, setSearch] = useState('');

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      admin: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      vip: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
      user: 'bg-muted text-muted-foreground',
    };
    const labels: Record<string, string> = {
      admin: language === 'ar' ? 'مدير' : 'Admin',
      vip: 'VIP',
      user: language === 'ar' ? 'مستخدم' : 'User',
    };
    return <Badge className={styles[role]}>{labels[role]}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
      suspended: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
      banned: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    };
    const labels: Record<string, string> = {
      active: language === 'ar' ? 'نشط' : 'Active',
      suspended: language === 'ar' ? 'معلق' : 'Suspended',
      banned: language === 'ar' ? 'محظور' : 'Banned',
    };
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {language === 'ar' ? 'إدارة المستخدمين' : 'Users Management'}
          </h1>
          <p className="text-muted-foreground">
            {filteredUsers.length} {language === 'ar' ? 'مستخدم' : 'users'}
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'ar' ? 'المستخدم' : 'User'}</TableHead>
                  <TableHead>{language === 'ar' ? 'الدور' : 'Role'}</TableHead>
                  <TableHead>{language === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                  <TableHead className="text-center">{language === 'ar' ? 'الرصيد' : 'Balance'}</TableHead>
                  <TableHead className="text-center">{language === 'ar' ? 'الروابط' : 'Links'}</TableHead>
                  <TableHead className="hidden md:table-cell">{language === 'ar' ? 'التسجيل' : 'Joined'}</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-medium">
                          {u.name[0]}
                        </div>
                        <div>
                          <div className="font-medium">{u.name}</div>
                          <div className="text-xs text-muted-foreground">{u.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(u.role)}</TableCell>
                    <TableCell>{getStatusBadge(u.status)}</TableCell>
                    <TableCell className="text-center font-medium">
                      ${u.balance.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">{u.links}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString()}
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
                            <Mail className="w-4 h-4 mr-2" />
                            {language === 'ar' ? 'إرسال رسالة' : 'Send Email'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {u.role !== 'vip' && (
                            <DropdownMenuItem>
                              <Crown className="w-4 h-4 mr-2" />
                              {language === 'ar' ? 'ترقية لـ VIP' : 'Upgrade to VIP'}
                            </DropdownMenuItem>
                          )}
                          {u.status === 'active' ? (
                            <DropdownMenuItem className="text-amber-600">
                              <Shield className="w-4 h-4 mr-2" />
                              {language === 'ar' ? 'تعليق' : 'Suspend'}
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-emerald-600">
                              <Shield className="w-4 h-4 mr-2" />
                              {language === 'ar' ? 'تفعيل' : 'Activate'}
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Ban className="w-4 h-4 mr-2" />
                            {language === 'ar' ? 'حظر' : 'Ban'}
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
    </div>
  );
}
