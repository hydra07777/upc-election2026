import Link from 'next/link';
import ResultClientEffects from '../_components/ResultClientEffects';
import { createServerSupabaseClient } from '../../lib/supabase/server';

export const metadata = {
    title: 'Live Standings - UPC Elections',
};

export default async function ResultPage() {
    const supabase = await createServerSupabaseClient();

    const { data: results } = await supabase
        .from('resultats')
        .select('id, nom, pourcentage, nb_votes')
        .order('nb_votes', { ascending: false });

    return (
        <div className="result-page">
            <ResultClientEffects />

            <div className="custom-cursor" />
            <div className="noise-overlay" />

            <nav className="site-nav">
                <div className="nav-brand">UPC '26 ELECTIONS</div>
                <div className="nav-links">
                    <Link href="/">← Back to Home</Link>
                </div>
            </nav>

            <main className="result-main">
                <section className="result-hero">
                    <div className="result-header">
                        <h1 className="result-title">
                            LIVE
                            <br />
                            <span className="accent">STANDINGS</span>
                        </h1>
                        <p className="result-desc">Real-time voting poll updates. See where your candidate stands.</p>
                    </div>
                </section>

                <section className="standings-board">
                    <div className="results-container">
                        {(results ?? []).map((row, idx) => {
                            const pct = typeof row.pourcentage === 'number' ? row.pourcentage : parseFloat(row.pourcentage ?? '0');
                            const safePct = Number.isFinite(pct) ? pct : 0;

                            const positionLabel = idx === 0 ? '1ST' : idx === 1 ? '2ND' : idx === 2 ? '3RD' : `${idx + 1}TH`;

                            return (
                                <div className="result-row" key={row.id}>
                                    <div className="result-info">
                                        <span className="result-position">{positionLabel}</span>
                                        <h3 className="result-name">{row.nom}</h3>
                                        <span className="result-percentage" data-target={Math.round(safePct)}>
                                            0
                                        </span>
                                        <span>%</span>
                                    </div>
                                    <div className="result-bar-container">
                                        <div className="result-bar" data-width={`${safePct}%`} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="vote-cta-section">
                    <div className="cta-content">
                        <h2 className="cta-heading">Not Voted Yet?</h2>
                        <Link href="/vote" className="btn-massive cta-btn">
                            VOTE NOW!
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="minimal-footer">
                <div className="footer-bottom">
                    <p>&copy; 2026 UPC Elections - Official Portal.</p>
                </div>
            </footer>
        </div>
    );
}
