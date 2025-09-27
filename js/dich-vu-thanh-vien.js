// Alpine.js Store for sharing filter state
document.addEventListener('alpine:init', () => {
  Alpine.store('dichVuFilters', {
    // Search functionality
    searchQuery: '',

    // Dropdown states
    dropdowns: {
      category: false,
      price: false,
      location: false,
      time: false
    },

    // Selected values
    selectedValues: {
      category: 'all',
      price: 'all',
      location: 'all',
      time: 'all'
    },

    // Checkbox states
    checkboxes: {
      featured: false,
      verified: false,
      online: false
    },

    // Statistics for counter animation
    stats: {
      services: 0,
      providers: 0,
      customers: 0,
      support: 0
    },

    // Final statistics values
    finalStats: {
      services: 12,
      providers: 500,
      customers: 2000,
      support: 24
    },

    // Counter animation duration
    animationDuration: 2000,

    // Filter options
    filterOptions: {
      category: [
        { value: 'all', label: 'Tất cả danh mục' },
        { value: 'it', label: 'Công nghệ thông tin' },
        { value: 'marketing', label: 'Marketing & Quảng cáo' },
        { value: 'design', label: 'Thiết kế & Sáng tạo' },
        { value: 'content', label: 'Nội dung & Viết lách' },
        { value: 'business', label: 'Kinh doanh & Tư vấn' },
        { value: 'education', label: 'Giáo dục & Đào tạo' },
        { value: 'health', label: 'Y tế & Sức khỏe' },
        { value: 'legal', label: 'Pháp lý & Luật' },
        { value: 'finance', label: 'Tài chính & Kế toán' },
        { value: 'other', label: 'Khác' }
      ],
      price: [
        { value: 'all', label: 'Tất cả mức giá' },
        { value: 'under-1m', label: 'Dưới 1 triệu' },
        { value: '1m-5m', label: '1 - 5 triệu' },
        { value: '5m-10m', label: '5 - 10 triệu' },
        { value: '10m-20m', label: '10 - 20 triệu' },
        { value: '20m-50m', label: '20 - 50 triệu' },
        { value: 'over-50m', label: 'Trên 50 triệu' },
        { value: 'negotiate', label: 'Thỏa thuận' }
      ],
      location: [
        { value: 'all', label: 'Tất cả khu vực' },
        { value: 'thu-dau-mot', label: 'Thủ Dầu Một' },
        { value: 'di-an', label: 'Dĩ An' },
        { value: 'thuan-an', label: 'Thuận An' },
        { value: 'ben-cat', label: 'Bến Cát' },
        { value: 'tan-uyen', label: 'Tân Uyên' },
        { value: 'bac-tan-uyen', label: 'Bắc Tân Uyên' },
        { value: 'bau-bang', label: 'Bàu Bàng' },
        { value: 'phu-giao', label: 'Phú Giáo' },
        { value: 'online', label: 'Dịch vụ online' }
      ],
      time: [
        { value: 'all', label: 'Tất cả thời gian' },
        { value: '1-day', label: 'Trong 1 ngày' },
        { value: '3-days', label: 'Trong 3 ngày' },
        { value: '1-week', label: 'Trong 1 tuần' },
        { value: '2-weeks', label: 'Trong 2 tuần' },
        { value: '1-month', label: 'Trong 1 tháng' },
        { value: 'flexible', label: 'Linh hoạt' }
      ]
    },

    // Toggle dropdown
    toggleDropdown(dropdownName) {
      // Close all other dropdowns
      Object.keys(this.dropdowns).forEach(key => {
        if (key !== dropdownName) {
          this.dropdowns[key] = false;
        }
      });

      // Toggle current dropdown
      this.dropdowns[dropdownName] = !this.dropdowns[dropdownName];
    },

    // Select filter option
    selectFilter(filterName, value) {
      this.selectedValues[filterName] = value;
      this.dropdowns[filterName] = false;
    },

    // Toggle checkbox filters
    toggleCheckboxFilter(filterName) {
      this.checkboxes[filterName] = !this.checkboxes[filterName];
    },

    // Clear all filters
    clearAllFilters() {
      this.selectedValues = {
        category: 'all',
        price: 'all',
        location: 'all',
        time: 'all'
      };

      this.checkboxes = {
        featured: false,
        verified: false,
        online: false
      };

      this.searchQuery = '';

      // Close all dropdowns
      Object.keys(this.dropdowns).forEach(key => {
        this.dropdowns[key] = false;
      });
    },

    // Get selected option label
    getSelectedLabel(filterName) {
      const options = this.filterOptions[filterName];
      const selected = options.find(option => option.value === this.selectedValues[filterName]);
      return selected ? selected.label : 'Tất cả';
    },

    // Counter animation
    startCounterAnimation() {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / this.animationDuration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        this.stats.services = Math.floor(this.finalStats.services * easeOut);
        this.stats.providers = Math.floor(this.finalStats.providers * easeOut);
        this.stats.customers = Math.floor(this.finalStats.customers * easeOut);
        this.stats.support = Math.floor(this.finalStats.support * easeOut);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Ensure final values are set
          this.stats.services = this.finalStats.services;
          this.stats.providers = this.finalStats.providers;
          this.stats.customers = this.finalStats.customers;
          this.stats.support = this.finalStats.support;
        }
      };

      // Start animation after a short delay
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 300);
    },

    // Handle search
    handleSearch() {
      // This will trigger reactive updates in components using the store
    },

    // Handle search input keypress
    handleSearchKeypress(event) {
      if (event.key === 'Enter') {
        this.handleSearch();
      }
    },

    // Computed property for total filtered services
    get totalFilteredServices() {
      // This will be calculated by the services list component
      return 0;
    }
  });
});

