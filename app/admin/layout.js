import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAdmin } from '../../lib/auth/admin';
import AdminLogoutButton from './_components/AdminLogoutButton';

export const metadata = {
    title: 'Admin - UPC Elections',
};

export default async function AdminLayout({ children }) {
    const auth = await requireAdmin();
    if (!auth.ok) {
        if (auth.status === 401) {
            redirect('/login?next=/admin');
        }

        redirect('/');
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <nav className="site-nav" style={{ mixBlendMode: 'normal', color: 'var(--text-color)' }}>
                <div className="nav-brand">UPC '26 ADMIN</div>
                <div className="nav-links">
                    <Link href="/admin">Dashboard</Link>
                    <Link href="/admin/candidats">Candidats</Link>
                    <Link href="/admin/settings">Settings</Link>
                    <Link href="/admin/resultats">Résultats</Link>
                    <Link href="/">Site →</Link>
                    <AdminLogoutButton />
                </div>
            </nav>

            <main style={{ padding: '8rem 2rem 4rem', maxWidth: 1200, margin: '0 auto' }}>{children}</main>
        </div>
    );
}
