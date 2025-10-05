import React from "react";

const Footer = () => (
  <footer className="footer" style={{ backgroundColor: '#f0f0f0', color: '#000000' }}>
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="logo mb-4">
            <span className="logo-text" style={{ 
              background: 'linear-gradient(45deg, #ff69b4, #00ff00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 'bold'
            }}>sonoaacservices</span>
          </div>
          <p style={{ color: '#000000', textShadow: '0 1px 0 #ffffff' }}>Professional web design for small businesses that value simplicity and authenticity.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3" style={{ color: '#000000', textShadow: '0 1px 0 #ffffff' }}>Contact</h4>
          <ul className="space-y-2" style={{ color: '#000000' }}>
            <li><strong>Email:</strong> <a href="mailto:contact@sonoaacservices.com" className="hover:opacity-80" style={{ color: '#000000' }}>contact@sonoaacservices.com</a></li>
            <li><strong>Phone:</strong> <a href="tel:+18624052498" className="hover:opacity-80" style={{ color: '#000000' }}>(862) 405-2498</a></li>
            <li><strong>Response Time:</strong> Usually within 24 hours</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3" style={{ color: '#000000', textShadow: '0 1px 0 #ffffff' }}>Company</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-6">
            <li><a href="#hero" className="hover:opacity-80" style={{ color: '#000000' }}>Home</a></li>
            <li><a href="#portfolio" className="hover:opacity-80" style={{ color: '#000000' }}>Portfolio</a></li>
            <li><a href="#contact" className="hover:opacity-80" style={{ color: '#000000' }}>Contact</a></li>
            <li><a href="#careers" className="hover:opacity-80" style={{ color: '#000000' }}>Career Opportunities</a></li>
            <li><a href="#about" className="hover:opacity-80" style={{ color: '#000000' }}>About Me</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6" style={{ borderTop: '1px solid #d9d9d9' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4" style={{ color: '#000000' }}>
          <p>&copy; 2025 sonoaacservices. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#privacy" className="hover:opacity-80" style={{ color: '#000000' }}>Privacy</a>
            <a href="#terms" className="hover:opacity-80" style={{ color: '#000000' }}>Terms</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;