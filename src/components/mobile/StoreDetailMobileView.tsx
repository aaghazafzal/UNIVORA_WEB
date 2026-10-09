"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CheckCircle2, ChevronRight, Terminal, Shield, Check, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StoreDetailMobileView({ product }: { product: any }) {
    const router = useRouter();
    const Icon = product.icon;
    const [configs, setConfigs] = useState<Record<string, string>>({});

    React.useEffect(() => {
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

    return (
        <div className="w-full relative bg-theme-bg overflow-x-hidden selection:bg-theme-primary selection:text-theme-bg pb-24">
            
            {/* BACKGROUND */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--color-primary-rgb),0.05)_0%,transparent_60%)]" />
            </div>



            <div className="relative z-10 w-full px-5 pt-20 flex flex-col gap-16">
                
                {/* 1. HERO VISUAL & TYPOGRAPHY */}
                <div className="flex flex-col gap-8">
                    {/* Terminal Visual / Data Blueprint */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full aspect-[4/5] relative doppelrand-outer shadow-2xl"
                    >
                        <div className="doppelrand-inner w-full h-full bg-theme-surface/30 backdrop-blur-md overflow-hidden flex flex-col p-6">
                            
                            {/* Grid Background */}
                            <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-theme-bg/50 to-theme-bg pointer-events-none z-10" />

                            {/* Top Bar */}
                            <div className="flex justify-between items-start z-20 mb-auto">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-bold tracking-[0.3em] text-theme-text-muted uppercase">NODE.STATUS</span>
                                    <span className="text-xs font-black text-theme-primary tracking-widest uppercase">SYNCHRONIZED</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-theme-primary animate-pulse" />
                                </div>
                            </div>

                            {/* Center Core Graphic */}
                            <div className="relative z-20 flex-grow flex items-center justify-center my-6">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-40 h-40 rounded-full border border-theme-primary/20 border-dashed"
                                />
                                <motion.div 
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-28 h-28 rounded-full border border-theme-primary/40 border-dotted"
                                />
                                <div className="w-12 h-12 rounded-full bg-theme-primary/10 border border-theme-primary/50 flex items-center justify-center backdrop-blur-md">
                                    <Icon size={20} className="text-theme-primary" />
                                </div>
                            </div>

                            {/* Bottom Telemetry Log */}
                            <div className="z-20 mt-auto flex flex-col gap-2 font-mono text-[9px] text-theme-text-muted uppercase">
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
                    </motion.div>

                    {/* Typography */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >

                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-theme-text leading-tight mb-4">
                            {product.name}
                        </h1>
                        <p className="text-lg font-bold text-theme-primary mb-4">
                            {product.tagline}
                        </p>
                        <p className="text-base text-theme-text-muted leading-relaxed font-medium mb-8">
                            {product.description}
                        </p>

                        <div className="flex flex-col gap-3">
                            {product.features.map((feature: string, idx: number) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 size={18} className="text-theme-primary shrink-0 mt-0.5" />
                                    <span className="text-sm text-theme-text font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* 2. METRICS STACK */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-3"
                >
                    {product.metrics.map((metric: any, idx: number) => (
                        <div key={idx} className="p-6 rounded-[1.5rem] border border-theme-border bg-theme-surface flex items-center justify-between">
                            <span className="text-xs font-bold tracking-widest text-theme-text-muted uppercase">
                                {metric.label}
                            </span>
                            <span className="text-2xl font-black text-theme-text">
                                {metric.value}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* 3. PLANS */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full"
                >
                    <h2 className="text-2xl font-black tracking-tight text-theme-text mb-6">Configuration</h2>

                    {product.layout === 'list' ? (
                        <div className="flex flex-col gap-3">
                            {product.plans.map((plan: any) => (
                                <div key={plan.id} className="flex flex-col gap-4 p-5 rounded-2xl border border-theme-border bg-theme-surface">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold text-theme-text">{plan.name}</span>
                                        {configs[`store_original_price_${product.id}_${plan.id}`] && (
                                            <span className="text-xs font-bold text-theme-text-muted/50 line-through">
                                                {configs[`store_original_price_${product.id}_${plan.id}`]}
                                            </span>
                                        )}
                                        <span className="text-sm font-medium text-theme-text-muted">{configs[`store_price_${product.id}_${plan.id}`] || plan.price}</span>
                                    </div>
                                    <a 
                                        href={configs[`store_url_${product.id}`] || "https://t.me/ROLEX_SIIR"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="doppelrand-outer group w-full"
                                    >
                                        <div className="doppelrand-inner flex items-center justify-center gap-3 w-full py-4 bg-theme-surface text-theme-text group-hover:bg-theme-primary group-hover:text-theme-bg transition-colors">
                                            <span className="font-bold tracking-widest text-[10px] uppercase">Initialize</span>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {product.plans.map((plan: any) => {
                                const PlanIcon = plan.icon || Target;
                                return (
                                    <div 
                                        key={plan.id}
                                        className={`relative flex flex-col p-6 rounded-[2rem] border ${plan.popular ? 'border-theme-primary bg-theme-surface/80' : 'border-theme-border bg-theme-surface'}`}
                                    >
                                        {plan.popular && (
                                            <div className="absolute -top-3 left-6 px-3 py-1 bg-theme-primary text-theme-bg text-[9px] font-black tracking-widest uppercase rounded-full">
                                                Recommended
                                            </div>
                                        )}
                                        <PlanIcon size={28} className={`mb-4 ${plan.popular ? 'text-theme-primary' : 'text-theme-text-muted'}`} strokeWidth={1.5} />
                                        <h3 className="text-xl font-black text-theme-text mb-1">{plan.name}</h3>
                                        <div className="flex flex-col gap-1 mb-6">
                                            {configs[`store_original_price_${product.id}_${plan.id}`] && (
                                                <span className="text-sm font-bold text-theme-text-muted/50 line-through">
                                                    {configs[`store_original_price_${product.id}_${plan.id}`]}
                                                </span>
                                            )}
                                            <div className="text-2xl font-bold text-theme-text">{configs[`store_price_${product.id}_${plan.id}`] || plan.price}</div>
                                        </div>

                                        <div className="flex-grow flex flex-col gap-3 mb-6">
                                            {plan.features.map((f: string, i: number) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <Check size={14} className={`shrink-0 mt-1 ${plan.popular ? 'text-theme-primary' : 'text-theme-text-muted'}`} />
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
                                                <span className="font-bold tracking-widest text-[10px] uppercase">Acquire System</span>
                                            </div>
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>

                {/* 4. COMM CHANNEL WARNING */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="w-full p-6 rounded-3xl bg-theme-surface border border-theme-border text-center flex flex-col items-center gap-4"
                >
                    <Terminal size={24} className="text-theme-primary" />
                    <div>
                        <h4 className="text-base font-bold text-theme-text mb-2">Direct Comms</h4>
                        <p className="text-sm font-medium text-theme-text-muted">
                            Ping @ROLEX_SIIR on Telegram with specific requirements. Manual integration only.
                        </p>
                    </div>
                    <a 
                        href={configs[`store_url_${product.id}`] || "https://t.me/ROLEX_SIIR"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-theme-primary font-bold text-sm underline mt-2"
                    >
                        Initiate Contact
                    </a>
                </motion.div>

            </div>
        </div>
    );
}
