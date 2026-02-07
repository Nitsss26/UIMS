import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
    IndianRupee,
    Users,
    TrendingUp,
    FileText,
    ArrowRight,
    Search,
    Download,
    CheckCircle2,
    AlertCircle,
    Clock,
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
} from 'recharts';

function StatCard({ title, value, icon: Icon, color, subtitle, trend }: any) {
    return (
        <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white group cursor-pointer">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-500 mb-1">{title}</p>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1">{value}</h3>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-slate-400 font-medium">{subtitle}</span>
                            {trend && (
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    {trend}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-current/10 transition-transform group-hover:scale-110",
                        color.replace('bg-gradient-to-br ', '').split(' ')[0]
                    )}>
                        <Icon className="w-7 h-7 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function FeeAccountantDashboard() {
    const { state } = useApp();

    const collectionData = [
        { name: 'Mon', amount: 45000 },
        { name: 'Tue', amount: 52000 },
        { name: 'Wed', amount: 38000 },
        { name: 'Thu', amount: 65000 },
        { name: 'Fri', amount: 48000 },
        { name: 'Sat', amount: 22000 },
    ];

    const feeTypeData = [
        { type: 'Tuition', value: 85, color: '#10b981' },
        { type: 'Hostel', value: 72, color: '#3b82f6' },
        { type: 'Bus', value: 94, color: '#8b5cf6' },
        { type: 'Exam', value: 45, color: '#f59e0b' },
    ];

    const recentCollections = [
        { student: 'Rahul Sharma', id: '2021CSE001', amount: '₹45,000', type: 'Tuition Fee', status: 'Completed', date: 'Just now' },
        { student: 'Priya Verma', id: '2021ECE045', amount: '₹12,000', type: 'Hostel Fee', status: 'Pending', date: '1 hour ago' },
        { student: 'Amit Gupta', id: '2021CSE022', amount: '₹2,500', type: 'Transport Fee', status: 'Completed', date: '3 hours ago' },
        { student: 'Sneha Patel', id: '2021CSE012', amount: '₹1,500', type: 'Exam Fee', status: 'Completed', date: 'Yesterday' },
    ];

    return (
        <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight text-emerald-600">Finance Hub</h1>
                    <p className="text-slate-500 font-medium">Fee collection and accounts overview</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-slate-200 bg-white shadow-sm hover:bg-slate-50 font-semibold text-slate-700">
                        Statement
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 font-semibold px-6">
                        Record Receipt
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Collection" value="₹24.5L" subtitle="This semester" trend="+12% YoY" icon={IndianRupee} color="bg-emerald-500" />
                <StatCard title="Pending Dues" value="₹8.2L" subtitle="Across all years" trend="Action Required" icon={FileText} color="bg-rose-500" />
                <StatCard title="Today's Collection" value="₹2.2L" subtitle="18 Transactions" icon={TrendingUp} color="bg-blue-500" />
                <StatCard title="Students Paid" value="84%" subtitle="2,400 students" icon={Users} color="bg-indigo-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="border-0 shadow-sm bg-white lg:col-span-2">
                    <CardHeader className="pb-2 border-b border-slate-50">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-emerald-600" />
                                Daily Collection Flow
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={collectionData}>
                                    <defs>
                                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
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
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            borderRadius: '16px',
                                            border: 'none',
                                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                            padding: '12px'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="amount"
                                        stroke="#10b981"
                                        strokeWidth={4}
                                        fill="url(#colorAmount)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                    <CardHeader className="pb-2 border-b border-slate-50">
                        <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <IndianRupee className="w-5 h-5 text-emerald-600" />
                            Collection Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-6 mt-2">
                            {feeTypeData.map((item) => (
                                <div key={item.type} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                            <span className="text-sm font-semibold text-slate-600">{item.type} Fee</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-800">{item.value}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000"
                                            style={{
                                                width: `${item.value}%`,
                                                backgroundColor: item.color,
                                                boxShadow: `0 0 10px ${item.color}40`
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Statistics</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-slate-800">₹84.2L</span>
                                <Badge className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-lg">Healthy</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white lg:col-span-3">
                    <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-emerald-600" />
                            Recent Ledger
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 font-bold">
                            View All Transactions
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-100">
                            {recentCollections.map((tx, idx) => (
                                <div key={idx} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm",
                                            tx.status === 'Completed' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                                        )}>
                                            {tx.status === 'Completed' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">{tx.student}</p>
                                            <p className="text-sm text-slate-500 font-medium">{tx.id} • {tx.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-12">
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-slate-800">{tx.amount}</p>
                                            <p className="text-xs text-slate-400 mt-1 font-medium">{tx.date}</p>
                                        </div>
                                        <Badge className={cn(
                                            "font-bold px-4 py-1.5 rounded-xl uppercase tracking-wider text-[10px]",
                                            tx.status === 'Completed' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                                        )}>
                                            {tx.status}
                                        </Badge>
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
