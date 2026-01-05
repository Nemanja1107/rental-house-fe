import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';
import type { Language, TranslationKey } from '../translations';

interface TranslationContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
};

interface TranslationProviderProps {
    children: React.ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        // Get language from localStorage or default to English
        const savedLanguage = localStorage.getItem('language') as Language;
        return savedLanguage && translations[savedLanguage] ? savedLanguage : 'en';
    });

    useEffect(() => {
        // Save language preference to localStorage
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key: TranslationKey): string => {
        return translations[language][key] || translations.en[key] || key;
    };

    const value = {
        language,
        setLanguage,
        t,
    };

    return (
        <TranslationContext.Provider value={value}>
            {children}
        </TranslationContext.Provider>
    );
};