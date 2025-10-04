// Alpine.js component for news search functionality
document.addEventListener('alpine:init', () => {
  Alpine.data('newsSearch', () => ({
    keyword: '',
    selectedSort: 'Liên quan',
    showSortDropdown: false,
    selectedPageSize: 12,
    showPageSizeDropdown: false,
    selectedCategory: 'Tất cả chuyên mục',
    showCategoryDropdown: false,
    categoryMap: {
      'Tất cả chuyên mục': '',
      'Dân Sinh': 'dan-sinh',
      'Giao Thông': 'giao-thong',
      'Giáo Dục': 'giao-duc',
      'Khởi Nghiệp': 'khoi-nghiep',
      'Kinh Tế': 'kinh-te',
      'Môi Trường': 'moi-truong',
      'Thương Mại': 'thuong-mai',
      'Thể Thao': 'the-thao',
      'Văn Hóa': 'van-hoa',
      'Y Tế': 'y-te',
      'Ẩm Thực': 'am-thuc'
    },
    selectedSource: 'Tất cả các nguồn',
    showSourceDropdown: false,
    sourceMap: {
      'Tất cả các nguồn': '',
      'Báo Bình Dương': 'bao-binh-duong',
      'Cafeland': 'cafeland',
      'Dân Trí': 'dan-tri',
      'Giáo Dục & Thời Đại': 'giao-duc-thoi-dai',
      'Sức Khỏe & Đời Sống': 'suc-khoe-doi-song',
      'Thanh Niên': 'thanh-nien',
      'Thể Thao & Văn Hóa': 'the-thao-van-hoa',
      'Tuổi Trẻ': 'tuoi-tre',
      'VietnamNet': 'vietnamnet',
      'VnExpress': 'vnexpress'
    },
    selectedAuthor: 'Tất cả tác giả',
    showAuthorDropdown: false,
    authorMap: {
      'Tất cả tác giả': '',
      'Nguyễn Văn A': 'nguyen-van-a',
      'Trần Thị B': 'tran-thi-b',
      'Lê Văn C': 'le-van-c',
      'Phạm Thị D': 'pham-thi-d',
      'Hoàng Văn E': 'hoang-van-e',
      'Vũ Thị F': 'vu-thi-f',
      'Đặng Văn G': 'dang-van-g',
      'Bùi Thị H': 'bui-thi-h',
      'Phan Văn I': 'phan-van-i',
      'Võ Thị K': 'vo-thi-k'
    },
    selectedType: 'Tất cả loại',
    showTypeDropdown: false,
    typeMap: {
      'Tất cả loại': '',
      'Bài báo': 'bai-bao',
      'Video': 'video',
      'Hình ảnh': 'hinh-anh',
      'Ý kiến': 'y-kien',
      'Phân tích': 'phan-tich'
    },

    // Date range variables
    dateFrom: '',
    dateTo: '',
    dateError: '',

    // Error messages
    dateErrors: {
      startDateFuture: 'Ngày bắt đầu không được lớn hơn ngày hiện tại',
      endDateFuture: 'Ngày kết thúc không được lớn hơn ngày hiện tại',
      endBeforeStart: 'Ngày kết thúc không được nhỏ hơn ngày bắt đầu'
    },

    // Tags variables
    selectedTags: [],
    tagMap: {
      'FDI': 'fdi',
      'bất động sản': 'bat-dong-san',
      'chất lượng': 'chat-luong',
      'công nghệ': 'cong-nghe',
      'cầu vượt': 'cau-vuot',
      'du lịch': 'du-lich',
      'dân sinh': 'dan-sinh',
      'giao thông': 'giao-thong',
      'giáo dục': 'giao-duc',
      'giải thưởng': 'giai-thuong',
      'giải trí': 'giai-tri',
      'hạ tầng': 'ha-tang',
      'khu công nghiệp': 'khu-cong-nghiep',
      'khu đô thị': 'khu-do-thi',
      'khởi nghiệp': 'khoi-nghiep'
    },

    // Special filters variables
    hasVideo: false,
    popular: false,
    breaking: false,

    // Pagination variables
    currentPage: 1,
    totalPages: 5,

    // Applied filters
    appliedFilters: [],

    init() {
      // Get keyword from URL params on page load
      const urlParams = new URLSearchParams(window.location.search);
      this.keyword = urlParams.get('keyword') || '';

      // Initialize sort from URL params
      const sortParam = urlParams.get('sort');
      const sortMap = {
        'newest': 'Mới nhất',
        'oldest': 'Cũ nhất',
        'views-desc': 'Lượt xem cao → thấp',
        'views-asc': 'Lượt xem thấp → cao',
        'comments-desc': 'Bình luận nhiều → ít',
        'comments-asc': 'Bình luận ít → nhiều',
        'popular': 'Nổi bật'
      };
      this.selectedSort = sortMap[sortParam] || 'Liên quan';

      // Initialize page size from URL params
      const pageSizeParam = urlParams.get('page-size');
      if (pageSizeParam) {
        const pageSize = parseInt(pageSizeParam);
        if ([12, 24, 48].includes(pageSize)) {
          this.selectedPageSize = pageSize;
        }
      }

      // Initialize category from URL params
      const categoryParam = urlParams.get('category');
      if (categoryParam) {
        // Find category name from slug
        const categoryName = Object.keys(this.categoryMap).find(name =>
          this.categoryMap[name] === categoryParam
        );
        this.selectedCategory = categoryName || 'Tất cả chuyên mục';
      }

      // Initialize source from URL params
      const sourceParam = urlParams.get('source');
      if (sourceParam) {
        // Find source name from slug
        const sourceName = Object.keys(this.sourceMap).find(name =>
          this.sourceMap[name] === sourceParam
        );
        this.selectedSource = sourceName || 'Tất cả các nguồn';
      }

      // Initialize author from URL params
      const authorParam = urlParams.get('author');
      if (authorParam) {
        // Find author name from slug
        const authorName = Object.keys(this.authorMap).find(name =>
          this.authorMap[name] === authorParam
        );
        this.selectedAuthor = authorName || 'Tất cả tác giả';
      }

      // Initialize type from URL params
      const typeParam = urlParams.get('type');
      if (typeParam) {
        // Find type name from slug
        const typeName = Object.keys(this.typeMap).find(name =>
          this.typeMap[name] === typeParam
        );
        this.selectedType = typeName || 'Tất cả loại';
      }

      // Initialize date range from URL params
      const dateFromParam = urlParams.get('date-from');
      const dateToParam = urlParams.get('date-to');

      // Convert from dd-mm-yyyy (URL format) to yyyy-mm-dd (input format)
      this.dateFrom = dateFromParam ? this.parseDateFromURL(dateFromParam) : '';
      this.dateTo = dateToParam ? this.parseDateFromURL(dateToParam) : '';

      // Validate date range on page load and clean up invalid parameters
      if (this.dateFrom || this.dateTo) {
        this.validateAndCleanupDateParams();
      }

      // Initialize tags from URL params
      const tagsParam = urlParams.get('tags');
      if (tagsParam) {
        const tagSlugs = tagsParam.split(',');
        this.selectedTags = tagSlugs.map(slug => {
          // Find tag name from slug
          const tagName = Object.keys(this.tagMap).find(name =>
            this.tagMap[name] === slug
          );
          return tagName;
        }).filter(Boolean); // Remove undefined values
      }

      // Initialize special filters from URL params
      this.hasVideo = urlParams.get('has-video') === 'true';
      this.popular = urlParams.get('popular') === 'true';
      this.breaking = urlParams.get('breaking') === 'true';

      // Initialize pagination from URL params
      const pageParam = urlParams.get('page');
      this.currentPage = pageParam ? parseInt(pageParam) : 1;

      // Initialize applied filters
      this.updateAppliedFilters();
    },

    handleSearch(event) {
      event.preventDefault();
      this.search();
    },

    handleKeyPress(event) {
      if (event.key === 'Enter') {
        this.search();
      }
    },

    search() {
      // Get current URL without search params
      const url = new URL(window.location);

      // Clear existing search params
      url.search = '';

      // Add new search params
      if (this.keyword.trim()) {
        url.searchParams.set('keyword', this.keyword.trim());
      }

      // Update URL
      window.history.pushState({}, '', url);
    },

    clearSearch() {
      // Clear the keyword input
      this.keyword = '';

      // Get current URL without search params
      const url = new URL(window.location);

      // Remove keyword parameter from URL
      url.searchParams.delete('keyword');

      // Update URL
      window.history.pushState({}, '', url);
    },

    // Sort dropdown functions
    toggleSortDropdown() {
      this.showSortDropdown = !this.showSortDropdown;
    },

    selectSort(sortOption) {
      this.selectedSort = sortOption;
      this.showSortDropdown = false;
      this.updateSortInURL(sortOption);
    },

    updateSortInURL(sortOption) {
      const url = new URL(window.location);
      const sortParamMap = {
        'Liên quan': '',
        'Mới nhất': 'newest',
        'Cũ nhất': 'oldest',
        'Lượt xem cao → thấp': 'views-desc',
        'Lượt xem thấp → cao': 'views-asc',
        'Bình luận nhiều → ít': 'comments-desc',
        'Bình luận ít → nhiều': 'comments-asc',
        'Nổi bật': 'popular'
      };

      const sortParam = sortParamMap[sortOption];
      if (sortParam) {
        url.searchParams.set('sort', sortParam);
      } else {
        url.searchParams.delete('sort');
      }

      window.history.pushState({}, '', url);
    },

    getSortDisplayValue() {
      return this.selectedSort;
    },

    // Page size dropdown functions
    togglePageSizeDropdown() {
      this.showPageSizeDropdown = !this.showPageSizeDropdown;
    },

    selectPageSize(pageSize) {
      this.selectedPageSize = pageSize;
      this.showPageSizeDropdown = false;
      this.updatePageSizeInURL(pageSize);
    },

    updatePageSizeInURL(pageSize) {
      const url = new URL(window.location);
      if (pageSize && pageSize !== 12) {
        url.searchParams.set('page-size', pageSize.toString());
      } else {
        url.searchParams.delete('page-size');
      }
      window.history.pushState({}, '', url);
    },

    getPageSizeDisplayValue() {
      return this.selectedPageSize + ' bài/trang';
    },

    // Category dropdown functions
    toggleCategoryDropdown() {
      this.showCategoryDropdown = !this.showCategoryDropdown;
    },

    selectCategory(categoryName) {
      this.selectedCategory = categoryName;
      this.showCategoryDropdown = false;
      this.updateCategoryInURL(categoryName);
      this.updateAppliedFilters();
    },

    updateCategoryInURL(categoryName) {
      const url = new URL(window.location);
      const categorySlug = this.categoryMap[categoryName];
      if (categorySlug) {
        url.searchParams.set('category', categorySlug);
      } else {
        url.searchParams.delete('category');
      }
      window.history.pushState({}, '', url);
    },

    getCategoryDisplayValue() {
      return this.selectedCategory;
    },

    // Source dropdown functions
    toggleSourceDropdown() {
      this.showSourceDropdown = !this.showSourceDropdown;
    },

    selectSource(sourceName) {
      this.selectedSource = sourceName;
      this.showSourceDropdown = false;
      this.updateSourceInURL(sourceName);
      this.updateAppliedFilters();
    },

    updateSourceInURL(sourceName) {
      const url = new URL(window.location);
      const sourceSlug = this.sourceMap[sourceName];
      if (sourceSlug) {
        url.searchParams.set('source', sourceSlug);
      } else {
        url.searchParams.delete('source');
      }
      window.history.pushState({}, '', url);
    },

    getSourceDisplayValue() {
      return this.selectedSource;
    },

    // Author dropdown functions
    toggleAuthorDropdown() {
      this.showAuthorDropdown = !this.showAuthorDropdown;
    },

    selectAuthor(authorName) {
      this.selectedAuthor = authorName;
      this.showAuthorDropdown = false;
      this.updateAuthorInURL(authorName);
      this.updateAppliedFilters();
    },

    updateAuthorInURL(authorName) {
      const url = new URL(window.location);
      const authorSlug = this.authorMap[authorName];
      if (authorSlug) {
        url.searchParams.set('author', authorSlug);
      } else {
        url.searchParams.delete('author');
      }
      window.history.pushState({}, '', url);
    },

    getAuthorDisplayValue() {
      return this.selectedAuthor;
    },

    // Type dropdown functions
    toggleTypeDropdown() {
      this.showTypeDropdown = !this.showTypeDropdown;
    },

    selectType(typeName) {
      this.selectedType = typeName;
      this.showTypeDropdown = false;
      this.updateTypeInURL(typeName);
      this.updateAppliedFilters();
    },

    updateTypeInURL(typeName) {
      const url = new URL(window.location);
      const typeSlug = this.typeMap[typeName];
      if (typeSlug) {
        url.searchParams.set('type', typeSlug);
      } else {
        url.searchParams.delete('type');
      }
      window.history.pushState({}, '', url);
    },

    getTypeDisplayValue() {
      return this.selectedType;
    },

    // Date range functions
    handleDateFromChange() {
      this.dateError = '';
      this.validateDateRange();
      this.updateDateFromInURL();
      this.updateAppliedFilters();
    },

    handleDateToChange() {
      this.dateError = '';
      this.validateDateRange();
      this.updateDateToInURL();
      this.updateAppliedFilters();
    },

    validateAndCleanupDateParams() {
      // Clear any existing error
      this.dateError = '';

      // Validate the date range
      const isValid = this.validateDateRange();

      if (!isValid) {
        // If validation fails, clean up the URL and clear invalid dates
        const url = new URL(window.location);
        let needsUpdate = false;

        // Check what type of error occurred and clean up accordingly
        if (this.dateError.includes(this.dateErrors.startDateFuture)) {
          // Clear dateFrom if it's in the future
          this.dateFrom = '';
          url.searchParams.delete('date-from');
          needsUpdate = true;
        }

        if (this.dateError.includes(this.dateErrors.endDateFuture)) {
          // Clear dateTo if it's in the future
          this.dateTo = '';
          url.searchParams.delete('date-to');
          needsUpdate = true;
        }

        if (this.dateError.includes(this.dateErrors.endBeforeStart)) {
          // Clear both dates if dateTo < dateFrom
          this.dateFrom = '';
          this.dateTo = '';
          url.searchParams.delete('date-from');
          url.searchParams.delete('date-to');
          needsUpdate = true;
        }

        // Update URL if needed
        if (needsUpdate) {
          window.history.replaceState({}, '', url);
        }
      }
    },

    validateDateRange() {
      // Get current date in Vietnam timezone (UTC+7)
      const now = new Date();
      const vietnamOffset = 7 * 60; // Vietnam is UTC+7
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const vietnamTime = new Date(utc + (vietnamOffset * 60000));

      // Get today's date in Vietnam timezone
      const today = new Date(vietnamTime.getFullYear(), vietnamTime.getMonth(), vietnamTime.getDate());

      // Get tomorrow's date (24 hours from now)
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Check if dateFrom is provided and valid
      if (this.dateFrom) {
        const fromDate = new Date(this.dateFrom);
        if (fromDate >= tomorrow) {
          this.dateError = this.dateErrors.startDateFuture;
          return false;
        }
      }

      // Check if dateTo is provided and valid
      if (this.dateTo) {
        const toDate = new Date(this.dateTo);
        if (toDate >= tomorrow) {
          this.dateError = this.dateErrors.endDateFuture;
          return false;
        }
      }

      // Check if both dates are provided and dateTo is not before dateFrom
      if (this.dateFrom && this.dateTo) {
        const fromDate = new Date(this.dateFrom);
        const toDate = new Date(this.dateTo);

        if (toDate < fromDate) {
          this.dateError = this.dateErrors.endBeforeStart;
          return false;
        }
      }

      return true;
    },

    // Helper function to convert yyyy-mm-dd to dd-mm-yyyy
    formatDateForURL(dateString) {
      if (!dateString) return '';
      const [year, month, day] = dateString.split('-');
      return `${day}-${month}-${year}`;
    },

    // Helper function to convert dd-mm-yyyy to yyyy-mm-dd
    parseDateFromURL(dateString) {
      if (!dateString) return '';
      const [day, month, year] = dateString.split('-');
      return `${year}-${month}-${day}`;
    },

    updateDateFromInURL() {
      if (!this.validateDateRange()) {
        return; // Don't update URL if validation fails
      }

      const url = new URL(window.location);
      if (this.dateFrom) {
        const formattedDate = this.formatDateForURL(this.dateFrom);
        url.searchParams.set('date-from', formattedDate);
      } else {
        url.searchParams.delete('date-from');
      }
      window.history.pushState({}, '', url);
    },

    updateDateToInURL() {
      if (!this.validateDateRange()) {
        return; // Don't update URL if validation fails
      }

      const url = new URL(window.location);
      if (this.dateTo) {
        const formattedDate = this.formatDateForURL(this.dateTo);
        url.searchParams.set('date-to', formattedDate);
      } else {
        url.searchParams.delete('date-to');
      }
      window.history.pushState({}, '', url);
    },

    // Tags functions
    toggleTag(tagName) {
      const index = this.selectedTags.indexOf(tagName);
      if (index > -1) {
        // Remove tag if already selected
        this.selectedTags.splice(index, 1);
      } else {
        // Add tag if not selected
        this.selectedTags.push(tagName);
      }
      this.updateTagsInURL();
      this.updateAppliedFilters();
    },

    isTagSelected(tagName) {
      return this.selectedTags.includes(tagName);
    },

    updateTagsInURL() {
      const url = new URL(window.location);

      if (this.selectedTags.length > 0) {
        // Convert tag names to slugs
        const tagSlugs = this.selectedTags.map(tagName => this.tagMap[tagName]).filter(Boolean);
        url.searchParams.set('tags', tagSlugs.join(','));
      } else {
        url.searchParams.delete('tags');
      }

      window.history.pushState({}, '', url);
    },

    // Special filters functions
    toggleHasVideo() {
      this.hasVideo = !this.hasVideo;
      this.updateSpecialFilterInURL('has-video', this.hasVideo);
      this.updateAppliedFilters();
    },

    togglePopular() {
      this.popular = !this.popular;
      this.updateSpecialFilterInURL('popular', this.popular);
      this.updateAppliedFilters();
    },

    toggleBreaking() {
      this.breaking = !this.breaking;
      this.updateSpecialFilterInURL('breaking', this.breaking);
      this.updateAppliedFilters();
    },

    updateSpecialFilterInURL(paramName, value) {
      const url = new URL(window.location);

      if (value) {
        url.searchParams.set(paramName, 'true');
      } else {
        url.searchParams.delete(paramName);
      }

      window.history.pushState({}, '', url);
    },

    // Pagination functions
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePageInURL();
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePageInURL();
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePageInURL();
      }
    },

    updatePageInURL() {
      const url = new URL(window.location);

      if (this.currentPage > 1) {
        url.searchParams.set('page', this.currentPage.toString());
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
    },

    hasActiveFilters() {
      return this.selectedCategory !== 'Tất cả chuyên mục' ||
        this.selectedSource !== 'Tất cả các nguồn' ||
        this.selectedAuthor !== 'Tất cả tác giả' ||
        this.selectedType !== 'Tất cả loại' ||
        this.dateFrom !== '' ||
        this.dateTo !== '' ||
        this.selectedTags.length > 0 ||
        this.hasVideo ||
        this.popular ||
        this.breaking;
    },

    updateAppliedFilters() {
      this.appliedFilters = [];

      // Category filter
      if (this.selectedCategory !== 'Tất cả chuyên mục') {
        this.appliedFilters.push({
          type: 'category',
          label: this.selectedCategory,
          clearFn: () => {
            this.selectedCategory = 'Tất cả chuyên mục';
            this.updateCategoryInURL('Tất cả chuyên mục');
            this.updateAppliedFilters();
          }
        });
      }

      // Source filter
      if (this.selectedSource !== 'Tất cả các nguồn') {
        this.appliedFilters.push({
          type: 'source',
          label: this.selectedSource,
          clearFn: () => {
            this.selectedSource = 'Tất cả các nguồn';
            this.updateSourceInURL('Tất cả các nguồn');
            this.updateAppliedFilters();
          }
        });
      }

      // Author filter
      if (this.selectedAuthor !== 'Tất cả tác giả') {
        this.appliedFilters.push({
          type: 'author',
          label: this.selectedAuthor,
          clearFn: () => {
            this.selectedAuthor = 'Tất cả tác giả';
            this.updateAuthorInURL('Tất cả tác giả');
            this.updateAppliedFilters();
          }
        });
      }

      // Type filter
      if (this.selectedType !== 'Tất cả loại') {
        this.appliedFilters.push({
          type: 'type',
          label: this.selectedType,
          clearFn: () => {
            this.selectedType = 'Tất cả loại';
            this.updateTypeInURL('Tất cả loại');
            this.updateAppliedFilters();
          }
        });
      }

      // Date range filter
      if (this.dateFrom !== '' || this.dateTo !== '') {
        let dateLabel = '';
        if (this.dateFrom && this.dateTo) {
          dateLabel = `Từ ${this.dateFrom} đến ${this.dateTo}`;
        } else if (this.dateFrom) {
          dateLabel = `Từ ${this.dateFrom}`;
        } else if (this.dateTo) {
          dateLabel = `Đến ${this.dateTo}`;
        }

        this.appliedFilters.push({
          type: 'date',
          label: dateLabel,
          clearFn: () => {
            this.dateFrom = '';
            this.dateTo = '';
            this.updateDateFromInURL();
            this.updateDateToInURL();
            this.updateAppliedFilters();
          }
        });
      }

      // Tags filters
      this.selectedTags.forEach(tagName => {
        this.appliedFilters.push({
          type: 'tag',
          label: `#${tagName}`,
          clearFn: () => {
            this.toggleTag(tagName);
            this.updateAppliedFilters();
          }
        });
      });

      // Special filters
      if (this.hasVideo) {
        this.appliedFilters.push({
          type: 'video',
          label: 'Có video',
          clearFn: () => {
            this.toggleHasVideo();
            this.updateAppliedFilters();
          }
        });
      }

      if (this.popular) {
        this.appliedFilters.push({
          type: 'popular',
          label: 'Nổi bật',
          clearFn: () => {
            this.togglePopular();
            this.updateAppliedFilters();
          }
        });
      }

      if (this.breaking) {
        this.appliedFilters.push({
          type: 'breaking',
          label: 'Tin nóng',
          clearFn: () => {
            this.toggleBreaking();
            this.updateAppliedFilters();
          }
        });
      }
    }
  }));
});