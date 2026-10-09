"use client";

import React from 'react';
import { Coffee, Github, Heart, QrCode, Server, Globe, Code, Smartphone, Database, Bot, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const supportMethods = [
    { icon: <QrCode size={24} />, name: 'UPI', desc: 'Direct payment', link: '/donate' },
    { icon: <Github size={24} />, name: 'GitHub', desc: 'Sponsors', link: '/donate' },
    { icon: <Heart size={24} />, name: 'Ko-fi', desc: 'One-time gift', link: '/donate' },
    { icon: <Heart size={24} />, name: 'Patreon', desc: 'Monthly', link: '/donate' },
];

const whereItGoes = [
    { icon: <Server size={18} />, text: 'Hosting & Infrastructure' },
    { icon: <Globe size={18} />, text: 'Domains & CDN' },
    { icon: <Database size={18} />, text: 'APIs & Database Services' },
    { icon: <Code size={18} />, text: 'Open Source Development' },
    { icon: <Smartphone size={18} />, text: 'New Apps & Bots' },
    { icon: <Bot size={18} />, text: 'AI Tools & Research' },
];

const SupportSection = () => {
    return (
        <section className="py-24 px-4 md:px-6 relative z-10">
            <div className="max-w-[1200px] mx-auto bg-theme-surface border border-theme-border hover:border-theme-border/80 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden transition-colors">
                
                {/* Ambient Background Glow inside the card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-theme-primary/10 blur-[100px] pointer-events-none rounded-full"></div>
                
                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-block px-3 py-1 bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-6">
                            Support
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-theme-text tracking-tight mb-4">Fuel the Next Build</h2>
                        <p className="text-theme-text-muted text-base leading-relaxed mb-8">
                            UNIVORA is independently built and maintained. If you find value in any of our products, 
                            consider supporting future development — it keeps the ecosystem alive.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="https://buymeacoffee.com/univora" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-theme-primary text-black font-bold rounded-xl transition-all shadow-[0_0_30px_-10px_var(--color-primary)] hover:scale-105 w-full sm:w-auto">
                                <Coffee size={18} /> Buy Me a Coffee
                            </a>
                            <Link href="/donate" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-theme-bg hover:bg-theme-surface-hover border border-theme-border hover:border-theme-primary/50 text-theme-text font-bold rounded-xl transition-all w-full sm:w-auto">
                                View Full Options
                            </Link>
                        </div>
                    </div>

                    {/* Methods */}
                    <div className="mb-16">
                        <div className="text-center mb-8">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-theme-text-muted uppercase flex items-center justify-center gap-4 before:content-[''] before:h-px before:w-12 before:bg-theme-border after:content-[''] after:h-px after:w-12 after:bg-theme-border opacity-60">
                                Other ways to support
                            </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {supportMethods.map((method, i) => (
                                <Link key={i} href={method.link} className="group bg-theme-bg hover:bg-theme-surface-hover border border-theme-border hover:border-theme-primary/40 p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300">
                                    <div className="text-theme-text-muted group-hover:text-theme-primary transition-colors duration-300 mb-3 group-hover:-translate-y-1">
                                        {method.icon}
                                    </div>
                                    <h3 className="text-theme-text font-bold text-sm mb-1">{method.name}</h3>
                                    <p className="text-theme-text-muted text-[10px] font-medium">{method.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Where it goes */}
                    <div className="border-t border-theme-border pt-12 flex flex-col lg:flex-row gap-8 items-start justify-between">
                        <div className="flex-1 w-full">
                            <h4 className="text-[10px] font-bold tracking-[0.2em] text-theme-primary uppercase mb-6 flex items-center gap-2">
                                <CheckCircle2 size={14} /> Where it goes
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
                                {whereItGoes.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-theme-text-muted hover:text-theme-text transition-colors group">
                                        <span className="text-theme-primary/40 group-hover:text-theme-primary transition-colors scale-90">{item.icon}</span>
                                        <span className="text-xs font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-[320px] bg-theme-bg border border-theme-border p-5 rounded-xl flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-theme-primary shrink-0 mt-0.5 opacity-80" />
                            <p className="text-xs text-theme-text-muted leading-relaxed">
                                <strong className="text-theme-text font-bold block mb-1">Optional.</strong> 
                                All public Univora tools and bots remain free — always.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SupportSection;
