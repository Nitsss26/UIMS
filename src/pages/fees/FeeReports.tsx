import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, IndianRupee, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency, formatNumber, getStatusColor } from '@/utils/helpers';
import { toast } from 'sonner';

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

export default function FeeReports() {
  const { state } = useApp();

  const totalCollected = state.feePayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPending = state.feeStructures.reduce((sum, f) => sum + f.totalFee, 0) - totalCollected;
  const totalStudents = state.students.length;
  const paidStudents = new Set(state.feePayments.map((p) => p.studentId)).size;

  const paymentModeData = [
    { name: 'Cash', value: state.feePayments.filter((p) => p.paymentMode === 'cash').length },
    { name: 'Online', value: state.feePayments.filter((p) => p.paymentMode === 'online').length },
    { name: 'Cheque', value: state.feePayments.filter((p) => p.paymentMode === 'cheque').length },
  ];

  const monthlyData = [
    { month: 'Jan', collected: 450000 },
    { month: 'Feb', collected: 520000 },
    { month: 'Mar', collected: 480000 },
    { month: 'Apr', collected: 610000 },
    { month: 'May', collected: 580000 },
    { month: 'Jun', collected: 720000 },
  ];

  const handleExport = () => {
    toast.info('Export feature coming soon');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Fee Reports</h2>
          <p className="text-slate-500">Comprehensive fee collection reports</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Collected</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalCollected)}</p>
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
                <p className="text-sm text-slate-500">Pending Amount</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(Math.max(0, totalPending))}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Students Paid</p>
                <p className="text-2xl font-bold">{formatNumber(paidStudents)}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Collection Rate</p>
                <p className="text-2xl font-bold">{Math.round((paidStudents / totalStudents) * 100)}%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Monthly Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="collected" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Payment Modes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentModeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentModeData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {paymentModeData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm text-slate-600">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Payments */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Receipt No</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Mode</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {state.feePayments.slice(0, 10).map((payment) => {
                  const student = state.students.find((s) => s.id === payment.studentId);
                  return (
                    <tr key={payment.id}>
                      <td className="px-4 py-3 font-mono text-sm">{payment.receiptNo}</td>
                      <td className="px-4 py-3">{student?.firstName} {student?.lastName}</td>
                      <td className="px-4 py-3 font-medium">{formatCurrency(payment.amount)}</td>
                      <td className="px-4 py-3">{payment.paymentDate}</td>
                      <td className="px-4 py-3 capitalize">{payment.paymentMode}</td>
                      <td className="px-4 py-3">
                        <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
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
