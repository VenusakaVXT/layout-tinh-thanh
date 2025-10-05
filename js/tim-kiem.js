// Alpine.js component for search functionality
document.addEventListener('alpine:init', () => {
  Alpine.data('searchApp', () => ({
    userLatitude: null,
    userLongitude: null,
    isGettingLocation: false,
    isLocationRequested: false,

    // Location dropdown functionality
    locationSearch: '',
    showLocationDropdown: false,
    selectedLocation: null,

    // Time dropdown functionality
    showTimeDropdown: false,
    selectedTime: 'Tất cả',

    // Rating dropdown functionality
    showRatingDropdown: false,
    selectedRating: 'Tất cả',

    // Job sort dropdown functionality
    showJobSortDropdown: false,
    selectedJobSort: 'Liên quan',

    // Real estate sort dropdown functionality
    showRealEstateSortDropdown: false,
    selectedRealEstateSort: 'Liên quan',

    // Service sort dropdown functionality
    showServiceSortDropdown: false,
    selectedServiceSort: 'Liên quan',

    // Company sort dropdown functionality
    showCompanySortDropdown: false,
    selectedCompanySort: 'Liên quan',

    // News sort dropdown functionality
    showNewsSortDropdown: false,
    selectedNewsSort: 'Liên quan',

    // News category dropdown functionality
    showNewsCategoryDropdown: false,
    selectedNewsCategory: 'Tất cả',

    // News source dropdown functionality
    showNewsSourceDropdown: false,
    selectedNewsSource: 'Tất cả',

    // Location type dropdown functionality
    showLocationTypeDropdown: false,
    selectedLocationType: 'Tất cả',

    // Location sort dropdown functionality
    showLocationSortDropdown: false,
    selectedLocationSort: 'Liên quan',

    // Job type dropdown functionality
    showJobTypeDropdown: false,
    selectedJobType: 'Tất cả',

    // Experience dropdown functionality
    showExperienceDropdown: false,
    selectedExperience: 'Tất cả',

    // Salary input functionality
    salaryValue: '',

    // Area input functionality
    areaValue: '',

    // Distance input functionality
    distanceValue: '',

    // Real estate type dropdown functionality
    showRealEstateTypeDropdown: false,
    selectedRealEstateType: 'Tất cả',

    // Bedrooms dropdown functionality
    showBedroomsDropdown: false,
    selectedBedrooms: 'Tất cả',

    // Service type dropdown functionality
    showServiceTypeDropdown: false,
    selectedServiceType: 'Tất cả',

    // Service package dropdown functionality
    showServicePackageDropdown: false,
    selectedServicePackage: 'Tất cả',

    // Industry dropdown functionality
    showIndustryDropdown: false,
    selectedIndustry: 'Tất cả',

    // Company size dropdown functionality
    showCompanySizeDropdown: false,
    selectedCompanySize: 'Tất cả',
    allLocations: [
      'TP. Thủ Dầu Một',
      'TP. Dĩ An',
      'TP. Thuận An',
      'TP. Tân Uyên',
      'Thị xã Bến Cát',
      'Huyện Bắc Tân Uyên',
      'Huyện Dầu Tiếng',
      'Huyện Phú Giáo',
      'KCN Mỹ Phước',
      'KCN Sóng Thần',
      'KCN Bàu Bàng',
      'KCN Việt Hương',
      'KCN Đồng An',
      'KCN Tân Đông Hiệp',
      'KCN Bình Dương'
    ],

    init() {
      // Yêu cầu vị trí ngay khi component được khởi tạo
      setTimeout(() => {
        this.requestUserLocation();
      }, 1000);

      // Mặc định hiển thị tab "Tất cả"
      this.activeTab = 'all';
      console.log('Initialized with activeTab:', this.activeTab);

      // Hiển thị filter mặc định cho tab "Tất cả"
      this.showFiltersForTab('all');
      // Hiển thị sort button mặc định cho tab "Tất cả"
      this.showSortButtonsForTab('all');

      // Đọc param location, time, rating, tab và sort từ URL và hiển thị trong input
      this.loadLocationFromUrl();
      this.loadTimeFromUrl();
      this.loadRatingFromUrl();
      this.loadTabFromUrl();
      this.loadJobSortFromUrl();
      this.loadRealEstateSortFromUrl();
      this.loadServiceSortFromUrl();
      this.loadCompanySortFromUrl();
      this.loadNewsSortFromUrl();
      this.loadLocationSortFromUrl();
      this.loadJobTypeFromUrl();
      this.loadExperienceFromUrl();
      this.loadSalaryFromUrl();
      this.loadAreaFromUrl();
      this.loadDistanceFromUrl();
      this.loadRealEstateTypeFromUrl();
      this.loadBedroomsFromUrl();
      this.loadServiceTypeFromUrl();
      this.loadServicePackageFromUrl();
      this.loadIndustryFromUrl();
      this.loadCompanySizeFromUrl();

      // Load news category and source parameters from URL on page load
      this.loadTypeFromUrl();
      this.loadSourceFromUrl();

      // Load location type parameter from URL on page load
      this.loadLocationTypeFromUrl();
    },

    // Hàm yêu cầu lấy tọa độ của người dùng
    requestUserLocation() {
      if (navigator.geolocation) {
        // Hiển thị thông báo yêu cầu quyền truy cập vị trí
        if (window.fastNotice) {
          window.fastNotice.show('Đang yêu cầu quyền truy cập vị trí để cung cấp dịch vụ tốt hơn...', 'info');
        }

        this.isGettingLocation = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Thành công lấy được tọa độ
            this.userLatitude = position.coords.latitude;
            this.userLongitude = position.coords.longitude;

            console.log('Tọa độ người dùng:', this.userLatitude, this.userLongitude);

            // Lưu tọa độ vào localStorage để sử dụng sau này
            localStorage.setItem('userLatitude', this.userLatitude);
            localStorage.setItem('userLongitude', this.userLongitude);

            if (window.fastNotice) {
              window.fastNotice.show('Đã lấy được vị trí của bạn!', 'success');
            }

            // Có thể gọi hàm xử lý tọa độ ở đây
            this.handleUserLocation(this.userLatitude, this.userLongitude);
            this.isGettingLocation = false;
          },
          (error) => {
            // Xử lý lỗi
            let errorMessage = 'Không thể lấy vị trí của bạn. ';

            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage += 'Bạn đã từ chối yêu cầu truy cập vị trí.';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage += 'Thông tin vị trí không khả dụng.';
                break;
              case error.TIMEOUT:
                errorMessage += 'Yêu cầu lấy vị trí hết thời gian chờ.';
                break;
              default:
                errorMessage += 'Đã xảy ra lỗi không xác định.';
                break;
            }

            console.error('Lỗi lấy vị trí:', errorMessage);

            if (window.fastNotice) {
              window.fastNotice.show(errorMessage, 'error');
            }
            this.isGettingLocation = false;
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 phút
          }
        );
      } else {
        console.log('Trình duyệt không hỗ trợ Geolocation API');
        if (window.fastNotice) {
          window.fastNotice.show('Trình duyệt của bạn không hỗ trợ định vị GPS', 'warning');
        }
      }
    },

    // Hàm xử lý tọa độ người dùng (có thể tùy chỉnh theo nhu cầu)
    handleUserLocation(latitude, longitude) {
      // Ví dụ: Có thể gọi API để lấy thông tin địa điểm gần nhất
      // hoặc cập nhật giao diện dựa trên vị trí
      console.log('Xử lý vị trí người dùng:', latitude, longitude);

      // Có thể thêm logic xử lý khác ở đây
      // Ví dụ: Tìm kiếm các địa điểm gần nhất, cập nhật bản đồ, etc.
    },

    // Hàm chuyển đổi tab
    switchTab(tabName) {
      console.log('Chuyển sang tab:', tabName);
      this.activeTab = tabName;

      // Thêm param tab vào URL
      this.addTabToUrl(tabName);

      // Lấy tất cả các div có class tab-content
      const allTabContents = document.querySelectorAll('.tab-content');

      // Ẩn tất cả các tab content
      allTabContents.forEach(content => {
        content.classList.add('hidden');
      });

      // Hiển thị tab content tương ứng
      if (tabName === 'all') {
        // Hiển thị tất cả các div kết quả
        const resultDivs = [
          'job-results',
          'real-estate-results',
          'service-results',
          'company-results',
          'news-results',
          'location-results'
        ];

        resultDivs.forEach(divId => {
          const element = document.getElementById(divId);
          if (element) {
            element.classList.remove('hidden');
          }
        });
      } else {
        // Hiển thị chỉ div kết quả tương ứng với tab
        const tabMapping = {
          'jobs': 'job-results',
          'estates': 'real-estate-results',
          'services': 'service-results',
          'companies': 'company-results',
          'news': 'news-results',
          'locations': 'location-results'
        };

        const targetDivId = tabMapping[tabName];
        if (targetDivId) {
          const targetElement = document.getElementById(targetDivId);
          if (targetElement) {
            targetElement.classList.remove('hidden');
          }
        }
      }

      // Xử lý hiển thị filter theo tab
      this.showFiltersForTab(tabName);
    },

    // Hàm kiểm tra xem có nên hiển thị địa điểm này không
    shouldShowLocation(locationName) {
      if (this.locationSearch.trim() === '') {
        return true;
      }
      const searchTerm = this.locationSearch.toLowerCase().trim();
      return locationName.toLowerCase().includes(searchTerm);
    },

    // Hàm kiểm tra xem có địa điểm nào khớp với tìm kiếm không
    hasMatchingLocations() {
      if (this.locationSearch.trim() === '') {
        return true;
      }
      const searchTerm = this.locationSearch.toLowerCase().trim();
      return this.allLocations.some(location =>
        location.toLowerCase().includes(searchTerm)
      );
    },

    // Hàm chọn địa điểm
    selectLocation(locationName) {
      this.selectedLocation = locationName;
      this.locationSearch = locationName;
      this.showLocationDropdown = false;
      this.addLocationToUrl(locationName);
      console.log('Đã chọn địa điểm:', locationName);
    },

    // Hàm thêm param location vào URL
    addLocationToUrl(locationValue) {
      const url = new URL(window.location);
      url.searchParams.set('location', locationValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm location vào URL:', locationValue);
    },

    // Hàm xử lý khi blur input
    handleLocationBlur() {
      if (this.locationSearch.trim() !== '') {
        this.addLocationToUrl(this.locationSearch.trim());
        console.log('Đã thêm location vào URL từ input:', this.locationSearch.trim());
      }
    },

    // Hàm đọc param location từ URL và hiển thị trong input
    loadLocationFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const locationParam = urlParams.get('location');

      if (locationParam) {
        // Decode URL parameter để hiển thị đúng ký tự
        const decodedLocation = decodeURIComponent(locationParam);
        this.locationSearch = decodedLocation;
        this.selectedLocation = decodedLocation;
        console.log('Đã load location từ URL:', decodedLocation);
      }
    },

    // Hàm chọn thời gian
    selectTime(timeValue) {
      this.selectedTime = timeValue;
      this.showTimeDropdown = false;
      this.addTimeToUrl(timeValue);
      console.log('Đã chọn thời gian:', timeValue);
    },

    // Hàm thêm param time vào URL
    addTimeToUrl(timeValue) {
      const url = new URL(window.location);
      url.searchParams.set('time', timeValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm time vào URL:', timeValue);
    },

    // Hàm đọc param time từ URL và hiển thị trong dropdown
    loadTimeFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const timeParam = urlParams.get('time');

      if (timeParam) {
        // Decode URL parameter để hiển thị đúng ký tự
        const decodedTime = decodeURIComponent(timeParam);
        this.selectedTime = decodedTime;
        console.log('Đã load time từ URL:', decodedTime);
      }
    },

    // Hàm chọn đánh giá
    selectRating(ratingValue) {
      this.selectedRating = ratingValue;
      this.showRatingDropdown = false;

      if (ratingValue === 'Tất cả') {
        // Xóa param rating-min khỏi URL
        this.removeRatingFromUrl();
      } else {
        // Lấy số từ rating value (ví dụ: "3+ sao" -> 3)
        const ratingNumber = this.extractRatingNumber(ratingValue);
        this.addRatingToUrl(ratingNumber);
      }
      console.log('Đã chọn đánh giá:', ratingValue);
    },

    // Hàm trích xuất số từ rating value
    extractRatingNumber(ratingValue) {
      const match = ratingValue.match(/(\d+)/);
      return match ? parseInt(match[1]) : 1;
    },

    // Hàm thêm param rating-min vào URL
    addRatingToUrl(ratingNumber) {
      const url = new URL(window.location);
      url.searchParams.set('rating-min', ratingNumber);
      window.history.pushState({}, '', url);
      console.log('Đã thêm rating-min vào URL:', ratingNumber);
    },

    // Hàm xóa param rating-min khỏi URL
    removeRatingFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('rating-min');
      window.history.pushState({}, '', url);
      console.log('Đã xóa rating-min khỏi URL');
    },

    // Hàm đọc param rating-min từ URL và hiển thị trong dropdown
    loadRatingFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const ratingParam = urlParams.get('rating-min');

      if (ratingParam) {
        const ratingNumber = parseInt(ratingParam);
        // Kiểm tra xem rating có hợp lệ không (1-5)
        if (ratingNumber >= 1 && ratingNumber <= 5) {
          this.selectedRating = ratingNumber + '+ sao';
          console.log('Đã load rating từ URL:', this.selectedRating);
        } else {
          // Nếu rating không hợp lệ, hiển thị "Tất cả"
          this.selectedRating = 'Tất cả';
          console.log('Rating không hợp lệ, hiển thị Tất cả');
        }
      }
    },

    // Hàm thêm param tab vào URL
    addTabToUrl(tabName) {
      const url = new URL(window.location);

      // Mapping từ tab name sang URL param
      const tabMapping = {
        'all': null, // Không thêm param cho "Tất cả"
        'jobs': 'viec-lam',
        'estates': 'bat-dong-san',
        'services': 'dich-vu',
        'companies': 'doanh-nghiep',
        'news': 'tin-tuc',
        'locations': 'dia-diem'
      };

      const tabParam = tabMapping[tabName];

      if (tabParam) {
        url.searchParams.set('tab', tabParam);
      } else {
        // Xóa param tab nếu chọn "Tất cả"
        url.searchParams.delete('tab');
      }

      window.history.pushState({}, '', url);
      console.log('Đã thêm tab vào URL:', tabParam || 'Tất cả');
    },

    // Hàm đọc param tab từ URL và chuyển đổi tab
    loadTabFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');

      if (tabParam) {
        // Mapping từ URL param sang tab name
        const reverseTabMapping = {
          'viec-lam': 'jobs',
          'bat-dong-san': 'estates',
          'dich-vu': 'services',
          'doanh-nghiep': 'companies',
          'tin-tuc': 'news',
          'dia-diem': 'locations'
        };

        const tabName = reverseTabMapping[tabParam];
        if (tabName) {
          this.activeTab = tabName;
          // Hiển thị tab content mà không gọi switchTab để tránh vòng lặp
          this.showTabContent(tabName);
          console.log('Đã load tab từ URL:', tabName);
        }
      }
    },

    // Hàm hiển thị tab content (không thêm param vào URL)
    showTabContent(tabName) {
      // Lấy tất cả các div có class tab-content
      const allTabContents = document.querySelectorAll('.tab-content');

      // Ẩn tất cả các tab content
      allTabContents.forEach(content => {
        content.classList.add('hidden');
      });

      // Hiển thị tab content tương ứng
      if (tabName === 'all') {
        // Hiển thị tất cả các div kết quả
        const resultDivs = [
          'job-results',
          'real-estate-results',
          'service-results',
          'company-results',
          'news-results',
          'location-results'
        ];

        resultDivs.forEach(divId => {
          const element = document.getElementById(divId);
          if (element) {
            element.classList.remove('hidden');
          }
        });
      } else {
        // Hiển thị chỉ div kết quả tương ứng với tab
        const tabMapping = {
          'jobs': 'job-results',
          'estates': 'real-estate-results',
          'services': 'service-results',
          'companies': 'company-results',
          'news': 'news-results',
          'locations': 'location-results'
        };

        const targetDivId = tabMapping[tabName];
        if (targetDivId) {
          const targetElement = document.getElementById(targetDivId);
          if (targetElement) {
            targetElement.classList.remove('hidden');
          }
        }
      }

      // Xử lý hiển thị filter theo tab
      this.showFiltersForTab(tabName);
    },

    // Hàm hiển thị filter theo tab
    showFiltersForTab(tabName) {
      // Ẩn tất cả các filter trước
      const allFilters = [
        'common-filter',
        'job-filter',
        'real-estate-filter',
        'service-filter',
        'company-filter',
        'news-filter',
        'location-filter'
      ];

      allFilters.forEach(filterId => {
        const filterElement = document.getElementById(filterId);
        if (filterElement) {
          filterElement.classList.add('hidden');
        }
      });

      // Hiển thị filter theo tab
      if (tabName === 'all') {
        // Tab "Tất cả" chỉ hiển thị common-filter
        const commonFilter = document.getElementById('common-filter');
        if (commonFilter) {
          commonFilter.classList.remove('hidden');
        }
      } else {
        // Các tab khác hiển thị common-filter + filter riêng
        const commonFilter = document.getElementById('common-filter');
        if (commonFilter) {
          commonFilter.classList.remove('hidden');
        }

        // Mapping tab name sang filter ID
        const filterMapping = {
          'jobs': 'job-filter',
          'estates': 'real-estate-filter',
          'services': 'service-filter',
          'companies': 'company-filter',
          'news': 'news-filter',
          'locations': 'location-filter'
        };

        const targetFilterId = filterMapping[tabName];
        if (targetFilterId) {
          const targetFilter = document.getElementById(targetFilterId);
          if (targetFilter) {
            targetFilter.classList.remove('hidden');
          }
        }
      }

      // Xử lý hiển thị sort button theo tab
      this.showSortButtonsForTab(tabName);

      console.log('Đã hiển thị filter cho tab:', tabName);
    },

    // Hàm hiển thị sort button theo tab
    showSortButtonsForTab(tabName) {
      // Ẩn tất cả các sort button trước
      const allSortButtons = [
        'common-sort',
        'job-sort',
        'real-estate-sort',
        'service-sort',
        'company-sort',
        'news-sort',
        'location-sort'
      ];

      allSortButtons.forEach(sortId => {
        const sortElement = document.getElementById(sortId);
        if (sortElement) {
          sortElement.classList.add('hidden');
        }
      });

      // Hiển thị sort button theo tab
      if (tabName === 'all') {
        // Tab "Tất cả" chỉ hiển thị common-sort
        const commonSort = document.getElementById('common-sort');
        if (commonSort) {
          commonSort.classList.remove('hidden');
        }
      } else {
        // Các tab khác hiển thị sort button riêng
        const sortMapping = {
          'jobs': 'job-sort',
          'estates': 'real-estate-sort',
          'services': 'service-sort',
          'companies': 'company-sort',
          'news': 'news-sort',
          'locations': 'location-sort'
        };

        const targetSortId = sortMapping[tabName];
        if (targetSortId) {
          const targetSort = document.getElementById(targetSortId);
          if (targetSort) {
            targetSort.classList.remove('hidden');
          }
        }
      }

      console.log('Đã hiển thị sort button cho tab:', tabName);
    },

    // Hàm chọn sort cho job
    selectJobSort(sortValue) {
      this.selectedJobSort = sortValue;
      this.showJobSortDropdown = false;

      if (sortValue === 'Liên quan') {
        // Xóa param sort khỏi URL
        this.removeJobSortFromUrl();
      } else {
        // Mapping sort value sang URL param
        const sortMapping = {
          'Mới nhất': 'newest',
          'Lương cao -> thấp': 'salary-desc',
          'Lương thấp -> cao': 'salary-asc'
        };

        const sortParam = sortMapping[sortValue];
        if (sortParam) {
          this.addJobSortToUrl(sortParam);
        }
      }
      console.log('Đã chọn sort cho job:', sortValue);
    },

    // Hàm thêm param sort vào URL
    addJobSortToUrl(sortValue) {
      const url = new URL(window.location);
      url.searchParams.set('sort', sortValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm sort vào URL:', sortValue);
    },

    // Hàm xóa param sort khỏi URL
    removeJobSortFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('sort');
      window.history.pushState({}, '', url);
      console.log('Đã xóa sort khỏi URL');
    },

    // Hàm đọc param sort từ URL và hiển thị trong dropdown
    loadJobSortFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const sortParam = urlParams.get('sort');

      if (sortParam) {
        // Mapping từ URL param sang sort value
        const reverseSortMapping = {
          'newest': 'Mới nhất',
          'salary-desc': 'Lương cao -> thấp',
          'salary-asc': 'Lương thấp -> cao'
        };

        const sortValue = reverseSortMapping[sortParam];
        if (sortValue) {
          this.selectedJobSort = sortValue;
          console.log('Đã load sort từ URL:', sortValue);
        }
      }
    },

    // Hàm chọn sort cho real estate
    selectRealEstateSort(sortValue) {
      this.selectedRealEstateSort = sortValue;
      this.showRealEstateSortDropdown = false;

      if (sortValue === 'Liên quan') {
        // Xóa param sort khỏi URL
        this.removeRealEstateSortFromUrl();
      } else {
        // Mapping sort value sang URL param
        const sortMapping = {
          'Mới nhất': 'newest',
          'Giá cao → thấp': 'price-desc',
          'Giá thấp → cao': 'price-asc',
          'Diện tích lớn → nhỏ': 'area-desc',
          'Diện tích nhỏ → lớn': 'area-asc'
        };

        const sortParam = sortMapping[sortValue];
        if (sortParam) {
          this.addRealEstateSortToUrl(sortParam);
        }
      }
      console.log('Đã chọn sort cho real estate:', sortValue);
    },

    // Hàm thêm param sort vào URL cho real estate
    addRealEstateSortToUrl(sortValue) {
      const url = new URL(window.location);
      url.searchParams.set('sort', sortValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm sort vào URL:', sortValue);
    },

    // Hàm xóa param sort khỏi URL cho real estate
    removeRealEstateSortFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('sort');
      window.history.pushState({}, '', url);
      console.log('Đã xóa sort khỏi URL');
    },

    // Hàm đọc param sort từ URL và hiển thị trong dropdown cho real estate
    loadRealEstateSortFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const sortParam = urlParams.get('sort');

      if (sortParam) {
        // Mapping từ URL param sang sort value
        const reverseSortMapping = {
          'newest': 'Mới nhất',
          'price-desc': 'Giá cao → thấp',
          'price-asc': 'Giá thấp → cao',
          'area-desc': 'Diện tích lớn → nhỏ',
          'area-asc': 'Diện tích nhỏ → lớn'
        };

        const sortValue = reverseSortMapping[sortParam];
        if (sortValue) {
          this.selectedRealEstateSort = sortValue;
          console.log('Đã load sort từ URL:', sortValue);
        }
      }
    },

    // Hàm chọn sort cho service
    selectServiceSort(sortValue) {
      this.selectedServiceSort = sortValue;
      this.showServiceSortDropdown = false;

      if (sortValue === 'Liên quan') {
        // Xóa param sort khỏi URL
        this.removeServiceSortFromUrl();
      } else {
        // Mapping sort value sang URL param
        const sortMapping = {
          'Mới nhất': 'newest',
          'Giá cao → thấp': 'price-desc',
          'Giá thấp → cao': 'price-asc',
          'Đánh giá cao → thấp': 'rating-desc',
          'Đánh giá thấp → cao': 'rating-asc',
          'Phổ biến': 'popular'
        };

        const sortParam = sortMapping[sortValue];
        if (sortParam) {
          this.addServiceSortToUrl(sortParam);
        }
      }
      console.log('Đã chọn sort cho service:', sortValue);
    },

    // Hàm thêm param sort vào URL cho service
    addServiceSortToUrl(sortValue) {
      const url = new URL(window.location);
      url.searchParams.set('sort', sortValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm sort vào URL:', sortValue);
    },

    // Hàm xóa param sort khỏi URL cho service
    removeServiceSortFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('sort');
      window.history.pushState({}, '', url);
      console.log('Đã xóa sort khỏi URL');
    },

    // Hàm đọc param sort từ URL và hiển thị trong dropdown cho service
    loadServiceSortFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const sortParam = urlParams.get('sort');

      if (sortParam) {
        // Mapping từ URL param sang sort value
        const reverseSortMapping = {
          'newest': 'Mới nhất',
          'price-desc': 'Giá cao → thấp',
          'price-asc': 'Giá thấp → cao',
          'rating-desc': 'Đánh giá cao → thấp',
          'rating-asc': 'Đánh giá thấp → cao',
          'popular': 'Phổ biến'
        };

        const sortValue = reverseSortMapping[sortParam];
        if (sortValue) {
          this.selectedServiceSort = sortValue;
          console.log('Đã load sort từ URL:', sortValue);
        }
      }
    },

    // Hàm chọn sort cho company
    selectCompanySort(sortValue) {
      this.selectedCompanySort = sortValue;
      this.showCompanySortDropdown = false;

      if (sortValue === 'Liên quan') {
        // Xóa param sort khỏi URL
        this.removeCompanySortFromUrl();
      } else {
        // Mapping sort value sang URL param
        const sortMapping = {
          'Mới nhất': 'newest',
          'Doanh thu cao → thấp': 'revenue-desc',
          'Doanh thu thấp → cao': 'revenue-asc',
          'Nhân sự nhiều → ít': 'staff-desc',
          'Nhân sự ít → nhiều': 'staff-asc',
          'Đánh giá cao → thấp': 'rating-desc',
          'Đánh giá thấp → cao': 'rating-asc',
          'Phổ biến': 'popular'
        };

        const sortParam = sortMapping[sortValue];
        if (sortParam) {
          this.addCompanySortToUrl(sortParam);
        }
      }
      console.log('Đã chọn sort cho company:', sortValue);
    },

    // Hàm thêm param sort vào URL cho company
    addCompanySortToUrl(sortValue) {
      const url = new URL(window.location);
      url.searchParams.set('sort', sortValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm sort vào URL:', sortValue);
    },

    // Hàm xóa param sort khỏi URL cho company
    removeCompanySortFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('sort');
      window.history.pushState({}, '', url);
      console.log('Đã xóa sort khỏi URL');
    },

    // Hàm đọc param sort từ URL và hiển thị trong dropdown cho company
    loadCompanySortFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const sortParam = urlParams.get('sort');

      if (sortParam) {
        // Mapping từ URL param sang sort value
        const reverseSortMapping = {
          'newest': 'Mới nhất',
          'revenue-desc': 'Doanh thu cao → thấp',
          'revenue-asc': 'Doanh thu thấp → cao',
          'staff-desc': 'Nhân sự nhiều → ít',
          'staff-asc': 'Nhân sự ít → nhiều',
          'rating-desc': 'Đánh giá cao → thấp',
          'rating-asc': 'Đánh giá thấp → cao',
          'popular': 'Phổ biến'
        };

        const sortValue = reverseSortMapping[sortParam];
        if (sortValue) {
          this.selectedCompanySort = sortValue;
          console.log('Đã load sort từ URL:', sortValue);
        }
      }
    },

    // Hàm chọn sort cho news
    selectNewsSort(sortValue) {
      this.selectedNewsSort = sortValue;
      this.showNewsSortDropdown = false;

      if (sortValue === 'Liên quan') {
        // Xóa param sort khỏi URL
        this.removeNewsSortFromUrl();
      } else {
        // Mapping sort value sang URL param
        const sortMapping = {
          'Mới nhất': 'newest',
          'Cũ nhất': 'oldest',
          'Lượt xem cao → thấp': 'views-desc',
          'Lượt xem thấp → cao': 'views-asc',
          'Bình luận nhiều → ít': 'comments-desc',
          'Bình luận ít → nhiều': 'comments-asc',
          'Nổi bật': 'featured'
        };

        const sortParam = sortMapping[sortValue];
        if (sortParam) {
          this.addNewsSortToUrl(sortParam);
        }
      }
      console.log('Đã chọn sort cho news:', sortValue);
    },

    // Hàm thêm param sort vào URL cho news
    addNewsSortToUrl(sortValue) {
      const url = new URL(window.location);
      url.searchParams.set('sort', sortValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm sort vào URL:', sortValue);
    },

    // Hàm xóa param sort khỏi URL cho news
    removeNewsSortFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('sort');
      window.history.pushState({}, '', url);
      console.log('Đã xóa sort khỏi URL');
    },

    // Hàm đọc param sort từ URL và hiển thị trong dropdown cho news
    loadNewsSortFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const sortParam = urlParams.get('sort');

      if (sortParam) {
        // Mapping từ URL param sang sort value
        const reverseSortMapping = {
          'newest': 'Mới nhất',
          'oldest': 'Cũ nhất',
          'views-desc': 'Lượt xem cao → thấp',
          'views-asc': 'Lượt xem thấp → cao',
          'comments-desc': 'Bình luận nhiều → ít',
          'comments-asc': 'Bình luận ít → nhiều',
          'featured': 'Nổi bật'
        };

        const sortValue = reverseSortMapping[sortParam];
        if (sortValue) {
          this.selectedNewsSort = sortValue;
          console.log('Đã load sort từ URL:', sortValue);
        }
      }
    },

    // Hàm chọn sort cho location
    selectLocationSort(sortValue) {
      this.selectedLocationSort = sortValue;
      this.showLocationSortDropdown = false;

      if (sortValue === 'Liên quan') {
        // Xóa param sort khỏi URL
        this.removeLocationSortFromUrl();
      } else {
        // Mapping sort value sang URL param
        const sortMapping = {
          'Mới nhất': 'newest',
          'Gần nhất': 'nearest',
          'Đánh giá cao → thấp': 'rating-desc',
          'Đánh giá thấp → cao': 'rating-asc',
          'Giá từ cao → thấp': 'price-desc',
          'Giá từ thấp → cao': 'price-asc',
          'Phổ biến': 'popular'
        };

        const sortParam = sortMapping[sortValue];
        if (sortParam) {
          this.addLocationSortToUrl(sortParam);
        }
      }
      console.log('Đã chọn sort cho location:', sortValue);
    },

    // Hàm thêm param sort vào URL cho location
    addLocationSortToUrl(sortValue) {
      const url = new URL(window.location);
      url.searchParams.set('sort', sortValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm sort vào URL:', sortValue);
    },

    // Hàm xóa param sort khỏi URL cho location
    removeLocationSortFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('sort');
      window.history.pushState({}, '', url);
      console.log('Đã xóa sort khỏi URL');
    },

    // Hàm đọc param sort từ URL và hiển thị trong dropdown cho location
    loadLocationSortFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const sortParam = urlParams.get('sort');

      if (sortParam) {
        // Mapping từ URL param sang sort value
        const reverseSortMapping = {
          'newest': 'Mới nhất',
          'nearest': 'Gần nhất',
          'rating-desc': 'Đánh giá cao → thấp',
          'rating-asc': 'Đánh giá thấp → cao',
          'price-desc': 'Giá từ cao → thấp',
          'price-asc': 'Giá từ thấp → cao',
          'popular': 'Phổ biến'
        };

        const sortValue = reverseSortMapping[sortParam];
        if (sortValue) {
          this.selectedLocationSort = sortValue;
          console.log('Đã load sort từ URL:', sortValue);
        }
      }
    },

    // Hàm chọn job type
    selectJobType(jobTypeValue) {
      this.selectedJobType = jobTypeValue;
      this.showJobTypeDropdown = false;

      if (jobTypeValue === 'Tất cả') {
        // Xóa param type khỏi URL
        this.removeJobTypeFromUrl();
      } else {
        // Mapping job type value sang URL param
        const typeMapping = {
          'Toàn thời gian': 'fulltime',
          'Bán thời gian': 'parttime',
          'Hợp đồng': 'contract',
          'Thực tập': 'internship'
        };

        const typeParam = typeMapping[jobTypeValue];
        if (typeParam) {
          this.addJobTypeToUrl(typeParam);
        }
      }
      console.log('Đã chọn job type:', jobTypeValue);
    },

    // Hàm thêm param type vào URL
    addJobTypeToUrl(typeValue) {
      const url = new URL(window.location);
      url.searchParams.set('type', typeValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm type vào URL:', typeValue);
    },

    // Hàm xóa param type khỏi URL
    removeJobTypeFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('type');
      window.history.pushState({}, '', url);
      console.log('Đã xóa type khỏi URL');
    },

    // Hàm đọc param type từ URL và hiển thị trong dropdown
    loadJobTypeFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const typeParam = urlParams.get('type');

      if (typeParam) {
        // Mapping từ URL param sang job type value
        const reverseTypeMapping = {
          'full-time': 'Toàn thời gian',
          'part-time': 'Bán thời gian',
          'contract': 'Hợp đồng',
          'internship': 'Thực tập'
        };

        const jobTypeValue = reverseTypeMapping[typeParam];
        if (jobTypeValue) {
          this.selectedJobType = jobTypeValue;
          console.log('Đã load job type từ URL:', jobTypeValue);
        }
      }
    },

    // Hàm chọn experience
    selectExperience(experienceValue) {
      this.selectedExperience = experienceValue;
      this.showExperienceDropdown = false;

      if (experienceValue === 'Tất cả') {
        // Xóa param experience khỏi URL
        this.removeExperienceFromUrl();
      } else {
        // Mapping experience value sang URL param
        const experienceMapping = {
          '0-1 năm': '0-1',
          '1-3 năm': '1-3',
          '3-5 năm': '3-5',
          '5+ năm': '5+'
        };

        const experienceParam = experienceMapping[experienceValue];
        if (experienceParam) {
          this.addExperienceToUrl(experienceParam);
        }
      }
      console.log('Đã chọn experience:', experienceValue);
    },

    // Hàm thêm param experience vào URL
    addExperienceToUrl(experienceValue) {
      const url = new URL(window.location);
      url.searchParams.set('experience', experienceValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm experience vào URL:', experienceValue);
    },

    // Hàm xóa param experience khỏi URL
    removeExperienceFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('experience');
      window.history.pushState({}, '', url);
      console.log('Đã xóa experience khỏi URL');
    },

    // Hàm đọc param experience từ URL và hiển thị trong dropdown
    loadExperienceFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const experienceParam = urlParams.get('experience');

      if (experienceParam) {
        // Mapping từ URL param sang experience value
        const reverseExperienceMapping = {
          '0-1': '0-1 năm',
          '1-3': '1-3 năm',
          '3-5': '3-5 năm',
          '5+': '5+ năm'
        };

        const experienceValue = reverseExperienceMapping[experienceParam];
        if (experienceValue) {
          this.selectedExperience = experienceValue;
          console.log('Đã load experience từ URL:', experienceValue);
        }
      }
    },

    // Hàm xử lý khi blur salary input
    handleSalaryBlur() {
      if (this.salaryValue.trim() !== '') {
        // Chuyển đổi thành số để đảm bảo format đúng
        const salaryNumber = parseInt(this.salaryValue.trim());
        if (!isNaN(salaryNumber) && salaryNumber > 0) {
          this.addSalaryToUrl(salaryNumber);
        }
      } else {
        // Nếu input trống, xóa param salary khỏi URL
        this.removeSalaryFromUrl();
      }
      console.log('Đã xử lý salary blur:', this.salaryValue);
    },

    // Hàm thêm param salary vào URL
    addSalaryToUrl(salaryValue) {
      const url = new URL(window.location);
      url.searchParams.set('salary', salaryValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm salary vào URL:', salaryValue);
    },

    // Hàm xóa param salary khỏi URL
    removeSalaryFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('salary');
      window.history.pushState({}, '', url);
      console.log('Đã xóa salary khỏi URL');
    },

    // Hàm đọc param salary từ URL và hiển thị trong input
    loadSalaryFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const salaryParam = urlParams.get('salary');

      if (salaryParam) {
        const salaryNumber = parseInt(salaryParam);
        if (!isNaN(salaryNumber) && salaryNumber > 0) {
          this.salaryValue = salaryNumber.toString();
          console.log('Đã load salary từ URL:', this.salaryValue);
        }
      }
    },

    // Hàm xử lý khi blur area input
    handleAreaBlur() {
      if (this.areaValue.trim() !== '') {
        // Chuyển đổi thành số để đảm bảo format đúng
        const areaNumber = parseInt(this.areaValue.trim());
        if (!isNaN(areaNumber) && areaNumber > 0) {
          this.addAreaToUrl(areaNumber);
        }
      } else {
        // Nếu input trống, xóa param area khỏi URL
        this.removeAreaFromUrl();
      }
      console.log('Đã xử lý area blur:', this.areaValue);
    },

    // Hàm thêm param area vào URL
    addAreaToUrl(areaValue) {
      const url = new URL(window.location);
      url.searchParams.set('area', areaValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm area vào URL:', areaValue);
    },

    // Hàm xóa param area khỏi URL
    removeAreaFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('area');
      window.history.pushState({}, '', url);
      console.log('Đã xóa area khỏi URL');
    },

    // Hàm đọc param area từ URL và hiển thị trong input
    loadAreaFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const areaParam = urlParams.get('area');

      if (areaParam) {
        const areaNumber = parseInt(areaParam);
        if (!isNaN(areaNumber) && areaNumber > 0) {
          this.areaValue = areaNumber.toString();
          console.log('Đã load area từ URL:', this.areaValue);
        }
      }
    },

    // Hàm xử lý khi blur distance input
    handleDistanceBlur() {
      if (this.distanceValue.trim() !== '') {
        // Chuyển đổi thành số để đảm bảo format đúng
        const distanceNumber = parseInt(this.distanceValue.trim());
        if (!isNaN(distanceNumber) && distanceNumber > 0) {
          this.addDistanceToUrl(distanceNumber);
        }
      } else {
        // Nếu input trống, xóa param distance khỏi URL
        this.removeDistanceFromUrl();
      }
      console.log('Đã xử lý distance blur:', this.distanceValue);
    },

    // Hàm thêm param distance vào URL
    addDistanceToUrl(distanceValue) {
      const url = new URL(window.location);
      url.searchParams.set('distance', distanceValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm distance vào URL:', distanceValue);
    },

    // Hàm xóa param distance khỏi URL
    removeDistanceFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('distance');
      window.history.pushState({}, '', url);
      console.log('Đã xóa distance khỏi URL');
    },

    // Hàm đọc param distance từ URL và hiển thị trong input
    loadDistanceFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const distanceParam = urlParams.get('distance');

      if (distanceParam) {
        const distanceNumber = parseInt(distanceParam);
        if (!isNaN(distanceNumber) && distanceNumber > 0) {
          this.distanceValue = distanceNumber.toString();
          console.log('Đã load distance từ URL:', this.distanceValue);
        }
      }
    },

    // Hàm chọn real estate type
    selectRealEstateType(realEstateTypeValue) {
      this.selectedRealEstateType = realEstateTypeValue;
      this.showRealEstateTypeDropdown = false;

      if (realEstateTypeValue === 'Tất cả') {
        // Xóa param type khỏi URL
        this.removeRealEstateTypeFromUrl();
      } else {
        // Mapping real estate type value sang URL param
        const typeMapping = {
          'Chung cư': 'apartment',
          'Nhà riêng': 'house',
          'Biệt thự': 'villa',
          'Đất nền': 'land'
        };

        const typeParam = typeMapping[realEstateTypeValue];
        if (typeParam) {
          this.addRealEstateTypeToUrl(typeParam);
        }
      }
      console.log('Đã chọn real estate type:', realEstateTypeValue);
    },

    // Hàm thêm param type vào URL cho real estate
    addRealEstateTypeToUrl(typeValue) {
      const url = new URL(window.location);
      url.searchParams.set('type', typeValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm type vào URL:', typeValue);
    },

    // Hàm xóa param type khỏi URL cho real estate
    removeRealEstateTypeFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('type');
      window.history.pushState({}, '', url);
      console.log('Đã xóa type khỏi URL');
    },

    // Hàm đọc param type từ URL và hiển thị trong dropdown cho real estate
    loadRealEstateTypeFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const typeParam = urlParams.get('type');

      if (typeParam) {
        // Mapping từ URL param sang real estate type value
        const reverseTypeMapping = {
          'chung-cu': 'Chung cư',
          'nha-rieng': 'Nhà riêng',
          'biet-thu': 'Biệt thự',
          'dat-nen': 'Đất nền'
        };

        const realEstateTypeValue = reverseTypeMapping[typeParam];
        if (realEstateTypeValue) {
          this.selectedRealEstateType = realEstateTypeValue;
          console.log('Đã load real estate type từ URL:', realEstateTypeValue);
        }
      }
    },

    // Hàm chọn bedrooms
    selectBedrooms(bedroomsValue) {
      this.selectedBedrooms = bedroomsValue;
      this.showBedroomsDropdown = false;

      if (bedroomsValue === 'Tất cả') {
        // Xóa param bedrooms-number khỏi URL
        this.removeBedroomsFromUrl();
      } else {
        // Mapping bedrooms value sang URL param
        const bedroomsMapping = {
          '1 phòng': '1',
          '2 phòng': '2',
          '3 phòng': '3',
          '4+ phòng': '4'
        };

        const bedroomsParam = bedroomsMapping[bedroomsValue];
        if (bedroomsParam) {
          this.addBedroomsToUrl(bedroomsParam);
        }
      }
      console.log('Đã chọn bedrooms:', bedroomsValue);
    },

    // Hàm thêm param bedrooms-number vào URL
    addBedroomsToUrl(bedroomsValue) {
      const url = new URL(window.location);
      url.searchParams.set('bedrooms-number', bedroomsValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm bedrooms-number vào URL:', bedroomsValue);
    },

    // Hàm xóa param bedrooms-number khỏi URL
    removeBedroomsFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('bedrooms-number');
      window.history.pushState({}, '', url);
      console.log('Đã xóa bedrooms-number khỏi URL');
    },

    // Hàm đọc param bedrooms-number từ URL và hiển thị trong dropdown
    loadBedroomsFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const bedroomsParam = urlParams.get('bedrooms-number');

      if (bedroomsParam) {
        // Mapping từ URL param sang bedrooms value
        const reverseBedroomsMapping = {
          '1': '1 phòng',
          '2': '2 phòng',
          '3': '3 phòng',
          '4': '4+ phòng'
        };

        const bedroomsValue = reverseBedroomsMapping[bedroomsParam];
        if (bedroomsValue) {
          this.selectedBedrooms = bedroomsValue;
          console.log('Đã load bedrooms từ URL:', bedroomsValue);
        }
      }
    },

    // Hàm chọn service type
    selectServiceType(serviceTypeValue) {
      this.selectedServiceType = serviceTypeValue;
      this.showServiceTypeDropdown = false;

      if (serviceTypeValue === 'Tất cả') {
        // Xóa param type khỏi URL
        this.removeServiceTypeFromUrl();
      } else {
        // Mapping service type value sang URL param (dạng slug)
        const typeMapping = {
          'Phần mềm': 'phan-mem',
          'Tư vấn': 'tu-van',
          'Thiết kế': 'thiet-ke',
          'Marketing': 'marketing'
        };

        const typeParam = typeMapping[serviceTypeValue];
        if (typeParam) {
          this.addServiceTypeToUrl(typeParam);
        }
      }
      console.log('Đã chọn service type:', serviceTypeValue);
    },

    // Hàm thêm param type vào URL cho service
    addServiceTypeToUrl(typeValue) {
      const url = new URL(window.location);
      url.searchParams.set('type', typeValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm type vào URL:', typeValue);
    },

    // Hàm xóa param type khỏi URL cho service
    removeServiceTypeFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('type');
      window.history.pushState({}, '', url);
      console.log('Đã xóa type khỏi URL');
    },

    // Hàm đọc param type từ URL và hiển thị trong dropdown cho service
    loadServiceTypeFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const typeParam = urlParams.get('type');

      if (typeParam) {
        // Mapping từ URL param sang service type value
        const reverseTypeMapping = {
          'phan-mem': 'Phần mềm',
          'tu-van': 'Tư vấn',
          'thiet-ke': 'Thiết kế',
          'marketing': 'Marketing'
        };

        const serviceTypeValue = reverseTypeMapping[typeParam];
        if (serviceTypeValue) {
          this.selectedServiceType = serviceTypeValue;
          console.log('Đã load service type từ URL:', serviceTypeValue);
        }
      }
    },

    // Hàm chọn service package
    selectServicePackage(servicePackageValue) {
      this.selectedServicePackage = servicePackageValue;
      this.showServicePackageDropdown = false;

      if (servicePackageValue === 'Tất cả') {
        // Xóa param package khỏi URL
        this.removeServicePackageFromUrl();
      } else {
        // Mapping service package value sang URL param
        const packageMapping = {
          'Miễn phí': 'mien-phi',
          'Cơ bản': 'co-ban',
          'Cao cấp': 'cao-cap',
          'Doanh nghiệp': 'doanh-nghiep'
        };

        const packageParam = packageMapping[servicePackageValue];
        if (packageParam) {
          this.addServicePackageToUrl(packageParam);
        }
      }
      console.log('Đã chọn service package:', servicePackageValue);
    },

    // Hàm thêm param package vào URL
    addServicePackageToUrl(packageValue) {
      const url = new URL(window.location);
      url.searchParams.set('package', packageValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm package vào URL:', packageValue);
    },

    // Hàm xóa param package khỏi URL
    removeServicePackageFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('package');
      window.history.pushState({}, '', url);
      console.log('Đã xóa package khỏi URL');
    },

    // Hàm đọc param package từ URL và hiển thị trong dropdown
    loadServicePackageFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const packageParam = urlParams.get('package');

      if (packageParam) {
        // Mapping từ URL param sang service package value
        const reversePackageMapping = {
          'free': 'Miễn phí',
          'basic': 'Cơ bản',
          'premium': 'Cao cấp',
          'enterprise': 'Doanh nghiệp'
        };

        const servicePackageValue = reversePackageMapping[packageParam];
        if (servicePackageValue) {
          this.selectedServicePackage = servicePackageValue;
          console.log('Đã load service package từ URL:', servicePackageValue);
        }
      }
    },

    // Hàm chọn industry
    selectIndustry(industryValue) {
      this.selectedIndustry = industryValue;
      this.showIndustryDropdown = false;

      if (industryValue === 'Tất cả') {
        // Xóa param industry khỏi URL
        this.removeIndustryFromUrl();
      } else {
        // Mapping industry value sang URL param (dạng slug)
        const industryMapping = {
          'Công nghệ': 'cong-nghe',
          'Tài chính': 'tai-chinh',
          'Y tế': 'y-te',
          'Giáo dục': 'giao-duc'
        };

        const industryParam = industryMapping[industryValue];
        if (industryParam) {
          this.addIndustryToUrl(industryParam);
        }
      }
      console.log('Đã chọn industry:', industryValue);
    },

    // Hàm thêm param industry vào URL
    addIndustryToUrl(industryValue) {
      const url = new URL(window.location);
      url.searchParams.set('industry', industryValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm industry vào URL:', industryValue);
    },

    // Hàm xóa param industry khỏi URL
    removeIndustryFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('industry');
      window.history.pushState({}, '', url);
      console.log('Đã xóa industry khỏi URL');
    },

    // Hàm đọc param industry từ URL và hiển thị trong dropdown
    loadIndustryFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const industryParam = urlParams.get('industry');

      if (industryParam) {
        // Mapping từ URL param sang industry value
        const reverseIndustryMapping = {
          'cong-nghe': 'Công nghệ',
          'tai-chinh': 'Tài chính',
          'y-te': 'Y tế',
          'giao-duc': 'Giáo dục'
        };

        const industryValue = reverseIndustryMapping[industryParam];
        if (industryValue) {
          this.selectedIndustry = industryValue;
          console.log('Đã load industry từ URL:', industryValue);
        }
      }
    },

    // Hàm chọn company size
    selectCompanySize(companySizeValue) {
      this.selectedCompanySize = companySizeValue;
      this.showCompanySizeDropdown = false;

      if (companySizeValue === 'Tất cả') {
        // Xóa param company-size khỏi URL
        this.removeCompanySizeFromUrl();
      } else {
        // Mapping company size value sang URL param
        const companySizeMapping = {
          '1-10 nhân viên': '1-10',
          '11-50 nhân viên': '11-50',
          '51-200 nhân viên': '51-200',
          '200+ nhân viên': '200+'
        };

        const companySizeParam = companySizeMapping[companySizeValue];
        if (companySizeParam) {
          this.addCompanySizeToUrl(companySizeParam);
        }
      }
      console.log('Đã chọn company size:', companySizeValue);
    },

    // Hàm thêm param company-size vào URL
    addCompanySizeToUrl(companySizeValue) {
      const url = new URL(window.location);
      url.searchParams.set('company-size', companySizeValue);
      window.history.pushState({}, '', url);
      console.log('Đã thêm company-size vào URL:', companySizeValue);
    },

    // Hàm xóa param company-size khỏi URL
    removeCompanySizeFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('company-size');
      window.history.pushState({}, '', url);
      console.log('Đã xóa company-size khỏi URL');
    },

    // Hàm đọc param company-size từ URL và hiển thị trong dropdown
    loadCompanySizeFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const companySizeParam = urlParams.get('company-size');

      if (companySizeParam) {
        // Mapping từ URL param sang company size value
        const reverseCompanySizeMapping = {
          '1-10': '1-10 nhân viên',
          '11-50': '11-50 nhân viên',
          '51-200': '51-200 nhân viên',
          '200+': '200+ nhân viên'
        };

        const companySizeValue = reverseCompanySizeMapping[companySizeParam];
        if (companySizeValue) {
          this.selectedCompanySize = companySizeValue;
          console.log('Đã load company size từ URL:', companySizeValue);
        }
      }
    },

    // News category dropdown methods
    toggleNewsCategoryDropdown() {
      this.showNewsCategoryDropdown = !this.showNewsCategoryDropdown;
    },

    selectNewsCategory(category, slug) {
      this.selectedNewsCategory = category;
      this.showNewsCategoryDropdown = false;
      this.updateUrlWithType(slug);
    },

    // News source dropdown methods
    toggleNewsSourceDropdown() {
      this.showNewsSourceDropdown = !this.showNewsSourceDropdown;
    },

    selectNewsSource(source, slug) {
      this.selectedNewsSource = source;
      this.showNewsSourceDropdown = false;
      this.updateUrlWithSource(slug);
    },

    // Update URL with type parameter
    updateUrlWithType(slug) {
      const url = new URL(window.location);

      if (slug && slug !== '') {
        url.searchParams.set('type', slug);
      } else {
        url.searchParams.delete('type');
      }

      // Update URL without page reload
      window.history.pushState({}, '', url);
      console.log('Đã cập nhật URL với type parameter:', slug || 'removed');
    },

    // Update URL with source parameter
    updateUrlWithSource(slug) {
      const url = new URL(window.location);

      if (slug && slug !== '') {
        url.searchParams.set('source', slug);
      } else {
        url.searchParams.delete('source');
      }

      // Update URL without page reload
      window.history.pushState({}, '', url);
      console.log('Đã cập nhật URL với source parameter:', slug || 'removed');
    },

    // Load type parameter from URL on page load
    loadTypeFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const typeParam = urlParams.get('type');

      if (typeParam) {
        // Mapping từ URL param sang category
        const typeMapping = {
          'tin-dia-phuong': 'Tin địa phương',
          'kinh-doanh': 'Kinh doanh',
          'cong-nghe': 'Công nghệ',
          'doi-song': 'Đời sống'
        };

        const categoryName = typeMapping[typeParam];
        if (categoryName) {
          this.selectedNewsCategory = categoryName;
        }
      }
    },

    // Load source parameter from URL on page load
    loadSourceFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const sourceParam = urlParams.get('source');

      if (sourceParam) {
        // Mapping từ URL param sang source
        const sourceMapping = {
          'tin-tuc-dia-phuong': 'Tin tức địa phương',
          'vnexpress': 'VnExpress',
          'tuoi-tre': 'Tuổi Trẻ',
          'thanh-nien': 'Thanh Niên'
        };

        const sourceName = sourceMapping[sourceParam];
        if (sourceName) {
          this.selectedNewsSource = sourceName;
        }
      }
    },

    // Location type dropdown methods
    toggleLocationTypeDropdown() {
      this.showLocationTypeDropdown = !this.showLocationTypeDropdown;
    },

    selectLocationType(type, slug) {
      this.selectedLocationType = type;
      this.showLocationTypeDropdown = false;
      this.updateUrlWithLocationType(slug);
    },

    // Update URL with location type parameter
    updateUrlWithLocationType(slug) {
      const url = new URL(window.location);

      if (slug && slug !== '') {
        url.searchParams.set('type', slug);
      } else {
        url.searchParams.delete('type');
      }

      // Update URL without page reload
      window.history.pushState({}, '', url);
      console.log('Đã cập nhật URL với location type parameter:', slug || 'removed');
    },

    // Load location type parameter from URL on page load
    loadLocationTypeFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const typeParam = urlParams.get('type');

      if (typeParam) {
        // Mapping từ URL param sang location type
        const typeMapping = {
          'nha-hang': 'Nhà hàng',
          'khach-san': 'Khách sạn',
          'diem-tham-quan': 'Điểm tham quan',
          'mua-sam': 'Mua sắm'
        };

        const typeName = typeMapping[typeParam];
        if (typeName) {
          this.selectedLocationType = typeName;
        }
      }
    },

    // Clear all filters and remove all filter parameters from URL
    clearAllFilters() {
      // Reset all dropdown selections to default
      this.selectedTime = 'Tất cả';
      this.selectedRating = 'Tất cả';
      this.selectedJobSort = 'Liên quan';
      this.selectedRealEstateSort = 'Liên quan';
      this.selectedServiceSort = 'Liên quan';
      this.selectedCompanySort = 'Liên quan';
      this.selectedNewsSort = 'Liên quan';
      this.selectedLocationSort = 'Liên quan';
      this.selectedJobType = 'Tất cả';
      this.selectedExperience = 'Tất cả';
      this.selectedRealEstateType = 'Tất cả';
      this.selectedBedrooms = 'Tất cả';
      this.selectedServiceType = 'Tất cả';
      this.selectedServicePackage = 'Tất cả';
      this.selectedIndustry = 'Tất cả';
      this.selectedCompanySize = 'Tất cả';
      this.selectedNewsCategory = 'Tất cả';
      this.selectedNewsSource = 'Tất cả';
      this.selectedLocationType = 'Tất cả';

      // Clear all input values
      this.locationSearch = '';
      this.selectedLocation = null;
      this.salaryValue = '';
      this.areaValue = '';
      this.distanceValue = '';

      // Close all dropdowns
      this.showTimeDropdown = false;
      this.showRatingDropdown = false;
      this.showJobSortDropdown = false;
      this.showRealEstateSortDropdown = false;
      this.showServiceSortDropdown = false;
      this.showCompanySortDropdown = false;
      this.showNewsSortDropdown = false;
      this.showLocationSortDropdown = false;
      this.showJobTypeDropdown = false;
      this.showExperienceDropdown = false;
      this.showRealEstateTypeDropdown = false;
      this.showBedroomsDropdown = false;
      this.showServiceTypeDropdown = false;
      this.showServicePackageDropdown = false;
      this.showIndustryDropdown = false;
      this.showCompanySizeDropdown = false;
      this.showNewsCategoryDropdown = false;
      this.showNewsSourceDropdown = false;
      this.showLocationTypeDropdown = false;
      this.showLocationDropdown = false;

      // Clear URL parameters
      this.clearAllUrlParameters();

      console.log('Đã xóa tất cả bộ lọc');
    },

    // Clear all filter parameters from URL
    clearAllUrlParameters() {
      const url = new URL(window.location);

      // List of all filter parameters to remove
      const filterParams = [
        'location', 'time', 'rating-min', 'tab', 'sort', 'type', 'experience',
        'salary', 'area', 'distance', 'bedrooms-number', 'package', 'industry',
        'company-size', 'source'
      ];

      // Remove all filter parameters
      filterParams.forEach(param => {
        url.searchParams.delete(param);
      });

      // Update URL without page reload
      window.history.pushState({}, '', url);
      console.log('Đã xóa tất cả parameters khỏi URL');
    },
  }));
});

