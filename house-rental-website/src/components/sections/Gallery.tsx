import React, { useState } from 'react';
import type { GalleryProps, GalleryImage } from '../../types';
import { useTranslation } from '../../contexts/TranslationContext';
import Button from '../ui/Button';
import Lightbox from '../ui/Lightbox';

const Gallery: React.FC<GalleryProps> = ({ images, totalImages, onImageClick, onViewAllClick }) => {
    const { t } = useTranslation();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Show only first 8 images as preview
    const previewImages = images.slice(0, 8);
    const displayCount = totalImages || images.length;

    const handleImageClick = (image: GalleryImage, index: number) => {
        // Open lightbox when clicking a photo
        setLightboxIndex(index);
        setLightboxOpen(true);

        // Optional callback for parent component
        if (onImageClick) {
            onImageClick(image, index);
        }
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const handleViewAllPhotos = () => {
        // Navigate to full gallery page when clicking the button
        if (onViewAllClick) {
            onViewAllClick();
        }
    };

    return (
        <section id="gallery" className="py-16 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {t('galleryTitle')}
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        {t('gallerySubtitle')}
                    </p>
                </div>

                {/* Preview Image Grid - Only 8 photos */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {previewImages.map((image, index) => (
                        <div
                            key={image.id}
                            className="group relative overflow-hidden rounded-lg bg-gray-200 aspect-square cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            onClick={() => handleImageClick(image, index)}
                        >
                            {/* Gallery image */}
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-opacity duration-300"
                                loading="lazy"
                            />

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Photos Button */}
                <div className="text-center">
                    <Button
                        onClick={handleViewAllPhotos}
                        variant="primary"
                        size="lg"
                        className="px-8 py-3"
                    >
                        {t('galleryViewAll')} ({displayCount} {t('galleryPhotos')})
                    </Button>
                </div>
            </div>

            {/* Lightbox for preview images */}
            <Lightbox
                images={previewImages}
                currentIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={closeLightbox}
            />
        </section>
    );
};

export default Gallery;