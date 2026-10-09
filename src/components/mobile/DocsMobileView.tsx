"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Shield, Server, Zap, Cpu, AlertTriangle, Code, Search, Database } from 'lucide-react';

const MacCodeBlock = ({ title, code }: { title: string, code: string }) => (
    <div className="doppelrand-outer my-6 group">
        <div className="doppelrand-inner p-0 overflow-hidden flex flex-col">
            <div className="bg-theme-bg/80 backdrop-blur-md px-4 py-2 flex items-center gap-3 border-b border-theme-border">
                <div className="flex gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                </div>
                <span className="text-[10px] font-mono text-theme-text-muted tracking-widest uppercase">{title}</span>
            </div>
            <div className="p-4 font-mono text-[11px] leading-relaxed text-[#0f0] bg-black/50 overflow-x-auto">
                <pre><code>{code}</code></pre>
            </div>
        </div>
    </div>
);

export default function DocsMobileView() {
    const [activeSection, setActiveSection] = useState('getting-started');
    const [isDockVisible, setIsDockVisible] = useState(true);
    const { scrollY } = useScroll();

    // Hide dock when Footer enters the screen
    useMotionValueEvent(scrollY, "change", () => {
        const footer = document.querySelector('footer');
        if (footer) {
            const footerTop = footer.getBoundingClientRect().top;
            // If the top of the footer is inside the viewport, hide the dock
            if (footerTop < window.innerHeight + 50) {
                setIsDockVisible(false);
            } else {
                setIsDockVisible(true);
            }
        }
    });

    const navItems = [
        { id: 'getting-started', label: 'Arch' },
        { id: 'api-access', label: 'API' },
        { id: 'bot-commands', label: 'Bots' },
        { id: 'utilities', label: 'Utils' },
    ];

    // Intersection Observer to update active nav item based on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -70% 0px' }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(id);
        }
    };

    return (
        <div className="relative min-h-screen pb-32">
            {/* Premium Bottom Dock Navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-[100] pb-[env(safe-area-inset-bottom,24px)] pointer-events-none flex justify-center">
                <AnimatePresence>
                    {isDockVisible && (
                        <motion.div 
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="pointer-events-auto mb-6 w-[90%] max-w-sm"
                        >
                            <div className="bg-theme-bg/90 backdrop-blur-2xl border border-theme-border/50 rounded-full p-1.5 flex items-center justify-between shadow-2xl">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`relative px-4 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex-1 text-center ${
                                            activeSection === item.id 
                                            ? 'text-theme-bg bg-theme-primary shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)]' 
                                            : 'text-theme-text-muted hover:text-theme-text'
                                        }`}
                                    >
                                        <span className="relative z-10 pointer-events-none">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="px-6 pt-24 flex flex-col gap-24">
                
                {/* SECTION 1: Architecture */}
                <section id="getting-started" className="scroll-mt-24">
                    <motion.h1 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl font-black tracking-tighter text-theme-text mb-6"
                    >
                        Archit-<br/>ecture.
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-base text-theme-text-muted leading-relaxed mb-10"
                    >
                        An interconnected network of high-performance Telegram bots, Web Platforms, and Mobile Applications engineered for massive scale.
                    </motion.p>

                    <div className="doppelrand-outer mb-10">
                        <div className="doppelrand-inner p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-theme-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10 text-theme-text"><Shield className="text-theme-primary" size={20} /> The Philosophy</h3>
                            <p className="text-theme-text-muted leading-relaxed relative z-10 text-sm">
                                This ecosystem was forged out of pure necessity. What started as simple media automation has evolved into a massive, distributed architecture where backend bots handle extraction, filtering, and data processing, while frictionless frontends deliver the content.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-6 text-theme-text">Core Infrastructure</h2>
                    <div className="flex flex-col gap-4">
                        <div className="doppelrand-outer">
                            <div className="doppelrand-inner p-6">
                                <Server size={24} className="text-theme-primary mb-4" />
                                <h4 className="text-lg font-bold text-theme-text mb-2">Centralized Database</h4>
                                <p className="text-theme-text-muted text-sm leading-relaxed">All bots and apps share a distributed MongoDB architecture for instant, cross-platform syncing.</p>
                            </div>
                        </div>
                        <div className="doppelrand-outer">
                            <div className="doppelrand-inner p-6">
                                <Zap size={24} className="text-theme-primary mb-4" />
                                <h4 className="text-lg font-bold text-theme-text mb-2">Multi-Worker Nodes</h4>
                                <p className="text-theme-text-muted text-sm leading-relaxed">Heavy lifting is distributed across multiple worker bots to bypass Telegram's rate limits seamlessly.</p>
                            </div>
                        </div>
                        <div className="doppelrand-outer">
                            <div className="doppelrand-inner p-6">
                                <Cpu size={24} className="text-theme-primary mb-4" />
                                <h4 className="text-lg font-bold text-theme-text mb-2">Headless Execution</h4>
                                <p className="text-theme-text-muted text-sm leading-relaxed">Python/FastAPI powers the core logic, feeding structured data directly into our React & Next.js frontend interfaces.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: API Access */}
                <section id="api-access" className="scroll-mt-24">
                    <motion.h1 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl font-black tracking-tighter text-theme-text mb-6"
                    >
                        API<br/>Protocol.
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-base text-theme-text-muted leading-relaxed mb-10"
                    >
                        To maintain unparalleled server stability and manage operational costs, API access across the Univora ecosystem is strictly regulated.
                    </motion.p>

                    <div className="doppelrand-outer">
                        <div className="doppelrand-inner p-6 border-[#FF3333]/20 bg-[#FF3333]/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF3333]/10 rounded-full blur-[40px] pointer-events-none"></div>
                            <div className="flex flex-col gap-4 relative z-10">
                                <div className="w-12 h-12 bg-[#FF3333]/10 border border-[#FF3333]/20 rounded-2xl flex items-center justify-center">
                                    <AlertTriangle size={20} className="text-[#FF3333]" />
                                </div>
                                <div>
                                    <h4 className="text-[#FF3333] font-bold text-xl mb-2 tracking-tight">API Access: CLOSED</h4>
                                    <p className="text-theme-text-muted leading-relaxed text-sm">
                                        There are <strong className="text-theme-text">NO</strong> public APIs available for interacting with our internal Telegram bots. These are proprietary tools. Any attempt to scrape or reverse-engineer bot endpoints will trigger an automatic IP ban.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: Bot Commands */}
                <section id="bot-commands" className="scroll-mt-24">
                    <motion.h1 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl font-black tracking-tighter text-theme-text mb-6"
                    >
                        Bot<br/>Reference.
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-base text-theme-text-muted leading-relaxed mb-10"
                    >
                        The autonomous backbone of the network. Our bots handle data scraping, intelligent auto-filtering, and heavy file extraction.
                    </motion.p>

                    <div className="doppelrand-outer mb-12">
                        <div className="doppelrand-inner p-6 flex flex-col gap-4">
                            <div className="w-12 h-12 bg-theme-primary/10 rounded-xl flex items-center justify-center"><Code className="text-theme-primary" size={20} /></div>
                            <div>
                                <h4 className="text-theme-text font-bold text-lg mb-1">Global Initialization</h4>
                                <p className="text-theme-text-muted text-sm">All bots respond to <code className="font-mono bg-theme-bg px-2 py-1 rounded text-theme-primary border border-theme-border text-[10px]">/start</code> to establish a session.</p>
                            </div>
                        </div>
                    </div>

                    {/* Cinemahub & Groovia */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold mb-4 text-[#229ED9]">Cinemahub & Groovia</h2>
                        <p className="text-theme-text-muted text-sm mb-6">
                            Highly advanced Auto-Filter bots using NLP to match queries instantly.
                        </p>
                        <MacCodeBlock 
                            title="Auto-Filter Protocol"
                            code={`User: Pushpa 2021\nBot : 🔍 Searching database...\nBot : ✅ Found 3 results`}
                        />
                        <div className="flex flex-col gap-4 mt-6">
                            <div className="doppelrand-outer">
                                <div className="doppelrand-inner p-6">
                                    <code className="text-theme-primary font-mono font-bold text-lg mb-2 block">/plan</code>
                                    <p className="text-theme-text-muted text-sm">Check your active subscription tier and bandwidth limits.</p>
                                </div>
                            </div>
                            <div className="doppelrand-outer">
                                <div className="doppelrand-inner p-6">
                                    <code className="text-theme-primary font-mono font-bold text-lg mb-2 block">/settings</code>
                                    <p className="text-theme-text-muted text-sm">Manage connected groups, adjust filter strictness, and UI preferences.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Extract X */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-[#F7931A]">Extract X Protocol</h2>
                        <p className="text-theme-text-muted text-sm mb-6">
                            The ultimate private content extractor.
                        </p>
                        <div className="flex flex-col gap-4">
                            <div className="doppelrand-outer">
                                <div className="doppelrand-inner p-6">
                                    <code className="text-theme-primary font-mono font-bold text-lg mb-2 block">/batch</code>
                                    <p className="text-theme-text-muted text-sm">Initialize a massive bulk extraction from a restricted source.</p>
                                </div>
                            </div>
                            <div className="doppelrand-outer">
                                <div className="doppelrand-inner p-6">
                                    <code className="text-theme-primary font-mono font-bold text-lg mb-2 block">/livebatch</code>
                                    <p className="text-theme-text-muted text-sm">Deploy a real-time monitor to extract new posts instantly.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: Utilities */}
                <section id="utilities" className="scroll-mt-24">
                    <motion.h1 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl font-black tracking-tighter text-theme-text mb-6"
                    >
                        Utilities.
                    </motion.h1>
                    <p className="text-base text-theme-text-muted leading-relaxed mb-10">
                        Specialized micro-bots designed for specific administrative and debugging tasks.
                    </p>

                    <div className="flex flex-col gap-6">
                        <div className="doppelrand-outer group">
                            <div className="doppelrand-inner p-6 flex flex-col gap-6">
                                <div className="w-12 h-12 bg-theme-bg/50 rounded-2xl flex items-center justify-center border border-theme-border shrink-0">
                                    <Search size={20} className="text-[#229ED9]" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-theme-text mb-2">Echo Trace</h4>
                                    <p className="text-theme-text-muted text-sm leading-relaxed">Reply to any message with <code className="font-mono bg-theme-bg px-2 py-0.5 rounded text-theme-text border border-theme-border text-[10px]">/id</code> to extract the raw JSON metadata and hidden numerical Telegram IDs.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="doppelrand-outer group">
                            <div className="doppelrand-inner p-6 flex flex-col gap-6">
                                <div className="w-12 h-12 bg-theme-bg/50 rounded-2xl flex items-center justify-center border border-theme-border shrink-0">
                                    <Database size={20} className="text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-theme-text mb-2">DB Link</h4>
                                    <p className="text-theme-text-muted text-sm leading-relaxed">Send any valid database ID to instantly retrieve the corresponding media file from the cloud array directly to your DM.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
