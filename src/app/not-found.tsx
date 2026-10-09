"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function NotFound() {
    return (
        <div className="w-full flex flex-col min-h-screen bg-theme-bg text-theme-text selection:bg-theme-primary selection:text-theme-bg">
            <main className="flex-grow flex items-center justify-center relative overflow-hidden px-5 py-24 md:py-32">
                {/* Background decorative elements - Radar Sweeps */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.15] md:opacity-20 flex items-center justify-center">
                    <motion.div 
                        className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] border border-theme-primary/40 rounded-full"
                        animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                        className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] border border-theme-primary/30 rounded-full"
                        animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                    />
                    <motion.div 
                        className="absolute w-[400px] h-[400px] md:w-[800px] md:h-[800px] border border-theme-primary/20 rounded-full"
                        animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
                    />
                </div>

                {/* Animated Grid Background */}
                <div className="absolute inset-0 pointer-events-none z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(var(--color-primary-rgb) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary-rgb) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center">
                    
                    {/* System Error Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-amber-500 uppercase doppelrand-outer"
                    >
                        <div className="doppelrand-inner flex items-center gap-2 px-2 py-0.5">
                            <AlertTriangle size={14} /> SYSTEM_ERROR: 404
                        </div>
                    </motion.div>

                    {/* Massive Glitch 404 Text */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                        className="relative mb-8"
                    >
                        <h1 className="text-[140px] md:text-[240px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-theme-text to-theme-text-muted/10 leading-none select-none">
                            404
                        </h1>
                        {/* Glitch Overlay */}
                        <motion.div 
                            className="absolute inset-0 flex items-center justify-center opacity-0 text-theme-primary mix-blend-overlay"
                            animate={{ 
                                opacity: [0, 0.8, 0, 0.5, 0, 0.9, 0], 
                                x: [0, -10, 10, -5, 5, -15, 0],
                                skewX: [0, -10, 10, 0, 0, -20, 0]
                            }}
                            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 4 }}
                        >
                            <h1 className="text-[140px] md:text-[240px] font-black tracking-tighter leading-none select-none">
                                404
                            </h1>
                        </motion.div>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-theme-text mb-6 tracking-tight">
                            Sector Not Found
                        </h2>
                        <p className="text-[15px] md:text-lg text-theme-text-muted font-light max-w-md mx-auto leading-relaxed px-4">
                            The coordinates you provided do not exist in the Univora ecosystem. The sector may have been deleted, or the signal was lost in transit.
                        </p>
                    </motion.div>

                    {/* Return Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link href="/">
                            <div className="group inline-flex items-center gap-2 doppelrand-outer rounded-full p-1 transition-awwwards active:scale-[0.98] cursor-pointer">
                                <div className="h-full rounded-full px-8 py-5 flex items-center gap-4 font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] bg-theme-primary border border-theme-primary text-theme-bg group-hover:opacity-90">
                                    <ArrowLeft size={16} className="text-theme-bg" />
                                    Return to Hub
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center transition-awwwards bg-theme-bg/20 group-hover:scale-110">
                                        <Terminal size={14} className="text-theme-bg" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
