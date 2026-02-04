import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Building2, Users, Bed, IndianRupee } from 'lucide-react';
import { formatCurrency, getStatusColor } from '@/utils/helpers';

export default function HostelAllocation() {
  const { state } = useApp();

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
