import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, MessageCircle, UserX, ChevronLeft, ShieldCheck, AlertCircle, ThumbsUp, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Conduct = () => {
    const conductData = [
        {
            icon: ShieldCheck,
            title: "01. Zero Tolerance for Spam",
            description: "The Univora network is built for efficiency. Any attempt to flood the bot network, abuse APIs, or spam our public channels with automated scripts will result in an immediate and permanent ban. No warnings.",
            color: "#3b82f6" // Blue
        },
        {
            icon: ThumbsUp,
            title: "02. Respectful Communication",
            description: "We are building a community of tech enthusiasts and power users. Harassment, hate speech, or targeted attacks against any member or admin within our Telegram groups or support channels is strictly prohibited.",
            color: "#10b981" // Green
        },
        {
            icon: AlertCircle,
            title: "03. Reporting Mechanism",
            description: "If you witness a violation of these standards, report it immediately to the admins. The automated Sentinel system also monitors for malicious activity, but human reports help us keep the ecosystem pure.",
            color: "#eab308" // Yellow
        },
        {
            icon: UserX,
            title: "04. Ban Appeals",
            description: "Bans executed by the system or admins are generally final. However, appeals for automated flags can be submitted for human review after a mandatory 30-day cooldown period. Do not spam admins for unbans.",
            color: "#ef4444" // Red
        }
    ];

    return (
        <div className="min-h-screen bg-theme-bg font-sans text-theme-text overflow-x-hidden selection:bg-theme-primary selection:text-black flex flex-col">
            
            {/* Cinematic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vh] bg-theme-primary opacity-[0.03] blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
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
                        <HeartHandshake size={14} /> COMMUNITY STANDARDS
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-theme-text drop-shadow-lg">
                        Code of Conduct.
                    </h1>
                    <p className="text-xl md:text-2xl text-theme-text-muted font-medium max-w-3xl mx-auto leading-relaxed">
                        Maintaining a high-quality ecosystem requires strict adherence to respectful interaction protocols.
                    </p>
                </motion.div>

                {/* Conduct Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {conductData.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-theme-surface border border-theme-border rounded-3xl p-8 hover:border-theme-primary/50 transition-all duration-300 relative overflow-hidden group shadow-lg flex flex-col h-full"
                        >
                            {/* Subtle Glow */}
                            <div className="absolute top-0 right-0 w-48 h-48 blur-[60px] opacity-10 transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" style={{ backgroundColor: item.color }}></div>
                            
                            <div className="relative z-10 flex-grow">
                                <div className="w-14 h-14 rounded-2xl bg-theme-bg flex items-center justify-center border border-theme-border shadow-inner mb-6 group-hover:scale-110 transition-transform duration-500" style={{ color: item.color }}>
                                    <item.icon size={24} />
                                </div>
                                
                                <h3 className="text-2xl font-black text-theme-text mb-4">{item.title}</h3>
                                <p className="text-theme-text-muted text-lg leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-16 p-8 rounded-[2rem] border border-theme-border bg-theme-surface-hover flex flex-col sm:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-theme-primary/10 flex items-center justify-center text-theme-primary border border-theme-primary/20">
                            <Flame size={20} />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-theme-text">Help Us Keep It Clean</h4>
                            <p className="text-theme-text-muted text-sm mt-1">See something wrong? Report it directly.</p>
                        </div>
                    </div>
                    
                    <a href="https://t.me/ROLEX_SIIR_8" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-theme-text text-theme-bg font-bold tracking-widest rounded-xl hover:bg-theme-primary transition-colors shrink-0">
                        <MessageCircle size={18} /> OPEN TICKET
                    </a>
                </motion.div>

            </main>

            <Footer />
        </div>
    );
};

export default Conduct;
