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
    // REAL ESTATE CAROUSEL COMPONENT
    // ===========================================
    Alpine.data('realEstateCarousel', () => ({
        currentSlide: 0,
        totalSlides: 2, // 10 items / 5 items per slide = 2 slides
        itemsPerSlide: 5,
        totalItems: 10,
        isTransitioning: false,

        init() {
            console.log('Real Estate Carousel component initialized.');
            this.updateCarousel();
        },

        nextSlide() {
            if (this.isTransitioning) return;

            this.isTransitioning = true;
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
            this.updateCarousel();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        },

        prevSlide() {
            if (this.isTransitioning) return;

            this.isTransitioning = true;
            this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
            this.updateCarousel();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        },

        updateCarousel() {
            const carouselContainer = this.$el.querySelector('.flex.transition-transform');
            if (!carouselContainer) return;

            // Each item is 10% width, so 5 items = 50% per slide
            const translateX = -this.currentSlide * 50;
            carouselContainer.style.transform = `translateX(${translateX}%)`;

            console.log(`Carousel moved to slide ${this.currentSlide + 1}/${this.totalSlides}, translateX: ${translateX}%`);
        },

        canNext() {
            return this.currentSlide < this.totalSlides - 1;
        },

        canPrev() {
            return this.currentSlide > 0;
        },

        getNextButtonClass() {
            const baseClass = 'btn-outline-primary btn-sm w-10 h-10 p-0 flex items-center justify-center';
            return this.canNext() ? baseClass : baseClass + ' opacity-50 cursor-not-allowed';
        },

        getPrevButtonClass() {
            const baseClass = 'btn-outline-primary btn-sm w-10 h-10 p-0 flex items-center justify-center';
            return this.canPrev() ? baseClass : baseClass + ' opacity-50 cursor-not-allowed';
        },

        goToSlide(slideIndex) {
            if (this.isTransitioning || slideIndex < 0 || slideIndex >= this.totalSlides) return;

            this.isTransitioning = true;
            this.currentSlide = slideIndex;
            this.updateCarousel();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }
    }));

    // ===========================================
    // JOB CAROUSEL COMPONENT
    // ===========================================
    Alpine.data('viecLamDeXuatComponent', () => ({
        currentSlide: 0,
        totalSlides: 3, // 15 items / 5 items per slide = 3 slides
        itemsPerSlide: 5,
        totalItems: 15,
        isTransitioning: false,

        init() {
            console.log('Job Carousel component initialized.');
            this.updateCarousel();
        },

        nextSlide() {
            if (this.isTransitioning) return;

            this.isTransitioning = true;
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
            this.updateCarousel();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        },

        prevSlide() {
            if (this.isTransitioning) return;

            this.isTransitioning = true;
            this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
            this.updateCarousel();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        },

        updateCarousel() {
            const carouselContainer = this.$el.querySelector('.flex.transition-transform');
            if (!carouselContainer) return;

            // Each slide is 100% width, so we move by 100% per slide
            const translateX = -this.currentSlide * 100;
            carouselContainer.style.transform = `translateX(${translateX}%)`;

            console.log(`Job carousel moved to slide ${this.currentSlide + 1}/${this.totalSlides}, translateX: ${translateX}%`);
        },

        isNextDisabled() {
            return this.currentSlide >= this.totalSlides - 1;
        },

        isPrevDisabled() {
            return this.currentSlide <= 0;
        },

        goToSlide(slideIndex) {
            if (this.isTransitioning || slideIndex < 0 || slideIndex >= this.totalSlides) return;

            this.isTransitioning = true;
            this.currentSlide = slideIndex;
            this.updateCarousel();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }
    }));

    // ===========================================
    // DICH VU CAROUSEL COMPONENT
    // ===========================================
    Alpine.data('dichVuCarousel', () => ({
        currentSlide: 0,
        totalSlides: 2, // 8 items / 4 items per slide = 2 slides (or 2 slides with 5 items each)
        itemsPerSlide: 4,
        totalItems: 8,
        isTransitioning: false,

        init() {
            console.log('Dich Vu Carousel component initialized.');
            this.updateCarousel();
        },

        nextSlide() {
            if (this.isTransitioning) return;

            this.isTransitioning = true;
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
            this.updateCarousel();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        },

        prevSlide() {
            if (this.isTransitioning) return;

            this.isTransitioning = true;
            this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
            this.updateCarousel();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        },

        updateCarousel() {
            const carouselContainer = this.$el.querySelector('.flex.transition-transform');
            if (!carouselContainer) return;

            // Each slide is 100% width, so we move by 100% per slide
            const translateX = -this.currentSlide * 100;
            carouselContainer.style.transform = `translateX(${translateX}%)`;

            console.log(`Dich Vu carousel moved to slide ${this.currentSlide + 1}/${this.totalSlides}, translateX: ${translateX}%`);
        },

        isNextDisabled() {
            return this.currentSlide >= this.totalSlides - 1;
        },

        isPrevDisabled() {
            return this.currentSlide <= 0;
        },

        goToSlide(slideIndex) {
            if (this.isTransitioning || slideIndex < 0 || slideIndex >= this.totalSlides) return;

            this.isTransitioning = true;
            this.currentSlide = slideIndex;
            this.updateCarousel();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }
    }));

    // ===========================================
    // DOANH NGHIEP CAROUSEL COMPONENT
    // ===========================================
    Alpine.data('doanhNghiepCarousel', () => ({
        currentSlide: 0,
        totalSlides: 2, // 6 items / 3 items per slide = 2 slides (or 2 slides with 5 items each)
        itemsPerSlide: 3,
        totalItems: 6,
        isTransitioning: false,

        init() {
            console.log('Doanh Nghiep Carousel component initialized.');
            this.updateCarousel();
        },

        nextSlide() {
            if (this.isTransitioning) return;

            this.isTransitioning = true;
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
            this.updateCarousel();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        },

        prevSlide() {
            if (this.isTransitioning) return;

            this.isTransitioning = true;
            this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
            this.updateCarousel();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        },

        updateCarousel() {
            const carouselContainer = this.$el.querySelector('.flex.transition-transform');
            if (!carouselContainer) return;

            // Each slide is 100% width, so we move by 100% per slide
            const translateX = -this.currentSlide * 100;
            carouselContainer.style.transform = `translateX(${translateX}%)`;

            console.log(`Doanh Nghiep carousel moved to slide ${this.currentSlide + 1}/${this.totalSlides}, translateX: ${translateX}%`);
        },

        isNextDisabled() {
            return this.currentSlide >= this.totalSlides - 1;
        },

        isPrevDisabled() {
            return this.currentSlide <= 0;
        },

        goToSlide(slideIndex) {
            if (this.isTransitioning || slideIndex < 0 || slideIndex >= this.totalSlides) return;

            this.isTransitioning = true;
            this.currentSlide = slideIndex;
            this.updateCarousel();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }
    }));

    // ===========================================
    // DICH VU CONG TRUC TUYEN CAROUSEL COMPONENT
    // ===========================================
    Alpine.data('dichVuCongTrucTuyenCarousel', () => ({
        currentSlide: 0,
        totalSlides: 2, // 12 items / 6 items per slide = 2 slides
        itemsPerSlide: 6,
        totalItems: 12,
        isTransitioning: false,

        init() {
            console.log('Dich Vu Cong Truc Tuyen Carousel component initialized.');
            this.updateCarousel();
        },

        nextSlide() {
            if (this.isTransitioning) return;

            this.isTransitioning = true;
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
            this.updateCarousel();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        },

        prevSlide() {
            if (this.isTransitioning) return;

            this.isTransitioning = true;
            this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
            this.updateCarousel();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        },

        updateCarousel() {
            const carouselContainer = this.$el.querySelector('.flex.transition-transform');
            if (!carouselContainer) return;

            // Each slide is 100% width, so we move by 100% per slide
            const translateX = -this.currentSlide * 100;
            carouselContainer.style.transform = `translateX(${translateX}%)`;

            console.log(`Dich Vu Cong Truc Tuyen carousel moved to slide ${this.currentSlide + 1}/${this.totalSlides}, translateX: ${translateX}%`);
        },

        isNextDisabled() {
            return this.currentSlide >= this.totalSlides - 1;
        },

        isPrevDisabled() {
            return this.currentSlide <= 0;
        },

        goToSlide(slideIndex) {
            if (this.isTransitioning || slideIndex < 0 || slideIndex >= this.totalSlides) return;

            this.isTransitioning = true;
            this.currentSlide = slideIndex;
            this.updateCarousel();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
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

    // Fallback for real estate carousel if Alpine.js is not available
    const realEstateCarouselContainer = document.querySelector('[x-data*="realEstateCarousel"]');
    if (realEstateCarouselContainer && !realEstateCarouselContainer.__x) {
        console.log('Initializing fallback real estate carousel logic');

        let currentSlide = 0;
        const totalSlides = 2;
        let isTransitioning = false;

        const carouselElement = realEstateCarouselContainer.querySelector('.flex.transition-transform');
        const prevButton = realEstateCarouselContainer.querySelector('button[\\@click*="prevSlide"]');
        const nextButton = realEstateCarouselContainer.querySelector('button[\\@click*="nextSlide"]');

        function updateCarousel() {
            if (!carouselElement) return;
            const translateX = -currentSlide * 50;
            carouselElement.style.transform = `translateX(${translateX}%)`;
            console.log(`Fallback real estate carousel moved to slide ${currentSlide + 1}/${totalSlides}`);
        }

        function canNext() {
            return currentSlide < totalSlides - 1;
        }

        function canPrev() {
            return currentSlide > 0;
        }

        function updateButtons() {
            if (prevButton) {
                prevButton.disabled = !canPrev();
                prevButton.classList.toggle('opacity-50', !canPrev());
                prevButton.classList.toggle('cursor-not-allowed', !canPrev());
            }
            if (nextButton) {
                nextButton.disabled = !canNext();
                nextButton.classList.toggle('opacity-50', !canNext());
                nextButton.classList.toggle('cursor-not-allowed', !canNext());
            }
        }

        function nextSlide() {
            if (isTransitioning || !canNext()) return;
            isTransitioning = true;
            currentSlide++;
            updateCarousel();
            updateButtons();
            setTimeout(() => { isTransitioning = false; }, 500);
        }

        function prevSlide() {
            if (isTransitioning || !canPrev()) return;
            isTransitioning = true;
            currentSlide--;
            updateCarousel();
            updateButtons();
            setTimeout(() => { isTransitioning = false; }, 500);
        }

        // Add event listeners
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }

        // Initialize
        updateCarousel();
        updateButtons();
    }

    // Fallback for job carousel if Alpine.js is not available
    const jobCarouselContainer = document.querySelector('[x-data*="viecLamDeXuatComponent"]');
    if (jobCarouselContainer && !jobCarouselContainer.__x) {
        console.log('Initializing fallback job carousel logic');

        let currentSlide = 0;
        const totalSlides = 3;
        let isTransitioning = false;

        const carouselElement = jobCarouselContainer.querySelector('.flex.transition-transform');
        const prevButton = jobCarouselContainer.querySelector('button[\\@click*="prevSlide"]');
        const nextButton = jobCarouselContainer.querySelector('button[\\@click*="nextSlide"]');

        function updateCarousel() {
            if (!carouselElement) return;
            const translateX = -currentSlide * 100;
            carouselElement.style.transform = `translateX(${translateX}%)`;
            console.log(`Fallback job carousel moved to slide ${currentSlide + 1}/${totalSlides}`);
        }

        function canNext() {
            return currentSlide < totalSlides - 1;
        }

        function canPrev() {
            return currentSlide > 0;
        }

        function updateButtons() {
            if (prevButton) {
                prevButton.disabled = !canPrev();
                prevButton.classList.toggle('opacity-50', !canPrev());
                prevButton.classList.toggle('cursor-not-allowed', !canPrev());
            }
            if (nextButton) {
                nextButton.disabled = !canNext();
                nextButton.classList.toggle('opacity-50', !canNext());
                nextButton.classList.toggle('cursor-not-allowed', !canNext());
            }
        }

        function nextSlide() {
            if (isTransitioning || !canNext()) return;
            isTransitioning = true;
            currentSlide++;
            updateCarousel();
            updateButtons();
            updateDots();
            setTimeout(() => { isTransitioning = false; }, 500);
        }

        function prevSlide() {
            if (isTransitioning || !canPrev()) return;
            isTransitioning = true;
            currentSlide--;
            updateCarousel();
            updateButtons();
            updateDots();
            setTimeout(() => { isTransitioning = false; }, 500);
        }

        // Add event listeners
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }

        // Initialize
        updateCarousel();
        updateButtons();

        // Create dots pagination fallback
        const dotsContainer = jobCarouselContainer.querySelector('.flex.justify-center.mt-6.gap-2');
        if (dotsContainer && !dotsContainer.querySelector('button[data-dot]')) {
            // Clear existing dots
            dotsContainer.innerHTML = '';

            // Create dots
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'w-2 h-2 rounded-full transition-colors';
                dot.setAttribute('data-dot', i);
                dot.style.backgroundColor = i === currentSlide ? '#3b82f6' : '#d1d5db';

                dot.addEventListener('click', () => {
                    if (isTransitioning) return;
                    isTransitioning = true;
                    currentSlide = i;
                    updateCarousel();
                    updateButtons();
                    updateDots();
                    setTimeout(() => { isTransitioning = false; }, 500);
                });

                dotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('button[data-dot]');
            dots.forEach((dot, index) => {
                dot.style.backgroundColor = index === currentSlide ? '#3b82f6' : '#d1d5db';
            });
        }
    }

    // Fallback for Dich Vu Carousel
    const dichVuCarouselContainer = document.querySelector('[x-data*="dichVuCarousel"]');
    if (dichVuCarouselContainer && !dichVuCarouselContainer.__x) {
        console.log('Initializing fallback dich vu carousel logic');

        let currentSlide = 0;
        const totalSlides = 2; // 8 items / 4 items per slide = 2 slides
        let isTransitioning = false;

        const carouselElement = dichVuCarouselContainer.querySelector('.flex.transition-transform');
        const prevButton = dichVuCarouselContainer.querySelector('button[\\@click*="prevSlide"]');
        const nextButton = dichVuCarouselContainer.querySelector('button[\\@click*="nextSlide"]');

        function updateCarousel() {
            if (!carouselElement) return;
            const translateX = -currentSlide * 100;
            carouselElement.style.transform = `translateX(${translateX}%)`;
            console.log(`Fallback dich vu carousel moved to slide ${currentSlide + 1}/${totalSlides}`);
        }

        function canNext() {
            return currentSlide < totalSlides - 1;
        }

        function canPrev() {
            return currentSlide > 0;
        }

        function updateButtons() {
            if (prevButton) {
                prevButton.disabled = !canPrev();
                prevButton.classList.toggle('opacity-50', !canPrev());
                prevButton.classList.toggle('cursor-not-allowed', !canPrev());
            }
            if (nextButton) {
                nextButton.disabled = !canNext();
                nextButton.classList.toggle('opacity-50', !canNext());
                nextButton.classList.toggle('cursor-not-allowed', !canNext());
            }
        }

        function nextSlide() {
            if (isTransitioning || !canNext()) return;
            isTransitioning = true;
            currentSlide++;
            updateCarousel();
            updateButtons();
            updateDots();
            setTimeout(() => { isTransitioning = false; }, 500);
        }

        function prevSlide() {
            if (isTransitioning || !canPrev()) return;
            isTransitioning = true;
            currentSlide--;
            updateCarousel();
            updateButtons();
            updateDots();
            setTimeout(() => { isTransitioning = false; }, 500);
        }

        // Add event listeners
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }

        // Initialize
        updateCarousel();
        updateButtons();

        // Create dots pagination fallback
        const dotsContainer = dichVuCarouselContainer.querySelector('.flex.justify-center.mt-6.gap-2');
        if (dotsContainer && !dotsContainer.querySelector('button[data-dot]')) {
            // Clear existing dots
            dotsContainer.innerHTML = '';

            // Create dots
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'w-2 h-2 rounded-full transition-colors';
                dot.setAttribute('data-dot', i);
                dot.style.backgroundColor = i === currentSlide ? '#3b82f6' : '#d1d5db';

                dot.addEventListener('click', () => {
                    if (isTransitioning) return;
                    isTransitioning = true;
                    currentSlide = i;
                    updateCarousel();
                    updateButtons();
                    updateDots();
                    setTimeout(() => { isTransitioning = false; }, 500);
                });

                dotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('button[data-dot]');
            dots.forEach((dot, index) => {
                dot.style.backgroundColor = index === currentSlide ? '#3b82f6' : '#d1d5db';
            });
        }
    }

    // Fallback for Doanh Nghiep Carousel
    const doanhNghiepCarouselContainer = document.querySelector('[x-data*="doanhNghiepCarousel"]');
    if (doanhNghiepCarouselContainer && !doanhNghiepCarouselContainer.__x) {
        console.log('Initializing fallback doanh nghiep carousel logic');

        let currentSlide = 0;
        const totalSlides = 2; // 6 items / 3 items per slide = 2 slides
        let isTransitioning = false;

        const carouselElement = doanhNghiepCarouselContainer.querySelector('.flex.transition-transform');
        const prevButton = doanhNghiepCarouselContainer.querySelector('button[\\@click*="prevSlide"]');
        const nextButton = doanhNghiepCarouselContainer.querySelector('button[\\@click*="nextSlide"]');

        function updateCarousel() {
            if (!carouselElement) return;
            const translateX = -currentSlide * 100;
            carouselElement.style.transform = `translateX(${translateX}%)`;
            console.log(`Fallback doanh nghiep carousel moved to slide ${currentSlide + 1}/${totalSlides}`);
        }

        function canNext() {
            return currentSlide < totalSlides - 1;
        }

        function canPrev() {
            return currentSlide > 0;
        }

        function updateButtons() {
            if (prevButton) {
                prevButton.disabled = !canPrev();
                prevButton.classList.toggle('opacity-50', !canPrev());
                prevButton.classList.toggle('cursor-not-allowed', !canPrev());
            }
            if (nextButton) {
                nextButton.disabled = !canNext();
                nextButton.classList.toggle('opacity-50', !canNext());
                nextButton.classList.toggle('cursor-not-allowed', !canNext());
            }
        }

        function nextSlide() {
            if (isTransitioning || !canNext()) return;
            isTransitioning = true;
            currentSlide++;
            updateCarousel();
            updateButtons();
            updateDots();
            setTimeout(() => { isTransitioning = false; }, 500);
        }

        function prevSlide() {
            if (isTransitioning || !canPrev()) return;
            isTransitioning = true;
            currentSlide--;
            updateCarousel();
            updateButtons();
            updateDots();
            setTimeout(() => { isTransitioning = false; }, 500);
        }

        // Add event listeners
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }

        // Initialize
        updateCarousel();
        updateButtons();

        // Create dots pagination fallback
        const dotsContainer = doanhNghiepCarouselContainer.querySelector('.flex.justify-center.mt-6.gap-2');
        if (dotsContainer && !dotsContainer.querySelector('button[data-dot]')) {
            // Clear existing dots
            dotsContainer.innerHTML = '';

            // Create dots
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'w-2 h-2 rounded-full transition-colors';
                dot.setAttribute('data-dot', i);
                dot.style.backgroundColor = i === currentSlide ? '#3b82f6' : '#d1d5db';

                dot.addEventListener('click', () => {
                    if (isTransitioning) return;
                    isTransitioning = true;
                    currentSlide = i;
                    updateCarousel();
                    updateButtons();
                    updateDots();
                    setTimeout(() => { isTransitioning = false; }, 500);
                });

                dotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('button[data-dot]');
            dots.forEach((dot, index) => {
                dot.style.backgroundColor = index === currentSlide ? '#3b82f6' : '#d1d5db';
            });
        }
    }

    // Fallback for Dich Vu Cong Truc Tuyen Carousel
    const dichVuCongTrucTuyenCarouselContainer = document.querySelector('[x-data*="dichVuCongTrucTuyenCarousel"]');
    if (dichVuCongTrucTuyenCarouselContainer && !dichVuCongTrucTuyenCarouselContainer.__x) {
        console.log('Initializing fallback dich vu cong truc tuyen carousel logic');

        let currentSlide = 0;
        const totalSlides = 2; // 12 items / 6 items per slide = 2 slides
        let isTransitioning = false;

        const carouselElement = dichVuCongTrucTuyenCarouselContainer.querySelector('.flex.transition-transform');
        const prevButton = dichVuCongTrucTuyenCarouselContainer.querySelector('button[\\@click*="prevSlide"]');
        const nextButton = dichVuCongTrucTuyenCarouselContainer.querySelector('button[\\@click*="nextSlide"]');

        function updateCarousel() {
            if (!carouselElement) return;
            const translateX = -currentSlide * 100;
            carouselElement.style.transform = `translateX(${translateX}%)`;
            console.log(`Fallback dich vu cong truc tuyen carousel moved to slide ${currentSlide + 1}/${totalSlides}`);
        }

        function canNext() {
            return currentSlide < totalSlides - 1;
        }

        function canPrev() {
            return currentSlide > 0;
        }

        function updateButtons() {
            if (prevButton) {
                prevButton.disabled = !canPrev();
                prevButton.classList.toggle('opacity-50', !canPrev());
                prevButton.classList.toggle('cursor-not-allowed', !canPrev());
            }
            if (nextButton) {
                nextButton.disabled = !canNext();
                nextButton.classList.toggle('opacity-50', !canNext());
                nextButton.classList.toggle('cursor-not-allowed', !canNext());
            }
        }

        function nextSlide() {
            if (isTransitioning || !canNext()) return;
            isTransitioning = true;
            currentSlide++;
            updateCarousel();
            updateButtons();
            updateDots();
            setTimeout(() => { isTransitioning = false; }, 500);
        }

        function prevSlide() {
            if (isTransitioning || !canPrev()) return;
            isTransitioning = true;
            currentSlide--;
            updateCarousel();
            updateButtons();
            updateDots();
            setTimeout(() => { isTransitioning = false; }, 500);
        }

        // Add event listeners
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }

        // Initialize
        updateCarousel();
        updateButtons();

        // Create dots pagination fallback
        const dotsContainer = dichVuCongTrucTuyenCarouselContainer.querySelector('.flex.justify-center.mt-6.gap-2');
        if (dotsContainer && !dotsContainer.querySelector('button[data-dot]')) {
            // Clear existing dots
            dotsContainer.innerHTML = '';

            // Create dots
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'w-2 h-2 rounded-full transition-colors';
                dot.setAttribute('data-dot', i);
                dot.style.backgroundColor = i === currentSlide ? '#3b82f6' : '#d1d5db';

                dot.addEventListener('click', () => {
                    if (isTransitioning) return;
                    isTransitioning = true;
                    currentSlide = i;
                    updateCarousel();
                    updateButtons();
                    updateDots();
                    setTimeout(() => { isTransitioning = false; }, 500);
                });

                dotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('button[data-dot]');
            dots.forEach((dot, index) => {
                dot.style.backgroundColor = index === currentSlide ? '#3b82f6' : '#d1d5db';
            });
        }
    }
});