// Hero Dịch Vụ Component - Alpine.js
function heroDichVuComponent() {
  return {
    // Search functionality
    searchQuery: '',

    // Dropdown states
    dropdowns: {
      category: false,
      price: false,
      location: false,
      time: false
    },

    // Selected values
    selectedValues: {
      category: 'all',
      price: 'all',
      location: 'all',
      time: 'all'
    },

    // Checkbox states
    checkboxes: {
      featured: false,
      verified: false,
      online: false
    },

    // Statistics for counter animation
    stats: {
      services: 0,
      providers: 0,
      customers: 0,
      support: 0
    },

    // Final statistics values
    finalStats: {
      services: 12,
      providers: 500,
      customers: 2000,
      support: 24
    },

    // Counter animation duration
    animationDuration: 2000,

    // Filter options
    filterOptions: {
      category: [
        { value: 'all', label: 'Tất cả danh mục' },
        { value: 'it', label: 'Công nghệ thông tin' },
        { value: 'marketing', label: 'Marketing & Quảng cáo' },
        { value: 'design', label: 'Thiết kế & Sáng tạo' },
        { value: 'content', label: 'Nội dung & Viết lách' },
        { value: 'business', label: 'Kinh doanh & Tư vấn' },
        { value: 'education', label: 'Giáo dục & Đào tạo' },
        { value: 'health', label: 'Y tế & Sức khỏe' },
        { value: 'legal', label: 'Pháp lý & Luật' },
        { value: 'finance', label: 'Tài chính & Kế toán' },
        { value: 'other', label: 'Khác' }
      ],
      price: [
        { value: 'all', label: 'Tất cả mức giá' },
        { value: 'under-1m', label: 'Dưới 1 triệu' },
        { value: '1m-5m', label: '1 - 5 triệu' },
        { value: '5m-10m', label: '5 - 10 triệu' },
        { value: '10m-20m', label: '10 - 20 triệu' },
        { value: '20m-50m', label: '20 - 50 triệu' },
        { value: 'over-50m', label: 'Trên 50 triệu' },
        { value: 'negotiate', label: 'Thỏa thuận' }
      ],
      location: [
        { value: 'all', label: 'Tất cả khu vực' },
        { value: 'thu-dau-mot', label: 'Thủ Dầu Một' },
        { value: 'di-an', label: 'Dĩ An' },
        { value: 'thuan-an', label: 'Thuận An' },
        { value: 'ben-cat', label: 'Bến Cát' },
        { value: 'tan-uyen', label: 'Tân Uyên' },
        { value: 'bac-tan-uyen', label: 'Bắc Tân Uyên' },
        { value: 'bau-bang', label: 'Bàu Bàng' },
        { value: 'phu-giao', label: 'Phú Giáo' },
        { value: 'online', label: 'Dịch vụ online' }
      ],
      time: [
        { value: 'all', label: 'Tất cả thời gian' },
        { value: '1-day', label: 'Trong 1 ngày' },
        { value: '3-days', label: 'Trong 3 ngày' },
        { value: '1-week', label: 'Trong 1 tuần' },
        { value: '2-weeks', label: 'Trong 2 tuần' },
        { value: '1-month', label: 'Trong 1 tháng' },
        { value: 'flexible', label: 'Linh hoạt' }
      ]
    },

    // Initialize component
    init() {
      this.startCounterAnimation();
      this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
      // Close dropdowns when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-dropdown')) {
          Object.keys(this.dropdowns).forEach(key => {
            this.dropdowns[key] = false;
          });
        }
      });
    },

    // Toggle dropdown
    toggleDropdown(dropdownName) {
      // Close all other dropdowns
      Object.keys(this.dropdowns).forEach(key => {
        if (key !== dropdownName) {
          this.dropdowns[key] = false;
        }
      });

      // Toggle current dropdown
      this.dropdowns[dropdownName] = !this.dropdowns[dropdownName];
    },

    // Select filter option
    selectFilter(filterName, value) {
      this.selectedValues[filterName] = value;
      this.dropdowns[filterName] = false;
    },

    // Toggle checkbox filters
    toggleCheckboxFilter(filterName) {
      this.checkboxes[filterName] = !this.checkboxes[filterName];
    },

    // Clear all filters
    clearAllFilters() {
      this.selectedValues = {
        category: 'all',
        price: 'all',
        location: 'all',
        time: 'all'
      };

      this.checkboxes = {
        featured: false,
        verified: false,
        online: false
      };

      // Close all dropdowns
      Object.keys(this.dropdowns).forEach(key => {
        this.dropdowns[key] = false;
      });
    },

    // Get selected option label
    getSelectedLabel(filterName) {
      const options = this.filterOptions[filterName];
      const selected = options.find(option => option.value === this.selectedValues[filterName]);
      return selected ? selected.label : 'Tất cả';
    },

    // Counter animation
    startCounterAnimation() {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / this.animationDuration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        this.stats.services = Math.floor(this.finalStats.services * easeOut);
        this.stats.providers = Math.floor(this.finalStats.providers * easeOut);
        this.stats.customers = Math.floor(this.finalStats.customers * easeOut);
        this.stats.support = Math.floor(this.finalStats.support * easeOut);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Ensure final values are set
          this.stats.services = this.finalStats.services;
          this.stats.providers = this.finalStats.providers;
          this.stats.customers = this.finalStats.customers;
          this.stats.support = this.finalStats.support;
        }
      };

      // Start animation after a short delay
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 300);
    },

    // Handle search
    handleSearch() {
      if (this.searchQuery.trim()) {
        const params = new URLSearchParams();
        params.set('keyword', this.searchQuery.trim());

        // Add active filters to search params
        Object.keys(this.selectedValues).forEach(key => {
          if (this.selectedValues[key] && this.selectedValues[key] !== 'all') {
            params.set(key, this.selectedValues[key]);
          }
        });

        // Add checkbox filters
        Object.keys(this.checkboxes).forEach(key => {
          if (this.checkboxes[key]) {
            params.set(key, 'true');
          }
        });

        window.location.href = `/dich-vu/search?${params.toString()}`;
      }
    },

    // Handle search input keypress
    handleSearchKeypress(event) {
      if (event.key === 'Enter') {
        this.handleSearch();
      }
    }
  }
}

