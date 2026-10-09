import React from 'react';
import DonateDesktopView from '../../components/desktop/DonateDesktopView';
import DonateMobileView from '../../components/mobile/DonateMobileView';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Fuel the Ecosystem - Univora',
    description: 'Support the infrastructure that powers the Univora network. Transparent cost allocation and global support options.',
};

export default function DonatePage() {
    return (
        <div className="min-h-screen font-sans selection:bg-theme-primary selection:text-black overflow-x-hidden text-theme-text bg-theme-bg relative">
            {/* GLOBAL Ethereal Mesh Gradient Background */}
            <div className="fixed inset-0 pointer-events-none flex justify-center items-center opacity-70">
                <div className="w-[1200px] h-[1200px] bg-theme-primary/10 rounded-full blur-[140px] mix-blend-screen" />
            </div>

            <main className="relative z-10">
                {/* Desktop View */}
                <div className="hidden md:block">
                    <DonateDesktopView />
                </div>

                {/* Mobile View */}
                <div className="block md:hidden">
                    <DonateMobileView />
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
