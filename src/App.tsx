import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from '@/context/AppContext';
import { Toaster } from '@/components/ui/sonner';

// Pages
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Layout from '@/components/Layout';

// Student Pages
import StudentList from '@/pages/students/StudentList';
import AddStudent from '@/pages/students/AddStudent';
import StudentProfile from '@/pages/students/StudentProfile';

// Faculty Pages
import FacultyList from '@/pages/faculty/FacultyList';
import AddFaculty from '@/pages/faculty/AddFaculty';
import FacultyProfile from '@/pages/faculty/FacultyProfile';

// Attendance Pages
import AttendanceMarking from '@/pages/attendance/AttendanceMarking';
import AttendanceReports from '@/pages/attendance/AttendanceReports';

// Academic Pages
import CourseManagement from '@/pages/academic/CourseManagement';
import SubjectManagement from '@/pages/academic/SubjectManagement';

// Timetable Pages
import TimetableView from '@/pages/timetable/TimetableView';
import TimetableGenerate from '@/pages/timetable/TimetableGenerate';

// Exam Pages
import ExamSchedule from '@/pages/exams/ExamSchedule';
import MarksEntry from '@/pages/exams/MarksEntry';
import Results from '@/pages/exams/Results';

// Fee Pages
import FeeStructure from '@/pages/fees/FeeStructure';
import FeeCollection from '@/pages/fees/FeeCollection';
import FeeReports from '@/pages/fees/FeeReports';

// Salary Pages
import SalaryDashboard from '@/pages/salary/SalaryDashboard';
import GenerateSalary from '@/pages/salary/GenerateSalary';

// Transport Pages
import TransportRoutes from '@/pages/transport/TransportRoutes';
import VehicleManagement from '@/pages/transport/VehicleManagement';

// Hostel Pages
import HostelAllocation from '@/pages/hostel/HostelAllocation';
import RoomManagement from '@/pages/hostel/RoomManagement';

// Library Pages
import BookCatalog from '@/pages/library/BookCatalog';
import IssueReturn from '@/pages/library/IssueReturn';

// Club Pages
import ClubsList from '@/pages/clubs/ClubsList';
import EventManagement from '@/pages/clubs/EventManagement';

// Notice Pages
import NoticeBoard from '@/pages/notices/NoticeBoard';
import CreateNotice from '@/pages/notices/CreateNotice';

// Report Pages
import ReportsDashboard from '@/pages/reports/ReportsDashboard';

// Settings Pages
import Settings from '@/pages/settings/Settings';
import Profile from '@/pages/settings/Profile';

// ID Card Generator
import IDCardGenerator from '@/pages/IDCardGenerator';

// Super Admin Pages
import SuperAdminLayout from '@/pages/super-admin/SuperAdminLayout';
import SuperAdminDashboard from '@/pages/super-admin/SuperAdminDashboard';
import UniversityManagement from '@/pages/super-admin/UniversityManagement';

// Admin Portal Pages
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';



// HOD Portal Pages
import HODLayout from '@/pages/hod/HODLayout';
import HODDashboard from '@/pages/hod/HODDashboard';
import HODLeave from '@/pages/hod/HODLeave';

// Faculty Portal Pages
import FacultyLayout from '@/pages/faculty/FacultyLayout';
import FacultyDashboard from '@/pages/faculty/FacultyDashboard';
import FacultyLeave from '@/pages/faculty/FacultyLeave';

// Student Portal Pages
import StudentLayout from '@/pages/student/StudentLayout';
import StudentDashboard from '@/pages/student/StudentDashboard';
import StudentHostel from '@/pages/student/StudentHostel';

// Library Portal Pages
import LibraryLayout from '@/pages/library/LibraryLayout';
import LibraryDashboard from '@/pages/library/LibraryDashboard';
import FeeAccountantLayout from '@/pages/fees/FeeAccountantLayout';
import FeeAccountantDashboard from '@/pages/fees/FeeAccountantDashboard';
import RegistrationLayout from '@/pages/registration/RegistrationLayout';
import RegistrationDashboard from '@/pages/registration/RegistrationDashboard';
import HostelLayout from '@/pages/hostel/HostelLayout';
import HostelDashboard from '@/pages/hostel/HostelDashboard';

