import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, ShieldAlert, UserCog, ArrowRight, ExternalLink } from 'lucide-react';
import Footer from '../components/Footer';

const Support = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

            <main className="relative z-10 flex-grow px-4 md:px-8 py-12 md:py-24 max-w-5xl mx-auto w-full">
                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-primary/30 bg-theme-primary/10 text-xs font-bold text-theme-primary tracking-widest mb-6">
                        <MessageCircle size={14} className="inline" /> HELP & SUPPORT
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-theme-text mb-6">
                        How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-blue-400">help?</span>
                    </h1>
                    <p className="text-lg md:text-xl text-theme-text-muted max-w-2xl mx-auto leading-relaxed">
                        Whether you're facing a technical issue, have a question, or need custom development, we're here for you.
                    </p>
                </motion.div>

                {/* Support Options */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {/* 1. Community Group */}
                    <motion.div variants={itemVariants} className="flex h-full">
                        <div className="flex flex-col bg-theme-surface/50 backdrop-blur-xl border border-theme-border hover:border-[#229ED9]/50 rounded-[2rem] p-8 transition-all group w-full relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#229ED9]/10 rounded-full blur-[40px] group-hover:bg-[#229ED9]/20 transition-colors pointer-events-none"></div>
                            
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[#229ED9]/10 border border-[#229ED9]/20 text-[#229ED9] group-hover:scale-110 transition-transform duration-300 relative z-10">
                                {/* Telegram SVG Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-17.5 7.777a2.242 2.242 0 0 0 .151 4.148l4.475 1.341 1.637 5.093c.123.38.487.625.889.603a1.002 1.002 0 0 0 .768-.426l2.744-3.527 5.086 3.753a2.242 2.242 0 0 0 3.51-1.611l3.076-15.011a2.242 2.242 0 0 0-3.814-2.355Z"/><path d="m9.972 13.916 6.304-5.263c.48-.401-.197-.834-.732-.426L7.901 13.568c-.373.344-.567.844-.526 1.353l.36 4.708c.023.3.435.342.536.059l1.691-5.772Z"/></svg>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-theme-text mb-3 relative z-10">Community Support</h3>
                            <p className="text-theme-text-muted text-sm leading-relaxed mb-8 flex-grow relative z-10">
                                Join our official Telegram group for instant help from the community and moderators. This is the fastest way to get your basic queries resolved.
                            </p>

                            <a 
                                href="https://t.me/+R1q6VftjGrozNDll" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-between p-4 rounded-xl bg-theme-bg/50 border border-theme-border group-hover:bg-[#229ED9] group-hover:text-white group-hover:border-[#229ED9] transition-all relative z-10 font-bold text-sm"
                            >
                                Join Group <ExternalLink size={16} />
                            </a>
                        </div>
                    </motion.div>

                    {/* 2. Report Issue */}
                    <motion.div variants={itemVariants} className="flex h-full">
                        <div className="flex flex-col bg-theme-surface/50 backdrop-blur-xl border border-theme-border hover:border-red-500/50 rounded-[2rem] p-8 transition-all group w-full relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-[40px] group-hover:bg-red-500/20 transition-colors pointer-events-none"></div>
                            
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-red-500/10 border border-red-500/20 text-red-500 group-hover:scale-110 transition-transform duration-300 relative z-10">
                                <ShieldAlert size={32} />
                            </div>
                            
                            <h3 className="text-2xl font-bold text-theme-text mb-3 relative z-10">Report an Issue</h3>
                            <p className="text-theme-text-muted text-sm leading-relaxed mb-8 flex-grow relative z-10">
                                Found a bug or facing a technical glitch? Report it directly through our website or our dedicated report bot for quick resolution.
                            </p>

                            <div className="flex flex-col gap-3 relative z-10">
                                <Link 
                                    to="/report" 
                                    className="w-full flex items-center justify-between p-4 rounded-xl bg-theme-bg/50 border border-theme-border hover:bg-theme-primary hover:text-black hover:border-theme-primary transition-all font-bold text-sm"
                                >
                                    Web Report Form <ArrowRight size={16} />
                                </Link>
                                <a 
                                    href="https://t.me/UNIVORA_REPORTBOT" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-between p-4 rounded-xl bg-theme-bg/50 border border-theme-border hover:bg-theme-surface-hover transition-all font-bold text-sm text-theme-text-muted hover:text-theme-text"
                                >
                                    @UNIVORA_REPORTBOT <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* 3. Admin Contact */}
                    <motion.div variants={itemVariants} className="flex h-full">
                        <div className="flex flex-col bg-theme-surface/50 backdrop-blur-xl border border-theme-border hover:border-theme-primary/50 rounded-[2rem] p-8 transition-all group w-full relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-theme-primary/10 rounded-full blur-[40px] group-hover:bg-theme-primary/20 transition-colors pointer-events-none"></div>
                            
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-theme-primary/10 border border-theme-primary/20 text-theme-primary group-hover:scale-110 transition-transform duration-300 relative z-10">
                                <UserCog size={32} />
                            </div>
                            
                            <h3 className="text-2xl font-bold text-theme-text mb-3 relative z-10">Contact Admin</h3>
                            <p className="text-theme-text-muted text-sm leading-relaxed mb-6 flex-grow relative z-10">
                                For business inquiries, custom development, or highly urgent matters.
                                <br/><br/>
                                <span className="text-orange-500 font-bold block mb-1">⚠️ Note:</span>
                                Replies may take time depending on pending messages. For faster response, mention the admin in the Support Group.
                            </p>

                            <a 
                                href="https://t.me/ROLEX_SIIR" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-between p-4 rounded-xl bg-theme-primary text-black font-bold shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)] hover:scale-[1.02] active:scale-95 transition-all relative z-10 text-sm"
                            >
                                Message @ROLEX_SIIR <ExternalLink size={16} />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

            </main>
            <Footer />
        </div>
    );
};

export default Support;

