"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Code2, Server, Database, Hexagon, Terminal as TerminalIcon, Smartphone, Sparkles, Send, Instagram, Youtube, Github, Activity, Dumbbell, Coffee, Zap, X } from 'lucide-react';
import AdaptiveImage from '../AdaptiveImage';

export default function DevDesktopView() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    
    const [terminalText, setTerminalText] = useState("");
    const [typingComplete, setTypingComplete] = useState(false);
    const [activeTechIndex, setActiveTechIndex] = useState<number | null>(null);
    const [selectedQR, setSelectedQR] = useState<string | null>(null);
    const [isAvatarOpen, setIsAvatarOpen] = useState(false);

    // Terminal Typing Effect
    useEffect(() => {
        const lines = [
            "> Initializing Rolex_Sir_Protocol v2.0...",
            "> Authentication: SUCCESS (CEO Level Access)",
            "> Verifying Biological Metrics...",
            "> Current Status: Kabaddi Athlete [ACTIVE]",
            "> Fuel Source: Pure Black Coffee",
            "> Sugar Intake: 0g (Optimized Mode)",
            "> Fetching Ecosystem Logs...",
            "> 1.5 Years Uptime. 0 Days Off.",
            "> Warning: Mastermind is currently coding Apps & Web Architecture.",
            "> System Ready."
        ];

        let currentLine = 0;
        let currentChar = 0;
        let isMounted = true;

        const typeWriter = () => {
            if (!isMounted) return;

            if (currentLine < lines.length) {
                if (currentChar < lines[currentLine].length) {
                    setTerminalText(prev => prev + lines[currentLine].charAt(currentChar));
                    currentChar++;
                    setTimeout(typeWriter, Math.random() * 20 + 10);
                } else {
                    setTerminalText(prev => prev + "\n");
                    currentLine++;
                    currentChar = 0;
                    setTimeout(typeWriter, 300);
                }
            } else {
                setTypingComplete(true);
            }
        };

        setTimeout(typeWriter, 1000);
        return () => { isMounted = false; };
    }, []);

    const techStack = [
        { 
            name: 'React & Next.js', icon: Code2, color: '#3b82f6', domain: 'Full Stack Web Development', level: 'Architect Level',
            description: 'Building blazing fast, SEO-optimized, and highly scalable web applications. Mastering server-side rendering, advanced state management, and modern glassmorphic UI engineering.',
            skills: ['Next.js 14', 'React 18', 'Tailwind', 'Framer Motion', 'Redux / Zustand', 'REST API']
        },
        { 
            name: 'Python & Pyrogram', icon: TerminalIcon, color: '#eab308', domain: 'Bot & Automation Engineering', level: 'Master Level',
            description: 'Architecting high-performance Telegram bots that handle thousands of concurrent users. Seamless streaming protocols, deep database integration, and automated scraping systems.',
            skills: ['Pyrogram', 'Asyncio', 'Web Scraping', 'Data Automation', 'File-to-Link', 'Payments']
        },
        { 
            name: 'Mobile App Ecosystem', icon: Smartphone, color: '#6366f1', domain: 'Full Stack App Development', level: 'Advanced Level',
            description: 'Crafting premium, native-feeling mobile applications for Android & iOS. Seamless offline caching, real-time database syncing, and highly fluid micro-animations.',
            skills: ['Kotlin Native', 'Flutter', 'React Native', 'Firebase', 'Local SQLite', 'Push Notifications']
        },
        { 
            name: 'Node.js Ecosystem', icon: Server, color: '#22c55e', domain: 'Backend Architecture', level: 'Senior Level',
            description: 'Designing uncrackable and highly concurrent backend servers. Building secure authentication pipelines, microservices, and high-speed API endpoints.',
            skills: ['Express.js', 'JWT / OAuth2', 'Socket.io', 'Microservices', 'WebSockets', 'Rate Limiting']
        },
        { 
            name: 'Database Architecture', icon: Database, color: '#10b981', domain: 'Data Engineering', level: 'Architect Level',
            description: 'Designing highly optimized database schemas. Handling massive data queries, indexing, and high-speed caching for zero-latency responses.',
            skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Mongoose / Prisma', 'Data Sharding', 'Backups']
        },
        { 
            name: 'DevOps & Docker', icon: Hexagon, color: '#0ea5e9', domain: 'Cloud Infrastructure', level: 'Advanced Level',
            description: 'Deploying and scaling applications seamlessly across the cloud. Containerizing bots and web servers to ensure 99.99% uptime with zero downtime deployments.',
            skills: ['Docker', 'CI/CD Pipelines', 'Linux Admin', 'Nginx Proxy', 'Cloudflare', 'VPS Management']
        },
    ];

    const timeline = [
        { date: "Sept 2024 - Feb 2025", title: "The Blueprint Era", description: "Spent 3 months purely planning the entire architecture. I didn't even know how to code yet, but the vision of the ecosystem was already clear in my mind." },
        { date: "Early 2025", title: "First Deployments", description: "Learned coding and immediately went to work. Built Cinemahub Bot and Groovia Bot as the foundational pillars of the network." },
        { date: "Mid 2025", title: "Expansion by Necessity", description: "As the ecosystem grew, problems arose. I solved them by building more bots: Forward Bot & Extract X Bot to handle files, Streamdrop for seamless user downloads, Button Bot for channel interactions, Echo Trace for admin IDs, and Leech Bot to gather 3rd-party content. A bot for every problem." },
        { date: "Present", title: "The Grand Architecture", description: "Now bridging the gap between Telegram and the wider web. Actively developing the full-scale Apps and Websites for Groovia and Cinemahub." }
    ];

    const socials = [
        { platform: 'Telegram', id: '@ROLEX_SIIR_8', qr: '/telegramqr.jpg', icon: Send, link: 'https://t.me/ROLEX_SIIR_8' },
        { platform: 'Instagram', id: 'univora8', qr: '/univora8_qr-instagram.png', icon: Instagram, link: 'https://instagram.com/univora8' },
        { platform: 'YouTube', id: '@univora8', qr: '/youtubeqr.jpg', icon: Youtube, link: 'https://www.youtube.com/@Univora8' },
        { platform: 'GitHub', id: 'univora-platform', qr: '/githubqr.jpg', icon: Github, link: 'https://github.com/univora-platform' }
    ];

    // Scroll transformations for timeline line
    const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

    return (
        <main ref={containerRef} className="relative pt-24 pb-24 overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-8 lg:px-20 flex flex-col gap-20">
                
                {/* 1. HERO COMMAND CENTER */}
                <section className="grid grid-cols-12 gap-8 items-start h-auto">
                    {/* Left: HUD Profile */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                        <motion.div 
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="doppelrand-outer w-full"
                        >
                            <div className="doppelrand-inner p-10 flex flex-col items-center text-center gap-6 relative overflow-hidden group cursor-pointer" onClick={() => setIsAvatarOpen(true)}>
                                <div className="absolute inset-0 bg-theme-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                <div className="w-48 h-48 rounded-full border border-theme-border p-2 bg-theme-bg/50 shadow-2xl overflow-hidden relative z-10 group-hover:scale-105 transition-transform duration-700">
                                    <img src="/myimg.jpg" alt="Rolex Sir" className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                                </div>
                                <div className="z-10 relative">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-theme-text/5 border border-theme-border text-[10px] uppercase tracking-[0.3em] font-bold text-theme-text mb-4">
                                        <Sparkles size={12} /> Founder & Architect
                                    </div>
                                    <h1 className="text-5xl font-black tracking-tighter text-theme-text mb-2">ROLEX SIR</h1>
                                    <p className="text-theme-text-muted text-sm font-light">Building the future of the internet.<br/>One line of code at a time.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Advanced Metrics Dashboard */}
                    <div className="col-span-12 lg:col-span-8 h-full flex flex-col gap-6">
                        <div className="grid grid-cols-2 gap-6 flex-1">
                            {/* Live Feed Log */}
                            <div className="col-span-2 doppelrand-outer group">
                                <div className="doppelrand-inner h-full p-8 lg:p-12 relative overflow-hidden bg-theme-bg/20 backdrop-blur-3xl flex flex-col gap-6">
                                    <div className="flex items-center justify-between border-b border-theme-border/50 pb-4">
                                        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-theme-text-muted flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-theme-primary animate-pulse"></div> System Logs
                                        </h3>
                                        <span className="text-[10px] font-mono text-theme-text-muted opacity-50">V_2.0.4</span>
                                    </div>
                                    <div className="font-mono text-xs lg:text-sm text-theme-text-muted leading-loose h-full relative">
                                        <pre className="whitespace-pre-wrap">
                                            {terminalText}
                                            {!typingComplete && <span className="animate-pulse text-theme-primary">_</span>}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bio-Metrics Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="doppelrand-outer">
                                <div className="doppelrand-inner p-6 flex flex-col gap-8 bg-transparent">
                                    <Dumbbell className="text-theme-primary" size={24} />
                                    <div>
                                        <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-theme-text-muted mb-1">Status</span>
                                        <span className="block text-xl font-black tracking-tight text-theme-text">Athlete</span>
                                    </div>
                                </div>
                            </div>
                            <div className="doppelrand-outer">
                                <div className="doppelrand-inner p-6 flex flex-col gap-8 bg-transparent">
                                    <Coffee className="text-theme-primary" size={24} />
                                    <div>
                                        <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-theme-text-muted mb-1">Fuel</span>
                                        <span className="block text-xl font-black tracking-tight text-theme-text">Black Coffee</span>
                                    </div>
                                </div>
                            </div>
                            <div className="doppelrand-outer">
                                <div className="doppelrand-inner p-6 flex flex-col gap-8 bg-transparent">
                                    <Activity className="text-theme-primary" size={24} />
                                    <div>
                                        <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-theme-text-muted mb-1">Sugar</span>
                                        <span className="block text-xl font-black tracking-tight text-theme-text">0g</span>
                                    </div>
                                </div>
                            </div>
                            <div className="doppelrand-outer">
                                <div className="doppelrand-inner p-6 flex flex-col gap-8 bg-transparent">
                                    <Zap className="text-theme-primary" size={24} />
                                    <div>
                                        <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-theme-text-muted mb-1">Drive</span>
                                        <span className="block text-xl font-black tracking-tight text-theme-text">Infinite</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. THE GENESIS PROTOCOL (Editorial Timeline) */}
                <section className="relative w-full flex flex-col gap-16">
                    <div className="flex flex-col lg:flex-row gap-8 items-end justify-between border-b border-theme-border/30 pb-8">
                        <div className="max-w-3xl">
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-theme-text mb-6">The Genesis<br/>Protocol.</h2>
                            <p className="text-xl font-light text-theme-text-muted">How one 11th grader built an entire digital empire purely out of necessity and passion over 1.5 years.</p>
                        </div>
                        <div className="w-16 h-16 rounded-full border border-theme-border flex items-center justify-center animate-spin-slow">
                            <Hexagon size={24} className="text-theme-primary" />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8 lg:gap-12 relative">
                        {timeline.map((item, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className={`col-span-12 lg:col-span-5 doppelrand-outer group ${idx % 2 !== 0 ? 'lg:col-start-8' : 'lg:col-start-1'}`}
                            >
                                <div className="doppelrand-inner p-10 lg:p-14 bg-transparent hover:bg-theme-bg/60 transition-colors duration-700 relative overflow-hidden flex flex-col justify-between h-full min-h-[300px]">
                                    <div className="z-10 relative">
                                        <span className="inline-block px-3 py-1 bg-theme-text/5 rounded border border-theme-border text-[10px] uppercase tracking-[0.2em] font-bold text-theme-primary mb-6">
                                            {item.date}
                                        </span>
                                        <h3 className="text-4xl font-black tracking-tight text-theme-text mb-6">{item.title}</h3>
                                        <p className="text-theme-text-muted text-lg font-light leading-relaxed">{item.description}</p>
                                    </div>
                                    <div className="absolute -bottom-10 -right-4 text-[15rem] leading-none font-black text-theme-text/5 pointer-events-none select-none group-hover:text-theme-primary/10 transition-colors duration-700">
                                        0{idx + 1}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Aesthetic connection line */}
                        <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-theme-border to-transparent"></div>
                    </div>
                </section>

                {/* 3. NEURAL PATHWAYS (Interactive Grid) */}
                <section className="relative w-full flex flex-col gap-12">
                    <div>
                        <h2 className="text-6xl font-black tracking-tighter text-theme-text mb-4">Neural Pathways.</h2>
                        <p className="text-xl font-light text-theme-text-muted">The advanced technologies and frameworks mastered to construct the network.</p>
                    </div>

                    <div className="grid grid-cols-12 gap-4 h-auto lg:min-h-[600px]">
                        {/* Left: Icon Matrix */}
                        <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4 h-full">
                            {techStack.map((tech, idx) => {
                                const Icon = tech.icon;
                                const isActive = activeTechIndex === idx;
                                return (
                                    <div 
                                        key={idx}
                                        onMouseEnter={() => setActiveTechIndex(idx)}
                                        className={`doppelrand-outer w-full cursor-pointer transition-transform duration-500 ${isActive ? 'scale-[1.02]' : 'scale-100'}`}
                                    >
                                        <div className={`doppelrand-inner h-full p-8 flex flex-col justify-between items-start gap-8 transition-colors duration-500 ${isActive ? 'bg-theme-bg/80' : 'bg-transparent'}`}>
                                            <div className="w-12 h-12 rounded-xl bg-theme-bg/50 border border-theme-border flex items-center justify-center transition-colors duration-500" style={{ color: isActive ? tech.color : 'inherit' }}>
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold tracking-tight text-theme-text mb-1">{tech.name}</h3>
                                                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-theme-text-muted">{tech.level}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right: Dynamic Display Panel */}
                        <div className="col-span-12 lg:col-span-7 h-full">
                            <div className="doppelrand-outer w-full h-full">
                                <div className="doppelrand-inner h-full p-16 flex flex-col justify-center relative overflow-hidden bg-theme-bg/40 backdrop-blur-3xl">
                                    <AnimatePresence mode="wait">
                                        {activeTechIndex !== null ? (
                                            <motion.div
                                                key={activeTechIndex}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                                className="flex flex-col gap-8 relative z-10"
                                            >
                                                <div className="inline-flex px-4 py-1.5 rounded-full border border-theme-border text-[10px] uppercase tracking-[0.3em] font-bold w-fit" style={{ color: techStack[activeTechIndex].color, backgroundColor: `${techStack[activeTechIndex].color}10` }}>
                                                    {techStack[activeTechIndex].domain}
                                                </div>
                                                <h2 className="text-6xl font-black tracking-tighter text-theme-text">
                                                    {techStack[activeTechIndex].name}
                                                </h2>
                                                <p className="text-xl font-light text-theme-text-muted leading-relaxed max-w-2xl">
                                                    {techStack[activeTechIndex].description}
                                                </p>
                                                <div className="flex flex-col gap-4 mt-4">
                                                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-theme-text-muted">Core Arsenal</h4>
                                                    <div className="flex flex-wrap gap-3">
                                                        {techStack[activeTechIndex].skills.map((skill, i) => (
                                                            <span key={i} className="px-4 py-2 rounded-lg bg-theme-bg border border-theme-border text-sm font-medium text-theme-text">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="empty"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex flex-col items-center justify-center text-center gap-6 text-theme-text-muted/50 h-full"
                                            >
                                                <Activity size={48} className="animate-pulse" />
                                                <p className="text-sm font-mono uppercase tracking-widest">Hover a node to expand diagnostics</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. CONNECTIONS (Social Grid) */}
                <section className="relative w-full flex flex-col gap-12">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter text-theme-text mb-4">Establish Connection.</h2>
                        <p className="text-lg font-light text-theme-text-muted">Scan or click to connect across the digital grid.</p>
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                        {socials.map((social, idx) => {
                            const Icon = social.icon;
                            return (
                                <div key={idx} className="doppelrand-outer group">
                                    <div className="doppelrand-inner p-8 flex flex-col items-center gap-8 bg-transparent hover:bg-theme-bg/60 transition-colors duration-500">
                                        <div 
                                            className="w-full aspect-square bg-theme-bg/50 border border-theme-border rounded-3xl p-4 cursor-pointer overflow-hidden relative group-hover:border-theme-primary/30 transition-colors"
                                            onClick={() => social.qr && setSelectedQR(social.qr)}
                                        >
                                            {social.qr ? (
                                                <img src={social.qr} alt={social.platform} className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-700 bg-white rounded-xl p-2" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-theme-text-muted/50 gap-2">
                                                    <Activity size={24} />
                                                    <span className="text-[10px] font-mono uppercase tracking-widest">No Data</span>
                                                </div>
                                            )}
                                        </div>
                                        <a href={social.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 w-full hover:text-theme-primary transition-colors">
                                            <div className="w-12 h-12 rounded-full border border-theme-border bg-theme-bg/50 flex items-center justify-center text-theme-text group-hover:text-theme-primary transition-colors">
                                                <Icon size={20} />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="text-lg font-bold tracking-tight text-theme-text group-hover:text-theme-primary transition-colors">{social.platform}</h3>
                                                <span className="text-xs font-mono text-theme-text-muted">{social.id}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            {/* FULLSCREEN MODALS */}
            <AnimatePresence>
                {selectedQR && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedQR(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6 cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative bg-theme-bg border border-theme-border rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center"
                        >
                            <button onClick={() => setSelectedQR(null)} className="absolute -top-4 -right-4 w-10 h-10 bg-theme-bg border border-theme-border rounded-full flex items-center justify-center text-theme-text hover:text-theme-primary transition-colors shadow-xl">
                                <X size={20} />
                            </button>
                            <div className="w-full bg-white rounded-2xl p-4">
                                <img src={selectedQR} alt="QR Code" className="w-full h-auto rounded-xl" />
                            </div>
                            <p className="mt-6 text-theme-text-muted text-xs font-bold uppercase tracking-widest">Scan to Connect</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isAvatarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsAvatarOpen(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-6 cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl bg-theme-bg border border-theme-border rounded-[3rem] p-4 shadow-2xl flex flex-col items-center overflow-hidden"
                        >
                            <button onClick={() => setIsAvatarOpen(false)} className="absolute top-6 right-6 w-12 h-12 bg-theme-bg border border-theme-border rounded-full flex items-center justify-center text-theme-text hover:text-theme-primary transition-colors shadow-2xl z-20">
                                <X size={24} />
                            </button>
                            <div className="w-full relative overflow-hidden rounded-[2.5rem] bg-theme-bg flex justify-center">
                                <img src="/myimg.jpg" alt="Rolex Sir" className="w-full h-auto object-cover max-h-[70vh] filter contrast-125 saturate-110" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 pt-32 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center">
                                    <h2 className="text-6xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl">ROLEX SIR</h2>
                                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/30 text-[10px] font-bold tracking-[0.3em] text-theme-primary uppercase backdrop-blur-md">
                                        <Sparkles size={14} /> Founder, CEO & Architect
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    );
}
