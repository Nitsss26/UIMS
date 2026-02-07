import type {
  Student, Faculty, Course, Attendance, Exam, Result, FeeStructure,
  FeePayment, Salary, TransportRoute, Vehicle, Driver, Hostel,
  Book, LibraryTransaction, Club, Notice, Timetable, LeaveApplication,
  Activity, Notification
} from '@/types';
import { generateId, generateEnrollmentNumber, generateEmployeeId, generateReceiptNo } from './helpers';

// Indian Names
const firstNames = {
  male: ['Aarav', 'Arjun', 'Rohan', 'Kabir', 'Vihaan', 'Aditya', 'Shaurya', 'Arnav', 'Reyansh', 'Atharv', 'Vivaan', 'Ishaan', 'Ayaan', 'Aryan', 'Ansh', 'Dev', 'Neil', 'Rudra', 'Yash', 'Kian'],
  female: ['Diya', 'Ananya', 'Ishita', 'Saanvi', 'Aisha', 'Priya', 'Navya', 'Myra', 'Kiara', 'Riya', 'Sara', 'Anvi', 'Pari', 'Nisha', 'Kavya', 'Tara', 'Mira', 'Zara', 'Ira', 'Sia']
};

const lastNames = ['Sharma', 'Patel', 'Singh', 'Gupta', 'Verma', 'Reddy', 'Mehta', 'Joshi', 'Kumar', 'Khan', 'Rao', 'Deshmukh', 'Iyer', 'Pillai', 'Nair', 'Chawla', 'Kapoor', 'Saxena', 'Malhotra', 'Agarwal', 'Shah', 'Bhatia', 'Chopra', 'Khanna', 'Arora'];

const departments = [
  'Computer Science',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Commerce',
  'Arts & Humanities',
  'Science'
];

const courses = [
  { code: 'BTECH', name: 'B.Tech', type: 'ug' as const, duration: 4 },
  { code: 'BSC', name: 'B.Sc', type: 'ug' as const, duration: 3 },
  { code: 'BCOM', name: 'B.Com', type: 'ug' as const, duration: 3 },
  { code: 'BA', name: 'B.A', type: 'ug' as const, duration: 3 },
  { code: 'MTECH', name: 'M.Tech', type: 'pg' as const, duration: 2 },
  { code: 'MSC', name: 'M.Sc', type: 'pg' as const, duration: 2 },
  { code: 'MBA', name: 'MBA', type: 'pg' as const, duration: 2 },
  { code: 'MCA', name: 'MCA', type: 'pg' as const, duration: 2 }
];