// Danh Sách Dịch Vụ Component - Alpine.js
function danhSachDichVuComponent() {
  return {
    // Sort functionality
    sortBy: 'newest',
    sortDropdownOpen: false,

    // Pagination
    currentPage: 1,
    itemsPerPage: 8,
    totalItems: 12,

    // Services data
    services: [
      {
        id: 1,
        title: 'Thiết kế website chuyên nghiệp',
        provider: 'Nguyễn Văn A',
        location: 'TP. Thủ Dầu Một',
        price: 5000000,
        rating: 4.5,
        reviewCount: 12,
        views: 245,
        category: 'Thiết kế web',
        featured: true,
        verified: true,
        tags: ['Thiết kế web', 'Nổi bật'],
        date: '2024-12-21'
      },
      {
        id: 2,
        title: 'Dịch vụ massage thư giãn',
        provider: 'Spa ABC',
        location: 'TP. Dĩ An',
        price: 300000,
        rating: 4.8,
        reviewCount: 25,
        views: 189,
        category: 'Massage',
        featured: false,
        verified: true,
        tags: ['Massage', 'Tại nhà', 'Thư giãn'],
        date: '2024-12-20'
      },
      {
        id: 3,
        title: 'Tư vấn pháp lý doanh nghiệp',
        provider: 'Luật sư Minh',
        location: 'TP. Thuận An',
        price: 2000000,
        rating: 4.2,
        reviewCount: 8,
        views: 156,
        category: 'Pháp lý',
        featured: true,
        verified: true,
        tags: ['Pháp lý', 'Tư vấn'],
        date: '2024-12-19'
      },
      {
        id: 4,
        title: 'Dịch vụ vệ sinh văn phòng',
        provider: 'Clean Pro',
        location: 'TP. Bến Cát',
        price: 800000,
        rating: 4.0,
        reviewCount: 15,
        views: 312,
        category: 'Vệ sinh',
        featured: false,
        verified: false,
        tags: ['Vệ sinh', 'Văn phòng'],
        date: '2024-12-18'
      },
      {
        id: 5,
        title: 'Dịch vụ marketing digital',
        provider: 'Marketing Plus',
        location: 'TP. Thủ Dầu Một',
        price: 10000000,
        rating: 4.7,
        reviewCount: 18,
        views: 198,
        category: 'Marketing',
        featured: true,
        verified: true,
        tags: ['Marketing', 'Digital'],
        date: '2024-12-17'
      },
      {
        id: 6,
        title: 'Dịch vụ kế toán thuế',
        provider: 'Kế toán An',
        location: 'TP. Dĩ An',
        price: 1500000,
        rating: 4.3,
        reviewCount: 22,
        views: 167,
        category: 'Kế toán',
        featured: false,
        verified: true,
        tags: ['Kế toán', 'Thuế'],
        date: '2024-12-16'
      },
      {
        id: 7,
        title: 'Dịch vụ sửa chữa điện tử',
        provider: 'Tech Fix',
        location: 'TP. Thuận An',
        price: 500000,
        rating: 4.1,
        reviewCount: 9,
        views: 134,
        category: 'Sửa chữa',
        featured: false,
        verified: false,
        tags: ['Sửa chữa', 'Điện tử'],
        date: '2024-12-15'
      },
      {
        id: 8,
        title: 'Dịch vụ thiết kế logo',
        provider: 'Design Studio',
        location: 'TP. Thủ Dầu Một',
        price: 2000000,
        rating: 4.6,
        reviewCount: 14,
        views: 203,
        category: 'Thiết kế',
        featured: true,
        verified: true,
        tags: ['Thiết kế', 'Logo'],
        date: '2024-12-14'
      },
      {
        id: 9,
        title: 'Dịch vụ vận chuyển hàng hóa',
        provider: 'Logistics BD',
        location: 'TP. Bến Cát',
        price: 1200000,
        rating: 4.0,
        reviewCount: 11,
        views: 178,
        category: 'Vận chuyển',
        featured: false,
        verified: true,
        tags: ['Vận chuyển', 'Logistics'],
        date: '2024-12-13'
      },
      {
        id: 10,
        title: 'Dịch vụ bảo trì máy tính',
        provider: 'IT Support',
        location: 'TP. Dĩ An',
        price: 800000,
        rating: 4.4,
        reviewCount: 16,
        views: 145,
        category: 'IT',
        featured: false,
        verified: true,
        tags: ['IT', 'Bảo trì'],
        date: '2024-12-12'
      },
      {
        id: 11,
        title: 'Dịch vụ tư vấn tài chính',
        provider: 'Finance Pro',
        location: 'TP. Thuận An',
        price: 3000000,
        rating: 4.5,
        reviewCount: 7,
        views: 123,
        category: 'Tài chính',
        featured: true,
        verified: true,
        tags: ['Tài chính', 'Tư vấn'],
        date: '2024-12-11'
      },
      {
        id: 12,
        title: 'Dịch vụ dọn dẹp nhà cửa',
        provider: 'Home Clean',
        location: 'TP. Thủ Dầu Một',
        price: 400000,
        rating: 4.2,
        reviewCount: 20,
        views: 234,
        category: 'Dọn dẹp',
        featured: false,
        verified: false,
        tags: ['Dọn dẹp', 'Nhà cửa'],
        date: '2024-12-10'
      }
    ],

    // Sort options
    sortOptions: [
      { value: 'newest', label: 'Mới nhất' },
      { value: 'price-low', label: 'Giá thấp đến cao' },
      { value: 'price-high', label: 'Giá cao đến thấp' },
      { value: 'rating-high', label: 'Đánh giá cao nhất' },
      { value: 'review-most', label: 'Nhiều đánh giá nhất' },
      { value: 'views-most', label: 'Xem nhiều nhất' }
    ],

    // Computed properties
    get totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },

    get paginatedServices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedServices.slice(start, end);
    },

    get sortedServices() {
      const sorted = [...this.services];

      switch (this.sortBy) {
        case 'newest':
          return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'price-low':
          return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
          return sorted.sort((a, b) => b.price - a.price);
        case 'rating-high':
          return sorted.sort((a, b) => b.rating - a.rating);
        case 'review-most':
          return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        case 'views-most':
          return sorted.sort((a, b) => b.views - a.views);
        default:
          return sorted;
      }
    },

    get paginationInfo() {
      const start = (this.currentPage - 1) * this.itemsPerPage + 1;
      const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
      return `Hiển thị ${start}-${end} trong tổng số ${this.totalItems} kết quả`;
    },

    get paginationPages() {
      const pages = [];
      const start = Math.max(1, this.currentPage - 1);
      const end = Math.min(this.totalPages, this.currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },

    // Initialize component
    init() {
      this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.sort-dropdown')) {
          this.sortDropdownOpen = false;
        }
      });
    },

    // Sort functionality
    toggleSortDropdown() {
      this.sortDropdownOpen = !this.sortDropdownOpen;
    },

    selectSortOption(value) {
      this.sortBy = value;
      this.sortDropdownOpen = false;
      this.currentPage = 1; // Reset to first page when sorting
    },

    getSortLabel() {
      const option = this.sortOptions.find(opt => opt.value === this.sortBy);
      return option ? option.label : 'Mới nhất';
    },

    // Pagination functionality
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

    isPrevDisabled() {
      return this.currentPage === 1;
    },

    isNextDisabled() {
      return this.currentPage === this.totalPages;
    },

    isPageActive(page) {
      return this.currentPage === page;
    },

    // Format price
    formatPrice(price) {
      if (price >= 1000000) {
        return `${(price / 1000000).toFixed(1)}M`;
      } else if (price >= 1000) {
        return `${(price / 1000).toFixed(0)}K`;
      }
      return price.toLocaleString();
    },

    // Format rating
    formatRating(rating) {
      return rating.toFixed(1);
    }
  }
}

