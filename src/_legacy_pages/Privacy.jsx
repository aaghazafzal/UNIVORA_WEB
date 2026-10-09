import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, ChevronLeft, Database, Search, AlertTriangle, ShieldAlert, Zap, ServerOff, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Privacy = () => {
    
    const policies = [
        {
            icon: ServerOff,
            title: "Zero Content Hosting",
            description: "Univora does NOT host, store, or upload any media files, videos, or illegal content on our servers. We function strictly as an advanced indexing and filtering engine that organizes data already publicly available on the internet. Our brand or name is never attached to any external content.",
            color: "#3b82f6" // Blue
        },
        {
            icon: Database,
            title: "No Data Selling Protocol",
            description: "Your digital footprint is yours. We absolutely do not sell, trade, or leak user data to third-party brokers or advertisers. Our ecosystem is built on trust, not data exploitation.",
            color: "#10b981" // Green
        },
        {
            icon: UserCheck,
            title: "Purpose-Driven Data Collection",
            description: "When you log into our Apps or Websites, we collect minimal necessary data (like watch history) purely to enhance your experience. This powers features like 'Continue Watching', personalized suggestions, and ensures your data is safely synced across all your devices.",
            color: "#eab308" // Yellow
        },
        {
            icon: Zap,
            title: "Telegram Bot Infrastructure",
            description: "Our Telegram bots operate entirely within the Telegram ecosystem. We do not extract or store your personal Telegram data. All bot interactions are processed on the fly, relying on Telegram's own secure infrastructure.",
            color: "#8b5cf6" // Purple
        },
        {
            icon: ShieldAlert,
            title: "Content Removal & DMCA",
            description: "While we do not host files, if you find copyrighted or harmful content linked through our services, you can report it to us. We will try our utmost best to manually filter and remove the links. However, because our automated bots constantly scrape the vast internet, we cannot provide a 100% guarantee that similar links won't reappear.",
            color: "#ef4444" // Red
        }
    ];

    return (
        <div className="min-h-screen bg-theme-bg font-sans text-theme-text overflow-x-hidden selection:bg-theme-primary selection:text-black flex flex-col">
            
            {/* Cinematic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vh] bg-theme-primary opacity-[0.03] blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
            </div>

            <main className="relative z-10 w-full pt-32 pb-20 flex-grow max-w-5xl mx-auto px-6">
                
                <Link to="/" className="inline-flex items-center gap-2 text-theme-text-muted hover:text-theme-primary mb-12 transition-colors group font-bold tracking-widest text-sm">
                    <ChevronLeft className="group-hover:-translate-x-1 transition-transform" /> RETURN TO BASE
                </Link>

                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-theme-primary/30 bg-theme-primary/10 text-xs font-bold tracking-[0.2em] uppercase mb-8 text-theme-primary shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.1)]">
                        <Shield size={14} /> PRIVACY & LEGAL PROTOCOL
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-theme-text drop-shadow-lg">
                        Total Transparency.
                    </h1>
                    <p className="text-xl md:text-2xl text-theme-text-muted font-medium max-w-3xl mx-auto leading-relaxed">
                        We build powerful ecosystems, not data traps. Understand exactly how Univora operates and handles information.
                    </p>
                </motion.div>

                {/* Policies Grid */}
                <div className="space-y-6">
                    {policies.map((policy, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-theme-surface border border-theme-border rounded-3xl p-8 md:p-10 hover:border-theme-primary/50 transition-all duration-300 relative overflow-hidden group shadow-lg"
                        >
                            {/* Subtle Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 blur-[80px] opacity-10 transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" style={{ backgroundColor: policy.color }}></div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                                <div className="w-16 h-16 rounded-2xl bg-theme-bg flex items-center justify-center border border-theme-border shadow-inner shrink-0 group-hover:scale-110 transition-transform duration-500" style={{ color: policy.color }}>
                                    <policy.icon size={28} />
                                </div>
                                
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-black text-theme-text mb-4">{policy.title}</h3>
                                    <p className="text-theme-text-muted text-lg leading-relaxed">
                                        {policy.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Report Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-20 p-8 md:p-12 rounded-[2.5rem] border border-red-500/30 bg-red-500/5 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                    <AlertTriangle className="mx-auto text-red-500 mb-6" size={48} />
                    <h2 className="text-3xl font-black text-theme-text mb-4">Report an Issue</h2>
                    <p className="text-theme-text-muted max-w-2xl mx-auto mb-8 text-lg">
                        If you believe any indexed content violates your rights or causes harm, reach out to us immediately. We will initiate our manual filtering protocol to assist you.
                    </p>
                    <a href="https://t.me/ROLEX_SIIR_8" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 bg-red-500 text-white font-black tracking-widest rounded-xl hover:bg-red-600 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                        CONTACT ADMIN
                    </a>
                </motion.div>

            </main>

            <Footer />
        </div>
    );
};

export default Privacy;
