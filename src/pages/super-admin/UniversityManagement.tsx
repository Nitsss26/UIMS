import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Building2,
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    MoreVertical,
    MapPin,
    Calendar,
    Users,
    GraduationCap,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export default function UniversityManagement() {
    const { state } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    // Filter universities
    const filteredUniversities = state.universities.filter((uni) => {
        const matchesSearch =
            uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            uni.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            uni.city.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || uni.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAddUniversity = () => {
        toast.success('University added successfully!');
        setIsAddDialogOpen(false);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                        <Building2 className="w-7 h-7 text-purple-600" />
                        University Management
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Manage all affiliated universities and their settings
                    </p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                            <Plus className="w-4 h-4" />
                            Add University
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Add New University</DialogTitle>
                            <DialogDescription>
                                Register a new university in the UIMS system
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                                <Label>University Name</Label>
                                <Input placeholder="Enter university name" />
                            </div>
                            <div className="space-y-2">
                                <Label>Short Name / Code</Label>
                                <Input placeholder="e.g., BVU" />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input type="email" placeholder="info@university.edu.in" />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input placeholder="+91-XXX-XXXXXXX" />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <Label>Address</Label>
                                <Input placeholder="Full address" />
                            </div>
                            <div className="space-y-2">
                                <Label>City</Label>
                                <Input placeholder="City" />
                            </div>
                            <div className="space-y-2">
                                <Label>State</Label>
                                <Input placeholder="State" />
                            </div>
                            <div className="space-y-2">
                                <Label>Established Year</Label>
                                <Input type="number" placeholder="e.g., 1990" />
                            </div>
                            <div className="space-y-2">
                                <Label>Subscription Plan</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select plan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="basic">Basic</SelectItem>
                                        <SelectItem value="standard">Standard</SelectItem>
                                        <SelectItem value="premium">Premium</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddUniversity} className="bg-purple-600 hover:bg-purple-700">
                                Add University
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <Card className="border-0 shadow-lg mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                placeholder="Search universities..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Universities Table */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-lg">
                        All Universities ({filteredUniversities.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>University</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Established</TableHead>
                                <TableHead>Subscription</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUniversities.map((uni) => (
                                <TableRow key={uni.id} className="hover:bg-slate-50">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                                                <Building2 className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800">{uni.name}</p>
                                                <p className="text-xs text-slate-500">{uni.shortName}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                            <MapPin className="w-4 h-4 text-slate-400" />
                                            {uni.city}, {uni.state}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            {uni.establishedYear}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`${uni.subscriptionPlan === 'premium'
                                                    ? 'bg-purple-100 text-purple-700 hover:bg-purple-100'
                                                    : uni.subscriptionPlan === 'standard'
                                                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-100'
                                                }`}
                                        >
                                            {uni.subscriptionPlan || 'Basic'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`${uni.status === 'active'
                                                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                                                    : uni.status === 'inactive'
                                                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-100'
                                                        : 'bg-red-100 text-red-700 hover:bg-red-100'
                                                }`}
                                        >
                                            {uni.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Users className="w-4 h-4 mr-2" />
                                                    Manage Admins
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <GraduationCap className="w-4 h-4 mr-2" />
                                                    View Students
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
