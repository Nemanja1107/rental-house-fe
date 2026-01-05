import React from 'react';
import { MapPin, Wifi, Tv, UtensilsCrossed, Waves, Car, Shield, Clock, Users } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';
import Card from '../ui/Card';
import WeatherWidget from '../ui/WeatherWidget';

interface AboutProps {
    location?: {
        address: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
}

const About: React.FC<AboutProps> = ({
    location = {
        address: "Mountain Retreat, Čajniče, Bosnia and Herzegovina",
        coordinates: {
            lat: 43.55444927110703,
            lng: 19.06896677599682
        }
    }
}) => {
    const { t } = useTranslation();

    // Your actual Google Maps location for Mountain Retreat in Čajniče
    const actualMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2748.4316384552258!2d19.06896677599682!3d43.55444927110703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758658c56efaae1%3A0x1dc2a5948e58355e!2sMountain%20Retreat!5e1!3m2!1ssr!2srs!4v1766062226914!5m2!1ssr!2srs";

    const amenities = [
        {
            icon: Wifi,
            title: t('highSpeedWifi'),
            description: t('unlimitedInternet')
        },
        {
            icon: Tv,
            title: t('smartTv'),
            description: t('cableStreaming')
        },
        {
            icon: UtensilsCrossed,
            title: t('fullKitchen'),
            description: t('modernAppliances')
        },
        {
            icon: Waves,
            title: t('laundry'),
            description: t('washerDryer')
        },
        {
            icon: Car,
            title: t('freeParking'),
            description: t('dedicatedParking')
        },
        {
            icon: Shield,
            title: t('secure'),
            description: t('security247')
        },
        {
            icon: Clock,
            title: t('flexible'),
            description: t('shortLongTerm')
        },
        {
            icon: Users,
            title: t('commonAreas'),
            description: t('sharedSpaces')
        }
    ];

    return (
        <section id="about" className="py-16 bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            {t('aboutTitle')}
                        </h2>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                            {t('aboutSubtitle')}
                        </p>
                    </div>

                    {/* About Us & Location Section */}
                    <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
                        {/* About Content */}
                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-6">
                                {t('aboutOurStory')}
                            </h3>
                            <div className="space-y-4 text-gray-300">
                                <p>{t('aboutStoryP1')}</p>
                                <p>{t('aboutStoryP2')}</p>
                                <p>{t('aboutStoryP3')}</p>
                                <p>{t('aboutStoryP4')}</p>
                            </div>
                        </div>

                        {/* Location & Map */}
                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-6">
                                {t('aboutLocationTitle')}
                            </h3>
                            <Card className="overflow-hidden">
                                <div className="aspect-w-16 aspect-h-12">
                                    <iframe
                                        src={actualMapUrl}
                                        width="100%"
                                        height="400"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Mountain Retreat - Čajniče Location"
                                        className="rounded-lg"
                                    ></iframe>
                                </div>
                                <div className="p-4 bg-gray-50">
                                    <div className="flex items-center text-gray-700">
                                        <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                                        <span className="text-sm">{location.address}</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Weather Section */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-semibold text-white text-center mb-12">
                            {t('aboutWeatherTitle')}
                        </h3>

                        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                            {/* Weather Guide */}
                            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 h-full flex flex-col">
                                <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                                    <span className="mr-2">🌤️</span>
                                    {t('aboutWeatherGuideTitle')}
                                </h4>
                                <div className="space-y-3 text-blue-800 text-sm flex-grow">
                                    <p dangerouslySetInnerHTML={{ __html: t('aboutWeatherSpring') }} />
                                    <p dangerouslySetInnerHTML={{ __html: t('aboutWeatherSummer') }} />
                                    <p dangerouslySetInnerHTML={{ __html: t('aboutWeatherAutumn') }} />
                                    <p dangerouslySetInnerHTML={{ __html: t('aboutWeatherWinter') }} />
                                    <p dangerouslySetInnerHTML={{ __html: t('aboutWeatherYearRound') }} />
                                </div>
                                <div className="mt-4 p-3 bg-white/50 rounded border-l-4 border-blue-400">
                                    <p className="text-xs text-blue-700" dangerouslySetInnerHTML={{ __html: t('aboutWeatherTip') }} />
                                </div>
                            </div>

                            {/* Weather Widget */}
                            <div className="h-full">
                                <WeatherWidget />
                            </div>
                        </div>
                    </div>

                    {/* Amenities Grid */}
                    <div>
                        <h3 className="text-2xl font-semibold text-white text-center mb-12">
                            {t('aboutAmenitiesTitle')}
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {amenities.map((amenity, index) => (
                                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                                    <div className="flex justify-center mb-4">
                                        <div className="p-3 bg-blue-100 rounded-full">
                                            <amenity.icon className="h-6 w-6 text-blue-600" />
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                        {amenity.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        {amenity.description}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-16 bg-gray-50 rounded-2xl p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                                <div className="text-sm text-gray-600">{t('aboutStats1')}</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
                                <div className="text-sm text-gray-600">{t('aboutStats2')}</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-blue-600 mb-2">5.0</div>
                                <div className="text-sm text-gray-600">{t('aboutStats3')}</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                                <div className="text-sm text-gray-600">{t('aboutStats4')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;