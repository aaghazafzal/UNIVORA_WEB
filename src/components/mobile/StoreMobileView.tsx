"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, GraduationCap, Users, ArrowRight, Shield, Command, HardDrive } from 'lucide-react';
import { useRouter } from 'next/navigation';

const storeProductsData = [
    {
        id: 'telegram-media-database',
        name: 'Ultimate Media Database',
        type: 'Enterprise Array',
        tagline: '16TB+ • Auto Bots',
        description: 'The largest automated media repository. 16TB of structured data. Includes self-updating bots.',
        icon: Database,
        link: '/store/telegram-media-database',
        metrics: [
            { label: 'Volume', value: '16TB+' },
            { label: 'Uptime', value: '99.9%' }
        ]
    },
    {
        id: 'premium-courses-database',
        name: 'Premium Courses',
        type: 'Education Matrix',
        tagline: '50+ Ready Channels',
        description: 'Complete unrestricted access to highly curated premium paid and free courses. Instant delivery.',
        icon: GraduationCap,
        link: '/store/premium-courses-database',
        metrics: [
            { label: 'Channels', value: '50+' },
            { label: 'Updates', value: 'Lifetime' }
        ]
    },
    {
        id: 'contact-lookup-database',
        name: 'OSINT Contact DB',
        type: 'Intel Lookup',
        tagline: '250GB+ • Mobile • Aadhaar',
        description: 'Definitive OSINT CSV database for rapid raw data lookup via Phone, Aadhaar, or Telegram.',
        icon: Users,
        link: '/store/contact-lookup-database',
        metrics: [
            { label: 'Storage', value: '250GB' },
            { label: 'Format', value: 'CSV' }
        ]
    }
];

const ProductNodeMobile = ({ product, overridePrice, overrideOriginalPrice }: { product: any, overridePrice: string | undefined, overrideOriginalPrice: string | undefined }) => {
    const router = useRouter();

    return (
        <div 
            className="doppelrand-outer group cursor-pointer"
            onClick={() => router.push(product.link)}
        >
            <div className="doppelrand-inner p-0 flex flex-col bg-theme-bg/80 backdrop-blur-xl">
                
                {/* Visual / Title Top */}
                <div className="w-full relative overflow-hidden p-6 md:p-8 flex flex-col border-b border-theme-border/50 bg-theme-surface/30">
                    <div className="relative z-10 flex flex-col items-start gap-6">
                        <div className="flex items-center justify-between w-full">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-theme-bg border border-theme-border shadow-sm">
                                <product.icon size={20} className="text-theme-primary" />
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-theme-surface border border-theme-border/50">
                                <Command size={10} className="text-theme-text-muted" />
                                <span className="text-[9px] font-mono tracking-widest text-theme-text-muted uppercase">{product.type}</span>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-2xl font-black tracking-tighter text-theme-text mb-2 leading-tight">
                                {product.name}
                            </h3>
                            <p className="text-xs font-mono text-theme-primary tracking-wide uppercase mb-4">
                                {product.tagline}
                            </p>
                            <div className="flex items-baseline gap-2">
                                {overrideOriginalPrice && (
                                    <span className="text-sm font-bold text-theme-text-muted/50 line-through">{overrideOriginalPrice}</span>
                                )}
                                <span className="text-2xl font-black text-theme-text">{overridePrice || product.price || 'Pricing on request'}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Background Icon */}
                    <div className="absolute -bottom-6 -right-6 opacity-[0.02] text-theme-text pointer-events-none">
                        <HardDrive size={150} />
                    </div>
                </div>

                {/* Details Bottom */}
                <div className="w-full p-6 md:p-8 flex flex-col">
                    <p className="text-sm leading-relaxed text-theme-text-muted mb-8 font-light">
                        {product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        {product.metrics.map((metric: any, i: number) => (
                            <div key={i} className="flex flex-col gap-2">
                                <span className="text-[9px] font-mono text-theme-text-muted tracking-widest uppercase">{metric.label}</span>
                                <span className="text-base font-bold text-theme-text tracking-tight">{metric.value}</span>
                                <div className="w-full h-px bg-theme-border/50 mt-1"></div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-theme-border/30">
                        <span className="text-[10px] font-mono tracking-widest text-theme-text-muted uppercase">Ready</span>
                        <div className="flex items-center gap-2 text-theme-text">
                            <span className="font-bold text-xs tracking-widest uppercase">Initialize</span>
                            <ArrowRight size={14} className="text-theme-primary" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default function StoreMobileView() {
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

    return (
        <div className="min-h-screen relative pt-24 pb-32 overflow-hidden">
            <div className="px-5 relative z-10">
                
                {/* Hero Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-16 mt-4"
                >
                    <h1 className="text-5xl font-black tracking-tighter text-theme-text leading-[1] mb-6">
                        Data Market.
                    </h1>
                    <p className="text-sm text-theme-text-muted font-light leading-relaxed">
                        Acquire enterprise-grade structured databases and high-speed automation tools.
                    </p>
                </motion.div>

                {/* Vault Deployments */}
                <div className="flex flex-col gap-8">
                    {storeProductsData.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <ProductNodeMobile 
                                key={product.id} 
                                product={product} 
                                overridePrice={configs[`store_price_${product.id}`]}
                                overrideOriginalPrice={configs[`store_original_price_${product.id}`]}
                            />
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
