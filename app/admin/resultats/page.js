import { createAdminSupabaseClient } from '../../../lib/supabase/admin';

export default async function AdminResultatsPage() {
    const supabase = createAdminSupabaseClient();
    const { data } = await supabase.from('resultats').select('*');

    return (
        <div>
            <h1 className="section-title" style={{ marginBottom: '2rem' }}>
                RESULTATS
            </h1>

            <div style={{ border: 'var(--border-style)', padding: '2rem' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {(data ?? []).map((row, idx) => (
                        <div key={row.id} className="result-row" style={{ marginBottom: 0 }}>
                            <div className="result-info">
                                <span className="result-position">{idx + 1}{idx === 0 ? 'ST' : idx === 1 ? 'ND' : idx === 2 ? 'RD' : 'TH'}</span>
                                <h3 className="result-name">{row.nom}</h3>
                                <span className="result-percentage">{row.pourcentage ?? 0}</span>
                                <span>%</span>
                            </div>
                            <div className="result-bar-container">
                                <div className="result-bar" style={{ width: `${row.pourcentage ?? 0}%` }} />
                            </div>
                        </div>
                    ))}

                    {(!data || data.length === 0) ? (
                        <div style={{ fontWeight: 700 }}>Aucun résultat (vue `resultats` vide ou pas de votes).</div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
