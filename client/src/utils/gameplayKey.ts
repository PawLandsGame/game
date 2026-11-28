export function gameplayKey({ key, code }: Pick<KeyboardEvent, 'key' | 'code'>): string {
    const lowerKey = key.toLowerCase();
    if (/^[а-яё]$/u.test(lowerKey) && /^Key[A-Z]$/.test(code)) {
        return code.slice(3).toLowerCase();
    }
    return lowerKey;
}
