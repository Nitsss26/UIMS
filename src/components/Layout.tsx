import { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useApp, useAuth } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
// import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  CalendarCheck,
  BookOpen,
  Clock,
  FileText,
  IndianRupee,
  Wallet,
  Bus,
  Building2,
  Library,
  Trophy,
  Bell,
  BarChart3,
  Settings,
  // CreditCard,
  LogOut,
  Menu,
  ChevronDown,
  Bell as BellIcon,
  Search,
  X,
  GraduationCap,
  School,
  IdCard,
} from 'lucide-react';

interface NavItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  items?: { title: string; href: string }[];
  badge?: number;
}

const navItems: NavItem[] = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '/' },
  {
    title: 'Students',
    icon: Users,
    items: [
      { title: 'All Students', href: '/students' },
      { title: 'Add Student', href: '/students/add' },
    ],
  },
  {
    title: 'Faculty',
    icon: UserCircle,
    items: [
      { title: 'All Faculty', href: '/faculty' },
      { title: 'Add Faculty', href: '/faculty/add' },
    ],
  },
  {
    title: 'Attendance',
    icon: CalendarCheck,
    items: [
      { title: 'Mark Attendance', href: '/attendance/marking' },
      { title: 'Attendance Reports', href: '/attendance/reports' },
    ],
  },
  {
    title: 'Academic',
    icon: BookOpen,
    items: [
      { title: 'Courses', href: '/academic/courses' },
      { title: 'Subjects', href: '/academic/subjects' },
    ],
  },
  {
    title: 'Timetable',
    icon: Clock,
    items: [
      { title: 'View Timetable', href: '/timetable/view' },
      { title: 'Generate Timetable', href: '/timetable/generate' },
    ],
  },
  {
    title: 'Examinations',
    icon: FileText,
    items: [
      { title: 'Exam Schedule', href: '/exams/schedule' },
      { title: 'Marks Entry', href: '/exams/marks-entry' },
      { title: 'Results', href: '/exams/results' },
    ],
  },
  {
    title: 'Fees',
    icon: IndianRupee,
    items: [
      { title: 'Fee Structure', href: '/fees/structure' },
      { title: 'Fee Collection', href: '/fees/collection' },
      { title: 'Fee Reports', href: '/fees/reports' },
    ],
  },
  {
    title: 'Salary',
    icon: Wallet,
    items: [
      { title: 'Salary Dashboard', href: '/salary/dashboard' },
      { title: 'Generate Salary', href: '/salary/generate' },
    ],
  },
  {
    title: 'Transport',
    icon: Bus,
    items: [
      { title: 'Routes', href: '/transport/routes' },
      { title: 'Vehicles', href: '/transport/vehicles' },
    ],
  },
  {
    title: 'Hostel',
    icon: Building2,
    items: [
      { title: 'Allocation', href: '/hostel/allocation' },
      { title: 'Room Management', href: '/hostel/rooms' },
    ],
  },
  {
    title: 'Library',
    icon: Library,
    items: [
      { title: 'Book Catalog', href: '/library/books' },
      { title: 'Issue/Return', href: '/library/transactions' },
    ],
  },
  {
    title: 'Clubs & Activities',
    icon: Trophy,
    items: [
      { title: 'Clubs List', href: '/clubs/list' },
      { title: 'Events', href: '/clubs/events' },
    ],
  },
  {
    title: 'Notices',
    icon: Bell,
    items: [
      { title: 'Notice Board', href: '/notices/board' },
      { title: 'Create Notice', href: '/notices/create' },
    ],
  },
  { title: 'Reports', icon: BarChart3, href: '/reports' },
  { title: 'ID Card Generator', icon: IdCard, href: '/id-card-generator' },
  { title: 'Settings', icon: Settings, href: '/settings' },
];

function Sidebar({ className, collapsed }: { className?: string; collapsed: boolean }) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Students']);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (item: NavItem) => {
    if (item.href) return isActive(item.href);
    return item.items?.some((sub) => location.pathname.startsWith(sub.href));
  };

  return (
    <div className={cn('flex flex-col h-full bg-white border-r border-slate-200 overflow-hidden', className)}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-slate-800 text-sm leading-tight">Bharatiya Vidyapeeth</span>
            <span className="text-xs text-slate-500">University Management</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4 min-h-0">
        <TooltipProvider delayDuration={0}>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isParentActive(item);
              const expanded = expandedItems.includes(item.title);

              if (collapsed) {
                return (
                  <Tooltip key={item.title}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href || item.items?.[0]?.href || '#'}
                        className={cn(
                          'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200',
                          active
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              if (item.items) {
                return (
                  <div key={item.title} className="space-y-1">
                    <button
                      onClick={() => toggleExpand(item.title)}
                      className={cn(
                        'flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                        active
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-200',
                          expanded && 'rotate-180'
                        )}
                      />
                    </button>
                    {expanded && (
                      <div className="ml-4 pl-4 border-l border-slate-200 space-y-1">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            className={cn(
                              'flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200',
                              isActive(sub.href)
                                ? 'bg-blue-100 text-blue-700 font-medium'
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                            )}
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.title}
                  to={item.href!}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    active
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </TooltipProvider>
      </ScrollArea>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-100">
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <School className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-sm text-slate-800">BVU Pune</span>
            </div>
            <p className="text-xs text-slate-500">UGC & AICTE Approved Institution</p>
            <p className="text-xs text-slate-400 mt-1">Est. 1964</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { state } = useApp();
  const { logout } = useAuth();
  const location = useLocation();
  const unreadNotifications = state.notifications.filter((n) => !n.read).length;

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    const segments = path.split('/').filter(Boolean);
    return segments.map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' / ');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">{getPageTitle()}</h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm w-48 placeholder:text-slate-400"
            />
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="w-5 h-5 text-slate-600" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Link to="/notices/board" className="text-xs text-blue-600 hover:underline">
                  View All
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {state.notifications.slice(0, 5).map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start py-2">
                  <span className="font-medium text-sm">{notification.title}</span>
                  <span className="text-xs text-slate-500">{notification.message}</span>
                  <span className="text-xs text-slate-400 mt-1">
                    {new Date(notification.timestamp).toLocaleString('en-IN')}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={state.auth.user?.avatar} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                    {state.auth.user?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-medium text-slate-700">{state.auth.user?.name || 'Admin'}</span>
                  <span className="text-xs text-slate-500 capitalize">{state.auth.role}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                  <UserCircle className="w-4 h-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full transition-all duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          sidebarCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <Sidebar collapsed={sidebarCollapsed} />
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        )}
      >
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar Toggle (Desktop) */}
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="fixed bottom-4 left-4 z-50 hidden lg:flex shadow-lg"
      >
        {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
      </Button>
    </div>
  );
}
