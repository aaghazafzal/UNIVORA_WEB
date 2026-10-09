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

export default function IntegrationsMobile() {
    return (
        <section className="py-20 overflow-hidden relative">
            <div className="px-6 mb-12 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block px-3 py-1 rounded-full bg-theme-text/5 border border-theme-border text-[9px] uppercase tracking-[0.2em] font-medium text-theme-text mb-6"
                >
                    Infrastructure
                </motion.div>
                
                <motion.h2 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl font-black tracking-tight text-theme-text"
                >
                    Synthesized from<br />the DNA of Giants.
                </motion.h2>
            </div>

            {/* Seamless Doppelrand Marquee */}
            <div className="w-full px-4">
                <div className="doppelrand-outer overflow-hidden relative">
                    <div className="doppelrand-inner py-8 flex relative overflow-hidden">
                        
                        {/* Gradient Fade Edges */}
                        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[rgb(var(--color-bg))] to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[rgb(var(--color-bg))] to-transparent z-10 pointer-events-none"></div>

                        {/* Scrolling Track */}
                        <motion.div 
                            className="flex items-center gap-12 w-max px-8"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            {/* Duplicate array for seamless infinite scroll */}
                            {[...INTEGRATIONS, ...INTEGRATIONS].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-3 group opacity-70 min-w-[80px]">
                                    {/* Logo filter applied based on theme */}
                                    <div className="w-10 h-10 relative flex items-center justify-center">
                                        <img 
                                            src={item.logo} 
                                            alt={item.name} 
                                            className="w-full h-full object-contain logo-adaptive" 
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement!.innerHTML = `<span class="text-xl font-bold text-theme-text">${item.name[0]}</span>`;
                                            }}
                                        />
                                    </div>
                                    <span className="text-[8px] uppercase tracking-widest font-bold text-theme-text-muted">{item.name}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
