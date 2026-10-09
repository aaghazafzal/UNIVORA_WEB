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
    { x: -140, y: -140, rotate: -10, scale: 0.9, zIndex: 10 },
    { x: 160, y: -50, rotate: 8, scale: 0.95, zIndex: 20 },
    { x: -50, y: 100, rotate: -4, scale: 1.05, zIndex: 30 }
];

export default function HeroDesktop() {
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
        <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-32 pb-20">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-20 w-full relative z-10 grid grid-cols-12 gap-16 items-center">
                
                {/* Left Column: Editorial Typography */}
                <div className="col-span-12 lg:col-span-6 flex flex-col items-start text-left">
                    <div className="overflow-hidden mb-6 mt-4 pb-6">
                        <motion.h1 
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[5rem] xl:text-[7rem] font-black tracking-tighter leading-[0.9] text-theme-text"
                        >
                            Orchestrate
                            <br />
                            <span className="text-theme-text-muted">Everything.</span>
                        </motion.h1>
                    </div>
                    
                    <div className="overflow-hidden mb-16 max-w-lg">
                        <motion.p 
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="text-xl xl:text-2xl font-light tracking-tight text-theme-text-muted leading-relaxed"
                        >
                            The singular hub for your entire digital ecosystem. Instantly access web applications, AI automation bots, and developer documentation from one central command matrix.
                        </motion.p>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link href="#apps" className="group flex items-center gap-2 doppelrand-outer rounded-full p-1 transition-awwwards active:scale-[0.98] cursor-pointer w-fit">
                            <div className="h-full rounded-full px-8 py-5 bg-theme-primary border border-theme-primary text-theme-bg flex items-center gap-4 font-bold uppercase tracking-widest text-xs shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                                Initialize Network
                                <div className="w-8 h-8 rounded-full bg-theme-bg/20 flex items-center justify-center transition-awwwards group-hover:translate-x-1.5 group-hover:-translate-y-[1px]">
                                    <ArrowUpRight size={14} className="text-theme-bg" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Right Column: Interactive Z-Axis Cascade */}
                <div className="col-span-12 lg:col-span-6 relative h-[600px] hidden lg:flex items-center justify-center">
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
                                        x: slot.x, 
                                        y: slot.y, 
                                        rotate: slot.rotate, 
                                        scale: slot.scale, 
                                        zIndex: slot.zIndex 
                                    }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute w-[340px] doppelrand-outer shadow-2xl cursor-pointer group"
                                >
                                    <div className="doppelrand-inner h-[240px] p-8 flex flex-col justify-between transition-colors group-hover:border-theme-primary/30 group-hover:bg-theme-bg/90">
                                        <div className="w-12 h-12 bg-theme-bg/50 backdrop-blur-md rounded-xl flex items-center justify-center p-2.5 border border-theme-border group-hover:border-theme-primary/50 transition-colors">
                                            <Icon size={20} className="text-theme-text group-hover:text-theme-primary transition-colors" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-theme-text tracking-tight mb-2 group-hover:text-theme-primary transition-colors">{card.title}</h3>
                                            <p className="text-theme-text-muted text-sm font-light">{card.desc}</p>
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