const branches: Record<string, string[]> = {
  'B.Tech': ['Computer Science', 'Electronics & Communication', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'],
  'B.Sc': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
  'B.Com': ['General', 'Accounting', 'Finance', 'Banking'],
  'B.A': ['Hindi', 'English', 'Political Science', 'History', 'Sociology'],
  'M.Tech': ['Computer Science', 'VLSI Design', 'Structural Engineering'],
  'M.Sc': ['Physics', 'Chemistry', 'Mathematics'],
  'MBA': ['Finance', 'Marketing', 'HR', 'Operations'],
  'MCA': ['Software Engineering', 'Data Science']
};

const subjects: Record<string, string[]> = {
  'Computer Science': ['Data Structures', 'DBMS', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'AI/ML', 'Web Development', 'Cloud Computing'],
  'Electronics & Communication': ['Digital Electronics', 'Microprocessors', 'VLSI Design', 'Communication Systems', 'Control Systems', 'Signal Processing'],
  'Mechanical Engineering': ['Thermodynamics', 'Fluid Mechanics', 'Machine Design', 'Manufacturing Processes', 'CAD/CAM'],
  'Civil Engineering': ['Structural Analysis', 'Concrete Technology', 'Surveying', 'Geotechnical Engineering', 'Transportation Engineering'],
  'Electrical Engineering': ['Circuit Theory', 'Power Systems', 'Electrical Machines', 'Control Systems', 'Power Electronics'],
  'Commerce': ['Financial Accounting', 'Business Economics', 'Corporate Law', 'Marketing Management', 'Business Statistics'],
  'Arts & Humanities': ['Hindi Literature', 'English Literature', 'Political Science', 'History', 'Sociology'],
  'Science': ['Physics', 'Chemistry', 'Mathematics', 'Biology']
};

const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra'];

const states = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Madhya Pradesh', 'Kerala', 'Punjab', 'Haryana', 'Bihar', 'Odisha', 'Jharkhand', 'Chhattisgarh', 'Uttarakhand', 'Goa', 'Assam', 'Jammu & Kashmir'];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const categories: ('general' | 'obc' | 'sc' | 'st')[] = ['general', 'obc', 'sc', 'st'];

// Generate random date
function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

// Generate random item from array
function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate random number in range
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random phone number
function randomPhone(): string {
  return `${randomInt(6, 9)}${randomInt(0, 9)}${randomInt(0, 9)}${randomInt(0, 9)}${randomInt(0, 9)}${randomInt(0, 9)}${randomInt(0, 9)}${randomInt(0, 9)}${randomInt(0, 9)}${randomInt(0, 9)}`;
}

// Generate Students
export function generateStudents(count: number = 50): Student[] {
  const students: Student[] = [];
  const currentYear = new Date().getFullYear();

  for (let i = 0; i < count; i++) {
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const firstName = gender === 'male' ? random(firstNames.male) : random(firstNames.female);
    const lastName = random(lastNames);
    const course = random(courses);
    const branchList = branches[course.name] || ['General'];
    const branch = random(branchList);
    const semester = randomInt(1, 8);
    const year = Math.ceil(semester / 2);
    const batch = `${currentYear - year + 1}`;
    const city = random(cities);
    const state = random(states);

    students.push({
      id: generateId('STU'),
      enrollmentNo: generateEnrollmentNumber(course.code, currentYear),
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomInt(1, 999)}@student.bvu.edu.in`,
      phone: randomPhone(),
      dateOfBirth: randomDate(new Date(2000, 0, 1), new Date(2005, 11, 31)),
      gender: gender as 'male' | 'female' | 'other',
      address: `${randomInt(1, 999)}, ${random(['Main Road', 'Park Street', 'College Road', 'Station Road', 'Market Street'])}, ${random(['Near Bus Stand', 'Opposite School', 'Behind Temple', 'Next to Bank'])}`,
      city,
      state,
      pincode: `${randomInt(100000, 999999)}`,
      course: course.name,
      branch,
      semester,
      year,
      batch,
      fatherName: `${random(firstNames.male)} ${lastName}`,
      motherName: `${random(firstNames.female)} ${random(lastNames)}`,
      parentPhone: randomPhone(),
      bloodGroup: random(bloodGroups),
      category: random(categories),
      admissionDate: randomDate(new Date(2020, 0, 1), new Date(2024, 11, 31)),
      status: Math.random() > 0.1 ? 'active' : 'inactive',
      documents: [],
      attendancePercentage: randomInt(60, 98),
      cgpa: parseFloat((Math.random() * 4 + 6).toFixed(2)),
    });
  }

  return students;
}

// Generate Faculty
export function generateFaculty(count: number = 20): Faculty[] {
  const faculty: Faculty[] = [];
  const currentYear = new Date().getFullYear();

  for (let i = 0; i < count; i++) {
    const gender = Math.random() > 0.4 ? 'male' : 'female';
    const firstName = gender === 'male' ? random(firstNames.male) : random(firstNames.female);
    const lastName = random(lastNames);
    const department = random(departments);
    const designations = ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'];
    const qualifications = ['Ph.D', 'M.Tech', 'M.Sc', 'M.Com', 'M.A', 'MBA'];
    const city = random(cities);
    const state = random(states);

    faculty.push({
      id: generateId('FAC'),
      employeeId: generateEmployeeId(currentYear),
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@bvu.edu.in`,
      phone: randomPhone(),
      dateOfBirth: randomDate(new Date(1965, 0, 1), new Date(1990, 11, 31)),
      gender: gender as 'male' | 'female' | 'other',
      address: `${randomInt(1, 999)}, ${random(['Professor Colony', 'Faculty Enclave', 'University Housing', 'Academic Block'])}`,
      city,
      state,
      pincode: `${randomInt(100000, 999999)}`,
      department,
      designation: random(designations),
      qualification: random(qualifications),
      experience: randomInt(1, 30),
      specialization: random(subjects[department] || ['General']),
      subjects: subjects[department]?.slice(0, randomInt(2, 4)) || ['General'],
      joiningDate: randomDate(new Date(2010, 0, 1), new Date(2023, 11, 31)),
      salary: randomInt(40000, 150000),
      status: Math.random() > 0.1 ? 'active' : 'on_leave',
      documents: [],
    });
  }

  return faculty;
}

