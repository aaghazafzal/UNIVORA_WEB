"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function SupportSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-20 relative">
            <div className="max-w-[1000px] mx-auto px-8 lg:px-20 text-center" ref={ref}>
                
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-block px-3 py-1 rounded-full bg-theme-text/5 border border-theme-border text-[10px] uppercase tracking-[0.2em] font-medium text-theme-text mb-8">
                        The Mission
                    </div>
                </motion.div>

                <motion.h2 
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl font-black tracking-tighter text-theme-text mb-10 leading-tight"
                >
                    Independent <br className="hidden md:block" /> By Design.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl md:text-2xl font-light text-theme-text-muted mb-16 max-w-2xl mx-auto leading-relaxed tracking-tight"
                >
                    UNIVORA is architected and sustained by a single developer. No venture capital, no external constraints. Just pure, uncompromised engineering.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex justify-center"
                >
                    <Link href="/donate" className="group flex items-center gap-2 doppelrand-outer p-1 rounded-full hover:scale-[0.98] transition-awwwards w-fit">
                        <div className="h-full rounded-full px-8 py-4 bg-theme-primary text-theme-bg flex items-center gap-4 font-bold uppercase tracking-widest text-[11px] border-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                            Contribute to the Build
                        </div>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
