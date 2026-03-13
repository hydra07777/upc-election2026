'use client';

import { useMemo, useState } from 'react';

export default function AdminSettingsClient({ initialSettings }) {
    const [items, setItems] = useState(initialSettings || []);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const byKey = useMemo(() => {
        const m = new Map();
        items.forEach((it) => m.set(it.key, it));
        return m;
    }, [items]);

    const setValue = (key, value) => {
        setItems((prev) => prev.map((it) => (it.key === key ? { ...it, value } : it)));
    };

    const save = async () => {
        setSaving(true);
        setError(null);

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: items.map(({ key, value }) => ({ key, value })) }),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Save failed');
            }

            const json = await res.json();
            setItems(json.data);
        } catch (e) {
            setError(e.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <h1 className="section-title" style={{ marginBottom: '2rem' }}>
                SETTINGS
            </h1>

            <div style={{ border: 'var(--border-style)', padding: '2rem' }}>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {Array.from(byKey.values()).map((it) => (
                        <label key={it.key} style={{ display: 'grid', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'baseline' }}>
                                <span style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{it.key}</span>
                                <span style={{ opacity: 0.7, fontSize: '0.9rem' }}>{it.description || ''}</span>
                            </div>
                            <input
                                value={it.value ?? ''}
                                onChange={(e) => setValue(it.key, e.target.value)}
                                style={{ padding: '1rem', border: 'var(--border-style)' }}
                            />
                        </label>
                    ))}

                    {error ? <div style={{ border: '2px solid var(--accent-color)', padding: '1rem', fontWeight: 700 }}>{error}</div> : null}

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="button" className="btn-primary" onClick={save} disabled={saving}>
                            {saving ? '...' : 'SAVE →'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
