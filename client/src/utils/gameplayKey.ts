export function gameplayKey({ key, code }: Pick<KeyboardEvent, 'key' | 'code'>): string {
    if (/^Key[A-Z]$/.test(code)) {
        return code.slice(3).toLowerCase();
    }

    if (code === 'Space') return ' ';

    const lowerKey = key.toLowerCase();
    // Some layouts put letters on punctuation keys. Keep those positions unbound.
    if (code && code !== 'Unidentified' && /^[a-z ]$/.test(lowerKey)) return '';

    return lowerKey;
}
