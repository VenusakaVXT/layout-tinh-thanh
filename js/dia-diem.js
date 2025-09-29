// Dia Diem Page Alpine.js Logic
document.addEventListener('alpine:init', () => {
  Alpine.data('diaDiemPage', () => ({
    // Search functionality
    searchTerm: '',
    selectedCategory: 'all',
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

    // Sample data
    featuredLocations: [
      {
        id: 1,
        name: "UBND Tỉnh Đồng Nai",
        address: "Số 1, Đường 30/4, TP. Biên Hòa",
        description: "Cơ quan hành chính cấp tỉnh",
        category: "hanh-chinh",
        rating: 4.5,
        openHours: "7:00 - 17:00",
        image: "/placeholder.svg",
        isVerified: true
      },
      {
        id: 2,
        name: "Bệnh viện Đa khoa Đồng Nai",
        address: "Số 15, Đường Nguyễn Ái Quốc, TP. Biên Hòa",
        description: "Bệnh viện đa khoa tuyến tỉnh",
        category: "y-te",
        rating: 4.2,
        openHours: "24/7",
        image: "/placeholder.svg",
        isVerified: true
      },
      {
        id: 3,
        name: "Trường Đại học Đồng Nai",
        address: "Số 2, Đường Lê Quý Đôn, TP. Biên Hòa",
        description: "Trường đại học công lập",
        category: "giao-duc",
        rating: 4.3,
        openHours: "7:00 - 17:00",
        image: "/placeholder.svg",
        isVerified: true
      }
    ],

    locationCategories: [
      { id: 'all', name: 'Tất cả', icon: 'MapPin' },
      { id: 'hanh-chinh', name: 'Cơ quan hành chính', icon: 'Building2' },
      { id: 'y-te', name: 'Y tế', icon: 'Heart' },
      { id: 'giao-duc', name: 'Giáo dục', icon: 'GraduationCap' },
      { id: 'am-thuc', name: 'Ẩm thực', icon: 'UtensilsCrossed' },
      { id: 'mua-sam', name: 'Mua sắm', icon: 'ShoppingBag' },
      { id: 'giai-tri', name: 'Giải trí', icon: 'Camera' },
      { id: 'giao-thong', name: 'Giao thông', icon: 'Car' },
      { id: 'tai-chinh', name: 'Tài chính', icon: 'CreditCard' }
    ],

    communes: [
      { id: 1, name: "Xã An Hòa", type: "Xã nông nghiệp", population: "15,000", area: "25.5 km²" },
      { id: 2, name: "Xã Bình Hòa", type: "Xã công nghiệp", population: "25,000", area: "30.2 km²" },
      { id: 3, name: "Xã Cẩm Mỹ", type: "Xã dịch vụ", population: "18,500", area: "22.8 km²" },
      { id: 4, name: "Xã Định Quán", type: "Xã nông nghiệp", population: "12,000", area: "28.3 km²" },
      { id: 5, name: "Xã Gia Kiệm", type: "Xã công nghiệp", population: "22,000", area: "35.1 km²" },
      { id: 6, name: "Xã Hố Nai", type: "Xã thành thị", population: "30,000", area: "40.5 km²" },
      { id: 7, name: "Xã Kiệm Tân", type: "Xã dịch vụ", population: "16,500", area: "26.7 km²" },
      { id: 8, name: "Xã Long Khánh", type: "Xã nông nghiệp", population: "14,000", area: "32.4 km²" },
      { id: 9, name: "Xã Mỹ Lộc", type: "Xã công nghiệp", population: "28,000", area: "38.9 km²" },
      { id: 10, name: "Xã Nhơn Trạch", type: "Xã dịch vụ", population: "20,000", area: "29.6 km²" },
      { id: 11, name: "Xã Phú Hòa", type: "Xã thành thị", population: "35,000", area: "45.2 km²" },
      { id: 12, name: "Xã Quảng Tiến", type: "Xã nông nghiệp", population: "13,500", area: "27.8 km²" }
    ],

    realEstateData: [
      { id: 1, title: "Nhà phố 3 tầng", location: "TP. Biên Hòa", price: "2.5 tỷ", area: "100m²", status: "Bán", image: "/placeholder.svg", hot: true },
      { id: 2, title: "Căn hộ cao cấp", location: "TP. Biên Hòa", price: "1.8 tỷ", area: "80m²", status: "Bán", image: "/placeholder.svg", hot: false },
      { id: 3, title: "Đất nền mặt tiền", location: "Huyện Long Thành", price: "3.2 tỷ", area: "120m²", status: "Bán", image: "/placeholder.svg", hot: true },
      { id: 4, title: "Biệt thự liền kề", location: "TP. Biên Hòa", price: "4.5 tỷ", area: "150m²", status: "Bán", image: "/placeholder.svg", hot: false },
      { id: 5, title: "Chung cư mini", location: "Huyện Trảng Bom", price: "1.2 tỷ", area: "60m²", status: "Bán", image: "/placeholder.svg", hot: true }
    ],

    jobsData: [
      { id: 1, title: "Nhân viên Kinh doanh", company: "Công ty ABC", companyLogo: "/placeholder.svg", salary: "8-12 triệu VNĐ", location: "TP. Biên Hòa", publishedAt: "2024-01-15", views: 150, urgent: true },
      { id: 2, title: "Kế toán trưởng", company: "Công ty XYZ", companyLogo: "/placeholder.svg", salary: "15-20 triệu VNĐ", location: "TP. Biên Hòa", publishedAt: "2024-01-14", views: 200, urgent: false },
      { id: 3, title: "Lập trình viên", company: "Công ty Tech", companyLogo: "/placeholder.svg", salary: "12-18 triệu VNĐ", location: "TP. Biên Hòa", publishedAt: "2024-01-13", views: 300, urgent: true },
      { id: 4, title: "Nhân viên Marketing", company: "Công ty Media", companyLogo: "/placeholder.svg", salary: "7-10 triệu VNĐ", location: "TP. Biên Hòa", publishedAt: "2024-01-12", views: 120, urgent: false }
    ],

    newsData: [
      { id: 1, title: "Tin tức mới nhất về Đồng Nai", category: "Tin tức", excerpt: "Nội dung tóm tắt tin tức...", author: "Admin", publishedAt: "2024-01-15", views: 500, image: "/placeholder.svg" },
      { id: 2, title: "Phát triển kinh tế địa phương", category: "Kinh tế", excerpt: "Nội dung tóm tắt tin tức...", author: "Reporter", publishedAt: "2024-01-14", views: 300, image: "/placeholder.svg" },
      { id: 3, title: "Du lịch Đồng Nai", category: "Du lịch", excerpt: "Nội dung tóm tắt tin tức...", author: "Editor", publishedAt: "2024-01-13", views: 400, image: "/placeholder.svg" },
      { id: 4, title: "Giáo dục và đào tạo", category: "Giáo dục", excerpt: "Nội dung tóm tắt tin tức...", author: "Writer", publishedAt: "2024-01-12", views: 250, image: "/placeholder.svg" }
    ],

    // Computed properties
    get filteredLocations() {
      let filtered = this.featuredLocations;

      if (this.searchTerm) {
        filtered = filtered.filter(location =>
          location.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          location.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          location.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }

      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(location => location.category === this.selectedCategory);
      }

      return filtered;
    },

    get displayedCommunes() {
      return this.showAllCommunes ? this.communes : this.communes.slice(0, 12);
    },

    get supportDisplay() {
      return this.counterValues.support + '/7';
    },

    get filteredLocations() {
      let filtered = this.featuredLocations;

      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase();
        filtered = filtered.filter(location =>
          location.name.toLowerCase().includes(searchLower) ||
          location.address.toLowerCase().includes(searchLower) ||
          location.description.toLowerCase().includes(searchLower)
        );
      }

      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(location => location.category === this.selectedCategory);
      }

      return filtered;
    },

    get filteredLocationsCount() {
      return this.filteredLocations.length;
    },

    // Methods
    init() {
      this.updateCardsPerSlide();
      this.animateCounters();
      window.addEventListener('resize', () => this.updateCardsPerSlide());
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
      // Search is handled by the computed property filteredLocations
    },

    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
    },

    toggleCommunes() {
      this.showAllCommunes = !this.showAllCommunes;
    },

    // Slider methods
    previousPropertiesSlide() {
      this.relatedPropertiesSlide = Math.max(0, this.relatedPropertiesSlide - 1);
    },

    nextPropertiesSlide() {
      const maxSlide = Math.ceil(this.realEstateData.length / this.cardsPerSlide) - 1;
      this.relatedPropertiesSlide = Math.min(maxSlide, this.relatedPropertiesSlide + 1);
    },

    goToPropertiesSlide(index) {
      this.relatedPropertiesSlide = index;
    },

    previousJobsSlide() {
      this.relatedJobsSlide = Math.max(0, this.relatedJobsSlide - 1);
    },

    nextJobsSlide() {
      const maxSlide = Math.ceil(this.jobsData.length / this.jobsPerSlide) - 1;
      this.relatedJobsSlide = Math.min(maxSlide, this.relatedJobsSlide + 1);
    },

    goToJobsSlide(index) {
      this.relatedJobsSlide = index;
    },

    previousNewsSlide() {
      this.relatedNewsSlide = Math.max(0, this.relatedNewsSlide - 1);
    },

    nextNewsSlide() {
      const maxSlide = Math.ceil(this.newsData.length / 4) - 1;
      this.relatedNewsSlide = Math.min(maxSlide, this.relatedNewsSlide + 1);
    },

    goToNewsSlide(index) {
      this.relatedNewsSlide = index;
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit'
      });
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

// Initialize counter animations when page loads
document.addEventListener('DOMContentLoaded', function () {
  // Animate statistics counters
  const statsElements = document.querySelectorAll('[data-counter]');
  statsElements.forEach(element => {
    const target = parseInt(element.dataset.counter);
    animateCounter(element, 0, target, 2000);
  });
});
