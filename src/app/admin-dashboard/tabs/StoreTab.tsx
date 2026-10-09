"use client";

import React, { useState, useEffect } from 'react';
import { Save, Check, ShoppingCart } from 'lucide-react';
import { storeProductsDetails } from '../../../data/storeData';

export default function StoreTab() {
    const items = Object.values(storeProductsDetails);
    
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

    const handleSave = async (itemId: string, type: 'price' | 'original_price' | 'url', value: string) => {
        const key = `store_${type}_${itemId}`;
        const mapKey = `${itemId}_${type}`;
        
        setLoadingMap(prev => ({ ...prev, [mapKey]: true }));
        try {
            const res = await fetch('/api/admin/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value })
            });
            if (res.ok) {
                setSuccessMap(prev => ({ ...prev, [mapKey]: true }));
                setTimeout(() => setSuccessMap(prev => ({ ...prev, [mapKey]: false })), 2000);
            }
        } catch (e) {
            console.error(e);
        }
        setLoadingMap(prev => ({ ...prev, [mapKey]: false }));
    };

    return (
        <div className="flex flex-col gap-10">
            <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Store Configuration</h2>
                <p className="text-theme-text-muted text-xs tracking-widest uppercase">Manage pricing and contact endpoints for premium solutions.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {items.map(item => {
                    const urlKey = `store_url_${item.id}`;
                    const currentUrl = configs[urlKey] ?? '';

                    return (
                        <div key={item.id} className="p-6 rounded-2xl border border-theme-border/20 bg-[#0a0a0a] flex flex-col gap-6">
                            <div className="flex items-center gap-3 border-b border-theme-border/20 pb-4">
                                <div className="w-10 h-10 bg-theme-surface/30 rounded flex items-center justify-center">
                                    <ShoppingCart size={16} className="text-theme-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold">{item.name}</h3>
                                    <span className="text-[10px] text-theme-text-muted uppercase tracking-widest font-mono">ID: {item.id}</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4">
                                {/* Price Overrides (Handle multiple plans if they exist) */}
                                {item.plans && item.plans.length > 0 ? (
                                    <div className="flex flex-col gap-4">
                                        <label className="text-[10px] font-bold text-theme-primary uppercase tracking-widest border-b border-theme-primary/20 pb-1">Pricing Plans</label>
                                        {item.plans.map((plan: any) => {
                                            const planPriceKey = `store_price_${item.id}_${plan.id}`;
                                            const planOriginalPriceKey = `store_original_price_${item.id}_${plan.id}`;
                                            const currentPlanPrice = configs[planPriceKey] ?? plan.price;
                                            const currentPlanOriginalPrice = configs[planOriginalPriceKey] ?? '';
                                            return (
                                                <div key={plan.id} className="flex flex-col gap-2 p-4 border border-theme-border/20 rounded-xl bg-theme-bg/50">
                                                    <label className="text-[10px] font-bold text-theme-text-muted uppercase tracking-widest flex justify-between">
                                                        <span>{plan.name}</span>
                                                        <span className="text-theme-text/50">Default: {plan.price}</span>
                                                    </label>
                                                    <div className="flex flex-col xl:flex-row gap-2">
                                                        <input 
                                                            type="text"
                                                            placeholder="Strikethrough (e.g. ₹5,999)"
                                                            value={currentPlanOriginalPrice}
                                                            onChange={(e) => setConfigs({ ...configs, [planOriginalPriceKey]: e.target.value })}
                                                            className="flex-1 bg-[#111] border border-theme-border/30 rounded-xl px-4 py-3 text-xs outline-none focus:border-theme-primary/50 text-white placeholder:text-white/20"
                                                        />
                                                        <input 
                                                            type="text"
                                                            placeholder="Final Price (e.g. ₹3,999)"
                                                            value={currentPlanPrice}
                                                            onChange={(e) => setConfigs({ ...configs, [planPriceKey]: e.target.value })}
                                                            className="flex-1 bg-[#111] border border-theme-border/30 rounded-xl px-4 py-3 text-xs outline-none focus:border-theme-primary/50 text-white placeholder:text-white/20"
                                                        />
                                                        <button 
                                                            onClick={() => {
                                                                handleSave(`${item.id}_${plan.id}`, 'price', currentPlanPrice);
                                                                handleSave(`${item.id}_${plan.id}`, 'original_price', currentPlanOriginalPrice);
                                                            }}
                                                            disabled={loadingMap[`${item.id}_${plan.id}_price`]}
                                                            className="px-6 py-3 rounded-xl bg-theme-primary text-black font-bold flex items-center justify-center min-w-[80px] hover:opacity-90 disabled:opacity-50"
                                                        >
                                                            {loadingMap[`${item.id}_${plan.id}_price`] ? <span className="animate-pulse">...</span> : successMap[`${item.id}_${plan.id}_price`] ? <Check size={16} /> : <Save size={16} />}
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2 p-4 border border-theme-border/20 rounded-xl bg-theme-bg/50">
                                        <label className="text-[10px] font-bold text-theme-text-muted uppercase tracking-widest flex justify-between">
                                            <span>Display Price</span>
                                            <span className="text-theme-text/50">Default: {item.price}</span>
                                        </label>
                                        <div className="flex flex-col xl:flex-row gap-2">
                                            <input 
                                                type="text"
                                                placeholder="Strikethrough (e.g. $299)"
                                                value={configs[`store_original_price_${item.id}`] ?? ''}
                                                onChange={(e) => setConfigs({ ...configs, [`store_original_price_${item.id}`]: e.target.value })}
                                                className="flex-1 bg-[#111] border border-theme-border/30 rounded-xl px-4 py-3 text-xs outline-none focus:border-theme-primary/50 text-white placeholder:text-white/20"
                                            />
                                            <input 
                                                type="text"
                                                placeholder="Final Price (e.g. $199)"
                                                value={configs[`store_price_${item.id}`] ?? item.price}
                                                onChange={(e) => setConfigs({ ...configs, [`store_price_${item.id}`]: e.target.value })}
                                                className="flex-1 bg-[#111] border border-theme-border/30 rounded-xl px-4 py-3 text-xs outline-none focus:border-theme-primary/50 text-white placeholder:text-white/20"
                                            />
                                            <button 
                                                onClick={() => {
                                                    handleSave(item.id, 'price', configs[`store_price_${item.id}`] ?? item.price);
                                                    handleSave(item.id, 'original_price', configs[`store_original_price_${item.id}`] ?? '');
                                                }}
                                                disabled={loadingMap[`${item.id}_price`]}
                                                className="px-6 py-3 rounded-xl bg-theme-primary text-black font-bold flex items-center justify-center min-w-[80px] hover:opacity-90 disabled:opacity-50"
                                            >
                                                {loadingMap[`${item.id}_price`] ? <span className="animate-pulse">...</span> : successMap[`${item.id}_price`] ? <Check size={16} /> : <Save size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* URL Override */}
                                <div className="flex flex-col gap-2 mt-2">
                                    <label className="text-[10px] font-bold text-theme-text-muted uppercase tracking-widest">Buy / Contact URL</label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="text"
                                            placeholder="https://t.me/..."
                                            value={currentUrl}
                                            onChange={(e) => setConfigs({ ...configs, [urlKey]: e.target.value })}
                                            className="flex-1 bg-[#111] border border-theme-border/30 rounded-xl px-4 py-3 text-xs outline-none focus:border-theme-primary/50 text-white placeholder:text-white/20"
                                        />
                                        <button 
                                            onClick={() => handleSave(item.id, 'url', currentUrl)}
                                            disabled={loadingMap[`${item.id}_url`]}
                                            className="px-6 py-3 rounded-xl bg-theme-primary text-black font-bold flex items-center justify-center min-w-[80px] hover:opacity-90 disabled:opacity-50"
                                        >
                                            {loadingMap[`${item.id}_url`] ? <span className="animate-pulse">...</span> : successMap[`${item.id}_url`] ? <Check size={16} /> : <Save size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
