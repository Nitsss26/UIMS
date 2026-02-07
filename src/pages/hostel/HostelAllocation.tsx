import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Building2, Users, Bed, IndianRupee } from 'lucide-react';
import { formatCurrency, getStatusColor } from '@/utils/helpers';

export default function HostelAllocation() {
  const { state } = useApp();
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const loadedRequests = JSON.parse(localStorage.getItem('hostel_requests') || '[]');
    setRequests(loadedRequests);
  }, []);

  const handleStatusUpdate = (id: string, newStatus: 'approved' | 'rejected') => {
    const updatedRequests = requests.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem('hostel_requests', JSON.stringify(updatedRequests));
    toast.success(`Request ${newStatus} successfully`);
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Hostel Allocation</h2>
          <p className="text-slate-500">Manage student hostel allocations</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Allocate Room
        </Button>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <Card className="border-0 shadow-md mb-6">
          <CardHeader>
            <CardTitle>Pending Allocation Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Room Type</th>
                    <th className="px-4 py-3">Block</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((req) => (
                    <tr key={req.id} className="border-b hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium">{req.studentName}</td>
                      <td className="px-4 py-3">{req.roomType}</td>
                      <td className="px-4 py-3">{req.block}</td>
                      <td className="px-4 py-3">{new Date(req.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleStatusUpdate(req.id, 'approved')}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleStatusUpdate(req.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hostels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {state.hostels.map((hostel) => {
          const totalRooms = hostel.rooms.length;
          const occupiedRooms = hostel.rooms.filter((r) => r.status === 'occupied').length;
          const availableRooms = hostel.rooms.filter((r) => r.status === 'available').length;

          return (
            <Card key={hostel.id} className="border-0 shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{hostel.name}</h3>
                      <p className="text-sm text-slate-500 capitalize">{hostel.type} Hostel</p>
                    </div>
                  </div>
                  <Badge variant={hostel.status === 'active' ? 'default' : 'secondary'}>{hostel.status}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold">{totalRooms}</p>
                    <p className="text-xs text-slate-500">Total Rooms</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{availableRooms}</p>
                    <p className="text-xs text-slate-500">Available</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{occupiedRooms}</p>
                    <p className="text-xs text-slate-500">Occupied</p>
                  </div>
                </div>

                <div className="text-sm text-slate-600">
                  <p><span className="font-medium">Address:</span> {hostel.address}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
