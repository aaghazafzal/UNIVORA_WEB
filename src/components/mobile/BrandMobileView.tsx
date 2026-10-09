"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Droplet, Type, Box, Layers } from 'lucide-react';

export default function BrandMobileView() {
    return (
        <main className="relative pt-24 pb-24 min-h-screen selection:bg-theme-primary selection:text-theme-bg overflow-x-hidden">
            <div className="px-5 relative z-10">
                
                {/* Hero Section */}
                <div className="mb-16 text-center">
                    <h1 className="text-5xl font-black tracking-tighter text-theme-text mb-4 leading-tight">
                        Brand<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-primary/50">Guidelines</span>
                    </h1>
                    <p className="text-[15px] text-theme-text-muted font-light leading-relaxed px-2 mb-8">
                        Our identity is built on precision, fluidity, and the "Vault/Armory" aesthetic.
                    </p>
                    
                    <button className="group relative doppelrand-outer p-1 rounded-full w-full">
                        <div className="doppelrand-inner py-4 text-theme-text group-hover:text-theme-primary transition-colors flex justify-center items-center gap-3 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg">
                            <Download size={14} className="text-theme-text group-hover:text-theme-primary transition-colors" />
                            Download Kit (ZIP)
                        </div>
                    </button>
                </div>

                <div className="flex flex-col gap-6">
                    
                    {/* The Logo Section */}
                    <div className="doppelrand-outer rounded-2xl">
                        <div className="doppelrand-inner bg-theme-surface/10 p-6 flex flex-col gap-6">
                            <div>
                                <h2 className="text-2xl font-black text-theme-text tracking-tight mb-3">The Logo</h2>
                                <p className="text-theme-text-muted text-[13px] leading-relaxed font-light mb-4">
                                    The Univora mark represents an impenetrable vault. Always ensure breathing room. Never stretch or distort it.
                                </p>
                            </div>
                            
                            <div className="w-full aspect-video bg-theme-bg border border-theme-border/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(var(--color-text-rgb) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-rgb) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
                                <img src="/logos/png-logos/univora.png" alt="Univora Logo" className="w-16 h-16 logo-adaptive relative z-10 drop-shadow-xl" />
                            </div>
                        </div>
                    </div>

                    {/* Typography Section */}
                    <div className="doppelrand-outer rounded-2xl">
                        <div className="doppelrand-inner bg-theme-surface/10 p-6 flex flex-col">
                            <div className="flex items-center gap-2 text-theme-primary mb-4">
                                <Type size={16} />
                                <h2 className="text-xl font-black tracking-tight text-theme-text">Typography</h2>
                            </div>
                            <p className="text-theme-text-muted font-light mb-6 text-[13px] leading-relaxed">
                                Our typographic system is built on high contrast. Geometric sans-serif for impact, and monospace for data.
                            </p>
                            
                            <div className="flex flex-col gap-4 mt-auto">
                                <div className="bg-theme-bg p-5 rounded-xl border border-theme-border/30">
                                    <div className="text-[9px] font-bold tracking-[0.2em] text-theme-text-muted uppercase mb-3">Primary Display</div>
                                    <div className="text-4xl font-black text-theme-text tracking-tighter">Inter</div>
                                </div>
                                <div className="bg-theme-bg p-5 rounded-xl border border-theme-border/30">
                                    <div className="text-[9px] font-bold tracking-[0.2em] text-theme-text-muted uppercase mb-3">System / Monospace</div>
                                    <div className="text-2xl font-mono text-theme-text">JetBrains</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Color System Section */}
                    <div className="doppelrand-outer rounded-2xl">
                        <div className="doppelrand-inner bg-theme-surface/10 p-6 flex flex-col">
                            <div className="flex items-center gap-2 text-theme-primary mb-4">
                                <Droplet size={16} />
                                <h2 className="text-xl font-black tracking-tight text-theme-text">Theme Engine</h2>
                            </div>
                            <p className="text-theme-text-muted font-light mb-6 text-[13px] leading-relaxed">
                                Univora adapts through a proprietary Theme Engine. The primary color dynamically shifts the ecosystem's aura.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-3 mt-auto">
                                {[
                                    { name: 'Primary', var: 'var(--color-primary)' },
                                    { name: 'Background', var: 'var(--color-bg)' },
                                    { name: 'Surface', var: 'var(--color-surface)' },
                                    { name: 'Border', var: 'var(--color-border)' },
                                ].map((color, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="h-10 rounded-lg border border-theme-border/50 shadow-inner" style={{ backgroundColor: `rgb(${color.var})` }}></div>
                                        <div className="text-[9px] font-mono text-theme-text-muted truncate">{color.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* The Vault Aesthetic */}
                    <div className="doppelrand-outer rounded-2xl mt-2">
                        <div className="doppelrand-inner bg-theme-bg p-8 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-theme-primary/5 to-transparent pointer-events-none"></div>
                            
                            <Box size={24} className="text-theme-primary mb-4 relative z-10" />
                            <h2 className="text-2xl font-black text-theme-text tracking-tight mb-3 relative z-10">Vault Aesthetic</h2>
                            <p className="text-theme-text-muted leading-relaxed font-light text-[13px] mb-8 relative z-10">
                                The <strong>Doppelrand</strong> creates a mechanical, highly protected feel. Interfaces should feel like heavy hardware terminals.
                            </p>
                            
                            <div className="w-full doppelrand-outer p-1 rounded-xl relative z-10">
                                <div className="doppelrand-inner bg-theme-surface/30 p-4 flex flex-col items-center justify-center border-dashed">
                                    <span className="text-[10px] font-mono tracking-widest text-theme-text-muted">.doppelrand-inner</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
