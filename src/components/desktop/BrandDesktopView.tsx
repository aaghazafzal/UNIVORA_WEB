"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Droplet, Type, Box, Layers } from 'lucide-react';

export default function BrandDesktopView() {
    return (
        <main className="relative pt-32 pb-32 min-h-screen selection:bg-theme-primary selection:text-theme-bg overflow-x-hidden">
            <div className="max-w-[1200px] mx-auto px-8 relative z-10">
                
                {/* Hero Section */}
                <div className="mb-24 flex justify-between items-end">
                    <div>
                        <h1 className="text-7xl font-black tracking-tighter text-theme-text mb-4 leading-none">
                            Brand <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-primary/50">Guidelines</span>
                        </h1>
                        <p className="text-xl text-theme-text-muted font-light max-w-xl leading-relaxed mt-6">
                            Our identity is built on precision, fluidity, and the "Vault/Armory" aesthetic. Download official assets and learn how to use them.
                        </p>
                    </div>
                    
                    <button className="group relative doppelrand-outer p-1 rounded-full cursor-pointer hover:scale-105 transition-all duration-300">
                        <div className="doppelrand-inner px-8 py-4 text-theme-text group-hover:text-theme-primary transition-colors flex items-center gap-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg">
                            <Download size={16} className="text-theme-text group-hover:text-theme-primary transition-colors" />
                            Download Kit (ZIP)
                        </div>
                    </button>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    
                    {/* The Logo Section */}
                    <div className="col-span-12 doppelrand-outer rounded-3xl">
                        <div className="doppelrand-inner bg-theme-surface/10 p-12 flex items-center gap-16">
                            <div className="flex-1">
                                <h2 className="text-3xl font-black text-theme-text tracking-tight mb-4">The Logo</h2>
                                <p className="text-theme-text-muted leading-relaxed font-light mb-8 max-w-md">
                                    The Univora mark represents a monolithic, impenetrable vault. Always ensure enough breathing room (clear space) around the logo. Never stretch, rotate, or alter its proportions.
                                </p>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-theme-text-muted">
                                        <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50 block"></span>
                                        Safe Space: 1x
                                    </div>
                                </div>
                            </div>
                            
                            <div className="w-[500px] h-[300px] bg-theme-bg border border-theme-border/50 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                                {/* Grid background pattern */}
                                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(var(--color-text-rgb) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-rgb) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                {/* Clear space indicator (hidden, shows on hover) */}
                                <div className="absolute w-[180px] h-[180px] border border-dashed border-theme-primary/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="absolute -top-6 text-[10px] text-theme-primary font-mono">1x clear space</span>
                                </div>
                                <img src="/logos/png-logos/univora.png" alt="Univora Logo" className="w-24 h-24 logo-adaptive relative z-10 drop-shadow-2xl" />
                            </div>
                        </div>
                    </div>

                    {/* Typography Section */}
                    <div className="col-span-5 doppelrand-outer rounded-3xl">
                        <div className="doppelrand-inner bg-theme-surface/10 p-10 h-full flex flex-col">
                            <div className="flex items-center gap-3 text-theme-primary mb-6">
                                <Type size={20} />
                                <h2 className="text-2xl font-black tracking-tight text-theme-text">Typography</h2>
                            </div>
                            <p className="text-theme-text-muted font-light mb-8 text-sm leading-relaxed">
                                Our typographic system is built on high contrast. We use a geometric sans-serif for massive impact, and a technical monospace for data and badges.
                            </p>
                            
                            <div className="flex flex-col gap-8 mt-auto">
                                <div className="bg-theme-bg p-6 rounded-xl border border-theme-border/30">
                                    <div className="text-[10px] font-bold tracking-[0.2em] text-theme-text-muted uppercase mb-4">Primary Display</div>
                                    <div className="text-5xl font-black text-theme-text tracking-tighter">Inter</div>
                                    <div className="text-xs text-theme-text-muted mt-2">A B C D E F G 0 1 2 3</div>
                                </div>
                                <div className="bg-theme-bg p-6 rounded-xl border border-theme-border/30">
                                    <div className="text-[10px] font-bold tracking-[0.2em] text-theme-text-muted uppercase mb-4">System / Monospace</div>
                                    <div className="text-3xl font-mono text-theme-text">JetBrains</div>
                                    <div className="text-xs text-theme-text-muted mt-2 font-mono">A B C D E F G 0 1 2 3</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Color System Section */}
                    <div className="col-span-7 doppelrand-outer rounded-3xl">
                        <div className="doppelrand-inner bg-theme-surface/10 p-10 h-full flex flex-col">
                            <div className="flex items-center gap-3 text-theme-primary mb-6">
                                <Droplet size={20} />
                                <h2 className="text-2xl font-black tracking-tight text-theme-text">Theme Engine</h2>
                            </div>
                            <p className="text-theme-text-muted font-light mb-8 text-sm leading-relaxed max-w-lg">
                                Univora doesn't rely on a single color. Our identity adapts through our proprietary Theme Engine. The primary accent color dynamically shifts the entire ecosystem's aura.
                            </p>
                            
                            <div className="grid grid-cols-3 gap-4 mt-auto">
                                {[
                                    { name: 'Primary Accent', var: 'var(--color-primary)' },
                                    { name: 'Background Base', var: 'var(--color-bg)' },
                                    { name: 'Surface Module', var: 'var(--color-surface)' },
                                    { name: 'Border Line', var: 'var(--color-border)' },
                                    { name: 'Text High', var: 'var(--color-text)' },
                                    { name: 'Text Muted', var: 'var(--color-text-muted)' },
                                ].map((color, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="h-16 rounded-xl border border-theme-border/50 shadow-inner" style={{ backgroundColor: `rgb(${color.var})` }}></div>
                                        <div className="text-[10px] font-mono text-theme-text-muted truncate">{color.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* The Vault Aesthetic */}
                    <div className="col-span-12 doppelrand-outer rounded-3xl mt-4">
                        <div className="doppelrand-inner bg-theme-bg p-12 flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-theme-primary/5 to-transparent pointer-events-none"></div>
                            
                            <Box size={32} className="text-theme-primary mb-6 relative z-10" />
                            <h2 className="text-3xl font-black text-theme-text tracking-tight mb-4 relative z-10">The "Vault / Armory" Aesthetic</h2>
                            <p className="text-theme-text-muted leading-relaxed font-light max-w-2xl mx-auto mb-10 relative z-10">
                                Every container in Univora uses the <strong>Doppelrand</strong> (double border) technique. This creates a mechanical, highly protected, and premium feel. Interfaces shouldn't just look flat; they should feel like heavy, military-grade hardware terminals.
                            </p>
                            
                            <div className="w-full max-w-md doppelrand-outer p-1 rounded-2xl relative z-10">
                                <div className="doppelrand-inner bg-theme-surface/30 p-6 flex flex-col items-center justify-center border-dashed">
                                    <span className="text-xs font-mono tracking-widest text-theme-text-muted">.doppelrand-inner</span>
                                </div>
                                <span className="absolute -top-3 -right-3 px-2 py-1 bg-theme-primary text-theme-bg text-[9px] font-bold uppercase rounded">.doppelrand-outer</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
