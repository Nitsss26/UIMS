import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
    Calendar,
    Clock,
    BookOpen,
    ClipboardCheck,
    Award,
    TrendingUp,
    ArrowRight,
    IndianRupee,
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

function StatCard({
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
                                    "bg-emerald-50 text-emerald-600"
                                )}>
                                    ↑ {trend}
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

    return content;
}

export default function StudentDashboard() {
    const { state } = useApp();

    const attendanceData = [
        { name: 'Jan', attendance: 85 },
        { name: 'Feb', attendance: 88 },
        { name: 'Mar', attendance: 92 },
        { name: 'Apr', attendance: 84 },
        { name: 'May', attendance: 95 },
    ];

    const todayClasses = [
        { time: '09:00 AM', subject: 'Data Structures', room: 'Lab 1', status: 'Upcoming' },
        { time: '11:00 AM', subject: 'Digital Electronics', room: 'Room 304', status: 'Upcoming' },
        { time: '02:00 PM', subject: 'Mathematics III', room: 'Room 102', status: 'Upcoming' },
    ];

    return (
        <div className="p-6 bg-slate-50/50 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back!</h1>
                    <p className="text-slate-500 mt-1 font-medium">Keep up the good work and stay focused.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-slate-200 bg-white shadow-sm hover:bg-slate-50 font-medium font-medium">View Profile</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100 border-0 font-medium font-medium">Download ID Card</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Attendance"
                    value="89%"
                    subtitle="Overall avg"
                    trend="+2%"
                    icon={ClipboardCheck}
                    color="bg-blue-600"
                />
                <StatCard
                    title="CGPA"
                    value="8.42"
                    subtitle="Sem IV results"
                    trend="Top 5%"
                    icon={Award}
                    color="bg-indigo-500"
                />
                <StatCard
                    title="Credits"
                    value="92"
                    subtitle="Target 160"
                    icon={BookOpen}
                    color="bg-emerald-500"
                />
                <StatCard
                    title="Fee Status"
                    value="₹4,500"
                    subtitle="Pending dues"
                    icon={IndianRupee}
                    color="bg-amber-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg lg:col-span-1">
                    <CardHeader className="border-b border-slate-50">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            Today's Classes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[350px]">
                            <div className="p-6 space-y-6">
                                {todayClasses.map((cls, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-2 h-2 rounded-full bg-blue-600" />
                                            <div className="w-0.5 flex-1 bg-slate-100 my-1" />
                                        </div>
                                        <div className="flex-1 pb-6">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-xs font-bold text-blue-600">{cls.time}</span>
                                                <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-0 text-[10px]">{cls.room}</Badge>
                                            </div>
                                            <h4 className="font-semibold text-slate-800">{cls.subject}</h4>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 py-2">
                                    Full Timetable <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg lg:col-span-2">
                    <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            Academic Performance
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={attendanceData}>
                                    <defs>
                                        <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="attendance" stroke="#3B82F6" strokeWidth={3} fill="url(#colorPerf)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
