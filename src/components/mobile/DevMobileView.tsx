"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Database, Hexagon, Terminal as TerminalIcon, Smartphone, Sparkles, Send, Instagram, Youtube, Github, Activity, Dumbbell, Coffee, Zap, X } from 'lucide-react';
import AdaptiveImage from '../AdaptiveImage';

export default function DevMobileView() {
    const [terminalText, setTerminalText] = useState("");
    const [typingComplete, setTypingComplete] = useState(false);
    const [activeTechIndex, setActiveTechIndex] = useState<number | null>(null);
    const [selectedQR, setSelectedQR] = useState<string | null>(null);

    // Terminal Typing Effect
    useEffect(() => {
        const lines = [
            "> Initializing Rolex_Sir_Protocol v2.0...",
            "> Authentication: SUCCESS (CEO Level Access)",
            "> Verifying Biological Metrics...",
            "> Current Status: Kabaddi Athlete [ACTIVE]",
            "> Fuel Source: Pure Black Coffee",
            "> Fetching Ecosystem Logs...",
            "> 1.5 Years Uptime. 0 Days Off.",
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
            description: 'Building blazing fast, SEO-optimized, and highly scalable web applications.',
            skills: ['Next.js 14', 'React 18', 'Tailwind', 'Framer Motion', 'Redux', 'REST API']
        },
        { 
            name: 'Python & Pyrogram', icon: TerminalIcon, color: '#eab308', domain: 'Bot & Automation Engineering', level: 'Master Level',
            description: 'Architecting high-performance Telegram bots that handle thousands of concurrent users.',
            skills: ['Pyrogram', 'Asyncio', 'Scraping', 'Automation', 'Streaming']
        },
        { 
            name: 'Mobile App Ecosystem', icon: Smartphone, color: '#6366f1', domain: 'Full Stack App Development', level: 'Advanced Level',
            description: 'Crafting premium, native-feeling mobile applications for Android & iOS.',
            skills: ['Kotlin Native', 'Flutter', 'React Native', 'Firebase']
        },
        { 
            name: 'Node.js Ecosystem', icon: Server, color: '#22c55e', domain: 'Backend Architecture', level: 'Senior Level',
            description: 'Designing uncrackable and highly concurrent backend servers.',
            skills: ['Express.js', 'JWT', 'Socket.io', 'Microservices', 'WebSockets']
        },
        { 
            name: 'Database Architecture', icon: Database, color: '#10b981', domain: 'Data Engineering', level: 'Architect Level',
            description: 'Designing highly optimized database schemas and high-speed caching.',
            skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma', 'Sharding']
        },
        { 
            name: 'DevOps & Docker', icon: Hexagon, color: '#0ea5e9', domain: 'Cloud Infrastructure', level: 'Advanced Level',
            description: 'Deploying and scaling applications seamlessly across the cloud.',
            skills: ['Docker', 'CI/CD', 'Linux Admin', 'Nginx', 'Cloudflare']
        },
    ];

    const timeline = [
        { date: "Sept 2024", title: "The Blueprint", description: "Spent 3 months planning the entire architecture without knowing how to code." },
        { date: "Early 2025", title: "Deployments", description: "Learned coding and built Cinemahub & Groovia Bot as foundational pillars." },
        { date: "Mid 2025", title: "Expansion", description: "Built Forward Bot, Streamdrop, Button Bot, and Leech Bot to solve scaling issues." },
        { date: "Present", title: "Architecture", description: "Actively developing full-scale Apps and Websites for the ecosystem." }
    ];

    const socials = [
        { platform: 'Telegram', id: '@ROLEX_SIIR_8', qr: '/telegramqr.jpg', icon: Send, link: 'https://t.me/ROLEX_SIIR_8' },
        { platform: 'Instagram', id: 'univora8', qr: '/univora8_qr-instagram.png', icon: Instagram, link: 'https://instagram.com/univora8' },
        { platform: 'YouTube', id: '@univora8', qr: '/youtubeqr.jpg', icon: Youtube, link: 'https://www.youtube.com/@Univora8' },
        { platform: 'GitHub', id: 'univora-platform', qr: '/githubqr.jpg', icon: Github, link: 'https://github.com/univora-platform' }
    ];

    return (
        <main className="relative pt-24 pb-20 overflow-hidden">
            <div className="px-6 flex flex-col gap-16">
                
                {/* 1. HERO COMMAND CENTER */}
                <section className="flex flex-col gap-8">
                    {/* HUD Profile */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="doppelrand-outer w-full"
                    >
                        <div className="doppelrand-inner p-8 flex flex-col items-center text-center gap-6 relative overflow-hidden">
                            <div className="w-32 h-32 rounded-full border border-theme-border p-1.5 bg-theme-bg/50 shadow-2xl relative z-10">
                                <img src="/myimg.jpg" alt="Rolex Sir" className="w-full h-full object-cover rounded-full grayscale" />
                            </div>
                            <div className="z-10 relative">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-text/5 border border-theme-border text-[8px] uppercase tracking-[0.2em] font-bold text-theme-text mb-3">
                                    <Sparkles size={10} /> Founder & Architect
                                </div>
                                <h1 className="text-4xl font-black tracking-tighter text-theme-text mb-2">ROLEX SIR</h1>
                                <p className="text-theme-text-muted text-xs font-light">Building the future of the internet.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Advanced Metrics Dashboard */}
                    <div className="w-full flex flex-col gap-4 mt-4">
                        {/* System Logs */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="doppelrand-outer w-full"
                        >
                            <div className="doppelrand-inner p-6 bg-theme-bg/20 backdrop-blur-3xl flex flex-col gap-4">
                                <div className="flex items-center justify-between border-b border-theme-border/50 pb-3">
                                    <h3 className="text-[9px] uppercase tracking-[0.3em] font-bold text-theme-text-muted flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-theme-primary animate-pulse"></div> Logs
                                    </h3>
                                    <span className="text-[9px] font-mono text-theme-text-muted opacity-50">V_2.0.4</span>
                                </div>
                                <div className="font-mono text-[10px] text-theme-text-muted leading-relaxed h-full">
                                    <pre className="whitespace-pre-wrap">
                                        {terminalText}
                                        {!typingComplete && <span className="animate-pulse text-theme-primary">_</span>}
                                    </pre>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bio-Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="doppelrand-outer">
                                <div className="doppelrand-inner p-5 flex flex-col gap-4 bg-transparent">
                                    <Dumbbell className="text-theme-primary" size={18} />
                                    <div>
                                        <span className="block text-[8px] font-bold uppercase tracking-[0.2em] text-theme-text-muted mb-1">Status</span>
                                        <span className="block text-sm font-black tracking-tight text-theme-text">Athlete</span>
                                    </div>
                                </div>
                            </div>
                            <div className="doppelrand-outer">
                                <div className="doppelrand-inner p-5 flex flex-col gap-4 bg-transparent">
                                    <Coffee className="text-theme-primary" size={18} />
                                    <div>
                                        <span className="block text-[8px] font-bold uppercase tracking-[0.2em] text-theme-text-muted mb-1">Fuel</span>
                                        <span className="block text-sm font-black tracking-tight text-theme-text">Black Coffee</span>
                                    </div>
                                </div>
                            </div>
                            <div className="doppelrand-outer">
                                <div className="doppelrand-inner p-5 flex flex-col gap-4 bg-transparent">
                                    <Activity className="text-theme-primary" size={18} />
                                    <div>
                                        <span className="block text-[8px] font-bold uppercase tracking-[0.2em] text-theme-text-muted mb-1">Sugar</span>
                                        <span className="block text-sm font-black tracking-tight text-theme-text">0g</span>
                                    </div>
                                </div>
                            </div>
                            <div className="doppelrand-outer">
                                <div className="doppelrand-inner p-5 flex flex-col gap-4 bg-transparent">
                                    <Zap className="text-theme-primary" size={18} />
                                    <div>
                                        <span className="block text-[8px] font-bold uppercase tracking-[0.2em] text-theme-text-muted mb-1">Drive</span>
                                        <span className="block text-sm font-black tracking-tight text-theme-text">Infinite</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. THE GENESIS PROTOCOL (Editorial Timeline) */}
                <section className="relative w-full flex flex-col gap-8">
                    <div className="flex flex-col gap-6 border-b border-theme-border/30 pb-6">
                        <div>
                            <h2 className="text-5xl font-black tracking-tighter text-theme-text mb-4">The Genesis<br/>Protocol.</h2>
                            <p className="text-sm font-light text-theme-text-muted leading-relaxed">How one 11th grader built an entire digital empire purely out of necessity and passion.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        {timeline.map((item, idx) => (
                            <div key={idx} className="doppelrand-outer w-full group">
                                <div className="doppelrand-inner p-6 relative overflow-hidden flex flex-col gap-4 min-h-[200px]">
                                    <div className="z-10 relative">
                                        <span className="inline-block px-2 py-0.5 bg-theme-text/5 rounded border border-theme-border text-[8px] uppercase tracking-[0.2em] font-bold text-theme-primary mb-4">
                                            {item.date}
                                        </span>
                                        <h3 className="text-2xl font-black tracking-tight text-theme-text mb-3">{item.title}</h3>
                                        <p className="text-theme-text-muted text-xs font-light leading-relaxed">{item.description}</p>
                                    </div>
                                    <div className="absolute -bottom-8 -right-2 text-[8rem] leading-none font-black text-theme-text/5 pointer-events-none select-none">
                                        0{idx + 1}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. NEURAL PATHWAYS (Stack) */}
                <section className="relative w-full">
                    <div className="mb-10">
                        <h2 className="text-4xl font-black tracking-tighter text-theme-text mb-3">Neural Pathways.</h2>
                        <p className="text-sm font-light text-theme-text-muted">Mastered frameworks and technologies.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {techStack.map((tech, idx) => {
                            const Icon = tech.icon;
                            const isActive = activeTechIndex === idx;
                            return (
                                <div key={idx} className="doppelrand-outer w-full">
                                    <div 
                                        className="doppelrand-inner p-6 cursor-pointer"
                                        onClick={() => setActiveTechIndex(isActive ? null : idx)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-theme-bg/50 border border-theme-border flex items-center justify-center" style={{ color: tech.color }}>
                                                <Icon size={18} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold tracking-tight text-theme-text">{tech.name}</h3>
                                                <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-theme-text-muted">{tech.level}</span>
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pt-6 mt-6 border-t border-theme-border/50">
                                                        <p className="text-theme-text-muted text-xs font-light leading-relaxed mb-4">{tech.description}</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {tech.skills.map((skill, i) => (
                                                                <span key={i} className="px-2 py-1 rounded bg-theme-bg border border-theme-border text-[9px] font-medium text-theme-text uppercase tracking-widest">
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 4. CONNECTIONS */}
                <section className="relative w-full">
                    <div className="mb-10">
                        <h2 className="text-3xl font-black tracking-tighter text-theme-text mb-2">Establish Connection.</h2>
                        <p className="text-xs font-light text-theme-text-muted">Connect across the digital grid.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {socials.map((social, idx) => {
                            const Icon = social.icon;
                            return (
                                <div key={idx} className="doppelrand-outer">
                                    <div className="doppelrand-inner p-5 flex flex-col items-center gap-5">
                                        <div 
                                            className="w-full aspect-square bg-theme-bg/50 border border-theme-border rounded-2xl p-3 cursor-pointer"
                                            onClick={() => social.qr && setSelectedQR(social.qr)}
                                        >
                                            {social.qr ? (
                                                <img src={social.qr} alt={social.platform} className="w-full h-full object-contain bg-white rounded-lg p-1" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-theme-text-muted/50 gap-1">
                                                    <Activity size={16} />
                                                    <span className="text-[8px] font-mono uppercase tracking-widest">No Data</span>
                                                </div>
                                            )}
                                        </div>
                                        <a href={social.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
                                            <div className="w-8 h-8 rounded-full border border-theme-border bg-theme-bg/50 flex items-center justify-center text-theme-text">
                                                <Icon size={14} />
                                            </div>
                                            <div className="text-center">
                                                <h3 className="text-sm font-bold tracking-tight text-theme-text">{social.platform}</h3>
                                                <span className="text-[9px] font-mono text-theme-text-muted block truncate max-w-[80px]">{social.id}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            {/* QR MODAL */}
            <AnimatePresence>
                {selectedQR && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedQR(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative bg-theme-bg border border-theme-border rounded-3xl p-6 max-w-[300px] w-full shadow-2xl flex flex-col items-center"
                        >
                            <button onClick={() => setSelectedQR(null)} className="absolute -top-3 -right-3 w-8 h-8 bg-theme-bg border border-theme-border rounded-full flex items-center justify-center text-theme-text">
                                <X size={16} />
                            </button>
                            <div className="w-full bg-white rounded-xl p-3">
                                <img src={selectedQR} alt="QR Code" className="w-full h-auto rounded-lg" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    );
}
