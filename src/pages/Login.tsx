import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { GraduationCap, Eye, EyeOff, Lock, User, ArrowRight, School, BookOpen, Users, Award } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = login(userId, password, 'admin');

    if (success) {
      toast.success('Welcome to Bharatiya Vidyapeeth University Management System');
      navigate('/');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }

    setIsLoading(false);
  };

  const handleQuickLogin = () => {
    setUserId('admin');
    setPassword('123456');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400">
          {/* Animated Circles */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-2xl">
              <GraduationCap className="w-14 h-14 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl xl:text-5xl font-bold text-white text-center mb-4">
            Bharatiya Vidyapeeth
          </h1>
          <p className="text-xl text-blue-100 text-center mb-12">
            University Management System
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-6 max-w-lg">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">5000+</p>
                <p className="text-blue-100 text-sm">Students</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">200+</p>
                <p className="text-blue-100 text-sm">Courses</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">60+</p>
                <p className="text-blue-100 text-sm">Years of Excellence</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">A+</p>
                <p className="text-blue-100 text-sm">NAAC Grade</p>
              </div>
            </div>
          </div>

          {/* Affiliation Badge */}
          <div className="mt-12 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="text-blue-100 text-sm">UGC & AICTE Approved Institution</span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg mb-4">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Bharatiya Vidyapeeth</h1>
            <p className="text-slate-500">University Management System</p>
          </div>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-slate-800">
                Welcome Back!
              </CardTitle>
              <CardDescription className="text-center text-slate-500">
                Sign in to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* User ID */}
                <div className="space-y-2">
                  <Label htmlFor="userId" className="text-slate-700 font-medium">
                    User ID
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="userId"
                      type="text"
                      placeholder="Enter your user ID"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Sign In
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>

                {/* Quick Login */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleQuickLogin}
                    className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Use demo credentials (admin / 123456)
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-11 border-slate-200 hover:bg-slate-50">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="h-11 border-slate-200 hover:bg-slate-50">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.684.81-1.513 1.24-2.333 1.24-.82 0-1.65-.43-2.334-1.24-.684-.81-1.177-1.94-1.177-3.08 0-1.14.493-2.27 1.177-3.08.684-.81 1.514-1.24 2.334-1.24.82 0 1.649.43 2.333 1.24.684.81 1.177 1.94 1.177 3.08zm-4.71 4.92c-1.68 0-3.23.73-4.28 1.89-1.05 1.16-1.64 2.73-1.64 4.37 0 1.64.59 3.21 1.64 4.37 1.05 1.16 2.6 1.89 4.28 1.89 1.68 0 3.23-.73 4.28-1.89 1.05-1.16 1.64-2.73 1.64-4.37 0-1.64-.59-3.21-1.64-4.37-1.05-1.16-2.6-1.89-4.28-1.89z" />
                  </svg>
                  Microsoft
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            © 2024 Bharatiya Vidyapeeth University. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