// Generate Courses
export function generateCourses(): Course[] {
  return courses.map((course) => ({
    id: generateId('CRS'),
    code: course.code,
    name: course.name,
    type: course.type,
    duration: course.duration,
    branches: (branches[course.name] || ['General']).map((branchName) => ({
      id: generateId('BRN'),
      code: branchName.substring(0, 3).toUpperCase(),
      name: branchName,
      subjects: (subjects[branchName] || ['General']).map((subj, idx) => ({
        id: generateId('SUB'),
        code: `${course.code}${idx + 1}`,
        name: subj,
        credits: randomInt(3, 5),
        theoryHours: randomInt(3, 4),
        practicalHours: randomInt(0, 2),
        semester: randomInt(1, 8),
      })),
    })),
    status: 'active',
  }));
}

// Generate Attendance
export function generateAttendance(students: Student[], count: number = 200): Attendance[] {
  const attendance: Attendance[] = [];
  const currentDate = new Date();

  for (let i = 0; i < count; i++) {
    const student = random(students);
    const date = randomDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1), currentDate);
    const statuses: ('present' | 'absent' | 'leave' | 'holiday')[] = ['present', 'absent', 'leave', 'holiday'];
    
    attendance.push({
      id: generateId('ATT'),
      studentId: student.id,
      subjectId: generateId('SUB'),
      date,
      status: random(statuses),
      markedBy: generateId('FAC'),
      markedAt: `${date}T${randomInt(8, 16)}:00:00`,
    });
  }

  return attendance;
}

// Generate Exams
export function generateExams(count: number = 30): Exam[] {
  const exams: Exam[] = [];
  const currentDate = new Date();

  for (let i = 0; i < count; i++) {
    const course = random(courses);
    const branchList = branches[course.name] || ['General'];
    
    exams.push({
      id: generateId('EXM'),
      name: random(['Mid Term', 'End Term', 'Internal Assessment', 'Practical Exam', 'Viva Voce']),
      type: random(['internal', 'external', 'practical', 'viva']),
      course: course.name,
      branch: random(branchList),
      semester: randomInt(1, 8),
      subjectId: generateId('SUB'),
      maxMarks: random([50, 100]),
      passingMarks: random([17, 33, 40]),
      examDate: randomDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0)),
      startTime: `${randomInt(9, 14)}:00`,
      endTime: `${randomInt(11, 17)}:00`,
      room: `Room ${randomInt(101, 999)}`,
      status: random(['scheduled', 'ongoing', 'completed', 'cancelled']),
    });
  }

  return exams;
}

