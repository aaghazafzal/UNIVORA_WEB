import React from 'react';
import Footer from '../../components/Footer';
import TermsDesktopView from '../../components/desktop/TermsDesktopView';
import TermsMobileView from '../../components/mobile/TermsMobileView';

export const metadata = {
    title: 'Terms of Service - Univora',
    description: 'Terms and conditions for using the Univora ecosystem, apps, and bots.',
};

const termsContent = [
    {
        id: 'intro',
        title: '1. Introduction',
        content: 'Welcome to Univora. These Terms of Service govern your use of the Univora ecosystem, which includes all our proprietary websites, apps, bots, and digital tools. By accessing or using our services, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, please refrain from using the ecosystem.'
    },
    {
        id: 'ecosystem',
        title: '2. The Ecosystem & Individual Policies',
        content: 'Univora operates as a vast and interconnected digital ecosystem. While these general Terms govern the core platform, certain apps or bots within Univora may have their own specific terms or policies. In such cases, you are required to read and adhere to those individual policies when using those specific services.'
    },
    {
        id: 'third-party',
        title: '3. Third-Party Content & Aggregation',
        content: 'Approximately 12% to 15% of the content accessible via Univora (such as certain movies, songs, or external links) is sourced from third parties. Univora acts purely as a search engine and aggregator for this content, scanning the internet to provide results. We do not host, store, or control these third-party files. Accessing or consuming this third-party content is strictly at your own risk. The remaining 85% of the ecosystem consists of our proprietary tools and infrastructure, which is fully secure, managed by us, and completely safe to use.'
    },
    {
        id: 'dmca',
        title: '4. Copyright & Content Takedowns',
        content: 'Because Univora functions as an aggregator—providing thousands of search results dynamically from across the internet—it is technically impossible for us to remove specific hosted content from our servers, as it does not exist on our servers. If you are a copyright owner seeking the removal of content, you must direct your takedown requests to the third-party file hosting services that actually host the files.'
    },
    {
        id: 'billing',
        title: '5. Premium Services & Refund Policy',
        content: 'The vast majority of the Univora ecosystem is available completely free of charge. We offer Premium tiers solely for users who require higher usage limits or advanced enterprise capabilities. Purchasing Premium is strictly optional. Because we provide fully functional free tiers allowing you to evaluate our services before buying, we strictly maintain a NO REFUND POLICY. We highly recommend trying the free versions or starting with the lowest available plan to ensure it meets your needs. If you face any issues, our extensive network of support bots and helpdesk tools is always available to assist you.'
    },
    {
        id: 'termination',
        title: '6. Account Termination & Abuse',
        content: 'We reserve the right to suspend or permanently ban any user account at any time, without prior notice, if we detect abuse of our API, violation of these terms, excessive rate-limiting bypass attempts, or any malicious activity intended to degrade the ecosystem.'
    },
    {
        id: 'law',
        title: '7. Governing Law',
        content: 'These Terms of Service, and any disputes arising out of your use of the Univora ecosystem, shall be governed by and construed strictly in accordance with the laws of India.'
    }
];

export default function TermsPage() {
    return (
        <div className="w-full flex flex-col min-h-screen bg-theme-bg">
            <div className="flex-grow">
                {/* Desktop View */}
                <div className="hidden md:block">
                    <TermsDesktopView sections={termsContent} />
                </div>
                
                {/* Mobile View */}
                <div className="block md:hidden">
                    <TermsMobileView sections={termsContent} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
