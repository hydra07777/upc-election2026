'use client';

import { useEffect, useMemo, useState } from 'react';

async function signCloudinaryUpload({ folder }) {
    const res = await fetch('/api/cloudinary/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to sign upload');
    }

    return res.json();
}

async function uploadToCloudinary({ file, folder }) {
    const { cloudName, apiKey, timestamp, signature } = await signCloudinaryUpload({ folder });

    const form = new FormData();
    form.append('file', file);
    form.append('api_key', apiKey);
    form.append('timestamp', timestamp);
    form.append('signature', signature);
    form.append('folder', folder);

    const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: form,
    });

    const json = await uploadRes.json();
    if (!uploadRes.ok) {
        throw new Error(json?.error?.message || 'Cloudinary upload failed');
    }

    return json.secure_url;
}

export default function AdminCandidateForm({ initial, onSaved, onDeleted }) {
    const [nom, setNom] = useState(initial?.nom || '');
    const [slogan, setSlogan] = useState(initial?.slogan || '');
    const [programme, setProgramme] = useState(initial?.programme || '');
    const [photoUrl, setPhotoUrl] = useState(initial?.photo_url || '');
    const [photoUrl2, setPhotoUrl2] = useState(initial?.photo_url2 || '');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setNom(initial?.nom || '');
        setSlogan(initial?.slogan || '');
        setProgramme(initial?.programme || '');
        setPhotoUrl(initial?.photo_url || '');
        setPhotoUrl2(initial?.photo_url2 || '');
    }, [initial]);

    const isEdit = Boolean(initial?.id);

    const folder = useMemo(() => 'upc-election/candidats', []);

    const onUpload1 = async (file) => {
        setLoading(true);
        setError(null);
        try {
            const url = await uploadToCloudinary({ file, folder });
            setPhotoUrl(url);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const onUpload2 = async (file) => {
        setLoading(true);
        setError(null);
        try {
            const url = await uploadToCloudinary({ file, folder });
            setPhotoUrl2(url);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const save = async () => {
        setLoading(true);
        setError(null);

        try {
            const payload = {
                nom,
                slogan,
                programme,
                photo_url: photoUrl || null,
                photo_url2: photoUrl2 || null,
            };

            const res = await fetch(isEdit ? `/api/admin/candidats/${initial.id}` : '/api/admin/candidats', {
                method: isEdit ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Save failed');
            }

            onSaved?.();
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const remove = async () => {
        if (!isEdit) return;
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/admin/candidats/${initial.id}`, { method: 'DELETE' });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Delete failed');
            }

            onDeleted?.();
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ border: 'var(--border-style)', padding: '2rem' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
                <label style={{ display: 'grid', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>Nom</span>
                    <input value={nom} onChange={(e) => setNom(e.target.value)} required style={{ padding: '1rem', border: 'var(--border-style)' }} />
                </label>

                <label style={{ display: 'grid', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>Slogan</span>
                    <input value={slogan} onChange={(e) => setSlogan(e.target.value)} style={{ padding: '1rem', border: 'var(--border-style)' }} />
                </label>

                <label style={{ display: 'grid', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>Programme</span>
                    <textarea value={programme} onChange={(e) => setProgramme(e.target.value)} rows={6} style={{ padding: '1rem', border: 'var(--border-style)' }} />
                </label>

                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                    <label style={{ display: 'grid', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>Photo 1</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) onUpload1(f);
                            }}
                        />
                        <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="URL" style={{ padding: '1rem', border: 'var(--border-style)' }} />
                    </label>

                    <label style={{ display: 'grid', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>Photo 2</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) onUpload2(f);
                            }}
                        />
                        <input value={photoUrl2} onChange={(e) => setPhotoUrl2(e.target.value)} placeholder="URL" style={{ padding: '1rem', border: 'var(--border-style)' }} />
                    </label>
                </div>

                {error ? <div style={{ border: '2px solid var(--accent-color)', padding: '1rem', fontWeight: 700 }}>{error}</div> : null}

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginTop: '1rem' }}>
                    {isEdit ? (
                        <button type="button" className="btn-secondary" onClick={remove} disabled={loading}>
                            DELETE
                        </button>
                    ) : (
                        <div />
                    )}

                    <button type="button" className="btn-primary" onClick={save} disabled={loading || !nom}>
                        {loading ? '...' : isEdit ? 'UPDATE →' : 'CREATE →'}
                    </button>
                </div>
            </div>
        </div>
    );
}
