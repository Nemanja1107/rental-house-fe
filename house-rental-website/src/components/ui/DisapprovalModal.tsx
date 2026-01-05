import React, { useState } from 'react';
import { X, AlertTriangle, MessageSquare } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

interface DisapprovalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => Promise<void>;
    guestName: string;
    roomName: string;
}

const DisapprovalModal: React.FC<DisapprovalModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    guestName,
    roomName
}) => {
    const { t } = useTranslation();
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (reason.trim()) {
            setIsSubmitting(true);
            try {
                await onConfirm(reason.trim());
                setReason('');
                onClose();
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleClose = () => {
        setReason('');
        onClose();
    };

    const commonReasons = [
        t('datesNotAvailable') || "Dates are not available",
        t('propertyMaintenance') || "Property is under maintenance",
        t('bookingConflicts') || "Booking conflicts with existing reservation",
        t('guestRequirements') || "Guest requirements cannot be accommodated",
        t('incompleteInformation') || "Incomplete or invalid information provided"
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    onClick={handleClose}
                ></div>

                {/* Modal */}
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    {t('disapproveReservation') || 'Disapprove Reservation'}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {guestName} • {roomName}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Reason Input */}
                        <div className="mb-4">
                            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                                <MessageSquare className="inline h-4 w-4 mr-1" />
                                {t('reasonForDisapproval') || 'Reason for Disapproval'}
                            </label>
                            <textarea
                                id="reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 resize-none"
                                placeholder={t('disapprovalPlaceholder') || "Please provide a reason for disapproving this reservation..."}
                                required
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                {t('disapprovalMessage') || "This message will be sent to the guest to explain why their reservation was not approved."}
                            </p>
                        </div>

                        {/* Quick Reasons */}
                        <div className="mb-6">
                            <p className="text-sm font-medium text-gray-700 mb-2">{t('quickReasons') || 'Quick Reasons:'}</p>
                            <div className="flex flex-wrap gap-2">
                                {commonReasons.map((commonReason, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setReason(commonReason)}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                                    >
                                        {commonReason}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                disabled={isSubmitting}
                            >
                                {t('cancel') || 'Cancel'}
                            </button>
                            <button
                                type="submit"
                                disabled={!reason.trim() || isSubmitting}
                                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                                        {t('disapproving') || 'Disapproving...'}
                                    </>
                                ) : (
                                    t('disapproveReservation') || 'Disapprove Reservation'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DisapprovalModal;