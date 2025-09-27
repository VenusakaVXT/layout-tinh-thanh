// Chi tiết Dịch vụ Component - Alpine.js
function chiTietDichVuComponent() {
  return {
    // Image slider
    currentImageIndex: 0,
    images: [
      './public/images/hero-bg.webp',
      './public/images/hero-bg.webp',
      './public/images/hero-bg.webp',
      './public/images/hero-bg.webp',
      './public/images/hero-bg.webp'
    ],

    // Heart toggle
    isLiked: false,

    // Modal contact service
    showContactServiceModal: false,

    // Tab management
    activeTab: 'description',

    // Reviews toggle
    showAllReviews: false,

    // FAQ toggle
    openFaqItems: [],

    // Initialize component
    init() {
      this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
      // Close dropdowns when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
          // Close any open dropdowns if needed
        }
      });
    },

    // Image slider methods
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    },

    prevImage() {
      this.currentImageIndex = this.currentImageIndex === 0
        ? this.images.length - 1
        : this.currentImageIndex - 1;
    },

    goToImage(index) {
      this.currentImageIndex = index;
    },

    getCurrentImage() {
      return this.images[this.currentImageIndex];
    },

    isActiveImage(index) {
      return index === this.currentImageIndex;
    },

    getImageClasses(index) {
      const baseClasses = 'relative rounded-lg overflow-hidden';
      const activeClasses = this.isActiveImage(index) ? ' ring-2 ring-blue-500' : '';
      return baseClasses + activeClasses;
    },

    getDotClasses(index) {
      const baseClasses = 'w-2 h-2 rounded-full';
      const activeClasses = this.isActiveImage(index) ? ' bg-white' : ' bg-white/50';
      return baseClasses + activeClasses;
    },

    // Tab methods
    setActiveTab(tabName) {
      this.activeTab = tabName;
    },

    isTabActive(tabName) {
      return this.activeTab === tabName;
    },

    getTabState(tabName) {
      return this.isTabActive(tabName) ? 'active' : 'inactive';
    },

    getTabClasses(tabName) {
      const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
      const activeClasses = this.isTabActive(tabName)
        ? ' bg-background text-foreground shadow-sm'
        : '';
      return baseClasses + activeClasses;
    },

    getTabPanelClasses(tabName) {
      const baseClasses = 'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-6';
      return baseClasses;
    },

    // Reviews toggle methods
    toggleReviews() {
      this.showAllReviews = !this.showAllReviews;
    },

    getReviewsButtonText() {
      return this.showAllReviews ? 'Thu gọn đánh giá' : 'Xem tất cả đánh giá';
    },

    getReviewsButtonIcon() {
      return this.showAllReviews ? 'lucide-chevron-up' : 'lucide-chevron-down';
    },

    // FAQ toggle methods
    toggleFaqItem(index) {
      if (this.openFaqItems.includes(index)) {
        this.openFaqItems = this.openFaqItems.filter(item => item !== index);
      } else {
        this.openFaqItems.push(index);
      }
    },

    isFaqItemOpen(index) {
      return this.openFaqItems.includes(index);
    },

    getFaqItemClasses(index) {
      const baseClasses = 'grid transition-all duration-300 ease-in-out';
      const openClasses = this.isFaqItemOpen(index)
        ? 'grid-rows-[1fr] opacity-100'
        : 'grid-rows-[0fr] opacity-0';
      return baseClasses + ' ' + openClasses;
    },

    getFaqButtonClasses(index) {
      const baseClasses = 'w-full flex items-center justify-between p-4 text-left hover:bg-gray-50';
      return baseClasses;
    },

    getFaqIconClasses(index) {
      const baseClasses = 'lucide lucide-chevron-down w-5 h-5 transition-transform duration-300';
      const openClasses = this.isFaqItemOpen(index) ? 'rotate-180' : '';
      return baseClasses + ' ' + openClasses;
    },

    // Modal contact service methods
    openContactServiceModal() {
      this.showContactServiceModal = true;
    },

    closeContactServiceModal() {
      this.showContactServiceModal = false;
    },

    // Heart toggle method
    toggleLike() {
      this.isLiked = !this.isLiked;
    },

    getHeartClasses() {
      return this.isLiked
        ? 'lucide lucide-heart w-4 h-4 fill-current text-red-500'
        : 'lucide lucide-heart w-4 h-4';
    },

    // Format price
    formatPrice(price) {
      if (price) {
        return price.toLocaleString('vi-VN') + ' VNĐ';
      }
      return 'Liên hệ';
    },

    // Format date
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
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
