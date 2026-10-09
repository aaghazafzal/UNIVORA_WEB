import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { getAIResponse } from '../services/aiService';

const AIAssistant = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I am Univora AI. How can I assist you with the ecosystem today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [usageCount, setUsageCount] = useState(0);
    const DAILY_LIMIT = 15;
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Initialize or reset daily usage limit
        const today = new Date().toISOString().split('T')[0];
        const stored = JSON.parse(localStorage.getItem('univora_ai_usage')) || { count: 0, date: today };
        
        if (stored.date !== today) {
            stored.count = 0;
            stored.date = today;
            localStorage.setItem('univora_ai_usage', JSON.stringify(stored));
        }
        setUsageCount(stored.count);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim() || isLoading || usageCount >= DAILY_LIMIT) return;

        const userMsg = { role: 'user', content: input.trim() };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            // Optionally strip out the initial greeting to save tokens
            const apiMessages = newMessages.filter(m => m.role !== 'assistant' || m.content !== "Hello! I am Univora AI. How can I assist you with the ecosystem today?");
            
            
            const replyContent = await getAIResponse(apiMessages);
            setMessages(prev => [...prev, { role: 'assistant', content: replyContent }]);
            
            // Increment Usage
            const newCount = usageCount + 1;
            setUsageCount(newCount);
            localStorage.setItem('univora_ai_usage', JSON.stringify({
                count: newCount,
                date: new Date().toISOString().split('T')[0]
            }));
            
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: error.message?.includes('Rate limit') ? "Daily limit reached. Please try again tomorrow." : "Connection to the neural network failed. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderContent = (content) => {
        // Regex to split by [img:url] or [btn:text:url]
        const parts = content.split(/(\[img:.*?\]|\[btn:.*?:.*?\])/g);
        
        return parts.map((part, index) => {
            if (part.startsWith('[img:') && part.endsWith(']')) {
                const url = part.slice(5, -1);
                return (
                    <div key={index} className="flex justify-center my-4">
                        <img 
                            src={url} 
                            alt="Reference" 
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-[3px] border-theme-primary/50 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)]" 
                            onError={(e) => { e.target.src = '/logos/png-logos/univora.png' }} 
                        />
                    </div>
                );
            }
            if (part.startsWith('[btn:') && part.endsWith(']')) {
                const inner = part.slice(5, -1);
                const firstColon = inner.indexOf(':');
                if (firstColon !== -1) {
                    const text = inner.substring(0, firstColon);
                    const url = inner.substring(firstColon + 1);
                    return (
                        <div key={index} className="my-2">
                            <a 
                                href={url} 
                                target={url.startsWith('http') ? '_blank' : '_self'} 
                                rel="noopener noreferrer" 
                                className="inline-block px-4 py-2 bg-theme-primary/10 hover:bg-theme-primary/20 text-theme-primary border border-theme-primary/30 rounded-xl transition-all font-bold text-xs shadow-sm hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.2)]"
                            >
                                {text}
                            </a>
                        </div>
                    );
                }
            }
            
            return (
                <span key={index}>
                    {part.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            {i !== part.split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </span>
            );
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-24 right-4 md:bottom-6 md:right-6 w-[calc(100vw-32px)] md:w-[450px] h-[600px] max-h-[80vh] z-[100] bg-theme-surface/90 backdrop-blur-2xl border border-theme-border rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-theme-border bg-theme-surface/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-theme-primary/20 flex items-center justify-center border border-theme-primary/30">
                                <Sparkles size={20} className="text-theme-primary animate-pulse" />
                            </div>
                            <div>
                                <h3 className="font-bold text-theme-text text-lg">Univora AI</h3>
                                <p className="text-xs text-theme-text-muted font-medium flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-theme-text-muted hover:text-theme-text hover:bg-theme-surface-hover p-2 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-theme-bg/30">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-500/20 text-blue-400' : 'bg-theme-primary/20 text-theme-primary'}`}>
                                        {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                    </div>
                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-theme-primary text-white rounded-tr-sm' : 'bg-theme-surface border border-theme-border text-theme-text rounded-tl-sm'}`}>
                                        {renderContent(msg.content)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {isLoading && (
                            <div className="flex justify-start w-full">
                                <div className="flex gap-3 max-w-[85%]">
                                    <div className="w-8 h-8 rounded-full bg-theme-primary/20 text-theme-primary flex items-center justify-center shrink-0">
                                        <Bot size={16} />
                                    </div>
                                    <div className="p-4 rounded-2xl bg-theme-surface border border-theme-border text-theme-text rounded-tl-sm flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin text-theme-primary" />
                                        <span className="text-xs text-theme-text-muted font-medium">Processing request...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="relative p-4 bg-theme-surface/80 border-t border-theme-border">
                        {/* Progress Line */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-theme-bg">
                            <div 
                                className={`h-full transition-all duration-500 shadow-[0_0_10px_currentColor] ${
                                    (usageCount / DAILY_LIMIT) > 0.85 ? 'bg-red-500 text-red-500' :
                                    (usageCount / DAILY_LIMIT) > 0.5 ? 'bg-yellow-500 text-yellow-500' :
                                    'bg-theme-primary text-theme-primary'
                                }`} 
                                style={{ width: `${Math.min((usageCount / DAILY_LIMIT) * 100, 100)}%` }}
                            ></div>
                        </div>

                        <form onSubmit={handleSend} className="relative flex items-center mt-2">
                            <input 
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={usageCount >= DAILY_LIMIT ? "Daily limit reached. Resets tomorrow." : "Ask Univora AI..."}
                                disabled={usageCount >= DAILY_LIMIT}
                                className="w-full bg-theme-bg border border-theme-border rounded-full py-3 pl-5 pr-12 text-sm text-theme-text focus:outline-none focus:border-theme-primary/50 focus:ring-1 focus:ring-theme-primary/50 transition-all placeholder:text-theme-text-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <button 
                                type="submit" 
                                disabled={!input.trim() || isLoading || usageCount >= DAILY_LIMIT}
                                className="absolute right-2 w-8 h-8 rounded-full bg-theme-primary text-white flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:hover:bg-theme-primary disabled:cursor-not-allowed"
                            >
                                <Send size={14} className="-ml-0.5" />
                            </button>
                        </form>
                        <div className="text-[10px] text-center mt-2 text-theme-text-muted font-medium tracking-wider uppercase opacity-70">
                            {usageCount >= DAILY_LIMIT ? 'Limit Exceeded' : `${DAILY_LIMIT - usageCount} messages remaining today`}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AIAssistant;
