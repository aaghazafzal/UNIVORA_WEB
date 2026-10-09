import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, ChevronRight, Activity, Globe, Shield, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { detailsData as projects } from '../data/detailsData';

const COMMANDS = {
    help: "Available commands: help, list, open [project], dashboard, launch [project], status, scan, theme [color], credentials, clear, exit",
    list: "Available Modules: cinemahub, groovia, notora, skillora, bots",
    whoami: "User: GUEST_ACCESS | Clearance: LEVEL_1 | Node: UNIDENTIFIED",
    status: "SYSTEM OPTIMAL. NETWORK: SECURE. [Hint: Type 'dashboard' for live visual metrics]",
    about: "Univora is a decentralized hub connecting high-utility web protocols.",
};

const THEMES = {
    orange: 'text-theme-primary',
    green: 'text-green-500',
    blue: 'text-blue-500',
    red: 'text-red-500',
    purple: 'text-purple-500',
    white: 'text-theme-text',
};

const Terminal = ({ isOpen, onClose }) => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([
        { type: 'system', content: "UNIVORA KERNEL v4.1.0 INITIALIZED..." },
        { type: 'system', content: "Connection established. Secure channel active." },
        { type: 'info', content: "Type 'help' for available commands." }
    ]);
    const [themeColor, setThemeColor] = useState('text-theme-primary');
    const inputRef = useRef(null);
    const bottomRef = useRef(null);
    const navigate = useNavigate();

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = async (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        if (!trimmedCmd) return;

        // Add user input to history (always user color, or theme color?)
        // Let's keep user input distinct or theme based.
        setHistory(prev => [...prev, { type: 'user', content: cmd, color: themeColor }]);

        // Process command
        let response = { type: 'output', content: "" };
        const args = trimmedCmd.split(" ");
        const mainCmd = args[0];

        switch (mainCmd) {
            case 'help':
                response.content = COMMANDS.help;
                break;
            case 'list':
                response.content = COMMANDS.list;
                break;
            case 'whoami':
                response.content = COMMANDS.whoami;
                break;
            case 'status':
                response.type = 'success';
                response.content = COMMANDS.status;
                break;
            case 'about':
                response.content = COMMANDS.about;
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'exit':
                onClose();
                return;
            case 'credentials':
                response.type = 'info';
                response.content = "Developer: Rolex Sir | Telegram: https://t.me/+aAGIRpHjBVdkNGJl | Instagram: https://www.instagram.com/univora8?igsh=MTl2cjR3eXF3c2Vqbw==";
                break;

            case 'theme':
                if (args[1] && THEMES[args[1]]) {
                    setThemeColor(THEMES[args[1]]);
                    response.type = 'success';
                    response.content = `Terminal theme updated to ${args[1].toUpperCase()}.`;
                } else {
                    response.type = 'error';
                    response.content = "Usage: theme [color]. key: orange, green, blue, red, purple, white.";
                }
                break;

            case 'scan':
                setHistory(prev => [...prev, { type: 'info', content: "Initiating full system diagnostic..." }]);
                await new Promise(r => setTimeout(r, 800));
                setHistory(prev => [...prev, { type: 'info', content: "Scanning network nodes... [32%]" }]);
                await new Promise(r => setTimeout(r, 800));
                setHistory(prev => [...prev, { type: 'info', content: "Verifying encryption protocols... [78%]" }]);
                await new Promise(r => setTimeout(r, 800));
                response.type = 'success';
                response.content = "Scan Complete. No vulnerabilities detected. System Integrity: 100%.";
                break;

            case 'dashboard':
            case 'metrics':
                response.type = 'success';
                response.content = "Initializing interface... Loading System Health Dashboard.";
                setTimeout(() => {
                    navigate('/status');
                    onClose();
                }, 800);
                break;

            case 'open':
            case 'go':
                if (args[1]) {
                    const project = args[1].toLowerCase();

                    // Special case for dashboard
                    if (project === 'status' || project === 'dashboard' || project === 'metrics') {
                        handleCommand('dashboard');
                        return;
                    }

                    // Find partial match
                    const targetProject = projects.find(p => p.id.toLowerCase().includes(project)) ||
                        (project.includes('bot') ? projects.find(p => p.id === 'telegram-bots') : null);

                    if (targetProject) {
                        response.type = 'success';
                        response.content = `Accessing internal grid: ${targetProject.name.toUpperCase()}...`;
                        setTimeout(() => {
                            navigate(`/project/${targetProject.id}`);
                            onClose();
                        }, 800);
                    } else {
                        response.type = 'error';
                        response.content = `Error: Module '${project}' not recognized.`;
                    }
                } else {
                    response.type = 'error';
                    response.content = "Usage: open [module]. Example: open cinemahub";
                }
                break;

            case 'launch':
                if (args[1]) {
                    const projectId = args[1];
                    const targetProject = projects.find(p => p.id.toLowerCase().includes(projectId)) ||
                        (projectId.includes('bot') ? projects.find(p => p.id === 'telegram-bots') : null);

                    if (targetProject) {
                        if (targetProject.link && targetProject.link !== '#') {
                            response.type = 'success';
                            response.content = `Bypassing proxy... Direct connection to ${targetProject.name.toUpperCase()} established.`;
                            window.open(targetProject.link, '_blank');
                        } else {
                            response.type = 'error';
                            response.content = `Error: Direct uplink for ${targetProject.name} not available.`;
                        }
                    } else {
                        response.type = 'error';
                        response.content = `Error: Module '${projectId}' not recognized.`;
                    }
                } else {
                    response.type = 'error';
                    response.content = "Usage: launch [module]. Example: launch groovia";
                }
                break;

            default:
                response.type = 'error';
                response.content = `Command not found: '${mainCmd}'. Type 'help' for assistance.`;
        }

        if (response.content) {
            setHistory(prev => [...prev, response]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput("");
        }
        // History navigation (Up/Down) could be added here
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-theme-surface/60 backdrop-blur-sm p-4">
                    {/* Backdrop Click to Close */}
                    <div className="absolute inset-0" onClick={onClose}></div>

                    {/* Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-3xl bg-[#0a0a0a] border border-theme-border rounded-xl shadow-2xl overflow-hidden font-mono text-sm md:text-base flex flex-col max-h-[80vh]"
                    >
                        {/* Title Bar */}
                        <div className="bg-[#111] px-4 py-3 flex items-center justify-between border-b border-theme-border select-none">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                </div>
                                <span className={`text-xs tracking-widest flex items-center gap-2 ${themeColor}`}>
                                    <TerminalIcon size={12} /> UNIVORA_ROOT_ACCESS
                                </span>
                            </div>
                            <button onClick={onClose} className="text-theme-text-muted hover:text-theme-text transition-colors">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Terminal Body */}
                        <div className="flex-1 p-6 overflow-y-auto min-h-[400px] text-theme-text-muted scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

                            {/* History */}
                            <div className="space-y-2 mb-4">
                                {history.map((entry, i) => (
                                    <div key={i} className={`leading-relaxed break-words ${entry.type === 'error' ? 'text-red-400' :
                                        entry.type === 'success' ? 'text-green-400' :
                                            entry.type === 'info' ? 'text-blue-400' :
                                                entry.type === 'user' ? `${entry.color || themeColor} font-bold mt-4` :
                                                    'text-theme-text-muted'
                                        }`}>
                                        {entry.type === 'user' && <span className="text-theme-text-muted mr-2">$</span>}
                                        {entry.content}
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className={`flex items-center gap-2 ${themeColor} font-bold group`}>
                                <ChevronRight size={18} className="animate-pulse" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="bg-transparent border-none outline-none w-full text-theme-text placeholder-gray-700 font-mono"
                                    placeholder="Enter command..."
                                    spellCheck={false}
                                    autoComplete="off"
                                />
                            </div>
                            <div ref={bottomRef}></div>
                        </div>

                        {/* Status Footer */}
                        <div className="bg-[#111] px-4 py-2 flex items-center justify-between border-t border-theme-border text-[10px] text-theme-text-muted uppercase tracking-widest select-none">
                            <span className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                Connection Stable
                            </span>
                            <span>CPU: {Math.floor(Math.random() * 20) + 10}%</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Terminal;
