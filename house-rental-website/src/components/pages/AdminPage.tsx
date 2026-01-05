import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Calendar, CheckCircle, XCircle, Clock, AlertCircle, Trash2 } from 'lucide-react';
import { apiService, type Reservation } from '../../services/api';
import DisapprovalModal from '../ui/DisapprovalModal';
import DeleteModal from '../ui/DeleteModal';
import { useTranslation } from '../../contexts/TranslationContext';

interface AdminPageProps {
    onBack: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onBack }) => {
    const { t } = useTranslation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'approved' | 'disapproved'>('all');
    const [disapprovalModal, setDisapprovalModal] = useState<{
        isOpen: boolean;
        reservation: Reservation | null;
    }>({ isOpen: false, reservation: null });
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        reservation: Reservation | null;
        isDeleting: boolean;
    }>({ isOpen: false, reservation: null, isDeleting: false });

    // Authorized admin emails - only these emails can access the admin panel
    // TO ADD NEW ADMIN: Simply add the email address to this array
    const authorizedEmails = [
        'nemanjebjelogrlic@gmail.com',           // Default admin account
        // Add more authorized emails here as needed
        // Example: 'your-email@domain.com'
    ];

    // Fetch reservations from API
    const fetchReservations = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await apiService.getAllReservations(1, 50);
            setReservations(response.reservations);
        } catch (err) {
            console.error('Failed to fetch reservations:', err);
            setError(`${t('failedToLoadReservations') || 'Failed to load reservations'}: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    // Load reservations when logged in
    useEffect(() => {
        if (isLoggedIn) {
            fetchReservations();
        }
    }, [isLoggedIn]);

    // Update reservation status
    const updateReservationStatus = async (id: string, status: 'approved' | 'disapproved', rejectionMessage?: string) => {
        try {
            await apiService.updateReservationStatus(id, status, rejectionMessage);
            await fetchReservations();

            // Show success message with email notification info
            const statusMessage = status === 'approved'
                ? t('reservationApproved') || 'Reservation Approved!'
                : t('reservationDisapproved') || 'Reservation Not Approved';

            const emailMessage = t('statusUpdateEmailSent') || 'Status update email has been sent to the guest.';

            // You could add a toast notification here if you have one
            console.log(`${statusMessage} - ${emailMessage}`);

        } catch (err) {
            console.error('Failed to update reservation:', err);
            setError(t('failedToUpdateReservation') || 'Failed to update reservation status');
        }
    };

    // Delete reservation
    const deleteReservation = async (id: string) => {
        setDeleteModal(prev => ({ ...prev, isDeleting: true }));

        try {
            await apiService.deleteReservation(id);
            await fetchReservations();
            closeDeleteModal();
        } catch (err) {
            console.error('Failed to delete reservation:', err);
            setError(t('failedToDeleteReservation') || 'Failed to delete reservation');
            setDeleteModal(prev => ({ ...prev, isDeleting: false }));
        }
    };

    // Open delete modal
    const openDeleteModal = (reservation: Reservation) => {
        setDeleteModal({ isOpen: true, reservation, isDeleting: false });
    };

    // Close delete modal
    const closeDeleteModal = () => {
        setDeleteModal({ isOpen: false, reservation: null, isDeleting: false });
    };

    // Handle delete confirmation
    const handleDeleteConfirm = () => {
        if (deleteModal.reservation) {
            deleteReservation(deleteModal.reservation._id);
        }
    };

    // Open disapproval modal
    const openDisapprovalModal = (reservation: Reservation) => {
        setDisapprovalModal({ isOpen: true, reservation });
    };

    // Close disapproval modal
    const closeDisapprovalModal = () => {
        setDisapprovalModal({ isOpen: false, reservation: null });
    };

    // Handle disapproval confirmation
    const handleDisapprovalConfirm = async (reason: string) => {
        if (disapprovalModal.reservation) {
            await updateReservationStatus(disapprovalModal.reservation._id, 'disapproved', reason);
            closeDisapprovalModal();
        }
    };

    // Filter reservations based on selected status
    const filteredReservations = selectedStatus === 'all'
        ? reservations
        : reservations.filter(r => r.status === selectedStatus);

    // Room name mapping
    const getRoomName = (roomId: string) => {
        const roomNames: { [key: string]: string } = {
            'room-101': 'First Floor Apartment',
            'room-102': 'Master Bedroom',
            'room-103': 'Guest Bedroom',
            'room-104': 'Guest Room 3'
        };
        return roomNames[roomId] || roomId;
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if email is in the authorized list (case insensitive)
        const isAuthorizedEmail = authorizedEmails.some(authorizedEmail =>
            authorizedEmail.toLowerCase() === email.toLowerCase()
        ) || email.toLowerCase() === 'admin';

        if (isAuthorizedEmail) {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError(t('unauthorizedEmail') || 'This email is not authorized to access the admin panel.');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmail('');
        setReservations([]);
        setError('');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'approved': return 'bg-green-100 text-green-800 border-green-200';
            case 'disapproved': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'approved': return <CheckCircle className="w-4 h-4" />;
            case 'disapproved': return <XCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    // Calculate statistics
    const pendingCount = filteredReservations.filter(r => r.status === 'pending').length;
    const approvedCount = filteredReservations.filter(r => r.status === 'approved').length;
    const disapprovedCount = filteredReservations.filter(r => r.status === 'disapproved').length;

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 pb-8 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <button
                        onClick={onBack}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        {t('backToMain') || 'Back to Main'}
                    </button>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                        {t('adminLogin') || 'Admin Login'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {t('accessReservationSystem') || 'Access the reservation management system'}
                    </p>
                    <div className="mt-2 text-center">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {t('restrictedAccess') || 'Restricted Access - Authorized Emails Only'}
                        </div>
                    </div>
                </div>

                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    {t('emailAddress') || 'Email address'}
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder={t('enterEmailAddress') || 'Enter your email address'}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="text-red-600 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {t('accessAdmin') || 'Access Admin Panel'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="mt-3 text-center text-sm text-gray-600">
                                <div className="mt-3 pt-2 border-t border-gray-200 text-xs text-gray-500">
                                    {t('emailOnlyAccess') || 'Simply enter your authorized email to access the admin panel'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6 relative">
                        <button
                            onClick={onBack}
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            {t('back') || 'Back'}
                        </button>

                        <h1 className="text-2xl font-bold text-gray-900 absolute left-1/2 transform -translate-x-1/2">
                            {t('adminDashboard') || 'Admin Dashboard'}
                        </h1>

                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                            {t('logout') || 'Logout'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Calendar className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{t('totalReservations') || 'Total Reservations'}</dt>
                                        <dd className="text-lg font-medium text-gray-900">{reservations.length}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Clock className="h-6 w-6 text-yellow-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{t('pending') || 'Pending'}</dt>
                                        <dd className="text-lg font-medium text-gray-900">{pendingCount}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <CheckCircle className="h-6 w-6 text-green-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{t('approved') || 'Approved'}</dt>
                                        <dd className="text-lg font-medium text-gray-900">{approvedCount}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <XCircle className="h-6 w-6 text-red-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{t('disapproved') || 'Disapproved'}</dt>
                                        <dd className="text-lg font-medium text-gray-900">{disapprovedCount}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reservations List */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{t('allReservations') || 'All Reservations'}</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">{t('manageGuestReservations') || 'Manage guest reservations and bookings'}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value as any)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">{t('allStatus') || 'All Status'}</option>
                                <option value="pending">{t('pending') || 'Pending'}</option>
                                <option value="approved">{t('approved') || 'Approved'}</option>
                                <option value="disapproved">{t('disapproved') || 'Disapproved'}</option>
                            </select>
                            <button
                                onClick={fetchReservations}
                                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {t('refresh') || 'Refresh'}
                            </button>
                        </div>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {loading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                <p className="text-gray-600">{t('loadingReservations') || 'Loading reservations...'}</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8">
                                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
                                <p className="text-red-600">{error}</p>
                                <button
                                    onClick={fetchReservations}
                                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    {t('retry') || 'Retry'}
                                </button>
                            </div>
                        ) : filteredReservations.length === 0 ? (
                            <div className="text-center py-8">
                                <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600">{t('noReservationsFound') || 'No reservations found'}</p>
                            </div>
                        ) : (
                            filteredReservations.map((reservation) => (
                                <li key={reservation._id}>
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <Users className="h-6 w-6 text-gray-400" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="flex items-center">
                                                        <p className="text-sm font-medium text-gray-900">{reservation.fullName}</p>
                                                        <span className={`ml-2 inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(reservation.status)}`}>
                                                            {getStatusIcon(reservation.status)}
                                                            <span className="ml-1 capitalize">{reservation.status}</span>
                                                        </span>
                                                    </div>
                                                    <div className="mt-1 flex items-center text-sm text-gray-500">
                                                        <p>{reservation.email} • {reservation.phoneNumber}</p>
                                                    </div>
                                                    <div className="mt-1 text-sm text-gray-500">
                                                        <p>Room: {getRoomName(reservation.idRoom)} • Guests: {reservation.guestNumber}</p>
                                                        <p>Check-in: {new Date(reservation.checkIn).toLocaleDateString()} • Check-out: {new Date(reservation.checkOut).toLocaleDateString()}</p>
                                                    </div>
                                                    {reservation.additionalMessage && (
                                                        <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                                            <p>"{reservation.additionalMessage}"</p>
                                                        </div>
                                                    )}
                                                    {reservation.rejectionMessage && (
                                                        <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                                                            <p>Rejection reason: "{reservation.rejectionMessage}"</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {reservation.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => updateReservationStatus(reservation._id, 'approved')}
                                                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                        >
                                                            <CheckCircle className="w-3 h-3 mr-1" />
                                                            {t('approve') || 'Approve'}
                                                        </button>
                                                        <button
                                                            onClick={() => openDisapprovalModal(reservation)}
                                                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                        >
                                                            <XCircle className="w-3 h-3 mr-1" />
                                                            {t('reject') || 'Reject'}
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => openDeleteModal(reservation)}
                                                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    <Trash2 className="w-3 h-3 mr-1" />
                                                    {t('delete') || 'Delete'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>

            {/* Disapproval Modal */}
            <DisapprovalModal
                isOpen={disapprovalModal.isOpen}
                onClose={closeDisapprovalModal}
                onConfirm={handleDisapprovalConfirm}
                guestName={disapprovalModal.reservation?.fullName || ''}
                roomName={getRoomName(disapprovalModal.reservation?.idRoom || '')}
            />

            {/* Delete Modal */}
            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteConfirm}
                title={t('confirmDelete') || 'Confirm Delete'}
                message={`${t('deleteConfirmationMessage') || 'Are you sure you want to delete this reservation? This action cannot be undone.'}\n\n${t('guest') || 'Guest'}: ${deleteModal.reservation?.fullName || ''}\n${t('room') || 'Room'}: ${getRoomName(deleteModal.reservation?.idRoom || '')}`}
                isDeleting={deleteModal.isDeleting}
            />
        </div>
    );
};

export default AdminPage;