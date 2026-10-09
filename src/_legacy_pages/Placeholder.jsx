import React from 'react';
import { useLocation } from 'react-router-dom';
import { Construction } from 'lucide-react';
import Footer from '../components/Footer';

const Placeholder = () => {
    const location = useLocation();
    const moduleName = location.pathname.substring(1).toUpperCase();

    return (
        <div className="min-h-[100vh] font-sans selection:bg-[rgb(var(--color-primary))] selection:text-[rgb(var(--color-bg))] flex flex-col">
            {/* Background Grid */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-theme-surface-hover border border-theme-border rounded-2xl flex items-center justify-center text-theme-primary mb-8 animate-bounce">
                    <Construction size={40} />
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-theme-text">
                    MODULE: {moduleName}
                </h1>
                
                <p className="text-xl text-theme-text-muted max-w-lg mb-8 leading-relaxed">
                    This sector is currently under construction. Infrastructure is being compiled.
                </p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-theme-primary/30 bg-theme-primary/10 text-sm font-mono text-theme-primary">
                    STATUS: COMPILING
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default Placeholder;
