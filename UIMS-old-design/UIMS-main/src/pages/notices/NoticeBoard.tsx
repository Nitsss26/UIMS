import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Plus, Search, Bell, Calendar, AlertCircle, Info, CheckCircle, FileText, Trash2, Eye } from 'lucide-react';
import { formatDate, getStatusColor, filterBySearch } from '@/utils/helpers';

export default function NoticeBoard() {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedNotice, setSelectedNotice] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Filter notices
  const filteredNotices = useMemo(() => {
    let result = state.notices;

    if (searchQuery) {
      result = filterBySearch(result, searchQuery, ['title', 'content']);
    }

    if (categoryFilter !== 'all') {
      result = result.filter((n) => n.category === categoryFilter);
    }

    if (priorityFilter !== 'all') {
      result = result.filter((n) => n.priority === priorityFilter);
    }

    return result.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }, [state.notices, searchQuery, categoryFilter, priorityFilter]);

  const handleDelete = (id: string) => {
    setSelectedNotice(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedNotice) {
      dispatch({ type: 'SET_NOTICES', payload: state.notices.filter((n) => n.id !== selectedNotice) });
      toast.success('Notice deleted successfully');
      setDeleteDialogOpen(false);
      setSelectedNotice(null);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'high':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'normal':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic':
        return <FileText className="w-4 h-4" />;
      case 'examination':
        return <CheckCircle className="w-4 h-4" />;
      case 'events':
        return <Calendar className="w-4 h-4" />;
      case 'holiday':
        return <Calendar className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Notice Board</h2>
          <p className="text-slate-500">View and manage university notices and announcements</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link to="/notices/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Notice
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="examination">Examination</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="holiday">Holiday</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotices.map((notice) => (
          <Card key={notice.id} className="border-0 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  {getPriorityIcon(notice.priority)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 line-clamp-2">{notice.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryIcon(notice.category)}
                      <span className="ml-1 capitalize">{notice.category}</span>
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(notice.priority)}`}>
                      {notice.priority}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600 line-clamp-3 mb-4">{notice.content}</p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="w-3 h-3" />
                  {formatDate(notice.publishDate)}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600"
                    onClick={() => handleDelete(notice.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotices.length === 0 && (
        <div className="text-center py-16">
          <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-700 mb-2">No notices found</h3>
          <p className="text-slate-500 mb-4">Create a new notice to get started</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/notices/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Notice
            </Link>
          </Button>
        </div>
      )}

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Notice</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this notice? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
