/**
 * JChemistry Accessibility Helpers (WCAG AA Compliance)
 * Handles focus trapping, keyboard navigation, and aria toggling.
 */

const JChemAccess = {
  // Selectors for focusable elements
  focusableSelectors: [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[tabindex="0"]',
    '[contenteditable]'
  ].join(','),

  /**
   * Trap focus within a container element.
   * @param {HTMLElement} container The container to trap focus inside.
   * @param {Event} event The keydown keyboard event.
   */
  trapFocus(container, event) {
    if (!container || event.key !== 'Tab') return;

    const focusables = Array.from(container.querySelectorAll(this.focusableSelectors)).filter(
      el => el.tabIndex !== -1 && !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
    );

    if (focusables.length === 0) {
      event.preventDefault();
      return;
    }

    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    if (event.shiftKey) {
      // Shift + Tab (Backward)
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        event.preventDefault();
      }
    } else {
      // Tab (Forward)
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        event.preventDefault();
      }
    }
  },

  /**
   * Save the active element to return focus to it later.
   */
  _previouslyFocusedElement: null,

  saveFocus() {
    this._previouslyFocusedElement = document.activeElement;
  },

  restoreFocus() {
    if (this._previouslyFocusedElement && typeof this._previouslyFocusedElement.focus === 'function') {
      this._previouslyFocusedElement.focus();
    }
  },

  /**
   * Initialize custom focus indicators or skip link behaviors
   */
  init() {
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        const targetId = skipLink.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.setAttribute('tabindex', '-1');
          targetEl.focus();
        }
      });
    }
  }
};

// Export to window object
window.JChemAccess = JChemAccess;
