import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { detailsData } from '../data/detailsData';
import { features, stats } from '../data/content';
import { ArrowUpRight, ExternalLink, Smartphone, Monitor, Cpu, Globe, Shield, Activity, ChevronDown, ArrowRight, Zap, Play, Database, Terminal as TerminalIcon } from 'lucide-react';
import AdaptiveImage from '../components/AdaptiveImage';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import SupportSection from '../components/SupportSection';
import SpotLightCard from '../components/SpotLightCard';
import GridBackground from '../components/GridBackground';

/* --- Utility Components --- */

// Number Counter Animation Component
const AnimatedNumber = ({ value }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const suffix = value.replace(/[0-9]/g, '');
    
    const spring = useSpring(0, { bounce: 0, duration: 2000 });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (isInView) {
            spring.set(numericValue);
        }
    }, [isInView, numericValue, spring]);

    useEffect(() => {
        return spring.on("change", (latest) => {
            setDisplay(Math.floor(latest));
        });
    }, [spring]);

    return (
        <span ref={ref}>
            {display}{suffix}
        </span>
    );
};



const Home = () => {
    const [isMobile, setIsMobile] = useState(false);
    const { scrollY } = useScroll();
    
    // Parallax Effects
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroScale = useTransform(scrollY, [0, 400], [1, 0.9]);

    const defaultIds = ['cinemahub-web', 'groovia-web', 'notora-web', 'skillora'];
    const defaultProjects = defaultIds.map(id => detailsData.find(item => item.id === id)).filter(Boolean);
    const [featuredProjects, setFeaturedProjects] = useState(defaultProjects);

    useEffect(() => {
        try {
            const appsFavs = JSON.parse(localStorage.getItem('univora_apps_favorites') || '[]');
            const botsFavs = JSON.parse(localStorage.getItem('univora_bots_favorites') || '[]');
            
            let allFavIds = [...appsFavs, ...botsFavs];
            
            // Pick random if > 4
            if (allFavIds.length > 4) {
                const shuffled = [...allFavIds].sort(() => 0.5 - Math.random());
                allFavIds = shuffled.slice(0, 4);
            }
            
            // Resolve favorite objects
            const favObjects = allFavIds.map(id => detailsData.find(item => item.id === id)).filter(Boolean);
            
            // Fill remaining slots
            let finalProjects = [...favObjects];
            if (finalProjects.length < 4) {
                const remainingDefaults = defaultIds
                    .filter(id => !allFavIds.includes(id))
                    .map(id => detailsData.find(item => item.id === id))
                    .filter(Boolean);
                    
                finalProjects = [...finalProjects, ...remainingDefaults].slice(0, 4);
            }
            
            if (finalProjects.length > 0) {
                setFeaturedProjects(finalProjects);
            }
        } catch (e) {
            console.error("Failed to load favorites", e);
        }
    }, []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const logos = [
        { name: 'Netflix', src: '/logos/netflix-3.svg' },
        { name: 'Spotify', src: '/logos/spotify-2.svg' },
        { name: 'Prime Video', src: '/logos/amazon-prime-video-1.svg' },
        { name: 'YouTube Music', src: '/logos/youtube-music-1.svg' },
        { name: 'Hotstar', src: '/logos/Disney+_Hotstar_2024.svg' },
        { name: 'Coursera', src: '/logos/coursera.svg' },
        { name: 'Udemy', src: '/logos/udemy-wordmark-1.svg' },
        { name: 'HBO', src: '/logos/hbo-4.svg' },
        { name: 'Hulu', src: '/logos/hulu-2.svg' },
    ];

    return (
        <div className="min-h-screen font-sans selection:bg-theme-primary selection:text-black overflow-x-hidden text-theme-text">
            <GridBackground />

            <main className="relative z-10 pt-8 md:pt-16">

                {/* --- 1. HERO SECTION (Minimalist Premium) --- */}
                <section className="min-h-[95vh] flex flex-col items-center justify-center text-center px-4 relative pt-10">
                    {/* Deep ambient core glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-theme-primary/10 blur-[150px] rounded-full pointer-events-none" />

                    <motion.div style={{ opacity: heroOpacity, y: heroY, scale: heroScale }} className="max-w-5xl mx-auto w-full z-10 relative">
                        
                        {/* Sleek status badge */}
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-border/50 bg-theme-surface/30 backdrop-blur-md mb-8 shadow-sm"
                        >
                            <div className="w-2 h-2 rounded-full bg-theme-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.8)]" />
                            <span className="text-xs font-semibold tracking-widest text-theme-text-muted uppercase">Univora Network v2.0</span>
                        </motion.div>

                        {/* Massive, clean, high-contrast typography */}
                        <motion.h1 
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.1, type: "spring" }}
                            className="text-7xl md:text-[10rem] lg:text-[12rem] font-black leading-[0.8] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-theme-text via-theme-text to-theme-bg drop-shadow-2xl"
                        >
                            UNIVORA
                        </motion.h1>

                        {/* Minimalist Subheading */}
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="text-lg md:text-2xl text-theme-text-muted font-normal max-w-2xl mx-auto mb-14 leading-relaxed"
                        >
                            The comprehensive ecosystem for your digital lifecycle. <br className="hidden md:block" />
                            <span className="text-theme-text font-medium">Build. Stream. Automate.</span>
                        </motion.p>

                        {/* Refined Buttons */}
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-center gap-5 justify-center"
                        >
                            <a href="#ecosystem" className="w-full sm:w-auto px-10 py-4 bg-theme-text hover:bg-theme-primary text-theme-bg hover:text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.2)]">
                                Launch Platform
                            </a>
                            
                            <Link to="/docs" className="w-full sm:w-auto px-10 py-4 border border-theme-border/80 bg-theme-bg/50 hover:bg-theme-surface backdrop-blur-md text-theme-text font-medium rounded-full transition-all flex items-center justify-center gap-2">
                                Explore Docs
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Elegant Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-theme-text-muted/50"
                    >
                        <ChevronDown size={24} className="animate-bounce" />
                    </motion.div>
                </section>


                {/* --- 2. ECOSYSTEM MODULES (Glassmorphic Arsenal) --- */}
                <section id="ecosystem" className="py-32 relative overflow-hidden">
                    
                    <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
                        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                            <div>
                                <h2 className="text-theme-primary font-mono text-sm tracking-[0.3em] uppercase mb-4">Core Architecture</h2>
                                <h3 className="text-5xl md:text-7xl font-black tracking-tighter">Active Nodes</h3>
                                <p className="text-theme-text-muted text-lg mt-4 max-w-xl">High-performance microservices and frontend clients currently deployed within the Univora network.</p>
                            </div>
                            {isMobile && (
                                <div className="flex items-center gap-2 text-xs font-mono text-theme-primary animate-pulse bg-theme-primary/10 px-4 py-2 rounded-full border border-theme-primary/20">
                                    <Activity size={14} /> SWIPE TO EXPLORE &rarr;
                                </div>
                            )}
                        </div>
                    </div>

                    {isMobile ? (
                        /* Mobile: Edge-to-Edge Sleek Snap Scroll */
                        <div className="flex overflow-x-auto gap-6 px-6 pb-12 snap-x snap-mandatory no-scrollbar">
                            {featuredProjects.map((project) => (
                                <div key={project.id} className="min-w-[85vw] snap-center">
                                    <div className="h-full bg-theme-surface/50 backdrop-blur-xl border border-theme-border rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
                                        {/* Subtle background glow based on project color */}
                                        <div className="absolute top-0 right-0 w-32 h-32 blur-[50px] opacity-20" style={{ backgroundColor: project.color }}></div>
                                        
                                        <div>
                                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 overflow-hidden shadow-lg border bg-theme-surface" style={{ borderColor: `${project.color}30` }}>
                                                {project.imageIcon ? (
                                                    project.imageIcon.includes('png-logos') ? (
                                                        <AdaptiveImage 
                                                            src={project.imageIcon} 
                                                            alt={project.name} 
                                                            className="w-[70%] h-[70%] relative z-10 transition-transform duration-300" 
                                                        />
                                                    ) : (
                                                        <img src={project.imageIcon} alt={project.name} className="w-full h-full object-cover" />
                                                    )
                                                ) : (
                                                    <project.icon size={32} style={{ color: project.color }} />
                                                )}
                                            </div>
                                            <div className="text-xs font-mono px-3 py-1 rounded-full bg-theme-bg border border-theme-border text-theme-text-muted inline-block mb-3">
                                                {project.type.toUpperCase()}
                                            </div>
                                            <h3 className="text-3xl font-black mb-3 text-theme-text">{project.name}</h3>
                                            <p className="text-theme-text-muted leading-relaxed mb-6">{project.description}</p>
                                        </div>
                                        
                                        <div className="flex flex-col gap-3 mt-8 relative z-10">
                                            <Link to={`/project/${project.id}`} className="w-full py-4 bg-theme-text hover:bg-theme-primary text-theme-bg font-black tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all">
                                                ACCESS TERMINAL <ArrowRight size={18} />
                                            </Link>
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full py-4 border border-theme-border bg-theme-surface/50 text-theme-text font-bold tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all">
                                                EXTERNAL LINK <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Desktop: Hyper-Polished Glassmorphic Bento Grid */
                        <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-3 gap-8 auto-rows-[350px]">
                            {featuredProjects.map((project, i) => (
                                <SpotLightCard
                                    key={project.id}
                                    className={`group relative rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 border-theme-border bg-theme-surface/40 backdrop-blur-2xl ${i === 0 || i === 3 ? 'col-span-2' : 'col-span-1'}`}
                                    spotlightColor={project.color}
                                >
                                    {/* Giant faint background number */}
                                    <span className="absolute -bottom-10 -right-4 text-[12rem] font-black text-theme-text opacity-5 select-none pointer-events-none group-hover:opacity-10 transition-colors">
                                        0{i + 1}
                                    </span>

                                    <div className="flex justify-between items-start relative z-10">
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden shadow-xl border bg-theme-bg" style={{ borderColor: `${project.color}40`, boxShadow: `0 0 30px ${project.color}20` }}>
                                            {project.imageIcon ? (
                                                project.imageIcon.includes('png-logos') ? (
                                                    <AdaptiveImage 
                                                        src={project.imageIcon} 
                                                        alt={project.name} 
                                                        className="w-[70%] h-[70%] relative z-10 transition-transform duration-300 group-hover:scale-110" 
                                                    />
                                                ) : (
                                                    <img src={project.imageIcon} alt={project.name} className="w-full h-full object-cover" />
                                                )
                                            ) : (
                                                <project.icon size={32} style={{ color: project.color }} />
                                            )}
                                        </div>
                                        <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-theme-bg border border-theme-border text-theme-text-muted shadow-inner">
                                            {project.type.toUpperCase()}
                                        </div>
                                    </div>

                                    <div className="relative z-10 mt-auto">
                                        <h3 className="text-3xl font-black mb-3 text-theme-text">{project.name}</h3>
                                        <p className="text-theme-text-muted text-base line-clamp-2 mb-8 pr-12 group-hover:text-theme-text transition-colors">
                                            {project.description}
                                        </p>

                                        <div className="flex items-center gap-6">
                                            <Link to={`/project/${project.id}`} className="inline-flex items-center gap-2 text-sm font-black tracking-widest text-theme-text hover:text-theme-primary transition-colors group/link">
                                                INITIATE SEQUENCE <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                            </Link>
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-theme-text-muted hover:text-theme-text transition-colors group/link2">
                                                LAUNCH <ExternalLink size={16} className="group-hover/link2:-translate-y-1 group-hover/link2:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                </SpotLightCard>
                            ))}
                        </div>
                    )}
                </section>


                {/* --- 3. PLATFORM INTEGRATIONS (Infinite Marquee) --- */}
                <section className="py-12 relative overflow-hidden">
                    {/* Premium Ambient Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-theme-primary/10 via-transparent to-transparent pointer-events-none"></div>
                    
                    <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-theme-surface border border-theme-border text-xs font-bold tracking-[0.2em] uppercase mb-6 text-theme-text shadow-sm">
                            <Globe size={14} className="text-theme-primary" /> Integration Matrix
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-theme-text tracking-tight">Synthesized from the DNA of Giants.</h2>
                        <p className="text-theme-text-muted mt-4 max-w-2xl mx-auto text-lg">Our architecture seamlessly integrates and processes data structures from the world's leading digital platforms.</p>
                    </div>

                    <div className="relative flex flex-col gap-6 md:gap-8 z-10">
                        {/* Edge Fade Masks */}
                        <div className="absolute inset-y-0 left-0 w-16 md:w-64 bg-gradient-to-r from-theme-bg to-transparent z-20 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-16 md:w-64 bg-gradient-to-l from-theme-bg to-transparent z-20 pointer-events-none" />

                        {/* Track 1: Left to Right */}
                        <div className="flex overflow-hidden py-2">
                            <motion.div
                                className="flex gap-6 md:gap-8 items-center min-w-max pr-6 md:pr-8"
                                animate={{ x: ["0%", "-50%"] }} 
                                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                            >
                                {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
                                    <div key={i} className="flex items-center gap-4 px-6 md:px-8 py-4 bg-theme-surface/80 backdrop-blur-md border border-theme-border rounded-full hover:border-theme-primary/50 hover:bg-theme-surface-hover transition-all duration-300 group shadow-lg hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.15)] cursor-default">
                                        <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                                            <img src={logo.src} alt={logo.name} className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" draggable="false" />
                                        </div>
                                        <span className="text-sm md:text-base font-bold text-theme-text tracking-wide whitespace-nowrap">{logo.name}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                        
                        {/* Track 2: Right to Left */}
                        <div className="flex overflow-hidden py-2">
                            <motion.div
                                className="flex gap-6 md:gap-8 items-center min-w-max pr-6 md:pr-8"
                                animate={{ x: ["-50%", "0%"] }} 
                                transition={{ duration: 45, ease: "linear", repeat: Infinity }}
                            >
                                {[...logos, ...logos, ...logos, ...logos].reverse().map((logo, i) => (
                                    <div key={i} className="flex items-center gap-4 px-6 md:px-8 py-4 bg-theme-surface/80 backdrop-blur-md border border-theme-border rounded-full hover:border-theme-primary/50 hover:bg-theme-surface-hover transition-all duration-300 group shadow-lg hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.15)] cursor-default">
                                        <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                                            <img src={logo.src} alt={logo.name} className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300" draggable="false" />
                                        </div>
                                        <span className="text-sm md:text-base font-bold text-theme-text tracking-wide whitespace-nowrap">{logo.name}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>


                {/* --- 4. SYSTEM EVOLUTION (Sticky Scroll Architecture) --- */}
                <section className="py-32 relative">
                    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                        <div className="flex flex-col lg:flex-row gap-20">
                            
                            {/* Sticky Left Column */}
                            <div className="w-full lg:w-1/3 lg:sticky lg:top-40 self-start">
                                <h2 className="text-theme-primary font-mono text-sm tracking-[0.3em] uppercase mb-4">Chronology</h2>
                                <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-tight text-theme-text">The Path to <br/> Singularity</h3>
                                <p className="text-xl text-theme-text-muted leading-relaxed mb-8">
                                    How a single developer built a multi-platform ecosystem from scratch over 1.5 years.
                                </p>
                                <Link to="/dev" className="inline-flex items-center gap-2 text-theme-text font-bold tracking-widest hover:text-theme-primary transition-colors border-b border-theme-primary/30 pb-1">
                                    VIEW CREATOR PROFILE <ArrowRight size={16} />
                                </Link>
                            </div>

                            {/* Scrolling Right Column (Timeline) */}
                            <div className="w-full lg:w-2/3 relative">
                                {/* Vertical glowing line */}
                                <div className="absolute left-4 top-0 bottom-0 w-1 bg-theme-surface-hover rounded-full">
                                    <div className="absolute top-0 w-full h-[30%] bg-gradient-to-b from-theme-primary to-transparent blur-[2px]"></div>
                                </div>

                                <div className="space-y-24 pl-16">
                                    {[
                                        { year: "GENESIS / SEPT 2024", title: "The Initialization", desc: "A solo entity (Rolex Sir) compiles the blueprint. No degree, just raw curiosity and a 10th-grade vision. The seed of Univora is planted on paper.", icon: Zap },
                                        { year: "EXECUTION / EARLY 2025", title: "Network Activation", desc: "First lines of code written. Deploying high-utility nodes: Cinemahub Bot and Groovia Bot. The foundation is set.", icon: TerminalIcon },
                                        { year: "EXPANSION / MID 2025", title: "Architectural Necessity", desc: "As data load increased, new bots were forged out of necessity. Forward Bot, Extract X, Streamdrop. A bot to solve every bottleneck.", icon: Database },
                                        { year: "SINGULARITY / PRESENT", title: "The Grand Convergence", desc: "Bridging Telegram backends with Next.js/React frontends. Creating the ultimate Web & App experience. The evolution never ceases.", icon: Globe }
                                    ].map((item, i) => (
                                        <motion.div 
                                            key={i} 
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.6 }}
                                            className="relative group"
                                        >
                                            {/* Node Dot */}
                                            <div className="absolute -left-[70px] top-1 w-10 h-10 rounded-full bg-theme-surface-hover border-4 border-theme-bg flex items-center justify-center z-10 group-hover:border-theme-primary transition-colors">
                                                <item.icon size={16} className="text-theme-text-muted group-hover:text-theme-primary transition-colors" />
                                            </div>
                                            
                                            <span className="inline-block px-3 py-1 bg-theme-surface-hover rounded-md text-xs font-mono font-bold text-theme-primary mb-4 border border-theme-border tracking-wider">
                                                {item.year}
                                            </span>
                                            <h4 className="text-3xl md:text-4xl font-black mb-4 text-theme-text group-hover:text-theme-primary transition-colors">{item.title}</h4>
                                            <p className="text-xl text-theme-text-muted leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* --- 5. LIVE METRICS (Animated Counters) --- */}
                <section id="stats" className="py-32 relative overflow-hidden">
                    {/* Background Accent */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

                    <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            
                            <div className="w-full lg:w-1/3">
                                <h2 className="text-theme-primary font-mono text-sm tracking-[0.3em] uppercase mb-4 flex items-center gap-2"><Activity size={16} /> LIVE METRICS</h2>
                                <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter text-theme-text">Processing global demand.</h3>
                                <p className="text-lg text-theme-text-muted leading-relaxed mb-8">
                                    Our distributed node network handles millions of requests daily with near-zero latency. The Univora pulse is always active.
                                </p>
                                <Link to="/status" className="px-8 py-4 bg-theme-surface-hover hover:bg-theme-bg border border-theme-border text-theme-text font-bold rounded-xl transition-all flex items-center gap-2 w-max">
                                    SYSTEM STATUS <Activity size={18} />
                                </Link>
                            </div>

                            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {stats.map((stat, i) => (
                                    <div key={i} className="bg-theme-bg border border-theme-border p-8 md:p-10 rounded-[2rem] hover:border-theme-primary transition-colors relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-theme-surface-hover rounded-full blur-[40px] group-hover:bg-theme-primary/10 transition-colors"></div>
                                        <h4 className="text-5xl md:text-6xl font-black text-theme-text mb-3">
                                            <AnimatedNumber value={stat.value} />
                                        </h4>
                                        <p className="text-theme-text-muted font-bold text-sm tracking-[0.2em] uppercase">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </section>

                <SupportSection />
                <Footer />

            </main>
        </div>
    );
};

export default Home;
