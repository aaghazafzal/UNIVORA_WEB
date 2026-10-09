import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import { verifyAdmin } from '../../../../lib/auth';

// GET all configs
export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('univora');
        
        const configs = await db.collection('univora_config').find({}).toArray();
        
        // Convert array to key-value object for easy lookup
        const configMap = configs.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
        }, {} as Record<string, string>);

        return NextResponse.json(configMap);
    } catch (error) {
        console.error("Config GET Error:", error);
        return NextResponse.json({ error: 'Failed to fetch configs' }, { status: 500 });
    }
}

// POST: Upsert a single config value
export async function POST(req: Request) {
    if (!(await verifyAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const { key, value } = await req.json();

        if (!key) {
            return NextResponse.json({ error: 'Key is required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('univora');

        await db.collection('univora_config').updateOne(
            { key },
            { $set: { value, updatedAt: new Date() } },
            { upsert: true }
        );

        return NextResponse.json({ message: 'Config updated successfully' }, { status: 200 });
    } catch (error) {
        console.error("Config POST Error:", error);
        return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
    }
}
