import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileHeader = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Hide on scroll down, show on scroll up. Add a small threshold (50px)
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <div 
            className={`md:hidden fixed top-4 left-4 right-4 z-[60] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isVisible ? 'translate-y-0' : '-translate-y-[150%]'
            }`}
        >
            <div className="bg-theme-surface/70 backdrop-blur-2xl border border-theme-border/50 shadow-[0_8px_30px_rgba(0,0,0,0.2)] rounded-full px-5 py-3 flex items-center justify-between relative overflow-hidden">
                {/* Subtle highlight effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-theme-primary/50 to-transparent"></div>
                
                <Link to="/" className="font-black text-xl tracking-tighter text-theme-text flex items-center gap-2 relative z-10 group">
                    UNIVORA
                    {/* Small pulsing dot for active feel */}
                    <span className="w-2 h-2 rounded-full bg-theme-primary animate-pulse shadow-[0_0_8px_currentColor]"></span>
                </Link>
                
                <a 
                    href="https://t.me/univora88" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/30 hover:bg-blue-500 hover:text-white transition-all shadow-sm group z-10"
                    title="Join Univora Channel"
                >
                    <Send size={16} className="-ml-0.5 group-hover:scale-110 transition-transform" />
                </a>
            </div>
        </div>
    );
};

export default MobileHeader;
