import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Music, BookOpen, GraduationCap, Monitor, Smartphone, ArrowRight, ExternalLink, Grid, Star } from 'lucide-react';
import AdaptiveImage from '../components/AdaptiveImage';
import Footer from '../components/Footer';
import SpotLightCard from '../components/SpotLightCard';
import { useFavorites } from '../hooks/useFavorites';

const appsData = [
    {
        id: 'cinemahub-app',
        name: 'Cinemahub',
        type: 'App',
        tagline: 'The Ultimate Streaming Nexus',
        description: 'Advanced mobile and desktop application for streaming movies, series, cartoons, anime, and dramas with zero-latency playback.',
        icon: Play,
        imageIcon: '/logos/CINEMAHUB.jpg',
        platformIcon: Smartphone,
        color: '#ef4444', // Red accent
        link: '#'
    },
    {
        id: 'cinemahub-web',
        name: 'Cinemahub',
        type: 'Website',
        tagline: 'Cross-Platform Entertainment',
        description: 'The web version of Cinemahub. Access the entire global library of media from any device with a browser, seamlessly synced.',
        icon: Play,
        imageIcon: '/logos/CINEMAHUB.jpg',
        platformIcon: Monitor,
        color: '#ef4444', 
        link: 'https://cinemahub8.vercel.app'
    },
    {
        id: 'groovia-app',
        name: 'Groovia',
        type: 'App',
        tagline: 'Sonic Architecture Redefined',
        description: 'Premium music application. Stream and download high-fidelity audio bypassing traditional ad-networks for pure sound.',
        icon: Music,
        imageIcon: '/logos/GROOVIA.png',
        platformIcon: Smartphone,
        color: '#a855f7', // Purple accent
        link: '#'
    },
    {
        id: 'groovia-web',
        name: 'Groovia',
        type: 'Website',
        tagline: 'Web Audio Core',
        description: 'The web counterpart to the Groovia app. Access your playlists and lossless audio directly through your browser.',
        icon: Music,
        imageIcon: '/logos/GROOVIA.png',
        platformIcon: Monitor,
        color: '#a855f7',
        link: 'https://groovia8.vercel.app'
    },
    {
        id: 'notora-web',
        name: 'Notora',
        type: 'Website',
        tagline: 'Universal Knowledge Archive',
        description: 'The ultimate digital library for students. Read, download, and organize academic papers and books with advanced search algorithms.',
        icon: BookOpen,
        imageIcon: '/logos/png-logos/notora.png',
        platformIcon: Monitor,
        color: '#3b82f6', // Blue accent
        link: 'https://notora.univora.website'
    },
    {
        id: 'skillora',
        name: 'Skillora',
        type: 'Platform',
        tagline: 'Accelerated Learning Matrix',
        description: 'Interactive free courseware designed to rewrite your skill stack. Access various educational courses and real-time assistance.',
        icon: GraduationCap,
        imageIcon: '/logos/SKILLORA.jpg',
        platformIcon: Monitor,
        color: '#eab308', // Yellow/Gold accent
        link: '#'
    }
];

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

const Apps = () => {
    const navigate = useNavigate();
    const [favorites, toggleFavorite] = useFavorites('univora_apps_favorites');

    const sortedApps = [...appsData].sort((a, b) => {
        const aFav = favorites.includes(a.id);
        const bFav = favorites.includes(b.id);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return 0;
    });

    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-[rgb(var(--color-primary))] selection:text-[rgb(var(--color-bg))]">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-theme-primary/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-theme-primary/5 blur-[120px]" />
            </div>

            <main className="relative z-10 flex-grow px-4 md:px-8 py-12 md:py-20 max-w-7xl mx-auto w-full">
                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-primary/30 bg-theme-primary/10 text-xs font-bold text-theme-primary tracking-widest mb-6">
                        <Grid size={14} className="inline" /> ECOSYSTEM MODULES
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-theme-text mb-6">
                        Apps & Platforms
                    </h1>
                    <p className="text-lg md:text-xl text-theme-text-muted max-w-2xl mx-auto leading-relaxed">
                        Explore the complete suite of Univora applications and web platforms. Designed for performance, accessibility, and zero friction.
                    </p>
                </motion.div>

                {/* Grid Section */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {sortedApps.map((app) => (
                        <motion.div
                            key={app.id}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="h-full cursor-pointer"
                            onClick={() => navigate(`/project/${app.id}`)}
                        >
                            <SpotLightCard
                                className="h-full flex flex-col bg-theme-surface/50 backdrop-blur-xl border-theme-border hover:border-theme-primary/50 rounded-3xl p-6 md:p-8 transition-all"
                                spotlightColor={app.color}
                            >

                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                {app.imageIcon ? (
                                    <div 
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border relative"
                                        style={{ borderColor: `${app.color}30`, boxShadow: `0 0 20px ${app.color}40` }}
                                    >
                                        {app.imageIcon.includes('png-logos') ? (
                                            <AdaptiveImage 
                                                src={app.imageIcon} 
                                                alt={app.name} 
                                                className="w-[70%] h-[70%] relative z-10 transition-transform duration-300 group-hover:scale-110" 
                                            />
                                        ) : (
                                            <img src={app.imageIcon} alt={app.name} className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                ) : (
                                    <div 
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                                        style={{ backgroundColor: `${app.color}15`, color: app.color, border: `1px solid ${app.color}30` }}
                                    >
                                        <app.icon size={28} strokeWidth={2.5} />
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); toggleFavorite(app.id); }}
                                        className={`p-2 rounded-full transition-all ${favorites.includes(app.id) ? 'text-yellow-400 bg-yellow-400/10 scale-110 shadow-sm' : 'text-theme-text-muted hover:text-theme-text hover:bg-theme-surface-hover'}`}
                                    >
                                        <Star size={16} fill={favorites.includes(app.id) ? "currentColor" : "none"} />
                                    </button>
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-surface border border-theme-border text-xs font-bold text-theme-text-muted">
                                        <app.platformIcon size={12} />
                                        {app.type.toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="relative z-10 flex-grow">
                                <h3 className="text-2xl font-bold text-theme-text mb-1 group-hover:text-theme-primary transition-colors">
                                    {app.name}
                                </h3>
                                <p className="text-sm font-semibold text-theme-primary mb-4">
                                    {app.tagline}
                                </p>
                                <p className="text-theme-text-muted text-sm leading-relaxed mb-8">
                                    {app.description}
                                </p>
                            </div>

                            {/* Action Button */}
                            <a 
                                href={app.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="relative z-10 mt-auto flex items-center justify-between w-full p-4 rounded-2xl bg-theme-surface hover:bg-theme-primary hover:text-white border border-theme-border hover:border-theme-primary text-theme-text transition-all group/btn"
                            >
                                <span className="font-bold text-sm">Launch {app.type}</span>
                                <div className="w-8 h-8 rounded-full bg-theme-bg/50 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                                    {app.type === 'App' ? <ArrowRight size={16} /> : <ExternalLink size={16} />}
                                </div>
                            </a>
                            </SpotLightCard>
                        </motion.div>
                    ))}
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default Apps;
