import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, MapPin, Users, Clock } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';

export default function EventManagement() {
  const { state } = useApp();

  const allEvents = state.clubs.flatMap((club) =>
    club.events.map((event) => ({ ...event, clubName: club.name }))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Event Management</h2>
          <p className="text-slate-500">Manage club events and activities</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {allEvents.map((event) => (
          <Card key={event.id} className="border-0 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{event.name}</h3>
                  <p className="text-sm text-slate-500">{event.clubName}</p>
                </div>
                <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
              </div>

              <p className="text-sm text-slate-600 mb-4">{event.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{formatDate(event.eventDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{event.startTime} - {event.endTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{event.participants.length} participants</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
