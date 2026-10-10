"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { LogOut, User, Key, ShieldAlert, Cpu, Activity, Database, CheckCircle2, ArrowRight } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import GlobalNav from '../../components/GlobalNav';
import Link from 'next/link';

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push('/auth');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    const handleSignOut = async () => {
        await signOut(auth);
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-theme-bg flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-theme-primary/20 border-t-theme-primary animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    const stats = [
        { label: 'Network Level', value: 'Level 1', icon: Activity, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Data Modules', value: '4 Active', icon: Database, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Security Status', value: 'Nominal', icon: ShieldAlert, color: 'text-theme-primary', bg: 'bg-theme-primary/10' },
    ];

    return (
        <main className="min-h-screen bg-theme-bg text-theme-text font-sans relative selection:bg-theme-primary/30 pb-20">
            <GlobalNav />
            
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-theme-primary/5 rounded-full blur-[150px] mix-blend-screen translate-x-1/4 -translate-y-1/4" />
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 lg:pt-40">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-text/5 border border-theme-border text-[9px] uppercase tracking-[0.2em] font-bold text-theme-primary mb-4"
                        >
                            <CheckCircle2 size={12} />
                            Identity Verified
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl lg:text-5xl font-black tracking-tight mb-2"
                        >
                            Command Center
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-theme-text-muted font-light"
                        >
                            Manage your ecosystem uplink and security protocols.
                        </motion.p>
                    </div>
                    
                    <motion.button 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors text-xs font-bold uppercase tracking-widest self-start md:self-auto"
                    >
                        <LogOut size={16} />
                        Terminate Uplink
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-1 doppelrand-outer"
                    >
                        <div className="doppelrand-inner p-6 bg-theme-bg/80 backdrop-blur-xl h-full rounded-2xl flex flex-col">
                            <div className="w-16 h-16 rounded-2xl bg-theme-text/5 border border-theme-border flex items-center justify-center mb-6">
                                <User size={28} className="text-theme-text" />
                            </div>
                            
                            <div className="flex-1">
                                <div className="mb-6">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-theme-text-muted mb-1">Agent ID</p>
                                    <p className="font-mono text-sm text-theme-text">{user.uid}</p>
                                </div>
                                <div className="mb-6">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-theme-text-muted mb-1">Comm Channel</p>
                                    <p className="text-theme-text font-medium">{user.email}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-theme-text-muted mb-1">Auth Provider</p>
                                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-theme-text/5 border border-theme-border text-xs">
                                        <Key size={12} className="text-theme-text-muted" />
                                        {user.providerData[0]?.providerId || 'password'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {stats.map((stat, idx) => (
                            <motion.div 
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + (idx * 0.1) }}
                                className="doppelrand-outer"
                            >
                                <div className="doppelrand-inner p-6 bg-theme-bg/80 backdrop-blur-xl h-full rounded-2xl">
                                    <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                                        <stat.icon size={20} />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-theme-text-muted mb-1">{stat.label}</p>
                                    <p className="text-xl font-bold tracking-tight text-theme-text">{stat.value}</p>
                                </div>
                            </motion.div>
                        ))}

                        {/* Connected Apps Banner */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="sm:col-span-3 doppelrand-outer"
                        >
                            <div className="doppelrand-inner p-8 bg-theme-bg/80 backdrop-blur-xl h-full rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div className="absolute right-0 top-0 w-64 h-64 bg-theme-primary/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Cpu size={24} className="text-theme-primary" />
                                        <h3 className="text-2xl font-black tracking-tight">Ecosystem Integration</h3>
                                    </div>
                                    <p className="text-theme-text-muted font-light text-sm max-w-md">
                                        Your Univora identity is active. You can now use Single Sign-On across CinemaHub, StreamDrop, and other network nodes.
                                    </p>
                                </div>

                                <Link href="/apps" className="relative z-10 inline-flex items-center gap-3 doppelrand-outer p-1 rounded-full bg-transparent hover:scale-[0.98] transition-awwwards shrink-0">
                                    <div className="h-full rounded-full px-6 py-3 bg-theme-primary border border-theme-primary text-theme-bg flex items-center gap-3 font-bold uppercase tracking-widest text-[10px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                                        Explore Nodes
                                        <ArrowRight size={14} className="text-theme-bg" />
                                    </div>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
