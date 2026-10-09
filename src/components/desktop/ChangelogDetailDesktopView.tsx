"use client";

import React from 'react';
import { motion } from 'framer-motion';

type Log = {
    id: string;
    category: string;
    product: string;
    version: string;
    title: string;
    description: string;
    added: string[];
    changed: string[];
    fixed: string[];
    removed: string[];
    date: string;
    updatedAt?: string | null;
};

export default function ChangelogDetailDesktopView({ log }: { log: Log }) {
    const dateObj = new Date(log.date);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    
    let formattedUpdate: string | null = null;
    if (log.updatedAt) {
        const upDate = new Date(log.updatedAt);
        formattedUpdate = `${upDate.getDate()} ${months[upDate.getMonth()]} ${upDate.getFullYear()}`;
    }

    return (
        <main className="relative pt-32 pb-32 min-h-screen bg-theme-bg text-theme-text selection:bg-theme-primary selection:text-theme-bg">
            <div className="max-w-[1200px] mx-auto px-8 relative z-10">
                
                {/* Back Button */}
                <motion.a 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    href="/changelog" 
                    className="inline-flex items-center gap-2 text-theme-text-muted hover:text-theme-primary transition-colors text-xs tracking-widest uppercase font-bold mb-16"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    Back to Index
                </motion.a>

                <div className="doppelrand-outer w-full">
                    <div className="doppelrand-inner p-16 lg:p-24 relative overflow-hidden bg-theme-bg/60 backdrop-blur-3xl">
                        
                        {/* Header */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="border-b border-theme-border/50 pb-12 mb-12 relative z-10"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="px-3 py-1 bg-theme-primary/10 rounded-full border border-theme-primary/30 text-[10px] font-bold tracking-[0.2em] text-theme-primary uppercase">
                                        {log.category}
                                    </span>
                                    <span className="text-theme-text-muted text-sm tracking-widest uppercase font-bold">
                                        {log.product} <span className="opacity-50">{log.version}</span>
                                    </span>
                                </div>
                                
                                <div className="flex flex-col items-end gap-1 text-right">
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] font-bold tracking-[0.2em] text-theme-text-muted uppercase">Deployed</span>
                                        <span className="text-sm font-mono tracking-widest text-theme-text">{formattedDate}</span>
                                    </div>
                                    {formattedUpdate && (
                                        <div className="flex flex-col items-end gap-0.5 mt-2">
                                            <span className="text-[8px] font-bold tracking-[0.2em] text-blue-400/70 uppercase">Edited on</span>
                                            <span className="text-xs font-mono tracking-widest text-blue-400/90">{formattedUpdate}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-theme-text leading-tight max-w-4xl">
                                {log.title}
                            </h1>
                            
                            {log.description && (
                                <p className="text-theme-text-muted text-xl font-light leading-relaxed max-w-3xl mt-6">
                                    {log.description}
                                </p>
                            )}
                        </motion.div>

                        {/* Content Sections */}
                        <div className="flex flex-col gap-16 relative z-10">
                            
                            {/* Added */}
                            {log.added && log.added.length > 0 && (
                                <motion.section 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3 className="text-emerald-400 font-bold tracking-widest uppercase text-sm mb-6 flex items-center gap-3">
                                        <span>🚀</span> Added
                                    </h3>
                                    <ul className="flex flex-col gap-4">
                                        {log.added.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-4 text-theme-text-muted text-lg font-light leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-2.5"></div>
                                                <div>
                                                    {item.includes(':') ? (
                                                        <>
                                                            <span className="font-bold text-theme-text">{item.split(':')[0]}:</span>
                                                            {item.substring(item.indexOf(':') + 1)}
                                                        </>
                                                    ) : item}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.section>
                            )}

                            {/* Changed */}
                            {log.changed && log.changed.length > 0 && (
                                <motion.section 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h3 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-6 flex items-center gap-3">
                                        <span>🔄</span> Changed
                                    </h3>
                                    <ul className="flex flex-col gap-4">
                                        {log.changed.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-4 text-theme-text-muted text-lg font-light leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-2.5"></div>
                                                <div>
                                                    {item.includes(':') ? (
                                                        <>
                                                            <span className="font-bold text-theme-text">{item.split(':')[0]}:</span>
                                                            {item.substring(item.indexOf(':') + 1)}
                                                        </>
                                                    ) : item}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.section>
                            )}

                            {/* Fixed */}
                            {log.fixed && log.fixed.length > 0 && (
                                <motion.section 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-6 flex items-center gap-3">
                                        <span>🛠️</span> Fixed
                                    </h3>
                                    <ul className="flex flex-col gap-4">
                                        {log.fixed.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-4 text-theme-text-muted text-lg font-light leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-2.5"></div>
                                                <div>
                                                    {item.includes(':') ? (
                                                        <>
                                                            <span className="font-bold text-theme-text">{item.split(':')[0]}:</span>
                                                            {item.substring(item.indexOf(':') + 1)}
                                                        </>
                                                    ) : item}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.section>
                            )}

                            {/* Removed */}
                            {log.removed && log.removed.length > 0 && (
                                <motion.section 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h3 className="text-rose-400 font-bold tracking-widest uppercase text-sm mb-6 flex items-center gap-3">
                                        <span>❌</span> Removed
                                    </h3>
                                    <ul className="flex flex-col gap-4">
                                        {log.removed.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-4 text-theme-text-muted text-lg font-light leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 mt-2.5"></div>
                                                <div>
                                                    {item.includes(':') ? (
                                                        <>
                                                            <span className="font-bold text-theme-text">{item.split(':')[0]}:</span>
                                                            {item.substring(item.indexOf(':') + 1)}
                                                        </>
                                                    ) : item}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.section>
                            )}

                        </div>

                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-theme-primary/5 to-transparent pointer-events-none"></div>
                        <div className="absolute -bottom-32 -right-32 text-[20rem] font-black text-theme-text/5 select-none pointer-events-none opacity-50">
                            {log.version.replace('v', '')}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
