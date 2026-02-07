import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
    Library,
    BookOpen,
    Users,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    PieChart as PieChartIcon,
    ArrowRight,
    Clock
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
} from 'recharts';

function StatCard({ title, value, icon: Icon, color, subtitle, trend }: any) {
    return (
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-slate-500 mb-1">{title}</p>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1">{value}</h3>
                        <div className="flex items-center gap-2">
                            {trend && (
                                <span className={cn(
                                    "text-xs font-bold px-2 py-0.5 rounded-full",
                                    trend.startsWith('+') ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
                                )}>
                                    {trend}
                                </span>
                            )}
                            <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
                        </div>
                    </div>
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-current/10", color.replace('bg-gradient-to-br ', '').split(' ')[0])}>
                        <Icon className="w-7 h-7 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function LibraryDashboard() {
    const { state } = useApp();

    const transactionData = [
        { name: 'Mon', issued: 45, returned: 38 },
        { name: 'Tue', issued: 52, returned: 42 },
        { name: 'Wed', issued: 38, returned: 45 },
        { name: 'Thu', issued: 65, returned: 58 },
        { name: 'Fri', issued: 48, returned: 52 },
        { name: 'Sat', issued: 32, returned: 35 },
    ];

    const categoryData = [
        { name: 'Computer Science', value: 400, color: '#f97316' },
        { name: 'Electronics', value: 300, color: '#fb923c' },
        { name: 'Mathematics', value: 200, color: '#fdba74' },
        { name: 'Literature', value: 100, color: '#fed7aa' },
    ];

    const recentTransactions = [
        { user: 'Rahul Sharma', book: 'Data Structures & Algorithms', action: 'Issued', date: 'Today, 10:30 AM' },
        { user: 'Priya Verma', book: 'Modern Operating Systems', action: 'Returned', date: 'Today, 09:15 AM' },
        { user: 'Amit Gupta', book: 'Digital Logic Design', action: 'Issued', date: 'Yesterday' },
        { user: 'Sneha Patel', book: 'Concrete Mathematics', action: 'Overdue', date: '5 days ago' },
    ];

    return (
        <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Library Hub</h1>
                    <p className="text-slate-500 font-medium">Manage university books and member records</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-slate-200 font-semibold text-slate-700 bg-white hover:bg-slate-50 shadow-sm">
                        View Catalog
                    </Button>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200 font-semibold px-6">
                        Issue/Return
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Titles"
                    value="12,450"
                    subtitle="Unique books"
                    trend="+12"
                    icon={Library}
                    color="bg-orange-500"
                />
                <StatCard
                    title="Active Issues"
                    value="842"
                    subtitle="Currently out"
                    trend="+5%"
                    icon={BookOpen}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Overdue Books"
                    value="48"
                    subtitle="Penalty pending"
                    trend="-3"
                    icon={AlertCircle}
                    color="bg-rose-500"
                />
                <StatCard
                    title="Library Members"
                    value="3,200"
                    subtitle="Students & Staff"
                    icon={Users}
                    color="bg-emerald-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="border-0 shadow-sm bg-white lg:col-span-2">
                    <CardHeader className="pb-2 border-b border-slate-50">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-orange-600" />
                                Growth & Activity
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={transactionData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            borderRadius: '16px',
                                            border: 'none',
                                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                            padding: '12px'
                                        }}
                                    />
                                    <Bar dataKey="issued" fill="#f97316" radius={[6, 6, 0, 0]} barSize={24} name="Books Issued" />
                                    <Bar dataKey="returned" fill="#E2E8F0" radius={[6, 6, 0, 0]} barSize={24} name="Books Returned" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                    <CardHeader className="pb-2 border-b border-slate-50">
                        <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <PieChartIcon className="w-5 h-5 text-orange-600" />
                            Book Categories
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="relative h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={90}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '12px',
                                            border: 'none',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-bold text-slate-800">1,000</span>
                                <span className="text-xs text-slate-500 font-medium">Total Books</span>
                            </div>
                        </div>
                        <div className="space-y-3 mt-6">
                            {categoryData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-sm font-semibold text-slate-600">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-800">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white lg:col-span-3">
                    <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-orange-600" />
                            Recent Activity
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 font-bold">
                            View Logistics
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-100">
                            {recentTransactions.map((tx, idx) => (
                                <div key={idx} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                                            tx.action === 'Issued' ? "bg-orange-50 text-orange-600" :
                                                tx.action === 'Returned' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                        )}>
                                            {tx.action === 'Issued' ? <BookOpen className="w-6 h-6" /> :
                                                tx.action === 'Returned' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">{tx.user}</p>
                                            <p className="text-sm text-slate-500 font-medium">{tx.book}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge className={cn(
                                            "font-bold px-3 py-1 rounded-lg",
                                            tx.action === 'Issued' ? "bg-orange-100 text-orange-700" :
                                                tx.action === 'Returned' ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                                        )}>
                                            {tx.action}
                                        </Badge>
                                        <p className="text-xs text-slate-400 mt-2 font-medium">{tx.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
