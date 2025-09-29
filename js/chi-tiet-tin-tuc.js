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

// Individual review content toggle Alpine component
function registerReviewContentToggle(Alpine) {
  console.debug('[reviewContentToggle] Registering component with Alpine');
  Alpine.data('reviewContentToggle', () => ({
    expanded: false,
    _contentEl: null,
    _buttonEl: null,

    init() {
      console.debug('[reviewContentToggle] init started', { el: this.$el });

      // Find the content paragraph with line-clamp
      this._contentEl = this.$el.querySelector('p[style*="line-clamp"]');
      if (!this._contentEl) {
        console.debug('[reviewContentToggle] No content element found');
        return;
      }

      // Find the toggle button
      this._buttonEl = this.$el.querySelector('button[type="button"]');
      if (!this._buttonEl) {
        console.debug('[reviewContentToggle] No button found');
        return;
      }

      // Set initial state
      this.updateContent();
      this.updateButton();

      // Add click handler
      this._buttonEl.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });

      console.debug('[reviewContentToggle] init completed');
    },

    toggle() {
      console.debug('[reviewContentToggle] toggle called, current expanded:', this.expanded);
      this.expanded = !this.expanded;
      this.updateContent();
      this.updateButton();
    },

    updateContent() {
      if (!this._contentEl) return;

      if (this.expanded) {
        // Remove line-clamp to show full content
        this._contentEl.style.display = 'block';
        this._contentEl.style.webkitLineClamp = 'unset';
        this._contentEl.style.webkitBoxOrient = 'unset';
        this._contentEl.style.overflow = 'visible';
        console.debug('[reviewContentToggle] Content expanded');
      } else {
        // Apply line-clamp to show only 3 lines
        this._contentEl.style.display = '-webkit-box';
        this._contentEl.style.webkitLineClamp = '3';
        this._contentEl.style.webkitBoxOrient = 'vertical';
        this._contentEl.style.overflow = 'hidden';
        console.debug('[reviewContentToggle] Content collapsed');
      }
    },

    updateButton() {
      if (!this._buttonEl) return;

      const text = this.expanded ? '[Thu gọn]' : '…[Xem thêm]';
      this._buttonEl.textContent = text;
      console.debug('[reviewContentToggle] Button text updated to:', text);
    },

    destroy() {
      // Clean up if needed
    }
  }));
}