// Hero Component using store
function heroDichVuComponentWithStore() {
  return {
    init() {
      this.$store.dichVuFilters.startCounterAnimation();
      this.setupEventListeners();
    },

    setupEventListeners() {
      // Close dropdowns when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-dropdown')) {
          Object.keys(this.$store.dichVuFilters.dropdowns).forEach(key => {
            this.$store.dichVuFilters.dropdowns[key] = false;
          });
        }
      });
    }
  };
}

// Services List Component using store
function danhSachDichVuComponentWithStore() {
  return {
    // View mode
    viewMode: 'grid',

    // Sort functionality
    sortBy: 'newest',
    sortDropdownOpen: false,

    // Pagination
    currentPage: 1,
    itemsPerPage: 8,

    // Services data
    services: [
      {
        id: 1,
        title: 'Thiết kế website chuyên nghiệp',
        provider: 'Nguyễn Văn A',
        location: 'TP. Thủ Dầu Một',
        price: 5000000,
        rating: 4.5,
        reviewCount: 12,
        views: 245,
        category: 'Thiết kế web',
        featured: true,
        verified: true,
        tags: ['Thiết kế web', 'Nổi bật'],
        date: '2024-12-21',
        categoryValue: 'design',
        priceRange: '5m-10m',
        locationValue: 'thu-dau-mot',
        timeValue: '1-week'
      },
      {
        id: 2,
        title: 'Dịch vụ massage thư giãn',
        provider: 'Spa ABC',
        location: 'TP. Dĩ An',
        price: 300000,
        rating: 4.8,
        reviewCount: 25,
        views: 189,
        category: 'Massage',
        featured: false,
        verified: true,
        tags: ['Massage', 'Tại nhà', 'Thư giãn'],
        date: '2024-12-20',
        categoryValue: 'health',
        priceRange: 'under-1m',
        locationValue: 'di-an',
        timeValue: '1-day'
      },
      {
        id: 3,
        title: 'Tư vấn pháp lý doanh nghiệp',
        provider: 'Luật sư Minh',
        location: 'TP. Thuận An',
        price: 2000000,
        rating: 4.2,
        reviewCount: 8,
        views: 156,
        category: 'Pháp lý',
        featured: true,
        verified: true,
        tags: ['Pháp lý', 'Tư vấn'],
        date: '2024-12-19',
        categoryValue: 'legal',
        priceRange: '1m-5m',
        locationValue: 'thuan-an',
        timeValue: '3-days'
      },
      {
        id: 4,
        title: 'Dịch vụ vệ sinh văn phòng',
        provider: 'Clean Pro',
        location: 'TP. Bến Cát',
        price: 800000,
        rating: 4.0,
        reviewCount: 15,
        views: 312,
        category: 'Vệ sinh',
        featured: false,
        verified: false,
        tags: ['Vệ sinh', 'Văn phòng'],
        date: '2024-12-18',
        categoryValue: 'other',
        priceRange: '1m-5m',
        locationValue: 'ben-cat',
        timeValue: '1-day'
      },
      {
        id: 5,
        title: 'Dịch vụ marketing digital',
        provider: 'Marketing Plus',
        location: 'TP. Thủ Dầu Một',
        price: 10000000,
        rating: 4.7,
        reviewCount: 18,
        views: 198,
        category: 'Marketing',
        featured: true,
        verified: true,
        tags: ['Marketing', 'Digital'],
        date: '2024-12-17',
        categoryValue: 'marketing',
        priceRange: '10m-20m',
        locationValue: 'thu-dau-mot',
        timeValue: '2-weeks'
      },
      {
        id: 6,
        title: 'Dịch vụ kế toán thuế',
        provider: 'Kế toán An',
        location: 'TP. Dĩ An',
        price: 1500000,
        rating: 4.3,
        reviewCount: 22,
        views: 167,
        category: 'Kế toán',
        featured: false,
        verified: true,
        tags: ['Kế toán', 'Thuế'],
        date: '2024-12-16',
        categoryValue: 'finance',
        priceRange: '1m-5m',
        locationValue: 'di-an',
        timeValue: '1-week'
      },
      {
        id: 7,
        title: 'Dịch vụ sửa chữa điện tử',
        provider: 'Tech Fix',
        location: 'TP. Thuận An',
        price: 500000,
        rating: 4.1,
        reviewCount: 9,
        views: 134,
        category: 'Sửa chữa',
        featured: false,
        verified: false,
        tags: ['Sửa chữa', 'Điện tử'],
        date: '2024-12-15',
        categoryValue: 'it',
        priceRange: 'under-1m',
        locationValue: 'thuan-an',
        timeValue: '1-day'
      },
      {
        id: 8,
        title: 'Dịch vụ thiết kế logo',
        provider: 'Design Studio',
        location: 'TP. Thủ Dầu Một',
        price: 2000000,
        rating: 4.6,
        reviewCount: 14,
        views: 203,
        category: 'Thiết kế',
        featured: true,
        verified: true,
        tags: ['Thiết kế', 'Logo'],
        date: '2024-12-14',
        categoryValue: 'design',
        priceRange: '1m-5m',
        locationValue: 'thu-dau-mot',
        timeValue: '3-days'
      },
      {
        id: 9,
        title: 'Dịch vụ vận chuyển hàng hóa',
        provider: 'Logistics BD',
        location: 'TP. Bến Cát',
        price: 1200000,
        rating: 4.0,
        reviewCount: 11,
        views: 178,
        category: 'Vận chuyển',
        featured: false,
        verified: true,
        tags: ['Vận chuyển', 'Logistics'],
        date: '2024-12-13',
        categoryValue: 'other',
        priceRange: '1m-5m',
        locationValue: 'ben-cat',
        timeValue: '1-day'
      },
      {
        id: 10,
        title: 'Dịch vụ bảo trì máy tính',
        provider: 'IT Support',
        location: 'TP. Dĩ An',
        price: 800000,
        rating: 4.4,
        reviewCount: 16,
        views: 145,
        category: 'IT',
        featured: false,
        verified: true,
        tags: ['IT', 'Bảo trì'],
        date: '2024-12-12',
        categoryValue: 'it',
        priceRange: '1m-5m',
        locationValue: 'di-an',
        timeValue: '1-day'
      },
      {
        id: 11,
        title: 'Dịch vụ tư vấn tài chính',
        provider: 'Finance Pro',
        location: 'TP. Thuận An',
        price: 3000000,
        rating: 4.5,
        reviewCount: 7,
        views: 123,
        category: 'Tài chính',
        featured: true,
        verified: true,
        tags: ['Tài chính', 'Tư vấn'],
        date: '2024-12-11',
        categoryValue: 'finance',
        priceRange: '5m-10m',
        locationValue: 'thuan-an',
        timeValue: '1-week'
      },
      {
        id: 12,
        title: 'Dịch vụ dọn dẹp nhà cửa',
        provider: 'Home Clean',
        location: 'TP. Thủ Dầu Một',
        price: 400000,
        rating: 4.2,
        reviewCount: 20,
        views: 234,
        category: 'Dọn dẹp',
        featured: false,
        verified: false,
        tags: ['Dọn dẹp', 'Nhà cửa'],
        date: '2024-12-10',
        categoryValue: 'other',
        priceRange: 'under-1m',
        locationValue: 'thu-dau-mot',
        timeValue: '1-day'
      }
    ],

    // Sort options
    sortOptions: [
      { value: 'newest', label: 'Mới nhất' },
      { value: 'price-low', label: 'Giá thấp đến cao' },
      { value: 'price-high', label: 'Giá cao đến thấp' },
      { value: 'rating-high', label: 'Đánh giá cao nhất' },
      { value: 'review-most', label: 'Nhiều đánh giá nhất' },
      { value: 'views-most', label: 'Xem nhiều nhất' }
    ],

    // Computed properties
    get totalPages() {
      return Math.ceil(this.filteredServices.length / this.itemsPerPage);
    },

    get paginatedServices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedServices.slice(start, end);
    },

    get filteredServices() {
      let filtered = [...this.services];

      // Apply category filter from store
      if (this.$store.dichVuFilters.selectedValues.category !== 'all') {
        filtered = filtered.filter(service => service.categoryValue === this.$store.dichVuFilters.selectedValues.category);
      }

      // Apply price filter from store
      if (this.$store.dichVuFilters.selectedValues.price !== 'all') {
        filtered = filtered.filter(service => service.priceRange === this.$store.dichVuFilters.selectedValues.price);
      }

      // Apply location filter from store
      if (this.$store.dichVuFilters.selectedValues.location !== 'all') {
        filtered = filtered.filter(service => service.locationValue === this.$store.dichVuFilters.selectedValues.location);
      }

      // Apply time filter from store
      if (this.$store.dichVuFilters.selectedValues.time !== 'all') {
        filtered = filtered.filter(service => service.timeValue === this.$store.dichVuFilters.selectedValues.time);
      }

      // Apply checkbox filters from store
      if (this.$store.dichVuFilters.checkboxes.featured) {
        filtered = filtered.filter(service => service.featured);
      }

      if (this.$store.dichVuFilters.checkboxes.verified) {
        filtered = filtered.filter(service => service.verified);
      }

      if (this.$store.dichVuFilters.checkboxes.online) {
        filtered = filtered.filter(service => service.locationValue === 'online');
      }

      // Apply search filter from store
      if (this.$store.dichVuFilters.searchQuery.trim()) {
        const query = this.$store.dichVuFilters.searchQuery.toLowerCase();
        filtered = filtered.filter(service =>
          service.title.toLowerCase().includes(query) ||
          service.provider.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query)
        );
      }

      return filtered;
    },

    get sortedServices() {
      const sorted = [...this.filteredServices];

      switch (this.sortBy) {
        case 'newest':
          return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'price-low':
          return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
          return sorted.sort((a, b) => b.price - a.price);
        case 'rating-high':
          return sorted.sort((a, b) => b.rating - a.rating);
        case 'review-most':
          return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        case 'views-most':
          return sorted.sort((a, b) => b.views - a.views);
        default:
          return sorted;
      }
    },

    get totalFilteredServices() {
      return this.filteredServices.length;
    },

    get paginationInfo() {
      const start = (this.currentPage - 1) * this.itemsPerPage + 1;
      const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredServices.length);
      return `Hiển thị ${start}-${end} trong tổng số ${this.filteredServices.length} kết quả`;
    },

    get paginationPages() {
      const pages = [];
      const start = Math.max(1, this.currentPage - 1);
      const end = Math.min(this.totalPages, this.currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },

    // Initialize component
    init() {
      this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.sort-dropdown')) {
          this.sortDropdownOpen = false;
        }
      });
    },

    // Sort functionality
    toggleSortDropdown() {
      this.sortDropdownOpen = !this.sortDropdownOpen;
    },

    selectSortOption(value) {
      this.sortBy = value;
      this.sortDropdownOpen = false;
      this.currentPage = 1; // Reset to first page when sorting
    },

    getSortLabel() {
      const option = this.sortOptions.find(opt => opt.value === this.sortBy);
      return option ? option.label : 'Mới nhất';
    },

    // Pagination functionality
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

    isPrevDisabled() {
      return this.currentPage === 1;
    },

    isNextDisabled() {
      return this.currentPage === this.totalPages;
    },

    isPageActive(page) {
      return this.currentPage === page;
    },

    // Format price
    formatPrice(price) {
      if (price >= 1000000) {
        return `${(price / 1000000).toFixed(1)}M`;
      } else if (price >= 1000) {
        return `${(price / 1000).toFixed(0)}K`;
      }
      return price.toLocaleString();
    },

    // Format rating
    formatRating(rating) {
      return rating.toFixed(1);
    },

    // Toggle view mode
    toggleViewMode(mode) {
      this.viewMode = mode;
    }
  }
}

