// Chi Tiet Dia Diem Alpine.js Components
// Chứa tất cả components cho trang chi tiết địa điểm

document.addEventListener('alpine:init', () => {

  // ===========================================
  // IMAGE CAROUSEL COMPONENT
  // ===========================================
  Alpine.data('imageCarousel', () => ({
    currentSlide: 0,
    totalSlides: 5, // 5 ảnh
    isTransitioning: false,

    init() {
      console.log('Image Carousel component initialized.');
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
      if (this.isTransitioning || slideIndex < 0 || slideIndex >= this.totalSlides) return;

      this.isTransitioning = true;
      this.currentSlide = slideIndex;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },


    isDotActive(index) {
      return this.currentSlide === index;
    },

    getDotClass(index) {
      const baseClass = 'w-2 h-2 rounded-full transition-colors';
      return this.isDotActive(index) ? baseClass + ' bg-white' : baseClass + ' bg-white/50';
    }
  }));

  // ===========================================
  // STATS COUNTER COMPONENT
  // ===========================================
  Alpine.data('statsCounter', () => ({
    animatedStats: {
      rating: 0,
      reviews: 0,
      views: 0,
      favorites: 0
    },
    hasAnimated: false,

    init() {
      console.log('Stats Counter component initialized.');
      // Read target values from HTML
      this.readTargetValues();
      // Animate numbers when section comes into view
      this.setupIntersectionObserver();
    },

    readTargetValues() {
      // Read the static values from HTML as targets
      const ratingElement = this.$el.querySelector('[x-text*="animatedStats.rating"]');
      const reviewsElement = this.$el.querySelector('[x-text*="animatedStats.reviews"]');
      const viewsElement = this.$el.querySelector('[x-text*="formatNumber(animatedStats.views)"]');
      const favoritesElement = this.$el.querySelector('[x-text*="animatedStats.favorites"]');

      if (ratingElement) {
        this.targetRating = parseFloat(ratingElement.textContent) || 4.2;
      }
      if (reviewsElement) {
        this.targetReviews = parseInt(reviewsElement.textContent) || 156;
      }
      if (viewsElement) {
        const viewsText = viewsElement.textContent;
        this.targetViews = viewsText.includes('k') ?
          parseFloat(viewsText.replace('k', '')) * 1000 :
          parseInt(viewsText) || 1200;
      }
      if (favoritesElement) {
        this.targetFavorites = parseInt(favoritesElement.textContent) || 856;
      }
    },

    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.animateNumbers();
            this.hasAnimated = true;
          }
        });
      }, { threshold: 0.5 });

      // Observe stats section
      const statsSection = this.$el;
      if (statsSection) {
        observer.observe(statsSection);
      }
    },

    animateNumbers() {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const interval = duration / steps;

      // Animate rating
      let currentRating = 0;
      const targetRating = this.targetRating || 4.2;
      const incrementRating = targetRating / steps;
      const ratingTimer = setInterval(() => {
        currentRating += incrementRating;
        if (currentRating >= targetRating) {
          currentRating = targetRating;
          clearInterval(ratingTimer);
        }
        this.animatedStats.rating = Math.floor(currentRating * 10) / 10;
      }, interval);

      // Animate reviews
      let currentReviews = 0;
      const targetReviews = this.targetReviews || 156;
      const incrementReviews = targetReviews / steps;
      const reviewsTimer = setInterval(() => {
        currentReviews += incrementReviews;
        if (currentReviews >= targetReviews) {
          currentReviews = targetReviews;
          clearInterval(reviewsTimer);
        }
        this.animatedStats.reviews = Math.floor(currentReviews);
      }, interval);

      // Animate views
      let currentViews = 0;
      const targetViews = this.targetViews || 1200;
      const incrementViews = targetViews / steps;
      const viewsTimer = setInterval(() => {
        currentViews += incrementViews;
        if (currentViews >= targetViews) {
          currentViews = targetViews;
          clearInterval(viewsTimer);
        }
        this.animatedStats.views = Math.floor(currentViews);
      }, interval);

      // Animate favorites
      let currentFavorites = 0;
      const targetFavorites = this.targetFavorites || 856;
      const incrementFavorites = targetFavorites / steps;
      const favoritesTimer = setInterval(() => {
        currentFavorites += incrementFavorites;
        if (currentFavorites >= targetFavorites) {
          currentFavorites = targetFavorites;
          clearInterval(favoritesTimer);
        }
        this.animatedStats.favorites = Math.floor(currentFavorites);
      }, interval);
    },

    formatNumber(num) {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
      }
      return num.toString();
    }
  }));

  // ===========================================
  // HEART BUTTON TOGGLE COMPONENT
  // ===========================================
  Alpine.data('heartToggle', () => ({
    isFavorited: false,

    init() {
      console.log('Heart Toggle component initialized.');
    },

    toggleFavorite() {
      this.isFavorited = !this.isFavorited;
      console.log('Heart toggled:', this.isFavorited ? 'favorited' : 'unfavorited');
    },

    getButtonClass() {
      const baseClass = 'btn-outline-primary btn-sm';
      return this.isFavorited
        ? `${baseClass} text-red-500 border-red-500`
        : baseClass;
    },

    getSvgClass() {
      const baseClass = 'lucide lucide-heart w-4 h-4';
      return this.isFavorited
        ? `${baseClass} fill-current`
        : baseClass;
    }
  }));

  // ===========================================
  // REVIEWS TOGGLE COMPONENT
  // ===========================================
  Alpine.data('reviewsToggle', () => ({
    showAllReviews: false,
    visibleReviews: 3,
    totalReviews: 5,

    init() {
      console.log('Reviews Toggle component initialized.');
    },

    toggleReviews() {
      this.showAllReviews = !this.showAllReviews;
      console.log('Reviews toggled:', this.showAllReviews ? 'showing all' : 'showing limited');
    },

    getButtonText() {
      return this.showAllReviews ? 'Thu gọn đánh giá' : 'Xem tất cả đánh giá';
    },


    shouldShowReview(index) {
      return this.showAllReviews || index < this.visibleReviews;
    },

    getReviewClass(index) {
      return 'review-item transition-all duration-300';
    }
  }));

  // ===========================================
  // RELATED LOCATIONS CAROUSEL COMPONENT
  // ===========================================
  Alpine.data('relatedLocationsCarousel', () => ({
    currentSlide: 0,
    totalSlides: 2, // 2 slides with 4 items each
    isTransitioning: false,

    init() {
      console.log('Related Locations Carousel component initialized.');
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
      if (this.isTransitioning || slideIndex < 0 || slideIndex >= this.totalSlides) return;

      this.isTransitioning = true;
      this.currentSlide = slideIndex;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    isDotActive(index) {
      return this.currentSlide === index;
    },

    getDotClass(index) {
      const baseClass = 'w-2 h-2 rounded-full transition-colors';
      return this.isDotActive(index) ? baseClass + ' bg-blue-500' : baseClass + ' bg-gray-300';
    },

    getCarouselTransform() {
      return `translateX(-${this.currentSlide * 100}%)`;
    }
  }));

  // ===========================================
  // REAL ESTATE CAROUSEL COMPONENT
  // ===========================================
  Alpine.data('realEstateCarousel', () => ({
    currentSlide: 0,
    totalSlides: 3, // 3 slides with 5 items each
    isTransitioning: false,

    init() {
      console.log('Real Estate Carousel component initialized.');
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
      if (this.isTransitioning || slideIndex < 0 || slideIndex >= this.totalSlides) return;

      this.isTransitioning = true;
      this.currentSlide = slideIndex;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    isDotActive(index) {
      return this.currentSlide === index;
    },

    getDotClass(index) {
      const baseClass = 'w-2 h-2 rounded-full transition-colors';
      return this.isDotActive(index) ? baseClass + ' bg-blue-500' : baseClass + ' bg-gray-300';
    },

    getCarouselTransform() {
      return `translateX(-${this.currentSlide * 100}%)`;
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
      if (this.isTransitioning || slideIndex < 0 || slideIndex >= this.totalSlides) return;

      this.isTransitioning = true;
      this.currentSlide = slideIndex;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    isDotActive(index) {
      return this.currentSlide === index;
    },

    getDotClass(index) {
      const baseClass = 'w-2 h-2 rounded-full transition-colors';
      return this.isDotActive(index) ? baseClass + ' bg-blue-500' : baseClass + ' bg-gray-300';
    },

    getCarouselTransform() {
      return `translateX(-${this.currentSlide * 100}%)`;
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
      if (this.isTransitioning || slideIndex < 0 || slideIndex >= this.totalSlides) return;

      this.isTransitioning = true;
      this.currentSlide = slideIndex;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    isDotActive(index) {
      return this.currentSlide === index;
    },

    getDotClass(index) {
      const baseClass = 'w-2 h-2 rounded-full transition-colors';
      return this.isDotActive(index) ? baseClass + ' bg-blue-500' : baseClass + ' bg-gray-300';
    },

    getCarouselTransform() {
      return `translateX(-${this.currentSlide * 100}%)`;
    }
  }));

  // ===========================================
  // WORKING HOURS COMPONENT
  // ===========================================
  Alpine.data('workingHours', () => ({
    currentDay: null,
    isOpen: false,
    currentTime: null,

    init() {
      console.log('Working Hours component initialized.');
      this.updateCurrentDay();
      this.checkIfOpen();

      // Update every minute
      setInterval(() => {
        this.updateCurrentDay();
        this.checkIfOpen();
      }, 60000);
    },

    updateCurrentDay() {
      const now = new Date();
      const vietnamTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
      this.currentDay = vietnamTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      this.currentTime = vietnamTime.getHours() * 100 + vietnamTime.getMinutes();
    },

    checkIfOpen() {
      const day = this.currentDay;
      const time = this.currentTime;

      // Monday to Friday: 7:30-11:30, 13:30-17:00
      if (day >= 1 && day <= 5) {
        const morningStart = 730; // 7:30
        const morningEnd = 1130; // 11:30
        const afternoonStart = 1330; // 13:30
        const afternoonEnd = 1700; // 17:00

        this.isOpen = (time >= morningStart && time <= morningEnd) ||
          (time >= afternoonStart && time <= afternoonEnd);
      } else {
        // Saturday and Sunday: Closed
        this.isOpen = false;
      }
    },

    getDayName(dayIndex) {
      const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
      return days[dayIndex];
    },

    isToday(dayIndex) {
      return this.currentDay === dayIndex;
    },

    getDayClass(dayIndex) {
      const baseClass = "flex justify-between text-sm p-2 rounded";
      if (this.isToday(dayIndex)) {
        return baseClass + " bg-blue-50 border border-blue-200";
      }
      return baseClass;
    },

    getDayTextClass(dayIndex) {
      if (this.isToday(dayIndex)) {
        return "font-semibold text-blue-700";
      }
      return "text-gray-600";
    },

    getTimeTextClass(dayIndex) {
      if (this.isToday(dayIndex)) {
        return "font-semibold text-blue-700";
      }
      return "text-gray-900";
    },

    getDayDisplayText(dayIndex) {
      const dayName = this.getDayName(dayIndex);
      if (this.isToday(dayIndex)) {
        return `${dayName} (Hôm nay)`;
      }
      return dayName;
    },

    getWorkingHours(dayIndex) {
      if (dayIndex === 0 || dayIndex === 6) { // Sunday or Saturday
        return "Đóng cửa";
      }
      return "7:30 - 11:30, 13:30 - 17:00";
    },

    getStatusText() {
      return this.isOpen ? "Đang mở cửa" : "Đã đóng cửa";
    },

    getStatusClass() {
      return this.isOpen ? "text-green-800" : "text-red-800";
    },

    getStatusDotClass() {
      return this.isOpen ? "bg-green-500" : "bg-red-500";
    }
  }));

});

// ===========================================
// FALLBACK LOGIC
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
  // Fallback for Image Carousel
  const imageCarouselContainer = document.querySelector('[x-data*="imageCarousel"]');
  if (imageCarouselContainer && !imageCarouselContainer.__x) {
    console.log('Initializing fallback image carousel logic');

    let currentSlide = 0;
    const totalSlides = 5;
    let isTransitioning = false;

    const carouselElement = imageCarouselContainer.querySelector('.carousel-container');
    const prevButton = imageCarouselContainer.querySelector('button[\\@click*="prevSlide"]');
    const nextButton = imageCarouselContainer.querySelector('button[\\@click*="nextSlide"]');

    function updateCarousel() {
      if (!carouselElement) return;
      const translateX = -currentSlide * 100;
      carouselElement.style.transform = `translateX(${translateX}%)`;
      console.log(`Fallback image carousel moved to slide ${currentSlide + 1}/${totalSlides}`);
    }

    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentSlide = (currentSlide + 1) % totalSlides;
      updateDots();
      setTimeout(() => { isTransitioning = false; }, 500);
    }

    function prevSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
      updateDots();
      setTimeout(() => { isTransitioning = false; }, 500);
    }

    function goToSlide(slideIndex) {
      if (isTransitioning || slideIndex < 0 || slideIndex >= totalSlides) return;
      isTransitioning = true;
      currentSlide = slideIndex;
      updateDots();
      setTimeout(() => { isTransitioning = false; }, 500);
    }

    // Update dots pagination fallback
    const dotsContainer = imageCarouselContainer.querySelector('.dots-container');

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, index) => {
        dot.style.backgroundColor = index === currentSlide ? '#ffffff' : 'rgba(255, 255, 255, 0.5)';
      });
    }

    // Add event listeners
    if (prevButton) {
      prevButton.addEventListener('click', prevSlide);
    }
    if (nextButton) {
      nextButton.addEventListener('click', nextSlide);
    }

    // Initialize
    updateDots();
  }

  // Fallback for Stats Counter
  const statsCounterContainer = document.querySelector('[x-data*="statsCounter"]');
  if (statsCounterContainer && !statsCounterContainer.__x) {
    console.log('Initializing fallback stats counter logic');

    // Read target values from HTML
    const ratingElement = statsCounterContainer.querySelector('[x-text*="animatedStats.rating"]');
    const reviewsElement = statsCounterContainer.querySelector('[x-text*="animatedStats.reviews"]');
    const viewsElement = statsCounterContainer.querySelector('[x-text*="formatNumber(animatedStats.views)"]');
    const favoritesElement = statsCounterContainer.querySelector('[x-text*="animatedStats.favorites"]');

    const stats = {
      rating: ratingElement ? parseFloat(ratingElement.textContent) || 4.2 : 4.2,
      reviews: reviewsElement ? parseInt(reviewsElement.textContent) || 156 : 156,
      views: viewsElement ? (() => {
        const viewsText = viewsElement.textContent;
        return viewsText.includes('k') ?
          parseFloat(viewsText.replace('k', '')) * 1000 :
          parseInt(viewsText) || 1200;
      })() : 1200,
      favorites: favoritesElement ? parseInt(favoritesElement.textContent) || 856 : 856
    };

    const animatedStats = {
      rating: 0,
      reviews: 0,
      views: 0,
      favorites: 0
    };

    let hasAnimated = false;

    // Setup intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          animateNumbers();
          hasAnimated = true;
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsCounterContainer);

    function animateNumbers() {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const interval = duration / steps;

      Object.keys(stats).forEach(key => {
        let current = 0;
        const target = stats[key];
        const increment = target / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          animatedStats[key] = Math.floor(current * 10) / 10; // Keep 1 decimal for rating
          updateDisplay();
        }, interval);
      });
    }

    function formatNumber(num) {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
      }
      return num.toString();
    }

    function updateDisplay() {
      // Update rating
      const ratingElement = statsCounterContainer.querySelector('[x-text*="animatedStats.rating"]');
      if (ratingElement) {
        ratingElement.textContent = animatedStats.rating;
      }

      // Update reviews
      const reviewsElement = statsCounterContainer.querySelector('[x-text*="animatedStats.reviews"]');
      if (reviewsElement) {
        reviewsElement.textContent = animatedStats.reviews;
      }

      // Update views
      const viewsElement = statsCounterContainer.querySelector('[x-text*="formatNumber(animatedStats.views)"]');
      if (viewsElement) {
        viewsElement.textContent = formatNumber(animatedStats.views);
      }

      // Update favorites
      const favoritesElement = statsCounterContainer.querySelector('[x-text*="animatedStats.favorites"]');
      if (favoritesElement) {
        favoritesElement.textContent = animatedStats.favorites;
      }
    }
  }

  // Fallback for Heart Toggle
  const heartToggleContainer = document.querySelector('[x-data*="heartToggle"]');
  if (heartToggleContainer && !heartToggleContainer.__x) {
    console.log('Initializing fallback heart toggle logic');

    let isFavorited = false;
    const button = heartToggleContainer.querySelector('button');
    const svg = heartToggleContainer.querySelector('svg');

    function toggleFavorite() {
      isFavorited = !isFavorited;
      updateButton();
      console.log('Heart toggled:', isFavorited ? 'favorited' : 'unfavorited');
    }

    function updateButton() {
      if (!button || !svg) return;

      const baseButtonClass = 'btn-outline-primary btn-sm';
      const baseSvgClass = 'lucide lucide-heart w-4 h-4';

      if (isFavorited) {
        button.className = `${baseButtonClass} text-red-500 border-red-500`;
        svg.className = `${baseSvgClass} fill-current`;
      } else {
        button.className = baseButtonClass;
        svg.className = baseSvgClass;
      }
    }

    // Add click event listener
    if (button) {
      button.addEventListener('click', toggleFavorite);
    }

    // Initialize
    updateButton();
  }

  // Fallback for Reviews Toggle
  const reviewsToggleContainer = document.querySelector('[x-data*="reviewsToggle"]');
  if (reviewsToggleContainer && !reviewsToggleContainer.__x) {
    console.log('Initializing fallback reviews toggle logic');

    let showAllReviews = false;
    const visibleReviews = 3;
    const totalReviews = 5;

    function toggleReviews() {
      showAllReviews = !showAllReviews;
      updateDisplay();
      console.log('Reviews toggled:', showAllReviews ? 'showing all' : 'showing limited');
    }

    function getButtonText() {
      return showAllReviews ? 'Thu gọn đánh giá' : 'Xem tất cả đánh giá';
    }


    function shouldShowReview(index) {
      return showAllReviews || index < visibleReviews;
    }

    function getReviewClass(index) {
      return 'review-item transition-all duration-300';
    }

    function updateDisplay() {
      // Update button text and class
      const toggleButton = reviewsToggleContainer.querySelector('button[\\@click*="toggleReviews"]');
      if (toggleButton) {
        const textSpan = toggleButton.querySelector('span');
        if (textSpan) {
          textSpan.textContent = getButtonText();
        }
        toggleButton.className = 'btn-outline-primary flex items-center mx-auto';

        // Update icons visibility
        const chevronDown = toggleButton.querySelector('svg[x-show*="!showAllReviews"]');
        const chevronUp = toggleButton.querySelector('svg[x-show*="showAllReviews"]');

        if (chevronDown && chevronUp) {
          if (showAllReviews) {
            chevronDown.style.display = 'none';
            chevronUp.style.display = 'block';
          } else {
            chevronDown.style.display = 'block';
            chevronUp.style.display = 'none';
          }
        }
      }

      // Update review items
      const reviewItems = reviewsToggleContainer.querySelectorAll('[x-show*="shouldShowReview"]');
      reviewItems.forEach((item, index) => {
        item.className = getReviewClass(index);
        item.style.display = shouldShowReview(index) ? 'block' : 'none';
      });
    }

    // Add click event listener
    const toggleButton = reviewsToggleContainer.querySelector('button[\\@click*="toggleReviews"]');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleReviews);
    }

    // Initialize
    updateDisplay();
  }

  // Fallback for Related Locations Carousel
  const relatedLocationsCarouselContainer = document.querySelector('[x-data*="relatedLocationsCarousel"]');
  if (relatedLocationsCarouselContainer && !relatedLocationsCarouselContainer.__x) {
    console.log('Initializing fallback related locations carousel logic');

    let currentSlide = 0;
    const totalSlides = 2;
    let isTransitioning = false;

    const carouselElement = relatedLocationsCarouselContainer.querySelector('.flex.transition-transform');
    const prevButton = relatedLocationsCarouselContainer.querySelector('button[\\@click*="prevSlide"]');
    const nextButton = relatedLocationsCarouselContainer.querySelector('button[\\@click*="nextSlide"]');

    function updateCarousel() {
      if (!carouselElement) return;
      const translateX = -currentSlide * 100;
      carouselElement.style.transform = `translateX(${translateX}%)`;
      console.log(`Fallback related locations carousel moved to slide ${currentSlide + 1}/${totalSlides}`);
    }

    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
      updateDots();
      setTimeout(() => { isTransitioning = false; }, 500);
    }

    function prevSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
      updateCarousel();
      updateDots();
      setTimeout(() => { isTransitioning = false; }, 500);
    }

    function goToSlide(slideIndex) {
      if (isTransitioning || slideIndex < 0 || slideIndex >= totalSlides) return;
      isTransitioning = true;
      currentSlide = slideIndex;
      updateCarousel();
      updateDots();
      setTimeout(() => { isTransitioning = false; }, 500);
    }

    // Update dots pagination fallback
    const dotsContainer = relatedLocationsCarouselContainer.querySelector('.flex.justify-center.mt-6.gap-2');

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.className = 'w-2 h-2 rounded-full transition-colors bg-blue-500';
        } else {
          dot.className = 'w-2 h-2 rounded-full transition-colors bg-gray-300';
        }
      });
    }

    // Add event listeners
    if (prevButton) {
      prevButton.addEventListener('click', prevSlide);
    }
    if (nextButton) {
      nextButton.addEventListener('click', nextSlide);
    }

    // Add click events to dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
      });
    }

    // Initialize
    updateDots();
  }

  // Fallback for Real Estate Carousel
  const realEstateCarouselContainer = document.querySelector('[x-data*="realEstateCarousel"]');
  if (realEstateCarouselContainer && !realEstateCarouselContainer.__x) {
    console.log('Initializing fallback real estate carousel logic');

    let currentSlide = 0;
    const totalSlides = 3;
    let isTransitioning = false;

    const carouselElement = realEstateCarouselContainer.querySelector('.flex.transition-transform');
    const prevButton = realEstateCarouselContainer.querySelector('button[\\@click*="prevSlide"]');
    const nextButton = realEstateCarouselContainer.querySelector('button[\\@click*="nextSlide"]');

    function updateCarousel() {
      if (!carouselElement) return;
      const translateX = -currentSlide * 100;
      carouselElement.style.transform = `translateX(${translateX}%)`;
      console.log(`Fallback real estate carousel moved to slide ${currentSlide + 1}/${totalSlides}`);
    }

    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
      updateDots();
      setTimeout(() => { isTransitioning = false; }, 500);
    }

    function prevSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
      updateCarousel();
      updateDots();
      setTimeout(() => { isTransitioning = false; }, 500);
    }

    function goToSlide(slideIndex) {
      if (isTransitioning || slideIndex < 0 || slideIndex >= totalSlides) return;
      isTransitioning = true;
      currentSlide = slideIndex;
      updateCarousel();
      updateDots();
      setTimeout(() => { isTransitioning = false; }, 500);
    }

    // Update dots pagination fallback
    const dotsContainer = realEstateCarouselContainer.querySelector('.flex.justify-center.mt-6.gap-2');

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.className = 'w-2 h-2 rounded-full transition-colors bg-blue-500';
        } else {
          dot.className = 'w-2 h-2 rounded-full transition-colors bg-gray-300';
        }
      });
    }

    // Add event listeners
    if (prevButton) {
      prevButton.addEventListener('click', prevSlide);
    }
    if (nextButton) {
      nextButton.addEventListener('click', nextSlide);
    }

    // Add click events to dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
      });
    }

    // Initialize
    updateDots();
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
      console.log(`Fallback jobs carousel moved to slide ${currentSlide + 1}/${totalSlides}`);
    }

    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
      updateDots();
      setTimeout(() => { isTransitioning = false; }, 500);
    }

    function prevSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
      updateCarousel();
      updateDots();
      setTimeout(() => { isTransitioning = false; }, 500);
    }

    function goToSlide(slideIndex) {
      if (isTransitioning || slideIndex < 0 || slideIndex >= totalSlides) return;
      isTransitioning = true;
      currentSlide = slideIndex;
      updateCarousel();
      updateDots();
      setTimeout(() => { isTransitioning = false; }, 500);
    }

    // Update dots pagination fallback
    const dotsContainer = jobsCarouselContainer.querySelector('.flex.justify-center.mt-6.gap-2');

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.className = 'w-2 h-2 rounded-full transition-colors bg-blue-500';
        } else {
          dot.className = 'w-2 h-2 rounded-full transition-colors bg-gray-300';
        }
      });
    }

    // Add event listeners
    if (prevButton) {
      prevButton.addEventListener('click', prevSlide);
    }
    if (nextButton) {
      nextButton.addEventListener('click', nextSlide);
    }

    // Add click events to dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
      });
    }

    // Initialize
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
      console.log(`Fallback news carousel moved to slide ${currentSlide + 1}/${totalSlides}`);
    }

    function nextSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
      updateDots();
      setTimeout(() => { isTransitioning = false; }, 500);
    }

    function prevSlide() {
      if (isTransitioning) return;
      isTransitioning = true;
      currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
      updateCarousel();
      updateDots();
      setTimeout(() => { isTransitioning = false; }, 500);
    }

    function goToSlide(slideIndex) {
      if (isTransitioning || slideIndex < 0 || slideIndex >= totalSlides) return;
      isTransitioning = true;
      currentSlide = slideIndex;
      updateCarousel();
      updateDots();
      setTimeout(() => { isTransitioning = false; }, 500);
    }

    // Update dots pagination fallback
    const dotsContainer = newsCarouselContainer.querySelector('.flex.justify-center.mt-6.gap-2');

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.className = 'w-2 h-2 rounded-full transition-colors bg-blue-500';
        } else {
          dot.className = 'w-2 h-2 rounded-full transition-colors bg-gray-300';
        }
      });
    }

    // Add event listeners
    if (prevButton) {
      prevButton.addEventListener('click', prevSlide);
    }
    if (nextButton) {
      nextButton.addEventListener('click', nextSlide);
    }

    // Add click events to dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
      });
    }

    // Initialize
    updateDots();
  }

  // Fallback for Working Hours
  const workingHoursContainer = document.querySelector('[x-data*="workingHours"]');
  if (workingHoursContainer && !workingHoursContainer.__x) {
    console.log('Initializing fallback working hours logic');

    let currentDay = null;
    let isOpen = false;
    let currentTime = null;

    function updateCurrentDay() {
      const now = new Date();
      const vietnamTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
      currentDay = vietnamTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      currentTime = vietnamTime.getHours() * 100 + vietnamTime.getMinutes();
    }

    function checkIfOpen() {
      const day = currentDay;
      const time = currentTime;

      // Monday to Friday: 7:30-11:30, 13:30-17:00
      if (day >= 1 && day <= 5) {
        const morningStart = 730; // 7:30
        const morningEnd = 1130; // 11:30
        const afternoonStart = 1330; // 13:30
        const afternoonEnd = 1700; // 17:00

        isOpen = (time >= morningStart && time <= morningEnd) ||
          (time >= afternoonStart && time <= afternoonEnd);
      } else {
        // Saturday and Sunday: Closed
        isOpen = false;
      }
    }

    function getDayName(dayIndex) {
      const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
      return days[dayIndex];
    }

    function isToday(dayIndex) {
      return currentDay === dayIndex;
    }

    function getDayClass(dayIndex) {
      const baseClass = "flex justify-between text-sm p-2 rounded";
      if (isToday(dayIndex)) {
        return baseClass + " bg-blue-50 border border-blue-200";
      }
      return baseClass;
    }

    function getDayTextClass(dayIndex) {
      if (isToday(dayIndex)) {
        return "font-semibold text-blue-700";
      }
      return "text-gray-600";
    }

    function getTimeTextClass(dayIndex) {
      if (isToday(dayIndex)) {
        return "font-semibold text-blue-700";
      }
      return "text-gray-900";
    }

    function getDayDisplayText(dayIndex) {
      const dayName = getDayName(dayIndex);
      if (isToday(dayIndex)) {
        return `${dayName} (Hôm nay)`;
      }
      return dayName;
    }

    function getWorkingHours(dayIndex) {
      if (dayIndex === 0 || dayIndex === 6) { // Sunday or Saturday
        return "Đóng cửa";
      }
      return "7:30 - 11:30, 13:30 - 17:00";
    }

    function getStatusText() {
      return isOpen ? "Đang mở cửa" : "Đã đóng cửa";
    }

    function getStatusClass() {
      return isOpen ? "text-green-800" : "text-red-800";
    }

    function getStatusDotClass() {
      return isOpen ? "bg-green-500" : "bg-red-500";
    }

    function updateDisplay() {
      // Update status
      const statusElement = workingHoursContainer.querySelector('[x-text*="getStatusText"]');
      if (statusElement) {
        statusElement.textContent = getStatusText();
        statusElement.className = `text-sm font-medium ${getStatusClass()}`;
      }

      // Update status dot
      const statusDot = workingHoursContainer.querySelector('[x-class*="getStatusDotClass"]');
      if (statusDot) {
        statusDot.className = `w-2 h-2 rounded-full mr-2 ${getStatusDotClass()}`;
      }

      // Update status container background
      const statusContainer = workingHoursContainer.querySelector('.mt-4.p-3.rounded-lg');
      if (statusContainer) {
        statusContainer.className = `mt-4 p-3 rounded-lg ${isOpen ? 'bg-green-50' : 'bg-red-50'}`;
      }

      // Update each day - now with specific dayIndex for each div
      const dayIndices = [1, 2, 3, 4, 5, 6, 0]; // Thứ 2, 3, 4, 5, 6, 7, CN
      const dayContainers = workingHoursContainer.querySelectorAll('[x-class*="getDayClass"]');

      dayContainers.forEach((container, index) => {
        const dayIndex = dayIndices[index];

        // Update container class
        container.className = getDayClass(dayIndex);

        // Update day text
        const daySpan = container.querySelector('[x-text*="getDayDisplayText"]');
        if (daySpan) {
          daySpan.textContent = getDayDisplayText(dayIndex);
          daySpan.className = getDayTextClass(dayIndex);
        }

        // Update time text
        const timeSpan = container.querySelector('[x-text*="getWorkingHours"]');
        if (timeSpan) {
          timeSpan.textContent = getWorkingHours(dayIndex);
          timeSpan.className = getTimeTextClass(dayIndex);
        }
      });
    }

    // Initialize
    updateCurrentDay();
    checkIfOpen();
    updateDisplay();

    // Update every minute
    setInterval(() => {
      updateCurrentDay();
      checkIfOpen();
      updateDisplay();
    }, 60000);
  }
});
