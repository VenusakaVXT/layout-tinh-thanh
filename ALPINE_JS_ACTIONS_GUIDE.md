# Hướng Dẫn Các Thao Tác Động Alpine.js

## Tổng Quan
File này chứa danh sách các thao tác động phổ biến được xử lý bằng Alpine.js, được tổng hợp từ file `bat-dong-san.js`. Sử dụng file này làm template để tạo các thao tác động tương tự cho các trang khác.

## 1. Hero Section Component

### Chức năng: Tìm kiếm
```javascript
Alpine.data('heroSectionComponent', () => ({
  searchQuery: '',
  isLoading: false,

  init() {
    console.log('Hero Section component initialized.');
  },

  handleSearch() {
    if (this.searchQuery.trim()) {
      this.isLoading = true;
      // Chuyển sang trang search với keyword
      const keyword = encodeURIComponent(this.searchQuery.trim());
      window.location.href = `/search?keyword=${keyword}`;
    }
  }
}));
```

### HTML Template:
```html
<div x-data="heroSectionComponent">
  <input x-model="searchQuery" @keyup.enter="handleSearch()" />
  <button @click="handleSearch()" :disabled="isLoading">
    <span x-show="!isLoading">Tìm kiếm</span>
    <span x-show="isLoading">Đang tìm...</span>
  </button>
</div>
```

## 2. Filter Component

### Chức năng: Dropdown, Checkbox, Select Filter
```javascript
Alpine.data('filterComponent', () => ({
  filters: {
    type: 'all',
    priceRange: 'all',
    area: 'all',
    location: 'all',
    bedrooms: 'all',
    bathrooms: 'all',
    status: 'all',
    featured: false,
    verified: false
  },
  isFilterOpen: false,
  openDropdown: null,
  
  // Các options cho dropdown
  typeOptions: [
    { value: 'all', label: 'Tất cả' },
    { value: 'option1', label: 'Tùy chọn 1' },
    { value: 'option2', label: 'Tùy chọn 2' }
  ],

  init() {
    console.log('Filter component initialized.');
    // Listen for clear filters event
    window.addEventListener('clear-filters', (event) => {
      this.resetFilters();
    });
  },

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  },

  toggleDropdown(dropdownName) {
    this.openDropdown = this.openDropdown === dropdownName ? null : dropdownName;
  },

  closeDropdown() {
    this.openDropdown = null;
  },

  updateFilter(filterType, value) {
    this.filters[filterType] = value;
    this.closeDropdown();
    this.applyFilters();
  },

  applyFilters() {
    // Dispatch filter event to list component
    window.dispatchEvent(new CustomEvent('filter-items', {
      detail: { filters: this.filters }
    }));
  },

  resetFilters() {
    this.filters = {
      type: 'all',
      priceRange: 'all',
      area: 'all',
      location: 'all',
      bedrooms: 'all',
      bathrooms: 'all',
      status: 'all',
      featured: false,
      verified: false
    };
    this.applyFilters();
  },

  getFilterLabel(type, value) {
    const options = {
      type: this.typeOptions,
      // ... other options
    };
    const option = options[type]?.find(opt => opt.value === value);
    return option ? option.label : 'Tất cả';
  }
}));
```

### HTML Template:
```html
<div x-data="filterComponent">
  <!-- Toggle Filter Button -->
  <button @click="toggleFilter()" class="filter-toggle">
    <span x-show="!isFilterOpen">Mở bộ lọc</span>
    <span x-show="isFilterOpen">Đóng bộ lọc</span>
  </button>

  <!-- Filter Panel -->
  <div x-show="isFilterOpen" class="filter-panel">
    
    <!-- Dropdown Filter -->
    <div class="filter-group">
      <button @click="toggleDropdown('type')" class="dropdown-trigger">
        <span x-text="getFilterLabel('type', filters.type)"></span>
        <i class="chevron-down"></i>
      </button>
      <div x-show="openDropdown === 'type'" class="dropdown-menu">
        <template x-for="option in typeOptions" :key="option.value">
          <button @click="updateFilter('type', option.value)" 
                  :class="{ 'active': filters.type === option.value }">
            <span x-text="option.label"></span>
          </button>
        </template>
      </div>
    </div>

    <!-- Checkbox Filter -->
    <div class="filter-group">
      <label class="checkbox-filter">
        <input type="checkbox" x-model="filters.featured" @change="applyFilters()">
        <span>Nổi bật</span>
      </label>
    </div>

    <!-- Reset Button -->
    <button @click="resetFilters()" class="reset-btn">Xóa bộ lọc</button>
  </div>
</div>
```

