'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '../../../lib/supabase/client';

export default function AdminLogoutButton() {
    const router = useRouter();
    const supabase = useMemo(() => createBrowserSupabaseClient(), []);
    const [loading, setLoading] = useState(false);

    const onLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setLoading(false);
        router.push('/login');
        router.refresh();
    };

    return (
        <button
            type="button"
            className="btn-secondary"
            onClick={onLogout}
            disabled={loading}
            style={{ fontSize: '0.9rem', padding: '0.75rem 1.25rem' }}
        >
            {loading ? '...' : 'LOGOUT'}
        </button>
    );
}
