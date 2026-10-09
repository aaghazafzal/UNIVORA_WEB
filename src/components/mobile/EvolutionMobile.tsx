"use client";

import React from 'react';
import { ArrowRight, Zap, TerminalIcon, Database, Globe } from 'lucide-react';
import Link from 'next/link';

export default function EvolutionMobile() {
    return (
        <section className="py-24 relative">
            <div className="px-6 border-t border-theme-text/20 pt-12">
                <div className="flex flex-col gap-12">
                    
                    <div className="w-full">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-6 h-[1px] bg-theme-primary"></span>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-theme-primary uppercase">Chronology</span>
                        </div>
                        <h3 className="text-4xl font-medium tracking-tight mb-4 leading-tight text-theme-text">The Path to <br/><span className="italic text-theme-text-muted">Singularity</span></h3>
                        <p className="text-sm text-theme-text-muted font-light leading-relaxed mb-8">
                            How a single developer built a multi-platform ecosystem from scratch over 1.5 years.
                        </p>
                        <Link href="/dev" className="inline-flex items-center gap-2 text-theme-text text-[10px] font-bold tracking-widest hover:text-theme-primary transition-colors border-b border-theme-primary/30 pb-1 uppercase">
                            View Creator Profile <ArrowRight size={12} />
                        </Link>
                    </div>

                    <div className="w-full relative">
                        {/* Vertical line */}
                        <div className="absolute left-[15px] top-2 bottom-0 w-px bg-theme-text/20"></div>

                        <div className="space-y-12">
                            {[
                                { year: "GENESIS / SEPT 2024", title: "The Initialization", desc: "A solo entity (Rolex Sir) compiles the blueprint. No degree, just raw curiosity and a 10th-grade vision. The seed of Univora is planted on paper.", icon: Zap },
                                { year: "EXECUTION / EARLY 2025", title: "Network Activation", desc: "First lines of code written. Deploying high-utility nodes: Cinemahub Bot and Groovia Bot. The foundation is set.", icon: TerminalIcon },
                                { year: "EXPANSION / MID 2025", title: "Architectural Necessity", desc: "As data load increased, new bots were forged out of necessity. Forward Bot, Extract X, Streamdrop. A bot to solve every bottleneck.", icon: Database },
                                { year: "SINGULARITY / PRESENT", title: "The Grand Convergence", desc: "Bridging Telegram backends with Next.js/React frontends. Creating the ultimate Web & App experience. The evolution never ceases.", icon: Globe }
                            ].map((item, i) => (
                                <div 
                                    key={i} 
                                    className="relative group pl-12"
                                >
                                    {/* Node Dot */}
                                    <div className="absolute left-0 top-1 w-8 h-8 flex items-center justify-center bg-theme-bg border border-theme-text/30">
                                        <item.icon size={14} className="text-theme-text-muted" />
                                    </div>
                                    
                                    <span className="inline-block px-2 py-0.5 bg-theme-text/5 text-[10px] font-mono tracking-widest text-theme-text-muted mb-3 uppercase">
                                        {item.year}
                                    </span>
                                    <h4 className="text-2xl font-medium tracking-tight mb-2 text-theme-text">{item.title}</h4>
                                    <p className="text-xs text-theme-text-muted font-light leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
