"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search } from 'lucide-react';

const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
};

export default function BlogMobileView({ posts }: { posts: any[] }) {
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
        <main className="relative pt-24 pb-24 min-h-screen bg-theme-bg text-theme-text selection:bg-theme-primary selection:text-theme-bg">
            <div className="px-5 relative z-10">

                {/* Filter and Search */}
                <div className="mb-10">
                    <div className="relative w-full mb-6">
                        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-muted" />
                        <input 
                            type="text" 
                            placeholder="Search articles..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-theme-border/30 rounded-xl py-3.5 pl-10 pr-4 text-xs font-mono tracking-wide text-white placeholder-theme-text-muted focus:outline-none focus:border-theme-primary transition-colors shadow-inner"
                        />
                    </div>

                    {categories.length > 0 && (
                        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide border-b border-theme-border/20">
                            <button 
                                onClick={() => setSelectedCategory(null)}
                                className={`shrink-0 px-5 py-2.5 rounded-xl border text-[9px] font-bold tracking-[0.2em] uppercase transition-all ${!selectedCategory ? 'border-theme-primary bg-theme-primary text-black' : 'border-theme-border/30 text-theme-text-muted bg-[#0a0a0a]'}`}
                            >
                                All
                            </button>
                            {categories.map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat as string)}
                                    className={`shrink-0 px-5 py-2.5 rounded-xl border text-[9px] font-bold tracking-[0.2em] uppercase transition-all ${selectedCategory === cat ? 'border-theme-primary bg-theme-primary text-black' : 'border-theme-border/30 text-theme-text-muted bg-[#0a0a0a]'}`}
                                >
                                    {cat as string}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Grid */}
                <div className="flex flex-col gap-6">
                    <AnimatePresence>
                        {filteredPosts.map((post, index) => (
                            <motion.a
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className="group doppelrand-outer block w-full"
                            >
                                <div className="doppelrand-inner relative overflow-hidden bg-[#0a0a0a] flex flex-col">
                                    {post.coverImage && (
                                        <div className="relative h-48 w-full border-b border-theme-border/20 overflow-hidden">
                                            <img 
                                                src={post.coverImage} 
                                                alt={post.title}
                                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                                            />
                                            <div className="absolute top-3 left-3 flex gap-2">
                                                {post.isFeatured && (
                                                    <span className="px-2.5 py-1 bg-theme-primary text-black rounded border border-theme-primary text-[8px] font-bold tracking-[0.2em] uppercase">
                                                        Featured
                                                    </span>
                                                )}
                                                <span className="px-2.5 py-1 bg-black/60 backdrop-blur rounded border border-theme-border/50 text-[8px] font-bold tracking-[0.2em] text-white uppercase">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <div>
                                            <div className="text-[8px] font-mono tracking-widest text-theme-text-muted mb-3">
                                                {formatDate(post.publishedAt)}
                                            </div>
                                            <h3 className="text-xl font-bold tracking-tight text-white mb-2 leading-snug">
                                                {post.title}
                                            </h3>
                                            <p className="text-theme-text-muted text-xs font-light leading-relaxed line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                        <div className="mt-5 flex items-center justify-between border-t border-theme-border/20 pt-4">
                                            <span className="text-[8px] font-bold tracking-[0.2em] text-theme-text-muted uppercase flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full overflow-hidden border border-theme-border/50 bg-[#111]">
                                                    {post.author?.avatar && <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover"/>}
                                                </div>
                                                {post.author?.name}
                                            </span>
                                            <div className="w-7 h-7 rounded-full bg-theme-surface/50 border border-theme-border/50 flex items-center justify-center text-theme-primary">
                                                <ArrowUpRight size={12} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </AnimatePresence>
                </div>
                
                {filteredPosts.length === 0 && (
                    <div className="py-20 -mx-5 px-5 text-center border-y border-theme-border/20 bg-[#0a0a0a] shadow-inner mt-6">
                        <p className="text-theme-text-muted text-[10px] font-bold tracking-widest uppercase">No posts found.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
