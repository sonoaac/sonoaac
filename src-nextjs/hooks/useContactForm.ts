import { useEffect } from 'react';

export const useContactForm = () => {
  useEffect(() => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      // Add real-time validation
      const inputs = contactForm.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', function() {
          validateField(this);
        });
        
        input.addEventListener('input', function() {
          clearFieldValidation(this);
        });
      });
      
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject: Record<string, string> = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
          formObject[key] = value as string;
        }
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
          if (!validateField(input)) {
            isValid = false;
          }
        });
        
        if (!isValid) {
          return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]') as HTMLButtonElement;
        const originalText = submitBtn.textContent;
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
          showFormMessage('Thank you for your message! I\'ll get back to you within 24 hours.', 'success');
          contactForm.reset();
          
          // Clear all validation states
          inputs.forEach(input => {
            clearFieldValidation(input);
          });
          
          // Reset button
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }, 1500);
      });
    }
  }, []);
};

function validateField(field: Element): boolean {
  const input = field as HTMLInputElement;
  const formGroup = field.closest('.form-group');
  const value = input.value.trim();
  let isValid = true;
  let errorMessage = '';
  
  // Clear previous validation state
  clearFieldValidation(field);
  
  // Check if required field is empty
  if (input.hasAttribute('required') && !value) {
    errorMessage = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`;
    setFieldValidation(field, 'error', '✕', errorMessage);
    isValid = false;
  } else if (input.type === 'email' && value) {
    // Validate email format
    if (!isValidEmail(value)) {
      errorMessage = 'Please enter a valid email address';
      setFieldValidation(field, 'error', '✕', errorMessage);
      isValid = false;
    } else {
      setFieldValidation(field, 'success', '✓');
    }
  } else if (value) {
    // Field has valid content
    setFieldValidation(field, 'success', '✓');
  }
  
  return isValid;
}

function setFieldValidation(field: Element, state: string, icon: string, message = '') {
  const formGroup = field.closest('.form-group');
  const validationIcon = formGroup?.querySelector('.validation-icon');
  const errorElement = formGroup?.querySelector('.error-message');
  
  formGroup?.classList.remove('success', 'error');
  formGroup?.classList.add(state);
  
  if (validationIcon) {
    validationIcon.textContent = icon;
  }
  
  if (errorElement) {
    if (state === 'error' && message) {
      errorElement.textContent = message;
      errorElement.classList.add('visible');
    } else {
      errorElement.classList.remove('visible');
    }
  }
}

function clearFieldValidation(field: Element) {
  const formGroup = field.closest('.form-group');
  const errorElement = formGroup?.querySelector('.error-message');
  
  formGroup?.classList.remove('success', 'error');
  
  if (errorElement) {
    errorElement.classList.remove('visible');
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFormMessage(message: string, type: string) {
  // Remove existing message
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message
  const messageElement = document.createElement('div');
  messageElement.className = `form-message ${type}`;
  messageElement.innerHTML = message;
  
  // Style the message
  messageElement.style.cssText = `
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 0.25rem;
    font-weight: 500;
    ${type === 'success' 
      ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
      : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
    }
  `;
  
  // Insert message
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.insertBefore(messageElement, contactForm.firstChild);
    
    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remove success messages
    if (type === 'success') {
      setTimeout(() => {
        if (messageElement.parentNode) {
          messageElement.remove();
        }
      }, 5000);
    }
  }
}
