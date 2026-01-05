import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Snowflake, Wind, Thermometer, Calendar, RefreshCw } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';
import Card from './Card';

interface WeatherData {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    description: string;
}

const WeatherWidget: React.FC = () => {
    const { t } = useTranslation();
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    // Real weather data for Čajniče using WeatherAPI
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

                if (!API_KEY) {
                    console.warn('Weather API key not found. Please add VITE_WEATHER_API_KEY to your .env file');
                    throw new Error('API key missing');
                }

                // Čajniče coordinates: 43.6°N, 19.0°E
                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=43.6,19.0&aqi=no`
                );

                if (!response.ok) {
                    throw new Error(`Weather API error: ${response.status}`);
                }

                const data = await response.json();

                // Map WeatherAPI data to our interface
                const weatherCondition = mapWeatherCondition(data.current.condition.text);

                const realWeather: WeatherData = {
                    temperature: Math.round(data.current.temp_c),
                    condition: weatherCondition,
                    humidity: data.current.humidity,
                    windSpeed: Math.round(data.current.wind_kph),
                    description: data.current.condition.text
                };

                setWeather(realWeather);
                setLastUpdated(new Date());
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch weather data:', error);
                setError(true);
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    // Refresh weather data
    const refreshWeather = async () => {
        setLoading(true);
        setError(false);

        try {
            const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

            if (!API_KEY) {
                throw new Error('API key missing');
            }

            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=43.6,19.0&aqi=no`
            );

            if (!response.ok) {
                throw new Error(`Weather API error: ${response.status}`);
            }

            const data = await response.json();
            const weatherCondition = mapWeatherCondition(data.current.condition.text);

            const realWeather: WeatherData = {
                temperature: Math.round(data.current.temp_c),
                condition: weatherCondition,
                humidity: data.current.humidity,
                windSpeed: Math.round(data.current.wind_kph),
                description: data.current.condition.text
            };

            setWeather(realWeather);
            setLastUpdated(new Date());
            setLoading(false);
        } catch (error) {
            console.error('Failed to refresh weather data:', error);
            setError(true);
            setLoading(false);
        }
    };

    // Map WeatherAPI condition text to our icon system
    const mapWeatherCondition = (conditionText: string): string => {
        const condition = conditionText.toLowerCase();

        if (condition.includes('sunny') || condition.includes('clear')) {
            return 'sunny';
        } else if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
            return 'rainy';
        } else if (condition.includes('snow') || condition.includes('blizzard') || condition.includes('sleet')) {
            return 'snowy';
        } else if (condition.includes('cloud') || condition.includes('overcast') || condition.includes('mist') || condition.includes('fog')) {
            return 'cloudy';
        } else {
            return 'sunny'; // default
        }
    };

    const getWeatherIcon = (condition: string) => {
        switch (condition) {
            case 'sunny':
                return <Sun className="h-8 w-8 text-yellow-500" />;
            case 'cloudy':
                return <Cloud className="h-8 w-8 text-gray-500" />;
            case 'rainy':
                return <CloudRain className="h-8 w-8 text-blue-500" />;
            case 'snowy':
                return <Snowflake className="h-8 w-8 text-blue-300" />;
            default:
                return <Sun className="h-8 w-8 text-yellow-500" />;
        }
    };

    const getBestTimeToVisit = () => {
        const currentMonth = new Date().getMonth();

        // Best months for Čajniče (spring to early fall)
        const bestMonths = [4, 5, 6, 7, 8, 9]; // May to October

        if (bestMonths.includes(currentMonth)) {
            return {
                isGoodTime: true,
                message: t('weatherGoodTime') || 'Perfect time to visit! Great weather for outdoor activities.',
                season: t('weatherCurrentSeason') || 'Peak Season',
                details: t('idealConditionsText') || 'Ideal conditions for hiking, rafting, sightseeing, and exploring the beautiful nature around Čajniče. Long daylight hours and comfortable temperatures make this the perfect time for outdoor adventures.',
                activities: [
                    t('hikingTrails') || 'Hiking trails',
                    t('riverRafting') || 'River rafting',
                    t('photography') || 'Photography',
                    t('natureWalks') || 'Nature walks',
                    t('outdoorDining') || 'Outdoor dining'
                ]
            };
        } else {
            return {
                isGoodTime: false,
                message: t('weatherOffSeason') || 'Off-season period. Great for cozy indoor stays and winter activities.',
                season: t('weatherWinterSeason') || 'Winter Season',
                details: t('peacefulRetreatText') || 'Perfect for those seeking a peaceful mountain retreat. Enjoy cozy evenings by the fireplace, nearby skiing at Jahorina, and the authentic charm of winter in the Bosnian mountains.',
                activities: [
                    t('skiingAtJahorina') || 'Skiing at Jahorina',
                    t('cozyIndoorRelaxation') || 'Cozy indoor relaxation',
                    t('winterPhotography') || 'Winter photography',
                    t('localCulturalSites') || 'Local cultural sites',
                    t('traditionalCuisine') || 'Traditional cuisine'
                ]
            };
        }
    };

    const visitInfo = getBestTimeToVisit();

    if (loading) {
        return (
            <Card className="p-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
            </Card>
        );
    }

    if (error || !weather) {
        return (
            <Card className="p-6">
                <div className="text-center">
                    <p className="text-gray-500 mb-3">
                        {t('weatherError') || 'Weather information temporarily unavailable'}
                    </p>
                    <button
                        onClick={refreshWeather}
                        disabled={loading}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 disabled:opacity-50"
                    >
                        <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        {loading ? (t('loading') || 'Loading...') : (t('tryAgain') || 'Try Again')}
                    </button>
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 h-full flex flex-col">
            <div className="space-y-4 flex-grow flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {t('weatherTitle') || 'Weather in Čajniče'}
                    </h3>
                    <div className="flex items-center space-x-2">
                        {getWeatherIcon(weather.condition)}
                        <button
                            onClick={refreshWeather}
                            disabled={loading}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                            title={t('refreshWeather') || "Refresh weather"}
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Current Weather */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                        <Thermometer className="h-5 w-5 text-red-500" />
                        <span className="text-2xl font-bold text-gray-900">
                            {weather.temperature}°C
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Wind className="h-5 w-5 text-blue-500" />
                        <span className="text-sm text-gray-600">
                            {weather.windSpeed} km/h
                        </span>
                    </div>
                </div>

                {/* Best Time to Visit */}
                <div className="border-t pt-4 flex-grow flex flex-col">
                    <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-gray-900">
                            {t('weatherBestTime') || 'Best Time to Visit'}
                        </span>
                    </div>

                    <div className={`p-4 rounded-lg flex-grow flex flex-col ${visitInfo.isGoodTime
                        ? 'bg-green-100 border border-green-200'
                        : 'bg-orange-100 border border-orange-200'
                        }`}>
                        <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-medium ${visitInfo.isGoodTime ? 'text-green-800' : 'text-orange-800'
                                }`}>
                                {visitInfo.season}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${visitInfo.isGoodTime
                                ? 'bg-green-200 text-green-800'
                                : 'bg-orange-200 text-orange-800'
                                }`}>
                                {visitInfo.isGoodTime ? '✓ Recommended' : 'Off-Season'}
                            </span>
                        </div>

                        <p className={`text-sm mb-3 ${visitInfo.isGoodTime ? 'text-green-700' : 'text-orange-700'
                            }`}>
                            {visitInfo.message}
                        </p>

                        {/* Additional Details */}
                        <p className={`text-xs mb-3 leading-relaxed ${visitInfo.isGoodTime ? 'text-green-600' : 'text-orange-600'
                            }`}>
                            {visitInfo.details}
                        </p>

                        {/* Activities List */}
                        <div className="mt-auto">
                            <p className={`text-xs font-medium mb-1 ${visitInfo.isGoodTime ? 'text-green-800' : 'text-orange-800'
                                }`}>
                                Popular Activities:
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {visitInfo.activities.map((activity, index) => (
                                    <span
                                        key={index}
                                        className={`text-xs px-2 py-1 rounded-full ${visitInfo.isGoodTime
                                            ? 'bg-green-200 text-green-700'
                                            : 'bg-orange-200 text-orange-700'
                                            }`}
                                    >
                                        {activity}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="text-xs text-gray-500 text-center mt-auto">
                    {lastUpdated ? (
                        `Last updated: ${lastUpdated.toLocaleTimeString()}`
                    ) : (
                        t('weatherNote') || 'Weather updates every hour'
                    )}
                </div>
            </div>
        </Card>
    );
};

export default WeatherWidget;