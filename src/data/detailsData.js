import {
    Play, Music, BookOpen, GraduationCap,
    Link, Film, Share2, Forward, Unlock,
    MousePointerClick, HardDriveDownload, Search,
    Zap, Download, Lock, Shield, Eye, Database, Code, Globe, Server,
    Smartphone, Bot, Command, Activity, Users, Settings, Filter, Cloud, MessageSquare, List, BarChart, HardDrive, Layout, Key, Image, FileBox, Waves, Sliders, MicOff, Headphones, CloudOff, AudioLines, Timer, Coffee, Moon
} from 'lucide-react';

export const detailsData = [
    // --- APPS & PLATFORMS ---
    {
        id: 'cinemahub-app',
        name: 'Cinemahub',
        type: 'App',
        tagline: 'The Ultimate Streaming Nexus',
        description: 'Advanced mobile application for streaming movies, series, cartoons, anime, and dramas. Engineered for zero-latency, high-bitrate playback across global networks.',
        icon: Play,
        imageIcon: '/logos/png-logos/cinemahub-app-website.png',
        heroImage: '', // Added placeholder for user
        color: '#ef4444',
        link: '#',
        stats: [
            { label: 'Titles Indexed', value: '54.2k' },
            { label: 'Stream Quality', value: '4K HDR' },
            { label: 'Uptime', value: '99.99%' },
            { label: 'Downloads', value: '1M+' }
        ],
        features: [
            { title: 'Adaptive Bitrate Engine', description: 'Automatically adjusts stream quality based on network conditions ensuring zero buffering.', icon: Activity },
            { title: 'Offline Download Mode', description: 'Download full movies and seasons locally for uninterrupted offline viewing.', icon: Download },
            { title: 'Anonymous Viewing Port', description: 'Integrated VPN-like routing to keep your watching habits completely private.', icon: Shield },
            { title: 'Custom Subtitle Injection', description: 'Load external subtitles or auto-fetch accurate multi-language subs on the fly.', icon: MessageSquare }
        ],
        techSpecs: ['React Native', 'Node.js', 'HLS/DASH', 'Edge CDN'],
        laptopScreenshots: [],
        mobileScreenshots: []
    },
    {
        id: 'cinemahub-web',
        name: 'Cinemahub',
        type: 'Website',
        tagline: 'Cross-Platform Entertainment',
        description: 'The web version of Cinemahub. Access the entire global library of media from any device with a browser, seamlessly synced with your mobile account.',
        icon: Play,
        imageIcon: '/logos/png-logos/cinemahub-app-website.png',
        heroImage: '',
        color: '#ef4444',
        link: 'https://cinemahub8.vercel.app',
        stats: [
            { label: 'Active Nodes', value: '12.4k' },
            { label: 'Latency', value: '24ms' },
            { label: 'Uptime', value: '99.99%' },
            { label: 'Buffering', value: '0%' }
        ],
        features: [
            { title: 'Cross-Platform Sync', description: 'Start watching on your phone and seamlessly resume on your desktop browser.', icon: Cloud },
            { title: 'WebRTC Streaming', description: 'Ultra-low latency streaming protocol for real-time synchronized watch parties.', icon: Zap },
            { title: 'Theater Mode', description: 'Immersive dark UI that dims the rest of the page for an authentic cinema feel.', icon: Layout },
            { title: 'Hardware Acceleration', description: 'Utilizes GPU decoding for smooth 4K playback without draining your battery.', icon: Activity }
        ],
        techSpecs: ['React', 'Next.js', 'WebSocket', 'AWS CloudFront'],
        laptopScreenshots: [],
        mobileScreenshots: []
    },
    {
        id: 'wave-craft',
        name: 'Wave Craft',
        type: 'Website',
        tagline: 'Browser-Based Audio Studio',
        description: 'A free, powerful mini music studio for creators. Access professional-grade audio editing, effects, and conversion tools directly from your browser without installing any heavy software.',
        icon: Waves,
        imageIcon: '/logos/png-logos/wavecraft.png',
        heroImage: '',
        color: '#A020F0',
        link: 'https://wave-craft.vercel.app',
        stats: [
            { label: 'Audio Tools', value: '20+' },
            { label: 'Presets', value: '15+' },
            { label: 'Processing', value: 'Local' },
            { label: 'Latency', value: 'Ultra-low' }
        ],
        features: [
            { title: 'Vocal Remover', description: 'Isolate vocals or extract pure instrumental tracks from any song using advanced phase cancellation algorithms.', icon: MicOff },
            { title: '3D Spatial Audio', description: 'Enhance your stereo sound and create immersive 8D audio experiences that move around your head.', icon: Headphones },
            { title: 'Parametric Equalizer', description: 'Fine-tune frequencies, boost heavy bass, and perfect your audio mix with an intuitive visual EQ.', icon: Sliders },
            { title: 'Client-Side Processing', description: 'All audio manipulation happens directly in your browser. No files are ever uploaded to a server for maximum privacy.', icon: Lock }
        ],
        techSpecs: ['React', 'Next.js', 'Web Audio API', 'lamejs'],
        laptopScreenshots: [
            '/screenshots/wavecraft/laptop/1.png',
            '/screenshots/wavecraft/laptop/2.png',
            '/screenshots/wavecraft/laptop/3.png',
            '/screenshots/wavecraft/laptop/4.png',
            '/screenshots/wavecraft/laptop/5.png'
        ],
        mobileScreenshots: [
            '/screenshots/wavecraft/mobile/1.jpg',
            '/screenshots/wavecraft/mobile/2.jpg',
            '/screenshots/wavecraft/mobile/3.jpg',
            '/screenshots/wavecraft/mobile/4.jpg',
            '/screenshots/wavecraft/mobile/5.jpg'
        ]
    },
    {
        id: 'sharebridge',
        name: 'ShareBridge',
        type: 'Website',
        tagline: 'Peer-to-Peer Data Nexus',
        description: 'A lightning-fast, decentralized file sharing and communication bridge. Transfer unlimited files and messages directly between devices using secure P2P connections without relying on cloud storage.',
        icon: Share2,
        imageIcon: '/logos/png-logos/sharebridge.png',
        heroImage: '',
        color: '#00d4ff',
        link: 'https://sharebridge.vercel.app',
        stats: [
            { label: 'File Size Limit', value: 'Unlimited' },
            { label: 'Data Stored', value: '0 Bytes' },
            { label: 'Transfer Tech', value: 'WebRTC' },
            { label: 'Encryption', value: 'E2EE' }
        ],
        features: [
            { title: 'Serverless Transfers', description: 'Files travel directly from your device to the recipient via WebRTC. Nothing is ever saved or cached on any server.', icon: CloudOff },
            { title: 'Cross-Device Rooms', description: 'Create secure rooms with a simple join code to share files and messages seamlessly between your phone, tablet, and PC.', icon: Smartphone },
            { title: 'Lightning Speed', description: 'Transfers utilize your maximum local network bandwidth when devices are on the same WiFi, bypassing ISP limits.', icon: Zap },
            { title: 'Zero Friction', description: 'No accounts, no logins, no app downloads required. Just open the bridge and start sending instantly.', icon: Unlock }
        ],
        techSpecs: ['React', 'Next.js', 'PeerJS', 'WebRTC'],
        laptopScreenshots: [
            '/screenshots/sharebridge/laptop/1.png',
            '/screenshots/sharebridge/laptop/2.png',
            '/screenshots/sharebridge/laptop/3.png',
            '/screenshots/sharebridge/laptop/4.png',
            '/screenshots/sharebridge/laptop/5.png'
        ],
        mobileScreenshots: [
            '/screenshots/sharebridge/mobile/1.jpg',
            '/screenshots/sharebridge/mobile/2.jpg',
            '/screenshots/sharebridge/mobile/3.jpg',
            '/screenshots/sharebridge/mobile/4.jpg',
            '/screenshots/sharebridge/mobile/5.jpg'
        ]
    },
    {
        id: 'focus-sound',
        name: 'Focus Sound',
        type: 'Website',
        tagline: 'Immersive Productivity Ambiance',
        description: 'A cinematic ambient sound mixer designed to enhance deep focus and productivity. Combine atmospheric audio streams with animated visuals to create your perfect workflow environment.',
        icon: AudioLines,
        imageIcon: '/logos/png-logos/focus-sound.png',
        heroImage: '',
        color: '#f59e0b',
        link: 'https://focussound.vercel.app',
        stats: [
            { label: 'Audio Tracks', value: '40+' },
            { label: 'Visual Scenes', value: 'Cinematic' },
            { label: 'Focus Modes', value: 'Pomodoro' },
            { label: 'Offline Ready', value: 'Yes' }
        ],
        features: [
            { title: 'Interactive Audio Mixer', description: 'Blend multiple high-quality environmental sounds like rain, café chatter, and deep space into a custom soundscape.', icon: Sliders },
            { title: 'Cinematic Environments', description: 'Engage your peripheral vision with beautifully animated, GPU-accelerated visual elements like embers, auroras, and snow.', icon: Coffee },
            { title: 'Productivity Timers', description: 'Built-in Pomodoro timers to structure your workflow, perfectly synchronized with your custom ambient mix.', icon: Timer },
            { title: 'Focus Modes', description: 'Switch between minimal, zen, and normal layouts to reduce distractions and keep you in the flow state.', icon: Moon }
        ],
        techSpecs: ['React', 'Vite', 'Framer Motion', 'Web Audio'],
        laptopScreenshots: [],
        mobileScreenshots: []
    },
    {
        id: 'groovia-app',
        name: 'Groovia',
        type: 'App',
        tagline: 'Sonic Architecture Redefined',
        description: 'Premium mobile music application. Stream and download high-fidelity audio bypassing traditional ad-networks for pure, uninterrupted sound.',
        icon: Music,
        imageIcon: '/logos/png-logos/groovia-app-website.png',
        heroImage: '',
        color: '#a855f7',
        link: '#',
        stats: [
            { label: 'Library', value: '45M+' },
            { label: 'Audio Quality', value: 'Lossless' },
            { label: 'Downloads', value: '500k+' },
            { label: 'Ad Load', value: '0%' }
        ],
        features: [
            { title: 'FLAC/ALAC Support', description: 'Native decoding for lossless audio formats for audiophile-grade listening.', icon: Settings },
            { title: 'Background Audio Service', description: 'Battery-optimized background playback that integrates with system media controls.', icon: Smartphone },
            { title: 'Neural Recommendation Grid', description: 'AI-driven discovery engine that perfectly predicts your musical tastes.', icon: Activity },
            { title: 'Offline Cache Protocol', description: 'Automatically caches frequently played tracks to save cellular data.', icon: Database }
        ],
        techSpecs: ['Kotlin', 'Audio API', 'FFmpeg', 'Redis'],
        laptopScreenshots: [],
        mobileScreenshots: []
    },
    {
        id: 'groovia-web',
        name: 'Groovia',
        type: 'Website',
        tagline: 'Web Audio Core',
        description: 'The web counterpart to the Groovia app. Access your playlists and lossless audio directly through your browser with native OS integration.',
        icon: Music,
        imageIcon: '/logos/png-logos/groovia-app-website.png',
        heroImage: '',
        color: '#a855f7',
        link: 'https://groovia8.vercel.app',
        stats: [
            { label: 'Library', value: '45M+' },
            { label: 'Bitrate', value: '320kbps' },
            { label: 'Concurrent Users', value: '8.2k' },
            { label: 'Ad Load', value: '0%' }
        ],
        features: [
            { title: 'Web Audio API Integration', description: 'Custom equalizer and spatial audio routing directly in the browser.', icon: Globe },
            { title: 'Media Session API', description: 'Full integration with your OS lockscreen and media keys.', icon: Command },
            { title: 'Gapless Playback', description: 'Pre-buffers upcoming tracks for zero-second delay between songs.', icon: Play },
            { title: 'Cloud Sync', description: 'Instantly syncs playlists, favorites, and history across all your devices.', icon: Cloud }
        ],
        techSpecs: ['React', 'Web Audio API', 'Node.js', 'MongoDB'],
        laptopScreenshots: [],
        mobileScreenshots: []
    },
    {
        id: 'notora-web',
        name: 'Notora',
        type: 'Website',
        tagline: 'Universal Knowledge Archive',
        description: 'The ultimate digital library for students. Read, download, and organize academic papers and books with advanced search algorithms and OCR technology.',
        icon: BookOpen,
        imageIcon: '/logos/png-logos/notora.png',
        heroImage: '',
        color: '#3b82f6',
        link: 'https://notora.univora.website',
        stats: [
            { label: 'Volumes', value: '2.4M' },
            { label: 'Accessibility', value: 'Global' },
            { label: 'Formats', value: 'All' },
            { label: 'Search Latency', value: '12ms' }
        ],
        features: [
            { title: 'Optical Character Recognition', description: 'Scans and indexes text inside scanned PDFs making them fully searchable.', icon: Search },
            { title: 'Cloud Sync Protocol', description: 'Your highlights, notes, and reading progress are safely stored in the cloud.', icon: Cloud },
            { title: 'Academic Citation Engine', description: 'Automatically generates citations in APA, MLA, and Chicago formats.', icon: BookOpen },
            { title: 'Focus Reader Mode', description: 'Distraction-free reading interface with customizable typography and dark mode.', icon: Eye }
        ],
        techSpecs: ['ElasticSearch', 'React', 'PDF.js', 'AWS S3'],
        laptopScreenshots: [],
        mobileScreenshots: []
    },
    {
        id: 'skillora',
        name: 'Skillora',
        type: 'Platform',
        tagline: 'Accelerated Learning Matrix',
        description: 'Interactive free courseware designed to rewrite your skill stack. Access various educational courses and real-time assistance with integrated development environments.',
        icon: GraduationCap,
        imageIcon: '/logos/png-logos/skillora-app-website.png',
        heroImage: '',
        color: '#eab308',
        link: '#',
        stats: [
            { label: 'Modules', value: '850+' },
            { label: 'Mentors', value: 'Expert' },
            { label: 'Content', value: '1200h' },
            { label: 'Certification', value: 'Valid' }
        ],
        features: [
            { title: 'Interactive Code Sandboxes', description: 'Write, compile, and test code directly in your browser without any setup.', icon: Code },
            { title: 'Gamified Learning Path', description: 'Earn XP, badges, and level up as you complete complex programming challenges.', icon: Activity },
            { title: 'Real-time AI Assistance', description: 'Stuck on a bug? Get contextual AI hints without giving away the full answer.', icon: Bot },
            { title: 'Live Project Deployments', description: 'Automatically deploy your completed projects to live URLs to build your portfolio.', icon: Server }
        ],
        techSpecs: ['Next.js', 'GraphQL', 'Docker', 'PostgreSQL'],
        laptopScreenshots: [],
        mobileScreenshots: []
    },

    // --- TELEGRAM BOTS ---
    {
        id: 'streamdrop-bot',
        name: 'Streamdrop Bot',
        type: 'Telegram Bot',
        tagline: 'Multi-Worker Stream Hub',
        description: 'A high-speed Telegram bot that instantly converts files into direct streaming and download links. Bypasses bandwidth limits by distributing load across a multi-client worker bot architecture.',
        icon: Link,
        imageIcon: '/logos/png-logos/streamdrop-bot.png',
        heroImage: '/logos/png-heroimg/streamdrop-bot.png',
        color: '#10b981',
        link: 'https://t.me/STREAM_DROP_BOT',
        stats: [
            { label: 'Architecture', value: 'Multi-Worker' },
            { label: 'Buffering', value: 'Zero' },
            { label: 'Protection', value: 'Anti-DDoS' },
            { label: 'Bandwidth', value: 'Unlimited' }
        ],
        features: [
            { title: 'Multi-Worker Streaming Engine', description: 'Distributes traffic across multiple Telegram clients to bypass download limits and maximize speed.', icon: Server },
            { title: 'Advanced File Reference Caching', description: 'Dramatically reduces file generation time by caching Telegram file references in MongoDB.', icon: Database },
            { title: 'Embed Protection (CORS/Referer)', description: 'Prevents external sites from hotlinking and stealing your server bandwidth.', icon: Shield },
            { title: 'Emergency Main-Bot Fallback', description: 'Ensures 100% uptime by automatically routing traffic to the main bot if workers are overloaded.', icon: Activity }
        ],
        techSpecs: ['FastAPI', 'Pyrogram', 'React (Vite)', 'MongoDB', 'Docker', 'slowapi'],
        laptopScreenshots: [
            '/screenshots/streamdrop-bot/laptop/1.png',
            '/screenshots/streamdrop-bot/laptop/2.png',
            '/screenshots/streamdrop-bot/laptop/3.png',
            '/screenshots/streamdrop-bot/laptop/4.png',
            '/screenshots/streamdrop-bot/laptop/5.png'
        ],
        mobileScreenshots: [
            '/screenshots/streamdrop-bot/mobile/1.jpg',
            '/screenshots/streamdrop-bot/mobile/2.jpg',
            '/screenshots/streamdrop-bot/mobile/3.jpg',
            '/screenshots/streamdrop-bot/mobile/4.jpg',
            '/screenshots/streamdrop-bot/mobile/5.jpg'
        ]
    },
    {
        id: 'cinemahub-bot',
        name: 'Cinemahub Bot',
        type: 'Telegram Bot',
        tagline: 'Auto-Filter Movie Engine',
        description: 'An advanced auto-filter movie bot that automatically indexes files from massive database channels. Features multi-database chaining for limitless storage and powerful group management tools.',
        icon: Film,
        imageIcon: '/logos/png-logos/cinemahub-bot.png',
        heroImage: '/logos/png-heroimg/cinemahub-bot.png',
        color: '#ef4444',
        link: 'https://t.me/Univora_CinemahubBot',
        stats: [
            { label: 'DB Capacity', value: 'Limitless' },
            { label: 'Chaining', value: 'Up to 5 DBs' },
            { label: 'Indexing', value: 'Automatic' },
            { label: 'Search', value: 'Instant' }
        ],
        features: [
            { title: 'Auto-Indexing & Filtering', description: 'Automatically scans and stores all media files from connected database channels instantly.', icon: Filter },
            { title: 'Multi-Database Chaining', description: 'Connect up to 5 separate database channels to bypass Telegram storage limits completely.', icon: Database },
            { title: 'Premium Refer & Earn System', description: 'Built-in referral tracking to automatically grant premium access to users who invite others.', icon: Users },
            { title: 'AI Spelling Correction', description: 'Fuzzy string matching algorithms find movies even if the user misspells the title.', icon: Search }
        ],
        techSpecs: ['Python', 'pyrofork', 'MongoDB', 'aiohttp', 'bs4'],
        laptopScreenshots: [
            '/screenshots/cinemahub-bot/laptop/1.png',
            '/screenshots/cinemahub-bot/laptop/2.png',
            '/screenshots/cinemahub-bot/laptop/3.png',
            '/screenshots/cinemahub-bot/laptop/4.png',
            '/screenshots/cinemahub-bot/laptop/5.png'
        ],
        mobileScreenshots: [
            '/screenshots/cinemahub-bot/mobile/1.jpg',
            '/screenshots/cinemahub-bot/mobile/2.jpg',
            '/screenshots/cinemahub-bot/mobile/3.jpg',
            '/screenshots/cinemahub-bot/mobile/4.jpg',
            '/screenshots/cinemahub-bot/mobile/5.jpg'
        ]
    },
    {
        id: 'sharebox-bot',
        name: 'Sharebox Bot',
        type: 'Telegram Bot',
        tagline: 'Enterprise File Sharing',
        description: 'Convert files into secure, shareable links with a structured subscription model. Includes a web dashboard for users to monitor links, download statistics, and manage premium features.',
        icon: Share2,
        imageIcon: '/logos/png-logos/sharebox-bot.png',
        heroImage: '/logos/png-heroimg/sharebox-bot.png',
        color: '#f59e0b',
        link: 'https://t.me/SHARE_BOX_BOT',
        stats: [
            { label: 'Link Gen.', value: 'Batched' },
            { label: 'Backup', value: 'Triple Redundant' },
            { label: 'Security', value: 'Pass-Protected' },
            { label: 'Tracking', value: 'Live Analytics' }
        ],
        features: [
            { title: 'Premium Password Protection', description: 'Lock sensitive files behind custom passwords that only authorized users can access.', icon: Lock },
            { title: 'QR Code Generation', description: 'Automatically generates scannable QR codes for quick mobile access to files.', icon: Smartphone },
            { title: 'Triple Redundancy Channel Backup', description: 'Copies files to three separate backup channels to prevent data loss if a channel is banned.', icon: HardDrive },
            { title: 'Flask User Analytics Dashboard', description: 'A sleek web UI for users to track how many times their shared links were downloaded.', icon: BarChart }
        ],
        techSpecs: ['Python', 'python-telegram-bot (v21.0)', 'Flask', 'Redis', 'AWS/GCS'],
        laptopScreenshots: [
            '/screenshots/sharebox-bot/laptop/1.png',
            '/screenshots/sharebox-bot/laptop/2.png',
            '/screenshots/sharebox-bot/laptop/3.png',
            '/screenshots/sharebox-bot/laptop/4.png',
            '/screenshots/sharebox-bot/laptop/5.png'
        ],
        mobileScreenshots: [
            '/screenshots/sharebox-bot/mobile/1.jpg',
            '/screenshots/sharebox-bot/mobile/2.jpg',
            '/screenshots/sharebox-bot/mobile/3.jpg',
            '/screenshots/sharebox-bot/mobile/4.jpg',
            '/screenshots/sharebox-bot/mobile/5.jpg'
        ]
    },
    {
        id: 'forward-bot',
        name: 'Forward Bot',
        type: 'Telegram Bot',
        tagline: 'Automated Channel Forwarder',
        description: 'Automatically forward content from one channel to another with powerful filtering rules, watermark replacement, and formatting customization options.',
        icon: Forward,
        imageIcon: '/logos/png-logos/forward-bot.png',
        heroImage: '/logos/png-heroimg/forward-bot.png',
        color: '#3b82f6',
        link: 'https://t.me/univoraforward_bot',
        stats: [
            { label: 'Channels', value: '12k+' },
            { label: 'Messages/s', value: '500+' },
            { label: 'Delay', value: '<1s' },
            { label: 'Reliability', value: 'High' }
        ],
        features: [
            { title: 'Regex Filtering', description: 'Powerful regular expressions to include, exclude, or modify text in forwarded messages.', icon: Filter },
            { title: 'Watermark Removal/Add', description: 'Automatically strips competitor links and adds your own custom watermark to media.', icon: Image },
            { title: 'Delay & Schedule', description: 'Add random delays between forwards to bypass flood-wait limits and simulate human posting.', icon: Activity },
            { title: 'Media Only Mode', description: 'Extracts and forwards only the videos, photos, or documents, leaving junk text behind.', icon: FileBox }
        ],
        techSpecs: ['Pyrogram', 'Asyncio', 'Redis', 'Docker'],
        laptopScreenshots: [
            '/screenshots/forward-bot/laptop/1.png',
            '/screenshots/forward-bot/laptop/2.png',
            '/screenshots/forward-bot/laptop/3.png',
            '/screenshots/forward-bot/laptop/4.png',
            '/screenshots/forward-bot/laptop/5.png'
        ],
        mobileScreenshots: [
            '/screenshots/forward-bot/mobile/photo_15_2026-10-07_14-48-30.jpg',
            '/screenshots/forward-bot/mobile/photo_16_2026-10-07_14-48-30.jpg',
            '/screenshots/forward-bot/mobile/photo_17_2026-10-07_14-48-30.jpg',
            '/screenshots/forward-bot/mobile/photo_18_2026-10-07_14-48-30.jpg',
            '/screenshots/forward-bot/mobile/photo_19_2026-10-07_14-48-30.jpg'
        ]
    },
    {
        id: 'extract-x-bot',
        name: 'Extract X Bot',
        type: 'Telegram Bot',
        tagline: 'Private Content Extractor',
        description: 'A powerful tool to copy media and messages from restricted channels by downloading and re-uploading them. Features live batch monitoring to mirror channels in real-time.',
        icon: Unlock,
        imageIcon: '/logos/png-logos/extract-x-bot.png',
        heroImage: '/logos/png-heroimg/extract-x-bot.png',
        color: '#ec4899',
        link: 'https://t.me/EXTRACT_XBOT',
        stats: [
            { label: 'Sync Mode', value: 'Real-time' },
            { label: 'Restrictions', value: 'Bypassed' },
            { label: 'Auth System', value: 'Enabled' },
            { label: 'Mapping', value: 'Multi-Channel' }
        ],
        features: [
            { title: 'Live Batch Monitoring', description: 'Continuously listens to a source channel and mirrors new posts to your destination instantly.', icon: Activity },
            { title: 'Custom Caption Rules', description: 'Rewrite captions on the fly, adding your own channel tags and formatting.', icon: MessageSquare },
            { title: 'Multi-Channel Destination Mapping', description: 'Route specific file types to different destination channels (e.g., Audio to Channel A, Videos to Channel B).', icon: Share2 },
            { title: 'User Authentication/Ban System', description: 'Strict access control to ensure only authorized admins can use the extraction engine.', icon: Key }
        ],
        techSpecs: ['Python', 'Pyrogram', 'MongoDB (Motor)', 'aiohttp'],
        laptopScreenshots: [
            '/screenshots/extract-x-bot/laptop/1.png',
            '/screenshots/extract-x-bot/laptop/2.png',
            '/screenshots/extract-x-bot/laptop/3.png',
            '/screenshots/extract-x-bot/laptop/4.png',
            '/screenshots/extract-x-bot/laptop/5.png'
        ],
        mobileScreenshots: [
            '/screenshots/extract-x-bot/mobile/1.jpg',
            '/screenshots/extract-x-bot/mobile/2.jpg',
            '/screenshots/extract-x-bot/mobile/3.jpg',
            '/screenshots/extract-x-bot/mobile/4.jpg',
            '/screenshots/extract-x-bot/mobile/5.jpg'
        ]
    },
    {
        id: 'button-bot',
        name: 'Button Bot',
        type: 'Telegram Bot',
        tagline: 'Interactive Post Designer',
        description: 'Design rich channel posts with interactive reaction counters and native colored URLs. Features a built-in auto-adder and keep-alive server for 24/7 hosting on Render.',
        icon: MousePointerClick,
        imageIcon: '/logos/png-logos/button-bot.png',
        heroImage: '/logos/png-heroimg/button-bot.png',
        color: '#8b5cf6',
        link: 'https://t.me/UNIVORA_BUTTONBOT',
        stats: [
            { label: 'Hosting', value: '24/7 Render' },
            { label: 'Links', value: 'Native Colored' },
            { label: 'Auto-Adder', value: 'Integrated' },
            { label: 'Analytics', value: 'In-bot Dash' }
        ],
        features: [
            { title: 'Interactive Like/Dislike Counters', description: 'Attach live reaction buttons to your posts to boost community engagement.', icon: Activity },
            { title: 'Channel Auto-Adder System', description: 'Forces users to join a specific sponsor channel before they can interact with the buttons.', icon: Users },
            { title: 'Inline Sharing Mode', description: 'Allow users to share the formatted post to their own chats via inline queries.', icon: Share2 },
            { title: 'Comprehensive Post Analytics', description: 'Track exact click-through rates and interaction metrics for every button you deploy.', icon: BarChart }
        ],
        techSpecs: ['Python', 'python-telegram-bot (v21.6)', 'aiosqlite', 'Flask'],
        laptopScreenshots: [
            '/screenshots/button-bot/laptop/1.png',
            '/screenshots/button-bot/laptop/2.png',
            '/screenshots/button-bot/laptop/3.png',
            '/screenshots/button-bot/laptop/4.png',
            '/screenshots/button-bot/laptop/5.png'
        ],
        mobileScreenshots: [
            '/screenshots/button-bot/mobile/1.jpg',
            '/screenshots/button-bot/mobile/2.jpg',
            '/screenshots/button-bot/mobile/3.jpg',
            '/screenshots/button-bot/mobile/4.jpg'
        ]
    },
    {
        id: 'leech-bot',
        name: 'Leech Bot',
        type: 'Telegram Bot',
        tagline: 'Ultimate Downloader & Cloner',
        description: 'Leech files from YouTube, torrents, and various websites directly to Telegram or your Google Drive. Clones large files instantly, saving your local bandwidth.',
        icon: HardDriveDownload,
        heroImage: '/logos/png-heroimg/leech-bot.png',
        color: '#06b6d4',
        link: '#',
        stats: [
            { label: 'Data Transferred', value: 'PB+' },
            { label: 'Speed', value: 'Multi-Gbps' },
            { label: 'Torrents', value: 'Supported' },
            { label: 'G-Drive', value: 'Integrated' }
        ],
        features: [
            { title: 'Torrent to Telegram/Drive', description: 'Download torrent files and magnet links directly into your cloud storage at gigabit speeds.', icon: Download },
            { title: 'YouTube/Insta/TikTok DL', description: 'Extract and download media from over 1000+ supported websites seamlessly.', icon: Link },
            { title: 'Zip/Unzip on Cloud', description: 'Compress or extract large archives directly on the server without downloading them locally.', icon: Database },
            { title: 'Drive to Drive Clone', description: 'Copy massive folders between Google Drives instantly using server-side APIs.', icon: Cloud }
        ],
        techSpecs: ['Aria2', 'yt-dlp', 'Rclone', 'Python'],
        laptopScreenshots: [],
        mobileScreenshots: []
    },
    {
        id: 'echo-trace-bot',
        name: 'Echo Trace Bot',
        type: 'Telegram Bot',
        tagline: 'Entity ID Extractor',
        description: 'Extract unique numerical IDs and metadata of Telegram users, channels, groups, and bots instantly for administration and development.',
        icon: Search,
        imageIcon: '/logos/png-logos/echotrace-bot.png',
        heroImage: '/logos/png-heroimg/echotrace-bot.png',
        color: '#64748b',
        link: 'https://t.me/Echotrache_bot',
        stats: [
            { label: 'Queries', value: 'Unlimited' },
            { label: 'Accuracy', value: '100%' },
            { label: 'Hidden Info', value: 'Exposed' },
            { label: 'Speed', value: 'Realtime' }
        ],
        features: [
            { title: 'User/Chat ID Fetching', description: 'Instantly reveal the hidden numerical ID of any forwarded message, user, or chat.', icon: Search },
            { title: 'JSON Metadata Dump', description: 'View the raw, unformatted JSON payload of any Telegram object for debugging.', icon: Code },
            { title: 'Forward Tracing', description: 'Identify the original source of forwarded messages even if the sender has hidden their profile.', icon: Eye },
            { title: 'Admin Intel', description: 'Retrieve detailed information about group restrictions and admin permissions.', icon: Shield }
        ],
        techSpecs: ['Pyrogram', 'FastAPI', 'Redis', 'Python'],
        laptopScreenshots: [
            '/screenshots/echo-trace-bot/laptop/1.png',
            '/screenshots/echo-trace-bot/laptop/2.png',
            '/screenshots/echo-trace-bot/laptop/3.png',
            '/screenshots/echo-trace-bot/laptop/4.png',
            '/screenshots/echo-trace-bot/laptop/5.png'
        ],
        mobileScreenshots: [
            '/screenshots/echo-trace-bot/mobile/1.jpg',
            '/screenshots/echo-trace-bot/mobile/2.jpg',
            '/screenshots/echo-trace-bot/mobile/3.jpg',
            '/screenshots/echo-trace-bot/mobile/4.jpg',
            '/screenshots/echo-trace-bot/mobile/5.jpg'
        ]
    },
    {
        id: 'groovia-bot',
        name: 'Groovia Bot',
        type: 'Telegram Bot',
        tagline: 'Music Command Center',
        description: 'Search for any song name and download high-quality audio tracks directly in your chat. Fast, precise, and linked with the Groovia ecosystem.',
        icon: Music,
        imageIcon: '/logos/grooviabot.png',
        heroImage: '/logos/png-heroimg/groovia-bot.png',
        color: '#a855f7',
        link: '#',
        stats: [
            { label: 'Songs Served', value: '15M+' },
            { label: 'Processing', value: 'Instant' },
            { label: 'Voice Chat', value: 'Ready' },
            { label: 'Formats', value: 'MP3/FLAC' }
        ],
        features: [
            { title: 'YouTube/Spotify Link Support', description: 'Paste a link from major platforms and instantly get the MP3 file in chat.', icon: Download },
            { title: 'Lyrics Fetcher', description: 'Automatically scrape and send synchronized lyrics alongside the downloaded track.', icon: MessageSquare },
            { title: 'Album Art Extraction', description: 'Embeds high-quality cover art and proper ID3 metadata tags into every file.', icon: Image },
            { title: 'Batch Download Mode', description: 'Send a Spotify playlist link and download the entire playlist simultaneously.', icon: List }
        ],
        techSpecs: ['Telethon', 'FFmpeg', 'Spotify API', 'yt-dlp'],
        laptopScreenshots: ['/screenshots/grooviabot1.jpg', '/screenshots/grooviabot1.jpg', '/screenshots/grooviabot1.jpg', '/screenshots/grooviabot1.jpg', '/screenshots/grooviabot1.jpg'],
        mobileScreenshots: ['/screenshots/grooviabot1.jpg', '/screenshots/grooviabot1.jpg', '/screenshots/grooviabot1.jpg', '/screenshots/grooviabot1.jpg', '/screenshots/grooviabot1.jpg']
    }
];
