/**
 * JChemistry — Trust & Conversion JS
 * Handles FAQ accordion and testimonial data rendering.
 */

const JChemTrust = {

  faqs: [
    {
      q: 'What exams do your courses cover?',
      a: 'Our courses are specifically designed for CSIR-NET Chemical Sciences, GATE Chemistry (CY), and IIT-JAM Chemistry. Each exam has dedicated batches structured around the official syllabus.'
    },
    {
      q: 'Are the courses available in Hindi or English?',
      a: 'Classes are delivered in a bilingual format — explanations are in Hindi for clarity, while terminology, notes, and written content are in English, matching the exam pattern.'
    },
    {
      q: 'What is the validity of a course after purchase?',
      a: 'Validity depends on the batch selected. Most courses offer 12–24 months of access from the date of purchase, so you can revise at your own pace.'
    },
    {
      q: 'Will I get study material and notes?',
      a: 'Yes. Every course includes structured PDF notes, handwritten study material, previous year solved papers, and topic-wise practice question banks.'
    },
    {
      q: 'Are mock tests and practice sessions included?',
      a: 'Absolutely. Each batch includes regular topic-wise tests, full-length mock exams modelled on the actual paper pattern, and detailed performance analytics.'
    },
    {
      q: 'Can I watch lectures on my mobile device?',
      a: 'Yes. All recorded and live sessions are fully accessible through our mobile-optimised platform. You can study on any device — phone, tablet, or desktop.'
    },
    {
      q: 'What happens if I miss a live class?',
      a: 'All live sessions are recorded and made available for playback within 24 hours. You will never miss a class even if you cannot attend it live.'
    },
    {
      q: 'Is there any support available if I have doubts?',
      a: 'Yes. We have a dedicated doubt-resolution system. You can post doubts after each lecture, and they are answered by the faculty within 48 hours.'
    }
  ],

  testimonials: [
    { initial: 'P', name: 'Priya Sharma', course: 'CSIR-NET Complete Batch', review: 'The structured approach and daily practice tests made a huge difference. Cleared CSIR-NET in my first attempt with JRF rank!' },
    { initial: 'A', name: 'Arjun Mehta', course: 'GATE Chemistry', review: 'Dr. Kumar\'s teaching style is exceptional. Complex physical chemistry topics became very clear. Secured GATE rank under 200.' },
    { initial: 'S', name: 'Sneha Patel', course: 'IIT-JAM Prep', review: 'Highly recommended for IIT-JAM aspirants. The notes are concise and the mock tests are very close to the actual exam pattern.' },
    { initial: 'R', name: 'Rahul Nair', course: 'Organic Chemistry', review: 'Best organic chemistry course I found. Reaction mechanisms are explained with absolute clarity. No rote learning, just concepts.' },
    { initial: 'M', name: 'Meera Joshi', course: 'CSIR-NET Complete Batch', review: 'The doubt resolution system is excellent. My queries were answered within a day. Passed CSIR-NET with a comfortable margin.' },
    { initial: 'D', name: 'Deepak Singh', course: 'GATE Chemistry', review: 'The study material quality is top-notch. It covers every corner of the GATE syllabus without any unnecessary padding.' }
  ],

  results: [
    { initial: 'A', name: 'Anjali Verma', exam: 'CSIR-NET', rank: 'JRF — AIR 28', course: 'CSIR-NET Complete Batch', quote: 'JChemistry gave me the direction I needed. The structured syllabus coverage changed everything.', photo: '' },
    { initial: 'K', name: 'Karthik Rao', exam: 'GATE CY', rank: 'AIR 47', course: 'GATE Chemistry Focus', quote: 'From struggling with physical chemistry to cracking GATE — it was JChemistry that made it possible.', photo: '' },
    { initial: 'N', name: 'Neha Gupta', exam: 'IIT-JAM', rank: 'IIT Bombay Admitted', course: 'IIT-JAM Complete Prep', quote: 'The mock tests were indistinguishable from the real exam. I felt completely prepared on exam day.', photo: '' },
    { initial: 'V', name: 'Vikram Das', exam: 'CSIR-NET', rank: 'LS — AIR 112', course: 'Organic Chemistry Mastery', quote: 'Exceptional study material and faculty support. Could not have done it without JChemistry.', photo: '' },
    { initial: 'T', name: 'Tanisha Roy', exam: 'GATE CY', rank: 'AIR 89', course: 'Physical Chemistry', quote: 'The inorganic chemistry module alone was worth the entire course fee. Highly detailed and precise.', photo: '' },
    { initial: 'S', name: 'Suresh Kumar', exam: 'IIT-JAM', rank: 'IIT Delhi Admitted', course: 'IIT-JAM Complete Prep', quote: 'I joined just 4 months before the exam. The fast-track batch covered everything I needed.', photo: '' }
  ],

  starsSvg: `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`.repeat(5),

  renderTestimonials() {
    const grid = document.getElementById('testimonials-grid');
    if (!grid) return;
    const cardsHtml = this.testimonials.map(t => `
      <article class="testimonial-card">
        <div class="testimonial-card__stars" aria-label="5 out of 5 stars">${this.starsSvg}</div>
        <p class="testimonial-card__quote">"${t.review}"</p>
        <footer class="testimonial-card__footer">
          <div class="testimonial-card__avatar" aria-hidden="true">${t.initial}</div>
          <div>
            <p class="testimonial-card__name">${t.name}</p>
            <p class="testimonial-card__course">${t.course}</p>
          </div>
        </footer>
      </article>`).join('');
    grid.innerHTML = cardsHtml + cardsHtml;
  },

  renderResults() {
    const grid = document.getElementById('results-grid');
    if (!grid) return;
    grid.innerHTML = this.results.map(r => `
      <article class="result-card-premium">
        <div class="result-card-premium__header">
          <div class="result-card-premium__photo-wrap">
            ${r.photo ? `<img src="${r.photo}" alt="${r.name}" class="result-card-premium__photo">` : `<div class="result-card-premium__avatar-fallback">${r.initial}</div>`}
          </div>
          <div class="result-card-premium__info">
            <h3 class="result-card-premium__name">${r.name}</h3>
            <p class="result-card-premium__exam">${r.exam} <span class="result-card-premium__dot">•</span> <span class="result-card-premium__rank">${r.rank}</span></p>
          </div>
        </div>
        <div class="result-card-premium__course">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          ${r.course}
        </div>
        <blockquote class="result-card-premium__quote">
          "${r.quote}"
        </blockquote>
      </article>`).join('');
  },

  initFaq() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      const panel = item.querySelector('.faq-panel');
      if (!trigger || !panel) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close all
        items.forEach(i => {
          i.classList.remove('is-open');
          const p = i.querySelector('.faq-panel');
          const t = i.querySelector('.faq-trigger');
          if (p) p.classList.remove('is-open');
          if (t) t.setAttribute('aria-expanded', 'false');
        });

        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('is-open');
          panel.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });

      trigger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });
    });
  },

  init() {
    this.renderTestimonials();
    this.renderResults();
    this.initFaq();
  }
};

window.JChemTrust = JChemTrust;
