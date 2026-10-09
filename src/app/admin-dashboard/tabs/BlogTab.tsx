"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Trash2, Edit3, Image as ImageIcon, Type, Link as LinkIcon, Square, GripVertical, X } from 'lucide-react';

type BlogBlock = {
    id: string;
    type: 'markdown' | 'button' | 'card' | 'image';
    content: string;
    meta?: any;
};

export default function BlogTab() {
    const [posts, setPosts] = useState<any[]>([]);
    
    // Form State
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [readTime, setReadTime] = useState('');
    
    // Author State
    const [authorName, setAuthorName] = useState('Anish');
    const [authorBio, setAuthorBio] = useState('');
    const [authorAvatar, setAuthorAvatar] = useState('');

    // Blocks State
    const [blocks, setBlocks] = useState<BlogBlock[]>([]);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const res = await fetch('/api/admin/blog');
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
    };

    const handleAddBlock = (type: 'markdown' | 'button' | 'card' | 'image') => {
        const newBlock: BlogBlock = {
            id: Math.random().toString(36).substring(7),
            type,
            content: '',
            meta: type === 'button' ? { url: '', style: 'primary' } : type === 'card' ? { type: 'info' } : type === 'image' ? { url: '' } : {}
        };
        setBlocks([...blocks, newBlock]);
    };

    const updateBlock = (id: string, updates: Partial<BlogBlock>) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
    };

    const removeBlock = (id: string) => {
        setBlocks(blocks.filter(b => b.id !== id));
    };

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index > 0) {
            const newBlocks = [...blocks];
            [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
            setBlocks(newBlocks);
        } else if (direction === 'down' && index < blocks.length - 1) {
            const newBlocks = [...blocks];
            [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
            setBlocks(newBlocks);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const method = editId ? 'PUT' : 'POST';
            const bodyPayload: any = {
                title, 
                slug, 
                excerpt, 
                coverImage, 
                category, 
                tags: tags.split(',').map(t => t.trim()).filter(Boolean),
                isFeatured,
                readTime,
                author: { name: authorName, bio: authorBio, avatar: authorAvatar },
                blocks
            };
            if (editId) bodyPayload.id = editId;

            const res = await fetch('/api/admin/blog', {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyPayload),
            });
            if (res.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
                cancelEdit();
                fetchPosts();
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this blog post?")) return;
        await fetch('/api/admin/blog', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        if (editId === id) cancelEdit();
        fetchPosts();
    };

    const handleEdit = (post: any) => {
        setEditId(post._id);
        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt);
        setCoverImage(post.coverImage || '');
        setCategory(post.category);
        setTags((post.tags || []).join(', '));
        setIsFeatured(post.isFeatured);
        setReadTime(post.readTime || '');
        setAuthorName(post.author?.name || '');
        setAuthorBio(post.author?.bio || '');
        setAuthorAvatar(post.author?.avatar || '');
        setBlocks(post.blocks || []);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditId(null);
        setTitle('');
        setSlug('');
        setExcerpt('');
        setCoverImage('');
        setCategory('');
        setTags('');
        setIsFeatured(false);
        setReadTime('');
        setAuthorName('Anish');
        setAuthorBio('');
        setAuthorAvatar('');
        setBlocks([]);
    };

    const renderBlockEditor = (block: BlogBlock, index: number) => {
        return (
            <div key={block.id} className="p-4 rounded-xl border border-theme-border/30 bg-[#111] flex flex-col gap-3 group relative">
                <div className="flex items-center justify-between border-b border-theme-border/20 pb-3 mb-1">
                    <div className="flex items-center gap-2">
                        <GripVertical size={14} className="text-theme-text-muted cursor-grab" />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-theme-primary flex items-center gap-2">
                            {block.type === 'markdown' && <><Type size={12}/> Text Block</>}
                            {block.type === 'button' && <><LinkIcon size={12}/> Button Block</>}
                            {block.type === 'card' && <><Square size={12}/> Card Block</>}
                            {block.type === 'image' && <><ImageIcon size={12}/> Image Block</>}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button type="button" onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="p-1 text-theme-text-muted hover:text-white disabled:opacity-30">↑</button>
                        <button type="button" onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1} className="p-1 text-theme-text-muted hover:text-white disabled:opacity-30">↓</button>
                        <button type="button" onClick={() => removeBlock(block.id)} className="p-1 text-red-500/70 hover:text-red-500 ml-2"><X size={14}/></button>
                    </div>
                </div>

                {block.type === 'markdown' && (
                    <div className="flex flex-col gap-3">
                        <input 
                            type="text" placeholder="Optional Heading (e.g. What's Next?)"
                            value={block.meta?.heading || ''}
                            onChange={(e) => updateBlock(block.id, { meta: { ...block.meta, heading: e.target.value } })}
                            className="w-full bg-[#0a0a0a] border border-theme-border/30 rounded-lg p-3 text-xs outline-none focus:border-theme-primary/50 text-white font-bold tracking-wide"
                        />
                        <textarea 
                            rows={6}
                            placeholder="Write your markdown content here..."
                            value={block.content}
                            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-theme-border/30 rounded-lg p-3 text-xs outline-none focus:border-theme-primary/50 text-white placeholder:text-white/20 font-mono resize-none"
                        />
                    </div>
                )}

                {block.type === 'button' && (
                    <div className="flex flex-col md:flex-row gap-3">
                        <input 
                            type="text" placeholder="Button Label"
                            value={block.content}
                            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                            className="flex-1 bg-[#0a0a0a] border border-theme-border/30 rounded-lg p-3 text-xs outline-none focus:border-theme-primary/50 text-white"
                        />
                        <input 
                            type="text" placeholder="URL"
                            value={block.meta?.url || ''}
                            onChange={(e) => updateBlock(block.id, { meta: { ...block.meta, url: e.target.value } })}
                            className="flex-[2] bg-[#0a0a0a] border border-theme-border/30 rounded-lg p-3 text-xs outline-none focus:border-theme-primary/50 text-white"
                        />
                        <select
                            value={block.meta?.style || 'primary'}
                            onChange={(e) => updateBlock(block.id, { meta: { ...block.meta, style: e.target.value } })}
                            className="flex-1 bg-[#0a0a0a] border border-theme-border/30 rounded-lg p-3 text-xs outline-none focus:border-theme-primary/50 text-white"
                        >
                            <option value="primary">Primary</option>
                            <option value="secondary">Secondary</option>
                        </select>
                    </div>
                )}

                {block.type === 'card' && (
                    <div className="flex flex-col gap-3">
                        <select
                            value={block.meta?.type || 'info'}
                            onChange={(e) => updateBlock(block.id, { meta: { ...block.meta, type: e.target.value } })}
                            className="w-1/3 bg-[#0a0a0a] border border-theme-border/30 rounded-lg p-3 text-xs outline-none focus:border-theme-primary/50 text-white"
                        >
                            <option value="info">Info / Normal</option>
                            <option value="warning">Warning / Alert</option>
                            <option value="success">Success</option>
                        </select>
                        <textarea 
                            rows={3}
                            placeholder="Card message..."
                            value={block.content}
                            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-theme-border/30 rounded-lg p-3 text-xs outline-none focus:border-theme-primary/50 text-white resize-none"
                        />
                    </div>
                )}

                {block.type === 'image' && (
                    <div className="flex flex-col md:flex-row gap-3">
                        <input 
                            type="text" placeholder="Image URL"
                            value={block.meta?.url || ''}
                            onChange={(e) => updateBlock(block.id, { meta: { ...block.meta, url: e.target.value } })}
                            className="flex-[2] bg-[#0a0a0a] border border-theme-border/30 rounded-lg p-3 text-xs outline-none focus:border-theme-primary/50 text-white"
                        />
                        <input 
                            type="text" placeholder="Alt Text"
                            value={block.content}
                            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                            className="flex-1 bg-[#0a0a0a] border border-theme-border/30 rounded-lg p-3 text-xs outline-none focus:border-theme-primary/50 text-white"
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-10">
            <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Blog Module DB</h2>
                <p className="text-theme-text-muted text-xs tracking-widest uppercase">Create and manage rich blog posts with custom blocks.</p>
            </div>

            {/* Editor Form */}
            <div className="p-1 rounded-[2rem] border border-theme-primary/30 bg-theme-primary/5">
                <div className="p-6 rounded-[calc(2rem-4px)] bg-[#0a0a0a] border border-theme-border/20">
                    <div className="flex items-center justify-between mb-6 border-b border-theme-border/20 pb-4">
                        <h2 className={`text-xs font-bold tracking-widest uppercase flex items-center gap-2 ${editId ? 'text-blue-400' : 'text-theme-primary'}`}>
                            {editId ? <><Edit3 size={14} /> Edit Blog Post</> : <><Plus size={14} /> Deploy New Blog Post</>}
                        </h2>
                        {editId && (
                            <button onClick={cancelEdit} className="text-[10px] text-theme-text-muted hover:text-white uppercase tracking-widest font-bold">
                                Cancel Edit
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        
                        {/* Section 1: Basic Metadata */}
                        <div className="flex flex-col gap-4 p-4 rounded-xl border border-theme-border/20 bg-[#111]/50">
                            <h3 className="text-[10px] tracking-widest text-theme-text-muted uppercase font-bold mb-2 border-b border-theme-border/20 pb-2">1. Post Meta</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] tracking-widest text-theme-text-muted uppercase">Title</label>
                                    <input 
                                        type="text" placeholder="e.g. How to use Univora" required
                                        value={title} onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-theme-primary/50 text-white"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] tracking-widest text-theme-text-muted uppercase">Slug (URL)</label>
                                    <input 
                                        type="text" placeholder="e.g. how-to-use-univora" required
                                        value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                        className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-theme-primary/50 text-white"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 md:col-span-2">
                                    <label className="text-[10px] tracking-widest text-theme-text-muted uppercase">Short Excerpt (For Grid Cards)</label>
                                    <textarea 
                                        rows={2} placeholder="A short summary of the blog post..." required
                                        value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
                                        className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-theme-primary/50 text-white resize-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 md:col-span-2">
                                    <label className="text-[10px] tracking-widest text-theme-text-muted uppercase">Cover Image URL (16:9)</label>
                                    <input 
                                        type="text" placeholder="e.g. https://example.com/image.jpg" required
                                        value={coverImage} onChange={(e) => setCoverImage(e.target.value)}
                                        className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-theme-primary/50 text-white"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] tracking-widest text-theme-text-muted uppercase">Category</label>
                                    <input 
                                        type="text" placeholder="e.g. TelegramBots" required
                                        value={category} onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-theme-primary/50 text-white"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] tracking-widest text-theme-text-muted uppercase">Tags (Comma Separated)</label>
                                    <input 
                                        type="text" placeholder="e.g. Tutorial, Setup, Bots" required
                                        value={tags} onChange={(e) => setTags(e.target.value)}
                                        className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-theme-primary/50 text-white"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] tracking-widest text-theme-text-muted uppercase">Estimated Read Time</label>
                                    <input 
                                        type="text" placeholder="e.g. 5 min read" required
                                        value={readTime} onChange={(e) => setReadTime(e.target.value)}
                                        className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-theme-primary/50 text-white"
                                    />
                                </div>
                                <div className="flex items-center gap-3 pt-4">
                                    <input 
                                        type="checkbox" 
                                        id="isFeatured"
                                        checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)}
                                        className="w-4 h-4 accent-theme-primary"
                                    />
                                    <label htmlFor="isFeatured" className="text-xs font-bold tracking-widest text-white uppercase cursor-pointer">Set as Featured Post (Hero Section)</label>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Author Metadata */}
                        <div className="flex flex-col gap-4 p-4 rounded-xl border border-theme-border/20 bg-[#111]/50">
                            <h3 className="text-[10px] tracking-widest text-theme-text-muted uppercase font-bold mb-2 border-b border-theme-border/20 pb-2">2. Author Profile</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] tracking-widest text-theme-text-muted uppercase">Author Name</label>
                                    <input 
                                        type="text" required
                                        value={authorName} onChange={(e) => setAuthorName(e.target.value)}
                                        className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-theme-primary/50 text-white"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] tracking-widest text-theme-text-muted uppercase">Author Avatar URL (1:1)</label>
                                    <input 
                                        type="text" placeholder="e.g. https://example.com/avatar.jpg"
                                        value={authorAvatar} onChange={(e) => setAuthorAvatar(e.target.value)}
                                        className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-theme-primary/50 text-white"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 md:col-span-2">
                                    <label className="text-[10px] tracking-widest text-theme-text-muted uppercase">Author Bio (End of article)</label>
                                    <textarea 
                                        rows={2} placeholder="A short bio about the author..."
                                        value={authorBio} onChange={(e) => setAuthorBio(e.target.value)}
                                        className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-theme-primary/50 text-white resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Block Builder */}
                        <div className="flex flex-col gap-4 p-4 rounded-xl border border-theme-border/20 bg-[#111]/50">
                            <h3 className="text-[10px] tracking-widest text-theme-text-muted uppercase font-bold mb-2 border-b border-theme-border/20 pb-2">3. Content Builder (Blocks)</h3>
                            
                            <div className="flex flex-col gap-4 mb-4">
                                <AnimatePresence>
                                    {blocks.map((block, index) => (
                                        <motion.div 
                                            key={block.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                        >
                                            {renderBlockEditor(block, index)}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {blocks.length === 0 && (
                                    <div className="text-center p-8 border border-dashed border-theme-border/30 rounded-xl text-theme-text-muted text-xs uppercase tracking-widest">
                                        No content blocks yet. Add a block to start writing.
                                    </div>
                                )}
                            </div>

                            {/* Add Block Toolbar */}
                            <div className="flex flex-wrap items-center gap-3 bg-[#0a0a0a] p-3 rounded-xl border border-theme-border/20">
                                <span className="text-[10px] font-bold tracking-widest uppercase text-theme-text-muted px-2">Add Block:</span>
                                <button type="button" onClick={() => handleAddBlock('markdown')} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-theme-text/5 hover:bg-theme-primary/20 hover:text-theme-primary transition-colors text-xs font-bold tracking-widest uppercase">
                                    <Type size={14}/> Text
                                </button>
                                <button type="button" onClick={() => handleAddBlock('button')} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-theme-text/5 hover:bg-theme-primary/20 hover:text-theme-primary transition-colors text-xs font-bold tracking-widest uppercase">
                                    <LinkIcon size={14}/> Button
                                </button>
                                <button type="button" onClick={() => handleAddBlock('card')} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-theme-text/5 hover:bg-theme-primary/20 hover:text-theme-primary transition-colors text-xs font-bold tracking-widest uppercase">
                                    <Square size={14}/> Card
                                </button>
                                <button type="button" onClick={() => handleAddBlock('image')} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-theme-text/5 hover:bg-theme-primary/20 hover:text-theme-primary transition-colors text-xs font-bold tracking-widest uppercase">
                                    <ImageIcon size={14}/> Image
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading || blocks.length === 0}
                            className={`w-full py-5 rounded-xl text-black font-black tracking-widest text-sm uppercase flex items-center justify-center gap-2 transition-opacity disabled:opacity-50 mt-4 ${editId ? 'bg-blue-400 hover:bg-blue-300' : 'bg-theme-primary hover:opacity-90'}`}
                        >
                            {loading ? 'Transmitting...' : success ? <><Check size={18}/> Saved to DB</> : editId ? 'Update Blog Post' : 'Publish Blog Post'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Existing Posts List */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xs font-bold tracking-widest text-theme-text-muted uppercase mb-2">Existing Posts</h3>
                {posts.length === 0 ? (
                    <div className="p-8 border border-theme-border/20 rounded-2xl bg-[#0a0a0a] text-center text-theme-text-muted text-xs uppercase tracking-widest">No posts found.</div>
                ) : (
                    posts.map(post => (
                        <div key={post._id} className="p-5 rounded-2xl border border-theme-border/30 bg-[#0a0a0a] flex flex-col lg:flex-row lg:items-center justify-between gap-4 group hover:border-theme-primary/30 transition-colors">
                            <div className="flex items-start gap-4">
                                {post.coverImage && (
                                    <img src={post.coverImage} alt="Cover" className="w-24 h-16 object-cover rounded-lg border border-theme-border/20 hidden sm:block" />
                                )}
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-2 py-1 bg-theme-text/10 text-theme-text rounded text-[9px] font-bold uppercase tracking-widest">{post.category}</span>
                                        {post.isFeatured && <span className="px-2 py-1 bg-amber-400/10 text-amber-400 border border-amber-400/30 rounded text-[9px] font-bold uppercase tracking-widest">Featured</span>}
                                        <span className="text-[10px] font-mono text-theme-text-muted">{new Date(post.publishedAt).toLocaleDateString()}</span>
                                    </div>
                                    <h4 className="text-lg font-bold">{post.title}</h4>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleEdit(post)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors">
                                    <Edit3 size={16} />
                                </button>
                                <button onClick={() => handleDelete(post._id)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
