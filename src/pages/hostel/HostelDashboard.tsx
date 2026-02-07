import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
    Bed,
    Users,
    ClipboardCheck,
    TrendingUp,
    Wrench,
    Utensils,
    Shield,
} from 'lucide-react';
import {
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
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

export default function HostelDashboard() {
    const { state } = useApp();

    const occupancyData = [
        { name: 'Boys Hostel A', value: 85, color: '#3B82F6' },
        { name: 'Boys Hostel B', value: 72, color: '#6366F1' },
        { name: 'Girls Hostel A', value: 94, color: '#8B5CF6' },
        { name: 'Girls Hostel B', value: 88, color: '#CBD5E1' },
    ];

    const maintenanceRequests = [
        { student: 'Rahul Sharma', room: 'B-201', issue: 'Leaking Tap', priority: 'High', date: 'Just now' },
        { student: 'Priya Verma', room: 'G-105', issue: 'Wifi Router', priority: 'Medium', date: '1 hour ago' },
        { student: 'Amit Gupta', room: 'B-304', issue: 'Fan Noise', priority: 'Low', date: '3 hours ago' },
        { student: 'Sneha Patel', room: 'G-212', issue: 'Light Bulb', priority: 'Low', date: 'Yesterday' },
    ];

    const messMenuToday = {
        breakfast: 'Puri Bhaji, Tea',
        lunch: 'Dal Makhani, Mix Veg, Roti, Rice',
        dinner: 'Paneer Butter Masala, Roti, Kheer'
    };

    return (
        <div className="p-6 bg-slate-50/50 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Warden Dashboard</h1>
                    <p className="text-slate-500 mt-1 font-medium">Hostel occupancy and residential status.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-slate-200 bg-white shadow-sm hover:bg-slate-50 font-medium">Daily Report</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100 border-0 font-medium">New Allotment</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Available Beds" value="84" subtitle="Ready for allocation" icon={Bed} color="bg-gradient-to-br from-indigo-500 to-indigo-600" />
                <StatCard title="Maintenace Tasks" value="12" subtitle="Pending works" trend="5 Urgent" icon={Wrench} color="bg-gradient-to-br from-slate-700 to-slate-800" />
                <StatCard title="Today's Visitors" value="28" subtitle="Check-ins logged" icon={Shield} color="bg-gradient-to-br from-blue-600 to-indigo-700" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg lg:col-span-1">
                    <CardHeader className="border-b border-slate-50">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            Occupancy by Block
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={occupancyData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                        {occupancyData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-3 mt-4">
                            {occupancyData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-slate-600">{item.name}</span>
                                    </div>
                                    <span className="font-semibold text-slate-800">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-0 shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Utensils className="w-6 h-6" />
                                    Today's Mess Menu
                                </h3>
                                <Badge className="bg-white/20 text-white border-0">Friday, 16 Feb</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <p className="text-blue-100 text-xs uppercase font-bold mb-1">Breakfast</p>
                                    <p className="text-sm font-medium">{messMenuToday.breakfast}</p>
                                </div>
                                <div>
                                    <p className="text-blue-100 text-xs uppercase font-bold mb-1">Lunch</p>
                                    <p className="text-sm font-medium">{messMenuToday.lunch}</p>
                                </div>
                                <div>
                                    <p className="text-blue-100 text-xs uppercase font-bold mb-1">Dinner</p>
                                    <p className="text-sm font-medium">{messMenuToday.dinner}</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-0 shadow-lg">
                        <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Wrench className="w-5 h-5 text-blue-600" />
                                Maintenance Tickets
                            </CardTitle>
                            <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[300px]">
                                <div className="divide-y divide-slate-100">
                                    {maintenanceRequests.map((req, idx) => (
                                        <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full",
                                                    req.priority === 'High' ? "bg-rose-500" :
                                                        req.priority === 'Medium' ? "bg-amber-500" : "bg-blue-500"
                                                )} />
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">{req.issue}</p>
                                                    <p className="text-xs text-slate-500">Room {req.room} - {req.student}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <Badge variant="outline" className={cn(
                                                    "text-[10px] font-bold",
                                                    req.priority === 'High' ? "text-rose-600 border-rose-200 bg-rose-50" :
                                                        req.priority === 'Medium' ? "text-amber-600 border-amber-200 bg-amber-50" : "text-blue-600 border-blue-200 bg-blue-50"
                                                )}>
                                                    {req.priority} Priority
                                                </Badge>
                                                <p className="text-[10px] text-slate-400 mt-1">{req.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
