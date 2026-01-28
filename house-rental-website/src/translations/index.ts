import { en } from './en';
import { sr } from './sr';
import { de } from './de';
import { fr } from './fr';
import { es } from './es';
import { hr } from './hr';
import { bs } from './bs';
import { sl } from './sl';

export const translations = {
    en,
    sr,
    de,
    fr,
    es,
    hr,
    bs,
    sl,
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof en;