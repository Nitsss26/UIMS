import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IndianRupee, Users, TrendingUp, Download, Plus } from 'lucide-react';
import { formatCurrency, getStatusColor } from '@/utils/helpers';
import { toast } from 'sonner';

export default function SalaryDashboard() {
  const { state } = useApp();

  const totalSalaryPaid = state.salaries
    .filter((s) => s.status === 'paid')
    .reduce((sum, s) => sum + s.netSalary, 0);

  const pendingSalaries = state.salaries.filter((s) => s.status === 'pending').length;

  const handleExport = () => {
    toast.info('Export feature coming soon');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Salary Dashboard</h2>
          <p className="text-slate-500">Manage faculty salaries and payroll</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Process Salary
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Salary Paid</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalSalaryPaid)}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Pending Salaries</p>
                <p className="text-2xl font-bold text-amber-600">{pendingSalaries}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Faculty</p>
                <p className="text-2xl font-bold">{state.faculty.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Salary Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Faculty</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Month/Year</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Gross Salary</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Deductions</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Net Salary</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {state.salaries.map((salary) => {
                  const faculty = state.faculty.find((f) => f.id === salary.facultyId);
                  return (
                    <tr key={salary.id}>
                      <td className="px-4 py-3">
                        <p className="font-medium">{faculty?.firstName} {faculty?.lastName}</p>
                        <p className="text-xs text-slate-500">{faculty?.designation}</p>
                      </td>
                      <td className="px-4 py-3">
                        {salary.month}/{salary.year}
                      </td>
                      <td className="px-4 py-3">{formatCurrency(salary.grossSalary)}</td>
                      <td className="px-4 py-3 text-red-600">{formatCurrency(salary.totalDeductions)}</td>
                      <td className="px-4 py-3 font-medium">{formatCurrency(salary.netSalary)}</td>
                      <td className="px-4 py-3">
                        <Badge className={getStatusColor(salary.status)}>{salary.status}</Badge>
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
