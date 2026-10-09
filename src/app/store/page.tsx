"use client";

import React from 'react';
import StoreDesktopView from '../../components/desktop/StoreDesktopView';
import StoreMobileView from '../../components/mobile/StoreMobileView';
import Footer from '../../components/Footer';

export default function StorePage() {
    return (
        <>
            <div className="w-full">
                {/* Desktop View - Hidden on mobile, visible on md and up */}
                <div className="hidden md:block">
                    <StoreDesktopView />
                </div>
                
                {/* Mobile View - Visible on mobile, hidden on md and up */}
                <div className="block md:hidden">
                    <StoreMobileView />
                </div>
            </div>
            <Footer />
        </>
    );
}