// Reviews toggle Alpine component
function registerReviewsToggle(Alpine) {
  console.debug('[reviewsToggle] Registering component with Alpine');
  Alpine.data('reviewsToggle', () => ({
    expanded: false,
    initial: 3,
    extra: 2,
    total: 0,
    _items: [],
    _btn: null,

    init() {
      console.debug('[reviewsToggle] init started', { el: this.$el });

      // locate review items: in our markup, review rows are direct children of the `.space-y-4` wrapper
      // fall back to searching directly on the current element if that wrapper isn't present
      const list = this.$el.querySelector('.space-y-4') || this.$el;
      let items = Array.from(list.querySelectorAll(':scope > .border-b.pb-4'));
      if (!items.length) {
        // fallback: any child with .review-item (supports older/alternate markup)
        items = Array.from(this.$el.querySelectorAll('.review-item'));
      }
      this._items = items;
      this.total = items.length;

      // Check for additional reviews
      const additionalReviews = this.$el.querySelectorAll('[data-additional-review]');
      console.debug('[reviewsToggle] found additional reviews:', additionalReviews.length);

      // initial visibility
      this.updateVisibility();

      // wire internal toggle button if present
      const btn = this.$el.querySelector('[data-reviews-toggle-button], .reviews-toggle-btn, [data-toggle-reviews]');
      console.debug('[reviewsToggle] found button:', btn);
      if (btn) {
        this._btn = btn;
        const handler = (e) => { e.preventDefault(); this.toggle(); };
        // keep reference so destroy can remove it
        btn._reviewsToggleHandler = handler;
        btn.addEventListener('click', handler);
        this.updateButton();
      }

      // expose debug
      console.debug('[reviewsToggle] init completed', { total: this.total, initial: this.initial, extra: this.extra, additionalReviews: additionalReviews.length });
    },

    updateVisibility() {
      console.debug('[reviewsToggle] updateVisibility called, expanded:', this.expanded);

      // Always show initial reviews (first 3)
      this._items.forEach((el, idx) => {
        if (idx < this.initial) {
          el.classList.remove('hidden');
          console.debug('[reviewsToggle] showing initial review', idx + 1);
        } else {
          el.classList.add('hidden');
          console.debug('[reviewsToggle] hiding initial review', idx + 1);
        }
      });

      // Handle additional reviews (data-additional-review) - show 2 more when expanded
      // Search in the entire document since additional reviews might be outside the Alpine container
      const additionalReviews = document.querySelectorAll('[data-additional-review]');
      console.debug('[reviewsToggle] additional reviews found in document:', additionalReviews.length);
      additionalReviews.forEach((el, idx) => {
        if (this.expanded) {
          el.classList.remove('hidden');
          console.debug('[reviewsToggle] showing additional review', idx + 1, el);
        } else {
          el.classList.add('hidden');
          console.debug('[reviewsToggle] hiding additional review', idx + 1, el);
        }
      });

      this.updateButton();
    },

    toggle() {
      console.debug('[reviewsToggle] toggle called, current expanded:', this.expanded);
      this.expanded = !this.expanded;
      console.debug('[reviewsToggle] toggle changed expanded to:', this.expanded);
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
  console.debug('[reviewContentToggle] Registering with existing Alpine');
  registerReviewContentToggle(window.Alpine);
  console.debug('[reviewsToggle] Registering with existing Alpine');
  registerReviewsToggle(window.Alpine);
} else {
  console.debug('[reviewContentToggle] Waiting for Alpine to initialize');
  console.debug('[reviewsToggle] Waiting for Alpine to initialize');
  document.addEventListener('alpine:init', () => {
    console.debug('[reviewContentToggle] Alpine initialized, registering component');
    registerReviewContentToggle(window.Alpine);
    console.debug('[reviewsToggle] Alpine initialized, registering component');
    registerReviewsToggle(window.Alpine);
  });
}

// Fallback DOM wiring: find review groups and inject a toggle button if not present
document.addEventListener('DOMContentLoaded', () => {
  try {
    // First, try to find existing toggle buttons and wire them
    const existingButtons = document.querySelectorAll('[data-reviews-toggle-button]');
    console.debug('[reviewsToggle] Found existing buttons:', existingButtons.length);

    existingButtons.forEach(button => {
      // Skip if already managed by Alpine
      if (button.hasAttribute('x-data') || button.__x) {
        console.debug('[reviewsToggle] Skipping Alpine-managed button');
        return;
      }

      let expanded = false;
      const initial = 3;

      // Find the reviews container (look for space-y-4 with reviews)
      const reviewsContainer = button.closest('.space-y-4') || button.closest('[x-data*="reviewsToggle"]');
      if (!reviewsContainer) {
        console.debug('[reviewsToggle] No reviews container found for button');
        return;
      }

      const items = Array.from(reviewsContainer.querySelectorAll(':scope > .border-b.pb-4'));
      console.debug('[reviewsToggle] Found review items:', items.length);

      button.addEventListener('click', (e) => {
        e.preventDefault();
        expanded = !expanded;
        console.debug('[reviewsToggle] Button clicked, expanded:', expanded);

        if (expanded) {
          // Always show initial reviews (first 3)
          items.forEach((el, idx) => {
            if (idx < initial) {
              el.classList.remove('hidden');
            } else {
              el.classList.add('hidden');
            }
          });

          // Show additional reviews (2 more) - search in entire document
          const additionalReviews = document.querySelectorAll('[data-additional-review]');
          console.debug('[reviewsToggle] Showing additional reviews:', additionalReviews.length);
          additionalReviews.forEach((el) => el.classList.remove('hidden'));

          // Update button text
          const textEl = button.querySelector('[data-reviews-toggle-text]');
          if (textEl) {
            textEl.textContent = 'Thu gọn đánh giá';
          } else {
            button.textContent = 'Thu gọn đánh giá';
          }
        } else {
          // Hide additional reviews
          const additionalReviews = document.querySelectorAll('[data-additional-review]');
          console.debug('[reviewsToggle] Hiding additional reviews:', additionalReviews.length);
          additionalReviews.forEach((el) => el.classList.add('hidden'));

          // Update button text
          const textEl = button.querySelector('[data-reviews-toggle-text]');
          if (textEl) {
            textEl.textContent = 'Xem tất cả đánh giá';
          } else {
            button.textContent = 'Xem tất cả đánh giá';
          }
        }
      });

      console.debug('[reviewsToggle] Wired existing button');
    });

    // Only create fallback buttons if no existing buttons were found
    if (existingButtons.length === 0) {
      console.debug('[reviewsToggle] No existing buttons found, creating fallback buttons');

      // Fallback: find review groups and inject a toggle button if not present
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
              // Always show initial reviews (first 3)
              items.forEach((el, idx) => {
                if (idx < initial) {
                  el.classList.remove('hidden');
                } else {
                  el.classList.add('hidden');
                }
              });

              // Show additional reviews (2 more)
              const additionalReviews = group.querySelectorAll('[data-additional-review]');
              additionalReviews.forEach((el) => el.classList.remove('hidden'));

              btn.textContent = 'Thu gọn đánh giá';
            } else {
              // Hide additional reviews
              const additionalReviews = group.querySelectorAll('[data-additional-review]');
              additionalReviews.forEach((el) => el.classList.add('hidden'));

              btn.textContent = 'Xem tất cả đánh giá';
            }
          });
          console.debug('[reviewsToggle] fallback inserted button for group', { total: items.length });
        }
      });
    } else {
      console.debug('[reviewsToggle] Found existing buttons, skipping fallback creation');
    }
  } catch (err) {
    console.error('[reviewsToggle] fallback error', err);
  }
});

