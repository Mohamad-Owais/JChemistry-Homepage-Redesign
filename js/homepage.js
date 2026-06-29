/**
 * JChemistry Homepage — Course Data & Section Interactions
 * Handles course card rendering, search, and filtering.
 */

const JChemHomepage = {

  courses: [
    {
      id: 1,
      title: 'CSIR-NET Chemical Sciences — Complete Batch',
      tutor: 'Jyoti Rathi',
      subject: 'All Subjects',
      exam: 'CSIR-NET',
      duration: '12 Months',
      durationMonths: 12,
      validity: '2 Years',
      rating: 4.9,
      students: 4820,
      price: '₹12,999',
      originalPrice: '₹24,000',
      badge: '46% OFF',
      thumb_bg: '#0e1e38',
      tags: ['complete', 'full syllabus', 'mock tests', 'csir net', 'chemical sciences'],
      syllabus: ['organic chemistry', 'inorganic chemistry', 'physical chemistry', 'analytical chemistry', 'biochemistry', 'thermodynamics', 'spectroscopy', 'kinetics']
    },
    {
      id: 2,
      title: 'GATE Chemistry — Physical & Organic Focus',
      tutor: 'Jyoti Rathi',
      subject: 'Physical & Organic',
      exam: 'GATE',
      duration: '8 Months',
      durationMonths: 8,
      validity: '18 Months',
      rating: 4.8,
      students: 3210,
      price: '₹9,999',
      originalPrice: '₹18,000',
      badge: '44% OFF',
      thumb_bg: '#17325c',
      tags: ['gate chemistry', 'gate ch', 'physical', 'organic', 'numerical'],
      syllabus: ['organic chemistry', 'physical chemistry', 'thermodynamics', 'quantum mechanics', 'reaction mechanisms', 'electrochemistry', 'kinetics']
    },
    {
      id: 3,
      title: 'IIT-JAM Chemistry — MSc Entrance Complete Prep',
      tutor: 'Jyoti Rathi',
      subject: 'All Subjects',
      exam: 'IIT-JAM',
      duration: '6 Months',
      durationMonths: 6,
      validity: '12 Months',
      rating: 4.7,
      students: 2180,
      price: '₹7,499',
      originalPrice: '₹14,000',
      badge: '46% OFF',
      thumb_bg: '#0f9f68',
      tags: ['iit jam', 'msc entrance', 'complete', 'jam chemistry'],
      syllabus: ['organic chemistry', 'inorganic chemistry', 'physical chemistry', 'coordination compounds', 'stereochemistry', 'quantum mechanics']
    },
    {
      id: 4,
      title: 'Organic Chemistry Mastery — Reactions & Mechanisms',
      tutor: 'Jyoti Rathi',
      subject: 'Organic Chemistry',
      exam: 'CSIR-NET',
      duration: '4 Months',
      durationMonths: 4,
      validity: '12 Months',
      rating: 4.9,
      students: 5430,
      price: '₹5,499',
      originalPrice: '₹10,000',
      badge: '45% OFF',
      thumb_bg: '#1e293b',
      tags: ['organic chemistry', 'reactions', 'mechanisms', 'stereochemistry', 'named reactions'],
      syllabus: ['reaction mechanisms', 'stereochemistry', 'named reactions', 'synthesis', 'aromatic chemistry', 'carbonyl chemistry', 'pericyclic reactions', 'photochemistry']
    },
    {
      id: 5,
      title: 'Physical Chemistry — Thermodynamics to Quantum',
      tutor: 'Jyoti Rathi',
      subject: 'Physical Chemistry',
      exam: 'GATE',
      duration: '3 Months',
      durationMonths: 3,
      validity: '12 Months',
      rating: 4.8,
      students: 3890,
      price: '₹4,999',
      originalPrice: '₹9,000',
      badge: '44% OFF',
      thumb_bg: '#0e1e38',
      tags: ['physical chemistry', 'thermodynamics', 'quantum', 'spectroscopy', 'kinetics'],
      syllabus: ['thermodynamics', 'quantum mechanics', 'spectroscopy', 'kinetics', 'electrochemistry', 'statistical mechanics', 'chemical bonding']
    },
    {
      id: 6,
      title: 'Inorganic Chemistry — Coordination & Bonding',
      tutor: 'Jyoti Rathi',
      subject: 'Inorganic Chemistry',
      exam: 'CSIR-NET',
      duration: '3 Months',
      durationMonths: 3,
      validity: '12 Months',
      rating: 4.7,
      students: 2940,
      price: '₹4,499',
      originalPrice: '₹8,000',
      badge: '43% OFF',
      thumb_bg: '#17325c',
      tags: ['inorganic chemistry', 'coordination compounds', 'bonding', 'organometallics', 'main group'],
      syllabus: ['coordination chemistry', 'bonding theory', 'organometallics', 'main group elements', 'd-block elements', 'crystal field theory', 'symmetry']
    }
  ],

  categories: [
    {
      title: 'Organic Chemistry',
      desc: 'Master reactions, mechanisms, stereochemistry and synthesis strategies.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9.5 2L5 8.5 9.5 15h5L19 8.5 14.5 2z"/>
        <circle cx="12" cy="8.5" r="1.5"/>
      </svg>`
    },
    {
      title: 'Physical Chemistry',
      desc: 'Thermodynamics, kinetics, quantum mechanics, spectroscopy and electrochemistry.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 3v18h18"/><path d="m7 16 4-7 4 4 3-6"/>
      </svg>`
    },
    {
      title: 'Inorganic Chemistry',
      desc: 'Coordination compounds, organometallics, bonding theory and main group elements.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>
        <path d="M4.93 4.93l2.12 2.12m9.9 9.9 2.12 2.12M19.07 4.93l-2.12 2.12m-9.9 9.9-2.12 2.12"/>
      </svg>`
    },
    {
      title: 'CSIR-NET',
      desc: 'Structured preparation for National Eligibility Test in Chemical Sciences.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>`
    },
    {
      title: 'GATE Chemistry',
      desc: 'Exam-oriented coaching covering the full GATE CH syllabus with numerical practice.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/>
      </svg>`
    },
    {
      title: 'IIT-JAM',
      desc: 'Goal-focused batch for IIT-JAM chemistry aspirants aiming for MSc admission.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>`
    }
  ],

  // ── State ──────────────────────────────────────────────────────────────────

  _state: {
    query: '',
    activeChip: 'All'
  },

  // ── Search / Filter Engine ─────────────────────────────────────────────────

  /**
   * Filter courses by text query AND active chip.
   * Matches against: title, tutor, subject, exam, tags, syllabus keywords.
   */
  filterCourses(query, chipFilter) {
    const q = (query || '').toLowerCase().trim();
    const chip = chipFilter || 'All';

    return this.courses.filter(c => {
      // Chip filter (exam, subject, or tag match)
      if (chip !== 'All') {
        const cl = chip.toLowerCase();
        const chipMatch =
          c.exam.toLowerCase().includes(cl) ||
          c.subject.toLowerCase().includes(cl) ||
          (c.tags || []).some(t => t.includes(cl));
        if (!chipMatch) return false;
      }

      // Text query filter
      if (!q) return true;

      const haystack = [
        c.title,
        c.tutor,
        c.subject,
        c.exam,
        ...(c.tags || []),
        ...(c.syllabus || [])
      ].join(' ').toLowerCase();

      return haystack.includes(q);
    });
  },

  // ── Rendering ─────────────────────────────────────────────────────────────

  renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    let stars = '';
    const starSvg = `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    const halfSvg = `<svg viewBox="0 0 24 24" style="opacity:.55"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    for (let i = 0; i < full; i++) stars += starSvg;
    if (half) stars += halfSvg;
    return stars;
  },

  thumbIconSvg: `<svg viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" opacity="0.5"/>
    <circle cx="32" cy="32" r="8" fill="currentColor"/>
  </svg>`,

  renderCourseCards(list) {
    return list.map(c => `
      <article class="course-card" aria-label="${c.title}">
        <!-- Thumbnail -->
        <div class="course-card__thumb-wrap" style="background-color: ${c.thumb_bg};">
          ${this.thumbIconSvg}
          <span class="course-card__badge">${c.badge}</span>
          <button class="course-card__wishlist" aria-label="Add ${c.title} to wishlist">
            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <!-- Content -->
        <div class="course-card__content">
          <p class="course-card__tutor">${c.tutor}</p>
          <h3 class="course-card__title">${c.title}</h3>
          <ul class="course-card__meta" aria-label="Course details">
            <li class="course-card__meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              ${c.duration}
            </li>
            <li class="course-card__meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              ${c.validity} Access
            </li>
            <li class="course-card__meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              ${c.exam}
            </li>
          </ul>
          <div class="course-card__rating-row">
            <div class="course-card__stars" aria-label="Rated ${c.rating} out of 5">
              ${this.renderStars(c.rating)}
            </div>
            <span class="course-card__rating-value">${c.rating}</span>
            <span class="course-card__students-count">${c.students.toLocaleString()} students</span>
          </div>
          <div class="course-card__footer">
            <div class="course-card__price-wrap">
              <span class="course-card__price">${c.price}</span>
              <span class="course-card__original-price">${c.originalPrice}</span>
            </div>
            <a href="#" class="btn-enroll accessible-touch-target" aria-label="Enroll in ${c.title}">Enroll Now</a>
          </div>
        </div>
      </article>`
    ).join('');
  },

  renderCategories(list) {
    return list.map(cat => `
      <a href="#" class="category-card" aria-label="Browse ${cat.title} courses">
        <div class="category-card__icon" aria-hidden="true">${cat.icon}</div>
        <div class="category-card__content">
          <h3 class="category-card__title">${cat.title}</h3>
          <p class="category-card__desc">${cat.desc}</p>
        </div>
      </a>`
    ).join('');
  },

  renderEmptyState() {
    return `
      <div class="courses-empty-state" role="status" aria-live="polite">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="28" cy="28" r="18" stroke="currentColor" stroke-width="3"/>
          <line x1="41" y1="41" x2="56" y2="56" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
          <line x1="20" y1="28" x2="36" y2="28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
        <p class="courses-empty-state__heading">No matching courses found.</p>
        <p class="courses-empty-state__sub">Try a different keyword, exam name, or subject — e.g. "Organic", "GATE", "Thermodynamics".</p>
      </div>`;
  },

  // ── Grid Update ───────────────────────────────────────────────────────────

  updateGrid() {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;
    const results = this.filterCourses(this._state.query, this._state.activeChip);
    grid.innerHTML = results.length ? this.renderCourseCards(results) : this.renderEmptyState();
  },

  // ── Chips ─────────────────────────────────────────────────────────────────

  initChips() {
    document.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        this._state.activeChip = chip.textContent.trim();
        this.updateGrid();
      });
      chip.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          chip.click();
        }
      });
    });
  },

  // ── Homepage Search Bar ───────────────────────────────────────────────────

  initHomepageSearch() {
    const input = document.getElementById('search-courses-input');
    if (!input) return;

    let debounce;

    const runSearch = () => {
      this._state.query = input.value;
      this.updateGrid();
    };

    input.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(runSearch, 120);
    });

    // Submit button
    const submitBtn = document.querySelector('.search-bar__btn-submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', runSearch);
    }

    // Enter key
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') runSearch();
    });
  },

  // ── Init ──────────────────────────────────────────────────────────────────

  init() {
    const courseGrid = document.getElementById('courses-grid');
    if (courseGrid) courseGrid.innerHTML = this.renderCourseCards(this.courses);

    const categoriesGrid = document.getElementById('categories-grid');
    if (categoriesGrid) categoriesGrid.innerHTML = this.renderCategories(this.categories);

    this.initChips();
    this.initHomepageSearch();
  }
};

window.JChemHomepage = JChemHomepage;
