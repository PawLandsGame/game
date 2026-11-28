import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';

interface GameMenuButtonProps {
    onClick: () => void;
}

const GameMenuButton: React.FC<GameMenuButtonProps> = ({ onClick }) => {
    const { t } = useLanguage();
    return (
        <button
            onClick={onClick}
            className="game-menu-button"
            type="button"
            aria-label={t("Open game menu")}
        >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
        </button>
    );
};

export default GameMenuButton;
