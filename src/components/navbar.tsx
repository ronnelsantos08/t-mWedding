import { useState } from 'react';
import '../styles/navbar.css'

// The main App component that renders the elegant wedding navbar
const Navbar = () => {
    // State to manage the open/closed status of the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle the mobile menu state
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
           

            <nav className="navbar">
                <div className="navbar-content">
                    
                    {/* Couple's Names */}
                    <div className="names">
                        <h1>Tristan and Mara</h1>
                    </div>
                    
                    {/* Hamburger menu button for mobile */}
                    <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle navigation menu">
                        {isMenuOpen ? (
                            <svg className="close-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        ) : (
                            <svg className="hamburger-icon" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                    </button>
                    
                    {/* Navigation Links */}
                    <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <li><a href="" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                        <li><a href="#" onClick={() => setIsMenuOpen(false)}>Prenup</a></li>
                        <li><a href="#" onClick={() => setIsMenuOpen(false)}>Location</a></li>
                        <li><a href="/entourage" onClick={() => setIsMenuOpen(false)}>Entourage</a></li>
                        <li><a href="#" onClick={() => setIsMenuOpen(false)}>Dresscode</a></li>
                        <li><a href="#" onClick={() => setIsMenuOpen(false)}>RSVP</a></li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
