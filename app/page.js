import Link from 'next/link';
import HomeClientEffects from './_components/HomeClientEffects';
import { createServerSupabaseClient } from '../lib/supabase/server';

export default async function HomePage() {
    const supabase = await createServerSupabaseClient();

    const vues = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'vues')
        .maybeSingle();

    const newVues = Number(vues.data?.value || 0) + 1;
    await supabase.from('settings').update({ value: newVues }).eq('key', 'vues');

    const data = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'date_election')
        .maybeSingle();
    const { value } = data.data

    const countdownDate = value ?? null;

    return (
        <>
            <HomeClientEffects />

            <div className="custom-cursor" />
            <div className="noise-overlay" />

            <nav className="site-nav">
                <div className="nav-brand">UPC '26 ELECTIONS</div>
                <div className="nav-links">
                    <a href="#about">A PROPOS</a>
                    <a href="#candidates">CANDIDATS</a>
                    <a href="#countdown" >COMPTE A REBOURS </a>
                    <a href="/result">RESULTATS</a>
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
                <a href="#about" className="mobile-link">A PROPOS</a>
                <a href="#candidates" className="mobile-link">CANDIDATS</a>
                <a href="#countdown" className="mobile-link">DATE</a>
                <a href="/result" className="mobile-link mobile-link-accent">RESULTATS →</a>
                <a href="/vote" className="mobile-link mobile-link-accent">VOTE NOW →</a>
            </div>

            <main>
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title" data-speed="calc(1 - 0.5)">
                            <span className="line">VOTRE VOIX.</span>
                            <span className="line accent">VOTRE CHOIX.</span>
                            <span className="line">L'AVENIR</span>
                            <span className="line">NOW.</span>
                        </h1>
                        <p className="hero-subtitle">
                            Les élections universitaires de 2026 sont arrivées. Cinq candidats. Une présidence. Il est temps de décider de l'orientation éditoriale de notre université. Exigez mieux. Soyez plus exigeants.
                        </p>
                    </div>
                    <div className="scroll-indicator">
                        <span>SCROLL</span>
                        <div className="line-down" />
                    </div>
                </section>

                <section id="countdown" className="countdown-section">
                    <div className="countdown-container">
                        <h3 className="countdown-subtitle">Élection</h3>
                        <h2 className="countdown-title">COMPTAGE À REBOURS</h2>
                        <div className="timer" id="timer" data-countdown-date={countdownDate ?? undefined}>
                            <div className="time-block">
                                <span className="time-value" id="days">
                                    14
                                </span>
                                <span className="time-label">JOURS</span>
                            </div>
                            <span className="separator">:</span>
                            <div className="time-block">
                                <span className="time-value" id="hours">
                                    00
                                </span>
                                <span className="time-label">HEURES</span>
                            </div>
                            <span className="separator">:</span>
                            <div className="time-block">
                                <span className="time-value" id="minutes">
                                    00
                                </span>
                                <span className="time-label">MINUTES</span>
                            </div>
                            <span className="separator">:</span>
                            <div className="time-block">
                                <span className="time-value" id="seconds">
                                    00
                                </span>
                                <span className="time-label">SECONDES</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="about" className="about-section">
                    <h2 className="section-title">A PROPOS DE L'ÉLECTION</h2>
                    <div className="about-content grid">
                        <div className="about-text reveal">
                            <p className="lead">
                                Les prochaines élections détermineront la trajectoire de notre communauté universitaire pour la prochaine année académique.
                            </p>
                            <p>
                                Chaque étudiant a son mot à dire. La présidence n'est pas qu'un titre ; c'est une responsabilité profonde : celle de diriger, d'écouter et de défendre les intérêts de chaque
                                faculté et département. Cette année, les enjeux sont plus importants que jamais, avec cinq visions distinctes pour l'avenir.</p>
                        </div>
                        <div className="about-stats reveal">
                            <div className="stat">
                                <span className="stat-number">4</span>
                                <span className="stat-label">CANDIDATS</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">10K+</span>
                                <span className="stat-label">ÉLECTEURS ADMISSIBLES</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">1</span>
                                <span className="stat-label">PRESIDENT</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="candidates" className="candidates-section">
                    <h2 className="section-title">THE CANDIDATES</h2>
                    <div className="candidate-showcase">
                        <div className="candidate reveal">
                            <div
                                className="candidate-image-placeholder"
                                style={{
                                    backgroundImage:
                                        "url('https://res.cloudinary.com/dnj1qfnrv/image/upload/v1773580274/upc-election/candidats/alwfr5pqzwhvrjyipbty.jpg')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="candidate-number">01</div>
                            </div>
                            <div className="candidate-info">
                                <h3>ROSE TSHIBUABUA</h3>
                                <p className="role">Vision: RENAISSANCE</p>
                                <div className="program">
                                    <h4>Points clés:</h4>
                                    <ul>
                                        <li>BIENTOT DISPOSNIBLE</li>

                                    </ul>
                                </div>
                                <p style={{ marginTop: '1.5rem' }}>
                                    <Link href="/candidate?8fbfa0c2-3ce7-4e1c-af66-370f51e9fdf2">Read more →</Link>
                                </p>
                            </div>
                        </div>

                        <div className="candidate reveal">
                            <div className="candidate-image-placeholder"
                                style={{
                                    backgroundImage:
                                        "url('https://res.cloudinary.com/dnj1qfnrv/image/upload/v1773581251/upc-election/candidats/oezfldeqirfjvgupvpzk.jpg')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >

                                <div className="candidate-number">02</div>
                            </div>
                            <div className="candidate-info">
                                <h3>JORDAN TSHIOMBELA</h3>
                                <p className="role">Vision: CONSCIENCE</p>
                                <div className="program">
                                    <h4>Points clés:</h4>
                                    <ul>
                                        <li>BIENTOT DISPOSNIBLE</li>
                                    </ul>
                                    <p style={{ marginTop: '1.5rem' }}>
                                        <Link href="/candidate?eb3f1642-84c7-476c-85ef-a473ba335d48">Read more →</Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="candidate reveal">
                            <div className="candidate-image-placeholder"
                                style={{
                                    backgroundImage:
                                        "url('https://res.cloudinary.com/dnj1qfnrv/image/upload/v1773580167/upc-election/candidats/yafg23uj5zqsutnyy98o.jpg')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundPosition: " 5% 50%"
                                }}
                            >
                                <div className="candidate-number">03</div>
                            </div>
                            <div className="candidate-info">
                                <h3>ANANGINI NGANZI MERVEILLE</h3>
                                <p className="role">Vision: #PRI.ME</p>
                                <div className="program">
                                    <h4>Points clés:</h4>
                                    <ul>
                                        <li>BIENTOT DISPOSNIBLE</li>
                                    </ul>
                                    <p style={{ marginTop: '1.5rem' }}>
                                        <Link href="/candidate?a015f954-b4de-454d-a053-f1ef94231fd3">Read more →</Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="candidate reveal">
                            <div className="candidate-image-placeholder"
                                style={{
                                    backgroundImage:
                                        "url('')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundPosition: " 5% 50%"
                                }}
                            >
                                <div className="candidate-number">04</div>
                            </div>
                            <div className="candidate-info">
                                <h3>NON DISPOSNIBLE</h3>
                                <p className="role">Vision: NON DISPONIBLE</p>
                                <div className="program">
                                    <h4>Points clés:</h4>
                                    <ul>
                                        <li>NON DISPONIBLE</li>
                                    </ul>
                                    <p style={{ marginTop: '1.5rem' }}>
                                        <Link href="/candidate?eb3f1642-84c7-476c-85ef-a473ba335d48">Read more →</Link>
                                    </p>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>

                <section className="marquee-section">
                    <div className="marquee">
                        <span>
                            VOTRE VOIX COMPTE • UPC '26 ELECTIONS • 4 CANDIDATS • 1 FUTURE • VOTRE VOIX COMPTE • UPC '26 ELECTIONS •
                        </span>
                    </div>
                </section>
            </main>

            <footer>
                <div className="footer-content">
                    <h2>Qui prendra la tête ?</h2>
                    <Link href="/vote" className="btn-massive">
                        VOTEZ
                    </Link>
                </div>
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
        </>
    );
}
