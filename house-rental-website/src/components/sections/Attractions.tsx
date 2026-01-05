import React from 'react';
import {
    MapPin,
    Mountain,
    Waves,
    TreePine,
    Car,
    Camera,
    Building2
} from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';
import Card from '../ui/Card';

// Import attraction images
import skiiImage from '../../assets/images/DSC_8624-copy-2-scaled.jpg';
import raftingImage from '../../assets/images/rafting.jpg';
import mountaintImage from '../../assets/images/viber_slika_2025-12-17_18-36-56-619.jpg';
import visegradImage from '../../assets/images/na-drini-cuprija.jpg';
import natureImage from '../../assets/images/nature.jpg';
import churchImage from '../../assets/images/crkva.jpg';

const Attractions: React.FC = () => {
    const { t } = useTranslation();

    const attractions = [
        {
            icon: Mountain,
            title: t('attractionsSkiingTitle'),
            distance: t('attractionsSkiingDistance'),
            description: t('attractionsSkiingDescription'),
            image: skiiImage
        },
        {
            icon: Waves,
            title: t('attractionsRaftingTitle'),
            distance: t('attractionsRaftingDistance'),
            description: t('attractionsRaftingDescription'),
            image: raftingImage
        },
        {
            icon: TreePine,
            title: t('attractionsHikingTitle'),
            distance: t('attractionsHikingDistance'),
            description: t('attractionsHikingDescription'),
            image: mountaintImage
        },
        {
            icon: Car,
            title: t('attractionsExcursionsTitle'),
            distance: t('attractionsExcursionsDistance'),
            description: t('attractionsExcursionsDescription'),
            image: visegradImage
        },
        {
            icon: Camera,
            title: t('attractionsNatureTitle'),
            distance: t('attractionsNatureDistance'),
            description: t('attractionsNatureDescription'),
            image: natureImage
        },
        {
            icon: Building2,
            title: t('attractionsChurchTitle'),
            distance: t('attractionsChurchDistance'),
            description: t('attractionsChurchDescription'),
            image: churchImage
        }
    ];

    return (
        <section id="attractions" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {t('attractionsTitle')}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        {t('attractionsSubtitle')}
                    </p>
                </div>

                {/* Attractions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {attractions.map((attraction, index) => (
                        <Card key={index} hover className="h-full overflow-hidden">
                            {/* Attraction Image */}
                            <div className="h-48 relative overflow-hidden">
                                {attraction.image ? (
                                    <img
                                        src={attraction.image}
                                        alt={attraction.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                        <attraction.icon className="h-16 w-16 text-blue-600" />
                                    </div>
                                )}
                                {/* Icon overlay */}
                                <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                                    <attraction.icon className="h-5 w-5 text-blue-600" />
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Title and Distance */}
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {attraction.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <MapPin size={16} className="mr-1" />
                                        {attraction.distance}
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {attraction.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="text-center mt-12">
                    <p className="text-gray-600">
                        {t('allDistancesNote')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Attractions;