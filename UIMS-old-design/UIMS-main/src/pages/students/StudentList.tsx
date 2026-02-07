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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { toast } from 'sonner';
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Download, Filter, GraduationCap, Phone, Mail } from 'lucide-react';
import { formatDate, getInitials, getStatusColor, paginate, getTotalPages, filterBySearch } from '@/utils/helpers';

const ITEMS_PER_PAGE = 10;

export default function StudentList() {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

  // Get unique courses and semesters for filters
  const courses = useMemo(() => [...new Set(state.students.map((s) => s.course))], [state.students]);
  const semesters = useMemo(() => [...new Set(state.students.map((s) => s.semester))].sort((a, b) => a - b), [state.students]);

  // Filter students
  const filteredStudents = useMemo(() => {
    let result = state.students;

    // Search filter
    if (searchQuery) {
      result = filterBySearch(result, searchQuery, ['firstName', 'lastName', 'enrollmentNo', 'email', 'phone']);
    }

    // Course filter
    if (courseFilter !== 'all') {
      result = result.filter((s) => s.course === courseFilter);
    }

    // Semester filter
    if (semesterFilter !== 'all') {
      result = result.filter((s) => s.semester === parseInt(semesterFilter));
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((s) => s.status === statusFilter);
    }

    return result;
  }, [state.students, searchQuery, courseFilter, semesterFilter, statusFilter]);

  // Paginate
  const totalPages = getTotalPages(filteredStudents.length, ITEMS_PER_PAGE);
  const paginatedStudents = paginate(filteredStudents, currentPage, ITEMS_PER_PAGE);

  // Handle delete
  const handleDeleteClick = (id: string) => {
    setStudentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      dispatch({ type: 'DELETE_STUDENT', payload: studentToDelete });
      toast.success('Student deleted successfully');
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  // Handle export
  const handleExport = () => {
    const csvContent = [
      ['Enrollment No', 'Name', 'Course', 'Branch', 'Semester', 'Email', 'Phone', 'Status'].join(','),
      ...filteredStudents.map((s) =>
        [s.enrollmentNo, `${s.firstName} ${s.lastName}`, s.course, s.branch, s.semester, s.email, s.phone, s.status].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Students exported successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Students</h2>
          <p className="text-slate-500">Manage student records and information</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/students/add">
              <Plus className="w-4 h-4 mr-2" />
              Add Student
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
                placeholder="Search by name, enrollment no, email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={courseFilter} onValueChange={(v) => { setCourseFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={semesterFilter} onValueChange={(v) => { setSemesterFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {semesters.map((s) => (
                    <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
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
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Enrollment No</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2">
                        <GraduationCap className="w-12 h-12 text-slate-300" />
                        <p className="text-slate-500">No students found</p>
                        <Button variant="outline" asChild>
                          <Link to="/students/add">Add Student</Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedStudents.map((student, index) => (
                    <TableRow key={student.id} className="hover:bg-slate-50/50">
                      <TableCell className="font-medium text-slate-500">
                        {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={student.photo} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {getInitials(`${student.firstName} ${student.lastName}`)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-slate-800">{student.firstName} {student.lastName}</p>
                            <p className="text-xs text-slate-500">{student.gender === 'male' ? 'Male' : student.gender === 'female' ? 'Female' : 'Other'}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">{student.enrollmentNo}</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{student.course}</p>
                          <p className="text-xs text-slate-500">{student.branch}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">Sem {student.semester}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span className="text-slate-600 text-xs">{student.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span className="text-slate-600 text-xs">{student.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/students/profile/${student.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/students/edit/${student.id}`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(student.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredStudents.length > 0 && (
            <div className="flex items-center justify-between px-4 py-4 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredStudents.length)} of{' '}
                {filteredStudents.length} students
              </p>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this student? This action cannot be undone.
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
