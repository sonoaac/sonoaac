import { useEffect } from 'react';

export const useLightbox = () => {
  useEffect(() => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
    
    if (lightbox && lightboxImage && lightboxClose) {
      // Add click handlers to all lightbox triggers
      lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(this: HTMLElement) {
          const img = this.querySelector('img') as HTMLImageElement;
          if (img) {
            // Use higher resolution image for lightbox
            const highResUrl = img.src.replace('w=400&h=300', 'w=1200&h=800');
            (lightboxImage as HTMLImageElement).src = highResUrl;
            (lightboxImage as HTMLImageElement).alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
          }
        });
      });
      
      // Close lightbox when clicking close button
      lightboxClose.addEventListener('click', closeLightbox);
      
      // Close lightbox when clicking outside the image
      lightbox.addEventListener('click', function(this: HTMLElement, e: Event) {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
      
      // Close lightbox with ESC key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
          closeLightbox();
        }
      });
    }
    
    function closeLightbox() {
      const lightbox = document.getElementById('lightbox');
      if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
      }
    }
  }, []);
};
