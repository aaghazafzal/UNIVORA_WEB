import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { verifyAdmin } from '../../../../lib/auth';

// GET all changelogs
export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('univora');
        const changelogs = await db.collection('changelogs').find({}).sort({ date: -1 }).toArray();
        return NextResponse.json(changelogs);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to fetch changelogs' }, { status: 500 });
    }
}

// POST a new changelog
export async function POST(req: Request) {
    if (!(await verifyAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const body = await req.json();
        const client = await clientPromise;
        const db = client.db('univora');

        const newLog = {
            category: body.category, // e.g. "App", "Bot", "System"
            product: body.product,   // e.g. "CinemaHub", "StreamDrop"
            version: body.version,   // e.g. "v2.0.1"
            title: body.title,
            description: body.description,
            added: Array.isArray(body.added) ? body.added : [],
            changed: Array.isArray(body.changed) ? body.changed : [],
            fixed: Array.isArray(body.fixed) ? body.fixed : [],
            removed: Array.isArray(body.removed) ? body.removed : [],
            date: new Date().toISOString(),
        };

        const result = await db.collection('changelogs').insertOne(newLog);
        return NextResponse.json({ success: true, id: result.insertedId });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to insert changelog' }, { status: 500 });
    }
}

// PUT to edit an existing changelog
export async function PUT(req: Request) {
    if (!(await verifyAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const body = await req.json();
        const { id, ...updateFields } = body;

        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

        const client = await clientPromise;
        const db = client.db('univora');

        await db.collection('changelogs').updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...updateFields, updatedAt: new Date().toISOString() } }
        );

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to update changelog' }, { status: 500 });
    }
}

// DELETE a changelog
export async function DELETE(req: Request) {
    if (!(await verifyAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const { id } = await req.json();

        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

        const client = await clientPromise;
        const db = client.db('univora');

        await db.collection('changelogs').deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed to delete changelog' }, { status: 500 });
    }
}

