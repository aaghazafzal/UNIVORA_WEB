import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Code2, Server, Database, BrainCircuit, Activity, Hexagon, Terminal as TerminalIcon, Smartphone, Sparkles, Send, Instagram, Youtube, Github, X, Coffee, Dumbbell, Zap, GitCommit, ArrowDownCircle } from 'lucide-react';
import Footer from '../components/Footer';

const Dev = () => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    // For Manifesto Scroll effect
    const manifestoOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [0, 1, 0]);
    const manifestoScale = useTransform(scrollYProgress, [0.1, 0.3], [0.9, 1]);

    const [selectedQR, setSelectedQR] = useState(null);
    const [isAvatarOpen, setIsAvatarOpen] = useState(false);
    const [selectedTech, setSelectedTech] = useState(null);
    const [terminalText, setTerminalText] = useState("");
    const [typingComplete, setTypingComplete] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Rolex Sir - Founder & CEO";
    }, []);

    // Prevent body scroll when modals are open
    useEffect(() => {
        if (selectedQR || isAvatarOpen || selectedTech) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedQR, isAvatarOpen, selectedTech]);

    // Terminal Typing Effect
    useEffect(() => {
        const lines = [
            "> Initializing Rolex_Sir_Protocol v2.0...",
            "> Authentication: SUCCESS (CEO Level Access)",
            "> Verifying Biological Metrics...",
            "> Current Status: Kabaddi Athlete [ACTIVE]",
            "> Fuel Source: Pure Black Coffee",
            "> Sugar Intake: 0g (Optimized Mode)",
            "> Fetching Ecosystem Logs...",
            "> 1.5 Years Uptime. 0 Days Off.",
            "> Warning: Mastermind is currently coding Apps & Web Architecture.",
            "> System Ready."
        ];

        let currentLine = 0;
        let currentChar = 0;
        let isMounted = true;

        const typeWriter = () => {
            if (!isMounted) return;

            if (currentLine < lines.length) {
                if (currentChar < lines[currentLine].length) {
                    setTerminalText(prev => prev + lines[currentLine].charAt(currentChar));
                    currentChar++;
                    setTimeout(typeWriter, Math.random() * 30 + 10);
                } else {
                    setTerminalText(prev => prev + "\n");
                    currentLine++;
                    currentChar = 0;
                    setTimeout(typeWriter, 400); // Pause between lines
                }
            } else {
                setTypingComplete(true);
            }
        };

        // Start typing after a short delay
        setTimeout(typeWriter, 1500);

        return () => { isMounted = false; };
    }, []);

    const techStack = [
        { 
            name: 'React & Next.js', 
            icon: Code2, 
            color: '#3b82f6',
            domain: 'Full Stack Web Development',
            level: 'Architect Level',
            description: 'Building blazing fast, SEO-optimized, and highly scalable web applications. Mastering server-side rendering, advanced state management, and modern glassmorphic UI engineering.',
            skills: ['Next.js 14 (App Router)', 'React 18', 'Tailwind CSS', 'Framer Motion', 'Redux / Zustand', 'REST API Integration']
        },
        { 
            name: 'Python & Pyrogram', 
            icon: TerminalIcon, 
            color: '#eab308',
            domain: 'Bot & Automation Engineering',
            level: 'Master Level',
            description: 'Architecting high-performance Telegram bots that handle thousands of concurrent users. Seamless streaming protocols, deep database integration, and automated scraping systems.',
            skills: ['Pyrogram (MTProto)', 'Asyncio / Aiohttp', 'Web Scraping', 'Data Automation', 'File-to-Link Streaming', 'Payment Gateway Integration']
        },
        { 
            name: 'Mobile App Ecosystem', 
            icon: Smartphone, 
            color: '#6366f1',
            domain: 'Full Stack App Development',
            level: 'Advanced Level',
            description: 'Crafting premium, native-feeling mobile applications for Android & iOS. Seamless offline caching, real-time database syncing, and highly fluid micro-animations.',
            skills: ['Kotlin (Android Native)', 'Flutter / Dart', 'React Native', 'Firebase Integration', 'Local SQLite / Room', 'Push Notifications']
        },
        { 
            name: 'Node.js Ecosystem', 
            icon: Server, 
            color: '#22c55e',
            domain: 'Backend Architecture',
            level: 'Senior Level',
            description: 'Designing uncrackable and highly concurrent backend servers. Building secure authentication pipelines, microservices, and high-speed API endpoints.',
            skills: ['Express.js / Fastify', 'JWT & OAuth2', 'Socket.io', 'Microservices', 'WebSockets', 'Rate Limiting & Security']
        },
        { 
            name: 'Database Architecture', 
            icon: Database, 
            color: '#10b981',
            domain: 'Data Engineering',
            level: 'Architect Level',
            description: 'Designing highly optimized database schemas. Handling massive data queries, indexing, and high-speed caching for zero-latency responses.',
            skills: ['MongoDB', 'PostgreSQL', 'Redis (Cache)', 'Mongoose / Prisma', 'Data Sharding', 'Backup Automation']
        },
        { 
            name: 'DevOps & Docker', 
            icon: Hexagon, 
            color: '#0ea5e9',
            domain: 'Cloud Infrastructure',
            level: 'Advanced Level',
            description: 'Deploying and scaling applications seamlessly across the cloud. Containerizing bots and web servers to ensure 99.99% uptime with zero downtime deployments.',
            skills: ['Docker & Containers', 'CI/CD Pipelines', 'Linux Server Admin', 'Nginx Proxy', 'Cloudflare CDN', 'VPS Management']
        },
    ];

    const socials = [
        { platform: 'Telegram', id: '@ROLEX_SIIR_8', qr: '/telegramqr.jpg', icon: Send, color: '#24A1DE', link: 'https://t.me/ROLEX_SIIR_8' },
        { platform: 'Instagram', id: 'univora8', qr: '/univora8_qr-instagram.png', icon: Instagram, color: '#E1306C', link: 'https://instagram.com/univora8' },
        { platform: 'YouTube', id: '@univora8', qr: '/youtubeqr.jpg', icon: Youtube, color: '#FF0000', link: 'https://www.youtube.com/@Univora8' },
        { platform: 'GitHub', id: 'univora-platform', qr: '/githubqr.jpg', icon: Github, color: '#ffffff', link: 'https://github.com/univora-platform' }
    ];

    const timeline = [
        {
            date: "Sept 2024 - Feb 2025",
            title: "The Blueprint Era",
            description: "Spent 3 months purely planning the entire architecture. I didn't even know how to code yet, but the vision of the ecosystem was already clear in my mind.",
            color: "#64748b"
        },
        {
            date: "Early 2025",
            title: "First Deployments",
            description: "Learned coding and immediately went to work. Built Cinemahub Bot and Groovia Bot as the foundational pillars of the network.",
            color: "#3b82f6"
        },
        {
            date: "Mid 2025",
            title: "Expansion by Necessity",
            description: "As the ecosystem grew, problems arose. I solved them by building more bots: Forward Bot & Extract X Bot to handle files, Streamdrop for seamless user downloads, Button Bot for channel interactions, Echo Trace for admin IDs, and Leech Bot to gather 3rd-party content. A bot for every problem.",
            color: "#eab308"
        },
        {
            date: "Present",
            title: "The Grand Architecture",
            description: "Now bridging the gap between Telegram and the wider web. Actively developing the full-scale Apps and Websites for Groovia and Cinemahub.",
            color: "#22c55e"
        }
    ];

    return (
        <div className="min-h-screen bg-theme-bg font-sans text-theme-text overflow-x-hidden selection:bg-theme-primary selection:text-black">

            {/* Cinematic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vh] bg-theme-primary opacity-[0.05] blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vh] bg-[#3b82f6] opacity-[0.03] blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
            </div>

            <main className="relative z-10 w-full pt-32 pb-20">

                {/* 1. HERO SECTION */}
                <section className="max-w-7xl mx-auto px-6 mb-40">
                    <motion.div
                        style={{ opacity, scale }}
                        className="flex flex-col items-center text-center relative"
                    >
                        {/* 3D Floating Avatar */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                            className="relative group mb-12 perspective-1000"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-theme-primary to-blue-500 rounded-full blur-2xl opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700"></div>
                            <div 
                                onClick={() => setIsAvatarOpen(true)}
                                className="relative w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-theme-surface border border-theme-border overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] transform rotate-y-[-10deg] rotate-x-[10deg] group-hover:rotate-0 transition-transform duration-700 cursor-pointer"
                            >
                                <img
                                    src="/myimg.jpg"
                                    alt="Rolex Sir"
                                    className="w-full h-full object-cover rounded-full filter contrast-125 saturate-110"
                                    onError={(e) => { e.target.src = 'https://i.pravatar.cc/500?img=11' }}
                                />
                            </div>

                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                className="absolute -inset-4 border border-dashed border-theme-primary/30 rounded-full pointer-events-none"
                            ></motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-theme-surface-hover backdrop-blur-md border border-theme-border text-xs font-bold tracking-[0.2em] text-theme-primary uppercase mb-8 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.15)]">
                                <Sparkles size={14} /> Founder, CEO & Sole Architect
                            </div>

                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-theme-text via-theme-text to-theme-text/20 drop-shadow-2xl">
                                ROLEX SIR
                            </h1>

                            <p className="text-xl md:text-3xl text-theme-text-muted font-medium max-w-3xl mx-auto leading-relaxed">
                                Building the future of the internet. <br className="hidden md:block" /> One line of code at a time.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="absolute -bottom-24 text-theme-text-muted animate-bounce"
                        >
                            <ArrowDownCircle size={40} />
                        </motion.div>
                    </motion.div>
                </section>

                {/* NEW SECTION 1: THE VISION MANIFESTO (Editorial Style) */}
                <section className="relative h-[80vh] flex items-center justify-center px-6 mb-20 overflow-hidden">
                    {/* DESKTOP VIEW (Original Scroll Logic - Unchanged) */}
                    <motion.div
                        style={{ opacity: manifestoOpacity, scale: manifestoScale }}
                        className="hidden md:block text-center w-full max-w-6xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter text-theme-text mix-blend-difference">
                            I DON'T JUST BUILD APPS.
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-blue-500">
                                I BUILD ECOSYSTEMS.
                            </span>
                        </h2>
                    </motion.div>

                    {/* MOBILE VIEW (Fixed Trigger Logic) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ margin: "-50px", once: false }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="md:hidden text-center w-full max-w-6xl mx-auto"
                    >
                        <h2 className="text-5xl font-black leading-[1.1] tracking-tighter text-theme-text mix-blend-difference">
                            I DON'T JUST BUILD APPS.
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-blue-500">
                                I BUILD ECOSYSTEMS.
                            </span>
                        </h2>
                    </motion.div>
                </section>

                {/* NEW SECTION 2: LIVE COMMAND CENTER (Terminal UI) */}
                <section className="max-w-5xl mx-auto px-6 mb-40">
                    <div className="bg-theme-surface border border-theme-border rounded-[2rem] overflow-hidden shadow-2xl relative">
                        {/* Terminal Header */}
                        <div className="bg-theme-surface-hover border-b border-theme-border px-6 py-4 flex items-center gap-3">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                            </div>
                            <span className="text-theme-text-muted font-mono text-sm mx-auto tracking-widest">rolex_sir@univora: ~</span>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-8 md:p-12 font-mono text-sm md:text-base leading-relaxed bg-[#050505] text-[#0f0] min-h-[300px] relative">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
                            <pre className="whitespace-pre-wrap relative z-10 text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.4)]">
                                {terminalText}
                                {!typingComplete && <span className="animate-pulse">_</span>}
                            </pre>

                            {/* Quick Stats Grid inside Terminal */}
                            {typingComplete && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                    className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#222] pt-8"
                                >
                                    <div className="flex flex-col gap-2">
                                        <Dumbbell className="text-green-600" size={20} />
                                        <span className="text-green-400 font-bold">Athlete Mode</span>
                                        <span className="text-green-600/70 text-xs">Kabaddi Player</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Coffee className="text-green-600" size={20} />
                                        <span className="text-green-400 font-bold">Fuel Source</span>
                                        <span className="text-green-600/70 text-xs">Black Coffee Only</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Activity className="text-green-600" size={20} />
                                        <span className="text-green-400 font-bold">Sugar Intake</span>
                                        <span className="text-green-600/70 text-xs">0g Detected</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Zap className="text-green-600" size={20} />
                                        <span className="text-green-400 font-bold">Drive</span>
                                        <span className="text-green-600/70 text-xs">Infinite</span>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>

                {/* NEW SECTION 3: THE 1.5 YEAR JOURNEY (Glowing Timeline) */}
                <section className="max-w-4xl mx-auto px-6 mb-40 relative">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 text-theme-text">The Genesis Protocol</h2>
                        <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
                            How one 11th grader built an entire digital empire purely out of necessity and passion over 1.5 years.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Glowing Line */}
                        <div className="absolute top-0 bottom-0 left-[19px] md:left-1/2 md:-ml-[2px] w-[4px] bg-theme-surface-hover">
                            <motion.div
                                style={{ height: scrollYProgress, scaleY: scrollYProgress, transformOrigin: 'top' }}
                                className="w-full bg-gradient-to-b from-theme-primary to-blue-500 shadow-[0_0_15px_var(--color-primary)]"
                            ></motion.div>
                        </div>

                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className={`relative flex items-center justify-between md:justify-normal w-full mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Center Node */}
                                <div className="absolute left-0 md:left-1/2 -ml-[2px] md:-ml-[20px] w-10 h-10 rounded-full bg-theme-surface border-4 border-theme-bg flex items-center justify-center z-10 shadow-lg" style={{ borderColor: item.color }}>
                                    <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}></div>
                                </div>

                                {/* Content Card */}
                                <div className={`w-[85%] md:w-[45%] pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                    <div className="bg-theme-surface border border-theme-border rounded-3xl p-8 hover:border-theme-primary/50 hover:shadow-2xl transition-all duration-300">
                                        <span className="inline-block px-3 py-1 bg-theme-bg rounded-lg text-xs font-bold uppercase tracking-wider mb-4" style={{ color: item.color }}>
                                            {item.date}
                                        </span>
                                        <h3 className="text-2xl font-black text-theme-text mb-4">{item.title}</h3>
                                        <p className="text-theme-text-muted leading-relaxed text-sm md:text-base">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* EXISTING SECTION: TECH STACK MATRIX */}
                <section className="max-w-7xl mx-auto px-6 mb-40">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-theme-text">Neural Pathways</h2>
                        <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
                            The advanced technologies and frameworks I've mastered to construct the network.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {techStack.map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                onClick={() => setSelectedTech(tech)}
                                className="group bg-theme-surface border border-theme-border rounded-[2rem] p-8 hover:border-theme-primary/50 hover:bg-theme-surface-hover transition-all hover:-translate-y-2 hover:shadow-2xl flex items-center gap-6 cursor-pointer"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-theme-bg flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg border border-theme-border" style={{ color: tech.color, boxShadow: `0 0 20px ${tech.color}15` }}>
                                    <tech.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-theme-text tracking-wide group-hover:text-theme-primary transition-colors">
                                    {tech.name}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* EXISTING SECTION: CONNECT & QR CODES */}
                <section className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-theme-text">Establish Connection</h2>
                        <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
                            Scan to connect with me across the digital grid.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {socials.map((social, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-theme-surface border border-theme-border rounded-[2.5rem] p-6 flex flex-col items-center group relative overflow-hidden"
                            >
                                {/* Glowing bg */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl pointer-events-none" style={{ backgroundColor: social.color }}></div>

                                {/* QR Code Area (Clickable to Expand) */}
                                <div
                                    onClick={() => social.qr && setSelectedQR(social.qr)}
                                    className={`w-full aspect-square bg-theme-bg border border-theme-border rounded-3xl mb-6 flex items-center justify-center overflow-hidden p-4 relative shadow-inner ${social.qr ? 'cursor-pointer hover:border-theme-primary/50' : ''} transition-colors`}
                                >
                                    {social.qr ? (
                                        <img src={social.qr} alt={`${social.platform} QR`} className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="flex flex-col items-center text-theme-text-muted gap-2">
                                            <Activity size={32} />
                                            <span className="text-xs font-mono uppercase tracking-wider">Awaiting Data</span>
                                        </div>
                                    )}
                                    {social.qr && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                                            <span className="text-white font-bold text-sm bg-[#222] px-3 py-1 rounded-full border border-[#444]">View QR</span>
                                        </div>
                                    )}
                                </div>

                                {/* Platform Info (Clickable Link) */}
                                <a
                                    href={social.link !== '#' ? social.link : undefined}
                                    target={social.link !== '#' ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center w-full z-10 hover:bg-theme-surface-hover p-3 rounded-2xl transition-colors cursor-pointer"
                                >
                                    <div className="w-12 h-12 rounded-full mb-3 flex items-center justify-center transition-transform group-hover:-translate-y-1 bg-theme-bg border border-theme-border" style={{ color: social.color }}>
                                        <social.icon size={20} />
                                    </div>

                                    <h3 className="text-theme-text font-bold text-lg mb-1 group-hover:text-theme-primary transition-colors">{social.platform}</h3>
                                    <span className="text-theme-text-muted text-sm font-mono group-hover:text-theme-text transition-colors">
                                        {social.id}
                                    </span>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </main>

            {/* QR CODE FULLSCREEN MODAL */}
            <AnimatePresence>
                {selectedQR && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedQR(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6 cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative bg-theme-surface border border-theme-border rounded-[2.5rem] p-4 max-w-md w-full shadow-2xl flex flex-col items-center"
                        >
                            <button
                                onClick={() => setSelectedQR(null)}
                                className="absolute -top-4 -right-4 w-10 h-10 bg-theme-surface-hover border border-theme-border rounded-full flex items-center justify-center text-theme-text hover:bg-theme-primary hover:text-black hover:border-theme-primary transition-all shadow-xl"
                            >
                                <X size={20} />
                            </button>
                            <div className="w-full bg-white rounded-[2rem] p-4">
                                <img src={selectedQR} alt="Enlarged QR Code" className="w-full h-auto rounded-[1.5rem]" />
                            </div>
                            <p className="mt-6 text-theme-text-muted text-sm font-bold uppercase tracking-widest">
                                Scan to Connect
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AVATAR FULLSCREEN MODAL (Boss Aura) */}
            <AnimatePresence>
                {isAvatarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsAvatarOpen(false)}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50, rotateX: 20 }}
                            transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl bg-theme-surface/50 border border-theme-border rounded-[3rem] p-4 shadow-[0_0_100px_rgba(var(--color-primary-rgb),0.3)] perspective-1000 flex flex-col items-center group overflow-hidden"
                        >
                            {/* Premium glowing background behind image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-theme-primary/20 via-transparent to-blue-500/20 opacity-50 pointer-events-none"></div>
                            
                            <button
                                onClick={() => setIsAvatarOpen(false)}
                                className="absolute top-6 right-6 w-12 h-12 bg-theme-surface border border-theme-border rounded-full flex items-center justify-center text-theme-text hover:bg-theme-primary hover:text-black hover:border-theme-primary transition-all shadow-2xl z-20"
                            >
                                <X size={24} />
                            </button>
                            
                            <div className="w-full relative overflow-hidden rounded-[2.5rem] border border-theme-border bg-theme-bg shadow-inner flex justify-center">
                                <img 
                                    src="/myimg.jpg" 
                                    alt="Rolex Sir Expanded" 
                                    className="w-full max-w-[500px] h-auto max-h-[70vh] object-cover filter contrast-125 saturate-110"
                                    onError={(e) => { e.target.src = 'https://i.pravatar.cc/500?img=11' }}
                                />
                                {/* Bottom gradient overlay for name */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 pt-24 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center">
                                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-3 drop-shadow-2xl">ROLEX SIR</h2>
                                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-theme-primary/20 border border-theme-primary/40 text-xs font-bold tracking-[0.2em] text-theme-primary uppercase backdrop-blur-md shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)]">
                                        <Sparkles size={14} /> Founder, CEO & Architect
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TECH STACK MODAL (Boss Level Details) */}
            <AnimatePresence>
                {selectedTech && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedTech(null)}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl bg-theme-surface border border-theme-border rounded-[2rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-default overflow-hidden group"
                        >
                            {/* Background Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-10 pointer-events-none" style={{ backgroundColor: selectedTech.color }}></div>

                            <button
                                onClick={() => setSelectedTech(null)}
                                className="absolute top-6 right-6 w-10 h-10 bg-theme-bg border border-theme-border rounded-full flex items-center justify-center text-theme-text-muted hover:text-theme-text hover:bg-theme-surface-hover hover:border-theme-primary transition-all z-10"
                            >
                                <X size={20} />
                            </button>
                            
                            <div className="relative z-10">
                                <div className="w-20 h-20 rounded-3xl bg-theme-bg border border-theme-border shadow-inner flex items-center justify-center mb-6" style={{ color: selectedTech.color, boxShadow: `0 0 30px ${selectedTech.color}20` }}>
                                    <selectedTech.icon size={40} />
                                </div>
                                
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-bg border border-theme-border text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-sm" style={{ color: selectedTech.color }}>
                                    {selectedTech.domain}
                                </div>
                                
                                <h2 className="text-3xl md:text-5xl font-black text-theme-text mb-2 tracking-tight">{selectedTech.name}</h2>
                                <h3 className="text-lg font-bold mb-8 tracking-widest uppercase" style={{ color: selectedTech.color }}>{selectedTech.level}</h3>
                                
                                <p className="text-theme-text-muted leading-relaxed text-lg mb-8">
                                    {selectedTech.description}
                                </p>
                                
                                <div>
                                    <h4 className="text-sm font-bold text-theme-text uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Zap size={16} style={{ color: selectedTech.color }} /> Core Arsenal
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedTech.skills.map((skill, idx) => (
                                            <span key={idx} className="px-4 py-2 bg-theme-bg border border-theme-border shadow-inner rounded-xl text-theme-text font-medium text-sm hover:border-theme-primary transition-colors cursor-default">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Dev;