// Generate Results
export function generateResults(exams: Exam[], students: Student[], count: number = 100): Result[] {
  const results: Result[] = [];

  for (let i = 0; i < count; i++) {
    const exam = random(exams);
    const student = random(students);
    const marksObtained = randomInt(0, exam.maxMarks);
    const percentage = (marksObtained / exam.maxMarks) * 100;
    
    results.push({
      id: generateId('RES'),
      examId: exam.id,
      studentId: student.id,
      marksObtained,
      grade: percentage >= 90 ? 'O' : percentage >= 80 ? 'A+' : percentage >= 70 ? 'A' : percentage >= 60 ? 'B+' : percentage >= 50 ? 'B' : percentage >= 40 ? 'C' : percentage >= 33 ? 'D' : 'F',
      gradePoint: percentage >= 90 ? 10 : percentage >= 80 ? 9 : percentage >= 70 ? 8 : percentage >= 60 ? 7 : percentage >= 50 ? 6 : percentage >= 40 ? 5 : percentage >= 33 ? 4 : 0,
      status: marksObtained >= exam.passingMarks ? 'pass' : 'fail',
      remarks: marksObtained >= exam.passingMarks ? '' : 'Needs improvement',
    });
  }

  return results;
}

// Generate Fee Structures
export function generateFeeStructures(): FeeStructure[] {
  const feeStructures: FeeStructure[] = [];

  courses.forEach((course) => {
    const branchList = branches[course.name] || ['General'];
    branchList.forEach((branch) => {
      for (let semester = 1; semester <= course.duration * 2; semester++) {
        const baseFee = course.type === 'ug' ? 50000 : 75000;
        
        feeStructures.push({
          id: generateId('FEE'),
          course: course.name,
          branch,
          semester,
          tuitionFee: baseFee,
          labFee: randomInt(5000, 10000),
          libraryFee: randomInt(2000, 5000),
          sportsFee: randomInt(1000, 3000),
          developmentFee: randomInt(5000, 10000),
          examinationFee: randomInt(2000, 5000),
          transportFee: randomInt(10000, 20000),
          hostelFee: randomInt(30000, 50000),
          messFee: randomInt(20000, 35000),
          totalFee: 0,
        });
      }
    });
  });

  // Calculate total fee
  feeStructures.forEach((fee) => {
    fee.totalFee = fee.tuitionFee + fee.labFee + fee.libraryFee + fee.sportsFee + 
                   fee.developmentFee + fee.examinationFee;
  });

  return feeStructures;
}

// Generate Fee Payments
export function generateFeePayments(students: Student[], feeStructures: FeeStructure[], count: number = 100): FeePayment[] {
  const payments: FeePayment[] = [];

  for (let i = 0; i < count; i++) {
    const student = random(students);
    const feeStructure = feeStructures.find(f => f.course === student.course && f.branch === student.branch && f.semester === student.semester);
    
    if (feeStructure) {
      const amount = Math.random() > 0.3 ? feeStructure.totalFee : feeStructure.totalFee / 2;
      
      payments.push({
        id: generateId('PAY'),
        studentId: student.id,
        feeStructureId: feeStructure.id,
        amount,
        paymentDate: randomDate(new Date(2024, 0, 1), new Date()),
        paymentMode: random(['cash', 'cheque', 'online', 'dd']),
        transactionId: Math.random() > 0.5 ? `TXN${randomInt(100000, 999999)}` : undefined,
        receiptNo: generateReceiptNo(),
        semester: student.semester,
        year: student.year,
        status: amount === feeStructure.totalFee ? 'paid' : 'partial',
        remarks: '',
      });
    }
  }

  return payments;
}

// Generate Salaries
export function generateSalaries(faculty: Faculty[], count: number = 50): Salary[] {
  const salaries: Salary[] = [];
  const currentDate = new Date();

  for (let i = 0; i < count; i++) {
    const fac = random(faculty);
    const basicSalary = fac.salary;
    const da = basicSalary * 0.17;
    const hra = basicSalary * 0.24;
    const ta = basicSalary * 0.08;
    const medical = 1500;
    const grossSalary = basicSalary + da + hra + ta + medical;
    const pf = basicSalary * 0.12;
    const esi = grossSalary > 21000 ? 0 : grossSalary * 0.0075;
    const tds = grossSalary * 0.05;
    const totalDeductions = pf + esi + tds;
    
    salaries.push({
      id: generateId('SAL'),
      facultyId: fac.id,
      month: randomInt(1, 12),
      year: currentDate.getFullYear(),
      basicSalary,
      da,
      hra,
      ta,
      medical,
      grossSalary,
      pf,
      esi,
      tds,
      otherDeductions: 0,
      totalDeductions,
      netSalary: grossSalary - totalDeductions,
      paymentDate: randomDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), new Date()),
      status: random(['pending', 'processed', 'paid']),
    });
  }

  return salaries;
}

