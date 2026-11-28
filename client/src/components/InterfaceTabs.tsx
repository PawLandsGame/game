import { useLanguage } from '../i18n/LanguageContext';
import React from 'react';
import './InterfaceTabs.css';

interface InterfaceTabsProps {
  currentView: 'minimap' | 'encyclopedia' | 'memory-grid' | 'alk' | 'cairns' | 'matronage' | 'leaderboard' | 'achievements';
  onViewChange: (view: 'minimap' | 'encyclopedia' | 'memory-grid' | 'alk' | 'cairns' | 'matronage' | 'leaderboard' | 'achievements') => void;
  className?: string;
  hideEncyclopedia?: boolean;
  hideCairns?: boolean;
}

const InterfaceTabs: React.FC<InterfaceTabsProps> = ({ 
  currentView, 
  onViewChange, 
  className = '',
  hideEncyclopedia = false,
  hideCairns = false
}) => {
  const { t } = useLanguage();

  const isMinimapActive = currentView === 'minimap';
  const isEncyclopediaActive = currentView === 'encyclopedia';
  const isMemoryGridActive = currentView === 'memory-grid';
  const isAlkActive = currentView === 'alk';
  const isCairnsActive = currentView === 'cairns';
  const isMatronageActive = currentView === 'matronage';
  const isLeaderboardActive = currentView === 'leaderboard';
  const isAchievementsActive = currentView === 'achievements';

  return (
    <div className={`interface-tabs ${className}`}>
      {/* GRU MAPS Tab */}
      <button
        className={`tab ${isMinimapActive ? 'active' : 'inactive'}`}
        onClick={() => onViewChange('minimap')}
      >
        {t("GRU MAPS")}
      </button>
      
      {/* Encyclopedia Tab - conditionally rendered */}
      {!hideEncyclopedia && (
        <button
          className={`tab encyclopedia-tab ${isEncyclopediaActive ? 'active' : 'inactive'}`}
          onClick={() => onViewChange('encyclopedia')}
        >
          {t("ENCYCLOPEDIA")}
        </button>
      )}
      
      {/* Memory Grid Tab */}
      <button
        className={`tab memory-grid-tab ${isMemoryGridActive ? 'active' : 'inactive'}`}
        onClick={() => onViewChange('memory-grid')}
      >
        {t("MEMORY GRID")}
      </button>
      
      {/* ALK Provisioning Tab */}
      <button
        type="button"
        className={`tab alk-tab ${isAlkActive ? 'active' : 'inactive'}`}
        title={t("Hotkey: K")}
        onClick={() => onViewChange('alk')}
      >
        {t("ALK BOARD")}
      </button>
      
      {/* CAIRNS Tab - conditionally rendered */}
      {!hideCairns && (
        <button
          className={`tab cairns-tab ${isCairnsActive ? 'active' : 'inactive'}`}
          onClick={() => onViewChange('cairns')}
        >
          {t("CAIRNS")}
        </button>
      )}
      
      {/* MATRONAGE Tab */}
      <button
        className={`tab matronage-tab ${isMatronageActive ? 'active' : 'inactive'}`}
        onClick={() => onViewChange('matronage')}
      >
        {t("MATRONAGE")}
      </button>
      
      {/* LEADERBOARD Tab */}
      <button
        className={`tab leaderboard-tab ${isLeaderboardActive ? 'active' : 'inactive'}`}
        onClick={() => onViewChange('leaderboard')}
      >
        {t("LEADERBOARD")}
      </button>
      
      {/* ACHIEVEMENTS Tab */}
      <button
        type="button"
        className={`tab achievements-tab ${isAchievementsActive ? 'active' : 'inactive'}`}
        title={t("Hotkey: Y")}
        onClick={() => onViewChange('achievements')}
      >
        {t("ACHIEVEMENTS")}
      </button>
    </div>
  );
};

export default InterfaceTabs; 