import React, { useEffect } from "react";
import Head from "next/head";
import Section from "../src-nextjs/components/Section";
import CreativePortfolio from "../src-nextjs/components/CreativePortfolio";
import { useLightbox } from "../src-nextjs/hooks/useLightbox";
import { useContactForm } from "../src-nextjs/hooks/useContactForm";

export default function Home() {
  useEffect(() => {
    // Theme Toggle Functionality
    const initThemeToggle = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      
      const themeToggle = document.getElementById('themeToggle');
      const body = document.body;
      
      // Check for saved theme preference or default to 'light'
      const currentTheme = localStorage.getItem('theme') || 'light';
      body.setAttribute('data-theme', currentTheme);
      
      themeToggle?.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
    };

    // Fade In Animation
    const initFadeInAnimation = () => {
      if (typeof document === 'undefined') return;
      
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, observerOptions);

      // Observe all elements with fade-in class
      document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up').forEach(el => {
        observer.observe(el);
      });
    };

    // Scroll to Top Functionality
    const initScrollToTop = () => {
      if (typeof window === 'undefined') return;
      
      const scrollToTopBtn = document.getElementById('scrollToTop');
      
      const toggleScrollToTop = () => {
        if (window.pageYOffset > 300) {
          scrollToTopBtn?.classList.add('visible');
        } else {
          scrollToTopBtn?.classList.remove('visible');
        }
      };

      window.addEventListener('scroll', toggleScrollToTop);
      
      scrollToTopBtn?.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    };

    // Counter Animation
    const initCounters = () => {
      if (typeof document === 'undefined') return;
      
      const counters = document.querySelectorAll('.counter');
      
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const element = counter as HTMLElement;
        const startValue = 0;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        function updateCounter(currentTime: number) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
          
          element.textContent = currentValue.toString();
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            element.textContent = target.toString(); // Ensure final value is exact
          }
        }
        
        requestAnimationFrame(updateCounter);
      });
    };

    initThemeToggle();
    initFadeInAnimation();
    initScrollToTop();
    initCounters();
  }, []);

  // Initialize additional features
  useLightbox();
  useContactForm();

  return (
    <>
      <Head>
        <title>sonoaacservices - Professional Web Design for Small Businesses</title>
        <meta name="description" content="Clean, minimal websites for local businesses. Custom web design services for hair salons, cafés, fitness studios, and small business consultants." />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header provided globally */}

      {/* Hero Section */}
      <section id="hero" className="section text-center">
        {/* Background Video */}
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="https://res.cloudinary.com/douwohuoh/video/upload/q_auto,f_auto/v1748826495/bafae065-4c19-427b-a0b1-ea9bf40b9de1_qc63qo.mp4" type="video/mp4" />
        </video>
        {/* Video Overlay */}
        <div className="hero-overlay"></div>
        
        <div className="container fade-in">
          <h1>Grow that business from the comfort of your couch</h1>
          <p className="lead">We offer website creation for small businesses, security installation & monitoring, and advertising that reaches 100k people in the first month or your money back.</p>
          <a href="#portfolio" className="btn mt-4">See My Work</a>
          <a href="tel:+18624052498" className="btn mt-4 call-btn" style={{marginLeft: '1rem'}}>Call Now</a>
        </div>
        
        {/* Background SVG removed */}
      </section>



      {/* Portfolio / Featured Projects Section */}
      <section id="portfolio" className="section">
        <div className="container text-center">
          <h2 className="fade-in" style={{ 
            borderBottom: '2px solid var(--accent-color)', 
            display: 'inline-block', 
            paddingBottom: '0.25rem' 
          }}>
            My Work
          </h2>
          
                  {/* Creative Portfolio Component */}
                  <CreativePortfolio 
                    items={[
                      { text: 'SonoaacResume', link: 'https://sonoaacresume.com' },
                      { text: 'IshRealm Shop', link: 'https://ishrealm.shop' }
                    ]}
                  />
          <p className="text-sm mt-4 fade-in">Click the folder to explore my projects • Click individual links to visit live sites</p>
        </div>
      </section>


      {/* Contact Section removed as requested */}

      {/* Scroll to Top Button */}
      <button className="scroll-to-top" id="scrollToTop" aria-label="Scroll to top">
        ↑
      </button>

      {/* Lightbox */}
      <div className="lightbox" id="lightbox">
        <div className="lightbox-content">
          <button className="lightbox-close" id="lightboxClose">&times;</button>
          <img id="lightboxImage" src="" alt="" />
        </div>
        </div>

      {/* Footer provided globally */}
    </>
  );
}