## 3. Stats Section Component

### Chức năng: Counter Animation
```javascript
Alpine.data('statsSectionComponent', () => ({
  stats: {
    items: 120,
    projects: 50,
    partners: 10,
    experience: 20
  },
  animatedStats: {
    items: 0,
    projects: 0,
    partners: 0,
    experience: 0
  },
  hasAnimated: false,

  init() {
    this.setupIntersectionObserver();
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

    const statsSection = this.$el.closest('.grid');
    if (statsSection) {
      observer.observe(statsSection);
    }
  },

  animateNumbers() {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    Object.keys(this.stats).forEach(key => {
      let current = 0;
      const target = this.stats[key];
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        this.animatedStats[key] = Math.floor(current);
      }, interval);
    });
  },

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  }
}));
```

### HTML Template:
```html
<div x-data="statsSectionComponent" class="stats-grid">
  <div class="stat-item">
    <div class="stat-number" x-text="formatNumber(animatedStats.items)"></div>
    <div class="stat-label">Số lượng</div>
  </div>
  <div class="stat-item">
    <div class="stat-number" x-text="formatNumber(animatedStats.projects)"></div>
    <div class="stat-label">Dự án</div>
  </div>
  <!-- Thêm các stat khác... -->
</div>
```

## 4. List Component

### Chức năng: Sort, View Mode, Pagination, Search
```javascript
Alpine.data('listComponent', () => ({
  items: [],
  filteredItems: [],
  isLoading: true,
  currentPage: 1,
  itemsPerPage: 8,
  totalPages: 1,
  searchQuery: '',
  viewMode: 'grid', // 'grid' or 'list'
  currentFilters: {},
  sortBy: 'newest',
  isSortDropdownOpen: false,
  sortOptions: [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'price-low', label: 'Giá thấp đến cao' },
    { value: 'price-high', label: 'Giá cao đến thấp' },
    { value: 'most-viewed', label: 'Xem nhiều nhất' }
  ],

  init() {
    console.log('List component initialized.');
    this.loadItems();

    // Listen for search events
    window.addEventListener('search-items', (event) => {
      this.searchQuery = event.detail.query;
      this.filterItems();
    });

    // Listen for filter events
    window.addEventListener('filter-items', (event) => {
      this.currentFilters = event.detail.filters;
      this.filterItems();
    });

    // Listen for clear filters event
    window.addEventListener('clear-filters', (event) => {
      this.currentFilters = {};
      this.filterItems();
    });
  },

  async loadItems() {
    try {
      this.isLoading = true;
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Load your data here
      this.items = yourDataArray;
      this.filteredItems = [...this.items];
      this.calculatePagination();
      this.isLoading = false;
    } catch (error) {
      console.error('Error loading items:', error);
      this.isLoading = false;
    }
  },

  filterItems() {
    let filtered = [...this.items];

    // Apply search filter
    if (this.searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Apply other filters based on currentFilters
    // ... implement your filtering logic

    this.filteredItems = filtered;
    this.applySorting();
    this.currentPage = 1;
    this.calculatePagination();
  },

  // Sort methods
  toggleSortDropdown() {
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
  },

  closeSortDropdown() {
    this.isSortDropdownOpen = false;
  },

  updateSort(sortValue) {
    this.sortBy = sortValue;
    this.closeSortDropdown();
    this.applySorting();
    this.currentPage = 1;
    this.calculatePagination();
  },

  applySorting() {
    const sorted = [...this.filteredItems];

    switch (this.sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        break;
      case 'most-viewed':
        sorted.sort((a, b) => b.views - a.views);
        break;
    }

    this.filteredItems = sorted;
  },

  getCurrentSortLabel() {
    const option = this.sortOptions.find(opt => opt.value === this.sortBy);
    return option ? option.label : 'Mới nhất';
  },

  // View mode methods
  setViewMode(mode) {
    this.viewMode = mode;
    this.currentPage = 1;
    this.calculatePagination();
  },

  isGridView() {
    return this.viewMode === 'grid';
  },

  isListView() {
    return this.viewMode === 'list';
  },

  // Pagination methods
  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
  },

  getCurrentPageItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredItems.slice(startIndex, endIndex);
  },

  goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  },

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  },

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  },

  clearFilters() {
    window.dispatchEvent(new CustomEvent('clear-filters', {
      detail: {}
    }));
    this.currentFilters = {};
    this.currentPage = 1;
    this.filterItems();
  }
}));
```

