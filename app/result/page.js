import Link from 'next/link';
import ResultClientEffects from '../_components/ResultClientEffects';

export const metadata = {
    title: 'Live Standings - UPC Elections',
};

export default function ResultPage() {
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
                        <div className="result-row">
                            <div className="result-info">
                                <span className="result-position">1ST</span>
                                <h3 className="result-name">Samira Tariq</h3>
                                <span className="result-percentage" data-target="32">
                                    0
                                </span>
                                <span>%</span>
                            </div>
                            <div className="result-bar-container">
                                <div className="result-bar" data-width="32%" />
                            </div>
                        </div>

                        <div className="result-row">
                            <div className="result-info">
                                <span className="result-position">2ND</span>
                                <h3 className="result-name">Alex Mercer</h3>
                                <span className="result-percentage" data-target="28">
                                    0
                                </span>
                                <span>%</span>
                            </div>
                            <div className="result-bar-container">
                                <div className="result-bar" data-width="28%" />
                            </div>
                        </div>

                        <div className="result-row">
                            <div className="result-info">
                                <span className="result-position">3RD</span>
                                <h3 className="result-name">Jordan Lee</h3>
                                <span className="result-percentage" data-target="20">
                                    0
                                </span>
                                <span>%</span>
                            </div>
                            <div className="result-bar-container">
                                <div className="result-bar" data-width="20%" />
                            </div>
                        </div>

                        <div className="result-row">
                            <div className="result-info">
                                <span className="result-position">4TH</span>
                                <h3 className="result-name">Taylor Reed</h3>
                                <span className="result-percentage" data-target="12">
                                    0
                                </span>
                                <span>%</span>
                            </div>
                            <div className="result-bar-container">
                                <div className="result-bar" data-width="12%" />
                            </div>
                        </div>

                        <div className="result-row">
                            <div className="result-info">
                                <span className="result-position">5TH</span>
                                <h3 className="result-name">Casey Novak</h3>
                                <span className="result-percentage" data-target="8">
                                    0
                                </span>
                                <span>%</span>
                            </div>
                            <div className="result-bar-container">
                                <div className="result-bar" data-width="8%" />
                            </div>
                        </div>
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
