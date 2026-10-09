"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full relative bg-transparent pt-20 pb-12 md:pb-12 md:pt-32 overflow-hidden">

            {/* ========================================================= */}
            {/* DESKTOP FLUID FOOTER */}
            {/* ========================================================= */}
            <div className="hidden md:block max-w-[1400px] mx-auto px-8 lg:px-20 relative z-10">
                <div className="doppelrand-outer w-full shadow-2xl relative overflow-hidden group">
                    {/* Inner glowing hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-theme-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                    <div className="doppelrand-inner p-16 flex flex-col gap-16 bg-theme-bg/60 backdrop-blur-3xl">
                        
                        {/* Top: Fluid Brand Header */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-full bg-theme-text/5 border border-theme-border/50 flex items-center justify-center shadow-[0_0_40px_rgba(var(--color-primary),0.15)] group-hover:shadow-[0_0_60px_rgba(var(--color-primary),0.3)] transition-all duration-awwwards">
                                    <img src="/logos/png-logos/univora.png" alt="Logo" className="w-8 h-8 logo-adaptive" />
                                </div>
                                <h2 className="text-5xl font-black tracking-tighter text-theme-text drop-shadow-2xl">
                                    UNIVORA
                                </h2>
                            </div>
                            
                            <Link href="/status" className="px-6 py-4 rounded-full bg-theme-bg/80 border border-theme-border/50 flex items-center gap-4 hover:border-theme-primary/50 hover:bg-theme-bg transition-awwwards shadow-lg">
                                <div className="relative flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-theme-primary"></div>
                                    <div className="absolute w-6 h-6 rounded-full border-2 border-theme-primary/30 animate-ping"></div>
                                </div>
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-text">Systems Operational</span>
                            </Link>
                        </div>

                        {/* Middle: Fluid Navigation Columns */}
                        <div className="grid grid-cols-4 gap-12 pt-12 border-t border-theme-border/30">
                            {/* Column 1 */}
                            <div className="flex flex-col gap-6">
                                <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-theme-primary drop-shadow-md">Network</h4>
                                <div className="flex flex-col gap-4">
                                    <Link href="#apps" className="text-theme-text-muted hover:text-theme-text transition-colors text-sm font-medium tracking-wide">Directory</Link>
                                    <Link href="/dev" className="text-theme-text-muted hover:text-theme-text transition-colors text-sm font-medium tracking-wide">Developer</Link>
                                    <Link href="/status" className="text-theme-text-muted hover:text-theme-text transition-colors text-sm font-medium tracking-wide">Status</Link>
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className="flex flex-col gap-6">
                                <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-theme-primary drop-shadow-md">Resources</h4>
                                <div className="flex flex-col gap-4">
                                    <Link href="/docs" className="text-theme-text-muted hover:text-theme-text transition-colors text-sm font-medium tracking-wide">Documentation</Link>
                                    <Link href="/changelog" className="text-theme-text-muted hover:text-theme-text transition-colors text-sm font-medium tracking-wide">Changelog</Link>
                                    <Link href="/brand" className="text-theme-text-muted hover:text-theme-text transition-colors text-sm font-medium tracking-wide">Brand Kit</Link>
                                    <Link href="/support" className="text-theme-text-muted hover:text-theme-text transition-colors text-sm font-medium tracking-wide">Contribute</Link>
                                </div>
                            </div>

                            {/* Column 3 */}
                            <div className="flex flex-col gap-6">
                                <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-theme-primary drop-shadow-md">Connect</h4>
                                <div className="flex flex-col gap-4">
                                    <a href="https://x.com/univora" target="_blank" className="text-theme-text-muted hover:text-theme-text transition-colors text-sm font-medium tracking-wide">Twitter / X</a>
                                    <a href="https://github.com/univora" target="_blank" className="text-theme-text-muted hover:text-theme-text transition-colors text-sm font-medium tracking-wide">GitHub</a>
                                    <a href="https://discord.gg/univora" target="_blank" className="text-theme-text-muted hover:text-theme-text transition-colors text-sm font-medium tracking-wide">Discord</a>
                                </div>
                            </div>

                            {/* Column 4 */}
                            <div className="flex flex-col gap-6">
                                <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-theme-primary drop-shadow-md">Protocol</h4>
                                <div className="flex flex-col gap-4">
                                    <Link href="/privacy" className="text-theme-text-muted hover:text-theme-text transition-colors text-sm font-medium tracking-wide">Privacy Policy</Link>
                                    <Link href="/terms" className="text-theme-text-muted hover:text-theme-text transition-colors text-sm font-medium tracking-wide">Terms of Service</Link>
                                    <Link href="/faq" className="text-theme-text-muted hover:text-theme-text transition-colors text-sm font-medium tracking-wide">FAQ</Link>
                                </div>
                            </div>
                        </div>

                        {/* Bottom: Flowing Copyright */}
                        <div className="pt-8 flex justify-between items-center border-t border-theme-border/10">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-text-muted">
                                &copy; {new Date().getFullYear()} Univora.
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-text opacity-50">
                                Crafted with Fluidity.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* MOBILE FLUID FOOTER */}
            {/* ========================================================= */}
            <div className="flex md:hidden flex-col gap-4 w-full px-6 pb-24 relative z-10">
                
                {/* Main Brand Floating Island */}
                <div className="doppelrand-outer w-full shadow-2xl">
                    <div className="doppelrand-inner p-10 flex flex-col items-center text-center gap-8 bg-theme-bg/60 backdrop-blur-3xl">
                        <div className="w-16 h-16 rounded-full bg-theme-text/5 border border-theme-border/50 flex items-center justify-center shadow-[0_0_40px_rgba(var(--color-primary),0.2)]">
                            <img src="/logos/png-logos/univora.png" alt="Logo" className="w-8 h-8 logo-adaptive" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter text-theme-text drop-shadow-xl">UNIVORA</h2>
                        
                        <Link href="/status" className="px-6 py-3 w-full rounded-full bg-theme-bg/80 border border-theme-border/50 flex items-center justify-center gap-3 active:scale-[0.98] transition-transform">
                            <div className="relative flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-theme-primary"></div>
                                <div className="absolute w-5 h-5 rounded-full border-2 border-theme-primary/30 animate-ping"></div>
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-text">Systems Operational</span>
                        </Link>
                    </div>
                </div>

                {/* Fluid Navigation Grid (Bento Style Cards) */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Net Card */}
                    <div className="doppelrand-outer shadow-xl">
                        <div className="doppelrand-inner p-6 flex flex-col items-center text-center gap-4 bg-theme-bg/50 backdrop-blur-2xl">
                            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-primary">Network</h4>
                            <div className="flex flex-col gap-3">
                                <Link href="#apps" className="text-theme-text-muted text-xs font-medium">Directory</Link>
                                <Link href="/dev" className="text-theme-text-muted text-xs font-medium">Developer</Link>
                                <Link href="/status" className="text-theme-text-muted text-xs font-medium">Status</Link>
                            </div>
                        </div>
                    </div>

                    {/* Res Card */}
                    <div className="doppelrand-outer shadow-xl">
                        <div className="doppelrand-inner p-6 flex flex-col items-center text-center gap-4 bg-theme-bg/50 backdrop-blur-2xl">
                            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-primary">Resources</h4>
                            <div className="flex flex-col gap-3">
                                <Link href="/docs" className="text-theme-text-muted text-xs font-medium">Docs</Link>
                                <Link href="/changelog" className="text-theme-text-muted text-xs font-medium">Changelog</Link>
                                <Link href="/brand" className="text-theme-text-muted text-xs font-medium">Brand Kit</Link>
                                <Link href="/support" className="text-theme-text-muted text-xs font-medium">Contribute</Link>
                            </div>
                        </div>
                    </div>

                    {/* Conn Card */}
                    <div className="doppelrand-outer shadow-xl">
                        <div className="doppelrand-inner p-6 flex flex-col items-center text-center gap-4 bg-theme-bg/50 backdrop-blur-2xl">
                            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-primary">Connect</h4>
                            <div className="flex flex-col gap-3">
                                <a href="https://x.com/univora" className="text-theme-text-muted text-xs font-medium">Twitter / X</a>
                                <a href="https://github.com/univora" className="text-theme-text-muted text-xs font-medium">GitHub</a>
                                <a href="https://discord.gg/univora" className="text-theme-text-muted text-xs font-medium">Discord</a>
                            </div>
                        </div>
                    </div>

                    {/* Legal Card */}
                    <div className="doppelrand-outer shadow-xl">
                        <div className="doppelrand-inner p-6 flex flex-col items-center text-center gap-4 bg-theme-bg/50 backdrop-blur-2xl">
                            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-primary">Legal</h4>
                            <div className="flex flex-col gap-3">
                                <Link href="/privacy" className="text-theme-text-muted text-xs font-medium">Privacy</Link>
                                <Link href="/terms" className="text-theme-text-muted text-xs font-medium">Terms</Link>
                                <Link href="/faq" className="text-theme-text-muted text-xs font-medium">FAQ</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Copyright Pill */}
                <div className="doppelrand-outer w-full mt-2 shadow-lg">
                    <div className="doppelrand-inner py-6 flex justify-center text-center bg-theme-bg/40 backdrop-blur-xl">
                        <span className="text-[10px] text-theme-text-muted font-bold tracking-[0.2em] uppercase">&copy; {new Date().getFullYear()} Univora.</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
