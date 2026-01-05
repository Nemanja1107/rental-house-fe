import { en } from './en';
import { sr } from './sr';

export const translations = {
    en,
    sr,
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof en;