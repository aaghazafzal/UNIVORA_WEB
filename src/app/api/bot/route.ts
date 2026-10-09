import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Telegram typically sends updates in the "message" object
        const message = body.message;
        if (!message) {
            return NextResponse.json({ status: 'ok' }); // Ignore non-message updates safely
        }

        const chatId = message.chat.id;
        const text = message.text || '';
        const userId = message.from?.id;

        const ADMIN_ID = process.env.ADMIN_TELEGRAM_ID;
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://univora.vercel.app'; // Replace with actual vercel domain later

        // SECURITY CHECK: Only allow the Admin to interact with the bot
        if (String(userId) !== ADMIN_ID) {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: '⛔ ACCESS DENIED. Unauthorized Terminal.',
                }),
            });
            return NextResponse.json({ status: 'forbidden' });
        }

        // Handle commands
        if (text === '/start' || text === '/admin') {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: '⚡ **UNIVORA COMMAND CENTER** ⚡\n\nIdentity verified. Type /adminpanel to generate a secure one-time access link for your browser.',
                    parse_mode: 'Markdown',
                }),
            });
        } else if (text === '/adminpanel') {
            // Generate a secure one-time token
            const crypto = require('crypto');
            const token = crypto.randomUUID();
            
            // Import dynamically or at top. We will just use standard DB connection
            const clientPromise = require('../../../lib/mongodb').default;
            const client = await clientPromise;
            const db = client.db('univora');
            
            // Save token to DB with an expiration date (e.g. valid for 15 mins)
            await db.collection('admin_sessions').insertOne({
                token: token,
                createdAt: new Date(),
                used: false
            });

            const secureUrl = `${SITE_URL}/api/admin/login?token=${token}`;

            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `🔐 **SECURE ACCESS LINK GENERATED**\n\nClick the link below to securely access the Univora Admin Panel in your browser. This link is for single use.\n\n🔗 ${secureUrl}`,
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: '🚀 OPEN ADMIN VAULT',
                                    url: secureUrl
                                }
                            ]
                        ]
                    }
                }),
            });
        } else {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: 'Command not recognized. Use /admin to open the Vault.',
                }),
            });
        }

        return NextResponse.json({ status: 'ok' });

    } catch (error) {
        console.error('Bot Webhook Error:', error);
        return NextResponse.json({ status: 'error' }, { status: 500 });
    }
}
