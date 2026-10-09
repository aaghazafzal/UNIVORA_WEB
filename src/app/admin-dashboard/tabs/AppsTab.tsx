"use client";

import React, { useState, useEffect } from 'react';
import { Save, Check, LayoutGrid } from 'lucide-react';
import { detailsData } from '../../../data/detailsData';

export default function AppsTab() {
    const apps = detailsData.filter(d => ['App', 'Website', 'Platform'].includes(d.type));
    
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

    const handleSave = async (appId: string, value: string) => {
        const key = `app_url_${appId}`;
        setLoadingMap(prev => ({ ...prev, [appId]: true }));
        try {
            const res = await fetch('/api/admin/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value })
            });
            if (res.ok) {
                setSuccessMap(prev => ({ ...prev, [appId]: true }));
                setTimeout(() => setSuccessMap(prev => ({ ...prev, [appId]: false })), 2000);
            }
        } catch (e) {
            console.error(e);
        }
        setLoadingMap(prev => ({ ...prev, [appId]: false }));
    };

    return (
        <div className="flex flex-col gap-10">
            <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Apps Configuration</h2>
                <p className="text-theme-text-muted text-xs tracking-widest uppercase">Manage dynamic endpoints and download URLs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {apps.map(app => {
                    const key = `app_url_${app.id}`;
                    // The value is either the overridden config value OR the fallback static value (if one exists).
                    // In detailsData, some apps might not have a URL yet, or it might be '#'.
                    const currentValue = configs[key] ?? '';

                    return (
                        <div key={app.id} className="p-6 rounded-2xl border border-theme-border/20 bg-[#0a0a0a] flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-theme-border/20 pb-4">
                                <div className="w-10 h-10 bg-theme-surface/30 rounded flex items-center justify-center">
                                    <LayoutGrid size={16} className="text-theme-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold">{app.name}</h3>
                                    <span className="text-[10px] text-theme-text-muted uppercase tracking-widest font-mono">ID: {app.id}</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-theme-text-muted uppercase tracking-widest">Access / Download URL</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text"
                                        placeholder="https://..."
                                        value={currentValue}
                                        onChange={(e) => setConfigs({ ...configs, [key]: e.target.value })}
                                        className="flex-1 bg-[#111] border border-theme-border/30 rounded-xl px-4 py-3 text-xs outline-none focus:border-theme-primary/50 text-white placeholder:text-white/20"
                                    />
                                    <button 
                                        onClick={() => handleSave(app.id, currentValue)}
                                        disabled={loadingMap[app.id]}
                                        className="px-6 py-3 rounded-xl bg-theme-primary text-black font-bold flex items-center justify-center min-w-[80px] hover:opacity-90 disabled:opacity-50"
                                    >
                                        {loadingMap[app.id] ? <span className="animate-pulse">...</span> : successMap[app.id] ? <Check size={16} /> : <Save size={16} />}
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
