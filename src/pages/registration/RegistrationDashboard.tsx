import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
    UserPlus,
    Users,
    ClipboardCheck,
    TrendingUp,
    FileText,
    ArrowRight,
    Search,
    IndianRupee,
    GraduationCap,
    Clock,
    CheckCircle2,
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

export default function RegistrationDashboard() {
    const { state } = useApp();

    const admissionTrend = [
        { name: 'Week 1', apps: 45, confirmed: 28 },
        { name: 'Week 2', apps: 82, confirmed: 54 },
        { name: 'Week 3', apps: 125, confirmed: 88 },
        { name: 'Week 4', apps: 92, confirmed: 65 },
        { name: 'Week 5', apps: 148, confirmed: 110 },
        { name: 'Week 6', apps: 110, confirmed: 78 },
    ];

    const quotaData = [
        { name: 'General', value: 450, color: '#3b82f6' },
        { name: 'Management', value: 120, color: '#6366f1' },
        { name: 'Scholarship', value: 85, color: '#8b5cf6' },
        { name: 'Others', value: 45, color: '#94a3b8' },
    ];

    const recentApplications = [
        { student: 'Aryan Singh', course: 'B.Tech CSE', status: 'Verified', date: '10 min ago' },
        { student: 'Ishita Paul', course: 'B.Tech ECE', status: 'Pending', date: '45 min ago' },
        { student: 'Kabir Das', course: 'B.Arch', status: 'Verified', date: '2 hours ago' },
        { student: 'Meera Nair', course: 'B.Tech Civil', status: 'In Review', date: '3 hours ago' },
    ];

    return (
        <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight text-blue-600">Registrar Portal</h1>
                    <p className="text-slate-500 font-medium">Manage student admissions and academic records</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-slate-200 bg-white shadow-sm hover:bg-slate-50 font-semibold text-slate-700">
                        Reports
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 font-semibold px-6">
                        New Admission
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Applicants" value="1,842" subtitle="This cycle" trend="+15% vs LY" icon={UserPlus} color="bg-blue-500" />
                <StatCard title="Confirmed Seats" value="842" subtitle="Fee paid" trend="45% conversion" icon={CheckCircle2} color="bg-indigo-500" />
                <StatCard title="Pending Verification" value="156" subtitle="Documents in review" icon={Clock} color="bg-rose-500" />
                <StatCard title="Revenue (Form Fee)" value="₹9.2L" subtitle="Collection" icon={IndianRupee} color="bg-emerald-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="border-0 shadow-sm bg-white lg:col-span-2">
                    <CardHeader className="pb-2 border-b border-slate-50">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                Registration Analytics
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={admissionTrend}>
                                    <defs>
                                        <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorConf" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
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
                                    <Area type="monotone" dataKey="apps" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorApps)" name="Applications" />
                                    <Area type="monotone" dataKey="confirmed" stroke="#8B5CF6" strokeWidth={4} fillOpacity={1} fill="url(#colorConf)" name="Confirmations" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                    <CardHeader className="pb-2 border-b border-slate-50">
                        <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-blue-600" />
                            Quota Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[250px] mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={quotaData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{
                                            borderRadius: '12px',
                                            border: 'none',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={28}>
                                        {quotaData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-3">
                            {quotaData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
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
                            <Clock className="w-5 h-5 text-blue-600" />
                            Recent Pipeline
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 font-bold">
                            View Admission Pool
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-100">
                            {recentApplications.map((app, idx) => (
                                <div key={idx} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 font-bold shadow-sm transition-transform group-hover:scale-110">
                                            {app.student[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">{app.student}</p>
                                            <p className="text-sm text-slate-500 font-medium">{app.course}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-12">
                                        <div className="text-right">
                                            <Badge className={cn(
                                                "font-bold px-4 py-1.5 rounded-xl uppercase tracking-wider text-[10px]",
                                                app.status === 'Verified' ? "bg-emerald-100 text-emerald-700" :
                                                    app.status === 'Pending' ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                                            )}>
                                                {app.status}
                                            </Badge>
                                            <p className="text-xs text-slate-400 mt-2 font-medium">{app.date}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                                            <FileText className="w-5 h-5" />
                                        </Button>
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
