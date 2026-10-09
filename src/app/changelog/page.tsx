import React from 'react';
import clientPromise from '../../lib/mongodb';
import ChangelogDesktopView from '../../components/desktop/ChangelogDesktopView';
import ChangelogMobileView from '../../components/mobile/ChangelogMobileView';
import Footer from '../../components/Footer';

// Use standard ISR / dynamic rendering settings
export const revalidate = 60; 

export default async function ChangelogPage() {
    let logs: any[] = [];
    
    try {
        const client = await clientPromise;
        const db = client.db('univora');
        const data = await db.collection('changelogs').find({}).sort({ date: -1 }).toArray();
        logs = data.map(log => ({
            id: log._id.toString(),
            category: log.category,
            product: log.product,
            version: log.version,
            title: log.title,
            description: log.description,
            added: log.added || [],
            changed: log.changed || [],
            fixed: log.fixed || [],
            removed: log.removed || [],
            date: log.date,
        }));
    } catch (error) {
        console.error('Failed to fetch changelogs:', error);
    }

    return (
        <div className="w-full flex flex-col min-h-screen bg-theme-bg">
            <div className="flex-grow">
                {/* Desktop View - Hidden on mobile, visible on md and up */}
                <div className="hidden md:block">
                    <ChangelogDesktopView initialLogs={logs} />
                </div>
                
                {/* Mobile View - Visible on mobile, hidden on md and up */}
                <div className="block md:hidden">
                    <ChangelogMobileView initialLogs={logs} />
                </div>
            </div>
            
            <Footer />
        </div>
    );
}
