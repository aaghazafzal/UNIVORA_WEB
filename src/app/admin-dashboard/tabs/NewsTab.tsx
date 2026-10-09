"use client";

import React from 'react';
import { Newspaper } from 'lucide-react';

export default function NewsTab() {
    return (
        <div className="flex flex-col gap-10 w-full h-full min-h-[50vh] items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-theme-primary/10 border border-theme-primary/30 flex items-center justify-center mb-4">
                <Newspaper size={40} className="text-theme-primary opacity-50" />
            </div>
            <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">News Module</h2>
                <p className="text-theme-text-muted text-xs tracking-widest uppercase mb-8">This module is currently offline. Pending deployment.</p>
                <div className="px-6 py-3 rounded-full border border-theme-primary/30 text-theme-primary text-[10px] font-bold tracking-[0.3em] uppercase inline-block">
                    Coming Soon
                </div>
            </div>
        </div>
    );
}
