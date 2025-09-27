/**
 * Reusable Components for Fetinhthanh Project
 * Sử dụng Alpine.js và data fake từ thư mục /data
 */

// ===========================================
// IMPORT DATA FROM /DATA DIRECTORY
// ===========================================
import {
  newsData,
  jobsData,
  realEstateData,
  companiesData,
  servicesData,
  emergencyContactsData,
  jobCategoriesData
} from '../data/index.js';

// ===========================================
// ALPINE.JS COMPONENTS
// ===========================================

document.addEventListener('alpine:init', () => {

  // ===========================================
  // CARD COMPONENT - Tái sử dụng cho tất cả loại card
  // ===========================================
  Alpine.data('cardComponent', () => ({
    // Generic card component có thể dùng cho news, jobs, real estate, etc.
    init() {
      console.log('Card component initialized');
    },

    // Format date
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    // Format number with commas
    formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Format price
    formatPrice(price) {
      if (typeof price === 'string') return price;
      if (price >= 1000000000) {
        return (price / 1000000000).toFixed(1) + ' tỷ VNĐ';
      } else if (price >= 1000000) {
        return (price / 1000000).toFixed(0) + ' triệu VNĐ';
      }
      return this.formatNumber(price) + ' VNĐ';
    },

    // Get work type text
    getWorkTypeText(workAt) {
      switch (workAt) {
        case 1: return 'Tại văn phòng';
        case 0: return 'Remote';
        case -1: return 'Hybrid';
        default: return 'Không xác định';
      }
    },

    // Get work type color
    getWorkTypeColor(workAt) {
      switch (workAt) {
        case 1: return 'bg-blue-100 text-blue-800';
        case 0: return 'bg-green-100 text-green-800';
        case -1: return 'bg-purple-100 text-purple-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
  }));

  // ===========================================
  // PAGINATION COMPONENT
  // ===========================================
  Alpine.data('paginationComponent', () => ({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 6,
    totalItems: 0,

    init() {
      console.log('Pagination component initialized');
    },

    setTotalItems(total) {
      this.totalItems = total;
      this.totalPages = Math.ceil(total / this.itemsPerPage);
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.$dispatch('page-changed', { page: page });
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 1);
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
      }
    },

    getPageNumbers() {
      const pages = [];
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, this.currentPage + 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  }));

  // ===========================================
  // FILTER COMPONENT
  // ===========================================
  Alpine.data('filterComponent', () => ({
    filters: {
      search: '',
      category: 'all',
      sort: 'newest',
      priceMin: 0,
      priceMax: 1000000000,
      areaMin: 0,
      areaMax: 1000
    },
    isOpen: false,

    init() {
      console.log('Filter component initialized');
    },

    toggleFilter() {
      this.isOpen = !this.isOpen;
    },

    applyFilters() {
      this.$dispatch('filters-applied', { filters: this.filters });
      this.isOpen = false;
    },

    clearFilters() {
      this.filters = {
        search: '',
        category: 'all',
        sort: 'newest',
        priceMin: 0,
        priceMax: 1000000000,
        areaMin: 0,
        areaMax: 1000
      };
      this.applyFilters();
    },

    // Filter data based on current filters
    filterData(data, type = 'news') {
      let filtered = [...data];

      // Search filter
      if (this.filters.search) {
        const searchTerm = this.filters.search.toLowerCase();
        filtered = filtered.filter(item => {
          if (type === 'news') {
            return item.title.toLowerCase().includes(searchTerm) ||
              item.excerpt.toLowerCase().includes(searchTerm) ||
              item.category.toLowerCase().includes(searchTerm);
          } else if (type === 'jobs') {
            return item.title.toLowerCase().includes(searchTerm) ||
              item.company.toLowerCase().includes(searchTerm) ||
              item.location.toLowerCase().includes(searchTerm) ||
              item.skills.some(skill => skill.toLowerCase().includes(searchTerm));
          } else if (type === 'real-estate') {
            return item.title.toLowerCase().includes(searchTerm) ||
              item.location.toLowerCase().includes(searchTerm) ||
              item.type.toLowerCase().includes(searchTerm);
          }
          return true;
        });
      }

      // Category filter
      if (this.filters.category !== 'all') {
        filtered = filtered.filter(item => {
          if (type === 'news') {
            return item.category === this.filters.category;
          } else if (type === 'jobs') {
            return item.level === this.filters.category;
          } else if (type === 'real-estate') {
            return item.type === this.filters.category;
          }
          return true;
        });
      }

      // Sort
      if (this.filters.sort === 'newest') {
        filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      } else if (this.filters.sort === 'oldest') {
        filtered.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
      } else if (this.filters.sort === 'views') {
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
      } else if (this.filters.sort === 'price-low') {
        filtered.sort((a, b) => (a.salaryMin || a.priceMin || 0) - (b.salaryMin || b.priceMin || 0));
      } else if (this.filters.sort === 'price-high') {
        filtered.sort((a, b) => (b.salaryMax || b.priceMax || 0) - (a.salaryMax || a.priceMax || 0));
      }

      return filtered;
    }
  }));

  // ===========================================
  // SLIDER COMPONENT
  // ===========================================
  Alpine.data('sliderComponent', () => ({
    currentSlide: 0,
    totalSlides: 0,
    autoPlay: true,
    autoPlayInterval: 5000,
    intervalId: null,

    init() {
      console.log('Slider component initialized');
      this.totalSlides = this.$el.querySelectorAll('.slide').length;

      if (this.autoPlay) {
        this.startAutoPlay();
      }
    },

    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    },

    prevSlide() {
      this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    },

    goToSlide(index) {
      this.currentSlide = index;
    },

    startAutoPlay() {
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, this.autoPlayInterval);
    },

    stopAutoPlay() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },

    toggleAutoPlay() {
      if (this.autoPlay) {
        this.stopAutoPlay();
      } else {
        this.startAutoPlay();
      }
      this.autoPlay = !this.autoPlay;
    }
  }));

  // ===========================================
  // SEARCH COMPONENT
  // ===========================================
  Alpine.data('searchComponent', () => ({
    searchQuery: '',
    isSearching: false,
    searchResults: [],
    searchType: 'all', // all, news, jobs, real-estate

    init() {
      console.log('Search component initialized');
    },

    async performSearch() {
      if (!this.searchQuery.trim()) {
        this.searchResults = [];
        return;
      }

      this.isSearching = true;

      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let results = [];

        if (this.searchType === 'all' || this.searchType === 'news') {
          const newsResults = newsData.filter(item =>
            item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          results = results.concat(newsResults.map(item => ({ ...item, type: 'news' })));
        }

        if (this.searchType === 'all' || this.searchType === 'jobs') {
          const jobResults = jobsData.filter(item =>
            item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.company.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.skills.some(skill => skill.toLowerCase().includes(this.searchQuery.toLowerCase()))
          );
          results = results.concat(jobResults.map(item => ({ ...item, type: 'jobs' })));
        }

        if (this.searchType === 'all' || this.searchType === 'real-estate') {
          const realEstateResults = realEstateData.filter(item =>
            item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.type.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          results = results.concat(realEstateResults.map(item => ({ ...item, type: 'real-estate' })));
        }

        this.searchResults = results.slice(0, 10); // Limit to 10 results

      } catch (error) {
        console.error('Search error:', error);
        sendNotice('Lỗi tìm kiếm, vui lòng thử lại', 'error');
      } finally {
        this.isSearching = false;
      }
    },

    clearSearch() {
      this.searchQuery = '';
      this.searchResults = [];
    },

    selectSearchType(type) {
      this.searchType = type;
      this.performSearch();
    }
  }));

  // ===========================================
  // LOADING COMPONENT
  // ===========================================
  Alpine.data('loadingComponent', () => ({
    isLoading: false,
    loadingText: 'Đang tải...',

    init() {
      console.log('Loading component initialized');
    },

    show(text = 'Đang tải...') {
      this.loadingText = text;
      this.isLoading = true;
    },

    hide() {
      this.isLoading = false;
    }
  }));

  // ===========================================
  // MODAL COMPONENT
  // ===========================================
  Alpine.data('modalComponent', () => ({
    isOpen: false,
    title: '',
    content: '',

    init() {
      console.log('Modal component initialized');
    },

    open(title = '', content = '') {
      this.title = title;
      this.content = content;
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.isOpen = false;
      document.body.style.overflow = '';
    },

    toggle() {
      this.isOpen ? this.close() : this.open();
    }
  }));

  // ===========================================
  // TABS COMPONENT
  // ===========================================
  Alpine.data('tabsComponent', () => ({
    activeTab: 0,
    tabs: [],

    init() {
      console.log('Tabs component initialized');
    },

    setActiveTab(index) {
      this.activeTab = index;
    },

    isActiveTab(index) {
      return this.activeTab === index;
    }
  }));

  // ===========================================
  // ACCORDION COMPONENT
  // ===========================================
  Alpine.data('accordionComponent', () => ({
    openItems: [],

    init() {
      console.log('Accordion component initialized');
    },

    toggleItem(index) {
      if (this.openItems.includes(index)) {
        this.openItems = this.openItems.filter(item => item !== index);
      } else {
        this.openItems.push(index);
      }
    },

    isOpen(index) {
      return this.openItems.includes(index);
    },

    openAll() {
      this.openItems = Array.from({ length: this.$el.children.length }, (_, i) => i);
    },

    closeAll() {
      this.openItems = [];
    }
  }));
});

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

