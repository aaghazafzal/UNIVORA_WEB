import React, { createContext, useContext, useEffect, useState } from 'react';

export const THEMES = [
  { id: 'theme-void-orange', name: 'Void Orange', type: 'dark', color: '#ff6b00', bg: '#050505' },
  { id: 'theme-midnight-azure', name: 'Midnight Azure', type: 'dark', color: '#3b82f6', bg: '#0a0f1c' },
  { id: 'theme-cyber-neon', name: 'Cyber Neon', type: 'dark', color: '#22c55e', bg: '#09090b' },
  { id: 'theme-stellar-light', name: 'Stellar Light', type: 'light', color: '#ff6b00', bg: '#ffffff' },
  { id: 'theme-frost-minimal', name: 'Frost Minimal', type: 'light', color: '#0ea5e9', bg: '#f8fafc' },
  { id: 'theme-solar-flare', name: 'Solar Flare', type: 'light', color: '#dc2626', bg: '#fffbeb' }
];

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem('univora-theme') || 'theme-void-orange';
  });

  useEffect(() => {
    localStorage.setItem('univora-theme', themeId);
    
    // Remove all previous theme classes
    THEMES.forEach(t => document.documentElement.classList.remove(t.id));
    // Add the new theme class
    document.documentElement.classList.add(themeId);
  }, [themeId]);

  const activeTheme = THEMES.find(t => t.id === themeId) || THEMES[0];

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, activeTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};
