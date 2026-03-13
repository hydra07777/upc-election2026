import { createAdminSupabaseClient } from '../../lib/supabase/admin';

export default async function AdminHomePage() {
    const supabase = createAdminSupabaseClient();

    const [{ count: candidatsCount }, { count: votesCount }] = await Promise.all([
        supabase.from('candidat').select('*', { count: 'exact', head: true }),
        supabase.from('vote').select('*', { count: 'exact', head: true }),
    ]);

    return (
        <div>
            <h1 className="section-title" style={{ marginBottom: '2rem' }}>
                ADMIN
            </h1>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                <div className="card">
                    <div className="card-number">01</div>
                    <h3>Candidats</h3>
                    <p style={{ fontWeight: 700, marginTop: '0.5rem' }}>{candidatsCount ?? 0}</p>
                </div>
                <div className="card">
                    <div className="card-number">02</div>
                    <h3>Votes</h3>
                    <p style={{ fontWeight: 700, marginTop: '0.5rem' }}>{votesCount ?? 0}</p>
                </div>
            </div>

            <div style={{ marginTop: '3rem', border: 'var(--border-style)', padding: '2rem' }}>
                <p style={{ fontWeight: 700 }}>
                    Astuce: pour gérer l'accès admin, ajoute l'email dans la table <code>admin_user</code> côté Supabase.
                </p>
            </div>
        </div>
    );
}
