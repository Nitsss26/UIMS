import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    LayoutGrid,
    GraduationCap,
    Users,
    ClipboardCheck,
    BookOpen,
    Calendar,
    FileSpreadsheet,
    IndianRupee,
    Wallet,
    Bus,
    Building2,
    Settings,
    Bell as BellIcon,
    Menu,
    LogOut,
    Search,
    X,
    ChevronDown,
    ChevronRight,
    User,
    Shield,
    FileText
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
    color: string;
    children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/admin', icon: LayoutGrid, color: 'text-blue-600' },
    {
        label: 'Students',
        href: '/admin/students',
        icon: GraduationCap,
        color: 'text-sky-500',
        children: [
            { label: 'All Students', href: '/admin/students' },
            { label: 'Add Student', href: '/admin/students/add' },
        ],
    },
    {
        label: 'Faculty',
        href: '/admin/faculty',
        icon: Users,
        color: 'text-emerald-500',
        children: [
            { label: 'All Faculty', href: '/admin/faculty' },
            { label: 'Add Faculty', href: '/admin/faculty/add' },
        ],
    },
    {
        label: 'Attendance',
        href: '/admin/attendance',
        icon: ClipboardCheck,
        color: 'text-purple-500',
        children: [
            { label: 'Mark Attendance', href: '/admin/attendance/marking' },
            { label: 'Reports', href: '/admin/attendance/reports' },
        ],
    },
    {
        label: 'Academics',
        href: '/admin/academic',
        icon: BookOpen,
        color: 'text-indigo-500',
        children: [
            { label: 'Courses', href: '/admin/academic/courses' },
            { label: 'Subjects', href: '/admin/academic/subjects' },
        ],
    },
    {
        label: 'Timetable',
        href: '/admin/timetable',
        icon: Calendar,
        color: 'text-rose-500',
        children: [
            { label: 'View Timetable', href: '/admin/timetable/view' },
            { label: 'Generate', href: '/admin/timetable/generate' },
        ],
    },
    {
        label: 'Examinations',
        href: '/admin/exams',
        icon: FileSpreadsheet,
        color: 'text-amber-500',
        children: [
            { label: 'Schedule', href: '/admin/exams/schedule' },
            { label: 'Marks Entry', href: '/admin/exams/marks-entry' },
            { label: 'Results', href: '/admin/exams/results' },
        ],
    },
    {
        label: 'Fees',
        href: '/admin/fees',
        icon: IndianRupee,
        color: 'text-emerald-600',
        children: [
            { label: 'Fee Structure', href: '/admin/fees/structure' },
            { label: 'Collection', href: '/admin/fees/collection' },
            { label: 'Reports', href: '/admin/fees/reports' },
        ],
    },
    {
        label: 'Salary',
        href: '/admin/salary',
        icon: Wallet,
        color: 'text-violet-500',
        children: [
            { label: 'Dashboard', href: '/admin/salary/dashboard' },
            { label: 'Generate', href: '/admin/salary/generate' },
        ],
    },
    {
        label: 'Transport',
        href: '/admin/transport',
        icon: Bus,
        color: 'text-blue-500',
        children: [
            { label: 'Routes', href: '/admin/transport/routes' },
            { label: 'Vehicles', href: '/admin/transport/vehicles' },
        ],
    },
    {
        label: 'Hostel',
        href: '/admin/hostel',
        icon: Building2,
        color: 'text-orange-500',
        children: [
            { label: 'Rooms', href: '/admin/hostel/rooms' },
            { label: 'Allocation', href: '/admin/hostel/allocation' },
        ],
    },
    {
        label: 'Users',
        href: '/admin/users',
        icon: User,
        color: 'text-green-500',
        children: [
            { label: 'All Users', href: '/admin/users' },
            { label: 'Add User', href: '/admin/users/add' },
        ],
    },
    {
        label: 'Roles & Permissions',
        href: '/admin/roles',
        icon: Shield,
        color: 'text-purple-500',
        children: [
            { label: 'All Roles', href: '/admin/roles' },
            { label: 'Add Role', href: '/admin/roles/add' },
        ],
    },
    { label: 'Audit Log', href: '/admin/audit-log', icon: FileText, color: 'text-gray-500' },
    { label: 'Settings', href: '/admin/settings', icon: Settings, color: 'text-slate-400' },
];

