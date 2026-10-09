import { Database, GraduationCap, Users, Send, MessagesSquare, RefreshCw, HardDrive, LayoutList, Server, Zap, Shield } from 'lucide-react';

export const storeProductsDetails: Record<string, any> = {
    'telegram-media-database': {
        id: 'telegram-media-database',
        name: 'Ultimate Media Database',
        type: 'Enterprise Data Array',
        tagline: '10M+ Files • Multi-Language • Multi-Quality',
        description: 'Launch your own massive Telegram media empire instantly. Access our massive distributed database across multiple channels containing Movies, Series, Anime, Dramas, and Cartoons.',
        icon: Database,
        imageIcon: '/images/laptop_mockup.png', // Fallback/Placeholder
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        features: [
            '10M+ Media Files across multiple channels',
            'Multi-Quality (480p, 720p, 1080p, 4K)',
            'Multi-Language (English, Hindi, Tamil, Telugu, Spanish, etc.)',
            'Multiple Subtitles Included',
            'Free Basic Setup Guide included for all plans'
        ],
        metrics: [
            { label: 'Total Volume', value: '16TB+' },
            { label: 'Uptime', value: '99.9%' },
            { label: 'Auto-Bots', value: 'Included' }
        ],
        plans: [
            {
                id: 'basic',
                name: 'Basic Access',
                price: '₹3,999',
                icon: Database,
                color: 'text-blue-400',
                bg: 'bg-blue-500/10',
                border: 'border-blue-500/30',
                popular: false,
                features: [
                    'Access to 10M+ Database Channels',
                    'Free Setup Guide provided',
                    'Use your own forwarder bots',
                    'Manual updating required'
                ]
            },
            {
                id: 'pro',
                name: 'Pro Forwarder',
                price: '₹5,999',
                icon: Send,
                color: 'text-purple-400',
                bg: 'bg-purple-500/10',
                border: 'border-purple-500/30',
                popular: true,
                features: [
                    'Everything in Basic',
                    'Premium Forward Bot Access',
                    'Parallel Task Support (Super Fast)',
                    'Forward from multiple channels simultaneously without limits'
                ]
            },
            {
                id: 'elite',
                name: 'Elite Filter',
                price: '₹8,999',
                icon: MessagesSquare,
                color: 'text-orange-400',
                bg: 'bg-orange-500/10',
                border: 'border-orange-500/30',
                popular: false,
                features: [
                    'Everything in Pro',
                    'Filter Bot Source Code provided',
                    'Full Setup Guide for Filter Bot',
                    'Users can search media directly in your groups'
                ]
            },
            {
                id: 'ultimate',
                name: 'Ultimate Auto-Sync',
                price: '₹14,999',
                icon: RefreshCw,
                color: 'text-green-400',
                bg: 'bg-green-500/10',
                border: 'border-green-500/30',
                popular: false,
                features: [
                    'Everything in Elite',
                    'Auto-Sync Bot Integration',
                    'New Movies/Series auto-updated to your channels',
                    'Fully automated zero-maintenance empire'
                ]
            }
        ]
    },
    'premium-courses-database': {
        id: 'premium-courses-database',
        name: 'Premium Courses Database',
        type: 'Educational Matrix',
        tagline: '50+ Ready Channels • Demos Available',
        description: 'Get access to premium paid and free courses. Buy the whole collection or individual courses. If you want details and demos for all courses, please join our Course Channel.',
        icon: GraduationCap,
        imageIcon: '/images/laptop_mockup.png', // Fallback/Placeholder
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        layout: 'list',
        features: [
            '50+ Ready Telegram Channels',
            'Demos available for every course',
            'Many free courses included',
            'Buy individual courses or full bundles'
        ],
        metrics: [
            { label: 'Channels', value: '50+' },
            { label: 'Delivery', value: 'Instant' },
            { label: 'Updates', value: 'Lifetime' }
        ],
        plans: [
            { id: 'course-1', name: 'SIGMA 9.0 (Apna College)', price: 299 },
            { id: 'course-2', name: 'DSA C++ (Apna College)', price: 299 },
            { id: 'course-3', name: 'Data Science Master', price: 299 },
            { id: 'course-4', name: 'Full Stack Data Science (Prakash)', price: 299 },
            { id: 'course-5', name: 'Video Editing Course (Tarun)', price: 199 }
        ]
    },
    'contact-lookup-database': {
        id: 'contact-lookup-database',
        name: 'OSINT Contact Database',
        type: 'Intelligence Lookup',
        tagline: '250GB+ • CSV Format • Multi-Parameter Lookup',
        description: 'Comprehensive OSINT CSV database for data lookup. Find details via Phone numbers, Aadhaar, or Telegram Usernames. Requires 250GB free Google Drive space.',
        icon: Users,
        imageIcon: '/images/laptop_mockup.png', // Fallback/Placeholder
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        features: [
            'Search via Mobile Numbers',
            'Search via Aadhaar Details',
            'Search via Telegram Usernames',
            'Massive 250GB+ CSV Dataset',
            'Provided directly to your Google Drive'
        ],
        metrics: [
            { label: 'Storage Reqd.', value: '250GB' },
            { label: 'Format', value: 'CSV Raw' },
            { label: 'Lookup Speed', value: '<200ms' }
        ],
        plans: [
            {
                id: 'full-database',
                name: 'Full Database Access',
                price: '₹9,999',
                icon: HardDrive,
                color: 'text-red-400',
                bg: 'bg-red-500/10',
                border: 'border-red-500/30',
                popular: true,
                features: [
                    'Complete 250GB+ Dataset',
                    'Mobile, Aadhaar & TG lookups',
                    'Direct Google Drive Transfer',
                    'STRICT REQUIREMENT: You MUST have a Gmail account with at least 250GB free space.'
                ]
            }
        ]
    }
};
