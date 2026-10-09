"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Grid, Bot, Code } from 'lucide-react';
import Link from 'next/link';

const CARDS = [
    { id: 'apps', title: 'Web Apps', desc: 'Consumer-grade experiences.', icon: Grid },
    { id: 'bots', title: 'Automation', desc: 'Discord & Telegram bots.', icon: Bot },
    { id: 'dev', title: 'Developer Tooling', desc: 'APIs, SDKs, and open-source.', icon: Code }
];

const SLOTS = [
    { y: -100, scale: 0.85, rotate: -8, zIndex: 10, bgOpacity: 0.4 },
    { y: -30, scale: 0.95, rotate: 0, zIndex: 20, bgOpacity: 0.6 },
    { y: 50, scale: 1.05, rotate: 6, zIndex: 30, bgOpacity: 0.9 }
];

export default function HeroMobile() {
    const [order, setOrder] = useState([0, 1, 2]);

    const handleCardClick = (clickedIdx: number) => {
        setOrder(prev => {
            if (prev[2] === clickedIdx) return prev; // already front
            const newOrder = prev.filter(i => i !== clickedIdx);
            newOrder.push(clickedIdx);
            return newOrder;
        });
    };

    return (
        <section className="relative min-h-[90dvh] flex flex-col justify-center overflow-hidden py-12">
            <div className="px-6 w-full relative z-10 flex flex-col items-center text-center">
                
                <div className="overflow-hidden mb-4 mt-4 pb-6">
                    <motion.h1 
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[3.5rem] font-black tracking-tighter leading-[0.9] text-theme-text"
                    >
                        Orchestrate
                        <br />
                        <span className="text-theme-text-muted">Everything.</span>
                    </motion.h1>
                </div>
                
                <div className="overflow-hidden mb-10">
                    <motion.p 
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="text-base font-light tracking-tight text-theme-text-muted leading-relaxed max-w-[280px] mx-auto"
                    >
                        The singular hub for your entire digital ecosystem.
                    </motion.p>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex justify-center mb-16"
                >
                    <Link href="#apps" className="group flex items-center gap-2 doppelrand-outer rounded-full p-1 transition-awwwards active:scale-[0.98] w-full max-w-[300px]">
                        <div className="w-full h-full rounded-full px-6 py-4 bg-theme-primary border border-theme-primary text-theme-bg flex items-center justify-between gap-3 font-bold uppercase tracking-widest text-[11px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                            Initialize Network
                            <div className="w-8 h-8 rounded-full bg-theme-bg/20 flex items-center justify-center transition-awwwards group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                                <ArrowUpRight size={14} className="text-theme-bg" />
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Mobile-Specific Premium Feature: Glassmorphism App Stack (Interactive) */}
                <div className="w-full relative h-[320px] flex justify-center items-center">
                    


                    <AnimatePresence>
                        {CARDS.map((card, idx) => {
                            const slotIdx = order.indexOf(idx);
                            const slot = SLOTS[slotIdx];
                            const Icon = card.icon;

                            return (
                                <motion.div 
                                    key={card.id}
                                    onClick={() => handleCardClick(idx)}
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ 
                                        opacity: 1, 
                                        y: slot.y, 
                                        rotate: slot.rotate, 
                                        scale: slot.scale, 
                                        zIndex: slot.zIndex 
                                    }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute doppelrand-outer w-[280px] cursor-pointer"
                                >
                                    <div 
                                        className="doppelrand-inner h-[160px] p-6 flex flex-col justify-between shadow-2xl backdrop-blur-2xl transition-colors duration-500"
                                        style={{ backgroundColor: `rgba(var(--color-bg), ${slot.bgOpacity})` }}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="w-10 h-10 bg-theme-text/5 rounded-xl flex items-center justify-center border border-theme-border/50">
                                                <Icon size={18} className="text-theme-text" />
                                            </div>
                                            {slotIdx === 2 && (
                                                <div className="px-2 py-1 bg-theme-primary/10 rounded font-bold text-[8px] text-theme-primary uppercase tracking-widest border border-theme-primary/20">
                                                    Active
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-xl font-black text-theme-text tracking-tight mb-1">{card.title}</h3>
                                            <p className="text-theme-text-muted text-[10px] font-bold uppercase tracking-widest">{card.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
