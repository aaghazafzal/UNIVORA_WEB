import React from 'react';
import Footer from '../../components/Footer';
import BrandDesktopView from '../../components/desktop/BrandDesktopView';
import BrandMobileView from '../../components/mobile/BrandMobileView';

export const metadata = {
    title: 'Brand Guidelines - Univora',
    description: 'Official brand assets, typography, color palettes, and design philosophy of the Univora ecosystem.',
};

export default function BrandPage() {
    return (
        <div className="w-full flex flex-col min-h-screen bg-theme-bg">
            <div className="flex-grow">
                {/* Desktop View */}
                <div className="hidden md:block">
                    <BrandDesktopView />
                </div>
                
                {/* Mobile View */}
                <div className="block md:hidden">
                    <BrandMobileView />
                </div>
            </div>
            <Footer />
        </div>
    );
}
