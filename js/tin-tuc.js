function newsFilters() {
  return {
    // Alpine init hook (runs when component is created)
    init() {
      try {
        console.debug('newsFilters.init running');
        this.ensureItems();
        this.applyFiltersAndSort();
      } catch (e) { console.warn('newsFilters.init failed', e); }
    },
    // state
    showCategoryDropdown: false,
    showTimeDropdown: false,
    // pagination
    currentPage: 1,
    perPage: 12,
    totalItems: 0,
    totalPages: 1,
    startItem: 0,
    endItem: 0,
    // sort dropdown
    showSortDropdown: false,

    // actions
    toggleCategory() {
      this.showCategoryDropdown = !this.showCategoryDropdown;
      if (this.showCategoryDropdown) this.showTimeDropdown = false;
    },
    toggleTime() {
      this.showTimeDropdown = !this.showTimeDropdown;
      if (this.showTimeDropdown) this.showCategoryDropdown = false;
      // close sort when opening time
      if (this.showTimeDropdown) this.showSortDropdown = false;
    },
    toggleSort() {
      this.showSortDropdown = !this.showSortDropdown;
      console.debug('newsFilters: toggleSort ->', this.showSortDropdown);
      if (this.showSortDropdown) {
        this.showCategoryDropdown = false;
        this.showTimeDropdown = false;
      }
    },
    selectCategory(cat) {
      this.selectedCategory = cat;
      this.showCategoryDropdown = false;
      // Update display text
      const categorySpan = document.querySelector('[x-data*="newsFilters"] .category-display');
      if (categorySpan) categorySpan.textContent = cat;
      // dispatch custom event so other scripts can react
      window.dispatchEvent(new CustomEvent('news:category-changed', { detail: { category: cat } }));
      this.currentPage = 1;
      this.ensureItems();
      this.applyFiltersAndSort();
    },
    selectTime(t) {
      this.selectedTime = t;
      this.showTimeDropdown = false;
      // Update display text
      const timeSpan = document.querySelector('[x-data*="newsFilters"] .time-display');
      if (timeSpan) timeSpan.textContent = t;
      window.dispatchEvent(new CustomEvent('news:time-changed', { detail: { time: t } }));
      this.currentPage = 1;
      this.ensureItems();
      this.applyFiltersAndSort();
    },
    selectSort(s) {
      this.selectedSort = s;
      this.showSortDropdown = false;
      // Update display text
      const sortSpan = document.querySelector('[x-data*="newsFilters"] .sort-display');
      if (sortSpan) sortSpan.textContent = s;
      console.debug('newsFilters: selectSort ->', s);
      window.dispatchEvent(new CustomEvent('news:sort-changed', { detail: { sort: s } }));
      this.currentPage = 1;
      this.ensureItems();
      this.applyFiltersAndSort();
    },
    clickOutside() {
      this.showCategoryDropdown = false;
      this.showTimeDropdown = false;
      this.showSortDropdown = false;
    }
    ,
    // --- Filtering & sorting implementation ---
    _initialized: false,
    _grid: null,
    _items: [],
    ensureItems() {
      if (this._initialized) return;
      try {
        // Find the news grid on the page (assumes the list uses the grid classes shown in template)
        this._grid = document.querySelector('.grid.gap-6');
        if (!this._grid) return;

        const nodes = Array.from(this._grid.querySelectorAll(':scope > div'));
        this._items = nodes.map((el, idx) => {
          const titleEl = el.querySelector('h3 a');
          const title = titleEl ? titleEl.textContent.trim() : '';

          // category: look for the first badge-primary text
          const catEl = el.querySelector('.badge-primary');
          const category = catEl ? catEl.textContent.trim() : '';

          // date: search for a span that contains dd/mm/yyyy
          let dateText = '';
          const spanCandidates = el.querySelectorAll('span');
          const dateRe = /\b(\d{1,2}\/\d{1,2}\/\d{4})\b/;
          for (const s of spanCandidates) {
            const m = s.textContent.match(dateRe);
            if (m) { dateText = m[1]; break; }
          }
          const date = this._parseDate(dateText);

          // views: look for svg.lucide-eye then take sibling text
          let views = 0;
          const eye = el.querySelector('.lucide-eye');
          if (eye) {
            const parent = eye.parentElement;
            if (parent) {
              const text = parent.textContent.replace(/[^0-9,\.]/g, '').trim();
              if (text) views = parseInt(text.replace(/[,\.]/g, ''), 10) || 0;
            }
          }

          const isHot = !!el.querySelector('.badge-hot');

          return { el, idx, title, category, date, views, isHot };
        });

        this._initialized = true;
        console.debug('newsFilters.ensureItems: found', this._items.length, 'items');
        // initial apply so UI reflects default sort/filter
        this.applyFiltersAndSort();
      } catch (err) {
        console.warn('newsFilters.ensureItems error', err);
      }
    },
    _parseDate(txt) {
      if (!txt) return null;
      // expect dd/mm/yyyy
      const parts = txt.split('/').map(p => parseInt(p, 10));
      if (parts.length !== 3) return null;
      const [d, m, y] = parts;
      // month is 0-based in JS Date
      return new Date(y, m - 1, d);
    },
    applyFiltersAndSort() {
      if (!this._initialized || !this._grid) { return; }
      try {
        const now = new Date();

        // filter
        let list = this._items.slice();
        // category
        const currentCategory = this.selectedCategory || 'Tất cả danh mục';
        if (currentCategory && !/tất cả/i.test(currentCategory)) {
          list = list.filter(i => i.category && i.category.toLowerCase() === currentCategory.toLowerCase());
        }
        // time
        const currentTime = this.selectedTime || 'Tất cả';
        if (currentTime && !/tất cả/i.test(currentTime)) {
          if (/hôm nay/i.test(currentTime)) {
            list = list.filter(i => i.date && this._isSameDay(i.date, now));
          } else if (/tuần/i.test(currentTime)) {
            const weekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
            list = list.filter(i => i.date && i.date >= weekAgo);
          } else if (/tháng/i.test(currentTime)) {
            const monthAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
            list = list.filter(i => i.date && i.date >= monthAgo);
          }
        }

        // sort
        const currentSort = this.selectedSort || 'Mới nhất';
        const sortKey = currentSort.toLowerCase();
        if (/mới nhất/.test(sortKey)) {
          list.sort((a, b) => (b.date || 0) - (a.date || 0));
        } else if (/cũ nhất/.test(sortKey)) {
          list.sort((a, b) => (a.date || 0) - (b.date || 0));
        } else if (/xem nhiều/.test(sortKey)) {
          list.sort((a, b) => (b.views || 0) - (a.views || 0));
        } else if (/nổi bật/.test(sortKey)) {
          list.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0) || (b.views || 0) - (a.views || 0));
        } else if (/tên a-z/i.test(sortKey)) {
          list.sort((a, b) => a.title.localeCompare(b.title));
        } else if (/tên z-a/i.test(sortKey)) {
          list.sort((a, b) => b.title.localeCompare(a.title));
        }

        // pagination: update totals and slice list
        this.totalItems = list.length;
        this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.perPage));
        if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
        const start = (this.currentPage - 1) * this.perPage;
        const end = start + this.perPage;
        this.startItem = this.totalItems === 0 ? 0 : start + 1;
        this.endItem = Math.min(this.totalItems, end);

        console.debug('newsFilters.apply: totalItems=', this.totalItems, 'currentPage=', this.currentPage, 'start=', this.startItem, 'end=', this.endItem);

        const paged = list.slice(start, end);

        // render: clear grid and append paged items
        const frag = document.createDocumentFragment();
        paged.forEach(i => frag.appendChild(i.el));
        this._grid.innerHTML = '';
        this._grid.appendChild(frag);
      } catch (err) {
        console.warn('newsFilters.applyFiltersAndSort error', err);
      }
    },
    // pagination helpers
    setPage(n) {
      const nn = parseInt(n, 10) || 1;
      if (nn < 1) return;
      this.currentPage = nn;
      this.applyFiltersAndSort();
    },
    prevPage() {
      if (this.currentPage > 1) { this.currentPage -= 1; this.applyFiltersAndSort(); }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) { this.currentPage += 1; this.applyFiltersAndSort(); }
    },
    totalPagesArray() {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    },
    _isSameDay(a, b) {
      return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    }
  }
}

