export const faqCategories = [
    { id: 'all', name: 'All Questions' },
    { id: 'ecosystem', name: 'Ecosystem & General' },
    { id: 'apps', name: 'Mobile & Desktop Apps' },
    { id: 'bots', name: 'Bots & Automation' },
    { id: 'security', name: 'Security & Privacy' }
];

export const faqData = [
    // --- ECOSYSTEM & GENERAL ---
    {
        id: 'what-is-univora',
        categoryId: 'ecosystem',
        question: 'What is Univora?',
        answer: 'Univora is more than just a tool hub; it is a continuously evolving digital ecosystem and community. Currently curated by a single entity, the long-term vision is to open the platform so that any developer or creator can integrate their own tools, bots, and services into the Univora network.',
        image: '/faq-img/faq-about-4fZTmGUD.jpg'
    },
    {
        id: 'who-created-univora',
        categoryId: 'ecosystem',
        question: 'Who is behind the Univora ecosystem?',
        answer: 'The ecosystem is architected and maintained by Rolex (also known as Rolexsir within the community). The goal is simply to build powerful, functional tools that solve real digital bottlenecks without unnecessary corporate red tape.'
    },
    {
        id: 'is-it-free',
        categoryId: 'ecosystem',
        question: 'Are the tools in the Univora Ecosystem free?',
        answer: 'The core philosophy is to keep everything as free as possible. However, server costs and API limits are real. To prevent system abuse and manage extremely high-cost services, generous limits and optional premium tiers are implemented where necessary. But the primary goal will always be to provide robust, free tools for everyone.',
        image: '/faq-img/faq-free-CH0d6hRu.jpg'
    },
    {
        id: 'latest-versions',
        categoryId: 'ecosystem',
        question: 'Where can I find the latest versions of all tools?',
        answer: 'You are already in the right place! The Univora web platform is the central hub. You can navigate to the "Apps" or "Bots" sections to find real-time version info, changelogs, and direct launch/download links for every tool.',
        image: '/faq-img/faq-version-Cj1nypGk.jpg'
    },
    {
        id: 'need-help',
        categoryId: 'ecosystem',
        question: 'What if I face issues or need support?',
        answer: 'Our dedicated support team and vibrant community are always ready to help. You can reach out via our official Telegram channels or join our community groups linked in the footer. For instant troubleshooting, you can also use our specialized support bots.',
        image: '/faq-img/faq-support-DZJivPzx.jpg'
    },

    // --- MOBILE & DESKTOP APPS ---
    {
        id: 'cinemahub-groovia',
        categoryId: 'apps',
        question: 'What are CinemaHub and Groovia?',
        answer: 'CinemaHub (Web & App) is a massive platform for cinephiles to watch and download movies, series, anime, and dramas with advanced filtering. Groovia (Web & App) is a dedicated high-speed platform to search, listen, and download music seamlessly.'
    },
    {
        id: 'notora-skillora',
        categoryId: 'apps',
        question: 'What do Notora and Skillora offer?',
        answer: 'Notora is an intuitive web app designed for you to upload and read books without any friction. Skillora is our upcoming free educational platform focused on providing high-quality courses and learning material.'
    },
    {
        id: 'unknown-sources',
        categoryId: 'apps',
        question: 'I get an "Unknown Sources" warning while installing the APK. What should I do?',
        answer: 'Since Univora apps are not distributed through the Google Play Store (to bypass restrictions and provide advanced features), your phone will prompt this standard security warning. Simply go to your phone Settings > Security (or Apps) and enable "Install from Unknown Sources" for your browser or file manager, then proceed with the installation.',
        image: '/faq-img/faq-install-BCRr_GDG.jpg'
    },
    {
        id: 'play-protect',
        categoryId: 'apps',
        question: 'Play Protect shows a warning while installing — is the app unsafe?',
        answer: 'No, our apps are completely safe. Google Play Protect often flags apps built independently or apps that require advanced permissions (like our automation tools). You can safely click "More Details" and select "Install anyway". We guarantee our code is clean, telemetry-free, and open for community audit.',
        image: '/faq-img/faq-playprotect-DqN0olku.jpg'
    },

    // --- BOTS & AUTOMATION ---
    {
        id: 'media-bots',
        categoryId: 'bots',
        question: 'What do the CinemaHub and StreamDrop bots do?',
        answer: 'The CinemaHub Bot searches through a massive database of over 6,000,000+ files to instantly find any movie, series, or anime with advanced filters. The StreamDrop Bot takes any file and generates direct, shareable high-speed streaming and download links.'
    },
    {
        id: 'file-management-bots',
        categoryId: 'bots',
        question: 'How do Sharebox and Extract X bots work?',
        answer: 'Sharebox is a complete filestore solution where you can upload files to generate a shareable 1-click download link, complete with link-shortener support for admins. Extract X is a highly advanced bot that allows you to pull restricted content from private channels into your own, including a "Livebatch" feature that automatically mirrors new content as it arrives.'
    },
    {
        id: 'utility-bots',
        categoryId: 'bots',
        question: 'What are the features of Forward Bot and Button Bot?',
        answer: 'Forward Bot transfers content between channels blazingly fast with parallel task support—something most other bots fail to do. Button Bot allows you to attach highly customized, colorful buttons and emojis to your posts, including an auto-adder that instantly formats new channel posts.'
    },

    // --- SECURITY & PRIVACY ---
    {
        id: 'api-abuse',
        categoryId: 'security',
        question: 'Can I use your APIs for my own projects?',
        answer: 'Yes! We provide official APIs (both Free and Premium tiers) in our "<> DEV" section. However, please do not attempt to scrape, reverse-engineer, or abuse our internal endpoints. If you need a specific feature that isn\'t publicly available, contact us! We are very open to providing access. Abusing the system will result in permanent bans, and it ruins a great free tool for the rest of the community.'
    },
    {
        id: 'data-safety',
        categoryId: 'security',
        question: 'Is my data safe within the Univora Ecosystem?',
        answer: 'Security is our highest priority. We employ end-to-end encryption for sensitive data transfers. We do NOT sell your data, nor do we inject intrusive trackers. Our platforms are designed to collect only the absolute minimum telemetry required to keep the servers running.',
        image: '/faq-img/faq-privacy-Da1BLu2u.jpg'
    }
];
