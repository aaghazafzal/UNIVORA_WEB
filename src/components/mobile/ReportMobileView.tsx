"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Terminal, Send, Activity, Search, Copy, Check, ArrowUpRight, ChevronDown } from 'lucide-react';

export default function ReportMobileView() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Form state
    const [serviceType, setServiceType] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [customServiceName, setCustomServiceName] = useState('');
    const [categoryKey, setCategoryKey] = useState('');
    const [description, setDescription] = useState('');
    const [submitterName, setSubmitterName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    
    // UI State
    const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');

    // API data state
    const [services, setServices] = useState<{ bots: any[], apps: any[], websites: any[], others: any[] }>({ bots: [], apps: [], websites: [], others: [] });
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    
    // Submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string; reportId?: string } | null>(null);

    // Status check state
    const [statusReportId, setStatusReportId] = useState('');
    const [isCheckingStatus, setIsCheckingStatus] = useState(false);
    const [statusResult, setStatusResult] = useState<{ success: boolean; message?: string; report?: any } | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [servicesRes, categoriesRes] = await Promise.all([
                fetch('/api/report-proxy?endpoint=/api/services'),
                fetch('/api/report-proxy?endpoint=/api/categories')
            ]);
            
            const servicesData = await servicesRes.json();
            const categoriesData = await categoriesRes.json();
            
            if (servicesData.success) setServices(servicesData.services);
            if (categoriesData.success) setCategories(categoriesData.categories);
        } catch (error) {
            console.error("Failed to load form data:", error);
        } finally {
            setIsLoadingData(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitResult(null);

        const payload = {
            service_type: serviceType,
            service_name: serviceName === 'custom' ? customServiceName : serviceName,
            category_key: categoryKey,
            description,
            submitter_name: submitterName,
            contact_email: contactEmail || undefined,
            source_url: window.location.href,
        };

        try {
            const res = await fetch('/api/report-proxy?endpoint=/api/reports/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            
            if (res.ok && data.success) {
                setSubmitResult({ success: true, message: data.message, reportId: data.report_id });
                setDescription('');
                setIsCopied(false);
            } else if (res.status === 429) {
                const hours = data.retry_after_seconds ? Math.ceil(data.retry_after_seconds / 3600) : 24;
                setSubmitResult({ success: false, message: `Rate limit reached. Try again in ${hours} hours.` });
            } else {
                setSubmitResult({ success: false, message: data.error || 'Failed to submit.' });
            }
        } catch (error) {
            setSubmitResult({ success: false, message: 'Network error. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCheckStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!statusReportId) return;
        
        setIsCheckingStatus(true);
        setStatusResult(null);
        
        try {
            const cleanId = statusReportId.replace(/^#/, '').trim();
            const res = await fetch(`/api/report-proxy?endpoint=/api/reports/status&report_id=${encodeURIComponent(cleanId)}`);
            const data = await res.json();
            
            if (res.ok && data.success) {
                setStatusResult({ success: true, report: data.report });
            } else {
                setStatusResult({ success: false, message: data.error || 'Report not found.' });
            }
        } catch (error) {
            setStatusResult({ success: false, message: 'Network error. Please try again.' });
        } finally {
            setIsCheckingStatus(false);
        }
    };

    const getAvailableServices = () => {
        if (!serviceType) return [];
        return (services as any)[`${serviceType}s`] || [];
    };

    return (
        <section className="py-24 relative min-h-screen">
            {/* Header matches EcosystemMobile */}
            <div className="px-6 mb-12">
                <div className="overflow-hidden">
                    <motion.h2 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl font-black tracking-tighter text-theme-text mb-4"
                    >
                        Diagnostics<br/>& Reporting.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-theme-text-muted text-sm font-light leading-relaxed"
                    >
                        Detail network anomalies below. This directly alerts the engineering matrix.
                    </motion.p>
                </div>

                {/* Mobile Quick Tabs */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-2 gap-0 mt-8 border-b border-theme-border"
                >
                    <button 
                        onClick={() => setActiveTab('submit')}
                        className={`py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all relative ${
                            activeTab === 'submit' ? 'text-theme-text' : 'text-theme-text-muted hover:text-theme-text'
                        }`}
                    >
                        Submit Report
                        {activeTab === 'submit' && (
                            <motion.div layoutId="mobileTab" className="absolute bottom-0 left-0 w-full h-[2px] bg-theme-primary" />
                        )}
                    </button>
                    <button 
                        onClick={() => setActiveTab('track')}
                        className={`py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all relative ${
                            activeTab === 'track' ? 'text-theme-text' : 'text-theme-text-muted hover:text-theme-text'
                        }`}
                    >
                        Live Tracker
                        {activeTab === 'track' && (
                            <motion.div layoutId="mobileTab" className="absolute bottom-0 left-0 w-full h-[2px] bg-theme-primary" />
                        )}
                    </button>
                </motion.div>
            </div>

            <div ref={ref} className="px-6 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="doppelrand-outer group"
                >
                    <div className="doppelrand-inner min-h-[400px] p-6 flex flex-col relative overflow-hidden">
                        <div className="z-10 relative">
                            <AnimatePresence mode="wait">
                                {activeTab === 'submit' ? (
                                    <motion.div 
                                        key="submit"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    >
                                        {isLoadingData ? (
                                            <div className="flex flex-col gap-6 py-4">
                                                <div className="h-10 border-b border-theme-border/20 bg-theme-text/5 animate-pulse"></div>
                                                <div className="h-10 border-b border-theme-border/20 bg-theme-text/5 animate-pulse"></div>
                                                <div className="h-24 border border-theme-border/20 bg-theme-text/5 animate-pulse rounded"></div>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-8">
                                                
                                                {/* Service Type */}
                                                <div>
                                                    <label className="block text-[9px] font-mono tracking-widest uppercase text-theme-text-muted mb-2">01. Service Type</label>
                                                    <div className="relative">
                                                        <select 
                                                            required value={serviceType} 
                                                            onChange={(e) => { setServiceType(e.target.value); setServiceName(''); setCustomServiceName(''); }}
                                                            className="w-full bg-transparent border-b border-theme-border pb-2 text-sm focus:border-theme-primary outline-none transition-colors appearance-none text-theme-text pr-8"
                                                        >
                                                            <option value="" disabled className="bg-theme-bg">Select Type...</option>
                                                            <option value="bot" className="bg-theme-bg">Telegram Bot</option>
                                                            <option value="website" className="bg-theme-bg">Website</option>
                                                            <option value="app" className="bg-theme-bg">Application</option>
                                                            <option value="other" className="bg-theme-bg">Other</option>
                                                        </select>
                                                        <ChevronDown size={14} className="absolute right-0 top-1 text-theme-text-muted pointer-events-none" />
                                                    </div>
                                                </div>

                                                {/* Service Name */}
                                                <div>
                                                    <label className="block text-[9px] font-mono tracking-widest uppercase text-theme-text-muted mb-2">02. Specific Target</label>
                                                    {serviceName === 'custom' ? (
                                                        <div className="relative">
                                                            <input 
                                                                type="text" required value={customServiceName} onChange={(e) => setCustomServiceName(e.target.value)}
                                                                placeholder="Enter name..."
                                                                className="w-full bg-transparent border-b border-theme-border pb-2 text-sm focus:border-theme-primary outline-none transition-colors text-theme-text"
                                                            />
                                                            <button type="button" onClick={() => { setServiceName(''); setCustomServiceName(''); }} className="absolute right-0 top-0 text-[9px] uppercase text-theme-text-muted">Cancel</button>
                                                        </div>
                                                    ) : (
                                                        <div className="relative">
                                                            <select 
                                                                required value={serviceName} onChange={(e) => setServiceName(e.target.value)} disabled={!serviceType}
                                                                className="w-full bg-transparent border-b border-theme-border pb-2 text-sm focus:border-theme-primary outline-none transition-colors appearance-none disabled:opacity-30 text-theme-text pr-8"
                                                            >
                                                                <option value="" disabled className="bg-theme-bg">Select Target...</option>
                                                                {getAvailableServices().map((s: any) => (
                                                                    <option key={s.name} value={s.name} className="bg-theme-bg">{s.full_name}</option>
                                                                ))}
                                                                {serviceType === 'other' && <option value="custom" className="bg-theme-bg">Custom / Other</option>}
                                                            </select>
                                                            <ChevronDown size={14} className="absolute right-0 top-1 text-theme-text-muted pointer-events-none" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Category */}
                                                <div>
                                                    <label className="block text-[9px] font-mono tracking-widest uppercase text-theme-text-muted mb-2">03. Category</label>
                                                    <div className="relative">
                                                        <select 
                                                            required value={categoryKey} onChange={(e) => setCategoryKey(e.target.value)}
                                                            className="w-full bg-transparent border-b border-theme-border pb-2 text-sm focus:border-theme-primary outline-none transition-colors appearance-none text-theme-text pr-8"
                                                        >
                                                            <option value="" disabled className="bg-theme-bg">Select Category...</option>
                                                            {categories.map((c: any) => (
                                                                <option key={c.key} value={c.key} className="bg-theme-bg">{c.name}</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown size={14} className="absolute right-0 top-1 text-theme-text-muted pointer-events-none" />
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <div>
                                                    <div className="flex justify-between items-end mb-2">
                                                        <label className="block text-[9px] font-mono tracking-widest uppercase text-theme-text-muted">04. Technical Details</label>
                                                        <span className="text-[9px] font-mono opacity-50">{description.length}/1000</span>
                                                    </div>
                                                    <textarea 
                                                        required minLength={20} maxLength={1000} value={description} onChange={(e) => setDescription(e.target.value)}
                                                        placeholder="Outline reproduction steps..."
                                                        className="w-full h-24 bg-theme-text/5 border border-theme-border rounded-xl p-3 text-sm focus:border-theme-primary focus:bg-transparent outline-none resize-none placeholder:text-theme-text-muted/30 text-theme-text font-mono"
                                                    />
                                                </div>

                                                {/* Identity Group */}
                                                <div className="flex flex-col gap-6">
                                                    <div>
                                                        <label className="block text-[9px] font-mono tracking-widest uppercase text-theme-text-muted mb-2">05. Submitter</label>
                                                        <input 
                                                            type="text" required value={submitterName} onChange={(e) => setSubmitterName(e.target.value)}
                                                            placeholder="e.g. John Doe"
                                                            className="w-full bg-transparent border-b border-theme-border pb-2 text-sm focus:border-theme-primary outline-none transition-colors text-theme-text"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[9px] font-mono tracking-widest uppercase text-theme-text-muted mb-2">06. Email (Optional)</label>
                                                        <input 
                                                            type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                                                            className="w-full bg-transparent border-b border-theme-border pb-2 text-sm focus:border-theme-primary outline-none transition-colors text-theme-text"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Submit Section */}
                                                <div className="pt-4">
                                                    <AnimatePresence>
                                                        {submitResult && (
                                                            <motion.div 
                                                                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                                                className="overflow-hidden mb-6 w-full"
                                                            >
                                                                <div className={`p-4 border-l-2 flex flex-col gap-3 bg-theme-bg ${submitResult.success ? 'border-theme-primary' : 'border-red-500'}`}>
                                                                    <span className={`text-[10px] font-mono uppercase tracking-widest ${submitResult.success ? 'text-theme-primary' : 'text-red-500'}`}>
                                                                        {submitResult.message}
                                                                    </span>
                                                                    {submitResult.reportId && (
                                                                        <div className="flex items-center justify-between border border-theme-border px-3 py-2">
                                                                            <span className="font-mono text-sm text-theme-text">{submitResult.reportId}</span>
                                                                            <button type="button" onClick={() => { navigator.clipboard.writeText(submitResult.reportId!); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); }} className="text-theme-text-muted active:text-theme-primary">
                                                                                {isCopied ? <Check size={14} className="text-theme-primary" /> : <Copy size={14} />}
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>

                                                    <button 
                                                        type="submit" disabled={isSubmitting}
                                                        className="w-full inline-flex justify-center items-center gap-3 doppelrand-outer p-1 rounded-full bg-transparent active:scale-[0.98] transition-awwwards group/btn disabled:opacity-50"
                                                    >
                                                        <div className="w-full rounded-full px-8 py-4 bg-theme-primary border border-theme-primary text-black flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[10px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                                                            {isSubmitting ? 'Transmitting' : 'Submit Report'}
                                                            <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center">
                                                                {isSubmitting ? <Activity size={12} className="text-black animate-spin" /> : <ArrowUpRight size={12} className="text-black" />}
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                        {/* Watermark */}
                                        <div className="absolute -bottom-10 -right-6 text-[10rem] leading-none font-black text-theme-text/5 pointer-events-none select-none">TX</div>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="track"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="py-4"
                                    >
                                        <div className="mb-8">
                                            <div className="w-10 h-10 bg-theme-bg/50 backdrop-blur-md rounded-xl flex items-center justify-center border border-theme-border mb-4">
                                                <Terminal size={16} className="text-theme-text" />
                                            </div>
                                            <h3 className="text-xl font-bold tracking-tight text-theme-text mb-2">Status Query</h3>
                                            <p className="text-[10px] text-theme-text-muted font-light mb-6">Monitor anomaly reports via ID.</p>
                                            
                                            <form onSubmit={handleCheckStatus}>
                                                <div className="relative group/search">
                                                    <input 
                                                        type="text" required value={statusReportId} onChange={(e) => setStatusReportId(e.target.value.toUpperCase())}
                                                        placeholder="RPT-001009"
                                                        className="w-full bg-theme-text/5 rounded-xl border border-theme-border px-4 py-3 text-sm font-mono focus:border-theme-primary focus:bg-transparent outline-none transition-colors text-theme-text uppercase placeholder:normal-case placeholder:text-theme-text-muted/30"
                                                    />
                                                    <button 
                                                        type="submit" disabled={isCheckingStatus}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-text-muted active:text-theme-primary disabled:opacity-50"
                                                    >
                                                        {isCheckingStatus ? <Activity size={14} className="animate-spin" /> : <Search size={14} />}
                                                    </button>
                                                </div>
                                            </form>

                                            <AnimatePresence mode="wait">
                                                {statusResult && (
                                                    <motion.div 
                                                        key={statusResult.success ? 'success' : 'error'}
                                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                        className="font-mono text-[10px] mt-8"
                                                    >
                                                        {statusResult.success ? (
                                                            <div className="border border-theme-border p-4 space-y-4 bg-theme-bg/50 backdrop-blur-md rounded-xl">
                                                                <div className="flex justify-between items-center border-b border-theme-border/50 pb-2">
                                                                    <span className="text-theme-text-muted uppercase tracking-widest">STATE</span>
                                                                    <span className={`${statusResult.report.status === 'resolved' ? 'text-theme-primary' : statusResult.report.status === 'inprogress' ? 'text-amber-400' : 'text-red-400'}`}>[{statusResult.report.status.toUpperCase()}]</span>
                                                                </div>
                                                                <div className="flex justify-between items-start">
                                                                    <span className="text-theme-text-muted uppercase tracking-widest">TARGET</span>
                                                                    <span className="text-right text-theme-text max-w-[60%] truncate">{statusResult.report.service_name}</span>
                                                                </div>
                                                                <div className="flex justify-between items-start">
                                                                    <span className="text-theme-text-muted uppercase tracking-widest">PRIO</span>
                                                                    <span className="text-theme-text">{statusResult.report.priority.toUpperCase()}</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="border border-red-500/20 p-4 text-red-400 rounded-xl bg-red-500/5">[ERROR]: {statusResult.message}</div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        {/* Watermark */}
                                        <div className="absolute -bottom-10 -right-6 text-[10rem] leading-none font-black text-theme-text/5 pointer-events-none select-none">RX</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
