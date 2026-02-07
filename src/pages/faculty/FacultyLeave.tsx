import { useState, useEffect } from 'react';
import { useApp, useAuth } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Calendar, Clock, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function FacultyLeave() {
    const { auth } = useAuth();
    const [leaves, setLeaves] = useState<any[]>([]);
    const [showApplyDialog, setShowApplyDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [leaveType, setLeaveType] = useState('casual');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');

    // Load leaves
    useEffect(() => {
        const allLeaves = JSON.parse(localStorage.getItem('faculty_leaves') || '[]');
        const myLeaves = allLeaves.filter((l: any) => l.facultyId === auth.user?.id);
        setLeaves(myLeaves);
    }, [auth.user?.id, showApplyDialog]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!startDate || !endDate || !reason) {
            toast.error('Please fill all fields');
            setLoading(false);
            return;
        }

        const newLeave = {
            id: Math.random().toString(36).substr(2, 9),
            facultyId: auth.user?.id,
            facultyName: auth.user?.name,
            department: auth.user?.departmentId || 'CSE', // Fallback
            type: leaveType,
            startDate,
            endDate,
            reason,
            status: 'pending',
            appliedOn: new Date().toISOString(),
        };

        const allLeaves = JSON.parse(localStorage.getItem('faculty_leaves') || '[]');
        allLeaves.push(newLeave);
        localStorage.setItem('faculty_leaves', JSON.stringify(allLeaves));

        toast.success('Leave application submitted successfully');
        setLoading(false);
        setShowApplyDialog(false);
        // Reset form
        setReason('');
        setStartDate('');
        setEndDate('');
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved': return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Approved</Badge>;
            case 'rejected': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Rejected</Badge>;
            default: return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pending</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Leave Management</h2>
                    <p className="text-slate-500">Apply for leaves and track status</p>
                </div>
                <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">Apply for Leave</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Apply for Leave</DialogTitle>
                            <DialogDescription>Submit a new leave request for approval.</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Leave Type</Label>
                                <Select value={leaveType} onValueChange={setLeaveType}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="casual">Casual Leave (CL)</SelectItem>
                                        <SelectItem value="medical">Medical Leave (ML)</SelectItem>
                                        <SelectItem value="earned">Earned Leave (EL)</SelectItem>
                                        <SelectItem value="duty">On Duty (OD)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>From Date</Label>
                                    <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>To Date</Label>
                                    <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Reason</Label>
                                <Textarea
                                    placeholder="Enter reason for leave..."
                                    value={reason}
                                    onChange={e => setReason(e.target.value)}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setShowApplyDialog(false)}>Cancel</Button>
                                <Button type="submit" disabled={loading} className="bg-blue-600">Submit Application</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-sm bg-blue-50">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Casual Leave Balance</p>
                            <h3 className="text-2xl font-bold text-slate-800">08 / 12</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm bg-green-50">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Medical Leave Balance</p>
                            <h3 className="text-2xl font-bold text-slate-800">10 / 10</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm bg-purple-50">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Pending Requests</p>
                            <h3 className="text-2xl font-bold text-slate-800">{leaves.filter(l => l.status === 'pending').length}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h3 className="font-semibold text-slate-800">My Leave History</h3>
                </div>
                <div className="overflow-x-auto">
                    {leaves.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">No leave applications found.</div>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Applied On</th>
                                    <th className="px-6 py-3 font-medium">Type</th>
                                    <th className="px-6 py-3 font-medium">Dates</th>
                                    <th className="px-6 py-3 font-medium">Reason</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {leaves.map((leave, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-3 text-slate-600">{new Date(leave.appliedOn).toLocaleDateString()}</td>
                                        <td className="px-6 py-3 capitalize font-medium">{leave.type}</td>
                                        <td className="px-6 py-3 text-slate-600">
                                            {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-3 text-slate-600 max-w-xs truncate">{leave.reason}</td>
                                        <td className="px-6 py-3">{getStatusBadge(leave.status)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
