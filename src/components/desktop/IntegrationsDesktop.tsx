"use client";

import React from 'react';
import { motion } from 'framer-motion';

const INTEGRATIONS = [
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-line.svg" },
    { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-plain.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-plain.svg" },
    { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-plain.svg" },
    { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-plain.svg" },
    { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-plain.svg" },
    { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
    { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-plain.svg" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain.svg" },
    { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-plain.svg" }
];

export default function IntegrationsDesktop() {
    return (
        <section className="py-32 overflow-hidden relative">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-20 mb-16 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block px-3 py-1 rounded-full bg-theme-text/5 border border-theme-border text-[10px] uppercase tracking-[0.2em] font-medium text-theme-text mb-6"
                >
                    Infrastructure
                </motion.div>
                
                <motion.h2 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl lg:text-5xl font-black tracking-tight text-theme-text"
                >
                    Synthesized from the DNA of Giants.
                </motion.h2>
            </div>

            {/* Seamless Doppelrand Marquee */}
            <div className="w-full max-w-[1600px] mx-auto px-4 md:px-10">
                <div className="doppelrand-outer overflow-hidden relative">
                    <div className="doppelrand-inner py-12 flex relative overflow-hidden">
                        
                        {/* Gradient Fade Edges */}
                        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[rgb(var(--color-bg))] to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[rgb(var(--color-bg))] to-transparent z-10 pointer-events-none"></div>

                        {/* Scrolling Track */}
                        <motion.div 
                            className="flex items-center gap-16 md:gap-32 w-max px-16"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        >
                            {/* Duplicate array for seamless infinite scroll */}
                            {[...INTEGRATIONS, ...INTEGRATIONS].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-4 group opacity-50 hover:opacity-100 transition-opacity duration-500 min-w-[120px]">
                                    {/* Logo filter applied based on theme */}
                                    <div className="w-16 h-16 relative flex items-center justify-center">
                                        <img 
                                            src={item.logo} 
                                            alt={item.name} 
                                            className="w-full h-full object-contain logo-adaptive transition-transform duration-700 ease-awwwards group-hover:scale-110" 
                                            onError={(e) => {
                                                // Fallback if logo doesn't exist
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement!.innerHTML = `<span class="text-2xl font-bold text-theme-text">${item.name[0]}</span>`;
                                            }}
                                        />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-theme-text-muted">{item.name}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
