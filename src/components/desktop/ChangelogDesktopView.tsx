"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Log = {
    id: string;
    category: string;
    product: string;
    version: string;
    title: string;
    description: string;
    date: string;
};

const CATEGORIES = ['All', 'App', 'Bot', 'Store', 'System'];

export default function ChangelogDesktopView({ initialLogs }: { initialLogs: Log[] }) {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredLogs = activeFilter === 'All' 
        ? initialLogs 
        : initialLogs.filter(log => log.category === activeFilter);

    return (
        <main className="relative pt-24 pb-32 min-h-screen bg-theme-bg text-theme-text selection:bg-theme-primary selection:text-theme-bg">
            <div className="max-w-[1600px] mx-auto px-8 lg:px-20 relative z-10">
                
                {/* Sticky Scroll Layout */}
                <div className="flex flex-col lg:flex-row gap-20 items-start">
                    
                    {/* Left: Sticky Sidebar */}
                    <div className="lg:w-1/3 sticky top-32 hidden lg:block">
                        <div className="mb-8">
                            <motion.h1 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-6xl font-black tracking-tighter text-theme-text mb-4"
                            >
                                Changelog.
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-theme-text-muted text-sm font-light leading-relaxed max-w-sm"
                            >
                                The definitive record of all updates, deployments, and architectural shifts across the UNIVORA ecosystem.
                            </motion.p>
                        </div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="doppelrand-outer w-full"
                        >
                            <div className="doppelrand-inner p-10 bg-theme-bg/60 backdrop-blur-3xl">
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-theme-text-muted mb-8">Filter Index</h3>
                                <ul className="flex flex-col gap-4">
                                    {CATEGORIES.map((cat, idx) => (
                                        <li key={cat}>
                                            <button 
                                                onClick={() => setActiveFilter(cat)}
                                                className="group flex items-center gap-4 transition-colors w-full text-left"
                                            >
                                                <span className={`text-[10px] font-mono transition-opacity ${activeFilter === cat ? 'opacity-100 text-theme-primary' : 'opacity-50'}`}>
                                                    0{idx + 1}
                                                </span>
                                                <span className={`text-lg font-bold tracking-tight transition-colors ${activeFilter === cat ? 'text-theme-primary' : 'text-theme-text group-hover:text-theme-primary'}`}>
                                                    {cat}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Scrolling List */}
                    <div className="lg:w-2/3 flex flex-col gap-16 pt-8">
                        <AnimatePresence mode="popLayout">
                            {filteredLogs.length === 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-32 text-theme-text-muted font-light tracking-widest uppercase"
                                >
                                    No records found for this index.
                                </motion.div>
                            ) : (
                                filteredLogs.map((log, idx) => {
                                    const dateObj = new Date(log.date);
                                    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                                    const formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

                                    return (
                                        <motion.div 
                                            key={log.id}
                                            layout
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                            className="doppelrand-outer w-full group cursor-pointer block"
                                        >
                                            <a href={`/changelog/${log.id}`} className="doppelrand-inner p-12 lg:p-16 flex flex-col gap-8 relative overflow-hidden transition-colors duration-500 hover:bg-theme-surface/30 block">
                                                
                                                {/* Header */}
                                                <div className="flex justify-between items-start z-10 relative border-b border-theme-border/50 pb-8">
                                                    <div>
                                                        <h2 className="text-3xl lg:text-4xl font-black tracking-tighter text-theme-text mb-4 group-hover:text-theme-primary transition-colors duration-500 line-clamp-1">
                                                            {log.title}
                                                        </h2>
                                                        <div className="flex flex-wrap items-center gap-3">
                                                            <span className="px-3 py-1 bg-theme-text/5 rounded-full border border-theme-border text-[10px] font-bold tracking-[0.2em] text-theme-text uppercase">
                                                                {log.category}
                                                            </span>
                                                            <span className="text-theme-text-muted text-sm tracking-widest uppercase font-bold">
                                                                {log.product} <span className="opacity-50">{log.version}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Date Badge */}
                                                    <div className="flex flex-col items-end gap-1">
                                                        <span className="text-[10px] font-bold tracking-[0.2em] text-theme-text-muted uppercase">Deployed</span>
                                                        <span className="text-sm font-mono tracking-widest text-theme-text">{formattedDate}</span>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <div className="z-10 relative pt-4 flex justify-between items-end">
                                                    <p className="text-theme-text-muted text-lg font-light leading-relaxed max-w-2xl line-clamp-2">
                                                        {log.description}
                                                    </p>
                                                    <div className="w-12 h-12 rounded-full border border-theme-border flex items-center justify-center text-theme-text group-hover:bg-theme-primary group-hover:text-theme-bg group-hover:border-theme-primary transition-all duration-300">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                                    </div>
                                                </div>

                                                {/* Massive Background Number */}
                                                <div className="absolute -bottom-16 -right-10 text-[16rem] leading-none font-black text-theme-text/5 pointer-events-none select-none transition-all duration-1000 group-hover:text-theme-primary/10 group-hover:scale-110 origin-bottom-right">
                                                    {(idx + 1).toString().padStart(2, '0')}
                                                </div>
                                                
                                                {/* Hover highlight line */}
                                                <div className="absolute top-0 left-0 w-full h-[2px] bg-theme-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[0.16,1,0.3,1] opacity-50 z-30 pointer-events-none"></div>
                                            </a>
                                        </motion.div>
                                    );
                                })
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
}
