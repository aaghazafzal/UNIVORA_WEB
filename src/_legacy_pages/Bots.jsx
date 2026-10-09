import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Send, 
    Link, 
    Film, 
    Share2, 
    Forward, 
    Unlock, 
    MousePointerClick, 
    HardDriveDownload, 
    Search, 
    Music, 
    ExternalLink, 
    Bot as BotIcon,
    Star
} from 'lucide-react';
import AdaptiveImage from '../components/AdaptiveImage';
import Footer from '../components/Footer';
import SpotLightCard from '../components/SpotLightCard';
import { detailsData } from '../data/detailsData';
import { useFavorites } from '../hooks/useFavorites';

const botsData = detailsData.filter(item => item.type === 'Telegram Bot');

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const Bots = () => {
    const navigate = useNavigate();
    const [favorites, toggleFavorite] = useFavorites('univora_bots_favorites');

    const sortedBots = [...botsData].sort((a, b) => {
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
                <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[60%] h-[40%] rounded-full bg-theme-primary/5 blur-[150px]" />
            </div>

            <main className="relative z-10 flex-grow px-4 md:px-8 py-12 md:py-20 max-w-7xl mx-auto w-full">
                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#24A1DE]/30 bg-[#24A1DE]/10 text-xs font-bold text-[#24A1DE] tracking-widest mb-6">
                        <BotIcon size={14} className="inline" /> AUTOMATION MODULES
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-theme-text mb-6">
                        Telegram Bots
                    </h1>
                    <p className="text-lg md:text-xl text-theme-text-muted max-w-2xl mx-auto leading-relaxed">
                        A powerful suite of intelligent Telegram bots designed to automate workflows, extract content, and serve entertainment directly to your chat.
                    </p>
                </motion.div>

                {/* Grid Section */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {sortedBots.map((bot) => (
                        <motion.div
                            key={bot.id}
                            variants={itemVariants}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="h-full cursor-pointer"
                            onClick={() => navigate(`/project/${bot.id}`)}
                        >
                            <SpotLightCard
                                className="h-full flex flex-col bg-theme-surface/50 backdrop-blur-xl border-theme-border hover:border-theme-primary/50 rounded-3xl p-6 md:p-8 transition-all"
                                spotlightColor={bot.color}
                            >
                                {/* Card Header */}
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    {bot.imageIcon ? (
                                        <div 
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border relative"
                                            style={{ borderColor: `${bot.color}30`, boxShadow: `0 0 20px ${bot.color}40` }}
                                        >
                                            {bot.imageIcon.includes('png-logos') ? (
                                                <AdaptiveImage 
                                                    src={bot.imageIcon} 
                                                    alt={bot.name} 
                                                    className="w-[70%] h-[70%] relative z-10 transition-transform duration-300 group-hover:scale-110" 
                                                />
                                            ) : (
                                                <img src={bot.imageIcon} alt={bot.name} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                    ) : (
                                        <div 
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                                            style={{ backgroundColor: `${bot.color}15`, color: bot.color, border: `1px solid ${bot.color}30` }}
                                        >
                                            <bot.icon size={28} strokeWidth={2.5} />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); toggleFavorite(bot.id); }}
                                            className={`p-2 rounded-full transition-all ${favorites.includes(bot.id) ? 'text-yellow-400 bg-yellow-400/10 scale-110 shadow-sm' : 'text-theme-text-muted hover:text-theme-text hover:bg-theme-surface-hover'}`}
                                        >
                                            <Star size={16} fill={favorites.includes(bot.id) ? "currentColor" : "none"} />
                                        </button>
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-surface border border-[#24A1DE]/30 text-xs font-bold text-[#24A1DE]">
                                            <Send size={12} />
                                            TELEGRAM BOT
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="relative z-10 flex-grow">
                                    <h3 className="text-2xl font-bold text-theme-text mb-1 group-hover:text-theme-primary transition-colors">
                                        {bot.name}
                                    </h3>
                                    <p className="text-sm font-semibold text-theme-primary mb-4">
                                        {bot.tagline}
                                    </p>
                                    <p className="text-theme-text-muted text-sm leading-relaxed mb-8">
                                        {bot.description}
                                    </p>
                                </div>

                                {/* Action Button */}
                                <a 
                                    href={bot.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="relative z-10 mt-auto flex items-center justify-between w-full p-4 rounded-2xl bg-theme-surface hover:bg-theme-primary hover:text-white border border-theme-border hover:border-theme-primary text-theme-text transition-all group/btn"
                                >
                                    <span className="font-bold text-sm">Start Bot</span>
                                    <div className="w-8 h-8 rounded-full bg-theme-bg/50 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                                        <ExternalLink size={16} />
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

export default Bots;
