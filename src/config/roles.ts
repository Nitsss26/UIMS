// Role Configurations and Portal Settings for Multi-Portal UIMS

import type { RoleConfig, Permission, PortalConfig, NavItem, UserRole } from '@/types';

// ===================== ROLE CONFIGURATIONS =====================

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
    super_admin: {
        name: 'super_admin',
        displayName: 'Super Admin',
        level: 0,
        portalPath: '/super-admin',
        permissions: [
            { module: '*', actions: ['create', 'read', 'update', 'delete'] },
        ],
    },
    university_admin: {
        name: 'university_admin',
        displayName: 'University Admin',
        level: 1,
        portalPath: '/admin',
        permissions: [
            { module: 'students', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'faculty', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'courses', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'departments', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'fees', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'exams', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'attendance', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'library', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'hostel', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'transport', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'notices', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'reports', actions: ['read'] },
            { module: 'settings', actions: ['read', 'update'] },
        ],
    },
    hod_library: {
        name: 'hod_library',
        displayName: 'Librarian',
        level: 2,
        portalPath: '/library',
        permissions: [
            { module: 'library', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'library_reports', actions: ['read'] },
            { module: 'students', actions: ['read'] },
            { module: 'faculty', actions: ['read'] },
        ],
    },
    hod_fees: {
        name: 'hod_fees',
        displayName: 'Fee Accountant',
        level: 2,
        portalPath: '/fees',
        permissions: [
            { module: 'fees', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'fee_reports', actions: ['read'] },
            { module: 'students', actions: ['read'] },
            { module: 'scholarships', actions: ['create', 'read', 'update', 'delete'] },
        ],
    },
    hod_registration: {
        name: 'hod_registration',
        displayName: 'Registrar',
        level: 2,
        portalPath: '/registration',
        permissions: [
            { module: 'admissions', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'students', actions: ['create', 'read', 'update'] },
            { module: 'documents', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'id_cards', actions: ['create', 'read'] },
            { module: 'transfers', actions: ['create', 'read', 'update'] },
        ],
    },
    hod_examination: {
        name: 'hod_examination',
        displayName: 'Controller of Examinations',
        level: 2,
        portalPath: '/examination',
        permissions: [
            { module: 'exams', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'results', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'hall_tickets', actions: ['create', 'read'] },
            { module: 'grade_cards', actions: ['create', 'read'] },
            { module: 'students', actions: ['read'] },
        ],
    },
    hod_hostel: {
        name: 'hod_hostel',
        displayName: 'Hostel Warden',
        level: 2,
        portalPath: '/hostel',
        permissions: [
            { module: 'hostel', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'room_allocation', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'mess', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'maintenance', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'students', actions: ['read'] },
        ],
    },
    hod_department: {
        name: 'hod_department',
        displayName: 'Head of Department',
        level: 2,
        portalPath: '/hod',
        permissions: [
            { module: 'faculty', actions: ['read', 'update'] },
            { module: 'students', actions: ['read'] },
            { module: 'attendance', actions: ['read'] },
            { module: 'timetable', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'leaves', actions: ['read', 'update'] },
            { module: 'performance', actions: ['read'] },
            { module: 'notices', actions: ['create', 'read'] },
        ],
    },
    faculty: {
        name: 'faculty',
        displayName: 'Faculty',
        level: 3,
        portalPath: '/faculty',
        permissions: [
            { module: 'my_classes', actions: ['read'] },
            { module: 'attendance', actions: ['create', 'read', 'update'] },
            { module: 'assignments', actions: ['create', 'read', 'update', 'delete'] },
            { module: 'internal_marks', actions: ['create', 'read', 'update'] },
            { module: 'students', actions: ['read'] },
            { module: 'timetable', actions: ['read'] },
            { module: 'leaves', actions: ['create', 'read'] },
            { module: 'notices', actions: ['read'] },
        ],
    },
    student: {
        name: 'student',
        displayName: 'Student',
        level: 4,
        portalPath: '/student',
        permissions: [
            { module: 'my_profile', actions: ['read', 'update'] },
            { module: 'attendance', actions: ['read'] },
            { module: 'timetable', actions: ['read'] },
            { module: 'fees', actions: ['read'] },
            { module: 'results', actions: ['read'] },
            { module: 'assignments', actions: ['read', 'update'] },
            { module: 'library', actions: ['read'] },
            { module: 'hostel', actions: ['read'] },
            { module: 'notices', actions: ['read'] },
            { module: 'feedback', actions: ['create', 'read'] },
        ],
    },
};

