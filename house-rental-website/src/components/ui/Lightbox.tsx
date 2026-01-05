import React, { useEffect, useState, useCallback } from 'react';
import type { GalleryImage } from '../../types';

interface LightboxProps {
    images: GalleryImage[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, isOpen, onClose }) => {
    const [activeIndex, setActiveIndex] = useState(currentIndex);

    // Update active index when currentIndex changes
    useEffect(() => {
        setActiveIndex(currentIndex);
    }, [currentIndex]);

    const goToPrevious = useCallback(() => {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    }, [images.length]);

    const goToNext = useCallback(() => {
        setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }, [images.length]);

    // Handle keyboard navigation and body scroll
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    goToNext();
                    break;
                case 'Escape':
                    event.preventDefault();
                    onClose();
                    break;
            }
        };

        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, goToPrevious, goToNext, onClose]);

    if (!isOpen || images.length === 0) return null;

    const currentImage = images[activeIndex];

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            {/* Backdrop - click to close */}
            <div
                className="absolute inset-0 bg-black"
                onClick={onClose}
            />

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
                <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="max-w-full max-h-screen object-contain relative z-10"
                />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 z-20"
                        aria-label="Previous image"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 z-20"
                        aria-label="Next image"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 z-20"
                aria-label="Close lightbox"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default Lightbox;