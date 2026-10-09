import React from 'react';
import clientPromise from '../../lib/mongodb';
import Footer from '../../components/Footer';
import BlogDesktopView from '../../components/desktop/BlogDesktopView';
import BlogMobileView from '../../components/mobile/BlogMobileView';

export const revalidate = 60; // Standard ISR

export default async function BlogPage() {
    let posts: any[] = [];

    try {
        const client = await clientPromise;
        const db = client.db('univora');
        const rawPosts = await db.collection('blog_posts').find({}).sort({ publishedAt: -1 }).toArray();
        
        // Serialize ObjectId
        posts = rawPosts.map(p => ({
            id: p._id.toString(),
            title: p.title,
            slug: p.slug,
            excerpt: p.excerpt,
            coverImage: p.coverImage,
            category: p.category,
            tags: p.tags || [],
            author: p.author,
            readTime: p.readTime,
            isFeatured: p.isFeatured,
            publishedAt: p.publishedAt,
            updatedAt: p.updatedAt,
            blocks: p.blocks || []
        }));
    } catch (error) {
        console.error('Failed to fetch blog posts:', error);
    }

    return (
        <div className="w-full flex flex-col min-h-screen bg-theme-bg">
            <div className="flex-grow">
                {/* Desktop View */}
                <div className="hidden md:block">
                    <BlogDesktopView posts={posts} />
                </div>
                
                {/* Mobile View */}
                <div className="block md:hidden">
                    <BlogMobileView posts={posts} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
