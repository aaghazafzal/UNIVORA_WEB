"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import AdaptiveImage from '../AdaptiveImage';
import { detailsData } from '../../data/detailsData';

export default function AppsMobileView() {
    const appsData = detailsData.filter(item => ['App', 'Website', 'Platform'].includes(item.type));

    return (
        <main className="relative pt-24 pb-24">
            <div className="px-6">
                
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-3xl font-black tracking-tighter text-theme-text mb-2">Applications.</h1>
                    <p className="text-theme-text-muted text-sm font-light leading-relaxed">Consumer-grade web applications and high-performance platforms.</p>
                </div>

                {/* Vertical Feed */}
                <div className="flex flex-col gap-10">
                    {appsData.map((app, idx) => {
                        const AppIcon = app.icon;
                        return (
                            <motion.div 
                                key={app.id}
                                initial={{ opacity: 0, y: 40, filter: 'blur(5px)' }}
                                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="doppelrand-outer w-full"
                            >
                                <div className="doppelrand-inner p-8 flex flex-col gap-6 relative overflow-hidden transition-colors duration-500">
                                    
                                    {/* Icon & Title */}
                                    <div className="flex flex-col gap-4 relative z-10">
                                        <div className="flex justify-between items-start">
                                            <div className="w-16 h-16 bg-theme-bg/50 backdrop-blur-md rounded-2xl flex items-center justify-center p-3 border border-theme-border shadow-sm">
                                                {app.imageIcon ? (
                                                    <img src={app.imageIcon} alt={app.name} className="w-full h-full object-contain" />
                                                ) : (
                                                    <AppIcon size={24} className="text-theme-text" />
                                                )}
                                            </div>
                                            <span className="px-2 py-1 bg-theme-text/5 rounded border border-theme-border text-[8px] font-bold tracking-[0.2em] text-theme-text uppercase">
                                                {app.type}
                                            </span>
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black tracking-tight text-theme-text mb-1">{app.name}</h2>
                                            <span className="text-theme-text-muted text-[10px] tracking-[0.2em] uppercase font-bold">{app.tagline}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="z-10 relative">
                                        <p className="text-theme-text-muted text-sm font-light leading-relaxed">
                                            {app.description}
                                        </p>
                                    </div>

                                    {/* Action Button */}
                                    <div className="z-10 relative pt-2">
                                        <Link href={`/project/${app.id}`} className="inline-flex items-center gap-2 doppelrand-outer p-1 rounded-full bg-transparent w-full">
                                            <div className="w-full rounded-full px-6 py-3.5 bg-theme-primary border border-theme-primary text-theme-bg flex items-center justify-between font-bold uppercase tracking-widest text-[10px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                                                Launch
                                                <div className="w-5 h-5 rounded-full bg-theme-bg/20 flex items-center justify-center">
                                                    <ArrowUpRight size={10} className="text-theme-bg" />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    {/* Background Watermark */}
                                    <div className="absolute -bottom-10 -right-4 text-[12rem] leading-none font-black text-theme-text/5 pointer-events-none select-none">
                                        0{idx + 1}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </main>
    );
}
