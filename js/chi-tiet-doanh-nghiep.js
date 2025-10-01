document.addEventListener('alpine:init', () => {
  Alpine.data('tabNavigation', () => ({
    activeTab: 'overview',

    scrollToSection(sectionId) {
      this.activeTab = sectionId;
      // Update global state if it exists
      if (window.tabNavigation) {
        window.tabNavigation.activeTab = sectionId;
      }
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    },

    isActive(sectionId) {
      return this.activeTab === sectionId;
    }
  }));

  Alpine.data('counterAnimation', () => ({
    employees: 0,
    exportValue: 0,
    factories: 0,
    years: 0,

    init() {
      this.animateCounter('employees', 160000, 2000);
      this.animateCounter('exportValue', 65, 2000);
      this.animateCounter('factories', 8, 1500);
      this.animateCounter('years', 29, 2000);
    },

    animateCounter(property, target, duration) {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          this[property] = target;
          clearInterval(timer);
        } else {
          this[property] = Math.floor(current);
        }
      }, 16);
    }
  }));

  // Alpine.js component for follow button toggle functionality
  Alpine.data('followButton', () => ({
    isFollowing: false, // Default state: not following

    // Method to toggle follow state
    toggleFollow() {
      this.isFollowing = !this.isFollowing;
    },

    // Method to get button text based on state
    getButtonText() {
      return this.isFollowing ? 'Đang theo dõi' : 'Theo dõi';
    },

    // Method to get button icon based on state
    getButtonIcon() {
      if (this.isFollowing) {
        // Following state: user-check icon
        return `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-user-check w-3 h-3 sm:w-4 sm:h-4 mr-1">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <polyline points="16,11 18,13 22,9"></polyline>
          </svg>
        `;
      } else {
        // Not following state: user-plus icon
        return `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-user-plus w-3 h-3 sm:w-4 sm:h-4 mr-1">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <line x1="19" x2="19" y1="8" y2="14"></line>
            <line x1="22" x2="16" y1="11" y2="11"></line>
          </svg>
        `;
      }
    },

    // Method to get button classes based on state
    getButtonClasses() {
      const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 text-xs sm:text-sm";

      if (this.isFollowing) {
        // Following state: blue background, white text
        return `${baseClasses} bg-primary text-primary-foreground hover:bg-primary/90`;
      } else {
        // Not following state: white background, dark text
        return `${baseClasses} border border-input bg-background hover:bg-accent hover:text-accent-foreground`;
      }
    }
  }));

  // Alpine.js component for dropdown select menu
  Alpine.data('selectMenu', () => ({
    isOpen: false,
    selectedValue: 'Tất cả danh mục',

    toggle() {
      this.isOpen = !this.isOpen;
    },

    selectCategory(category) {
      this.selectedValue = category;
      this.isOpen = false;
    },

    closeDropdown() {
      this.isOpen = false;
    }
  }));

  // Alpine.js component for rank/level select menu
  Alpine.data('rankSelectMenu', () => ({
    isOpen: false,
    selectedValue: 'Tất cả cấp bậc',

    toggle() {
      this.isOpen = !this.isOpen;
    },

    selectRank(rank) {
      this.selectedValue = rank;
      this.isOpen = false;
    },

    closeDropdown() {
      this.isOpen = false;
    }
  }));

  // Alpine.js component for location select menu
  Alpine.data('locationSelectMenu', () => ({
    isOpen: false,
    selectedValue: 'Tất cả địa điểm',

    toggle() {
      this.isOpen = !this.isOpen;
    },

    selectLocation(location) {
      this.selectedValue = location;
      this.isOpen = false;
    },

    closeDropdown() {
      this.isOpen = false;
    }
  }));

  // Alpine.js component for category select menu
  Alpine.data('categorySelectMenu', () => ({
    isOpen: false,
    selectedValue: 'Tất cả danh mục',

    toggle() {
      this.isOpen = !this.isOpen;
    },

    selectCategory(category) {
      this.selectedValue = category;
      this.isOpen = false;
    },

    closeDropdown() {
      this.isOpen = false;
    }
  }));

  // Alpine.js component for services list toggle
  Alpine.data('servicesToggle', () => ({
    showAll: false,

    toggleServices() {
      this.showAll = !this.showAll;
    },

    getButtonText() {
      return this.showAll ? 'Thu gọn' : 'Xem tất cả dịch vụ';
    },

    getButtonIcon() {
      return this.showAll ? 'chevron-up' : 'chevron-down';
    }
  }));

  // Alpine.js component for jobs list toggle
  Alpine.data('jobsToggle', () => ({
    showAll: false,

    toggleJobs() {
      this.showAll = !this.showAll;
    },

    getButtonText() {
      return this.showAll ? 'Thu gọn' : 'Xem tất cả việc làm';
    },

    getButtonIcon() {
      return this.showAll ? 'chevron-up' : 'chevron-down';
    }
  }));

  // Alpine.js component for news list toggle
  Alpine.data('newsToggle', () => ({
    showAll: false,

    toggleNews() {
      this.showAll = !this.showAll;
    },

    getButtonText() {
      return this.showAll ? 'Thu gọn' : 'Xem tất cả tin tức';
    },

    getButtonIcon() {
      return this.showAll ? 'chevron-up' : 'chevron-down';
    }
  }));

  // Alpine.js component for reviews list toggle
  Alpine.data('reviewsToggle', () => ({
    showAll: false,

    toggleReviews() {
      this.showAll = !this.showAll;
    },

    getButtonText() {
      return this.showAll ? 'Thu gọn đánh giá' : 'Xem tất cả đánh giá';
    },

    getButtonIcon() {
      return this.showAll ? 'chevron-up' : 'chevron-down';
    }
  }));

  // Alpine.js component for employee benefits toggle
  Alpine.data('benefitsToggle', () => ({
    salaryOpen: false,
    insuranceOpen: false,
    otherOpen: false,
    trainingOpen: false,

    toggleSalary() {
      this.salaryOpen = !this.salaryOpen;
    },

    toggleInsurance() {
      this.insuranceOpen = !this.insuranceOpen;
    },

    toggleOther() {
      this.otherOpen = !this.otherOpen;
    },

    toggleTraining() {
      this.trainingOpen = !this.trainingOpen;
    }
  }));

  // Alpine.js component for image carousel
  Alpine.data('imageCarousel', () => ({
    currentIndex: 0,
    images: [
      {
        src: "./public/images/placeholder.svg?height=400&width=600&text=Samsung+Factory+1",
        alt: "Nhà máy Samsung Bắc Ninh"
      },
      {
        src: "./public/images/placeholder.svg?height=400&width=600&text=Samsung+Factory+2",
        alt: "Nhà máy Samsung Thái Nguyên"
      },
      {
        src: "./public/images/placeholder.svg?height=400&width=600&text=Samsung+RD+Center",
        alt: "Trung tâm R&D TP.HCM"
      },
      {
        src: "./public/images/placeholder.svg?height=400&width=600&text=Samsung+Office",
        alt: "Văn phòng Samsung Hà Nội"
      },
      {
        src: "./public/images/placeholder.svg?height=400&width=600&text=Samsung+Team",
        alt: "Đội ngũ nhân viên Samsung"
      },
      {
        src: "./public/images/placeholder.svg?height=400&width=600&text=Samsung+Products",
        alt: "Sản phẩm Samsung"
      }
    ],

    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },

    prevImage() {
      this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    },

    selectImage(index) {
      this.currentIndex = index;
    },

    isActive(index) {
      return this.currentIndex === index;
    }
  }));
});
