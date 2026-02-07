import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
    Users,
    GraduationCap,
    BookOpen,
    ClipboardCheck,
    Calendar,
    Clock,
    CheckCircle2,
    ArrowRight,
    FileText,
    TrendingUp,
} from 'lucide-react';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
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

    return content;
}

export default function FacultyDashboard() {
    const { state } = useApp();

    const todayClasses = [
        { time: '09:00 AM', subject: 'Data Structures', room: 'Lab 201', section: 'CSE-A', progress: 75 },
        { time: '11:30 AM', subject: 'Algorithms', room: 'Room 105', section: 'CSE-B', progress: 60 },
        { time: '02:00 PM', subject: 'Digital Logic', room: 'Room 304', section: 'ECE-A', progress: 45 },
    ];

    const attendanceData = [
        { name: 'Mon', attendance: 85 },
        { name: 'Tue', attendance: 92 },
        { name: 'Wed', attendance: 78 },
        { name: 'Thu', attendance: 88 },
        { name: 'Fri', attendance: 95 },
        { name: 'Sat', attendance: 82 },
    ];

    return (
        <div className="p-6 bg-slate-50/50 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back!</h1>
                    <p className="text-slate-500 mt-1 font-medium">Have a great day of teaching.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-slate-200 bg-white shadow-sm hover:bg-slate-50 font-medium">View Schedule</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100 border-0 font-medium">Mark Attendance</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Classes"
                    value="12"
                    subtitle="This week"
                    icon={Calendar}
                    color="bg-blue-600"
                />
                <StatCard
                    title="Students"
                    value="240"
                    subtitle="Under mentorship"
                    icon={GraduationCap}
                    color="bg-indigo-500"
                />
                <StatCard
                    title="Attendance"
                    value="88%"
                    subtitle="Across sections"
                    icon={ClipboardCheck}
                    color="bg-emerald-500"
                />
                <StatCard
                    title="Grading"
                    value="45"
                    subtitle="Pending papers"
                    icon={FileText}
                    color="bg-amber-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg lg:col-span-1">
                    <CardHeader className="border-b border-slate-50">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            Today's Schedule
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[400px]">
                            <div className="p-6 space-y-6">
                                {todayClasses.map((cls, idx) => (
                                    <div key={idx} className="relative pl-6 border-l-2 border-slate-100 last:border-0 pb-6 last:pb-0">
                                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-blue-600" />
                                        </div>
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs font-bold text-blue-600">{cls.time}</span>
                                            <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-500 border-slate-200">{cls.room}</Badge>
                                        </div>
                                        <h4 className="font-semibold text-slate-800">{cls.subject}</h4>
                                        <p className="text-xs text-slate-500 mb-3">{cls.section}</p>
                                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-blue-600 h-full rounded-full transition-all duration-1000" style={{ width: `${cls.progress}%` }} />
                                        </div>
                                        <p className="text-[10px] text-right text-slate-400 mt-1">{cls.progress}% Course Completed</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg lg:col-span-2">
                    <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            Class Attendance Overview
                        </CardTitle>
                        <select className="text-xs bg-slate-50 border-0 rounded-lg p-1 text-slate-500 outline-none">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={attendanceData}>
                                    <defs>
                                        <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} />
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Area type="monotone" dataKey="attendance" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorAttendance)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
