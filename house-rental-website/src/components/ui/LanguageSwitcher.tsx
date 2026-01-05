import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';
import type { Language } from '../../translations';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useTranslation();

    const languages: { code: Language; name: string; flag: string }[] = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'sr', name: 'Srpski', flag: '🇷🇸' },
    ];

    const currentLanguage = languages.find(lang => lang.code === language);

    return (
        <div className="relative group">
            <button
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                aria-label="Change language"
            >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{currentLanguage?.flag}</span>
                <span className="hidden md:inline">{currentLanguage?.name}</span>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => setLanguage(lang.code)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2 ${language === lang.code
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'text-gray-700'
                                }`}
                        >
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                            {language === lang.code && (
                                <span className="ml-auto text-blue-600">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LanguageSwitcher;