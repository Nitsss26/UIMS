import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, User, Calendar, ArrowRight, RotateCcw } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';

export default function IssueReturn() {
  const { state } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Issue / Return</h2>
          <p className="text-slate-500">Manage book transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ArrowRight className="w-4 h-4 mr-2" />
            Issue Book
          </Button>
          <Button variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Return Book
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Book</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Member</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Issue Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Due Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Fine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {state.libraryTransactions.map((transaction) => {
                  const book = state.books.find((b) => b.id === transaction.bookId);
                  const student = state.students.find((s) => s.id === transaction.memberId);
                  return (
                    <tr key={transaction.id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-slate-400" />
                          <span className="font-medium">{book?.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span>{student?.firstName} {student?.lastName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{formatDate(transaction.issueDate)}</td>
                      <td className="px-4 py-3">{formatDate(transaction.dueDate)}</td>
                      <td className="px-4 py-3">
                        <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        {transaction.fine > 0 ? (
                          <span className="text-red-600 font-medium">₹{transaction.fine}</span>
                        ) : (
                          <span className="text-slate-400">-</span>
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
    </div>
  );
}
