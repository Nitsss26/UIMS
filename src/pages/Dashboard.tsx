import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrency, formatNumber, getInitials, getStatusColor } from '@/utils/helpers';
import {
  Users,
  UserCircle,
  BookOpen,
  IndianRupee,
  CalendarCheck,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Calendar,
  Clock,
  MoreHorizontal,
  GraduationCap,
  School,
  Bus,
  Library,
  Trophy,
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
  LineChart,
  Line,
} from 'recharts';

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: number;
  trendLabel?: string;
  color: string;
  bgColor: string;
}

function StatsCard({ title, value, subtitle, icon: Icon, trend, trendLabel, color, bgColor }: StatsCardProps) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
            {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
            {trend !== undefined && (
              <div className="flex items-center gap-1 mt-2">
                {trend >= 0 ? (
                  <>
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">{trend}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-600 font-medium">{Math.abs(trend)}%</span>
                  </>
                )}
                {trendLabel && <span className="text-xs text-slate-400 ml-1">{trendLabel}</span>}
              </div>
            )}
          </div>
          <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Quick Action Card
function QuickActionCard({ title, description, icon: Icon, href, color }: { title: string; description: string; icon: React.ElementType; href: string; color: string }) {
  return (
    <Link to={href}>
      <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-800">{title}</h4>
              <p className="text-xs text-slate-500">{description}</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Dashboard() {
  const { state } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate stats
  const totalStudents = state.students.length;
  const totalFaculty = state.faculty.length;
  const totalCourses = state.courses.length;
  const totalRevenue = state.feePayments.reduce((sum, p) => sum + p.amount, 0);
  const avgAttendance = state.students.length > 0
    ? Math.round(state.students.reduce((sum, s) => sum + (s.attendancePercentage || 0), 0) / state.students.length)
    : 0;

  // Gender distribution
  const maleStudents = state.students.filter((s) => s.gender === 'male').length;
  const femaleStudents = state.students.filter((s) => s.gender === 'female').length;

  // Department distribution
  const deptData = state.students.reduce((acc, s) => {
    acc[s.branch] = (acc[s.branch] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Monthly fee collection data
  const monthlyData = [
    { month: 'Jan', income: 450000, expense: 320000 },
    { month: 'Feb', income: 520000, expense: 380000 },
    { month: 'Mar', income: 480000, expense: 350000 },
    { month: 'Apr', income: 610000, expense: 420000 },
    { month: 'May', income: 580000, expense: 400000 },
    { month: 'Jun', income: 720000, expense: 480000 },
  ];

  // Attendance data
  const attendanceData = [
    { day: 'Mon', present: 92, absent: 8 },
    { day: 'Tue', present: 88, absent: 12 },
    { day: 'Wed', present: 95, absent: 5 },
    { day: 'Thu', present: 90, absent: 10 },
    { day: 'Fri', present: 85, absent: 15 },
    { day: 'Sat', present: 78, absent: 22 },
  ];

  // Pie chart colors
  const PIE_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {/* Welcome back, {state.auth.user?.name?.split(' ')[0] || 'Admin'}! */}
            Welcome back, Nitesh!

          </h2>
          <p className="text-slate-500">Here's what's happening at your university today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse" />
            System Online
          </Badge>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date().toLocaleDateString('en-IN')}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard
          title="Total Students"
          value={formatNumber(totalStudents)}
          subtitle="Active enrollments"
          icon={Users}
          trend={12}
          trendLabel="vs last month"
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatsCard
          title="Faculty"
          value={formatNumber(totalFaculty)}
          subtitle="Teaching staff"
          icon={UserCircle}
          trend={5}
          trendLabel="vs last month"
          color="text-emerald-600"
          bgColor="bg-emerald-100"
        />
        <StatsCard
          title="Courses"
          value={formatNumber(totalCourses)}
          subtitle="Active programs"
          icon={BookOpen}
          color="text-amber-600"
          bgColor="bg-amber-100"
        />
        <StatsCard
          title="Revenue"
          value={formatCurrency(totalRevenue)}
          subtitle="Fee collection"
          icon={IndianRupee}
          trend={8}
          trendLabel="vs last month"
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
        <StatsCard
          title="Attendance"
          value={`${avgAttendance}%`}
          subtitle="Average today"
          icon={CalendarCheck}
          trend={-2}
          trendLabel="vs yesterday"
          color="text-rose-600"
          bgColor="bg-rose-100"
        />
        <StatsCard
          title="Library Books"
          value={formatNumber(state.books.length)}
          subtitle="Total collection"
          icon={Library}
          color="text-cyan-600"
          bgColor="bg-cyan-100"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Finance Chart */}
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-slate-800">Financial Overview</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="income" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" name="Income" />
                  <Area type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" name="Expense" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-slate-800">Students by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={Object.entries(deptData).slice(0, 6).map(([name, value]) => ({ name, value }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {Object.entries(deptData).slice(0, 6).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {Object.entries(deptData).slice(0, 4).map(([name, value], index) => (
                <div key={name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                  />
                  <span className="text-xs text-slate-600 truncate">{name}</span>
                  <span className="text-xs font-medium text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <Card className="border-0 shadow-lg flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-slate-800">Weekly Attendance</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="present" fill="#10B981" radius={[4, 4, 0, 0]} name="Present" />
                  <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-0 shadow-lg lg:col-span-1 flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-slate-800">Recent Activities</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/reports">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-4">
                {state.activities.slice(0, 8).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-800">
                        <span className="font-medium">{activity.userName}</span>{' '}
                        <span className="text-slate-500">{activity.description.toLowerCase()}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {new Date(activity.timestamp).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="border-0 shadow-lg flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-slate-800">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
              <QuickActionCard
                title="Add Student"
                description="Register"
                icon={Users}
                href="/students/add"
                color="bg-blue-500"
              />
              <QuickActionCard
                title="Mark Attendance"
                description="Daily"
                icon={CalendarCheck}
                href="/attendance/marking"
                color="bg-emerald-500"
              />
              <QuickActionCard
                title="Collect Fee"
                description="Payments"
                icon={IndianRupee}
                href="/fees/collection"
                color="bg-amber-500"
              />
              <QuickActionCard
                title="Create Notice"
                description="Post"
                icon={Bell}
                href="/notices/create"
                color="bg-purple-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Notices */}
        <Card className="border-0 shadow-lg lg:col-span-1 flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-slate-800">Recent Notices</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/notices/board">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ScrollArea className="h-[280px] pr-4">
              <div className="space-y-4">
                {state.notices.slice(0, 4).map((notice) => (
                  <div key={notice.id} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${notice.priority === 'urgent' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                      notice.priority === 'high' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' :
                        notice.priority === 'normal' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-gray-400'
                      }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="font-semibold text-slate-800 text-sm">{notice.title}</h4>
                        <Badge variant="secondary" className={`text-[10px] py-0 px-2 h-5 font-bold uppercase tracking-wider ${getStatusColor(notice.category)}`}>
                          {notice.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">{notice.content}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-slate-400 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(notice.publishDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                        </span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${getStatusColor(notice.priority)}`}>
                          {notice.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Transport</p>
                <p className="text-2xl font-bold">{state.vehicles.length}</p>
                <p className="text-blue-100 text-xs">Active vehicles</p>
              </div>
              <Bus className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Library</p>
                <p className="text-2xl font-bold">{state.books.reduce((sum, b) => sum + b.available, 0)}</p>
                <p className="text-emerald-100 text-xs">Books available</p>
              </div>
              <Library className="w-10 h-10 text-emerald-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm">Clubs</p>
                <p className="text-2xl font-bold">{state.clubs.length}</p>
                <p className="text-amber-100 text-xs">Active clubs</p>
              </div>
              <Trophy className="w-10 h-10 text-amber-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Hostel</p>
                <p className="text-2xl font-bold">{state.hostels.reduce((sum, h) => sum + h.rooms.filter(r => r.status === 'available').length, 0)}</p>
                <p className="text-purple-100 text-xs">Rooms available</p>
              </div>
              <School className="w-10 h-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
