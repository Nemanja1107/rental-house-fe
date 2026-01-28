import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

interface HeroProps {
    backgroundImages?: string[];
    backgroundImage?: string; // Keep for backward compatibility
    headline?: string;
    subheading?: string;
    ctaText?: string;
    onCtaClick?: () => void;
    autoSlideInterval?: number; // Auto-slide interval in milliseconds
}

const Hero: React.FC<HeroProps> = ({
    backgroundImages = [],
    backgroundImage = '',
    headline,
    subheading,
    ctaText,
    onCtaClick = () => {
        const reservationSection = document.getElementById('reservation');
        reservationSection?.scrollIntoView({ behavior: 'smooth' });
    },
    autoSlideInterval = 5000 // 5 seconds default
}) => {
    const { t } = useTranslation();

    // Use backgroundImages array if provided, otherwise fallback to single backgroundImage
    const images = backgroundImages.length > 0 ? backgroundImages : [backgroundImage];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Auto-slide functionality
    useEffect(() => {
        if (images.length <= 1) return; // Don't auto-slide if only one image

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, autoSlideInterval);

        return () => clearInterval(interval);
    }, [images.length, autoSlideInterval]);

    const goToSlide = (index: number) => {
        setCurrentImageIndex(index);
    };

    const goToPrevious = () => {
        setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
    };

    const goToNext = () => {
        setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
    };

    const scrollToNext = () => {
        const gallerySection = document.getElementById('gallery');
        gallerySection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="home"
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Images Slideshow */}
            <div className="absolute inset-0">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                    />
                ))}
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            {/* Navigation Arrows (only show if multiple images) */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Next image"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Slide Indicators (only show if multiple images) */}
            {images.length > 1 && (
                <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${index === currentImageIndex
                                ? 'bg-white'
                                : 'bg-white/50 hover:bg-white/70'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    {headline || t('heroTitle')}
                </h1>

                <p className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed opacity-90">
                    {subheading || t('heroSubtitle')}
                </p>

                {/* Call-to-Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={onCtaClick}
                        className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        {ctaText || t('heroBookNow')}
                    </button>

                    <button
                        onClick={() => {
                            const gallerySection = document.getElementById('gallery');
                            gallerySection?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white hover:bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        {t('heroViewGallery')}
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
                <button
                    onClick={scrollToNext}
                    className="flex flex-col items-center text-white hover:text-blue-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-lg p-2"
                    aria-label="Scroll to next section"
                >
                    <span className="text-sm mb-2 opacity-80">Explore</span>
                    <ChevronDown
                        size={24}
                        className="animate-bounce"
                    />
                </button>
            </div>
        </section>
    );
};

export default Hero;