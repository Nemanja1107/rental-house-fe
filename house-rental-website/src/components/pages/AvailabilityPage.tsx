import React, { useEffect, useState } from 'react';
import { ArrowLeft, Users, CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';
import Card from '../ui/Card';
import { apiService, type Reservation } from '../../services/api';

interface AvailabilityPageProps {
    onBack: () => void;
    onBookNow?: (roomId: string) => void;
}

interface RoomData {
    id: string;
    name: string;
    image: string;
    capacity: number;
    price: number;
    description: string;
}

interface DayStatus {
    date: string;
    status: 'available' | 'booked' | 'pending';
    reservation?: Reservation;
}

const AvailabilityPage: React.FC<AvailabilityPageProps> = ({ onBack, onBookNow }) => {
    const { t } = useTranslation();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    // Room data - updated to match backend room IDs
    const rooms: RoomData[] = [
        {
            id: 'room-101',
            name: t('firstFloorHouse') || 'First Floor Apartment',
            image: '/src/assets/images/CB0A4806.jpg',
            capacity: 3,
            price: 30,
            description: t('firstFloorDesc')
        },
        {
            id: 'room-102',
            name: t('masterBedroomTitle') || 'Master Bedroom',
            image: '/src/assets/images/CB0A4838.jpg',
            capacity: 2,
            price: 30,
            description: t('masterBedroomDescription')
        },
        {
            id: 'room-103',
            name: t('guestBedroomTitle') || 'Guest Bedroom',
            image: '/src/assets/images/CB0A4835.jpg',
            capacity: 2,
            price: 30,
            description: t('guestBedroomDescription')
        },
        {
            id: 'room-104',
            name: t('guestRoom3Title') || 'Guest Room 3',
            image: '/src/assets/images/CB0A4831.jpg',
            capacity: 2,
            price: 30,
            description: t('guestRoom3Description') || 'Cozy third guest room with modern amenities'
        }
    ];

    // Fetch reservations from API
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await apiService.getAllReservations(1, 100);
                setReservations(response.reservations);
            } catch (err) {
                console.error('Failed to fetch reservations:', err);
                setError(`${t('failedToLoadReservations') || 'Failed to load reservations'}: ${err instanceof Error ? err.message : 'Unknown error'}`);
                setReservations([]); // Fallback to empty array
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    // Generate availability data based on real reservations
    const generateAvailabilityData = (roomId: string, year: number, month: number): DayStatus[] => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const availability: DayStatus[] = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            const dateString = currentDate.toISOString().split('T')[0];

            // Find reservations that overlap with this date
            const overlappingReservation = reservations.find(reservation => {
                if (reservation.idRoom !== roomId) return false;

                const checkInStr = reservation.checkIn.split('T')[0];
                const checkOutStr = reservation.checkOut.split('T')[0];
                const currentDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                return currentDateStr >= checkInStr && currentDateStr <= checkOutStr;
            });

            let status: 'available' | 'booked' | 'pending' = 'available';

            if (overlappingReservation) {
                status = overlappingReservation.status === 'approved' ? 'booked' : 'pending';
            }

            availability.push({
                date: dateString,
                status,
                reservation: overlappingReservation
            });
        }

        return availability;
    };

    // Calendar helper functions
    const getMonthName = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add all days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(prev.getMonth() - 1);
            } else {
                newDate.setMonth(prev.getMonth() + 1);
            }
            return newDate;
        });
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
            case 'booked':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'available':
                return <CheckCircle className="w-3 h-3" />;
            case 'booked':
                return <XCircle className="w-3 h-3" />;
            case 'pending':
                return <Clock className="w-3 h-3" />;
            default:
                return null;
        }
    };

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex items-center justify-between py-6">
                        <button
                            onClick={onBack}
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            {t('backToRooms') || 'Back to Rooms'}
                        </button>

                        <h1 className="text-2xl font-bold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
                            {t('roomAvailability') || 'Room Availability'}
                        </h1>

                        {/* Empty div for balance */}
                        <div></div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">{t('loadingReservations') || 'Loading reservations...'}</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                            <p className="text-yellow-800">{error}</p>
                        </div>
                    </div>
                )}

                {/* Content - only show when not loading */}
                {!loading && (
                    <>
                        {/* Month Navigation */}
                        <div className="flex items-center justify-between mb-8 bg-white rounded-lg shadow-sm p-6">
                            <button
                                onClick={() => navigateMonth('prev')}
                                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 mr-1" />
                                {t('previousMonth') || 'Previous'}
                            </button>

                            <div className="text-center">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {getMonthName(currentMonth)}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    {t('selectDatesToCheck') || 'Select dates to check availability'}
                                </p>
                            </div>

                            <button
                                onClick={() => navigateMonth('next')}
                                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                {t('nextMonth') || 'Next'}
                                <ChevronRight className="w-5 h-5 ml-1" />
                            </button>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-center space-x-8 mb-8 p-4 bg-white rounded-lg shadow-sm">
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-medium text-gray-700">
                                    {t('available') || 'Available'}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-yellow-600" />
                                <span className="text-sm font-medium text-gray-700">
                                    {t('pending') || 'Pending'}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <XCircle className="w-4 h-4 text-red-600" />
                                <span className="text-sm font-medium text-gray-700">
                                    {t('booked') || 'Booked'}
                                </span>
                            </div>
                        </div>
                    </>
                )}

                {/* Rooms Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {rooms.map((room) => {
                            const availability = generateAvailabilityData(
                                room.id,
                                currentMonth.getFullYear(),
                                currentMonth.getMonth()
                            );
                            const days = getDaysInMonth(currentMonth);

                            return (
                                <Card key={room.id} className="overflow-hidden">
                                    {/* Room Header */}
                                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                                                <img
                                                    src={room.image}
                                                    alt={room.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = 'none';
                                                        target.parentElement!.innerHTML = `
                                                            <div class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-xs">
                                                                No Image
                                                            </div>
                                                        `;
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {room.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {room.description}
                                                </p>
                                                <div className="flex items-center space-x-4 text-sm">
                                                    <div className="flex items-center space-x-1 text-gray-600">
                                                        <Users className="w-4 h-4" />
                                                        <span>{room.capacity} {t('guests') || 'guests'}</span>
                                                    </div>
                                                    <div className="font-semibold text-blue-600">
                                                        {room.price} BAM/{t('perPerson') || 'person'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Calendar */}
                                    <div className="p-6">
                                        {/* Calendar Header */}
                                        <div className="grid grid-cols-7 gap-1 mb-3">
                                            {dayNames.map((day) => (
                                                <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
                                                    {day}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Calendar Grid */}
                                        <div className="grid grid-cols-7 gap-1">
                                            {days.map((day, index) => {
                                                if (day === null) {
                                                    return <div key={index} className="h-10"></div>;
                                                }

                                                const dayData = availability.find(d =>
                                                    parseInt(d.date.split('-')[2]) === day
                                                );
                                                const status = dayData?.status || 'available';
                                                const reservation = dayData?.reservation;

                                                const today = new Date();
                                                const isToday =
                                                    today.getDate() === day &&
                                                    today.getMonth() === currentMonth.getMonth() &&
                                                    today.getFullYear() === currentMonth.getFullYear();

                                                // Create tooltip text
                                                let tooltipText = `${day} - ${status.charAt(0).toUpperCase() + status.slice(1)}`;
                                                if (reservation) {
                                                    tooltipText += `\nGuest: ${reservation.fullName}\nCheck-in: ${new Date(reservation.checkIn).toLocaleDateString()}\nCheck-out: ${new Date(reservation.checkOut).toLocaleDateString()}`;
                                                }

                                                return (
                                                    <div
                                                        key={day}
                                                        className={`
                                                            h-10 flex items-center justify-center text-sm rounded-lg border transition-all cursor-pointer
                                                            ${getStatusStyle(status)}
                                                            ${isToday ? 'ring-2 ring-blue-400 ring-offset-1' : ''}
                                                            ${status === 'available' ? 'hover:scale-105' : 'cursor-not-allowed'}
                                                        `}
                                                        title={tooltipText}
                                                    >
                                                        <div className="flex items-center space-x-1">
                                                            <span className="font-medium">{day}</span>
                                                            {status !== 'available' && getStatusIcon(status)}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Room Statistics */}
                                        <div className="mt-6 pt-4 border-t border-gray-200">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-6 text-sm">
                                                    <div className="flex items-center space-x-1">
                                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                        <span className="text-gray-600">
                                                            {availability.filter(d => d.status === 'available').length} {t('available') || 'available'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                        <span className="text-gray-600">
                                                            {availability.filter(d => d.status === 'booked').length} {t('booked') || 'booked'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                                        <span className="text-gray-600">
                                                            {availability.filter(d => d.status === 'pending').length} {t('pending') || 'pending'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => onBookNow?.(room.id)}
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                                                >
                                                    {t('bookNow') || 'Book Now'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailabilityPage;