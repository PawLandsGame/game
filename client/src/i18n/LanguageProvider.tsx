import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, LanguageContext, translate, type Language } from './LanguageContext';

function readLanguage(): Language {
    try {
        return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'en' ? 'en' : DEFAULT_LANGUAGE;
    } catch {
        return DEFAULT_LANGUAGE;
    }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState(readLanguage);

    useEffect(() => {
        document.documentElement.lang = language;
        try {
            window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        } catch {
            // The language can still be changed for the current session.
        }
    }, [language]);

    const value = useMemo(() => ({
        language,
        setLanguage,
        t: (message: string) => translate(language, message),
    }), [language]);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
