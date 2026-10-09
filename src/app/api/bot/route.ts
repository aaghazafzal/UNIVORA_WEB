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
                    text: '⚡ **UNIVORA COMMAND CENTER** ⚡\n\nIdentity verified. Access your Vault below:',
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: '🚀 OPEN ADMIN VAULT',
                                    web_app: { url: `${SITE_URL}/admin-dashboard` }
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