// Generate Transport Routes
export function generateTransportRoutes(count: number = 10): TransportRoute[] {
  const routes: TransportRoute[] = [];
  const areas = ['City Center', 'Railway Station', 'Airport Road', 'University Road', 'Market Area', 'Residential Complex', 'Industrial Area', 'Suburban Area'];

  for (let i = 0; i < count; i++) {
    routes.push({
      id: generateId('RTE'),
      routeNo: `R${String(i + 1).padStart(2, '0')}`,
      name: `${random(areas)} - University`,
      startPoint: random(areas),
      endPoint: 'University Campus',
      stops: Array.from({ length: randomInt(5, 12) }, (_, idx) => ({
        id: generateId('STP'),
        name: `Stop ${idx + 1}`,
        sequence: idx + 1,
        arrivalTime: `${randomInt(7, 9)}:${random(['00', '15', '30', '45'])}`,
      })),
      distance: randomInt(5, 50),
      fare: randomInt(1000, 5000),
      vehicleId: generateId('VEH'),
      driverId: generateId('DRV'),
      status: 'active',
    });
  }

  return routes;
}

// Generate Vehicles
export function generateVehicles(count: number = 15): Vehicle[] {
  const vehicles: Vehicle[] = [];
  const models = ['Tata Starbus', 'Ashok Leyland Lynx', 'Mahindra Cruzio', 'Eicher Skyline', 'BharatBenz'];

  for (let i = 0; i < count; i++) {
    vehicles.push({
      id: generateId('VEH'),
      vehicleNo: `MH${randomInt(10, 99)} ${String.fromCharCode(65 + randomInt(0, 25))}${String.fromCharCode(65 + randomInt(0, 25))} ${randomInt(1000, 9999)}`,
      type: random(['bus', 'van', 'car']),
      capacity: random([15, 30, 40, 50, 60]),
      model: random(models),
      registrationDate: randomDate(new Date(2018, 0, 1), new Date(2023, 11, 31)),
      insuranceExpiry: randomDate(new Date(2024, 0, 1), new Date(2026, 11, 31)),
      status: random(['active', 'maintenance', 'retired']),
    });
  }

  return vehicles;
}

// Generate Drivers
export function generateDrivers(count: number = 15): Driver[] {
  const drivers: Driver[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = random(firstNames.male);
    const lastName = random(lastNames);
    
    drivers.push({
      id: generateId('DRV'),
      name: `${firstName} ${lastName}`,
      phone: randomPhone(),
      licenseNo: `MH${randomInt(10, 99)}${randomInt(10000000000, 99999999999)}`,
      licenseExpiry: randomDate(new Date(2024, 0, 1), new Date(2028, 11, 31)),
      address: `${randomInt(1, 999)}, ${random(cities)}`,
      status: 'active',
    });
  }

  return drivers;
}

