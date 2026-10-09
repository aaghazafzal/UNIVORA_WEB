"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';

interface Section {
    id: string;
    title: string;
    content: string;
}

interface TermsMobileViewProps {
    sections: Section[];
}

export default function TermsMobileView({ sections }: TermsMobileViewProps) {
    const [activeSection, setActiveSection] = useState<string>(sections[0].id);

    // Simple scroll spy logic for mobile
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                const element = document.getElementById(`m-section-${section.id}`);
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
        const element = document.getElementById(`m-section-${id}`);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 130;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <main className="relative pt-24 pb-24 min-h-screen selection:bg-theme-primary selection:text-theme-bg overflow-x-hidden">
            <div className="px-5 relative z-10">
                
                {/* Header Section */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black tracking-tight text-theme-text mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-[15px] text-theme-text-muted font-light leading-relaxed px-4">
                        Please read these terms carefully before using the Univora Ecosystem.
                    </p>
                </div>

                {/* Sticky Horizontal TOC */}
                <div className="sticky top-[80px] z-40 bg-theme-bg/90 backdrop-blur-xl border-y border-theme-border/30 -mx-5 px-5 py-4 mb-8 shadow-lg">
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mr-5 pr-5 snap-x">
                        {sections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`shrink-0 snap-start px-4 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all border ${
                                    activeSection === section.id 
                                        ? 'bg-theme-primary border-theme-primary text-theme-bg' 
                                        : 'bg-theme-surface/30 border-theme-border/50 text-theme-text-muted'
                                }`}
                            >
                                {section.title.replace(/^[0-9]+\.\s*/, '') /* Remove number prefix for mobile pills */}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col gap-8">
                    {sections.map((section, index) => (
                        <motion.div 
                            key={section.id}
                            id={`m-section-${section.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="doppelrand-outer rounded-xl overflow-hidden"
                        >
                            <div className="doppelrand-inner bg-theme-surface/10 p-6">
                                <h2 className="text-[19px] font-black text-theme-text mb-4 tracking-tight leading-tight">
                                    {section.title}
                                </h2>
                                <div className="w-8 h-1 bg-theme-primary/50 mb-5 rounded-full"></div>
                                <p className="text-[15px] text-theme-text-muted leading-relaxed font-light">
                                    {section.content}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center text-[10px] font-mono text-theme-text-muted/50 uppercase tracking-widest">
                    Last Updated: October 2026
                </div>

            </div>
        </main>
    );
}
