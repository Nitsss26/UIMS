import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardContent } from '@/components/ui/card';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Download, Filter, Mail, Phone, BookOpen, UserCircle } from 'lucide-react';
import { formatDate, getInitials, getStatusColor, paginate, getTotalPages, filterBySearch } from '@/utils/helpers';

const ITEMS_PER_PAGE = 12;

export default function FacultyList() {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [designationFilter, setDesignationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState<string | null>(null);

  // Get unique departments and designations for filters
  const departments = useMemo(() => [...new Set(state.faculty.map((f) => f.department))], [state.faculty]);
  const designations = useMemo(() => [...new Set(state.faculty.map((f) => f.designation))], [state.faculty]);

  // Filter faculty
  const filteredFaculty = useMemo(() => {
    let result = state.faculty;

    // Search filter
    if (searchQuery) {
      result = filterBySearch(result, searchQuery, ['firstName', 'lastName', 'employeeId', 'email', 'phone', 'subjects']);
    }

    // Department filter
    if (departmentFilter !== 'all') {
      result = result.filter((f) => f.department === departmentFilter);
    }

    // Designation filter
    if (designationFilter !== 'all') {
      result = result.filter((f) => f.designation === designationFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((f) => f.status === statusFilter);
    }

    return result;
  }, [state.faculty, searchQuery, departmentFilter, designationFilter, statusFilter]);

  // Paginate
  const totalPages = getTotalPages(filteredFaculty.length, ITEMS_PER_PAGE);
  const paginatedFaculty = paginate(filteredFaculty, currentPage, ITEMS_PER_PAGE);

  // Handle delete
  const handleDeleteClick = (id: string) => {
    setFacultyToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (facultyToDelete) {
      dispatch({ type: 'DELETE_FACULTY', payload: facultyToDelete });
      toast.success('Faculty deleted successfully');
      setDeleteDialogOpen(false);
      setFacultyToDelete(null);
    }
  };

  // Handle export
  const handleExport = () => {
    const csvContent = [
      ['Employee ID', 'Name', 'Department', 'Designation', 'Email', 'Phone', 'Status'].join(','),
      ...filteredFaculty.map((f) =>
        [f.employeeId, `${f.firstName} ${f.lastName}`, f.department, f.designation, f.email, f.phone, f.status].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `faculty_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Faculty exported successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Faculty</h2>
          <p className="text-slate-500">Manage teaching staff and faculty members</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/admin/faculty/add">
              <Plus className="w-4 h-4 mr-2" />
              Add Faculty
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by name, employee ID, email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={departmentFilter} onValueChange={(v) => { setDepartmentFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={designationFilter} onValueChange={(v) => { setDesignationFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Designations</SelectItem>
                  {designations.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Grid */}
      {paginatedFaculty.length === 0 ? (
        <div className="text-center py-16">
          <UserCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-700 mb-2">No faculty found</h3>
          <p className="text-slate-500 mb-4">Try adjusting your filters or add a new faculty member</p>
          <Button asChild>
            <Link to="/admin/faculty/add">Add Faculty</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedFaculty.map((faculty) => (
            <Card key={faculty.id} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={faculty.photo} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                      {getInitials(`${faculty.firstName} ${faculty.lastName}`)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <Link to={`/admin/faculty/profile/${faculty.id}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <Link to={`/admin/faculty/edit/${faculty.id}`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600"
                      onClick={() => handleDeleteClick(faculty.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-800">{faculty.firstName} {faculty.lastName}</h3>
                  <p className="text-sm text-slate-500">{faculty.designation}</p>
                  <p className="text-xs text-slate-400">{faculty.department}</p>

                  <div className="flex items-center gap-2 mt-3">
                    <Badge className={getStatusColor(faculty.status)}>
                      {faculty.status.replace('_', ' ')}
                    </Badge>
                    <Badge variant="secondary">{faculty.experience} yrs exp</Badge>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600 text-xs truncate">{faculty.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600 text-xs">{faculty.phone}</span>
                    </div>
                  </div>

                  {faculty.subjects.length > 0 && (
                    <div className="pt-2">
                      <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                        <BookOpen className="w-3 h-3" />
                        <span>Subjects:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {faculty.subjects.slice(0, 3).map((subject, idx) => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {subject}
                          </span>
                        ))}
                        {faculty.subjects.length > 3 && (
                          <span className="text-xs text-slate-400">+{faculty.subjects.length - 3}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredFaculty.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredFaculty.length)} of{' '}
            {filteredFaculty.length} faculty
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? 'bg-blue-600' : ''}
                >
                  {page}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Faculty</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this faculty member? This action cannot be undone.
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
