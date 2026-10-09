import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Activity, CheckCircle2, XCircle, AlertTriangle, ChevronLeft, RefreshCw, Clock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const serviceEndpoints = [
    { id: 'cinemahub', name: 'Cinemahub Bot', url: '/api/proxy/cinemahub', type: 'Primary Bot' },
    { id: 'streamdrop', name: 'Stream Drop Bot', url: '/api/proxy/streamdrop', type: 'Utility Bot' },
    { id: 'sharebox', name: 'Sharebox Bot', url: '/api/proxy/sharebox', type: 'Utility Bot' }
];

const Status = () => {
    const [services, setServices] = useState(
        serviceEndpoints.map(s => ({ 
            ...s, 
            status: 'checking', 
            ping: 0, 
            uptime: '--',
            version: '--',
            features: [] 
        }))
    );
    const [globalStatus, setGlobalStatus] = useState('checking'); // checking, operational, degraded, outage
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const checkServiceHealth = async (url) => {
        const startTime = performance.now();
        try {
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) throw new Error('Bad response');
            const data = await res.json();
            const endTime = performance.now();
            return { 
                status: data.status === 'online' || data.alive ? 'operational' : 'outage', 
                ping: Math.round(endTime - startTime),
                uptime: data.uptime_formatted || '--',
                version: data.version || '--',
                features: data.features || []
            };
        } catch (error) {
            console.error("Health check failed for", url, error);
            return { status: 'outage', ping: 0, uptime: 'Offline', version: '--', features: [] };
        }
    };

    const runDiagnostics = async () => {
        setIsRefreshing(true);
        setGlobalStatus('checking');
        
        // Reset statuses to checking visually
        setServices(prev => prev.map(s => ({ ...s, status: 'checking' })));

        const results = await Promise.all(
            serviceEndpoints.map(async (service) => {
                const result = await checkServiceHealth(service.url);
                return { 
                    ...service, 
                    ...result
                };
            })
        );

        setServices(results);

        const downCount = results.filter(s => s.status === 'outage').length;
        if (downCount === 0) setGlobalStatus('operational');
        else if (downCount < results.length) setGlobalStatus('degraded');
        else setGlobalStatus('outage');

        setIsRefreshing(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "System Status - Univora";
        runDiagnostics();
        
        // Auto refresh every 2 minutes
        const interval = setInterval(runDiagnostics, 120000);
        return () => clearInterval(interval);
    }, []);

    // Status Styling Helpers
    const getStatusColor = (status) => {
        if (status === 'operational' || status === 'up') return '#22c55e'; // Green
        if (status === 'degraded') return '#eab308'; // Yellow
        if (status === 'outage' || status === 'down') return '#ef4444'; // Red
        return '#888888'; // Gray (Checking)
    };

    const getStatusText = (status) => {
        if (status === 'operational') return 'All Systems Operational';
        if (status === 'degraded') return 'Partial System Outage';
        if (status === 'outage') return 'Major System Outage';
        return 'Running Diagnostics...';
    };

    return (
        <div className="min-h-screen bg-theme-bg font-sans text-theme-text overflow-x-hidden selection:bg-theme-primary selection:text-black">
            
            {/* Background Grid & Glow */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <motion.div 
                    animate={{ backgroundColor: `${getStatusColor(globalStatus)}15` }}
                    transition={{ duration: 1 }}
                    className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] blur-[150px] rounded-full mix-blend-screen" 
                />
            </div>

            <main className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 pt-32 pb-20">
                
                {/* Header & Global Status */}
                <div className="mb-16">
                    <Link to="/" className="inline-flex items-center gap-2 text-theme-text-muted hover:text-theme-text mb-10 transition-colors group font-bold text-xs uppercase tracking-[0.15em]">
                        <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={14} /> Back to Hub
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">System Status</h1>
                            <p className="text-theme-text-muted text-lg">Real-time health monitoring for Univora Ecosystem.</p>
                        </div>
                        <button 
                            onClick={runDiagnostics}
                            disabled={isRefreshing}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full bg-theme-surface-hover border border-theme-border hover:bg-theme-surface transition-all font-bold text-sm ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                            {isRefreshing ? 'Pinging...' : 'Refresh Status'}
                        </button>
                    </div>
                </div>

                {/* Massive Status Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-theme-surface border border-theme-border rounded-[2rem] p-8 md:p-12 mb-16 shadow-[0_0_50px_rgba(0,0,0,0.1)] relative overflow-hidden"
                >
                    <div className="absolute left-0 top-0 bottom-0 w-2" style={{ backgroundColor: getStatusColor(globalStatus) }}></div>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <div className="absolute inset-0 blur-xl opacity-50 animate-pulse" style={{ backgroundColor: getStatusColor(globalStatus) }}></div>
                            <div className="w-24 h-24 rounded-full bg-theme-surface-hover border-4 flex items-center justify-center relative z-10" style={{ borderColor: getStatusColor(globalStatus) }}>
                                {globalStatus === 'operational' && <CheckCircle2 size={40} color={getStatusColor(globalStatus)} />}
                                {globalStatus === 'degraded' && <AlertTriangle size={40} color={getStatusColor(globalStatus)} />}
                                {globalStatus === 'outage' && <XCircle size={40} color={getStatusColor(globalStatus)} />}
                                {globalStatus === 'checking' && <RefreshCw size={40} className="animate-spin text-theme-text-muted" />}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-theme-text mb-2">{getStatusText(globalStatus)}</h2>
                            <p className="text-theme-text-muted">Last updated: {new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Individual Services Matrix */}
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><Activity className="text-theme-primary" /> Active Nodes</h3>
                
                <div className="grid grid-cols-1 gap-6 mb-16">
                    {services.map((service, index) => (
                        <motion.div 
                            key={service.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedService(service)}
                            className="group bg-theme-surface border border-theme-border hover:border-theme-primary/50 rounded-2xl p-6 cursor-pointer transition-all hover:bg-theme-surface-hover"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-theme-bg border border-theme-border flex items-center justify-center" style={{ color: getStatusColor(service.status) }}>
                                        <Server size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-theme-text group-hover:text-theme-primary transition-colors flex items-center gap-2">
                                            {service.name} 
                                            {service.version !== '--' && <span className="text-[10px] bg-theme-primary/10 text-theme-primary px-2 py-0.5 rounded-full border border-theme-primary/20">v{service.version}</span>}
                                        </h4>
                                        <p className="text-xs font-mono text-theme-text-muted uppercase tracking-widest">{service.type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <div className="text-sm font-bold capitalize" style={{ color: getStatusColor(service.status) }}>
                                            {service.status}
                                        </div>
                                        <div className="text-theme-text-muted text-xs font-mono mt-1">Uptime: {service.uptime}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* DETAILED SERVICE MODAL */}
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                        onClick={() => setSelectedService(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl bg-theme-surface border border-theme-border rounded-[2rem] p-8 shadow-2xl relative"
                        >
                            <button 
                                onClick={() => setSelectedService(null)}
                                className="absolute top-6 right-6 w-10 h-10 bg-theme-surface-hover hover:bg-theme-bg rounded-full flex items-center justify-center text-theme-text-muted hover:text-theme-text transition-colors border border-theme-border"
                            >
                                <XCircle size={24} />
                            </button>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-theme-surface-hover border border-theme-border flex items-center justify-center" style={{ color: getStatusColor(selectedService.status) }}>
                                    <Server size={32} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-theme-text flex items-center gap-3">
                                        {selectedService.name}
                                        {selectedService.version !== '--' && <span className="text-sm bg-theme-primary/10 text-theme-primary px-3 py-1 rounded-full border border-theme-primary/20">v{selectedService.version}</span>}
                                    </h2>
                                    <p className="text-theme-text-muted font-mono tracking-widest text-sm uppercase">{selectedService.type}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-theme-surface-hover p-4 rounded-2xl border border-theme-border">
                                    <div className="text-theme-text-muted text-xs mb-1 font-bold uppercase tracking-wider">Status</div>
                                    <div className="text-lg font-black capitalize" style={{ color: getStatusColor(selectedService.status) }}>{selectedService.status}</div>
                                </div>
                                <div className="bg-theme-surface-hover p-4 rounded-2xl border border-theme-border">
                                    <div className="text-theme-text-muted text-xs mb-1 font-bold uppercase tracking-wider">Ping</div>
                                    <div className="text-lg font-black text-theme-text">{selectedService.ping > 0 ? `${selectedService.ping}ms` : 'Timeout'}</div>
                                </div>
                                <div className="bg-theme-surface-hover p-4 rounded-2xl border border-theme-border col-span-2">
                                    <div className="text-theme-text-muted text-xs mb-1 font-bold uppercase tracking-wider">Uptime</div>
                                    <div className="text-lg font-black text-theme-text">{selectedService.uptime}</div>
                                </div>
                            </div>

                            {selectedService.features && selectedService.features.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-theme-text-muted text-sm font-bold uppercase tracking-wider mb-3">Active Features</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedService.features.map((feature, idx) => (
                                            <span key={idx} className="bg-theme-bg border border-theme-border text-theme-primary px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider shadow-sm">
                                                {feature.replace(/_/g, ' ')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="bg-theme-surface-hover p-6 rounded-2xl border border-theme-border">
                                <h3 className="text-theme-text font-bold mb-4 flex items-center gap-2"><Clock size={18} className="text-theme-primary" /> Incident History (Last 7 Days)</h3>
                                <div className="space-y-4">
                                    {selectedService.status === 'outage' ? (
                                        <div className="flex items-start gap-3 border-l-2 border-red-500 pl-4 py-1">
                                            <div>
                                                <div className="text-theme-text font-bold text-sm">CRITICAL OUTAGE DETECTED</div>
                                                <div className="text-theme-text-muted text-xs">A few seconds ago</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-start gap-3 border-l-2 border-green-500 pl-4 py-1">
                                            <div>
                                                <div className="text-theme-text font-bold text-sm">No incidents reported.</div>
                                                <div className="text-theme-text-muted text-xs">Node is running flawlessly.</div>
                                            </div>
                                        </div>
                                    )}
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

export default Status;