// Generate Hostels
export function generateHostels(): Hostel[] {
  return [
    {
      id: generateId('HST'),
      name: 'Boys Hostel Block A',
      type: 'boys',
      address: 'University Campus, North Wing',
      rooms: Array.from({ length: 50 }, (_, i) => ({
        id: generateId('ROM'),
        roomNo: `A${String(i + 1).padStart(3, '0')}`,
        floor: Math.floor(i / 10) + 1,
        capacity: random([2, 3, 4]),
        occupied: randomInt(0, 3),
        roomType: random(['double', 'triple', 'dormitory']),
        facilities: ['WiFi', 'AC', 'Attached Bathroom'],
        rent: randomInt(50000, 80000),
        status: random(['available', 'occupied', 'maintenance']),
      })),
      wardenId: generateId('FAC'),
      status: 'active',
    },
    {
      id: generateId('HST'),
      name: 'Girls Hostel Block B',
      type: 'girls',
      address: 'University Campus, South Wing',
      rooms: Array.from({ length: 40 }, (_, i) => ({
        id: generateId('ROM'),
        roomNo: `B${String(i + 1).padStart(3, '0')}`,
        floor: Math.floor(i / 10) + 1,
        capacity: random([2, 3]),
        occupied: randomInt(0, 2),
        roomType: random(['double', 'triple']),
        facilities: ['WiFi', 'AC', 'Attached Bathroom', 'Gym'],
        rent: randomInt(60000, 90000),
        status: random(['available', 'occupied', 'maintenance']),
      })),
      wardenId: generateId('FAC'),
      status: 'active',
    },
  ];
}

// Generate Books
export function generateBooks(count: number = 100): Book[] {
  const books: Book[] = [];
  const categories = ['Textbook', 'Reference', 'Journal', 'Magazine', 'Novel'];
  const publishers = ['McGraw Hill', 'Pearson', 'Wiley', 'Springer', 'Oxford', 'Cambridge', 'PHI', 'Technical Publications'];

  const bookTitles = [
    'Introduction to Algorithms', 'Data Structures and Algorithms', 'Database Management Systems',
    'Operating System Concepts', 'Computer Networks', 'Software Engineering',
    'Artificial Intelligence', 'Machine Learning', 'Web Development', 'Cloud Computing',
    'Digital Electronics', 'Microprocessor Architecture', 'VLSI Design',
    'Thermodynamics', 'Fluid Mechanics', 'Machine Design',
    'Financial Accounting', 'Business Economics', 'Marketing Management',
    'Hindi Literature', 'English Literature', 'Political Science'
  ];

  for (let i = 0; i < count; i++) {
    const title = random(bookTitles);
    const quantity = randomInt(5, 20);
    
    books.push({
      id: generateId('BOK'),
      isbn: `${randomInt(100, 999)}-${randomInt(0, 9)}-${randomInt(100000, 999999)}-${randomInt(0, 9)}`,
      title,
      author: `${random(firstNames.male)} ${random(lastNames)}`,
      publisher: random(publishers),
      edition: `${randomInt(1, 10)}th Edition`,
      category: random(categories),
      subject: random(departments),
      quantity,
      available: randomInt(0, quantity),
      shelfNo: `${String.fromCharCode(65 + randomInt(0, 25))}-${randomInt(1, 20)}`,
      price: randomInt(200, 2000),
      status: 'available',
    });
  }

  return books;
}

// Generate Library Transactions
export function generateLibraryTransactions(books: Book[], students: Student[], count: number = 50): LibraryTransaction[] {
  const transactions: LibraryTransaction[] = [];

  for (let i = 0; i < count; i++) {
    const book = random(books);
    const student = random(students);
    const issueDate = randomDate(new Date(2024, 0, 1), new Date());
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 14);
    
    transactions.push({
      id: generateId('LIB'),
      bookId: book.id,
      memberId: student.id,
      memberType: 'student',
      issueDate,
      dueDate: dueDate.toISOString().split('T')[0],
      returnDate: Math.random() > 0.3 ? randomDate(new Date(issueDate), new Date()) : undefined,
      fine: 0,
      status: Math.random() > 0.3 ? 'returned' : 'issued',
    });
  }

  return transactions;
}

