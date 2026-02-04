import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Bus, Users, Calendar, Wrench } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';

export default function VehicleManagement() {
  const { state } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Vehicle Management</h2>
          <p className="text-slate-500">Manage vehicles and drivers</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Vehicles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="border-0 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Bus className="w-6 h-6 text-amber-600" />
                </div>
                <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
              </div>

              <h3 className="font-semibold text-lg">{vehicle.vehicleNo}</h3>
              <p className="text-sm text-slate-500">{vehicle.model}</p>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>Capacity: {vehicle.capacity} seats</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Registered: {formatDate(vehicle.registrationDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-slate-400" />
                  <span>Insurance: {formatDate(vehicle.insuranceExpiry)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Drivers */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Drivers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">License No</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">License Expiry</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {state.drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td className="px-4 py-3 font-medium">{driver.name}</td>
                    <td className="px-4 py-3">{driver.phone}</td>
                    <td className="px-4 py-3 font-mono text-sm">{driver.licenseNo}</td>
                    <td className="px-4 py-3">{formatDate(driver.licenseExpiry)}</td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(driver.status)}>{driver.status}</Badge>
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