// Fallback for review content toggle
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Find all review content containers that have x-data but Alpine might not be working
    const reviewContainers = document.querySelectorAll('div[x-data*="reviewContentToggle"]');
    console.debug('[reviewContentToggle] Found review containers:', reviewContainers.length);

    reviewContainers.forEach(container => {
      // Skip if already managed by Alpine
      if (container.__x) {
        console.debug('[reviewContentToggle] Skipping Alpine-managed container');
        return;
      }

      const contentEl = container.querySelector('p[style*="line-clamp"]');
      const buttonEl = container.querySelector('button[type="button"]');

      if (!contentEl || !buttonEl) {
        console.debug('[reviewContentToggle] Missing content or button element');
        return;
      }

      let expanded = false;

      buttonEl.addEventListener('click', (e) => {
        e.preventDefault();
        expanded = !expanded;
        console.debug('[reviewContentToggle] Button clicked, expanded:', expanded);

        if (expanded) {
          // Remove line-clamp to show full content
          contentEl.style.display = 'block';
          contentEl.style.webkitLineClamp = 'unset';
          contentEl.style.webkitBoxOrient = 'unset';
          contentEl.style.overflow = 'visible';
          buttonEl.textContent = '[Thu gọn]';
          console.debug('[reviewContentToggle] Content expanded');
        } else {
          // Apply line-clamp to show only 3 lines
          contentEl.style.display = '-webkit-box';
          contentEl.style.webkitLineClamp = '3';
          contentEl.style.webkitBoxOrient = 'vertical';
          contentEl.style.overflow = 'hidden';
          buttonEl.textContent = '…[Xem thêm]';
          console.debug('[reviewContentToggle] Content collapsed');
        }
      });

      console.debug('[reviewContentToggle] Wired fallback for container');
    });
  } catch (err) {
    console.error('[reviewContentToggle] fallback error', err);
  }
});

// Like button toggle functionality
function registerLikeToggle(Alpine) {
  Alpine.data('likeToggle', () => ({
    liked: false,
    likeCount: 0,

    init() {
      // Get initial like count from the button text
      const likeSpan = this.$el.querySelector('span');
      if (likeSpan) {
        this.likeCount = parseInt(likeSpan.textContent) || 0;
      }
      console.debug('[likeToggle] init', { likeCount: this.likeCount });
    },

    toggle() {
      this.liked = !this.liked;
      this.likeCount += this.liked ? 1 : -1;

      // Update button classes
      this.updateButton();

      // Update like count display
      this.updateLikeCount();

      console.debug('[likeToggle] toggled', { liked: this.liked, likeCount: this.likeCount });
    },

    updateButton() {
      const button = this.$el;
      const svg = button.querySelector('svg');

      if (this.liked) {
        // Liked state: red colors
        button.className = button.className
          .replace('bg-gray-100', 'bg-red-50')
          .replace('text-gray-600', 'text-red-600')
          .replace('hover:bg-gray-200', 'hover:bg-red-100');

        // Add fill-current to SVG
        if (svg && !svg.classList.contains('fill-current')) {
          svg.classList.add('fill-current');
        }
      } else {
        // Unliked state: gray colors
        button.className = button.className
          .replace('bg-red-50', 'bg-gray-100')
          .replace('text-red-600', 'text-gray-600')
          .replace('hover:bg-red-100', 'hover:bg-gray-200');

        // Remove fill-current from SVG
        if (svg) {
          svg.classList.remove('fill-current');
        }
      }
    },

    updateLikeCount() {
      const likeSpan = this.$el.querySelector('span');
      if (likeSpan) {
        likeSpan.textContent = this.likeCount;
      }
    }
  }));
}

