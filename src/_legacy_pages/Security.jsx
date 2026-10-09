import React, { useEffect } from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, Download, Lock, Server, FileWarning } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Security = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Security & Disclaimer - Univora";
    }, []);

    return (
        <div className="min-h-screen bg-theme-bg font-sans text-theme-text selection:bg-theme-primary selection:text-black">
            
            {/* Minimalist Grid Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-red-500/5 to-transparent opacity-50"></div>
            </div>

            <main className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-bold tracking-[0.2em] text-red-500 uppercase mb-8 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                        <ShieldAlert size={14} /> Security Protocol & Disclaimer
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-theme-text">Stay Secure. <br/><span className="text-red-500">Avoid Fakes.</span></h1>
                    
                    <p className="text-xl text-theme-text-muted mb-16 leading-relaxed max-w-3xl">
                        The Univora Ecosystem provides advanced tools, bots, and streaming platforms. However, with our growing popularity, many unauthorized clones and modified apps have appeared. Please read this critical security notice carefully.
                    </p>

                    <div className="space-y-8">

                        {/* Critical Warning Card */}
                        <div className="bg-red-500/5 border border-red-500/30 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                            
                            <div className="flex flex-col md:flex-row gap-6 relative z-10">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                                        <AlertTriangle size={32} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black mb-4 text-theme-text">Risk of Modified & Fake Apps</h2>
                                    <p className="text-theme-text-muted leading-relaxed mb-4 text-lg">
                                        Univora holds <span className="text-theme-text font-bold uppercase">ZERO responsibility</span> if you download our apps, bots, or use websites from third-party sources. Modified (modded) APKs or clone Telegram bots often contain malware, keyloggers, or trackers.
                                    </p>
                                    <p className="text-theme-text-muted leading-relaxed text-lg">
                                        If your device is hacked, your data is stolen, or your Telegram account gets banned due to using an unofficial duplicate of our ecosystem, we cannot assist you. 
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Safe Download Practices */}
                        <div className="bg-theme-surface border border-theme-border rounded-[2rem] p-8 md:p-10 hover:border-theme-primary/30 transition-colors">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-theme-bg border border-theme-border flex items-center justify-center text-theme-primary">
                                        <ShieldCheck size={32} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black mb-4 text-theme-text">The Official Channels Only</h2>
                                    <p className="text-theme-text-muted leading-relaxed mb-6 text-lg">
                                        To ensure 100% security and to access the latest, uncompromised versions of our platforms (Cinemahub, Groovia, Extract X, etc.), you must strictly use our official links.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                        <a href="https://t.me/ROLEX_SIIR_8" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-theme-bg border border-theme-border flex items-center gap-4 hover:border-theme-primary hover:bg-theme-surface-hover transition-all group">
                                            <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center text-theme-primary group-hover:scale-110 transition-transform">
                                                <Server size={18} />
                                            </div>
                                            <div>
                                                <div className="text-xs font-mono text-theme-text-muted mb-1">Official Hub</div>
                                                <div className="font-bold text-theme-text">t.me/ROLEX_SIIR_8</div>
                                            </div>
                                        </a>
                                        <Link to="/" className="p-4 rounded-xl bg-theme-bg border border-theme-border flex items-center gap-4 hover:border-theme-primary hover:bg-theme-surface-hover transition-all group">
                                            <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center text-theme-primary group-hover:scale-110 transition-transform">
                                                <Download size={18} />
                                            </div>
                                            <div>
                                                <div className="text-xs font-mono text-theme-text-muted mb-1">Official Website</div>
                                                <div className="font-bold text-theme-text">univora.com</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* DMCA / Content Disclaimer */}
                        <div className="bg-theme-surface border border-theme-border rounded-[2rem] p-8 md:p-10 hover:border-theme-primary/30 transition-colors">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-theme-bg border border-theme-border flex items-center justify-center text-theme-primary">
                                        <FileWarning size={32} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black mb-4 text-theme-text">DMCA & Content Disclaimer</h2>
                                    <p className="text-theme-text-muted leading-relaxed mb-4 text-lg">
                                        Univora acts solely as an intermediary data processor and search engine. Our bots and platforms do not host, store, or upload any copyrighted media on our own servers. All content is indexed automatically from third-party internet sources and Telegram channels.
                                    </p>
                                    <p className="text-theme-text-muted leading-relaxed text-lg">
                                        We strictly comply with the Digital Millennium Copyright Act (DMCA). If you are a copyright owner and believe your content has been indexed without authorization, please contact our administrative team via our official channels for immediate removal from our search index.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default Security;
