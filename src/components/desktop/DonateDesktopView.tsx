"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Database, Globe, Bot, QrCode, Copy, Check, ArrowUpRight, Github, Coffee, Bitcoin, ShieldCheck, X } from 'lucide-react';

export default function DonateDesktopView() {
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
        <section className="py-32 relative min-h-screen">
            <div className="max-w-[1200px] mx-auto px-8 relative z-10">
                {/* Header */}
                <div className="mb-24">
                    <motion.h1 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-7xl font-black tracking-tighter text-theme-text mb-6 leading-none"
                    >
                        Fuel the <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-primary/50">Ecosystem.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-xl text-theme-text-muted font-light max-w-2xl leading-relaxed"
                    >
                        Univora operates independently. Consider reinforcing our nodes to sustain uninterrupted operations and scale our infrastructure.
                    </motion.p>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    
                    {/* 1. The Reactor (Cost Allocation) */}
                    <div className="col-span-12 lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="doppelrand-outer group h-full"
                        >
                            <div className="doppelrand-inner p-12 flex flex-col h-full relative overflow-hidden">
                                <div className="z-10 relative mb-12">
                                    <div className="w-14 h-14 bg-theme-bg/50 backdrop-blur-md rounded-2xl flex items-center justify-center p-3 border border-theme-border shadow-sm mb-6">
                                        <Server size={24} className="text-theme-text" />
                                    </div>
                                    <h3 className="text-3xl font-bold tracking-tight text-theme-text mb-2">System Load</h3>
                                    <p className="text-theme-text-muted text-sm font-light">Transparent allocation of all capital.</p>
                                </div>
                                
                                <div className="space-y-8 z-10 relative flex-1">
                                    {allocations.map((item, i) => (
                                        <div key={i} className="group/bar relative">
                                            <div className="flex justify-between items-end mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="text-theme-text-muted"><item.icon size={16} /></div>
                                                    <span className="text-theme-text font-mono text-xs tracking-widest uppercase">{item.name}</span>
                                                </div>
                                                <span className="text-theme-text font-mono text-xs">{item.percent}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-theme-text/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${item.percent}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, delay: 0.4 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                                                    className={`h-full ${item.color} relative overflow-hidden`}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute -bottom-10 -right-8 text-[12rem] leading-none font-black text-theme-text/5 pointer-events-none select-none uppercase">BURN</div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
                        {/* 2. Direct UPI Node */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="doppelrand-outer group flex-1"
                        >
                            <div className="doppelrand-inner p-10 flex flex-col h-full relative overflow-hidden">
                                <div className="z-10 relative flex justify-between items-start mb-10">
                                    <div>
                                        <div className="w-12 h-12 bg-theme-bg/50 backdrop-blur-md rounded-xl flex items-center justify-center border border-theme-border mb-6">
                                            <QrCode size={20} className="text-theme-text" />
                                        </div>
                                        <h3 className="text-2xl font-bold tracking-tight text-theme-text mb-2">Direct UPI</h3>
                                        <p className="text-theme-text-muted text-xs font-mono tracking-widest uppercase">Zero Platform Fees</p>
                                    </div>
                                    <div 
                                        className="w-20 h-20 bg-white p-1.5 rounded-xl shadow-xl relative overflow-hidden flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                                        onClick={() => setShowQR(true)}
                                    >
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=yourname@upi&pn=Univora" alt="UPI" className="w-full h-full object-contain mix-blend-multiply" />
                                        <div className="absolute inset-0 bg-theme-primary/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                                            <ArrowUpRight size={18} className="text-theme-bg" />
                                        </div>
                                    </div>
                                </div>

                                <div className="z-10 relative mt-auto">
                                    <div className="flex items-center justify-between border border-theme-border bg-theme-bg/50 backdrop-blur-md p-1.5 pl-5 rounded-xl group/copy hover:border-theme-primary/50 transition-colors cursor-pointer" onClick={handleCopy}>
                                        <span className="font-mono text-sm text-theme-text tracking-wider">yourname@upi</span>
                                        <button className="w-12 h-12 flex items-center justify-center bg-theme-text/5 hover:bg-theme-primary hover:text-black rounded-lg transition-colors">
                                            {isCopied ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="absolute -bottom-8 -right-6 text-[8rem] leading-none font-black text-theme-text/5 pointer-events-none select-none">01</div>
                            </div>
                        </motion.div>

                        {/* 3. Global Nodes */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="doppelrand-outer group flex-1"
                        >
                            <div className="doppelrand-inner p-10 flex flex-col relative overflow-hidden">
                                <div className="z-10 relative mb-8">
                                    <h3 className="text-2xl font-bold tracking-tight text-theme-text mb-2">Global Nodes</h3>
                                    <p className="text-theme-text-muted text-xs font-mono tracking-widest uppercase">International Support</p>
                                </div>
                                
                                <div className="z-10 relative flex flex-col gap-4">
                                    <a href="#" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-xl border border-theme-border bg-theme-bg/50 hover:border-theme-text transition-colors">
                                        <div className="flex items-center gap-4">
                                            <Github size={16} className="text-theme-text" />
                                            <span className="text-xs font-bold tracking-widest uppercase text-theme-text">GitHub Sponsors</span>
                                        </div>
                                        <ArrowUpRight size={16} className="text-theme-text-muted" />
                                    </a>
                                    <a href="#" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-xl border border-theme-border bg-theme-bg/50 hover:border-[#FFDD00] hover:text-[#FFDD00] transition-colors">
                                        <div className="flex items-center gap-4">
                                            <Coffee size={16} />
                                            <span className="text-xs font-bold tracking-widest uppercase">Buy Me a Coffee</span>
                                        </div>
                                        <ArrowUpRight size={16} className="text-theme-text-muted" />
                                    </a>
                                    <a href="#" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-xl border border-theme-border bg-theme-bg/50 hover:border-[#F7931A] hover:text-[#F7931A] transition-colors">
                                        <div className="flex items-center gap-4">
                                            <Bitcoin size={16} />
                                            <span className="text-xs font-bold tracking-widest uppercase">Crypto Wallet</span>
                                        </div>
                                        <ArrowUpRight size={16} className="text-theme-text-muted" />
                                    </a>
                                </div>
                                <div className="absolute -bottom-8 -right-6 text-[8rem] leading-none font-black text-theme-text/5 pointer-events-none select-none">02</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Disclaimer Footer Band */}
                    <div className="col-span-12 mt-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="doppelrand-outer"
                        >
                            <div className="doppelrand-inner p-8 flex items-center gap-8 border-theme-primary/20 bg-theme-primary/5">
                                <div className="w-12 h-12 shrink-0 rounded-full border border-theme-primary/30 flex items-center justify-center text-theme-primary shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.2)]">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h4 className="text-theme-text font-bold text-lg mb-1">Support is completely optional.</h4>
                                    <p className="text-theme-text-muted text-sm leading-relaxed max-w-4xl">
                                        Univora's core philosophy is accessibility. All public tools, bots, and platforms will remain <strong className="text-theme-text">free to use</strong> regardless of your ability to contribute.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* QR Code Modal */}
            <AnimatePresence>
                {showQR && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-theme-bg/90 backdrop-blur-xl"
                        onClick={() => setShowQR(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="w-full max-w-md doppelrand-outer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="doppelrand-inner p-10 flex flex-col items-center relative overflow-hidden">
                                <button 
                                    onClick={() => setShowQR(false)}
                                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-theme-text/5 hover:bg-theme-text/10 rounded-full transition-colors z-20"
                                >
                                    <X size={20} />
                                </button>
                                
                                <div className="w-16 h-16 bg-theme-bg/50 backdrop-blur-md rounded-2xl flex items-center justify-center border border-theme-border mb-6 z-10">
                                    <QrCode size={28} className="text-theme-primary" />
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-theme-text mb-2 z-10">Direct UPI Scan</h3>
                                <p className="text-theme-text-muted text-sm mb-10 text-center z-10">Scan with any UPI app like GPay, PhonePe or Paytm.</p>
                                
                                <div className="w-64 h-64 bg-white p-6 rounded-3xl shadow-2xl mb-10 z-10">
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=upi://pay?pa=yourname@upi&pn=Univora" alt="UPI" className="w-full h-full object-contain mix-blend-multiply" />
                                </div>

                                <div className="w-full flex items-center justify-between border border-theme-border bg-theme-bg/50 backdrop-blur-md p-2 pl-6 rounded-xl group/copy hover:border-theme-primary/50 transition-colors cursor-pointer z-10" onClick={handleCopy}>
                                    <span className="font-mono text-sm text-theme-text tracking-wider">yourname@upi</span>
                                    <button className="h-12 px-6 flex items-center justify-center bg-theme-primary text-black rounded-lg transition-colors font-bold uppercase tracking-widest text-xs gap-3">
                                        {isCopied ? (
                                            <><Check size={16} /> Copied</>
                                        ) : (
                                            <><Copy size={16} /> Copy ID</>
                                        )}
                                    </button>
                                </div>

                                <div className="absolute -bottom-12 -right-6 text-[12rem] leading-none font-black text-theme-text/5 pointer-events-none select-none">UPI</div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
