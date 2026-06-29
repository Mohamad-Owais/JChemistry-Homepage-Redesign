/**
 * JChemistry Global Orchestrator
 * Bootstraps client-side handlers on DOM ready.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Accessibility Handlers
  if (window.JChemAccess && typeof window.JChemAccess.init === 'function') {
    window.JChemAccess.init();
  }

  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const root = document.documentElement;
    // Check local storage for preference
    const savedTheme = localStorage.getItem('jchem-theme');
    if (savedTheme === 'dark') {
      root.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', () => {
      root.classList.toggle('dark');
      const isDark = root.classList.contains('dark');
      localStorage.setItem('jchem-theme', isDark ? 'dark' : 'light');
    });
  }

  // Initialize Navigation Handlers
  if (window.JChemNav && typeof window.JChemNav.init === 'function') {
    window.JChemNav.init();
  }

  // Initialize Homepage Section Handlers (courses, categories, chips)
  if (window.JChemHomepage && typeof window.JChemHomepage.init === 'function') {
    window.JChemHomepage.init();
  }

  // Initialize Trust & Conversion Handlers (FAQ, testimonials, results)
  if (window.JChemTrust && typeof window.JChemTrust.init === 'function') {
    window.JChemTrust.init();
  }

  // Track viewport changes to clean up active drawer states if screen resized to desktop
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth >= 1024) {
        // If mobile drawer was active, close it as we transit to desktop view
        if (window.JChemNav && typeof window.JChemNav.closeDrawer === 'function') {
          window.JChemNav.closeDrawer();
        }
      }
    }, 150);
  });

  // Soft console log validation for developers
  console.log('JChemistry Foundation & Navigation initialized successfully.');
});
