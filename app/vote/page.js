import Link from 'next/link';
import VoteClientEffects from '../_components/VoteClientEffects';
import { createServerSupabaseClient } from '../../lib/supabase/server';

export const metadata = {
    title: 'Vote Now - UPC Elections',
};

function getRowLabel(row) {
    if (!row || typeof row !== 'object') return '';
    return String(row.nom ?? row.name ?? row.label ?? row.title ?? row.titre ?? row.code ?? row.id ?? '').trim();
}

export default async function VotePage() {
    const supabase = await createServerSupabaseClient();

    const [facultyRes, gradeRes, candidatRes] = await Promise.all([
        supabase.from('faculty').select('*').order('nom', { ascending: true }),
        supabase.from('grade').select('*').order('nom', { ascending: true }),
        supabase.from('candidat').select('*').order('created_at', { ascending: false })
    ]);

    if (facultyRes.error) throw new Error(`faculty select failed: ${facultyRes.error.message}`);
    if (gradeRes.error) throw new Error(`grade select failed: ${gradeRes.error.message}`);
    if (candidatRes.error) throw new Error(`candidat select failed: ${candidatRes.error.message}`);

    const faculties = facultyRes.data ?? [];
    const grades = gradeRes.data ?? [];
    const candidats = candidatRes.data ?? [];



    return (
        <div className="vote-page">
            <VoteClientEffects />

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

            <div className="nav-mobile-menu" id="nav-mobile-menu" style={{ backgroundColor: '#1f1fa2' }}>
                <button className="nav-mobile-close" id="nav-mobile-close" aria-label="Close menu">
                    <span /><span />
                </button>
                <a href="/" className="mobile-link">ACCUEIL</a>
                <a href="/#about" className="mobile-link">A PROPOS</a>
                <a href="/#candidates" className="mobile-link">CANDIDATS</a>

                <a href="/result" className="mobile-link mobile-link-accent">RESULTATS →</a>
                <a href="/vote" className="mobile-link mobile-link-accent">VOTER →</a>
            </div>


            <main className="vote-main">
                <form id="voteForm" className="vote-container">
                    <div className="vote-progress">
                        <span className="step-indicator active" data-step="1">
                            01 / FACULTE
                        </span>
                        <span className="step-indicator" data-step="2">
                            02 / ANNEE
                        </span>
                        <span className="step-indicator" data-step="3">
                            03 / PRESIDENT
                        </span>
                    </div>

                    <section className="vote-step active" id="step-1">
                        <div className="step-header">
                            <h1 className="step-title">
                                CHOISIR
                                <br />
                                <span className="accent">FACULTE</span>
                            </h1>
                            <p className="step-desc">Choisissez votre faculté académique inscrite.</p>
                        </div>
                        <div className="options-grid">
                            {(faculties ?? []).map((row, idx) => {
                                const label = getRowLabel(row);
                                if (!label) return null;

                                const isFirst = idx === 0;
                                return (
                                    <label className="brutalist-radio" key={row.id ?? label}>
                                        <input type="radio" name="faculty" value={row.id} required={isFirst} />
                                        <span className="radio-content">{label.toUpperCase()}</span>
                                    </label>
                                );
                            })}
                        </div>
                        <div className="step-actions">
                            <button type="button" className="btn-primary next-step" disabled>
                                CONTINUE →
                            </button>
                        </div>
                    </section>

                    <section className="vote-step" id="step-2">
                        <div className="step-header">
                            <h1 className="step-title">
                                ANNEE
                                <br />
                                <span className="accent">ACADEMIQUE</span>
                            </h1>
                            <p className="step-desc">Sélectionnez votre année académique actuelle.</p>
                        </div>
                        <div className="options-grid year-grid">
                            {(grades ?? []).map((row, idx) => {
                                const label = getRowLabel(row);
                                if (!label) return null;

                                const isFirst = idx === 0;
                                return (
                                    <label className="brutalist-radio" key={row.id ?? label}>
                                        <input type="radio" name="grade" value={row.id} required={isFirst} />
                                        <span className="radio-content">{label.toUpperCase()}</span>
                                    </label>
                                );
                            })}
                        </div>
                        <div className="step-actions split">
                            <button type="button" className="btn-secondary prev-step">
                                ← RETOUR
                            </button>
                            <button type="button" className="btn-primary next-step" disabled>
                                CONTINUE →
                            </button>
                        </div>
                    </section>

                    <section className="vote-step" id="step-3">
                        <div className="step-header">
                            <h1 className="step-title">
                                PRESIDENTIEL
                                <br />
                                <span className="accent">CHOIX</span>
                            </h1>
                            <p className="step-desc">Sélectionnez un candidat pour la présidence.</p>
                        </div>
                        <div className="candidates-selection">
                            {(candidats ?? []).map((row, idx) => {
                                const displayNumber = String(idx + 1).padStart(2, '0');
                                const isFirst = idx === 0;

                                return (
                                    <label className="candidate-radio" key={row.id ?? row.nom ?? idx}>
                                        <input type="radio" name="candidate" value={row.id ?? ''} required={isFirst} />
                                        <div className="candidate-card">
                                            <div className="candidate-img-placeholder">{displayNumber}</div>
                                            <div className="candidate-details">
                                                <h3>{row.nom}</h3>
                                                <p>{row.slogan ?? ''}</p>
                                            </div>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                        <div className="step-actions split">
                            <button type="button" className="btn-secondary prev-step">
                                ← RETOUR
                            </button>
                            <button type="submit" className="btn-massive submit-vote" disabled>
                                VOTER
                            </button>
                        </div>
                    </section>

                    <section className="vote-step" id="step-4">
                        <div className="confirmation-content">
                            <h1 className="success-title">
                                DEMANDE
                                <br />
                                <span className="accent">ENVOYÉE</span>
                            </h1>
                            <p className="success-message">
                                Votre voix a été enregistrée. Merci d'avoir participé aux élections UPC '26.
                            </p>
                            <div className="receipt">
                                <div className="receipt-row">
                                    <span>FACULTE:</span> <span id="res-faculty">-</span>
                                </div>
                                <div className="receipt-row">
                                    <span>ANNEE:</span> <span id="res-grade">-</span>
                                </div>
                                <div className="receipt-row">
                                    <span>CANDIDAT:</span> <span id="res-candidate" className="accent">
                                        -
                                    </span>
                                </div>
                            </div>
                            <div className="share-section">
                                <span className="share-label">PARTAGEZ VOTRE VOTE</span>
                                <div className="share-buttons">
                                    <button type="button" id="share-whatsapp" className="btn-share whatsapp">
                                        📲 WHATSAPP
                                    </button>
                                    <button type="button" id="share-copy" className="btn-share copy">
                                        🔗 COPIER LE LIEN
                                    </button>
                                </div>
                                <span id="copy-confirm" className="copy-confirm">✓ COPIÉ DANS LE PRESSE-PAPIERS</span>
                            </div>
                            <Link href="/" className="btn-primary">
                                RETOURNER À L'ACCUEIL
                            </Link>
                        </div>
                    </section>
                </form>
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
