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
  Shield,
  Eye,
  User,
  Calendar,
  Wallet,
  Link2,
  TrendingUp,
  X,
  Check,
  Loader2
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

// Mock data with more details
const initialUsers = [
  { 
    id: '1', 
    name: 'أحمد محمد', 
    email: 'ahmed@example.com', 
    role: 'user', 
    status: 'active', 
    balance: 12.50, 
    referralBalance: 3.20,
    links: 45, 
    totalViews: 1250,
    totalEarnings: 25.80,
    referralCode: 'AHMED2024',
    referrals: 5,
    createdAt: '2024-01-15',
    lastActive: '2024-12-20'
  },
  { 
    id: '2', 
    name: 'Sarah Johnson', 
    email: 'sarah@example.com', 
    role: 'vip', 
    status: 'active', 
    balance: 45.20, 
    referralBalance: 12.50,
    links: 120, 
    totalViews: 5600,
    totalEarnings: 120.50,
    referralCode: 'SARAH2024',
    referrals: 15,
    createdAt: '2024-01-10',
    lastActive: '2024-12-21'
  },
  { 
    id: '3', 
    name: 'محمد علي', 
    email: 'mohamed@example.com', 
    role: 'user', 
    status: 'suspended', 
    balance: 5.00, 
    referralBalance: 0,
    links: 12, 
    totalViews: 320,
    totalEarnings: 8.50,
    referralCode: 'MOHAMED24',
    referrals: 2,
    createdAt: '2024-01-08',
    lastActive: '2024-12-15'
  },
  { 
    id: '4', 
    name: 'Admin User', 
    email: 'admin@linkat.bid', 
    role: 'admin', 
    status: 'active', 
    balance: 0, 
    referralBalance: 0,
    links: 0, 
    totalViews: 0,
    totalEarnings: 0,
    referralCode: 'ADMIN2024',
    referrals: 0,
    createdAt: '2024-01-01',
    lastActive: '2024-12-21'
  },
];

export default function AdminUsersPage() {
  const { language } = useAppStore();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<typeof initialUsers[0] | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const filteredUsers = users.filter(u => 
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

  const handleViewProfile = (user: typeof initialUsers[0]) => {
    setSelectedUser(user);
    setShowProfile(true);
  };

  const handleEdit = (user: typeof initialUsers[0]) => {
    toast.success(language === 'ar' ? `تعديل بيانات ${user.name}` : `Edit ${user.name}'s profile`);
  };

  const handleSendEmail = (user: typeof initialUsers[0]) => {
    toast.success(language === 'ar' ? `تم إرسال رسالة إلى ${user.email}` : `Email sent to ${user.email}`);
  };

  const handleUpgradeVIP = async (user: typeof initialUsers[0]) => {
    setActionLoading(user.id);
    // Simulate API call
    await new Promise(r => setTimeout(r, 800));
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: 'vip' } : u));
    toast.success(language === 'ar' ? `تم ترقية ${user.name} إلى VIP` : `${user.name} upgraded to VIP`);
    setActionLoading(null);
  };

  const handleSuspend = async (user: typeof initialUsers[0]) => {
    setActionLoading(user.id);
    await new Promise(r => setTimeout(r, 800));
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
    toast.success(language === 'ar' 
      ? `تم ${newStatus === 'suspended' ? 'تعليق' : 'تفعيل'} حساب ${user.name}` 
      : `${user.name}'s account ${newStatus === 'suspended' ? 'suspended' : 'activated'}`
    );
    setActionLoading(null);
  };

  const handleBan = async (user: typeof initialUsers[0]) => {
    setActionLoading(user.id);
    await new Promise(r => setTimeout(r, 800));
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: 'banned' } : u));
    toast.error(language === 'ar' ? `تم حظر ${user.name}` : `${user.name} has been banned`);
    setActionLoading(null);
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
                          <Button variant="ghost" size="icon" className="h-8 w-8" disabled={actionLoading === u.id}>
                            {actionLoading === u.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <MoreVertical className="w-4 h-4" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewProfile(u)}>
                            <Eye className="w-4 h-4 mr-2" />
                            {language === 'ar' ? 'عرض الملف' : 'View Profile'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(u)}>
                            <Edit className="w-4 h-4 mr-2" />
                            {language === 'ar' ? 'تعديل' : 'Edit'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendEmail(u)}>
                            <Mail className="w-4 h-4 mr-2" />
                            {language === 'ar' ? 'إرسال رسالة' : 'Send Email'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {u.role !== 'vip' && u.role !== 'admin' && (
                            <DropdownMenuItem onClick={() => handleUpgradeVIP(u)} className="text-amber-600">
                              <Crown className="w-4 h-4 mr-2" />
                              {language === 'ar' ? 'ترقية لـ VIP' : 'Upgrade to VIP'}
                            </DropdownMenuItem>
                          )}
                          {u.status !== 'banned' && (
                            <>
                              {u.status === 'active' ? (
                                <DropdownMenuItem onClick={() => handleSuspend(u)} className="text-amber-600">
                                  <Shield className="w-4 h-4 mr-2" />
                                  {language === 'ar' ? 'تعليق' : 'Suspend'}
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleSuspend(u)} className="text-emerald-600">
                                  <Check className="w-4 h-4 mr-2" />
                                  {language === 'ar' ? 'تفعيل' : 'Activate'}
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleBan(u)} className="text-red-600">
                                <Ban className="w-4 h-4 mr-2" />
                                {language === 'ar' ? 'حظر' : 'Ban'}
                              </DropdownMenuItem>
                            </>
                          )}
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

      {/* User Profile Modal */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {language === 'ar' ? 'الملف الشخصي' : 'User Profile'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6">
              {/* User Header */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                  {selectedUser.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex gap-2 mt-1">
                    {getRoleBadge(selectedUser.role)}
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Wallet className="w-4 h-4" />
                      <span className="text-sm">{language === 'ar' ? 'الرصيد' : 'Balance'}</span>
                    </div>
                    <p className="text-xl font-bold">${selectedUser.balance.toFixed(2)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">{language === 'ar' ? 'أرباح الإحالة' : 'Referral Earnings'}</span>
                    </div>
                    <p className="text-xl font-bold">${selectedUser.referralBalance.toFixed(2)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Link2 className="w-4 h-4" />
                      <span className="text-sm">{language === 'ar' ? 'الروابط' : 'Links'}</span>
                    </div>
                    <p className="text-xl font-bold">{selectedUser.links}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{language === 'ar' ? 'المشاهدات' : 'Views'}</span>
                    </div>
                    <p className="text-xl font-bold">{selectedUser.totalViews.toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">{language === 'ar' ? 'كود الإحالة' : 'Referral Code'}</span>
                  <code className="bg-muted px-2 py-1 rounded">{selectedUser.referralCode}</code>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">{language === 'ar' ? 'عدد الإحالات' : 'Referrals'}</span>
                  <span className="font-medium">{selectedUser.referrals}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">{language === 'ar' ? 'إجمالي الأرباح' : 'Total Earnings'}</span>
                  <span className="font-medium">${selectedUser.totalEarnings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {language === 'ar' ? 'تاريخ التسجيل' : 'Joined'}
                  </span>
                  <span className="font-medium">{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">{language === 'ar' ? 'آخر نشاط' : 'Last Active'}</span>
                  <span className="font-medium">{new Date(selectedUser.lastActive).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleSendEmail(selectedUser)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'إرسال رسالة' : 'Send Email'}
                </Button>
                <Button 
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => handleEdit(selectedUser)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'تعديل' : 'Edit'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