### HTML Template:
```html
<div x-data="listComponent">
  <!-- Search Bar -->
  <div class="search-bar">
    <input x-model="searchQuery" @input="filterItems()" placeholder="Tìm kiếm..." />
  </div>

  <!-- Controls -->
  <div class="controls">
    <!-- Sort Dropdown -->
    <div class="sort-dropdown">
      <button @click="toggleSortDropdown()" class="sort-trigger">
        <span x-text="getCurrentSortLabel()"></span>
        <i class="chevron-down"></i>
      </button>
      <div x-show="isSortDropdownOpen" class="dropdown-menu">
        <template x-for="option in sortOptions" :key="option.value">
          <button @click="updateSort(option.value)" 
                  :class="{ 'active': sortBy === option.value }">
            <span x-text="option.label"></span>
          </button>
        </template>
      </div>
    </div>

    <!-- View Mode Toggle -->
    <div class="view-mode">
      <button @click="setViewMode('grid')" 
              :class="{ 'active': isGridView() }">
        <i class="grid-icon"></i>
      </button>
      <button @click="setViewMode('list')" 
              :class="{ 'active': isListView() }">
        <i class="list-icon"></i>
      </button>
    </div>

    <!-- Clear Filters -->
    <button @click="clearFilters()" class="clear-btn">Xóa bộ lọc</button>
  </div>

  <!-- Items List -->
  <div class="items-container" :class="viewMode">
    <template x-for="item in getCurrentPageItems()" :key="item.id">
      <div class="item-card">
        <!-- Item content -->
        <h3 x-text="item.title"></h3>
        <p x-text="item.description"></p>
      </div>
    </template>
  </div>

  <!-- Pagination -->
  <div class="pagination">
    <button @click="prevPage()" :disabled="currentPage === 1">Trước</button>
    
    <template x-for="page in totalPages" :key="page">
      <button @click="goToPage(page)" 
              :class="{ 'active': currentPage === page }"
              x-text="page"></button>
    </template>
    
    <button @click="nextPage()" :disabled="currentPage === totalPages">Sau</button>
  </div>

  <!-- Dot Pagination -->
  <div class="dot-pagination">
    <template x-for="page in totalPages" :key="page">
      <button @click="goToPage(page)" 
              :class="{ 'active': currentPage === page }"
              class="dot"></button>
    </template>
  </div>
</div>
```

## 5. Carousel Component

