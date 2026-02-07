import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';
import {
    Building2,
    Users,
    GraduationCap,
    IndianRupee,
    TrendingUp,
    Activity,
    Globe,
    Server,
    Shield,
    Plus,
    BarChart3,
    Settings,
    Bell,
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from 'recharts';

// KPI Card Component
function KPICard({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    trendUp,
    color,
    href,
}: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: React.ElementType;
    trend?: string;
    trendUp?: boolean;
    color: string;
    href?: string;
}) {
    const content = (
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer bg-white">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-500 mb-1">{title}</p>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1">{value}</h3>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-slate-400 font-medium">{subtitle}</span>
                            {trend && (
                                <span className={cn(
                                    "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                    trendUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                )}>
                                    {trendUp ? '↑' : '↓'} {trend}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-current/10 transition-transform group-hover:scale-110",
                        color
                    )}>
                        <Icon className="w-7 h-7 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    if (href) {
        return <Link to={href}>{content}</Link>;
    }
    return content;
}

export default function SuperAdminDashboard() {
    const { state } = useApp();

    // Calculate stats
    const totalUniversities = state.universities.length;
    const activeUniversities = state.universities.filter((u) => u.status === 'active').length;
    const totalStudents = state.students.length * totalUniversities; // Simulated
    const totalFaculty = state.faculty.length * totalUniversities;
    const totalRevenue = state.feePayments
        .filter((p) => p.status === 'paid')
        .reduce((acc, p) => acc + p.amount, 0) * totalUniversities;

    // University performance data
    const universityData = state.universities.map((uni) => ({
        name: uni.shortName,
        students: Math.floor(Math.random() * 5000 + 1000),
        faculty: Math.floor(Math.random() * 200 + 50),
        revenue: Math.floor(Math.random() * 50 + 10),
    }));

    // Monthly trend data
    const monthlyTrend = [
        { month: 'Jan', users: 12000, revenue: 45 },
        { month: 'Feb', users: 12500, revenue: 48 },
        { month: 'Mar', users: 13200, revenue: 52 },
        { month: 'Apr', users: 14000, revenue: 55 },
        { month: 'May', users: 14800, revenue: 58 },
        { month: 'Jun', users: 15500, revenue: 62 },
    ];

    // Subscription distribution
    const subscriptionData = [
        { name: 'Premium', value: 2, color: '#8B5CF6' },
        { name: 'Standard', value: 1, color: '#3B82F6' },
        { name: 'Basic', value: 0, color: '#10B981' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 p-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        <Shield className="w-8 h-8 text-purple-600" />
                        Super Admin Dashboard
                    </h1>
                    <p className="text-slate-500 mt-1">
                        System-wide management and analytics for all universities
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                        <Bell className="w-4 h-4" />
                        Alerts
                        <Badge className="bg-red-500 text-white">3</Badge>
                    </Button>
                    <Button asChild className="gap-2 bg-purple-600 hover:bg-purple-700">
                        <Link to="/super-admin/universities/add">
                            <Plus className="w-4 h-4" />
                            Add University
                        </Link>
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KPICard
                    title="Total Universities"
                    value={totalUniversities}
                    subtitle={`${activeUniversities} active`}
                    icon={Building2}
                    trend="+1 this month"
                    trendUp
                    color="bg-purple-600"
                />
                <KPICard
                    title="Total Students"
                    value={totalStudents.toLocaleString('en-IN')}
                    subtitle="Across all universities"
                    icon={GraduationCap}
                    trend="+12%"
                    trendUp
                    color="bg-blue-600"
                />
                <KPICard
                    title="Total Faculty"
                    value={totalFaculty.toLocaleString('en-IN')}
                    subtitle="Active teachers"
                    icon={Users}
                    trend="+8%"
                    trendUp
                    color="bg-emerald-500"
                />
                <KPICard
                    title="Total Revenue"
                    value={`₹${(totalRevenue / 10000000).toFixed(1)}Cr`}
                    subtitle="This financial year"
                    icon={IndianRupee}
                    trend="+15%"
                    trendUp
                    color="bg-amber-500"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* University Performance */}
                <Card className="border-0 shadow-lg lg:col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-purple-600" />
                            University Performance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={universityData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                                    <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                                    <YAxis stroke="#64748B" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: 8,
                                            border: 'none',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        }}
                                    />
                                    <Bar dataKey="students" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Students" />
                                    <Bar dataKey="faculty" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Faculty" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Subscription Distribution */}
                <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold text-slate-800">
                            Subscription Plans
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={subscriptionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {subscriptionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-4 mt-2">
                            {subscriptionData.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-xs text-slate-600">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Growth Trend and Universities List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Growth Trend */}
                <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                            Growth Trend
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={monthlyTrend}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                    <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                                    <YAxis stroke="#64748B" fontSize={12} />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="users"
                                        stroke="#8B5CF6"
                                        strokeWidth={2}
                                        dot={{ fill: '#8B5CF6' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Universities List */}
                <Card className="border-0 shadow-lg lg:col-span-2">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-blue-600" />
                                Managed Universities
                            </CardTitle>
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/super-admin/universities">View All</Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[200px] pr-4">
                            <div className="space-y-3">
                                {state.universities.map((uni) => (
                                    <div
                                        key={uni.id}
                                        className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                                                <Building2 className="w-6 h-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-800">{uni.name}</h4>
                                                <p className="text-sm text-slate-500">{uni.city}, {uni.state}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge
                                                className={`${uni.subscriptionPlan === 'premium'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : uni.subscriptionPlan === 'standard'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-slate-100 text-slate-700'
                                                    }`}
                                            >
                                                {uni.subscriptionPlan}
                                            </Badge>
                                            <Badge
                                                className={`${uni.status === 'active'
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {uni.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* System Status */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                            <Server className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">System Status</p>
                            <p className="text-lg font-semibold text-emerald-600 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                All Systems Operational
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                            <Activity className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Active Sessions</p>
                            <p className="text-lg font-semibold text-slate-800">{Math.floor(Math.random() * 500 + 100)}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                            <Settings className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Last Backup</p>
                            <p className="text-lg font-semibold text-slate-800">Today, 3:00 AM</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