// ===================== PORTAL NAV CONFIGURATIONS =====================

export const PORTAL_NAV_ITEMS: Record<UserRole, NavItem[]> = {
    super_admin: [
        { label: 'Dashboard', href: '/super-admin', icon: 'LayoutDashboard' },
        { label: 'Universities', href: '/super-admin/universities', icon: 'Building2' },
        { label: 'Analytics', href: '/super-admin/analytics', icon: 'BarChart3' },
        { label: 'Subscriptions', href: '/super-admin/subscriptions', icon: 'CreditCard' },
        { label: 'System Logs', href: '/super-admin/logs', icon: 'FileText' },
        { label: 'Settings', href: '/super-admin/settings', icon: 'Settings' },
    ],
    university_admin: [
        { label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
        {
            label: 'Students', href: '/admin/students', icon: 'Users', children: [
                { label: 'All Students', href: '/admin/students', icon: 'Users' },
                { label: 'Add Student', href: '/admin/students/add', icon: 'UserPlus' },
            ]
        },
        {
            label: 'Faculty', href: '/admin/faculty', icon: 'UserCircle', children: [
                { label: 'All Faculty', href: '/admin/faculty', icon: 'UserCircle' },
                { label: 'Add Faculty', href: '/admin/faculty/add', icon: 'UserPlus' },
            ]
        },
        { label: 'Departments', href: '/admin/departments', icon: 'Building' },
        { label: 'Courses', href: '/admin/courses', icon: 'BookOpen' },
        {
            label: 'Attendance', href: '/admin/attendance', icon: 'CalendarCheck', children: [
                { label: 'Mark Attendance', href: '/admin/attendance/marking', icon: 'CheckSquare' },
                { label: 'Reports', href: '/admin/attendance/reports', icon: 'BarChart2' },
            ]
        },
        {
            label: 'Examinations', href: '/admin/exams', icon: 'ClipboardList', children: [
                { label: 'Schedule', href: '/admin/exams/schedule', icon: 'Calendar' },
                { label: 'Results', href: '/admin/exams/results', icon: 'Award' },
            ]
        },
        {
            label: 'Fees', href: '/admin/fees', icon: 'IndianRupee', children: [
                { label: 'Collection', href: '/admin/fees/collection', icon: 'Wallet' },
                { label: 'Structure', href: '/admin/fees/structure', icon: 'FileSpreadsheet' },
                { label: 'Reports', href: '/admin/fees/reports', icon: 'PieChart' },
            ]
        },
        {
            label: 'Library', href: '/admin/library', icon: 'Library', children: [
                { label: 'Books', href: '/admin/library/books', icon: 'BookMarked' },
                { label: 'Transactions', href: '/admin/library/transactions', icon: 'ArrowLeftRight' },
            ]
        },
        {
            label: 'Hostel', href: '/admin/hostel', icon: 'Home', children: [
                { label: 'Rooms', href: '/admin/hostel/rooms', icon: 'DoorOpen' },
                { label: 'Allocations', href: '/admin/hostel/allocations', icon: 'Users' },
            ]
        },
        { label: 'Transport', href: '/admin/transport', icon: 'Bus' },
        {
            label: 'Notices', href: '/admin/notices', icon: 'Bell', children: [
                { label: 'Board', href: '/admin/notices/board', icon: 'Newspaper' },
                { label: 'Create', href: '/admin/notices/create', icon: 'PenLine' },
            ]
        },
        { label: 'Reports', href: '/admin/reports', icon: 'FileBarChart' },
        { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
    ],
    hod_library: [
        { label: 'Dashboard', href: '/library', icon: 'LayoutDashboard' },
        {
            label: 'Books', href: '/library/books', icon: 'BookMarked', children: [
                { label: 'All Books', href: '/library/books', icon: 'BookMarked' },
                { label: 'Add Book', href: '/library/books/add', icon: 'Plus' },
                { label: 'Categories', href: '/library/books/categories', icon: 'Folder' },
            ]
        },
        { label: 'Issue / Return', href: '/library/transactions', icon: 'ArrowLeftRight' },
        { label: 'Members', href: '/library/members', icon: 'Users' },
        { label: 'Fines', href: '/library/fines', icon: 'IndianRupee' },
        { label: 'Reports', href: '/library/reports', icon: 'BarChart3' },
        { label: 'Settings', href: '/library/settings', icon: 'Settings' },
    ],
    hod_fees: [
        { label: 'Dashboard', href: '/fees', icon: 'LayoutDashboard' },
        { label: 'Fee Collection', href: '/fees/collection', icon: 'Wallet' },
        { label: 'Fee Structure', href: '/fees/structure', icon: 'FileSpreadsheet' },
        { label: 'Defaulters', href: '/fees/defaulters', icon: 'AlertTriangle' },
        { label: 'Scholarships', href: '/fees/scholarships', icon: 'Award' },
        { label: 'Reports', href: '/fees/reports', icon: 'BarChart3' },
        { label: 'Settings', href: '/fees/settings', icon: 'Settings' },
    ],
    hod_registration: [
        { label: 'Dashboard', href: '/registration', icon: 'LayoutDashboard' },
        {
            label: 'Admissions', href: '/registration/admissions', icon: 'UserPlus', children: [
                { label: 'New Application', href: '/registration/admissions/new', icon: 'FilePlus' },
                { label: 'Pending', href: '/registration/admissions/pending', icon: 'Clock' },
                { label: 'Approved', href: '/registration/admissions/approved', icon: 'CheckCircle' },
            ]
        },
        { label: 'Document Verification', href: '/registration/documents', icon: 'FileCheck' },
        { label: 'ID Cards', href: '/registration/id-cards', icon: 'IdCard' },
        { label: 'Transfers', href: '/registration/transfers', icon: 'ArrowRightLeft' },
        { label: 'Alumni', href: '/registration/alumni', icon: 'GraduationCap' },
        { label: 'Reports', href: '/registration/reports', icon: 'BarChart3' },
    ],
    hod_examination: [
        { label: 'Dashboard', href: '/examination', icon: 'LayoutDashboard' },
        {
            label: 'Exam Schedule', href: '/examination/schedule', icon: 'Calendar', children: [
                { label: 'Create Schedule', href: '/examination/schedule/create', icon: 'Plus' },
                { label: 'View All', href: '/examination/schedule', icon: 'List' },
            ]
        },
        { label: 'Hall Tickets', href: '/examination/hall-tickets', icon: 'Ticket' },
        {
            label: 'Results', href: '/examination/results', icon: 'Award', children: [
                { label: 'Enter Results', href: '/examination/results/enter', icon: 'Edit' },
                { label: 'Publish', href: '/examination/results/publish', icon: 'Send' },
            ]
        },
        { label: 'Re-evaluation', href: '/examination/revaluation', icon: 'RefreshCw' },
        { label: 'Grade Cards', href: '/examination/grade-cards', icon: 'FileText' },
        { label: 'Reports', href: '/examination/reports', icon: 'BarChart3' },
    ],
    hod_hostel: [
        { label: 'Dashboard', href: '/hostel', icon: 'LayoutDashboard' },
        {
            label: 'Rooms', href: '/hostel/rooms', icon: 'DoorOpen', children: [
                { label: 'All Rooms', href: '/hostel/rooms', icon: 'DoorOpen' },
                { label: 'Allocations', href: '/hostel/rooms/allocations', icon: 'Users' },
            ]
        },
        {
            label: 'Mess', href: '/hostel/mess', icon: 'UtensilsCrossed', children: [
                { label: 'Menu', href: '/hostel/mess/menu', icon: 'ScrollText' },
                { label: 'Attendance', href: '/hostel/mess/attendance', icon: 'CheckSquare' },
            ]
        },
        { label: 'Visitors', href: '/hostel/visitors', icon: 'UserCheck' },
        { label: 'Complaints', href: '/hostel/complaints', icon: 'MessageSquare' },
        { label: 'Fees', href: '/hostel/fees', icon: 'IndianRupee' },
        { label: 'Reports', href: '/hostel/reports', icon: 'BarChart3' },
    ],
    hod_department: [
        { label: 'Dashboard', href: '/hod', icon: 'LayoutDashboard' },
        { label: 'Faculty', href: '/hod/faculty', icon: 'UserCircle' },
        { label: 'Students', href: '/hod/students', icon: 'Users' },
        { label: 'Timetable', href: '/hod/timetable', icon: 'Calendar' },
        { label: 'Attendance', href: '/hod/attendance', icon: 'CalendarCheck' },
        { label: 'Performance', href: '/hod/performance', icon: 'TrendingUp' },
        { label: 'Leaves', href: '/hod/leaves', icon: 'CalendarOff' },
        { label: 'Notices', href: '/hod/notices', icon: 'Bell' },
        { label: 'Reports', href: '/hod/reports', icon: 'BarChart3' },
    ],
    faculty: [
        { label: 'Dashboard', href: '/faculty', icon: 'LayoutDashboard' },
        { label: 'My Classes', href: '/faculty/classes', icon: 'BookOpen' },
        {
            label: 'Attendance', href: '/faculty/attendance', icon: 'CalendarCheck', children: [
                { label: 'Mark Attendance', href: '/faculty/attendance/mark', icon: 'CheckSquare' },
                { label: 'Reports', href: '/faculty/attendance/reports', icon: 'BarChart2' },
            ]
        },
        { label: 'Assignments', href: '/faculty/assignments', icon: 'ClipboardList' },
        { label: 'Internal Marks', href: '/faculty/marks', icon: 'Edit3' },
        { label: 'Students', href: '/faculty/students', icon: 'Users' },
        { label: 'Timetable', href: '/faculty/timetable', icon: 'Calendar' },
        { label: 'Leave', href: '/faculty/leave', icon: 'CalendarOff' },
        { label: 'Notices', href: '/faculty/notices', icon: 'Bell' },
    ],
    student: [
        { label: 'Dashboard', href: '/student', icon: 'LayoutDashboard' },
        { label: 'My Profile', href: '/student/profile', icon: 'User' },
        { label: 'Attendance', href: '/student/attendance', icon: 'CalendarCheck' },
        { label: 'Timetable', href: '/student/timetable', icon: 'Calendar' },
        { label: 'Fees', href: '/student/fees', icon: 'IndianRupee' },
        { label: 'Results', href: '/student/results', icon: 'Award' },
        { label: 'Assignments', href: '/student/assignments', icon: 'ClipboardList' },
        { label: 'Library', href: '/student/library', icon: 'Library' },
        { label: 'Hostel', href: '/student/hostel', icon: 'Home' },
        { label: 'Notices', href: '/student/notices', icon: 'Bell' },
        { label: 'Feedback', href: '/student/feedback', icon: 'MessageSquare' },
    ],
};

// ===================== HELPER FUNCTIONS =====================

export function hasPermission(
    permissions: Permission[],
    module: string,
    action: 'create' | 'read' | 'update' | 'delete'
): boolean {
    // Check for wildcard permission (super_admin)
    const wildcardPerm = permissions.find((p) => p.module === '*');
    if (wildcardPerm && wildcardPerm.actions.includes(action)) {
        return true;
    }

    // Check specific module permission
    const modulePerm = permissions.find((p) => p.module === module);
    return modulePerm ? modulePerm.actions.includes(action) : false;
}

export function getRoleConfig(role: UserRole): RoleConfig {
    return ROLE_CONFIGS[role];
}

export function getPortalNavItems(role: UserRole): NavItem[] {
    return PORTAL_NAV_ITEMS[role] || [];
}

export function getRoleLevel(role: UserRole): number {
    return ROLE_CONFIGS[role].level;
}

export function canAccessRole(currentRole: UserRole, targetRole: UserRole): boolean {
    return getRoleLevel(currentRole) < getRoleLevel(targetRole);
}