// Generate Clubs
export function generateClubs(): Club[] {
  return [
    {
      id: generateId('CLB'),
      name: 'CodeChef Chapter',
      type: 'technical',
      description: 'Competitive programming and coding contests',
      coordinatorId: generateId('FAC'),
      members: [],
      events: [],
      status: 'active',
    },
    {
      id: generateId('CLB'),
      name: 'Robotics Club',
      type: 'technical',
      description: 'Robotics projects and competitions',
      coordinatorId: generateId('FAC'),
      members: [],
      events: [],
      status: 'active',
    },
    {
      id: generateId('CLB'),
      name: 'Cultural Society',
      type: 'cultural',
      description: 'Dance, music, and drama activities',
      coordinatorId: generateId('FAC'),
      members: [],
      events: [],
      status: 'active',
    },
    {
      id: generateId('CLB'),
      name: 'Sports Club',
      type: 'sports',
      description: 'Indoor and outdoor sports activities',
      coordinatorId: generateId('FAC'),
      members: [],
      events: [],
      status: 'active',
    },
    {
      id: generateId('CLB'),
      name: 'NSS Unit',
      type: 'nss',
      description: 'National Service Scheme activities',
      coordinatorId: generateId('FAC'),
      members: [],
      events: [],
      status: 'active',
    },
  ];
}

// Generate Notices
export function generateNotices(count: number = 20): Notice[] {
  const notices: Notice[] = [];
  const categories: ('academic' | 'examination' | 'events' | 'holiday' | 'general')[] = ['academic', 'examination', 'events', 'holiday', 'general'];
  const priorities: ('urgent' | 'high' | 'normal' | 'low')[] = ['urgent', 'high', 'normal', 'low'];

  const noticeTitles = [
    'Examination Schedule Released',
    'Fee Payment Last Date Extended',
    'Holiday Notice - Republic Day',
    'Workshop on AI/ML',
    'Sports Day Registration Open',
    'Library Timing Changes',
    'Campus Recruitment Drive',
    'Annual Day Celebration',
    'Semester Break Notice',
    'New Course Introduction',
    'Scholarship Application Deadline',
    'Hostel Allotment Results',
    'Transport Route Changes',
    'Faculty Development Program',
    'Student Council Elections'
  ];

  for (let i = 0; i < count; i++) {
    notices.push({
      id: generateId('NTC'),
      title: random(noticeTitles),
      content: 'This is to inform all students and faculty members that the above-mentioned notice is hereby published for your kind information and necessary action. Please check the university website for more details.',
      category: random(categories),
      priority: random(priorities),
      targetAudience: [random(['all', 'students', 'faculty', 'admin']) as 'all' | 'students' | 'faculty' | 'admin'],
      departments: [],
      publishDate: randomDate(new Date(2024, 0, 1), new Date()),
      expiryDate: randomDate(new Date(), new Date(2025, 11, 31)),
      attachments: [],
      postedBy: generateId('FAC'),
      status: 'published',
    });
  }

  return notices;
}

// Generate Timetables
export function generateTimetables(count: number = 10): Timetable[] {
  const timetables: Timetable[] = [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  for (let i = 0; i < count; i++) {
    const course = random(courses);
    const branchList = branches[course.name] || ['General'];
    
    timetables.push({
      id: generateId('TTB'),
      course: course.name,
      branch: random(branchList),
      semester: randomInt(1, 8),
      section: random(['A', 'B', 'C']),
      day: random(days),
      slots: Array.from({ length: 6 }, (_, idx) => ({
        id: generateId('SLT'),
        startTime: `${9 + idx}:00`,
        endTime: `${10 + idx}:00`,
        subjectId: generateId('SUB'),
        teacherId: generateId('FAC'),
        room: `Room ${randomInt(101, 999)}`,
        type: random(['theory', 'practical', 'lab', 'seminar']),
      })),
    });
  }

  return timetables;
}

// Generate Leave Applications
export function generateLeaveApplications(students: Student[], faculty: Faculty[], count: number = 30): LeaveApplication[] {
  const leaves: LeaveApplication[] = [];
  const leaveTypes: ('sick' | 'casual' | 'emergency' | 'other')[] = ['sick', 'casual', 'emergency', 'other'];

  for (let i = 0; i < count; i++) {
    const isStudent = Math.random() > 0.3;
    const applicant = isStudent ? random(students) : random(faculty);
    const startDate = randomDate(new Date(2024, 0, 1), new Date());
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + randomInt(1, 7));
    
    leaves.push({
      id: generateId('LEV'),
      applicantId: applicant.id,
      applicantType: isStudent ? 'student' : 'faculty',
      leaveType: random(leaveTypes),
      startDate,
      endDate: endDate.toISOString().split('T')[0],
      reason: random(['Medical emergency', 'Family function', 'Personal work', 'Fever', 'Not feeling well']),
      status: random(['pending', 'approved', 'rejected']),
      appliedDate: startDate,
      approvedBy: Math.random() > 0.5 ? generateId('FAC') : undefined,
      approvedDate: Math.random() > 0.5 ? randomDate(new Date(startDate), new Date()) : undefined,
      remarks: '',
    });
  }

  return leaves;
}

