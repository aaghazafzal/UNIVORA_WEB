"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Home, Grid, Bot, ShoppingBag, Code, FileText, Activity, Menu, X, LifeBuoy, Newspaper, User } from 'lucide-react';

const NAV_ITEMS = [
    { name: 'Hub', path: '/', icon: Home },
    { name: 'Apps', path: '/apps', icon: Grid },
    { name: 'Bots', path: '/bots', icon: Bot },
    { name: 'Dev', path: '/dev', icon: Code },
    { name: 'Docs', path: '/docs', icon: FileText },
    { name: 'Blog', path: '/blog', icon: Newspaper },
    { name: 'Support', path: '/support', icon: LifeBuoy },
    { name: 'Login', path: '/auth', icon: User },
];

export default function GlobalNav() {
    const pathname = usePathname();
    const { themeId, setThemeId, activeTheme, THEMES } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    const themeMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
                setIsThemeMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    }, [isMenuOpen]);

    return (
        <>
            {/* Fluid Island Floating Dock (Desktop & Tablet) */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-2 p-2 bg-theme-bg/60 backdrop-blur-2xl border border-theme-border/50 rounded-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-awwwards group overflow-hidden
                            ${isActive ? 'text-theme-bg bg-theme-text shadow-lg' : 'text-theme-text hover:bg-theme-text/10'}
                            `}
                        >
                            <item.icon size={16} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />
                            <span className="text-[11px] font-bold tracking-widest uppercase relative z-10">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}

                <div className="w-px h-6 bg-theme-border/50 mx-2"></div>

                {/* Theme Switcher in Dock */}
                <div className="relative" ref={themeMenuRef}>
                    <button
                        onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-awwwards hover:bg-theme-text/10 group"
                        title="Change Theme"
                    >
                         <div className="w-5 h-5 rounded-full border border-theme-border shadow-sm group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(var(--color-primary),0.3)] transition-all duration-awwwards relative overflow-hidden" 
                              style={{ background: `linear-gradient(135deg, ${activeTheme?.palette?.[0]} 33%, ${activeTheme?.palette?.[1]} 33% 66%, ${activeTheme?.palette?.[2]} 66%)` }}>
                         </div>
                    </button>

                    <AnimatePresence>
                        {isThemeMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="absolute bottom-14 left-1/2 -translate-x-1/2 w-max bg-theme-bg/90 backdrop-blur-2xl border border-theme-border/50 rounded-3xl p-3 shadow-2xl flex gap-2"
                            >
                                {THEMES.map((theme) => (
                                    <button
                                        key={theme.id}
                                        onClick={() => {
                                            setThemeId(theme.id);
                                            setIsThemeMenuOpen(false);
                                        }}
                                        title={theme.name}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-awwwards border-2 ${themeId === theme.id ? 'border-theme-primary scale-110 shadow-lg' : 'border-transparent hover:border-theme-text/30 hover:scale-105'}`}
                                        style={{ background: `linear-gradient(135deg, ${theme.palette?.[0]} 33%, ${theme.palette?.[1]} 33% 66%, ${theme.palette?.[2]} 66%)` }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile Top Pill & Fullscreen Menu */}
            <div className="md:hidden fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-6">
                <div className="w-full max-w-sm flex items-center justify-between p-2 pl-6 bg-theme-bg/70 backdrop-blur-2xl border border-theme-border/50 rounded-[2rem] pointer-events-auto shadow-2xl">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                        <img src="/logos/png-logos/univora.png" alt="Logo" className="w-5 h-5 filter grayscale contrast-200" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-theme-text">Univora</span>
                    </Link>
                    
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-10 h-10 rounded-full bg-theme-text/5 flex items-center justify-center hover:bg-theme-text/10 transition-awwwards"
                    >
                        <motion.div
                            animate={{ rotate: isMenuOpen ? 180 : 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {isMenuOpen ? <X size={18} className="text-theme-text" /> : <Menu size={18} className="text-theme-text" />}
                        </motion.div>
                    </button>
                </div>
            </div>

            {/* Mobile Fullscreen Menu Mask Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-theme-bg/90 flex flex-col items-center justify-center pt-20"
                    >
                        <div className="flex flex-col gap-8 items-center">
                            {NAV_ITEMS.map((item, i) => (
                                <motion.div
                                    key={item.path}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Link
                                        href={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-4xl font-light tracking-tight text-theme-text flex items-center gap-4"
                                    >
                                        <item.icon size={28} className="text-theme-primary/50" />
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            
                            {/* Mobile Theme Switcher - Vault Aesthetic */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: NAV_ITEMS.length * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full max-w-[320px] mt-8 px-4"
                            >
                                <div className="doppelrand-outer rounded-[2rem] p-1 shadow-2xl">
                                    <div className="doppelrand-inner bg-theme-bg/60 backdrop-blur-2xl p-5 flex flex-col items-center gap-4">
                                        <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-theme-primary text-center">
                                            {activeTheme?.name || 'Interface Theme'}
                                        </div>
                                        <div className="flex items-center gap-4 w-full overflow-x-auto pb-2 pt-2 scrollbar-hide px-2 snap-x mask-fade-edges">
                                            {THEMES.map((theme) => (
                                                <button
                                                    key={theme.id}
                                                    onClick={() => setThemeId(theme.id)}
                                                    className={`shrink-0 snap-center w-10 h-10 rounded-full border transition-all duration-300 ${
                                                        themeId === theme.id 
                                                            ? 'border-theme-primary scale-110 shadow-[0_0_20px_rgba(var(--color-primary),0.3)]' 
                                                            : 'border-theme-border/30 opacity-40 scale-90'
                                                    }`}
                                                    style={{ background: `linear-gradient(135deg, ${theme.palette?.[0]} 33%, ${theme.palette?.[1]} 33% 66%, ${theme.palette?.[2]} 66%)` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
