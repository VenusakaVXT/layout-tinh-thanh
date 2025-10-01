// Chi tiết Bất động sản Component - Alpine.js
function chiTietBatDongSanComponent() {
  return {
    // Image slider
    currentImageIndex: 0,
    images: [
      './public/images/hero-bg.webp',
      './public/images/hero-bg.webp'
    ],

    // Heart toggle
    isLiked: false,

    // Reviews toggle
    showAllReviews: false,

    // Loan percentage input/range sync
    loanPercentage: 70,

    // Modal tour 360
    showTour360Modal: false,

    // Modal send contact
    showSendContactModal: false,

    // Modal schedule visit
    showScheduleVisitModal: false,

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

    // Heart toggle method
    toggleLike() {
      this.isLiked = !this.isLiked;
    },

    getHeartClasses() {
      return this.isLiked
        ? 'lucide lucide-heart w-4 h-4 fill-current text-red-500'
        : 'lucide lucide-heart w-4 h-4';
    },

    // Reviews toggle method
    toggleReviews() {
      this.showAllReviews = !this.showAllReviews;
    },

    getReviewsButtonText() {
      return this.showAllReviews ? 'Thu gọn đánh giá' : 'Xem tất cả đánh giá';
    },

    getReviewsButtonIcon() {
      return this.showAllReviews ? 'lucide-chevron-up' : 'lucide-chevron-down';
    },

    // Modal tour 360 methods
    openTour360Modal() {
      this.showTour360Modal = true;
    },

    closeTour360Modal() {
      this.showTour360Modal = false;
    },

    // Modal send contact methods
    openSendContactModal() {
      this.showSendContactModal = true;
    },

    closeSendContactModal() {
      this.showSendContactModal = false;
    },

    // Modal schedule visit methods
    openScheduleVisitModal() {
      this.showScheduleVisitModal = true;
    },

    closeScheduleVisitModal() {
      this.showScheduleVisitModal = false;
    },

    // Format price
    formatPrice(price) {
      if (price >= 1000000000) {
        return `${(price / 1000000000).toFixed(1)} tỷ`;
      } else if (price >= 1000000) {
        return `${(price / 1000000).toFixed(0)} triệu`;
      }
      return price.toLocaleString();
    },

    // Format area
    formatArea(area) {
      return `${area}m²`;
    },

    // Format date
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },

    // Loan percentage methods
    updateLoanPercentageFromNumber() {
      // Validate and constrain the value
      if (this.loanPercentage < 10) {
        this.loanPercentage = 10;
      } else if (this.loanPercentage > 90) {
        this.loanPercentage = 90;
      }
    },

    onNumberInput(event) {
      this.loanPercentage = parseInt(event.target.value) || 10;
      this.updateLoanPercentageFromNumber();
    },

    onRangeInput(event) {
      this.loanPercentage = parseInt(event.target.value);
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
