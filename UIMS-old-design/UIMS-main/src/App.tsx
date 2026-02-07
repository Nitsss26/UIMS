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

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { state } = useApp();

  if (!state.auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}



function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

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
