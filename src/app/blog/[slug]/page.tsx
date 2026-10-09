import React from 'react';
import { notFound } from 'next/navigation';
import clientPromise from '../../../lib/mongodb';
import Footer from '../../../components/Footer';
import BlogDetailDesktopView from '../../../components/desktop/BlogDetailDesktopView';
import BlogDetailMobileView from '../../../components/mobile/BlogDetailMobileView';

export const revalidate = 60; // Standard ISR

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    let post: any = null;

    try {
        const { slug } = await params;
        const client = await clientPromise;
        const db = client.db('univora');
        
        const rawPost = await db.collection('blog_posts').findOne({ slug });
        
        if (rawPost) {
            post = {
                id: rawPost._id.toString(),
                title: rawPost.title,
                slug: rawPost.slug,
                excerpt: rawPost.excerpt,
                coverImage: rawPost.coverImage,
                category: rawPost.category,
                tags: rawPost.tags || [],
                author: rawPost.author,
                readTime: rawPost.readTime,
                isFeatured: rawPost.isFeatured,
                publishedAt: rawPost.publishedAt,
                updatedAt: rawPost.updatedAt,
                blocks: rawPost.blocks || []
            };
        }
    } catch (error) {
        console.error('Failed to fetch blog post details:', error);
    }

    if (!post) {
        notFound();
    }

    return (
        <div className="w-full flex flex-col min-h-screen bg-theme-bg">
            <div className="flex-grow">
                {/* Desktop View */}
                <div className="hidden md:block">
                    <BlogDetailDesktopView post={post} />
                </div>
                
                {/* Mobile View */}
                <div className="block md:hidden">
                    <BlogDetailMobileView post={post} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
