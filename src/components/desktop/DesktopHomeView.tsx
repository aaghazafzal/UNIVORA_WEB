import React from 'react';
import HeroDesktop from './HeroDesktop';
import EcosystemDesktop from './EcosystemDesktop';
import IntegrationsDesktop from './IntegrationsDesktop';
import MetricsDesktop from './MetricsDesktop';
import SupportSection from '../SupportSection';
import Footer from '../Footer';

export default function DesktopHomeView() {
    return (
        <div className="min-h-screen font-sans selection:bg-theme-primary selection:text-black overflow-x-hidden text-theme-text bg-theme-bg relative">
            
            {/* GLOBAL Ethereal Mesh Gradient Background */}
            <div className="fixed inset-0 pointer-events-none flex justify-center items-center opacity-70">
                <div className="w-[1200px] h-[1200px] bg-theme-primary/10 rounded-full blur-[140px] mix-blend-screen" />
            </div>

            <main className="relative z-10 pt-8 md:pt-16">
                <HeroDesktop />
                <EcosystemDesktop />
                <IntegrationsDesktop />
                <MetricsDesktop />
                <SupportSection />
                <Footer />
            </main>
        </div>
    );
}