// Register the component when Alpine initializes, and also register immediately if Alpine already exists.
try {
  if (window.Alpine) {
    console.debug('Registering newsFilters with Alpine (immediate)');
    window.Alpine.data('newsFilters', newsFilters);
  } else {
    console.debug('Alpine not present yet, will register on alpine:init');
    document.addEventListener('alpine:init', () => {
      try {
        console.debug('alpine:init fired — registering newsFilters');
        window.Alpine.data('newsFilters', newsFilters);
      } catch (e) {
        console.warn('Failed to register newsFilters on alpine:init', e);
      }
    });
  }
} catch (err) {
  console.warn('newsFilters registration error', err);
}

// Also expose to global for progressive enhancement
window.newsFilters = newsFilters;

// Lightweight DOM fallback in case Alpine hasn't initialized yet or is absent.
(function () {
  try {
    // If Alpine is present, let Alpine handle the dropdown; skip fallback
    if (window.Alpine) {
      console.debug('tin-tuc fallback: Alpine present, skipping fallback');
      return;
    }

    const btn = document.querySelector('[data-sort-button]');
    const menu = document.querySelector('[data-sort-menu]');
    if (!btn || !menu) return;

    const toggle = () => {
      if (menu.style.display === 'none' || !menu.style.display) {
        menu.style.display = 'block';
      } else {
        menu.style.display = 'none';
      }
    };

    // Ensure initial hidden state for fallback
    menu.style.display = 'none';
    console.debug('tin-tuc fallback: initialized, menu hidden');

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle();
      const expanded = menu.style.display === 'block';
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      console.debug('tin-tuc fallback: sort button clicked, expanded=', expanded);
    });

    // click on menu item
    menu.addEventListener('click', function (e) {
      const li = e.target.closest('li');
      if (!li) return;
      const val = li.textContent.trim();
      // Update button label
      const span = btn.querySelector('span');
      if (span) span.textContent = val;
      menu.style.display = 'none';
      window.dispatchEvent(new CustomEvent('news:sort-changed', { detail: { sort: val } }));
    });

    // click outside
    document.addEventListener('click', function (e) {
      if (menu.style.display === 'block') {
        if (!btn.contains(e.target) && !menu.contains(e.target)) menu.style.display = 'none';
      }
    });
  } catch (err) {
    console.warn('tin-tuc fallback init failed', err);
  }
})();

