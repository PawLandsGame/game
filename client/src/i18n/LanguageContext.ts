import { createContext, useContext } from 'react';
import { russianMessages } from './russianMessages';

export type Language = 'ru' | 'en';

export const DEFAULT_LANGUAGE: Language = 'ru';
export const LANGUAGE_STORAGE_KEY = 'pawlands.language';

export function translate(language: Language, message: string): string {
    return language === 'ru' && Object.prototype.hasOwnProperty.call(russianMessages, message)
        ? russianMessages[message]
        : message;
}

interface LanguageContextValue {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (message: string) => string;
}

export const LanguageContext = createContext<LanguageContextValue>({
    language: DEFAULT_LANGUAGE,
    setLanguage: (_language: Language) => {},
    t: (message: string) => translate(DEFAULT_LANGUAGE, message),
});

export function useLanguage() {
    return useContext(LanguageContext);
}
