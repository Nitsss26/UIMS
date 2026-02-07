import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Save, Building2, User, Shield, Database, Bell, Mail } from 'lucide-react';

export default function Settings() {
  const { state, dispatch } = useApp();
  const [settings, setSettings] = useState(state.settings);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    dispatch({ type: 'SET_SETTINGS', payload: settings });
    toast.success('Settings saved successfully');
    setIsLoading(false);
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data to the initial dummy data? This will overwrite your current changes.')) {
      dispatch({ type: 'RESET_DATA' });
      toast.success('Data reset to initial dummy data');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
        <p className="text-slate-500">Manage university and system settings</p>
      </div>

      <Tabs defaultValue="university" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 lg:w-auto">
          <TabsTrigger value="university">University</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        {/* University Settings */}
        <TabsContent value="university">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                University Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">University Name</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shortName">Short Name</Label>
                  <Input
                    id="shortName"
                    value={settings.shortName}
                    onChange={(e) => setSettings({ ...settings, shortName: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={settings.city}
                    onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={settings.state}
                    onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    value={settings.pincode}
                    onChange={(e) => setSettings({ ...settings, pincode: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={settings.website}
                    onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="affiliation">Affiliation</Label>
                  <Input
                    id="affiliation"
                    value={settings.affiliation}
                    onChange={(e) => setSettings({ ...settings, affiliation: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="principal">Principal Name</Label>
                  <Input
                    id="principal"
                    value={settings.principalName}
                    onChange={(e) => setSettings({ ...settings, principalName: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Academic Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Current Academic Year</Label>
                  <Input id="academicYear" defaultValue="2024-2025" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Current Semester</Label>
                  <Input id="semester" defaultValue="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendanceThreshold">Attendance Threshold (%)</Label>
                  <Input id="attendanceThreshold" type="number" defaultValue="75" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passingMarks">Passing Marks (%)</Label>
                  <Input id="passingMarks" type="number" defaultValue="33" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-slate-500">Receive notifications via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-slate-500">Receive notifications via SMS</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-slate-500">Receive push notifications in browser</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Update Password'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                Backup & Restore
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium mb-2">Export Data</p>
                  <p className="text-sm text-slate-500 mb-4">Download all university data as a backup</p>
                  <Button variant="outline">Export All Data</Button>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium mb-2">Import Data</p>
                  <p className="text-sm text-slate-500 mb-4">Restore data from a backup file</p>
                  <Button variant="outline">Import Data</Button>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium mb-2 text-red-600">Reset to Dummy Data</p>
                  <p className="text-sm text-slate-500 mb-4">This will reset all data to the initial dummy data set</p>
                  <Button variant="destructive" onClick={handleResetData}>Reset Data</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