// --- Carousel for "Tin Tức Nổi Bật" ---
function newsCarousel() {
  return {
    current: 0,
    slides: 0,
    $root: null,
    $track: null,
    // called by x-init
    init() {
      try {
        // scope this component to the element that has x-data="newsCarousel()"
        // Alpine passes the component context so we can find $el via document query
        this.$root = (this.$root || document.querySelector('[x-data="newsCarousel()"]'));
        if (!this.$root) return;
        // target the sliding track; fallback to common class used in template
        this.$track = this.$root.querySelector('.carousel-track') || this.$root.querySelector('.flex.transition-transform');
        if (!this.$track) return;
        this.slides = Math.max(1, this.$track.children.length);
        // ensure clean initial transform
        this.update();
        // keep responsive
        window.addEventListener('resize', () => this.update());
      } catch (err) {
        console.warn('newsCarousel.init error', err);
      }
    },
    prev() {
      if (this.current > 0) {
        this.current -= 1;
        this.update();
      }
    },
    next() {
      if (this.current < this.slides - 1) {
        this.current += 1;
        this.update();
      }
    },
    goTo(n) {
      const idx = parseInt(n, 10) || 0;
      if (idx < 0 || idx >= this.slides) return;
      this.current = idx;
      this.update();
    },
    update() {
      try {
        if (!this.$track) return;
        // move the track by 100% per slide
        this.$track.style.transform = 'translateX(-' + (this.current * 100) + '%)';
      } catch (err) {
        console.warn('newsCarousel.update error', err);
      }
    },
    isActive(i) {
      return this.current === i;
    }
  };
}

try {
  if (window.Alpine) {
    window.Alpine.data('newsCarousel', newsCarousel);
  } else {
    document.addEventListener('alpine:init', () => {
      try {
        window.Alpine.data('newsCarousel', newsCarousel);
      } catch (e) { console.warn('Failed to register newsCarousel on alpine:init', e); }
    });
  }
} catch (err) {
  console.warn('newsCarousel registration error', err);
}

// expose globally for progressive enhancement/testing
window.newsCarousel = newsCarousel;

// --- Carousel for "Bất Động Sản Nổi Bật" ---
function propertyCarousel() {
  return {
    current: 0,
    slides: 0,
    $root: null,
    $track: null,
    // how many property items per logical slide
    groupSize: 5,
    // called by x-init
    init() {
      try {
        this.$root = (this.$root || document.querySelector('[x-data="propertyCarousel()"]'));
        if (!this.$root) return;
        // target the sliding track for the property carousel
        this.$track = this.$root.querySelector('.carousel-track-bds') || this.$root.querySelector('.flex.flex-nowrap');
        if (!this.$track) return;
        // compute logical slides as groups of `groupSize` items
        this._recalc();
        // initial update
        this.update();
        // recalc on resize in case DOM/visibility changes
        window.addEventListener('resize', () => { this._recalc(); this.update(); });
      } catch (err) {
        console.warn('propertyCarousel.init error', err);
      }
    },
    _recalc() {
      try {
        const total = (this.$track && this.$track.children) ? this.$track.children.length : 0;
        this.slides = Math.max(1, Math.ceil(total / this.groupSize));
        if (this.current >= this.slides) this.current = this.slides - 1;
      } catch (err) {
        console.warn('propertyCarousel._recalc error', err);
      }
    },
    prev() {
      if (this.current > 0) {
        this.current -= 1;
        this.update();
      }
    },
    next() {
      if (this.current < this.slides - 1) {
        this.current += 1;
        this.update();
      }
    },
    goTo(n) {
      const idx = parseInt(n, 10) || 0;
      if (idx < 0 || idx >= this.slides) return;
      this.current = idx;
      this.update();
    },
    update() {
      try {
        if (!this.$track) return;
        // children may be narrower than container; move by fraction of 100% depending on logical slides
        const step = 100 / Math.max(1, this.slides);
        this.$track.style.transform = 'translateX(-' + (this.current * step) + '%)';
      } catch (err) {
        console.warn('propertyCarousel.update error', err);
      }
    },
    isActive(i) {
      return this.current === i;
    }
  };
}

try {
  if (window.Alpine) {
    window.Alpine.data('propertyCarousel', propertyCarousel);
  } else {
    document.addEventListener('alpine:init', () => {
      try {
        window.Alpine.data('propertyCarousel', propertyCarousel);
      } catch (e) { console.warn('Failed to register propertyCarousel on alpine:init', e); }
    });
  }
} catch (err) {
  console.warn('propertyCarousel registration error', err);
}

window.propertyCarousel = propertyCarousel;
