import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Edit,
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  BookOpen,
  IndianRupee,
  FileText,
  GraduationCap,
  Award,
  TrendingUp,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { formatDate, getInitials, getStatusColor, calculateAge, formatCurrency } from '@/utils/helpers';

export default function StudentProfile() {
  const { id } = useParams();
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const student = state.students.find((s) => s.id === id);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <GraduationCap className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-semibold text-slate-700">Student not found</h2>
        <p className="text-slate-500 mb-4">The student you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/students">Back to Students</Link>
        </Button>
      </div>
    );
  }

  // Get student's fee payments
  const studentPayments = state.feePayments.filter((p) => p.studentId === student.id);
  const totalPaid = studentPayments.reduce((sum, p) => sum + p.amount, 0);

  // Get student's results
  const studentResults = state.results.filter((r) => r.studentId === student.id);

  // Get student's attendance
  const studentAttendance = state.attendance.filter((a) => a.studentId === student.id);
  const attendancePercentage = student.attendancePercentage || 0;

  const handlePrintIDCard = () => {
    toast.info('ID Card printing feature will be implemented');
  };

  const handleDownloadReport = () => {
    toast.info('Report download feature will be implemented');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/students">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Student Profile</h2>
            <p className="text-slate-500">View and manage student details</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePrintIDCard}>
            <Printer className="w-4 h-4 mr-2" />
            Print ID Card
          </Button>
          <Button variant="outline" onClick={handleDownloadReport}>
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to={`/students/edit/${student.id}`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        </div>
      </div>

      {/* Profile Header Card */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400" />
        <CardContent className="relative pt-0">
          <div className="flex flex-col md:flex-row gap-6 -mt-16">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                <AvatarImage src={student.photo} className="object-cover" />
                <AvatarFallback className="text-3xl bg-blue-100 text-blue-600">
                  {getInitials(`${student.firstName} ${student.lastName}`)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Info */}
            <div className="flex-1 pt-4 md:pt-16">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    {student.firstName} {student.lastName}
                  </h1>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="font-mono text-sm text-slate-500">{student.enrollmentNo}</span>
                    <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                    <Badge variant="secondary">{student.course}</Badge>
                    <Badge variant="outline">Semester {student.semester}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{student.cgpa || '-'}</p>
                    <p className="text-xs text-slate-500">CGPA</p>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600">{attendancePercentage}%</p>
                    <p className="text-xs text-slate-500">Attendance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500">Date of Birth</p>
                        <p className="font-medium">{formatDate(student.dateOfBirth)} ({calculateAge(student.dateOfBirth)} years)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500">Gender</p>
                        <p className="font-medium capitalize">{student.gender}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500">Blood Group</p>
                        <p className="font-medium">{student.bloodGroup || '-'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500">Category</p>
                        <p className="font-medium uppercase">{student.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500">Email</p>
                        <p className="font-medium">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500">Phone</p>
                        <p className="font-medium">{student.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-500">Address</p>
                        <p className="font-medium">{student.address}</p>
                        <p className="font-medium">{student.city}, {student.state} - {student.pincode}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h4 className="font-medium text-slate-700 mb-4">Parent/Guardian Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Father's Name</p>
                      <p className="font-medium">{student.fatherName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Mother's Name</p>
                      <p className="font-medium">{student.motherName || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Parent's Phone</p>
                      <p className="font-medium">{student.parentPhone || '-'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Academic Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600">Current Semester</span>
                        <span className="font-medium">{student.semester}/8</span>
                      </div>
                      <Progress value={(student.semester / 8) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600">Attendance</span>
                        <span className="font-medium">{attendancePercentage}%</span>
                      </div>
                      <Progress value={attendancePercentage} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600">CGPA</span>
                        <span className="font-medium">{student.cgpa || '-'}/10</span>
                      </div>
                      <Progress value={(student.cgpa || 0) * 10} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Fee Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Paid</span>
                      <span className="font-medium text-emerald-600">{formatCurrency(totalPaid)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Pending</span>
                      <span className="font-medium text-amber-600">{formatCurrency(0)}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <Badge className="bg-green-100 text-green-700">Fees Paid</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Academic Tab */}
        <TabsContent value="academic">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Academic Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-500">Course</p>
                  <p className="text-lg font-semibold">{student.course}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-500">Branch</p>
                  <p className="text-lg font-semibold">{student.branch}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-500">Batch</p>
                  <p className="text-lg font-semibold">{student.batch}</p>
                </div>
              </div>

              <h4 className="font-medium text-slate-700 mb-4">Examination Results</h4>
              {studentResults.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                  <p>No results available</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Exam</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Marks</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Grade</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentResults.slice(0, 5).map((result) => (
                        <tr key={result.id}>
                          <td className="px-4 py-3">
                            {state.exams.find((e) => e.id === result.examId)?.name || 'Unknown Exam'}
                          </td>
                          <td className="px-4 py-3">{result.marksObtained}</td>
                          <td className="px-4 py-3">
                            <Badge variant="secondary">{result.grade}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            {result.status === 'pass' ? (
                              <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="w-4 h-4" /> Pass
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-red-600">
                                <XCircle className="w-4 h-4" /> Fail
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Attendance Record
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600">{attendancePercentage}%</p>
                  <p className="text-sm text-slate-600">Overall Attendance</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {studentAttendance.filter((a) => a.status === 'present').length}
                  </p>
                  <p className="text-sm text-slate-600">Present Days</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-red-600">
                    {studentAttendance.filter((a) => a.status === 'absent').length}
                  </p>
                  <p className="text-sm text-slate-600">Absent Days</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-amber-600">
                    {studentAttendance.filter((a) => a.status === 'leave').length}
                  </p>
                  <p className="text-sm text-slate-600">Leave Days</p>
                </div>
              </div>

              {studentAttendance.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                  <p>No attendance records available</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Marked By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentAttendance.slice(0, 10).map((att) => (
                        <tr key={att.id}>
                          <td className="px-4 py-3">{formatDate(att.date)}</td>
                          <td className="px-4 py-3">
                            <Badge className={getStatusColor(att.status)}>
                              {att.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            {state.faculty.find((f) => f.id === att.markedBy)?.firstName || 'System'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fees Tab */}
        <TabsContent value="fees">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-blue-600" />
                Fee Payment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {studentPayments.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <IndianRupee className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                  <p>No payment records available</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Receipt No</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Payment Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Mode</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentPayments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-4 py-3 font-mono">{payment.receiptNo}</td>
                          <td className="px-4 py-3 font-medium">{formatCurrency(payment.amount)}</td>
                          <td className="px-4 py-3">{formatDate(payment.paymentDate)}</td>
                          <td className="px-4 py-3 capitalize">{payment.paymentMode}</td>
                          <td className="px-4 py-3">
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-12 text-center">
                <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-slate-700 mb-2">No Documents Uploaded</h4>
                <p className="text-slate-500 mb-4">Upload mark sheets, certificates, and other documents</p>
                <Button>Upload Document</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
