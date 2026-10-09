import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const hostUrl = searchParams.get('url'); // e.g. https://univora.vercel.app

    if (!hostUrl) {
        return NextResponse.json({ error: 'Please provide a ?url= query parameter with your public Vercel URL' }, { status: 400 });
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const WEBHOOK_URL = `${hostUrl}/api/bot`;

    try {
        const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${WEBHOOK_URL}`);
        const data = await res.json();

        return NextResponse.json({
            status: 'Webhook Registration Attempted',
            telegram_response: data,
            registered_url: WEBHOOK_URL
        });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to set webhook' }, { status: 500 });
    }
}
