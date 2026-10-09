import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { faqData, faqCategories } from '../data/faqData';

const Faq = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedId, setExpandedId] = useState(null);

    const filteredFaqs = activeCategory === 'all' 
        ? faqData 
        : faqData.filter(faq => faq.categoryId === activeCategory);

    const toggleFaq = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-theme-primary/10 blur-[120px] rounded-full pointer-events-none z-0" />

            <div className="max-w-4xl mx-auto relative z-10">
                
                {/* Header Section */}
                <div className="text-center mb-16 relative">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-surface border border-theme-border text-theme-primary text-sm font-bold tracking-widest uppercase mb-6 shadow-lg shadow-theme-primary/10"
                    >
                        <HelpCircle size={16} />
                        <span>Support Center</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-theme-text"
                    >
                        Frequently Asked <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-blue-500">
                            Questions
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-theme-text-muted max-w-2xl mx-auto leading-relaxed"
                    >
                        Everything you need to know about the Univora Ecosystem, Bots, Apps, and Security.
                    </motion.p>
                </div>

                {/* Category Filters */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center justify-center gap-3 mb-12"
                >
                    {faqCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => {
                                setActiveCategory(category.id);
                                setExpandedId(null); // Reset expansion on filter change
                            }}
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                                activeCategory === category.id 
                                ? 'bg-theme-primary text-white shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)] scale-105 border border-theme-primary'
                                : 'bg-theme-surface text-theme-text-muted border border-theme-border hover:border-theme-primary/50 hover:text-theme-text hover:bg-theme-surface-hover'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </motion.div>

                {/* FAQ Accordions */}
                <motion.div 
                    layout
                    className="space-y-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredFaqs.map((faq, index) => {
                            const isExpanded = expandedId === faq.id;

                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    key={faq.id}
                                    className={`bg-theme-surface border rounded-2xl overflow-hidden transition-colors duration-300 ${
                                        isExpanded ? 'border-theme-primary shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.15)]' : 'border-theme-border hover:border-theme-primary/50'
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                    >
                                        <span className={`text-lg md:text-xl font-bold pr-8 transition-colors duration-300 ${isExpanded ? 'text-theme-primary' : 'text-theme-text'}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-theme-primary text-white rotate-180' : 'bg-theme-bg text-theme-text-muted border border-theme-border'}`}>
                                            <ChevronDown size={20} />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                            >
                                                <div className="px-6 pb-6 pt-2 text-theme-text-muted leading-relaxed text-base md:text-lg">
                                                    <p>{faq.answer}</p>
                                                    
                                                    {/* Rich Image Display if available */}
                                                    {faq.image && (
                                                        <motion.div 
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.2 }}
                                                            className="mt-6 rounded-xl overflow-hidden border border-theme-border bg-theme-bg p-2 shadow-inner"
                                                        >
                                                            <img 
                                                                src={faq.image} 
                                                                alt={faq.question} 
                                                                className="w-full h-auto rounded-lg object-cover"
                                                                loading="lazy"
                                                            />
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {filteredFaqs.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Sparkles size={48} className="mx-auto text-theme-text-muted mb-4 opacity-50" />
                            <h3 className="text-2xl font-bold text-theme-text mb-2">No Questions Found</h3>
                            <p className="text-theme-text-muted">There are no FAQs in this category yet.</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Faq;
