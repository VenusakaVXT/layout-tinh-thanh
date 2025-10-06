// Alpine.js component for company search functionality
document.addEventListener('alpine:init', () => {
    Alpine.data('companySearchComponent', () => ({
        keyword: '',
        currentPage: 1,
        totalPages: 5,
        selectedSort: 'Liên quan',
        showSortDropdown: false,
        selectedPageSize: 12,
        showPageSizeDropdown: false,
        selectedIndustry: 'Tất cả ngành nghề',
        showIndustryDropdown: false,
        selectedSubIndustry: 'Tất cả lĩnh vực',
        showSubIndustryDropdown: false,
        selectedProvince: 'Tất cả tỉnh/thành',
        showProvinceDropdown: false,
        selectedDistrict: 'Tất cả quận/huyện',
        showDistrictDropdown: false,
        employeesMin: '',
        employeesMax: '',
        employeesError: '',
        revenueMin: '',
        revenueMax: '',
        revenueError: '',
        establishmentYear: '',
        establishmentYearError: '',
        minRating: 0,
        isRatingDragging: false,
        hasHiring: false,
        verified: false,
        active: false,
        selectedCertifications: [],
        selectedTags: [],
        appliedFilters: [],
        provinceMap: {
            'Tất cả tỉnh/thành': '',
            'TP. Hồ Chí Minh': 'ho-chi-minh',
            'Bình Dương': 'binh-duong',
            'Hà Nội': 'ha-noi',
            'Đà Nẵng': 'da-nang',
            'Đồng Nai': 'dong-nai'
        },
        districtMap: {
            'Bình Dương': {
                'Tất cả quận/huyện': '',
                'Bến Cát': 'ben-cat',
                'Dĩ An': 'di-an',
                'Thuận An': 'thuan-an',
                'Thủ Dầu Một': 'thu-dau-mot',
                'Tân Uyên': 'tan-uyen',
                'Bàu Bàng': 'bau-bang',
                'Dầu Tiếng': 'dau-tieng',
                'Phú Giáo': 'phu-giao'
            },
            'TP. Hồ Chí Minh': {
                'Tất cả quận/huyện': '',
                'Quận 1': 'quan-1',
                'Quận 2': 'quan-2',
                'Quận 3': 'quan-3',
                'Quận 4': 'quan-4',
                'Quận 5': 'quan-5',
                'Quận 6': 'quan-6',
                'Quận 7': 'quan-7',
                'Quận 8': 'quan-8',
                'Quận 9': 'quan-9',
                'Quận 10': 'quan-10',
                'Quận 11': 'quan-11',
                'Quận 12': 'quan-12',
                'Thủ Đức': 'thu-duc',
                'Gò Vấp': 'go-vap',
                'Bình Thạnh': 'binh-thanh',
                'Tân Bình': 'tan-binh',
                'Tân Phú': 'tan-phu',
                'Phú Nhuận': 'phu-nhuan',
                'Bình Tân': 'binh-tan',
                'Hóc Môn': 'hoc-mon',
                'Củ Chi': 'cu-chi',
                'Bình Chánh': 'binh-chanh',
                'Nhà Bè': 'nha-be',
                'Cần Giờ': 'can-gio'
            },
        },
        industryMap: {
            'Tất cả ngành nghề': '',
            'Bán lẻ': 'ban-le',
            'Bất động sản': 'bat-dong-san',
            'Công nghệ thông tin': 'cong-nghe-thong-tin',
            'Giáo dục': 'giao-duc',
            'Logistics': 'logistics',
            'Marketing': 'marketing',
            'Sản xuất': 'san-xuat',
            'Tài chính': 'tai-chinh',
            'Y tế': 'y-te',
            'Ô tô': 'o-to',
            'Đa ngành': 'da-nganh',
            'Điện tử - Công nghệ': 'dien-tu-cong-nghe'
        },
        subIndustryMap: {
            'Bất động sản': {
                'Tất cả lĩnh vực': '',
                'Phát triển bất động sản': 'phat-trien-bat-dong-san',
                'Phát triển dự án': 'phat-trien-du-an',
                'Đầu tư phát triển': 'dau-tu-phat-trien',
                'Môi giới & dịch vụ BĐS': 'moi-gioi-bds',
                'Quản lý bất động sản': 'quan-ly-bds'
            },
            'Công nghệ thông tin': {
                'Tất cả lĩnh vực': '',
                'Phần mềm': 'phan-mem',
                'Dịch vụ IT': 'dich-vu-it',
                'Thương mại điện tử': 'thuong-mai-dien-tu',
                'Trí tuệ nhân tạo (AI)': 'tri-tue-nhan-tao',
                'An ninh mạng': 'an-ninh-mang'
            },
            'Sản xuất': {
                'Tất cả lĩnh vực': '',
                'Sản xuất điện tử': 'san-xuat-dien-tu',
                'Sản xuất ô tô': 'san-xuat-o-to',
                'Sản xuất dệt may': 'san-xuat-det-may',
                'Sản xuất thực phẩm': 'san-xuat-thuc-pham',
                'Sản xuất cơ khí': 'san-xuat-co-khi'
            },
            'Bán lẻ': {
                'Tất cả lĩnh vực': '',
                'Siêu thị & cửa hàng tiện lợi': 'sieu-thi-cua-hang',
                'Thời trang & phụ kiện': 'thoi-trang-phu-kien',
                'Đồ gia dụng': 'do-gia-dung',
                'Thực phẩm & đồ uống': 'thuc-pham-do-uong'
            },
            'Giáo dục': {
                'Tất cả lĩnh vực': '',
                'Giáo dục phổ thông': 'giao-duc-pho-thong',
                'Đào tạo nghề': 'dao-tao-nghe',
                'Đại học & sau đại học': 'dai-hoc-sau-dai-hoc',
                'Đào tạo trực tuyến': 'dao-tao-truc-tuyen'
            },
            'Logistics': {
                'Tất cả lĩnh vực': '',
                'Vận tải đường bộ': 'van-tai-duong-bo',
                'Vận tải đường biển': 'van-tai-duong-bien',
                'Kho bãi & phân phối': 'kho-bai-phan-phoi',
                'Giao nhận nhanh': 'giao-nhan-nhanh'
            },
            'Marketing': {
                'Tất cả lĩnh vực': '',
                'Quảng cáo': 'quang-cao',
                'Digital Marketing': 'digital-marketing',
                'Quan hệ công chúng (PR)': 'pr',
                'Nghiên cứu thị trường': 'nghien-cuu-thi-truong'
            },
            'Tài chính': {
                'Tất cả lĩnh vực': '',
                'Ngân hàng': 'ngan-hang',
                'Chứng khoán': 'chung-khoan',
                'Bảo hiểm': 'bao-hiem',
                'Đầu tư': 'dau-tu'
            },
            'Y tế': {
                'Tất cả lĩnh vực': '',
                'Bệnh viện & phòng khám': 'benh-vien-phong-kham',
                'Dược phẩm': 'duoc-pham',
                'Trang thiết bị y tế': 'thiet-bi-y-te',
                'Chăm sóc sức khỏe': 'cham-soc-suc-khoe'
            },
            'Ô tô': {
                'Tất cả lĩnh vực': '',
                'Sản xuất ô tô': 'san-xuat-o-to',
                'Phân phối & đại lý': 'phan-phoi-o-to',
                'Phụ tùng & linh kiện': 'phu-tung-o-to',
                'Dịch vụ sửa chữa & bảo dưỡng': 'sua-chua-bao-duong'
            },
            'Điện tử - Công nghệ': {
                'Tất cả lĩnh vực': '',
                'Thiết bị điện tử': 'thiet-bi-dien-tu',
                'Công nghệ viễn thông': 'vien-thong',
                'Công nghệ tiêu dùng': 'cong-nghe-tieu-dung',
                'Nghiên cứu & phát triển': 'nghien-cuu-phat-trien'
            }
        },
        sortMap: {
            'Liên quan': 'relevance',
            'Mới nhất': 'newest',
            'Doanh thu cao → thấp': 'revenue-desc',
            'Doanh thu thấp → cao': 'revenue-asc',
            'Nhân sự nhiều → ít': 'employees-desc',
            'Nhân sự ít → nhiều': 'employees-asc',
            'Đánh giá cao → thấp': 'rating-desc',
            'Đánh giá thấp → cao': 'rating-asc',
            'Phổ biến': 'popular'
        },

        init() {
            // Get keyword from URL on page load
            const urlParams = new URLSearchParams(window.location.search);
            this.keyword = urlParams.get('keyword') || '';

            // Initialize pagination
            const pageParam = urlParams.get('page');
            this.currentPage = pageParam ? parseInt(pageParam) : 1;

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

            // Initialize industry
            const industryParam = urlParams.get('industry');
            if (industryParam) {
                const industryName = Object.keys(this.industryMap).find(name =>
                    this.industryMap[name] === industryParam
                );
                this.selectedIndustry = industryName || 'Tất cả ngành nghề';
            } else {
                this.selectedIndustry = 'Tất cả ngành nghề';
            }

            // Initialize sub-industry
            const subIndustryParam = urlParams.get('sub-industry');
            if (subIndustryParam) {
                const subIndustryName = Object.keys(this.subIndustryMap[this.selectedIndustry] || {}).find(name =>
                    this.subIndustryMap[this.selectedIndustry][name] === subIndustryParam
                );
                this.selectedSubIndustry = subIndustryName || 'Tất cả lĩnh vực';
            } else {
                this.selectedSubIndustry = 'Tất cả lĩnh vực';
            }

            // Initialize province
            const provinceParam = urlParams.get('province');
            if (provinceParam) {
                const provinceName = Object.keys(this.provinceMap).find(name =>
                    this.provinceMap[name] === provinceParam
                );
                this.selectedProvince = provinceName || 'Tất cả tỉnh/thành';
            } else {
                this.selectedProvince = 'Tất cả tỉnh/thành';
            }

            // Initialize district
            const districtParam = urlParams.get('district');
            if (districtParam) {
                const districtName = Object.keys(this.districtMap[this.selectedProvince] || {}).find(name =>
                    this.districtMap[this.selectedProvince][name] === districtParam
                );
                this.selectedDistrict = districtName || 'Tất cả quận/huyện';
            } else {
                this.selectedDistrict = 'Tất cả quận/huyện';
            }

            // Initialize employees
            this.employeesMin = urlParams.get('employees-min') || '';
            this.employeesMax = urlParams.get('employees-max') || '';
            this.validateEmployees();

            // Initialize revenue
            this.revenueMin = urlParams.get('revenue-min') || '';
            this.revenueMax = urlParams.get('revenue-max') || '';
            this.validateRevenue();

            // Initialize establishment year
            this.establishmentYear = urlParams.get('establishment-year') || '';
            this.validateEstablishmentYear();

            // Initialize rating
            const ratingParam = urlParams.get('rating-min');
            this.minRating = ratingParam ? parseFloat(ratingParam) : 0;

            // Initialize other options
            this.hasHiring = urlParams.get('has-hiring') === 'true';
            this.verified = urlParams.get('verified') === 'true';
            this.active = urlParams.get('active') === 'true';

            // Initialize certifications
            const certificationsParam = urlParams.get('certifications');
            if (certificationsParam) {
                this.selectedCertifications = certificationsParam.split(',');
            } else {
                this.selectedCertifications = [];
            }

            // Initialize tags
            const tagsParam = urlParams.get('tags');
            if (tagsParam) {
                this.selectedTags = tagsParam.split(',');
            } else {
                this.selectedTags = [];
            }

            // Update applied filters
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

        clearAllFilters() {
            this.keyword = '';
            this.currentPage = 1;
            this.selectedSort = 'Liên quan';
            this.selectedPageSize = 12;
            this.selectedIndustry = 'Tất cả ngành nghề';
            this.selectedSubIndustry = 'Tất cả lĩnh vực';
            this.selectedProvince = 'Tất cả tỉnh/thành';
            this.selectedDistrict = 'Tất cả quận/huyện';
            this.employeesMin = '';
            this.employeesMax = '';
            this.employeesError = '';
            this.revenueMin = '';
            this.revenueMax = '';
            this.revenueError = '';
            this.establishmentYear = '';
            this.establishmentYearError = '';
            this.minRating = 0;
            this.hasHiring = false;
            this.verified = false;
            this.active = false;
            this.selectedCertifications = [];
            this.selectedTags = [];

            const url = new URL(window.location);
            url.searchParams.delete('keyword');
            url.searchParams.delete('page');
            url.searchParams.delete('sort');
            url.searchParams.delete('page-size');
            url.searchParams.delete('industry');
            url.searchParams.delete('sub-industry');
            url.searchParams.delete('province');
            url.searchParams.delete('district');
            url.searchParams.delete('employees-min');
            url.searchParams.delete('employees-max');
            url.searchParams.delete('revenue-min');
            url.searchParams.delete('revenue-max');
            url.searchParams.delete('establishment-year');
            url.searchParams.delete('rating-min');
            url.searchParams.delete('has-hiring');
            url.searchParams.delete('verified');
            url.searchParams.delete('active');
            url.searchParams.delete('certifications');
            url.searchParams.delete('tags');

            window.history.pushState({}, '', url);
            this.updateAppliedFilters();
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

        // Industry dropdown functions
        toggleIndustryDropdown() {
            this.showIndustryDropdown = !this.showIndustryDropdown;
            if (this.showIndustryDropdown) {
                this.showSubIndustryDropdown = false;
            }
        },

        selectIndustry(industryName) {
            this.selectedIndustry = industryName;
            this.selectedSubIndustry = 'Tất cả lĩnh vực';
            this.showIndustryDropdown = false;
            this.updateIndustryInURL();
            this.updateAppliedFilters();
        },

        updateIndustryInURL() {
            const url = new URL(window.location);
            const industrySlug = this.industryMap[this.selectedIndustry];

            if (industrySlug) {
                url.searchParams.set('industry', industrySlug);
            } else {
                url.searchParams.delete('industry');
            }

            // Reset sub-industry when industry changes
            url.searchParams.delete('sub-industry');

            window.history.pushState({}, '', url);
        },

        // Sub-industry dropdown functions
        toggleSubIndustryDropdown() {
            this.showSubIndustryDropdown = !this.showSubIndustryDropdown;
            if (this.showSubIndustryDropdown) {
                this.showIndustryDropdown = false;
            }
        },

        selectSubIndustry(subIndustryName) {
            this.selectedSubIndustry = subIndustryName;
            this.showSubIndustryDropdown = false;
            this.updateSubIndustryInURL();
            this.updateAppliedFilters();
        },

        updateSubIndustryInURL() {
            const url = new URL(window.location);
            const subIndustrySlug = this.subIndustryMap[this.selectedIndustry]?.[this.selectedSubIndustry];

            if (subIndustrySlug) {
                url.searchParams.set('sub-industry', subIndustrySlug);
            } else {
                url.searchParams.delete('sub-industry');
            }

            window.history.pushState({}, '', url);
        },

        // Province dropdown functions
        toggleProvinceDropdown() {
            this.showProvinceDropdown = !this.showProvinceDropdown;
            if (this.showProvinceDropdown) {
                this.showDistrictDropdown = false;
            }
        },

        selectProvince(provinceName) {
            this.selectedProvince = provinceName;
            this.selectedDistrict = 'Tất cả quận/huyện';
            this.showProvinceDropdown = false;
            this.updateProvinceInURL();
            this.updateAppliedFilters();
        },

        updateProvinceInURL() {
            const url = new URL(window.location);
            const provinceSlug = this.provinceMap[this.selectedProvince];

            if (provinceSlug) {
                url.searchParams.set('province', provinceSlug);
            } else {
                url.searchParams.delete('province');
            }

            // Reset district when province changes
            url.searchParams.delete('district');

            window.history.pushState({}, '', url);
        },

        // District dropdown functions
        toggleDistrictDropdown() {
            this.showDistrictDropdown = !this.showDistrictDropdown;
            if (this.showDistrictDropdown) {
                this.showProvinceDropdown = false;
            }
        },

        selectDistrict(districtName) {
            this.selectedDistrict = districtName;
            this.showDistrictDropdown = false;
            this.updateDistrictInURL();
            this.updateAppliedFilters();
        },

        updateDistrictInURL() {
            const url = new URL(window.location);
            const districtSlug = this.districtMap[this.selectedProvince]?.[this.selectedDistrict];

            if (districtSlug) {
                url.searchParams.set('district', districtSlug);
            } else {
                url.searchParams.delete('district');
            }

            window.history.pushState({}, '', url);
        },

        // Employees functions
        validateEmployees() {
            this.employeesError = '';

            if (this.employeesMin && this.employeesMax) {
                const min = parseInt(this.employeesMin);
                const max = parseInt(this.employeesMax);

                if (!isNaN(min) && !isNaN(max) && min >= max) {
                    this.employeesError = 'Giá trị tối thiểu phải nhỏ hơn giá trị tối đa';
                    return false;
                }
            }

            return true;
        },

        updateEmployeesMin() {
            if (this.validateEmployees()) {
                this.updateEmployeesInURL();
            }
        },

        updateEmployeesMax() {
            if (this.validateEmployees()) {
                this.updateEmployeesInURL();
            }
        },

        updateEmployeesInURL() {
            const url = new URL(window.location);

            if (this.employeesMin) {
                url.searchParams.set('employees-min', this.employeesMin);
            } else {
                url.searchParams.delete('employees-min');
            }

            if (this.employeesMax && this.validateEmployees()) {
                url.searchParams.set('employees-max', this.employeesMax);
            } else {
                url.searchParams.delete('employees-max');
            }

            window.history.pushState({}, '', url);
            this.updateAppliedFilters();
        },

        // Revenue functions
        validateRevenue() {
            this.revenueError = '';

            if (this.revenueMin && this.revenueMax) {
                const min = parseInt(this.revenueMin);
                const max = parseInt(this.revenueMax);

                if (!isNaN(min) && !isNaN(max) && min >= max) {
                    this.revenueError = 'Giá trị tối thiểu phải nhỏ hơn giá trị tối đa';
                    return false;
                }
            }

            return true;
        },

        updateRevenueMin() {
            if (this.validateRevenue()) {
                this.updateRevenueInURL();
            }
        },

        updateRevenueMax() {
            if (this.validateRevenue()) {
                this.updateRevenueInURL();
            }
        },

        updateRevenueInURL() {
            const url = new URL(window.location);

            if (this.revenueMin) {
                url.searchParams.set('revenue-min', this.revenueMin);
            } else {
                url.searchParams.delete('revenue-min');
            }

            if (this.revenueMax && this.validateRevenue()) {
                url.searchParams.set('revenue-max', this.revenueMax);
            } else {
                url.searchParams.delete('revenue-max');
            }

            window.history.pushState({}, '', url);
            this.updateAppliedFilters();
        },

        // Establishment Year functions
        validateEstablishmentYear() {
            this.establishmentYearError = '';

            if (this.establishmentYear) {
                const year = parseInt(this.establishmentYear);
                const currentYear = new Date().getFullYear();

                if (!isNaN(year) && year > currentYear) {
                    this.establishmentYearError = `Năm thành lập không được lớn hơn năm hiện tại (${currentYear})`;
                    return false;
                }
            }

            return true;
        },

        updateEstablishmentYear() {
            if (this.validateEstablishmentYear()) {
                this.updateEstablishmentYearInURL();
            }
        },

        updateEstablishmentYearInURL() {
            const url = new URL(window.location);

            if (this.establishmentYear && this.validateEstablishmentYear()) {
                url.searchParams.set('establishment-year', this.establishmentYear);
            } else {
                url.searchParams.delete('establishment-year');
            }

            window.history.pushState({}, '', url);
            this.updateAppliedFilters();
        },

        // Rating slider functions
        getRatingPercentage() {
            return (this.minRating / 5) * 100;
        },

        getRatingDisplayValue() {
            return this.minRating.toFixed(1);
        },

        onRatingDragStart() {
            this.isRatingDragging = true;
        },

        onRatingDragEnd() {
            this.isRatingDragging = false;
            this.updateRatingInURL();
        },

        onRatingChange(event) {
            this.minRating = parseFloat(event.target.value);
        },

        onRatingMouseMove(event) {
            if (!this.isRatingDragging) return;

            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            this.minRating = (percentage / 100) * 5;
        },

        onRatingMouseUp() {
            this.isRatingDragging = false;
            this.updateRatingInURL();
        },

        updateRatingInURL() {
            const url = new URL(window.location);

            if (this.minRating > 0) {
                url.searchParams.set('rating-min', this.minRating.toFixed(1));
            } else {
                url.searchParams.delete('rating-min');
            }

            window.history.pushState({}, '', url);
            this.updateAppliedFilters();
        },

        // Other options functions
        toggleHasHiring() {
            this.updateOtherOptionsInURL();
        },

        toggleVerified() {
            this.updateOtherOptionsInURL();
        },

        toggleActive() {
            this.updateOtherOptionsInURL();
        },

        updateOtherOptionsInURL() {
            const url = new URL(window.location);

            if (this.hasHiring) {
                url.searchParams.set('has-hiring', 'true');
            } else {
                url.searchParams.delete('has-hiring');
            }

            if (this.verified) {
                url.searchParams.set('verified', 'true');
            } else {
                url.searchParams.delete('verified');
            }

            if (this.active) {
                url.searchParams.set('active', 'true');
            } else {
                url.searchParams.delete('active');
            }

            window.history.pushState({}, '', url);
            this.updateAppliedFilters();
        },

        // Certifications functions
        toggleCertification(certName) {
            const certSlug = this.getCertificationSlug(certName);
            const index = this.selectedCertifications.indexOf(certSlug);

            if (index > -1) {
                this.selectedCertifications.splice(index, 1);
            } else {
                this.selectedCertifications.push(certSlug);
            }

            this.updateCertificationsInURL();
        },

        isCertificationSelected(certName) {
            const certSlug = this.getCertificationSlug(certName);
            return this.selectedCertifications.includes(certSlug);
        },

        getCertificationSlug(certName) {
            const slugMap = {
                'AEO': 'aeo',
                'BRC': 'brc',
                'BSCI': 'bsci',
                'CMMI Level 5': 'cmmi-level-5',
                'Cambridge Assessment': 'cambridge-assessment',
                'Google Partner': 'google-partner',
                'Green Building': 'green-building',
                'HACCP': 'haccp',
                'IB Authorization': 'ib-authorization',
                'ISO 14001': 'iso-14001',
                'ISO 15189': 'iso-15189',
                'ISO 27001': 'iso-27001',
                'ISO 45001': 'iso-45001',
                'ISO 9001': 'iso-9001',
                'JCI': 'jci',
                'OHSAS 18001': 'ohsas-18001',
                'TS 16949': 'ts-16949',
                'WRAP': 'wrap'
            };
            return slugMap[certName] || certName.toLowerCase().replace(/\s+/g, '-');
        },

        updateCertificationsInURL() {
            const url = new URL(window.location);

            if (this.selectedCertifications.length > 0) {
                url.searchParams.set('certifications', this.selectedCertifications.join(','));
            } else {
                url.searchParams.delete('certifications');
            }

            window.history.pushState({}, '', url);
            this.updateAppliedFilters();
        },

        // Tags functions
        toggleTag(tagName) {
            const tagSlug = this.getTagSlug(tagName);
            const index = this.selectedTags.indexOf(tagSlug);

            if (index > -1) {
                this.selectedTags.splice(index, 1);
            } else {
                this.selectedTags.push(tagSlug);
            }

            this.updateTagsInURL();
        },

        isTagSelected(tagName) {
            const tagSlug = this.getTagSlug(tagName);
            return this.selectedTags.includes(tagSlug);
        },

        getTagSlug(tagName) {
            const slugMap = {
                'CNTT': 'cntt',
                'bán lẻ': 'ban-le',
                'bất động sản': 'bat-dong-san',
                'bệnh viện': 'benh-vien',
                'cao cấp': 'cao-cap',
                'chăm sóc sức khỏe': 'cham-soc-suc-khoe',
                'chất lượng cao': 'chat-luong-cao',
                'công nghiệp': 'cong-nghiep',
                'công nghệ': 'cong-nghe',
                'digital': 'digital',
                'digital transformation': 'digital-transformation',
                'giày dép': 'giay-dep',
                'giáo dục': 'giao-duc',
                'hạ tầng': 'ha-tang',
                'kho bãi': 'kho-bai',
                'khu công nghiệp': 'khu-cong-nghiep',
                'linh kiện ô tô': 'linh-kien-o-to',
                'logistics': 'logistics',
                'lắp ráp': 'lap-rap',
                'marketing': 'marketing'
            };
            return slugMap[tagName] || tagName.toLowerCase().replace(/\s+/g, '-');
        },

        updateTagsInURL() {
            const url = new URL(window.location);

            if (this.selectedTags.length > 0) {
                url.searchParams.set('tags', this.selectedTags.join(','));
            } else {
                url.searchParams.delete('tags');
            }

            window.history.pushState({}, '', url);
            this.updateAppliedFilters();
        },

        // Applied filters functions
        updateAppliedFilters() {
            this.appliedFilters = [];

            // Industry filter
            if (this.selectedIndustry && this.selectedIndustry !== 'Tất cả ngành nghề') {
                this.appliedFilters.push({
                    type: 'industry',
                    label: this.selectedIndustry,
                    clearFn: () => this.selectIndustry('Tất cả ngành nghề')
                });
            }

            // Sub-industry filter
            if (this.selectedSubIndustry && this.selectedSubIndustry !== 'Tất cả lĩnh vực') {
                this.appliedFilters.push({
                    type: 'sub-industry',
                    label: this.selectedSubIndustry,
                    clearFn: () => this.selectSubIndustry('Tất cả lĩnh vực')
                });
            }

            // Province filter
            if (this.selectedProvince && this.selectedProvince !== 'Tất cả tỉnh/thành') {
                this.appliedFilters.push({
                    type: 'province',
                    label: this.selectedProvince,
                    clearFn: () => this.selectProvince('Tất cả tỉnh/thành')
                });
            }

            // District filter
            if (this.selectedDistrict && this.selectedDistrict !== 'Tất cả quận/huyện') {
                this.appliedFilters.push({
                    type: 'district',
                    label: this.selectedDistrict,
                    clearFn: () => this.selectDistrict('Tất cả quận/huyện')
                });
            }

            // Employees range filter
            if (this.employeesMin || this.employeesMax) {
                let label = '';
                if (this.employeesMin && this.employeesMax) {
                    label = `${this.employeesMin} - ${this.employeesMax} nhân viên`;
                } else if (this.employeesMin) {
                    label = `Từ ${this.employeesMin} nhân viên`;
                } else if (this.employeesMax) {
                    label = `Đến ${this.employeesMax} nhân viên`;
                }
                this.appliedFilters.push({
                    type: 'employees',
                    label: label,
                    clearFn: () => {
                        this.employeesMin = '';
                        this.employeesMax = '';
                        this.employeesError = '';
                        this.updateEmployeesInURL();
                    }
                });
            }

            // Revenue range filter
            if (this.revenueMin || this.revenueMax) {
                let label = '';
                if (this.revenueMin && this.revenueMax) {
                    label = `${this.revenueMin} - ${this.revenueMax} tỷ VND`;
                } else if (this.revenueMin) {
                    label = `Từ ${this.revenueMin} tỷ VND`;
                } else if (this.revenueMax) {
                    label = `Đến ${this.revenueMax} tỷ VND`;
                }
                this.appliedFilters.push({
                    type: 'revenue',
                    label: label,
                    clearFn: () => {
                        this.revenueMin = '';
                        this.revenueMax = '';
                        this.revenueError = '';
                        this.updateRevenueInURL();
                    }
                });
            }

            // Establishment year filter
            if (this.establishmentYear) {
                this.appliedFilters.push({
                    type: 'establishment-year',
                    label: `Năm ${this.establishmentYear}`,
                    clearFn: () => {
                        this.establishmentYear = '';
                        this.establishmentYearError = '';
                        this.updateEstablishmentYearInURL();
                    }
                });
            }

            // Rating filter
            if (this.minRating > 0) {
                this.appliedFilters.push({
                    type: 'rating',
                    label: `${this.minRating.toFixed(1)}+ sao`,
                    clearFn: () => {
                        this.minRating = 0;
                        this.updateRatingInURL();
                    }
                });
            }

            // Other options filters
            if (this.hasHiring) {
                this.appliedFilters.push({
                    type: 'has-hiring',
                    label: 'Đang tuyển dụng',
                    clearFn: () => {
                        this.hasHiring = false;
                        this.updateOtherOptionsInURL();
                    }
                });
            }

            if (this.verified) {
                this.appliedFilters.push({
                    type: 'verified',
                    label: 'Đã xác minh',
                    clearFn: () => {
                        this.verified = false;
                        this.updateOtherOptionsInURL();
                    }
                });
            }

            if (this.active) {
                this.appliedFilters.push({
                    type: 'active',
                    label: 'Đang hoạt động',
                    clearFn: () => {
                        this.active = false;
                        this.updateOtherOptionsInURL();
                    }
                });
            }

            // Certifications filters
            this.selectedCertifications.forEach(certSlug => {
                const certName = this.getCertificationDisplayName(certSlug);
                this.appliedFilters.push({
                    type: 'certification',
                    label: certName,
                    clearFn: () => {
                        const index = this.selectedCertifications.indexOf(certSlug);
                        if (index > -1) {
                            this.selectedCertifications.splice(index, 1);
                            this.updateCertificationsInURL();
                        }
                    }
                });
            });

            // Tags filters
            this.selectedTags.forEach(tagSlug => {
                const tagName = this.getTagDisplayName(tagSlug);
                this.appliedFilters.push({
                    type: 'tag',
                    label: tagName,
                    clearFn: () => {
                        const index = this.selectedTags.indexOf(tagSlug);
                        if (index > -1) {
                            this.selectedTags.splice(index, 1);
                            this.updateTagsInURL();
                        }
                    }
                });
            });
        },

        getCertificationDisplayName(certSlug) {
            const nameMap = {
                'aeo': 'AEO',
                'brc': 'BRC',
                'bsci': 'BSCI',
                'cmmi-level-5': 'CMMI Level 5',
                'cambridge-assessment': 'Cambridge Assessment',
                'google-partner': 'Google Partner',
                'green-building': 'Green Building',
                'haccp': 'HACCP',
                'ib-authorization': 'IB Authorization',
                'iso-14001': 'ISO 14001',
                'iso-15189': 'ISO 15189',
                'iso-27001': 'ISO 27001',
                'iso-45001': 'ISO 45001',
                'iso-9001': 'ISO 9001',
                'jci': 'JCI',
                'ohsas-18001': 'OHSAS 18001',
                'ts-16949': 'TS 16949',
                'wrap': 'WRAP'
            };
            return nameMap[certSlug] || certSlug;
        },

        getTagDisplayName(tagSlug) {
            const nameMap = {
                'cntt': 'CNTT',
                'ban-le': 'bán lẻ',
                'bat-dong-san': 'bất động sản',
                'benh-vien': 'bệnh viện',
                'cao-cap': 'cao cấp',
                'cham-soc-suc-khoe': 'chăm sóc sức khỏe',
                'chat-luong-cao': 'chất lượng cao',
                'cong-nghiep': 'công nghiệp',
                'cong-nghe': 'công nghệ',
                'digital': 'digital',
                'digital-transformation': 'digital transformation',
                'giay-dep': 'giày dép',
                'giao-duc': 'giáo dục',
                'ha-tang': 'hạ tầng',
                'kho-bai': 'kho bãi',
                'khu-cong-nghiep': 'khu công nghiệp',
                'linh-kien-o-to': 'linh kiện ô tô',
                'logistics': 'logistics',
                'lap-rap': 'lắp ráp',
                'marketing': 'marketing'
            };
            return nameMap[tagSlug] || tagSlug;
        },

        hasActiveFilters() {
            return this.appliedFilters.length > 0;
        },

        // Clear specific filter functions
        clearCertifications() {
            this.selectedCertifications = [];
            this.updateCertificationsInURL();
        },

        clearTags() {
            this.selectedTags = [];
            this.updateTagsInURL();
        },

        clearRating() {
            this.minRating = 0;
            this.updateRatingInURL();
        }
    }));
});
