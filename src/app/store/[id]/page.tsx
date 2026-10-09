"use client";

import React, { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { storeProductsDetails } from '../../../data/storeData';
import StoreDetailDesktopView from '../../../components/desktop/StoreDetailDesktopView';
import StoreDetailMobileView from '../../../components/mobile/StoreDetailMobileView';
import { motion } from 'framer-motion';

import Footer from '../../../components/Footer';

export default function StoreDetailRoute({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [mounted, setMounted] = useState(false);
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    // Find the store product data
    const product = storeProductsDetails[resolvedParams.id];

    useEffect(() => {
        setMounted(true);
        // Clean JS-based fallback detection
        const checkMobile = () => {
            setIsMobileDevice(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!product) {
        return notFound();
    }

    if (!mounted) {
        return (
            <div className="min-h-screen bg-theme-bg flex items-center justify-center">
                <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-12 h-12 rounded-full border-2 border-theme-primary border-t-transparent animate-spin"
                />
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col min-h-screen bg-theme-bg">
            <div className="flex-grow">
                {/* Desktop View - Hidden on mobile, visible on md and up */}
                <div className="hidden md:block">
                    <StoreDetailDesktopView product={product} />
                </div>
                
                {/* Mobile View - Visible on mobile, hidden on md and up */}
                <div className="block md:hidden">
                    <StoreDetailMobileView product={product} />
                </div>
            </div>
            
            <Footer />
        </div>
    );
}
