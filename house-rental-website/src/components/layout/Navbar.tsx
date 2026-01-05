import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import type { NavItem } from '../../types';
import logo from '../../assets/images/Logo.png';

interface NavbarProps {
    onAdminClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAdminClick }) => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const navItems: NavItem[] = useMemo(() => [
        { id: 'home', label: t('navHome'), href: '#home' },
        { id: 'gallery', label: t('navGallery'), href: '#gallery' },
        { id: 'attractions', label: t('navAttractions'), href: '#attractions' },
        { id: 'about', label: t('navAbout'), href: '#about' },
        { id: 'rooms', label: t('navRooms'), href: '#rooms' },
        { id: 'reservation', label: t('navReservation'), href: '#reservation' },
        { id: 'faq', label: t('navFAQ'), href: '#faq' },
    ], [t]);

    // Handle smooth scrolling to sections
    const handleNavClick = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        setIsMenuOpen(false);
    };

    // Track active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.id);
            const scrollPosition = window.scrollY + 100;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navItems]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <div className="flex items-center h-16">
                {/* Logo Area - Constrained to container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        <img
                            src={logo}
                            alt="Rental House Logo"
                            className="h-12 w-12 object-contain"
                        />
                        <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
                            Forest Bath Čajniče
                        </span>
                    </div>
                </div>

                {/* Desktop Navigation - Positioned at screen edge */}
                <div className="hidden md:flex items-center space-x-4 lg:space-x-8 pr-4 sm:pr-6 lg:pr-8">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.href)}
                            className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-blue-600 whitespace-nowrap ${activeSection === item.id
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-700 hover:text-blue-600'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                    <LanguageSwitcher />
                    <button
                        onClick={onAdminClick}
                        className="ml-4 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 whitespace-nowrap"
                    >
                        Admin
                    </button>
                </div>

                {/* Mobile Menu Button and Language Switcher - Positioned at screen edge */}
                <div className="md:hidden flex items-center space-x-2 flex-shrink-0 pr-4">
                    <LanguageSwitcher />
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.href)}
                                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${activeSection === item.id
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={onAdminClick}
                            className="block w-full text-left px-3 py-2 text-base font-medium rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                        >
                            Admin
                        </button>
                    </div>
                </div>
            )}
        </nav >
    );
};

export default Navbar;