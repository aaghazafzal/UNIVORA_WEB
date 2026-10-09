"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Shield, ChevronLeft, LayoutGrid, Terminal, Target, Copy, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StoreDetailDesktopView({ product }: { product: any }) {
    const router = useRouter();
    const { scrollY } = useScroll();
    
    // Parallax & Fade Effects
    const headerY = useTransform(scrollY, [0, 500], [0, 150]);
    const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    
    const [activePlanId, setActivePlanId] = useState<string | null>(product.plans?.[0]?.id || null);
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

    const Icon = product.icon;

    return (
        <div className="w-full relative bg-theme-bg overflow-hidden selection:bg-theme-primary selection:text-theme-bg">
            
            {/* BACKGROUND SYSTEM */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--color-primary-rgb),0.03)_0%,transparent_50%)]" />
                <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-theme-primary/20 to-transparent" />
            </div>



            {/* MAIN CONTENT AREA */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-32 pb-32 flex flex-col gap-24">
                
                {/* 1. HERO SECTION (ARMORY STYLE) */}
                <motion.div 
                    style={{ y: headerY, opacity: headerOpacity }}
                    className="w-full grid grid-cols-12 gap-12 items-center"
                >
                    {/* Left Typography */}
                    <div className="col-span-7 flex flex-col gap-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >


                            <h1 className="text-6xl lg:text-7xl font-black tracking-tight text-theme-text leading-[1.1] mb-6">
                                {product.name}
                            </h1>
                            <p className="text-2xl font-bold text-theme-primary mb-6">
                                {product.tagline}
                            </p>
                            <p className="text-xl text-theme-text-muted leading-relaxed font-medium max-w-2xl">
                                {product.description}
                            </p>
                        </motion.div>
                        
                        {/* Features List */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col gap-3 mt-4"
                        >
                            {product.features.map((feature: string, idx: number) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 size={20} className="text-theme-primary shrink-0 mt-0.5" />
                                    <span className="text-theme-text font-medium">{feature}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Visual / Data Blueprint */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="col-span-5 relative"
                    >
                        <div className="aspect-[4/5] w-full relative doppelrand-outer shadow-2xl">
                            <div className="doppelrand-inner w-full h-full bg-theme-surface/30 backdrop-blur-md overflow-hidden flex flex-col p-8">
                                
                                {/* Grid Background */}
                                <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-theme-bg/50 to-theme-bg pointer-events-none z-10" />

                                {/* Top Bar */}
                                <div className="flex justify-between items-start z-20 mb-auto">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-bold tracking-[0.3em] text-theme-text-muted uppercase">NODE.STATUS</span>
                                        <span className="text-sm font-black text-theme-primary tracking-widest uppercase">SYNCHRONIZED</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="w-2 h-2 rounded-full bg-theme-primary animate-pulse" />
                                    </div>
                                </div>

                                {/* Center Core Graphic */}
                                <div className="relative z-20 flex-grow flex items-center justify-center my-8">
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute w-48 h-48 rounded-full border border-theme-primary/20 border-dashed"
                                    />
                                    <motion.div 
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                        className="absolute w-32 h-32 rounded-full border border-theme-primary/40 border-dotted"
                                    />
                                    <div className="w-16 h-16 rounded-full bg-theme-primary/10 border border-theme-primary/50 flex items-center justify-center backdrop-blur-md">
                                        <Icon size={24} className="text-theme-primary" />
                                    </div>
                                </div>

                                {/* Bottom Telemetry Log */}
                                <div className="z-20 mt-auto flex flex-col gap-2 font-mono text-[10px] text-theme-text-muted uppercase">
                                    <div className="flex justify-between border-b border-theme-border/50 pb-2">
                                        <span>CAPACITY</span>
                                        <span className="text-theme-text font-bold">{product.metrics[0]?.value || 'MAX'}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-theme-border/50 pb-2">
                                        <span>INTEGRITY</span>
                                        <span className="text-theme-text font-bold">100% SECURE</span>
                                    </div>
                                    <div className="flex justify-between pt-1">
                                        <span>LATENCY</span>
                                        <span className="text-theme-primary font-bold">4MS PING</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* 2. METRICS GRID */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-3 gap-6"
                >
                    {product.metrics.map((metric: any, idx: number) => (
                        <div key={idx} className="p-8 rounded-2xl border border-theme-border bg-theme-surface flex flex-col justify-between group hover:border-theme-primary/30 transition-colors">
                            <span className="text-xs font-bold tracking-[0.2em] text-theme-text-muted uppercase mb-12">
                                {metric.label}
                            </span>
                            <span className="text-4xl font-black text-theme-text tracking-tight group-hover:text-theme-primary transition-colors">
                                {metric.value}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* 3. PLANS & PRICING SELECTION */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full pt-12 border-t border-theme-border"
                >
                    <div className="mb-12">
                        <h2 className="text-3xl font-black tracking-tighter text-theme-text mb-4">Acquisition Parameters</h2>
                        <p className="text-theme-text-muted text-lg font-medium max-w-2xl">
                            Select the configuration tier that matches your infrastructure requirements.
                        </p>
                    </div>

                    {product.layout === 'list' ? (
                        <div className="flex flex-col gap-4">
                            {product.plans.map((plan: any) => (
                                <div key={plan.id} className="flex items-center justify-between p-6 rounded-2xl border border-theme-border bg-theme-surface hover:border-theme-primary/50 transition-all">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xl font-bold text-theme-text">{plan.name}</span>
                                        <span className="text-sm font-medium text-theme-text-muted">{configs[`store_price_${product.id}_${plan.id}`] || plan.price}</span>
                                    </div>
                                    <a 
                                        href={configs[`store_url_${product.id}`] || "https://t.me/ROLEX_SIIR"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="doppelrand-outer group inline-block shrink-0"
                                    >
                                        <div className="doppelrand-inner flex items-center justify-center gap-3 px-8 py-3 bg-theme-surface text-theme-text group-hover:bg-theme-primary group-hover:text-theme-bg transition-colors">
                                            <span className="font-bold tracking-widest text-xs uppercase">Initialize Request</span>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {product.plans.map((plan: any) => {
                                const PlanIcon = plan.icon || Target;
                                return (
                                    <div 
                                        key={plan.id}
                                        className={`relative flex flex-col p-8 rounded-3xl border transition-all ${plan.popular ? 'border-theme-primary bg-theme-surface shadow-2xl scale-[1.02] z-10' : 'border-theme-border bg-theme-surface hover:border-theme-primary/50'}`}
                                    >
                                        {plan.popular && (
                                            <div className="absolute -top-3 left-8 px-3 py-1 bg-theme-primary text-theme-bg text-[10px] font-black tracking-widest uppercase rounded-full">
                                                Recommended
                                            </div>
                                        )}
                                        <PlanIcon size={32} className={`mb-6 ${plan.popular ? 'text-theme-primary' : 'text-theme-text-muted'}`} strokeWidth={1.5} />
                                        <h3 className="text-2xl font-black text-theme-text mb-2">{plan.name}</h3>
                                        <div className="flex flex-col gap-1 mb-8">
                                            {configs[`store_original_price_${product.id}_${plan.id}`] && (
                                                <span className="text-lg font-bold text-theme-text-muted/50 line-through">
                                                    {configs[`store_original_price_${product.id}_${plan.id}`]}
                                                </span>
                                            )}
                                            <div className="text-3xl font-bold text-theme-text">{configs[`store_price_${product.id}_${plan.id}`] || plan.price}</div>
                                        </div>

                                        <div className="flex-grow flex flex-col gap-4 mb-8">
                                            {plan.features.map((f: string, i: number) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <Check size={16} className={`shrink-0 mt-1 ${plan.popular ? 'text-theme-primary' : 'text-theme-text-muted'}`} />
                                                    <span className="text-sm font-medium text-theme-text leading-snug">{f}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <a 
                                            href={configs[`store_url_${product.id}`] || "https://t.me/ROLEX_SIIR"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="doppelrand-outer group w-full mt-auto"
                                        >
                                            <div className={`doppelrand-inner flex items-center justify-center gap-2 py-4 w-full transition-colors ${plan.popular ? 'bg-theme-primary/20 text-theme-primary group-hover:bg-theme-primary group-hover:text-theme-bg' : 'bg-theme-surface text-theme-text group-hover:bg-theme-primary group-hover:text-theme-bg'}`}>
                                                <span className="font-bold tracking-widest text-xs uppercase">Acquire System</span>
                                            </div>
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>

                {/* 4. WARNING / CONTACT DISK */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="w-full flex items-center justify-between p-8 rounded-3xl bg-theme-surface border border-theme-border"
                >
                    <div className="flex flex-col gap-2">
                        <h4 className="text-lg font-bold text-theme-text">Direct Communications Channel</h4>
                        <p className="text-sm font-medium text-theme-text-muted max-w-xl">
                            All transactions and technical integrations are handled manually. Ping @ROLEX_SIIR on Telegram with your exact specifications. No generic greetings.
                        </p>
                    </div>
                    <a 
                        href={configs[`store_url_${product.id}`] || "https://t.me/ROLEX_SIIR"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-theme-primary text-theme-bg hover:scale-110 transition-transform"
                    >
                        <Terminal size={20} />
                    </a>
                </motion.div>

            </div>
        </div>
    );
}
