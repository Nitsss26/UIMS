import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Calendar, Wand2, CheckCircle } from 'lucide-react';

export default function TimetableGenerate() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!selectedCourse || !selectedSemester) {
      toast.error('Please select course and semester');
      return;
    }
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success('Timetable generated successfully');
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Generate Timetable</h2>
        <p className="text-slate-500">Automatically generate class schedules</p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-blue-600" />
            Generation Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Course</label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btech">B.Tech</SelectItem>
                  <SelectItem value="bsc">B.Sc</SelectItem>
                  <SelectItem value="bcom">B.Com</SelectItem>
                  <SelectItem value="ba">B.A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Semester</label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Generation Rules</h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                No teacher conflicts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                No room conflicts
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Optimal subject distribution
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Lab sessions scheduled properly
              </li>
            </ul>
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Timetable
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
