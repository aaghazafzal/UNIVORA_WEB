"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageSquare, Terminal } from 'lucide-react';

interface Category {
    id: string;
    name: string;
}

interface FAQ {
    id: string;
    category: string;
    question: string;
    answer: string;
}

interface FaqDesktopViewProps {
    categories: Category[];
    faqs: FAQ[];
}

export default function FaqDesktopView({ categories, faqs }: FaqDesktopViewProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Filter FAQs based on search and category
    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="relative pt-32 pb-32 min-h-screen selection:bg-theme-primary selection:text-theme-bg">
            <div className="max-w-[1200px] mx-auto px-8 relative z-10">
                
                {/* Header Section */}
                <div className="mb-20">
                    <h1 className="text-6xl font-black tracking-tight text-theme-text mb-6">
                        Frequently Asked <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-primary/50">Questions</span>
                    </h1>
                    <p className="text-xl text-theme-text-muted font-light max-w-2xl leading-relaxed">
                        Everything you need to know about the Univora ecosystem, billing, and developer tools. Can't find an answer? Contact support.
                    </p>
                </div>

                <div className="flex items-start gap-16">
                    {/* Sticky Sidebar */}
                    <div className="w-[280px] shrink-0 sticky top-32">
                        <div className="doppelrand-outer rounded-3xl p-1 mb-8">
                            <div className="doppelrand-inner bg-theme-surface/30 p-6 flex flex-col gap-2">
                                <button
                                    onClick={() => { setActiveCategory('all'); setExpandedId(null); }}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-between ${
                                        activeCategory === 'all' 
                                            ? 'bg-theme-primary text-theme-bg' 
                                            : 'text-theme-text-muted hover:text-theme-text hover:bg-theme-surface'
                                    }`}
                                >
                                    All Questions
                                </button>
                                
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => { setActiveCategory(cat.id); setExpandedId(null); }}
                                        className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-between ${
                                            activeCategory === cat.id 
                                                ? 'bg-theme-primary text-theme-bg' 
                                                : 'text-theme-text-muted hover:text-theme-text hover:bg-theme-surface'
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 border border-theme-border/30 rounded-2xl bg-theme-surface/10 text-center">
                            <MessageSquare size={24} className="text-theme-primary mx-auto mb-4" />
                            <h3 className="text-theme-text font-bold mb-2">Still need help?</h3>
                            <p className="text-xs text-theme-text-muted mb-4 leading-relaxed">Our support team is ready to assist you with any advanced queries.</p>
                            <a href="/support" className="inline-block w-full py-3 bg-theme-surface hover:bg-theme-border/50 border border-theme-border/50 text-theme-text text-xs font-bold tracking-widest uppercase rounded-lg transition-colors">
                                Contact Support
                            </a>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Search Bar */}
                        <div className="relative mb-12 group">
                            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-theme-text-muted group-focus-within:text-theme-primary transition-colors">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-theme-surface/30 border border-theme-border/50 focus:border-theme-primary rounded-2xl py-6 pl-16 pr-8 text-lg text-theme-text placeholder:text-theme-text-muted/50 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                            />
                        </div>

                        {/* FAQs List */}
                        <div className="flex flex-col gap-4">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map((faq, index) => {
                                    const isExpanded = expandedId === faq.id;
                                    return (
                                        <motion.div 
                                            key={faq.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={`doppelrand-outer rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-2xl border-theme-primary/30' : ''}`}
                                        >
                                            <div className="doppelrand-inner bg-theme-surface/20">
                                                <button
                                                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                                                    className="w-full flex items-center justify-between p-6 text-left group"
                                                >
                                                    <h3 className={`text-xl font-bold pr-8 transition-colors ${isExpanded ? 'text-theme-primary' : 'text-theme-text group-hover:text-theme-primary/80'}`}>
                                                        {faq.question}
                                                    </h3>
                                                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${isExpanded ? 'bg-theme-primary text-theme-bg border-theme-primary' : 'bg-theme-bg text-theme-text-muted border-theme-border/50 group-hover:border-theme-text'}`}>
                                                        <motion.div
                                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        >
                                                            <ChevronDown size={18} />
                                                        </motion.div>
                                                    </div>
                                                </button>
                                                
                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        >
                                                            <div className="px-6 pb-8 pt-2">
                                                                <div className="w-full h-px bg-theme-border/30 mb-6"></div>
                                                                <p className="text-lg text-theme-text-muted leading-relaxed font-light">
                                                                    {faq.answer}
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <div className="py-20 text-center border border-theme-border/30 border-dashed rounded-2xl bg-theme-surface/10">
                                    <p className="text-theme-text-muted text-lg mb-2">No answers found for "{searchQuery}"</p>
                                    <button 
                                        onClick={() => setSearchQuery('')}
                                        className="text-theme-primary text-sm font-bold tracking-widest uppercase hover:underline"
                                    >
                                        Clear Search
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
