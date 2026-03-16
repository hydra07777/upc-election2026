
'use client';

import Link from 'next/link';
import HomeClientEffects from '../_components/HomeClientEffects';
import { useSearchParams } from 'next/navigation';



export default function CandidatePage() {
    const params = useSearchParams();
    const candidateId = params.get('id');

    return (
        <div className="candidate-page">
            <HomeClientEffects />

            <div className="custom-cursor" />
            <div className="noise-overlay" />

            <nav className="site-nav">
                <div className="nav-brand">UPC '26 ELECTIONS</div>
                <div className="nav-links">
                    <a href="/#about">A PROPOS</a>
                    <a href="/#candidates">CANDIDATS</a>
                    <a href="/#countdown" >COUNTDOWN</a>
                </div>
                {/* ✅ Hamburger hors du mix-blend-mode */}
                <button className="nav-hamburger" id="nav-hamburger" aria-label="Menu">
                    <span /><span /><span />
                </button>
            </nav>

            <div className="nav-mobile-menu" id="nav-mobile-menu">
                <a href="/#about" className="mobile-link">A PROPOS</a>
                <a href="/#candidates" className="mobile-link">CANDIDATS</a>
                <a href="/#countdown" className="mobile-link">COUNTDOWN</a>
                <a href="/vote" className="mobile-link mobile-link-accent">VOTE NOW →</a>
                <a href="/results" className="mobile-link mobile-link-accent">RESULTATS</a>
            </div>
            {candidateId === 'goaty' ? (
                <main>
                    <section className="candidate-hero">
                        <div className="candidate-hero-content">
                            <div className="candidate-portrait parallax-image" data-speed="0.8" >
                                <div className="portrait-placeholder" style={{
                                    backgroundImage: "url('https://res.cloudinary.com/dnj1qfnrv/image/upload/v1773657166/upc-election/candidats/dybud1ai7pi6ugse5sdv.jpg')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundPosition: "50% 50%"
                                }}>
                                    <span className="portrait-number">05</span>
                                </div>
                            </div>
                            <div className="candidate-hero-text">
                                <h1 className="candidate-name reveal">
                                    {candidateId === 'goaty' ? 'GOATY' : 'PAS DISPONIBLE'}
                                    <br />
                                    <span className="accent">{candidateId === 'goaty' ? 'GOATY' : 'PAS DISPONIBLE'}</span>
                                </h1>
                                <p className="candidate-vision reveal">Financial Clarity &amp; Open Books</p>
                                <div className="candidate-bio reveal">
                                    <p>
                                        Une chevre remplie d'energie et de passion pour l'education. Passioné de la vie, de la nature et des animaux.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="program" className="program-detail-section">
                        <div className="program-grid">
                            <div className="program-column reveal">
                                <h2 className="column-title">
                                    MISSION
                                    <br />
                                    <span className="accent">DE GOATY</span>
                                </h2>
                                <div className="column-content">
                                    <p className="lead-paragraph">Nous sommes fatigués des portes fermées et des budgets en boîte noire. Notre mission est la transparence radicale.</p>
                                    <p>
                                        Chaque étudiant mérite de savoir exactement où vont ses frais de scolarité et de syndicat. Depuis trop longtemps, le budget de l'union étudiante a été un document opaque. Il est temps d'ouvrir les livres.
                                    </p>
                                </div>
                            </div>

                            <div className="program-column reveal">
                                <h2 className="column-title">
                                    ACTION PLAN
                                    <br />
                                    <span className="accent">DE GOATY</span>
                                </h2>
                                <div className="column-content action-items">
                                    <div className="action-item">
                                        <div className="item-number">1.0</div>
                                        <h3>Open-Book Budgeting</h3>
                                        <p>Accès complet et public à tous les documents financiers de l'union étudiante, mis à jour mensuellement sur un tableau de bord accessible.</p>
                                    </div>
                                    <div className="action-item">
                                        <div className="item-number">2.0</div>
                                        <h3>Financial Transparency Audits</h3>
                                        <p>Évaluations indépendantes obligatoires à chaque semestre, avec publication directe des résultats auprès de la communauté étudiante.</p>
                                    </div>
                                    <div className="action-item">
                                        <div className="item-number">3.0</div>
                                        <h3>Réaffectation des surplus</h3>
                                        <p>Identification des gaspillages administratifs et réaffectation des budgets excédentaires directement vers des subventions d'urgence pour les étudiants.</p>
                                    </div>
                                    <div className="action-item">
                                        <div className="item-number">4.0</div>
                                        <h3>Herbe</h3>
                                        <p>De la bonne herbe verte pour tous + Vody !.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="quote-section">
                        <div className="quote-container reveal">
                            <span className="quote-mark">"</span>
                            <blockquote className="candidate-quote">Je prefere souffrir maintenant pour pouvoir rigoler demain</blockquote>
                            <cite className="quote-author">— GOATY</cite>
                        </div>
                    </section>

                    <section className="marquee-section">
                        <div className="marquee">
                            <span>VOTE GOATY • VODY HERBE • VOTE GOATY • RENOUVEAU CHANGEMENT • </span>
                        </div>
                    </section>
                </main>
            ) : (
                <main>
                    <section className="candidate-hero">
                        <div className="candidate-hero-content">
                            <h1 className="candidate-name">CANDIDAT</h1>
                            <p className="candidate-subtitle">Étudiant UPC • 2026</p>
                        </div>
                    </section>
                </main>
            )}
            <footer>
                <div className="footer-content">
                    <h2>CROIS EN MOI.</h2>
                    <Link href="/vote" className="btn-massive">
                        VOTER
                    </Link>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 UPC Elections.</p>
                </div>
            </footer>
        </div>
    );
}
