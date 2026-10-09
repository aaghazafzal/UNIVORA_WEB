import React from 'react';
import HeroMobile from './HeroMobile';
import EcosystemMobile from './EcosystemMobile';
import IntegrationsMobile from './IntegrationsMobile';
import MetricsMobile from './MetricsMobile';
import SupportSection from '../SupportSection';
import Footer from '../Footer';

export default function MobileHomeView() {
    return (
        <div className="min-h-screen font-sans selection:bg-theme-primary selection:text-black overflow-x-hidden text-theme-text bg-theme-bg relative">
            
            {/* GLOBAL Ethereal Mesh Gradient Background */}
            <div className="fixed inset-0 pointer-events-none flex justify-center items-center opacity-70">
                <div className="w-[600px] h-[600px] bg-theme-primary/15 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <main className="relative z-10 pt-8">
                <HeroMobile />
                <EcosystemMobile />
                <IntegrationsMobile />
                <MetricsMobile />
                <SupportSection />
                <Footer />
            </main>
        </div>
    );
}
