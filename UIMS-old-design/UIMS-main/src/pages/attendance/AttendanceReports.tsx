import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Download, Calendar, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { formatDate, getStatusColor, filterBySearch } from '@/utils/helpers';

const COLORS = ['#10B981', '#EF4444', '#F59E0B'];

export default function AttendanceReports() {
  const { state } = useApp();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique courses
  const courses = useMemo(() => [...new Set(state.students.map((s) => s.course))], [state.students]);
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  // Filter students
  const filteredStudents = useMemo(() => {
    let result = state.students;
    if (selectedCourse && selectedCourse !== 'all') result = result.filter((s) => s.course === selectedCourse);
    if (selectedSemester && selectedSemester !== 'all') result = result.filter((s) => s.semester === parseInt(selectedSemester));
    if (searchQuery) result = filterBySearch(result, searchQuery, ['firstName', 'lastName', 'enrollmentNo']);
    return result;
  }, [state.students, selectedCourse, selectedSemester, searchQuery]);

  // Calculate attendance stats
  const attendanceStats = useMemo(() => {
    const stats = filteredStudents.map((student) => {
      const studentAttendance = state.attendance.filter(
        (a) => a.studentId === student.id && (!selectedSubject || selectedSubject === 'all' || a.subjectId === selectedSubject)
      );
      const total = studentAttendance.length;
      const present = studentAttendance.filter((a) => a.status === 'present').length;
      const absent = studentAttendance.filter((a) => a.status === 'absent').length;
      const leave = studentAttendance.filter((a) => a.status === 'leave').length;
      const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

      return {
        student,
        name: `${student.firstName} ${student.lastName}`,
        enrollmentNo: student.enrollmentNo,
        total,
        present,
        absent,
        leave,
        percentage,
      };
    });

    return stats;
  }, [filteredStudents, state.attendance, selectedSubject]);

  // Overall stats
  const overallStats = useMemo(() => {
    const totalStudents = attendanceStats.length;
    const avgAttendance = totalStudents > 0
      ? Math.round(attendanceStats.reduce((sum, s) => sum + s.percentage, 0) / totalStudents)
      : 0;
    const lowAttendance = attendanceStats.filter((s) => s.percentage < 75).length;

    return { totalStudents, avgAttendance, lowAttendance };
  }, [attendanceStats]);

  // Chart data
  const chartData = useMemo(() => {
    const present = attendanceStats.reduce((sum, s) => sum + s.present, 0);
    const absent = attendanceStats.reduce((sum, s) => sum + s.absent, 0);
    const leave = attendanceStats.reduce((sum, s) => sum + s.leave, 0);

    return [
      { name: 'Present', value: present },
      { name: 'Absent', value: absent },
      { name: 'Leave', value: leave },
    ];
  }, [attendanceStats]);

  const handleExport = () => {
    const csvContent = [
      ['Enrollment No', 'Name', 'Course', 'Semester', 'Total Classes', 'Present', 'Absent', 'Leave', 'Percentage'].join(','),
      ...attendanceStats.map(({ student, total, present, absent, leave, percentage }) =>
        [student.enrollmentNo, `${student.firstName} ${student.lastName}`, student.course, student.semester, total, present, absent, leave, `${percentage}%`].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Attendance report exported successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Attendance Reports</h2>
          <p className="text-slate-500">View and analyze attendance statistics</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Students</p>
                <p className="text-2xl font-bold">{overallStats.totalStudents}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Average Attendance</p>
                <p className="text-2xl font-bold">{overallStats.avgAttendance}%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Low Attendance (&lt;75%)</p>
                <p className="text-2xl font-bold text-red-600">{overallStats.lowAttendance}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {semesters.map((s) => (
                  <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {(state.courses.find((c) => c.name === selectedCourse)?.branches || [])
                  .flatMap((b) => b.subjects)
                  .map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <input
              type="text"
              placeholder="Search student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 px-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Attendance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {chartData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm text-slate-600">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Department-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceStats.slice(0, 10)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="enrollmentNo" stroke="#64748B" fontSize={10} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Attendance List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Student-wise Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Course</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Total</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Present</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Absent</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Percentage</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attendanceStats.map(({ student, total, present, percentage }) => (
                  <tr key={student.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                          {student.firstName[0]}{student.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium">{student.firstName} {student.lastName}</p>
                          <p className="text-xs text-slate-500">{student.enrollmentNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm">{student.course}</p>
                      <p className="text-xs text-slate-500">Sem {student.semester}</p>
                    </td>
                    <td className="px-4 py-3 text-center">{total}</td>
                    <td className="px-4 py-3 text-center text-green-600">{present}</td>
                    <td className="px-4 py-3 text-center text-red-600">{total - present}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Progress value={percentage} className="w-20 h-2" />
                        <span className="text-sm font-medium">{percentage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {percentage >= 75 ? (
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Good
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          At Risk
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
