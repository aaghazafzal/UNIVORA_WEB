"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, ShieldAlert, Users, Shield, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';

export default function SupportDesktopView() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-20 relative min-h-screen">
            {/* Header matches EcosystemDesktop */}
            <div className="max-w-[1400px] mx-auto px-8 lg:px-20 mb-20">
                <div className="overflow-hidden max-w-3xl">
                    <motion.h2 
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl font-black tracking-tighter text-theme-text mb-6"
                    >
                        Support Network.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-theme-text-muted text-lg font-light leading-relaxed max-w-xl"
                    >
                        Access community forums, report anomalies, or initiate direct communication with network administrators.
                    </motion.p>
                </div>
            </div>

            {/* Asymmetrical Bento Grid */}
            <div ref={ref} className="max-w-[1400px] mx-auto px-8 lg:px-20 grid grid-cols-12 gap-8 pb-32">
                
                {/* 1. Large Feature Card: Report Issue (Col-Span 7) */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                    className="col-span-12 lg:col-span-7 doppelrand-outer group h-[600px]"
                >
                    <div className="doppelrand-inner h-full p-12 flex flex-col justify-between relative overflow-hidden">
                        <div className="flex justify-between items-start z-10 relative">
                            <div className="w-16 h-16 bg-theme-bg/50 backdrop-blur-md rounded-2xl flex items-center justify-center p-3 border border-theme-border shadow-sm group-hover:border-theme-primary/50 transition-colors duration-500">
                                <ShieldAlert size={28} className="text-theme-text group-hover:text-theme-primary transition-colors duration-500" />
                            </div>
                        </div>
                        <div className="z-10 relative max-w-md">
                            <h3 className="text-4xl font-bold tracking-tight text-theme-text mb-4">Report an Anomaly</h3>
                            <p className="text-theme-text-muted text-lg font-light mb-10">
                                Found a bug or facing a technical glitch? Transmit diagnostic data directly through our web portal or use the dedicated reporting bot.
                            </p>
                            
                            <div className="flex flex-col gap-4">
                                <Link href="/report" className="inline-flex items-center gap-3 doppelrand-outer p-1 rounded-full bg-transparent hover:scale-[0.98] transition-awwwards group/btn w-fit">
                                    <div className="h-full rounded-full px-8 py-4 bg-theme-primary border border-theme-primary text-black flex items-center justify-between gap-6 font-bold uppercase tracking-widest text-[10px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] w-full">
                                        <span>Web Report Portal</span>
                                        <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center transition-awwwards group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px]">
                                            <ArrowRight size={12} className="text-black" />
                                        </div>
                                    </div>
                                </Link>
                                
                                <a 
                                    href="https://t.me/UNIVORA_REPORTBOT" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 p-1 rounded-full bg-transparent group/btn w-fit mt-2 ml-2"
                                >
                                    <div className="flex items-center gap-3 font-bold uppercase tracking-widest text-[10px] text-theme-text-muted group-hover/btn:text-theme-text transition-colors">
                                        <span>@UNIVORA_REPORTBOT</span>
                                        <ExternalLink size={12} />
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/* Background subtle watermark */}
                        <div className="absolute -bottom-10 -right-10 text-[15rem] leading-none font-black text-theme-text/5 pointer-events-none select-none transition-awwwards group-hover:text-theme-primary/5">01</div>
                    </div>
                </motion.div>

                {/* Vertical Stack (Col-Span 5) */}
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-8 h-[600px]">
                    
                    {/* 2. Community Group */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="doppelrand-outer group h-[calc(50%-16px)]"
                    >
                        <div className="doppelrand-inner h-full p-8 flex flex-col justify-between relative overflow-hidden">
                            <div className="z-10 relative">
                                <div className="w-12 h-12 bg-theme-bg/50 backdrop-blur-md rounded-xl flex items-center justify-center p-2.5 border border-theme-border mb-6 group-hover:border-theme-text transition-colors">
                                    <Users size={20} className="text-theme-text" />
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-theme-text mb-3">Community Hub</h3>
                                <p className="text-theme-text-muted text-sm font-light mb-8 max-w-[90%]">
                                    Join the Telegram network for instant, crowd-sourced solutions and moderator assistance.
                                </p>
                            </div>
                            <a 
                                href="https://t.me/+R1q6VftjGrozNDll" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="z-10 relative flex items-center gap-2 group/btn w-fit"
                            >
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-text group-hover/btn:text-theme-primary transition-colors">Join Network</span>
                                <ArrowUpRight size={14} className="text-theme-text-muted group-hover/btn:text-theme-primary group-hover/btn:translate-x-1 transition-awwwards" />
                            </a>
                            {/* Background subtle watermark */}
                            <div className="absolute -bottom-6 -right-6 text-[10rem] leading-none font-black text-theme-text/5 pointer-events-none select-none transition-awwwards group-hover:text-theme-text/10">02</div>
                        </div>
                    </motion.div>

                    {/* 3. Admin Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="doppelrand-outer group h-[calc(50%-16px)]"
                    >
                        <div className="doppelrand-inner h-full p-8 flex flex-col justify-between relative overflow-hidden">
                            <div className="z-10 relative">
                                <div className="w-12 h-12 bg-theme-bg/50 backdrop-blur-md rounded-xl flex items-center justify-center p-2.5 border border-theme-border mb-6">
                                    <Shield size={20} className="text-theme-text" />
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-theme-text mb-3">Direct Admin Line</h3>
                                <p className="text-theme-text-muted text-sm font-light mb-4 max-w-[90%]">
                                    Strictly for business inquiries or critical system vulnerabilities.
                                </p>
                                <p className="text-theme-primary text-[10px] uppercase tracking-widest font-mono">
                                    Note: Delayed response. Use community for general queries.
                                </p>
                            </div>
                            <a 
                                href="https://t.me/ROLEX_SIIR" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="z-10 relative flex items-center gap-2 group/btn mt-4 w-fit"
                            >
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-text group-hover/btn:text-theme-primary transition-colors">Message @ROLEX_SIIR</span>
                                <MessageSquare size={14} className="text-theme-text-muted group-hover/btn:text-theme-primary group-hover/btn:translate-x-1 transition-awwwards ml-1" />
                            </a>
                            {/* Background subtle watermark */}
                            <div className="absolute -bottom-6 -right-6 text-[10rem] leading-none font-black text-theme-text/5 pointer-events-none select-none transition-awwwards">03</div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
