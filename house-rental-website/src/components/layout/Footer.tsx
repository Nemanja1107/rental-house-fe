import React, { useMemo } from 'react';
import { Home, Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';
import type { NavItem } from '../../types';

const Footer: React.FC = () => {
    const { t } = useTranslation();

    const navItems: NavItem[] = useMemo(() => [
        { id: 'home', label: t('navHome'), href: '#home' },
        { id: 'gallery', label: t('navGallery'), href: '#gallery' },
        { id: 'attractions', label: t('navAttractions'), href: '#attractions' },
        { id: 'about', label: t('navAbout'), href: '#about' },
        { id: 'rooms', label: t('navRooms'), href: '#rooms' },
        { id: 'reservation', label: t('navReservation'), href: '#reservation' },
        { id: 'faq', label: t('navFAQ'), href: '#faq' },
    ], [t]);

    const handleNavClick = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                    {/* Brand and Description */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center space-x-2 mb-4">
                            <Home className="h-8 w-8 text-blue-400" />
                            <span className="text-xl font-bold">Forest Bath Čajniče</span>
                        </div>
                        <p className="text-gray-300 mb-6 max-w-md">
                            {t('footerDescription')}
                        </p>

                        {/* Social Media Links */}
                        <div className="flex space-x-4">
                            <a
                                href="https://www.facebook.com/p/Stan-na-dan-Cajnice-100077661724962/"
                                target='_blank'
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a
                                href="https://www.instagram.com/forestbathcajnice/"
                                target='_blank'
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div className="lg:col-span-3">
                        <h3 className="text-lg font-semibold mb-4">{t('footerQuickLinks')}</h3>
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleNavClick(item.href)}
                                        className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-left"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="lg:col-span-4">
                        <h3 className="text-lg font-semibold mb-4">{t('footerContact')}</h3>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 whitespace-nowrap">
                                    {t('footerAddress')}
                                </span>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                <a
                                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                >
                                    +387 66 378 182
                                </a>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                <a
                                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                    style={{ cursor: 'default' }}
                                >
                                    stannadancajnice@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Border and Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Forest Bath Čajniče. {t('footerRights')}
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200"
                            >
                                {t('footerPrivacy')}
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200"
                            >
                                {t('footerTerms')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;