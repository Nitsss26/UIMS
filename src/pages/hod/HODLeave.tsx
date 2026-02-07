import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Check, X, FileText, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function HODLeave() {
    const [leaves, setLeaves] = useState<any[]>([]);

    useEffect(() => {
        // Load all faculty leaves
        const allLeaves = JSON.parse(localStorage.getItem('faculty_leaves') || '[]');
        setLeaves(allLeaves);
    }, []);

    const handleAction = (id: string, newStatus: 'approved' | 'rejected') => {
        const updatedLeaves = leaves.map(l =>
            l.id === id ? { ...l, status: newStatus } : l
        );
        setLeaves(updatedLeaves);
        localStorage.setItem('faculty_leaves', JSON.stringify(updatedLeaves));
        toast.success(`Leave request marked as ${newStatus}`);
    };

    const pendingLeaves = leaves.filter(l => l.status === 'pending');
    const historyLeaves = leaves.filter(l => l.status !== 'pending');

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Leave Approvals</h2>
                <p className="text-slate-500">Manage faculty leave requests</p>
            </div>

            <Tabs defaultValue="pending">
                <TabsList>
                    <TabsTrigger value="pending">Pending Requests ({pendingLeaves.length})</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-4">
                    {pendingLeaves.length === 0 ? (
                        <Card className="border-0 shadow-sm py-12 text-center text-slate-500">
                            <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            No pending leave requests
                        </Card>
                    ) : (
                        <div className="grid gap-4">
                            {pendingLeaves.map((leave) => (
                                <Card key={leave.id} className="border-0 shadow-md">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-slate-800">{leave.facultyName}</h3>
                                                    <p className="text-xs text-slate-500">{leave.department} • Applied on {new Date(leave.appliedOn).toLocaleDateString()}</p>

                                                    <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-600">
                                                        <div>
                                                            <span className="font-medium text-slate-500">Type:</span> {leave.type.toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium text-slate-500">Duration:</span> {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                                                        </div>
                                                        <div className="col-span-2 mt-1">
                                                            <span className="font-medium text-slate-500">Reason:</span>
                                                            <p className="bg-slate-50 p-2 rounded mt-1 text-slate-700">{leave.reason}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 self-start md:self-center">
                                                <Button onClick={() => handleAction(leave.id, 'approved')} className="bg-green-600 hover:bg-green-700">
                                                    <Check className="w-4 h-4 mr-2" /> Approve
                                                </Button>
                                                <Button onClick={() => handleAction(leave.id, 'rejected')} variant="destructive">
                                                    <X className="w-4 h-4 mr-2" /> Reject
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="history" className="mt-4">
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-3 font-medium">Faculty</th>
                                            <th className="px-6 py-3 font-medium">Type</th>
                                            <th className="px-6 py-3 font-medium">Dates</th>
                                            <th className="px-6 py-3 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {historyLeaves.map((leave) => (
                                            <tr key={leave.id} className="hover:bg-slate-50/50">
                                                <td className="px-6 py-3">
                                                    <div>
                                                        <div className="font-medium text-slate-800">{leave.facultyName}</div>
                                                        <div className="text-xs text-slate-500">{leave.department}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3 capitalize">{leave.type}</td>
                                                <td className="px-6 py-3 text-slate-600">
                                                    {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-3">
                                                    <Badge className={leave.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                                                        {leave.status.toUpperCase()}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
