import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Clock, MapPin, FileText } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';

export default function ExamSchedule() {
  const { state } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Exam Schedule</h2>
          <p className="text-slate-500">Manage examination schedules and timetables</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Exam
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {state.exams.map((exam) => (
          <Card key={exam.id} className="border-0 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{exam.name}</h3>
                  <p className="text-sm text-slate-500">{exam.course} - {exam.branch}</p>
                </div>
                <Badge className={getStatusColor(exam.status)}>{exam.status}</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{formatDate(exam.examDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{exam.startTime} - {exam.endTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{exam.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>Max Marks: {exam.maxMarks} | Passing: {exam.passingMarks}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <Badge variant="secondary">Semester {exam.semester}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
