// Alpine.js relatedNews component — logic only, no DOM restructuring
// Create the Alpine component factory function
function registerRelatedNews(Alpine) {
  Alpine.data('relatedNews', () => ({
    currentPage: 0,
    perPage: 3,
    totalItems: 0,
    totalPages: 0,
    wrapperStyle: 'transform: translate3d(0px,0,0);',

    init() {
      this.computeTotals();
      // small timeout to allow layout to settle (images, other scripts)
      setTimeout(() => this.updateTransform(), 60);
      console.debug('[relatedNews] init', { el: this.$el, perPage: this.perPage });

      // debounce resize to recompute sizes
      let t = null;
      this._onResize = () => {
        clearTimeout(t);
        t = setTimeout(() => {
          this.computeTotals();
          this.updateTransform();
        }, 120);
      };
      window.addEventListener('resize', this._onResize);
    },

    computeTotals() {
      const wrapper = this.$refs.wrapper;
      if (!wrapper) return;
      const slides = wrapper.querySelectorAll('.swiper-slide');
      this.totalItems = slides.length;
      this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.perPage));
      // debug
      console.debug('[relatedNews] computeTotals', { totalItems: this.totalItems, perPage: this.perPage, totalPages: this.totalPages });
    },

    // Robust transform: measure slide widths + gaps so we move exactly by N slides
    updateTransform() {
      const wrapper = this.$refs.wrapper;
      if (!wrapper) return;
      const slides = Array.from(wrapper.querySelectorAll('.swiper-slide'));
      if (!slides.length) return;

      // Measure per-slide outer width (width + margin-right)
      const first = slides[0];
      const firstRect = first.getBoundingClientRect();
      const style = window.getComputedStyle(first);
      const marginRight = parseFloat(style.marginRight) || 0;
      const perSlideTotal = firstRect.width + marginRight;

  const desired = this.currentPage * this.perPage * perSlideTotal;

      // compute total width of all slides
      const totalWidth = slides.reduce((sum, s, i) => {
        const r = s.getBoundingClientRect();
        const st = window.getComputedStyle(s);
        const mr = parseFloat(st.marginRight) || 0;
        return sum + r.width + mr;
      }, 0);

      const container = wrapper.parentElement;
      const containerWidth = container.getBoundingClientRect().width || 0;

      // maximum allowed translate (don't scroll past the last item)
      const maxTranslate = Math.max(0, totalWidth - containerWidth);

  const x = -Math.min(desired, maxTranslate);
  // debug measurements
  console.debug('[relatedNews] updateTransform', { perSlideTotal, desired, totalWidth, containerWidth, maxTranslate, x, currentPage: this.currentPage });
  this.wrapperStyle = `transform: translate3d(${x}px, 0, 0); transition: transform .36s cubic-bezier(.22,.9,.36,1);`;
    },

    prev() {
      console.debug('[relatedNews] prev called', { currentPage: this.currentPage });
      if (this.currentPage <= 0) return;
      this.currentPage -= 1;
      this.updateTransform();
    },

    next() {
      console.debug('[relatedNews] next called', { currentPage: this.currentPage, totalPages: this.totalPages });
      if (this.currentPage >= this.totalPages - 1) return;
      this.currentPage += 1;
      this.updateTransform();
    },

    goTo(n) {
      const page = Math.max(0, Math.min(n, this.totalPages - 1));
      this.currentPage = page;
      this.updateTransform();
    },

    destroy() {
      window.removeEventListener('resize', this._onResize);
    }
  }));
}

// Register whether Alpine has already initialized or will initialize later
if (window.Alpine && typeof window.Alpine.data === 'function') {
  registerRelatedNews(window.Alpine);
} else {
  document.addEventListener('alpine:init', () => registerRelatedNews(window.Alpine));
}

// Fallback: if Alpine doesn't bind for some reason, wire simple controls so clicks still move slides
document.addEventListener('DOMContentLoaded', () => {
  try {
    const containers = document.querySelectorAll('[x-data="relatedNews()"]');
    containers.forEach((container) => {
      const wrapper = container.querySelector('.swiper-wrapper');
      if (!wrapper) return;

      const prevBtn = container.querySelector('.lucide-chevron-left')?.closest('button');
      const nextBtn = container.querySelector('.lucide-chevron-right')?.closest('button');
      if (!prevBtn || !nextBtn) return;

      // Only attach fallback if Alpine didn't initialize (no x-data.__x)
      if (container.__x) return;

      let currentPage = 0;
      const perPage = 3;

      function measure() {
        const slides = Array.from(wrapper.querySelectorAll('.swiper-slide'));
        if (!slides.length) return { perSlideTotal: 0, totalWidth: 0, containerWidth: 0 };
        const first = slides[0];
        const r = first.getBoundingClientRect();
        const st = window.getComputedStyle(first);
        const mr = parseFloat(st.marginRight) || 0;
        const perSlideTotal = r.width + mr;
        const totalWidth = slides.reduce((s, slide) => {
          const rr = slide.getBoundingClientRect();
          const ss = window.getComputedStyle(slide);
          const mm = parseFloat(ss.marginRight) || 0;
          return s + rr.width + mm;
        }, 0);
        const containerWidth = wrapper.parentElement.getBoundingClientRect().width;
        return { perSlideTotal, totalWidth, containerWidth };
      }

      function update() {
        const { perSlideTotal, totalWidth, containerWidth } = measure();
        if (!perSlideTotal) return;
        const desired = currentPage * perPage * perSlideTotal;
        const maxTranslate = Math.max(0, totalWidth - containerWidth);
        const x = -Math.min(desired, maxTranslate);
        wrapper.style.transform = `translate3d(${x}px,0,0)`;
        wrapper.style.transition = 'transform .36s cubic-bezier(.22,.9,.36,1)';
      }

      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 0) {
          currentPage -= 1;
          update();
        }
      });
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const { perSlideTotal, totalWidth, containerWidth } = measure();
        if (!perSlideTotal) return;
        const totalPages = Math.max(1, Math.ceil((totalWidth / perSlideTotal) / perPage));
        if (currentPage < totalPages - 1) {
          currentPage += 1;
          update();
        }
      });

      // initial update
      setTimeout(update, 60);
      window.addEventListener('resize', () => setTimeout(update, 100));
      console.debug('[relatedNews] fallback attached to', container);
    });
  } catch (err) {
    console.error('[relatedNews] fallback error', err);
  }
});

