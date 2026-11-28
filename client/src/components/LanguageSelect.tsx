import { useLanguage, type Language } from '../i18n/LanguageContext';

export default function LanguageSelect() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', color: '#e5f6ff', fontFamily: 'system-ui, sans-serif' }}>
            {t('Language')}
            <select
                value={language}
                onKeyDown={(event) => event.stopPropagation()}
                onChange={(event) => setLanguage(event.target.value as Language)}
                style={{ color: '#e5f6ff', background: '#16213e', border: '1px solid #6699cc', borderRadius: '4px', padding: '0.35rem' }}
            >
                <option value="ru" lang="ru">Русский</option>
                <option value="en" lang="en">English</option>
            </select>
        </label>
    );
}