// Việc Làm Đề Xuất Component - Alpine.js
function viecLamDeXuatComponent() {
  return {
    currentSlide: 0,
    itemsPerSlide: 6,
    jobs: [
      {
        id: 1,
        title: 'Lập trình viên Frontend',
        company: 'Công ty ABC',
        location: 'TP. Thủ Dầu Một',
        salary: '15-25 triệu',
        jobType: 'fulltime',
        experience: '2-3 năm',
        skills: ['React', 'Vue.js', 'JavaScript'],
        featured: true,
        urgent: false,
        views: 245,
        date: '2024-12-21'
      },
      {
        id: 2,
        title: 'Nhân viên Marketing',
        company: 'Marketing Plus',
        location: 'TP. Dĩ An',
        salary: '8-12 triệu',
        jobType: 'fulltime',
        experience: '1-2 năm',
        skills: ['Digital Marketing', 'SEO', 'Content'],
        featured: false,
        urgent: true,
        views: 189,
        date: '2024-12-20'
      },
      {
        id: 3,
        title: 'Kế toán trưởng',
        company: 'Finance Corp',
        location: 'TP. Thuận An',
        salary: '20-30 triệu',
        jobType: 'fulltime',
        experience: '5+ năm',
        skills: ['Kế toán', 'Thuế', 'Quản lý'],
        featured: true,
        urgent: false,
        views: 156,
        date: '2024-12-19'
      },
      {
        id: 4,
        title: 'Thiết kế đồ họa',
        company: 'Design Studio',
        location: 'TP. Bến Cát',
        salary: '10-15 triệu',
        jobType: 'fulltime',
        experience: '2-4 năm',
        skills: ['Photoshop', 'Illustrator', 'UI/UX'],
        featured: false,
        urgent: false,
        views: 312,
        date: '2024-12-18'
      },
      {
        id: 5,
        title: 'Nhân viên bán hàng',
        company: 'Sales Pro',
        location: 'TP. Thủ Dầu Một',
        salary: '6-10 triệu + hoa hồng',
        jobType: 'fulltime',
        experience: 'Không yêu cầu',
        skills: ['Bán hàng', 'Giao tiếp', 'Tiếng Anh'],
        featured: false,
        urgent: true,
        views: 198,
        date: '2024-12-17'
      },
      {
        id: 6,
        title: 'Nhân viên Kinh doanh B2B',
        company: 'Công ty CP Thép Hòa Phát',
        location: 'KCN Mỹ Phước, Bến Cát',
        salary: '15-30 tr',
        jobType: 'fulltime',
        experience: '1-2 năm',
        skills: ['Bán hàng B2B', 'Đàm phán', 'Kỹ năng giao tiếp'],
        featured: false,
        urgent: true,
        views: 167,
        date: '2024-12-20'
      },
      {
        id: 7,
        title: 'Lập trình viên Mobile (React Native)',
        company: 'Công ty TNHH Phần mềm FPT',
        location: 'TP. Thủ Dầu Một',
        salary: '20-28 tr',
        jobType: 'fulltime',
        experience: '2-4 năm',
        skills: ['React Native', 'JavaScript', 'Mobile Development', 'iOS', 'Android'],
        featured: false,
        urgent: false,
        views: 134,
        date: '2024-12-20'
      },
      {
        id: 8,
        title: 'Nhân viên Nhân sự',
        company: 'Tập đoàn Vingroup',
        location: 'TP. Thuận An',
        salary: '12-16 tr',
        jobType: 'fulltime',
        experience: '1-2 năm',
        skills: ['Tuyển dụng', 'Đào tạo', 'Quản lý nhân sự'],
        featured: false,
        urgent: false,
        views: 203,
        date: '2024-12-20'
      },
      {
        id: 9,
        title: 'Kỹ sư Cơ khí',
        company: 'Công ty TNHH Denso Việt Nam',
        location: 'KCN VSIP II, Bình Dương',
        salary: '18-25 tr',
        jobType: 'fulltime',
        experience: '2-5 năm',
        skills: ['AutoCAD', 'SolidWorks', 'Thiết kế cơ khí'],
        featured: false,
        urgent: true,
        views: 178,
        date: '2024-12-19'
      },
      {
        id: 10,
        title: 'Chuyên viên Pháp chế',
        company: 'Công ty CP Đầu tư Bất động sản Novaland',
        location: 'TP. Thủ Dầu Một',
        salary: '16-22 tr',
        jobType: 'fulltime',
        experience: '2-3 năm',
        skills: ['Luật Dân sự', 'Luật Đất đai', 'Pháp lý doanh nghiệp'],
        featured: false,
        urgent: false,
        views: 89,
        date: '2024-12-19'
      },
      {
        id: 11,
        title: 'Nhân viên Thiết kế Đồ họa',
        company: 'Công ty TNHH Quảng cáo Ogilvy',
        location: 'TP. Dĩ An',
        salary: '10-15 tr',
        jobType: 'fulltime',
        experience: '0-2 năm',
        skills: ['Photoshop', 'Illustrator', 'Thiết kế đồ họa', 'Creative Suite'],
        featured: false,
        urgent: false,
        views: 145,
        date: '2024-12-19'
      },
      {
        id: 12,
        title: 'Quản lý Cửa hàng',
        company: 'Hệ thống Siêu thị Co.opmart',
        location: 'TP. Thuận An',
        salary: '14-20 tr',
        jobType: 'fulltime',
        experience: '3-5 năm',
        skills: ['Quản lý bán lẻ', 'Lãnh đạo', 'Quản lý nhân viên'],
        featured: false,
        urgent: true,
        views: 267,
        date: '2024-12-19'
      }
    ],

    get totalSlides() {
      return Math.ceil(this.jobs.length / this.itemsPerSlide);
    },

    get paginatedJobs() {
      const start = this.currentSlide * this.itemsPerSlide;
      return this.jobs.slice(start, start + this.itemsPerSlide);
    },

    // Initialize component
    init() {
      this.updateSlidePosition();
    },

    // Update slide position
    updateSlidePosition() {
      const slideContainer = this.$refs.slideContainer;
      if (slideContainer) {
        const translateX = -(this.currentSlide * (100 / this.totalSlides));
        slideContainer.style.transform = `translateX(${translateX}%)`;
      }
    },

    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.jobs.length;
    },

    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.updateSlidePosition();
      }
    },

    goToSlide(index) {
      if (index >= 0 && index < this.totalSlides) {
        this.currentSlide = index;
        this.updateSlidePosition();
      }
    },

    isPrevDisabled() {
      return this.currentSlide === 0;
    },

    isNextDisabled() {
      return this.currentSlide === this.totalSlides - 1;
    },

    getPaginationDots() {
      return Array.from({ length: this.totalSlides }, (_, i) => i);
    },

    isDotActive(index) {
      return this.currentSlide === index;
    },

    // Get level label
    getLevelLabel(level) {
      const levelMap = {
        'senior': 'Senior',
        'middle': 'Middle',
        'staff': 'Nhân viên',
        'worker': 'Công nhân',
        'teacher': 'Giáo viên',
        'manager': 'Quản lý',
        'director': 'Giám đốc'
      };
      return levelMap[level] || level;
    },

    // Get job type label
    getJobTypeLabel(jobType) {
      const jobTypeMap = {
        'fulltime': 'Toàn thời gian',
        'parttime': 'Bán thời gian',
        'contract': 'Hợp đồng',
        'internship': 'Thực tập',
        'remote': 'Làm việc từ xa'
      };
      return jobTypeMap[jobType] || jobType;
    }
  };
}

