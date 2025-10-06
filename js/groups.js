// Groups Alpine.js Components
// Chứa logic tìm kiếm cho trang groups

document.addEventListener('alpine:init', () => {

  // ===========================================
  // SEARCH COMPONENT
  // ===========================================
  Alpine.data('searchComponent', () => ({
    searchKeyword: '',
    isLoading: false,

    init() {
      // Lấy keyword từ URL ngay lập tức để tránh flash
      this.searchKeyword = this.getUrlKeyword();

      // Khởi tạo Lucide icons
      this.$nextTick(() => {
        lucide.createIcons();
      });
    },

    getUrlKeyword() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('keyword') || '';
    },

    handleSearch() {
      if (this.isLoading) return;

      const keyword = this.searchKeyword.trim();

      // Lấy URL hiện tại và thêm param keyword
      const currentUrl = new URL(window.location.href);

      if (keyword) {
        currentUrl.searchParams.set('keyword', keyword);
      } else {
        currentUrl.searchParams.delete('keyword');
      }

      // Chuyển hướng đến URL mới
      window.location.href = currentUrl.toString();
    },

    handleKeyPress(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.handleSearch();
      }
    },

    handleBlur() {
      // Chỉ search khi blur nếu có keyword
      if (this.searchKeyword.trim()) {
        this.handleSearch();
      }
    }
  }));

  // ===========================================
  // CATEGORY DROPDOWN COMPONENT
  // ===========================================
  Alpine.data('categoryDropdownComponent', () => ({
    selectedCategory: 'Tất cả',
    isOpen: false,

    init() {
      // Lấy category từ URL params nếu có
      this.getCategoryFromUrl();
    },

    getCategoryFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryValue = urlParams.get('category');

      // Mapping category values to display names
      const categoryMapping = {
        '': 'Tất cả',
        'viec-lam': 'Việc làm',
        'bat-dong-san': 'Bất động sản',
        'dich-vu-thanh-vien': 'Dịch vụ thành viên',
        'dia-diem': 'Địa điểm'
      };

      if (categoryValue && categoryMapping[categoryValue]) {
        this.selectedCategory = categoryMapping[categoryValue];
      }
    },

    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },

    selectCategory(categoryValue, categoryName) {
      this.selectedCategory = categoryName;
      this.isOpen = false;
      this.updateUrlWithCategory(categoryValue);
    },

    updateUrlWithCategory(categoryValue) {
      const currentUrl = new URL(window.location.href);

      if (categoryValue) {
        currentUrl.searchParams.set('category', categoryValue);
      } else {
        currentUrl.searchParams.delete('category');
      }

      // Chuyển hướng đến URL mới
      window.location.href = currentUrl.toString();
    },

    closeDropdown() {
      this.isOpen = false;
    }
  }));

  // ===========================================
  // SORT DROPDOWN COMPONENT
  // ===========================================
  Alpine.data('sortDropdownComponent', () => ({
    selectedSort: 'Mới tham gia',
    isOpen: false,

    init() {
      // Lấy sort từ URL params nếu có
      this.getSortFromUrl();
    },

    getSortFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const sortValue = urlParams.get('sort');

      // Mapping sort values to display names
      const sortMapping = {
        'new-member': 'Mới tham gia',
        'long-time-member': 'Tham gia lâu',
        'name-asc': 'Tên A → Z',
        'name-desc': 'Tên Z → A',
        'members-desc': 'Thành viên (nhiều → ít)',
        'members-asc': 'Thành viên (ít → nhiều)'
      };

      if (sortValue && sortMapping[sortValue]) {
        this.selectedSort = sortMapping[sortValue];
      }
    },

    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },

    selectSort(sortValue, sortName) {
      this.selectedSort = sortName;
      this.isOpen = false;
      this.updateUrlWithSort(sortValue);
    },

    updateUrlWithSort(sortValue) {
      const currentUrl = new URL(window.location.href);

      if (sortValue) {
        currentUrl.searchParams.set('sort', sortValue);
      } else {
        currentUrl.searchParams.delete('sort');
      }

      // Chuyển hướng đến URL mới
      window.location.href = currentUrl.toString();
    },

    closeDropdown() {
      this.isOpen = false;
    }
  }));

  // ===========================================
  // VIEW TOGGLE COMPONENT
  // ===========================================
  Alpine.data('viewToggleComponent', () => ({
    isGridView: true,

    init() {
      // Khởi tạo trạng thái ban đầu
      this.updateView();
    },

    toggleToGridView() {
      this.isGridView = true;
      this.updateView();
    },

    toggleToListView() {
      this.isGridView = false;
      this.updateView();
    },

    updateView() {
      const gridView = document.getElementById('group-grid');
      const listView = document.getElementById('group-list');

      if (this.isGridView) {
        // Hiển thị grid, ẩn list
        if (gridView) gridView.classList.remove('hidden');
        if (listView) listView.classList.add('hidden');
      } else {
        // Hiển thị list, ẩn grid
        if (gridView) gridView.classList.add('hidden');
        if (listView) listView.classList.remove('hidden');
      }
    },

    getGridButtonClass() {
      const baseClass = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2";
      return this.isGridView ? baseClass + " btn-primary" : baseClass + " bg-white text-gray-500 border-gray-500 hover:bg-primary/90 hover:text-white";
    },

    getListButtonClass() {
      const baseClass = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2";
      return !this.isGridView ? baseClass + " btn-primary" : baseClass + " bg-white text-gray-500 border-gray-500 hover:bg-primary/90 hover:text-white";
    }
  }));

  // ===========================================
  // PAGINATION COMPONENT
  // ===========================================
  Alpine.data('paginationComponent', () => ({
    currentPage: 1,
    totalPages: 3,

    init() {
      // Lấy page từ URL params nếu có
      this.initializePaginationFromURL();
    },

    initializePaginationFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page');
      if (pageParam) {
        const page = parseInt(pageParam);
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePageInURL();
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePageInURL();
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePageInURL();
      }
    },

    updatePageInURL() {
      const url = new URL(window.location);
      if (this.currentPage > 1) {
        url.searchParams.set('page', this.currentPage);
      } else {
        url.searchParams.delete('page');
      }
      window.history.pushState({}, '', url);
    },

    isPageActive(page) {
      return this.currentPage === page;
    },

    isPrevDisabled() {
      return this.currentPage <= 1;
    },

    isNextDisabled() {
      return this.currentPage >= this.totalPages;
    }
  }));

  // ===========================================
  // SCOPE DROPDOWN COMPONENT
  // ===========================================
  Alpine.data('scopeDropdownComponent', () => ({
    selectedScope: 'Tất cả',
    isOpen: false,

    init() {
      // Lấy scope từ URL params nếu có
      this.getScopeFromUrl();
    },

    getScopeFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const scopeParam = urlParams.get('scope');

      if (scopeParam) {
        const scopeMapping = {
          'public': 'Công khai',
          'private': 'Riêng tư'
        };
        this.selectedScope = scopeMapping[scopeParam] || 'Tất cả';
      } else {
        this.selectedScope = 'Tất cả';
      }
    },

    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },

    selectScope(scopeValue, scopeName) {
      this.selectedScope = scopeName;
      this.isOpen = false;
      this.updateUrlWithScope(scopeValue);
    },

    updateUrlWithScope(scopeValue) {
      const url = new URL(window.location);
      if (scopeValue) {
        url.searchParams.set('scope', scopeValue);
      } else {
        url.searchParams.delete('scope');
      }
      window.location.href = url.toString();
    },

    closeDropdown() {
      this.isOpen = false;
    }
  }));
});
