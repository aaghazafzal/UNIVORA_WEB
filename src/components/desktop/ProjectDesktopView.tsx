"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Terminal, Cpu, CheckCircle2, Maximize2, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function ProjectDesktopView({ project }: { project: any }) {
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

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Gather images for the gallery
    const rawImages: any[] = [];
    if (project.laptopScreenshots && project.laptopScreenshots.length > 0) {
        rawImages.push(...project.laptopScreenshots);
    }
    
    // Ensure uniqueness and max 3 images
    const uniqueImages = Array.from(new Set(rawImages)).slice(0, 3);
    
    const [activeIndex, setActiveIndex] = useState(0);

    const getCardStyle = (index: number) => {
        if (index === activeIndex) return { zIndex: 30, x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 };
        
        const diff = (index - activeIndex + uniqueImages.length) % uniqueImages.length;
        
        // Centered Fan Layout
        if (diff === 1) {
            // Next card goes to the right
            return { zIndex: 20, x: 140, y: 30, scale: 0.85, rotate: 5, opacity: 0.6 };
        }
        if (diff === 2 || diff === -1) {
            // Previous card goes to the left
            return { zIndex: 20, x: -140, y: 30, scale: 0.85, rotate: -5, opacity: 0.6 };
        }
        
        return { zIndex: 0, opacity: 0 };
    };

    // State for Full Interface Logs
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [isHoveringLogs, setIsHoveringLogs] = useState(false);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            // using a small buffer of 5px to avoid precision issues
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [project.laptopScreenshots]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { clientWidth } = scrollContainerRef.current;
            // Scroll by 60% of the visible width
            const scrollAmount = direction === 'left' ? -(clientWidth * 0.6) : (clientWidth * 0.6);
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            // re-check scroll soon after animation
            setTimeout(checkScroll, 400);
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-theme-bg relative selection:bg-theme-primary/30">
            
            {/* LIGHTBOX MODAL */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div 
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 lg:p-10"
                        onClick={() => setLightboxImage(null)}
                    >
                        <button 
                            className="absolute top-8 right-8 w-14 h-14 flex items-center justify-center bg-theme-surface/30 border border-theme-border hover:bg-theme-primary text-white rounded-full transition-colors z-50 backdrop-blur-xl"
                            onClick={() => setLightboxImage(null)}
                        >
                            <X size={28} />
                        </button>
                        <motion.img 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                            src={lightboxImage} 
                            alt="Fullscreen Preview" 
                            className="w-full h-full object-contain drop-shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HERO SECTION - SPLIT LAYOUT */}
            <div className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 overflow-hidden px-8 lg:px-20 border-b border-theme-border/30">
                
                <motion.div 
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="z-10 w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
                >
                    {/* LEFT SIDE: Info & Actions */}
                    <div className="lg:col-span-6 flex flex-col items-start text-left">
                        
                        <div className="flex items-center gap-6 mb-10">
                            {/* Project Logo/Icon */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="w-20 h-20 rounded-2xl flex items-center justify-center bg-theme-surface/50 border border-theme-border shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.1)] backdrop-blur-xl shrink-0"
                            >
                                {project.imageIcon ? (
                                    <img src={project.imageIcon} alt={project.name} className="w-12 h-12 object-contain" />
                                ) : (
                                    project.icon && React.createElement(project.icon, { size: 40, className: "text-theme-primary" })
                                )}
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-theme-border bg-theme-surface/30 backdrop-blur-md"
                            >
                                <ShieldCheck size={14} className="text-theme-primary" />
                                <span className="text-[10px] font-mono tracking-widest text-theme-text uppercase">{project.type}</span>
                            </motion.div>
                        </div>

                        {/* Massive Title */}
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-6xl lg:text-[90px] xl:text-[100px] font-black tracking-tighter text-theme-text leading-[0.9] mb-8"
                        >
                            {project.name}.
                        </motion.h1>

                        {/* Tagline & Description */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        >
                            <h3 className="text-xl font-mono text-theme-primary tracking-widest uppercase mb-4">{project.tagline}</h3>
                            <p className="text-lg lg:text-xl text-theme-text-muted font-light leading-relaxed max-w-xl mb-12">
                                {project.description}
                            </p>
                        </motion.div>

                        {/* Action */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        >
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
                                    className="group inline-flex items-center gap-2 doppelrand-outer rounded-full p-1 transition-awwwards active:scale-[0.98] cursor-pointer w-fit"
                                >
                                    <div className="h-full rounded-full px-8 py-5 bg-theme-primary border border-theme-primary text-theme-bg flex items-center gap-4 font-bold uppercase tracking-widest text-xs shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                                        Initialize
                                        <div className="w-8 h-8 rounded-full bg-theme-bg/20 flex items-center justify-center transition-awwwards group-hover:translate-x-1.5 group-hover:-translate-y-[1px]">
                                            <ArrowUpRight size={14} className="text-theme-bg" />
                                        </div>
                                    </div>
                                    </a>
                                );
                            })()}
                        </motion.div>

                    </div>

                    {/* RIGHT SIDE: Stacked Cards Image Gallery */}
                    <div className="lg:col-span-6 w-full flex items-center justify-center relative min-h-[400px] lg:min-h-[500px]">
                        {uniqueImages.length > 0 ? (
                            <div className="relative w-full max-w-[800px] aspect-video mt-10 mr-10 flex items-center justify-center">
                                {uniqueImages.map((src: string, index: number) => {
                                    const style = getCardStyle(index);
                                    return (
                                        <motion.div
                                            key={src}
                                            onClick={() => setActiveIndex(index)}
                                            className="absolute top-0 left-0 w-full h-full doppelrand-outer cursor-pointer"
                                            animate={style}
                                            transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                                        >
                                            <div className="doppelrand-inner p-2 bg-theme-bg overflow-hidden w-full h-full shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                                <img 
                                                    src={src} 
                                                    alt={`Screenshot ${index + 1}`} 
                                                    className="w-full h-full object-cover rounded-xl"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        ) : (
                            /* Fallback if no images are available */
                            <div className="w-full aspect-video doppelrand-outer opacity-50">
                                <div className="doppelrand-inner flex items-center justify-center bg-theme-surface/10">
                                    <ShieldCheck size={100} className="text-theme-border" />
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Hero Background Grid */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
                     style={{ backgroundImage: 'linear-gradient(to right, var(--color-text) 1px, transparent 1px), linear-gradient(to bottom, var(--color-text) 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
                </div>
            </div>

            <div className="max-w-[1500px] mx-auto px-8 lg:px-20 relative z-10 pb-40">
                
                {/* METRICS GRID (Telemetry Panel) */}
                <div className="w-full mb-32 relative z-20 -mt-10">
                    <div className="doppelrand-outer shadow-2xl">
                        <div className="doppelrand-inner p-0 bg-theme-surface/40 backdrop-blur-xl flex flex-col lg:flex-row overflow-hidden relative border-y border-theme-border/50">
                            {/* Dot Matrix Background */}
                            <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                            
                            {project.stats?.map((stat: any, index: number) => (
                                <motion.div 
                                    key={index} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`relative z-10 flex-1 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-theme-border/50 flex flex-col justify-center hover:bg-theme-bg/50 transition-colors duration-500 group ${index === project.stats.length - 1 ? 'border-r-0' : ''}`}
                                >
                                    {/* Tech Accents */}
                                    <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-theme-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-theme-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    <span className="text-[10px] font-mono tracking-[0.2em] text-theme-primary uppercase mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-theme-primary/60 inline-block animate-pulse"></span>
                                        {stat.label}
                                    </span>
                                    <span className="text-4xl lg:text-5xl font-black tracking-tighter text-theme-text leading-[0.9]">{stat.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ASYMMETRICAL FEATURES ENGINE */}
                <div className="mb-40">
                    <div className="flex items-center gap-4 mb-20">
                        <Terminal size={20} className="text-theme-primary" />
                        <h2 className="text-sm font-mono tracking-widest text-theme-text uppercase">Core Architecture</h2>
                        <div className="h-px bg-theme-border/50 flex-grow ml-4"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
                        <div className="lg:col-span-5 relative">
                            <div className="sticky top-40">
                                <h3 className="text-4xl lg:text-6xl font-black tracking-tighter text-theme-text leading-tight mb-8">
                                    Engineered for <br/> Absolute Scale.
                                </h3>
                                <p className="text-lg text-theme-text-muted leading-relaxed font-light">
                                    Every module in {project.name} is built to handle maximum throughput with zero latency. 
                                    The feature set below outlines the capabilities integrated directly into the core matrix.
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-7 flex flex-col gap-8">
                            {project.features?.map((feature: any, index: number) => {
                                const Icon = feature.icon || Cpu;
                                return (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="doppelrand-outer group"
                                    >
                                        <div className="doppelrand-inner p-10 bg-theme-surface/20 hover:bg-theme-surface/50 transition-colors duration-500 flex flex-col md:flex-row gap-8 items-start">
                                            <div className="w-16 h-16 rounded-2xl bg-theme-bg border border-theme-border flex items-center justify-center shrink-0 shadow-sm">
                                                <Icon size={24} className="text-theme-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-bold tracking-tight text-theme-text mb-4">{feature.title}</h4>
                                                <p className="text-base leading-relaxed text-theme-text-muted font-light">{feature.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* TECH STACK VAULT */}
                <div className="mb-40">
                    <div className="flex items-center gap-4 mb-16">
                        <Cpu size={20} className="text-theme-primary" />
                        <h2 className="text-sm font-mono tracking-widest text-theme-text uppercase">Technology Stack</h2>
                        <div className="h-px bg-theme-border/50 flex-grow ml-4"></div>
                    </div>

                    <div className="doppelrand-outer">
                        <div className="doppelrand-inner p-0 overflow-hidden bg-theme-bg flex flex-col md:flex-row">
                            <div className="p-12 md:w-1/3 border-b md:border-b-0 md:border-r border-theme-border/50 bg-theme-surface/30">
                                <h3 className="text-2xl font-bold text-theme-text mb-4">Framework Matrix</h3>
                                <p className="text-sm text-theme-text-muted font-light">
                                    The underlying infrastructure powering the data streams and interface layers of this module.
                                </p>
                            </div>
                            <div className="p-12 md:w-2/3 flex flex-wrap gap-4 items-center align-middle bg-theme-bg">
                                {project.techSpecs?.map((tech: string, i: number) => (
                                    <div key={i} className="px-6 py-3 border border-theme-border rounded-xl flex items-center gap-3 bg-theme-surface/10 hover:bg-theme-surface/30 transition-colors">
                                        <CheckCircle2 size={14} className="text-theme-primary" />
                                        <span className="text-sm font-mono tracking-wide text-theme-text">{tech}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* MEDIA PREVIEW ENGINE (Deep Scroll) */}
                {project.laptopScreenshots && project.laptopScreenshots.length > 0 && (
                    <div>
                        <div className="flex items-center gap-4 mb-16">
                            <Maximize2 size={20} className="text-theme-primary" />
                            <h2 className="text-sm font-mono tracking-widest text-theme-text uppercase">Full Interface Logs</h2>
                            <div className="h-px bg-theme-border/50 flex-grow ml-4"></div>
                        </div>

                        <div 
                            className="relative group/gallery"
                            onMouseEnter={() => setIsHoveringLogs(true)}
                            onMouseLeave={() => setIsHoveringLogs(false)}
                        >
                            {/* Hover Navigation Arrows */}
                            <AnimatePresence>
                                {isHoveringLogs && canScrollLeft && (
                                    <motion.button
                                        key="scroll-left"
                                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                                        onClick={() => scroll('left')}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-16 h-16 flex items-center justify-center rounded-full bg-theme-surface/80 border border-theme-border backdrop-blur-xl text-theme-primary hover:bg-theme-primary hover:text-white transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                                    >
                                        <ChevronLeft size={32} />
                                    </motion.button>
                                )}
                                {isHoveringLogs && canScrollRight && (
                                    <motion.button
                                        key="scroll-right"
                                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -20, scale: 0.9 }}
                                        onClick={() => scroll('right')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-16 h-16 flex items-center justify-center rounded-full bg-theme-surface/80 border border-theme-border backdrop-blur-xl text-theme-primary hover:bg-theme-primary hover:text-white transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                                    >
                                        <ChevronRight size={32} />
                                    </motion.button>
                                )}
                            </AnimatePresence>

                            <div 
                                ref={scrollContainerRef}
                                onScroll={checkScroll}
                                className="flex overflow-x-auto pb-12 pt-4 gap-8 snap-x snap-mandatory scrollbar-hide px-8 lg:px-20"
                            >
                                {project.laptopScreenshots.map((src: string, index: number) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        onClick={() => setLightboxImage(src)}
                                        className="snap-center shrink-0 w-[60vw] max-w-3xl doppelrand-outer relative group cursor-pointer"
                                    >
                                        <div className="doppelrand-inner p-2 bg-theme-bg overflow-hidden aspect-[16/10]">
                                            <img 
                                                src={src} 
                                                alt={`${project.name} Interface ${index + 1}`} 
                                                className="w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                                            />
                                            {/* Expand Icon Hover Overlay */}
                                            <div className="absolute inset-0 bg-theme-bg/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                <div className="w-20 h-20 rounded-full bg-theme-surface/90 border border-theme-border flex items-center justify-center text-theme-primary transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.3)]">
                                                    <Maximize2 size={32} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
