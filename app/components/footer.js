
"use client";
import Link from 'next/link';

export default function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <h2>Who Will Lead?</h2>
                <Link href="#candidates" className="btn-massive">
                    MEET THEM ALL
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
    );
}