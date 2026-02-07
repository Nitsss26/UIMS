import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';
import { Bed, Users, Wifi, Wind, Home, CheckCircle, Clock, XCircle, Building } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

// Mock rooms data
const HOSTEL_ROOMS = [
    { id: 'A-101', block: 'Block A', type: 'Single', capacity: 1, occupancy: 0, price: 45000, features: ['AC', 'Attached Bath', 'Balcony'] },
    { id: 'A-102', block: 'Block A', type: 'Double', capacity: 2, occupancy: 1, price: 35000, features: ['AC', 'Attached Bath'] },
    { id: 'B-201', block: 'Block B', type: 'Triple', capacity: 3, occupancy: 1, price: 25000, features: ['Non-AC', 'Common Bath'] },
    { id: 'B-202', block: 'Block B', type: 'Double', capacity: 2, occupancy: 2, price: 30000, features: ['Non-AC', 'Attached Bath'] },
    { id: 'C-301', block: 'Block C', type: 'Dorm', capacity: 6, occupancy: 3, price: 15000, features: ['Non-AC', 'Common Bath', 'Study Hall'] },
];

export default function StudentHostel() {
    const { state } = useApp();
    const [selectedRoom, setSelectedRoom] = useState<any>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [myBooking, setMyBooking] = useState<any>(null);

    // Load booking status from local storage
    useEffect(() => {
        // In a real app, this would come from the backend/state
        // Simulating checking "hostel_requests" in localStorage for this student
        const requests = JSON.parse(localStorage.getItem('hostel_requests') || '[]');
        const myReq = requests.find((r: any) => r.studentId === state.auth.user?.id);
        if (myReq) {
            setMyBooking(myReq);
        }
    }, [state.auth.user?.id]);

    const handleBookClick = (room: any) => {
        setSelectedRoom(room);
        setShowConfirmDialog(true);
    };

    const confirmBooking = () => {
        if (!selectedRoom || !state.auth.user) return;

        const newRequest = {
            id: Math.random().toString(36).substr(2, 9),
            studentId: state.auth.user.id,
            studentName: state.auth.user.name,
            roomId: selectedRoom.id,
            roomType: selectedRoom.type,
            block: selectedRoom.block,
            price: selectedRoom.price,
            status: 'pending',
            date: new Date().toISOString(),
        };

        // Save to local storage
        const requests = JSON.parse(localStorage.getItem('hostel_requests') || '[]');
        requests.push(newRequest);
        localStorage.setItem('hostel_requests', JSON.stringify(requests));

        setMyBooking(newRequest);
        setShowConfirmDialog(false);
        toast.success('Hostel booking request submitted successfully!');
    };

    const cancelBooking = () => {
        const requests = JSON.parse(localStorage.getItem('hostel_requests') || '[]');
        const updatedRequests = requests.filter((r: any) => r.studentId !== state.auth.user?.id);
        localStorage.setItem('hostel_requests', JSON.stringify(updatedRequests));

        setMyBooking(null);
        toast.info('Booking request cancelled.');
    };

    // If student already has a booking/request
    if (myBooking) {
        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">My Hostel Booking</h2>
                    <p className="text-slate-500">Track your room allocation status</p>
                </div>

                <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                {myBooking.status === 'pending' && <Clock className="w-10 h-10 text-amber-500" />}
                                {myBooking.status === 'approved' && <CheckCircle className="w-10 h-10 text-emerald-500" />}
                                {myBooking.status === 'rejected' && <XCircle className="w-10 h-10 text-red-500" />}
                            </div>

                            <div className="flex-1 text-center md:text-left space-y-2">
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <h3 className="text-xl font-bold text-slate-800">
                                        Request for Room {myBooking.roomId}
                                    </h3>
                                    <Badge className={
                                        myBooking.status === 'pending' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' :
                                            myBooking.status === 'approved' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' :
                                                'bg-red-100 text-red-700 hover:bg-red-100'
                                    }>
                                        {myBooking.status.toUpperCase()}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 max-w-md mx-auto md:mx-0">
                                    <div className="flex items-center gap-2">
                                        <Building className="w-4 h-4 text-slate-400" />
                                        <span>{myBooking.block}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Bed className="w-4 h-4 text-slate-400" />
                                        <span>{myBooking.roomType} Room</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IndianRupeeIcon className="w-4 h-4 text-slate-400" />
                                        <span>₹{myBooking.price.toLocaleString()}/year</span>
                                    </div>
                                </div>

                                {myBooking.status === 'pending' && (
                                    <p className="text-sm text-slate-500 mt-2">
                                        Your request is waiting for approval from the Warden.
                                    </p>
                                )}
                                {myBooking.status === 'approved' && (
                                    <p className="text-sm text-emerald-600 font-medium mt-2">
                                        Congratulations! Your room has been allocated. Please proceed to payment.
                                    </p>
                                )}
                            </div>

                            {myBooking.status === 'pending' && (
                                <Button variant="destructive" onClick={cancelBooking}>
                                    Cancel Request
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Hostel Booking</h2>
                    <p className="text-slate-500">View available rooms and submit requests</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {HOSTEL_ROOMS.map((room) => (
                    <Card key={room.id} className="border-0 shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant="outline" className="mb-2 border-blue-200 text-blue-700 bg-blue-50">
                                        {room.block}
                                    </Badge>
                                    <CardTitle className="text-xl text-slate-800">Room {room.id}</CardTitle>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-bold text-slate-800">₹{(room.price / 1000)}k</span>
                                    <span className="text-xs text-slate-500 block">/year</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <LayoutIcon type={room.type} />
                                    <span>{room.type} Occupancy</span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                                        <span>Occupancy</span>
                                        <span>{room.occupancy}/{room.capacity} spots filled</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{ width: `${(room.occupancy / room.capacity) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {room.features.map((feature) => (
                                        <span key={feature} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    disabled={room.occupancy >= room.capacity}
                                    onClick={() => handleBookClick(room)}
                                >
                                    {room.occupancy >= room.capacity ? 'Fully Occupied' : 'Book Now'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Booking Request</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to request Room {selectedRoom?.id}?
                            This will send a request to the Hostel Warden for approval.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-3 bg-slate-50 rounded-lg p-4">
                        <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Room Number</span>
                            <span className="font-medium">{selectedRoom?.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Block</span>
                            <span className="font-medium">{selectedRoom?.block}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Annual Fee</span>
                            <span className="font-medium">₹{selectedRoom?.price.toLocaleString()}</span>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
                        <Button onClick={confirmBooking} className="bg-blue-600 text-white">Confirm Booking</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function LayoutIcon({ type }: { type: string }) {
    if (type === 'Single') return <Users className="w-4 h-4 text-blue-500" />;
    if (type === 'Double') return <Users className="w-4 h-4 text-blue-500" />;
    return <Users className="w-4 h-4 text-blue-500" />;
}

function IndianRupeeIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M6 3h12" />
            <path d="M6 8h12" />
            <path d="m6 13 8.5 10" />
            <path d="M6 13h3" />
            <path d="M9 13c6.648 0 9-4.991 9-9" />
        </svg>
    )
}
