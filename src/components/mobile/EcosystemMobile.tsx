"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import AdaptiveImage from '../AdaptiveImage';
import { detailsData } from '../../data/detailsData';

export default function EcosystemMobile() {
    const defaultIds = ['cinemahub-web', 'groovia-web', 'notora-web', 'skillora'];
    const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        try {
            const appsFavs = JSON.parse(localStorage.getItem('univora_apps_favorites') || '[]');
            const botsFavs = JSON.parse(localStorage.getItem('univora_bots_favorites') || '[]');
            
            let allFavIds = [...appsFavs, ...botsFavs];
            if (allFavIds.length > 4) allFavIds = allFavIds.slice(0, 4);
            
            const favObjects = allFavIds.map(id => detailsData.find(item => item.id === id)).filter(Boolean);
            
            let finalProjects = [...favObjects];
            if (finalProjects.length < 4) {
                const remainingDefaults = defaultIds
                    .filter(id => !allFavIds.includes(id))
                    .map(id => detailsData.find(item => item.id === id))
                    .filter(Boolean);
                finalProjects = [...finalProjects, ...remainingDefaults].slice(0, 4);
            }
            setFeaturedProjects(finalProjects);
        } catch (e) {
            console.error("Failed to load favorites", e);
            setFeaturedProjects(defaultIds.map(id => detailsData.find(item => item.id === id)).filter(Boolean).slice(0, 4));
        }
    }, []);

    const displayProjects = featuredProjects.length > 0 
        ? featuredProjects 
        : defaultIds.map(id => detailsData.find(item => item.id === id)).filter(Boolean).slice(0, 4);

    return (
        <section id="apps" className="py-20 relative">
            <div className="px-6 mb-12">
                <div className="overflow-hidden mb-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block px-3 py-1 rounded-full bg-theme-text/5 border border-theme-border text-[9px] uppercase tracking-[0.2em] font-bold text-theme-text mb-4"
                    >
                        Active Nodes
                    </motion.div>
                </div>
                <div className="overflow-hidden">
                    <motion.h2 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl font-black tracking-tighter text-theme-text"
                    >
                        Directory
                    </motion.h2>
                </div>
            </div>

            <div ref={ref} className="px-6 flex flex-col gap-6">
                {displayProjects.map((project, idx) => {
                    const ProjectIcon = project.icon;
                    return (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 40, filter: 'blur(5px)' }}
                        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="doppelrand-outer"
                    >
                        <div className="doppelrand-inner p-6 flex flex-col relative overflow-hidden">
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-12 h-12 bg-theme-bg/50 backdrop-blur-md rounded-xl flex items-center justify-center p-2.5 border border-theme-border">
                                    {project.imageIcon ? (
                                        <img src={project.imageIcon} alt={project.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <ProjectIcon size={20} className="text-theme-text" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight text-theme-text mb-1">{project.name}</h3>
                                    <span className="text-[9px] font-bold tracking-[0.2em] text-theme-text-muted uppercase">
                                        {project.type}
                                    </span>
                                </div>
                            </div>
                            
                            <p className="text-theme-text-muted text-xs font-light line-clamp-2 mb-6 relative z-10">
                                {project.description}
                            </p>

                            <Link href={`/project/${project.id}`} className="relative z-10 inline-flex items-center gap-3 doppelrand-outer p-1 rounded-full bg-transparent hover:scale-[0.98] transition-awwwards self-start">
                                <div className="h-full rounded-full px-5 py-2.5 bg-theme-primary border border-theme-primary text-theme-bg flex items-center gap-3 font-bold uppercase tracking-widest text-[9px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                                    Initiate
                                    <div className="w-4 h-4 rounded-full bg-theme-bg/20 flex items-center justify-center transition-awwwards group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                                        <ArrowUpRight size={8} className="text-theme-bg" />
                                    </div>
                                </div>
                            </Link>

                            {/* Background subtle watermark */}
                            <div className="absolute -bottom-8 -right-4 text-[10rem] leading-none font-black text-theme-text/5 pointer-events-none select-none transition-awwwards group-hover:text-theme-primary/10">
                                0{idx + 1}
                            </div>
                        </div>
                    </motion.div>
                )})}

                {/* Directory Navigation Buttons */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: displayProjects.length * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-2 gap-4 w-full mt-2"
                >
                    <Link href="/apps" className="relative z-10 doppelrand-outer p-1 rounded-full bg-transparent hover:scale-[0.98] transition-awwwards w-full group">
                        <div className="h-full w-full rounded-full py-3.5 bg-theme-text border border-theme-text text-theme-bg flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[9px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] hover:bg-theme-primary hover:border-theme-primary transition-colors">
                            Apps Directory
                            <div className="w-4 h-4 rounded-full bg-theme-bg/20 flex items-center justify-center transition-awwwards group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                                <ArrowUpRight size={8} className="text-theme-bg" />
                            </div>
                        </div>
                    </Link>
                    <Link href="/bots" className="relative z-10 doppelrand-outer p-1 rounded-full bg-transparent hover:scale-[0.98] transition-awwwards w-full group">
                        <div className="h-full w-full rounded-full py-3.5 bg-theme-text border border-theme-text text-theme-bg flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[9px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] hover:bg-theme-primary hover:border-theme-primary transition-colors">
                            Bots Directory
                            <div className="w-4 h-4 rounded-full bg-theme-bg/20 flex items-center justify-center transition-awwwards group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                                <ArrowUpRight size={8} className="text-theme-bg" />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
