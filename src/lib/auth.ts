import { cookies } from 'next/headers';
import clientPromise from './mongodb';

export async function verifyAdmin() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('univora_admin_access')?.value;
        
        if (!token) return false;

        const client = await clientPromise;
        const db = client.db('univora');
        
        const session = await db.collection('admin_sessions').findOne({ 
            token: token
        });

        return !!session;
    } catch (e) {
        console.error('Auth verification error:', e);
        return false;
    }
}
