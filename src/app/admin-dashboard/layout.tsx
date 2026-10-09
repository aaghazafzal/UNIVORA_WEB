import { notFound } from 'next/navigation';
import { verifyAdmin } from '../../lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const isValid = await verifyAdmin();

    if (!isValid) {
        notFound();
    }

    // Token is valid, render the Admin Panel
    return <>{children}</>;
}
