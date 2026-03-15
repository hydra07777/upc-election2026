import { createAdminSupabaseClient } from '../../../lib/supabase/admin';

export default async function AdminResultatsPage() {
    const supabase = createAdminSupabaseClient();
    const { data } = await supabase.from('resultats').select('*');

    return (
        <div>
            <nav className="site-nav">
                <div className="nav-brand">UPC '26 ELECTIONS</div>
                <div className="nav-links">
                    <a href="#about">About</a>
                    <a href="#candidates">Candidates</a>
                    <a href="#countdown" className="btn-primary">Countdown</a>
                    <a href="/result" className="btn-primary">Resultats</a>
                </div>
                {/* ✅ Hamburger hors du mix-blend-mode */}
                <button className="nav-hamburger" id="nav-hamburger" aria-label="Menu">
                    <span /><span /><span />
                </button>
            </nav>

            <div className="nav-mobile-menu" id="nav-mobile-menu">
                <button className="nav-mobile-close" id="nav-mobile-close" aria-label="Close menu">
                    <span /><span />
                </button>
                <a href="#about" className="mobile-link">ABOUT</a>
                <a href="#candidates" className="mobile-link">CANDIDATES</a>
                <a href="#countdown" className="mobile-link">COUNTDOWN</a>
                <a href="/result" className="mobile-link mobile-link-accent">RESULTATS →</a>
                <a href="/vote" className="mobile-link mobile-link-accent">VOTE NOW →</a>
            </div>
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
