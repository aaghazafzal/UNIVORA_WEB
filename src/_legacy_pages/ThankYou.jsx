import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, ShieldCheck, Zap, Globe, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import GridBackground from '../components/GridBackground';
import Footer from '../components/Footer';

const ThankYou = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Confetti/Sparkles animation variants
    const sparkleVariants = {
        initial: { opacity: 0, scale: 0, rotate: -45 },
        animate: (i) => ({
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            rotate: [0, 90, 180],
            transition: {
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
            }
        })
    };

    const features = [
        {
            icon: <ShieldCheck size={24} className="text-green-400" />,
            title: "Ad-Free Future",
            description: "Your support guarantees our core platforms remain completely free of intrusive advertisements.",
            bg: "bg-green-500/10",
            border: "border-green-500/20"
        },
        {
            icon: <Zap size={24} className="text-yellow-400" />,
            title: "Rapid Innovation",
            description: "Contributions go directly into server costs and developing next-gen bots and apps.",
            bg: "bg-yellow-500/10",
            border: "border-yellow-500/20"
        },
        {
            icon: <Globe size={24} className="text-blue-400" />,
            title: "Global Ecosystem",
            description: "You're now a foundational pillar in keeping the Univora ecosystem accessible to everyone.",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        }
    ];

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Univora Ecosystem',
                    text: 'I just supported the Univora ecosystem! Join me in keeping the internet ad-free and innovative.',
                    url: 'https://univora.website/support',
                });
            } catch (err) {
                console.log('Share canceled or failed', err);
            }
        } else {
            navigator.clipboard.writeText('https://univora.website/support');
            alert('Support page link copied to clipboard!');
        }
    };

    return (
        <div className="min-h-screen relative font-sans text-theme-text overflow-hidden selection:bg-theme-primary selection:text-black flex flex-col">
            <GridBackground />
            
            <main className="relative z-10 flex-1 flex flex-col pt-24 pb-12">
                <div className="max-w-[1000px] mx-auto px-6 w-full flex-1 flex flex-col justify-center">
                    
                    {/* Hero Section */}
                    <div className="text-center relative mb-16">
                        {/* Glow effect behind heart */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-red-500/30 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>
                        
                        <div className="relative inline-block mb-8">
                            <motion.div
                                animate={{ 
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="w-24 h-24 rounded-3xl bg-red-500/20 border border-red-500/30 flex items-center justify-center backdrop-blur-xl relative z-10"
                            >
                                <Heart size={48} className="text-red-400 fill-red-400" />
                            </motion.div>
                            
                            {/* Animated Sparkles */}
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    variants={sparkleVariants}
                                    initial="initial"
                                    animate="animate"
                                    className="absolute text-yellow-400"
                                    style={{
                                        top: `${Math.random() * 140 - 20}%`,
                                        left: `${Math.random() * 140 - 20}%`,
                                    }}
                                >
                                    <Sparkles size={16} />
                                </motion.div>
                            ))}
                        </div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight"
                        >
                            Thank You, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-400 animate-gradient bg-[length:200%_auto]">
                                Legend.
                            </span>
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg md:text-xl text-theme-text-muted leading-relaxed max-w-2xl mx-auto"
                        >
                            Your contribution has been successfully processed. Because of supporters like you, Univora continues to push the boundaries of ad-free digital experiences.
                        </motion.p>
                    </div>

                    {/* Impact Cards */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                    >
                        {features.map((feature, idx) => (
                            <div key={idx} className={`p-6 rounded-[2rem] border ${feature.bg} ${feature.border} backdrop-blur-sm relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}>
                                <div className="w-12 h-12 rounded-2xl bg-black/40 flex items-center justify-center mb-6 border border-white/5">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-3 tracking-wide">{feature.title}</h3>
                                <p className="text-sm text-theme-text-muted leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link 
                            to="/apps" 
                            className="w-full sm:w-auto px-8 py-4 bg-theme-primary text-black font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-theme-primary/90 transition-all active:scale-95 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)]"
                        >
                            Explore Ecosystem <ArrowRight size={18} />
                        </Link>
                        
                        <button 
                            onClick={handleShare}
                            className="w-full sm:w-auto px-8 py-4 bg-theme-surface border border-theme-border text-theme-text font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-theme-bg hover:border-theme-primary/50 transition-all active:scale-95"
                        >
                            <Share2 size={18} /> Spread The Word
                        </button>
                    </motion.div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ThankYou;
