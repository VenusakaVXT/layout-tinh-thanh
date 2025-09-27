// Doanh Nghiệp Component - Alpine.js
function doanhNghiepComponent() {
  return {
    // Filter states
    selectedField: 'Tất cả lĩnh vực',
    selectedScale: 'Tất cả quy mô',
    selectedArea: 'Tất cả khu vực',
    isVerified: false,
    isFeatured: false,

    // Dropdown states
    isFieldDropdownOpen: false,
    isScaleDropdownOpen: false,
    isAreaDropdownOpen: false,

    // Counter animation
    isCountersAnimated: false,
    stats: {
      companies: 0,
      fields: 0,
      jobs: 0,
      support: 0
    },
    finalStats: {
      companies: 15,
      fields: 20,
      jobs: 500,
      support: 24
    },
    animationDuration: 2000,

    // Sorting and pagination
    selectedSort: 'Mới nhất',
    isSortDropdownOpen: false,
    currentPage: 1,
    itemsPerPage: 8,
    totalCompanies: 15,

    // View mode
    viewMode: 'grid', // 'grid' or 'list'
    gridItemsPerPage: 8,
    listItemsPerPage: 4,

    // Carousel for Dịch Vụ Nổi Bật
    currentServiceSlide: 0,
    servicesPerSlide: 6,

    // Carousel for Việc Làm Đề Xuất
    currentJobSlide: 0,
    jobsPerSlide: 6,

    // Carousel for Tin Tức Bình Dương
    currentNewsSlide: 0,
    newsPerSlide: 4,
    companies: [
      {
        id: 1,
        name: 'Tập đoàn Vingroup',
        field: 'Đa ngành',
        location: 'Phường Thuận Giao, TP. Thuận An, Bình Dương',
        rating: 4.5,
        verified: true,
        featured: true,
        established: '1993',
        views: 1250,
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        name: 'Công ty TNHH Samsung Electronics',
        field: 'Công nghệ',
        location: 'Khu công nghiệp VSIP, Bình Dương',
        rating: 4.8,
        verified: true,
        featured: false,
        established: '2008',
        views: 2100,
        createdAt: '2024-01-10'
      },
      {
        id: 3,
        name: 'Công ty CP Đầu tư Thế Giới Di Động',
        field: 'Thương mại',
        location: 'TP. Thủ Dầu Một, Bình Dương',
        rating: 4.2,
        verified: true,
        featured: true,
        established: '2004',
        views: 980,
        createdAt: '2024-01-20'
      },
      {
        id: 4,
        name: 'Công ty TNHH Canon Việt Nam',
        field: 'Sản xuất',
        location: 'Khu công nghiệp Mỹ Phước, Bình Dương',
        rating: 4.6,
        verified: true,
        featured: false,
        established: '2001',
        views: 1560,
        createdAt: '2024-01-05'
      },
      {
        id: 5,
        name: 'Công ty TNHH Pou Yuen Việt Nam',
        field: 'Sản xuất',
        location: 'Khu công nghiệp Bình Dương, Bình Dương',
        rating: 4.3,
        verified: true,
        featured: false,
        established: '1996',
        views: 890,
        createdAt: '2024-01-18'
      },
      {
        id: 6,
        name: 'Công ty CP FPT Software',
        field: 'Công nghệ thông tin',
        location: 'TP. Thủ Dầu Một, Bình Dương',
        rating: 4.7,
        verified: true,
        featured: true,
        established: '1999',
        views: 3200,
        createdAt: '2024-01-12'
      },
      {
        id: 7,
        name: 'Công ty TNHH Nestlé Việt Nam',
        field: 'Thực phẩm',
        location: 'Khu công nghiệp Đồng An, Bình Dương',
        rating: 4.4,
        verified: true,
        featured: false,
        established: '1995',
        views: 1450,
        createdAt: '2024-01-08'
      },
      {
        id: 8,
        name: 'Công ty TNHH Intel Products Việt Nam',
        field: 'Công nghệ',
        location: 'Khu công nghiệp VSIP, Bình Dương',
        rating: 4.9,
        verified: true,
        featured: true,
        established: '2010',
        views: 2800,
        createdAt: '2024-01-03'
      },
      {
        id: 9,
        name: 'Công ty CP Đầu tư Xây dựng Bình Dương',
        field: 'Xây dựng',
        location: 'TP. Thủ Dầu Một, Bình Dương',
        rating: 4.1,
        verified: false,
        featured: false,
        established: '2000',
        views: 650,
        createdAt: '2024-01-25'
      },
      {
        id: 10,
        name: 'Công ty TNHH Unilever Việt Nam',
        field: 'Tiêu dùng',
        location: 'Khu công nghiệp Đồng An, Bình Dương',
        rating: 4.5,
        verified: true,
        featured: false,
        established: '1995',
        views: 1800,
        createdAt: '2024-01-14'
      },
      {
        id: 11,
        name: 'Công ty TNHH Panasonic Việt Nam',
        field: 'Điện tử',
        location: 'Khu công nghiệp Mỹ Phước, Bình Dương',
        rating: 4.3,
        verified: true,
        featured: false,
        established: '2006',
        views: 1200,
        createdAt: '2024-01-22'
      },
      {
        id: 12,
        name: 'Công ty CP Đầu tư Phát triển Bình Dương',
        field: 'Bất động sản',
        location: 'TP. Thủ Dầu Một, Bình Dương',
        rating: 4.0,
        verified: false,
        featured: false,
        established: '2002',
        views: 750,
        createdAt: '2024-01-16'
      },
      {
        id: 13,
        name: 'Công ty TNHH LG Electronics Việt Nam',
        field: 'Điện tử',
        location: 'Khu công nghiệp VSIP, Bình Dương',
        rating: 4.4,
        verified: true,
        featured: false,
        established: '2007',
        views: 1650,
        createdAt: '2024-01-11'
      },
      {
        id: 14,
        name: 'Công ty TNHH Nike Việt Nam',
        field: 'Thể thao',
        location: 'Khu công nghiệp Bình Dương, Bình Dương',
        rating: 4.6,
        verified: true,
        featured: true,
        established: '2009',
        views: 2200,
        createdAt: '2024-01-07'
      },
      {
        id: 15,
        name: 'Công ty CP Đầu tư Thương mại Bình Dương',
        field: 'Thương mại',
        location: 'TP. Thủ Dầu Một, Bình Dương',
        rating: 3.9,
        verified: false,
        featured: false,
        established: '2003',
        views: 580,
        createdAt: '2024-01-28'
      }
    ],

    // Services data for carousel
    services: [
      {
        id: 1,
        title: 'Thiết kế website chuyên nghiệp',
        category: 'Thiết kế web',
        provider: 'Nguyễn Văn A',
        rating: 4.5,
        reviews: 45,
        price: '5 - 20 triệu VNĐ',
        featured: true
      },
      {
        id: 2,
        title: 'Dịch vụ SEO tăng thứ hạng Google',
        category: 'Digital Marketing',
        provider: 'Trần Thị B',
        rating: 4.2,
        reviews: 67,
        price: '3 - 15 triệu VNĐ',
        featured: true
      },
      {
        id: 3,
        title: 'Chụp ảnh sản phẩm chuyên nghiệp',
        category: 'Nhiếp ảnh',
        provider: 'Lê Văn C',
        rating: 4.8,
        reviews: 89,
        price: '500k - 2 triệu VNĐ',
        featured: true
      },
      {
        id: 4,
        title: 'Thiết kế logo và nhận diện thương hiệu',
        category: 'Thiết kế đồ họa',
        provider: 'Phạm Thị D',
        rating: 4.0,
        reviews: 34,
        price: '1 - 5 triệu VNĐ',
        featured: true
      },
      {
        id: 5,
        title: 'Dịch vụ kế toán doanh nghiệp',
        category: 'Kế toán',
        provider: 'Hoàng Văn E',
        rating: 4.3,
        reviews: 56,
        price: '2 - 8 triệu VNĐ',
        featured: true
      },
      {
        id: 6,
        title: 'Dịch vụ quay phim sự kiện',
        category: 'Quay phim',
        provider: 'Nguyễn Thị F',
        rating: 4.6,
        reviews: 78,
        price: '3 - 12 triệu VNĐ',
        featured: true
      },
      {
        id: 7,
        title: 'Dịch vụ dọn dẹp nhà cửa',
        category: 'Dọn dẹp',
        provider: 'Trần Văn G',
        rating: 4.7,
        reviews: 123,
        price: '200k - 1 triệu VNĐ',
        featured: false
      },
      {
        id: 8,
        title: 'Dịch vụ sửa chữa điện tử',
        category: 'Sửa chữa',
        provider: 'Lê Thị H',
        rating: 4.1,
        reviews: 67,
        price: '100k - 2 triệu VNĐ',
        featured: false
      },
      {
        id: 9,
        title: 'Dịch vụ gia sư toán lý hóa',
        category: 'Gia sư',
        provider: 'Phạm Văn I',
        rating: 4.4,
        reviews: 45,
        price: '150k - 500k VNĐ/buổi',
        featured: false
      },
      {
        id: 10,
        title: 'Dịch vụ trang trí tiệc cưới',
        category: 'Trang trí',
        provider: 'Hoàng Thị J',
        rating: 4.9,
        reviews: 92,
        price: '5 - 30 triệu VNĐ',
        featured: true
      },
      {
        id: 11,
        title: 'Dịch vụ vận chuyển hàng hóa',
        category: 'Vận chuyển',
        provider: 'Nguyễn Văn K',
        rating: 4.2,
        reviews: 156,
        price: '50k - 500k VNĐ',
        featured: false
      },
      {
        id: 12,
        title: 'Dịch vụ massage tại nhà',
        category: 'Sức khỏe',
        provider: 'Trần Thị L',
        rating: 4.5,
        reviews: 78,
        price: '300k - 800k VNĐ',
        featured: false
      }
    ],

    // Sample job data for Việc Làm Đề Xuất
    jobs: [
      {
        id: 1,
        title: 'Kỹ sư Phần mềm Senior',
        company: 'Công ty TNHH Samsung Electronics Việt Nam',
        salary: '25-35 tr',
        location: 'KCN VSIP I, Thuận An',
        experience: '3-5 năm',
        type: 'Toàn thời gian',
        skills: ['React', 'Node.js'],
        views: 245,
        date: '21-12',
        urgent: false
      },
      {
        id: 2,
        title: 'Nhân viên Kế toán Tổng hợp',
        company: 'Tập đoàn Becamex IDC',
        salary: '12-18 tr',
        location: 'TP. Thủ Dầu Một',
        experience: '2-3 năm',
        type: 'Toàn thời gian',
        skills: ['Excel', 'SAP'],
        views: 189,
        date: '21-12',
        urgent: true
      },
      {
        id: 3,
        title: 'Chuyên viên Marketing Digital',
        company: 'Công ty CP Đầu tư Địa ốc Đại Quang Minh',
        salary: '15-20 tr',
        location: 'TP. Dĩ An',
        experience: '1-3 năm',
        type: 'Toàn thời gian',
        skills: ['Facebook Ads', 'Google Ads'],
        views: 156,
        date: '21-12',
        urgent: false
      },
      {
        id: 4,
        title: 'Công nhân Sản xuất',
        company: 'Công ty TNHH Pouchen Việt Nam',
        salary: '8-12 tr',
        location: 'KCN Đồng An, Thuận An',
        experience: 'Không yêu cầu',
        type: 'Toàn thời gian',
        skills: ['Thao tác máy', 'Làm việc nhóm'],
        views: 312,
        date: '20-12',
        urgent: true
      },
      {
        id: 5,
        title: 'Giáo viên Tiếng Anh',
        company: 'Trường Quốc tế Việt Úc',
        salary: '18-25 tr',
        location: 'TP. Thủ Dầu Một',
        experience: '2+ năm',
        type: 'Toàn thời gian',
        skills: ['IELTS', 'TOEFL'],
        views: 98,
        date: '20-12',
        urgent: false
      },
      {
        id: 6,
        title: 'Nhân viên Kinh doanh B2B',
        company: 'Công ty CP Thép Hòa Phát',
        salary: '15-30 tr',
        location: 'KCN Mỹ Phước, Bến Cát',
        experience: '1-2 năm',
        type: 'Toàn thời gian',
        skills: ['Bán hàng B2B', 'Đàm phán'],
        views: 167,
        date: '20-12',
        urgent: true
      },
      {
        id: 7,
        title: 'Lập trình viên Mobile (React Native)',
        company: 'Công ty TNHH Phần mềm FPT',
        salary: '20-28 tr',
        location: 'TP. Thủ Dầu Một',
        experience: '2-4 năm',
        type: 'Toàn thời gian',
        skills: ['React Native', 'JavaScript'],
        views: 134,
        date: '20-12',
        urgent: false
      },
      {
        id: 8,
        title: 'Nhân viên Nhân sự',
        company: 'Tập đoàn Vingroup',
        salary: '12-16 tr',
        location: 'TP. Thuận An',
        experience: '1-2 năm',
        type: 'Toàn thời gian',
        skills: ['Tuyển dụng', 'Đào tạo'],
        views: 203,
        date: '20-12',
        urgent: false
      },
      {
        id: 9,
        title: 'Kỹ sư Cơ khí',
        company: 'Công ty TNHH Denso Việt Nam',
        salary: '18-25 tr',
        location: 'KCN VSIP II, Bình Dương',
        experience: '2-5 năm',
        type: 'Toàn thời gian',
        skills: ['AutoCAD', 'SolidWorks'],
        views: 178,
        date: '19-12',
        urgent: true
      },
      {
        id: 10,
        title: 'Chuyên viên Pháp chế',
        company: 'Công ty CP Đầu tư Bất động sản Novaland',
        salary: '16-22 tr',
        location: 'TP. Thủ Dầu Một',
        experience: '2-3 năm',
        type: 'Toàn thời gian',
        skills: ['Luật Dân sự', 'Luật Đất đai'],
        views: 89,
        date: '19-12',
        urgent: false
      },
      {
        id: 11,
        title: 'Nhân viên Thiết kế Đồ họa',
        company: 'Công ty TNHH Quảng cáo Ogilvy',
        salary: '10-15 tr',
        location: 'TP. Dĩ An',
        experience: '0-2 năm',
        type: 'Toàn thời gian',
        skills: ['Photoshop', 'Illustrator'],
        views: 145,
        date: '19-12',
        urgent: false
      },
      {
        id: 12,
        title: 'Quản lý Cửa hàng',
        company: 'Hệ thống Siêu thị Co.opmart',
        salary: '14-20 tr',
        location: 'TP. Thuận An',
        experience: '3-5 năm',
        type: 'Toàn thời gian',
        skills: ['Quản lý bán lẻ', 'Lãnh đạo'],
        views: 267,
        date: '19-12',
        urgent: true
      }
    ],

    // Sample news data for Tin Tức Bình Dương
    news: [
      {
        id: 1,
        title: 'Bình Dương thu hút 2,5 tỷ USD vốn đầu tư nước ngoài trong năm 2024',
        category: 'Kinh Tế',
        author: 'Nguyễn Văn A',
        date: '21-12',
        views: 1250,
        featured: true,
        excerpt: 'Tỉnh Bình Dương tiếp tục khẳng định vị thế là điểm đến hấp dẫn cho các nhà đầu tư quốc tế với nhiều dự án lớn được triển khai.'
      },
      {
        id: 2,
        title: 'Khánh thành cầu vượt Mỹ Phước - Tân Vạn, giảm ùn tắc giao thông',
        category: 'Giao Thông',
        author: 'Trần Thị B',
        date: '21-12',
        views: 890,
        featured: false,
        excerpt: 'Cầu vượt Mỹ Phước - Tân Vạn chính thức đưa vào sử dụng, góp phần giải quyết tình trạng ùn tắc giao thông tại khu vực.'
      },
      {
        id: 3,
        title: 'Lễ hội Văn hóa Dân gian Bình Dương 2024 thu hút hàng nghìn du khách',
        category: 'Văn Hóa',
        author: 'Lê Văn C',
        date: '21-12',
        views: 650,
        featured: false,
        excerpt: 'Lễ hội diễn ra tại Trung tâm Văn hóa tỉnh với nhiều hoạt động đặc sắc, giới thiệu văn hóa truyền thống địa phương.'
      },
      {
        id: 16,
        title: 'Khu du lịch Đại Nam thu hút hơn 2 triệu lượt khách trong năm 2024',
        category: 'Du Lịch',
        author: 'Nguyễn Thị P',
        date: '20-12',
        views: 1200,
        featured: false,
        excerpt: 'Khu du lịch Đại Nam tiếp tục là điểm đến hấp dẫn với nhiều trò chơi và dịch vụ giải trí đa dạng.'
      },
      {
        id: 17,
        title: 'Chùa Bà Đen - Điểm du lịch tâm linh nổi tiếng của Tây Ninh gần Bình Dương',
        category: 'Du Lịch',
        author: 'Trần Văn Q',
        date: '19-12',
        views: 980,
        featured: true,
        excerpt: 'Chùa Bà Đen với cáp treo hiện đại và không gian tâm linh thanh tịnh thu hút du khách thập phương.'
      },
      {
        id: 18,
        title: 'Khu sinh thái Trăm Trứng - Thiên đường xanh giữa lòng Bình Dương',
        category: 'Du Lịch',
        author: 'Lê Thị R',
        date: '18-12',
        views: 750,
        featured: false,
        excerpt: 'Khu sinh thái với không gian xanh mát, hồ nước trong xanh và các hoạt động vui chơi hấp dẫn.'
      },
      {
        id: 19,
        title: 'Bánh tráng nướng Trang Bang - Đặc sản không thể bỏ qua khi đến Bình Dương',
        category: 'Ẩm Thực',
        author: 'Phạm Văn S',
        date: '20-12',
        views: 890,
        featured: false,
        excerpt: 'Bánh tráng nướng với hương vị đặc trưng, ăn kèm với các loại rau sống và nước chấm đậm đà.'
      },
      {
        id: 20,
        title: 'Chợ đêm Thủ Dầu Một - Thiên đường ẩm thực đường phố',
        category: 'Ẩm Thực',
        author: 'Hoàng Thị T',
        date: '20-12',
        views: 1100,
        featured: false,
        excerpt: 'Chợ đêm với hàng trăm món ăn đường phố đa dạng, từ truyền thống đến hiện đại.'
      }
    ],

    sortOptions: [
      'Mới nhất',
      'Đánh giá cao nhất',
      'Quy mô lớn nhất',
      'Tên A-Z',
      'Thành lập lâu nhất',
      'Xem nhiều nhất'
    ],

    // Filter options
    fieldOptions: [
      'Tất cả lĩnh vực',
      'Công nghệ thông tin',
      'Sản xuất',
      'Thương mại',
      'Dịch vụ',
      'Xây dựng',
      'Nông nghiệp',
      'Du lịch',
      'Giáo dục',
      'Y tế'
    ],

    scaleOptions: [
      'Tất cả quy mô',
      '1-10 nhân viên',
      '11-50 nhân viên',
      '51-200 nhân viên',
      '201-500 nhân viên',
      '500+ nhân viên'
    ],

    areaOptions: [
      'Tất cả khu vực',
      'Thủ Dầu Một',
      'Dĩ An',
      'Thuận An',
      'Tân Uyên',
      'Bến Cát',
      'Bàu Bàng',
      'Dầu Tiếng',
      'Phú Giáo',
      'Bắc Tân Uyên'
    ],

    // Initialize component
    init() {
      this.setupEventListeners();
      this.startCounterAnimation();
    },

    // Setup event listeners
    setupEventListeners() {
      // Close dropdowns when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
          this.isFieldDropdownOpen = false;
          this.isScaleDropdownOpen = false;
          this.isAreaDropdownOpen = false;
          this.isSortDropdownOpen = false;
        }
      });
    },

    // Field dropdown methods
    toggleFieldDropdown() {
      this.isFieldDropdownOpen = !this.isFieldDropdownOpen;
      this.isScaleDropdownOpen = false;
      this.isAreaDropdownOpen = false;
      this.isSortDropdownOpen = false;
    },

    selectField(option) {
      this.selectedField = option;
      this.isFieldDropdownOpen = false;
      this.currentPage = 1; // Reset to first page when filtering
    },

    // Scale dropdown methods
    toggleScaleDropdown() {
      this.isScaleDropdownOpen = !this.isScaleDropdownOpen;
      this.isFieldDropdownOpen = false;
      this.isAreaDropdownOpen = false;
      this.isSortDropdownOpen = false;
    },

    selectScale(option) {
      this.selectedScale = option;
      this.isScaleDropdownOpen = false;
      this.currentPage = 1; // Reset to first page when filtering
    },

    // Area dropdown methods
    toggleAreaDropdown() {
      this.isAreaDropdownOpen = !this.isAreaDropdownOpen;
      this.isFieldDropdownOpen = false;
      this.isScaleDropdownOpen = false;
      this.isSortDropdownOpen = false;
    },

    selectArea(option) {
      this.selectedArea = option;
      this.isAreaDropdownOpen = false;
      this.currentPage = 1; // Reset to first page when filtering
    },

    // Checkbox methods
    toggleVerified() {
      this.isVerified = !this.isVerified;
      this.currentPage = 1; // Reset to first page when filtering
    },

    toggleFeatured() {
      this.isFeatured = !this.isFeatured;
      this.currentPage = 1; // Reset to first page when filtering
    },

    // Clear all filters
    clearAllFilters() {
      this.selectedField = 'Tất cả lĩnh vực';
      this.selectedScale = 'Tất cả quy mô';
      this.selectedArea = 'Tất cả khu vực';
      this.isVerified = false;
      this.isFeatured = false;
      this.isFieldDropdownOpen = false;
      this.isScaleDropdownOpen = false;
      this.isAreaDropdownOpen = false;
      this.isSortDropdownOpen = false;
      this.currentPage = 1; // Reset to first page when clearing filters
    },

    // Sort dropdown methods
    toggleSortDropdown() {
      this.isSortDropdownOpen = !this.isSortDropdownOpen;
      this.isFieldDropdownOpen = false;
      this.isScaleDropdownOpen = false;
      this.isAreaDropdownOpen = false;
    },

    selectSort(option) {
      this.selectedSort = option;
      this.isSortDropdownOpen = false;
      this.currentPage = 1; // Reset to first page when sorting
    },

    toggleSortDropdown() {
      this.isSortDropdownOpen = !this.isSortDropdownOpen;
      this.isFieldDropdownOpen = false;
      this.isScaleDropdownOpen = false;
      this.isAreaDropdownOpen = false;
    },

    // Pagination methods
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

    // View mode methods
    toggleViewMode() {
      this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
      this.currentPage = 1; // Reset to first page when changing view
    },

    isGridView() {
      return this.viewMode === 'grid';
    },

    isListView() {
      return this.viewMode === 'list';
    },

    // Carousel methods
    nextServiceSlide() {
      if (this.currentServiceSlide < this.totalServiceSlides - 1) {
        this.currentServiceSlide++;
      } else {
        this.currentServiceSlide = 0; // Loop back to first
      }
      this.updateServiceSlidePosition();
    },

    prevServiceSlide() {
      if (this.currentServiceSlide > 0) {
        this.currentServiceSlide--;
      } else {
        this.currentServiceSlide = this.totalServiceSlides - 1; // Loop to last
      }
      this.updateServiceSlidePosition();
    },

    goToServiceSlide(slideIndex) {
      if (slideIndex >= 0 && slideIndex < this.totalServiceSlides) {
        this.currentServiceSlide = slideIndex;
        this.updateServiceSlidePosition();
      }
    },

    updateServiceSlidePosition() {
      this.$nextTick(() => {
        const container = this.$el.querySelector('.service-carousel-container');
        if (container) {
          // Each slide is 100% width, so we move by 100% per slide
          const translateX = -this.currentServiceSlide * 100;
          container.style.transform = `translateX(${translateX}%)`;
        }
      });
    },

    isServiceSlideActive(slideIndex) {
      return this.currentServiceSlide === slideIndex;
    },

    isServicePrevDisabled() {
      return this.currentServiceSlide === 0;
    },

    isServiceNextDisabled() {
      return this.currentServiceSlide === this.totalServiceSlides - 1;
    },

    // Job carousel methods
    nextJobSlide() {
      if (this.currentJobSlide < this.totalJobSlides - 1) {
        this.currentJobSlide++;
        this.updateJobSlidePosition();
      }
    },

    prevJobSlide() {
      if (this.currentJobSlide > 0) {
        this.currentJobSlide--;
        this.updateJobSlidePosition();
      }
    },

    goToJobSlide(slideIndex) {
      if (slideIndex >= 0 && slideIndex < this.totalJobSlides) {
        this.currentJobSlide = slideIndex;
        this.updateJobSlidePosition();
      }
    },

    updateJobSlidePosition() {
      this.$nextTick(() => {
        const carouselContainer = this.$el.querySelector('.job-carousel-container');
        if (carouselContainer) {
          const translateX = -(this.currentJobSlide * (100 / this.totalJobSlides));
          carouselContainer.style.transform = `translateX(${translateX}%)`;
        }
      });
    },

    isJobSlideActive(slideIndex) {
      return this.currentJobSlide === slideIndex;
    },

    isJobPrevDisabled() {
      return this.currentJobSlide === 0;
    },

    isJobNextDisabled() {
      return this.currentJobSlide >= this.totalJobSlides - 1;
    },

    // News carousel methods
    nextNewsSlide() {
      if (this.currentNewsSlide < this.totalNewsSlides - 1) {
        this.currentNewsSlide++;
        this.updateNewsSlidePosition();
      }
    },

    prevNewsSlide() {
      if (this.currentNewsSlide > 0) {
        this.currentNewsSlide--;
        this.updateNewsSlidePosition();
      }
    },

    goToNewsSlide(slideIndex) {
      if (slideIndex >= 0 && slideIndex < this.totalNewsSlides) {
        this.currentNewsSlide = slideIndex;
        this.updateNewsSlidePosition();
      }
    },

    updateNewsSlidePosition() {
      this.$nextTick(() => {
        const carouselContainer = this.$el.querySelector('.news-carousel-container');
        if (carouselContainer) {
          const translateX = -(this.currentNewsSlide * (100 / this.totalNewsSlides));
          carouselContainer.style.transform = `translateX(${translateX}%)`;
        }
      });
    },

    isNewsSlideActive(slideIndex) {
      return this.currentNewsSlide === slideIndex;
    },

    isNewsPrevDisabled() {
      return this.currentNewsSlide === 0;
    },

    isNewsNextDisabled() {
      return this.currentNewsSlide >= this.totalNewsSlides - 1;
    },

    // Counter animation
    startCounterAnimation() {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / this.animationDuration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        this.stats.companies = Math.floor(this.finalStats.companies * easeOut);
        this.stats.fields = Math.floor(this.finalStats.fields * easeOut);
        this.stats.jobs = Math.floor(this.finalStats.jobs * easeOut);
        this.stats.support = Math.floor(this.finalStats.support * easeOut);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.stats.companies = this.finalStats.companies;
          this.stats.fields = this.finalStats.fields;
          this.stats.jobs = this.finalStats.jobs;
          this.stats.support = this.finalStats.support;
          this.isCountersAnimated = true;
        }
      };

      setTimeout(() => requestAnimationFrame(animate), 300);
    },

    // Get dropdown classes
    getDropdownClasses(isOpen) {
      const baseClasses = 'absolute z-50 w-full overflow-hidden rounded-md border bg-white p-1 text-gray-900 shadow-md';
      const positionClasses = 'top-full left-0 mt-1';
      const visibilityClasses = isOpen ? 'opacity-100 visible' : 'opacity-0 invisible';
      return `${baseClasses} ${positionClasses} ${visibilityClasses}`;
    },

    // Get button classes for dropdowns
    getButtonClasses(isOpen) {
      const baseClasses = 'flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white/20 border-white/30 text-white';
      return baseClasses;
    },

    // Get checkbox classes
    getCheckboxClasses(isChecked) {
      const baseClasses = 'peer h-4 w-4 shrink-0 rounded-sm border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center';
      const checkedClasses = isChecked ? 'bg-blue-500 border-blue-500' : 'bg-transparent border-white';
      return `${baseClasses} ${checkedClasses}`;
    },

    // Get counter classes for animation
    getCounterClasses() {
      return this.isCountersAnimated ? 'animate-pulse' : '';
    },

    // Computed properties for filtering, sorting and pagination
    get filteredCompanies() {
      let filtered = [...this.companies];

      // Apply field filter
      if (this.selectedField !== 'Tất cả lĩnh vực') {
        filtered = filtered.filter(company => {
          const fieldMap = {
            'Công nghệ thông tin': ['Công nghệ thông tin', 'Công nghệ', 'Điện tử'],
            'Sản xuất': ['Sản xuất'],
            'Thương mại': ['Thương mại'],
            'Dịch vụ': ['Dịch vụ'],
            'Xây dựng': ['Xây dựng'],
            'Nông nghiệp': ['Nông nghiệp'],
            'Du lịch': ['Du lịch'],
            'Giáo dục': ['Giáo dục'],
            'Y tế': ['Y tế']
          };
          const allowedFields = fieldMap[this.selectedField] || [this.selectedField];
          return allowedFields.includes(company.field);
        });
      }

      // Apply scale filter (using views as proxy for company size)
      if (this.selectedScale !== 'Tất cả quy mô') {
        filtered = filtered.filter(company => {
          const views = company.views;
          switch (this.selectedScale) {
            case '1-10 nhân viên': return views < 500;
            case '11-50 nhân viên': return views >= 500 && views < 1000;
            case '51-200 nhân viên': return views >= 1000 && views < 2000;
            case '201-500 nhân viên': return views >= 2000 && views < 3000;
            case '500+ nhân viên': return views >= 3000;
            default: return true;
          }
        });
      }

      // Apply area filter
      if (this.selectedArea !== 'Tất cả khu vực') {
        filtered = filtered.filter(company => {
          const locationMap = {
            'Thủ Dầu Một': ['TP. Thủ Dầu Một', 'Thủ Dầu Một'],
            'Dĩ An': ['TP. Dĩ An', 'Dĩ An'],
            'Thuận An': ['TP. Thuận An', 'Thuận An', 'Phường Thuận Giao, TP. Thuận An'],
            'Tân Uyên': ['Tân Uyên'],
            'Bến Cát': ['Bến Cát', 'KCN Mỹ Phước, Bến Cát'],
            'Bàu Bàng': ['Bàu Bàng'],
            'Dầu Tiếng': ['Dầu Tiếng'],
            'Phú Giáo': ['Phú Giáo'],
            'Bắc Tân Uyên': ['Bắc Tân Uyên']
          };
          const allowedAreas = locationMap[this.selectedArea] || [this.selectedArea];
          return allowedAreas.some(area => company.location.includes(area));
        });
      }

      // Apply verified filter
      if (this.isVerified) {
        filtered = filtered.filter(company => company.verified);
      }

      // Apply featured filter
      if (this.isFeatured) {
        filtered = filtered.filter(company => company.featured);
      }

      return filtered;
    },

    get sortedCompanies() {
      let sorted = [...this.filteredCompanies];

      switch (this.selectedSort) {
        case 'Mới nhất':
          sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'Đánh giá cao nhất':
          sorted.sort((a, b) => b.rating - a.rating);
          break;
        case 'Quy mô lớn nhất':
          // Sort by views as a proxy for company size
          sorted.sort((a, b) => b.views - a.views);
          break;
        case 'Tên A-Z':
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'Thành lập lâu nhất':
          sorted.sort((a, b) => parseInt(a.established) - parseInt(b.established));
          break;
        case 'Xem nhiều nhất':
          sorted.sort((a, b) => b.views - a.views);
          break;
        default:
          break;
      }

      return sorted;
    },

    get totalPages() {
      return Math.ceil(this.filteredCompanies.length / this.currentItemsPerPage);
    },

    get paginatedCompanies() {
      const startIndex = (this.currentPage - 1) * this.currentItemsPerPage;
      const endIndex = startIndex + this.currentItemsPerPage;
      return this.sortedCompanies.slice(startIndex, endIndex);
    },

    get filteredCompaniesCount() {
      return this.filteredCompanies.length;
    },

    get currentItemsPerPage() {
      return this.viewMode === 'grid' ? this.gridItemsPerPage : this.listItemsPerPage;
    },

    get paginationPages() {
      const pages = [];
      const totalPages = this.totalPages;
      const currentPage = this.currentPage;

      // Always show first page
      if (totalPages > 0) {
        pages.push(1);
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      if (startPage > 2) {
        pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (endPage < totalPages - 1) {
        pages.push('...');
      }

      // Always show last page if there's more than one page
      if (totalPages > 1) {
        pages.push(totalPages);
      }

      return pages;
    },

    // Carousel computed properties
    get totalServiceSlides() {
      return Math.ceil(this.services.length / this.servicesPerSlide);
    },

    get paginatedServices() {
      const start = this.currentServiceSlide * this.servicesPerSlide;
      return this.services.slice(start, start + this.servicesPerSlide);
    },

    get servicePaginationDots() {
      return Array.from({ length: this.totalServiceSlides }, (_, i) => i);
    },

    // Job carousel computed properties
    get totalJobSlides() {
      return Math.ceil(this.jobs.length / this.jobsPerSlide);
    },

    get paginatedJobs() {
      const start = this.currentJobSlide * this.jobsPerSlide;
      return this.jobs.slice(start, start + this.jobsPerSlide);
    },

    get jobPaginationDots() {
      return Array.from({ length: this.totalJobSlides }, (_, i) => i);
    },

    // News carousel computed properties
    get totalNewsSlides() {
      return Math.ceil(this.news.length / this.newsPerSlide);
    },

    get paginatedNews() {
      const start = this.currentNewsSlide * this.newsPerSlide;
      return this.news.slice(start, start + this.newsPerSlide);
    },

    get newsPaginationDots() {
      return Array.from({ length: this.totalNewsSlides }, (_, i) => i);
    }
  };
}

// Initialize Alpine.js components when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