function NavItemComponent({
    item,
    isActive,
    isExpanded,
    isCollapsed,
    onToggle,
    onNavigate,
}: {
    item: NavItem;
    isActive: boolean;
    isExpanded: boolean;
    isCollapsed: boolean;
    onToggle: () => void;
    onNavigate: () => void;
}) {
    const location = useLocation();
    const hasChildren = item.children && item.children.length > 0;
    const isChildActive = hasChildren && item.children?.some((c) => location.pathname === c.href);

    if (isCollapsed) {
        return (
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <Link
                        to={item.href || item.children?.[0]?.href || '#'}
                        className={cn(
                            'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 mx-auto',
                            isActive || isChildActive
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                        )}
                        onClick={onNavigate}
                    >
                        <item.icon className="w-5 h-5" />
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium bg-slate-900 text-white border-slate-800">
                    {item.label}
                </TooltipContent>
            </Tooltip>
        );
    }

    if (hasChildren) {
        return (
            <div className="space-y-1">
                <button
                    onClick={onToggle}
                    className={cn(
                        'flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                        isChildActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    )}
                >
                    <div className="flex items-center gap-3">
                        <item.icon className={cn('w-5 h-5', isChildActive ? 'text-blue-600' : item.color)} />
                        <span>{item.label}</span>
                    </div>
                    <ChevronDown
                        className={cn(
                            'w-4 h-4 transition-transform duration-200',
                            isExpanded && 'rotate-180'
                        )}
                    />
                </button>
                {isExpanded && (
                    <div className="ml-4 pl-4 border-l border-slate-200 space-y-1">
                        {item.children?.map((child) => (
                            <Link
                                key={child.href}
                                to={child.href}
                                onClick={onNavigate}
                                className={cn(
                                    'flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200',
                                    location.pathname === child.href
                                        ? 'bg-blue-100 text-blue-700 font-medium'
                                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                                )}
                            >
                                {child.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            to={item.href}
            onClick={onNavigate}
            className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            )}
        >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
        </Link>
    );
}

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth, logout } = useAuth();
    const { state } = useApp();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleExpanded = (label: string) => {
        setExpandedItems((prev) =>
            prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
        );
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const unreadNotifications = state.notifications.filter((n) => !n.read).length;

    // Filter nav items based on search
    const filteredNavItems = searchQuery
        ? navItems.filter(
            (item) =>
                item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.children?.some((c) => c.label.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : navItems;

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
                    'fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-50 transform transition-all duration-300 lg:translate-x-0 flex flex-col',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full',
                    sidebarCollapsed ? 'w-20' : 'w-64'
                )}
            >
                {/* Logo */}
                <div className={cn("flex items-center gap-3 px-4 py-4 border-b border-slate-100 shrink-0", sidebarCollapsed && "justify-center px-2")}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    {!sidebarCollapsed && (
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-800 text-sm leading-tight">Bharatiya Vidyapeeth</span>
                            <span className="text-xs text-slate-500">University Management</span>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <ScrollArea className="flex-1 py-4 min-h-0">
                    <TooltipProvider>
                        <nav className="px-3 space-y-1">
                            {filteredNavItems.map((item) => (
                                <NavItemComponent
                                    key={item.label}
                                    item={item}
                                    isActive={location.pathname === item.href}
                                    isExpanded={expandedItems.includes(item.label)}
                                    isCollapsed={sidebarCollapsed}
                                    onToggle={() => toggleExpanded(item.label)}
                                    onNavigate={() => setSidebarOpen(false)}
                                />
                            ))}
                        </nav>
                    </TooltipProvider>
                </ScrollArea>

                {/* Info Card */}
                {/* Info Card */}
                {!sidebarCollapsed && (
                    <div className="p-4 border-t border-slate-100">
                        <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-4 border border-blue-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Building2 className="w-5 h-5 text-blue-600" />
                                <span className="font-semibold text-sm text-slate-800">BVU Pune</span>
                            </div>
                            <p className="text-xs text-slate-500">UGC & AICTE Approved Institution</p>
                            <p className="text-xs text-slate-400 mt-1">Est. 1964</p>
                        </div>
                    </div>
                )}
            </aside>

            {/* Sidebar Toggle (Desktop) */}
            <Button
                variant="secondary"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="fixed bottom-4 left-4 z-50 hidden lg:flex shadow-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
                {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </Button>

            {/* Main Content */}
            <div className={cn(
                "transition-all duration-300",
                sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
            )}>
                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-slate-200">
                    <div className="flex items-center justify-between h-16 px-4 lg:px-6">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
                        >
                            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        {/* Title & Date */}
                        <div className="hidden lg:flex flex-col">
                            <h1 className="text-xl font-bold text-slate-800 leading-tight">
                                {navItems.find((n) => n.href === location.pathname)?.label ||
                                    navItems.find((n) => n.children?.some((c) => c.href === location.pathname))
                                        ?.label ||
                                    'Dashboard'}
                            </h1>
                            <p className="text-xs font-medium text-slate-500">
                                {new Date().toLocaleDateString('en-IN', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full h-10 pl-11 pr-4 bg-slate-100/80 border-transparent rounded-full text-sm placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="relative" asChild>
                                <Link to="/admin/notices/board">
                                    <BellIcon className="w-5 h-5 text-slate-600" />
                                    {unreadNotifications > 0 && (
                                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                                            {unreadNotifications > 9 ? '9+' : unreadNotifications}
                                        </span>
                                    )}
                                </Link>
                            </Button>

                            {/* User Profile */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            {/* <AvatarImage src={auth.user?.avatar} /> */}
                                            <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                                                {auth.user?.name?.charAt(0) || 'A'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="hidden sm:flex flex-col items-start">
                                            <span className="text-sm font-medium text-slate-700">{auth.user?.name || 'Admin'}</span>
                                            <span className="text-xs text-slate-500 capitalize">{auth.role}</span>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link to="/admin/profile" className="flex items-center gap-2 cursor-pointer">
                                            <Users className="w-4 h-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/admin/settings" className="flex items-center gap-2 cursor-pointer">
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

                {/* Page Content */}
                <main className="p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