// Protected Route Component with Role-Based Redirection
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { state } = useApp();

  if (!state.auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles specified, check if user has permission
  if (allowedRoles && state.auth.role && !allowedRoles.includes(state.auth.role)) {
    // Redirect to user's designated portal
    return <Navigate to={state.auth.portalPath} replace />;
  }

  return <>{children}</>;
}

// Role-based portal redirect component
function PortalRedirect() {
  const { state } = useApp();

  if (!state.auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to user's portal based on role
  return <Navigate to={state.auth.portalPath || '/admin'} replace />;
}



function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Root redirects to user's portal */}
      <Route path="/" element={<PortalRedirect />} />

      {/* Super Admin Portal - /super-admin/* */}
      <Route
        path="/super-admin"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <SuperAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SuperAdminDashboard />} />
        <Route path="universities" element={<UniversityManagement />} />
        <Route path="analytics" element={<SuperAdminDashboard />} />
        <Route path="subscriptions" element={<SuperAdminDashboard />} />
        <Route path="logs" element={<SuperAdminDashboard />} />
        <Route path="settings" element={<SuperAdminDashboard />} />
      </Route>

      {/* University Admin Portal - /admin/* */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['university_admin', 'super_admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />

        {/* Student Routes */}
        <Route path="students" element={<StudentList />} />
        <Route path="students/add" element={<AddStudent />} />
        <Route path="students/edit/:id" element={<AddStudent />} />
        <Route path="students/profile/:id" element={<StudentProfile />} />

        {/* Faculty Routes */}
        <Route path="faculty" element={<FacultyList />} />
        <Route path="faculty/add" element={<AddFaculty />} />
        <Route path="faculty/edit/:id" element={<AddFaculty />} />
        <Route path="faculty/profile/:id" element={<FacultyProfile />} />

        {/* Attendance Routes */}
        <Route path="attendance/marking" element={<AttendanceMarking />} />
        <Route path="attendance/reports" element={<AttendanceReports />} />

        {/* Academic Routes */}
        <Route path="academic/courses" element={<CourseManagement />} />
        <Route path="academic/subjects" element={<SubjectManagement />} />

        {/* Timetable Routes */}
        <Route path="timetable/view" element={<TimetableView />} />
        <Route path="timetable/generate" element={<TimetableGenerate />} />

        {/* Exam Routes */}
        <Route path="exams/schedule" element={<ExamSchedule />} />
        <Route path="exams/marks-entry" element={<MarksEntry />} />
        <Route path="exams/results" element={<Results />} />

        {/* Fee Routes */}
        <Route path="fees/structure" element={<FeeStructure />} />
        <Route path="fees/collection" element={<FeeCollection />} />
        <Route path="fees/reports" element={<FeeReports />} />

        {/* Salary Routes */}
        <Route path="salary/dashboard" element={<SalaryDashboard />} />
        <Route path="salary/generate" element={<GenerateSalary />} />

        {/* Transport Routes */}
        <Route path="transport/routes" element={<TransportRoutes />} />
        <Route path="transport/vehicles" element={<VehicleManagement />} />

        {/* Hostel Routes */}
        <Route path="hostel/allocation" element={<HostelAllocation />} />
        <Route path="hostel/rooms" element={<RoomManagement />} />

        {/* Library Routes */}
        <Route path="library/books" element={<BookCatalog />} />
        <Route path="library/transactions" element={<IssueReturn />} />

        {/* Club Routes */}
        <Route path="clubs/list" element={<ClubsList />} />
        <Route path="clubs/events" element={<EventManagement />} />

        {/* Notice Routes */}
        <Route path="notices/board" element={<NoticeBoard />} />
        <Route path="notices/create" element={<CreateNotice />} />

        {/* Reports */}
        <Route path="reports" element={<ReportsDashboard />} />

        {/* ID Card Generator */}
        <Route path="id-card-generator" element={<IDCardGenerator />} />

        {/* Settings */}
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* HOD Portal - /hod/* */}
      <Route
        path="/hod"
        element={
          <ProtectedRoute allowedRoles={['hod_department', 'super_admin']}>
            <HODLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HODDashboard />} />
        <Route path="students" element={<StudentList />} />
        <Route path="faculty" element={<FacultyList />} />
        <Route path="courses" element={<CourseManagement />} />
        <Route path="attendance" element={<AttendanceReports />} />
        <Route path="results" element={<Results />} />
        <Route path="timetable" element={<TimetableView />} />
        <Route path="leaves" element={<HODLeave />} />
        <Route path="reports" element={<ReportsDashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Faculty Portal - /faculty/* */}
      <Route
        path="/faculty"
        element={
          <ProtectedRoute allowedRoles={['faculty', 'super_admin']}>
            <FacultyLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<FacultyDashboard />} />
        <Route path="classes" element={<StudentList />} />
        <Route path="attendance" element={<AttendanceMarking />} />
        <Route path="timetable" element={<TimetableView />} />
        <Route path="marks" element={<MarksEntry />} />
        <Route path="materials" element={<CourseManagement />} />
        <Route path="leaves" element={<FacultyLeave />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Student Portal - /student/* */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student', 'super_admin']}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="courses" element={<CourseManagement />} />
        <Route path="attendance" element={<AttendanceReports />} />
        <Route path="timetable" element={<TimetableView />} />
        <Route path="results" element={<Results />} />
        <Route path="fees" element={<FeeStructure />} />
        <Route path="fees" element={<FeeStructure />} />
        <Route path="library" element={<BookCatalog />} />
        <Route path="hostel" element={<StudentHostel />} />
        <Route path="documents" element={<ReportsDashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Library Portal - /library/* */}
      <Route
        path="/library"
        element={
          <ProtectedRoute allowedRoles={['hod_library', 'super_admin']}>
            <LibraryLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<LibraryDashboard />} />
        <Route path="books" element={<BookCatalog />} />
        <Route path="transactions" element={<IssueReturn />} />
        <Route path="members" element={<StudentList />} />
        <Route path="overdue" element={<IssueReturn />} />
        <Route path="reports" element={<ReportsDashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fee Accountant Portal - /fees/* */}
      <Route
        path="/fees"
        element={
          <ProtectedRoute allowedRoles={['hod_fees', 'super_admin']}>
            <FeeAccountantLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<FeeAccountantDashboard />} />
        <Route path="collection" element={<FeeCollection />} />
        <Route path="structure" element={<FeeStructure />} />
        <Route path="receipts" element={<FeeReports />} />
        <Route path="dues" element={<StudentList />} />
        <Route path="scholarships" element={<FeeStructure />} />
        <Route path="defaulters" element={<FeeReports />} />
        <Route path="reports" element={<FeeReports />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Registration Office Portal - /registration/* */}
      <Route
        path="/registration"
        element={
          <ProtectedRoute allowedRoles={['hod_registration', 'super_admin']}>
            <RegistrationLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<RegistrationDashboard />} />
        <Route path="admissions" element={<AddStudent />} />
        <Route path="verification" element={<StudentList />} />
        <Route path="students" element={<StudentList />} />
        <Route path="transfer" element={<ReportsDashboard />} />
        <Route path="id-cards" element={<IDCardGenerator />} />
        <Route path="reports" element={<ReportsDashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Hostel Management Portal - /hostel/* */}
      <Route
        path="/hostel"
        element={
          <ProtectedRoute allowedRoles={['hod_hostel', 'super_admin']}>
            <HostelLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HostelDashboard />} />
        <Route path="allocation" element={<HostelAllocation />} />
        <Route path="residents" element={<StudentList />} />
        <Route path="attendance" element={<AttendanceMarking />} />
        <Route path="mess" element={<HostelAllocation />} />
        <Route path="maintenance" element={<RoomManagement />} />
        <Route path="visitors" element={<ReportsDashboard />} />
        <Route path="fees" element={<FeeCollection />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
