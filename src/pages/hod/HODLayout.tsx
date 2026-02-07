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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    LayoutGrid,
    GraduationCap,
    School,
    Users,
    ClipboardCheck,
    BookOpen,
    Calendar,
    Award,
    Bell as BellIcon,
    FileText,
    Settings,
    LogOut,
    ChevronDown,
    Menu,
    X,
    Building2,
    Search,
    Building,
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
    { label: 'Dashboard', href: '/hod', icon: LayoutGrid, color: 'text-blue-600' },
    { label: 'Students', href: '/hod/students', icon: GraduationCap, color: 'text-sky-500' },
    { label: 'Faculty', href: '/hod/faculty', icon: Users, color: 'text-emerald-500' },
    { label: 'Courses', href: '/hod/courses', icon: BookOpen, color: 'text-indigo-500' },
    { label: 'Attendance', href: '/hod/attendance', icon: ClipboardCheck, color: 'text-purple-500' },
    { label: 'Results', href: '/hod/results', icon: Award, color: 'text-amber-500' },
    { label: 'Timetable', href: '/hod/timetable', icon: Calendar, color: 'text-rose-500' },
    { label: 'Leave Requests', href: '/hod/leaves', icon: FileText, color: 'text-emerald-600' },
    { label: 'Reports', href: '/hod/reports', icon: FileText, color: 'text-slate-600' },
    { label: 'Settings', href: '/hod/settings', icon: Settings, color: 'text-slate-500' },
];

function NavItemComponent({
    item,
    isActive,
    onNavigate,
}: {
    item: NavItem;
    isActive: boolean;
    onNavigate: () => void;
}) {
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

export default function HODLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth, logout } = useAuth();
    const { state } = useApp();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const unreadNotifications = state.notifications.filter((n) => !n.read).length;

    const filteredNavItems = searchQuery
        ? navItems.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
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
                    'fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 lg:translate-x-0 flex flex-col',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-100 shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-sm leading-tight">Bharatiya Vidyapeeth</span>
                        <span className="text-xs text-slate-500">University Management</span>
                    </div>
                </div>

                {/* Navigation */}
                <ScrollArea className="flex-1 py-4 min-h-0">
                    <nav className="px-3 space-y-1">
                        {filteredNavItems.map((item) => (
                            <NavItemComponent
                                key={item.label}
                                item={item}
                                isActive={location.pathname === item.href}
                                onNavigate={() => setSidebarOpen(false)}
                            />
                        ))}
                    </nav>
                </ScrollArea>

                {/* Info Card */}
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
            </aside>

            {/* Main Content */}
            <div className="lg:ml-64">
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
                                {navItems.find((n) => n.href === location.pathname)?.label || 'Dashboard'}
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
                                <Link to="/hod/notifications">
                                    <BellIcon className="w-5 h-5 text-slate-600" />
                                    {unreadNotifications > 0 && (
                                        <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs rounded-full">
                                            {unreadNotifications}
                                        </span>
                                    )}
                                </Link>
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            {/* <AvatarImage src={auth.user?.avatar} /> */}
                                            <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                                                {auth.user?.name?.charAt(0) || 'H'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="hidden sm:flex flex-col items-start">
                                            <span className="text-sm font-medium text-slate-700">{auth.user?.name || 'Head of Department'}</span>
                                            <span className="text-xs text-slate-500 capitalize">{auth.role || 'HOD'}</span>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link to="/hod/profile" className="flex items-center gap-2 cursor-pointer">
                                            <Users className="w-4 h-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/hod/settings" className="flex items-center gap-2 cursor-pointer">
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
                <div className="p-4 lg:p-6 transition-all duration-300 text-slate-900 font-medium">
                    <Outlet />
                    <footer className="mt-8 pt-4 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-400 font-medium">
                            &copy; {new Date().getFullYear()} Geeks of Gurukul. Made by Geeks of Gurukul.
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}
