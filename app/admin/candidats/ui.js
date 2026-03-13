'use client';

import { useMemo, useState } from 'react';
import AdminCandidateForm from '../_components/AdminCandidateForm';

export default function AdminCandidateClient({ initialCandidats }) {
    const candidats = useMemo(() => initialCandidats || [], [initialCandidats]);
    const [selectedId, setSelectedId] = useState(candidats[0]?.id || null);
    const [refreshKey, setRefreshKey] = useState(0);

    const selected = candidats.find((c) => c.id === selectedId) || null;

    const onSaved = () => {
        setRefreshKey((x) => x + 1);
        window.location.reload();
    };

    const onDeleted = () => {
        setSelectedId(null);
        window.location.reload();
    };

    return (
        <div key={refreshKey}>
            <h1 className="section-title" style={{ marginBottom: '2rem' }}>
                CANDIDATS
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem' }}>
                <div style={{ border: 'var(--border-style)', padding: '1rem' }}>
                    <button
                        type="button"
                        className="btn-primary"
                        style={{ width: '100%', marginBottom: '1rem' }}
                        onClick={() => setSelectedId('new')}
                    >
                        NEW →
                    </button>

                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {candidats.map((c) => (
                            <button
                                key={c.id}
                                type="button"
                                className={selectedId === c.id ? 'btn-primary' : 'btn-secondary'}
                                style={{ textAlign: 'left', width: '100%', fontSize: '1rem' }}
                                onClick={() => setSelectedId(c.id)}
                            >
                                {c.nom}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    {selectedId === 'new' ? (
                        <AdminCandidateForm initial={null} onSaved={onSaved} />
                    ) : selected ? (
                        <AdminCandidateForm initial={selected} onSaved={onSaved} onDeleted={onDeleted} />
                    ) : (
                        <div style={{ border: 'var(--border-style)', padding: '2rem', fontWeight: 700 }}>Select a candidate or create a new one.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
