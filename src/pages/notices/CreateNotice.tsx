import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Send, Bell } from 'lucide-react';
import { generateId } from '@/utils/helpers';
import type { Notice } from '@/types';

export default function CreateNotice() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    priority: 'normal',
    targetAudience: ['all'],
    departments: [] as string[],
    expiryDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const notice: Notice = {
      id: generateId('NTC'),
      title: formData.title,
      content: formData.content,
      category: formData.category as 'academic' | 'examination' | 'events' | 'holiday' | 'general',
      priority: formData.priority as 'urgent' | 'high' | 'normal' | 'low',
      targetAudience: formData.targetAudience as ('all' | 'students' | 'faculty' | 'admin')[],
      departments: formData.departments,
      publishDate: new Date().toISOString().split('T')[0],
      expiryDate: formData.expiryDate || undefined,
      attachments: [],
      postedBy: state.auth.user?.id || 'ADMIN',
      status: 'published',
    };

    dispatch({ type: 'ADD_NOTICE', payload: notice });
    toast.success('Notice published successfully');

    // Add notification
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: generateId('NTF'),
        title: 'New Notice: ' + formData.title,
        message: formData.content.substring(0, 100) + '...',
        type: formData.priority === 'urgent' ? 'error' : 'info',
        read: false,
        timestamp: new Date().toISOString(),
        link: '/notices/board',
      },
    });

    navigate('/notices/board');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/notices/board')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Create Notice</h2>
          <p className="text-slate-500">Publish a new notice or announcement</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Notice Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter notice title"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => setFormData({ ...formData, category: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="examination">Examination</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="holiday">Holiday</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(v) => setFormData({ ...formData, priority: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter notice content"
                  rows={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date (Optional)</Label>
                <Input
                  id="expiry"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target">Target Audience</Label>
                <Select
                  value={formData.targetAudience[0]}
                  onValueChange={(v) => setFormData({ ...formData, targetAudience: [v] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="students">Students Only</SelectItem>
                    <SelectItem value="faculty">Faculty Only</SelectItem>
                    <SelectItem value="admin">Admin Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => navigate('/notices/board')}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Publish Notice
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
