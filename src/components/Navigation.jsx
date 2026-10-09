import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Grid, Bot, Code, FileText, Activity, Palette, Check, ChevronRight, ChevronLeft, ShieldAlert, ShoppingCart, MessageCircle, Heart, Menu, Sparkles } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const MOBILE_NAV_MAIN = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Apps', path: '/apps', icon: Grid },
    { name: 'Bots', path: '/bots', icon: Bot },
    { name: 'Store', path: '/store', icon: ShoppingCart },
    { name: 'Dev', path: '/dev', icon: Code }
];

const MOBILE_NAV_MORE = [
    { name: 'Univora AI', action: 'ai', icon: Sparkles },
    { name: 'Docs', path: '/docs', icon: FileText },
    { name: 'Status', path: '/status', icon: Activity },
    { name: 'Report', path: '/report', icon: ShieldAlert },
    { name: 'Support', path: '/support', icon: MessageCircle },
    { name: 'Donate', path: '/donate', icon: Heart }
];

const DESKTOP_NAV_ITEMS = [
    { name: 'Base', path: '/', icon: Home },
    { name: 'Apps', path: '/apps', icon: Grid },
    { name: 'Bots', path: '/bots', icon: Bot },
    { name: 'Store', path: '/store', icon: ShoppingCart },
    { name: 'Dev', path: '/dev', icon: Code },
    { name: 'Docs', path: '/docs', icon: FileText },
    { name: 'Status', path: '/status', icon: Activity },
    { name: 'Report', path: '/report', icon: ShieldAlert },
    { name: 'Support', path: '/support', icon: MessageCircle },
    { name: 'Donate', path: '/donate', icon: Heart }
];

