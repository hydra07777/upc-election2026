import Link from 'next/link';
import HomeClientEffects from '../_components/HomeClientEffects';

export const metadata = {
    title: 'Alex Mercer - UPC Elections',
};

export default function CandidatePage() {
    return (
        <div className="candidate-page">
            <HomeClientEffects />

            <div className="custom-cursor" />
            <div className="noise-overlay" />

            <nav className="site-nav">
                <div className="nav-brand">UPC '26 ELECTIONS</div>
                <div className="nav-links">
                    <Link href="/">← Back to Home</Link>
                    <a href="#program" className="btn-primary">
                        Full Program
                    </a>
                </div>
            </nav>

            <main>
                <section className="candidate-hero">
                    <div className="candidate-hero-content">
                        <div className="candidate-portrait parallax-image" data-speed="0.8">
                            <div className="portrait-placeholder">
                                <span className="portrait-number">01</span>
                            </div>
                        </div>
                        <div className="candidate-hero-text">
                            <h1 className="candidate-name reveal">
                                ALEX
                                <br />
                                <span className="accent">MERCER.</span>
                            </h1>
                            <p className="candidate-vision reveal">Financial Clarity &amp; Open Books</p>
                            <div className="candidate-bio reveal">
                                <p>
                                    A third-year law student with a track record of holding the administration accountable. Alex has been fighting for student rights since
                                    day one, leading the transparency initiative last spring.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="program" className="program-detail-section">
                    <div className="program-grid">
                        <div className="program-column reveal">
                            <h2 className="column-title">
                                THE
                                <br />
                                MISSION
                            </h2>
                            <div className="column-content">
                                <p className="lead-paragraph">We are tired of closed doors and black-box budgets. Our mission is radical transparency.</p>
                                <p>
                                    Every student has a right to know exactly where their tuition dollars and union fees are going. For too long, the student union budget has
                                    been an opaque document. It's time to open the books.
                                </p>
                            </div>
                        </div>

                        <div className="program-column reveal">
                            <h2 className="column-title">
                                THE
                                <br />
                                ACTION PLAN
                            </h2>
                            <div className="column-content action-items">
                                <div className="action-item">
                                    <div className="item-number">1.0</div>
                                    <h3>Open-Book Budgeting</h3>
                                    <p>Complete public access to all student union financial records, updated monthly on an accessible dashboard.</p>
                                </div>
                                <div className="action-item">
                                    <div className="item-number">2.0</div>
                                    <h3>Financial Transparency Audits</h3>
                                    <p>Mandatory independent audits every semester, with results published directly to the student body.</p>
                                </div>
                                <div className="action-item">
                                    <div className="item-number">3.0</div>
                                    <h3>Surplus Reallocation</h3>
                                    <p>Identifying administrative bloat and reallocating surplus budgets directly into emergency student grants.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="quote-section">
                    <div className="quote-container reveal">
                        <span className="quote-mark">"</span>
                        <blockquote className="candidate-quote">Transparency isn’t just a buzzword. It’s the foundation of trust. Without it, we have nothing.</blockquote>
                        <cite className="quote-author">— Alex Mercer</cite>
                    </div>
                </section>

                <section className="marquee-section">
                    <div className="marquee">
                        <span>ELECT ALEX MERCER • RADICAL TRANSPARENCY • ELECT ALEX MERCER • RADICAL TRANSPARENCY • </span>
                    </div>
                </section>
            </main>

            <footer>
                <div className="footer-content">
                    <h2>Believe in Better.</h2>
                    <Link href="/#countdown" className="btn-massive">
                        PLEDGE YOUR VOTE
                    </Link>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 UPC Elections - Official Portal.</p>
                </div>
            </footer>
        </div>
    );
}
