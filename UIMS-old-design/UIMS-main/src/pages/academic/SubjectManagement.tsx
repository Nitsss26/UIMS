import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Clock, Award } from 'lucide-react';

export default function SubjectManagement() {
  const { state } = useApp();

  // Get all subjects from all courses
  const allSubjects = state.courses.flatMap((course) =>
    course.branches.flatMap((branch) =>
      branch.subjects.map((subject) => ({
        ...subject,
        course: course.name,
        branch: branch.name,
      }))
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Subject Management</h2>
          <p className="text-slate-500">Manage subjects and their details</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Subject
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Subject Code</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Subject Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Course</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Branch</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Credits</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Semester</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allSubjects.map((subject) => (
                  <tr key={subject.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-sm">{subject.code}</td>
                    <td className="px-4 py-3 font-medium">{subject.name}</td>
                    <td className="px-4 py-3">{subject.course}</td>
                    <td className="px-4 py-3">{subject.branch}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="secondary">{subject.credits}</Badge>
                    </td>
                    <td className="px-4 py-3 text-center">{subject.semester}</td>
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
