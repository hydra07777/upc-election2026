import Link from 'next/link';
import HomeClientEffects from './_components/HomeClientEffects';
import { createServerSupabaseClient } from '../lib/supabase/server';

export default async function HomePage() {
    const supabase = await createServerSupabaseClient();

    const { data: electionSetting } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'date_election')
        .maybeSingle();

    const countdownDate = electionSetting?.value ?? null;

    return (
        <>
            <HomeClientEffects />

            <div className="custom-cursor" />
            <div className="noise-overlay" />

            <nav className="site-nav">
                <div className="nav-brand">UPC '26 ELECTIONS</div>
                <div className="nav-links">
                    <a href="#about">About</a>
                    <a href="#candidates">Candidates</a>
                    <a href="#countdown" className="btn-primary">
                        Countdown
                    </a>
                </div>
            </nav>

            <main>
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title" data-speed="calc(1 - 0.5)">
                            <span className="line">YOUR VOICE.</span>
                            <span className="line accent">YOUR CHOICE.</span>
                            <span className="line">THE FUTURE</span>
                            <span className="line">IS NOW.</span>
                        </h1>
                        <p className="hero-subtitle">
                            The '26 University Elections are here. Five candidates. One presidency. It's time to decide the editorial shift of our university.
                            Demand better. Expect more.
                        </p>
                    </div>
                    <div className="scroll-indicator">
                        <span>SCROLL</span>
                        <div className="line-down" />
                    </div>
                </section>

                <section id="countdown" className="countdown-section">
                    <div className="countdown-container">
                        <h3 className="countdown-subtitle">Election</h3>
                        <h2 className="countdown-title">COUNTDOWN</h2>
                        <div className="timer" id="timer" data-countdown-date={countdownDate ?? undefined}>
                            <div className="time-block">
                                <span className="time-value" id="days">
                                    14
                                </span>
                                <span className="time-label">DAYS</span>
                            </div>
                            <span className="separator">:</span>
                            <div className="time-block">
                                <span className="time-value" id="hours">
                                    00
                                </span>
                                <span className="time-label">HOURS</span>
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
                                <span className="time-label">SECONDS</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="about" className="about-section">
                    <h2 className="section-title">ABOUT THE ELECTION</h2>
                    <div className="about-content grid">
                        <div className="about-text reveal">
                            <p className="lead">
                                The upcoming election will determine the trajectory of our campus community for the next academic year.
                            </p>
                            <p>
                                Every student has a voice. The presidency is not just a title; it is a profound responsibility to lead, listen, and advocate for every
                                faculty and department. This year, the stakes are higher than ever, with 5 distinct visions for the future.
                            </p>
                        </div>
                        <div className="about-stats reveal">
                            <div className="stat">
                                <span className="stat-number">5</span>
                                <span className="stat-label">CANDIDATES</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">30K+</span>
                                <span className="stat-label">ELIGIBLE VOTERS</span>
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
                                        "url('https://res.cloudinary.com/dnj1qfnrv/image/upload/v1773444138/upc-election/candidats/cvxryal72tnmfs4zg9x3.jpg')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="candidate-number">01</div>
                            </div>
                            <div className="candidate-info">
                                <h3>Alex Mercer</h3>
                                <p className="role">Vision: Financial Clarity &amp; Open Books</p>
                                <div className="program">
                                    <h4>Key Platform Points:</h4>
                                    <ul>
                                        <li>Complete open-book budgeting for all student union funds.</li>
                                        <li>Monthly financial transparency audits.</li>
                                        <li>Reallocating surplus budget to student grants.</li>
                                    </ul>
                                </div>
                                <p style={{ marginTop: '1.5rem' }}>
                                    <Link href="/candidate">Read more →</Link>
                                </p>
                            </div>
                        </div>

                        <div className="candidate reveal">
                            <div className="candidate-image-placeholder">
                                <div className="candidate-number">02</div>
                            </div>
                            <div className="candidate-info">
                                <h3>Jordan Lee</h3>
                                <p className="role">Vision: Digital Infrastructure &amp; Modernization</p>
                                <div className="program">
                                    <h4>Key Platform Points:</h4>
                                    <ul>
                                        <li>Overhaul of the university's enrollment portal.</li>
                                        <li>Campus-wide Wi-Fi 6E upgrade guaranteed.</li>
                                        <li>Creation of a centralized app for all student services.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="candidate reveal">
                            <div className="candidate-image-placeholder">
                                <div className="candidate-number">03</div>
                            </div>
                            <div className="candidate-info">
                                <h3>Samira Tariq</h3>
                                <p className="role">Vision: Academic Reform &amp; Flexibility</p>
                                <div className="program">
                                    <h4>Key Platform Points:</h4>
                                    <ul>
                                        <li>Mandatory lecture recordings across all faculties.</li>
                                        <li>More flexible grading options (Pass/Fail expansion).</li>
                                        <li>Increased mental health days for academic relief.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="candidate reveal">
                            <div className="candidate-image-placeholder">
                                <div className="candidate-number">04</div>
                            </div>
                            <div className="candidate-info">
                                <h3>Casey Novak</h3>
                                <p className="role">Vision: Sustainability &amp; Green Campus</p>
                                <div className="program">
                                    <h4>Key Platform Points:</h4>
                                    <ul>
                                        <li>Carbon-neutral campus operations by 2030.</li>
                                        <li>Elimination of single-use plastics in all dining halls.</li>
                                        <li>Investment in campus community gardens.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="candidate reveal">
                            <div className="candidate-image-placeholder">
                                <div className="candidate-number">05</div>
                            </div>
                            <div className="candidate-info">
                                <h3>Taylor Reed</h3>
                                <p className="role">Vision: Student Life &amp; Inclusivity</p>
                                <div className="program">
                                    <h4>Key Platform Points:</h4>
                                    <ul>
                                        <li>24/7 access to libraries and study spaces.</li>
                                        <li>Increased funding for cultural and marginalized student clubs.</li>
                                        <li>Revitalized campus events and accessible recreational spaces.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="marquee-section">
                    <div className="marquee">
                        <span>
                            YOUR VOICE MATTERS • UPC '26 ELECTIONS • 5 CANDIDATES • 1 FUTURE • YOUR VOICE MATTERS • UPC '26 ELECTIONS •
                        </span>
                    </div>
                </section>
            </main>

            <footer>
                <div className="footer-content">
                    <h2>Who Will Lead?</h2>
                    <Link href="#candidates" className="btn-massive">
                        MEET THEM ALL
                    </Link>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 UPC Elections - Official Portal.</p>
                    <p style={{ marginTop: '1rem' }}>
                        <Link href="/vote">Vote →</Link>
                        {'  '}|{'  '}
                        <Link href="/result">Results →</Link>
                    </p>
                </div>
            </footer>
        </>
    );
}
