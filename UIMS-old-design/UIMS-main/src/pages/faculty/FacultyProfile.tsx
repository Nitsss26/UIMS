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
  Briefcase,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';
import { formatDate, getInitials, getStatusColor, formatCurrency } from '@/utils/helpers';

export default function FacultyProfile() {
  const { id } = useParams();
  const { state } = useApp();

  const faculty = state.faculty.find((f) => f.id === id);

  if (!faculty) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <GraduationCap className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-semibold text-slate-700">Faculty not found</h2>
        <p className="text-slate-500 mb-4">The faculty member you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/faculty">Back to Faculty</Link>
        </Button>
      </div>
    );
  }

  // Get faculty's salary history
  const facultySalaries = state.salaries.filter((s) => s.facultyId === faculty.id);
  const latestSalary = facultySalaries[0];

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
            <Link to="/faculty">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Faculty Profile</h2>
            <p className="text-slate-500">View and manage faculty details</p>
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
            <Link to={`/faculty/edit/${faculty.id}`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        </div>
      </div>

      {/* Profile Header Card */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400" />
        <CardContent className="relative pt-0">
          <div className="flex flex-col md:flex-row gap-6 -mt-16">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                <AvatarImage src={faculty.photo} className="object-cover" />
                <AvatarFallback className="text-3xl bg-emerald-100 text-emerald-600">
                  {getInitials(`${faculty.firstName} ${faculty.lastName}`)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Info */}
            <div className="flex-1 pt-4 md:pt-16">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    {faculty.firstName} {faculty.lastName}
                  </h1>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="font-mono text-sm text-slate-500">{faculty.employeeId}</span>
                    <Badge className={getStatusColor(faculty.status)}>
                      {faculty.status.replace('_', ' ')}
                    </Badge>
                    <Badge variant="secondary">{faculty.designation}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600">{faculty.experience}</p>
                    <p className="text-xs text-slate-500">Years Experience</p>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{faculty.subjects.length}</p>
                    <p className="text-xs text-slate-500">Subjects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="salary">Salary</TabsTrigger>
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
                        <p className="font-medium">{formatDate(faculty.dateOfBirth)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500">Gender</p>
                        <p className="font-medium capitalize">{faculty.gender}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500">Blood Group</p>
                        <p className="font-medium">{faculty.bloodGroup || '-'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500">Email</p>
                        <p className="font-medium">{faculty.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500">Phone</p>
                        <p className="font-medium">{faculty.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-500">Address</p>
                        <p className="font-medium">{faculty.address}</p>
                        <p className="font-medium">{faculty.city}, {faculty.state} - {faculty.pincode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Department Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-500">Department</p>
                      <p className="font-medium">{faculty.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Designation</p>
                      <p className="font-medium">{faculty.designation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Qualification</p>
                      <p className="font-medium">{faculty.qualification}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Joining Date</p>
                      <p className="font-medium">{formatDate(faculty.joiningDate)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Current Salary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-3xl font-bold text-emerald-600">
                      {formatCurrency(faculty.salary)}
                    </p>
                    <p className="text-sm text-slate-500">per month</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Professional Tab */}
        <TabsContent value="professional">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Professional Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-500">Department</p>
                  <p className="text-lg font-semibold">{faculty.department}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-500">Designation</p>
                  <p className="text-lg font-semibold">{faculty.designation}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-500">Experience</p>
                  <p className="text-lg font-semibold">{faculty.experience} Years</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-slate-500 mb-2">Qualification</p>
                  <p className="font-medium">{faculty.qualification}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-2">Specialization</p>
                  <p className="font-medium">{faculty.specialization || '-'}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-700 mb-4">Subjects Handled</h4>
                {faculty.subjects.length === 0 ? (
                  <p className="text-slate-500">No subjects assigned</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {faculty.subjects.map((subject, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm py-1 px-3">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {subject}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Salary Tab */}
        <TabsContent value="salary">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-blue-600" />
                Salary History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {facultySalaries.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <IndianRupee className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                  <p>No salary records available</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Month/Year</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Basic Salary</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Gross Salary</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Deductions</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Net Salary</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {facultySalaries.map((salary) => (
                        <tr key={salary.id}>
                          <td className="px-4 py-3">
                            {salary.month}/{salary.year}
                          </td>
                          <td className="px-4 py-3">{formatCurrency(salary.basicSalary)}</td>
                          <td className="px-4 py-3">{formatCurrency(salary.grossSalary)}</td>
                          <td className="px-4 py-3 text-red-600">{formatCurrency(salary.totalDeductions)}</td>
                          <td className="px-4 py-3 font-medium">{formatCurrency(salary.netSalary)}</td>
                          <td className="px-4 py-3">
                            <Badge className={getStatusColor(salary.status)}>
                              {salary.status}
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
                <p className="text-slate-500 mb-4">Upload certificates, degrees, and other documents</p>
                <Button>Upload Document</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
