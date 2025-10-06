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
    priceError: '',
    hasTrial: false,
    selectedRefundPolicy: '',
    showRefundPolicyDropdown: false,
    minRating: 0,
    isRatingDragging: false,
    selectedFeatures: [],
    selectedIntegrations: [],
    selectedDeliveryType: '',
    showDeliveryTypeDropdown: false,
    selectedSLA: '',
    showSLADropdown: false,
    selectedSort: '',
    showSortDropdown: false,
    selectedPageSize: 12,
    showPageSizeDropdown: false,
    contractTerm: '',
    currentPage: 1,
    totalPages: 5,

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
    featuresMap: {
      'Hỗ trợ 24/7': 'ho-tro-24-7',
      'API tích hợp': 'api-tich-hop',
      'Dashboard quản lý': 'dashboard-quan-ly',
      'Báo cáo thống kê': 'bao-cao-thong-ke',
      'Thông báo tự động': 'thong-bao-tu-dong',
      'Lưu trữ điện tử': 'luu-tru-dien-tu',
      'Tìm kiếm nâng cao': 'tim-kiem-nang-cao',
      'Xuất báo cáo': 'xuat-bao-cao'
    },
    integrationsMap: {
      'SMS': 'sms',
      'Email': 'email',
      'Zalo': 'zalo',
      'Facebook': 'facebook',
      'REST API': 'rest-api',
      'Banking API': 'banking-api',
      'Digital signature': 'digital-signature',
      'Payment gateway': 'payment-gateway'
    },
    deliveryTypeMap: {
      'Tất cả': '',
      'Trực tuyến': 'truc-tuyen',
      'Tại chỗ': 'tai-cho',
      'Kết hợp': 'ket-hop'
    },
    slaMap: {
      'Tất cả': '',
      '24/7': '24-7',
      'Giờ hành chính': 'gio-hanh-chinh'
    },
    sortMap: {
      'Liên quan': 'relevance',
      'Mới nhất': 'newest',
      'Giá cao → thấp': 'price-desc',
      'Giá thấp → cao': 'price-asc',
      'Đánh giá cao → thấp': 'rating-desc',
      'Đánh giá thấp → cao': 'rating-asc',
      'Phổ biến': 'popular'
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

      // Initialize features
      const featuresParam = urlParams.get('featureds');
      this.selectedFeatures = []; // Always start with empty array

      if (featuresParam) {
        const featureSlugs = featuresParam.split(',');

        // Convert slugs back to display names
        for (const slug of featureSlugs) {
          const trimmedSlug = slug.trim();
          for (const [displayName, featureSlug] of Object.entries(this.featuresMap)) {
            if (featureSlug === trimmedSlug) {
              this.selectedFeatures.push(displayName);
              break;
            }
          }
        }
      }

      // Initialize integrations
      const integrationsParam = urlParams.get('integrations');
      this.selectedIntegrations = []; // Always start with empty array

      if (integrationsParam) {
        const integrationSlugs = integrationsParam.split(',');

        // Convert slugs back to display names
        for (const slug of integrationSlugs) {
          const trimmedSlug = slug.trim();
          for (const [displayName, integrationSlug] of Object.entries(this.integrationsMap)) {
            if (integrationSlug === trimmedSlug) {
              this.selectedIntegrations.push(displayName);
              break;
            }
          }
        }
      }

      // Initialize delivery type
      const deliveryTypeParam = urlParams.get('delivery-type');
      if (deliveryTypeParam) {
        // Find delivery type name from slug
        const deliveryTypeName = Object.keys(this.deliveryTypeMap).find(name =>
          this.deliveryTypeMap[name] === deliveryTypeParam
        );
        this.selectedDeliveryType = deliveryTypeName || '';
      } else {
        this.selectedDeliveryType = '';
      }

      // Initialize SLA
      const slaParam = urlParams.get('sla');
      if (slaParam) {
        // Find SLA name from slug
        const slaName = Object.keys(this.slaMap).find(name =>
          this.slaMap[name] === slaParam
        );
        this.selectedSLA = slaName || '';
      } else {
        this.selectedSLA = '';
      }

      // Initialize sort
      const sortParam = urlParams.get('sort');
      if (sortParam) {
        // Find sort name from slug
        const sortName = Object.keys(this.sortMap).find(name =>
          this.sortMap[name] === sortParam
        );
        this.selectedSort = sortName || 'Liên quan';
      } else {
        this.selectedSort = 'Liên quan';
      }

      // Initialize page size
      const pageSizeParam = urlParams.get('page-size');
      this.selectedPageSize = pageSizeParam ? parseInt(pageSizeParam) : 12;

      // Initialize contract term
      this.contractTerm = urlParams.get('contract-term') || '';

      // Initialize pagination
      const pageParam = urlParams.get('page');
      this.currentPage = pageParam ? parseInt(pageParam) : 1;

      // Update applied filters after initialization
      this.updateAppliedFilters();
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
      this.updateAppliedFilters();
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
      this.priceError = '';
      this.hasTrial = false;
      this.selectedRefundPolicy = '';
      this.minRating = 0;
      this.isRatingDragging = false;
      this.selectedFeatures = [];
      this.selectedIntegrations = [];
      this.selectedDeliveryType = '';
      this.selectedSLA = '';
      this.selectedSort = 'Liên quan';
      this.selectedPageSize = 12;
      this.contractTerm = '';
      this.currentPage = 1;

      const url = new URL(window.location);
      url.searchParams.delete('keyword');
      url.searchParams.delete('category');
      url.searchParams.delete('package');
      url.searchParams.delete('price-min');
      url.searchParams.delete('price-max');
      url.searchParams.delete('has-trial');
      url.searchParams.delete('refund-policy');
      url.searchParams.delete('min-rating');
      url.searchParams.delete('featureds');
      url.searchParams.delete('integrations');
      url.searchParams.delete('delivery-type');
      url.searchParams.delete('sla');
      url.searchParams.delete('sort');
      url.searchParams.delete('page-size');
      url.searchParams.delete('contract-term');
      url.searchParams.delete('page');

      window.history.pushState({}, '', url);
      this.updateAppliedFilters();
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
      this.updateAppliedFilters();
    },

    clearPackage() {
      this.selectedPackage = '';
      this.updatePackageInURL();
    },

    getPackageDisplayValue() {
      return this.selectedPackage || 'Tất cả gói';
    },

    // Price range functions
    validatePrice() {
      this.priceError = '';

      if (this.priceMin && this.priceMax) {
        const min = parseInt(this.priceMin);
        const max = parseInt(this.priceMax);

        if (!isNaN(min) && !isNaN(max) && min >= max) {
          this.priceError = 'Giá trị tối thiểu phải nhỏ hơn giá trị tối đa';
          return false;
        }
      }

      return true;
    },

    handlePriceBlur() {
      this.validatePrice();
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
      this.updateAppliedFilters();
    },

    clearPriceRange() {
      this.priceMin = '';
      this.priceMax = '';
      this.priceError = '';
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
      this.updateAppliedFilters();
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
      this.updateAppliedFilters();
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
      this.updateAppliedFilters();
    },

    clearMinRating() {
      this.minRating = 0;
      this.updateMinRatingInURL();
    },

    get minRatingDisplayValue() {
      return this.minRating.toFixed(1);
    },

    // Rating slider functions
    getRatingPercentage() {
      return (this.minRating / 5) * 100;
    },

    onRatingDragStart() {
      this.isRatingDragging = true;
    },

    onRatingDragEnd() {
      this.isRatingDragging = false;
      this.updateMinRatingInURL();
    },

    onRatingChange(event) {
      const value = parseFloat(event.target.value);
      this.minRating = Math.max(0, Math.min(5, value));
    },

    onRatingMouseMove(event) {
      if (!this.isRatingDragging) return;

      const slider = event.currentTarget;
      const rect = slider.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
      const value = Math.round((percentage / 100) * 50) / 10; // Round to 1 decimal place
      this.minRating = Math.max(0, Math.min(5, value));
    },

    onRatingMouseUp() {
      if (this.isRatingDragging) {
        this.isRatingDragging = false;
        this.updateMinRatingInURL();
      }
    },

    // Features functions
    toggleFeature(featureName) {
      if (this.selectedFeatures.includes(featureName)) {
        this.selectedFeatures = this.selectedFeatures.filter(feature => feature !== featureName);
      } else {
        this.selectedFeatures.push(featureName);
      }

      this.updateFeaturesInURL();
      this.updateAppliedFilters();
    },

    updateFeaturesInURL() {
      const url = new URL(window.location);

      if (this.selectedFeatures.length > 0) {
        const featureSlugs = this.selectedFeatures.map(feature => this.featuresMap[feature]);
        url.searchParams.set('featureds', featureSlugs.join(','));
      } else {
        url.searchParams.delete('featureds');
      }

      window.history.pushState({}, '', url);
    },

    removeFeature(featureName) {
      this.selectedFeatures = this.selectedFeatures.filter(feature => feature !== featureName);
      this.updateFeaturesInURL();
      this.updateAppliedFilters();
    },

    isFeatureSelected(featureName) {
      return this.selectedFeatures.includes(featureName);
    },

    // Integrations functions
    toggleIntegration(integrationName) {
      if (this.selectedIntegrations.includes(integrationName)) {
        this.selectedIntegrations = this.selectedIntegrations.filter(integration => integration !== integrationName);
      } else {
        this.selectedIntegrations.push(integrationName);
      }

      this.updateIntegrationsInURL();
      this.updateAppliedFilters();
    },

    updateIntegrationsInURL() {
      const url = new URL(window.location);

      if (this.selectedIntegrations.length > 0) {
        const integrationSlugs = this.selectedIntegrations.map(integration => this.integrationsMap[integration]);
        url.searchParams.set('integrations', integrationSlugs.join(','));
      } else {
        url.searchParams.delete('integrations');
      }

      window.history.pushState({}, '', url);
    },

    removeIntegration(integrationName) {
      this.selectedIntegrations = this.selectedIntegrations.filter(integration => integration !== integrationName);
      this.updateIntegrationsInURL();
      this.updateAppliedFilters();
    },

    isIntegrationSelected(integrationName) {
      return this.selectedIntegrations.includes(integrationName);
    },

    // Delivery type functions
    toggleDeliveryTypeDropdown() {
      this.showDeliveryTypeDropdown = !this.showDeliveryTypeDropdown;
    },

    selectDeliveryType(deliveryTypeName) {
      this.selectedDeliveryType = deliveryTypeName;
      this.showDeliveryTypeDropdown = false;
      this.updateDeliveryTypeInURL();
      this.updateAppliedFilters();
    },

    updateDeliveryTypeInURL() {
      const url = new URL(window.location);

      const deliveryTypeSlug = this.deliveryTypeMap[this.selectedDeliveryType];
      if (deliveryTypeSlug) {
        url.searchParams.set('delivery-type', deliveryTypeSlug);
      } else {
        url.searchParams.delete('delivery-type');
      }

      window.history.pushState({}, '', url);
    },

    clearDeliveryType() {
      this.selectedDeliveryType = '';
      this.updateDeliveryTypeInURL();
      this.updateAppliedFilters();
    },

    getDeliveryTypeDisplayValue() {
      return this.selectedDeliveryType || 'Tất cả';
    },

    // SLA functions
    toggleSLADropdown() {
      this.showSLADropdown = !this.showSLADropdown;
    },

    selectSLA(slaName) {
      this.selectedSLA = slaName;
      this.showSLADropdown = false;
      this.updateSLAInURL();
      this.updateAppliedFilters();
    },

    updateSLAInURL() {
      const url = new URL(window.location);

      const slaSlug = this.slaMap[this.selectedSLA];
      if (slaSlug) {
        url.searchParams.set('sla', slaSlug);
      } else {
        url.searchParams.delete('sla');
      }

      window.history.pushState({}, '', url);
    },

    clearSLA() {
      this.selectedSLA = '';
      this.updateSLAInURL();
      this.updateAppliedFilters();
    },

    getSLADisplayValue() {
      return this.selectedSLA || 'Tất cả';
    },

    // Sort functions
    toggleSortDropdown() {
      this.showSortDropdown = !this.showSortDropdown;
    },

    selectSort(sortName) {
      this.selectedSort = sortName;
      this.showSortDropdown = false;
      this.updateSortInURL();
    },

    updateSortInURL() {
      const url = new URL(window.location);

      const sortSlug = this.sortMap[this.selectedSort];
      if (sortSlug && sortSlug !== 'relevance') {
        url.searchParams.set('sort', sortSlug);
      } else {
        url.searchParams.delete('sort');
      }

      window.history.pushState({}, '', url);
    },

    getSortDisplayValue() {
      return this.selectedSort || 'Liên quan';
    },

    // Page size functions
    togglePageSizeDropdown() {
      this.showPageSizeDropdown = !this.showPageSizeDropdown;
    },

    selectPageSize(pageSize) {
      this.selectedPageSize = pageSize;
      this.showPageSizeDropdown = false;
      this.updatePageSizeInURL();
    },

    updatePageSizeInURL() {
      const url = new URL(window.location);

      if (this.selectedPageSize && this.selectedPageSize !== 12) {
        url.searchParams.set('page-size', this.selectedPageSize.toString());
      } else {
        url.searchParams.delete('page-size');
      }

      window.history.pushState({}, '', url);
    },

    getPageSizeDisplayValue() {
      return this.selectedPageSize.toString();
    },

    // Contract term functions
    updateContractTermInURL() {
      const url = new URL(window.location);

      if (this.contractTerm && this.contractTerm.trim()) {
        url.searchParams.set('contract-term', this.contractTerm.trim());
      } else {
        url.searchParams.delete('contract-term');
      }

      window.history.pushState({}, '', url);
      this.updateAppliedFilters();
    },

    clearContractTerm() {
      this.contractTerm = '';
      this.updateContractTermInURL();
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

    appliedFilters: [],

    updateAppliedFilters() {
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
        const minPrice = parseInt(this.priceMin) || 0;
        const maxPrice = parseInt(this.priceMax) || 0;
        let priceLabel = '';

        // Case 1: Only priceMin is set
        if (this.priceMin && !this.priceMax) {
          priceLabel = `Từ ${this.priceMin} VND`;
        }
        // Case 2: Only priceMax is set
        else if (!this.priceMin && this.priceMax) {
          priceLabel = `Đến ${this.priceMax} VND`;
        }
        // Case 3: Both are set
        else if (this.priceMin && this.priceMax) {
          // If max is less than min, only show min price
          if (maxPrice < minPrice) {
            priceLabel = `Từ ${this.priceMin} VND`;
          } else {
            priceLabel = `${this.priceMin} - ${this.priceMax} VND`;
          }
        }

        if (priceLabel) {
          filters.push({
            type: 'price',
            label: priceLabel,
            clearFn: () => this.clearPriceRange()
          });
        }
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

      if (this.selectedDeliveryType && this.selectedDeliveryType !== 'Tất cả') {
        filters.push({
          type: 'delivery-type',
          label: this.selectedDeliveryType,
          clearFn: () => this.clearDeliveryType()
        });
      }

      if (this.selectedSLA && this.selectedSLA !== 'Tất cả') {
        filters.push({
          type: 'sla',
          label: this.selectedSLA,
          clearFn: () => this.clearSLA()
        });
      }

      if (this.minRating > 0) {
        filters.push({
          type: 'min-rating',
          label: `${this.minRatingDisplayValue}+ sao`,
          clearFn: () => this.clearMinRating()
        });
      }

      if (this.contractTerm && this.contractTerm.trim()) {
        filters.push({
          type: 'contract-term',
          label: `${this.contractTerm} tháng`,
          clearFn: () => this.clearContractTerm()
        });
      }

      // Add selected features
      this.selectedFeatures.forEach((feature, index) => {
        filters.push({
          type: 'feature',
          label: feature,
          clearFn: () => this.removeFeature(feature)
        });
      });

      // Add selected integrations
      this.selectedIntegrations.forEach((integration, index) => {
        filters.push({
          type: 'integration',
          label: integration,
          clearFn: () => this.removeIntegration(integration)
        });
      });

      this.appliedFilters = filters;
    },

    // Applied filters functions
    hasActiveFilters() {
      return this.keyword || this.selectedCategory || this.selectedPackage || this.priceMin || this.priceMax || this.hasTrial || this.selectedRefundPolicy || this.minRating > 0 || this.selectedFeatures.length > 0 || this.selectedIntegrations.length > 0 || (this.selectedDeliveryType && this.selectedDeliveryType !== 'Tất cả') || (this.selectedSLA && this.selectedSLA !== 'Tất cả') || (this.contractTerm && this.contractTerm.trim());
    }
  }));
});