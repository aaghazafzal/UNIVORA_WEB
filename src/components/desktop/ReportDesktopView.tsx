"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Terminal, Send, Activity, Search, Copy, Check, ArrowUpRight, ChevronDown } from 'lucide-react';

export default function ReportDesktopView() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Form state
    const [serviceType, setServiceType] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [customServiceName, setCustomServiceName] = useState('');
    const [categoryKey, setCategoryKey] = useState('');
    const [description, setDescription] = useState('');
    const [submitterName, setSubmitterName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    
    // UI State
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
        const handleClick = () => setActiveDropdown(null);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
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
                setSubmitResult({ success: false, message: `Rate limit reached. Please try again in ${hours} hours.` });
            } else {
                setSubmitResult({ success: false, message: data.error || 'Failed to submit report.' });
            }
        } catch (error) {
            setSubmitResult({ success: false, message: 'Network error. Please try again later.' });
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
        <section className="py-20 relative min-h-screen">
            {/* Header matches EcosystemDesktop */}
            <div className="max-w-[1400px] mx-auto px-8 lg:px-20 mb-20">
                <div className="overflow-hidden max-w-3xl">
                    <motion.h2 
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl font-black tracking-tighter text-theme-text mb-6"
                    >
                        Diagnostics & Reporting.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-theme-text-muted text-lg font-light leading-relaxed"
                    >
                        Encountered an anomaly within the network? Detail the issue below. This directly alerts the engineering matrix.
                    </motion.p>
                </div>
            </div>

            <div ref={ref} className="max-w-[1400px] mx-auto px-8 lg:px-20 grid grid-cols-12 gap-8 pb-32">
                
                {/* 1. Large Feature Card: Submit Form (Col-Span 8) */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="col-span-12 lg:col-span-8 doppelrand-outer group"
                >
                    <div className="doppelrand-inner min-h-[600px] p-12 flex flex-col justify-between relative overflow-hidden">
                        <div className="z-10 relative w-full max-w-2xl mx-auto">
                            
                            {isLoadingData ? (
                                <div className="flex flex-col gap-10">
                                    <div className="h-10 border-b border-theme-border/20 bg-theme-text/5 animate-pulse rounded"></div>
                                    <div className="h-10 border-b border-theme-border/20 bg-theme-text/5 animate-pulse rounded"></div>
                                    <div className="h-32 border border-theme-border/20 bg-theme-text/5 animate-pulse rounded"></div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-12">
                                    {/* Type & Name */}
                                    <div className="grid grid-cols-2 gap-10">
                                        <div className="relative">
                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-theme-text-muted mb-2">01. Service Type</label>
                                            <div 
                                                onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === 'type' ? null : 'type'); }}
                                                className="w-full border-b border-theme-border pb-2 text-sm flex justify-between items-center cursor-pointer group/dd"
                                            >
                                                <span className={serviceType ? 'text-theme-text' : 'text-theme-text-muted/40'}>
                                                    {serviceType === 'bot' ? 'Telegram Bot' : serviceType === 'website' ? 'Website' : serviceType === 'app' ? 'Application' : serviceType === 'other' ? 'Other' : 'Select Type...'}
                                                </span>
                                                <ChevronDown size={14} className={`text-theme-text-muted transition-transform duration-300 ${activeDropdown === 'type' ? 'rotate-180 text-theme-primary' : 'group-hover/dd:text-theme-primary'}`} />
                                            </div>
                                            <AnimatePresence>
                                                {activeDropdown === 'type' && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                                        className="absolute top-full left-0 w-full mt-1 bg-theme-bg border border-theme-border shadow-2xl z-20 flex flex-col backdrop-blur-xl"
                                                    >
                                                        {[{ val: 'bot', label: 'Telegram Bot' }, { val: 'website', label: 'Website' }, { val: 'app', label: 'Application' }, { val: 'other', label: 'Other' }].map(opt => (
                                                            <div 
                                                                key={opt.val}
                                                                onClick={() => { setServiceType(opt.val); setServiceName(''); setCustomServiceName(''); setActiveDropdown(null); }}
                                                                className="px-4 py-3 text-sm text-theme-text-muted hover:text-theme-text hover:bg-theme-text/5 cursor-pointer transition-colors"
                                                            >
                                                                {opt.label}
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <div className="relative">
                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-theme-text-muted mb-2">02. Specific Target</label>
                                            {serviceName === 'custom' ? (
                                                <div className="relative">
                                                    <input 
                                                        type="text" required value={customServiceName} onChange={(e) => setCustomServiceName(e.target.value)}
                                                        placeholder="Enter target..."
                                                        className="w-full bg-transparent border-b border-theme-border focus:border-theme-primary pb-2 text-sm outline-none transition-colors text-theme-text placeholder:text-theme-text-muted/30 pr-12"
                                                    />
                                                    <button type="button" onClick={() => { setServiceName(''); setCustomServiceName(''); }} className="absolute right-0 top-0 text-[9px] font-mono uppercase text-theme-text-muted hover:text-theme-primary">Cancel</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div 
                                                        onClick={(e) => { e.stopPropagation(); if(serviceType) setActiveDropdown(activeDropdown === 'name' ? null : 'name'); }}
                                                        className={`w-full border-b pb-2 text-sm flex justify-between items-center transition-colors group/dd ${serviceType ? 'border-theme-border cursor-pointer' : 'border-theme-border/20 cursor-not-allowed'}`}
                                                    >
                                                        <span className={serviceName ? 'text-theme-text' : 'text-theme-text-muted/40'}>
                                                            {serviceName ? getAvailableServices().find((s:any) => s.name === serviceName)?.full_name || 'Select target...' : 'Select target...'}
                                                        </span>
                                                        <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'name' ? 'rotate-180 text-theme-primary' : serviceType ? 'text-theme-text-muted group-hover/dd:text-theme-primary' : 'text-theme-border/20'}`} />
                                                    </div>
                                                    <AnimatePresence>
                                                        {activeDropdown === 'name' && serviceType && (
                                                            <motion.div 
                                                                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                                                className="absolute top-full left-0 w-full mt-1 bg-theme-bg border border-theme-border shadow-2xl z-20 max-h-60 overflow-y-auto backdrop-blur-xl"
                                                            >
                                                                {getAvailableServices().map((s: any) => (
                                                                    <div 
                                                                        key={s.name} onClick={() => { setServiceName(s.name); setActiveDropdown(null); }}
                                                                        className="px-4 py-3 text-sm text-theme-text-muted hover:text-theme-text hover:bg-theme-text/5 cursor-pointer transition-colors"
                                                                    >{s.full_name}</div>
                                                                ))}
                                                                {serviceType === 'other' && (
                                                                    <div 
                                                                        onClick={() => { setServiceName('custom'); setActiveDropdown(null); }}
                                                                        className="px-4 py-3 text-sm text-theme-text-muted hover:text-theme-text hover:bg-theme-text/5 cursor-pointer transition-colors border-t border-theme-border"
                                                                    >Custom / Other</div>
                                                                )}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div className="relative max-w-[50%] pr-5">
                                        <label className="block text-[10px] font-mono tracking-widest uppercase text-theme-text-muted mb-2">03. Anomaly Category</label>
                                        <div 
                                            onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === 'cat' ? null : 'cat'); }}
                                            className="w-full border-b border-theme-border pb-2 text-sm flex justify-between items-center cursor-pointer group/dd"
                                        >
                                            <span className={categoryKey ? 'text-theme-text' : 'text-theme-text-muted/40'}>
                                                {categoryKey ? categories.find(c => c.key === categoryKey)?.name : 'Select category...'}
                                            </span>
                                            <ChevronDown size={14} className={`text-theme-text-muted transition-transform duration-300 ${activeDropdown === 'cat' ? 'rotate-180 text-theme-primary' : 'group-hover/dd:text-theme-primary'}`} />
                                        </div>
                                        <AnimatePresence>
                                            {activeDropdown === 'cat' && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                                    className="absolute top-full left-0 w-full mt-1 bg-theme-bg border border-theme-border shadow-2xl z-20 backdrop-blur-xl"
                                                >
                                                    {categories.map((c: any) => (
                                                        <div 
                                                            key={c.key} onClick={() => { setCategoryKey(c.key); setActiveDropdown(null); }}
                                                            className="px-4 py-3 text-sm text-theme-text-muted hover:text-theme-text hover:bg-theme-text/5 cursor-pointer transition-colors"
                                                        >{c.name}</div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Description */}
                                    <div className="relative">
                                        <label className="block text-[10px] font-mono tracking-widest uppercase text-theme-text-muted mb-3 flex justify-between items-end">
                                            <span>04. Technical Details</span>
                                            <span className="text-[9px] opacity-50">{description.length}/1000</span>
                                        </label>
                                        <textarea 
                                            required minLength={20} maxLength={1000} value={description} onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Outline reproduction steps, environment, and error codes..."
                                            className="w-full h-32 bg-theme-text/5 border border-theme-border p-4 text-sm focus:border-theme-primary focus:bg-transparent outline-none transition-colors resize-none placeholder:text-theme-text-muted/30 text-theme-text rounded-xl"
                                        />
                                    </div>

                                    {/* Identity */}
                                    <div className="grid grid-cols-2 gap-10">
                                        <div className="relative">
                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-theme-text-muted mb-2">05. Submitter Name</label>
                                            <input 
                                                type="text" required value={submitterName} onChange={(e) => setSubmitterName(e.target.value)}
                                                placeholder="Optional handle..."
                                                className="w-full bg-transparent border-b border-theme-border focus:border-theme-primary pb-2 text-sm outline-none transition-colors text-theme-text placeholder:text-theme-text-muted/30"
                                            />
                                        </div>
                                        <div className="relative">
                                            <label className="block text-[10px] font-mono tracking-widest uppercase text-theme-text-muted mb-2">06. Contact Email (Optional)</label>
                                            <input 
                                                type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                                                placeholder="For status updates..."
                                                className="w-full bg-transparent border-b border-theme-border focus:border-theme-primary pb-2 text-sm outline-none transition-colors text-theme-text placeholder:text-theme-text-muted/30"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Section */}
                                    <div className="pt-8 flex flex-col items-start gap-6">
                                        <AnimatePresence>
                                            {submitResult && (
                                                <motion.div 
                                                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden w-full"
                                                >
                                                    <div className={`p-4 border-l-2 flex flex-col gap-3 bg-theme-bg ${submitResult.success ? 'border-theme-primary' : 'border-red-500'}`}>
                                                        <span className={`text-xs font-mono uppercase tracking-widest ${submitResult.success ? 'text-theme-primary' : 'text-red-500'}`}>
                                                            {submitResult.message}
                                                        </span>
                                                        {submitResult.reportId && (
                                                            <div className="flex items-center justify-between border border-theme-border px-3 py-2">
                                                                <span className="font-mono text-sm text-theme-text">{submitResult.reportId}</span>
                                                                <button type="button" onClick={() => { navigator.clipboard.writeText(submitResult.reportId!); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); }} className="text-theme-text-muted hover:text-theme-primary">
                                                                    {isCopied ? <Check size={14} className="text-theme-primary" /> : <Copy size={14} />}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Matches EcosystemDesktop "Initiate" Button exactly */}
                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="inline-flex items-center gap-3 doppelrand-outer p-1 rounded-full bg-transparent hover:scale-[0.98] transition-awwwards group/btn disabled:opacity-50 disabled:pointer-events-none"
                                        >
                                            <div className="h-full rounded-full px-8 py-4 bg-theme-primary border border-theme-primary text-black flex items-center gap-3 font-bold uppercase tracking-widest text-[10px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                                                {isSubmitting ? 'Transmitting' : 'Submit Report'}
                                                <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center transition-awwwards group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px]">
                                                    {isSubmitting ? <Activity size={12} className="text-black animate-spin" /> : <ArrowUpRight size={12} className="text-black" />}
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                        {/* Background subtle watermark matching EcosystemDesktop */}
                        <div className="absolute -bottom-10 -right-10 text-[15rem] leading-none font-black text-theme-text/5 pointer-events-none select-none transition-awwwards group-hover:text-theme-primary/5">TX</div>
                    </div>
                </motion.div>

                {/* 2. Vertical Stack Card: Live Tracker (Col-Span 4) */}
                <motion.div
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="col-span-12 lg:col-span-4 doppelrand-outer group"
                >
                    <div className="doppelrand-inner h-full min-h-[600px] p-8 flex flex-col relative overflow-hidden">
                        <div className="z-10 relative">
                            <div className="w-12 h-12 bg-theme-bg/50 backdrop-blur-md rounded-xl flex items-center justify-center p-2.5 border border-theme-border mb-6">
                                <Terminal size={20} className="text-theme-text" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-theme-text mb-3">Status Query</h3>
                            <p className="text-theme-text-muted text-sm font-light mb-8">Monitor existing anomaly reports directly via ID.</p>
                            
                            <form onSubmit={handleCheckStatus} className="mb-8">
                                <div className="relative group/search">
                                    <input 
                                        type="text" required value={statusReportId} onChange={(e) => setStatusReportId(e.target.value.toUpperCase())}
                                        placeholder="e.g. RPT-001009"
                                        className="w-full bg-theme-text/5 rounded-xl border border-theme-border px-4 py-3 text-sm font-mono focus:border-theme-primary focus:bg-transparent outline-none transition-colors text-theme-text uppercase placeholder:normal-case placeholder:text-theme-text-muted/30"
                                    />
                                    <button 
                                        type="submit" disabled={isCheckingStatus}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-text-muted hover:text-theme-primary transition-colors disabled:opacity-50"
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
                                        className="font-mono text-xs"
                                    >
                                        {statusResult.success ? (
                                            <div className="border border-theme-border p-4 space-y-4 bg-theme-bg/50 backdrop-blur-md rounded-xl">
                                                <div className="flex justify-between items-center border-b border-theme-border/50 pb-2">
                                                    <span className="text-theme-text-muted uppercase tracking-widest">STATE</span>
                                                    <span className={`${
                                                        statusResult.report.status === 'resolved' ? 'text-theme-primary' :
                                                        statusResult.report.status === 'inprogress' ? 'text-amber-400' :
                                                        statusResult.report.status === 'closed' || statusResult.report.status === 'spam' ? 'text-red-400' :
                                                        'text-theme-text'
                                                    }`}>
                                                        [{statusResult.report.status.toUpperCase()}]
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-start">
                                                    <span className="text-theme-text-muted uppercase tracking-widest">TARGET</span>
                                                    <span className="text-right text-theme-text max-w-[60%] truncate">{statusResult.report.service_name}</span>
                                                </div>
                                                <div className="flex justify-between items-start">
                                                    <span className="text-theme-text-muted uppercase tracking-widest">PRIORITY</span>
                                                    <span className="text-theme-text">{statusResult.report.priority.toUpperCase()}</span>
                                                </div>
                                                <div className="flex justify-between items-start">
                                                    <span className="text-theme-text-muted uppercase tracking-widest">DATE</span>
                                                    <span className="text-theme-text-muted">{new Date(statusResult.report.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="border border-red-500/20 p-4 text-red-400 rounded-xl bg-red-500/5">
                                                [ERROR]: {statusResult.message}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        {/* Background subtle watermark matching EcosystemDesktop */}
                        <div className="absolute -bottom-10 -right-10 text-[15rem] leading-none font-black text-theme-text/5 pointer-events-none select-none transition-awwwards group-hover:text-theme-primary/5">RX</div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
