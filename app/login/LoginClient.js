'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserSupabaseClient } from '../../lib/supabase/client';


export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const next = searchParams.get('next') || '/admin';

    const supabase = useMemo(() => createBrowserSupabaseClient(), []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (signInError) {
            setError(signInError.message);
            return;
        }

        router.push(next);
        router.refresh();
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ width: '100%', maxWidth: 520, border: 'var(--border-style)', padding: '2rem', background: 'var(--bg-color)' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: '1.5rem' }}>
                    Admin
                    <br />
                    <span style={{ color: 'var(--accent-color)', fontStyle: 'italic' }}>Login</span>
                </h1>

                <form onSubmit={onSubmit} style={{ display: 'grid', gap: '1rem' }}>
                    <label style={{ display: 'grid', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</span>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                            style={{ padding: '1rem', border: 'var(--border-style)', fontFamily: 'var(--font-body)', fontSize: '1rem' }}
                        />
                    </label>

                    <label style={{ display: 'grid', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</span>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                            style={{ padding: '1rem', border: 'var(--border-style)', fontFamily: 'var(--font-body)', fontSize: '1rem' }}
                        />
                    </label>

                    {error ? (
                        <div style={{ border: '2px solid var(--accent-color)', padding: '1rem', fontWeight: 700 }}>{error}</div>
                    ) : null}

                    <button className="btn-primary" type="submit" disabled={loading} style={{ justifySelf: 'end' }}>
                        {loading ? '...' : 'LOGIN →'}
                    </button>
                </form>
            </div>
        </div>
    );
}
