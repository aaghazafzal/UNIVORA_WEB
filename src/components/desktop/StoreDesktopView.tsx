"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, GraduationCap, Users, ArrowRight, Shield, Command, Server, HardDrive } from 'lucide-react';
import { useRouter } from 'next/navigation';

const storeProductsData = [
    {
        id: 'telegram-media-database',
        name: 'Ultimate Media Database',
        type: 'Enterprise Data Array',
        tagline: '16TB+ • High-Speed Auto Bots',
        description: 'The largest automated media repository available. 16TB of pure structured data spanning multiple decentralized nodes. Includes proprietary self-updating bots, automated scrapers, and premium file hosting integrations. Architected for instant, limitless deployment.',
        icon: Database,
        link: '/store/telegram-media-database',
        metrics: [
            { label: 'Total Volume', value: '16TB+' },
            { label: 'Uptime', value: '99.9%' },
            { label: 'Auto-Bots', value: 'Included' }
        ]
    },
    {
        id: 'premium-courses-database',
        name: 'Premium Courses Database',
        type: 'Educational Matrix',
        tagline: '50+ Ready Channels • Demos Available',
        description: 'Complete unrestricted access to highly curated premium paid and free courses. Acquire the entire master collection or cherry-pick individual modules. Delivery executed via direct encrypted channel addition or automated bot forwarding. No expiration.',
        icon: GraduationCap,
        link: '/store/premium-courses-database',
        metrics: [
            { label: 'Channels', value: '50+' },
            { label: 'Delivery', value: 'Instant' },
            { label: 'Updates', value: 'Lifetime' }
        ]
    },
    {
        id: 'contact-lookup-database',
        name: 'OSINT Contact Database',
        type: 'Intelligence Lookup',
        tagline: '250GB+ • Mobile • Aadhaar • Telegram',
        description: 'The definitive OSINT CSV database engineered for rapid raw data lookup. Execute complex queries to extract details via Phone numbers, Aadhaar, or Telegram Usernames. Massive uncompressed format. Requires 250GB dedicated free Google Drive space.',
        icon: Users,
        link: '/store/contact-lookup-database',
        metrics: [
            { label: 'Storage Reqd.', value: '250GB' },
            { label: 'Format', value: 'CSV Raw' },
            { label: 'Lookup Speed', value: '<200ms' }
        ]
    }
];

const ProductNode = ({ product, overridePrice, overrideOriginalPrice }: { product: any, overridePrice: string | undefined, overrideOriginalPrice: string | undefined }) => {
    const router = useRouter();

    return (
        <div 
            className="doppelrand-outer group cursor-pointer" 
            onClick={() => router.push(product.link)}
        >
            <div className="doppelrand-inner p-0 overflow-hidden flex flex-col lg:flex-row bg-theme-bg/80 backdrop-blur-xl">
                
                {/* Visual / Title Side */}
                <div className="w-full lg:w-1/3 relative p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-theme-border/50 bg-theme-surface/30 group-hover:bg-theme-surface transition-colors duration-500">
                    <div className="relative z-10 flex flex-col items-start gap-8">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-theme-bg border border-theme-border shadow-sm group-hover:border-theme-primary/50 transition-colors duration-500">
                            <product.icon size={24} className="text-theme-primary" />
                        </div>
                        
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Command size={12} className="text-theme-text-muted" />
                                <span className="text-[10px] font-mono tracking-widest text-theme-text-muted uppercase">{product.type}</span>
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-black tracking-tighter text-theme-text mb-3 leading-tight group-hover:text-theme-primary transition-colors duration-500">
                                {product.name}
                            </h3>
                            
                            <div className="flex items-center gap-6 mb-4">
                                <div className="flex items-baseline gap-2">
                                    {overrideOriginalPrice && (
                                        <span className="text-xl font-bold text-theme-text-muted/50 line-through mr-2">{overrideOriginalPrice}</span>
                                    )}
                                    <span className="text-3xl font-black text-theme-text">{overridePrice || product.price || 'Pricing on request'}</span>
                                </div>
                                
                                <div className="flex items-center gap-3 bg-theme-primary text-theme-bg px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] group-hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)]">
                                    Acquire Node
                                    <ArrowRight size={14} />
                                </div>
                            </div>

                            <p className="text-sm font-mono text-theme-primary tracking-wide uppercase">
                                {product.tagline}
                            </p>
                        </div>
                    </div>
                    
                    {/* Background Icon */}
                    <div className="absolute -bottom-10 -left-10 opacity-[0.03] text-theme-text pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-500">
                        <HardDrive size={300} />
                    </div>
                </div>

                {/* Details Side */}
                <div className="w-full lg:w-2/3 p-10 lg:p-12 flex flex-col justify-between">
                    <p className="text-lg lg:text-xl leading-relaxed text-theme-text-muted mb-12 max-w-3xl font-light">
                        {product.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {product.metrics.map((metric: any, i: number) => (
                            <div key={i} className="flex flex-col gap-3">
                                <span className="text-[10px] font-mono text-theme-text-muted tracking-widest uppercase">{metric.label}</span>
                                <span className="text-xl font-bold text-theme-text tracking-tight">{metric.value}</span>
                                <div className="w-full h-px bg-theme-border/50 mt-2"></div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-theme-border/30">
                        <span className="text-xs font-mono tracking-widest text-theme-text-muted uppercase">Deployment Ready</span>
                        <div className="flex items-center gap-4 text-theme-text group-hover:text-theme-primary transition-colors duration-300">
                            <span className="font-bold text-sm tracking-widest uppercase">Initialize</span>
                            <ArrowRight size={18} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default function StoreDesktopView() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const [configs, setConfigs] = useState<Record<string, any>>({});

    useEffect(() => {
        const fetchConfigs = async () => {
            try {
                const res = await fetch('/api/admin/config');
                const data = await res.json();
                if (data) {
                    setConfigs(data);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchConfigs();
    }, []);


    return (
        <div className="min-h-screen relative pt-32 pb-32 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-20 relative z-10">
                
                {/* Hero Header */}
                <motion.div 
                    style={{ y }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-24 max-w-4xl"
                >
                    <h1 className="text-6xl lg:text-[90px] font-black tracking-tighter text-theme-text leading-[0.9] mb-8">
                        Data Market.
                    </h1>
                    <p className="text-xl lg:text-2xl text-theme-text-muted font-light leading-relaxed max-w-2xl">
                        Acquire enterprise-grade structured databases and high-speed automation tools engineered to dominate the network.
                    </p>
                </motion.div>

                {/* Nodes List */}
                <div className="flex flex-col gap-10">
                    {storeProductsData.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <ProductNode 
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
