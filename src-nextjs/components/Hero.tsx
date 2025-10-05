import React, { useEffect, useRef } from "react";
import Link from "next/link";

type HeroProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
};

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaLabel, ctaLink }) => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initialize blur text animation
    const initBlurText = () => {
      const heroHeading = heroRef.current?.querySelector('h1');
      const heroSubtext = heroRef.current?.querySelector('.lead');
      
      if (heroHeading) {
        const words = heroHeading.textContent?.split(' ') || [];
        heroHeading.innerHTML = '';
        heroHeading.classList.add('blur-text');
        
        words.forEach((word, index) => {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'word';
          wordSpan.textContent = word;
          heroHeading.appendChild(wordSpan);
          
          setTimeout(() => {
            wordSpan.classList.add('animate');
          }, index * 150);
        });
      }
      
      if (heroSubtext) {
        setTimeout(() => {
          const words = heroSubtext.textContent?.split(' ') || [];
          heroSubtext.innerHTML = '';
          heroSubtext.classList.add('blur-text');
          
          words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            wordSpan.textContent = word;
            heroSubtext.appendChild(wordSpan);
            
            setTimeout(() => {
              wordSpan.classList.add('animate');
            }, index * 100);
          });
        }, 800);
      }
    };

    // Initialize scroll progress
    const initScrollProgress = () => {
      const progressBar = document.getElementById('scrollProgress');
      if (progressBar) {
        const updateProgress = () => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrollPercent = (scrollTop / docHeight) * 100;
          progressBar.style.width = scrollPercent + '%';
        };
        
        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
      }
    };

    initBlurText();
    const cleanup = initScrollProgress();
    
    return cleanup;
  }, []);

  return (
    <section id="hero" ref={heroRef} className="section text-center relative overflow-hidden" style={{ 
      paddingTop: '120px',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Background Gradient */}
      <div 
        className="hero-bg-gradient"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #ff69b4 0%, #ffc0cb 50%, #ffffff 100%)',
          zIndex: -1,
          opacity: 0.1
        }}
      ></div>
      
      <div className="container fade-in relative z-10" style={{ 
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
          marginBottom: '2rem', 
          lineHeight: '1.1',
          fontFamily: 'var(--heading-font)',
          color: 'var(--text-color)',
          fontWeight: 'bold',
          textAlign: 'center',
          maxWidth: '1000px',
          margin: '0 auto 2rem auto'
        }}>
          Grow that business from the comfort of your couch
        </h1>
        
        <p 
          className="lead"
          style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
            color: '#333',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: '1.7',
            margin: '0 auto 3rem auto',
            fontWeight: '400'
          }}
        >
          We offer website creation for small businesses, security installation & monitoring, and advertising that reaches 100k people in the first month or your money back (we guarantee the reach, the rest is up to you).
        </p>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href={ctaLink}>
            <button className="btn" style={{ 
              fontSize: '1.2rem', 
              padding: '18px 36px',
              borderRadius: '8px',
              fontWeight: '600',
              background: 'var(--accent-color)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>{ctaLabel}</button>
          </Link>
        </div>
      </div>
      
      {/* Background SVG */}
      <svg 
        className="hero-bg" 
        viewBox="0 0 400 300" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
          opacity: 0.3
        }}
      >
        <circle 
          cx="200" 
          cy="150" 
          r="120" 
          stroke="var(--accent-color)" 
          strokeWidth="1" 
          opacity="0.05"
        />
        <circle 
          cx="200" 
          cy="150" 
          r="80" 
          stroke="var(--accent-color)" 
          strokeWidth="1" 
          opacity="0.08"
        />
        <circle 
          cx="200" 
          cy="150" 
          r="40" 
          stroke="var(--accent-color)" 
          strokeWidth="1" 
          opacity="0.1"
        />
      </svg>
    </section>
  );
};

export default Hero;