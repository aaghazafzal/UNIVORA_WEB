import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Send, AlertTriangle, CheckCircle2, ShieldAlert, Activity, Search, Copy, Check } from 'lucide-react';
import GridBackground from '../components/GridBackground';
import Footer from '../components/Footer';

const Report = () => {
    // Form state
    const [serviceType, setServiceType] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [customServiceName, setCustomServiceName] = useState('');
    const [categoryKey, setCategoryKey] = useState('');
    const [description, setDescription] = useState('');
    const [submitterName, setSubmitterName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    
    // API data state
    const [services, setServices] = useState({ bots: [], apps: [], websites: [], others: [] });
    const [categories, setCategories] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    
    // Submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState(null);

    // Status check state
    const [statusReportId, setStatusReportId] = useState('');
    const [isCheckingStatus, setIsCheckingStatus] = useState(false);
    const [statusResult, setStatusResult] = useState(null);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
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

    const handleSubmit = async (e) => {
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
                setDescription(''); // clear textarea on success
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

    const handleCheckStatus = async (e) => {
        e.preventDefault();
        if (!statusReportId) return;
        
        setIsCheckingStatus(true);
        setStatusResult(null);
        
        try {
            // Strip any # symbol the user might have pasted, and URL encode it
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
        return services[`${serviceType}s`] || [];
    };

    return (
        <div className="min-h-screen relative font-sans text-theme-text overflow-hidden selection:bg-theme-primary selection:text-black">
            <GridBackground />
            
            <main className="relative z-10 pt-32">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-24">
                    
                    {/* HERO SECTION */}
                    <section className="text-center max-w-4xl mx-auto mb-20 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[600px] h-[300px] bg-red-500/10 blur-[150px] pointer-events-none rounded-full"></div>
                        
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-theme-surface border border-theme-border text-[10px] font-bold tracking-[0.2em] text-red-400 uppercase mb-8 shadow-sm">
                                <ShieldAlert size={14} className="text-red-400" /> Report Anomaly
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
                                Detect. Report. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Resolve.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-theme-text-muted leading-relaxed max-w-2xl mx-auto">
                                Encountered a bug, downtime, or issue with any of our services? Submit a direct report to our engineering matrix. We monitor these channels actively.
                            </p>
                        </motion.div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        
                        {/* FORM SECTION */}
                        <div className="lg:col-span-3">
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-theme-surface border border-theme-border rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-500/5 blur-[100px] rounded-full pointer-events-none"></div>
                                
                                <h2 className="text-3xl font-black mb-8 flex items-center gap-3 relative z-10">
                                    <Bug className="text-red-400" size={32} /> Submit a Report
                                </h2>
                                
                                {isLoadingData ? (
                                    <div className="flex flex-col items-center justify-center py-32 text-theme-text-muted">
                                        <Activity className="animate-spin mb-4" size={32} /> 
                                        <span className="text-sm font-bold tracking-widest uppercase">Initializing Systems...</span>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Service Type */}
                                            <div>
                                                <label className="block text-[10px] font-bold tracking-widest uppercase text-theme-text-muted mb-2 ml-2">Service Type</label>
                                                <select 
                                                    required 
                                                    value={serviceType} 
                                                    onChange={(e) => { setServiceType(e.target.value); setServiceName(''); setCustomServiceName(''); }}
                                                    className="w-full bg-theme-bg border border-theme-border rounded-2xl px-5 py-4 text-sm font-medium focus:border-theme-primary outline-none transition-colors appearance-none cursor-pointer hover:border-theme-border/80"
                                                >
                                                    <option value="" disabled>Select Type...</option>
                                                    <option value="bot">Telegram Bot</option>
                                                    <option value="website">Website</option>
                                                    <option value="app">Application</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>

                                            {/* Service Name */}
                                            <div>
                                                <label className="block text-[10px] font-bold tracking-widest uppercase text-theme-text-muted mb-2 ml-2">Specific Service</label>
                                                {serviceName === 'custom' ? (
                                                    <div className="relative">
                                                        <input 
                                                            type="text" 
                                                            required 
                                                            value={customServiceName} 
                                                            onChange={(e) => setCustomServiceName(e.target.value)}
                                                            placeholder="Enter service name..."
                                                            className="w-full bg-theme-bg border border-theme-border rounded-2xl px-5 py-4 text-sm font-medium focus:border-theme-primary outline-none transition-colors hover:border-theme-border/80 pr-24"
                                                        />
                                                        <button 
                                                            type="button" 
                                                            onClick={() => { setServiceName(''); setCustomServiceName(''); }}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-widest uppercase text-theme-text-muted hover:text-white bg-theme-surface px-2 py-1 rounded-lg border border-theme-border"
                                                        >
                                                            Back
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <select 
                                                        required 
                                                        value={serviceName} 
                                                        onChange={(e) => setServiceName(e.target.value)}
                                                        disabled={!serviceType}
                                                        className="w-full bg-theme-bg border border-theme-border rounded-2xl px-5 py-4 text-sm font-medium focus:border-theme-primary outline-none transition-colors appearance-none disabled:opacity-50 cursor-pointer hover:border-theme-border/80"
                                                    >
                                                        <option value="" disabled>Select Service...</option>
                                                        {getAvailableServices().map((s) => (
                                                            <option key={s.name} value={s.name}>{s.full_name}</option>
                                                        ))}
                                                        {serviceType === 'other' && <option value="custom">Custom / Other...</option>}
                                                    </select>
                                                )}
                                            </div>
                                        </div>

                                        {/* Category */}
                                        <div>
                                            <label className="block text-[10px] font-bold tracking-widest uppercase text-theme-text-muted mb-2 ml-2">Category</label>
                                            <select 
                                                required 
                                                value={categoryKey} 
                                                onChange={(e) => setCategoryKey(e.target.value)}
                                                className="w-full bg-theme-bg border border-theme-border rounded-2xl px-5 py-4 text-sm font-medium focus:border-theme-primary outline-none transition-colors appearance-none cursor-pointer hover:border-theme-border/80"
                                            >
                                                <option value="" disabled>Select Category...</option>
                                                {categories.map((c) => (
                                                    <option key={c.key} value={c.key}>{c.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label className="block text-[10px] font-bold tracking-widest uppercase text-theme-text-muted mb-2 ml-2">Detailed Description</label>
                                            <textarea 
                                                required 
                                                minLength={20}
                                                maxLength={1000}
                                                value={description} 
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Explain the issue in detail. Steps to reproduce, devices used, etc."
                                                className="w-full h-40 bg-theme-bg border border-theme-border rounded-2xl px-5 py-4 text-sm focus:border-theme-primary outline-none transition-colors resize-none placeholder:text-theme-text-muted/50 hover:border-theme-border/80"
                                            />
                                            <div className="text-right text-[10px] font-mono text-theme-text-muted mt-2 mr-2">{description.length}/1000</div>
                                            <div className="mt-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs flex items-start gap-2 leading-relaxed">
                                                <ShieldAlert size={14} className="shrink-0 mt-0.5" />
                                                <p>Need to attach screenshots or videos? Use our Telegram bot <a href="https://t.me/UNIVORA_REPORTBOT" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-300">@UNIVORA_REPORTBOT</a> (REPORT [UNIVORA]) for advanced reporting features.</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Submitter Name */}
                                            <div>
                                                <label className="block text-[10px] font-bold tracking-widest uppercase text-theme-text-muted mb-2 ml-2">Your Name</label>
                                                <input 
                                                    type="text" 
                                                    required 
                                                    value={submitterName} 
                                                    onChange={(e) => setSubmitterName(e.target.value)}
                                                    placeholder="John Doe"
                                                    className="w-full bg-theme-bg border border-theme-border rounded-2xl px-5 py-4 text-sm focus:border-theme-primary outline-none transition-colors hover:border-theme-border/80"
                                                />
                                            </div>

                                            {/* Contact Email */}
                                            <div>
                                                <label className="block text-[10px] font-bold tracking-widest uppercase text-theme-text-muted mb-2 ml-2">Email (Optional)</label>
                                                <input 
                                                    type="email" 
                                                    value={contactEmail} 
                                                    onChange={(e) => setContactEmail(e.target.value)}
                                                    placeholder="john@example.com"
                                                    className="w-full bg-theme-bg border border-theme-border rounded-2xl px-5 py-4 text-sm focus:border-theme-primary outline-none transition-colors hover:border-theme-border/80"
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Status Alerts */}
                                        <AnimatePresence>
                                            {submitResult && (
                                                <motion.div 
                                                    initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 24 }} exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className={`p-5 rounded-2xl text-sm font-medium flex items-start gap-3 ${submitResult.success ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                                        {submitResult.success ? <CheckCircle2 size={24} className="shrink-0 mt-0.5" /> : <AlertTriangle size={24} className="shrink-0 mt-0.5" />}
                                                        <div>
                                                            <p className="text-base mb-1">{submitResult.message}</p>
                                                            {submitResult.reportId && (
                                                                <div className="mt-3 flex items-center gap-2">
                                                                    <span className="font-mono text-xs opacity-80">Report ID:</span>
                                                                    <button 
                                                                        type="button"
                                                                        onClick={() => {
                                                                            navigator.clipboard.writeText(submitResult.reportId);
                                                                            setIsCopied(true);
                                                                            setTimeout(() => setIsCopied(false), 2000);
                                                                        }}
                                                                        className="flex items-center gap-2 bg-black/30 hover:bg-black/50 transition-colors px-3 py-1.5 rounded-lg select-all group cursor-pointer border border-transparent hover:border-theme-border/30"
                                                                        title="Copy Report ID"
                                                                    >
                                                                        <span className="font-bold text-white tracking-widest">{submitResult.reportId}</span>
                                                                        {isCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-theme-text-muted group-hover:text-white transition-colors" />}
                                                                    </button>
                                                                    {isCopied && <span className="text-[10px] text-green-400 font-bold tracking-widest uppercase ml-1 animate-pulse">Copied!</span>}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Submit Button */}
                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="w-full bg-theme-primary text-black font-black uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-theme-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.2)]"
                                        >
                                            {isSubmitting ? <Activity className="animate-spin" size={20} /> : <><Send size={20} /> Transmit Report</>}
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        </div>

                        {/* STATUS CHECKER SECTION */}
                        <div className="lg:col-span-2">
                            <motion.div 
                                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-theme-surface border border-theme-border rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden h-full flex flex-col"
                            >
                                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-theme-primary/5 blur-[80px] rounded-full pointer-events-none"></div>
                                
                                <h2 className="text-2xl font-black mb-3 flex items-center gap-3 relative z-10">
                                    <Search className="text-theme-primary" size={24} /> Track Status
                                </h2>
                                <p className="text-theme-text-muted text-sm mb-10 relative z-10 leading-relaxed">
                                    Track the progress of a previously submitted report using its unique Report ID.
                                </p>

                                <form onSubmit={handleCheckStatus} className="relative z-10 mb-8">
                                    <div className="relative group">
                                        <input 
                                            type="text" 
                                            required
                                            value={statusReportId}
                                            onChange={(e) => setStatusReportId(e.target.value.toUpperCase())}
                                            placeholder="e.g. RPT-001009"
                                            className="w-full bg-theme-bg border border-theme-border rounded-2xl pl-5 pr-14 py-4 text-sm font-mono focus:border-theme-primary outline-none transition-colors uppercase placeholder:normal-case hover:border-theme-border/80"
                                        />
                                        <button 
                                            type="submit" 
                                            disabled={isCheckingStatus}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-theme-surface rounded-xl text-theme-text hover:text-theme-primary hover:bg-theme-bg border border-transparent hover:border-theme-border transition-all disabled:opacity-50"
                                        >
                                            {isCheckingStatus ? <Activity size={18} className="animate-spin" /> : <Search size={18} />}
                                        </button>
                                    </div>
                                </form>

                                <AnimatePresence mode="wait">
                                    {statusResult && (
                                        <motion.div 
                                            key={statusResult.success ? 'success' : 'error'}
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                                            className="flex-1"
                                        >
                                            {statusResult.success ? (
                                                <div className="bg-theme-bg border border-theme-border rounded-2xl p-6 space-y-5 relative overflow-hidden h-full">
                                                    {/* Status Badge */}
                                                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-theme-border/50">
                                                        <span className="text-[10px] font-bold tracking-widest text-theme-text-muted uppercase">Status</span>
                                                        <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full ${
                                                            statusResult.report.status === 'resolved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                            statusResult.report.status === 'inprogress' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                                            statusResult.report.status === 'closed' || statusResult.report.status === 'spam' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                            'bg-theme-primary/10 text-theme-primary border border-theme-primary/20'
                                                        }`}>
                                                            {statusResult.report.status}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <span className="text-[10px] font-bold tracking-widest text-theme-text-muted uppercase block mb-1">Service</span>
                                                            <p className="text-sm font-bold text-theme-text truncate">{statusResult.report.service_name}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-[10px] font-bold tracking-widest text-theme-text-muted uppercase block mb-1">Priority</span>
                                                            <p className="text-sm font-bold text-theme-text capitalize truncate">{statusResult.report.priority}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div>
                                                        <span className="text-[10px] font-bold tracking-widest text-theme-text-muted uppercase block mb-1">Category</span>
                                                        <p className="text-sm font-medium text-theme-text truncate">{statusResult.report.category}</p>
                                                    </div>

                                                    <div className="pt-4 mt-auto border-t border-theme-border/50 flex justify-between items-center">
                                                        <span className="text-[10px] font-bold tracking-widest text-theme-text-muted uppercase">Reported</span>
                                                        <p className="text-xs font-mono font-bold text-theme-text-muted">{new Date(statusResult.report.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium flex items-center gap-3">
                                                    <AlertTriangle size={20} className="shrink-0" /> {statusResult.message}
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </motion.div>
                        </div>
                    </div>
                </div>

                <Footer />
            </main>
        </div>
    );
};

export default Report;
