import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Save, FileText, CheckCircle } from 'lucide-react';
import { generateId, calculateGrade } from '@/utils/helpers';

export default function MarksEntry() {
  const { state, dispatch } = useApp();
  const [selectedExam, setSelectedExam] = useState('');
  const [marks, setMarks] = useState<Record<string, number>>({});

  const selectedExamData = state.exams.find((e) => e.id === selectedExam);

  const filteredStudents = selectedExamData
    ? state.students.filter(
        (s) =>
          s.course === selectedExamData.course &&
          s.branch === selectedExamData.branch &&
          s.semester === selectedExamData.semester
      )
    : [];

  const handleSave = () => {
    if (!selectedExam) {
      toast.error('Please select an exam');
      return;
    }

    Object.entries(marks).forEach(([studentId, mark]) => {
      const result = {
        id: generateId('RES'),
        examId: selectedExam,
        studentId,
        marksObtained: mark,
        grade: calculateGrade(mark, selectedExamData?.maxMarks || 100),
        gradePoint: mark >= 33 ? Math.min(10, Math.floor(mark / 10) + 1) : 0,
        status: (mark >= (selectedExamData?.passingMarks || 33) ? 'pass' : 'fail') as 'pass' | 'fail',
      };
      dispatch({ type: 'ADD_RESULT', payload: result });
    });

    toast.success('Marks saved successfully');
    setMarks({});
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Marks Entry</h2>
          <p className="text-slate-500">Enter examination marks for students</p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save Marks
        </Button>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger className="w-full md:w-[400px]">
              <SelectValue placeholder="Select Exam" />
            </SelectTrigger>
            <SelectContent>
              {state.exams.map((exam) => (
                <SelectItem key={exam.id} value={exam.id}>
                  {exam.name} - {exam.course} (Sem {exam.semester})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedExam && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Enter Marks
              <Badge variant="secondary" className="ml-2">
                Max: {selectedExamData?.maxMarks}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">#</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Student</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Enrollment No</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Marks</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Grade</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((student, index) => {
                    const mark = marks[student.id] || 0;
                    const grade = mark ? calculateGrade(mark, selectedExamData?.maxMarks || 100) : '-';
                    const status = mark >= (selectedExamData?.passingMarks || 33) ? 'pass' : 'fail';

                    return (
                      <tr key={student.id}>
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3 font-medium">
                          {student.firstName} {student.lastName}
                        </td>
                        <td className="px-4 py-3 font-mono text-sm">{student.enrollmentNo}</td>
                        <td className="px-4 py-3">
                          <Input
                            type="number"
                            min={0}
                            max={selectedExamData?.maxMarks}
                            value={mark || ''}
                            onChange={(e) =>
                              setMarks({ ...marks, [student.id]: parseInt(e.target.value) || 0 })
                            }
                            className="w-24 mx-auto text-center"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Badge variant="secondary">{grade}</Badge>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {mark > 0 && (
                            <Badge className={status === 'pass' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                              {status === 'pass' ? <CheckCircle className="w-3 h-3 mr-1" /> : null}
                              {status}
                            </Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
