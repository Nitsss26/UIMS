import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Calculator, CheckCircle, Users } from 'lucide-react';
import { generateId } from '@/utils/helpers';

export default function GenerateSalary() {
  const { state, dispatch } = useApp();
  const [selectedMonth, setSelectedMonth] = useState(String(new Date().getMonth() + 1));
  const [selectedYear, setSelectedYear] = useState(String(new Date().getFullYear()));
  const [isProcessing, setIsProcessing] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleGenerate = async () => {
    setIsProcessing(true);
    
    // Generate salary for all active faculty
    state.faculty.filter((f) => f.status === 'active').forEach((faculty) => {
      const basicSalary = faculty.salary;
      const da = basicSalary * 0.17;
      const hra = basicSalary * 0.24;
      const ta = basicSalary * 0.08;
      const medical = 1500;
      const grossSalary = basicSalary + da + hra + ta + medical;
      const pf = basicSalary * 0.12;
      const esi = grossSalary > 21000 ? 0 : grossSalary * 0.0075;
      const tds = grossSalary * 0.05;
      const totalDeductions = pf + esi + tds;

      const salary = {
        id: generateId('SAL'),
        facultyId: faculty.id,
        month: parseInt(selectedMonth),
        year: parseInt(selectedYear),
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
        paymentDate: '',
        status: 'pending' as const,
      };

      dispatch({ type: 'ADD_SALARY', payload: salary });
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success(`Salary generated for ${state.faculty.filter((f) => f.status === 'active').length} faculty members`);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Generate Salary</h2>
        <p className="text-slate-500">Process monthly salary for faculty members</p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            Salary Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Month</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={index + 1} value={String(index + 1)}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {[2023, 2024, 2025, 2026].map((year) => (
                    <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Salary Components</h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Basic Salary (as per faculty record)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                DA (17% of Basic)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                HRA (24% of Basic)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                TA (8% of Basic)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Medical Allowance (₹1,500)
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <h5 className="font-medium text-blue-800 mb-2">Deductions</h5>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• PF (12% of Basic)</li>
                <li>• ESI (0.75% of Gross, if applicable)</li>
                <li>• TDS (5% of Gross)</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Faculty Count</p>
              <p className="text-2xl font-bold">{state.faculty.filter((f) => f.status === 'active').length}</p>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Calculator className="w-4 h-4 mr-2" />
                Generate Salary
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
