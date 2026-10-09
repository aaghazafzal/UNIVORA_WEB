"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import AdaptiveImage from '../AdaptiveImage';
import { detailsData } from '../../data/detailsData';

export default function EcosystemDesktop() {
    const defaultIds = ['cinemahub-web', 'groovia-web', 'notora-web', 'skillora', 'extract-x', 'streamdrop-bot'];
    const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        try {
            const appsFavs = JSON.parse(localStorage.getItem('univora_apps_favorites') || '[]');
            const botsFavs = JSON.parse(localStorage.getItem('univora_bots_favorites') || '[]');
            
            let allFavIds = [...appsFavs, ...botsFavs];
            if (allFavIds.length > 5) allFavIds = allFavIds.slice(0, 5);
            
            const favObjects = allFavIds.map(id => detailsData.find(item => item.id === id)).filter(Boolean);
            
            let finalProjects = [...favObjects];
            if (finalProjects.length < 5) {
                const remainingDefaults = defaultIds
                    .filter(id => !allFavIds.includes(id))
                    .map(id => detailsData.find(item => item.id === id))
                    .filter(Boolean);
                finalProjects = [...finalProjects, ...remainingDefaults].slice(0, 5);
            }
            setFeaturedProjects(finalProjects);
        } catch (e) {
            console.error("Failed to load favorites", e);
            setFeaturedProjects(defaultIds.map(id => detailsData.find(item => item.id === id)).filter(Boolean).slice(0, 5));
        }
    }, []);

    const displayProjects = featuredProjects.length > 0 
        ? featuredProjects 
        : defaultIds.map(id => detailsData.find(item => item.id === id)).filter(Boolean).slice(0, 5);

    if (displayProjects.length < 5) return null; // Fallback

    const P0 = displayProjects[0];
    const P0Icon = P0.icon;
    const P1 = displayProjects[1];
    const P1Icon = P1.icon;

    return (
        <section id="apps" className="py-20 relative">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-20 mb-20">
                <div className="overflow-hidden mb-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block px-3 py-1 rounded-full bg-theme-text/5 border border-theme-border text-[10px] uppercase tracking-[0.2em] font-medium text-theme-text mb-6"
                    >
                        Active Nodes
                    </motion.div>
                </div>
                <div className="overflow-hidden">
                    <motion.h2 
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl font-black tracking-tighter text-theme-text"
                    >
                        Directory
                    </motion.h2>
                </div>
            </div>

            {/* Asymmetrical Bento Grid */}
            <div ref={ref} className="max-w-[1400px] mx-auto px-8 lg:px-20 grid grid-cols-12 gap-8">
                
                {/* 1. Large Feature Card (Col-Span 8) */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                    className="col-span-12 lg:col-span-8 doppelrand-outer group"
                >
                    <div className="doppelrand-inner h-[500px] p-12 flex flex-col justify-between relative overflow-hidden">
                        <div className="flex justify-between items-start z-10 relative">
                            <div className="w-16 h-16 bg-theme-bg/50 backdrop-blur-md rounded-2xl flex items-center justify-center p-3 border border-theme-border shadow-sm">
                                {P0.imageIcon ? (
                                    <img src={P0.imageIcon} alt={P0.name} className="w-full h-full object-contain" />
                                ) : (
                                    <P0Icon size={28} className="text-theme-text" />
                                )}
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-theme-text-muted uppercase px-3 py-1 bg-theme-text/5 rounded-full border border-theme-border">
                                {P0.type}
                            </span>
                        </div>
                        <div className="z-10 relative max-w-md">
                            <h3 className="text-4xl font-bold tracking-tight text-theme-text mb-4">{P0.name}</h3>
                            <p className="text-theme-text-muted text-lg font-light mb-8">{P0.description}</p>
                            
                            <Link href={`/project/${P0.id}`} className="inline-flex items-center gap-3 doppelrand-outer p-1 rounded-full bg-transparent hover:scale-[0.98] transition-awwwards">
                                <div className="h-full rounded-full px-6 py-3 bg-theme-primary border border-theme-primary text-theme-bg flex items-center gap-3 font-bold uppercase tracking-widest text-[10px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                                    Initiate
                                    <div className="w-5 h-5 rounded-full bg-theme-bg/20 flex items-center justify-center transition-awwwards group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                                        <ArrowUpRight size={10} className="text-theme-bg" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* Background subtle watermark */}
                        <div className="absolute -bottom-10 -right-10 text-[15rem] leading-none font-black text-theme-text/5 pointer-events-none select-none transition-awwwards group-hover:text-theme-primary/10">01</div>
                    </div>
                </motion.div>

                {/* 2. Vertical Stack Card (Col-Span 4) */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="col-span-12 lg:col-span-4 doppelrand-outer group"
                >
                    <div className="doppelrand-inner h-[500px] p-8 flex flex-col justify-between relative overflow-hidden">
                        <div className="z-10 relative">
                            <div className="w-12 h-12 bg-theme-bg/50 backdrop-blur-md rounded-xl flex items-center justify-center p-2.5 border border-theme-border mb-6">
                                {P1.imageIcon ? (
                                    <img src={P1.imageIcon} alt={P1.name} className="w-full h-full object-contain" />
                                ) : (
                                    <P1Icon size={20} className="text-theme-text" />
                                )}
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-theme-text mb-3">{P1.name}</h3>
                            <p className="text-theme-text-muted text-sm font-light mb-8">{P1.description}</p>
                        </div>
                        <Link href={`/project/${P1.id}`} className="z-10 relative flex items-center gap-2 group/btn">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-text group-hover/btn:text-theme-primary transition-colors">Access</span>
                            <ArrowUpRight size={14} className="text-theme-text-muted group-hover/btn:text-theme-primary group-hover/btn:translate-x-1 transition-awwwards" />
                        </Link>
                        {/* Background subtle watermark */}
                        <div className="absolute -bottom-10 -right-10 text-[15rem] leading-none font-black text-theme-text/5 pointer-events-none select-none transition-awwwards group-hover:text-theme-primary/10">02</div>
                    </div>
                </motion.div>

                {/* 3, 4, 5. Row Cards (Col-Span 4 each) */}
                {displayProjects.slice(2, 5).map((project, idx) => {
                    const ProjectIcon = project.icon;
                    return (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                        transition={{ duration: 1, delay: 0.2 + (idx * 0.1), ease: [0.16, 1, 0.3, 1] }}
                        className="col-span-12 lg:col-span-4 doppelrand-outer group"
                    >
                        <div className="doppelrand-inner h-[300px] p-8 flex flex-col justify-between relative overflow-hidden">
                            <div className="z-10 relative flex justify-between items-start">
                                <div className="w-12 h-12 bg-theme-bg/50 backdrop-blur-md rounded-xl flex items-center justify-center p-2.5 border border-theme-border">
                                    {project.imageIcon ? (
                                        <img src={project.imageIcon} alt={project.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <ProjectIcon size={20} className="text-theme-text" />
                                    )}
                                </div>
                            </div>
                            <div className="z-10 relative">
                                <h3 className="text-xl font-bold tracking-tight text-theme-text mb-2">{project.name}</h3>
                                <p className="text-theme-text-muted text-xs font-light line-clamp-2">{project.description}</p>
                            </div>
                            <Link href={`/project/${project.id}`} className="absolute inset-0 z-20" aria-label={`Open ${project.name}`}></Link>
                            {/* Hover highlight line */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-theme-primary scale-x-0 origin-left group-hover:scale-x-100 transition-awwwards opacity-50 z-30 pointer-events-none"></div>
                            
                            {/* Background subtle watermark */}
                            <div className="absolute -bottom-10 -right-6 text-[10rem] leading-none font-black text-theme-text/5 pointer-events-none select-none transition-awwwards group-hover:text-theme-primary/10">
                                0{idx + 3}
                            </div>
                        </div>
                    </motion.div>
                )})}

            </div>
        </section>
    );
}