// News Data
const newsData = [
  {
    id: 1,
    title: "Khánh thành cầu vượt Mỹ Phước - Tân Vạn, giảm ùn tắc giao thông",
    slug: "khanh-thanh-cau-vuot-my-phuoc-tan-van-giam-un-tac-giao-thong",
    category: "Giao thông",
    categorySlug: "giao-thông",
    excerpt: "Cầu vượt Mỹ Phước - Tân Vạn được khánh thành, giúp giảm thiểu tình trạng ùn tắc giao thông tại khu vực này.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-21T10:00:00Z",
    author: "Admin",
    views: 1250
  },
  {
    id: 2,
    title: "Bình Dương đầu tư 500 tỷ đồng phát triển du lịch sinh thái",
    slug: "binh-duong-dau-tu-500-ty-dong-phat-trien-du-lich-sinh-thai",
    category: "Du lịch",
    categorySlug: "du-lịch",
    excerpt: "Tỉnh Bình Dương sẽ đầu tư 500 tỷ đồng để phát triển các khu du lịch sinh thái, tạo điểm nhấn cho ngành du lịch địa phương.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-20T15:30:00Z",
    author: "Reporter",
    views: 890
  },
  {
    id: 3,
    title: "Festival ẩm thực Bình Dương 2024 thu hút hàng nghìn du khách",
    slug: "festival-am-thuc-binh-duong-2024-thu-hut-hang-nghin-du-khach",
    category: "Ẩm thực",
    categorySlug: "ẩm-thực",
    excerpt: "Festival ẩm thực Bình Dương 2024 đã thu hút hàng nghìn du khách với các món ăn đặc sản địa phương.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-20T12:00:00Z",
    author: "Food Blogger",
    views: 650
  },
  {
    id: 4,
    title: "Khu công nghiệp VSIP II mở rộng, tạo thêm 10.000 việc làm",
    slug: "khu-cong-nghiep-vsip-ii-mo-rong-tao-them-10000-viec-lam",
    category: "Kinh tế",
    categorySlug: "kinh-tế",
    excerpt: "Khu công nghiệp VSIP II được mở rộng với diện tích 200ha, dự kiến tạo thêm 10.000 việc làm cho người dân địa phương.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-19T18:00:00Z",
    author: "Business Reporter",
    views: 1100
  },
  {
    id: 5,
    title: "Trường Đại học Bình Dương khai giảng năm học mới",
    slug: "truong-dai-hoc-binh-duong-khai-giang-nam-hoc-moi",
    category: "Giáo dục",
    categorySlug: "giáo-dục",
    excerpt: "Trường Đại học Bình Dương tổ chức lễ khai giảng năm học 2024-2025 với sự tham gia của hơn 5.000 sinh viên.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-19T14:00:00Z",
    author: "Education Reporter",
    views: 750
  },
  {
    id: 6,
    title: "Bình Dương xây dựng bệnh viện đa khoa hiện đại",
    slug: "binh-duong-xay-dung-benh-vien-da-khoa-hien-dai",
    category: "Y tế",
    categorySlug: "y-tế",
    excerpt: "Tỉnh Bình Dương đầu tư xây dựng bệnh viện đa khoa hiện đại với 500 giường bệnh, phục vụ nhu cầu khám chữa bệnh của người dân.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-18T16:30:00Z",
    author: "Health Reporter",
    views: 980
  },
  {
    id: 7,
    title: "Lễ hội văn hóa các dân tộc Bình Dương 2024",
    slug: "le-hoi-van-hoa-cac-dan-toc-binh-duong-2024",
    category: "Văn hóa",
    categorySlug: "văn-hóa",
    excerpt: "Lễ hội văn hóa các dân tộc Bình Dương 2024 tôn vinh bản sắc văn hóa đa dạng của các dân tộc trong tỉnh.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-18T11:00:00Z",
    author: "Culture Reporter",
    views: 420
  },
  {
    id: 8,
    title: "Bình Dương phát triển nông nghiệp công nghệ cao",
    slug: "binh-duong-phat-trien-nong-nghiep-cong-nghe-cao",
    category: "Nông nghiệp",
    categorySlug: "nông-nghiệp",
    excerpt: "Tỉnh Bình Dương đẩy mạnh phát triển nông nghiệp công nghệ cao với các mô hình trồng trọt hiện đại.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-17T13:45:00Z",
    author: "Agriculture Reporter",
    views: 680
  },
  {
    id: 9,
    title: "Thành phố Thủ Dầu Một mở rộng hệ thống giao thông công cộng",
    slug: "thanh-pho-thu-dau-mot-mo-rong-he-thong-giao-thong-cong-cong",
    category: "Giao thông",
    categorySlug: "giao-thông",
    excerpt: "Thành phố Thủ Dầu Một đầu tư mở rộng hệ thống xe buýt công cộng để phục vụ nhu cầu di chuyển của người dân.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-17T09:15:00Z",
    author: "Transport Reporter",
    views: 550
  },
  {
    id: 10,
    title: "Bình Dương tổ chức giải chạy marathon quốc tế",
    slug: "binh-duong-to-chuc-giai-chay-marathon-quoc-te",
    category: "Thể thao",
    categorySlug: "thể-thao",
    excerpt: "Tỉnh Bình Dương tổ chức giải chạy marathon quốc tế với sự tham gia của hơn 2.000 vận động viên.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-16T17:20:00Z",
    author: "Sports Reporter",
    views: 720
  },
  {
    id: 11,
    title: "Khu đô thị mới Bình Dương thu hút đầu tư nước ngoài",
    slug: "khu-do-thi-moi-binh-duong-thu-hut-dau-tu-nuoc-ngoai",
    category: "Bất động sản",
    categorySlug: "bất-động-sản",
    excerpt: "Các khu đô thị mới tại Bình Dương thu hút mạnh đầu tư từ các nhà đầu tư nước ngoài.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-16T14:30:00Z",
    author: "Real Estate Reporter",
    views: 890
  },
  {
    id: 12,
    title: "Bình Dương phát triển du lịch làng nghề truyền thống",
    slug: "binh-duong-phat-trien-du-lich-lang-nghe-truyen-thong",
    category: "Du lịch",
    categorySlug: "du-lịch",
    excerpt: "Tỉnh Bình Dương đẩy mạnh phát triển du lịch làng nghề truyền thống để bảo tồn và phát huy giá trị văn hóa.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-15T16:00:00Z",
    author: "Tourism Reporter",
    views: 630
  }
];

