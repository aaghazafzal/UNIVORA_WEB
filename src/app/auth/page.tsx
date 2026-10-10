"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Fingerprint, Lock, Mail, ArrowRight, Github, Send } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import GlobalNav from '../../components/GlobalNav';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Google authentication failed');
        }
    };

    return (
        <main className="min-h-screen bg-theme-bg text-theme-text overflow-hidden font-sans relative selection:bg-theme-primary/30">
            <GlobalNav />
            
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-theme-primary/5 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-theme-primary/10 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-theme-text/5 border border-theme-border mb-6">
                            <Fingerprint size={32} className="text-theme-text" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                            {isLogin ? 'Initiate Uplink' : 'Forge Identity'}
                        </h1>
                        <p className="text-theme-text-muted text-sm font-light">
                            {isLogin ? 'Authenticate to access the command matrix.' : 'Create a new access node in the ecosystem.'}
                        </p>
                    </div>

                    <div className="doppelrand-outer p-1 rounded-3xl">
                        <div className="doppelrand-inner bg-theme-bg/80 backdrop-blur-xl rounded-[22px] p-6 md:p-8">
                            <form onSubmit={handleEmailAuth} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-theme-text-muted mb-2 ml-1">
                                        Comm Channel (Email)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail size={16} className="text-theme-text-muted" />
                                        </div>
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full bg-theme-text/5 border border-theme-border rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary/50 transition-all placeholder:text-theme-text-muted/50"
                                            placeholder="agent@univora.site"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-theme-text-muted mb-2 ml-1">
                                        Security Cipher (Password)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock size={16} className="text-theme-text-muted" />
                                        </div>
                                        <input 
                                            type="password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="w-full bg-theme-text/5 border border-theme-border rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-theme-primary focus:ring-1 focus:ring-theme-primary/50 transition-all placeholder:text-theme-text-muted/50"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="text-red-500 text-xs font-medium bg-red-500/10 border border-red-500/20 p-3 rounded-lg"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-theme-primary border border-theme-primary text-theme-bg py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
                                >
                                    {loading ? 'Processing...' : (isLogin ? 'Establish Connection' : 'Register Node')}
                                    {!loading && <ArrowRight size={14} />}
                                </button>
                            </form>

                            <div className="my-6 flex items-center gap-4">
                                <div className="h-px bg-theme-border flex-1" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-theme-text-muted">OR BYPASS WITH</span>
                                <div className="h-px bg-theme-border flex-1" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    onClick={handleGoogleAuth}
                                    type="button"
                                    className="flex items-center justify-center gap-2 py-3 bg-theme-text/5 border border-theme-border rounded-xl hover:bg-theme-text/10 transition-colors"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-theme-text">Google</span>
                                </button>
                                <button 
                                    type="button"
                                    className="flex items-center justify-center gap-2 py-3 bg-[#229ED9]/10 border border-[#229ED9]/30 rounded-xl hover:bg-[#229ED9]/20 transition-colors text-[#229ED9]"
                                >
                                    <Send size={16} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Telegram</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <button 
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-xs text-theme-text-muted hover:text-theme-text transition-colors"
                        >
                            {isLogin ? "No access node yet? Register here." : "Already have an uplink? Authenticate."}
                        </button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
