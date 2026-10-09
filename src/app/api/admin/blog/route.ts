import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('univora');
        const posts = await db.collection('blog_posts').find({}).sort({ publishedAt: -1 }).toArray();
        return NextResponse.json(posts);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const client = await clientPromise;
        const db = client.db('univora');

        const newPost = {
            title: body.title,
            slug: body.slug,
            excerpt: body.excerpt,
            coverImage: body.coverImage,
            category: body.category,
            tags: Array.isArray(body.tags) ? body.tags : [],
            author: body.author || { name: 'Admin', bio: '', avatar: '' },
            readTime: body.readTime || '5 min read',
            isFeatured: !!body.isFeatured,
            blocks: Array.isArray(body.blocks) ? body.blocks : [],
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const result = await db.collection('blog_posts').insertOne(newPost);
        return NextResponse.json({ success: true, id: result.insertedId });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to insert blog post' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, ...updateFields } = body;

        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

        const client = await clientPromise;
        const db = client.db('univora');

        updateFields.updatedAt = new Date().toISOString();

        await db.collection('blog_posts').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields }
        );

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

        const client = await clientPromise;
        const db = client.db('univora');

        await db.collection('blog_posts').deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
    }
}
