import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Save, User, BookOpen, Contact, Home, FileText, Camera } from 'lucide-react';
import { generateId, generateEnrollmentNumber, formatDate } from '@/utils/helpers';
import type { Student } from '@/types';

const courses = ['B.Tech', 'B.Sc', 'B.Com', 'B.A', 'M.Tech', 'M.Sc', 'MBA', 'MCA'];
const branches: Record<string, string[]> = {
  'B.Tech': ['Computer Science', 'Electronics & Communication', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'],
  'B.Sc': ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
  'B.Com': ['General', 'Accounting', 'Finance', 'Banking'],
  'B.A': ['Hindi', 'English', 'Political Science', 'History', 'Sociology'],
  'M.Tech': ['Computer Science', 'VLSI Design', 'Structural Engineering'],
  'M.Sc': ['Physics', 'Chemistry', 'Mathematics'],
  'MBA': ['Finance', 'Marketing', 'HR', 'Operations'],
  'MCA': ['Software Engineering', 'Data Science'],
};

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const categories = ['general', 'obc', 'sc', 'st'];

export default function AddStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const isEdit = Boolean(id);

  const existingStudent = isEdit ? state.students.find((s) => s.id === id) : null;

  const [formData, setFormData] = useState<Partial<Student>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male',
    address: '',
    city: '',
    state: '',
    pincode: '',
    course: '',
    branch: '',
    semester: 1,
    year: 1,
    batch: new Date().getFullYear().toString(),
    fatherName: '',
    motherName: '',
    parentPhone: '',
    bloodGroup: '',
    category: 'general',
    status: 'active',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (existingStudent) {
      setFormData(existingStudent);
      if (existingStudent.photo) {
        setPhotoPreview(existingStudent.photo);
      }
    }
  }, [existingStudent]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.branch) newErrors.branch = 'Branch is required';
    if (!formData.fatherName?.trim()) newErrors.fatherName = 'Father\'s name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    const studentData: Student = {
      ...formData,
      id: existingStudent?.id || generateId('STU'),
      enrollmentNo: existingStudent?.enrollmentNo || generateEnrollmentNumber(formData.course!, parseInt(formData.batch!)),
      documents: existingStudent?.documents || [],
      photo: photoPreview || undefined,
    } as Student;

    if (isEdit) {
      dispatch({ type: 'UPDATE_STUDENT', payload: studentData });
      toast.success('Student updated successfully');
    } else {
      dispatch({ type: 'ADD_STUDENT', payload: studentData });
      toast.success('Student registered successfully');
    }

    // Add activity
    dispatch({
      type: 'ADD_ACTIVITY',
      payload: {
        id: generateId('ACT'),
        type: isEdit ? 'update' : 'create',
        description: `${isEdit ? 'Updated' : 'Created'} student record for ${studentData.firstName} ${studentData.lastName}`,
        userId: state.auth.user?.id || 'ADMIN',
        userName: state.auth.user?.name || 'Admin',
        timestamp: new Date().toISOString(),
        module: 'Students',
      },
    });

    navigate('/students');
  };

  const handleChange = (field: keyof Student, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const availableBranches = formData.course ? branches[formData.course] || [] : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/students')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {isEdit ? 'Edit Student' : 'Add New Student'}
          </h2>
          <p className="text-slate-500">
            {isEdit ? 'Update student information' : 'Register a new student to the university'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Photo Upload */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-10 h-10 text-slate-400" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-700 transition-colors">
                      <Camera className="w-5 h-5 text-white" />
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                    </label>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">Student Photo</h4>
                    <p className="text-sm text-slate-500">Upload a passport size photo</p>
                    <p className="text-xs text-slate-400 mt-1">JPG, PNG up to 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      placeholder="Enter first name"
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      placeholder="Enter last name"
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(v) => handleChange('gender', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                      className={errors.dateOfBirth ? 'border-red-500' : ''}
                    />
                    {errors.dateOfBirth && <p className="text-xs text-red-500">{errors.dateOfBirth}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select value={formData.bloodGroup} onValueChange={(v) => handleChange('bloodGroup', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map((bg) => (
                          <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(v) => handleChange('category', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat.toUpperCase()}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="fatherName">Father's Name *</Label>
                    <Input
                      id="fatherName"
                      value={formData.fatherName}
                      onChange={(e) => handleChange('fatherName', e.target.value)}
                      placeholder="Enter father's name"
                      className={errors.fatherName ? 'border-red-500' : ''}
                    />
                    {errors.fatherName && <p className="text-xs text-red-500">{errors.fatherName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motherName">Mother's Name</Label>
                    <Input
                      id="motherName"
                      value={formData.motherName}
                      onChange={(e) => handleChange('motherName', e.target.value)}
                      placeholder="Enter mother's name"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Information */}
          <TabsContent value="academic">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEdit && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Enrollment Number:</span>{' '}
                      <span className="font-mono">{formData.enrollmentNo}</span>
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Course *</Label>
                    <Select value={formData.course} onValueChange={(v) => {
                      handleChange('course', v);
                      handleChange('branch', '');
                    }}>
                      <SelectTrigger className={errors.course ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.course && <p className="text-xs text-red-500">{errors.course}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch *</Label>
                    <Select value={formData.branch} onValueChange={(v) => handleChange('branch', v)}>
                      <SelectTrigger className={errors.branch ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableBranches.map((b) => (
                          <SelectItem key={b} value={b}>{b}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.branch && <p className="text-xs text-red-500">{errors.branch}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select value={String(formData.semester)} onValueChange={(v) => handleChange('semester', parseInt(v))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 8 }, (_, i) => i + 1).map((s) => (
                          <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Select value={String(formData.year)} onValueChange={(v) => handleChange('year', parseInt(v))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 5 }, (_, i) => i + 1).map((y) => (
                          <SelectItem key={y} value={String(y)}>Year {y}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="batch">Batch</Label>
                    <Input
                      id="batch"
                      value={formData.batch}
                      onChange={(e) => handleChange('batch', e.target.value)}
                      placeholder="e.g., 2024"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(v) => handleChange('status', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Information */}
          <TabsContent value="contact">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Contact className="w-5 h-5 text-blue-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="student@example.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="10-digit mobile number"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Parent's Phone</Label>
                    <Input
                      id="parentPhone"
                      value={formData.parentPhone}
                      onChange={(e) => handleChange('parentPhone', e.target.value)}
                      placeholder="Parent's contact number"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      placeholder="Enter complete address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      placeholder="Enter state"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => handleChange('pincode', e.target.value)}
                      placeholder="6-digit PIN code"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents */}
          <TabsContent value="documents">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">Document upload feature</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Upload mark sheets, certificates, ID proofs, and other documents
                  </p>
                  <Button variant="outline" className="mt-4">
                    Upload Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6">
          <Button type="button" variant="outline" onClick={() => navigate('/students')}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? 'Update Student' : 'Save Student'}
          </Button>
        </div>
      </form>
    </div>
  );
}
