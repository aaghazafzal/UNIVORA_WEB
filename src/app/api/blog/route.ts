import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export const revalidate = 60; // 60 seconds

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('univora');
        // Fetch all blog posts for the public feed, sorted by newest first
        const posts = await db.collection('blog_posts').find({}).sort({ publishedAt: -1 }).toArray();
        return NextResponse.json(posts);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to fetch public blog posts' }, { status: 500 });
    }
}
