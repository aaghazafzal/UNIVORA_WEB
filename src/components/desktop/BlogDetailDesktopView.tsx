"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Twitter, Send, Share2, ArrowUpRight, ShieldCheck } from 'lucide-react';

const parseMarkdown = (text: string) => {
    let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-theme-primary hover:underline">$1</a>');
    
    // Split into paragraphs
    const paragraphs = html.split(/\n\n+/).filter(Boolean);
    return paragraphs.map(p => `<p class="mb-8 text-xl lg:text-2xl text-theme-text-muted font-light leading-relaxed">${p.replace(/\n/g, '<br />')}</p>`).join('');
};

export default function BlogDetailDesktopView({ post }: { post: any }) {
    const dateObj = new Date(post.publishedAt);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    
    
    const renderBlock = (block: any) => {
        switch (block.type) {
            case 'markdown':
                return (
                    <div className="mb-12">
                        {block.meta?.heading && (
                            <h2 className="text-3xl lg:text-4xl font-black text-theme-text mb-8 tracking-tight">
                                {block.meta.heading}
                            </h2>
                        )}
                        <div 
                            className="text-theme-text font-light markdown-content"
                            dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }}
                        />
                    </div>
                );
            case 'button':
                return (
                    <div className="mb-16 mt-8">
                        <a 
                            href={block.meta?.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 doppelrand-outer rounded-full p-1 transition-awwwards active:scale-[0.98] cursor-pointer w-fit"
                        >
                            <div className={`h-full rounded-full px-8 py-5 flex items-center gap-4 font-bold uppercase tracking-widest text-xs shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] ${block.meta?.style === 'secondary' ? 'bg-theme-surface border border-theme-border text-white hover:bg-theme-surface/80' : 'bg-theme-primary border border-theme-primary text-theme-bg hover:opacity-90'}`}>
                                {block.content}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-awwwards group-hover:translate-x-1.5 group-hover:-translate-y-[1px] ${block.meta?.style === 'secondary' ? 'bg-theme-bg/50' : 'bg-theme-bg/20'}`}>
                                    <ArrowUpRight size={14} className={block.meta?.style === 'secondary' ? 'text-theme-primary' : 'text-theme-bg'} />
                                </div>
                            </div>
                        </a>
                    </div>
                );
            case 'card':
                const isWarning = block.meta?.type === 'warning';
                const isSuccess = block.meta?.type === 'success';
                const borderColor = isWarning ? 'border-amber-500/50' : isSuccess ? 'border-emerald-500/50' : 'border-blue-500/50';
                const bgColor = isWarning ? 'bg-amber-500/10' : isSuccess ? 'bg-emerald-500/10' : 'bg-blue-500/10';
                const textColor = isWarning ? 'text-amber-500' : isSuccess ? 'text-emerald-500' : 'text-blue-500';

                return (
                    <div className={`p-8 rounded-2xl border ${borderColor} ${bgColor} mb-12 doppelrand-outer shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.05)]`}>
                        <div className="doppelrand-inner p-8 bg-[#0a0a0a]">
                            <p className={`text-xs font-bold tracking-widest uppercase mb-4 ${textColor} flex items-center gap-2`}>
                                <ShieldCheck size={16} /> Note
                            </p>
                            <p className="text-theme-text text-xl leading-relaxed font-light">{block.content}</p>
                        </div>
                    </div>
                );
            case 'image':
                return (
                    <figure className="mb-16">
                        <div className="w-full doppelrand-outer rounded-2xl">
                            <div className="doppelrand-inner p-2 bg-theme-surface/30">
                                <img 
                                    src={block.meta?.url} 
                                    alt={block.content}
                                    className="w-full rounded-xl object-cover border border-theme-border/20 shadow-2xl"
                                />
                            </div>
                        </div>
                        {block.content && (
                            <figcaption className="text-center mt-6 text-[10px] font-mono tracking-widest text-theme-text-muted uppercase">
                                {block.content}
                            </figcaption>
                        )}
                    </figure>
                );
            default:
                return null;
        }
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `Check out this article: ${post.title}`;

    return (
        <main className="relative pt-32 pb-32 min-h-screen bg-theme-bg text-theme-text selection:bg-theme-primary selection:text-theme-bg">
            <div className="max-w-[800px] mx-auto px-8 relative z-10">
                <a href="/blog" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-theme-text-muted hover:text-theme-primary uppercase mb-12 transition-colors">
                    <ArrowLeft size={14} /> Back to Blog
                </a>

                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-theme-primary/10 rounded border border-theme-primary/30 text-[10px] font-bold tracking-[0.2em] text-theme-primary uppercase">
                            {post.category}
                        </span>
                        <span className="text-[10px] font-mono tracking-widest text-theme-text-muted">
                            {formattedDate}
                        </span>
                        <span className="text-[10px] font-mono tracking-widest text-theme-text-muted">
                            • {post.readTime}
                        </span>
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-theme-text mb-6 leading-tight">
                        {post.title}
                    </h1>
                    
                    <p className="text-xl text-theme-text-muted font-light leading-relaxed mb-10 border-l-4 border-theme-primary/50 pl-6">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between border-y border-theme-border/20 py-6 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border border-theme-primary/30 overflow-hidden bg-theme-bg">
                                {post.author?.avatar && <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover"/>}
                            </div>
                            <div>
                                <div className="text-xs font-bold tracking-widest uppercase text-theme-text">{post.author?.name}</div>
                                <div className="text-[10px] font-mono text-theme-text-muted">Author</div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold tracking-widest text-theme-text-muted uppercase mr-2">Share</span>
                            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-theme-border/30 flex items-center justify-center text-theme-text-muted hover:text-theme-text hover:border-theme-text transition-all">
                                <Twitter size={16} />
                            </a>
                            <a href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-theme-border/30 flex items-center justify-center text-theme-text-muted hover:text-theme-text hover:border-theme-text transition-all">
                                <Send size={16} />
                            </a>
                            <button onClick={() => navigator.clipboard.writeText(shareUrl)} className="w-10 h-10 rounded-full border border-theme-border/30 flex items-center justify-center text-theme-text-muted hover:text-theme-text hover:border-theme-text transition-all">
                                <Share2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {post.coverImage && (
                    <div className="w-full mb-20 rounded-[2rem] overflow-hidden border border-theme-border/20 doppelrand-outer shadow-2xl">
                        <div className="doppelrand-inner p-2 bg-theme-surface/20">
                            <img src={post.coverImage} alt={post.title} className="w-full h-auto object-cover max-h-[600px] rounded-[1.5rem]" />
                        </div>
                    </div>
                )}

                <article className="prose-container max-w-none">
                    {post.blocks.map((block: any, index: number) => (
                        <motion.div 
                            key={block.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            {renderBlock(block)}
                        </motion.div>
                    ))}
                </article>

                <div className="mt-20 pt-12 border-t border-theme-border/20">
                    <div className="doppelrand-outer rounded-3xl shadow-2xl w-full">
                        <div className="doppelrand-inner bg-theme-surface/30 p-10 flex flex-col md:flex-row gap-8 items-center md:items-start w-full">
                            <div className="w-24 h-24 rounded-full border-2 border-theme-primary/30 overflow-hidden bg-theme-bg shrink-0">
                                {post.author?.avatar && <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover"/>}
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <div className="text-xs font-bold tracking-[0.2em] uppercase text-theme-primary mb-2">Written By</div>
                                <h3 className="text-2xl font-black text-theme-text mb-3">{post.author?.name}</h3>
                                <p className="text-theme-text-muted text-lg leading-relaxed font-light max-w-2xl">{post.author?.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
