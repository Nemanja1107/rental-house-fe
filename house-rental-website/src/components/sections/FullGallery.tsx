import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { GalleryImage } from '../../types';
import { useTranslation } from '../../contexts/TranslationContext';
import Lightbox from '../ui/Lightbox';

interface FullGalleryProps {
    images: GalleryImage[];
    onBack: () => void;
}

interface CategoryGroup {
    id: string;
    name: string;
    images: GalleryImage[];
}

const FullGallery: React.FC<FullGalleryProps> = ({ images, onBack }) => {
    const { t } = useTranslation();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);

    // Group images by manually assigned room categories
    const categoryGroups: CategoryGroup[] = [
        {
            id: 'living-room',
            name: t('galleryLivingRoom'),
            images: images.filter(img => img.roomCategory === 'living-room')
        },
        {
            id: 'bedroom',
            name: t('galleryBedroom'),
            images: images.filter(img => img.roomCategory === 'bedroom')
        },
        {
            id: 'kitchen',
            name: t('galleryKitchen'),
            images: images.filter(img => img.roomCategory === 'kitchen')
        },
        {
            id: 'bathroom',
            name: t('galleryBathroom'),
            images: images.filter(img => img.roomCategory === 'bathroom')
        },
        {
            id: 'amenities',
            name: t('galleryAmenities'),
            images: images.filter(img => img.roomCategory === 'amenities')
        }
    ].filter(group => group.images.length > 0); // Only show categories that have images

    const handleImageClick = (image: GalleryImage, categoryImages: GalleryImage[]) => {
        const imageIndex = categoryImages.findIndex(img => img.id === image.id);
        setLightboxImages(categoryImages);
        setLightboxIndex(imageIndex);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

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
                            {t('galleryBack') || 'Back to Gallery'}
                        </button>

                        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {t('galleryFullTitle') || 'Photo Gallery'}
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                {images.length} {t('galleryPhotos') || 'photos'}
                            </p>
                        </div>

                        {/* Empty div for balance */}
                        <div></div>
                    </div>
                </div>
            </div>

            {/* Gallery Categories */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {categoryGroups.map((category) => (
                    <div key={category.id} className="mb-12">
                        {/* Category Header */}
                        <div className="mb-6">
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                                {category.name}
                            </h2>
                            <p className="text-gray-600">
                                {category.images.length} {t('galleryPhotos')}
                            </p>
                        </div>

                        {/* Category Images Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {category.images.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="group relative overflow-hidden rounded-lg bg-gray-200 aspect-square cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                    onClick={() => handleImageClick(image, category.images)}
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
                                                className="w-6 h-6 text-white"
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

                                    {/* Image number indicator */}
                                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                        {index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            <Lightbox
                images={lightboxImages}
                currentIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={closeLightbox}
            />
        </div>
    );
};

export default FullGallery;