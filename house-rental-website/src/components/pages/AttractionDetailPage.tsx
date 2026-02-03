import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
    ArrowLeft,
    MapPin,
    Clock,
    Star,
    Calendar,
    Phone,
    Globe,
    Camera,
    Mountain,
    Waves,
    TreePine,
    Car,
    Building2
} from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

// Import attraction images
import skiiImage from '../../assets/images/DSC_8624-copy-2-scaled.jpg';
import raftingImage from '../../assets/images/rafting.jpg';
import mountaintImage from '../../assets/images/viber_slika_2025-12-17_18-36-56-619.jpg';
import visegradImage from '../../assets/images/na-drini-cuprija.jpg';
import natureImage from '../../assets/images/nature.jpg';
import churchImage from '../../assets/images/crkva.jpg';

// Additional gallery images
import prirodaImage from '../../assets/images/priroda.jpg';
import ciceljImage from '../../assets/images/cicelj.jpg';
import vgImage from '../../assets/images/vg.jpg';
import jahorinaJezero from '../../assets/images/jahorina-jezero.jpg';
import jahorinaNoc from '../../assets/images/jahorina-noc.jpg';
import jahorinaStaza from '../../assets/images/jahorina-staza.jpg';
import jahorinaGondola from '../../assets/images/jahorina-gondola.jpg';
import raftingJedan from '../../assets/images/raftingJedan.jpg';
import raftingDva from '../../assets/images/raftingDva.jpg';
import raftingTri from '../../assets/images/raftingTri.jpg';
import raftingCetiri from '../../assets/images/raftingCetiri.jpg';
import visegradJedan from '../../assets/images/most.jpg';
import visegradDva from '../../assets/images/andricgrad-1.jpg';
import crkvaJedan from '../../assets/images/crkvaJedan.jpg';
import crkvaDva from '../../assets/images/crkvaDva.jpg';
import crkvaTri from '../../assets/images/crkvaTri.jpg';
import crkvaCetiri from '../../assets/images/crkvaCetiri.jpg';
import dzamijaJedan from '../../assets/images/dzamijaJedan.jpg';
import dzamijaTri from '../../assets/images/dzamijaPet.jpg';
import dzamijaCetiri from '../../assets/images/dzamijaCetiri.webp';
import prirodaSlika from '../../assets/images/prirodaSlika.jpg';
import prirodaDva from '../../assets/images/prirodaDva.jpg';
import planinaJedan from '../../assets/images/planinaJedan.jpg';
import planinaDva from '../../assets/images/planinaDva.jpg';
import planinaTri from '../../assets/images/planinaTri.jpg';
import planinaCetiri from '../../assets/images/planinaCetiri.jpg';
import bazenJedan from '../../assets/images/bazenJedan.jpg';
import bazenDva from '../../assets/images/bazneDva.jpg';
import bazenTri from '../../assets/images/bazneTri.jpg';
import bazenCetiri from '../../assets/images/bazenCetiri.jpg';


// Additional attraction images for new attractions
import catholicChurchImage from '../../assets/images/katolickaCrkva.jpg';

export type AttractionId = 'skiing' | 'rafting' | 'hiking' | 'excursions' | 'nature' | 'church' | 'mosque' | 'catholic-church' | 'forest-bathing';

interface AttractionDetailPageProps {
    attractionId: AttractionId;
    onBack: () => void;
}