### Chức năng: Slide Navigation, Auto Play, Responsive
```javascript
Alpine.data('carouselComponent', () => ({
  currentSlide: 0,
  totalSlides: 0,
  itemsPerView: 4,
  isAutoPlay: false,
  autoPlayInterval: null,

  init() {
    this.calculateTotalSlides();
    this.setupResponsive();

    // Auto play for specific carousels
    if (this.$el.closest('[data-carousel="auto-play"]')) {
      this.startAutoPlay();
    }
  },

  calculateTotalSlides() {
    const container = this.$el.querySelector('.carousel-container');
    if (container) {
      const slides = container.querySelectorAll('.w-full.flex-shrink-0');
      this.totalSlides = slides.length;
    }
  },

  setupResponsive() {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        this.itemsPerView = 1;
      } else if (window.innerWidth < 768) {
        this.itemsPerView = 2;
      } else if (window.innerWidth < 1024) {
        this.itemsPerView = 3;
      } else {
        this.itemsPerView = 4;
      }
      this.calculateTotalSlides();
      this.updateCarousel();
    };

    window.addEventListener('resize', updateItemsPerView);
    updateItemsPerView();
  },

  nextSlide() {
    if (this.totalSlides > 0) {
      if (this.currentSlide < this.totalSlides - 1) {
        this.currentSlide++;
      } else {
        this.currentSlide = 0; // Loop back to first
      }
      this.updateCarousel();
    }
  },

  prevSlide() {
    if (this.totalSlides > 0) {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      } else {
        this.currentSlide = this.totalSlides - 1; // Loop to last
      }
      this.updateCarousel();
    }
  },

  goToSlide(slideIndex) {
    if (slideIndex >= 0 && slideIndex < this.totalSlides) {
      this.currentSlide = slideIndex;
      this.updateCarousel();
    }
  },

  updateCarousel() {
    const container = this.$el.querySelector('.carousel-container');
    if (container && this.totalSlides > 0) {
      const translateX = -this.currentSlide * 100;
      container.style.transform = `translateX(${translateX}%)`;
    }
  },

  startAutoPlay() {
    this.isAutoPlay = true;
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds

    // Pause on hover
    const carousel = this.$el;
    carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    carousel.addEventListener('mouseleave', () => this.startAutoPlay());
  },

  stopAutoPlay() {
    this.isAutoPlay = false;
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  },

  toggleAutoPlay() {
    if (this.isAutoPlay) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }
}));
```

### HTML Template:
```html
<div x-data="carouselComponent" class="carousel" data-carousel="auto-play">
  <!-- Navigation Buttons -->
  <button @click="prevSlide()" class="carousel-prev">
    <i class="chevron-left"></i>
  </button>
  
  <button @click="nextSlide()" class="carousel-next">
    <i class="chevron-right"></i>
  </button>

  <!-- Carousel Container -->
  <div class="carousel-container">
    <template x-for="(slide, index) in totalSlides" :key="index">
      <div class="carousel-slide w-full flex-shrink-0">
        <!-- Slide content -->
      </div>
    </template>
  </div>

  <!-- Dot Navigation -->
  <div class="carousel-dots">
    <template x-for="(slide, index) in totalSlides" :key="index">
      <button @click="goToSlide(index)" 
              :class="{ 'active': currentSlide === index }"
              class="dot"></button>
    </template>
  </div>

  <!-- Auto Play Toggle -->
  <button @click="toggleAutoPlay()" class="autoplay-toggle">
    <span x-show="!isAutoPlay">Bật tự động</span>
    <span x-show="isAutoPlay">Tắt tự động</span>
  </button>
</div>
```

## 6. Card Component

### Chức năng: Click Events, Favorite, Share
```javascript
Alpine.data('cardComponent', () => ({
  init() {
    // Initialize any card-specific functionality
  },

  handleItemClick(itemId) {
    // Navigate to item detail page
    window.location.href = `/item/detail/${itemId}`;
  },

  handleFavoriteClick(itemId, event) {
    event.stopPropagation();
    // Toggle favorite status
    console.log('Toggle favorite for item:', itemId);
  },

  handleShareClick(itemId, event) {
    event.stopPropagation();
    // Open share modal or copy link
    console.log('Share item:', itemId);
  }
}));
```

### HTML Template:
```html
<div x-data="cardComponent" class="item-card">
  <div @click="handleItemClick(item.id)" class="card-content">
    <h3 x-text="item.title"></h3>
    <p x-text="item.description"></p>
  </div>
  
  <div class="card-actions">
    <button @click="handleFavoriteClick(item.id, $event)" class="favorite-btn">
      <i class="heart-icon"></i>
    </button>
    <button @click="handleShareClick(item.id, $event)" class="share-btn">
      <i class="share-icon"></i>
    </button>
  </div>
</div>
```

## 7. Toggle Component

### Chức năng: Toggle Switch, Accordion
```javascript
Alpine.data('toggleComponent', () => ({
  isOpen: false,
  isActive: false,

  toggle() {
    this.isOpen = !this.isOpen;
  },

  toggleActive() {
    this.isActive = !this.isActive;
  }
}));
```