// Reviews toggle Alpine component
function registerReviewsToggle(Alpine) {
  Alpine.data('reviewsToggle', () => ({
    expanded: false,
    initial: 3,
    extra: 2,
    total: 0,
    _items: [],
    _btn: null,

    init() {
      // locate review items: prefer direct children with the provided layout class
      let items = Array.from(this.$el.querySelectorAll(':scope > .border-b.pb-4'));
      if (!items.length) {
        // fallback: any child with .review-item
        items = Array.from(this.$el.querySelectorAll('.review-item'));
      }
      this._items = items;
      this.total = items.length;

      // initial visibility
      this.updateVisibility();

      // wire internal toggle button if present
      const btn = this.$el.querySelector('[data-reviews-toggle-button], .reviews-toggle-btn, [data-toggle-reviews]');
      if (btn) {
        this._btn = btn;
        const handler = (e) => { e.preventDefault(); this.toggle(); };
        // keep reference so destroy can remove it
        btn._reviewsToggleHandler = handler;
        btn.addEventListener('click', handler);
        this.updateButton();
      }

      // expose debug
      console.debug('[reviewsToggle] init', { total: this.total, initial: this.initial, extra: this.extra });
    },

    updateVisibility() {
      const showCount = this.expanded ? Math.min(this.total, this.initial + this.extra) : Math.min(this.total, this.initial);
      this._items.forEach((el, idx) => {
        if (idx < showCount) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      });
      this.updateButton();
    },

    toggle() {
      this.expanded = !this.expanded;
      this.updateVisibility();
      console.debug('[reviewsToggle] toggled', { expanded: this.expanded });
    },

    updateButton() {
      if (!this._btn) return;
      // Prefer updating a child span so we don't remove the SVG icon inside the button
      const textEl = this._btn.querySelector('[data-reviews-toggle-text]');
      const text = this.expanded ? 'Thu gọn đánh giá' : 'Xem tất cả đánh giá';
      if (textEl) {
        textEl.textContent = text;
      } else {
        // fallback: replace whole button text (older markup)
        this._btn.textContent = text;
      }
    },

    destroy() {
      if (this._btn && this._btn._reviewsToggleHandler) {
        this._btn.removeEventListener('click', this._btn._reviewsToggleHandler);
        delete this._btn._reviewsToggleHandler;
      }
    }
  }));
}

if (window.Alpine && typeof window.Alpine.data === 'function') {
  registerReviewsToggle(window.Alpine);
} else {
  document.addEventListener('alpine:init', () => registerReviewsToggle(window.Alpine));
}

// Fallback DOM wiring: find review groups and inject a toggle button if not present
document.addEventListener('DOMContentLoaded', () => {
  try {
    const groups = Array.from(document.querySelectorAll('div')).filter((d) => {
      // heuristic: container that has >=4 direct children with class 'border-b pb-4'
      const items = d.querySelectorAll(':scope > .border-b.pb-4');
      return items && items.length >= 4;
    });

    groups.forEach((group) => {
      // avoid touching Alpine-managed containers
      if (group.hasAttribute('x-data') || group.__x) return;

      const items = Array.from(group.querySelectorAll(':scope > .border-b.pb-4'));
      if (!items.length) return;

      const initial = 3;
      const extra = 2;
      const showCount = Math.min(items.length, initial);
      items.forEach((el, idx) => {
        if (idx >= showCount) el.classList.add('hidden');
      });

      // insert toggle button if none exists inside group
      const existingBtn = group.querySelector('[data-reviews-toggle-button], .reviews-toggle-btn, [data-toggle-reviews]');
      if (!existingBtn) {
        const wrap = document.createElement('div');
        wrap.className = 'mt-3';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'reviews-toggle-btn text-blue-600 hover:underline';
        btn.textContent = 'Xem tất cả đánh giá';
        wrap.appendChild(btn);
        group.appendChild(wrap);

        let expanded = false;
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          expanded = !expanded;
          if (expanded) {
            // show next (initial+extra)
            const cnt = Math.min(items.length, initial + extra);
            items.forEach((el, idx) => { if (idx < cnt) el.classList.remove('hidden'); });
            btn.textContent = 'Thu gọn đánh giá';
          } else {
            items.forEach((el, idx) => { if (idx >= initial) el.classList.add('hidden'); });
            btn.textContent = 'Xem tất cả đánh giá';
          }
        });
        console.debug('[reviewsToggle] fallback inserted button for group', { total: items.length });
      }
    });
  } catch (err) {
    console.error('[reviewsToggle] fallback error', err);
  }
});
