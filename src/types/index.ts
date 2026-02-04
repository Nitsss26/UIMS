// Types for University Integrated Management System

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  avatar?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  role: 'admin' | 'teacher' | 'student' | null;
}

export interface Student {
  id: string;
  enrollmentNo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  state: string;
  pincode: string;
  photo?: string;
  course: string;
  branch: string;
  semester: number;
  year: number;
  batch: string;
  fatherName: string;
  motherName: string;
  parentPhone: string;
  bloodGroup: string;
  category: 'general' | 'obc' | 'sc' | 'st';
  admissionDate: string;
  status: 'active' | 'inactive' | 'suspended';
  documents: Document[];
  attendancePercentage?: number;
  cgpa?: number;
}

export interface Faculty {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  state: string;
  pincode: string;
  photo?: string;
  department: string;
  designation: string;
  qualification: string;
  experience: number;
  specialization: string;
  subjects: string[];
  joiningDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on_leave';
  documents: Document[];
  bloodGroup?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadDate: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  type: 'ug' | 'pg' | 'diploma';
  duration: number;
  branches: Branch[];
  status: 'active' | 'inactive';
}

export interface Branch {
  id: string;
  code: string;
  name: string;
  subjects: Subject[];
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  theoryHours: number;
  practicalHours: number;
  semester: number;
}

export interface Attendance {
  id: string;
  studentId: string;
  subjectId: string;
  date: string;
  status: 'present' | 'absent' | 'leave' | 'holiday';
  markedBy: string;
  markedAt: string;
}

export interface AttendanceSummary {
  studentId: string;
  subjectId: string;
  totalClasses: number;
  presentCount: number;
  absentCount: number;
  leaveCount: number;
  percentage: number;
}

export interface Exam {
  id: string;
  name: string;
  type: 'internal' | 'external' | 'practical' | 'viva';
  course: string;
  branch: string;
  semester: number;
  subjectId: string;
  maxMarks: number;
  passingMarks: number;
  examDate: string;
  startTime: string;
  endTime: string;
  room: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

export interface Result {
  id: string;
  examId: string;
  studentId: string;
  marksObtained: number;
  grade: string;
  gradePoint: number;
  status: 'pass' | 'fail' | 'absent';
  remarks?: string;
}

export interface FeeStructure {
  id: string;
  course: string;
  branch: string;
  semester: number;
  tuitionFee: number;
  labFee: number;
  libraryFee: number;
  sportsFee: number;
  developmentFee: number;
  examinationFee: number;
  transportFee: number;
  hostelFee: number;
  messFee: number;
  totalFee: number;
}

export interface FeePayment {
  id: string;
  studentId: string;
  feeStructureId: string;
  amount: number;
  paymentDate: string;
  paymentMode: 'cash' | 'cheque' | 'online' | 'dd';
  transactionId?: string;
  receiptNo: string;
  semester: number;
  year: number;
  status: 'paid' | 'pending' | 'partial';
  remarks?: string;
}

export interface Salary {
  id: string;
  facultyId: string;
  month: number;
  year: number;
  basicSalary: number;
  da: number;
  hra: number;
  ta: number;
  medical: number;
  grossSalary: number;
  pf: number;
  esi: number;
  tds: number;
  otherDeductions: number;
  totalDeductions: number;
  netSalary: number;
  paymentDate: string;
  status: 'pending' | 'processed' | 'paid';
}

export interface TransportRoute {
  id: string;
  routeNo: string;
  name: string;
  startPoint: string;
  endPoint: string;
  stops: BusStop[];
  distance: number;
  fare: number;
  vehicleId: string;
  driverId: string;
  status: 'active' | 'inactive';
}

export interface BusStop {
  id: string;
  name: string;
  sequence: number;
  arrivalTime: string;
}

export interface Vehicle {
  id: string;
  vehicleNo: string;
  type: 'bus' | 'van' | 'car';
  capacity: number;
  model: string;
  registrationDate: string;
  insuranceExpiry: string;
  status: 'active' | 'maintenance' | 'retired';
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNo: string;
  licenseExpiry: string;
  address: string;
  status: 'active' | 'inactive';
}

export interface Hostel {
  id: string;
  name: string;
  type: 'boys' | 'girls';
  address: string;
  rooms: Room[];
  wardenId: string;
  status: 'active' | 'inactive';
}

export interface Room {
  id: string;
  roomNo: string;
  floor: number;
  capacity: number;
  occupied: number;
  roomType: 'single' | 'double' | 'triple' | 'dormitory';
  facilities: string[];
  rent: number;
  status: 'available' | 'occupied' | 'maintenance';
}

export interface HostelAllocation {
  id: string;
  studentId: string;
  hostelId: string;
  roomId: string;
  allocationDate: string;
  vacatingDate?: string;
  status: 'active' | 'vacated';
}

export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  edition: string;
  category: string;
  subject: string;
  quantity: number;
  available: number;
  shelfNo: string;
  price: number;
  status: 'available' | 'issued' | 'lost' | 'damaged';
}

export interface LibraryTransaction {
  id: string;
  bookId: string;
  memberId: string;
  memberType: 'student' | 'faculty';
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fine: number;
  status: 'issued' | 'returned' | 'overdue';
}

export interface Club {
  id: string;
  name: string;
  type: 'technical' | 'cultural' | 'sports' | 'nss' | 'ncc' | 'other';
  description: string;
  coordinatorId: string;
  members: ClubMember[];
  events: Event[];
  status: 'active' | 'inactive';
}

export interface ClubMember {
  id: string;
  studentId: string;
  joiningDate: string;
  role: 'member' | 'core' | 'lead';
  status: 'active' | 'inactive';
}

export interface Event {
  id: string;
  name: string;
  description: string;
  clubId: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  participants: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'examination' | 'events' | 'holiday' | 'general';
  priority: 'urgent' | 'high' | 'normal' | 'low';
  targetAudience: ('all' | 'students' | 'faculty' | 'admin')[];
  departments: string[];
  publishDate: string;
  expiryDate?: string;
  attachments: Attachment[];
  postedBy: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface Timetable {
  id: string;
  course: string;
  branch: string;
  semester: number;
  section: string;
  day: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  subjectId: string;
  teacherId: string;
  room: string;
  type: 'theory' | 'practical' | 'lab' | 'seminar';
}

export interface LeaveApplication {
  id: string;
  applicantId: string;
  applicantType: 'student' | 'faculty';
  leaveType: 'sick' | 'casual' | 'emergency' | 'other';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  remarks?: string;
}

export interface UniversitySettings {
  name: string;
  shortName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  website: string;
  logo?: string;
  affiliation: string;
  establishmentYear: number;
  principalName: string;
}

export interface Activity {
  id: string;
  type: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'other';
  description: string;
  userId: string;
  userName: string;
  timestamp: string;
  module: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalFaculty: number;
  totalCourses: number;
  totalRevenue: number;
  attendancePercentage: number;
  feeCollectionPercentage: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
  link?: string;
}