// Generate Activities
export function generateActivities(count: number = 50): Activity[] {
  const activities: Activity[] = [];
  const types: ('create' | 'update' | 'delete' | 'login' | 'logout' | 'other')[] = ['create', 'update', 'delete', 'login', 'logout', 'other'];
  const modules = ['Students', 'Faculty', 'Attendance', 'Exams', 'Fees', 'Library', 'Transport', 'Hostel'];

  for (let i = 0; i < count; i++) {
    activities.push({
      id: generateId('ACT'),
      type: random(types),
      description: `${random(['Created', 'Updated', 'Deleted'])} record in ${random(modules)} module`,
      userId: generateId('ADM'),
      userName: random(['Admin', 'Dr. Ramesh Kumar', 'Prof. Sunita Sharma']),
      timestamp: randomDate(new Date(2024, 0, 1), new Date()) + ` ${randomInt(9, 17)}:${random(['00', '15', '30', '45'])}:00`,
      module: random(modules),
    });
  }

  return activities;
}

// Generate Notifications
export function generateNotifications(count: number = 20): Notification[] {
  const notifications: Notification[] = [];
  const types: ('info' | 'success' | 'warning' | 'error')[] = ['info', 'success', 'warning', 'error'];

  const messages = [
    'New student registered successfully',
    'Fee payment received',
    'Exam schedule updated',
    'Attendance marked for today',
    'New notice published',
    'Library book due tomorrow',
    'Leave application approved',
    'Salary processed for this month'
  ];

  for (let i = 0; i < count; i++) {
    notifications.push({
      id: generateId('NTF'),
      title: random(messages),
      message: 'Please check the details in the respective module.',
      type: random(types),
      read: Math.random() > 0.5,
      timestamp: randomDate(new Date(2024, 0, 1), new Date()) + ` ${randomInt(9, 17)}:${random(['00', '15', '30', '45'])}:00`,
      link: '/dashboard',
    });
  }

  return notifications;
}

// Initialize all dummy data
export function initializeDummyData() {
  const students = generateStudents(50);
  const faculty = generateFaculty(20);
  const courses = generateCourses();
  const attendance = generateAttendance(students, 200);
  const exams = generateExams(30);
  const results = generateResults(exams, students, 100);
  const feeStructures = generateFeeStructures();
  const feePayments = generateFeePayments(students, feeStructures, 100);
  const salaries = generateSalaries(faculty, 50);
  const transportRoutes = generateTransportRoutes(10);
  const vehicles = generateVehicles(15);
  const drivers = generateDrivers(15);
  const hostels = generateHostels();
  const books = generateBooks(100);
  const libraryTransactions = generateLibraryTransactions(books, students, 50);
  const clubs = generateClubs();
  const notices = generateNotices(20);
  const timetables = generateTimetables(10);
  const leaveApplications = generateLeaveApplications(students, faculty, 30);
  const activities = generateActivities(50);
  const notifications = generateNotifications(20);

  return {
    students,
    faculty,
    courses,
    attendance,
    exams,
    results,
    feeStructures,
    feePayments,
    salaries,
    transportRoutes,
    vehicles,
    drivers,
    hostels,
    books,
    libraryTransactions,
    clubs,
    notices,
    timetables,
    leaveApplications,
    activities,
    notifications,
  };
}
