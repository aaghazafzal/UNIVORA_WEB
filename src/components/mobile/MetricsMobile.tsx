"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function MetricsMobile() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="px-6 relative z-10" ref={ref}>
                
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full doppelrand-outer"
                >
                    <div className="doppelrand-inner p-8 relative overflow-hidden flex flex-col items-center text-center">
                        
                        {/* Background Data Mesh */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-30">
                            <div className="w-[400px] h-[400px] bg-theme-primary/10 rounded-full blur-[80px]" />
                        </div>

                        {/* Pulsating Indicator */}
                        <div className="relative z-10 flex items-center justify-center gap-2 mb-8">
                            <div className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-theme-primary"></span>
                            </div>
                            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-theme-primary">Global Network Active</span>
                        </div>

                        <div className="z-10 relative mb-10">
                            <h2 className="text-[3.5rem] font-black tracking-tighter leading-none text-theme-text mb-2">
                                4.2M+
                            </h2>
                            <p className="text-sm font-light text-theme-text-muted tracking-tight">
                                Autonomous Node Operations
                            </p>
                        </div>

                        <div className="z-10 relative grid grid-cols-2 gap-y-8 gap-x-4 w-full border-t border-theme-border/50 pt-8">
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-theme-text mb-1">99.99%</span>
                                <span className="text-[8px] uppercase tracking-widest text-theme-text-muted font-bold">Uptime Target</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-theme-text mb-1">&lt; 15ms</span>
                                <span className="text-[8px] uppercase tracking-widest text-theme-text-muted font-bold">Edge Latency</span>
                            </div>
                            <div className="flex flex-col items-center col-span-2 mt-2">
                                <span className="text-2xl font-bold text-theme-text mb-1">256-bit</span>
                                <span className="text-[8px] uppercase tracking-widest text-theme-text-muted font-bold">Encryption Layer</span>
                            </div>
                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}
