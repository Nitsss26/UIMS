import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Trophy, Calendar, ArrowRight } from 'lucide-react';

export default function ClubsList() {
  const { state } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Clubs & Activities</h2>
          <p className="text-slate-500">Manage student clubs and extracurricular activities</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Club
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.clubs.map((club) => (
          <Card key={club.id} className="border-0 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <Badge variant={club.status === 'active' ? 'default' : 'secondary'}>{club.status}</Badge>
              </div>

              <h3 className="font-semibold text-lg mb-1">{club.name}</h3>
              <p className="text-sm text-slate-500 mb-3">{club.description}</p>

              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{club.members.length} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{club.events.length} events</span>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">
                View Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