const AttractionDetailPage: React.FC<AttractionDetailPageProps> = ({ attractionId, onBack }) => {
    const { t } = useTranslation();

    // Gallery images for each attraction
    const galleryImages = {
        skiing: [
            { src: jahorinaStaza, alt: 'Jahorina - Ski slopes and trails' },
            { src: jahorinaGondola, alt: 'Jahorina - Cable car and gondola' },
            { src: jahorinaNoc, alt: 'Jahorina - Night skiing lights' },
            { src: jahorinaJezero, alt: 'Jahorina - Mountain lake view' }
        ],
        rafting: [
            { src: raftingJedan, alt: 'Drina River - Rafting adventure' },
            { src: raftingDva, alt: 'Drina River - Crystal clear waters' },
            { src: raftingTri, alt: 'Drina River - Canyon landscape' },
            { src: raftingCetiri, alt: 'Drina River - Riverside scenery' }
        ],
        hiking: [
            { src: planinaJedan, alt: 'Mountain hiking - Forest trail' },
            { src: planinaDva, alt: 'Mountain hiking - Peak views' },
            { src: planinaTri, alt: 'Mountain hiking - Woodland path' },
            { src: planinaCetiri, alt: 'Mountain hiking - Panoramic vista' }
        ],
        excursions: [
            { src: visegradImage, alt: 'Višegrad - Historic stone bridge' },
            { src: vgImage, alt: 'Višegrad - Town panorama' },
            { src: visegradJedan, alt: 'Višegrad - Bridge detail view' },
            { src: visegradDva, alt: 'Višegrad - Andrićgrad complex' }
        ],
        nature: [
            { src: prirodaDva, alt: 'Nature photography - Dense forest' },
            { src: prirodaImage, alt: 'Nature photography - Open landscape' },
            { src: prirodaSlika, alt: 'Nature photography - Mountain stream' },
            { src: ciceljImage, alt: 'Nature photography - Cicelj mountain' }
        ],
        church: [
            { src: crkvaJedan, alt: 'Orthodox Church - Front exterior view' },
            { src: crkvaDva, alt: 'Orthodox Church - Side architectural view' },
            { src: crkvaTri, alt: 'Orthodox Church - Bell tower detail' },
            { src: crkvaCetiri, alt: 'Orthodox Church - Mountain backdrop' }
        ],
        mosque: [
            { src: dzamijaJedan, alt: 'Historic Mosque - Main exterior view' },
            { src: dzamijaTri, alt: 'Historic Mosque - Minaret tower' },
            { src: dzamijaCetiri, alt: 'Historic Mosque - Winter landscape setting' }
        ],
        'catholic-church': [
            { src: catholicChurchImage, alt: 'Catholic Church - Exterior facade' },
        ],
        'forest-bathing': [
            { src: bazenJedan, alt: 'Forest bathing - Natural swimming pool' },
            { src: bazenDva, alt: 'Forest bathing - Tranquil forest setting' },
            { src: bazenTri, alt: 'Forest bathing - Clear mountain water' },
            { src: bazenCetiri, alt: 'Forest bathing - Peaceful nature spot' }
        ]
    };

    const currentGallery = galleryImages[attractionId] || [];

    // Detailed attraction data
    const attractionDetails = {
        skiing: {
            icon: Mountain,
            title: t('attractionsSkiingTitle'),
            distance: t('attractionsSkiingDistance'),
            description: t('attractionsSkiingDescription'),
            image: skiiImage,
            fullDescription: t('skiingExtendedDescription'), // Use the extended translated description
            highlights: [
                t('skiingHighlight1'),
                t('skiingHighlight2'),
                t('skiingHighlight3'),
                t('skiingHighlight4'),
                t('skiingHighlight5'),
                t('skiingHighlight6'),
                t('skiingHighlight7')
            ],
            bestTime: t('skiingBestTime'),
            duration: t('skiingDuration'),
            difficulty: t('skiingDifficulty'),
            contact: t('skiingContact'),
            website: t('skiingWebsite'),
            tips: [
                t('skiingTip1'),
                t('skiingTip2'),
                t('skiingTip3'),
                t('skiingTip4')
            ]
        },
        rafting: {
            icon: Waves,
            title: t('attractionsRaftingTitle'),
            distance: t('attractionsRaftingDistance'),
            description: t('attractionsRaftingDescription'),
            image: raftingImage,
            fullDescription: t('raftingExtendedDescription'), // Use the extended translated description
            highlights: [
                t('raftingHighlight1'),
                t('raftingHighlight2'),
                t('raftingHighlight3'),
                t('raftingHighlight4'),
                t('raftingHighlight5'),
                t('raftingHighlight6'),
                t('raftingHighlight7')
            ],
            bestTime: t('raftingBestTime'),
            duration: t('raftingDuration'),
            difficulty: t('raftingDifficulty'),
            contact: t('raftingContact'),
            website: t('raftingWebsite'),
            tips: [
                t('raftingTip1'),
                t('raftingTip2'),
                t('raftingTip3'),
                t('raftingTip4')
            ]
        },
        hiking: {
            icon: TreePine,
            title: t('attractionsHikingTitle'),
            distance: t('attractionsHikingDistance'),
            description: t('attractionsHikingDescription'),
            image: mountaintImage,
            fullDescription: t('hikingExtendedDescription'), // Use the extended translated description
            highlights: [
                t('hikingHighlight1'),
                t('hikingHighlight2'),
                t('hikingHighlight3'),
                t('hikingHighlight4'),
                t('hikingHighlight5'),
                t('hikingHighlight6'),
                t('hikingHighlight7')
            ],
            bestTime: t('hikingBestTime'),
            duration: t('hikingDuration'),
            difficulty: t('hikingDifficulty'),
            contact: t('hikingContact'),
            website: t('hikingWebsite'),
            tips: [
                t('hikingTip1'),
                t('hikingTip2'),
                t('hikingTip3'),
                t('hikingTip4')
            ]
        },
        excursions: {
            icon: Car,
            title: t('attractionsExcursionsTitle'),
            distance: t('attractionsExcursionsDistance'),
            description: t('attractionsExcursionsDescription'),
            image: visegradImage,
            fullDescription: t('excursionsExtendedDescription'), // Use the extended translated description
            highlights: [
                t('excursionsHighlight1'),
                t('excursionsHighlight2'),
                t('excursionsHighlight3'),
                t('excursionsHighlight4'),
                t('excursionsHighlight5'),
                t('excursionsHighlight6'),
                t('excursionsHighlight7')
            ],
            bestTime: t('excursionsBestTime'),
            duration: t('excursionsDuration'),
            difficulty: t('excursionsDifficulty'),
            contact: t('excursionsContact'),
            website: t('excursionsWebsite'),
            tips: [
                t('excursionsTip1'),
                t('excursionsTip2'),
                t('excursionsTip3'),
                t('excursionsTip4')
            ]
        },
        nature: {
            icon: Camera,
            title: t('attractionsNatureTitle'),
            distance: t('attractionsNatureDistance'),
            description: t('attractionsNatureDescription'),
            image: natureImage,
            fullDescription: t('natureExtendedDescription'), // Use the extended translated description
            highlights: [
                t('natureHighlight1'),
                t('natureHighlight2'),
                t('natureHighlight3'),
                t('natureHighlight4'),
                t('natureHighlight5'),
                t('natureHighlight6'),
                t('natureHighlight7')
            ],
            bestTime: t('natureBestTime'),
            duration: t('natureDuration'),
            difficulty: t('natureDifficulty'),
            contact: t('natureContact'),
            website: t('natureWebsite'),
            tips: [
                t('natureTip1'),
                t('natureTip2'),
                t('natureTip3'),
                t('natureTip4')
            ]
        },
        church: {
            icon: Building2,
            title: t('attractionsChurchTitle'),
            distance: t('attractionsChurchDistance'),
            description: t('attractionsChurchDescription'),
            image: churchImage,
            fullDescription: t('churchExtendedDescription'), // Use the extended translated description
            highlights: [
                t('churchHighlight1'),
                t('churchHighlight2'),
                t('churchHighlight3'),
                t('churchHighlight4'),
                t('churchHighlight5'),
                t('churchHighlight6'),
                t('churchHighlight7')
            ],
            bestTime: t('churchBestTime'),
            duration: t('churchDuration'),
            difficulty: t('churchDifficulty'),
            contact: t('churchContact'),
            website: t('churchWebsite'),
            tips: [
                t('churchTip1'),
                t('churchTip2'),
                t('churchTip3'),
                t('churchTip4')
            ]
        },
        mosque: {
            icon: Building2,
            title: t('attractionsMosqueTitle'),
            distance: t('attractionsMosqueDistance'),
            description: t('attractionsMosqueDescription'),
            image: dzamijaTri,
            fullDescription: t('mosqueExtendedDescription'),
            highlights: [
                t('mosqueHighlight1'),
                t('mosqueHighlight2'),
                t('mosqueHighlight3'),
                t('mosqueHighlight4'),
                t('mosqueHighlight5'),
                t('mosqueHighlight6'),
                t('mosqueHighlight7')
            ],
            bestTime: t('mosqueBestTime'),
            duration: t('mosqueDuration'),
            difficulty: t('mosqueDifficulty'),
            contact: t('mosqueContact'),
            website: t('mosqueWebsite'),
            tips: [
                t('mosqueTip1'),
                t('mosqueTip2'),
                t('mosqueTip3'),
                t('mosqueTip4')
            ]
        },
        'catholic-church': {
            icon: Building2,
            title: t('attractionsCatholicChurchTitle'),
            distance: t('attractionsCatholicChurchDistance'),
            description: t('attractionsCatholicChurchDescription'),
            image: catholicChurchImage,
            fullDescription: t('catholicChurchExtendedDescription'),
            highlights: [
                t('catholicChurchHighlight1'),
                t('catholicChurchHighlight2'),
                t('catholicChurchHighlight3'),
                t('catholicChurchHighlight4'),
                t('catholicChurchHighlight5'),
                t('catholicChurchHighlight6'),
                t('catholicChurchHighlight7')
            ],
            bestTime: t('catholicChurchBestTime'),
            duration: t('catholicChurchDuration'),
            difficulty: t('catholicChurchDifficulty'),
            contact: t('catholicChurchContact'),
            website: t('catholicChurchWebsite'),
            tips: [
                t('catholicChurchTip1'),
                t('catholicChurchTip2'),
                t('catholicChurchTip3'),
                t('catholicChurchTip4')
            ]
        },
        'forest-bathing': {
            icon: TreePine,
            title: t('attractionsForestBathingTitle'),
            distance: t('attractionsForestBathingDistance'),
            description: t('attractionsForestBathingDescription'),
            image: bazenTri,
            fullDescription: t('forestBathingExtendedDescription'),
            highlights: [
                t('forestBathingHighlight1'),
                t('forestBathingHighlight2'),
                t('forestBathingHighlight3'),
                t('forestBathingHighlight4'),
                t('forestBathingHighlight5'),
                t('forestBathingHighlight6'),
                t('forestBathingHighlight7')
            ],
            bestTime: t('forestBathingBestTime'),
            duration: t('forestBathingDuration'),
            difficulty: t('forestBathingDifficulty'),
            contact: t('forestBathingContact'),
            website: t('forestBathingWebsite'),
            tips: [
                t('forestBathingTip1'),
                t('forestBathingTip2'),
                t('forestBathingTip3'),
                t('forestBathingTip4')
            ]
        }
    };

    const attraction = attractionDetails[attractionId];
    const IconComponent = attraction.icon;

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>{attraction.title} - Forest Bath Čajniče</title>
                <meta name="description" content={attraction.fullDescription} />
            </Helmet>

            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={onBack}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        {t('backToAttractions') || 'Back to Attractions'}
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-96 overflow-hidden">
                <img
                    src={attraction.image}
                    alt={attraction.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="flex justify-center mb-4">
                            <IconComponent size={48} className="text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{attraction.title}</h1>
                        <div className="flex items-center justify-center space-x-2 text-lg">
                            <MapPin size={20} />
                            <span>{attraction.distance} {t('fromAccommodation')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Description */}
                        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('aboutThisAttraction') || 'About This Attraction'}</h2>

                            {/* Short Description */}
                            <div className="mb-6">
                                <p className="text-gray-700 text-lg leading-relaxed font-medium">
                                    {attraction.description}
                                </p>
                            </div>

                            {/* Extended Description */}
                            <div className="border-t border-gray-100 pt-6">
                                <p className="text-gray-600 text-base leading-relaxed">
                                    {attraction.fullDescription}
                                </p>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('highlights') || 'Highlights'}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {attraction.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <Star size={16} className="text-yellow-500 flex-shrink-0" />
                                        <span className="text-gray-600">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gallery */}
                        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('gallery') || 'Gallery'}</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {currentGallery.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative group"
                                    >
                                        {/* Fixed size thumbnail container */}
                                        <div className="w-full h-32 sm:h-36 md:h-40 bg-gray-100 border border-gray-200 rounded-lg overflow-hidden relative">
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-90"
                                            />
                                            {/* Image number indicator */}
                                            <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                                {index + 1}
                                            </div>
                                        </div>

                                        {/* Hover preview - shows full image on hover */}
                                        <div className="absolute top-0 left-full ml-4 z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none hidden lg:block">
                                            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-2 max-w-sm">
                                                <img
                                                    src={image.src}
                                                    alt={image.alt}
                                                    className="w-full h-auto max-h-64 object-contain rounded"
                                                />
                                                <p className="text-xs text-gray-600 mt-2 px-2 pb-1 text-center">
                                                    {image.alt}
                                                </p>
                                            </div>
                                            {/* Arrow pointing to thumbnail */}
                                            <div className="absolute top-4 -left-2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 mt-4 text-center">
                                {t('galleryHoverHint') || 'Hover over thumbnails to preview (desktop)'}
                            </p>
                        </div>

                        {/* Tips */}
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('visitorTips') || 'Visitor Tips'}</h3>
                            <div className="space-y-3">
                                {attraction.tips.map((tip, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                                        </div>
                                        <span className="text-gray-600">{tip}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Quick Info */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('quickInformation') || 'Quick Information'}</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Calendar size={20} className="text-gray-400" />
                                    <div>
                                        <div className="text-sm text-gray-500">{t('bestTime') || 'Best Time'}</div>
                                        <div className="font-medium">{attraction.bestTime}</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Clock size={20} className="text-gray-400" />
                                    <div>
                                        <div className="text-sm text-gray-500">{t('duration') || 'Duration'}</div>
                                        <div className="font-medium">{attraction.duration}</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mountain size={20} className="text-gray-400" />
                                    <div>
                                        <div className="text-sm text-gray-500">{t('difficulty') || 'Difficulty'}</div>
                                        <div className="font-medium">{attraction.difficulty}</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MapPin size={20} className="text-gray-400" />
                                    <div>
                                        <div className="text-sm text-gray-500">{t('distance') || 'Distance'}</div>
                                        <div className="font-medium">{attraction.distance}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('contactInfo') || 'Contact & Info'}</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Phone size={20} className="text-gray-400" />
                                    <div>
                                        <div className="text-sm text-gray-500">{t('contact') || 'Contact'}</div>
                                        <a
                                            href={`tel:${attraction.contact}`}
                                            className="font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200"
                                        >
                                            {attraction.contact}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Globe size={20} className="text-gray-400" />
                                    <div>
                                        <div className="text-sm text-gray-500">{t('website') || 'Website'}</div>
                                        <a
                                            href={attraction.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                                        >
                                            {attraction.website}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AttractionDetailPage;