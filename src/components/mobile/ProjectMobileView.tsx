"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Terminal, Cpu, CheckCircle2, Maximize2 } from 'lucide-react';

export default function ProjectMobileView({ project }: { project: any }) {
    const [configs, setConfigs] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchConfigs = async () => {
            try {
                const res = await fetch('/api/admin/config');
                const data = await res.json();
                setConfigs(data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchConfigs();
    }, []);
    
    // Gather images for the gallery
    const rawImages: any[] = [];
    if (project.mobileScreenshots && project.mobileScreenshots.length > 0) {
        rawImages.push(...project.mobileScreenshots);
    }
    
    // Ensure uniqueness
    const uniqueImages = Array.from(new Set(rawImages)).slice(0, 3);
    
    const [activeIndex, setActiveIndex] = useState(0);

    const getCardStyle = (index: number) => {
        if (index === activeIndex) return { zIndex: 30, x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 };
        
        const diff = (index - activeIndex + uniqueImages.length) % uniqueImages.length;
        
        // Centered Fan Layout for Mobile
        if (diff === 1) {
            // Next card goes to the right
            return { zIndex: 20, x: 50, y: 15, scale: 0.85, rotate: 6, opacity: 0.7 };
        }
        if (diff === 2 || diff === -1) {
            // Previous card goes to the left
            return { zIndex: 20, x: -50, y: 15, scale: 0.85, rotate: -6, opacity: 0.7 };
        }
        
        return { zIndex: 0, opacity: 0 };
    };

    return (
        <div className="min-h-screen bg-theme-bg relative pt-24 pb-32 overflow-hidden selection:bg-theme-primary/30">
            
            <div className="px-5 relative z-10 flex flex-col gap-8">
                
                {/* INFO & ACTIONS (Moved above Hero Gallery) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-6 flex flex-col items-start"
                >
                    <div className="flex items-center gap-4 mb-8">
                        {/* Project Logo/Icon */}
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-theme-surface/50 border border-theme-border shadow-sm backdrop-blur-md">
                            {project.imageIcon ? (
                                <img src={project.imageIcon} alt={project.name} className="w-8 h-8 object-contain" />
                            ) : (
                                project.icon && React.createElement(project.icon, { size: 24, className: "text-theme-primary" })
                            )}
                        </div>

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-border bg-theme-surface/30 backdrop-blur-md">
                            <ShieldCheck size={12} className="text-theme-primary" />
                            <span className="text-[9px] font-mono tracking-widest text-theme-text uppercase">{project.type}</span>
                        </div>
                    </div>

                    <h1 className="text-5xl font-black tracking-tighter text-theme-text leading-[0.95] mb-4">
                        {project.name}.
                    </h1>
                    
                    <h3 className="text-xs font-mono text-theme-primary tracking-widest uppercase mb-4">{project.tagline}</h3>
                    
                    <p className="text-sm text-theme-text-muted font-light leading-relaxed mb-8">
                        {project.description}
                    </p>

                    {(() => {
                        const isApp = ['App', 'Website', 'Platform'].includes(project.type);
                        const isBot = project.type.toLowerCase().includes('bot');
                        const overrideKey = isApp ? `app_url_${project.id}` : (isBot ? `bot_url_${project.id}` : null);
                        const finalUrl = (overrideKey && configs[overrideKey]) || project.link;
                        
                        if (!finalUrl || finalUrl === '#') return null;

                        return (
                            <a 
                                href={finalUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                className="group flex w-full items-center gap-2 doppelrand-outer rounded-full p-1 transition-awwwards active:scale-[0.98] cursor-pointer"
                            >
                                <div className="h-full w-full rounded-full px-8 py-4 bg-theme-primary border border-theme-primary text-theme-bg flex items-center justify-center gap-4 font-bold uppercase tracking-widest text-xs shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                                    Initialize
                                    <div className="w-8 h-8 rounded-full bg-theme-bg/20 flex items-center justify-center transition-awwwards group-hover:translate-x-1.5 group-hover:-translate-y-[1px]">
                                        <ArrowUpRight size={14} className="text-theme-bg" />
                                    </div>
                                </div>
                            </a>
                        );
                    })()}
                </motion.div>

                {/* HERO GALLERY (Stacked Cards Mobile) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="w-full flex justify-center items-center relative h-[450px] mb-10"
                >
                    {uniqueImages.length > 0 ? (
                        <div className="relative w-[180px] aspect-[9/19] flex items-center justify-center">
                            {uniqueImages.map((src: string, index: number) => {
                                const style = getCardStyle(index);
                                return (
                                    <motion.div
                                        key={src}
                                        onClick={() => setActiveIndex(index)}
                                        className="absolute top-0 left-0 w-full h-full doppelrand-outer cursor-pointer"
                                        animate={style}
                                        transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                                    >
                                        <div className="doppelrand-inner p-1.5 bg-theme-bg overflow-hidden w-full h-full shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                                            <img 
                                                src={src} 
                                                alt={`Screenshot ${index + 1}`} 
                                                className="w-full h-full object-cover rounded-[10px]"
                                            />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="w-[80%] aspect-video doppelrand-outer opacity-50 mx-auto">
                            <div className="doppelrand-inner flex items-center justify-center bg-theme-surface/10">
                                <ShieldCheck size={80} className="text-theme-border" />
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* METRICS GRID (Telemetry Panel) */}
                <div className="mb-20">
                    <div className="doppelrand-outer shadow-xl">
                        <div className="doppelrand-inner p-0 bg-theme-surface/40 relative grid grid-cols-2 overflow-hidden border-y border-theme-border/50">
                             {/* Dot Matrix Background */}
                             <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                             
                             {project.stats?.map((stat: any, index: number) => (
                                <motion.div 
                                    key={index} 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative z-10 p-5 md:p-6 flex flex-col justify-center border-theme-border/50 bg-theme-bg/80 backdrop-blur-sm"
                                    style={{
                                        borderRightWidth: index % 2 === 0 ? '1px' : '0px',
                                        borderBottomWidth: index >= (project.stats.length - (project.stats.length % 2 === 0 ? 2 : 1)) ? '0px' : '1px'
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-theme-primary/60 animate-pulse"></div>
                                        <span className="text-[8px] font-mono tracking-[0.15em] text-theme-primary uppercase">{stat.label}</span>
                                    </div>
                                    <span className="text-2xl font-black tracking-tighter text-theme-text leading-[0.9]">{stat.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CORE FEATURES */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-10">
                        <Terminal size={16} className="text-theme-primary" />
                        <h2 className="text-xs font-mono tracking-widest text-theme-text uppercase">Architecture</h2>
                    </div>

                    <div className="flex flex-col gap-6">
                        {project.features?.map((feature: any, index: number) => {
                            const Icon = feature.icon || Cpu;
                            return (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="doppelrand-outer"
                                >
                                    <div className="doppelrand-inner p-6 bg-theme-surface/30 flex flex-col gap-5">
                                        <div className="w-12 h-12 rounded-xl bg-theme-bg border border-theme-border flex items-center justify-center">
                                            <Icon size={20} className="text-theme-primary" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold tracking-tight text-theme-text mb-2">{feature.title}</h4>
                                            <p className="text-sm leading-relaxed text-theme-text-muted font-light">{feature.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* TECH STACK */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <Cpu size={16} className="text-theme-primary" />
                        <h2 className="text-xs font-mono tracking-widest text-theme-text uppercase">Tech Stack</h2>
                    </div>

                    <div className="doppelrand-outer">
                        <div className="doppelrand-inner p-6 bg-theme-bg">
                            <div className="flex flex-wrap gap-3">
                                {project.techSpecs?.map((tech: string, i: number) => (
                                    <div key={i} className="px-4 py-2 border border-theme-border rounded-lg flex items-center gap-2 bg-theme-surface/30">
                                        <CheckCircle2 size={12} className="text-theme-primary" />
                                        <span className="text-[11px] font-mono tracking-wide text-theme-text">{tech}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FULL MEDIA PREVIEW */}
                {project.mobileScreenshots && project.mobileScreenshots.length > 0 && (
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-8">
                            <Maximize2 size={16} className="text-theme-primary" />
                            <h2 className="text-xs font-mono tracking-widest text-theme-text uppercase">Full Interface Logs</h2>
                        </div>

                        <div className="flex overflow-x-auto pb-8 gap-5 snap-x snap-mandatory scrollbar-hide -mx-5 px-5">
                            {project.mobileScreenshots.map((src: string, index: number) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="snap-center shrink-0 w-[80vw] max-w-[300px] doppelrand-outer relative"
                                >
                                    <div className="doppelrand-inner p-1.5 bg-theme-bg overflow-hidden aspect-[9/19]">
                                        <img 
                                            src={src} 
                                            alt={`${project.name} UI ${index + 1}`} 
                                            className="w-full h-full object-cover rounded-[10px] opacity-90"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