### HTML Template:
```html
<!-- Toggle Switch -->
<div x-data="toggleComponent">
  <button @click="toggleActive()" 
          :class="{ 'active': isActive }" 
          class="toggle-switch">
    <span class="toggle-slider"></span>
  </button>
</div>

<!-- Accordion -->
<div x-data="toggleComponent">
  <button @click="toggle()" class="accordion-header">
    <span>Tiêu đề</span>
    <i :class="{ 'rotated': isOpen }" class="chevron-down"></i>
  </button>
  <div x-show="isOpen" class="accordion-content">
    <p>Nội dung accordion</p>
  </div>
</div>
```

## 8. Modal Component

### Chức năng: Modal, Popup
```javascript
Alpine.data('modalComponent', () => ({
  isOpen: false,

  open() {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.isOpen = false;
    document.body.style.overflow = '';
  },

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}));
```

### HTML Template:
```html
<div x-data="modalComponent">
  <!-- Trigger Button -->
  <button @click="open()" class="modal-trigger">Mở Modal</button>

  <!-- Modal -->
  <div x-show="isOpen" class="modal-overlay" @click="close()">
    <div class="modal-content" @click.stop>
      <button @click="close()" class="modal-close">×</button>
      <h2>Tiêu đề Modal</h2>
      <p>Nội dung modal</p>
    </div>
  </div>
</div>
```

## 9. Form Component

### Chức năng: Form Validation, Submit
```javascript
Alpine.data('formComponent', () => ({
  formData: {
    name: '',
    email: '',
    message: ''
  },
  errors: {},
  isSubmitting: false,

  validateForm() {
    this.errors = {};
    
    if (!this.formData.name) {
      this.errors.name = 'Tên là bắt buộc';
    }
    
    if (!this.formData.email) {
      this.errors.email = 'Email là bắt buộc';
    } else if (!this.isValidEmail(this.formData.email)) {
      this.errors.email = 'Email không hợp lệ';
    }

    return Object.keys(this.errors).length === 0;
  },

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  async submitForm() {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    
    try {
      // Submit form data
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.formData)
      });

      if (response.ok) {
        // Success
        console.log('Form submitted successfully');
        this.resetForm();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      this.isSubmitting = false;
    }
  },

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      message: ''
    };
    this.errors = {};
  }
}));
```

### HTML Template:
```html
<div x-data="formComponent">
  <form @submit.prevent="submitForm()">
    <div class="form-group">
      <label>Tên</label>
      <input x-model="formData.name" type="text" />
      <span x-show="errors.name" x-text="errors.name" class="error"></span>
    </div>

    <div class="form-group">
      <label>Email</label>
      <input x-model="formData.email" type="email" />
      <span x-show="errors.email" x-text="errors.email" class="error"></span>
    </div>

    <div class="form-group">
      <label>Tin nhắn</label>
      <textarea x-model="formData.message"></textarea>
    </div>

    <button type="submit" :disabled="isSubmitting">
      <span x-show="!isSubmitting">Gửi</span>
      <span x-show="isSubmitting">Đang gửi...</span>
    </button>
  </form>
</div>
```

## 10. Utility Functions

### Global Utilities
```javascript
window.AppUtils = {
  // Format functions
  formatPrice: (price) => {
    if (typeof price === 'number') {
      if (price >= 1000000000) {
        return (price / 1000000000).toFixed(1) + ' tỷ';
      } else if (price >= 1000000) {
        return (price / 1000000).toFixed(0) + ' triệu';
      }
      return price.toLocaleString('vi-VN') + ' VNĐ';
    }
    return price;
  },

  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  },

  // Lazy load images
  lazyLoadImages: () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  },

  // Smooth animations
  animateOnScroll: () => {
    const elements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  }
};
```

## Cách Sử Dụng

1. **Copy các component cần thiết** từ file này vào file JS của trang mới
2. **Thay đổi tên component** và các thuộc tính phù hợp với trang mới
3. **Cập nhật HTML template** để sử dụng các component đã copy
4. **Thêm data array** tương ứng