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
        answer: 'Univora is an advanced, interconnected ecosystem designed to automate and simplify your digital life. It brings together powerful Telegram Bots, highly optimized Mobile/Desktop Applications, and robust Web Services under one unified, premium interface. Whether you need a smart study assistant, an automation bot, or a sleek desktop tool, Univora provides it all without any paid subscriptions.',
        image: '/faq-img/faq-about-4fZTmGUD.jpg'
    },
    {
        id: 'is-it-free',
        categoryId: 'ecosystem',
        question: 'Is the Univora Ecosystem completely free?',
        answer: 'Yes, 100%. Our core philosophy is to provide Boss-Level technology accessible to everyone. All our bots, apps, and platforms are completely free to use without hidden charges or paywalls.',
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
        id: 'unknown-sources',
        categoryId: 'apps',
        question: 'I get an "Unknown Sources" warning while installing the APK. What should I do?',
        answer: 'Since Univora apps are not always distributed through the Google Play Store (to bypass restrictions and provide advanced features), your phone will prompt this standard security warning. Simply go to your phone Settings > Security (or Apps) and enable "Install from Unknown Sources" for your browser or file manager, then proceed with the installation.',
        image: '/faq-img/faq-install-BCRr_GDG.jpg'
    },
    {
        id: 'play-protect',
        categoryId: 'apps',
        question: 'Play Protect shows a warning while installing — is the app unsafe?',
        answer: 'No, our apps are completely safe. Google Play Protect often flags apps built independently or apps that require advanced permissions (like our automation tools). You can safely click "More Details" and select "Install anyway". We guarantee our code is clean, telemetry-free, and open for community audit.',
        image: '/faq-img/faq-playprotect-DqN0olku.jpg'
    },
    {
        id: 'platforms',
        categoryId: 'apps',
        question: 'When will iOS and Windows native versions launch?',
        answer: 'We are actively developing native experiences for Windows and macOS. Currently, our Android ecosystem is fully deployed. Apple’s strict sideloading policies make iOS distribution challenging, but we are exploring Web App (PWA) alternatives for iPhone users to ensure everyone gets access.',
        image: '/faq-img/faq-platforms-CaIct-HT.jpg'
    },
    {
        id: 'app-updates',
        categoryId: 'apps',
        question: 'How do I update the apps?',
        answer: 'Many of our apps feature an Over-The-Air (OTA) update system. When a new version is live, you will receive an in-app notification prompting you to update seamlessly. Alternatively, you can always visit this website to download the latest APK/Installer directly.',
        image: '/faq-img/faq-update-BMLwG9su.jpg'
    },

    // --- BOTS & AUTOMATION ---
    {
        id: 'bot-setup',
        categoryId: 'bots',
        question: 'How do I start using Univora Telegram Bots?',
        answer: 'It is incredibly simple. Go to the "Bots" section on this website, choose the bot you need (e.g., Groovia Bot, Study Bot), and click "Launch Bot". It will automatically redirect you to Telegram. Just click "Start" and the bot will guide you through its features with an interactive menu.'
    },
    {
        id: 'bot-limits',
        categoryId: 'bots',
        question: 'Are there any usage limits on the bots?',
        answer: 'To ensure maximum uptime and fair usage for everyone, some extremely resource-heavy bots might have a generous daily rate limit. However, for 99% of users, the bots will feel unlimited and blazingly fast.'
    },
    {
        id: 'bot-privacy',
        categoryId: 'bots',
        question: 'Can the bots read my private messages?',
        answer: 'Absolutely not. Univora bots operate under Telegram\'s strict Privacy Mode. They can only see messages that explicitly start with a command (like /start) or messages in groups where they are specifically tagged or replied to. Your privacy is paramount.'
    },

    // --- SECURITY & PRIVACY ---
    {
        id: 'data-safety',
        categoryId: 'security',
        question: 'Is my data safe within the Univora Ecosystem?',
        answer: 'Security is our highest priority. We employ end-to-end encryption for sensitive data transfers. We do NOT sell your data, nor do we inject intrusive trackers. Our platforms are designed to collect only the absolute minimum telemetry required to keep the servers running.',
        image: '/faq-img/faq-privacy-Da1BLu2u.jpg'
    },
    {
        id: 'open-source',
        categoryId: 'security',
        question: 'Are the apps and bots open-source?',
        answer: 'While the core proprietary algorithms remain closed to prevent malicious cloning, large parts of our ecosystem, including this very frontend interface, are built with transparency in mind. We regularly share code snippets, API structures, and architectural breakdowns with the developer community.'
    }
];
