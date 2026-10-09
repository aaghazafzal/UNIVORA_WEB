import { NextResponse } from 'next/server';
import crypto from 'crypto';
import clientPromise from '../../../lib/mongodb';

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
        const host = req.headers.get('host') || 'www.univora.site';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`;

        // Handle commands
        if (text === '/start') {
            const startMessage = `⚡ **WELCOME TO UNIVORA** ⚡\n\nUnivora is an advanced digital ecosystem and command matrix. We build next-generation applications, bots, and digital infrastructure to power the future of the web.\n\nClick the button below to explore our primary hub and active projects.`;
            
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: startMessage,
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Explore Univora Hub',
                                    url: SITE_URL,
                                    style: 'primary'
                                }
                            ]
                        ]
                    }
                }),
            });
        } else if (text === '/adminpanel') {
            // SECURITY CHECK: Only allow the Admin to generate the access link. 
            // Silently ignore others so they don't even suspect it exists.
            if (String(userId) !== ADMIN_ID) {
                return NextResponse.json({ status: 'ok' }); // Return 'ok' to prevent Telegram from retrying, but do nothing
            }

            // Generate a secure one-time token
            const token = crypto.randomUUID();
            
            const client = await clientPromise;
            const db = client.db('univora');
            
            // Save token to DB
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
                    text: `🔐 **SECURE ACCESS LINK GENERATED**\n\nClick the link below to securely access the Univora Admin Panel in your browser. This link is valid for 10 minutes.\n\n🔗 ${secureUrl}`,
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'OPEN ADMIN VAULT',
                                    url: secureUrl,
                                    style: 'success'
                                }
                            ]
                        ]
                    }
                }),
            });
        } else {
            // Only reply to unknown commands if it's the admin, or just ignore for everyone to be less spammy?
            // Let's reply so they know the bot is alive.
            if (String(userId) === ADMIN_ID) {
                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: 'Command not recognized. Use /start to see the main menu.',
                    }),
                });
            }
        }

        return NextResponse.json({ status: 'ok' });

    } catch (error) {
        console.error('Bot Webhook Error:', error);
        return NextResponse.json({ status: 'error' }, { status: 500 });
    }
}
