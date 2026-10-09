import React from 'react';
import SupportDesktopView from '../../components/desktop/SupportDesktopView';
import SupportMobileView from '../../components/mobile/SupportMobileView';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Support Network - Univora Ecosystem',
    description: 'Get instant community help, report anomalies, or contact the admin directly for the Univora ecosystem.',
};

export default function SupportPage() {
    return (
        <div className="min-h-screen font-sans selection:bg-theme-primary selection:text-black overflow-x-hidden text-theme-text bg-theme-bg relative">
            {/* GLOBAL Ethereal Mesh Gradient Background */}
            <div className="fixed inset-0 pointer-events-none flex justify-center items-center opacity-70">
                <div className="w-[1200px] h-[1200px] bg-theme-primary/10 rounded-full blur-[140px] mix-blend-screen" />
            </div>

            <main className="relative z-10">
                {/* Desktop View */}
                <div className="hidden md:block">
                    <SupportDesktopView />
                </div>

                {/* Mobile View */}
                <div className="block md:hidden">
                    <SupportMobileView />
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
