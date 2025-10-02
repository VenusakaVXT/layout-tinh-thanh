// Alpine.js component for service search functionality
document.addEventListener('alpine:init', () => {
  Alpine.data('serviceSearchComponent', () => ({
    keyword: '',
    selectedCategory: '',
    showCategoryDropdown: false,
    selectedPackage: '',
    showPackageDropdown: false,
    priceMin: '',
    priceMax: '',
    hasTrial: false,
    selectedRefundPolicy: '',
    showRefundPolicyDropdown: false,
    minRating: 0,
    categoryMap: {
      'Tất cả danh mục': '',
      'Hỗ trợ khách hàng': 'ho-tro-khach-hang',
      'Dịch vụ công': 'dich-vu-cong',
      'An ninh': 'an-ninh',
      'Quy hoạch': 'quy-hoach',
      'Hành chính': 'hanh-chinh',
      'Kinh doanh': 'kinh-doanh',
      'Tài chính': 'tai-chinh',
      'Bảo hiểm': 'bao-hiem'
    },
    packageMap: {
      'Tất cả gói': '',
      'Hàng tháng': 'hang-thang',
      'Hàng năm': 'hang-nam',
      'Trọn đời': 'tron-doi'
    },
    refundPolicyMap: {
      'Tất cả': '',
      'Không hoàn tiền': 'khong-hoan-tien',
      '15 ngày hoàn tiền': '15-ngay-hoan-tien',
      '30 ngày hoàn tiền': '30-ngay-hoan-tien',
      '45 ngày hoàn tiền': '45-ngay-hoan-tien',
      '60 ngày hoàn tiền': '60-ngay-hoan-tien',
      '90 ngày hoàn tiền': '90-ngay-hoan-tien'
    },

    init() {
      // Get keyword from URL on page load
      const urlParams = new URLSearchParams(window.location.search);
      this.keyword = urlParams.get('keyword') || '';

      // Initialize category
      const categoryParam = urlParams.get('category');
      if (categoryParam) {
        // Find category name from slug
        const categoryName = Object.keys(this.categoryMap).find(name =>
          this.categoryMap[name] === categoryParam
        );
        this.selectedCategory = categoryName || '';
      } else {
        this.selectedCategory = '';
      }

      // Initialize package
      const packageParam = urlParams.get('package');
      if (packageParam) {
        // Find package name from slug
        const packageName = Object.keys(this.packageMap).find(name =>
          this.packageMap[name] === packageParam
        );
        this.selectedPackage = packageName || '';
      } else {
        this.selectedPackage = '';
      }

      // Initialize price range
      this.priceMin = urlParams.get('price-min') || '';
      this.priceMax = urlParams.get('price-max') || '';

      // Initialize trial checkbox
      this.hasTrial = urlParams.get('has-trial') === 'true';

      // Initialize refund policy
      const refundPolicyParam = urlParams.get('refund-policy');
      if (refundPolicyParam) {
        // Find refund policy name from slug
        const refundPolicyName = Object.keys(this.refundPolicyMap).find(name =>
          this.refundPolicyMap[name] === refundPolicyParam
        );
        this.selectedRefundPolicy = refundPolicyName || '';
      } else {
        this.selectedRefundPolicy = '';
      }

      // Initialize min rating
      const minRatingParam = urlParams.get('min-rating');
      this.minRating = minRatingParam ? parseFloat(minRatingParam) : 0;
    },

    handleSearch(event) {
      event.preventDefault();
      this.updateURL();
    },

    handleKeyPress(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.updateURL();
      }
    },

    clearSearch() {
      this.keyword = '';
      this.updateURL();
    },

    updateURL() {
      const url = new URL(window.location);

      if (this.keyword.trim()) {
        url.searchParams.set('keyword', this.keyword.trim());
      } else {
        url.searchParams.delete('keyword');
      }

      // Update URL without page reload
      window.history.pushState({}, '', url);
    },

    // Category functions
    toggleCategoryDropdown() {
      this.showCategoryDropdown = !this.showCategoryDropdown;
    },

    selectCategory(categoryName) {
      this.selectedCategory = categoryName;
      this.showCategoryDropdown = false;
      this.updateCategoryInURL();
    },

    updateCategoryInURL() {
      const url = new URL(window.location);

      const categorySlug = this.categoryMap[this.selectedCategory];
      if (categorySlug) {
        url.searchParams.set('category', categorySlug);
      } else {
        url.searchParams.delete('category');
      }

      window.history.pushState({}, '', url);
    },

    clearCategory() {
      this.selectedCategory = '';
      this.updateCategoryInURL();
    },

    clearAllFilters() {
      this.keyword = '';
      this.selectedCategory = '';
      this.selectedPackage = '';
      this.priceMin = '';
      this.priceMax = '';
      this.hasTrial = false;
      this.selectedRefundPolicy = '';
      this.minRating = 0;

      const url = new URL(window.location);
      url.searchParams.delete('keyword');
      url.searchParams.delete('category');
      url.searchParams.delete('package');
      url.searchParams.delete('price-min');
      url.searchParams.delete('price-max');
      url.searchParams.delete('has-trial');
      url.searchParams.delete('refund-policy');
      url.searchParams.delete('min-rating');

      window.history.pushState({}, '', url);
    },

    getCategoryDisplayValue() {
      return this.selectedCategory || 'Tất cả danh mục';
    },

    // Package functions
    togglePackageDropdown() {
      this.showPackageDropdown = !this.showPackageDropdown;
    },

    selectPackage(packageName) {
      this.selectedPackage = packageName;
      this.showPackageDropdown = false;
      this.updatePackageInURL();
    },

    updatePackageInURL() {
      const url = new URL(window.location);

      const packageSlug = this.packageMap[this.selectedPackage];
      if (packageSlug) {
        url.searchParams.set('package', packageSlug);
      } else {
        url.searchParams.delete('package');
      }

      window.history.pushState({}, '', url);
    },

    clearPackage() {
      this.selectedPackage = '';
      this.updatePackageInURL();
    },

    getPackageDisplayValue() {
      return this.selectedPackage || 'Tất cả gói';
    },

    // Price range functions
    handlePriceBlur() {
      this.updatePriceInURL();
    },

    updatePriceInURL() {
      const url = new URL(window.location);

      // Validate price range
      const minPrice = parseInt(this.priceMin) || 0;
      const maxPrice = parseInt(this.priceMax) || 0;

      if (this.priceMin && this.priceMax && maxPrice < minPrice) {
        // If max is less than min, only add min price
        url.searchParams.set('price-min', this.priceMin);
        url.searchParams.delete('price-max');
      } else {
        // Add both prices if valid
        if (this.priceMin) {
          url.searchParams.set('price-min', this.priceMin);
        } else {
          url.searchParams.delete('price-min');
        }

        if (this.priceMax) {
          url.searchParams.set('price-max', this.priceMax);
        } else {
          url.searchParams.delete('price-max');
        }
      }

      window.history.pushState({}, '', url);
    },

    clearPriceRange() {
      this.priceMin = '';
      this.priceMax = '';
      this.updatePriceInURL();
    },

    // Trial checkbox functions
    updateTrialInURL() {
      const url = new URL(window.location);

      if (this.hasTrial) {
        url.searchParams.set('has-trial', 'true');
      } else {
        url.searchParams.delete('has-trial');
      }

      window.history.pushState({}, '', url);
    },

    clearTrial() {
      this.hasTrial = false;
      this.updateTrialInURL();
    },

    // Refund policy functions
    toggleRefundPolicyDropdown() {
      this.showRefundPolicyDropdown = !this.showRefundPolicyDropdown;
    },

    selectRefundPolicy(policyName) {
      this.selectedRefundPolicy = policyName;
      this.showRefundPolicyDropdown = false;
      this.updateRefundPolicyInURL();
    },

    updateRefundPolicyInURL() {
      const url = new URL(window.location);

      const policySlug = this.refundPolicyMap[this.selectedRefundPolicy];
      if (policySlug) {
        url.searchParams.set('refund-policy', policySlug);
      } else {
        url.searchParams.delete('refund-policy');
      }

      window.history.pushState({}, '', url);
    },

    clearRefundPolicy() {
      this.selectedRefundPolicy = '';
      this.updateRefundPolicyInURL();
    },

    getRefundPolicyDisplayValue() {
      return this.selectedRefundPolicy || 'Tất cả';
    },

    // Min rating slider functions
    updateMinRatingInURL() {
      const url = new URL(window.location);

      if (this.minRating > 0) {
        url.searchParams.set('min-rating', this.minRating.toFixed(1));
      } else {
        url.searchParams.delete('min-rating');
      }

      window.history.pushState({}, '', url);
    },

    clearMinRating() {
      this.minRating = 0;
      this.updateMinRatingInURL();
    },

    get minRatingDisplayValue() {
      return this.minRating.toFixed(1);
    },

    get appliedFilters() {
      const filters = [];

      if (this.selectedCategory && this.selectedCategory !== 'Tất cả danh mục') {
        filters.push({
          type: 'category',
          label: this.selectedCategory,
          clearFn: () => this.clearCategory()
        });
      }

      if (this.selectedPackage && this.selectedPackage !== 'Tất cả gói') {
        filters.push({
          type: 'package',
          label: this.selectedPackage,
          clearFn: () => this.clearPackage()
        });
      }

      if (this.priceMin || this.priceMax) {
        const minPrice = this.priceMin || '0';
        const maxPrice = this.priceMax || 'Không giới hạn';
        const priceLabel = this.priceMax ? `${minPrice} - ${maxPrice} VND` : `Từ ${minPrice} VND`;

        filters.push({
          type: 'price',
          label: priceLabel,
          clearFn: () => this.clearPriceRange()
        });
      }

      if (this.hasTrial) {
        filters.push({
          type: 'trial',
          label: 'Có dùng thử',
          clearFn: () => this.clearTrial()
        });
      }

      if (this.selectedRefundPolicy && this.selectedRefundPolicy !== 'Tất cả') {
        filters.push({
          type: 'refund-policy',
          label: this.selectedRefundPolicy,
          clearFn: () => this.clearRefundPolicy()
        });
      }

      if (this.minRating > 0) {
        filters.push({
          type: 'min-rating',
          label: `${this.minRatingDisplayValue}+ sao`,
          clearFn: () => this.clearMinRating()
        });
      }

      return filters;
    },

    // Applied filters functions
    hasActiveFilters() {
      return this.keyword || this.selectedCategory || this.selectedPackage || this.priceMin || this.priceMax || this.hasTrial || this.selectedRefundPolicy || this.minRating > 0;
    }
  }));
});