// Global utility functions
window.FetinhthanhUtils = {
  // Format date
  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  // Format number with commas
  formatNumber: (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  // Format price
  formatPrice: (price) => {
    if (typeof price === 'string') return price;
    if (price >= 1000000000) {
      return (price / 1000000000).toFixed(1) + ' tỷ VNĐ';
    } else if (price >= 1000000) {
      return (price / 1000000).toFixed(0) + ' triệu VNĐ';
    }
    return FetinhthanhUtils.formatNumber(price) + ' VNĐ';
  },

  // Get work type text
  getWorkTypeText: (workAt) => {
    switch (workAt) {
      case 1: return 'Tại văn phòng';
      case 0: return 'Remote';
      case -1: return 'Hybrid';
      default: return 'Không xác định';
    }
  },

  // Get work type color
  getWorkTypeColor: (workAt) => {
    switch (workAt) {
      case 1: return 'bg-blue-100 text-blue-800';
      case 0: return 'bg-green-100 text-green-800';
      case -1: return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  },

  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle: (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Export data for use in other files
window.FetinhthanhData = {
  newsData,
  jobsData,
  realEstateData,
  companiesData,
  servicesData,
  emergencyContactsData,
  jobCategoriesData
};

console.log('Fetinhthanh Components loaded successfully!');
