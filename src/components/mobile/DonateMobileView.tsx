"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Server, Database, Globe, Bot, QrCode, Copy, Check, ArrowUpRight, Github, Coffee, Bitcoin, ShieldCheck, X } from 'lucide-react';

export default function DonateMobileView() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [isCopied, setIsCopied] = useState(false);
    const [showQR, setShowQR] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('yourname@upi');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const allocations = [
        { name: 'Hosting & Compute', percent: 50, icon: Server, color: 'bg-theme-primary' },
        { name: 'Database & Storage', percent: 25, icon: Database, color: 'bg-[#229ED9]' },
        { name: 'CDN & Security', percent: 15, icon: Globe, color: 'bg-emerald-400' },
        { name: 'AI Models API', percent: 10, icon: Bot, color: 'bg-purple-400' },
    ];

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
                        className="text-5xl font-black tracking-tighter text-theme-text mb-4"
                    >
                        Fuel the<br/>Ecosystem.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-theme-text-muted text-sm font-light leading-relaxed"
                    >
                        Univora operates independently. Consider reinforcing our nodes to sustain uninterrupted operations.
                    </motion.p>
                </div>
            </div>

            <div ref={ref} className="px-6 pb-24 flex flex-col gap-6">
                
                {/* 1. The Reactor (Cost Allocation) */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                    className="doppelrand-outer group"
                >
                    <div className="doppelrand-inner p-8 flex flex-col relative overflow-hidden">
                        <div className="z-10 relative mb-8">
                            <div className="w-12 h-12 bg-theme-bg/50 backdrop-blur-md rounded-xl flex items-center justify-center p-2.5 border border-theme-border shadow-sm mb-6">
                                <Server size={20} className="text-theme-text" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-theme-text mb-2">System Load</h3>
                            <p className="text-theme-text-muted text-xs font-light">Transparent allocation of all capital.</p>
                        </div>
                        
                        <div className="space-y-6 z-10 relative">
                            {allocations.map((item, i) => (
                                <div key={i} className="group/bar relative">
                                    <div className="flex justify-between items-end mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="text-theme-text-muted"><item.icon size={12} /></div>
                                            <span className="text-theme-text font-mono text-[10px] tracking-widest uppercase">{item.name}</span>
                                        </div>
                                        <span className="text-theme-text font-mono text-[10px]">{item.percent}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-theme-text/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.percent}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                                            className={`h-full ${item.color} relative overflow-hidden`}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="absolute -bottom-8 -right-6 text-[8rem] leading-none font-black text-theme-text/5 pointer-events-none select-none uppercase">BURN</div>
                    </div>
                </motion.div>

                {/* 2. Direct UPI Node */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="doppelrand-outer group"
                >
                    <div className="doppelrand-inner p-8 flex flex-col relative overflow-hidden">
                        <div className="z-10 relative flex justify-between items-start mb-8">
                            <div>
                                <div className="w-10 h-10 bg-theme-bg/50 backdrop-blur-md rounded-xl flex items-center justify-center border border-theme-border mb-4">
                                    <QrCode size={18} className="text-theme-text" />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-theme-text mb-1">Direct UPI</h3>
                                <p className="text-theme-text-muted text-[9px] font-mono tracking-widest uppercase">Zero Platform Fees</p>
                            </div>
                            <div 
                                className="w-16 h-16 bg-white p-1 rounded-xl shadow-xl relative overflow-hidden flex-shrink-0 cursor-pointer active:scale-95 transition-transform"
                                onClick={() => setShowQR(true)}
                            >
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=upi://pay?pa=yourname@upi&pn=Univora" alt="UPI" className="w-full h-full object-contain mix-blend-multiply" />
                                <div className="absolute inset-0 bg-theme-primary/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                                    <ArrowUpRight size={14} className="text-theme-bg" />
                                </div>
                            </div>
                        </div>

                        <div className="z-10 relative">
                            <div className="flex items-center justify-between border border-theme-border bg-theme-bg/50 backdrop-blur-md p-1 pl-4 rounded-xl group/copy active:border-theme-primary/50 transition-colors cursor-pointer" onClick={handleCopy}>
                                <span className="font-mono text-xs text-theme-text tracking-wider">yourname@upi</span>
                                <button className="w-10 h-10 flex items-center justify-center bg-theme-text/5 hover:bg-theme-primary hover:text-black rounded-lg transition-colors">
                                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-4 text-[6rem] leading-none font-black text-theme-text/5 pointer-events-none select-none">01</div>
                    </div>
                </motion.div>

                {/* 3. Global Nodes */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="doppelrand-outer group"
                >
                    <div className="doppelrand-inner p-8 flex flex-col relative overflow-hidden">
                        <div className="z-10 relative mb-6">
                            <h3 className="text-xl font-bold tracking-tight text-theme-text mb-1">Global Nodes</h3>
                            <p className="text-theme-text-muted text-[9px] font-mono tracking-widest uppercase">International Support</p>
                        </div>
                        
                        <div className="z-10 relative flex flex-col gap-3">
                            <a href="#" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-theme-border bg-theme-bg/50 active:border-theme-text transition-colors">
                                <div className="flex items-center gap-3">
                                    <Github size={14} className="text-theme-text" />
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-theme-text">GitHub Sponsors</span>
                                </div>
                                <ArrowUpRight size={14} className="text-theme-text-muted" />
                            </a>
                            <a href="#" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-theme-border bg-theme-bg/50 active:border-[#FFDD00] active:text-[#FFDD00] transition-colors">
                                <div className="flex items-center gap-3">
                                    <Coffee size={14} />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Buy Me a Coffee</span>
                                </div>
                                <ArrowUpRight size={14} className="text-theme-text-muted" />
                            </a>
                            <a href="#" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl border border-theme-border bg-theme-bg/50 active:border-[#F7931A] active:text-[#F7931A] transition-colors">
                                <div className="flex items-center gap-3">
                                    <Bitcoin size={14} />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Crypto Wallet</span>
                                </div>
                                <ArrowUpRight size={14} className="text-theme-text-muted" />
                            </a>
                        </div>
                        <div className="absolute -bottom-6 -right-4 text-[6rem] leading-none font-black text-theme-text/5 pointer-events-none select-none">02</div>
                    </div>
                </motion.div>

                {/* Disclaimer Footer Band */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="doppelrand-outer mt-4"
                >
                    <div className="doppelrand-inner p-6 flex flex-col gap-4 border-theme-primary/20 bg-theme-primary/5">
                        <div className="w-10 h-10 rounded-full border border-theme-primary/30 flex items-center justify-center text-theme-primary shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.2)]">
                            <ShieldCheck size={16} />
                        </div>
                        <div>
                            <h4 className="text-theme-text font-bold text-base mb-2">Support is completely optional.</h4>
                            <p className="text-theme-text-muted text-xs leading-relaxed">
                                Univora's core philosophy is accessibility. All public tools, bots, and platforms will remain <strong className="text-theme-text">free to use</strong> regardless of your ability to contribute.
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* QR Code Modal */}
            <AnimatePresence>
                {showQR && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-theme-bg/90 backdrop-blur-xl"
                        onClick={() => setShowQR(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="w-full max-w-sm doppelrand-outer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="doppelrand-inner p-6 flex flex-col items-center relative overflow-hidden">
                                <button 
                                    onClick={() => setShowQR(false)}
                                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-theme-text/5 active:bg-theme-text/10 rounded-full transition-colors z-20"
                                >
                                    <X size={16} />
                                </button>
                                
                                <div className="w-12 h-12 bg-theme-bg/50 backdrop-blur-md rounded-xl flex items-center justify-center border border-theme-border mb-4 z-10">
                                    <QrCode size={20} className="text-theme-primary" />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-theme-text mb-1 z-10">Direct UPI Scan</h3>
                                <p className="text-theme-text-muted text-xs mb-8 text-center z-10">Scan with any UPI app.</p>
                                
                                <div className="w-56 h-56 bg-white p-4 rounded-2xl shadow-2xl mb-8 z-10">
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=yourname@upi&pn=Univora" alt="UPI" className="w-full h-full object-contain mix-blend-multiply" />
                                </div>

                                <div className="w-full flex items-center justify-between border border-theme-border bg-theme-bg/50 backdrop-blur-md p-1 pl-4 rounded-xl group/copy active:border-theme-primary/50 transition-colors cursor-pointer z-10" onClick={handleCopy}>
                                    <span className="font-mono text-xs text-theme-text tracking-wider">yourname@upi</span>
                                    <button className="w-10 h-10 flex items-center justify-center bg-theme-primary text-black rounded-lg transition-colors font-bold uppercase tracking-widest text-[9px] gap-2">
                                        {isCopied ? <Check size={12} /> : <Copy size={12} />}
                                    </button>
                                </div>

                                <div className="absolute -bottom-10 -right-4 text-[10rem] leading-none font-black text-theme-text/5 pointer-events-none select-none">UPI</div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
