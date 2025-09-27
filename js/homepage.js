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
        currentSlide: 0,
        totalSlides: 0,
        itemsPerSlide: 5, // Số items hiển thị trên mỗi slide
        totalItems: 0,
        isTransitioning: false,

        init() {
            // Tính toán số slide dựa trên số items
            this.calculateSlides();

            // Khởi tạo Lucide icons
            this.$nextTick(() => {
                lucide.createIcons();
            });
        },

        calculateSlides() {
            // Đếm số items trong slider
            const sliderContainer = this.$el.querySelector('.real-estate-slider-container');
            if (sliderContainer) {
                const items = sliderContainer.querySelectorAll('.real-estate-item');
                this.totalItems = items.length;
                this.totalSlides = Math.ceil(this.totalItems / this.itemsPerSlide);

                // Cập nhật width của container dựa trên số slides
                const containerWidth = this.totalSlides * 100;
                sliderContainer.style.width = `${containerWidth}%`;

                // Cập nhật width của mỗi slide
                const slideWidth = 100 / this.totalSlides;
                const slides = sliderContainer.querySelectorAll('.flex-shrink-0');
                slides.forEach(slide => {
                    slide.style.width = `${slideWidth}%`;
                });

                console.log(`Real Estate Slider: ${this.totalItems} items, ${this.totalSlides} slides, ${this.itemsPerSlide} items per slide`);
            }
        },

        nextSlide() {
            if (this.isTransitioning) return;

            if (this.currentSlide < this.totalSlides - 1) {
                this.isTransitioning = true;
                this.currentSlide++;
                this.updateSliderPosition();

                // Reset transition flag after animation
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 500);
            }
        },

        prevSlide() {
            if (this.isTransitioning) return;

            if (this.currentSlide > 0) {
                this.isTransitioning = true;
                this.currentSlide--;
                this.updateSliderPosition();

                // Reset transition flag after animation
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 500);
            }
        },

        goToSlide(slideIndex) {
            if (this.isTransitioning || slideIndex === this.currentSlide) return;

            this.isTransitioning = true;
            this.currentSlide = slideIndex;
            this.updateSliderPosition();

            // Reset transition flag after animation
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        },

        updateSliderPosition() {
            const sliderContainer = this.$el.querySelector('.real-estate-slider-container');
            if (sliderContainer) {
                const translateX = -(this.currentSlide * 100);
                sliderContainer.style.transform = `translateX(${translateX}%)`;
            }
        },

        // Kiểm tra xem có thể next/prev không
        canNext() {
            return this.currentSlide < this.totalSlides - 1;
        },

        canPrev() {
            return this.currentSlide > 0;
        },

        // Lấy class cho button prev/next
        getPrevButtonClass() {
            const baseClass = "btn-outline-primary btn-sm w-10 h-10 p-0 flex items-center justify-center";
            return this.canPrev() ? baseClass : baseClass + " opacity-50 cursor-not-allowed";
        },

        getNextButtonClass() {
            const baseClass = "btn-outline-primary btn-sm w-10 h-10 p-0 flex items-center justify-center";
            return this.canNext() ? baseClass : baseClass + " opacity-50 cursor-not-allowed";
        },

        // Lấy class cho dot pagination
        getDotClass(index) {
            const baseClass = "w-2 h-2 rounded-full transition-colors cursor-pointer";
            return index === this.currentSlide ? baseClass + " bg-blue-500" : baseClass + " bg-gray-300";
        }
    }));

    // ===========================================
    // NEWS FILTER COMPONENT
    // ===========================================
    Alpine.data('newsFilterComponent', () => ({
        activeCategory: 'Tin Nổi Bật',
        categories: [
            { id: 'noi-bat', name: 'Tin Nổi Bật', class: 'bg-blue-500 text-white shadow-md' },
            { id: 'du-lich', name: 'Du Lịch', class: 'bg-gray-100 text-gray-600 hover:bg-gray-200' },
            { id: 'am-thuc', name: 'Ẩm Thực', class: 'bg-gray-100 text-gray-600 hover:bg-gray-200' },
            { id: 'dac-san', name: 'Đặc Sản', class: 'bg-gray-100 text-gray-600 hover:bg-gray-200' },
            { id: 'vui-choi', name: 'Vui Chơi', class: 'bg-gray-100 text-gray-600 hover:bg-gray-200' }
        ],

        init() {
            console.log('News Filter component initialized.');
        },

        selectCategory(categoryName) {
            this.activeCategory = categoryName;
            this.filterNewsByCategory(categoryName);
        },

        getButtonClass(categoryName) {
            const baseClass = "px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200";
            if (this.activeCategory === categoryName) {
                return baseClass + " bg-blue-500 text-white shadow-md";
            } else {
                return baseClass + " bg-gray-100 text-gray-600 hover:bg-gray-200";
            }
        },

        filterNewsByCategory(categoryName) {
            // Lấy tất cả các news items
            const newsItems = document.querySelectorAll('.news-item');

            // Mapping category names to data-category values
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
                    // Hiển thị tất cả items cho Tin Nổi Bật
                    item.style.display = 'block';
                } else {
                    // Ẩn/hiện dựa trên category
                    if (itemCategory === targetCategory) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });

            // Scroll to top of news section
            const newsSection = document.querySelector('.news-section');
            if (newsSection) {
                newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }));

    // ===========================================
    // VIỆC LÀM ĐỀ XUẤT SLIDER COMPONENT
    // ===========================================
    Alpine.data('viecLamDeXuatComponent', () => ({
        currentSlide: 0,
        totalSlides: 3, // Có 3 slides dựa trên HTML
        isTransitioning: false,

        init() {
            console.log('Việc Làm Đề Xuất component initialized.');

            // Khởi tạo Lucide icons
            this.$nextTick(() => {
                lucide.createIcons();
            });
        },

        nextSlide() {
            if (this.isTransitioning) return;

            if (this.currentSlide < this.totalSlides - 1) {
                this.isTransitioning = true;
                this.currentSlide++;
                this.updateSliderPosition();

                // Reset transition flag after animation
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 500);
            }
        },

        prevSlide() {
            if (this.isTransitioning) return;

            if (this.currentSlide > 0) {
                this.isTransitioning = true;
                this.currentSlide--;
                this.updateSliderPosition();

                // Reset transition flag after animation
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 500);
            }
        },

        goToSlide(slideIndex) {
            if (this.isTransitioning || slideIndex === this.currentSlide) return;

            this.isTransitioning = true;
            this.currentSlide = slideIndex;
            this.updateSliderPosition();

            // Reset transition flag after animation
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        },

        updateSliderPosition() {
            const sliderContainer = this.$el.querySelector('.flex.transition-transform');
            if (sliderContainer) {
                const translateX = -(this.currentSlide * 100);
                sliderContainer.style.transform = `translateX(${translateX}%)`;
            }
        },

        // Kiểm tra xem có thể next/prev không
        isNextDisabled() {
            return this.currentSlide >= this.totalSlides - 1 || this.isTransitioning;
        },

        isPrevDisabled() {
            return this.currentSlide <= 0 || this.isTransitioning;
        },

        // Lấy class cho button prev/next
        getPrevButtonClass() {
            const baseClass = "btn-outline-primary btn-sm w-10 h-10 p-0 flex items-center justify-center";
            return this.isPrevDisabled() ? baseClass + " opacity-50 cursor-not-allowed" : baseClass;
        },

        getNextButtonClass() {
            const baseClass = "btn-outline-primary btn-sm w-10 h-10 p-0 flex items-center justify-center";
            return this.isNextDisabled() ? baseClass + " opacity-50 cursor-not-allowed" : baseClass;
        },

        // Lấy class cho dot pagination
        getDotClass(index) {
            const baseClass = "w-2 h-2 rounded-full transition-colors cursor-pointer";
            return index === this.currentSlide ? baseClass + " bg-blue-500" : baseClass + " bg-gray-300";
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
});

