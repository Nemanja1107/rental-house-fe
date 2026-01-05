import React, { useEffect, useState } from 'react';
import { Mail, Phone, Users, MessageSquare, Send, CheckCircle, AlertCircle, Calendar, Home } from 'lucide-react';
import Card from '../ui/Card';
import type { ReservationForm } from '../../types';
import { useTranslation } from '../../contexts/TranslationContext';
import { apiService, type ReservationData } from '../../services/api';

interface ReservationProps {
    onSubmit?: (formData: ReservationForm) => Promise<boolean>;
    selectedRoomId?: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    roomId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
    message?: string;
}

const Reservation: React.FC<ReservationProps> = ({
    selectedRoomId = '',
    onSubmit
}) => {
    const { t } = useTranslation();

    // Room options matching your database schema
    const roomOptions = [
        { id: 'room-101', name: t('firstFloorHouse') || 'First Floor Apartment' },
        { id: 'room-102', name: t('masterBedroomTitle') || 'Master Bedroom' },
        { id: 'room-103', name: t('guestBedroomTitle') || 'Guest Bedroom' },
        { id: 'room-104', name: t('guestRoom3Title') || 'Guest Room 3' }
    ];
    const [formData, setFormData] = useState<ReservationForm>({
        name: '',
        email: '',
        phone: '',
        roomId: selectedRoomId,
        checkIn: '',
        checkOut: '',
        guests: 1,
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
    const [availabilityMessage, setAvailabilityMessage] = useState<string>('');

    // Check availability when dates and room change
    useEffect(() => {
        const checkAvailability = async () => {
            if (formData.roomId && formData.checkIn && formData.checkOut) {
                setIsCheckingAvailability(true);
                setAvailabilityMessage('');

                try {
                    const result = await apiService.checkAvailability(
                        formData.roomId,
                        formData.checkIn,
                        formData.checkOut
                    );

                    if (result.available) {
                        setAvailabilityMessage('✅ Room is available for selected dates');
                    } else {
                        setAvailabilityMessage('❌ Room is not available for selected dates');
                    }
                } catch (error) {
                    console.error('Availability check failed:', error);
                    setAvailabilityMessage('⚠️ Could not check availability');
                } finally {
                    setIsCheckingAvailability(false);
                }
            }
        };

        // Debounce the availability check
        const timeoutId = setTimeout(checkAvailability, 500);
        return () => clearTimeout(timeoutId);
    }, [formData.roomId, formData.checkIn, formData.checkOut]);

    // Update form when selectedRoomId changes
    useEffect(() => {
        if (selectedRoomId) {
            setFormData(prev => ({
                ...prev,
                roomId: selectedRoomId
            }));
        }
    }, [selectedRoomId]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = t('nameRequired') || 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = t('nameMinLength') || 'Name must be at least 2 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = t('emailRequired') || 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = t('emailInvalid') || 'Please enter a valid email';
        }

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = t('phoneRequired') || 'Phone number is required';
        } else if (formData.phone.trim().length < 10) {
            newErrors.phone = t('phoneInvalid') || 'Please enter a valid phone number';
        }

        // Room validation
        if (!formData.roomId) {
            newErrors.roomId = t('roomRequired') || 'Please select a room';
        }

        // Check-in validation
        if (!formData.checkIn) {
            newErrors.checkIn = t('checkInRequired') || 'Check-in date is required';
        } else {
            const checkInDate = new Date(formData.checkIn);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (checkInDate < today) {
                newErrors.checkIn = t('checkInFuture') || 'Check-in date must be in the future';
            }
        }

        // Check-out validation
        if (!formData.checkOut) {
            newErrors.checkOut = t('checkOutRequired') || 'Check-out date is required';
        } else if (formData.checkIn && formData.checkOut) {
            const checkInDate = new Date(formData.checkIn);
            const checkOutDate = new Date(formData.checkOut);
            if (checkOutDate <= checkInDate) {
                newErrors.checkOut = t('checkOutAfterCheckIn') || 'Check-out must be after check-in date';
            }
        }

        // Guests validation
        if (!formData.guests || formData.guests < 1) {
            newErrors.guests = t('guestsMinimum') || 'At least 1 guest is required';
        } else if (formData.guests > 20) {
            newErrors.guests = t('guestsMaximum') || 'Maximum 20 guests allowed';
        }

        // Message validation (optional)
        if (formData.message.trim() && formData.message.trim().length < 10) {
            newErrors.message = t('messageMinLength') || 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'guests' ? parseInt(value) || 0 : value
        }));

        // Clear error for this field when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Check availability one more time before submitting
        if (formData.roomId && formData.checkIn && formData.checkOut) {
            try {
                const availabilityResult = await apiService.checkAvailability(
                    formData.roomId,
                    formData.checkIn,
                    formData.checkOut
                );

                if (!availabilityResult.available) {
                    setSubmitStatus('error');
                    setErrors({
                        checkIn: 'Room is not available for selected dates. Please choose different dates.'
                    });
                    return;
                }
            } catch (error) {
                console.error('Availability check failed:', error);
                // Continue with submission even if availability check fails
            }
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Use custom onSubmit if provided, otherwise use API service
            if (onSubmit) {
                const success = await onSubmit(formData);
                if (success) {
                    setSubmitStatus('success');
                    // Reset form on success
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        roomId: '',
                        checkIn: '',
                        checkOut: '',
                        guests: 1,
                        message: ''
                    });
                    setAvailabilityMessage('');
                } else {
                    setSubmitStatus('error');
                }
            } else {
                // Use API service to create reservation
                const reservationData: ReservationData = {
                    fullName: formData.name,
                    email: formData.email,
                    phoneNumber: formData.phone,
                    idRoom: formData.roomId,
                    checkIn: formData.checkIn,
                    checkOut: formData.checkOut,
                    guestNumber: formData.guests,
                    additionalMessage: formData.message.trim() || undefined
                };

                const result = await apiService.createReservation(reservationData);

                if (result.reservation) {
                    setSubmitStatus('success');
                    // Reset form on success
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        roomId: '',
                        checkIn: '',
                        checkOut: '',
                        guests: 1,
                        message: ''
                    });
                    setAvailabilityMessage('');
                } else {
                    setSubmitStatus('error');
                }
            }
        } catch (error: any) {
            console.error('Reservation submission failed:', error);
            setSubmitStatus('error');

            // Handle specific API errors
            if (error.message?.includes('Validation failed')) {
                setErrors({
                    message: 'Please check your information and try again.'
                });
            } else if (error.message?.includes('not available')) {
                setErrors({
                    checkIn: 'Room is not available for selected dates.'
                });
            } else {
                setErrors({
                    message: t('failedToCreateReservation') || 'Failed to create reservation. Please try again later.'
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="reservation" className="py-16 bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            {t('reservationTitle')}
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            {t('reservationSubtitle')}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Information */}
                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-6">
                                {t('contactInformation')}
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <Mail className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{t('email')}</p>
                                        <p className="text-gray-300">info@rentalhouse.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <Phone className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{t('phone')}</p>
                                        <p className="text-gray-300">+387 66 378 182</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                                    {t('quickResponseTitle')}
                                </h4>
                                <p className="text-blue-800">
                                    {t('quickResponseText')}
                                </p>
                            </div>
                        </div>

                        {/* Reservation Form */}
                        <Card className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('fullName')} *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder={t('enterFullName')}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('emailAddress')} *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder={t('enterEmailAddress')}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('phoneNumber')} *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder={t('enterPhoneNumber')}
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Room Selection */}
                                <div>
                                    <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('selectRoom') || 'Select Room'} *
                                    </label>
                                    <div className="relative">
                                        <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <select
                                            id="roomId"
                                            name="roomId"
                                            value={formData.roomId}
                                            onChange={handleInputChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white ${errors.roomId ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        >
                                            <option value="">{t('chooseRoom') || 'Choose a room...'}</option>
                                            {roomOptions.map((room) => (
                                                <option key={room.id} value={room.id}>
                                                    {room.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.roomId && (
                                        <p className="mt-1 text-sm text-red-600">{errors.roomId}</p>
                                    )}
                                </div>

                                {/* Date Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Check-in Date */}
                                    <div>
                                        <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('checkInDate') || 'Check-in Date'} *
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                type="date"
                                                id="checkIn"
                                                name="checkIn"
                                                value={formData.checkIn}
                                                onChange={handleInputChange}
                                                min={new Date().toISOString().split('T')[0]}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.checkIn ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                        </div>
                                        {errors.checkIn && (
                                            <p className="mt-1 text-sm text-red-600">{errors.checkIn}</p>
                                        )}
                                    </div>

                                    {/* Check-out Date */}
                                    <div>
                                        <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('checkOutDate') || 'Check-out Date'} *
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                type="date"
                                                id="checkOut"
                                                name="checkOut"
                                                value={formData.checkOut}
                                                onChange={handleInputChange}
                                                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.checkOut ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                        </div>
                                        {errors.checkOut && (
                                            <p className="mt-1 text-sm text-red-600">{errors.checkOut}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Availability Status */}
                                {(formData.roomId && formData.checkIn && formData.checkOut) && (
                                    <div className="p-4 rounded-lg border">
                                        {isCheckingAvailability ? (
                                            <div className="flex items-center text-blue-600">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                                                {t('checkingAvailability') || 'Checking availability...'}
                                            </div>
                                        ) : availabilityMessage && (
                                            <p className={`text-sm font-medium ${availabilityMessage.includes('✅')
                                                ? 'text-green-600 bg-green-50 border-green-200'
                                                : availabilityMessage.includes('❌')
                                                    ? 'text-red-600 bg-red-50 border-red-200'
                                                    : 'text-yellow-600 bg-yellow-50 border-yellow-200'
                                                } p-3 rounded`}>
                                                {availabilityMessage}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Guests Field */}
                                <div>
                                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('numberOfGuests')} *
                                    </label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="number"
                                            id="guests"
                                            name="guests"
                                            min="1"
                                            max="20"
                                            value={formData.guests}
                                            onChange={handleInputChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.guests ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                    </div>
                                    {errors.guests && (
                                        <p className="mt-1 text-sm text-red-600">{errors.guests}</p>
                                    )}
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('message') || 'Additional Message'} (Optional)
                                    </label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder={t('messagePlaceholder') || 'Any special requests or additional information (optional)...'}
                                        />
                                    </div>
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={
                                        isSubmitting ||
                                        isCheckingAvailability ||
                                        Boolean(availabilityMessage && availabilityMessage.includes('❌'))
                                    }
                                    className={`w-full flex items-center justify-center px-6 py-3 text-base font-semibold text-white rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 ${isSubmitting || isCheckingAvailability || Boolean(availabilityMessage && availabilityMessage.includes('❌'))
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl transform hover:scale-105'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            {t('sending')}
                                        </>
                                    ) : isCheckingAvailability ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            {t('checkingAvailability') || 'Checking availability...'}
                                        </>
                                    ) : Boolean(availabilityMessage && availabilityMessage.includes('❌')) ? (
                                        <>
                                            <AlertCircle className="h-5 w-5 mr-2" />
                                            Room Not Available
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5 mr-2" />
                                            {t('sendReservation')}
                                        </>
                                    )}
                                </button>

                                {/* Status Messages */}
                                {submitStatus === 'success' && (
                                    <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-green-800">
                                                {t('reservationCreatedSuccessfully') || 'Reservation Created Successfully!'}
                                            </p>
                                            <p className="text-sm text-green-700">
                                                {t('reservationConfirmationMessage') || 'Your reservation has been submitted and confirmation emails have been sent. You will receive a response within 24 hours.'}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-red-800">
                                                Reservation Failed
                                            </p>
                                            <p className="text-sm text-red-700">
                                                {errors.message || errors.checkIn || 'There was an error creating your reservation. Please check your information and try again.'}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reservation;