import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Github, Heart, QrCode, Server, Globe, Smartphone, Database, Bot, CheckCircle2, Copy, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import GridBackground from '../components/GridBackground';
import Footer from '../components/Footer';

const Donate = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("UPI ID Copied!");
    };

    return (
        <div className="min-h-screen relative font-sans text-theme-text overflow-hidden selection:bg-theme-primary selection:text-black">
            <GridBackground />
            <main className="relative z-10 pt-32">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-24">
                
                {/* 1. HERO SECTION */}
                <section className="text-center max-w-4xl mx-auto mb-32 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[600px] h-[300px] bg-theme-primary/10 blur-[150px] pointer-events-none rounded-full"></div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8 }}
                        className="relative z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-theme-surface border border-theme-border text-[10px] font-bold tracking-[0.2em] text-theme-primary uppercase mb-8 shadow-sm">
                            <Zap size={14} className="text-theme-primary" /> Back the Vision
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
                            Fuel the <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-blue-400">Ecosystem.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-theme-text-muted leading-relaxed max-w-2xl mx-auto">
                            Univora is built independently. If you find value in our bots, tools, and platforms, consider backing our infrastructure to keep the ecosystem alive and growing.
                        </p>
                    </motion.div>
                </section>

                {/* 2. DIRECT SUPPORT (UPI) */}
                <section className="mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-theme-surface border border-theme-border rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group hover:border-theme-primary/50 transition-colors"
                    >
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-theme-primary/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-theme-primary/10 transition-colors"></div>
                        
                        <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                            <div className="w-full md:w-1/2">
                                <h2 className="text-3xl font-black mb-4 flex items-center gap-3">
                                    <QrCode className="text-theme-primary" size={32} /> Direct UPI
                                </h2>
                                <p className="text-theme-text-muted mb-8 text-lg">
                                    The most efficient way to support if you're in India. 100% of your contribution goes directly to server costs without platform fees.
                                </p>
                                
                                <div className="bg-theme-bg border border-theme-border rounded-2xl p-5 flex items-center justify-between group/copy hover:border-theme-primary/30 transition-colors">
                                    <div>
                                        <p className="text-[10px] text-theme-text-muted uppercase tracking-widest font-bold mb-1">UPI ID</p>
                                        <p className="font-mono text-lg font-bold text-theme-text">yourname@upi</p>
                                    </div>
                                    <button 
                                        onClick={() => copyToClipboard('yourname@upi')}
                                        className="p-3 bg-theme-surface hover:bg-theme-surface-hover border border-theme-border rounded-xl text-theme-text-muted hover:text-theme-primary transition-all active:scale-95"
                                        title="Copy UPI ID"
                                    >
                                        <Copy size={20} />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="w-full md:w-1/2 flex justify-center">
                                {/* Placeholder for actual QR image */}
                                <div className="w-64 h-64 bg-white p-4 rounded-3xl shadow-2xl relative group/qr">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-theme-primary/20 to-transparent rounded-3xl opacity-0 group-hover/qr:opacity-100 transition-opacity duration-500"></div>
                                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=yourname@upi&pn=Univora&cu=INR`} alt="UPI QR Code" className="w-full h-full object-contain rounded-2xl mix-blend-multiply" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 3. GLOBAL PLATFORMS GRID */}
                <section className="mb-32">
                    <div className="text-center mb-12">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-theme-text-muted uppercase flex items-center justify-center gap-4 before:content-[''] before:h-px before:w-12 before:bg-theme-border after:content-[''] after:h-px after:w-12 after:bg-theme-border opacity-60">
                            Global Platforms
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: 'GitHub Sponsors', icon: Github, desc: 'Support open-source development.', link: '#', highlight: false },
                            { name: 'Buy Me a Coffee', icon: Coffee, desc: 'Quick one-time anonymous support.', link: 'https://buymeacoffee.com/univora', highlight: true },
                            { name: 'Patreon', icon: Heart, desc: 'Monthly backing & exclusive perks.', link: '#', highlight: false },
                        ].map((platform, i) => (
                            <motion.a 
                                href={platform.link}
                                target="_blank"
                                rel="noreferrer"
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={`group relative p-8 rounded-[2rem] border transition-all duration-300 flex flex-col items-center text-center overflow-hidden
                                    ${platform.highlight 
                                        ? 'bg-theme-bg border-theme-primary/50 hover:border-theme-primary shadow-[0_0_40px_-15px_var(--color-primary)]' 
                                        : 'bg-theme-surface border-theme-border hover:border-theme-primary/40 hover:bg-theme-surface-hover'
                                    }`}
                            >
                                {platform.highlight && <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-theme-primary to-transparent"></div>}
                                
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3
                                    ${platform.highlight ? 'bg-theme-primary/10 text-theme-primary' : 'bg-theme-bg border border-theme-border text-theme-text'}`}>
                                    <platform.icon size={32} />
                                </div>
                                <h3 className="text-xl font-black mb-2">{platform.name}</h3>
                                <p className="text-theme-text-muted text-sm">{platform.desc}</p>
                                
                                <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-theme-text-muted group-hover:text-theme-primary transition-colors">
                                    Select <ArrowUpRight size={14} />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </section>

                {/* 4. WHERE IT GOES */}
                <section className="mb-32">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-theme-bg border border-theme-border p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group hover:border-theme-border/80 transition-colors"
                    >
                        {/* Shimmer effect background */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-primary/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-theme-primary/10 transition-colors"></div>
                        
                        <div className="mb-12 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-theme-surface border border-theme-border text-[10px] font-bold tracking-[0.2em] text-theme-text-muted uppercase rounded-full mb-6">
                                Allocation
                            </div>
                            <h3 className="text-3xl font-black mb-4">Infrastructure Cost Allocation</h3>
                            <p className="text-theme-text-muted max-w-2xl leading-relaxed">
                                Running high-traffic bots and web applications requires significant computing power. Here's a transparent breakdown of where the funds are utilized.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 relative z-10">
                            {[
                                { name: 'Hosting & Compute (Vercel/VPS)', percent: 50, icon: Server },
                                { name: 'Database & Storage (Supabase/AWS)', percent: 25, icon: Database },
                                { name: 'Domains, CDN & Security', percent: 15, icon: Globe },
                                { name: 'AI Models & API Costs', percent: 10, icon: Bot },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-3 text-theme-text font-bold text-sm">
                                            <div className="w-8 h-8 rounded-lg bg-theme-surface border border-theme-border flex items-center justify-center text-theme-primary">
                                                <item.icon size={16} />
                                            </div>
                                            {item.name}
                                        </div>
                                        <span className="text-theme-text-muted font-mono font-bold text-sm">{item.percent}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-theme-surface rounded-full overflow-hidden border border-theme-border/50">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.percent}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                                            className="h-full bg-theme-primary rounded-full relative overflow-hidden"
                                        >
                                            {/* Moving highlight inside the bar */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* 5. WALL OF FAME / DISCLAIMER */}
                <section className="text-center max-w-2xl mx-auto pb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-theme-surface border border-theme-border text-theme-primary mb-8 shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.15)] relative">
                        <div className="absolute inset-0 rounded-full border border-theme-primary/30 animate-ping"></div>
                        <ShieldCheck size={36} />
                    </div>
                    <h3 className="text-3xl font-black mb-6">Support is completely optional.</h3>
                    <p className="text-theme-text-muted text-lg leading-relaxed">
                        The core philosophy of Univora is accessibility. All public tools, Telegram bots, and web applications will remain <strong className="text-theme-text font-bold">free to use</strong> regardless of your ability to support.
                    </p>
                </section>
                </div>

                <Footer />
            </main>
        </div>
    );
};

export default Donate;
