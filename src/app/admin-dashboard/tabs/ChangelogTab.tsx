"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Trash2, Edit3, Activity } from 'lucide-react';

export default function ChangelogTab() {
    const [logs, setLogs] = useState<any[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('App');
    const [product, setProduct] = useState('');
    const [version, setVersion] = useState('');
    const [added, setAdded] = useState('');
    const [changed, setChanged] = useState('');
    const [fixed, setFixed] = useState('');
    const [removed, setRemoved] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        const res = await fetch('/api/admin/changelog');
        const data = await res.json();
        setLogs(Array.isArray(data) ? data : []);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const method = editId ? 'PUT' : 'POST';
            const bodyPayload: any = {
                title, 
                description, 
                category, 
                product, 
                version,
                added: added.split('\n').filter(l => l.trim() !== ''),
                changed: changed.split('\n').filter(l => l.trim() !== ''),
                fixed: fixed.split('\n').filter(l => l.trim() !== ''),
                removed: removed.split('\n').filter(l => l.trim() !== '')
            };
            if (editId) bodyPayload.id = editId;

            const res = await fetch('/api/admin/changelog', {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyPayload),
            });
            if (res.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
                setTitle('');
                setDescription('');
                setProduct('');
                setVersion('');
                setAdded('');
                setChanged('');
                setFixed('');
                setRemoved('');
                setEditId(null);
                fetchLogs(); // Refresh list
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this log?")) return;
        await fetch('/api/admin/changelog', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        if (editId === id) cancelEdit();
        fetchLogs();
    };

    const handleEdit = (log: any) => {
        setEditId(log._id);
        setCategory(log.category);
        setProduct(log.product);
        setVersion(log.version);
        setTitle(log.title);
        setDescription(log.description);
        setAdded((log.added || []).join('\n'));
        setChanged((log.changed || []).join('\n'));
        setFixed((log.fixed || []).join('\n'));
        setRemoved((log.removed || []).join('\n'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditId(null);
        setTitle('');
        setDescription('');
        setProduct('');
        setVersion('');
        setAdded('');
        setChanged('');
        setFixed('');
        setRemoved('');
    };

    return (
        <div className="flex flex-col gap-10">
            <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Changelog DB</h2>
                <p className="text-theme-text-muted text-xs tracking-widest uppercase">Create, Edit, and Delete system logs.</p>
            </div>

            {/* Create Form */}
            <div className="p-1 rounded-[2rem] border border-theme-primary/30 bg-theme-primary/5">
                <div className="p-6 rounded-[calc(2rem-4px)] bg-[#0a0a0a] border border-theme-border/20">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className={`text-xs font-bold tracking-widest uppercase flex items-center gap-2 ${editId ? 'text-blue-400' : 'text-theme-primary'}`}>
                            {editId ? <><Edit3 size={14} /> Edit Changelog</> : <><Plus size={14} /> Deploy New Changelog</>}
                        </h2>
                        {editId && (
                            <button onClick={cancelEdit} className="text-[10px] text-theme-text-muted hover:text-white uppercase tracking-widest font-bold">
                                Cancel Edit
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col lg:flex-row gap-3">
                            <div className="flex-1 flex flex-col gap-1">
                                <label className="text-[10px] tracking-widest text-theme-text-muted uppercase">Category</label>
                                <select 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-theme-primary/50 text-white"
                                >
                                    <option value="App">App</option>
                                    <option value="Bot">Bot</option>
                                    <option value="Store">Store</option>
                                    <option value="System">System</option>
                                </select>
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <label className="text-[10px] tracking-widest text-theme-text-muted uppercase">Version</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. v2.1"
                                    value={version}
                                    onChange={(e) => setVersion(e.target.value)}
                                    className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-theme-primary/50 text-white placeholder:text-white/20"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] tracking-widest text-theme-text-muted uppercase">Product Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. CinemaHub"
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                                className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-theme-primary/50 text-white placeholder:text-white/20"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] tracking-widest text-theme-text-muted uppercase">Update Title</label>
                            <input 
                                type="text" 
                                placeholder="Brief summary of the update"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-theme-primary/50 text-white placeholder:text-white/20"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] tracking-widest text-theme-text-muted uppercase">Short Summary (Preview)</label>
                            <textarea 
                                rows={2}
                                placeholder="A short description for the preview card..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-theme-primary/50 text-white placeholder:text-white/20 resize-none"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] tracking-widest text-emerald-400 uppercase">🚀 Added (1 per line)</label>
                                <textarea 
                                    rows={4}
                                    placeholder="Added dark mode&#10;Added bio section"
                                    value={added}
                                    onChange={(e) => setAdded(e.target.value)}
                                    className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-emerald-500/50 text-white placeholder:text-white/20 resize-none"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] tracking-widest text-blue-400 uppercase">🔄 Changed (1 per line)</label>
                                <textarea 
                                    rows={4}
                                    placeholder="Upgraded loading speed&#10;Updated logo"
                                    value={changed}
                                    onChange={(e) => setChanged(e.target.value)}
                                    className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-blue-500/50 text-white placeholder:text-white/20 resize-none"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] tracking-widest text-amber-400 uppercase">🛠️ Fixed (1 per line)</label>
                                <textarea 
                                    rows={4}
                                    placeholder="Fixed checkout crash&#10;Solved overlap issue"
                                    value={fixed}
                                    onChange={(e) => setFixed(e.target.value)}
                                    className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-amber-500/50 text-white placeholder:text-white/20 resize-none"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] tracking-widest text-rose-400 uppercase">❌ Removed (1 per line)</label>
                                <textarea 
                                    rows={4}
                                    placeholder="Removed IE support"
                                    value={removed}
                                    onChange={(e) => setRemoved(e.target.value)}
                                    className="w-full bg-[#111] border border-theme-border/30 rounded-xl p-3 text-xs outline-none focus:border-rose-500/50 text-white placeholder:text-white/20 resize-none"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`mt-4 w-full py-4 rounded-xl text-black font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2 transition-opacity disabled:opacity-50 ${editId ? 'bg-blue-400 hover:bg-blue-300' : 'bg-theme-primary hover:opacity-90'}`}
                        >
                            {loading ? 'Transmitting...' : success ? <><Check size={16}/> Saved</> : editId ? 'Update Changelog DB' : 'Commit Update to DB'}
                        </button>
                    </form>
                </div>
            </div>

            {/* List Logs */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xs font-bold tracking-widest text-theme-text-muted uppercase mb-2">Existing Logs</h3>
                {logs.length === 0 ? (
                    <div className="p-8 border border-theme-border/20 rounded-2xl bg-[#0a0a0a] text-center text-theme-text-muted text-xs uppercase tracking-widest">No logs found.</div>
                ) : (
                    logs.map(log => (
                        <div key={log._id} className="p-5 rounded-2xl border border-theme-border/30 bg-[#0a0a0a] flex flex-col lg:flex-row lg:items-center justify-between gap-4 group hover:border-theme-primary/30 transition-colors">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-2 py-1 bg-theme-text/10 text-theme-text rounded text-[9px] font-bold uppercase tracking-widest">{log.category}</span>
                                    <span className="text-xs font-bold text-theme-primary">{log.product} <span className="opacity-50">{log.version}</span></span>
                                </div>
                                <h4 className="text-lg font-bold">{log.title}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleEdit(log)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors">
                                    <Edit3 size={16} />
                                </button>
                                <button onClick={() => handleDelete(log._id)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
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
