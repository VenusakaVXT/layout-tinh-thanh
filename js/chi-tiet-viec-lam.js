// Chi tiết Việc làm Component - Alpine.js
function chiTietViecLamComponent() {
  return {
    // Modal apply job
    showApplyJobModal: false,

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

    // Modal apply job methods
    openApplyJobModal() {
      this.showApplyJobModal = true;
    },

    closeApplyJobModal() {
      this.showApplyJobModal = false;
    },

    // Format salary
    formatSalary(min, max) {
      if (min && max) {
        return `${min.toLocaleString()} - ${max.toLocaleString()} VNĐ`;
      } else if (min) {
        return `Từ ${min.toLocaleString()} VNĐ`;
      } else if (max) {
        return `Đến ${max.toLocaleString()} VNĐ`;
      }
      return 'Thỏa thuận';
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