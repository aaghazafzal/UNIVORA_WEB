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
    return paragraphs.map(p => `<p class="mb-6 leading-relaxed">${p.replace(/\n/g, '<br />')}</p>`).join('');
};

export default function BlogDetailMobileView({ post }: { post: any }) {
    const dateObj = new Date(post.publishedAt);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    
    
    const renderBlock = (block: any) => {
        switch (block.type) {
            case 'markdown':
                return (
                    <div className="mb-10">
                        {block.meta?.heading && (
                            <h2 className="text-2xl font-black text-theme-text mb-6 tracking-tight leading-tight">
                                {block.meta.heading}
                            </h2>
                        )}
                        <div 
                            className="text-theme-text font-light text-[17px] markdown-content"
                            dangerouslySetInnerHTML={{ __html: parseMarkdown(block.content) }}
                        />
                    </div>
                );
            case 'button':
                return (
                    <div className="mb-10 mt-6 w-full">
                        <a 
                            href={block.meta?.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex w-full items-center gap-2 doppelrand-outer rounded-full p-1 transition-awwwards active:scale-[0.98] cursor-pointer"
                        >
                            <div className={`h-full w-full rounded-full px-6 py-4 flex items-center justify-between font-bold uppercase tracking-widest text-[10px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] ${block.meta?.style === 'secondary' ? 'bg-theme-surface border border-theme-border text-white' : 'bg-theme-primary border border-theme-primary text-theme-bg'}`}>
                                {block.content}
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-awwwards group-hover:translate-x-1.5 group-hover:-translate-y-[1px] ${block.meta?.style === 'secondary' ? 'bg-theme-bg/50' : 'bg-theme-bg/20'}`}>
                                    <ArrowUpRight size={12} className={block.meta?.style === 'secondary' ? 'text-theme-primary' : 'text-theme-bg'} />
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
                    <div className={`p-6 rounded-2xl border ${borderColor} ${bgColor} mb-8 doppelrand-outer`}>
                        <div className="doppelrand-inner p-5 bg-[#0a0a0a]">
                            <p className={`text-[10px] font-bold tracking-widest uppercase mb-3 ${textColor} flex items-center gap-2`}>
                                <ShieldCheck size={14} /> Note
                            </p>
                            <p className="text-theme-text text-[15px] leading-relaxed font-light">{block.content}</p>
                        </div>
                    </div>
                );
            case 'image':
                return (
                    <figure className="mb-10 w-[100vw] -mx-5 relative">
                        <img 
                            src={block.meta?.url} 
                            alt={block.content}
                            className="w-full h-auto border-y border-theme-border/30 object-cover max-h-[400px]"
                        />
                        {block.content && (
                            <figcaption className="text-center mt-3 text-[9px] font-mono tracking-widest text-theme-text-muted uppercase px-5">
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
        <main className="relative pt-24 pb-24 min-h-screen bg-theme-bg text-theme-text selection:bg-theme-primary selection:text-theme-bg overflow-x-hidden">
            <div className="px-5 relative z-10">
                <a href="/blog" className="inline-flex items-center gap-2 text-[9px] font-bold tracking-widest text-theme-text-muted hover:text-theme-primary uppercase mb-8 transition-colors">
                    <ArrowLeft size={12} /> Back to Blog
                </a>

                <div className="mb-10">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-2.5 py-1 bg-theme-primary/10 rounded border border-theme-primary/30 text-[8px] font-bold tracking-[0.2em] text-theme-primary uppercase">
                            {post.category}
                        </span>
                        <span className="text-[8px] font-mono tracking-widest text-theme-text-muted">
                            {formattedDate}
                        </span>
                        <span className="text-[8px] font-mono tracking-widest text-theme-text-muted">
                            • {post.readTime}
                        </span>
                    </div>

                    <h1 className="text-4xl font-black tracking-tight text-theme-text mb-4 leading-tight">
                        {post.title}
                    </h1>
                    
                    <p className="text-[15px] text-theme-text-muted font-light leading-relaxed mb-8 border-l-2 border-theme-primary/50 pl-4">
                        {post.excerpt}
                    </p>

                    <div className="flex flex-col gap-5 border-y border-theme-border/20 py-6 mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border border-theme-primary/30 overflow-hidden bg-theme-bg">
                                {post.author?.avatar && <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover"/>}
                            </div>
                            <div>
                                <div className="text-[11px] font-bold tracking-widest uppercase text-theme-text">{post.author?.name}</div>
                                <div className="text-[9px] font-mono text-theme-text-muted">Author</div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2 w-full justify-between mt-2">
                            <span className="text-[9px] font-bold tracking-widest text-theme-text-muted uppercase">Share this article:</span>
                            <div className="flex items-center gap-2">
                                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-theme-border/30 flex items-center justify-center text-theme-text-muted hover:text-theme-text hover:border-theme-text transition-all">
                                    <Twitter size={14} />
                                </a>
                                <a href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-theme-border/30 flex items-center justify-center text-theme-text-muted hover:text-theme-text hover:border-theme-text transition-all">
                                    <Send size={14} />
                                </a>
                                <button onClick={() => navigator.clipboard.writeText(shareUrl)} className="w-8 h-8 rounded-full border border-theme-border/30 flex items-center justify-center text-theme-text-muted hover:text-theme-text hover:border-theme-text transition-all">
                                    <Share2 size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {post.coverImage && (
                    <div className="w-full mb-10 -mx-5 w-[100vw]">
                        <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover border-y border-theme-border/20" />
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

                <div className="mt-16 pt-10 border-t border-theme-border/20">
                    <div className="doppelrand-outer rounded-2xl shadow-xl w-full">
                        <div className="doppelrand-inner bg-theme-surface/30 p-8 flex flex-col gap-6 items-center text-center">
                            <div className="w-20 h-20 rounded-full border-2 border-theme-primary/30 overflow-hidden bg-theme-bg shrink-0">
                                {post.author?.avatar && <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover"/>}
                            </div>
                            <div>
                                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-primary mb-2">Written By</div>
                                <h3 className="text-xl font-black text-theme-text mb-2">{post.author?.name}</h3>
                                <p className="text-theme-text-muted text-sm leading-relaxed font-light">{post.author?.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
