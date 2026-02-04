import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Clock, GraduationCap } from 'lucide-react';

export default function CourseManagement() {
  const { state } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Course Management</h2>
          <p className="text-slate-500">Manage courses, branches, and subjects</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.courses.map((course) => (
          <Card key={course.id} className="border-0 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                  {course.status}
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-800 mb-1">{course.name}</h3>
              <p className="text-sm text-slate-500 mb-3">{course.code}</p>
              
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration} Years</span>
                </div>
                <div className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" />
                  <span>{course.branches.length} Branches</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm font-medium text-slate-700 mb-2">Branches:</p>
                <div className="flex flex-wrap gap-1">
                  {course.branches.slice(0, 3).map((branch) => (
                    <Badge key={branch.id} variant="secondary" className="text-xs">
                      {branch.name}
                    </Badge>
                  ))}
                  {course.branches.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{course.branches.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
