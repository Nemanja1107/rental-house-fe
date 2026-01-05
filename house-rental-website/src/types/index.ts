export interface Property {
    id: string;
    name: string;
    description: string;
    location: string;
    images: string[];
    amenities: string[];
}

export interface Room {
    id: string;
    name: string;
    description: string;
    capacity: number;
    amenities: string[];
    images: string[];
    price?: number; // Optional for future implementation
}

export interface Attraction {
    id: string;
    name: string;
    description: string;
    distance: string;
    category: 'restaurant' | 'entertainment' | 'nature' | 'shopping' | 'transport';
    icon: string;
}

export interface ReservationForm {
    name: string;
    email: string;
    phone: string;
    roomId: string;
    checkIn: string; // Date string in YYYY-MM-DD format
    checkOut: string; // Date string in YYYY-MM-DD format
    guests: number;
    message: string;
}

export interface NavItem {
    id: string;
    label: string;
    href: string;
}

export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    cursor?: 'default' | 'pointer' | 'none';
    'data-testid'?: string;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    category: 'exterior' | 'interior' | 'amenities';
    roomCategory?: 'living-room' | 'bedroom' | 'kitchen' | 'bathroom' | 'amenities';
    thumbnail?: string;
}

export interface GalleryProps {
    images: GalleryImage[];
    totalImages?: number;
    onImageClick?: (image: GalleryImage, index: number) => void;
    onViewAllClick?: () => void;
}

// Validation utilities
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
};

export const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
};

export const validateReservationForm = (form: ReservationForm): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!validateRequired(form.name)) {
        errors.push('Name is required');
    }

    if (!validateRequired(form.email)) {
        errors.push('Email is required');
    } else if (!validateEmail(form.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!validateRequired(form.phone)) {
        errors.push('Phone number is required');
    } else if (!validatePhone(form.phone)) {
        errors.push('Please enter a valid phone number');
    }

    if (form.guests < 1) {
        errors.push('Number of guests must be at least 1');
    }

    if (!validateRequired(form.message)) {
        errors.push('Message is required');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};