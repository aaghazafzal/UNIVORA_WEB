"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Terminal, MessageSquare } from 'lucide-react';

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

interface FaqMobileViewProps {
    categories: Category[];
    faqs: FAQ[];
}

export default function FaqMobileView({ categories, faqs }: FaqMobileViewProps) {
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
        <main className="relative pt-24 pb-24 min-h-screen selection:bg-theme-primary selection:text-theme-bg overflow-x-hidden">
            <div className="px-5 relative z-10">
                
                {/* Header Section */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black tracking-tight text-theme-text mb-4">
                        FAQ
                    </h1>
                    <p className="text-[15px] text-theme-text-muted font-light leading-relaxed px-4">
                        Find answers about the ecosystem, billing, and developer tools.
                    </p>
                </div>

                {/* Sticky Control Bar: Search + Categories */}
                <div className="sticky top-[80px] z-40 bg-theme-bg/90 backdrop-blur-xl border-y border-theme-border/30 -mx-5 px-5 py-4 mb-8 shadow-lg">
                    {/* Search Bar */}
                    <div className="relative mb-4 group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-theme-text-muted">
                            <Search size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search answers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-theme-surface/50 border border-theme-border/50 focus:border-theme-primary rounded-xl py-4 pl-12 pr-4 text-[15px] text-theme-text placeholder:text-theme-text-muted/50 outline-none transition-all"
                        />
                    </div>

                    {/* Horizontal Scrollable Categories */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mr-5 pr-5 snap-x">
                        <button
                            onClick={() => { setActiveCategory('all'); setExpandedId(null); }}
                            className={`shrink-0 snap-start px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all border ${
                                activeCategory === 'all' 
                                    ? 'bg-theme-primary border-theme-primary text-theme-bg' 
                                    : 'bg-theme-surface/30 border-theme-border/50 text-theme-text-muted'
                            }`}
                        >
                            All
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => { setActiveCategory(cat.id); setExpandedId(null); }}
                                className={`shrink-0 snap-start px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all border ${
                                    activeCategory === cat.id 
                                        ? 'bg-theme-primary border-theme-primary text-theme-bg' 
                                        : 'bg-theme-surface/30 border-theme-border/50 text-theme-text-muted'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQs List */}
                <div className="flex flex-col gap-4 min-h-[50vh]">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => {
                            const isExpanded = expandedId === faq.id;
                            return (
                                <motion.div 
                                    key={faq.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`doppelrand-outer rounded-xl overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-xl border-theme-primary/30' : ''}`}
                                >
                                    <div className="doppelrand-inner bg-theme-surface/20">
                                        <button
                                            onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                                            className="w-full flex items-center justify-between p-5 text-left"
                                        >
                                            <h3 className={`text-[17px] font-bold pr-4 transition-colors ${isExpanded ? 'text-theme-primary' : 'text-theme-text'}`}>
                                                {faq.question}
                                            </h3>
                                            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${isExpanded ? 'bg-theme-primary text-theme-bg border-theme-primary' : 'bg-theme-bg text-theme-text-muted border-theme-border/50'}`}>
                                                <motion.div
                                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <ChevronDown size={14} />
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
                                                    <div className="px-5 pb-6 pt-1">
                                                        <div className="w-full h-px bg-theme-border/30 mb-4"></div>
                                                        <p className="text-[15px] text-theme-text-muted leading-relaxed font-light">
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
                        <div className="py-16 text-center border border-theme-border/30 border-dashed rounded-xl bg-theme-surface/10">
                            <p className="text-theme-text-muted text-[15px] mb-3 px-4">No answers found for "{searchQuery}"</p>
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="text-theme-primary text-[10px] font-bold tracking-widest uppercase py-2 px-6 rounded-full border border-theme-primary/30"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>

                {/* Support Card */}
                <div className="mt-12 p-1 border border-theme-border/30 rounded-xl bg-theme-surface/10 text-center doppelrand-outer">
                    <div className="doppelrand-inner p-6 bg-theme-bg">
                        <MessageSquare size={20} className="text-theme-primary mx-auto mb-3" />
                        <h3 className="text-theme-text font-bold mb-2 text-[17px]">Still need help?</h3>
                        <p className="text-[13px] text-theme-text-muted mb-5 leading-relaxed">Our support team is ready to assist you.</p>
                        <a href="/support" className="inline-block w-full py-3 bg-theme-surface hover:bg-theme-border/50 border border-theme-border/50 text-theme-text text-[10px] font-bold tracking-widest uppercase rounded-lg transition-colors">
                            Contact Support
                        </a>
                    </div>
                </div>

            </div>
        </main>
    );
}