// Register like toggle component
if (window.Alpine && typeof window.Alpine.data === 'function') {
  registerLikeToggle(window.Alpine);
} else {
  document.addEventListener('alpine:init', () => registerLikeToggle(window.Alpine));
}

// Fallback: Wire like buttons without Alpine
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Find all like buttons (buttons containing heart SVG)
    const likeButtons = Array.from(document.querySelectorAll('button')).filter(btn => {
      const svg = btn.querySelector('svg.lucide-heart');
      return svg && btn.querySelector('span');
    });

    likeButtons.forEach(button => {
      // Skip if already managed by Alpine
      if (button.hasAttribute('x-data') || button.__x) return;

      let liked = false;
      let likeCount = parseInt(button.querySelector('span').textContent) || 0;
      const svg = button.querySelector('svg');

      function updateButton() {
        if (liked) {
          // Liked state: red colors
          button.className = button.className
            .replace('bg-gray-100', 'bg-red-50')
            .replace('text-gray-600', 'text-red-600')
            .replace('hover:bg-gray-200', 'hover:bg-red-100');

          // Add fill-current to SVG
          if (svg && !svg.classList.contains('fill-current')) {
            svg.classList.add('fill-current');
          }
        } else {
          // Unliked state: gray colors
          button.className = button.className
            .replace('bg-red-50', 'bg-gray-100')
            .replace('text-red-600', 'text-gray-600')
            .replace('hover:bg-red-100', 'hover:bg-gray-200');

          // Remove fill-current from SVG
          if (svg) {
            svg.classList.remove('fill-current');
          }
        }
      }

      function updateLikeCount() {
        const likeSpan = button.querySelector('span');
        if (likeSpan) {
          likeSpan.textContent = likeCount;
        }
      }

      button.addEventListener('click', (e) => {
        e.preventDefault();
        liked = !liked;
        likeCount += liked ? 1 : -1;
        updateButton();
        updateLikeCount();
        console.debug('[likeToggle] fallback toggled', { liked, likeCount });
      });

      console.debug('[likeToggle] fallback attached to button', button);
    });
  } catch (err) {
    console.error('[likeToggle] fallback error', err);
  }
});

// Comment button scroll functionality
function registerCommentScroll(Alpine) {
  Alpine.data('commentScroll', () => ({
    init() {
      console.debug('[commentScroll] init', { el: this.$el });
    },

    scrollToReviews() {
      console.debug('[commentScroll] scrollToReviews called');

      // Method 1: Look by specific ID first
      const reviewsById = document.getElementById('reviews-section');
      console.debug('[commentScroll] looking for reviews-section ID:', reviewsById);

      if (reviewsById) {
        reviewsById.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        console.debug('[commentScroll] scrolled to reviews section by ID', reviewsById);
        return;
      }

      // Method 2: Look for reviews section by text content
      const allElements = Array.from(document.querySelectorAll('*'));
      const reviewsSection = allElements.find(el =>
        el.textContent && (
          el.textContent.includes('Đánh giá') ||
          el.textContent.includes('Nhận xét') ||
          el.textContent.includes('Đánh giá &') ||
          el.textContent.includes('reviews')
        )
      );

      if (reviewsSection) {
        reviewsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        console.debug('[commentScroll] scrolled to reviews section by text', reviewsSection);
        return;
      }

      // Method 3: Look for reviews section by class structure
      const fallbackSection = document.querySelector('.space-y-4')?.closest('.rounded-lg.border');
      if (fallbackSection) {
        fallbackSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        console.debug('[commentScroll] scrolled to fallback reviews section', fallbackSection);
        return;
      }

      // Method 4: Look for any element with "reviews" in class or id
      const reviewsByClass = document.querySelector('[class*="review"], [id*="review"], [class*="comment"], [id*="comment"]');
      if (reviewsByClass) {
        reviewsByClass.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        console.debug('[commentScroll] scrolled to reviews section by class/id', reviewsByClass);
        return;
      }

      console.warn('[commentScroll] reviews section not found');
    }
  }));
}

// Register comment scroll component
if (window.Alpine && typeof window.Alpine.data === 'function') {
  console.debug('[commentScroll] Registering with existing Alpine');
  registerCommentScroll(window.Alpine);
} else {
  console.debug('[commentScroll] Waiting for Alpine to initialize');
  document.addEventListener('alpine:init', () => {
    console.debug('[commentScroll] Alpine initialized, registering component');
    registerCommentScroll(window.Alpine);
  });
}

