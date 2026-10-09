import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, Zap, RefreshCw, Send, Database, MessagesSquare, Star, GraduationCap, PlayCircle, Code2, LineChart, Server, Film, Users, HardDrive } from 'lucide-react';
import AdaptiveImage from '../components/AdaptiveImage';
import Footer from '../components/Footer';

// Dummy data for the specific product (In a real app, this might come from an API or a shared data file)
const productDetails = {
    'telegram-media-database': {
        name: 'Ultimate Media Database',
        tagline: '10M+ Files • Multi-Language • Multi-Quality',
        description: 'Launch your own massive Telegram media empire instantly. Access our massive distributed database across multiple channels containing Movies, Series, Anime, Dramas, and Cartoons.',
        icon: Database,
        imageIcon: '/logos/store-logo/ultimate-media-database.png',
        color: '#3b82f6',
        features: [
            '10M+ Media Files across multiple channels',
            'Multi-Quality (480p, 720p, 1080p, 4K)',
            'Multi-Language (English, Hindi, Tamil, Telugu, Spanish, etc.)',
            'Multiple Subtitles Included',
            'Free Basic Setup Guide included for all plans'
        ],
        plans: [
            {
                id: 'basic',
                name: 'Basic Access',
                price: '₹3,999',
                icon: Database,
                color: 'text-blue-400',
                bg: 'bg-blue-500/10',
                border: 'border-blue-500/30',
                popular: false,
                features: [
                    'Access to 10M+ Database Channels',
                    'Free Setup Guide provided',
                    'Use your own forwarder bots',
                    'Manual updating required'
                ]
            },
            {
                id: 'pro',
                name: 'Pro Forwarder',
                price: '₹5,999',
                icon: Send,
                color: 'text-purple-400',
                bg: 'bg-purple-500/10',
                border: 'border-purple-500/30',
                popular: true,
                features: [
                    'Everything in Basic',
                    'Premium Forward Bot Access',
                    'Parallel Task Support (Super Fast)',
                    'Forward from multiple channels simultaneously without limits'
                ]
            },
            {
                id: 'elite',
                name: 'Elite Filter',
                price: '₹8,999',
                icon: MessagesSquare,
                color: 'text-orange-400',
                bg: 'bg-orange-500/10',
                border: 'border-orange-500/30',
                popular: false,
                features: [
                    'Everything in Pro',
                    'Filter Bot Source Code provided',
                    'Full Setup Guide for Filter Bot',
                    'Users can search media directly in your groups'
                ]
            },
            {
                id: 'ultimate',
                name: 'Ultimate Auto-Sync',
                price: '₹14,999',
                icon: RefreshCw,
                color: 'text-green-400',
                bg: 'bg-green-500/10',
                border: 'border-green-500/30',
                popular: false,
                features: [
                    'Everything in Elite',
                    'Auto-Sync Bot Integration',
                    'New Movies/Series auto-updated to your channels',
                    'Fully automated zero-maintenance empire'
                ]
            }
        ]
    },
    'premium-courses-database': {
        name: 'Premium Courses Database',
        tagline: '50+ Ready Channels • Demos Available',
        description: 'Get access to premium paid and free courses. Buy the whole collection or individual courses. If you want details and demos for all courses, please join our Course Channel (link coming soon).',
        icon: GraduationCap,
        imageIcon: '/logos/store-logo/premium-course-database.png',
        color: '#f59e0b',
        layout: 'list',
        features: [
            '50+ Ready Telegram Channels',
            'Demos available for every course',
            'Many free courses included',
            'Buy individual courses or full bundles'
        ],
        plans: [
            {
                id: 'course-1',
                name: 'SIGMA 9.0 (Apna College)',
                price: 299
            },
            {
                id: 'course-2',
                name: 'DSA C++ (Apna College)',
                price: 299
            },
            {
                id: 'course-3',
                name: 'Data Science Master',
                price: 299
            },
            {
                id: 'course-4',
                name: 'Full Stack Data Science (Prakash)',
                price: 299
            },
            {
                id: 'course-5',
                name: 'Video Editing Course (Tarun)',
                price: 199
            }
        ]
    },
    'contact-lookup-database': {
        name: 'OSINT Contact Database',
        tagline: '250GB+ • CSV Format • Multi-Parameter Lookup',
        description: 'Comprehensive OSINT CSV database for data lookup. Find details via Phone numbers, Aadhaar, or Telegram Usernames. Requires 250GB free Google Drive space.',
        icon: Users,
        imageIcon: '/logos/store-logo/osint-contact-database.png',
        color: '#ef4444',
        features: [
            'Search via Mobile Numbers',
            'Search via Aadhaar Details',
            'Search via Telegram Usernames',
            'Massive 250GB+ CSV Dataset',
            'Provided directly to your Google Drive'
        ],
        plans: [
            {
                id: 'full-database',
                name: 'Full Database Access',
                price: '₹9,999',
                icon: HardDrive,
                color: 'text-red-400',
                bg: 'bg-red-500/10',
                border: 'border-red-500/30',
                popular: true,
                features: [
                    'Complete 250GB+ Dataset',
                    'Mobile, Aadhaar & TG lookups',
                    'Direct Google Drive Transfer',
                    '⚠️ STRICT REQUIREMENT: You MUST have a Gmail account with at least 250GB free space.'
                ]
            }
        ]
    }
};

const StoreDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = productDetails[id];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center font-sans text-theme-text bg-theme-bg">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                    <Link to="/store" className="text-theme-primary hover:underline">Return to Store</Link>
                </div>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-[rgb(var(--color-primary))] selection:text-[rgb(var(--color-bg))]">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-theme-primary/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-theme-primary/5 blur-[120px]" />
            </div>

            <main className="relative z-10 flex-grow px-4 md:px-8 py-12 max-w-7xl mx-auto w-full">
                
                {/* Back Button */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
                    <button 
                        onClick={() => navigate('/store')}
                        className="flex items-center gap-2 text-theme-text-muted hover:text-theme-text transition-colors text-sm font-bold tracking-widest uppercase"
                    >
                        <ArrowLeft size={16} /> Back to Store
                    </button>
                </motion.div>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-primary/30 bg-theme-primary/10 text-xs font-bold text-theme-primary tracking-widest mb-6">
                            <Star size={14} className="inline" /> PREMIUM ASSET
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-theme-text mb-4">
                            {product.name}
                        </h1>
                        <p className="text-xl font-semibold text-theme-primary mb-6">
                            {product.tagline}
                        </p>
                        <p className="text-lg text-theme-text-muted leading-relaxed mb-8">
                            {product.description}
                        </p>
                        
                        <div className="space-y-3">
                            {product.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm font-medium text-theme-text">
                                    <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-[3rem] bg-theme-surface/30 border border-theme-border flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/20 to-transparent opacity-50"></div>
                            
                            {product.imageIcon ? (
                                <AdaptiveImage 
                                    src={product.imageIcon} 
                                    alt={product.name} 
                                    className="w-32 h-32 sm:w-48 sm:h-48 relative z-10 transition-transform duration-300" 
                                />
                            ) : (
                                <product.icon size={120} className="text-theme-primary opacity-80" strokeWidth={1} />
                            )}
                            
                            {/* Decorative floating elements */}
                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/4 left-1/4 p-4 rounded-2xl bg-theme-bg/80 border border-theme-border shadow-xl backdrop-blur-md">
                                <Shield size={24} className="text-blue-400" />
                            </motion.div>
                            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-1/4 right-1/4 p-4 rounded-2xl bg-theme-bg/80 border border-theme-border shadow-xl backdrop-blur-md">
                                <Zap size={24} className="text-yellow-400" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Pricing / Plans Section */}
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-theme-text mb-4">
                        Choose Your Setup
                    </h2>
                    <p className="text-theme-text-muted max-w-2xl mx-auto">
                        Whether you just need the raw data or a fully automated zero-maintenance channel, we have a plan for you.
                    </p>
                </div>

                {product.layout === 'list' ? (
                    <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                        <div className="bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-sm font-medium p-5 rounded-2xl mb-4 leading-relaxed">
                            <strong>Note:</strong> The prices listed below are for <strong>Direct Channel Addition (Content Only)</strong>. If you want automated delivery via Forward Bot to your own channel, it will cost an additional <strong>₹99+</strong> per course.<br/><br/>
                            Join our <a href="#" className="underline font-bold" onClick={(e) => {e.preventDefault(); alert('Course channel link will be added here soon!');}}>Course Details Channel</a> to see the full catalog and request demos.
                        </div>
                        {product.plans.map(plan => (
                            <div key={plan.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-theme-surface/50 border border-theme-border hover:border-theme-primary/50 transition-all">
                                <div className="mb-4 sm:mb-0">
                                    <h3 className="text-lg font-bold text-theme-text mb-1">{plan.name}</h3>
                                    <div className="text-theme-text-muted text-sm">
                                        Channel Addition: <span className="text-theme-text font-bold">₹{plan.price}</span> 
                                        <span className="mx-3 opacity-50">•</span> 
                                        Bot Delivery: <span className="text-theme-primary font-bold">₹{plan.price + 99}</span>
                                    </div>
                                </div>
                                <a 
                                    href="https://t.me/ROLEX_SIIR"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2.5 rounded-xl text-sm font-bold bg-theme-surface border border-theme-border hover:bg-theme-primary hover:text-black transition-all text-center shrink-0"
                                >
                                    Message to Buy
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {product.plans.map((plan) => (
                            <motion.div 
                                key={plan.id}
                                variants={itemVariants}
                                className={`relative flex flex-col p-6 rounded-3xl border ${plan.border} ${plan.bg} backdrop-blur-sm ${plan.popular ? 'ring-2 ring-theme-primary scale-105 z-10 bg-theme-surface shadow-2xl' : 'hover:border-theme-primary/50'} transition-all`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-theme-primary text-black text-[10px] font-black tracking-widest uppercase rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-black/40 border border-white/5`}>
                                    <plan.icon size={24} className={plan.color} />
                                </div>

                                <h3 className="text-xl font-bold text-theme-text mb-2">{plan.name}</h3>
                                <div className="text-2xl font-black text-theme-text mb-6">
                                    {plan.price}
                                </div>

                                <div className="flex-grow space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3 text-sm text-theme-text-muted">
                                            <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${plan.color}`} />
                                            <span className="leading-relaxed">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <a 
                                    href="https://t.me/ROLEX_SIIR"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-center transition-all ${
                                        plan.popular 
                                        ? 'bg-theme-primary text-black hover:bg-theme-primary/90 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)]' 
                                        : 'bg-theme-surface border border-theme-border text-theme-text hover:bg-theme-primary hover:text-black hover:border-theme-primary'
                                    }`}
                                >
                                    Contact to Buy
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
                
                {/* CinemaHub Alternative (Only for Media DB) */}
                {id === 'telegram-media-database' && (
                    <div className="mt-24 p-8 rounded-[2rem] bg-theme-primary/5 border border-theme-primary/20 backdrop-blur-sm text-center max-w-3xl mx-auto">
                        <Star size={40} className="text-theme-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-4">Don't want the hassle of setting it up?</h3>
                        <p className="text-theme-text-muted text-sm md:text-base leading-relaxed mb-6">
                            Skip the database purchase and hosting! Just add our official <strong>CinemaHub Bot</strong> directly to your Telegram group. It works instantly with zero configuration, providing your users with all the movies, series, and anime automatically.
                        </p>
                        <Link to="/apps" className="inline-flex items-center gap-2 text-theme-primary font-bold hover:underline">
                            Explore CinemaHub <ArrowRight size={16} />
                        </Link>
                    </div>
                )}

                {/* FAQ / Note */}
                <div className="mt-8 p-8 rounded-[2rem] bg-theme-surface/50 border border-theme-border backdrop-blur-sm text-center max-w-3xl mx-auto">
                    <h3 className="text-xl font-bold mb-4">Contacting Developer</h3>
                    <p className="text-theme-text-muted text-sm leading-relaxed mb-4">
                        For purchasing or custom requirements (specific databases, custom bots, pipelines), contact <strong>@ROLEX_SIIR</strong> on Telegram.
                    </p>
                    <div className="inline-block bg-theme-bg/80 p-4 rounded-xl border border-theme-border text-xs text-theme-text text-left mb-6 font-medium">
                        <span className="text-orange-500 font-bold block mb-1">⚠️ IMPORTANT NOTE:</span>
                        <ul className="list-disc pl-4 space-y-1 mt-2 text-theme-text-muted">
                            <li>Please send a direct message regarding your exact requirement.</li>
                            <li>Do not send just "Hi" or "Hello". Keep it direct and professional.</li>
                            <li>Response may be slow, please be patient.</li>
                        </ul>
                    </div>
                    <br />
                    <a href="https://t.me/ROLEX_SIIR" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-theme-primary font-bold hover:underline">
                        Message Developer (@ROLEX_SIIR) <ArrowRight size={16} />
                    </a>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default StoreDetail;

