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

export default function ChangelogMobileView({ initialLogs }: { initialLogs: Log[] }) {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredLogs = activeFilter === 'All' 
        ? initialLogs 
        : initialLogs.filter(log => log.category === activeFilter);

    return (
        <main className="relative pt-24 pb-24 min-h-screen bg-theme-bg text-theme-text overflow-x-hidden selection:bg-theme-primary selection:text-theme-bg">
            <div className="px-6">
                
                {/* Header */}
                <div className="mb-10">
                    <motion.h1 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl font-black tracking-tighter text-theme-text mb-4"
                    >
                        Changelog.
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-theme-text-muted text-sm font-light leading-relaxed"
                    >
                        The definitive record of all updates across the UNIVORA ecosystem.
                    </motion.p>
                </div>

                {/* Sticky Filter Bar */}
                <div className="sticky top-4 z-30 w-full mb-10">
                    <div className="doppelrand-outer w-full rounded-2xl shadow-2xl">
                        <div className="doppelrand-inner rounded-2xl bg-theme-bg/80 backdrop-blur-2xl p-3">
                            <div className="w-full flex gap-3 overflow-x-auto no-scrollbar snap-x items-center">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveFilter(cat)}
                                        className={`flex-shrink-0 px-6 py-3 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all duration-300 snap-center ${
                                            activeFilter === cat 
                                                ? 'bg-theme-primary text-theme-bg shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.4)]' 
                                                : 'border border-transparent bg-theme-surface/30 text-theme-text-muted hover:text-theme-text hover:bg-theme-surface/50'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feed */}
                <div className="flex flex-col gap-10">
                    <AnimatePresence mode="popLayout">
                        {filteredLogs.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-20 text-theme-text-muted font-light tracking-widest uppercase text-xs"
                            >
                                No records found.
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
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.5 }}
                                            className="doppelrand-outer w-full group cursor-pointer block"
                                        >
                                            <a href={`/changelog/${log.id}`} className="doppelrand-inner p-8 flex flex-col gap-6 relative overflow-hidden bg-theme-surface/10 block active:bg-theme-surface/30 transition-colors">
                                                
                                                {/* Header */}
                                                <div className="flex flex-col gap-4 z-10 relative border-b border-theme-border/50 pb-6">
                                                    
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <span className="px-2.5 py-1 bg-theme-text/5 rounded-full border border-theme-border text-[9px] font-bold tracking-[0.2em] text-theme-text uppercase">
                                                                {log.category}
                                                            </span>
                                                            <span className="text-theme-text-muted text-[10px] tracking-widest uppercase font-bold">
                                                                {log.product} <span className="opacity-50">{log.version}</span>
                                                            </span>
                                                        </div>
                                                        <span className="text-[10px] font-mono tracking-widest text-theme-text-muted">{formattedDate}</span>
                                                    </div>

                                                    <h2 className="text-2xl font-black tracking-tight text-theme-text leading-tight line-clamp-2">
                                                        {log.title}
                                                    </h2>
                                                </div>

                                                {/* Description */}
                                                <div className="z-10 relative flex justify-between items-end gap-4">
                                                    <p className="text-theme-text-muted text-sm font-light leading-relaxed line-clamp-2 flex-1">
                                                        {log.description}
                                                    </p>
                                                    <div className="w-8 h-8 flex-shrink-0 rounded-full border border-theme-border flex items-center justify-center text-theme-text group-hover:bg-theme-primary group-hover:text-theme-bg transition-colors">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                                    </div>
                                                </div>

                                                {/* Massive Background Number */}
                                                <div className="absolute -bottom-8 -right-4 text-[8rem] leading-none font-black text-theme-text/5 pointer-events-none select-none">
                                                    {(idx + 1).toString().padStart(2, '0')}
                                                </div>
                                                
                                                {/* Top highlight line */}
                                                <div className="absolute top-0 left-0 w-full h-[2px] bg-theme-primary opacity-30 z-30 pointer-events-none"></div>
                                            </a>
                                        </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
