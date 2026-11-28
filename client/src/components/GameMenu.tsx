import LanguageSelect from './LanguageSelect';
import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faEye, faGamepad, faLightbulb, IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type MenuType = 'main' | 'controls' | 'tips' | 'settings' | 'visual_settings' | null;

interface MenuOption {
    label: string;
    action: () => void;
    icon?: IconDefinition;
    isSignOut?: boolean;
}

interface GameMenuProps {
    onClose: () => void;
    onNavigate: (menu: MenuType) => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ 
    onClose, 
    onNavigate, 
}) => {
    const { t } = useLanguage();
    const { logout } = useAuth();
    const [showSignOutConfirm, setShowSignOutConfirm] = React.useState(false);
    
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSignOutRequest = () => {
        setShowSignOutConfirm(true);
    };

    const handleSignOutConfirm = async () => {
        setShowSignOutConfirm(false);
        onClose(); // Close the menu first
        await logout(); // Then sign out
    };

    const handleSignOutCancel = () => {
        setShowSignOutConfirm(false);
    };

    const menuOptions: MenuOption[] = [
        { label: t("RESUME CONSCIOUSNESS"), action: () => onClose() },
        { label: t("AUDITORY CORTEX MODULE"), action: () => onNavigate('settings'), icon: faVolumeUp },
        { label: t("VISUAL CORTEX MODULE"), action: () => onNavigate('visual_settings'), icon: faEye },
        { label: t("MOTOR CORTEX INTERFACE"), action: () => onNavigate('controls'), icon: faGamepad },
        { label: t("TACTICAL KNOWLEDGE MATRIX"), action: () => onNavigate('tips'), icon: faLightbulb },
        { label: t("FORCE NEURAL SLEEP"), action: handleSignOutRequest, isSignOut: true },
    ];

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(17, 18, 15, 0.88)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2000,
                overflow: 'hidden',
            }}
            onClick={handleBackdropClick}
        >
            <div
                style={{
                    background: 'var(--game-ui-panel)',
                    border: '1px solid var(--game-ui-border)',
                    borderRadius: '12px',
                    padding: '40px',
                    width: 'min(100%, 640px)',
                    maxHeight: '90dvh',
                    boxSizing: 'border-box',
                    position: 'relative',
                    overflow: 'auto',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2
                        style={{
                            fontFamily: 'system-ui, sans-serif',
                            fontSize: '24px',
                            color: 'var(--game-ui-text)',
                            textAlign: 'center',
                            marginBottom: '8px',
                        }}
                    >
                        {t("NEUROVEIL™ OCULAR INTERFACE")}
                    </h2>
                    <div
                        style={{
                            fontFamily: 'system-ui, sans-serif',
                            fontSize: '14px',
                            color: 'var(--game-ui-muted)',
                            textAlign: 'center',
                            opacity: 0.8,
                            lineHeight: '1.4',
                        }}
                    >
                        <div>ООО "Rozhkov Neuroscience"</div>
                        <div>{t("System v0.82")}</div>
                    </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <LanguageSelect />
                    {menuOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={option.action}
                            className={option.isSignOut ? "game-menu-action game-menu-action-danger" : "game-menu-action"}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: '12px',
                                width: '100%',
                                paddingLeft: '8px',
                            }}>
                                <div style={{
                                    width: '20px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    {option.icon && (
                                        <FontAwesomeIcon 
                                            icon={option.icon} 
                                            style={{
                                                fontSize: '16px',
                                                color: 'currentColor',
                                            }}
                                        />
                                    )}
                                </div>
                                <span>{option.label}</span>
                            </div>
                        </button>
                    ))}
                </div>
                
                {/* Neural Sleep Confirmation Dialog */}
                {showSignOutConfirm && (
                    <div 
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10000,
                        }}
                        onClick={handleSignOutCancel}
                    >
                        <div 
                            style={{
                                background: 'var(--game-ui-panel)',
                                border: '1px solid var(--game-ui-border)',
                                borderRadius: '12px',
                                padding: '30px',
                                maxWidth: '450px',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            
                            <div style={{
                                color: '#f0a59a',
                                fontSize: '18px',
                                marginBottom: '15px',
                                fontFamily: 'system-ui, sans-serif',
                            }}>
                                {t("⚠️ NEURAL SLEEP PROTOCOL ⚠️")}
                            </div>
                            
                            <div style={{
                                color: '#ffffff',
                                fontSize: '14px',
                                lineHeight: '1.8',
                                marginBottom: '25px',
                                padding: '20px',
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 51, 102, 0.3)',
                                fontFamily: 'system-ui, sans-serif',
                            }}>
                                {t("Disconnect from this game session?")}
                                <br /><br />
                                {t("Your physical body will remain vulnerable in the world while your neural pathways are severed.")}
                                <br /><br />
                                {t("Are you certain you wish to force neural sleep?")}
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '15px',
                                justifyContent: 'center',
                            }}>
                                <button
                                    onClick={handleSignOutConfirm}
                                    className="game-menu-action game-menu-action-danger"
                                >
                                    {t("CONFIRM NEURAL SLEEP")}
                                </button>
                                
                                <button
                                    onClick={handleSignOutCancel}
                                    className="game-menu-action"
                                >
                                    {t("MAINTAIN CONNECTION")}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default GameMenu;
