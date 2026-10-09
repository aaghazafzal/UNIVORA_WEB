"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function MetricsDesktop() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-32 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-20 relative z-10" ref={ref}>
                
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full doppelrand-outer"
                >
                    <div className="doppelrand-inner p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
                        
                        {/* Background Data Mesh */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-30">
                            <div className="w-[800px] h-[800px] bg-theme-primary/10 rounded-full blur-[100px]" />
                        </div>

                        {/* Pulsating Indicator */}
                        <div className="relative z-10 flex items-center justify-center gap-3 mb-12">
                            <div className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-theme-primary"></span>
                            </div>
                            <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-theme-primary">Global Network Active</span>
                        </div>

                        <div className="z-10 relative mb-16">
                            <h2 className="text-[5rem] md:text-[8rem] font-black tracking-tighter leading-none text-theme-text mb-4">
                                4.2M+
                            </h2>
                            <p className="text-xl md:text-3xl font-light text-theme-text-muted tracking-tight">
                                Autonomous Node Operations
                            </p>
                        </div>

                        <div className="z-10 relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 w-full border-t border-theme-border/50 pt-16 mt-4">
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-bold text-theme-text mb-2">99.99%</span>
                                <span className="text-[10px] uppercase tracking-widest text-theme-text-muted font-bold">Uptime Target</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-bold text-theme-text mb-2">&lt; 15ms</span>
                                <span className="text-[10px] uppercase tracking-widest text-theme-text-muted font-bold">Edge Latency</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-bold text-theme-text mb-2">256-bit</span>
                                <span className="text-[10px] uppercase tracking-widest text-theme-text-muted font-bold">Encryption Layer</span>
                            </div>
                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}
