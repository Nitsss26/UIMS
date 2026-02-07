import { format, parseISO } from 'date-fns';

// Generate unique ID
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

// Generate enrollment number
export function generateEnrollmentNumber(course: string, year: number): string {
  const courseCode = course.substring(0, 2).toUpperCase();
  const yearCode = year.toString().slice(-2);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${yearCode}U${courseCode}${random}`;
}

// Generate employee ID
export function generateEmployeeId(year: number): string {
  const yearCode = year.toString();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `FAC${yearCode}${random}`;
}

// Generate receipt number
export function generateReceiptNo(): string {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `RCP${year}${random}`;
}

// Format date
export function formatDate(date: string | Date, formatStr: string = 'dd MMM yyyy'): string {
  if (!date) return '-';
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, formatStr);
  } catch {
    return '-';
  }
}

// Format currency (Indian Rupees)
export function formatCurrency(amount: number): string {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format number with commas (Indian format)
export function formatNumber(num: number): string {
  if (num === undefined || num === null) return '0';
  return new Intl.NumberFormat('en-IN').format(num);
}

// Calculate percentage
export function calculatePercentage(obtained: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((obtained / total) * 100);
}

// Calculate grade from marks
export function calculateGrade(marks: number, maxMarks: number = 100): string {
  const percentage = (marks / maxMarks) * 100;
  if (percentage >= 90) return 'O';
  if (percentage >= 80) return 'A+';
  if (percentage >= 70) return 'A';
  if (percentage >= 60) return 'B+';
  if (percentage >= 50) return 'B';
  if (percentage >= 40) return 'C';
  if (percentage >= 33) return 'D';
  return 'F';
}

// Calculate grade point
export function calculateGradePoint(marks: number, maxMarks: number = 100): number {
  const percentage = (marks / maxMarks) * 100;
  if (percentage >= 90) return 10;
  if (percentage >= 80) return 9;
  if (percentage >= 70) return 8;
  if (percentage >= 60) return 7;
  if (percentage >= 50) return 6;
  if (percentage >= 40) return 5;
  if (percentage >= 33) return 4;
  return 0;
}

// Calculate CGPA
export function calculateCGPA(grades: { gradePoint: number; credits: number }[]): number {
  if (grades.length === 0) return 0;
  const totalCredits = grades.reduce((sum, g) => sum + g.credits, 0);
  const weightedSum = grades.reduce((sum, g) => sum + g.gradePoint * g.credits, 0);
  return totalCredits === 0 ? 0 : parseFloat((weightedSum / totalCredits).toFixed(2));
}

// Get attendance status color
export function getAttendanceColor(percentage: number): string {
  if (percentage >= 75) return 'text-green-600 bg-green-100';
  if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
  return 'text-red-600 bg-red-100';
}

// Get status badge color
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'text-green-600 bg-green-100 border-green-200',
    inactive: 'text-gray-600 bg-gray-100 border-gray-200',
    suspended: 'text-red-600 bg-red-100 border-red-200',
    pending: 'text-yellow-600 bg-yellow-100 border-yellow-200',
    approved: 'text-green-600 bg-green-100 border-green-200',
    rejected: 'text-red-600 bg-red-100 border-red-200',
    completed: 'text-blue-600 bg-blue-100 border-blue-200',
    ongoing: 'text-purple-600 bg-purple-100 border-purple-200',
    paid: 'text-green-600 bg-green-100 border-green-200',
    partial: 'text-yellow-600 bg-yellow-100 border-yellow-200',
    overdue: 'text-red-600 bg-red-100 border-red-200',
    urgent: 'text-red-600 bg-red-100 border-red-200',
    high: 'text-orange-600 bg-orange-100 border-orange-200',
    normal: 'text-blue-600 bg-blue-100 border-blue-200',
    low: 'text-gray-600 bg-gray-100 border-gray-200',
    present: 'text-green-600 bg-green-100 border-green-200',
    absent: 'text-red-600 bg-red-100 border-red-200',
    leave: 'text-amber-600 bg-amber-100 border-amber-200',
    holiday: 'text-purple-600 bg-purple-100 border-purple-200',
  };
  return colors[status.toLowerCase()] || 'text-gray-600 bg-gray-100 border-gray-200';
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Capitalize first letter
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Get initials from name
export function getInitials(name: string): string {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number (Indian)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

// Validate PIN code (Indian)
export function isValidPincode(pincode: string): boolean {
  const pincodeRegex = /^\d{6}$/;
  return pincodeRegex.test(pincode);
}

// Get month name
export function getMonthName(month: number): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1] || '';
}

// Get days in month
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

// Get day of week
export function getDayOfWeek(date: string | Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const d = typeof date === 'string' ? parseISO(date) : date;
  return days[d.getDay()];
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Group array by key
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

// Sort array by key
export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

// Filter array by search term
export function filterBySearch<T>(
  array: T[],
  searchTerm: string,
  keys: (keyof T)[]
): T[] {
  if (!searchTerm) return array;
  const term = searchTerm.toLowerCase();
  return array.filter((item) =>
    keys.some((key) =>
      String(item[key]).toLowerCase().includes(term)
    )
  );
}

// Paginate array
export function paginate<T>(array: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return array.slice(start, start + pageSize);
}

// Get total pages
export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize);
}

// Calculate age from date of birth
export function calculateAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

// Get academic year
export function getAcademicYear(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  if (month >= 6) {
    return `${year}-${year + 1}`;
  }
  return `${year - 1}-${year}`;
}

// Get semester from month
export function getSemesterFromMonth(month: number): number {
  if (month >= 7 && month <= 12) return 1; // Odd semester
  return 2; // Even semester
}

// Download file
export function downloadFile(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Print element
export function printElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (!element) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <html>
      <head>
        <title>Print</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}
