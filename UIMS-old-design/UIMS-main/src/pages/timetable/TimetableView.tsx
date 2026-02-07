import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Calendar, Download, Printer } from 'lucide-react';
import { toast } from 'sonner';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 01:00',
  '01:00 - 02:00',
  '02:00 - 03:00',
  '03:00 - 04:00',
  '04:00 - 05:00',
];

export default function TimetableView() {
  const { state } = useApp();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  const courses = [...new Set(state.students.map((s) => s.course))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Timetable</h2>
          <p className="text-slate-500">View and manage class schedules</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info('Print feature coming soon')}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={() => toast.info('Download feature coming soon')}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-3 bg-slate-50 text-left text-sm font-medium text-slate-600">Time / Day</th>
                  {days.map((day) => (
                    <th key={day} className="border p-3 bg-slate-50 text-center text-sm font-medium text-slate-600 min-w-[120px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot) => (
                  <tr key={slot}>
                    <td className="border p-3 text-sm font-medium text-slate-600 bg-slate-50">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {slot}
                      </div>
                    </td>
                    {days.map((day) => (
                      <td key={`${day}-${slot}`} className="border p-3 text-center">
                        <div className="text-xs text-slate-400">-</div>
                      </td>
                    ))}
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
