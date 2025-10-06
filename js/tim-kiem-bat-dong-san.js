// Alpine.js component for real estate search functionality
document.addEventListener('alpine:init', () => {
  Alpine.data('realEstateSearch', () => ({
    keyword: '',
    showItemsPerPageDropdown: false,
    showSortDropdown: false,
    sortBy: 'relevance',
    itemsPerPage: 12,
    selectedProvince: '',
    selectedDistrict: '',
    showProvinceDropdown: false,
    showDistrictDropdown: false,
    selectedRealEstateType: '',
    showRealEstateTypeDropdown: false,
    selectedFormType: '',
    showFormTypeDropdown: false,
    priceMin: '',
    priceMax: '',
    priceError: '',
    areaMin: 0,
    isDragging: false,
    selectedBedrooms: '',
    showBedroomsDropdown: false,
    selectedBathrooms: '',
    showBathroomsDropdown: false,
    selectedDirection: '',
    showDirectionDropdown: false,
    selectedAmenities: [],
    amenityMap: {
      'Hồ bơi': 'ho-boi',
      'Gym': 'gym',
      'Công viên': 'cong-vien',
      'Siêu thị': 'sieu-thi',
      'Trường học': 'truong-hoc',
      'Bệnh viện': 'benh-vien',
      'An ninh 24/7': 'an-ninh-24-7',
      'Thang máy': 'thang-may',
      'Hầm để xe': 'ham-de-xe',
      'Sân vườn': 'san-vuon',
      'Gần KCN': 'gan-kcn',
      'Mặt tiền rộng': 'mat-tien-rong',
      'Giao thông thuận lợi': 'giao-thong-thuan-loi'
    },
    amenitySlugToNameMap: {},
    currentPage: 1,
    totalPages: 5,
    currentView: 'grid', // 'grid' or 'list'

    init() {
      // Get keyword from URL params on page load
      const urlParams = new URLSearchParams(window.location.search);
      this.keyword = urlParams.get('keyword') || '';

      // Initialize from URL parameters
      this.initializeFromURL(urlParams);
    },

    initializeFromURL(urlParams) {
      // Initialize sort
      const sortParam = urlParams.get('sort');
      const sortMap = {
        'newest': 'newest',
        'price-desc': 'price-desc',
        'price-asc': 'price-asc',
        'area-desc': 'area-desc',
        'area-asc': 'area-asc'
      };
      this.sortBy = sortMap[sortParam] || 'relevance';

      // Initialize page size
      const pageSizeParam = urlParams.get('page-size');
      if (pageSizeParam) {
        const pageSize = parseInt(pageSizeParam);
        if ([12, 24, 48].includes(pageSize)) {
          this.itemsPerPage = pageSize;
        }
      }

      // Initialize location
      this.selectedProvince = urlParams.get('province') || '';
      this.selectedDistrict = urlParams.get('district') || '';

      // Initialize real estate type
      this.selectedRealEstateType = urlParams.get('real-estate-type') || '';

      // Initialize form type
      this.selectedFormType = urlParams.get('form-type') || '';

      // Initialize price range
      this.priceMin = urlParams.get('price-min') || '';
      this.priceMax = urlParams.get('price-max') || '';

      // Initialize area range
      const areaMinParam = urlParams.get('area-min');
      this.areaMin = areaMinParam ? parseInt(areaMinParam) : 0;

      // Initialize bedrooms
      this.selectedBedrooms = urlParams.get('bedrooms') || '';

      // Initialize bathrooms
      this.selectedBathrooms = urlParams.get('bathrooms') || '';

      // Initialize direction
      this.selectedDirection = urlParams.get('direction') || '';

      // Initialize amenities
      const amenitiesParam = urlParams.get('amenities');
      if (amenitiesParam) {
        this.selectedAmenities = amenitiesParam.split(',').map(slug =>
          decodeURIComponent(slug)
        );
      } else {
        this.selectedAmenities = [];
      }

      // Populate amenitySlugToNameMap for reverse lookup
      this.amenitySlugToNameMap = Object.entries(this.amenityMap).reduce((acc, [name, slug]) => {
        acc[slug] = name;
        return acc;
      }, {});

      // Initialize pagination
      const pageParam = urlParams.get('page');
      if (pageParam) {
        const page = parseInt(pageParam);
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
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

    handleKeyPress(event) {
      if (event.key === 'Enter') {
        this.search();
      }
    },

    clearKeyword() {
      // Clear the keyword input
      this.keyword = '';

      // Get current URL without search params
      const url = new URL(window.location);

      // Remove keyword parameter from URL
      url.searchParams.delete('keyword');

      // Update URL
      window.history.pushState({}, '', url);
    },

    // Dropdown functions - chỉ xử lý click logic
    toggleSortDropdown() {
      this.showSortDropdown = !this.showSortDropdown;
    },

    toggleItemsPerPageDropdown() {
      this.showItemsPerPageDropdown = !this.showItemsPerPageDropdown;
    },

    selectSortOption(value) {
      this.sortBy = value;
      this.showSortDropdown = false;
      this.updateSortInURL(value);
    },

    selectItemsPerPage(value) {
      this.itemsPerPage = value;
      this.showItemsPerPageDropdown = false;
      this.updatePageSizeInURL(value);
    },

    updateSortInURL(sortValue) {
      const url = new URL(window.location);
      const sortParamMap = {
        'relevance': '',
        'newest': 'newest',
        'price-desc': 'price-desc',
        'price-asc': 'price-asc',
        'area-desc': 'area-desc',
        'area-asc': 'area-asc'
      };

      const sortParam = sortParamMap[sortValue];
      if (sortParam) {
        url.searchParams.set('sort', sortParam);
      } else {
        url.searchParams.delete('sort');
      }

      window.history.pushState({}, '', url);
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

    getSortLabel() {
      const sortOptions = {
        'relevance': 'Liên quan',
        'newest': 'Mới nhất',
        'price-desc': 'Giá cao → thấp',
        'price-asc': 'Giá thấp → cao',
        'area-desc': 'Diện tích lớn → nhỏ',
        'area-asc': 'Diện tích nhỏ → lớn'
      };
      return sortOptions[this.sortBy] || 'Liên quan';
    },

    getItemsPerPageLabel() {
      return this.itemsPerPage.toString();
    },

    // Province and District functions
    toggleProvinceDropdown() {
      this.showProvinceDropdown = !this.showProvinceDropdown;
      if (this.showProvinceDropdown) {
        this.showDistrictDropdown = false;
      }
    },

    toggleDistrictDropdown() {
      if (this.selectedProvince) {
        this.showDistrictDropdown = !this.showDistrictDropdown;
        if (this.showDistrictDropdown) {
          this.showProvinceDropdown = false;
        }
      }
    },

    selectProvince(province) {
      this.selectedProvince = province;
      this.selectedDistrict = ''; // Reset district when province changes
      this.showProvinceDropdown = false;
      this.updateLocationInURL();

      // Dispatch event to update other components
      this.$dispatch('province-selected', { province });
    },

    selectDistrict(district) {
      this.selectedDistrict = district;
      this.showDistrictDropdown = false;
      this.updateLocationInURL();

      // Dispatch event to update other components
      this.$dispatch('district-selected', { district });
    },


    updateLocationInURL() {
      const url = new URL(window.location);

      // Remove existing location params
      url.searchParams.delete('province');
      url.searchParams.delete('district');

      // Add new location params
      if (this.selectedProvince) {
        url.searchParams.set('province', this.selectedProvince);
      }
      if (this.selectedDistrict) {
        url.searchParams.set('district', this.selectedDistrict);
      }

      window.history.pushState({}, '', url);
    },

    // Clear filter functions
    clearAllFilters() {
      this.selectedProvince = '';
      this.selectedDistrict = '';
      this.selectedRealEstateType = '';
      this.selectedFormType = '';
      this.priceMin = '';
      this.priceMax = '';
      this.priceError = '';
      this.areaMin = 0;
      this.selectedBedrooms = '';
      this.selectedBathrooms = '';
      this.selectedDirection = '';
      this.selectedAmenities = [];
      this.updateLocationInURL();
      this.updateRealEstateTypeInURL();
      this.updateFormTypeInURL();
      this.updatePriceRange();
      this.updateAreaInURL();
      this.updateBedroomsInURL();
      this.updateBathroomsInURL();
      this.updateDirectionInURL();
      this.updateAmenitiesInURL();

      // Dispatch events to update other components
      this.$dispatch('province-selected', { province: '' });
      this.$dispatch('district-selected', { district: '' });
      this.$dispatch('real-estate-type-selected', { type: '' });
      this.$dispatch('form-type-selected', { type: '' });
      this.$dispatch('bedrooms-selected', { bedrooms: '' });
      this.$dispatch('bathrooms-selected', { bathrooms: '' });
      this.$dispatch('direction-selected', { direction: '' });
      this.$dispatch('amenities-selected', { amenities: [] });
    },

    clearProvince() {
      this.selectedProvince = '';
      this.selectedDistrict = ''; // Also clear district when clearing province
      this.updateLocationInURL();

      // Dispatch events to update other components
      this.$dispatch('province-selected', { province: '' });
      this.$dispatch('district-selected', { district: '' });
    },

    clearDistrict() {
      this.selectedDistrict = '';
      this.updateLocationInURL();

      // Dispatch event to update other components
      this.$dispatch('district-selected', { district: '' });
    },

    // Real Estate Type functions
    toggleRealEstateTypeDropdown() {
      this.showRealEstateTypeDropdown = !this.showRealEstateTypeDropdown;
      if (this.showRealEstateTypeDropdown) {
        this.showProvinceDropdown = false;
        this.showDistrictDropdown = false;
      }
    },

    selectRealEstateType(type) {
      this.selectedRealEstateType = type;
      this.showRealEstateTypeDropdown = false;
      this.updateRealEstateTypeInURL();

      // Dispatch event to update other components
      this.$dispatch('real-estate-type-selected', { type });
    },

    updateRealEstateTypeInURL() {
      const url = new URL(window.location);

      if (this.selectedRealEstateType) {
        url.searchParams.set('real-estate-type', this.selectedRealEstateType);
      } else {
        url.searchParams.delete('real-estate-type');
      }

      window.history.pushState({}, '', url);
    },

    clearRealEstateType() {
      this.selectedRealEstateType = '';
      this.updateRealEstateTypeInURL();

      // Dispatch event to update other components
      this.$dispatch('real-estate-type-selected', { type: '' });
    },

    // Form Type functions
    toggleFormTypeDropdown() {
      this.showFormTypeDropdown = !this.showFormTypeDropdown;
      if (this.showFormTypeDropdown) {
        this.showProvinceDropdown = false;
        this.showDistrictDropdown = false;
        this.showRealEstateTypeDropdown = false;
      }
    },

    selectFormType(type) {
      this.selectedFormType = type;
      this.showFormTypeDropdown = false;
      this.updateFormTypeInURL();

      // Dispatch event to update other components
      this.$dispatch('form-type-selected', { type });
    },

    updateFormTypeInURL() {
      const url = new URL(window.location);

      if (this.selectedFormType) {
        url.searchParams.set('form-type', this.selectedFormType);
      } else {
        url.searchParams.delete('form-type');
      }

      window.history.pushState({}, '', url);
    },

    clearFormType() {
      this.selectedFormType = '';
      this.updateFormTypeInURL();

      // Dispatch event to update other components
      this.$dispatch('form-type-selected', { type: '' });
    },

    // Price Range functions
    validatePrice() {
      this.priceError = '';

      if (this.priceMin && this.priceMax) {
        const min = parseFloat(this.priceMin);
        const max = parseFloat(this.priceMax);

        if (!isNaN(min) && !isNaN(max) && min >= max) {
          this.priceError = 'Giá trị tối thiểu phải nhỏ hơn giá trị tối đa';
          return false;
        }
      }

      return true;
    },

    updatePriceRange() {
      this.validatePrice();

      const url = new URL(window.location);

      // Remove existing price params
      url.searchParams.delete('price-min');
      url.searchParams.delete('price-max');

      // Add new price params with validation
      if (this.priceMin && this.priceMin.trim()) {
        const minValue = parseFloat(this.priceMin);
        if (!isNaN(minValue) && minValue > 0) {
          url.searchParams.set('price-min', minValue.toString());

          // Only add price-max if it's valid and greater than price-min
          if (this.priceMax && this.priceMax.trim()) {
            const maxValue = parseFloat(this.priceMax);
            if (!isNaN(maxValue) && maxValue > minValue) {
              url.searchParams.set('price-max', maxValue.toString());
            }
          }
        }
      } else if (this.priceMax && this.priceMax.trim()) {
        // If only price-max is provided, add it
        const maxValue = parseFloat(this.priceMax);
        if (!isNaN(maxValue) && maxValue > 0) {
          url.searchParams.set('price-max', maxValue.toString());
        }
      }

      window.history.pushState({}, '', url);
    },

    clearPriceRange() {
      this.priceMin = '';
      this.priceMax = '';
      this.priceError = '';
      this.updatePriceRange();
    },

    getPriceRangeDisplay() {
      if (this.priceMin && this.priceMax) {
        const minValue = parseFloat(this.priceMin);
        const maxValue = parseFloat(this.priceMax);
        if (!isNaN(minValue) && !isNaN(maxValue) && maxValue > minValue) {
          return `${minValue.toLocaleString()} - ${maxValue.toLocaleString()} VNĐ`;
        } else if (!isNaN(minValue)) {
          return `Từ ${minValue.toLocaleString()} VNĐ`;
        } else if (!isNaN(maxValue)) {
          return `Đến ${maxValue.toLocaleString()} VNĐ`;
        }
      } else if (this.priceMin) {
        const minValue = parseFloat(this.priceMin);
        if (!isNaN(minValue)) {
          return `Từ ${minValue.toLocaleString()} VNĐ`;
        }
      } else if (this.priceMax) {
        const maxValue = parseFloat(this.priceMax);
        if (!isNaN(maxValue)) {
          return `Đến ${maxValue.toLocaleString()} VNĐ`;
        }
      }
      return '';
    },

    // Area Slider functions
    onAreaSliderChange(event) {
      const value = parseInt(event.target.value);
      this.areaMin = value;
      this.updateAreaInURL();
    },

    updateArea(value) {
      this.areaMin = Math.max(0, Math.min(500, value));
    },

    onAreaDragStart() {
      this.isDragging = true;
    },

    onAreaDragEnd() {
      this.isDragging = false;
      this.updateAreaInURL();
    },

    onAreaChange(event) {
      this.updateArea(parseInt(event.target.value));
    },

    onAreaMouseMove(event) {
      if (this.isDragging) {
        const rect = event.currentTarget.getBoundingClientRect();
        const percentage = (event.clientX - rect.left) / rect.width;
        const value = Math.round(percentage * 500);
        this.updateArea(value);
      }
    },

    onAreaMouseUp() {
      this.isDragging = false;
      this.updateAreaInURL();
    },

    updateAreaInURL() {
      const url = new URL(window.location);

      // Remove existing area params
      url.searchParams.delete('area-min');

      // Add new area param if value > 0
      if (this.areaMin > 0) {
        url.searchParams.set('area-min', this.areaMin.toString());
      }

      window.history.pushState({}, '', url);
    },

    clearAreaRange() {
      this.areaMin = 0;
      this.updateAreaInURL();
    },

    getAreaPercentage() {
      return (this.areaMin / 500) * 100;
    },

    getAreaDisplayValue() {
      return this.areaMin + ' m²';
    },

    // Bedrooms functions
    toggleBedroomsDropdown() {
      this.showBedroomsDropdown = !this.showBedroomsDropdown;
      if (this.showBedroomsDropdown) {
        this.showProvinceDropdown = false;
        this.showDistrictDropdown = false;
        this.showRealEstateTypeDropdown = false;
        this.showFormTypeDropdown = false;
      }
    },

    selectBedrooms(bedrooms) {
      this.selectedBedrooms = bedrooms;
      this.showBedroomsDropdown = false;
      this.updateBedroomsInURL();

      // Dispatch event to update other components
      this.$dispatch('bedrooms-selected', { bedrooms });
    },

    updateBedroomsInURL() {
      const url = new URL(window.location);

      if (this.selectedBedrooms) {
        url.searchParams.set('bedrooms', this.selectedBedrooms);
      } else {
        url.searchParams.delete('bedrooms');
      }

      window.history.pushState({}, '', url);
    },

    clearBedrooms() {
      this.selectedBedrooms = '';
      this.updateBedroomsInURL();

      // Dispatch event to update other components
      this.$dispatch('bedrooms-selected', { bedrooms: '' });
    },

    getBedroomsDisplayValue() {
      if (this.selectedBedrooms) {
        return this.selectedBedrooms + '+ PN';
      }
      return '';
    },

    // Bathrooms functions
    toggleBathroomsDropdown() {
      this.showBathroomsDropdown = !this.showBathroomsDropdown;
      if (this.showBathroomsDropdown) {
        this.showProvinceDropdown = false;
        this.showDistrictDropdown = false;
        this.showRealEstateTypeDropdown = false;
        this.showFormTypeDropdown = false;
        this.showBedroomsDropdown = false;
      }
    },

    selectBathrooms(bathrooms) {
      this.selectedBathrooms = bathrooms;
      this.showBathroomsDropdown = false;
      this.updateBathroomsInURL();

      // Dispatch event to update other components
      this.$dispatch('bathrooms-selected', { bathrooms });
    },

    updateBathroomsInURL() {
      const url = new URL(window.location);

      if (this.selectedBathrooms) {
        url.searchParams.set('bathrooms', this.selectedBathrooms);
      } else {
        url.searchParams.delete('bathrooms');
      }

      window.history.pushState({}, '', url);
    },

    clearBathrooms() {
      this.selectedBathrooms = '';
      this.updateBathroomsInURL();

      // Dispatch event to update other components
      this.$dispatch('bathrooms-selected', { bathrooms: '' });
    },

    getBathroomsDisplayValue() {
      if (this.selectedBathrooms) {
        return this.selectedBathrooms + '+ WC';
      }
      return '';
    },

    // Direction functions
    toggleDirectionDropdown() {
      this.showDirectionDropdown = !this.showDirectionDropdown;
      if (this.showDirectionDropdown) {
        this.showProvinceDropdown = false;
        this.showDistrictDropdown = false;
        this.showRealEstateTypeDropdown = false;
        this.showFormTypeDropdown = false;
        this.showBedroomsDropdown = false;
        this.showBathroomsDropdown = false;
      }
    },

    selectDirection(direction) {
      this.selectedDirection = direction;
      this.showDirectionDropdown = false;
      this.updateDirectionInURL();

      // Dispatch event to update other components
      this.$dispatch('direction-selected', { direction });
    },

    updateDirectionInURL() {
      const url = new URL(window.location);

      if (this.selectedDirection) {
        url.searchParams.set('direction', this.selectedDirection);
      } else {
        url.searchParams.delete('direction');
      }

      window.history.pushState({}, '', url);
    },

    clearDirection() {
      this.selectedDirection = '';
      this.updateDirectionInURL();

      // Dispatch event to update other components
      this.$dispatch('direction-selected', { direction: '' });
    },

    getDirectionDisplayValue() {
      if (this.selectedDirection) {
        const directionMap = {
          'dong': 'Đông',
          'tay': 'Tây',
          'nam': 'Nam',
          'bac': 'Bắc',
          'dong-nam': 'Đông Nam',
          'dong-bac': 'Đông Bắc',
          'tay-nam': 'Tây Nam',
          'tay-bac': 'Tây Bắc'
        };
        return directionMap[this.selectedDirection] || this.selectedDirection;
      }
      return '';
    },

    // Amenities functions
    isAmenitySelected(amenityName) {
      const slug = this.amenityMap[amenityName];
      return slug && this.selectedAmenities.includes(slug);
    },

    toggleAmenity(amenityName) {
      const slug = this.amenityMap[amenityName];
      if (!slug) return; // Should not happen if amenityName is valid

      if (this.selectedAmenities.includes(slug)) {
        this.selectedAmenities = this.selectedAmenities.filter(s => s !== slug);
      } else {
        this.selectedAmenities.push(slug);
      }
      this.updateAmenitiesInURL();

      // Dispatch event to update other components
      this.$dispatch('amenities-selected', { amenities: this.selectedAmenities });
    },

    updateAmenitiesInURL() {
      const url = new URL(window.location);

      if (this.selectedAmenities.length > 0) {
        // selectedAmenities now contains slugs
        const amenitiesParam = this.selectedAmenities
          .map(slug => encodeURIComponent(slug))
          .join(',');
        url.searchParams.set('amenities', amenitiesParam);
      } else {
        url.searchParams.delete('amenities');
      }

      window.history.pushState({}, '', url);
    },

    clearAmenity(slug) {
      this.selectedAmenities = this.selectedAmenities.filter(s => s !== slug);
      this.updateAmenitiesInURL();

      // Dispatch event to update other components
      this.$dispatch('amenities-selected', { amenities: this.selectedAmenities });
    },

    clearAllAmenities() {
      this.selectedAmenities = [];
      this.updateAmenitiesInURL();

      // Dispatch event to update other components
      this.$dispatch('amenities-selected', { amenities: [] });
    },

    getAmenityDisplayValue(slug) {
      return this.amenitySlugToNameMap[slug] || slug;
    },

    // Pagination functions
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

    // View switching functions
    switchToGridView() {
      this.currentView = 'grid';
    },

    switchToListView() {
      this.currentView = 'list';
    },

    isGridView() {
      return this.currentView === 'grid';
    },

    isListView() {
      return this.currentView === 'list';
    }
  }));
});