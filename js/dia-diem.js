// Dia Diem Page Alpine.js Logic
document.addEventListener('alpine:init', () => {
  Alpine.data('diaDiemPage', () => ({
    // Search functionality
    searchTerm: '',
    selectedCategory: 'all',
    sortOption: 'name-asc',
    sortDropdownOpen: false,
    showAllCommunes: false,

    // Slider states
    relatedPropertiesSlide: 0,
    relatedJobsSlide: 0,
    relatedNewsSlide: 0,
    cardsPerSlide: 5,
    jobsPerSlide: 6,

    // Counter animation
    statsAnimated: false,
    counterValues: {
      communes: 0,
      locations: 0,
      businesses: 0,
      support: 0
    },
    finalValues: {
      communes: 95,
      locations: 9,
      businesses: 500,
      support: 24
    },

    locationCategories: [
      { id: 'all', name: 'Tất cả', icon: 'MapPin' },
      { id: 'hanh-chinh', name: 'Cơ quan hành chính', icon: 'Building2' },
      { id: 'y-te', name: 'Y tế', icon: 'Heart' },
      { id: 'giao-duc', name: 'Giáo dục', icon: 'GraduationCap' },
      { id: 'am-thuc', name: 'Ẩm thực', icon: 'UtensilsCrossed' },
      { id: 'mua-sam', name: 'Mua sắm', icon: 'ShoppingBag' },
      { id: 'du-lich', name: 'Du lịch', icon: 'Camera' },
      { id: 'giao-thong', name: 'Giao thông', icon: 'Car' },
      { id: 'ngan-hang', name: 'Ngân hàng', icon: 'CreditCard' }
    ],

    get supportDisplay() {
      return this.counterValues.support + '/7';
    },

    get filteredLocationsCount() {
      // Đếm số lượng địa điểm hiển thị trong DOM
      const locationCards = document.querySelectorAll('[data-location-card]');
      return locationCards.length;
    },

    // Methods
    init() {
      this.updateCardsPerSlide();
      this.animateCounters();
      this.initializeFilteredCount();
      this.updateCategoryButtons();
      this.updateCommuneDisplay(); // Initialize commune display
      this.filterLocations(); // Initialize location display
      window.addEventListener('resize', () => this.updateCardsPerSlide());

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-dropdown')) {
          this.sortDropdownOpen = false;
        }
      });
    },

    initializeFilteredCount() {
      // Khởi tạo số lượng ban đầu
      const locationCards = document.querySelectorAll('[data-location-card]');
      this.updateFilteredCount(locationCards.length);
    },

    updateCardsPerSlide() {
      if (window.innerWidth < 768) {
        this.cardsPerSlide = 2;
        this.jobsPerSlide = 4;
      } else {
        this.cardsPerSlide = 5;
        this.jobsPerSlide = 6;
      }
    },

    animateCounters() {
      if (this.statsAnimated) return;

      setTimeout(() => {
        this.statsAnimated = true;
        this.animateCounter('communes', this.finalValues.communes, 2000);
        this.animateCounter('locations', this.finalValues.locations, 2000);
        this.animateCounter('businesses', this.finalValues.businesses, 2000);
        this.animateCounter('support', this.finalValues.support, 2000);
      }, 500);
    },

    animateCounter(key, targetValue, duration) {
      const startTime = Date.now();
      const startValue = 0;

      const updateCounter = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);

        this.counterValues[key] = currentValue;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    },

    search() {
      // Tìm kiếm được xử lý trực tiếp trên DOM
      this.filterLocations();
    },

    filterLocations() {
      const searchTerm = this.searchTerm.toLowerCase();
      const selectedCategory = this.selectedCategory;
      const locationCards = document.querySelectorAll('[data-location-card]');

      let visibleCards = [];

      // First, filter the cards
      locationCards.forEach(card => {
        const name = card.querySelector('[data-location-name]')?.textContent?.toLowerCase() || '';
        const address = card.querySelector('[data-location-address]')?.textContent?.toLowerCase() || '';
        const description = card.querySelector('[data-location-description]')?.textContent?.toLowerCase() || '';
        const category = card.getAttribute('data-location-category') || '';

        let shouldShow = true;

        // Kiểm tra từ khóa tìm kiếm
        if (searchTerm) {
          shouldShow = name.includes(searchTerm) ||
            address.includes(searchTerm) ||
            description.includes(searchTerm);
        }

        // Kiểm tra danh mục
        if (shouldShow && selectedCategory !== 'all') {
          shouldShow = category === selectedCategory;
        }

        if (shouldShow) {
          visibleCards.push(card);
          card.style.display = 'block'; // Hiển thị card
        } else {
          card.style.display = 'none'; // Ẩn card
        }
      });

      // Sort the visible cards
      this.sortVisibleCards(visibleCards);

      // Cập nhật số lượng hiển thị
      this.updateFilteredCount(visibleCards.length);
    },

    sortVisibleCards(cards) {
      const container = cards[0]?.parentElement;
      if (!container) return;

      // Sort based on the current sort option
      cards.sort((a, b) => {
        switch (this.sortOption) {
          case 'name-asc':
            return this.getLocationName(a).localeCompare(this.getLocationName(b), 'vi');
          case 'name-desc':
            return this.getLocationName(b).localeCompare(this.getLocationName(a), 'vi');
          case 'rating-desc':
            return this.getLocationRating(b) - this.getLocationRating(a);
          case 'rating-asc':
            return this.getLocationRating(a) - this.getLocationRating(b);
          default:
            return 0;
        }
      });

      // Reorder the cards in the DOM
      cards.forEach(card => {
        container.appendChild(card);
      });
    },

    updateFilteredCount(count) {
      // Cập nhật số lượng trong DOM
      const countElement = document.querySelector('[data-filtered-count]');
      if (countElement) {
        countElement.textContent = count;
      }
    },

    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
      this.updateCategoryButtons();
      this.filterLocations();
    },

    updateCategoryButtons() {
      // Update button states based on selected category
      const buttons = document.querySelectorAll('[data-category-button]');
      buttons.forEach(button => {
        const categoryId = button.getAttribute('data-category-button');
        if (categoryId === this.selectedCategory) {
          button.classList.remove('btn-outline-primary');
          button.classList.add('btn-primary');
        } else {
          button.classList.remove('btn-primary');
          button.classList.add('btn-outline-primary');
        }
      });
    },

    toggleSortDropdown() {
      this.sortDropdownOpen = !this.sortDropdownOpen;
    },

    selectSortOption(sortValue) {
      this.sortOption = sortValue;
      this.sortDropdownOpen = false;
      this.filterLocations();
    },

    getSortLabel() {
      const labels = {
        'name-asc': 'Tên A-Z',
        'name-desc': 'Tên Z-A',
        'rating-desc': 'Đánh giá cao',
        'rating-asc': 'Đánh giá thấp'
      };
      return labels[this.sortOption] || 'Tên A-Z';
    },

    getLocationRating(card) {
      // Extract rating from the card
      const ratingElement = card.querySelector('.lucide-star').parentElement.querySelector('span');
      return parseFloat(ratingElement?.textContent || '0');
    },

    getLocationName(card) {
      // Extract name from the card
      const nameElement = card.querySelector('[data-location-name]') || card.querySelector('h3 a');
      return nameElement?.textContent?.trim() || '';
    },

    toggleCommunes() {
      this.showAllCommunes = !this.showAllCommunes;
      this.updateCommuneDisplay();
    },

    updateCommuneDisplay() {
      // Chỉ target các card xã/phường trong section cụ thể
      // Tìm section chứa "Danh Sách Các Xã/Phường" và chỉ target các card trong đó
      const sections = document.querySelectorAll('section');
      let communeSection = null;

      sections.forEach(section => {
        const heading = section.querySelector('h2');
        if (heading && heading.textContent.includes('Danh Sách Các Xã/Phường')) {
          communeSection = section;
        }
      });

      if (!communeSection) return;

      // Chỉ target các card trong section xã/phường
      const allCommuneCards = communeSection.querySelectorAll('.rounded-lg.border.bg-card');

      allCommuneCards.forEach(card => {
        if (this.showAllCommunes) {
          // Hiển thị tất cả xã
          card.style.display = 'block';
        } else {
          // Chỉ hiển thị 12 xã đầu tiên
          if (card.hasAttribute('data-first-12')) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    },

    getCommunesButtonText() {
      return this.showAllCommunes ? 'Thu Gọn' : 'Xem Tất Cả 95 Xã/Phường';
    },

    getCommunesButtonIconClass() {
      return this.showAllCommunes ? 'lucide lucide-arrow-right w-4 h-4 ml-2 transition-transform rotate-90' : 'lucide lucide-arrow-right w-4 h-4 ml-2 transition-transform';
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit'
      });
    }
  }));

  Alpine.data('realEstateCarousel', () => ({
    currentSlide: 0,
    totalSlides: 3,
    cardsPerSlide: 5,
    isTransitioning: false,
    totalProperties: 0, // Sẽ được tính động từ DOM

    init() {
      // Đếm số properties thực tế từ DOM
      this.countProperties();

      // Đảm bảo carousel hiển thị ngay từ đầu
      this.updateCardsPerSlide();
      this.calculateTotalSlides();

      // Debug: Log thông tin carousel
      console.log('Real Estate Carousel initialized:', {
        totalProperties: this.totalProperties,
        cardsPerSlide: this.cardsPerSlide,
        totalSlides: this.totalSlides,
        currentSlide: this.currentSlide
      });

      // Đảm bảo carousel hiển thị đúng
      this.$nextTick(() => {
        this.updateCarouselPosition();
        this.debugCarouselState();
      });

      window.addEventListener('resize', () => {
        this.countProperties();
        this.updateCardsPerSlide();
        this.calculateTotalSlides();
      });
    },

    countProperties() {
      // Đếm số properties thực tế từ DOM
      const propertyCards = document.querySelectorAll('[data-real-estate-carousel] .px-2');
      this.totalProperties = propertyCards.length;

      console.log('Counted properties from DOM:', {
        totalProperties: this.totalProperties,
        cardsFound: propertyCards.length
      });
    },

    updateCardsPerSlide() {
      if (window.innerWidth < 640) {
        this.cardsPerSlide = 1;
      } else if (window.innerWidth < 768) {
        this.cardsPerSlide = 2;
      } else if (window.innerWidth < 1024) {
        this.cardsPerSlide = 3;
      } else if (window.innerWidth < 1280) {
        this.cardsPerSlide = 4;
      } else {
        this.cardsPerSlide = 5;
      }
    },

    calculateTotalSlides() {
      // Tính toán số slide dựa trên tổng số properties và số cards per slide
      this.totalSlides = Math.ceil(this.totalProperties / this.cardsPerSlide);
      // Đảm bảo có ít nhất 1 slide
      this.totalSlides = Math.max(1, this.totalSlides);

      // Debug: Log thông tin tính toán
      console.log('Calculating total slides:', {
        totalProperties: this.totalProperties,
        cardsPerSlide: this.cardsPerSlide,
        calculatedSlides: Math.ceil(this.totalProperties / this.cardsPerSlide),
        finalTotalSlides: this.totalSlides
      });
    },

    nextSlide() {
      console.log('Next slide clicked:', {
        currentSlide: this.currentSlide,
        totalSlides: this.totalSlides,
        canGoNext: this.currentSlide < this.totalSlides - 1,
        isTransitioning: this.isTransitioning
      });

      if (this.isTransitioning || this.currentSlide >= this.totalSlides - 1) return;

      this.isTransitioning = true;
      this.currentSlide = this.currentSlide + 1;
      this.updateCarouselPosition();

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    prevSlide() {
      if (this.isTransitioning || this.currentSlide <= 0) return;

      this.isTransitioning = true;
      this.currentSlide = this.currentSlide - 1;
      this.updateCarouselPosition();

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    goToSlide(slideIndex) {
      if (this.isTransitioning || slideIndex === this.currentSlide) return;

      this.isTransitioning = true;
      this.currentSlide = slideIndex;
      this.updateCarouselPosition();

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    updateCarouselPosition() {
      const carouselContainer = document.querySelector('[data-real-estate-carousel]');
      if (carouselContainer) {
        const translateX = -this.currentSlide * 100;
        carouselContainer.style.transform = `translateX(${translateX}%)`;
      }
    },

    getSlideTransform() {
      return `translateX(-${this.currentSlide * 100}%)`;
    },

    isActiveDot(index) {
      return index === this.currentSlide;
    },

    get canGoNext() {
      return this.currentSlide < this.totalSlides - 1 && !this.isTransitioning;
    },

    get canGoPrev() {
      return this.currentSlide > 0 && !this.isTransitioning;
    },

    debugCarouselState() {
      console.log('Carousel Debug State:', {
        currentSlide: this.currentSlide,
        totalSlides: this.totalSlides,
        totalProperties: this.totalProperties,
        cardsPerSlide: this.cardsPerSlide,
        isTransitioning: this.isTransitioning,
        canGoNext: this.canGoNext,
        canGoPrev: this.canGoPrev
      });
    }
  }));

  // ===========================================
  // JOBS CAROUSEL COMPONENT
  // ===========================================
  Alpine.data('jobsCarousel', () => ({
    currentSlide: 0,
    totalSlides: 2, // 2 slides with 6 items each
    isTransitioning: false,

    init() {
      console.log('Jobs Carousel component initialized.');
    },

    nextSlide() {
      if (this.isTransitioning) return;

      this.isTransitioning = true;
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    prevSlide() {
      if (this.isTransitioning) return;

      this.isTransitioning = true;
      this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    goToSlide(slideIndex) {
      if (this.isTransitioning || slideIndex === this.currentSlide) return;

      this.isTransitioning = true;
      this.currentSlide = slideIndex;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    getCarouselTransform() {
      return `translateX(-${this.currentSlide * 100}%)`;
    },

    getDotClass(index) {
      return index === this.currentSlide
        ? 'w-2 h-2 rounded-full transition-colors bg-blue-500'
        : 'w-2 h-2 rounded-full transition-colors bg-gray-300';
    }
  }));

  // ===========================================
  // REAL ESTATE FEATURED CAROUSEL COMPONENT
  // ===========================================
  Alpine.data('realEstateFeaturedCarousel', () => ({
    currentSlide: 0,
    totalSlides: 3, // 3 slides with 5 items each
    isTransitioning: false,

    init() {
      console.log('Real Estate Featured Carousel component initialized.');
    },

    nextSlide() {
      if (this.isTransitioning) return;

      this.isTransitioning = true;
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    prevSlide() {
      if (this.isTransitioning) return;

      this.isTransitioning = true;
      this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    goToSlide(slideIndex) {
      if (this.isTransitioning || slideIndex === this.currentSlide) return;

      this.isTransitioning = true;
      this.currentSlide = slideIndex;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    getCarouselTransform() {
      return `translateX(-${this.currentSlide * 100}%)`;
    },

    getDotClass(index) {
      return index === this.currentSlide
        ? 'w-2 h-2 rounded-full transition-colors bg-blue-500'
        : 'w-2 h-2 rounded-full transition-colors bg-gray-300';
    }
  }));

  // ===========================================
  // NEWS CAROUSEL COMPONENT
  // ===========================================
  Alpine.data('newsCarousel', () => ({
    currentSlide: 0,
    totalSlides: 2, // 2 slides with 4 items each
    isTransitioning: false,

    init() {
      console.log('News Carousel component initialized.');
    },

    nextSlide() {
      if (this.isTransitioning) return;

      this.isTransitioning = true;
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    prevSlide() {
      if (this.isTransitioning) return;

      this.isTransitioning = true;
      this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    goToSlide(slideIndex) {
      if (this.isTransitioning || slideIndex === this.currentSlide) return;

      this.isTransitioning = true;
      this.currentSlide = slideIndex;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    getCarouselTransform() {
      return `translateX(-${this.currentSlide * 100}%)`;
    },

    getDotClass(index) {
      return index === this.currentSlide
        ? 'w-2 h-2 rounded-full transition-colors bg-blue-500'
        : 'w-2 h-2 rounded-full transition-colors bg-gray-300';
    }
  }));
});

// Counter animation function
function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current + '+';
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Fallback for Jobs Carousel
const jobsCarouselContainer = document.querySelector('[x-data*="jobsCarousel"]');
if (jobsCarouselContainer && !jobsCarouselContainer.__x) {
  console.log('Initializing fallback jobs carousel logic');

  let currentSlide = 0;
  const totalSlides = 2;
  let isTransitioning = false;

  const carouselElement = jobsCarouselContainer.querySelector('.flex.transition-transform');
  const prevButton = jobsCarouselContainer.querySelector('button[\\@click*="prevSlide"]');
  const nextButton = jobsCarouselContainer.querySelector('button[\\@click*="nextSlide"]');

  function updateCarousel() {
    if (!carouselElement) return;
    const translateX = -currentSlide * 100;
    carouselElement.style.transform = `translateX(${translateX}%)`;
  }

  function updateDots() {
    const dots = jobsCarouselContainer.querySelectorAll('.flex.justify-center.mt-6.gap-2 button');
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.remove('bg-gray-300');
        dot.classList.add('bg-blue-500');
      } else {
        dot.classList.remove('bg-blue-500');
        dot.classList.add('bg-gray-300');
      }
    });
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
    updateDots();
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    updateCarousel();
    updateDots();
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  function goToSlide(slideIndex) {
    if (isTransitioning || slideIndex === currentSlide) return;
    isTransitioning = true;
    currentSlide = slideIndex;
    updateCarousel();
    updateDots();
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  // Add event listeners
  if (prevButton) {
    prevButton.addEventListener('click', prevSlide);
  }
  if (nextButton) {
    nextButton.addEventListener('click', nextSlide);
  }

  // Add click listeners to dots
  const dots = jobsCarouselContainer.querySelectorAll('.flex.justify-center.mt-6.gap-2 button');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // Initialize
  updateCarousel();
  updateDots();
}

// Fallback for Real Estate Featured Carousel
const realEstateFeaturedCarouselContainer = document.querySelector('[x-data*="realEstateFeaturedCarousel"]');
if (realEstateFeaturedCarouselContainer && !realEstateFeaturedCarouselContainer.__x) {
  console.log('Initializing fallback real estate featured carousel logic');

  let currentSlide = 0;
  const totalSlides = 3;
  let isTransitioning = false;

  const carouselElement = realEstateFeaturedCarouselContainer.querySelector('.flex.transition-transform');
  const prevButton = realEstateFeaturedCarouselContainer.querySelector('button[\\@click*="prevSlide"]');
  const nextButton = realEstateFeaturedCarouselContainer.querySelector('button[\\@click*="nextSlide"]');

  function updateCarousel() {
    if (!carouselElement) return;
    const translateX = -currentSlide * 100;
    carouselElement.style.transform = `translateX(${translateX}%)`;
  }

  function updateDots() {
    const dots = realEstateFeaturedCarouselContainer.querySelectorAll('.flex.justify-center.mt-6.gap-2 button');
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.remove('bg-gray-300');
        dot.classList.add('bg-blue-500');
      } else {
        dot.classList.remove('bg-blue-500');
        dot.classList.add('bg-gray-300');
      }
    });
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
    updateDots();
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    updateCarousel();
    updateDots();
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  function goToSlide(slideIndex) {
    if (isTransitioning || slideIndex === currentSlide) return;
    isTransitioning = true;
    currentSlide = slideIndex;
    updateCarousel();
    updateDots();
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  // Add event listeners
  if (prevButton) {
    prevButton.addEventListener('click', prevSlide);
  }
  if (nextButton) {
    nextButton.addEventListener('click', nextSlide);
  }

  // Add click listeners to dots
  const dots = realEstateFeaturedCarouselContainer.querySelectorAll('.flex.justify-center.mt-6.gap-2 button');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // Initialize
  updateCarousel();
  updateDots();
}

// Fallback for News Carousel
const newsCarouselContainer = document.querySelector('[x-data*="newsCarousel"]');
if (newsCarouselContainer && !newsCarouselContainer.__x) {
  console.log('Initializing fallback news carousel logic');

  let currentSlide = 0;
  const totalSlides = 2;
  let isTransitioning = false;

  const carouselElement = newsCarouselContainer.querySelector('.flex.transition-transform');
  const prevButton = newsCarouselContainer.querySelector('button[\\@click*="prevSlide"]');
  const nextButton = newsCarouselContainer.querySelector('button[\\@click*="nextSlide"]');

  function updateCarousel() {
    if (!carouselElement) return;
    const translateX = -currentSlide * 100;
    carouselElement.style.transform = `translateX(${translateX}%)`;
  }

  function updateDots() {
    const dots = newsCarouselContainer.querySelectorAll('.flex.justify-center.mt-6.gap-2 button');
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.remove('bg-gray-300');
        dot.classList.add('bg-blue-500');
      } else {
        dot.classList.remove('bg-blue-500');
        dot.classList.add('bg-gray-300');
      }
    });
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
    updateDots();
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    updateCarousel();
    updateDots();
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  function goToSlide(slideIndex) {
    if (isTransitioning || slideIndex === currentSlide) return;
    isTransitioning = true;
    currentSlide = slideIndex;
    updateCarousel();
    updateDots();
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }

  // Add event listeners
  if (prevButton) {
    prevButton.addEventListener('click', prevSlide);
  }
  if (nextButton) {
    nextButton.addEventListener('click', nextSlide);
  }

  // Add click listeners to dots
  const dots = newsCarouselContainer.querySelectorAll('.flex.justify-center.mt-6.gap-2 button');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // Initialize
  updateCarousel();
  updateDots();
}

// Initialize counter animations when page loads
document.addEventListener('DOMContentLoaded', function () {
  // Animate statistics counters
  const statsElements = document.querySelectorAll('[data-counter]');
  statsElements.forEach(element => {
    const target = parseInt(element.dataset.counter);
    animateCounter(element, 0, target, 2000);
  });
});
