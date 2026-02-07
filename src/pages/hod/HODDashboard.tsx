import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
    Users,
    GraduationCap,
    BookOpen,
    ClipboardCheck,
    TrendingUp,
    Calendar,
    FileText,
    Bell,
    ArrowRight,
    Clock,
    AlertCircle,
    CheckCircle2,
    Award,
    Plus,
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
    PieChart,
    Pie,
    Cell,
} from 'recharts';

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

export default function HODDashboard() {
    const { state } = useApp();
    const departmentName = 'Computer Science & Engineering';
    const departmentCode = 'CSE';
    const deptStudents = Math.floor(state.students.length * 0.3);
    const deptFaculty = Math.floor(state.faculty.length * 0.25);
    const deptCourses = Math.floor(state.courses.length * 0.2);

    const recentAttendance = state.attendance.slice(-50);
    const avgAttendance = recentAttendance.length > 0
        ? Math.round((recentAttendance.filter((a) => a.status === 'present').length / recentAttendance.length) * 100)
        : 0;

    const pendingLeaves = state.leaveApplications.filter((l) => l.status === 'pending').length;

    const semesterData = [
        { semester: '1st', students: Math.floor(deptStudents * 0.18) },
        { semester: '2nd', students: Math.floor(deptStudents * 0.17) },
        { semester: '3rd', students: Math.floor(deptStudents * 0.16) },
        { semester: '4th', students: Math.floor(deptStudents * 0.15) },
        { semester: '5th', students: Math.floor(deptStudents * 0.14) },
        { semester: '6th', students: Math.floor(deptStudents * 0.10) },
        { semester: '7th', students: Math.floor(deptStudents * 0.06) },
        { semester: '8th', students: Math.floor(deptStudents * 0.04) },
    ];

    const facultyWorkload = [
        { name: 'Teaching', value: 45, color: '#3B82F6' },
        { name: 'Research', value: 25, color: '#10B981' },
        { name: 'Admin', value: 15, color: '#F59E0B' },
        { name: 'Mentoring', value: 15, color: '#8B5CF6' },
    ];

    const weeklyAttendance = [
        { day: 'Mon', rate: 92 },
        { day: 'Tue', rate: 88 },
        { day: 'Wed', rate: 91 },
        { day: 'Thu', rate: 85 },
        { day: 'Fri', rate: 79 },
        { day: 'Sat', rate: 65 },
    ];

    const activities = [
        { title: 'New student registration', description: 'Rahul Sharma joined CSE 1st year', time: '10 min ago' },
        { title: 'Leave approved', description: 'Dr. Priya leave from 15-17 Feb', time: '1 hour ago' },
        { title: 'Course syllabus updated', description: 'Data Structures syllabus revised', time: '2 hours ago' },
        { title: 'Result published', description: '3rd semester results declared', time: '3 hours ago' },
        { title: 'Faculty meeting scheduled', description: 'Department meeting on Monday', time: '5 hours ago' },
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 p-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-blue-50 text-blue-600 border-0 font-bold">
                            {departmentCode}
                        </Badge>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Department Panel</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back!</h1>
                    <p className="text-slate-500 mt-1 font-medium">{departmentName} Administration</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 border-slate-200 bg-white shadow-sm hover:bg-slate-50">
                        <Bell className="w-4 h-4 text-slate-600" />
                        Notifications
                        <Badge className="bg-red-500 text-white border-0 text-[10px] w-4 h-4 p-0 flex items-center justify-center">2</Badge>
                    </Button>
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100 border-0">
                        <Plus className="w-4 h-4" />
                        Create Notice
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KPICard
                    title="Total Students"
                    value={deptStudents}
                    subtitle="Currently enrolled"
                    icon={GraduationCap}
                    trend="8% growth"
                    trendUp
                    color="bg-blue-600"
                />
                <KPICard
                    title="Faculty"
                    value={deptFaculty}
                    subtitle="Teaching staff"
                    icon={Users}
                    trend="+2 new"
                    trendUp
                    color="bg-indigo-500"
                />
                <KPICard
                    title="Courses"
                    value={deptCourses}
                    subtitle="Active this sem"
                    icon={BookOpen}
                    color="bg-amber-500"
                />
                <KPICard
                    title="Attendance"
                    value={`${avgAttendance}%`}
                    subtitle="Last 30 days"
                    icon={ClipboardCheck}
                    trend={avgAttendance >= 75 ? 'Healthy' : 'Low'}
                    trendUp={avgAttendance >= 75}
                    color="bg-emerald-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="border-0 shadow-lg lg:col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-blue-600" />
                            Students by Semester
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={semesterData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                                    <XAxis dataKey="semester" stroke="#64748B" fontSize={12} />
                                    <YAxis stroke="#64748B" fontSize={12} />
                                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                    <Bar dataKey="students" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Students" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold text-slate-800">Faculty Workload</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={facultyWorkload} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                                        {facultyWorkload.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 mt-2">
                            {facultyWorkload.map((item) => (
                                <div key={item.name} className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-xs text-slate-600">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <ClipboardCheck className="w-5 h-5 text-blue-600" />
                            Weekly Attendance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[220px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={weeklyAttendance}>
                                    <defs>
                                        <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                                    <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                                    <YAxis stroke="#64748B" fontSize={12} domain={[0, 100]} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="rate" stroke="#3B82F6" strokeWidth={2} fill="url(#colorRate)" name="Attendance %" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg lg:col-span-2">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-slate-800">Department Activities</CardTitle>
                            <Button variant="ghost" size="sm">View All</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[220px] pr-4">
                            <div className="space-y-4">
                                {activities.map((activity, idx) => (
                                    <div key={idx} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{activity.description}</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-slate-400">
                                            <Clock className="w-3 h-3" />
                                            {activity.time}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold text-slate-800">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3">
                        <Link to="/hod/students" className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                            <GraduationCap className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-medium">View Students</span>
                        </Link>
                        <Link to="/hod/faculty" className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                            <Users className="w-5 h-5 text-indigo-600" />
                            <span className="text-sm font-medium">Manage Faculty</span>
                        </Link>
                        <Link to="/hod/attendance" className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                            <ClipboardCheck className="w-5 h-5 text-blue-500" />
                            <span className="text-sm font-medium">Attendance</span>
                        </Link>
                        <Link to="/hod/courses" className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                            <BookOpen className="w-5 h-5 text-slate-600" />
                            <span className="text-sm font-medium">Courses</span>
                        </Link>
                        <Link to="/hod/results" className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                            <Award className="w-5 h-5 text-blue-700" />
                            <span className="text-sm font-medium">Results</span>
                        </Link>
                        <Link to="/hod/leaves" className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                            <Calendar className="w-5 h-5 text-indigo-500" />
                            <span className="text-sm font-medium">Leave Requests</span>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                            Pending Approvals ({pendingLeaves})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50 border border-amber-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">Leave Request</p>
                                        <p className="text-xs text-slate-500">Dr. Sharma - Medical Leave</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-0">Approve</Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">Course Update</p>
                                        <p className="text-xs text-slate-500">ML syllabus revision request</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="text-blue-600 border-blue-200">Review</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
