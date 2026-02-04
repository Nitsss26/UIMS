import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type {
  AuthState, Student, Faculty, Course, Attendance, Exam, Result,
  FeeStructure, FeePayment, Salary, TransportRoute, Vehicle, Driver,
  Hostel, HostelAllocation, Book, LibraryTransaction, Club, Notice,
  Timetable, LeaveApplication, UniversitySettings, Activity, Notification
} from '@/types';
import { initializeDummyData } from '@/utils/dummyData';

// Initial State
interface AppState {
  auth: AuthState;
  students: Student[];
  faculty: Faculty[];
  courses: Course[];
  attendance: Attendance[];
  exams: Exam[];
  results: Result[];
  feeStructures: FeeStructure[];
  feePayments: FeePayment[];
  salaries: Salary[];
  transportRoutes: TransportRoute[];
  vehicles: Vehicle[];
  drivers: Driver[];
  hostels: Hostel[];
  hostelAllocations: HostelAllocation[];
  books: Book[];
  libraryTransactions: LibraryTransaction[];
  clubs: Club[];
  notices: Notice[];
  timetables: Timetable[];
  leaveApplications: LeaveApplication[];
  settings: UniversitySettings;
  activities: Activity[];
  notifications: Notification[];
}

const initialSettings: UniversitySettings = {
  name: 'Bharatiya Vidyapeeth University',
  shortName: 'BVU',
  address: 'Pune-Bangalore Highway',
  city: 'Pune',
  state: 'Maharashtra',
  pincode: '411046',
  phone: '+91-20-24107390',
  email: 'info@bvu.edu.in',
  website: 'www.bvu.edu.in',
  affiliation: 'UGC, AICTE Approved',
  establishmentYear: 1964,
  principalName: 'Dr. Ramesh Kumar Sharma',
};

const initialAuthState: AuthState = {
  isLoggedIn: false,
  user: null,
  role: null,
};

const defaultItems = initializeDummyData();

const initialState: AppState = {
  auth: initialAuthState,
  students: defaultItems.students,
  faculty: defaultItems.faculty,
  courses: defaultItems.courses,
  attendance: defaultItems.attendance,
  exams: defaultItems.exams,
  results: defaultItems.results,
  feeStructures: defaultItems.feeStructures,
  feePayments: defaultItems.feePayments,
  salaries: defaultItems.salaries,
  transportRoutes: defaultItems.transportRoutes,
  vehicles: defaultItems.vehicles,
  drivers: defaultItems.drivers,
  hostels: defaultItems.hostels,
  hostelAllocations: [],
  books: defaultItems.books,
  libraryTransactions: defaultItems.libraryTransactions,
  clubs: defaultItems.clubs,
  notices: defaultItems.notices,
  timetables: defaultItems.timetables,
  leaveApplications: defaultItems.leaveApplications,
  settings: initialSettings,
  activities: defaultItems.activities,
  notifications: defaultItems.notifications,
};

// Action Types
type Action =
  | { type: 'SET_AUTH'; payload: AuthState }
  | { type: 'LOGOUT' }
  | { type: 'SET_STUDENTS'; payload: Student[] }
  | { type: 'ADD_STUDENT'; payload: Student }
  | { type: 'UPDATE_STUDENT'; payload: Student }
  | { type: 'DELETE_STUDENT'; payload: string }
  | { type: 'SET_FACULTY'; payload: Faculty[] }
  | { type: 'ADD_FACULTY'; payload: Faculty }
  | { type: 'UPDATE_FACULTY'; payload: Faculty }
  | { type: 'DELETE_FACULTY'; payload: string }
  | { type: 'SET_COURSES'; payload: Course[] }
  | { type: 'SET_ATTENDANCE'; payload: Attendance[] }
  | { type: 'ADD_ATTENDANCE'; payload: Attendance }
  | { type: 'UPDATE_ATTENDANCE'; payload: Attendance }
  | { type: 'SET_EXAMS'; payload: Exam[] }
  | { type: 'ADD_EXAM'; payload: Exam }
  | { type: 'SET_RESULTS'; payload: Result[] }
  | { type: 'ADD_RESULT'; payload: Result }
  | { type: 'SET_FEE_STRUCTURES'; payload: FeeStructure[] }
  | { type: 'SET_FEE_PAYMENTS'; payload: FeePayment[] }
  | { type: 'ADD_FEE_PAYMENT'; payload: FeePayment }
  | { type: 'SET_SALARIES'; payload: Salary[] }
  | { type: 'ADD_SALARY'; payload: Salary }
  | { type: 'SET_TRANSPORT_ROUTES'; payload: TransportRoute[] }
  | { type: 'SET_VEHICLES'; payload: Vehicle[] }
  | { type: 'SET_DRIVERS'; payload: Driver[] }
  | { type: 'SET_HOSTELS'; payload: Hostel[] }
  | { type: 'SET_HOSTEL_ALLOCATIONS'; payload: HostelAllocation[] }
  | { type: 'SET_BOOKS'; payload: Book[] }
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'SET_LIBRARY_TRANSACTIONS'; payload: LibraryTransaction[] }
  | { type: 'ADD_LIBRARY_TRANSACTION'; payload: LibraryTransaction }
  | { type: 'SET_CLUBS'; payload: Club[] }
  | { type: 'SET_NOTICES'; payload: Notice[] }
  | { type: 'ADD_NOTICE'; payload: Notice }
  | { type: 'SET_TIMETABLES'; payload: Timetable[] }
  | { type: 'SET_LEAVE_APPLICATIONS'; payload: LeaveApplication[] }
  | { type: 'ADD_LEAVE_APPLICATION'; payload: LeaveApplication }
  | { type: 'SET_SETTINGS'; payload: UniversitySettings }
  | { type: 'SET_ACTIVITIES'; payload: Activity[] }
  | { type: 'ADD_ACTIVITY'; payload: Activity }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'LOAD_STATE'; payload: AppState }
  | { type: 'RESET_DATA' };