// Fallback: Wire comment buttons without Alpine
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Find all comment buttons (buttons containing message-circle SVG)
    const commentButtons = Array.from(document.querySelectorAll('button')).filter(btn => {
      const svg = btn.querySelector('svg.lucide-message-circle');
      return svg;
    });

    console.debug('[commentScroll] Found comment buttons:', commentButtons.length);

    commentButtons.forEach(button => {
      // Skip if already managed by Alpine
      if (button.hasAttribute('x-data') || button.__x) {
        console.debug('[commentScroll] Skipping Alpine-managed button');
        return;
      }

      function scrollToReviews() {
        console.debug('[commentScroll] fallback scrollToReviews called');

        // Method 1: Look by specific ID first
        const reviewsById = document.getElementById('reviews-section');
        console.debug('[commentScroll] fallback looking for reviews-section ID:', reviewsById);

        if (reviewsById) {
          reviewsById.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          console.debug('[commentScroll] fallback scrolled to reviews section by ID', reviewsById);
          return;
        }

        // Method 2: Find the reviews section by looking for the text "Đánh giá & Nhận xét"
        const allElements = Array.from(document.querySelectorAll('*'));
        const reviewsSection = allElements.find(el =>
          el.textContent && (
            el.textContent.includes('Đánh giá') ||
            el.textContent.includes('Nhận xét') ||
            el.textContent.includes('Đánh giá &') ||
            el.textContent.includes('reviews')
          )
        );

        if (reviewsSection) {
          reviewsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          console.debug('[commentScroll] fallback scrolled to reviews section by text', reviewsSection);
          return;
        }

        // Method 3: Fallback: look for reviews section by class or structure
        const fallbackSection = document.querySelector('.space-y-4')?.closest('.rounded-lg.border');
        if (fallbackSection) {
          fallbackSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          console.debug('[commentScroll] fallback scrolled to fallback reviews section', fallbackSection);
          return;
        }

        console.warn('[commentScroll] fallback: reviews section not found');
      }

      button.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToReviews();
      });

      console.debug('[commentScroll] fallback attached to button', button);
    });
  } catch (err) {
    console.error('[commentScroll] fallback error', err);
  }
});

// Social sharing functionality
function initSocialSharing() {
  // Get current page URL
  const currentUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);

  // Social sharing URLs
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${pageTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`
  };

  // Find all share links
  const shareLinks = document.querySelectorAll('[data-share]');

  shareLinks.forEach(link => {
    const shareType = link.getAttribute('data-share');

    if (shareType === 'copy') {
      // Handle copy to clipboard
      link.addEventListener('click', (e) => {
        e.preventDefault();
        copyToClipboard(window.location.href);
      });
    } else if (shareUrls[shareType]) {
      // Set href for social sharing
      link.href = shareUrls[shareType];

      // Add click handler for analytics or other tracking
      link.addEventListener('click', (e) => {
        console.debug('[socialShare] Sharing to', shareType, 'URL:', shareUrls[shareType]);
        // You can add analytics tracking here if needed
      });
    }
  });

  console.debug('[socialShare] Initialized with', shareLinks.length, 'share links');
}

// Copy to clipboard function
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    // Use modern clipboard API
    navigator.clipboard.writeText(text).then(() => {
      showCopyNotification('Đã sao chép link vào clipboard!');
    }).catch(err => {
      console.error('[socialShare] Failed to copy:', err);
      fallbackCopyToClipboard(text);
    });
  } else {
    // Fallback for older browsers
    fallbackCopyToClipboard(text);
  }
}

// Fallback copy function
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    showCopyNotification('Đã sao chép link vào clipboard!');
  } catch (err) {
    console.error('[socialShare] Fallback copy failed:', err);
    showCopyNotification('Không thể sao chép link!');
  }

  document.body.removeChild(textArea);
}

// Show copy notification
function showCopyNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Initialize social sharing when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initSocialSharing();
});

// Debug: Test if script is loaded
console.debug('[commentScroll] Script loaded successfully');
console.debug('[commentScroll] Alpine available:', !!window.Alpine);
console.debug('[commentScroll] Reviews section exists:', !!document.getElementById('reviews-section'));
console.debug('[reviewsToggle] Script loaded, Alpine available:', !!window.Alpine);
console.debug('[reviewsToggle] Additional reviews in DOM:', document.querySelectorAll('[data-additional-review]').length);