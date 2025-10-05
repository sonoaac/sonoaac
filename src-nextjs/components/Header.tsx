import React, { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" id="scrollProgress"></div>
      
      {/* Sub-header removed as requested */}
      
      {/* Header */}
      <header 
        id="header" 
        className={`sticky z-50 transition-all duration-200 ${
          isScrolled ? 'scrolled shadow-lg' : ''
        }`}
        style={{ 
          top: 0, // sub-header touches header; header stays at top
          transition: 'top 0.3s ease-in-out',
          marginTop: 0
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="logo">
              <a href="#hero" className="logo-link" style={{ 
                background: 'linear-gradient(45deg, #ff69b4, #00ff00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 'bold'
              }}>
                sonoaacservices
              </a>
            </div>
            
            <nav>
              <ul className={`nav-list flex space-x-6 ${isMobileMenuOpen ? 'active' : ''}`}>
                <li><a href="/" className="nav-link" onClick={closeMobileMenu}>Home</a></li>
                <li><a href="#portfolio" className="nav-link" onClick={closeMobileMenu}>Portfolio</a></li>
                <li><a href="/quote" className="nav-link" onClick={closeMobileMenu}>Get Quote</a></li>
                <li><a href="#contact" className="nav-link" onClick={closeMobileMenu}>Contact</a></li>
                {/* Settings dropdown under profile icon */}
                <li className="relative">
                  <details>
                    <summary className="nav-link" style={{ cursor: 'pointer', listStyle: 'none' }}>
                      <span role="img" aria-label="profile">👤</span>
                    </summary>
                    <div className="absolute right-0 mt-2 w-32 dropdown-menu" style={{ 
                      background: 'rgba(0, 0, 0, 0.9)', 
                      border: '1px solid rgba(255, 255, 255, 0.2)', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', 
                      zIndex: 2000, 
                      padding: '0.5rem 0',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <a href="/settings" className="block px-3 py-2 hover:bg-white hover:bg-opacity-10 rounded transition-colors" style={{ color: '#ffffff', background: 'black', textDecoration: 'none', fontSize: '0.9rem' }}>Settings</a>
                    </div>
                  </details>
                </li>
              </ul>
              
              <button 
                className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}