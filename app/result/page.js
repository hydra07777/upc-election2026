import Link from 'next/link';
import ResultClientEffects from '../_components/ResultClientEffects';
import { createServerSupabaseClient } from '../../lib/supabase/server';

export const metadata = {
    title: 'Live Standings - UPC Elections',
};

export default async function ResultPage() {

    const supabase = await createServerSupabaseClient();

    // Fetch candidats + votes en parallèle
    const [candidatsRes, votesRes] = await Promise.all([
        supabase.from('candidat').select('id, nom, slogan').order('nom', { ascending: true }),
        supabase.from('vote').select('candidat_id'),
    ]);

    const candidats = candidatsRes.data ?? [];
    const votes = votesRes.data ?? [];


    const totalVotes = votes.length;

    // Compte les votes par candidat
    const voteCount = {};
    votes.forEach((v) => {
        if (v.candidat_id) {
            voteCount[v.candidat_id] = (voteCount[v.candidat_id] ?? 0) + 1;
        }
    });

    // Construit le classement trié par votes décroissants
    const standings = candidats
        .map((c) => ({
            id: c.id,
            nom: c.nom ?? 'Unknown',
            slogan: c.slogan ?? '',
            votes: voteCount[c.id] ?? 0,
            percentage: totalVotes > 0
                ? Math.round(((voteCount[c.id] ?? 0) / totalVotes) * 100)
                : 0,
        }))
        .sort((a, b) => b.votes - a.votes);

    const ordinals = ['1ER', '2EME', '3EME', '4EME', '5EME', '6TH', '7TH'];
    return (
        <div className="result-page">
            <ResultClientEffects />

            <div className="custom-cursor" />
            <div className="noise-overlay" />
            <nav className="site-nav">
                <div className="nav-brand">UPC '26 ELECTIONS</div>
                <div className="nav-links">
                    <a href="/#about">About</a>
                    <a href="/#candidates">Candidates</a>
                    <a href="/#countdown" className="btn-primary">Countdown</a>
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
                <a href="/#about" className="mobile-link">A PROPOS</a>
                <a href="/#candidates" className="mobile-link">CANDIDATS</a>
                <a href="/#countdown" className="mobile-link">CHRONO</a>

                <a href="/vote" className="mobile-link mobile-link-accent">VOTER →</a>
            </div>

            <main className="result-main">
                <section className="result-hero">
                    <div className="result-header">
                        <h1 className="result-title">
                            CLASSEMENTS
                            <br />
                            <span className="accent">EN DIRECT</span>
                        </h1>
                        <p className="result-desc">Suivez en temps réel les résultats des sondages. Découvrez la position de votre candidat.</p>
                        <p className="result-total">


                        </p>
                    </div>
                </section>

                <section className="standings-board">
                    <div className="results-container">
                        {standings.map((candidate, idx) => (
                            <div className="result-row" key={candidate.id}>
                                <div className="result-info">
                                    <span className="result-position">
                                        {ordinals[idx] ?? `${idx + 1}TH`}
                                    </span>
                                    <h3 className="result-name">{candidate.nom}</h3>
                                    <div className="result-percentage-row">
                                        <span className="result-percentage" data-target={candidate.percentage}>
                                            0
                                        </span>
                                        <span>%</span>
                                    </div>
                                </div>
                                {/* ✅ Votes absolus sous le nom */}

                                <div className="result-bar-container">
                                    <div
                                        className="result-bar"
                                        data-width={`${candidate.percentage}%`}
                                    />
                                </div>
                            </div>
                        ))}
                        {standings.length === 0 && (
                            <div className="no-results">
                                <p>No votes recorded yet. Be the first!</p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="vote-cta-section">
                    <div className="cta-content">
                        <h2 className="cta-heading">Pas encore voté ?</h2>
                        <Link href="/vote" className="btn-massive cta-btn">
                            VOTE NOW!
                        </Link>
                    </div>
                </section>
            </main>

            <footer style={{ backgroundColor: '#C8281E' }} >

                <div className="footer-bottom">
                    <p>&copy; 2026 UPC Elections.</p>
                    <p style={{ marginTop: '1rem' }}>
                        <Link href="/vote">Vote →</Link>
                        {'  '}|{'  '}
                        <Link href="/result">Resultats →</Link>
                    </p>
                    <p>
                        Made by ArcaneCore
                    </p>
                </div>
            </footer>
        </div>
    );
}
