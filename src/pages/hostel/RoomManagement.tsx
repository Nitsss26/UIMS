import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Bed, Users, Wrench, IndianRupee } from 'lucide-react';
import { formatCurrency, getStatusColor } from '@/utils/helpers';

export default function RoomManagement() {
  const { state } = useApp();

  const allRooms = state.hostels.flatMap((hostel) =>
    hostel.rooms.map((room) => ({ ...room, hostelName: hostel.name }))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Room Management</h2>
          <p className="text-slate-500">Manage hostel rooms and facilities</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Room
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Hostel</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Room No</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Floor</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Type</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Capacity</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">Occupied</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Rent</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">{room.hostelName}</td>
                    <td className="px-4 py-3 font-medium">{room.roomNo}</td>
                    <td className="px-4 py-3">{room.floor}</td>
                    <td className="px-4 py-3 capitalize">{room.roomType}</td>
                    <td className="px-4 py-3 text-center">{room.capacity}</td>
                    <td className="px-4 py-3 text-center">{room.occupied}</td>
                    <td className="px-4 py-3">{formatCurrency(room.rent)}</td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
                    </td>
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
