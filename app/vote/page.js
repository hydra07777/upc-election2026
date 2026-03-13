import Link from 'next/link';
import VoteClientEffects from '../_components/VoteClientEffects';

export const metadata = {
    title: 'Vote Now - UPC Elections',
};

export default function VotePage() {
    return (
        <div className="vote-page">
            <VoteClientEffects />

            <div className="custom-cursor" />
            <div className="noise-overlay" />

            <nav className="site-nav">
                <div className="nav-brand">UPC '26 ELECTIONS</div>
                <div className="nav-links">
                    <Link href="/">← Back to Home</Link>
                </div>
            </nav>

            <main className="vote-main">
                <form id="voteForm" className="vote-container">
                    <div className="vote-progress">
                        <span className="step-indicator active" data-step="1">
                            01 / FACULTY
                        </span>
                        <span className="step-indicator" data-step="2">
                            02 / YEAR
                        </span>
                        <span className="step-indicator" data-step="3">
                            03 / PRESIDENT
                        </span>
                    </div>

                    <section className="vote-step active" id="step-1">
                        <div className="step-header">
                            <h1 className="step-title">
                                SELECT
                                <br />
                                <span className="accent">FACULTY</span>
                            </h1>
                            <p className="step-desc">Choose your registered academic faculty.</p>
                        </div>
                        <div className="options-grid">
                            <label className="brutalist-radio">
                                <input type="radio" name="faculty" value="Engineering" required />
                                <span className="radio-content">ENGINEERING</span>
                            </label>
                            <label className="brutalist-radio">
                                <input type="radio" name="faculty" value="Law" />
                                <span className="radio-content">LAW</span>
                            </label>
                            <label className="brutalist-radio">
                                <input type="radio" name="faculty" value="Arts" />
                                <span className="radio-content">ARTS &amp; HUMANITIES</span>
                            </label>
                            <label className="brutalist-radio">
                                <input type="radio" name="faculty" value="Science" />
                                <span className="radio-content">SCIENCE</span>
                            </label>
                            <label className="brutalist-radio">
                                <input type="radio" name="faculty" value="Business" />
                                <span className="radio-content">BUSINESS</span>
                            </label>
                            <label className="brutalist-radio">
                                <input type="radio" name="faculty" value="Medicine" />
                                <span className="radio-content">MEDICINE</span>
                            </label>
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
                                ACADEMIC
                                <br />
                                <span className="accent">YEAR</span>
                            </h1>
                            <p className="step-desc">Select your current year of study.</p>
                        </div>
                        <div className="options-grid year-grid">
                            <label className="brutalist-radio">
                                <input type="radio" name="year" value="1st Year" required />
                                <span className="radio-content">1ST</span>
                            </label>
                            <label className="brutalist-radio">
                                <input type="radio" name="year" value="2nd Year" />
                                <span className="radio-content">2ND</span>
                            </label>
                            <label className="brutalist-radio">
                                <input type="radio" name="year" value="3rd Year" />
                                <span className="radio-content">3RD</span>
                            </label>
                            <label className="brutalist-radio">
                                <input type="radio" name="year" value="4th Year" />
                                <span className="radio-content">4TH</span>
                            </label>
                            <label className="brutalist-radio">
                                <input type="radio" name="year" value="Postgraduate" />
                                <span className="radio-content">POSTGRAD</span>
                            </label>
                        </div>
                        <div className="step-actions split">
                            <button type="button" className="btn-secondary prev-step">
                                ← BACK
                            </button>
                            <button type="button" className="btn-primary next-step" disabled>
                                CONTINUE →
                            </button>
                        </div>
                    </section>

                    <section className="vote-step" id="step-3">
                        <div className="step-header">
                            <h1 className="step-title">
                                PRESIDENTIAL
                                <br />
                                <span className="accent">CHOICE</span>
                            </h1>
                            <p className="step-desc">Select a candidate for the presidency.</p>
                        </div>
                        <div className="candidates-selection">
                            <label className="candidate-radio">
                                <input type="radio" name="candidate" value="Alex Mercer" required />
                                <div className="candidate-card">
                                    <div className="candidate-img-placeholder">01</div>
                                    <div className="candidate-details">
                                        <h3>Alex Mercer</h3>
                                        <p>Financial Clarity</p>
                                    </div>
                                </div>
                            </label>
                            <label className="candidate-radio">
                                <input type="radio" name="candidate" value="Jordan Lee" />
                                <div className="candidate-card">
                                    <div className="candidate-img-placeholder">02</div>
                                    <div className="candidate-details">
                                        <h3>Jordan Lee</h3>
                                        <p>Digital Modernization</p>
                                    </div>
                                </div>
                            </label>
                            <label className="candidate-radio">
                                <input type="radio" name="candidate" value="Samira Tariq" />
                                <div className="candidate-card">
                                    <div className="candidate-img-placeholder">03</div>
                                    <div className="candidate-details">
                                        <h3>Samira Tariq</h3>
                                        <p>Academic Reform</p>
                                    </div>
                                </div>
                            </label>
                            <label className="candidate-radio">
                                <input type="radio" name="candidate" value="Casey Novak" />
                                <div className="candidate-card">
                                    <div className="candidate-img-placeholder">04</div>
                                    <div className="candidate-details">
                                        <h3>Casey Novak</h3>
                                        <p>Green Campus</p>
                                    </div>
                                </div>
                            </label>
                            <label className="candidate-radio">
                                <input type="radio" name="candidate" value="Taylor Reed" />
                                <div className="candidate-card">
                                    <div className="candidate-img-placeholder">05</div>
                                    <div className="candidate-details">
                                        <h3>Taylor Reed</h3>
                                        <p>Student Inclusivity</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div className="step-actions split">
                            <button type="button" className="btn-secondary prev-step">
                                ← BACK
                            </button>
                            <button type="submit" className="btn-massive submit-vote" disabled>
                                CAST VOTE
                            </button>
                        </div>
                    </section>

                    <section className="vote-step" id="step-4">
                        <div className="confirmation-content">
                            <h1 className="success-title">
                                APPLICATION
                                <br />
                                <span className="accent">SENT</span>
                            </h1>
                            <p className="success-message">
                                Your voice has been recorded. Thank you for participating in the UPC '26 Elections.
                            </p>
                            <div className="receipt">
                                <div className="receipt-row">
                                    <span>FACULTY:</span> <span id="res-faculty">-</span>
                                </div>
                                <div className="receipt-row">
                                    <span>YEAR:</span> <span id="res-year">-</span>
                                </div>
                                <div className="receipt-row">
                                    <span>CANDIDATE:</span> <span id="res-candidate" className="accent">
                                        -
                                    </span>
                                </div>
                            </div>
                            <Link href="/" className="btn-primary">
                                RETURN HOME
                            </Link>
                        </div>
                    </section>
                </form>
            </main>
        </div>
    );
}
