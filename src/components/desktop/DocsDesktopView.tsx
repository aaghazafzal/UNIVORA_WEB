"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Zap, Cpu, AlertTriangle, Code, Search, Database } from 'lucide-react';

const MacCodeBlock = ({ title, code }: { title: string, code: string }) => (
    <div className="doppelrand-outer my-6 group">
        <div className="doppelrand-inner p-0 overflow-hidden flex flex-col">
            <div className="bg-theme-bg/80 backdrop-blur-md px-4 py-3 flex items-center gap-3 border-b border-theme-border">
                <div className="flex gap-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <span className="text-xs font-mono text-theme-text-muted tracking-widest uppercase">{title}</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed text-[#0f0] bg-black/50 overflow-x-auto">
                <pre><code>{code}</code></pre>
            </div>
        </div>
    </div>
);

export default function DocsDesktopView() {
    const [activeSection, setActiveSection] = useState('getting-started');

    // Smooth scroll handler
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Account for top padding
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Intersection Observer to update active nav item
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

    const navItems = [
        { id: 'getting-started', label: 'Architecture' },
        { id: 'api-access', label: 'API Access' },
        { id: 'bot-commands', label: 'Bot Reference' },
        { id: 'utilities', label: 'Utilities' },
    ];

    return (
        <div className="relative min-h-screen">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-20 py-24 grid grid-cols-12 gap-16 relative items-start">
                
                {/* LEFT: Sticky Index (Col-Span 3) */}
                <aside className="col-span-3 hidden lg:block sticky top-32">
                    <div className="doppelrand-outer group">
                        <div className="doppelrand-inner p-6">
                            <div className="mb-8">
                                <h3 className="text-xs font-bold tracking-[0.2em] text-theme-text-muted uppercase mb-3">The Codex</h3>
                                <div className="w-12 h-1 bg-theme-primary/20 rounded-full"></div>
                            </div>
                            <nav className="flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`text-left px-4 py-3 rounded-xl transition-all font-mono text-sm uppercase tracking-wider relative overflow-hidden group/nav ${
                                            activeSection === item.id 
                                            ? 'text-theme-text bg-theme-primary/10 font-bold border border-theme-primary/20 shadow-[inset_0_0_20px_rgba(var(--color-primary-rgb),0.1)]' 
                                            : 'text-theme-text-muted hover:text-theme-text hover:bg-theme-bg/50 border border-transparent'
                                        }`}
                                    >
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 transition-transform duration-300 ${activeSection === item.id ? 'bg-theme-primary scale-y-100 shadow-[0_0_10px_var(--color-primary)]' : 'bg-theme-border scale-y-0 group-hover/nav:scale-y-50'}`}></div>
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </aside>

                {/* RIGHT: Master Content Scroll (Col-Span 9) */}
                <main className="col-span-12 lg:col-span-9 pb-32 flex flex-col gap-32">
                    
                    {/* SECTION 1: Architecture */}
                    <section id="getting-started" className="scroll-mt-24">
                        <motion.h1 
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-6xl font-black tracking-tighter text-theme-text mb-6"
                        >
                            Architecture.
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-xl text-theme-text-muted leading-relaxed mb-12 max-w-3xl"
                        >
                            The technical foundation of the Univora Ecosystem. An interconnected network of high-performance Telegram bots, Web Platforms, and Mobile Applications engineered for massive scale.
                        </motion.p>

                        <div className="doppelrand-outer mb-12">
                            <div className="doppelrand-inner p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-theme-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 relative z-10 text-theme-text"><Shield className="text-theme-primary" /> The Philosophy</h3>
                                <p className="text-theme-text-muted leading-relaxed relative z-10 text-lg">
                                    This ecosystem was forged out of pure necessity. What started as simple media automation has evolved into a massive, distributed architecture where backend bots handle extraction, filtering, and data processing, while frictionless frontends deliver the content to the end user.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold mb-8 text-theme-text">Core Infrastructure</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="doppelrand-outer group">
                                <div className="doppelrand-inner p-8 h-full">
                                    <Server size={28} className="text-theme-primary mb-6" />
                                    <h4 className="text-xl font-bold text-theme-text mb-2">Centralized Database</h4>
                                    <p className="text-theme-text-muted leading-relaxed">All bots and apps share a distributed MongoDB architecture for instant, cross-platform syncing.</p>
                                </div>
                            </div>
                            <div className="doppelrand-outer group">
                                <div className="doppelrand-inner p-8 h-full">
                                    <Zap size={28} className="text-theme-primary mb-6" />
                                    <h4 className="text-xl font-bold text-theme-text mb-2">Multi-Worker Nodes</h4>
                                    <p className="text-theme-text-muted leading-relaxed">Heavy lifting (streaming/extracting) is distributed across multiple worker bots to bypass Telegram's rate limits seamlessly.</p>
                                </div>
                            </div>
                            <div className="doppelrand-outer group col-span-2">
                                <div className="doppelrand-inner p-8">
                                    <Cpu size={28} className="text-theme-primary mb-6" />
                                    <h4 className="text-xl font-bold text-theme-text mb-2">Headless Execution</h4>
                                    <p className="text-theme-text-muted leading-relaxed max-w-2xl">Python/FastAPI powers the core logic, feeding structured data directly into our React & Next.js frontend interfaces for zero-latency rendering.</p>
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
                            className="text-6xl font-black tracking-tighter text-theme-text mb-6"
                        >
                            API Protocol.
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-xl text-theme-text-muted leading-relaxed mb-12 max-w-3xl"
                        >
                            To maintain unparalleled server stability and manage operational costs, API access across the Univora ecosystem is strictly regulated.
                        </motion.p>

                        <div className="doppelrand-outer group">
                            <div className="doppelrand-inner p-8 border-[#FF3333]/20 bg-[#FF3333]/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF3333]/10 rounded-full blur-[80px] pointer-events-none"></div>
                                <div className="flex items-start gap-6 relative z-10">
                                    <div className="w-14 h-14 bg-[#FF3333]/10 border border-[#FF3333]/20 rounded-2xl flex items-center justify-center shrink-0">
                                        <AlertTriangle size={24} className="text-[#FF3333]" />
                                    </div>
                                    <div>
                                        <h4 className="text-[#FF3333] font-bold text-2xl mb-3 tracking-tight">API Access: CLOSED</h4>
                                        <p className="text-theme-text-muted leading-relaxed text-lg">
                                            There are <strong className="text-theme-text">NO</strong> public APIs available for interacting with our internal Telegram bots (Extract X, Forward Bot, Streamdrop, etc.). These are proprietary, closed-source tools. Any attempt to scrape or reverse-engineer bot endpoints will trigger an automatic IP ban.
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
                            className="text-6xl font-black tracking-tighter text-theme-text mb-6"
                        >
                            Bot Reference.
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-xl text-theme-text-muted leading-relaxed mb-12 max-w-3xl"
                        >
                            The autonomous backbone of the Univora network. Our proprietary bots handle data scraping, intelligent auto-filtering, and heavy file extraction.
                        </motion.p>

                        <div className="doppelrand-outer mb-16">
                            <div className="doppelrand-inner p-6 flex items-center gap-6">
                                <div className="p-4 bg-theme-primary/10 rounded-xl"><Code className="text-theme-primary" size={24} /></div>
                                <div>
                                    <h4 className="text-theme-text font-bold text-lg mb-1">Global Initialization</h4>
                                    <p className="text-theme-text-muted">All bots in the ecosystem respond to <code className="font-mono bg-theme-bg px-2 py-1 rounded text-theme-primary border border-theme-border">/start</code> to establish a secure session.</p>
                                </div>
                            </div>
                        </div>

                        {/* Cinemahub & Groovia */}
                        <div className="mb-20">
                            <h2 className="text-3xl font-bold mb-4 text-[#229ED9]">Cinemahub & Groovia</h2>
                            <p className="text-theme-text-muted text-lg mb-8 max-w-3xl">
                                Highly advanced Auto-Filter bots. They use natural language processing to match queries against the database instantly.
                            </p>
                            <MacCodeBlock 
                                title="Auto-Filter Protocol"
                                code={`User: Pushpa 2021\nBot : 🔍 Searching database...\nBot : ✅ Found 3 results for "Pushpa 2021"\n      [1080p] [720p] [480p] (Interactive Buttons)`}
                            />
                            <div className="grid grid-cols-2 gap-6 mt-8">
                                <div className="doppelrand-outer">
                                    <div className="doppelrand-inner p-6">
                                        <code className="text-theme-primary font-mono font-bold text-xl mb-3 block">/plan</code>
                                        <p className="text-theme-text-muted">Check your active subscription tier and bandwidth limits.</p>
                                    </div>
                                </div>
                                <div className="doppelrand-outer">
                                    <div className="doppelrand-inner p-6">
                                        <code className="text-theme-primary font-mono font-bold text-xl mb-3 block">/settings</code>
                                        <p className="text-theme-text-muted">Manage connected groups, adjust filter strictness, and UI preferences.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Extract X */}
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-[#F7931A]">Extract X Protocol</h2>
                            <p className="text-theme-text-muted text-lg mb-8 max-w-3xl">
                                The ultimate private content extractor. Designed to securely mirror and bypass restricted channel limitations at high speeds.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="doppelrand-outer">
                                    <div className="doppelrand-inner p-6">
                                        <code className="text-theme-primary font-mono font-bold text-xl mb-3 block">/batch</code>
                                        <p className="text-theme-text-muted">Initialize a massive bulk extraction from a restricted source to your destination.</p>
                                    </div>
                                </div>
                                <div className="doppelrand-outer">
                                    <div className="doppelrand-inner p-6">
                                        <code className="text-theme-primary font-mono font-bold text-xl mb-3 block">/livebatch</code>
                                        <p className="text-theme-text-muted">Deploy a real-time monitor to instantly extract new posts the moment they are uploaded.</p>
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
                            className="text-6xl font-black tracking-tighter text-theme-text mb-6"
                        >
                            Utilities.
                        </motion.h1>
                        <p className="text-xl text-theme-text-muted leading-relaxed mb-12 max-w-3xl">
                            Specialized micro-bots designed for specific administrative and debugging tasks across the network.
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="doppelrand-outer group">
                                <div className="doppelrand-inner p-8 flex items-center gap-8">
                                    <div className="w-16 h-16 bg-theme-bg/50 rounded-2xl flex items-center justify-center border border-theme-border shrink-0">
                                        <Search size={28} className="text-[#229ED9]" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-theme-text mb-2">Echo Trace</h4>
                                        <p className="text-theme-text-muted text-lg">Reply to any message with <code className="font-mono bg-theme-bg px-2 py-0.5 rounded text-theme-text border border-theme-border text-sm">/id</code> to extract the raw JSON metadata and hidden numerical Telegram IDs of the sender, chat, and media.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="doppelrand-outer group">
                                <div className="doppelrand-inner p-8 flex items-center gap-8">
                                    <div className="w-16 h-16 bg-theme-bg/50 rounded-2xl flex items-center justify-center border border-theme-border shrink-0">
                                        <Database size={28} className="text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-theme-text mb-2">DB Link</h4>
                                        <p className="text-theme-text-muted text-lg">Send any valid database ID to instantly retrieve the corresponding media file from the cloud array directly to your DM.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}