// Reducer
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_AUTH':
      return { ...state, auth: action.payload };
    case 'LOGOUT':
      return { ...state, auth: initialAuthState };
    case 'SET_STUDENTS':
      return { ...state, students: action.payload };
    case 'ADD_STUDENT':
      return { ...state, students: [...state.students, action.payload] };
    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.students.map((s) => (s.id === action.payload.id ? action.payload : s)),
      };
    case 'DELETE_STUDENT':
      return {
        ...state,
        students: state.students.filter((s) => s.id !== action.payload),
      };
    case 'SET_FACULTY':
      return { ...state, faculty: action.payload };
    case 'ADD_FACULTY':
      return { ...state, faculty: [...state.faculty, action.payload] };
    case 'UPDATE_FACULTY':
      return {
        ...state,
        faculty: state.faculty.map((f) => (f.id === action.payload.id ? action.payload : f)),
      };
    case 'DELETE_FACULTY':
      return {
        ...state,
        faculty: state.faculty.filter((f) => f.id !== action.payload),
      };
    case 'SET_COURSES':
      return { ...state, courses: action.payload };
    case 'SET_ATTENDANCE':
      return { ...state, attendance: action.payload };
    case 'ADD_ATTENDANCE':
      return { ...state, attendance: [...state.attendance, action.payload] };
    case 'UPDATE_ATTENDANCE':
      return {
        ...state,
        attendance: state.attendance.map((a) => (a.id === action.payload.id ? action.payload : a)),
      };
    case 'SET_EXAMS':
      return { ...state, exams: action.payload };
    case 'ADD_EXAM':
      return { ...state, exams: [...state.exams, action.payload] };
    case 'SET_RESULTS':
      return { ...state, results: action.payload };
    case 'ADD_RESULT':
      return { ...state, results: [...state.results, action.payload] };
    case 'SET_FEE_STRUCTURES':
      return { ...state, feeStructures: action.payload };
    case 'SET_FEE_PAYMENTS':
      return { ...state, feePayments: action.payload };
    case 'ADD_FEE_PAYMENT':
      return { ...state, feePayments: [...state.feePayments, action.payload] };
    case 'SET_SALARIES':
      return { ...state, salaries: action.payload };
    case 'ADD_SALARY':
      return { ...state, salaries: [...state.salaries, action.payload] };
    case 'SET_TRANSPORT_ROUTES':
      return { ...state, transportRoutes: action.payload };
    case 'SET_VEHICLES':
      return { ...state, vehicles: action.payload };
    case 'SET_DRIVERS':
      return { ...state, drivers: action.payload };
    case 'SET_HOSTELS':
      return { ...state, hostels: action.payload };
    case 'SET_HOSTEL_ALLOCATIONS':
      return { ...state, hostelAllocations: action.payload };
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
    case 'SET_LIBRARY_TRANSACTIONS':
      return { ...state, libraryTransactions: action.payload };
    case 'ADD_LIBRARY_TRANSACTION':
      return { ...state, libraryTransactions: [...state.libraryTransactions, action.payload] };
    case 'SET_CLUBS':
      return { ...state, clubs: action.payload };
    case 'SET_NOTICES':
      return { ...state, notices: action.payload };
    case 'ADD_NOTICE':
      return { ...state, notices: [...state.notices, action.payload] };
    case 'SET_TIMETABLES':
      return { ...state, timetables: action.payload };
    case 'SET_LEAVE_APPLICATIONS':
      return { ...state, leaveApplications: action.payload };
    case 'ADD_LEAVE_APPLICATION':
      return { ...state, leaveApplications: [...state.leaveApplications, action.payload] };
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload };
    case 'SET_ACTIVITIES':
      return { ...state, activities: action.payload };
    case 'ADD_ACTIVITY':
      return { ...state, activities: [action.payload, ...state.activities] };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    case 'LOAD_STATE':
      return action.payload;
    case 'RESET_DATA':
      return { ...initialState, auth: state.auth };
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load from sessionStorage on mount
  useEffect(() => {
    const savedState = sessionStorage.getItem('uims_state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: { ...initialState, ...parsedState } });
      } catch (error) {
        console.error('Error loading state from sessionStorage:', error);
      }
    }
  }, []);

  // Save to sessionStorage on state change
  useEffect(() => {
    sessionStorage.setItem('uims_state', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Auth Hook
export function useAuth() {
  const { state, dispatch } = useApp();

  const login = (userId: string, password: string, role: 'admin' | 'teacher' | 'student') => {
    // Default credentials check
    if (userId === 'admin' && password === '123456') {
      const user = {
        id: 'ADMIN001',
        name: 'System Administrator',
        email: 'admin@bvu.edu.in',
        role: role,
      };
      dispatch({
        type: 'SET_AUTH',
        payload: { isLoggedIn: true, user, role },
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return {
    auth: state.auth,
    login,
    logout,
  };
}
