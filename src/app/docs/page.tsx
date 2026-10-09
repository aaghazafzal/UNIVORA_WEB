import React from 'react';
import DocsDesktopView from '../../components/desktop/DocsDesktopView';
import DocsMobileView from '../../components/mobile/DocsMobileView';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Codex - Univora',
    description: 'The master architecture, API access, and bot commands for the Univora ecosystem.',
};

export default function DocsPage() {
    return (
        <div className="min-h-screen font-sans selection:bg-theme-primary selection:text-black overflow-x-clip text-theme-text bg-theme-bg relative">
            {/* GLOBAL Ethereal Mesh Gradient Background */}
            <div className="fixed inset-0 pointer-events-none flex justify-center items-center opacity-70">
                <div className="w-[1200px] h-[1200px] bg-theme-primary/10 rounded-full blur-[140px] mix-blend-screen" />
            </div>

            <main className="relative z-10">
                {/* Desktop View */}
                <div className="hidden md:block">
                    <DocsDesktopView />
                </div>

                {/* Mobile View */}
                <div className="block md:hidden">
                    <DocsMobileView />
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
