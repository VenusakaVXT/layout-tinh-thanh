// Alpine.js component for location search functionality
document.addEventListener('alpine:init', () => {
  Alpine.data('locationSearch', () => ({
    keyword: '',
    selectedSort: 'Liên quan',
    showSortDropdown: false,
    selectedPageSize: '12',
    showPageSizeDropdown: false,
    selectedCategory: 'Tất cả danh mục',
    showCategoryDropdown: false,
    selectedProvince: 'Chọn tỉnh/thành phố',
    showProvinceDropdown: false,
    selectedTransport: 'Xe máy',
    showTransportDropdown: false,
    maxDistance: '',
    selectedPriceLevels: [],
    selectedAmenities: [],
    isOpenNow: false,
    minRating: 0,
    isRatingDragging: false,
    currentLat: null,
    currentLng: null,
    isGettingLocation: false,
    manualLat: '',
    manualLng: '',
    isManualLocation: false,
    currentPage: 1,
    totalPages: 5,

    init() {
      // Get keyword from URL params on page load
      const urlParams = new URLSearchParams(window.location.search);
      this.keyword = urlParams.get('keyword') || '';

      // Initialize sort from URL params
      const sortParam = urlParams.get('sort');
      const sortMap = {
        'relevance': 'Liên quan',
        'nearest': 'Gần nhất',
        'rating-desc': 'Đánh giá cao → thấp',
        'rating-asc': 'Đánh giá thấp → cao',
        'price-desc': 'Giá cao → thấp',
        'price-asc': 'Giá thấp → cao',
        'newest': 'Mới nhất',
        'popular': 'Phổ biến'
      };
      this.selectedSort = sortMap[sortParam] || 'Liên quan';

      // Initialize page size from URL params
      const pageSizeParam = urlParams.get('page-size');
      this.selectedPageSize = pageSizeParam || '12';

      // Initialize category from URL params
      const categoryParam = urlParams.get('category');
      const categoryMap = {
        'mua-sam': 'Mua sắm',
        'an-uong': 'Ăn uống',
        'du-lich': 'Du lịch',
        'y-te': 'Y tế',
        'giao-duc': 'Giáo dục',
        'ngan-hang': 'Ngân hàng',
        'giao-thong': 'Giao thông',
        'hanh-chinh': 'Hành chính'
      };
      this.selectedCategory = categoryMap[categoryParam] || 'Tất cả danh mục';

      // Initialize province from URL params
      const provinceParam = urlParams.get('province');
      const provinceMap = {
        'ho-chi-minh': 'TP. Hồ Chí Minh',
        'ha-noi': 'Hà Nội',
        'da-nang': 'Đà Nẵng',
        'can-tho': 'Cần Thơ',
        'binh-duong': 'Bình Dương',
        'dong-nai': 'Đồng Nai',
        'long-an': 'Long An',
        'tay-ninh': 'Tây Ninh'
      };
      this.selectedProvince = provinceMap[provinceParam] || 'Chọn tỉnh/thành phố';

      // Initialize transport from URL params
      const modeParam = urlParams.get('mode');
      const transportMap = {
        'walk': 'Đi bộ',
        'bike': 'Xe đạp',
        'motorbike': 'Xe máy',
        'car': 'Ô tô',
        'bus': 'Xe buýt'
      };
      this.selectedTransport = transportMap[modeParam] || 'Xe máy';

      // Initialize max distance from URL params
      const maxDistanceParam = urlParams.get('max-distance');
      this.maxDistance = maxDistanceParam || '';

      // Initialize price levels from URL params
      const priceLevelParam = urlParams.get('price-level');
      if (priceLevelParam) {
        this.selectedPriceLevels = priceLevelParam.split(',').map(level => parseInt(level));
      } else {
        this.selectedPriceLevels = [];
      }

      // Initialize amenities from URL params
      const amenitiesParam = urlParams.get('amenities');
      if (amenitiesParam) {
        this.selectedAmenities = amenitiesParam.split(',');
      } else {
        this.selectedAmenities = [];
      }

      // Initialize open now from URL params
      const openNowParam = urlParams.get('open-now');
      this.isOpenNow = openNowParam === 'true';

      // Initialize min rating from URL params
      const minRatingParam = urlParams.get('min-rating');
      this.minRating = minRatingParam ? parseFloat(minRatingParam) : 0;

      // Initialize location from URL params
      const latParam = urlParams.get('lat');
      const lngParam = urlParams.get('lng');
      this.currentLat = latParam ? parseFloat(latParam) : null;
      this.currentLng = lngParam ? parseFloat(lngParam) : null;

      // Initialize manual coordinates from URL params
      this.manualLat = latParam || '';
      this.manualLng = lngParam || '';

      // Initialize pagination from URL params
      const pageParam = urlParams.get('page');
      this.currentPage = pageParam ? parseInt(pageParam) : 1;
    },

    handleSearch(event) {
      if (event) {
        event.preventDefault();
      }
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
        'Gần nhất': 'nearest',
        'Đánh giá cao → thấp': 'rating-desc',
        'Đánh giá thấp → cao': 'rating-asc',
        'Giá cao → thấp': 'price-desc',
        'Giá thấp → cao': 'price-asc',
        'Mới nhất': 'newest',
        'Phổ biến': 'popular'
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
      if (pageSize && pageSize !== '12') {
        url.searchParams.set('page-size', pageSize);
      } else {
        url.searchParams.delete('page-size');
      }
      window.history.pushState({}, '', url);
    },

    getPageSizeDisplayValue() {
      return this.selectedPageSize;
    },

    // Category dropdown functions
    toggleCategoryDropdown() {
      this.showCategoryDropdown = !this.showCategoryDropdown;
    },

    selectCategory(category) {
      this.selectedCategory = category;
      this.showCategoryDropdown = false;
      this.updateCategoryInURL(category);
    },

    updateCategoryInURL(category) {
      const url = new URL(window.location);
      const categorySlugMap = {
        'Tất cả danh mục': '',
        'Mua sắm': 'mua-sam',
        'Ăn uống': 'an-uong',
        'Du lịch': 'du-lich',
        'Y tế': 'y-te',
        'Giáo dục': 'giao-duc',
        'Ngân hàng': 'ngan-hang',
        'Giao thông': 'giao-thong',
        'Hành chính': 'hanh-chinh'
      };

      const categorySlug = categorySlugMap[category];
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

    // Province dropdown functions
    toggleProvinceDropdown() {
      this.showProvinceDropdown = !this.showProvinceDropdown;
    },

    selectProvince(province) {
      this.selectedProvince = province;
      this.showProvinceDropdown = false;
      this.updateProvinceInURL(province);
    },

    updateProvinceInURL(province) {
      const url = new URL(window.location);
      const provinceSlugMap = {
        'Chọn tỉnh/thành phố': '',
        'Tất cả tỉnh/thành phố': '',
        'TP. Hồ Chí Minh': 'ho-chi-minh',
        'Hà Nội': 'ha-noi',
        'Đà Nẵng': 'da-nang',
        'Cần Thơ': 'can-tho',
        'Bình Dương': 'binh-duong',
        'Đồng Nai': 'dong-nai',
        'Long An': 'long-an',
        'Tây Ninh': 'tay-ninh'
      };

      const provinceSlug = provinceSlugMap[province];
      if (provinceSlug) {
        url.searchParams.set('province', provinceSlug);
      } else {
        url.searchParams.delete('province');
      }
      window.history.pushState({}, '', url);
    },

    getProvinceDisplayValue() {
      return this.selectedProvince;
    },

    // Transport dropdown functions
    toggleTransportDropdown() {
      this.showTransportDropdown = !this.showTransportDropdown;
    },

    selectTransport(transport) {
      this.selectedTransport = transport;
      this.showTransportDropdown = false;
      this.updateTransportInURL(transport);
    },

    updateTransportInURL(transport) {
      const url = new URL(window.location);
      const transportModeMap = {
        'Đi bộ': 'walk',
        'Xe đạp': 'bike',
        'Xe máy': 'motorbike',
        'Ô tô': 'car',
        'Xe buýt': 'bus'
      };

      const modeParam = transportModeMap[transport];
      if (modeParam && modeParam !== 'motorbike') {
        url.searchParams.set('mode', modeParam);
      } else {
        url.searchParams.delete('mode');
      }
      window.history.pushState({}, '', url);
    },

    getTransportDisplayValue() {
      return this.selectedTransport;
    },

    // Max distance functions
    updateMaxDistanceInURL() {
      const url = new URL(window.location);
      if (this.maxDistance && this.maxDistance.trim() !== '') {
        url.searchParams.set('max-distance', this.maxDistance.trim());
      } else {
        url.searchParams.delete('max-distance');
      }
      window.history.pushState({}, '', url);
    },

    // Price level functions
    togglePriceLevel(level) {
      const index = this.selectedPriceLevels.indexOf(level);
      if (index > -1) {
        this.selectedPriceLevels.splice(index, 1);
      } else {
        this.selectedPriceLevels.push(level);
      }
      this.updatePriceLevelsInURL();
    },

    isPriceLevelSelected(level) {
      return this.selectedPriceLevels.includes(level);
    },

    updatePriceLevelsInURL() {
      const url = new URL(window.location);
      if (this.selectedPriceLevels.length > 0) {
        const sortedLevels = [...this.selectedPriceLevels].sort((a, b) => a - b);
        url.searchParams.set('price-level', sortedLevels.join(','));
      } else {
        url.searchParams.delete('price-level');
      }
      window.history.pushState({}, '', url);
    },

    // Amenities functions
    toggleAmenity(amenity) {
      const index = this.selectedAmenities.indexOf(amenity);
      if (index > -1) {
        this.selectedAmenities.splice(index, 1);
      } else {
        this.selectedAmenities.push(amenity);
      }
      this.updateAmenitiesInURL();
    },

    isAmenitySelected(amenity) {
      return this.selectedAmenities.includes(amenity);
    },

    updateAmenitiesInURL() {
      const url = new URL(window.location);
      if (this.selectedAmenities.length > 0) {
        url.searchParams.set('amenities', this.selectedAmenities.join(','));
      } else {
        url.searchParams.delete('amenities');
      }
      window.history.pushState({}, '', url);
    },

    // Open now switch functions
    toggleOpenNow() {
      this.isOpenNow = !this.isOpenNow;
      this.updateOpenNowInURL();
    },

    updateOpenNowInURL() {
      const url = new URL(window.location);
      if (this.isOpenNow) {
        url.searchParams.set('open-now', 'true');
      } else {
        url.searchParams.delete('open-now');
      }
      window.history.pushState({}, '', url);
    },

    // Rating slider functions
    getRatingPercentage() {
      return (this.minRating / 5) * 100;
    },

    getRatingDisplayValue() {
      return this.minRating.toFixed(1);
    },

    onRatingChange(event) {
      this.minRating = parseFloat(event.target.value);
      this.updateMinRatingInURL();
    },

    onRatingMouseMove(event) {
      if (!this.isRatingDragging) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      this.minRating = Math.round((percentage / 100) * 50) / 10; // Round to nearest 0.1
      this.updateMinRatingInURL();
    },

    onRatingDragStart() {
      this.isRatingDragging = true;
    },

    onRatingDragEnd() {
      this.isRatingDragging = false;
    },

    onRatingMouseUp() {
      this.isRatingDragging = false;
    },

    updateMinRatingInURL() {
      const url = new URL(window.location);
      if (this.minRating > 0) {
        url.searchParams.set('min-rating', this.minRating.toString());
      } else {
        url.searchParams.delete('min-rating');
      }
      window.history.pushState({}, '', url);
    },

    // Geolocation functions
    getCurrentLocation() {
      if (!navigator.geolocation) {
        alert('Trình duyệt của bạn không hỗ trợ định vị địa lý.');
        return;
      }

      // Don't override manual coordinates
      if (this.isManualLocation) {
        alert('Tọa độ thủ công đang được sử dụng. Vui lòng xóa tọa độ thủ công trước khi sử dụng vị trí hiện tại.');
        return;
      }

      this.isGettingLocation = true;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLat = position.coords.latitude;
          this.currentLng = position.coords.longitude;
          this.isManualLocation = false;
          this.updateLocationInURL();
          this.isGettingLocation = false;
          console.log('Vị trí hiện tại:', this.currentLat, this.currentLng);
        },
        (error) => {
          this.isGettingLocation = false;
          let errorMessage = 'Không thể lấy vị trí hiện tại.';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Bạn đã từ chối quyền truy cập vị trí.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Thông tin vị trí không khả dụng.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Yêu cầu lấy vị trí đã hết thời gian chờ.';
              break;
          }

          alert(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    },

    updateLocationInURL() {
      const url = new URL(window.location);
      if (this.currentLat !== null && this.currentLng !== null) {
        url.searchParams.set('lat', this.currentLat.toString());
        url.searchParams.set('lng', this.currentLng.toString());

        // Update manual coordinates display if using manual location
        if (this.isManualLocation) {
          this.manualLat = this.currentLat.toString();
          this.manualLng = this.currentLng.toString();
        }
      } else {
        url.searchParams.delete('lat');
        url.searchParams.delete('lng');
        this.manualLat = '';
        this.manualLng = '';
        this.isManualLocation = false;
      }
      window.history.pushState({}, '', url);
    },

    clearLocation() {
      this.currentLat = null;
      this.currentLng = null;
      this.manualLat = '';
      this.manualLng = '';
      this.isManualLocation = false;
      this.updateLocationInURL();
    },

    // Manual coordinates functions
    setManualLocation() {
      const lat = parseFloat(this.manualLat);
      const lng = parseFloat(this.manualLng);

      // Validate coordinates
      if (isNaN(lat) || isNaN(lng)) {
        alert('Vui lòng nhập tọa độ hợp lệ.');
        return;
      }

      if (lat < -90 || lat > 90) {
        alert('Vĩ độ phải nằm trong khoảng -90 đến 90.');
        return;
      }

      if (lng < -180 || lng > 180) {
        alert('Kinh độ phải nằm trong khoảng -180 đến 180.');
        return;
      }

      // Set manual coordinates with priority
      this.currentLat = lat;
      this.currentLng = lng;
      this.isManualLocation = true;
      this.updateLocationInURL();

    }
  }));
});