const Navigation = ({ onOpenAI }) => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    
    // Drag-to-Toggle State
    const [isDragging, setIsDragging] = useState(false);
    const startXRef = useRef(0);

    const { themeId, setThemeId, THEMES } = useTheme();
    const menuRef = useRef(null);

    const handleDragStart = (e) => {
        if (isMobile) return;
        setIsDragging(true);
        startXRef.current = e.clientX;
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'ew-resize';
    };

    useEffect(() => {
        const handleDragMove = (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startXRef.current;
            
            // Drag threshold is 50px
            if (!isExpanded && deltaX > 50) {
                setIsExpanded(true);
                setIsDragging(false);
                resetDragState();
            } else if (isExpanded && deltaX < -50) {
                setIsExpanded(false);
                setIsDragging(false);
                resetDragState();
            }
        };

        const resetDragState = () => {
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        };

        const handleDragEnd = () => {
            if (isDragging) {
                setIsDragging(false);
                resetDragState();
            }
        };

        if (isDragging) {
            window.addEventListener('pointermove', handleDragMove);
            window.addEventListener('pointerup', handleDragEnd);
        }

        return () => {
            window.removeEventListener('pointermove', handleDragMove);
            window.removeEventListener('pointerup', handleDragEnd);
            if (isDragging) resetDragState();
        };
    }, [isDragging, isExpanded]);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) setIsExpanded(false);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close theme menu and more menu on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsThemeMenuOpen(false);
                setIsMoreMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const sidebarWidth = isExpanded ? 240 : 80;

    if (isMobile) {
        // --- MOBILE BOTTOM NAVBAR ---
        return (
            <div className="fixed bottom-4 left-4 right-4 z-50">
                <nav className="bg-theme-surface/90 backdrop-blur-3xl border border-theme-border rounded-[2rem] p-2 shadow-2xl flex items-center justify-between relative" ref={menuRef}>
                    {MOBILE_NAV_MAIN.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMoreMenuOpen(false)}
                                className={`flex items-center p-3 rounded-2xl transition-all duration-300 ${
                                    isActive 
                                    ? 'bg-theme-primary/10 text-theme-primary shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]' 
                                    : 'text-theme-text-muted hover:text-theme-text hover:bg-theme-surface-hover'
                                }`}
                            >
                                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.span 
                                            initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                                            animate={{ width: "auto", opacity: 1, marginLeft: 8 }}
                                            exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                                            className="font-bold text-sm whitespace-nowrap overflow-hidden"
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        );
                    })}
                    
                    {/* Mobile More/Theme Menu Toggle */}
                    <button
                        onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                        className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all ${isMoreMenuOpen ? 'text-theme-primary bg-theme-surface-hover' : 'text-theme-text-muted hover:text-theme-text hover:bg-theme-surface-hover'}`}
                    >
                        <Menu size={22} />
                    </button>

                    <AnimatePresence>
                        {isMoreMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute bottom-[calc(100%+12px)] right-0 w-[280px] bg-theme-surface/95 backdrop-blur-3xl border border-theme-border rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden p-4 flex flex-col gap-4"
                            >
                                {/* More Links Grid */}
                                <div className="grid grid-cols-3 gap-2">
                                    {MOBILE_NAV_MORE.map((item) => {
                                        if (item.action === 'ai') {
                                            return (
                                                <button
                                                    key={item.name}
                                                    onClick={() => {
                                                        setIsMoreMenuOpen(false);
                                                        if (onOpenAI) onOpenAI();
                                                    }}
                                                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all bg-theme-primary/10 hover:bg-theme-primary/20 border border-theme-primary/30 text-theme-primary shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.2)]"
                                                >
                                                    <item.icon size={20} strokeWidth={2.5} className="animate-pulse" />
                                                    <span className="text-[10px] font-bold tracking-wide">{item.name}</span>
                                                </button>
                                            );
                                        }

                                        const isActive = location.pathname === item.path;
                                        return (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                onClick={() => setIsMoreMenuOpen(false)}
                                                className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                                                    isActive ? 'bg-theme-primary/10 text-theme-primary border border-theme-primary/30' : 'bg-theme-bg/50 hover:bg-theme-surface-hover border border-theme-border text-theme-text-muted hover:text-theme-text'
                                                }`}
                                            >
                                                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                                <span className="text-[10px] font-bold tracking-wide">{item.name}</span>
                                            </Link>
                                        )
                                    })}
                                </div>

                                {/* Theme Changer inside More Menu */}
                                <div className="pt-4 border-t border-theme-border">
                                    <span className="text-[10px] font-bold text-theme-text-muted uppercase tracking-wider mb-3 block">Themes</span>
                                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                                        {THEMES.map((theme) => (
                                            <button
                                                key={theme.id}
                                                onClick={() => {
                                                    setThemeId(theme.id);
                                                    setIsMoreMenuOpen(false);
                                                }}
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                                                    themeId === theme.id ? 'border-theme-primary bg-theme-primary/10 scale-110 shadow-sm' : 'border-theme-border bg-theme-bg hover:border-theme-text-muted'
                                                }`}
                                            >
                                                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: theme.color }} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </div>
        );
    }

    // --- DESKTOP SIDEBAR ---
    return (
        <motion.aside
            initial={{ width: sidebarWidth }}
            animate={{ width: sidebarWidth }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="sticky top-0 h-screen z-50 bg-theme-surface/80 backdrop-blur-xl border-r border-theme-border flex flex-col overflow-visible"
        >
            {/* Logo Area */}
            <div className="h-24 flex items-center justify-center border-b border-theme-border relative">
                <Link to="/" className="flex items-center gap-3 overflow-hidden whitespace-nowrap group">
                    <div className="w-8 h-8 bg-theme-surface rounded-lg flex items-center justify-center shrink-0 shadow-lg overflow-hidden border border-theme-border group-hover:border-theme-primary transition-colors">
                        <img src="/logos/png-logos/univora.png" alt="Univora Logo" className="w-full h-full object-cover" draggable="false" />
                    </div>
                    {isExpanded && (
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="font-black tracking-widest text-lg text-theme-text"
                        >
                            UNIVORA
                        </motion.span>
                    )}
                </Link>

                {/* Toggle Button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-theme-text text-theme-bg rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md z-[60]"
                >
                    {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                </button>
            </div>

            {/* Invisible Drag Handle (Right Edge) */}
            <div 
                className="absolute top-0 bottom-0 right-[-4px] w-[8px] cursor-ew-resize z-50 hover:bg-theme-primary/20 transition-colors"
                onPointerDown={handleDragStart}
                title="Drag to toggle sidebar"
            />

            {/* Navigation Links */}
            <div className="flex-1 py-4 px-3 flex flex-col gap-2 overflow-y-auto no-scrollbar">
                {/* AI Assistant Button */}
                <button
                    onClick={() => { if (onOpenAI) onOpenAI(); }}
                    className="flex items-center gap-4 px-3 py-3 rounded-xl transition-all group relative overflow-hidden bg-theme-primary/10 text-theme-primary hover:bg-theme-primary/20 border border-theme-primary/30 mb-2 shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.1)]"
                    title={!isExpanded ? "Univora AI" : undefined}
                >
                    <Sparkles size={22} strokeWidth={2.5} className="shrink-0 z-10 animate-pulse" />
                    {isExpanded && (
                        <span className="font-bold whitespace-nowrap z-10 tracking-wide">Univora AI</span>
                    )}
                </button>

                {DESKTOP_NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all group relative overflow-hidden ${isActive ? 'bg-theme-primary/10 text-theme-primary' : 'text-theme-text-muted hover:text-theme-text hover:bg-theme-surface-hover'}`}
                            title={!isExpanded ? item.name : undefined}
                        >
                            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className="shrink-0 z-10" />
                            {isExpanded && (
                                <span className="font-bold whitespace-nowrap z-10">{item.name}</span>
                            )}
                            {/* Active Indicator Line */}
                            {isActive && (
                                <motion.div layoutId="active-nav" className="absolute left-0 top-0 bottom-0 w-1 bg-theme-primary rounded-r-full" />
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Actions (Theme Switcher) */}
            <div className="p-4 border-t border-theme-border relative" ref={menuRef}>
                <button
                    onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                    className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-theme-text-muted hover:text-theme-text hover:bg-theme-surface-hover transition-colors group"
                    title={!isExpanded ? "Themes" : undefined}
                >
                    <Palette size={22} className="shrink-0 group-hover:text-theme-primary transition-colors" />
                    {isExpanded && (
                        <span className="font-bold whitespace-nowrap">Theme</span>
                    )}
                </button>

                <AnimatePresence>
                    {isThemeMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-4 left-full ml-4 w-56 bg-theme-surface border border-theme-border rounded-2xl shadow-2xl overflow-hidden py-2 z-50"
                        >
                            <div className="px-4 pb-2 mb-2 border-b border-theme-border">
                                <span className="text-xs font-bold text-theme-text-muted uppercase tracking-wider">Select Theme</span>
                            </div>
                            {THEMES.map((theme) => (
                                <button
                                    key={theme.id}
                                    onClick={() => {
                                        setThemeId(theme.id);
                                        setIsThemeMenuOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors hover:bg-theme-surface-hover ${themeId === theme.id ? 'bg-theme-surface-hover' : ''}`}
                                >
                                    <div className="w-4 h-4 rounded-full border border-theme-border shrink-0" style={{ backgroundColor: theme.color }} />
                                    <span className="text-sm font-medium text-theme-text flex-1">{theme.name}</span>
                                    {themeId === theme.id && <Check size={14} className="text-theme-primary" />}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.aside>
    );
};

export default Navigation;
