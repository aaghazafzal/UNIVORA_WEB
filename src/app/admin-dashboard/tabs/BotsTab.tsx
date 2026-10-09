"use client";

import React, { useState, useEffect } from 'react';
import { Save, Check, Bot } from 'lucide-react';
import { detailsData } from '../../../data/detailsData';

export default function BotsTab() {
    const bots = detailsData.filter(d => d.type.toLowerCase().includes('bot'));
    
    const [configs, setConfigs] = useState<Record<string, string>>({});
    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
    const [successMap, setSuccessMap] = useState<Record<string, boolean>>({});

    useEffect(() => {
        fetchConfigs();
    }, []);

    const fetchConfigs = async () => {
        try {
            const res = await fetch('/api/admin/config');
            const data = await res.json();
            setConfigs(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleSave = async (botId: string, value: string) => {
        const key = `bot_url_${botId}`;
        setLoadingMap(prev => ({ ...prev, [botId]: true }));
        try {
            const res = await fetch('/api/admin/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value })
            });
            if (res.ok) {
                setSuccessMap(prev => ({ ...prev, [botId]: true }));
                setTimeout(() => setSuccessMap(prev => ({ ...prev, [botId]: false })), 2000);
            }
        } catch (e) {
            console.error(e);
        }
        setLoadingMap(prev => ({ ...prev, [botId]: false }));
    };

    return (
        <div className="flex flex-col gap-10">
            <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Bots Configuration</h2>
                <p className="text-theme-text-muted text-xs tracking-widest uppercase">Manage telegram and discord bot invite links.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bots.map(bot => {
                    const key = `bot_url_${bot.id}`;
                    const currentValue = configs[key] ?? '';

                    return (
                        <div key={bot.id} className="p-6 rounded-2xl border border-theme-border/20 bg-[#0a0a0a] flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-theme-border/20 pb-4">
                                <div className="w-10 h-10 bg-theme-surface/30 rounded flex items-center justify-center">
                                    <Bot size={16} className="text-theme-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold">{bot.name}</h3>
                                    <span className="text-[10px] text-theme-text-muted uppercase tracking-widest font-mono">ID: {bot.id}</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-theme-text-muted uppercase tracking-widest">Invite / Access URL</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text"
                                        placeholder="https://t.me/..."
                                        value={currentValue}
                                        onChange={(e) => setConfigs({ ...configs, [key]: e.target.value })}
                                        className="flex-1 bg-[#111] border border-theme-border/30 rounded-xl px-4 py-3 text-xs outline-none focus:border-theme-primary/50 text-white placeholder:text-white/20"
                                    />
                                    <button 
                                        onClick={() => handleSave(bot.id, currentValue)}
                                        disabled={loadingMap[bot.id]}
                                        className="px-6 py-3 rounded-xl bg-theme-primary text-black font-bold flex items-center justify-center min-w-[80px] hover:opacity-90 disabled:opacity-50"
                                    >
                                        {loadingMap[bot.id] ? <span className="animate-pulse">...</span> : successMap[bot.id] ? <Check size={16} /> : <Save size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
