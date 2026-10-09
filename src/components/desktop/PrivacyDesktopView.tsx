"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface Section {
    id: string;
    title: string;
    content: string;
}

interface PrivacyDesktopViewProps {
    sections: Section[];
}

export default function PrivacyDesktopView({ sections }: PrivacyDesktopViewProps) {
    const [activeSection, setActiveSection] = useState<string>(sections[0].id);

    // Simple scroll spy logic
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                const element = document.getElementById(`section-${section.id}`);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(`section-${id}`);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 150;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <main className="relative pt-32 pb-32 min-h-screen selection:bg-theme-primary selection:text-theme-bg">
            <div className="max-w-[1200px] mx-auto px-8 relative z-10">
                
                {/* Header Section */}
                <div className="mb-20">
                    <h1 className="text-6xl font-black tracking-tight text-theme-text mb-6">
                        Privacy <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-primary/50">Policy</span>
                    </h1>
                    <p className="text-xl text-theme-text-muted font-light max-w-2xl leading-relaxed">
                        We respect your data. Learn exactly what information we collect, how it's securely processed, and your rights regarding its deletion.
                    </p>
                </div>

                <div className="flex items-start gap-16">
                    {/* Sticky Sidebar Navigation */}
                    <div className="w-[320px] shrink-0 sticky top-32">
                        <div className="doppelrand-outer rounded-3xl p-1">
                            <div className="doppelrand-inner bg-theme-surface/30 p-6 flex flex-col gap-1">
                                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-theme-text-muted mb-4 pl-4">Table of Contents</h3>
                                {sections.map(section => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-[13px] font-bold transition-all flex items-center justify-between group ${
                                            activeSection === section.id 
                                                ? 'bg-theme-primary text-theme-bg' 
                                                : 'text-theme-text-muted hover:text-theme-text hover:bg-theme-surface'
                                        }`}
                                    >
                                        <span className="truncate pr-4">{section.title}</span>
                                        <ChevronRight size={14} className={`shrink-0 transition-transform ${activeSection === section.id ? 'translate-x-1 text-theme-bg' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-12">
                            {sections.map((section, index) => (
                                <motion.div 
                                    key={section.id}
                                    id={`section-${section.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="doppelrand-outer rounded-2xl overflow-hidden"
                                >
                                    <div className="doppelrand-inner bg-theme-surface/10 p-10">
                                        <h2 className="text-2xl font-black text-theme-text mb-6 tracking-tight">
                                            {section.title}
                                        </h2>
                                        <div className="w-12 h-1 bg-theme-primary/50 mb-8 rounded-full"></div>
                                        <p className="text-lg text-theme-text-muted leading-relaxed font-light">
                                            {section.content}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="mt-16 text-center text-sm font-mono text-theme-text-muted/50 uppercase tracking-widest">
                            Last Updated: October 2026
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
