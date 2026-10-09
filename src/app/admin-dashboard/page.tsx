"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldAlert, LayoutGrid, Bot, ShoppingCart, Activity, Newspaper, FileText } from 'lucide-react';
import AppsTab from './tabs/AppsTab';
import BotsTab from './tabs/BotsTab';
import StoreTab from './tabs/StoreTab';
import ChangelogTab from './tabs/ChangelogTab';
import NewsTab from './tabs/NewsTab';
import BlogTab from './tabs/BlogTab';

const TABS = [
    { id: 'apps', label: 'Apps', icon: LayoutGrid },
    { id: 'bots', label: 'Bots', icon: Bot },
    { id: 'store', label: 'Store', icon: ShoppingCart },
    { id: 'changelog', label: 'Changelog', icon: Activity },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'blog', label: 'Blog', icon: FileText },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('changelog');

    const renderTab = () => {
        switch (activeTab) {
            case 'apps': return <AppsTab />;
            case 'bots': return <BotsTab />;
            case 'store': return <StoreTab />;
            case 'changelog': return <ChangelogTab />;
            case 'news': return <NewsTab />;
            case 'blog': return <BlogTab />;
            default: return <ChangelogTab />;
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-mono selection:bg-theme-primary selection:text-black">
            
            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-50 w-full bg-[#050505]/90 backdrop-blur-xl border-b border-theme-primary/20 p-4 lg:p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-theme-primary/10 border border-theme-primary/30 flex items-center justify-center">
                        <Terminal size={20} className="text-theme-primary" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold tracking-widest text-theme-primary uppercase">Command Center</h1>
                        <p className="text-[10px] text-theme-text-muted tracking-widest">SECURE LINK ESTABLISHED</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ShieldAlert size={20} className="text-theme-primary animate-pulse" />
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
                
                {/* Desktop Sidebar */}
                <div className="hidden lg:flex flex-col w-64 border-r border-theme-primary/10 p-6 bg-[#0a0a0a]">
                    <div className="flex flex-col gap-2 sticky top-24">
                        <span className="text-[10px] font-bold tracking-[0.3em] text-theme-text-muted uppercase mb-4 px-4">System Modules</span>
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 ${
                                        activeTab === tab.id 
                                            ? 'bg-theme-primary/10 text-theme-primary border border-theme-primary/30 shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.1)]' 
                                            : 'text-theme-text-muted hover:bg-theme-surface/50 hover:text-white border border-transparent'
                                    }`}
                                >
                                    <Icon size={18} />
                                    <span className="text-xs font-bold tracking-[0.2em] uppercase">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Tab Scroll (Alternative to Sidebar on small screens) */}
                <div className="lg:hidden w-full border-b border-theme-primary/10 bg-[#0a0a0a] sticky top-[72px] z-40">
                    <div className="flex overflow-x-auto no-scrollbar py-4 px-4 gap-2 snap-x">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full transition-all snap-center ${
                                        activeTab === tab.id 
                                            ? 'bg-theme-primary text-black shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]' 
                                            : 'bg-theme-surface/30 text-theme-text-muted border border-theme-border/30'
                                    }`}
                                >
                                    <Icon size={14} />
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6 lg:p-12 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full"
                        >
                            {renderTab()}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
