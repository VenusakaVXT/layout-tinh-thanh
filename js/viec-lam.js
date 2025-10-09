// ===========================================
// Việc Làm Components - Alpine.js
// ===========================================

document.addEventListener('alpine:init', () => {

  // ===========================================
  // MAIN VIỆC LÀM COMPONENT
  // ===========================================
  Alpine.data('viecLamComponent', () => ({
    // Search functionality
    searchQuery: '',

    // Filter states
    filters: {
      jobType: 'all',
      salary: 'all',
      experience: 'all',
      location: 'all',
      level: 'all',
      category: 'all',
      featured: false,
      urgent: false
    },

    // Dropdown states
    dropdowns: {
      jobType: false,
      salary: false,
      experience: false,
      location: false,
      level: false,
      category: false,
      sort: false
    },

    // Sort functionality
    sortBy: 'newest',
    sortOptions: [
      { value: 'newest', label: 'Mới nhất' },
      { value: 'salary-high', label: 'Lương cao đến thấp' },
      { value: 'salary-low', label: 'Lương thấp đến cao' },
      { value: 'most-viewed', label: 'Xem nhiều nhất' },
      { value: 'featured', label: 'Nổi bật' }
    ],

    // Pagination
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 8,
    totalItems: 15,

    // View mode
    viewMode: 'grid', // 'grid' or 'list'

    // Job listings data
    jobListings: [
      {
        id: 1,
        title: 'Kỹ sư Phần mềm Senior',
        company: 'Công ty TNHH Samsung Electronics Việt Nam',
        salary: '25-35 tr',
        experience: '3-5 năm',
        location: 'KCN VSIP I, Thuận An',
        jobType: 'fulltime',
        level: 'senior',
        category: 'it',
        featured: true,
        urgent: false,
        skills: ['React', 'Node.js', 'JavaScript'],
        views: 245,
        date: '21-12',
        salaryValue: 30000000
      },
      {
        id: 2,
        title: 'Nhân viên Kế toán Tổng hợp',
        company: 'Tập đoàn Becamex IDC',
        salary: '12-18 tr',
        experience: '2-3 năm',
        location: 'TP. Thủ Dầu Một',
        jobType: 'fulltime',
        level: 'staff',
        category: 'accounting',
        featured: true,
        urgent: true,
        skills: ['Excel', 'SAP', 'Kế toán'],
        views: 189,
        date: '21-12',
        salaryValue: 15000000
      },
      {
        id: 3,
        title: 'Chuyên viên Marketing Digital',
        company: 'Công ty CP Đầu tư Địa ốc Đại Quang Minh',
        salary: '15-20 tr',
        experience: '1-3 năm',
        location: 'TP. Dĩ An',
        jobType: 'fulltime',
        level: 'staff',
        category: 'marketing',
        featured: true,
        urgent: false,
        skills: ['Facebook Ads', 'Google Ads', 'SEO'],
        views: 156,
        date: '21-12',
        salaryValue: 17500000
      },
      {
        id: 4,
        title: 'Công nhân Sản xuất',
        company: 'Công ty TNHH Pouchen Việt Nam',
        salary: '8-12 tr',
        experience: 'Không yêu cầu',
        location: 'KCN Đồng An, Thuận An',
        jobType: 'fulltime',
        level: 'worker',
        category: 'other',
        featured: true,
        urgent: true,
        skills: ['Thao tác máy', 'Làm việc nhóm'],
        views: 312,
        date: '20-12',
        salaryValue: 10000000
      },
      {
        id: 5,
        title: 'Giáo viên Tiếng Anh',
        company: 'Trường Quốc tế Việt Úc',
        salary: '18-25 tr',
        experience: '2+ năm',
        location: 'TP. Thủ Dầu Một',
        jobType: 'fulltime',
        level: 'teacher',
        category: 'other',
        featured: true,
        urgent: false,
        skills: ['IELTS', 'TOEFL', 'Giảng dạy'],
        views: 98,
        date: '20-12',
        salaryValue: 21500000
      },
      {
        id: 6,
        title: 'Nhân viên Kinh doanh B2B',
        company: 'Công ty CP Thép Hòa Phát',
        salary: '15-30 tr',
        experience: '1-2 năm',
        location: 'KCN Mỹ Phước, Bến Cát',
        jobType: 'fulltime',
        level: 'staff',
        category: 'sales',
        featured: false,
        urgent: true,
        skills: ['Bán hàng B2B', 'Đàm phán', 'CRM'],
        views: 167,
        date: '20-12',
        salaryValue: 22500000
      },
      {
        id: 7,
        title: 'Lập trình viên Mobile (React Native)',
        company: 'Công ty TNHH Phần mềm FPT',
        salary: '20-28 tr',
        experience: '2-4 năm',
        location: 'TP. Thủ Dầu Một',
        jobType: 'fulltime',
        level: 'middle',
        category: 'it',
        featured: false,
        urgent: false,
        skills: ['React Native', 'JavaScript', 'Redux'],
        views: 134,
        date: '20-12',
        salaryValue: 24000000
      },
      {
        id: 8,
        title: 'Nhân viên Nhân sự',
        company: 'Tập đoàn Vingroup',
        salary: '12-16 tr',
        experience: '1-2 năm',
        location: 'TP. Thuận An',
        jobType: 'fulltime',
        level: 'staff',
        category: 'hr',
        featured: false,
        urgent: false,
        skills: ['Tuyển dụng', 'Đào tạo', 'Lương thưởng'],
        views: 203,
        date: '20-12',
        salaryValue: 14000000
      },
      {
        id: 9,
        title: 'Kỹ sư Cơ khí',
        company: 'Công ty TNHH Bosch Việt Nam',
        salary: '18-25 tr',
        experience: '3-5 năm',
        location: 'KCN Mỹ Phước, Bến Cát',
        jobType: 'fulltime',
        level: 'senior',
        category: 'other',
        featured: false,
        urgent: false,
        skills: ['AutoCAD', 'SolidWorks', 'Cơ khí'],
        views: 178,
        date: '19-12',
        salaryValue: 22000000
      },
      {
        id: 10,
        title: 'Nhân viên Bán hàng',
        company: 'Công ty CP Điện máy Xanh',
        salary: '10-15 tr',
        experience: '1-2 năm',
        location: 'TP. Thủ Dầu Một',
        jobType: 'fulltime',
        level: 'staff',
        category: 'sales',
        featured: false,
        urgent: true,
        skills: ['Bán hàng', 'Giao tiếp', 'Tư vấn'],
        views: 145,
        date: '19-12',
        salaryValue: 12500000
      },
      {
        id: 11,
        title: 'Thiết kế đồ họa',
        company: 'Công ty TNHH Creative Studio',
        salary: '12-18 tr',
        experience: '2-3 năm',
        location: 'TP. Dĩ An',
        jobType: 'fulltime',
        level: 'staff',
        category: 'design',
        featured: true,
        urgent: false,
        skills: ['Photoshop', 'Illustrator', 'Figma'],
        views: 198,
        date: '19-12',
        salaryValue: 15000000
      },
      {
        id: 12,
        title: 'Kỹ sư Điện tử',
        company: 'Công ty TNHH Panasonic Việt Nam',
        salary: '20-28 tr',
        experience: '3-5 năm',
        location: 'KCN VSIP II, Thuận An',
        jobType: 'fulltime',
        level: 'senior',
        category: 'it',
        featured: false,
        urgent: false,
        skills: ['PLC', 'HMI', 'SCADA'],
        views: 167,
        date: '18-12',
        salaryValue: 24000000
      },
      {
        id: 13,
        title: 'Nhân viên Kho',
        company: 'Công ty TNHH DHL Express',
        salary: '8-12 tr',
        experience: 'Không yêu cầu',
        location: 'KCN Đồng An, Thuận An',
        jobType: 'fulltime',
        level: 'worker',
        category: 'other',
        featured: false,
        urgent: true,
        skills: ['Quản lý kho', 'Forklift', 'Kiểm kê'],
        views: 234,
        date: '18-12',
        salaryValue: 10000000
      },
      {
        id: 14,
        title: 'Chuyên viên Tài chính',
        company: 'Ngân hàng TMCP Á Châu',
        salary: '15-22 tr',
        experience: '2-4 năm',
        location: 'TP. Thủ Dầu Một',
        jobType: 'fulltime',
        level: 'staff',
        category: 'accounting',
        featured: true,
        urgent: false,
        skills: ['Tài chính', 'Phân tích', 'Báo cáo'],
        views: 156,
        date: '18-12',
        salaryValue: 18500000
      },
      {
        id: 15,
        title: 'Nhân viên Chăm sóc khách hàng',
        company: 'Công ty TNHH Viettel Post',
        salary: '9-13 tr',
        experience: '1-2 năm',
        location: 'TP. Thuận An',
        jobType: 'fulltime',
        level: 'staff',
        category: 'customer-service',
        featured: false,
        urgent: false,
        skills: ['Giao tiếp', 'Giải quyết vấn đề', 'Tiếng Anh'],
        views: 123,
        date: '17-12',
        salaryValue: 11000000
      }
    ],

    filteredJobs: [],

    // Statistics for counter animation
    stats: {
      jobs: 0,
      companies: 0,
      candidates: 0,
      support: 0
    },

    finalStats: {
      jobs: 15,
      companies: 200,
      candidates: 5000,
      support: 24
    },

    animationDuration: 2000,

    filterOptions: {
      jobType: [
        { value: 'all', label: 'Tất cả loại hình' },
        { value: 'fulltime', label: 'Toàn thời gian' },
        { value: 'parttime', label: 'Bán thời gian' },
        { value: 'contract', label: 'Hợp đồng' },
        { value: 'intern', label: 'Thực tập' },
        { value: 'remote', label: 'Làm việc từ xa' }
      ],
      salary: [
        { value: 'all', label: 'Tất cả mức lương' },
        { value: 'under-5m', label: 'Dưới 5 triệu' },
        { value: '5m-10m', label: '5 - 10 triệu' },
        { value: '10m-15m', label: '10 - 15 triệu' },
        { value: '15m-20m', label: '15 - 20 triệu' },
        { value: '20m-30m', label: '20 - 30 triệu' },
        { value: 'over-30m', label: 'Trên 30 triệu' },
        { value: 'negotiate', label: 'Thỏa thuận' }
      ],
      experience: [
        { value: 'all', label: 'Tất cả kinh nghiệm' },
        { value: 'fresh', label: 'Chưa có kinh nghiệm' },
        { value: '1year', label: 'Dưới 1 năm' },
        { value: '1-2years', label: '1 - 2 năm' },
        { value: '2-3years', label: '2 - 3 năm' },
        { value: '3-5years', label: '3 - 5 năm' },
        { value: 'over-5years', label: 'Trên 5 năm' }
      ],
      location: [
        { value: 'all', label: 'Tất cả khu vực' },
        { value: 'TP. Thủ Dầu Một', label: 'TP. Thủ Dầu Một' },
        { value: 'TP. Dĩ An', label: 'TP. Dĩ An' },
        { value: 'KCN VSIP I, Thuận An', label: 'KCN VSIP I, Thuận An' },
        { value: 'KCN Đồng An, Thuận An', label: 'KCN VSIP I, Thuận An' },
        { value: 'KCN Mỹ Phước, Bến Cát', label: 'Bến Cát' },
        { value: 'tan-uyen', label: 'Tân Uyên' },
        { value: 'bac-tan-uyen', label: 'Bắc Tân Uyên' },
        { value: 'bau-bang', label: 'Bàu Bàng' },
        { value: 'phu-giao', label: 'Phú Giáo' }
      ],
      level: [
        { value: 'all', label: 'Tất cả' },
        { value: 'intern', label: 'Thực tập sinh' },
        { value: 'staff', label: 'Nhân viên' },
        { value: 'senior', label: 'Nhân viên cấp cao' },
        { value: 'leader', label: 'Trưởng nhóm' },
        { value: 'manager', label: 'Quản lý' },
        { value: 'director', label: 'Giám đốc' }
      ],
      category: [
        { value: 'all', label: 'Tất cả danh mục' },
        { value: 'it', label: 'Công nghệ thông tin' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Bán hàng' },
        { value: 'accounting', label: 'Kế toán' },
        { value: 'hr', label: 'Nhân sự' },
        { value: 'design', label: 'Thiết kế' },
        { value: 'content', label: 'Nội dung' },
        { value: 'customer-service', label: 'Chăm sóc khách hàng' },
        { value: 'other', label: 'Khác' }
      ]
    },

    // ===================== Lifecycle =====================
    init() {
      this.startCounterAnimation();
      this.setupEventListeners();
      this.filterAndSortJobs();
    },

    // ===================== Methods =====================
    setupEventListeners() {
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-dropdown')) {
          Object.keys(this.dropdowns).forEach(key => this.dropdowns[key] = false);
        }
      });
    },

    handleSearch() {
      if (this.searchQuery.trim()) {
        const params = new URLSearchParams();
        params.set('keyword', this.searchQuery.trim());

        Object.keys(this.filters).forEach(key => {
          if (this.filters[key] && this.filters[key] !== 'all' && this.filters[key] !== false) {
            params.set(key, this.filters[key]);
          }
        });

        window.location.href = `/viec-lam/search?${params.toString()}`;
      }
    },

    handleSearchKeypress(event) {
      if (event.key === 'Enter') this.handleSearch();
    },

    toggleDropdown(dropdownName) {
      Object.keys(this.dropdowns).forEach(key => {
        if (key !== dropdownName) this.dropdowns[key] = false;
      });
      this.dropdowns[dropdownName] = !this.dropdowns[dropdownName];
    },

    selectFilter(filterName, value) {
      this.filters[filterName] = value;
      this.dropdowns[filterName] = false;
      this.currentPage = 1;
      this.filterAndSortJobs();
    },

    toggleCheckboxFilter(filterName) {
      this.filters[filterName] = !this.filters[filterName];
      this.currentPage = 1;
      this.filterAndSortJobs();
    },

    clearAllFilters() {
      Object.keys(this.filters).forEach(key => {
        this.filters[key] = (typeof this.filters[key] === 'boolean') ? false : 'all';
      });

      Object.keys(this.dropdowns).forEach(key => this.dropdowns[key] = false);
      this.currentPage = 1;
      this.filterAndSortJobs();
    },

    getSelectedLabel(filterName) {
      const options = this.filterOptions[filterName];
      const selected = options.find(opt => opt.value === this.filters[filterName]);
      return selected ? selected.label : 'Tất cả';
    },

    startCounterAnimation() {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / this.animationDuration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        this.stats.jobs = Math.floor(this.finalStats.jobs * easeOut);
        this.stats.companies = Math.floor(this.finalStats.companies * easeOut);
        this.stats.candidates = Math.floor(this.finalStats.candidates * easeOut);
        this.stats.support = Math.floor(this.finalStats.support * easeOut);

        if (progress < 1) requestAnimationFrame(animate);
        else {
          this.stats.jobs = this.finalStats.jobs;
          this.stats.companies = this.finalStats.companies;
          this.stats.candidates = this.finalStats.candidates;
          this.stats.support = this.finalStats.support;
        }
      };

      setTimeout(() => requestAnimationFrame(animate), 300);
    },

    hasActiveFilters() {
      return Object.values(this.filters).some(v => v !== 'all' && v !== false);
    },

    filterAndSortJobs() {
      let filtered = [...this.jobListings];

      // Apply filters
      filtered = filtered.filter(job => {
        if (this.filters.jobType !== 'all' && job.jobType !== this.filters.jobType) return false;

        if (this.filters.salary !== 'all') {
          const s = job.salaryValue;
          switch (this.filters.salary) {
            case 'under-5m': if (s >= 5000000) return false; break;
            case '5m-10m': if (s < 5000000 || s > 10000000) return false; break;
            case '10m-15m': if (s < 10000000 || s > 15000000) return false; break;
            case '15m-20m': if (s < 15000000 || s > 20000000) return false; break;
            case '20m-30m': if (s < 20000000 || s > 30000000) return false; break;
            case 'over-30m': if (s < 30000000) return false; break;
          }
        }

        if (this.filters.experience !== 'all') {
          const exp = job.experience;
          switch (this.filters.experience) {
            case 'fresh': if (exp !== 'Không yêu cầu') return false; break;
            case '1year': if (!exp.includes('Dưới 1 năm') && exp !== 'Không yêu cầu') return false; break;
            case '1-2years': if (!exp.includes('1-2 năm') && !exp.includes('1-3 năm')) return false; break;
            case '2-3years': if (!exp.includes('2-3 năm') && !exp.includes('2+ năm')) return false; break;
            case '3-5years': if (!exp.includes('3-5 năm') && !exp.includes('2-4 năm')) return false; break;
            case 'over-5years': if (!exp.includes('Trên 5 năm')) return false; break;
          }
        }

        if (this.filters.location !== 'all') {
          if (!job.location.toLowerCase().includes(this.filters.location.toLowerCase().replace('-', ' '))) return false;
        }

        if (this.filters.level !== 'all' && job.level !== this.filters.level) return false;
        if (this.filters.category !== 'all' && job.category !== this.filters.category) return false;
        if (this.filters.featured && !job.featured) return false;
        if (this.filters.urgent && !job.urgent) return false;

        return true;
      });

      // Apply sorting
      filtered.sort((a, b) => {
        switch (this.sortBy) {
          case 'newest': return new Date(b.date) - new Date(a.date);
          case 'salary-high': return b.salaryValue - a.salaryValue;
          case 'salary-low': return a.salaryValue - b.salaryValue;
          case 'most-viewed': return b.views - a.views;
          case 'featured': return b.featured - a.featured;
          default: return 0;
        }
      });

      this.filteredJobs = filtered;
      this.totalItems = filtered.length;
      this.updatePagination();
    },

    updatePagination() {
      this.itemsPerPage = this.viewMode === 'grid' ? 8 : 4;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      if (this.currentPage > this.totalPages) this.currentPage = 1;
    },

    getPaginatedJobs() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredJobs.slice(start, start + this.itemsPerPage);
    },

    toggleViewMode(mode) {
      this.viewMode = mode;
      this.currentPage = 1;
      this.updatePagination();
    },

    goToPage(page) { if (page >= 1 && page <= this.totalPages) this.currentPage = page; },
    nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; },
    prevPage() { if (this.currentPage > 1) this.currentPage--; },
    getPaginationPages() {
      const pages = [];
      const start = Math.max(1, this.currentPage - 1);
      const end = Math.min(this.totalPages, this.currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      return pages;
    },

    toggleSortDropdown() { this.dropdowns.sort = !this.dropdowns.sort; },
    selectSortOption(value) { this.sortBy = value; this.dropdowns.sort = false; this.filterAndSortJobs(); },
    getSortLabel() { const opt = this.sortOptions.find(o => o.value === this.sortBy); return opt ? opt.label : 'Mới nhất'; },

    getLevelLabel(level) {
      const map = { senior: 'Senior', middle: 'Middle', staff: 'Nhân viên', worker: 'Công nhân', teacher: 'Giáo viên', manager: 'Quản lý', director: 'Giám đốc' };
      return map[level] || level;
    },
    getJobTypeLabel(type) {
      const map = { fulltime: 'Toàn thời gian', parttime: 'Bán thời gian', contract: 'Hợp đồng', internship: 'Thực tập', remote: 'Làm việc từ xa' };
      return map[type] || type;
    }
  }));

  // ===========================================
  // DANH MỤC VIỆC LÀM COMPONENT
  // ===========================================
  Alpine.data('danhMucViecLamComponent', () => ({
    currentSlide: 0,
    totalSlides: 1,
    groupSize: 6,
    items: [],
    totalItems: 0,
    resizeHandler: null,
    isTransitioning: false,

    init() {
      this.items = Array.from(this.$refs.slideContainer?.children || []);
      this.totalItems = this.items.length;

      this.resizeHandler = () => {
        this.setupResponsive();
      };

      this.$nextTick(() => {
        this.setupResponsive();
      });

      window.addEventListener('resize', this.resizeHandler);

      Alpine.onCleanup(() => {
        if (this.resizeHandler) {
          window.removeEventListener('resize', this.resizeHandler);
        }
      });
    },

    setupResponsive() {
      if (!this.totalItems) {
        this.totalItems = this.items.length;
      }

      const width = window.innerWidth;
      let newGroupSize = 6;

      if (width < 768) {
        newGroupSize = 1;
      } else if (width < 1024) {
        newGroupSize = 3;
      }

      const groupChanged = newGroupSize !== this.groupSize;
      this.groupSize = newGroupSize;

      this.totalSlides = Math.max(Math.ceil(this.totalItems / this.groupSize), 1);

      if (groupChanged) {
        this.currentSlide = 0;
      } else {
        this.currentSlide = Math.min(this.currentSlide, this.totalSlides - 1);
      }

      this.applyLayout();
    },

    applyLayout() {
      const container = this.$refs.slideContainer;
      if (!container) return;

      container.style.width = `${this.totalSlides * 100}%`;

      const itemWidth = 100 / (this.totalSlides * this.groupSize);
      this.items.forEach((item) => {
        item.style.width = `${itemWidth}%`;
      });

      this.updateSlidePosition();
    },

    nextSlide() {
      if (this.isTransitioning || !this.canNext()) return;

      this.isTransitioning = true;
      this.currentSlide += 1;
      this.updateSlidePosition();

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    prevSlide() {
      if (this.isTransitioning || !this.canPrev()) return;

      this.isTransitioning = true;
      this.currentSlide -= 1;
      this.updateSlidePosition();

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    goToSlide(index) {
      if (this.isTransitioning || index < 0 || index >= this.totalSlides) return;

      this.isTransitioning = true;
      this.currentSlide = index;
      this.updateSlidePosition();

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    updateSlidePosition() {
      const container = this.$refs.slideContainer;
      if (!container) return;

      const step = 100 / this.totalSlides;
      container.style.transform = `translateX(-${this.currentSlide * step}%)`;
    },

    canNext() { return this.currentSlide < this.totalSlides - 1; },
    canPrev() { return this.currentSlide > 0; },
    isPrevDisabled() { return !this.canPrev(); },
    isNextDisabled() { return !this.canNext(); },
    getPaginationDots() { return Array.from({ length: this.totalSlides }, (_, i) => i); },
    isDotActive(index) { return this.currentSlide === index; }
  }));

  // ===========================================
  // VIỆC LÀM ĐỀ XUẤT COMPONENT
  // ===========================================
  Alpine.data('viecLamDeXuatComponent', () => ({
    currentSlide: 0,
    itemsPerSlide: 6,
    jobsLength: 5,

    get totalSlides() { return Math.ceil(this.jobsLength / this.itemsPerSlide); },
    get paginatedJobs() { const start = this.currentSlide * this.itemsPerSlide; return this.jobs.slice(start, start + this.itemsPerSlide); },

    init() { this.updateSlidePosition(); },
    updateSlidePosition() { const c = this.$refs.slideContainer; if (c) c.style.transform = `translateX(-${this.currentSlide * (100 / this.totalSlides)}%)`; },
    nextSlide() { if (this.currentSlide < this.totalSlides - 1) { this.currentSlide++; this.updateSlidePosition(); } },
    prevSlide() { if (this.currentSlide > 0) { this.currentSlide--; this.updateSlidePosition(); } },
    goToSlide(index) { if (index >= 0 && index < this.totalSlides) { this.currentSlide = index; this.updateSlidePosition(); } },

    isPrevDisabled() { return this.currentSlide === 0; },
    isNextDisabled() { return this.currentSlide === this.totalSlides - 1; },
    getPaginationDots() { return Array.from({ length: this.totalSlides }, (_, i) => i); },
    isDotActive(index) { return this.currentSlide === index; },

    getLevelLabel(level) {
      const map = { senior: 'Senior', middle: 'Middle', staff: 'Nhân viên', worker: 'Công nhân', teacher: 'Giáo viên', manager: 'Quản lý', director: 'Giám đốc' };
      return map[level] || level;
    },
    getJobTypeLabel(type) {
      const map = { fulltime: 'Toàn thời gian', parttime: 'Bán thời gian', contract: 'Hợp đồng', internship: 'Thực tập', remote: 'Làm việc từ xa' };
      return map[type] || type;
    }
  }));

  // ===========================================
  // TOP DOANH NGHIỆP TUYỂN DỤNG COMPONENT
  // ===========================================
  Alpine.data('topDoanhNghiepTuyenDungComponent', () => ({
    currentSlide: 0,
    itemsPerSlide: 4,
    companiesLength: 8,

    get totalSlides() { return Math.ceil(this.companiesLength / this.itemsPerSlide); },
    get paginatedCompanies() { const start = this.currentSlide * this.itemsPerSlide; return this.companies.slice(start, start + this.itemsPerSlide); },

    init() { this.updateSlidePosition(); },
    updateSlidePosition() { const c = this.$refs.slideContainer; if (c) c.style.transform = `translateX(-${this.currentSlide * (100 / this.totalSlides)}%)`; },
    nextSlide() { if (this.currentSlide < this.totalSlides - 1) { this.currentSlide++; this.updateSlidePosition(); } },
    prevSlide() { if (this.currentSlide > 0) { this.currentSlide--; this.updateSlidePosition(); } },
    goToSlide(index) { if (index >= 0 && index < this.totalSlides) { this.currentSlide = index; this.updateSlidePosition(); } },

    isPrevDisabled() { return this.currentSlide === 0; },
    isNextDisabled() { return this.currentSlide === this.totalSlides - 1; },
    getPaginationDots() { return Array.from({ length: this.totalSlides }, (_, i) => i); },
    isDotActive(index) { return this.currentSlide === index; }
  }));

}); // end alpine:init

// ===========================================
// GLOBAL JOB UTILITIES
// ===========================================
window.JobUtils = {
  formatSalary: (salary) => {
    if (!salary) return 'Thỏa thuận';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salary);
  }
};