// ===========================================
// NEWS COMPONENT
// ===========================================
function newsComponent() {
  return {
    news: [],
    currentSlide: 0,
    totalSlides: 0,
    itemsPerSlide: 4,

    init() {
      this.loadNews();
      this.calculateTotalSlides();
      this.setupEventListeners();

      // Initialize Lucide icons
      this.$nextTick(() => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      });
    },

    loadNews() {
      // Use news data
      this.news = newsData;
      console.log('News loaded:', this.news.length);
    },

    calculateTotalSlides() {
      if (this.news.length > 0) {
        this.totalSlides = Math.ceil(this.news.length / this.itemsPerSlide);
      }
      console.log('News slides:', this.totalSlides);
    },

    setupEventListeners() {
      // Setup responsive behavior
      const updateLayout = () => {
        this.calculateTotalSlides();
        this.updateCarousel();
      };

      window.addEventListener('resize', updateLayout);
      updateLayout();
    },

    getCurrentSlideNews() {
      const startIndex = this.currentSlide * this.itemsPerSlide;
      const endIndex = startIndex + this.itemsPerSlide;
      return this.news.slice(startIndex, endIndex);
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
        // Each slide is 100% width, so we move by 100% per slide
        const translateX = -this.currentSlide * 100;
        container.style.transform = `translateX(${translateX}%)`;
        console.log('News carousel updated:', {
          currentSlide: this.currentSlide,
          totalSlides: this.totalSlides,
          translateX: translateX
        });
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },

    getCategoryColor(category) {
      const colors = {
        'Giao thông': 'bg-blue-100 text-blue-700 hover:bg-blue-200',
        'Du lịch': 'bg-green-100 text-green-700 hover:bg-green-200',
        'Ẩm thực': 'bg-orange-100 text-orange-700 hover:bg-orange-200',
        'Kinh tế': 'bg-purple-100 text-purple-700 hover:bg-purple-200',
        'Giáo dục': 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
        'Y tế': 'bg-red-100 text-red-700 hover:bg-red-200',
        'Văn hóa': 'bg-pink-100 text-pink-700 hover:bg-pink-200',
        'Nông nghiệp': 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
        'Thể thao': 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200',
        'Bất động sản': 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      };
      return colors[category] || 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };
}