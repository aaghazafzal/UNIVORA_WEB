import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Database, ShoppingBag, ArrowRight, GraduationCap, BookOpen, Users, FileText } from 'lucide-react';
import AdaptiveImage from '../components/AdaptiveImage';
import Footer from '../components/Footer';
import SpotLightCard from '../components/SpotLightCard';

const storeProductsData = [
    {
        id: 'telegram-media-database',
        name: 'Ultimate Media Database',
        type: 'Database & Bots',
        tagline: '10M+ Files • Multi-Language • Auto-Sync',
        description: 'The most comprehensive Telegram media database available. Includes premium setup plans with Forward Bot, Filter Bot, and Auto-Sync automation.',
        icon: Database,
        imageIcon: '/logos/store-logo/ultimate-media-database.png',
        platformIcon: ShoppingBag,
        color: '#3b82f6', // Blue accent
        link: '/store/telegram-media-database'
    },
    {
        id: 'premium-courses-database',
        name: 'Premium Courses Database',
        type: 'Courses & EdTech',
        tagline: '50+ Ready Channels • Demos Available',
        description: 'Get access to premium paid and free courses. Buy the whole collection or individual courses. Delivery via direct channel addition or automated bot forwarding.',
        icon: GraduationCap,
        imageIcon: '/logos/store-logo/premium-course-database.png',
        platformIcon: BookOpen,
        color: '#f59e0b', // Amber accent
        link: '/store/premium-courses-database'
    },
    {
        id: 'contact-lookup-database',
        name: 'OSINT Contact Database',
        type: 'Data Lookup',
        tagline: '250GB+ • Mobile • Aadhaar • Telegram',
        description: 'Comprehensive OSINT CSV database for data lookup. Find details via Phone numbers, Aadhaar, or Telegram Usernames. Requires 250GB free Google Drive space.',
        icon: Users,
        imageIcon: '/logos/store-logo/osint-contact-database.png',
        platformIcon: FileText,
        color: '#ef4444', // Red accent
        link: '/store/contact-lookup-database'
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

const Store = () => {
    const navigate = useNavigate();

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
                        <ShoppingBag size={14} className="inline" /> UNIVORA MARKETPLACE
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-theme-text mb-6">
                        Premium Store
                    </h1>
                    <p className="text-lg md:text-xl text-theme-text-muted max-w-2xl mx-auto leading-relaxed">
                        Exclusive digital assets, massive databases, and enterprise-grade automation bots to supercharge your ecosystem.
                    </p>
                </motion.div>

                {/* Grid Section */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {storeProductsData.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="h-full cursor-pointer"
                            onClick={() => navigate(product.link)}
                        >
                            <SpotLightCard
                                className="h-full flex flex-col bg-theme-surface/50 backdrop-blur-xl border-theme-border hover:border-theme-primary/50 rounded-3xl p-6 md:p-8 transition-all group"
                                spotlightColor={product.color}
                            >
                                {/* Card Header */}
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div 
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden"
                                        style={{ backgroundColor: `${product.color}15`, color: product.color, border: `1px solid ${product.color}30` }}
                                    >
                                        {product.imageIcon ? (
                                            <AdaptiveImage 
                                                src={product.imageIcon} 
                                                alt={product.name} 
                                                className="w-[70%] h-[70%] relative z-10 transition-transform duration-300" 
                                            />
                                        ) : (
                                            <product.icon size={28} strokeWidth={2.5} />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-surface border border-theme-border text-xs font-bold text-theme-text-muted">
                                        <product.platformIcon size={12} />
                                        {product.type.toUpperCase()}
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="relative z-10 flex-grow">
                                    <h3 className="text-2xl font-bold text-theme-text mb-1 group-hover:text-theme-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm font-semibold text-theme-primary mb-4">
                                        {product.tagline}
                                    </p>
                                    <p className="text-theme-text-muted text-sm leading-relaxed mb-8">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Action Button */}
                                <div 
                                    className="relative z-10 mt-auto flex items-center justify-between w-full p-4 rounded-2xl bg-theme-surface group-hover:bg-theme-primary group-hover:text-white border border-theme-border group-hover:border-theme-primary text-theme-text transition-all group/btn"
                                >
                                    <span className="font-bold text-sm">View Plans</span>
                                    <div className="w-8 h-8 rounded-full bg-theme-bg/50 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </SpotLightCard>
                        </motion.div>
                    ))}
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default Store;
