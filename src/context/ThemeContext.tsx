"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const THEMES = [
  { id: "theme-ethereal-midnight", name: "Ethereal Midnight", type: "dark", color: "#A875FF", bg: "#05020A", palette: ["#A875FF", "#F5F0FF", "#05020A"] },
  { id: "theme-editorial-espresso", name: "Editorial Espresso", type: "dark", color: "#D4B895", bg: "#120F0D", palette: ["#D4B895", "#FAF5EB", "#120F0D"] },
  { id: "theme-titanium-frost", name: "Titanium Frost", type: "light", color: "#0A0A0A", bg: "#F6F7F9", palette: ["#0A0A0A", "#0F0F12", "#F6F7F9"] },
  { id: "theme-abyssal-navy", name: "Abyssal Navy", type: "dark", color: "#5EEAD4", bg: "#040714", palette: ["#5EEAD4", "#E6F0FF", "#040714"] },
  { id: "theme-obsidian-amber", name: "Obsidian Amber", type: "dark", color: "#F59E0B", bg: "#050505", palette: ["#F59E0B", "#F5F5F5", "#050505"] },
  { id: "theme-carbon-crimson", name: "Carbon Crimson", type: "dark", color: "#E11D48", bg: "#0A0505", palette: ["#E11D48", "#FAEBEB", "#0A0505"] },
  { id: "theme-emerald-matrix", name: "Emerald Matrix", type: "dark", color: "#10B981", bg: "#020A05", palette: ["#10B981", "#EBF0F0", "#020A05"] },
  { id: "theme-monolithic-silver", name: "Monolithic Silver", type: "dark", color: "#9CA3AF", bg: "#080809", palette: ["#9CA3AF", "#F0F0F5", "#080809"] },
  { id: "theme-velvet-amethyst", name: "Velvet Amethyst", type: "dark", color: "#D946EF", bg: "#0A0208", palette: ["#D946EF", "#FAEBFA", "#0A0208"] },
];

type Theme = typeof THEMES[0];

interface ThemeContextType {
  themeId: string;
  activeTheme: Theme;
  setThemeId: (id: string) => void;
  THEMES: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeId, setThemeId] = useState<string>("theme-ethereal-midnight");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("univora-theme-awwwards");
    if (stored) setThemeId(stored);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("univora-theme-awwwards", themeId);
    
    const root = document.documentElement;
    THEMES.forEach(t => root.classList.remove(t.id));
    root.classList.add(themeId);
  }, [themeId, mounted]);

  const activeTheme = THEMES.find(t => t.id === themeId) || THEMES[0];

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, activeTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};
