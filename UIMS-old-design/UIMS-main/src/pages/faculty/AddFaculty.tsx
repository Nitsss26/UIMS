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
import { ArrowLeft, Save, User, BookOpen, Contact, Home, Camera, GraduationCap } from 'lucide-react';
import { generateId, generateEmployeeId } from '@/utils/helpers';
import type { Faculty } from '@/types';

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

const designations = ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Lab Assistant'];
const qualifications = ['Ph.D', 'M.Tech', 'M.Sc', 'M.Com', 'M.A', 'MBA', 'B.Tech', 'B.Sc'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function AddFaculty() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const isEdit = Boolean(id);

  const existingFaculty = isEdit ? state.faculty.find((f) => f.id === id) : null;

  const [formData, setFormData] = useState<Partial<Faculty>>({
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
    department: '',
    designation: '',
    qualification: '',
    experience: 0,
    specialization: '',
    subjects: [],
    joiningDate: '',
    salary: 0,
    status: 'active',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [subjectInput, setSubjectInput] = useState('');

  useEffect(() => {
    if (existingFaculty) {
      setFormData(existingFaculty);
      if (existingFaculty.photo) {
        setPhotoPreview(existingFaculty.photo);
      }
    }
  }, [existingFaculty]);

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
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.qualification) newErrors.qualification = 'Qualification is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    const facultyData: Faculty = {
      ...formData,
      id: existingFaculty?.id || generateId('FAC'),
      employeeId: existingFaculty?.employeeId || generateEmployeeId(new Date().getFullYear()),
      documents: existingFaculty?.documents || [],
      photo: photoPreview || undefined,
    } as Faculty;

    if (isEdit) {
      dispatch({ type: 'UPDATE_FACULTY', payload: facultyData });
      toast.success('Faculty updated successfully');
    } else {
      dispatch({ type: 'ADD_FACULTY', payload: facultyData });
      toast.success('Faculty added successfully');
    }

    // Add activity
    dispatch({
      type: 'ADD_ACTIVITY',
      payload: {
        id: generateId('ACT'),
        type: isEdit ? 'update' : 'create',
        description: `${isEdit ? 'Updated' : 'Created'} faculty record for ${facultyData.firstName} ${facultyData.lastName}`,
        userId: state.auth.user?.id || 'ADMIN',
        userName: state.auth.user?.name || 'Admin',
        timestamp: new Date().toISOString(),
        module: 'Faculty',
      },
    });

    navigate('/faculty');
  };

  const handleChange = (field: keyof Faculty, value: string | number) => {
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

  const addSubject = () => {
    if (subjectInput.trim() && !formData.subjects?.includes(subjectInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        subjects: [...(prev.subjects || []), subjectInput.trim()],
      }));
      setSubjectInput('');
    }
  };

  const removeSubject = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects?.filter((s) => s !== subject) || [],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/faculty')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {isEdit ? 'Edit Faculty' : 'Add New Faculty'}
          </h2>
          <p className="text-slate-500">
            {isEdit ? 'Update faculty information' : 'Add a new faculty member to the university'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
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
                    <h4 className="font-medium text-slate-800">Faculty Photo</h4>
                    <p className="text-sm text-slate-500">Upload a professional photo</p>
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
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    />
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Information */}
          <TabsContent value="professional">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEdit && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Employee ID:</span>{' '}
                      <span className="font-mono">{formData.employeeId}</span>
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select value={formData.department} onValueChange={(v) => handleChange('department', v)}>
                      <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((d) => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation *</Label>
                    <Select value={formData.designation} onValueChange={(v) => handleChange('designation', v)}>
                      <SelectTrigger className={errors.designation ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select designation" />
                      </SelectTrigger>
                      <SelectContent>
                        {designations.map((d) => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.designation && <p className="text-xs text-red-500">{errors.designation}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification *</Label>
                    <Select value={formData.qualification} onValueChange={(v) => handleChange('qualification', v)}>
                      <SelectTrigger className={errors.qualification ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        {qualifications.map((q) => (
                          <SelectItem key={q} value={q}>{q}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.qualification && <p className="text-xs text-red-500">{errors.qualification}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience (Years)</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={formData.experience}
                      onChange={(e) => handleChange('experience', parseInt(e.target.value) || 0)}
                      placeholder="Years of experience"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      value={formData.specialization}
                      onChange={(e) => handleChange('specialization', e.target.value)}
                      placeholder="Area of specialization"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary (Monthly)</Label>
                    <Input
                      id="salary"
                      type="number"
                      value={formData.salary}
                      onChange={(e) => handleChange('salary', parseInt(e.target.value) || 0)}
                      placeholder="Monthly salary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="joiningDate">Joining Date</Label>
                    <Input
                      id="joiningDate"
                      type="date"
                      value={formData.joiningDate}
                      onChange={(e) => handleChange('joiningDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(v) => handleChange('status', v as 'active' | 'inactive' | 'on_leave')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="on_leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Subjects */}
                <div className="space-y-2">
                  <Label>Subjects</Label>
                  <div className="flex gap-2">
                    <Input
                      value={subjectInput}
                      onChange={(e) => setSubjectInput(e.target.value)}
                      placeholder="Add a subject"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSubject())}
                    />
                    <Button type="button" onClick={addSubject} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.subjects?.map((subject) => (
                      <span
                        key={subject}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {subject}
                        <button
                          type="button"
                          onClick={() => removeSubject(subject)}
                          className="hover:text-blue-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
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
                      placeholder="faculty@university.edu"
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
        </Tabs>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6">
          <Button type="button" variant="outline" onClick={() => navigate('/faculty')}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? 'Update Faculty' : 'Save Faculty'}
          </Button>
        </div>
      </form>
    </div>
  );
}
