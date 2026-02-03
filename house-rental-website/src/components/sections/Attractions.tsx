import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    MapPin,
    Mountain,
    Waves,
    TreePine,
    Car,
    Camera,
    Building2,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import type { AttractionId } from '../pages/AttractionDetailPage';

// Import attraction images
import skiiImage from '../../assets/images/DSC_8624-copy-2-scaled.jpg';
import raftingImage from '../../assets/images/rafting.jpg';
import mountaintImage from '../../assets/images/viber_slika_2025-12-17_18-36-56-619.jpg';
import visegradImage from '../../assets/images/na-drini-cuprija.jpg';
import natureImage from '../../assets/images/nature.jpg';
import churchImage from '../../assets/images/crkva.jpg';

// Additional attraction images for new attractions
import mosqueImage from '../../assets/images/dzamijaPet.jpg'; // Using higher quality image
import catholicChurchImage from '../../assets/images/katolickaCrkva.jpg'; // Using available image
import forestBathingImage from '../../assets/images/bazneTri.jpg'; // Using available image

interface AttractionsProps {
    onAttractionClick?: (attractionId: AttractionId) => void;
}

const Attractions: React.FC<AttractionsProps> = ({ onAttractionClick }) => {
    const { t } = useTranslation();
    const [showMore, setShowMore] = useState(false);

    const mainAttractions = [
        {
            id: 'skiing' as AttractionId,
            icon: Mountain,
            title: t('attractionsSkiingTitle'),
            distance: t('attractionsSkiingDistance'),
            description: t('attractionsSkiingDescription'),
            image: skiiImage
        },
        {
            id: 'rafting' as AttractionId,
            icon: Waves,
            title: t('attractionsRaftingTitle'),
            distance: t('attractionsRaftingDistance'),
            description: t('attractionsRaftingDescription'),
            image: raftingImage
        },
        {
            id: 'hiking' as AttractionId,
            icon: TreePine,
            title: t('attractionsHikingTitle'),
            distance: t('attractionsHikingDistance'),
            description: t('attractionsHikingDescription'),
            image: mountaintImage
        },
        {
            id: 'excursions' as AttractionId,
            icon: Car,
            title: t('attractionsExcursionsTitle'),
            distance: t('attractionsExcursionsDistance'),
            description: t('attractionsExcursionsDescription'),
            image: visegradImage
        },
        {
            id: 'nature' as AttractionId,
            icon: Camera,
            title: t('attractionsNatureTitle'),
            distance: t('attractionsNatureDistance'),
            description: t('attractionsNatureDescription'),
            image: natureImage
        },
        {
            id: 'church' as AttractionId,
            icon: Building2,
            title: t('attractionsChurchTitle'),
            distance: t('attractionsChurchDistance'),
            description: t('attractionsChurchDescription'),
            image: churchImage
        }
    ];

    const additionalAttractions = [
        {
            id: 'mosque' as AttractionId,
            icon: Building2,
            title: t('attractionsMosqueTitle'),
            distance: t('attractionsMosqueDistance'),
            description: t('attractionsMosqueDescription'),
            image: mosqueImage
        },
        {
            id: 'catholic-church' as AttractionId,
            icon: Building2,
            title: t('attractionsCatholicChurchTitle'),
            distance: t('attractionsCatholicChurchDistance'),
            description: t('attractionsCatholicChurchDescription'),
            image: catholicChurchImage
        },
        {
            id: 'forest-bathing' as AttractionId,
            icon: TreePine,
            title: t('attractionsForestBathingTitle'),
            distance: t('attractionsForestBathingDistance'),
            description: t('attractionsForestBathingDescription'),
            image: forestBathingImage
        }
    ];

    const allAttractions = showMore ? [...mainAttractions, ...additionalAttractions] : mainAttractions;

    return (
        <section id="attractions" className="py-16 bg-white">
            <Helmet>
                <meta name="description" content="Otkrijte najbolje atrakcije oko našeg smještaja u Čajniču: Jahorina skijanje (90km), Drina rafting (70km), Višegrad Andrićgrad (60km), planinarenje i priroda. Idealna lokacija za turistički odmor." />
                <meta name="keywords" content="Jahorina skijanje smještaj, Drina rafting Čajniče, Višegrad Andrićgrad smještaj, planinarenje Čajniče, turistički smještaj Jahorina, rafting Drina prenoćište, Višegrad most smještaj, ski resort Jahorina, UNESCO most Višegrad, avanturizam Bosna" />

                {/* Open Graph */}
                <meta property="og:title" content="Atrakcije oko Čajniča - Jahorina, Drina Rafting, Višegrad | Smještaj" />
                <meta property="og:description" content="Savršena lokacija za pristup Jahorini (skijanje), Drini (rafting), Višegradu (UNESCO most). Rezervišite smještaj u Čajniču za nezaboravan odmor." />
                <meta property="og:type" content="article" />

                {/* Structured Data for Tourist Attractions */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TouristAttraction",
                        "name": "Atrakcije oko Čajniča - Turistički Smještaj",
                        "description": "Smještaj u Čajniču sa pristupom najboljim atrakcijama: Jahorina skijanje, Drina rafting, Višegrad UNESCO most",
                        "url": "https://your-domain.com#attractions",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Čajniče",
                            "addressRegion": "Republika Srpska",
                            "addressCountry": "BA"
                        },
                        "touristType": ["Skiers", "Rafters", "Hikers", "Cultural Tourists"],
                        "availableLanguage": ["sr", "en"],
                        "nearbyAttraction": [
                            {
                                "@type": "SkiResort",
                                "name": "Jahorina Ski Resort",
                                "description": "Popularna ski destinacija sa modernim žičarama i dugim stazama",
                                "distance": "90 km",
                                "url": "https://jahorina.org"
                            },
                            {
                                "@type": "TouristAttraction",
                                "name": "Drina River Rafting",
                                "description": "Rafting na kristalno čistoj Drini sa zadivljujućim pogledom na kanjon",
                                "distance": "70 km"
                            },
                            {
                                "@type": "TouristAttraction",
                                "name": "Višegrad - UNESCO Most",
                                "description": "Istorijski grad sa UNESCO mostom Mehmed-paše Sokolovića i Andrićgradom",
                                "distance": "60 km",
                                "sameAs": "https://en.wikipedia.org/wiki/Mehmed_Paša_Sokolović_Bridge"
                            },
                            {
                                "@type": "Park",
                                "name": "Planinarenje oko Čajniča",
                                "description": "Slikovite planinske rute prema Hanini i Cicelju",
                                "distance": "5 km"
                            }
                        ],
                        "amenityFeature": [
                            {
                                "@type": "LocationFeatureSpecification",
                                "name": "Pristup ski stazama Jahorina",
                                "value": "90 km"
                            },
                            {
                                "@type": "LocationFeatureSpecification",
                                "name": "Pristup rafting centru Drina",
                                "value": "70 km"
                            },
                            {
                                "@type": "LocationFeatureSpecification",
                                "name": "Pristup UNESCO spomeniku Višegrad",
                                "value": "60 km"
                            }
                        ]
                    })}
                </script>

                {/* Additional SEO for popular attractions */}
                <meta name="geo.region" content="BA-SRP" />
                <meta name="geo.placename" content="Čajniče, Jahorina, Višegrad, Drina" />
                <link rel="canonical" href="https://your-domain.com#attractions" />
            </Helmet>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {allAttractions.map((attraction, index) => (
                        <Card
                            key={index}
                            hover
                            cursor="pointer"
                            className="h-full overflow-hidden flex flex-col"
                            onClick={() => onAttractionClick?.(attraction.id)}
                        >
                            {/* Attraction Image */}
                            <div className="h-48 relative overflow-hidden flex-shrink-0">
                                {attraction.image ? (
                                    <img
                                        src={attraction.image}
                                        alt={attraction.title}
                                        className={`w-full h-full ${attraction.id === 'catholic-church'
                                            ? 'object-cover object-top'
                                            : 'object-cover'
                                            }`}
                                        style={{}}
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

                            <div className="p-6 flex flex-col flex-grow">
                                {/* Title and Distance */}
                                <div className="flex items-start justify-between mb-3 gap-2">
                                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 flex-grow">
                                        {attraction.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500 flex-shrink-0">
                                        <MapPin size={16} className="mr-1" />
                                        {attraction.distance}
                                    </div>
                                </div>

                                {/* Description - Fixed height with line clamp */}
                                <div className="flex-grow mb-4">
                                    <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                                        {attraction.description}
                                    </p>
                                </div>

                                {/* Click indicator - Always at bottom */}
                                <div className="text-blue-600 text-sm font-medium pt-2 border-t border-gray-100 mt-auto">
                                    {t('clickToLearnMore') || 'Click to learn more →'}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* View More / View Less Button */}
                <div className="text-center mt-8">
                    <Button
                        variant="outline"
                        onClick={() => setShowMore(!showMore)}
                        className="group relative inline-flex items-center gap-2 px-8 py-4 text-blue-600 border-2 border-blue-600 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:text-white hover:border-blue-700 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-1 transform"
                    >
                        {/* Background animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                        {/* Content */}
                        <span className="relative z-10 flex items-center gap-2">
                            {showMore ? (
                                <>
                                    {t('viewLess') || 'View Less'}
                                    <ChevronUp size={20} className="transition-transform duration-300 group-hover:scale-110" />
                                </>
                            ) : (
                                <>
                                    {t('viewMore') || 'View More'}
                                    <ChevronDown size={20} className="transition-transform duration-300 group-hover:scale-110 group-hover:animate-bounce" />
                                </>
                            )}
                        </span>
                    </Button>
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