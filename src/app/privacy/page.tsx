import React from 'react';
import Footer from '../../components/Footer';
import PrivacyDesktopView from '../../components/desktop/PrivacyDesktopView';
import PrivacyMobileView from '../../components/mobile/PrivacyMobileView';

export const metadata = {
    title: 'Privacy Policy - Univora',
    description: 'Privacy Policy for the Univora ecosystem detailing data collection, usage, and security.',
};

const privacyContent = [
    {
        id: 'collection',
        title: '1. Information We Collect',
        content: 'The data we collect depends entirely on how you interact with the Univora ecosystem. For our Telegram Bots, we only collect essential data such as your User ID and basic profile information provided by Telegram (like your display name or profile picture) to manage premium access and track usage statistics. For our web applications, many tools can be used completely anonymously without logging in. When you do choose to create an account, we collect basic details associated with your login method, such as your Name, Email address, and Google account details, allowing you to save your progress. We also collect IP addresses across our platforms for basic security and analytics.'
    },
    {
        id: 'usage',
        title: '2. How We Use Your Data',
        content: 'Your data is strictly used to provide, maintain, and improve the Univora ecosystem. We use your information to authenticate your identity, synchronize your preferences, manage your premium subscriptions, and provide customer support. We firmly believe in data privacy; therefore, we NEVER sell, rent, or trade your personal information to any third-party marketing or data brokering companies.'
    },
    {
        id: 'ecosystem',
        title: '3. Ecosystem Integration & Accounts',
        content: 'Currently, you may encounter separate accounts across different Univora tools. However, our infrastructure is evolving towards a unified Single Sign-On (SSO) experience. In the future, a single Univora account will grant you seamless access across all our websites, apps, and bots, allowing a unified credit system and premium subscription to be shared across the entire ecosystem.'
    },
    {
        id: 'payments',
        title: '4. Payment Processing (Cashfree)',
        content: 'All payment transactions within the Univora ecosystem are securely processed through Cashfree Payments. Univora does NOT process, collect, or store any sensitive payment information, such as your credit card numbers or banking details, on our servers. The only payment-related information we store is your User ID, your active Premium status, and the specific plan you are subscribed to.'
    },
    {
        id: 'cookies',
        title: '5. Cookies and Tracking',
        content: 'We use cookies and similar local storage technologies strictly for functional purposes. Specifically, cookies are used for authentication (keeping you logged in securely) and managing your session state. We do not employ invasive third-party tracking or advertising cookies to monitor your behavior across the internet.'
    },
    {
        id: 'deletion',
        title: '6. Data Retention and Deletion',
        content: 'You have complete control over your data. You may request the permanent deletion of your account and all associated personal data at any time. Upon receiving a valid deletion request, we will purge your information from our active databases, retaining only anonymized analytical data or records legally required for tax and compliance purposes.'
    }
];

export default function PrivacyPage() {
    return (
        <div className="w-full flex flex-col min-h-screen bg-theme-bg">
            <div className="flex-grow">
                {/* Desktop View */}
                <div className="hidden md:block">
                    <PrivacyDesktopView sections={privacyContent} />
                </div>
                
                {/* Mobile View */}
                <div className="block md:hidden">
                    <PrivacyMobileView sections={privacyContent} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
