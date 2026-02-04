import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { IndianRupee, Search, Plus, Download, CheckCircle, Receipt, User } from 'lucide-react';
import { formatCurrency, formatDate, generateId, generateReceiptNo, getStatusColor, filterBySearch } from '@/utils/helpers';
import type { FeePayment } from '@/types';

export default function FeeCollection() {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    amount: '',
    paymentMode: 'cash',
    transactionId: '',
    remarks: '',
  });

  // Filter students
  const filteredStudents = useMemo(() => {
    if (!searchQuery) return state.students;
    return filterBySearch(state.students, searchQuery, ['firstName', 'lastName', 'enrollmentNo']);
  }, [state.students, searchQuery]);

  // Get student's fee details
  const selectedStudentData = useMemo(() => {
    if (!selectedStudent) return null;
    const student = state.students.find((s) => s.id === selectedStudent);
    if (!student) return null;

    const feeStructure = state.feeStructures.find(
      (f) => f.course === student.course && f.branch === student.branch && f.semester === student.semester
    );

    const payments = state.feePayments.filter((p) => p.studentId === student.id);
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalFee = feeStructure?.totalFee || 0;
    const pending = totalFee - totalPaid;

    return { student, feeStructure, payments, totalPaid, totalFee, pending };
  }, [selectedStudent, state.students, state.feeStructures, state.feePayments]);

  const handlePayment = () => {
    if (!selectedStudentData || !paymentData.amount) return;

    const payment: FeePayment = {
      id: generateId('PAY'),
      studentId: selectedStudent,
      feeStructureId: selectedStudentData.feeStructure?.id || '',
      amount: parseFloat(paymentData.amount),
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMode: paymentData.paymentMode as 'cash' | 'cheque' | 'online' | 'dd',
      transactionId: paymentData.transactionId || undefined,
      receiptNo: generateReceiptNo(),
      semester: selectedStudentData.student.semester,
      year: selectedStudentData.student.year,
      status: 'paid',
      remarks: paymentData.remarks,
    };

    dispatch({ type: 'ADD_FEE_PAYMENT', payload: payment });
    toast.success(`Payment of ${formatCurrency(payment.amount)} received successfully`);
    
    setPaymentDialogOpen(false);
    setPaymentData({ amount: '', paymentMode: 'cash', transactionId: '', remarks: '' });
  };

  const handleExport = () => {
    const csvContent = [
      ['Receipt No', 'Student', 'Amount', 'Date', 'Mode', 'Status'].join(','),
      ...state.feePayments.map((p) => {
        const student = state.students.find((s) => s.id === p.studentId);
        return [p.receiptNo, `${student?.firstName} ${student?.lastName}`, p.amount, p.paymentDate, p.paymentMode, p.status].join(',');
      }),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fee_payments_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Payments exported successfully');
  };

  // Recent payments
  const recentPayments = useMemo(() => {
    return [...state.feePayments].sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()).slice(0, 10);
  }, [state.feePayments]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Fee Collection</h2>
          <p className="text-slate-500">Process fee payments and view collection records</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Search */}
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Search Student
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by name or enrollment number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {searchQuery && (
              <div className="border rounded-lg divide-y max-h-60 overflow-auto">
                {filteredStudents.slice(0, 5).map((student) => (
                  <button
                    key={student.id}
                    onClick={() => {
                      setSelectedStudent(student.id);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {student.firstName[0]}{student.lastName[0]}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{student.firstName} {student.lastName}</p>
                      <p className="text-sm text-slate-500">{student.enrollmentNo} • {student.course}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Selected Student Details */}
            {selectedStudentData && (
              <div className="bg-slate-50 rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                    {selectedStudentData.student.firstName[0]}{selectedStudentData.student.lastName[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedStudentData.student.firstName} {selectedStudentData.student.lastName}</h3>
                    <p className="text-slate-500">{selectedStudentData.student.enrollmentNo}</p>
                    <p className="text-sm text-slate-400">{selectedStudentData.student.course} - Semester {selectedStudentData.student.semester}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-sm text-slate-500">Total Fee</p>
                    <p className="text-xl font-bold">{formatCurrency(selectedStudentData.totalFee)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-sm text-slate-500">Paid</p>
                    <p className="text-xl font-bold text-green-600">{formatCurrency(selectedStudentData.totalPaid)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-sm text-slate-500">Pending</p>
                    <p className="text-xl font-bold text-red-600">{formatCurrency(selectedStudentData.pending)}</p>
                  </div>
                </div>

                {selectedStudentData.pending > 0 && (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => setPaymentDialogOpen(true)}
                  >
                    <IndianRupee className="w-4 h-4 mr-2" />
                    Collect Fee
                  </Button>
                )}

                {selectedStudentData.payments.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Payment History</h4>
                    <div className="space-y-2">
                      {selectedStudentData.payments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                          <div>
                            <p className="font-medium">{formatCurrency(payment.amount)}</p>
                            <p className="text-xs text-slate-500">{formatDate(payment.paymentDate)} • {payment.paymentMode}</p>
                          </div>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.receiptNo}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-blue-600" />
              Recent Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPayments.map((payment) => {
                const student = state.students.find((s) => s.id === payment.studentId);
                return (
                  <div key={payment.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{student?.firstName} {student?.lastName}</p>
                      <p className="text-xs text-slate-500">{formatDate(payment.paymentDate)}</p>
                    </div>
                    <p className="font-semibold text-green-600">{formatCurrency(payment.amount)}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Collect Fee Payment</DialogTitle>
            <DialogDescription>
              Enter payment details for {selectedStudentData?.student.firstName} {selectedStudentData?.student.lastName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Pending Amount</Label>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(selectedStudentData?.pending || 0)}</p>
            </div>
            <div>
              <Label htmlFor="amount">Payment Amount *</Label>
              <Input
                id="amount"
                type="number"
                value={paymentData.amount}
                onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                placeholder="Enter amount"
              />
            </div>
            <div>
              <Label htmlFor="mode">Payment Mode</Label>
              <Select
                value={paymentData.paymentMode}
                onValueChange={(v) => setPaymentData({ ...paymentData, paymentMode: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="dd">Demand Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {paymentData.paymentMode !== 'cash' && (
              <div>
                <Label htmlFor="transactionId">Transaction ID / Cheque No</Label>
                <Input
                  id="transactionId"
                  value={paymentData.transactionId}
                  onChange={(e) => setPaymentData({ ...paymentData, transactionId: e.target.value })}
                  placeholder="Enter transaction reference"
                />
              </div>
            )}
            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Input
                id="remarks"
                value={paymentData.remarks}
                onChange={(e) => setPaymentData({ ...paymentData, remarks: e.target.value })}
                placeholder="Optional remarks"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={!paymentData.amount || parseFloat(paymentData.amount) <= 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
