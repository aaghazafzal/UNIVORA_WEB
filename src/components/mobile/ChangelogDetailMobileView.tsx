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

export default function ChangelogDetailMobileView({ log }: { log: Log }) {
    const dateObj = new Date(log.date);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    
    let formattedUpdate = null;
    if (log.updatedAt) {
        const upDate = new Date(log.updatedAt);
        formattedUpdate = `${upDate.getDate()} ${months[upDate.getMonth()]} ${upDate.getFullYear()}`;
    }

    return (
        <main className="relative pt-24 pb-24 min-h-screen bg-theme-bg text-theme-text overflow-x-hidden selection:bg-theme-primary selection:text-theme-bg">
            <div className="px-6">
                
                {/* Back Button */}
                <motion.a 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    href="/changelog" 
                    className="inline-flex items-center gap-2 text-theme-text-muted hover:text-theme-text transition-colors text-[10px] tracking-widest uppercase font-bold mb-10"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    Back
                </motion.a>

                <div className="doppelrand-outer w-full">
                    <div className="doppelrand-inner p-8 relative overflow-hidden bg-theme-surface/10">
                        
                        {/* Header */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="border-b border-theme-border/50 pb-8 mb-8 relative z-10"
                        >
                            <div className="flex flex-col gap-4 mb-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="px-2.5 py-1 bg-theme-primary/10 rounded-full border border-theme-primary/30 text-[9px] font-bold tracking-[0.2em] text-theme-primary uppercase">
                                            {log.category}
                                        </span>
                                        <span className="text-theme-text-muted text-[10px] tracking-widest uppercase font-bold">
                                            {log.product} <span className="opacity-50">{log.version}</span>
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end text-right">
                                        <span className="text-[10px] font-mono tracking-widest text-theme-text-muted">{formattedDate}</span>
                                        {formattedUpdate && (
                                            <span className="text-[8px] font-mono tracking-widest text-blue-400/90 mt-1">Edited {formattedUpdate}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <h1 className="text-3xl font-black tracking-tight text-theme-text leading-tight">
                                {log.title}
                            </h1>
                            
                            {log.description && (
                                <p className="text-theme-text-muted text-sm font-light leading-relaxed mt-4">
                                    {log.description}
                                </p>
                            )}
                        </motion.div>

                        {/* Content Sections */}
                        <div className="flex flex-col gap-10 relative z-10">
                            
                            {/* Added */}
                            {log.added && log.added.length > 0 && (
                                <motion.section 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3 className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-4 flex items-center gap-2">
                                        <span>🚀</span> Added
                                    </h3>
                                    <ul className="flex flex-col gap-3">
                                        {log.added.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-theme-text-muted text-sm font-light leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5"></div>
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
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h3 className="text-blue-400 font-bold tracking-widest uppercase text-xs mb-4 flex items-center gap-2">
                                        <span>🔄</span> Changed
                                    </h3>
                                    <ul className="flex flex-col gap-3">
                                        {log.changed.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-theme-text-muted text-sm font-light leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5"></div>
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
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 className="text-amber-400 font-bold tracking-widest uppercase text-xs mb-4 flex items-center gap-2">
                                        <span>🛠️</span> Fixed
                                    </h3>
                                    <ul className="flex flex-col gap-3">
                                        {log.fixed.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-theme-text-muted text-sm font-light leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5"></div>
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
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h3 className="text-rose-400 font-bold tracking-widest uppercase text-xs mb-4 flex items-center gap-2">
                                        <span>❌</span> Removed
                                    </h3>
                                    <ul className="flex flex-col gap-3">
                                        {log.removed.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-theme-text-muted text-sm font-light leading-relaxed">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 mt-1.5"></div>
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
                        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-theme-primary/5 to-transparent pointer-events-none"></div>
                        <div className="absolute -bottom-16 -right-16 text-[10rem] font-black text-theme-text/5 select-none pointer-events-none opacity-50">
                            {log.version.replace('v', '')}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
