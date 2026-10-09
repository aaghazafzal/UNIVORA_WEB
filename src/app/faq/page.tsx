import React from 'react';
import Footer from '../../components/Footer';
import FaqDesktopView from '../../components/desktop/FaqDesktopView';
import FaqMobileView from '../../components/mobile/FaqMobileView';

export const metadata = {
    title: 'FAQ - Univora Ecosystem',
    description: 'Frequently Asked Questions about the Univora ecosystem, apps, bots, and billing.',
};

const faqCategories = [
    { id: 'general', name: 'General Information' },
    { id: 'ecosystem', name: 'Ecosystem & Apps' },
    { id: 'developers', name: 'Developers & API' },
    { id: 'billing', name: 'Billing & Premium' }
];

const faqs = [
    // General
    { id: 'g1', category: 'general', question: 'What is Univora?', answer: 'Univora is an interconnected digital ecosystem. Instead of a single tool, it is a growing collection of useful apps, intelligent bots, and developer tools designed to solve practical problems effectively.' },
    { id: 'g2', category: 'general', question: 'Is Univora free to use?', answer: 'Many of the basic tools and bots in the Univora ecosystem are completely free to use. However, advanced features, higher usage limits, and certain specialized apps require a Premium subscription.' },
    { id: 'g3', category: 'general', question: 'How do I create an account?', answer: 'Univora uses a unified account system. You can sign up using your email or Google account from the main hub. This single account gives you seamless access across all Univora apps and bots.' },
    { id: 'g4', category: 'general', question: 'What is the "Vault/Armory" aesthetic?', answer: 'Our design philosophy is centered around a mechanical, premium, and highly structured aesthetic we call the "Vault/Armory". It uses doppelrand (double-border) containers, monospace typography, and cinematic gradients to feel like high-end software.' },
    
    // Ecosystem
    { id: 'e1', category: 'ecosystem', question: 'Do apps share data with each other?', answer: 'Yes, one of the main advantages of the Univora ecosystem is interoperability. Apps can share structured data securely if you grant them permission, allowing for connected and automated workflows.' },
    { id: 'e2', category: 'ecosystem', question: 'How do I install a Telegram Bot?', answer: 'Navigate to the Bots section, select the bot you need, and click "Launch". You will be redirected to Telegram. Just press "Start" to begin interacting with the bot. Your Univora account will be linked automatically.' },
    { id: 'e3', category: 'ecosystem', question: 'Are there desktop applications available?', answer: 'Currently, Univora apps are predominantly web-based or accessible via Telegram. We are exploring native desktop applications for specific heavy-workload tools in the future.' },
    
    // Developers
    { id: 'd1', category: 'developers', question: 'Can I build my own apps for Univora?', answer: 'Currently, the Univora ecosystem is developed and managed internally to maintain strict quality and design standards. However, we plan to open a developer SDK in the future for verified third-party integrations.' },
    { id: 'd2', category: 'developers', question: 'Is there a public API available?', answer: 'Premium users have access to specific API endpoints for automation and data extraction (e.g., via Extract-X). Full documentation is available in the Developer Hub.' },
    { id: 'd3', category: 'developers', question: 'Do you offer Webhooks?', answer: 'Yes, several of our automation tools and payment systems support local webhook endpoints to trigger instant actions upon specific events.' },
    
    // Billing
    { id: 'b1', category: 'billing', question: 'How does Premium billing work?', answer: 'Univora Premium is a unified subscription. Upgrading once grants you premium benefits, higher rate limits, and exclusive features across all apps and bots in the entire ecosystem.' },
    { id: 'b2', category: 'billing', question: 'What payment methods do you accept?', answer: 'We process payments securely via Stripe and accept all major credit cards, Apple Pay, and Google Pay.' },
    { id: 'b3', category: 'billing', question: 'Can I get a refund?', answer: 'Yes, we offer a 7-day money-back guarantee if you are not satisfied with the premium features. Simply contact our support team via the Support section to process your refund.' }
];

export default function FaqPage() {
    return (
        <div className="w-full flex flex-col min-h-screen bg-theme-bg">
            <div className="flex-grow">
                {/* Desktop View */}
                <div className="hidden md:block">
                    <FaqDesktopView categories={faqCategories} faqs={faqs} />
                </div>
                
                {/* Mobile View */}
                <div className="block md:hidden">
                    <FaqMobileView categories={faqCategories} faqs={faqs} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
