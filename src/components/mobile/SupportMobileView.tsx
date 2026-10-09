"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, ShieldAlert, Users, Shield, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';

export default function SupportMobileView() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <section className="py-24 relative min-h-screen">
            {/* Header */}
            <div className="px-6 mb-12">
                <div className="overflow-hidden">
                    <motion.h2 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl font-black tracking-tighter text-theme-text mb-4"
                    >
                        Support<br/>Network.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-theme-text-muted text-sm font-light leading-relaxed"
                    >
                        Access community forums, report anomalies, or initiate direct communication.
                    </motion.p>
                </div>
            </div>

            <div ref={ref} className="px-6 pb-24 flex flex-col gap-6">
                
                {/* 1. Large Feature Card: Report Issue */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                    className="doppelrand-outer group"
                >
                    <div className="doppelrand-inner p-8 flex flex-col relative overflow-hidden min-h-[400px]">
                        <div className="z-10 relative mb-6">
                            <div className="w-14 h-14 bg-theme-bg/50 backdrop-blur-md rounded-2xl flex items-center justify-center p-3 border border-theme-border shadow-sm mb-6 group-hover:border-theme-primary/50 transition-colors">
                                <ShieldAlert size={24} className="text-theme-text group-hover:text-theme-primary transition-colors" />
                            </div>
                            <h3 className="text-3xl font-bold tracking-tight text-theme-text mb-4">Report an Anomaly</h3>
                            <p className="text-theme-text-muted text-sm font-light mb-8">
                                Found a bug? Transmit diagnostic data directly through our web portal or bot.
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-4 mt-auto z-10 relative">
                            <Link href="/report" className="inline-flex items-center gap-3 doppelrand-outer p-1 rounded-full bg-transparent group/btn w-full">
                                <div className="h-full rounded-full px-6 py-4 bg-theme-primary border border-theme-primary text-black flex items-center justify-between font-bold uppercase tracking-widest text-[10px] w-full">
                                    <span>Web Report Portal</span>
                                    <ArrowRight size={12} className="text-black" />
                                </div>
                            </Link>
                            
                            <a 
                                href="https://t.me/UNIVORA_REPORTBOT" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 p-1 rounded-full bg-transparent group/btn w-full pl-2 mt-2"
                            >
                                <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] text-theme-text-muted hover:text-theme-text transition-colors">
                                    <span>@UNIVORA_REPORTBOT</span>
                                    <ExternalLink size={12} />
                                </div>
                            </a>
                        </div>
                        {/* Background watermark */}
                        <div className="absolute -bottom-10 -right-6 text-[10rem] leading-none font-black text-theme-text/5 pointer-events-none select-none">01</div>
                    </div>
                </motion.div>

                {/* 2. Community Group */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="doppelrand-outer group"
                >
                    <div className="doppelrand-inner p-8 flex flex-col relative overflow-hidden min-h-[300px]">
                        <div className="z-10 relative mb-6">
                            <div className="w-12 h-12 bg-theme-bg/50 backdrop-blur-md rounded-xl flex items-center justify-center p-2.5 border border-theme-border mb-6">
                                <Users size={20} className="text-theme-text" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-theme-text mb-3">Community Hub</h3>
                            <p className="text-theme-text-muted text-xs font-light">
                                Join the Telegram network for instant, crowd-sourced solutions.
                            </p>
                        </div>
                        <a 
                            href="https://t.me/+R1q6VftjGrozNDll" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="z-10 relative flex items-center gap-2 group/btn mt-auto"
                        >
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-text active:text-theme-primary transition-colors">Join Network</span>
                            <ArrowUpRight size={14} className="text-theme-text-muted group-hover/btn:text-theme-primary transition-colors" />
                        </a>
                        <div className="absolute -bottom-6 -right-4 text-[8rem] leading-none font-black text-theme-text/5 pointer-events-none select-none">02</div>
                    </div>
                </motion.div>

                {/* 3. Admin Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="doppelrand-outer group"
                >
                    <div className="doppelrand-inner p-8 flex flex-col relative overflow-hidden min-h-[300px]">
                        <div className="z-10 relative mb-6">
                            <div className="w-12 h-12 bg-theme-bg/50 backdrop-blur-md rounded-xl flex items-center justify-center p-2.5 border border-theme-border mb-6">
                                <Shield size={20} className="text-theme-text" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-theme-text mb-3">Direct Admin Line</h3>
                            <p className="text-theme-text-muted text-xs font-light mb-4">
                                Strictly for business inquiries or critical vulnerabilities.
                            </p>
                            <p className="text-theme-primary text-[9px] uppercase tracking-widest font-mono border-l border-theme-primary pl-2 py-1">
                                Delayed response expected.
                            </p>
                        </div>
                        <a 
                            href="https://t.me/ROLEX_SIIR" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="z-10 relative flex items-center gap-2 group/btn mt-auto"
                        >
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-text active:text-theme-primary transition-colors">Message @ROLEX_SIIR</span>
                            <MessageSquare size={14} className="text-theme-text-muted group-hover/btn:text-theme-primary ml-1 transition-colors" />
                        </a>
                        <div className="absolute -bottom-6 -right-4 text-[8rem] leading-none font-black text-theme-text/5 pointer-events-none select-none">03</div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
