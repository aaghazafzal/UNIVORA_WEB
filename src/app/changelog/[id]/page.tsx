import React from 'react';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import Footer from '../../../components/Footer';
import ChangelogDetailDesktopView from '../../../components/desktop/ChangelogDetailDesktopView';
import ChangelogDetailMobileView from '../../../components/mobile/ChangelogDetailMobileView';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function ChangelogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let log: any = null;

    try {
        const client = await clientPromise;
        const db = client.db('univora');
        const data = await db.collection('changelogs').findOne({ _id: new ObjectId(id) });
        
        if (data) {
            log = {
                id: data._id.toString(),
                category: data.category,
                product: data.product,
                version: data.version,
                title: data.title,
                description: data.description,
                added: data.added || [],
                changed: data.changed || [],
                fixed: data.fixed || [],
                removed: data.removed || [],
                date: data.date,
                updatedAt: data.updatedAt || null,
            };
        }
    } catch (error) {
        console.error('Failed to fetch changelog:', error);
    }

    if (!log) {
        notFound();
    }

    return (
        <div className="w-full flex flex-col min-h-screen bg-theme-bg">
            <div className="flex-grow">
                {/* Desktop View */}
                <div className="hidden md:block">
                    <ChangelogDetailDesktopView log={log} />
                </div>
                
                {/* Mobile View */}
                <div className="block md:hidden">
                    <ChangelogDetailMobileView log={log} />
                </div>
            </div>
            
            <Footer />
        </div>
    );
}
