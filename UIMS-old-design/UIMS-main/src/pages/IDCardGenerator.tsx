import { useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Printer, Download, IdCard, User, Users, Search } from 'lucide-react';
import { formatDate, getInitials } from '@/utils/helpers';

export default function IDCardGenerator() {
  const { state } = useApp();
  const [selectedType, setSelectedType] = useState<'student' | 'faculty'>('student');
  const [selectedId, setSelectedId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const idCardRef = useRef<HTMLDivElement>(null);

  const selectedPerson = selectedType === 'student'
    ? state.students.find((s) => s.id === selectedId)
    : state.faculty.find((f) => f.id === selectedId);

  const filteredList = selectedType === 'student'
    ? state.students.filter((s) =>
        `${s.firstName} ${s.lastName} ${s.enrollmentNo}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : state.faculty.filter((f) =>
        `${f.firstName} ${f.lastName} ${f.employeeId}`.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handlePrint = () => {
    if (!idCardRef.current) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const idNumber = selectedType === 'student' 
      ? (selectedPerson as any)?.enrollmentNo 
      : (selectedPerson as any)?.employeeId;

    printWindow.document.write(`
      <html>
        <head>
          <title>ID Card - ${idNumber}</title>
          <style>
            @media print {
              body { margin: 0; }
              .id-card { 
                width: 85.6mm; 
                height: 53.98mm; 
                border: 1px solid #ccc;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          ${idCardRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleDownload = () => {
    toast.info('Download feature will be implemented with html2canvas');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">ID Card Generator</h2>
          <p className="text-slate-500">Generate and print ID cards for students and faculty</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selection Panel */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Select Person
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={selectedType} onValueChange={(v) => { setSelectedType(v as 'student' | 'faculty'); setSelectedId(''); }}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">
                  <Users className="w-4 h-4 mr-2" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="faculty">
                  <User className="w-4 h-4 mr-2" />
                  Faculty
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder={`Search ${selectedType}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="border rounded-lg divide-y max-h-80 overflow-auto">
              {filteredList.slice(0, 10).map((person) => (
                <button
                  key={person.id}
                  onClick={() => {
                    setSelectedId(person.id);
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center gap-3 p-3 hover:bg-slate-50 text-left ${
                    selectedId === person.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    {getInitials(`${person.firstName} ${person.lastName}`)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{person.firstName} {person.lastName}</p>
                    <p className="text-xs text-slate-500">
                      {selectedType === 'student' ? (person as any).enrollmentNo : (person as any).employeeId}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ID Card Preview */}
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <IdCard className="w-5 h-5 text-blue-600" />
                ID Card Preview
              </CardTitle>
              {selectedPerson && (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handlePrint}>
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedPerson ? (
              <div className="flex justify-center">
                <div
                  ref={idCardRef}
                  className="w-[340px] h-[214px] bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200"
                  style={{ aspectRatio: '1.586' }}
                >
                  {/* ID Card Header */}
                  <div className="h-16 bg-gradient-to-r from-blue-600 to-blue-500 flex items-center px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">BVU</span>
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Bharatiya Vidyapeeth</p>
                        <p className="text-blue-100 text-xs">University, Pune</p>
                      </div>
                    </div>
                  </div>

                  {/* ID Card Body */}
                  <div className="p-4 flex gap-4">
                    {/* Photo */}
                    <div className="w-24 h-28 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-slate-200">
                      {selectedPerson.photo ? (
                        <img src={selectedPerson.photo} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl font-bold text-slate-400">
                          {getInitials(`${selectedPerson.firstName} ${selectedPerson.lastName}`)}
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-1">
                      <p className="text-xs text-slate-500 uppercase">{selectedType === 'student' ? 'Student' : 'Faculty'}</p>
                      <p className="font-bold text-slate-800">{selectedPerson.firstName} {selectedPerson.lastName}</p>
                      <p className="text-xs text-slate-500">
                        ID: <span className="font-mono">{selectedType === 'student' ? (selectedPerson as any).enrollmentNo : (selectedPerson as any).employeeId}</span>
                      </p>
                      {selectedType === 'student' && (
                        <>
                          <p className="text-xs text-slate-600">{(selectedPerson as any).course}</p>
                          <p className="text-xs text-slate-600">{(selectedPerson as any).branch}</p>
                          <p className="text-xs text-slate-500">Semester: {(selectedPerson as any).semester}</p>
                        </>
                      )}
                      {selectedType === 'faculty' && (
                        <>
                          <p className="text-xs text-slate-600">{(selectedPerson as any).designation}</p>
                          <p className="text-xs text-slate-600">{(selectedPerson as any).department}</p>
                        </>
                      )}
                      <p className="text-xs text-slate-500 pt-1">Blood: {selectedPerson.bloodGroup || 'N/A'}</p>
                    </div>
                  </div>

                  {/* ID Card Footer */}
                  <div className="h-8 bg-slate-100 flex items-center justify-between px-4">
                    <p className="text-[10px] text-slate-500">Valid till: {formatDate(new Date().getFullYear() + 1 + '-06-30')}</p>
                    <div className="w-16 h-4 bg-slate-300 rounded" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <IdCard className="w-16 h-16 mb-4" />
                <p>Select a person to preview ID card</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
