import React, { useState } from 'react';
import {
    Users,
    Bed,
    Bath,
    Wifi,
    Tv,
    Coffee,
    Car,
    Wind,
    ChevronDown,
    ChevronUp,
    ShowerHead,
    TowerControl,
    Sparkles,
    Home,
    DoorOpen,
    Utensils,
    Snowflake
} from 'lucide-react';
import Card from '../ui/Card';
import type { Room } from '../../types';
import { useTranslation } from '../../contexts/TranslationContext';
import livingRoomImg from '../../assets/images/CB0A4806.jpg';
import bathroomFirstFloorImg from '../../assets/images/CB0A4822.jpg';
import kitchenFirstFloorImg from '../../assets/images/CB0A4810.jpg';
import firstBedroomImg from '../../assets/images/CB0A4835.jpg';
import secondBedroomImg from '../../assets/images/CB0A4838.jpg';
import thirdBedroomImg from '../../assets/images/CB0A4831.jpg';

interface RoomsProps {
    rooms?: Room[];
    onCheckAvailability?: () => void;
}

const Rooms: React.FC<RoomsProps> = ({ rooms = [], onCheckAvailability }) => {
    const [expandedRoomId, setExpandedRoomId] = useState<string>('');
    const { t } = useTranslation();

    // Sample rooms data if none provided
    const defaultRooms: Room[] = [
        {
            id: '1',
            name: t('firstFloorHouse'),
            description: t('firstFloorDesc'),
            capacity: 3,
            amenities: [t('sofaSet'), t('privateBathroom'), t('balcony'), t('airConditioning'), t('wifi'), t('tv')],
            images: [livingRoomImg, bathroomFirstFloorImg, kitchenFirstFloorImg],
            price: 30
        },
        {
            id: '2',
            name: t('masterBedroomTitle'),
            description: t('masterBedroomDescription'),
            capacity: 2,
            amenities: [t('kingBed'), t('privateBathroom'), t('balcony'), t('airConditioning'), t('wifi'), t('tv')],
            images: [secondBedroomImg],
            price: 30
        },
        {
            id: '3',
            name: t('guestBedroomTitle'),
            description: t('guestBedroomDescription'),
            capacity: 2,
            amenities: [t('queenBed'), t('privateBathroom'), t('wifi'), t('tv'), t('closet')],
            images: [firstBedroomImg],
            price: 30
        },
        {
            id: '4',
            name: t('guestRoom3Title'),
            description: t('guestRoom3Description'),
            capacity: 2,
            amenities: [t('queenBed'), t('privateBathroom'), t('wifi'), t('tv'), t('closet')],
            images: [thirdBedroomImg,],
            price: 30
        }
    ];

    const roomsToShow = rooms.length > 0 ? rooms : defaultRooms;

    const toggleExpanded = (roomId: string) => {
        if (expandedRoomId === roomId) {
            setExpandedRoomId('');
        } else {
            setExpandedRoomId(roomId);
        }
    };

    // Icon mapping for amenities
    const getAmenityIcon = (amenity: string) => {
        const iconProps = { size: 16, className: 'text-gray-600' };

        const amenityLower = amenity.toLowerCase();

        // Bed types
        if (amenityLower.includes('bračni') || amenityLower.includes('king') || amenityLower.includes('master') || amenityLower.includes('sofa')) return <Bed {...iconProps} />;
        if (amenityLower.includes('veliki krevet') || amenityLower.includes('queen')) return <Bed {...iconProps} />;
        if (amenityLower.includes('kauč') || amenityLower.includes('sofa')) return <Home {...iconProps} />;
        if (amenityLower.includes('bed') || amenityLower.includes('krevet')) return <Bed {...iconProps} />;

        // Bathroom amenities
        if (amenityLower.includes('privatno kupatilo') || amenityLower.includes('private bathroom')) return <Bath {...iconProps} />;
        if (amenityLower.includes('zajedničko kupatilo') || amenityLower.includes('shared bathroom')) return <Bath {...iconProps} />;
        if (amenityLower.includes('moderno kupatilo') || amenityLower.includes('modern bathroom')) return <Bath {...iconProps} />;
        if (amenityLower.includes('tuš') || amenityLower.includes('shower')) return <ShowerHead {...iconProps} />;
        if (amenityLower.includes('peškiri') || amenityLower.includes('towels')) return <TowerControl {...iconProps} />;
        if (amenityLower.includes('toaletni pribor') || amenityLower.includes('toiletries')) return <Sparkles {...iconProps} />;
        if (amenityLower.includes('bathroom') || amenityLower.includes('kupatilo')) return <Bath {...iconProps} />;

        // Technology & Connectivity
        if (amenityLower.includes('wifi')) return <Wifi {...iconProps} />;
        if (amenityLower.includes('tv')) return <Tv {...iconProps} />;

        // Climate Control
        if (amenityLower.includes('klima') || amenityLower.includes('air conditioning') || amenityLower.includes('conditioning')) return <Snowflake {...iconProps} />;
        if (amenityLower.includes('air') || amenityLower.includes('wind')) return <Wind {...iconProps} />;

        // Storage & Furniture
        if (amenityLower.includes('orman') || amenityLower.includes('closet')) return <DoorOpen {...iconProps} />;
        if (amenityLower.includes('balkon') || amenityLower.includes('balcony')) return <Home {...iconProps} />;

        // Kitchen & Dining
        if (amenityLower.includes('pristup kuhinji') || amenityLower.includes('kitchen access')) return <Utensils {...iconProps} />;
        if (amenityLower.includes('kitchen') || amenityLower.includes('kuhinja') || amenityLower.includes('coffee')) return <Coffee {...iconProps} />;

        // Parking
        if (amenityLower.includes('parking') || amenityLower.includes('car')) return <Car {...iconProps} />;

        // Default fallback
        return <Home {...iconProps} />;
    };

    return (
        <section id="rooms" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {t('availableRoomsTitle')}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t('availableRoomsDescription')}
                    </p>
                </div>

                {/* Rooms Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {roomsToShow.map((room) => {
                        const isExpanded = expandedRoomId === room.id;

                        return (
                            <Card key={room.id} hover className="overflow-hidden">
                                {/* Room Image */}
                                <div className="relative h-64 bg-gray-200">
                                    {room.images.length > 0 ? (
                                        <img
                                            src={room.images[0]}
                                            alt={room.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                target.parentElement!.innerHTML = `
                                                    <div class="w-full h-full flex items-center justify-center bg-gray-200">
                                                        <span class="text-gray-500">Image not available</span>
                                                    </div>
                                                `;
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-gray-500">No image available</span>
                                        </div>
                                    )}

                                    {/* Capacity Badge */}
                                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 flex items-center space-x-1">
                                        <Users size={16} className="text-gray-600" />
                                        <span className="text-sm font-medium text-gray-700">
                                            {room.capacity} {room.capacity === 1 ? t('guest') : t('guests')}
                                        </span>
                                    </div>
                                </div>

                                {/* Room Content */}
                                <div className="p-6">
                                    {/* Room Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                {room.name}
                                            </h3>
                                            {room.price && (
                                                <div className="text-lg font-bold text-blue-600">
                                                    {room.price} BAM {t('perPerson')}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Room Description */}
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {room.description}
                                    </p>

                                    {/* Key Amenities Preview */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                            {t('keyFeatures')}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {room.amenities.slice(0, 3).map((amenity, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1"
                                                >
                                                    {getAmenityIcon(amenity)}
                                                    <span className="text-sm text-gray-700">{amenity}</span>
                                                </div>
                                            ))}
                                            {room.amenities.length > 3 && (
                                                <div className="flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1">
                                                    <span className="text-sm text-gray-700">
                                                        +{room.amenities.length - 3} more
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Expandable Details */}
                                    <div className="border-t pt-4">
                                        <button
                                            onClick={() => toggleExpanded(room.id)}
                                            className="flex items-center justify-between w-full text-left text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                            <span className="font-medium">
                                                {isExpanded ? t('hideDetails') : t('viewAllDetails')}
                                            </span>
                                            {isExpanded ? (
                                                <ChevronUp size={20} />
                                            ) : (
                                                <ChevronDown size={20} />
                                            )}
                                        </button>

                                        {/* Expanded Content */}
                                        {isExpanded && (
                                            <div className="mt-4 space-y-4 animate-in slide-in-from-top duration-200">
                                                {/* All Amenities */}
                                                <div>
                                                    <h5 className="text-sm font-semibold text-gray-900 mb-2">
                                                        {t('allAmenities')}
                                                    </h5>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        {room.amenities.map((amenity, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                {getAmenityIcon(amenity)}
                                                                <span className="text-sm text-gray-700">
                                                                    {amenity}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Additional Images */}
                                                {room.images.length > 1 && (
                                                    <div>
                                                        <h5 className="text-sm font-semibold text-gray-900 mb-2">
                                                            {t('additionalPhotos')}
                                                        </h5>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {room.images.slice(1).map((image, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="relative h-24 bg-gray-200 rounded overflow-hidden"
                                                                >
                                                                    <img
                                                                        src={image}
                                                                        alt={`${room.name} - Image ${index + 2}`}
                                                                        className="w-full h-full object-cover"
                                                                        onError={(e) => {
                                                                            const target = e.target as HTMLImageElement;
                                                                            target.style.display = 'none';
                                                                            target.parentElement!.innerHTML = `
                                                                                <div class="w-full h-full flex items-center justify-center bg-gray-200">
                                                                                    <span class="text-xs text-gray-500">Image not available</span>
                                                                                </div>
                                                                            `;
                                                                        }}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Room Specifications */}
                                                <div>
                                                    <h5 className="text-sm font-semibold text-gray-900 mb-2">
                                                        {t('roomSpecification')}
                                                    </h5>
                                                    <div className="text-sm text-gray-600 space-y-1">
                                                        <div className="flex items-center space-x-2">
                                                            <Users size={16} />
                                                            <span>{t('maxCapacity')}: {room.capacity} {room.capacity === 1 ? t('guest') : t('guests')}</span>
                                                        </div>
                                                        {room.price && (
                                                            <div className="flex items-center space-x-2">
                                                                <span className="w-4 h-4 text-center">$</span>
                                                                <span>{t('price')}: {room.price} BAM {t('perPerson')}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Check Availability Button */}
                <div className="text-center mt-12">
                    <button
                        onClick={onCheckAvailability}
                        className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {t('checkAvailability') || 'Check Availability'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Rooms;