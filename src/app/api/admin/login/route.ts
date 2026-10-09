import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.redirect(new URL('/not-found', req.url));
    }

    try {
        const client = await clientPromise;
        const db = client.db('univora');
        
        // Find the valid token (within 10 minutes of creation)
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        const session = await db.collection('admin_sessions').findOne({ 
            token: token,
            createdAt: { $gte: tenMinutesAgo }
        });

        if (!session) {
            return NextResponse.redirect(new URL('/not-found', req.url));
        }

        // Generate a persistent access token (could be the same token, but we flag it as an active session now)
        const activeToken = token; 

        // Set Cookie and redirect to admin-dashboard
        const response = NextResponse.redirect(new URL('/admin-dashboard', req.url));
        
        // Cookie lasts for 7 days (60 * 60 * 24 * 7 seconds)
        response.cookies.set('univora_admin_access', activeToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });

        return response;

    } catch (e) {
        console.error(e);
        return NextResponse.redirect(new URL('/not-found', req.url));
    }
}
