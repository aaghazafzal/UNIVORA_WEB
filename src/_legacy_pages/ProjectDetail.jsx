import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { detailsData as projects } from '../data/detailsData';
import { ChevronLeft, ChevronRight, ExternalLink, ShieldCheck, Zap, Globe, Cpu, Server, Activity, ArrowRight, Layers, Star, DownloadCloud, Code, FileText, CheckCircle2, Play, Eye, Smartphone, X } from 'lucide-react';
import AdaptiveImage from '../components/AdaptiveImage';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [viewMode, setViewMode] = useState('mobile'); // 'mobile' | 'laptop'
    
    // Gallery Scroll State
    const galleryRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null); // { url, type }
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const [isHoveringGallery, setIsHoveringGallery] = useState(false);

    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    useEffect(() => {
        const found = projects.find(p => p.id === id);
        if (found) {
            setProject(found);
            if (found.mobileScreenshots && found.mobileScreenshots.length > 0) {
                setViewMode('mobile');
            } else {
                setViewMode('laptop');
            }
            window.scrollTo(0, 0);
            document.title = `${found.name} - Official Univora Module`;
        }
    }, [id]);

    const updateArrows = () => {
        if (galleryRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
            setShowLeftArrow(scrollLeft > 5);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
        }
    };

    useEffect(() => {
        // Wait a tick for images to render/size
        setTimeout(updateArrows, 100);
        window.addEventListener('resize', updateArrows);
        return () => window.removeEventListener('resize', updateArrows);
    }, [project, viewMode]);

    const scrollGallery = (direction) => {
        if (galleryRef.current) {
            const scrollAmount = direction === 'left' ? -500 : 500;
            galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!project) return <div className="min-h-screen flex items-center justify-center text-theme-text font-mono bg-theme-bg">Initializing Module...</div>;

    const Icon = project.icon;

    let btnText = "INITIALIZE MODULE";
    if (project.type === 'App') btnText = "DOWNLOAD APP";
    else if (project.type === 'Website' || project.type === 'Platform') btnText = "LAUNCH PLATFORM";
    else if (project.type === 'Telegram Bot') btnText = "START BOT";

    return (
        <div className="min-h-screen bg-theme-bg font-sans selection:bg-[var(--color-primary)] selection:text-[var(--color-bg)] flex flex-col overflow-x-hidden">
            
            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vh] opacity-[0.05] blur-[120px] rounded-full transition-colors duration-1000" style={{ backgroundColor: project.color }} />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vh] opacity-[0.03] blur-[100px] rounded-full transition-colors duration-1000" style={{ backgroundColor: project.color }} />
            </div>

            <main className="relative z-10 flex-grow w-full pt-28 pb-20">
                
                {/* 1. HERO SECTION (Split Layout) */}
                <section className="max-w-7xl mx-auto px-6 mb-32 md:mb-40">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        
                        {/* Left: Info & Actions */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ duration: 0.6 }}
                            className="flex flex-col items-start text-left"
                        >
                            <Link to="/#ecosystem" className="inline-flex items-center gap-2 text-theme-text-muted hover:text-theme-primary mb-8 transition-colors group text-sm font-bold tracking-widest">
                                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> RETURN TO ECOSYSTEM
                            </Link>

                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-theme-surface-hover/80 backdrop-blur-md border border-theme-border text-xs font-bold text-theme-text uppercase tracking-widest mb-6">
                                <Code size={14} /> {project.type}
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-theme-text leading-[1.1]">
                                {project.name}
                            </h1>
                            
                            <h2 className="text-xl md:text-2xl text-theme-text font-semibold mb-6 max-w-lg leading-snug">
                                {project.tagline}
                            </h2>

                            <p className="text-lg text-theme-text-muted mb-10 max-w-xl leading-relaxed">
                                {project.description}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <a 
                                    href={project.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="px-8 py-4 bg-theme-text text-theme-bg font-extrabold text-base rounded-2xl hover:opacity-80 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.2)] group"
                                >
                                    <DownloadCloud size={20} className="group-hover:-translate-y-1 transition-transform" /> 
                                    {btnText}
                                </a>
                                <a 
                                    href="#"
                                    className="px-8 py-4 bg-theme-surface-hover border border-theme-border text-theme-text font-bold text-base rounded-2xl hover:border-theme-primary/50 hover:bg-theme-surface hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
                                >
                                    <Play size={20} className="text-theme-text-muted group-hover:text-theme-primary transition-colors" />
                                    Try Demo
                                </a>
                            </div>
                        </motion.div>

                        {/* Right: Mockup/Hero Image */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative flex justify-center items-center perspective-1000"
                        >
                            <div className="absolute inset-0 bg-theme-surface-hover/50 blur-3xl rounded-full opacity-60" style={{ backgroundColor: `${project.color}15` }}></div>
                            
                            {project.heroImage ? (
                                <div className="relative z-10 w-full aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden border border-theme-border shadow-2xl transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 bg-theme-surface group">
                                    {project.heroImage.includes('png-heroimg') ? (
                                        <AdaptiveImage 
                                            src={project.heroImage} 
                                            alt={`${project.name} Interface`} 
                                            className="w-full h-full relative z-0 transition-transform duration-1000 p-8 group-hover:scale-105" 
                                        />
                                    ) : (
                                        <img 
                                            src={project.heroImage} 
                                            alt={`${project.name} Interface`} 
                                            className="w-full h-full relative z-0 transition-transform duration-1000 object-cover group-hover:scale-105" 
                                        />
                                    )}
                                    
                                    {/* Floating Glassmorphic Logo Badge */}
                                    <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10 pointer-events-none">
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-theme-bg/60 backdrop-blur-2xl border border-theme-border rounded-[1.5rem] flex items-center justify-center shadow-2xl transform group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500" style={{ boxShadow: `0 20px 40px ${project.color}30` }}>
                                            {project.imageIcon ? (
                                                project.imageIcon.includes('png-logos') ? (
                                                    <AdaptiveImage 
                                                        src={project.imageIcon} 
                                                        alt={`${project.name} Logo`} 
                                                        className="w-12 h-12 md:w-14 md:h-14 drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <img 
                                                        src={project.imageIcon} 
                                                        alt={`${project.name} Logo`} 
                                                        className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                )
                                            ) : (
                                                <Icon size={40} color={project.color} className="drop-shadow-xl" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative z-10 w-full max-w-md aspect-square rounded-[3rem] bg-theme-surface border border-theme-border shadow-2xl flex items-center justify-center transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 overflow-hidden group">
                                    <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at center, ${project.color}, transparent 70%)` }}></div>
                                    {project.imageIcon ? (
                                        project.imageIcon.includes('png-logos') ? (
                                            <AdaptiveImage 
                                                src={project.imageIcon} 
                                                alt={project.name} 
                                                className="w-24 h-24 sm:w-32 sm:h-32 shadow-2xl group-hover:scale-110 transition-transform duration-700 relative z-10" 
                                            />
                                        ) : (
                                            <img src={project.imageIcon} alt={project.name} className="w-40 h-40 rounded-3xl object-cover shadow-2xl group-hover:scale-110 transition-transform duration-700 relative z-10" />
                                        )
                                    ) : (
                                        <Icon size={120} color={project.color} className="drop-shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.3)] group-hover:scale-110 transition-transform duration-700 relative z-10" />
                                    )}
                                </div>
                            )}
                        </motion.div>

                    </div>
                </section>

                {/* 2. STATS BAR */}
                <section className="border-y border-theme-border bg-theme-surface-hover/30 backdrop-blur-md mb-32">
                    <div className="max-w-7xl mx-auto px-6 py-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {project.stats?.map((stat, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <span className="text-theme-text-muted text-sm font-bold uppercase tracking-[0.2em]">{stat.label}</span>
                                    <span className="text-3xl md:text-4xl font-black text-theme-text tracking-tight">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. FEATURES GRID */}
                <section className="max-w-7xl mx-auto px-6 mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-theme-text">Features</h2>
                        <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
                            Discover all the capabilities that make {project.name} the most advanced module in its class.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {project.features?.map((feature, i) => {
                            const FeatureIcon = feature.icon || Zap;
                            return (
                                <div 
                                    key={i} 
                                    className="bg-theme-surface border border-theme-border hover:border-theme-primary/50 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-theme-primary/5 group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-theme-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-theme-border/50" style={{ color: project.color }}>
                                        <FeatureIcon size={22} />
                                    </div>
                                    <h3 className="text-xl font-bold text-theme-text mb-4 leading-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-theme-text-muted text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 4. SCREENSHOTS & MEDIA (DUAL DEVICE) */}
                {((project.mobileScreenshots && project.mobileScreenshots.length > 0) || (project.laptopScreenshots && project.laptopScreenshots.length > 0)) && (
                    <section className="max-w-7xl mx-auto px-6 mb-32">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-black mb-6 text-theme-text">Interface Preview</h2>
                            <p className="text-lg text-theme-text-muted max-w-2xl mx-auto mb-8">
                                A visual glimpse into the {project.name} environment.
                            </p>
                            
                            {/* Device Toggler - Only show if BOTH exist */}
                            {project.mobileScreenshots?.length > 0 && project.laptopScreenshots?.length > 0 && (
                                <div className="inline-flex p-1.5 rounded-2xl bg-theme-surface border border-theme-border shadow-inner mx-auto">
                                    <button
                                        onClick={() => setViewMode('mobile')}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${viewMode === 'mobile' ? 'bg-theme-bg shadow-md text-theme-text border border-theme-border' : 'text-theme-text-muted hover:text-theme-text'}`}
                                    >
                                        <Smartphone size={18} /> Mobile View
                                    </button>
                                    <button
                                        onClick={() => setViewMode('laptop')}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${viewMode === 'laptop' ? 'bg-theme-bg shadow-md text-theme-text border border-theme-border' : 'text-theme-text-muted hover:text-theme-text'}`}
                                    >
                                        <Globe size={18} /> Desktop View
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        {/* SCROLLABLE GALLERY WRAPPER */}
                        <div 
                            className="relative"
                            onMouseEnter={() => setIsHoveringGallery(true)}
                            onMouseLeave={() => setIsHoveringGallery(false)}
                        >
                            {/* Navigation Arrows (For Both Views on Hover) */}
                            {isHoveringGallery && showLeftArrow && (
                                <button 
                                    onClick={() => scrollGallery('left')}
                                    className="absolute left-[10px] md:left-[-40px] top-1/2 -translate-y-1/2 z-30 p-3 bg-theme-surface/80 backdrop-blur-md border border-theme-border rounded-full shadow-2xl text-theme-text hover:bg-theme-bg hover:text-[rgba(var(--color-primary-rgb),1)] transition-all transform hover:scale-110"
                                >
                                    <ChevronLeft size={32} />
                                </button>
                            )}
                            {isHoveringGallery && showRightArrow && (
                                <button 
                                    onClick={() => scrollGallery('right')}
                                    className="absolute right-[10px] md:right-[-40px] top-1/2 -translate-y-1/2 z-30 p-3 bg-theme-surface/80 backdrop-blur-md border border-theme-border rounded-full shadow-2xl text-theme-text hover:bg-theme-bg hover:text-[rgba(var(--color-primary-rgb),1)] transition-all transform hover:scale-110"
                                >
                                    <ChevronRight size={32} />
                                </button>
                            )}

                            {/* SCROLL CONTAINER */}
                            <div 
                                ref={galleryRef}
                                onScroll={updateArrows}
                                className={`flex overflow-x-auto gap-6 pb-8 pt-4 no-scrollbar ${viewMode === 'mobile' ? 'snap-x snap-mandatory px-4 md:px-0' : 'px-4 md:px-0'}`}
                            >
                                {viewMode === 'mobile' 
                                    ? project.mobileScreenshots?.map((imgUrl, i) => (
                                        <motion.div 
                                            key={`mob-${i}`}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            onClick={() => setSelectedImage({ url: imgUrl, type: 'mobile' })}
                                            className="group relative flex-none w-[85%] sm:w-[45%] md:w-[30%] lg:w-[22%] rounded-[2.5rem] overflow-hidden border-[6px] border-theme-surface bg-theme-bg shadow-[0_0_30px_rgba(0,0,0,0.15)] aspect-[9/19] flex items-center justify-center transform transition-transform duration-500 hover:-translate-y-2 snap-center cursor-pointer"
                                        >
                                            {/* Premium phone frame inner shadow/glow */}
                                            <div className="absolute inset-0 border border-theme-border rounded-[2.2rem] z-10 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]"></div>
                                            
                                            <img 
                                                src={imgUrl} 
                                                alt={`${project.name} Mobile Preview ${i+1}`} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-20">
                                                <Eye size={32} className="text-white drop-shadow-lg" />
                                            </div>
                                        </motion.div>
                                    ))
                                    : project.laptopScreenshots?.map((imgUrl, i) => (
                                        <motion.div 
                                            key={`lap-${i}`}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            onClick={() => setSelectedImage({ url: imgUrl, type: 'laptop' })}
                                            className="group relative flex-none w-[90%] md:w-[60%] lg:w-[45%] rounded-[1.5rem] overflow-hidden border border-theme-border bg-theme-surface shadow-lg aspect-video flex items-center justify-center transform transition-transform duration-500 hover:-translate-y-2 cursor-pointer"
                                        >
                                            <img 
                                                src={imgUrl} 
                                                alt={`${project.name} Desktop Preview ${i+1}`} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-20">
                                                <Eye size={32} className="text-white drop-shadow-lg" />
                                            </div>
                                        </motion.div>
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                )}

                {/* 5. PLATFORMS & DOWNLOADS */}
                <section className="max-w-7xl mx-auto px-6 mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-theme-text">Access & Integration</h2>
                        <p className="text-lg text-theme-text-muted max-w-2xl mx-auto">
                            Connect to the latest stable release of {project.name} across our supported platforms.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Primary Platform Card */}
                        <div className="bg-theme-surface border border-theme-border rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between shadow-lg">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-theme-bg border border-theme-border flex items-center justify-center text-theme-text">
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-theme-text">{project.type}</h3>
                                        <p className="text-sm text-theme-text-muted">Access the primary platform directly.</p>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3 mb-8">
                                    <span className="px-3 py-1 bg-theme-bg text-theme-text rounded-lg text-xs font-bold border border-theme-border">Stable Release</span>
                                    <span className="px-3 py-1 bg-theme-primary/10 text-theme-primary rounded-lg text-xs font-bold border" style={{ borderColor: `${project.color}30` }}>v3.0.4</span>
                                </div>

                                <div className="flex gap-6 mb-10 border-b border-theme-border pb-6">
                                    <a href="#" className="flex items-center gap-2 text-sm font-semibold hover:text-theme-text transition-colors text-theme-text-muted">
                                        <FileText size={16} /> View Changelog
                                    </a>
                                    <a href="#" className="flex items-center gap-2 text-sm font-semibold hover:text-theme-text transition-colors text-theme-text-muted">
                                        <Activity size={16} /> System Status
                                    </a>
                                </div>
                            </div>
                            
                            <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-full py-4 bg-theme-text hover:opacity-90 text-theme-bg font-bold rounded-2xl flex items-center justify-center gap-3 transition-all"
                            >
                                <ExternalLink size={20} />
                                Initialize Connection
                            </a>
                        </div>

                        {/* Secondary Tech Stack Card */}
                        <div className="bg-theme-surface border border-theme-border rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-lg">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-theme-surface-hover/50 blur-[80px] rounded-full pointer-events-none" style={{ backgroundColor: `${project.color}40` }}></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-theme-bg border border-theme-border flex items-center justify-center text-theme-text">
                                        <Cpu size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-theme-text">Architecture Core</h3>
                                        <p className="text-sm text-theme-text-muted">Frameworks powering this module.</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 mb-8">
                                    {project.techSpecs?.map((tech, i) => (
                                        <span key={i} className="px-4 py-2 bg-theme-bg border border-theme-border text-theme-text-muted rounded-xl text-sm font-semibold flex items-center gap-2">
                                            <CheckCircle2 size={14} className="text-theme-primary" /> {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="relative z-10 mt-10 p-6 bg-theme-bg rounded-2xl border border-theme-border flex items-center justify-between">
                                <div>
                                    <h4 className="text-theme-text font-bold mb-1">Development Status</h4>
                                    <p className="text-xs text-theme-text-muted">Active maintenance & updates.</p>
                                </div>
                                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 5. COMMUNITY / OPEN SOURCE */}
                <section className="max-w-7xl mx-auto px-6">
                    <div className="bg-theme-surface border border-theme-border rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-lg">
                        
                        {/* Abstract Background pattern */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-text) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                        
                        <div className="relative z-10 max-w-xl">
                            <span className="inline-block px-3 py-1 bg-theme-bg border border-theme-border text-xs font-bold text-theme-text-muted rounded-full mb-6 tracking-widest uppercase">
                                Community Driven
                            </span>
                            <h2 className="text-4xl font-black text-theme-text mb-6">Univora Ecosystem</h2>
                            <p className="text-theme-text-muted text-lg mb-8 leading-relaxed">
                                {project.name} is built as part of the advanced Univora ecosystem. We prioritize performance, security, and seamless integration to provide you with the best tools.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="#" className="px-6 py-3 bg-theme-text text-theme-bg font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2">
                                    <Star size={18} /> Rate Module
                                </a>
                                <a href="#" className="px-6 py-3 bg-theme-bg border border-theme-border text-theme-text font-bold rounded-xl hover:bg-theme-surface-hover transition-colors">
                                    Private License
                                </a>
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-col gap-4 min-w-[280px]">
                            <div className="p-5 bg-theme-bg border border-theme-border rounded-2xl flex items-center gap-4">
                                <div className="w-12 h-12 bg-theme-primary flex items-center justify-center text-theme-bg font-bold text-xl rounded-full shadow-lg">
                                    U
                                </div>
                                <div>
                                    <h4 className="text-theme-text font-bold">Univora Labs</h4>
                                    <p className="text-xs text-theme-text-muted">Core Development</p>
                                </div>
                            </div>
                            <div className="p-5 bg-theme-bg border border-theme-border rounded-2xl flex items-center justify-between">
                                <span className="text-sm font-semibold text-theme-text-muted flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-theme-primary" /> Verified Secure
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* IMAGE PREVIEW MODAL */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md" 
                        onClick={() => setSelectedImage(null)}
                    >
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] p-2 md:p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/20"
                        >
                            <X size={24} />
                        </button>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`relative w-full flex items-center justify-center ${selectedImage.type === 'mobile' ? 'max-w-[400px]' : 'max-w-6xl'}`}
                        >
                            {selectedImage.type === 'mobile' ? (
                                <div className="relative w-full aspect-[9/19] rounded-[3rem] overflow-hidden border-[8px] border-theme-surface shadow-[0_0_50px_rgba(var(--color-primary-rgb),0.3)] bg-theme-bg">
                                    {/* Fake mobile notch/dynamic island */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[25px] bg-theme-surface border-b border-x border-theme-border rounded-b-[1rem] z-20"></div>
                                    <img src={selectedImage.url} alt="Mobile Preview Full" className="w-full h-full object-cover relative z-10" />
                                </div>
                            ) : (
                                <div className="relative w-full aspect-video rounded-xl md:rounded-[2rem] overflow-hidden border-2 border-theme-border shadow-[0_0_50px_rgba(var(--color-primary-rgb),0.3)] bg-theme-bg">
                                    <img src={selectedImage.url} alt="Laptop Preview Full" className="w-full h-full object-contain md:object-cover" />
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default ProjectDetail;
