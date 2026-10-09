"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import AdaptiveImage from '../AdaptiveImage';
import { detailsData } from '../../data/detailsData';

export default function AppsDesktopView() {
    const appsData = detailsData.filter(item => ['App', 'Website', 'Platform'].includes(item.type));
    
    return (
        <main className="relative pt-24 pb-16">
            <div className="max-w-[1600px] mx-auto px-8 lg:px-20">
                
                {/* Sticky Scroll Layout */}
                <div className="flex flex-col lg:flex-row gap-20 items-start">
                    
                    {/* Left: Sticky Sidebar */}
                    <div className="lg:w-1/3 sticky top-32 hidden lg:block">
                        <div className="mb-8">
                            <h1 className="text-4xl font-black tracking-tighter text-theme-text mb-4">Applications.</h1>
                            <p className="text-theme-text-muted text-sm font-light leading-relaxed">Consumer-grade web applications and high-performance platforms engineered for scale, speed, and privacy.</p>
                        </div>
                        <div className="doppelrand-outer w-full">
                            <div className="doppelrand-inner p-10 bg-theme-bg/60 backdrop-blur-3xl">
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-theme-text-muted mb-8">Active Index</h3>
                                <ul className="flex flex-col gap-4">
                                    {appsData.map((app, idx) => (
                                        <li key={app.id}>
                                            <a href={`#${app.id}`} className="group flex items-center gap-4 transition-colors hover:text-theme-primary">
                                                <span className="text-[10px] font-mono opacity-50">0{idx + 1}</span>
                                                <span className="text-lg font-bold tracking-tight text-theme-text group-hover:text-theme-primary transition-colors">{app.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right: Scrolling List */}
                    <div className="lg:w-2/3 flex flex-col gap-16">
                        {appsData.map((app, idx) => {
                            const AppIcon = app.icon;
                            return (
                                <motion.div 
                                    key={app.id}
                                    id={app.id}
                                    initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                    className="doppelrand-outer w-full group scroll-mt-32"
                                >
                                    <div className="doppelrand-inner p-12 lg:p-16 flex flex-col gap-10 relative overflow-hidden transition-colors duration-500">
                                        
                                        {/* Header */}
                                        <div className="flex justify-between items-start z-10 relative">
                                            <div className="flex items-center gap-6">
                                                <div className="w-20 h-20 bg-theme-bg/50 backdrop-blur-md rounded-2xl flex items-center justify-center p-4 border border-theme-border shadow-lg group-hover:border-theme-primary/30 transition-colors duration-500">
                                                    {app.imageIcon ? (
                                                        <img src={app.imageIcon} alt={app.name} className="w-full h-full object-contain" />
                                                    ) : (
                                                        <AppIcon size={32} className="text-theme-text group-hover:text-theme-primary transition-colors duration-500" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-theme-text mb-2 group-hover:text-theme-primary transition-colors duration-500">{app.name}</h2>
                                                    <div className="flex items-center gap-3">
                                                        <span className="px-3 py-1 bg-theme-text/5 rounded-full border border-theme-border text-[10px] font-bold tracking-[0.2em] text-theme-text uppercase">
                                                            {app.type}
                                                        </span>
                                                        <span className="text-theme-text-muted text-sm tracking-widest uppercase font-medium">{app.tagline}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="z-10 relative">
                                            <p className="text-theme-text-muted text-xl font-light leading-relaxed max-w-3xl">
                                                {app.description}
                                            </p>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 z-10 relative py-8 border-y border-theme-border/30">
                                            {app.stats.map((stat: any, i: number) => (
                                                <div key={i} className="flex flex-col gap-1">
                                                    <span className="text-theme-text-muted text-[10px] uppercase tracking-[0.2em] font-bold">{stat.label}</span>
                                                    <span className="text-theme-text text-2xl font-black tracking-tight">{stat.value}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Action Button */}
                                        <div className="z-10 relative pt-4">
                                            <Link href={`/project/${app.id}`} className="inline-flex items-center gap-3 doppelrand-outer p-1 rounded-full bg-transparent hover:scale-[0.98] transition-awwwards">
                                                <div className="h-full rounded-full px-8 py-4 bg-theme-primary border border-theme-primary text-theme-bg flex items-center gap-4 font-bold uppercase tracking-widest text-[11px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                                                    Access Interface
                                                    <div className="w-6 h-6 rounded-full bg-theme-bg/20 flex items-center justify-center transition-awwwards group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                                                        <ArrowUpRight size={12} className="text-theme-bg" />
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>

                                        {/* Massive Background Number */}
                                        <div className="absolute -bottom-16 -right-10 text-[20rem] leading-none font-black text-theme-text/5 pointer-events-none select-none transition-all duration-1000 group-hover:text-theme-primary/10 group-hover:scale-110 origin-bottom-right">
                                            0{idx + 1}
                                        </div>
                                        
                                        {/* Hover highlight line */}
                                        <div className="absolute top-0 left-0 w-full h-[2px] bg-theme-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[0.16,1,0.3,1] opacity-50 z-30 pointer-events-none"></div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}
