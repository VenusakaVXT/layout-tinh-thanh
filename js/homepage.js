// Homepage Alpine.js Components
// Chứa tất cả components cho trang home: Hero Section, Post Box, Stats, v.v.
document.addEventListener('alpine:init', () => {

    // ===========================================
    // POST BOX COMPONENT
    // ===========================================
    Alpine.data('postBoxComponent', () => ({
        user: null,
        isLoading: false,

        init() {
            // Khởi tạo Lucide icons
            this.$nextTick(() => {
                lucide.createIcons();
            });

            // Yêu cầu user data từ header
            window.dispatchEvent(new CustomEvent('get-user-data'));

            // Lắng nghe user data từ header
            window.addEventListener('user-data-ready', (event) => {
                this.user = event.detail.user;
                this.updatePostBoxUI();
            });
        },

        updatePostBoxUI() {
            const avatarElement = document.getElementById('postBoxAvatar');
            const textElement = document.getElementById('postBoxText');

            if (!avatarElement || !textElement) return;

            if (this.user) {
                // Hiển thị avatar user
                avatarElement.innerHTML = `
                    <img src="${this.user.avatar || '/placeholder.svg?height=40&width=40'}" 
                         alt="${this.user.fullname || 'User'}" 
                         class="w-10 h-10 rounded-full">
                `;

                // Hiển thị text chào user (sử dụng placeholder cho input)
                if (this.user.status == 'active') {
                    textElement.placeholder = `Xin chào ${this.user.fullname || 'bạn'}, bạn muốn chia sẻ gì?`;
                } else if (this.user.status == 'inactive') {
                    textElement.placeholder = 'Tài khoản của bạn chưa kích hoạt, vui lòng kiểm tra Email và kích hoạt.';
                } else {
                    textElement.placeholder = 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ với admin để được hỗ trợ.';
                }
            } else {
                // Hiển thị icon mặc định
                avatarElement.innerHTML = `
                    <i data-lucide="user-pen" class="size-5 text-white"></i>
                `;

                // Hiển thị text mặc định (sử dụng placeholder cho input)
                textElement.placeholder = 'Nhập nội dung đăng tải...';

                // Khởi tạo lại Lucide icons cho icon mới
                this.$nextTick(() => {
                    lucide.createIcons();
                });
            }
        },

        handlePostClick() {
            if (this.user) {
                // Nếu đã đăng nhập, chuyển đến trang đăng bài
                window.location.href = '/post';
            } else {
                // Nếu chưa đăng nhập, request header mở modal đăng nhập
                window.dispatchEvent(new CustomEvent('open-auth-modal', {
                    detail: { tab: 'login' }
                }));
            }
        }
    }));

    // ===========================================
    // HERO SECTION COMPONENT
    // ===========================================
    Alpine.data('heroSectionComponent', () => ({
        init() {
            console.log('Hero Section component initialized.');
        },

        handleExploreClick() {
            // Scroll to content sections hoặc navigate
            const firstSection = document.querySelector('#content-sections');
            if (firstSection) {
                firstSection.scrollIntoView({ behavior: 'smooth' });
            }
        },

        handleNewsClick() {
            window.location.href = '/tin-tuc';
        }
    }));

    // ===========================================
    // STATS SECTION COMPONENT
    // ===========================================
    Alpine.data('statsSectionComponent', () => ({
        stats: {
            districts: 35,
            news: 1000,
            jobs: 500,
            population: 2000000
        },
        animatedStats: {
            districts: 0,
            news: 0,
            jobs: 0,
            population: 0
        },
        hasAnimated: false,

        init() {
            // Animate numbers when section comes into view
            this.setupIntersectionObserver();
        },

        setupIntersectionObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.hasAnimated) {
                        this.animateNumbers();
                        this.hasAnimated = true;
                    }
                });
            }, { threshold: 0.5 });

            // Observe stats section
            const statsSection = this.$el.closest('.grid');
            if (statsSection) {
                observer.observe(statsSection);
            }
        },

        animateNumbers() {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const interval = duration / steps;

            Object.keys(this.stats).forEach(key => {
                let current = 0;
                const target = this.stats[key];
                const increment = target / steps;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    this.animatedStats[key] = Math.floor(current);
                }, interval);
            });
        },

        formatNumber(num) {
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1) + 'M';
            } else if (num >= 1000) {
                return (num / 1000).toFixed(0) + 'K';
            }
            return num.toString();
        }
    }));

    // ===========================================
    // FEATURE CARDS COMPONENT
    // ===========================================
    Alpine.data('featureCardsComponent', () => ({
        features: [
            {
                icon: 'newspaper',
                title: 'Tin Tức',
                description: 'Cập nhật tin tức mới nhất về tỉnh',
                bgColor: 'bg-yellow-500',
                link: '/tin-tuc'
            },
            {
                icon: 'home',
                title: 'Bất Động Sản',
                description: 'Thông tin mua bán, cho thuê',
                bgColor: 'bg-green-500',
                link: '/bat-dong-san'
            },
            {
                icon: 'briefcase',
                title: 'Việc Làm',
                description: 'Cơ hội nghề nghiệp tại địa phương',
                bgColor: 'bg-orange-500',
                link: '/viec-lam'
            },
            {
                icon: 'map-pin',
                title: 'Tiện Ích',
                description: 'Dịch vụ công và tiện ích đời sống',
                bgColor: 'bg-purple-500',
                link: '/tien-ich'
            }
        ],

        init() {
            // Initialize any feature cards specific logic
        },

        handleFeatureClick(link) {
            window.location.href = link;
        }
    }));

    // ===========================================
    // REAL ESTATE SLIDER COMPONENT
    // ===========================================
    Alpine.data('realEstateSliderComponent', () => ({
        slider: null,

        init() {
            this.$nextTick(() => {
                this.initializeBlazeSlider();
            });
        },

        initializeBlazeSlider() {
            const realEstateSlider = this.$el.querySelector('[data-blaze-slider]');
            if (realEstateSlider && typeof BlazeSlider !== 'undefined') {
                this.slider = new BlazeSlider(realEstateSlider, {
                    all: {
                        enableAutoplay: false,
                        stopAutoplayOnInteraction: true,
                        enablePagination: true,
                        draggable: true,
                        loop: false,
                        transitionDuration: 300,
                        transitionTimingFunction: 'ease',
                        slideGap: '16px'
                    },
                    '(max-width: 767px)': {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    },
                    '(min-width: 768px) and (max-width: 1023px)': {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    },
                    '(min-width: 1024px)': {
                        slidesToShow: 5,
                        slidesToScroll: 5
                    }
                });
            } else {
                console.error('Blaze Slider not found or not loaded.');
            }
        },

        destroy() {
            if (this.slider) {
                this.slider.destroy();
                this.slider = null;
            }
        }
    }));

    // ===========================================
    // JOB CATEGORY SLIDER COMPONENT
    // ===========================================
    Alpine.data('jobCategorySliderComponent', () => ({
        slider: null,

        init() {
            this.$nextTick(() => {
                this.initializeBlazeSlider();
            });
        },

        initializeBlazeSlider() {
            const jobCategorySlider = this.$el.querySelector('[data-blaze-slider]');
            if (jobCategorySlider && typeof BlazeSlider !== 'undefined') {
                this.slider = new BlazeSlider(jobCategorySlider, {
                    all: {
                        enableAutoplay: false,
                        stopAutoplayOnInteraction: true,
                        enablePagination: true,
                        draggable: true,
                        loop: false,
                        transitionDuration: 300,
                        transitionTimingFunction: 'ease',
                        slideGap: '8px'
                    },
                    '(max-width: 767px)': {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    },
                    '(min-width: 768px) and (max-width: 1023px)': {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    },
                    '(min-width: 1024px)': {
                        slidesToShow: 6,
                        slidesToScroll: 1
                    }
                });
            } else {
                console.error('Blaze Slider not found or not loaded.');
            }
        },

        destroy() {
            if (this.slider) {
                this.slider.destroy();
                this.slider = null;
            }
        }
    }));

    // ===========================================
    // JOB SLIDER COMPONENT
    // ===========================================
    Alpine.data('viecLamDeXuatSliderComponent', () => ({
        slider: null,

        init() {
            this.$nextTick(() => {
                this.initializeBlazeSlider();
            });
        },

        initializeBlazeSlider() {
            const jobSlider = this.$el.querySelector('[data-blaze-slider]');
            if (jobSlider && typeof BlazeSlider !== 'undefined') {
                this.slider = new BlazeSlider(jobSlider, {
                    all: {
                        enableAutoplay: false,
                        stopAutoplayOnInteraction: true,
                        enablePagination: true,
                        draggable: true,
                        loop: false,
                        transitionDuration: 300,
                        transitionTimingFunction: 'ease',
                        slideGap: '8px'
                    },
                    '(max-width: 767px)': {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    },
                    '(min-width: 768px) and (max-width: 1023px)': {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    },
                    '(min-width: 1024px)': {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                });
            } else {
                console.error('Blaze Slider not found or not loaded.');
            }
        },

        destroy() {
            if (this.slider) {
                this.slider.destroy();
                this.slider = null;
            }
        }
    }));

    // ===========================================
    // DICH VU BINH DUONG SLIDER COMPONENT
    // ===========================================
    Alpine.data('dichVuBinhDuongSliderComponent', () => ({
        slider: null,

        init() {
            this.$nextTick(() => {
                this.initializeBlazeSlider();
            });
        },

        initializeBlazeSlider() {
            const dichVuSlider = this.$el.querySelector('[data-blaze-slider]');
            if (dichVuSlider && typeof BlazeSlider !== 'undefined') {
                this.slider = new BlazeSlider(dichVuSlider, {
                    all: {
                        enableAutoplay: false,
                        stopAutoplayOnInteraction: true,
                        enablePagination: true,
                        draggable: true,
                        loop: false,
                        transitionDuration: 300,
                        transitionTimingFunction: 'ease',
                        slideGap: '8px'
                    },
                    '(max-width: 767px)': {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    },
                    '(min-width: 768px) and (max-width: 1023px)': {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    },
                    '(min-width: 1024px)': {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                });
            } else {
                console.error('Blaze Slider not found or not loaded.');
            }
        },

        destroy() {
            if (this.slider) {
                this.slider.destroy();
                this.slider = null;
            }
        }
    }));

    // ===========================================
    // DANH BA DOANH NGHIEP SLIDER COMPONENT
    // ===========================================
    Alpine.data('danhBaDoanhNghiepSliderComponent', () => ({
        slider: null,

        init() {
            this.$nextTick(() => {
                this.initializeBlazeSlider();
            });
        },

        initializeBlazeSlider() {
            const jobSlider = this.$el.querySelector('[data-blaze-slider]');
            if (jobSlider && typeof BlazeSlider !== 'undefined') {
                this.slider = new BlazeSlider(jobSlider, {
                    all: {
                        enableAutoplay: false,
                        stopAutoplayOnInteraction: true,
                        enablePagination: true,
                        draggable: true,
                        loop: false,
                        transitionDuration: 300,
                        transitionTimingFunction: 'ease',
                        slideGap: '8px'
                    },
                    '(max-width: 767px)': {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    },
                    '(min-width: 768px) and (max-width: 1023px)': {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    },
                    '(min-width: 1024px)': {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                });
            } else {
                console.error('Blaze Slider not found or not loaded.');
            }
        },

        destroy() {
            if (this.slider) {
                this.slider.destroy();
                this.slider = null;
            }
        }
    }));

    // ===========================================
    // DICH VU CONG TRUC TUYEN SLIDER COMPONENT
    // ===========================================
    Alpine.data('dichVuCongTrucTuyenSliderComponent', () => ({
        slider: null,

        init() {
            this.$nextTick(() => {
                this.initializeBlazeSlider();
            });
        },

        initializeBlazeSlider() {
            const dichVuSlider = this.$el.querySelector('[data-blaze-slider]');
            if (dichVuSlider && typeof BlazeSlider !== 'undefined') {
                this.slider = new BlazeSlider(dichVuSlider, {
                    all: {
                        enableAutoplay: false,
                        stopAutoplayOnInteraction: true,
                        enablePagination: true,
                        draggable: true,
                        loop: false,
                        transitionDuration: 300,
                        transitionTimingFunction: 'ease',
                        slideGap: '16px'
                    },
                    '(max-width: 767px)': {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    },
                    '(min-width: 768px) and (max-width: 1023px)': {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    },
                    '(min-width: 1024px)': {
                        slidesToShow: 6,
                        slidesToScroll: 1
                    }
                });
            } else {
                console.error('Blaze Slider not found or not loaded.');
            }
        },

        destroy() {
            if (this.slider) {
                this.slider.destroy();
                this.slider = null;
            }
        }
    }));

    // ===========================================
    // NEWS FILTER COMPONENT
    // ===========================================
    Alpine.data('newsFilterComponent', () => ({
        activeCategory: 'Tin Nổi Bật',

        init() {
            console.log('News Filter component initialized.');
        },

        selectCategory(categoryName) {
            this.activeCategory = categoryName;
            this.filterNewsByCategory(categoryName);
        },

        getButtonClass(categoryName) {
            if (this.activeCategory === categoryName) {
                return " bg-blue-500 text-white shadow-md";
            } else {
                return " bg-gray-100 text-gray-600 hover:bg-gray-200";
            }
        },

        filterNewsByCategory(categoryName) {
            const newsItems = document.querySelectorAll('.news-item');

            const categoryMapping = {
                'Tin Nổi Bật': 'noi-bat',
                'Du Lịch': 'du-lich',
                'Ẩm Thực': 'am-thuc',
                'Đặc Sản': 'dac-san',
                'Vui Chơi': 'vui-choi'
            };

            const targetCategory = categoryMapping[categoryName];

            newsItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (categoryName === 'Tin Nổi Bật') {
                    item.style.display = 'block';
                } else {
                    if (itemCategory === targetCategory) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });

            const newsSection = document.querySelector('.news-section');
            if (newsSection) {
                newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }));

    // ===========================================
    // PHONE CONTACT TOGGLE COMPONENT
    // ===========================================
    Alpine.data('phoneContactToggle', () => ({
        isExpanded: false,
        initialItems: 8,
        totalItems: 22,

        init() {
            console.log('Phone Contact Toggle component initialized.');
            this.hideAdditionalItems();
        },

        toggleExpanded() {
            this.isExpanded = !this.isExpanded;

            if (this.isExpanded) {
                this.showAllItems();
            } else {
                this.hideAdditionalItems();
            }
        },

        hideAdditionalItems() {
            const allItems = this.$el.querySelectorAll('.grid > div');
            allItems.forEach((item, index) => {
                if (index >= this.initialItems) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'block';
                }
            });
        },

        showAllItems() {
            const allItems = this.$el.querySelectorAll('.grid > div');
            allItems.forEach((item) => {
                item.style.display = 'block';
            });
        },

        getButtonText() {
            return this.isExpanded ? 'Thu gọn' : `Xem Thêm (${this.totalItems - this.initialItems} số khác)`;
        },

        getButtonIcon() {
            return this.isExpanded ? 'lucide-chevron-up' : 'lucide-chevron-down';
        }
    }));

    // ===========================================
    // DEVELOPMENT HISTORY TOGGLE COMPONENT
    // ===========================================
    Alpine.data('developmentHistoryToggle', () => ({
        isExpanded: true,

        init() {
            console.log('Development History Toggle component initialized.');
            console.log('Initial state - isExpanded:', this.isExpanded);
        },

        toggleExpanded() {
            console.log('Toggle clicked - before:', this.isExpanded);
            this.isExpanded = !this.isExpanded;
            console.log('Toggle clicked - after:', this.isExpanded);
        },

        getIconClass() {
            const iconClass = this.isExpanded ? 'lucide-chevron-up' : 'lucide-chevron-down';
            console.log('getIconClass called - isExpanded:', this.isExpanded, 'iconClass:', iconClass);
            return iconClass;
        },

        getHistoryClass() {
            const historyClass = this.isExpanded ? 'block' : 'hidden';
            console.log('getHistoryClass called - isExpanded:', this.isExpanded, 'historyClass:', historyClass);
            return historyClass;
        }
    }));


    // ===========================================
    // HOMEPAGE MAIN COMPONENT
    // ===========================================
    Alpine.data('homepageComponent', () => ({
        user: null,
        isLoading: true,

        init() {
            console.log('Homepage component initialized.');

            // Yêu cầu user data từ header
            window.dispatchEvent(new CustomEvent('get-user-data'));

            // Lắng nghe user data từ header
            window.addEventListener('user-data-ready', (event) => {
                this.user = event.detail.user;
                this.isLoading = false;
                console.log('Homepage received user data:', this.user);
            });
        }
    }));
});

// ===========================================
//  
// ===========================================
window.HomepageUtils = {
    // Utility functions cho homepage
    scrollToSection: (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },

    // Format number utility
    formatNumber: (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M+';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K+';
        }
        return num.toString() + '+';
    },

    // Lazy load images
    lazyLoadImages: () => {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    },

    // Smooth animations
    animateOnScroll: () => {
        const elements = document.querySelectorAll('[data-animate]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => observer.observe(el));
    }
};

// Initialize global utilities when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy loading
    window.HomepageUtils.lazyLoadImages();

    // Initialize scroll animations
    window.HomepageUtils.animateOnScroll();

    // Fallback for Phone Contact Toggle
    const phoneContactContainer = document.querySelector('[x-data*="phoneContactToggle"]');
    if (phoneContactContainer && !phoneContactContainer.__x) {
        console.log('Initializing fallback phone contact toggle logic');

        let isExpanded = false;
        const initialItems = 8;
        const totalItems = 22;

        const toggleButton = phoneContactContainer.querySelector('button[\\@click*="toggleExpanded"]');
        const allItems = phoneContactContainer.querySelectorAll('.grid > div');

        function hideAdditionalItems() {
            allItems.forEach((item, index) => {
                if (index >= initialItems) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'block';
                }
            });
        }

        function showAllItems() {
            allItems.forEach((item) => {
                item.style.display = 'block';
            });
        }

        function updateButton() {
            if (!toggleButton) return;

            const buttonText = isExpanded ? 'Thu gọn' : `Xem Thêm (${totalItems - initialItems} số khác)`;
            const iconClass = isExpanded ? 'lucide-chevron-up' : 'lucide-chevron-down';

            // Update button text - chỉ cập nhật nếu không có x-text
            const textSpan = toggleButton.querySelector('span[x-text]');
            if (textSpan) {
                // Nếu có x-text, chỉ cập nhật nội dung span
                textSpan.textContent = buttonText;
            } else {
                // Nếu không có x-text, cập nhật text node
                const textNode = toggleButton.childNodes[0];
                if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                    textNode.textContent = buttonText;
                }
            }

            // Update icon
            const icon = toggleButton.querySelector('svg');
            if (icon) {
                icon.className = `lucide ${iconClass} w-4 h-4 ml-2`;
            }
        }

        function toggleExpanded() {
            isExpanded = !isExpanded;

            if (isExpanded) {
                showAllItems();
            } else {
                hideAdditionalItems();
            }

            updateButton();
        }

        // Add event listener
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleExpanded);
        }

        // Initialize
        hideAdditionalItems();
        updateButton();
    }
});
