const API_BASE_URL = 'http://localhost:3001/api';

export interface ReservationData {
    fullName: string;
    email: string;
    phoneNumber: string;
    idRoom: string;
    checkIn: string; // Format: "YYYY-MM-DD"
    checkOut: string; // Format: "YYYY-MM-DD"
    guestNumber: number;
    additionalMessage?: string;
}

export interface Reservation extends ReservationData {
    _id: string;
    status: 'pending' | 'approved' | 'disapproved';
    rejectionMessage?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AvailabilityResponse {
    available: boolean;
    roomId: string;
    checkIn: string;
    checkOut: string;
    conflictingReservations: Array<{
        id: string;
        checkIn: string;
        checkOut: string;
        status: string;
    }>;
}

// API Service Class
class ApiService {
    private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Check room availability
    async checkAvailability(roomId: string, checkIn: string, checkOut: string): Promise<AvailabilityResponse> {
        const params = new URLSearchParams({
            roomId,
            checkIn,
            checkOut,
        });

        return this.request<AvailabilityResponse>(`/reservations/availability?${params}`);
    }

    // Create a new reservation
    async createReservation(reservationData: ReservationData): Promise<{ message: string; reservation: Reservation }> {
        return this.request<{ message: string; reservation: Reservation }>('/reservations', {
            method: 'POST',
            body: JSON.stringify(reservationData),
        });
    }

    // Get all reservations (for admin)
    async getAllReservations(page = 1, limit = 10, status?: string, room?: string): Promise<{
        reservations: Reservation[];
        pagination: {
            current: number;
            pages: number;
            total: number;
        };
    }> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (status) params.append('status', status);
        if (room) params.append('room', room);

        return this.request<{
            reservations: Reservation[];
            pagination: { current: number; pages: number; total: number };
        }>(`/reservations?${params}`);
    }

    // Get reservation by ID
    async getReservationById(id: string): Promise<{ reservation: Reservation }> {
        return this.request<{ reservation: Reservation }>(`/reservations/${id}`);
    }

    // Update reservation status (for admin)
    async updateReservationStatus(
        id: string,
        status: 'pending' | 'approved' | 'disapproved',
        rejectionMessage?: string
    ): Promise<{ message: string; reservation: Reservation }> {
        return this.request<{ message: string; reservation: Reservation }>(`/reservations/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status, rejectionMessage }),
        });
    }

    // Delete reservation (for admin)
    async deleteReservation(id: string): Promise<{ message: string }> {
        return this.request<{ message: string }>(`/reservations/${id}`, {
            method: 'DELETE',
        });
    }

    // Health check
    async healthCheck(): Promise<{ status: string; message: string; database: string }> {
        return this.request<{ status: string; message: string; database: string }>('/health');
    }

    // Test email service
    async testEmail(): Promise<{ success: boolean; message?: string; error?: string }> {
        return this.request<{ success: boolean; message?: string; error?: string }>('/test-email', {
            method: 'POST',
        });
    }
}

// Export singleton instance
export const apiService = new ApiService();

// Export individual functions for convenience
export const {
    checkAvailability,
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservationStatus,
    deleteReservation,
    healthCheck,
    testEmail,
} = apiService;