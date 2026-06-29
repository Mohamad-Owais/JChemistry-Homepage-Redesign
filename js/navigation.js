/**
 * JChemistry Navigation Controller
 * Manages desktop mega-menus, sticky header scroll, mobile side drawer, accordions, and search overlay.
 */

const JChemNav = {
  // Elements
  elements: {},

  initElements() {
    this.elements = {
      header: document.querySelector('.header-main'),
      hamburger: document.querySelector('.hamburger-menu'),
      drawer: document.querySelector('.mobile-drawer'),
      drawerClose: document.querySelector('.mobile-drawer__close'),
      overlay: document.querySelector('.overlay'),
      searchTrigger: document.querySelector('.nav-actions__search-btn'),
      searchOverlay: document.querySelector('.search-overlay'),
      searchClose: document.querySelector('.search-overlay__close'),
      searchInput: document.querySelector('.search-overlay__input'),
      searchBody: document.getElementById('search-overlay-body'),
      coursesDropdownTrigger: document.querySelector('[data-courses-trigger]'),
      megaMenu: document.querySelector('.mega-menu'),
      accordionTrigger: document.querySelector('.mobile-drawer__accordion-btn'),
      accordionPanel: document.querySelector('.mobile-drawer__accordion-panel'),
      body: document.body
    };
  },

  /**
   * Bind DOM event listeners
   */
  bindEvents() {
    const el = this.elements;

    // 1. Sticky / Scrolled Header
    window.addEventListener('scroll', () => this.handleScroll());

    // 2. Mobile Drawer Opens / Closes
    if (el.hamburger) {
      el.hamburger.addEventListener('click', () => this.toggleDrawer());
    }
    if (el.drawerClose) {
      el.drawerClose.addEventListener('click', () => this.closeDrawer());
    }

    // 3. Mobile Accordion Toggle
    if (el.accordionTrigger) {
      el.accordionTrigger.addEventListener('click', () => this.toggleAccordion());
    }

    // 4. Search Overlay Toggle
    if (el.searchTrigger) {
      el.searchTrigger.addEventListener('click', () => this.openSearch());
    }
    if (el.searchClose) {
      el.searchClose.addEventListener('click', () => this.closeSearch());
    }

    // 5. Global Overlay Click (closes drawer or search)
    if (el.overlay) {
      el.overlay.addEventListener('click', () => {
        this.closeDrawer();
        this.closeSearch();
      });
    }

    // 6. Keyboard Interactions (Escape key, traps, etc.)
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // 7. Desktop Mega Menu Keyboard Assist
    if (el.coursesDropdownTrigger) {
      el.coursesDropdownTrigger.addEventListener('keydown', (e) => this.handleMegaMenuKey(e));
      
      const coursesItem = el.coursesDropdownTrigger.closest('.nav-menu__item');
      if (coursesItem) {
        coursesItem.addEventListener('mouseleave', () => {
          if (el.megaMenu) el.megaMenu.classList.remove('is-closed');
        });
        coursesItem.addEventListener('focusout', (e) => {
          if (el.megaMenu && !coursesItem.contains(e.relatedTarget)) {
            el.megaMenu.classList.remove('is-closed');
          }
        });
      }
    }
  },

  /**
   * Scroll Listener - Slides header utility bar away
   */
  handleScroll() {
    const el = this.elements;
    if (!el.header) return;

    if (window.scrollY > 40) {
      el.header.classList.add('is-scrolled');
    } else {
      el.header.classList.remove('is-scrolled');
    }
  },

  /**
   * Open Mobile Navigation Drawer
   */
  toggleDrawer() {
    const el = this.elements;
    if (!el.drawer) return;

    const isActive = el.drawer.classList.contains('is-active');
    if (isActive) {
      this.closeDrawer();
    } else {
      window.JChemAccess.saveFocus();
      el.drawer.classList.add('is-active');
      el.overlay.classList.add('is-active');
      el.body.classList.add('scroll-locked');
      el.hamburger.setAttribute('aria-expanded', 'true');
      el.drawer.setAttribute('aria-hidden', 'false');
      
      // Delay focus slightly for slide transition to look smooth
      setTimeout(() => {
        const closeBtn = el.drawer.querySelector('.mobile-drawer__close');
        if (closeBtn) closeBtn.focus();
      }, 100);
    }
  },

  /**
   * Close Mobile Navigation Drawer
   */
  closeDrawer() {
    const el = this.elements;
    if (!el.drawer || !el.drawer.classList.contains('is-active')) return;

    el.drawer.classList.remove('is-active');
    el.overlay.classList.remove('is-active');
    el.body.classList.remove('scroll-locked');
    el.hamburger.setAttribute('aria-expanded', 'false');
    el.drawer.setAttribute('aria-hidden', 'true');
    
    window.JChemAccess.restoreFocus();
  },

  /**
   * Expand/Collapse Mobile Drawer Courses Accordion
   */
  toggleAccordion() {
    const el = this.elements;
    if (!el.accordionTrigger || !el.accordionPanel) return;

    const isOpen = el.accordionPanel.classList.contains('is-open');
    if (isOpen) {
      el.accordionPanel.classList.remove('is-open');
      el.accordionPanel.style.maxHeight = null;
      el.accordionTrigger.setAttribute('aria-expanded', 'false');
    } else {
      el.accordionPanel.classList.add('is-open');
      // Set scrollHeight for CSS transition
      el.accordionPanel.style.maxHeight = el.accordionPanel.scrollHeight + 'px';
      el.accordionTrigger.setAttribute('aria-expanded', 'true');
    }
  },

  /**
   * Open Search Overlay
   */
  openSearch() {
    const el = this.elements;
    if (!el.searchOverlay) return;

    window.JChemAccess.saveFocus();
    el.searchOverlay.classList.add('is-active');
    el.overlay.classList.add('is-active');
    el.body.classList.add('scroll-locked');
    el.searchOverlay.setAttribute('aria-hidden', 'false');

    // Show popular courses before user types
    this._renderPopularCourses();

    setTimeout(() => {
      if (el.searchInput) el.searchInput.focus();
    }, 150);
  },

  /**
   * Close Search Overlay
   */
  closeSearch() {
    const el = this.elements;
    if (!el.searchOverlay || !el.searchOverlay.classList.contains('is-active')) return;

    el.searchOverlay.classList.remove('is-active');
    el.overlay.classList.remove('is-active');
    el.body.classList.remove('scroll-locked');
    el.searchOverlay.setAttribute('aria-hidden', 'true');

    if (el.searchInput) el.searchInput.value = ''; // clear input
    window.JChemAccess.restoreFocus();
  },

  /**
   * Handle global keystrokes like Escape or focus trap redirects
   */
  handleKeyDown(e) {
    const el = this.elements;

    // ESC close overlay triggers
    if (e.key === 'Escape') {
      if (el.drawer && el.drawer.classList.contains('is-active')) {
        this.closeDrawer();
      }
      if (el.searchOverlay && el.searchOverlay.classList.contains('is-active')) {
        this.closeSearch();
      }
      
      // Close Mega Menu if visible (handles both click-to-open and hover states)
      const isMegaMenuVisible = el.megaMenu && 
                                (el.megaMenu.classList.contains('is-open') || 
                                 window.getComputedStyle(el.megaMenu).opacity === '1');
      if (isMegaMenuVisible && !el.megaMenu.classList.contains('is-closed')) {
        this.closeMegaMenu();
      }
    }

    // Trap tab index inside Mobile Drawer
    if (el.drawer && el.drawer.classList.contains('is-active')) {
      window.JChemAccess.trapFocus(el.drawer, e);
    }

    // Trap tab index inside Search Overlay
    if (el.searchOverlay && el.searchOverlay.classList.contains('is-active')) {
      window.JChemAccess.trapFocus(el.searchOverlay, e);
    }
  },

  /**
   * Keyboard Assist for Desktop Courses mega menu
   */
  handleMegaMenuKey(e) {
    const el = this.elements;
    if (!el.megaMenu || !el.coursesDropdownTrigger) return;

    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      
      const isExpanded = el.coursesDropdownTrigger.getAttribute('aria-expanded') === 'true';
      if (!isExpanded) {
        el.megaMenu.classList.remove('is-closed');
        el.coursesDropdownTrigger.setAttribute('aria-expanded', 'true');
        el.megaMenu.classList.add('is-open');
        
        // Focus the first link in the mega menu
        setTimeout(() => {
          const firstLink = el.megaMenu.querySelector('.mega-menu__link');
          if (firstLink) firstLink.focus();
        }, 50);
      } else {
        this.closeMegaMenu();
      }
    }
  },

  closeMegaMenu() {
    const el = this.elements;
    if (!el.megaMenu) return;
    el.megaMenu.classList.remove('is-open');
    el.megaMenu.classList.add('is-closed');
    el.coursesDropdownTrigger.setAttribute('aria-expanded', 'false');
    el.coursesDropdownTrigger.focus();
  },

  // ── Navbar Search ─────────────────────────────────────────────────────────

  /**
   * Render the top-6 courses by student count (popular courses).
   * Shown before the user types anything.
   */
  _renderPopularCourses() {
    const el = this.elements;
    if (!el.searchBody || !window.JChemHomepage) return;

    const popular = [...window.JChemHomepage.courses]
      .sort((a, b) => b.students - a.students)
      .slice(0, 6);

    el.searchBody.innerHTML = `
      <p class="search-overlay__section-label">Popular Courses</p>
      <ul class="search-results-list" role="listbox" aria-label="Popular courses">
        ${popular.map(c => this._renderSearchResultItem(c)).join('')}
      </ul>
      <p class="search-overlay__tip">Press <kbd>ESC</kbd> to close.</p>`;
  },

  /**
   * Render live search results.
   */
  _renderSearchResults(query) {
    const el = this.elements;
    if (!el.searchBody || !window.JChemHomepage) return;

    const results = window.JChemHomepage.filterCourses(query, 'All');

    if (results.length === 0) {
      el.searchBody.innerHTML = `
        <div class="search-empty-state" role="status" aria-live="polite">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="28" cy="28" r="18" stroke="currentColor" stroke-width="3"/>
            <line x1="41" y1="41" x2="56" y2="56" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <line x1="20" y1="28" x2="36" y2="28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
          <p class="search-empty-state__text">No matching courses found.</p>
        </div>`;
      return;
    }

    el.searchBody.innerHTML = `
      <p class="search-overlay__section-label">${results.length} result${results.length !== 1 ? 's' : ''} found</p>
      <ul class="search-results-list" role="listbox" aria-label="Search results">
        ${results.map(c => this._renderSearchResultItem(c)).join('')}
      </ul>`;
  },

  /**
   * Render a single search result list item.
   */
  _renderSearchResultItem(c) {
    return `
      <li class="search-result-item" role="option">
        <a href="#courses" class="search-result-item__link" aria-label="View ${c.title}">
          <span class="search-result-item__thumb" style="background-color:${c.thumb_bg};" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </span>
          <span class="search-result-item__info">
            <span class="search-result-item__title">${c.title}</span>
            <span class="search-result-item__meta">${c.exam} &middot; ${c.duration} &middot; ${c.price}</span>
          </span>
          <span class="search-result-item__arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </span>
        </a>
      </li>`;
  },

  /**
   * Initialise navbar search input live filtering
   */
  initSearch() {
    const el = this.elements;
    if (!el.searchInput) return;

    let debounce;

    el.searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      const q = el.searchInput.value.trim();
      debounce = setTimeout(() => {
        if (q) {
          this._renderSearchResults(q);
        } else {
          this._renderPopularCourses();
        }
      }, 120);
    });
  },

  // ── Setup hook to initialize ──────────────────────────────────────────────

  /**
   * Setup hook to initialize
   */
  init() {
    this.initElements();
    this.bindEvents();
    this.initSearch();
    this.handleScroll(); // Check scroll offset immediately on page load
  }
};

// Export to window object
window.JChemNav = JChemNav;

