import React from 'react';
import { motion } from 'framer-motion';
import { Gavel, AlertTriangle, Shield, ChevronLeft, Terminal, Ban, FileSignature, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Terms = () => {
    const termsData = [
        {
            icon: FileSignature,
            title: "1. Acceptance of Protocol",
            description: "By accessing the Univora Network (including our websites, apps, and Telegram bots), you agree to be bound by these operational parameters. If you disagree with any part of these terms, you must disconnect from our ecosystem immediately.",
            color: "#3b82f6" // Blue
        },
        {
            icon: Terminal,
            title: "2. Acceptable Use & Restrictions",
            description: "Access to Univora is a privilege. You agree not to engage in excessive load generation (DDoS), API abuse, automated scraping, or reverse-engineering of our proprietary bots and web architecture. Any such attempts will result in an immediate, permanent IP and user ban.",
            color: "#10b981" // Green
        },
        {
            icon: Scale,
            title: "3. Content Liability & Disclaimer",
            description: "Univora operates purely as an advanced indexing engine and aggregation service. We do not host, upload, or own any of the media, files, or external links provided through our services. We are not liable for the accuracy, legality, or safety of third-party content accessed via our ecosystem.",
            color: "#eab308" // Yellow
        },
        {
            icon: Shield,
            title: "4. Account Security",
            description: "If you utilize our Apps or Websites that require authentication, you are solely responsible for safeguarding your login credentials. Univora cannot and will not be liable for any loss or damage arising from your failure to comply with this security obligation.",
            color: "#8b5cf6" // Purple
        },
        {
            icon: Ban,
            title: "5. Modifications & Termination",
            description: "The Univora Ecosystem is constantly evolving. We reserve the absolute right to modify, suspend, or discontinue any bot, app, or service—or terminate your access to the network—at any time, for any reason, without prior notice or liability.",
            color: "#ef4444" // Red
        }
    ];

    return (
        <div className="min-h-screen bg-theme-bg font-sans text-theme-text overflow-x-hidden selection:bg-theme-primary selection:text-black flex flex-col">
            
            {/* Cinematic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vh] bg-theme-primary opacity-[0.03] blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
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
                        <Gavel size={14} /> LEGAL AGREEMENT
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-theme-text drop-shadow-lg">
                        Terms of Service.
                    </h1>
                    <p className="text-xl md:text-2xl text-theme-text-muted font-medium max-w-3xl mx-auto leading-relaxed">
                        The operational parameters and rules of engagement for interacting with the Univora Ecosystem.
                    </p>
                </motion.div>

                {/* Warning Banner */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-12 bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-2xl flex items-start gap-4 shadow-[0_0_30px_rgba(234,179,8,0.05)]"
                >
                    <AlertTriangle className="text-yellow-500 shrink-0 mt-1" size={24} />
                    <div>
                        <h4 className="text-yellow-500 font-bold mb-2 text-lg">Experimental Systems Notice</h4>
                        <p className="text-yellow-500/80 leading-relaxed">
                            Some features within Univora (such as Beta Bots and cutting-edge extractors) utilize highly advanced, experimental protocols. By using our services, you accept that these systems may exhibit unexpected behavior. Use at your own risk.
                        </p>
                    </div>
                </motion.div>

                {/* Terms Grid */}
                <div className="space-y-6">
                    {termsData.map((term, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-theme-surface border border-theme-border rounded-3xl p-8 md:p-10 hover:border-theme-primary/50 transition-all duration-300 relative overflow-hidden group shadow-lg"
                        >
                            {/* Subtle Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 blur-[80px] opacity-10 transition-opacity duration-500 group-hover:opacity-20 pointer-events-none" style={{ backgroundColor: term.color }}></div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                                <div className="w-16 h-16 rounded-2xl bg-theme-bg flex items-center justify-center border border-theme-border shadow-inner shrink-0 group-hover:scale-110 transition-transform duration-500" style={{ color: term.color }}>
                                    <term.icon size={28} />
                                </div>
                                
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-black text-theme-text mb-4">{term.title}</h3>
                                    <p className="text-theme-text-muted text-lg leading-relaxed">
                                        {term.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default Terms;
