"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search } from 'lucide-react';

const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
};

export default function BlogDesktopView({ posts }: { posts: any[] }) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const categories = Array.from(new Set(posts.map(p => p.category)));

    const filteredPosts = posts.filter(p => {
        const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="relative pt-32 pb-32 min-h-screen bg-theme-bg text-theme-text selection:bg-theme-primary selection:text-theme-bg">
            <div className="max-w-[1200px] mx-auto px-8 relative z-10">
                <div className="mb-16">
                    <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-white uppercase mb-6">The Armory</h1>
                    <p className="text-theme-text-muted text-sm tracking-[0.2em] uppercase font-bold border-l-2 border-theme-primary/50 pl-4">News, updates, and deep dives from Univora</p>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-16 border-b border-theme-border/20 pb-8">
                    
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-bold tracking-widest text-theme-text-muted uppercase mr-2">Filter:</span>
                        <button 
                            onClick={() => setSelectedCategory(null)}
                            className={`px-6 py-3 rounded-xl border text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${!selectedCategory ? 'border-theme-primary bg-theme-primary text-black' : 'border-theme-border/30 text-theme-text-muted hover:border-theme-text hover:text-white bg-theme-surface/30'}`}
                        >
                            All
                        </button>
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setSelectedCategory(cat as string)}
                                className={`px-6 py-3 rounded-xl border text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${selectedCategory === cat ? 'border-theme-primary bg-theme-primary text-black' : 'border-theme-border/30 text-theme-text-muted hover:border-theme-text hover:text-white bg-theme-surface/30'}`}
                            >
                                {cat as string}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-[350px]">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-muted" />
                        <input 
                            type="text" 
                            placeholder="Search articles..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-theme-surface/30 border border-theme-border/30 rounded-xl py-3 pl-12 pr-4 text-sm font-mono tracking-wide text-white placeholder-theme-text-muted focus:outline-none focus:border-theme-primary transition-colors"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredPosts.map((post, index) => (
                            <motion.a
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className="group doppelrand-outer block h-full"
                            >
                                <div className="doppelrand-inner relative overflow-hidden bg-[#0a0a0a] h-full flex flex-col">
                                    <div className="relative h-48 w-full border-b border-theme-border/20 overflow-hidden">
                                        {post.coverImage ? (
                                            <img 
                                                src={post.coverImage} 
                                                alt={post.title}
                                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-theme-primary/5"></div>
                                        )}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            {post.isFeatured && (
                                                <span className="px-2.5 py-1 bg-theme-primary text-black rounded border border-theme-primary text-[9px] font-bold tracking-[0.2em] uppercase">
                                                    Featured
                                                </span>
                                            )}
                                            <span className="px-2.5 py-1 bg-black/60 backdrop-blur rounded border border-theme-border/50 text-[9px] font-bold tracking-[0.2em] text-white uppercase">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col justify-between">
                                        <div>
                                            <div className="text-[9px] font-mono tracking-widest text-theme-text-muted mb-4">
                                                {formatDate(post.publishedAt)}
                                            </div>
                                            <h3 className="text-2xl font-black tracking-tight text-white mb-3 group-hover:text-theme-primary transition-colors line-clamp-2 leading-snug">
                                                {post.title}
                                            </h3>
                                            <p className="text-theme-text-muted text-[15px] font-light leading-relaxed line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                        <div className="mt-8 flex items-center justify-between border-t border-theme-border/20 pt-6">
                                            <span className="text-[9px] font-bold tracking-[0.2em] text-theme-text-muted uppercase flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full overflow-hidden border border-theme-border/50 bg-[#111]">
                                                    {post.author?.avatar && <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover"/>}
                                                </div>
                                                {post.author?.name}
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-theme-surface/50 border border-theme-border/50 flex items-center justify-center transition-all group-hover:bg-theme-primary group-hover:text-black group-hover:border-theme-primary group-hover:translate-x-1 group-hover:-translate-y-1">
                                                <ArrowUpRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </AnimatePresence>
                </div>
                
                {filteredPosts.length === 0 && (
                    <div className="py-32 text-center border border-theme-border/20 rounded-2xl bg-[#0a0a0a] shadow-inner">
                        <p className="text-theme-text-muted text-xs font-bold tracking-widest uppercase">No posts found.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
