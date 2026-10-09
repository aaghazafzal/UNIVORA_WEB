"use client";

import React, { useRef } from 'react';
import { ArrowRight, Zap, TerminalIcon, Database, Globe } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function EvolutionDesktop() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);

    const timelineData = [
        { year: "GENESIS / SEPT 2024", title: "The Initialization", desc: "A solo entity compiles the blueprint. No degree, just raw curiosity and a 10th-grade vision. The seed of Univora is planted on paper.", icon: Zap },
        { year: "EXECUTION / EARLY 2025", title: "Network Activation", desc: "First lines of code written. Deploying high-utility nodes: Cinemahub Bot and Groovia Bot. The foundation is set.", icon: TerminalIcon },
        { year: "EXPANSION / MID 2025", title: "Architectural Necessity", desc: "As data load increased, new bots were forged out of necessity. Forward Bot, Extract X, Streamdrop. A bot to solve every bottleneck.", icon: Database },
        { year: "SINGULARITY / PRESENT", title: "The Grand Convergence", desc: "Bridging Telegram backends with Next.js/React frontends. Creating the ultimate Web & App experience. The evolution never ceases.", icon: Globe }
    ];

    useGSAP(() => {
        const cards = gsap.utils.toArray('.timeline-card') as HTMLElement[];
        
        cards.forEach((card, i) => {
            // GSAP ScrollTrigger Sticky Stack
            ScrollTrigger.create({
                trigger: card,
                start: `top top+=${120 + (i * 20)}`,
                endTrigger: rightColRef.current,
                end: `bottom bottom-=${100 - (i * 20)}`,
                pin: true,
                pinSpacing: false,
                scrub: true,
            });

            // Fade effect when the next card overlays it
            if (i < cards.length - 1) {
                gsap.to(card, {
                    scale: 0.95,
                    opacity: 0.3,
                    scrollTrigger: {
                        trigger: cards[i + 1],
                        start: `top top+=${120 + ((i + 1) * 20)}`,
                        end: `top top+=${80 + ((i + 1) * 20)}`,
                        scrub: true,
                    }
                });
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 relative overflow-visible">
            <div className="max-w-[1600px] mx-auto px-8 lg:px-20">
                <div className="flex flex-col lg:flex-row gap-20 items-start">
                    
                    {/* Left Column (Sticky Title) */}
                    <div className="w-full lg:w-5/12 sticky top-40">
                        <div className="border-t border-theme-text/20 pt-8 mb-12">
                            <h2 className="text-theme-primary font-mono text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-theme-primary"></span>
                                Chronology
                            </h2>
                            <h3 className="text-6xl lg:text-7xl font-medium tracking-tight mb-8 leading-[0.9] text-theme-text">The Path to <br/><span className="text-theme-text-muted italic">Singularity</span></h3>
                            <p className="text-lg text-theme-text-muted font-light leading-relaxed max-w-sm mb-12">
                                How a single developer built a multi-platform ecosystem from scratch over 1.5 years.
                            </p>
                            
                            <Link href="/dev" className="group inline-flex items-center gap-4 bg-theme-surface border border-theme-border p-4 hover:border-theme-primary transition-colors">
                                <div className="w-12 h-12 bg-theme-bg flex items-center justify-center border border-theme-border group-hover:bg-theme-primary group-hover:text-theme-bg transition-colors">
                                    <TerminalIcon size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold tracking-widest text-theme-text uppercase">Creator Profile</span>
                                    <span className="text-[10px] font-mono text-theme-text-muted uppercase">SYS.ADMIN // Rolex Sir</span>
                                </div>
                                <ArrowRight size={16} className="ml-4 text-theme-text-muted group-hover:text-theme-primary transition-colors group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column (GSAP Stacking Cards) */}
                    <div ref={rightColRef} className="w-full lg:w-7/12 relative pb-32">
                        {timelineData.map((item, i) => (
                            <div 
                                key={i} 
                                className="timeline-card w-full mb-10 last:mb-0 relative z-[10]"
                                style={{ zIndex: i }}
                            >
                                <div className="bg-theme-bg border border-theme-border/50 p-10 lg:p-14 shadow-2xl relative overflow-hidden group">
                                    {/* Accent Top Bar */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-theme-border group-hover:bg-theme-primary transition-colors duration-500" />
                                    
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                                        <span className="inline-block px-4 py-2 bg-theme-surface/50 border border-theme-border text-xs font-mono font-medium tracking-widest text-theme-primary uppercase">
                                            {item.year}
                                        </span>
                                        <div className="w-12 h-12 flex items-center justify-center border border-theme-border/50 text-theme-text-muted group-hover:text-theme-primary group-hover:border-theme-primary transition-colors duration-500 bg-theme-surface/20">
                                            <item.icon size={20} />
                                        </div>
                                    </div>

                                    <h4 className="text-4xl lg:text-5xl font-medium tracking-tight mb-6 text-theme-text group-hover:text-theme-primary transition-colors duration-500">{item.title}</h4>
                                    
                                    <p className="text-base text-theme-text-muted font-light leading-relaxed max-w-xl">
                                        {item.desc}
                                    </p>

                                    {/* Massive Watermark */}
                                    <span className="absolute -bottom-8 -right-8 text-[10rem] leading-none font-medium text-theme-text opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-500">
                                        0{i + 1}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
