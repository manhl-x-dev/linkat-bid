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
  Check,
  Loader2,
  Send,
  ArrowDown,
  UserPlus,
  Trash2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
  const [showEdit, setShowEdit] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  
  // Add new user state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'user' | 'vip'>('user');
  
  // Delete mode state
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<string[]>([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setShowEdit(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedUser) return;
    setActionLoading(selectedUser.id);
    await new Promise(r => setTimeout(r, 500));
    setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, name: editName, email: editEmail } : u));
    toast.success(language === 'ar' ? 'تم تحديث البيانات بنجاح' : 'Profile updated successfully');
    setShowEdit(false);
    setActionLoading(null);
  };

  const handleSendEmail = (user: typeof initialUsers[0]) => {
    setSelectedUser(user);
    setEmailSubject('');
    setEmailBody('');
    setShowEmail(true);
  };

  const handleSendEmailSubmit = async () => {
    if (!selectedUser || !emailSubject || !emailBody) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
      return;
    }
    setActionLoading(selectedUser.id);
    await new Promise(r => setTimeout(r, 800));
    toast.success(language === 'ar' ? `تم إرسال الرسالة إلى ${selectedUser.email}` : `Email sent to ${selectedUser.email}`);
    setShowEmail(false);
    setActionLoading(null);
  };

  const handleUpgradeVIP = async (user: typeof initialUsers[0]) => {
    setActionLoading(user.id);
    await new Promise(r => setTimeout(r, 800));
    const newRole = user.role === 'vip' ? 'user' : 'vip';
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: newRole } : u));
    toast.success(language === 'ar' 
      ? newRole === 'vip' ? `تم ترقية ${user.name} إلى VIP` : `تم إلغاء VIP من ${user.name}`
      : newRole === 'vip' ? `${user.name} upgraded to VIP` : `${user.name} downgraded from VIP`
    );
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
    const newStatus = user.status === 'banned' ? 'active' : 'banned';
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
    if (newStatus === 'banned') {
      toast.error(language === 'ar' ? `تم حظر ${user.name}` : `${user.name} has been banned`);
    } else {
      toast.success(language === 'ar' ? `تم فك الحظر عن ${user.name}` : `${user.name} has been unbanned`);
    }
    setActionLoading(null);
  };

  // Add new user handlers
  const handleAddUser = async () => {
    if (!newName || !newEmail || !newPassword) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
      return;
    }
    setActionLoading('new');
    
    try {
      const res = await fetch('/api/admin/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          password: newPassword,
          role: newRole
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.error || (language === 'ar' ? 'حدث خطأ' : 'An error occurred'));
        setActionLoading(null);
        return;
      }
      
      // Add the new user to the local state
      const newUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        status: data.user.status,
        balance: 0,
        referralBalance: 0,
        links: 0,
        totalViews: 0,
        totalEarnings: 0,
        referralCode: data.user.referralCode,
        referrals: 0,
        createdAt: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0]
      };
      
      setUsers(prev => [...prev, newUser]);
      toast.success(language === 'ar' ? `تم إضافة المستخدم ${newName} بنجاح في Firebase Auth وقاعدة البيانات` : `User ${newName} added to Firebase Auth and Database`);
      setShowAddUser(false);
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setNewRole('user');
    } catch (error) {
      toast.error(language === 'ar' ? 'حدث خطأ في الاتصال' : 'Connection error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCloseAddUser = () => {
    setShowAddUser(false);
    setNewName('');
    setNewEmail('');
    setNewPassword('');
    setNewRole('user');
  };

  // Delete handlers
  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    setSelectedForDelete([]);
  };

  const toggleSelectUser = (userId: string) => {
    setSelectedForDelete(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    if (selectedForDelete.length === filteredUsers.length) {
      setSelectedForDelete([]);
    } else {
      setSelectedForDelete(filteredUsers.map(u => u.id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedForDelete.length === 0) {
      toast.error(language === 'ar' ? 'لم يتم تحديد أي مستخدم' : 'No users selected');
      return;
    }
    setDeleteLoading(true);
    
    try {
      const res = await fetch('/api/admin/users/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIds: selectedForDelete })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.error || (language === 'ar' ? 'حدث خطأ' : 'An error occurred'));
        setDeleteLoading(false);
        return;
      }
      
      // Remove deleted users from local state
      setUsers(prev => prev.filter(u => !selectedForDelete.includes(u.id)));
      
      if (data.failed > 0) {
        toast.warning(language === 'ar' 
          ? `تم حذف ${data.deleted} مستخدم، فشل حذف ${data.failed}` 
          : `${data.deleted} users deleted, ${data.failed} failed`
        );
      } else {
        toast.success(language === 'ar' 
          ? `تم حذف ${data.deleted} مستخدم من Firebase Auth وقاعدة البيانات` 
          : `${data.deleted} users deleted from Firebase Auth and Database`
        );
      }
      
      setSelectedForDelete([]);
      setDeleteMode(false);
    } catch (error) {
      toast.error(language === 'ar' ? 'حدث خطأ في الاتصال' : 'Connection error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectedForDelete([]);
    setDeleteMode(false);
  };

  // Update selected user when users change
  const currentUser = selectedUser ? users.find(u => u.id === selectedUser.id) : null;

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
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10"
            />
          </div>
          <Button 
            onClick={() => setShowAddUser(true)}
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            <UserPlus className="w-4 h-4 ml-1" />
            <span className="hidden sm:inline">{language === 'ar' ? 'إضافة' : 'Add'}</span>
          </Button>
        </div>
      </div>

      {/* Delete Mode Bar */}
      {deleteMode && (
        <div className="flex items-center justify-between p-3 mb-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center gap-2">
            <Checkbox 
              checked={selectedForDelete.length === filteredUsers.length && filteredUsers.length > 0}
              onCheckedChange={selectAllUsers}
            />
            <span className="text-sm">
              {language === 'ar' 
                ? `تم تحديد ${selectedForDelete.length} من ${filteredUsers.length}`
                : `${selectedForDelete.length} of ${filteredUsers.length} selected`
              }
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCancelDelete}
            >
              <X className="w-4 h-4 ml-1" />
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleDeleteSelected}
              disabled={selectedForDelete.length === 0 || deleteLoading}
            >
              {deleteLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Trash2 className="w-4 h-4 ml-1" />
                  {language === 'ar' ? 'تأكيد الحذف' : 'Confirm Delete'}
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Delete Toggle Button */}
      {!deleteMode && (
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleDeleteMode}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <Trash2 className="w-4 h-4 ml-1" />
            {language === 'ar' ? 'حذف مستخدمين' : 'Delete Users'}
          </Button>
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {deleteMode && (
                    <TableHead className="w-12">
                      <Checkbox 
                        checked={selectedForDelete.length === filteredUsers.length && filteredUsers.length > 0}
                        onCheckedChange={selectAllUsers}
                      />
                    </TableHead>
                  )}
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
                  <TableRow key={u.id} className={selectedForDelete.includes(u.id) ? 'bg-red-50 dark:bg-red-950/50' : ''}>
                    {deleteMode && (
                      <TableCell>
                        <Checkbox 
                          checked={selectedForDelete.includes(u.id)}
                          onCheckedChange={() => toggleSelectUser(u.id)}
                        />
                      </TableCell>
                    )}
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
                          <Button variant="ghost" size="icon" className="h-8 w-8" disabled={actionLoading === u.id || deleteMode}>
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
                          {u.role !== 'admin' && (
                            <DropdownMenuItem 
                              onClick={() => handleUpgradeVIP(u)} 
                              className={u.role === 'vip' ? 'text-muted-foreground' : 'text-amber-600'}
                            >
                              {u.role === 'vip' ? (
                                <>
                                  <ArrowDown className="w-4 h-4 mr-2" />
                                  {language === 'ar' ? 'إلغاء VIP' : 'Downgrade from VIP'}
                                </>
                              ) : (
                                <>
                                  <Crown className="w-4 h-4 mr-2" />
                                  {language === 'ar' ? 'ترقية لـ VIP' : 'Upgrade to VIP'}
                                </>
                              )}
                            </DropdownMenuItem>
                          )}
                          {u.status === 'active' ? (
                            <DropdownMenuItem onClick={() => handleSuspend(u)} className="text-amber-600">
                              <Shield className="w-4 h-4 mr-2" />
                              {language === 'ar' ? 'تعليق' : 'Suspend'}
                            </DropdownMenuItem>
                          ) : u.status === 'suspended' ? (
                            <DropdownMenuItem onClick={() => handleSuspend(u)} className="text-emerald-600">
                              <Check className="w-4 h-4 mr-2" />
                              {language === 'ar' ? 'تفعيل' : 'Activate'}
                            </DropdownMenuItem>
                          ) : null}
                          {u.status === 'banned' ? (
                            <DropdownMenuItem onClick={() => handleBan(u)} className="text-emerald-600">
                              <Check className="w-4 h-4 mr-2" />
                              {language === 'ar' ? 'فك الحظر' : 'Unban'}
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleBan(u)} className="text-red-600">
                              <Ban className="w-4 h-4 mr-2" />
                              {language === 'ar' ? 'حظر' : 'Ban'}
                            </DropdownMenuItem>
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

      {/* Add User Modal */}
      <Dialog open={showAddUser} onOpenChange={handleCloseAddUser}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              {language === 'ar' ? 'إضافة مستخدم جديد' : 'Add New User'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>{language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *</Label>
              <Input 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل الاسم' : 'Enter name'}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'} *</Label>
              <Input 
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder={language === 'ar' ? 'example@email.com' : 'example@email.com'}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>{language === 'ar' ? 'كلمة المرور' : 'Password'} *</Label>
              <Input 
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password'}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>{language === 'ar' ? 'نوع الحساب' : 'Account Type'}</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant={newRole === 'user' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNewRole('user')}
                  className={newRole === 'user' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
                >
                  {language === 'ar' ? 'مستخدم عادي' : 'Regular User'}
                </Button>
                <Button
                  type="button"
                  variant={newRole === 'vip' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNewRole('vip')}
                  className={newRole === 'vip' ? 'bg-amber-500 hover:bg-amber-600' : ''}
                >
                  VIP
                </Button>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleCloseAddUser}
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button 
                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                onClick={handleAddUser}
                disabled={actionLoading === 'new' || !newName || !newEmail || !newPassword}
              >
                {actionLoading === 'new' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 ml-1" />
                    {language === 'ar' ? 'إضافة' : 'Add'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Profile Modal - Smaller */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <User className="w-4 h-4" />
              {language === 'ar' ? 'الملف الشخصي' : 'User Profile'}
            </DialogTitle>
          </DialogHeader>
          
          {currentUser && (
            <div className="space-y-4">
              {/* User Header */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-lg font-bold">
                  {currentUser.name[0]}
                </div>
                <div>
                  <h3 className="font-bold">{currentUser.name}</h3>
                  <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                  <div className="flex gap-1 mt-1">
                    {getRoleBadge(currentUser.role)}
                    {getStatusBadge(currentUser.status)}
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2">
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <Wallet className="w-3 h-3" />
                      <span className="text-xs">{language === 'ar' ? 'الرصيد' : 'Balance'}</span>
                    </div>
                    <p className="font-bold">${currentUser.balance.toFixed(2)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs">{language === 'ar' ? 'الإحالات' : 'Referrals'}</span>
                    </div>
                    <p className="font-bold">${currentUser.referralBalance.toFixed(2)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <Link2 className="w-3 h-3" />
                      <span className="text-xs">{language === 'ar' ? 'الروابط' : 'Links'}</span>
                    </div>
                    <p className="font-bold">{currentUser.links}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-1 text-muted-foreground mb-1">
                      <Eye className="w-3 h-3" />
                      <span className="text-xs">{language === 'ar' ? 'المشاهدات' : 'Views'}</span>
                    </div>
                    <p className="font-bold">{currentUser.totalViews.toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-1.5 border-b">
                  <span className="text-muted-foreground">{language === 'ar' ? 'كود الإحالة' : 'Referral Code'}</span>
                  <code className="bg-muted px-2 py-0.5 rounded text-xs">{currentUser.referralCode}</code>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b">
                  <span className="text-muted-foreground">{language === 'ar' ? 'إجمالي الأرباح' : 'Total Earnings'}</span>
                  <span className="font-medium">${currentUser.totalEarnings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {language === 'ar' ? 'التسجيل' : 'Joined'}
                  </span>
                  <span className="font-medium">{new Date(currentUser.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setShowProfile(false);
                    handleSendEmail(currentUser);
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'رسالة' : 'Email'}
                </Button>
                <Button 
                  size="sm"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => {
                    setShowProfile(false);
                    handleEdit(currentUser);
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'تعديل' : 'Edit'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              {language === 'ar' ? 'تعديل المستخدم' : 'Edit User'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>{language === 'ar' ? 'الاسم' : 'Name'}</Label>
              <Input 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
              <Input 
                type="email"
                value={editEmail} 
                onChange={(e) => setEditEmail(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowEdit(false)}
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button 
                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                onClick={handleSaveEdit}
                disabled={actionLoading === selectedUser?.id}
              >
                {actionLoading === selectedUser?.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  language === 'ar' ? 'حفظ' : 'Save'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Email Modal */}
      <Dialog open={showEmail} onOpenChange={setShowEmail}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {language === 'ar' ? 'إرسال رسالة' : 'Send Email'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>{language === 'ar' ? 'إلى' : 'To'}</Label>
              <Input 
                value={selectedUser?.email || ''} 
                disabled
                className="mt-1.5 bg-muted"
              />
            </div>
            <div>
              <Label>{language === 'ar' ? 'الموضوع' : 'Subject'}</Label>
              <Input 
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder={language === 'ar' ? 'موضوع الرسالة...' : 'Email subject...'}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>{language === 'ar' ? 'الرسالة' : 'Message'}</Label>
              <Textarea 
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder={language === 'ar' ? 'محتوى الرسالة...' : 'Email content...'}
                className="mt-1.5"
                rows={4}
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowEmail(false)}
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button 
                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                onClick={handleSendEmailSubmit}
                disabled={actionLoading === selectedUser?.id || !emailSubject || !emailBody}
              >
                {actionLoading === selectedUser?.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 ml-1" />
                    {language === 'ar' ? 'إرسال' : 'Send'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
