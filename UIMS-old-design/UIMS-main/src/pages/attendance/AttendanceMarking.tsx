import { useState, useMemo, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import { CalendarCheck, Check, X, UserMinus, Save, Users } from 'lucide-react';
import { formatDate, generateId, getStatusColor } from '@/utils/helpers';
import type { Attendance } from '@/types';

export default function AttendanceMarking() {
  const { state, dispatch } = useApp();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [attendanceData, setAttendanceData] = useState<Record<string, { id?: string; status: 'present' | 'absent' | 'leave' }>>({});

  // Load existing attendance when date/subject/course/semester changes
  useEffect(() => {
    if (!selectedCourse || !selectedSemester) return;

    const dateStr = selectedDate.toISOString().split('T')[0];
    const existingAttendance = state.attendance.filter(
      (a) => a.date === dateStr && a.subjectId === (selectedSubject || 'GENERAL')
    );

    const newData: Record<string, { id?: string; status: 'present' | 'absent' | 'leave' }> = {};
    existingAttendance.forEach((a) => {
      if (a.status !== 'holiday' && a.status !== 'present' && a.status !== 'absent' && a.status !== 'leave') return;
      newData[a.studentId] = { id: a.id, status: a.status as 'present' | 'absent' | 'leave' };
    });
    setAttendanceData(newData);
  }, [state.attendance, selectedDate, selectedSubject, selectedCourse, selectedSemester]);

  // Get unique courses
  const courses = useMemo(() => [...new Set(state.students.map((s) => s.course))], [state.students]);
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  // Filter students
  const filteredStudents = useMemo(() => {
    return state.students.filter((s) => {
      if (selectedCourse && s.course !== selectedCourse) return false;
      if (selectedSemester && s.semester !== parseInt(selectedSemester)) return false;
      return true;
    });
  }, [state.students, selectedCourse, selectedSemester]);

  // Get subjects for selected course
  const subjects = useMemo(() => {
    if (!selectedCourse) return [];
    const course = state.courses.find((c) => c.name === selectedCourse);
    if (!course) return [];
    return course.branches.flatMap((b) => b.subjects);
  }, [state.courses, selectedCourse]);

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent' | 'leave') => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], status }
    }));
  };

  const handleMarkAll = (status: 'present' | 'absent' | 'leave') => {
    const newData: Record<string, { id?: string; status: 'present' | 'absent' | 'leave' }> = {};
    filteredStudents.forEach((s) => {
      newData[s.id] = { ...attendanceData[s.id], status };
    });
    setAttendanceData(newData);
  };

  const handleSave = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    let savedCount = 0;

    Object.entries(attendanceData).forEach(([studentId, data]) => {
      if (!data.status) return;

      const attendance: Attendance = {
        id: data.id || generateId('ATT'),
        studentId,
        subjectId: selectedSubject || 'GENERAL',
        date: dateStr,
        status: data.status,
        markedBy: state.auth.user?.id || 'ADMIN',
        markedAt: new Date().toISOString(),
      };

      if (data.id) {
        dispatch({ type: 'UPDATE_ATTENDANCE', payload: attendance });
      } else {
        dispatch({ type: 'ADD_ATTENDANCE', payload: attendance });
      }
      savedCount++;
    });

    toast.success(`Attendance saved for ${savedCount} students`);
  };

  const getAttendanceStats = () => {
    const values = Object.values(attendanceData).map(d => d.status);
    return {
      present: values.filter((v) => v === 'present').length,
      absent: values.filter((v) => v === 'absent').length,
      leave: values.filter((v) => v === 'leave').length,
      total: filteredStudents.length,
    };
  };

  const stats = getAttendanceStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Mark Attendance</h2>
          <p className="text-slate-500">Record daily attendance for students</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={Object.keys(attendanceData).length === 0}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Attendance
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Date</label>
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="w-full h-10 px-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Course</label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Semester</label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((s) => (
                    <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Subject (Optional)</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GENERAL">General</SelectItem>
                  {subjects.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1" onClick={() => handleMarkAll('present')}>
                  <Check className="w-4 h-4 mr-1" />
                  All Present
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      {selectedCourse && selectedSemester && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md bg-blue-50">
            <CardContent className="p-4">
              <p className="text-sm text-blue-600">Total Students</p>
              <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-green-50">
            <CardContent className="p-4">
              <p className="text-sm text-green-600">Present</p>
              <p className="text-2xl font-bold text-green-700">{stats.present}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-red-50">
            <CardContent className="p-4">
              <p className="text-sm text-red-600">Absent</p>
              <p className="text-2xl font-bold text-red-700">{stats.absent}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-amber-50">
            <CardContent className="p-4">
              <p className="text-sm text-amber-600">Leave</p>
              <p className="text-2xl font-bold text-amber-700">{stats.leave}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Students List */}
      {selectedCourse && selectedSemester ? (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Students List
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No students found for the selected criteria</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">#</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Student</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Enrollment No</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Status</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((student, index) => (
                      <tr key={student.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                              {getInitials(`${student.firstName} ${student.lastName}`)}
                            </div>
                            <span className="font-medium">{student.firstName} {student.lastName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-sm">{student.enrollmentNo}</td>
                        <td className="px-4 py-3 text-center">
                          {attendanceData[student.id]?.status ? (
                            <Badge className={getStatusColor(attendanceData[student.id].status)}>
                              {attendanceData[student.id].status}
                            </Badge>
                          ) : (
                            <span className="text-slate-400 text-sm">Not marked</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant={attendanceData[student.id]?.status === 'present' ? 'default' : 'outline'}
                              className={attendanceData[student.id]?.status === 'present' ? 'bg-green-600' : ''}
                              onClick={() => handleMarkAttendance(student.id, 'present')}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={attendanceData[student.id]?.status === 'absent' ? 'default' : 'outline'}
                              className={attendanceData[student.id]?.status === 'absent' ? 'bg-red-600' : ''}
                              onClick={() => handleMarkAttendance(student.id, 'absent')}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={attendanceData[student.id]?.status === 'leave' ? 'default' : 'outline'}
                              className={attendanceData[student.id]?.status === 'leave' ? 'bg-amber-600' : ''}
                              onClick={() => handleMarkAttendance(student.id, 'leave')}
                            >
                              <UserMinus className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <CalendarCheck className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-700 mb-2">Select Filters</h3>
            <p className="text-slate-500">Please select course and semester to view students</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}
