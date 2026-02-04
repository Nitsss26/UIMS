import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, TrendingUp, Award } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency, getStatusColor } from '@/utils/helpers';

export default function Results() {
  const { state } = useApp();

  const handleExport = () => {
    toast.info('Export feature coming soon');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Results</h2>
          <p className="text-slate-500">View and manage examination results</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export Results
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Results</p>
                <p className="text-xl font-bold">{state.results.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Pass Rate</p>
                <p className="text-xl font-bold">
                  {state.results.length > 0
                    ? Math.round(
                        (state.results.filter((r) => r.status === 'pass').length / state.results.length) * 100
                      )
                    : 0}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Top Grade (O)</p>
                <p className="text-xl font-bold">{state.results.filter((r) => r.grade === 'O').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Avg CGPA</p>
                <p className="text-xl font-bold">
                  {state.students.length > 0
                    ? (state.students.reduce((sum, s) => sum + (s.cgpa || 0), 0) / state.students.length).toFixed(2)
                    : '0.00'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Examination Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Exam</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Marks</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Grade</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Grade Point</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {state.results.map((result) => {
                  const student = state.students.find((s) => s.id === result.studentId);
                  const exam = state.exams.find((e) => e.id === result.examId);
                  return (
                    <tr key={result.id}>
                      <td className="px-4 py-3">
                        <p className="font-medium">{student?.firstName} {student?.lastName}</p>
                        <p className="text-xs text-slate-500">{student?.enrollmentNo}</p>
                      </td>
                      <td className="px-4 py-3">{exam?.name}</td>
                      <td className="px-4 py-3 text-center">
                        {result.marksObtained}/{exam?.maxMarks}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant="secondary">{result.grade}</Badge>
                      </td>
                      <td className="px-4 py-3 text-center">{result.gradePoint}</td>
                      <td className="px-4 py-3 text-center">
                        <Badge className={getStatusColor(result.status)}>{result.status}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
