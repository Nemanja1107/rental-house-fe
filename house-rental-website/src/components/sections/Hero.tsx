import { ChevronDown } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

interface HeroProps {
    backgroundImage?: string;
    headline?: string;
    subheading?: string;
    ctaText?: string;
    onCtaClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
    backgroundImage = '',
    headline,
    subheading,
    ctaText,
    onCtaClick = () => {
        const reservationSection = document.getElementById('reservation');
        reservationSection?.scrollIntoView({ behavior: 'smooth' });
    }
}) => {
    const { t } = useTranslation();
    const scrollToNext = () => {
        const gallerySection = document.getElementById('gallery');
        gallerySection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="home"
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                }}
            >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

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
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
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