import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, IndianRupee, Edit, Eye } from 'lucide-react';
import { formatCurrency } from '@/utils/helpers';

export default function FeeStructure() {
  const { state } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Fee Structure</h2>
          <p className="text-slate-500">Manage fee structures for different courses</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Fee Structure
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {state.feeStructures.map((fee) => (
          <Card key={fee.id} className="border-0 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{fee.course}</h3>
                  <p className="text-sm text-slate-500">{fee.branch}</p>
                  <Badge variant="secondary" className="mt-1">Semester {fee.semester}</Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(fee.totalFee)}</p>
                  <p className="text-xs text-slate-500">Total Fee</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tuition Fee</span>
                  <span>{formatCurrency(fee.tuitionFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Lab Fee</span>
                  <span>{formatCurrency(fee.labFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Library Fee</span>
                  <span>{formatCurrency(fee.libraryFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Examination Fee</span>
                  <span>{formatCurrency(fee.examinationFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sports Fee</span>
                  <span>{formatCurrency(fee.sportsFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Development Fee</span>
                  <span>{formatCurrency(fee.developmentFee)}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
