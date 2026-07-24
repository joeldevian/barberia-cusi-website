/**
 * BARBERÍA CUSI - ANIMATION SYSTEM
 * Client-side animation controller with Intersection Observer
 */

export function initScrollReveal() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Immediately show all elements for reduced motion users
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-blur').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  // Intersection Observer options
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Trigger 100px before element enters viewport
    threshold: 0.1,
  };

  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all scroll reveal elements
  document.querySelectorAll('.scroll-reveal, .scroll-reveal-blur').forEach(el => {
    observer.observe(el);
  });
}

export function initStaggerAnimation() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return;
  }

  // Add stagger index to each item
  document.querySelectorAll('.stagger-container').forEach(container => {
    const items = container.querySelectorAll('.stagger-item');
    items.forEach((item, index) => {
      (item as HTMLElement).style.setProperty('--stagger-index', index.toString());
    });
  });
}

export function initImageLoading() {
  // Progressive image loading
  document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
  });
}

export function initHoverEffects() {
  // Add hover classes to interactive elements
  const interactiveElements = document.querySelectorAll(
    '.btn, .card, a[href], button'
  );
  
  interactiveElements.forEach(el => {
    // Add appropriate hover class based on element type
    if (el.classList.contains('btn')) {
      el.classList.add('btn-press');
    }
    if (el.classList.contains('card')) {
      el.classList.add('hover-lift');
    }
  });
}

export function initPageTransition() {
  // Add page enter animation
  document.body.classList.add('page-enter');
}

// Initialize all animations
export function initAnimations() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveal();
      initStaggerAnimation();
      initImageLoading();
      initHoverEffects();
      initPageTransition();
    });
  } else {
    initScrollReveal();
    initStaggerAnimation();
    initImageLoading();
    initHoverEffects();
    initPageTransition();
  }
}

// Form validation shake effect
export function shakeElement(element: HTMLElement) {
  element.classList.add('shake');
  setTimeout(() => {
    element.classList.remove('shake');
  }, 400);
}

// Success check mark animation
export function showCheckMark(element: HTMLElement) {
  const checkMark = element.querySelector('.check-mark');
  if (checkMark) {
    checkMark.classList.add('check-mark');
  }
}

// Smooth scroll to element
export function smoothScrollTo(elementId: string, offset = 80) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}
