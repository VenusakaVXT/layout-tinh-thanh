// Mau CV Alpine.js Components
// Chứa tất cả components cho trang mẫu CV: Filter Buttons, v.v.

// ===========================================
// CONSTANTS
// ===========================================
const CATEGORY_MAPPING = {
  'Công nghệ thông tin': 'cong-nghe-thong-tin',
  'Kinh doanh': 'kinh-doanh',
  'Thiết kế': 'thiet-ke',
  'Marketing': 'marketing',
  'Tài chính': 'tai-chinh',
  'Bán hàng': 'ban-hang',
  'Y tế': 'y-te',
  'Giáo dục': 'giao-duc',
  'Nhân sự': 'nhan-su',
  'Luật': 'luat',
  'Môi trường': 'moi-truong',
  'F&B': 'f-b'
};

// Reverse mapping để convert từ slug về tên
const REVERSE_CATEGORY_MAPPING = Object.fromEntries(
  Object.entries(CATEGORY_MAPPING).map(([key, value]) => [value, key])
);

document.addEventListener('alpine:init', () => {

  // ===========================================
  // CV FILTER COMPONENT
  // ===========================================
  Alpine.data('cvFilterComponent', () => ({
    searchKeyword: '',

    init() {
      console.log('CV Filter component initialized.');

      // Set active button ngay lập tức để tránh flash
      this.checkUrlParams();

      // Lấy keyword từ URL nếu có
      this.getKeywordFromUrl();

      // Lắng nghe sự kiện popstate (Back/Forward button)
      window.addEventListener('popstate', () => {
        this.checkUrlParams();
        this.getKeywordFromUrl();
      });
    },

    setActiveButton(buttonId) {
      // Remove active class từ tất cả buttons
      const allButtons = document.querySelectorAll('.cv-filter-button');
      allButtons.forEach(button => {
        button.classList.remove('bg-primary', 'text-primary-foreground', 'hover:bg-primary/90', 'btn-primary');
        button.classList.add('border', 'border-input', 'bg-background', 'hover:text-accent-foreground', 'hover:bg-gray-100');
      });

      // Add active class cho button được chọn
      const targetButton = document.getElementById(buttonId);
      if (targetButton) {
        targetButton.classList.remove('border', 'border-input', 'bg-background', 'hover:text-accent-foreground', 'hover:bg-gray-100');
        targetButton.classList.add('bg-primary', 'text-primary-foreground', 'hover:bg-primary/90', 'btn-primary');
      }
    },

    // Kiểm tra URL params khi load trang
    checkUrlParams() {
      const urlParams = new URLSearchParams(window.location.search);
      const category = urlParams.get('category');

      if (category) {
        const buttonText = REVERSE_CATEGORY_MAPPING[category];
        if (buttonText) {
          // Tìm button có text tương ứng
          const allButtons = document.querySelectorAll('.cv-filter-button');
          allButtons.forEach(button => {
            if (button.textContent.trim().includes(buttonText)) {
              const buttonId = button.id;
              this.setActiveButton(buttonId);
            }
          });
        }
      } else {
        // Nếu không có category trong URL, set button "Tất cả" làm active
        this.setActiveButton('all');
      }
    },

    // Lấy keyword từ URL
    getKeywordFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      const keyword = urlParams.get('keyword');
      if (keyword) {
        this.searchKeyword = keyword;
        // Cập nhật value của input
        const searchInput = document.querySelector('input[placeholder*="Tìm kiếm mẫu CV"]');
        if (searchInput) {
          searchInput.value = keyword;
        }
      }
    },

    // Xử lý tìm kiếm
    handleSearch() {
      const keyword = this.searchKeyword.trim();

      if (keyword) {
        this.updateUrlWithKeyword(keyword);
      } else {
        this.removeKeywordFromUrl();
      }
    },

    // Thêm keyword vào URL (giữ lại category nếu có)
    updateUrlWithKeyword(keyword) {
      const url = new URL(window.location);
      url.searchParams.set('keyword', keyword);
      // Chuyển trang với URL mới
      window.location.href = url.toString();
    },

    // Xóa keyword khỏi URL (giữ lại category nếu có)
    removeKeywordFromUrl() {
      const url = new URL(window.location);
      url.searchParams.delete('keyword');
      // Chuyển trang với URL mới
      window.location.href = url.toString();
    },

    // Xử lý khi nhấn Enter
    handleKeyPress(event) {
      if (event.key === 'Enter') {
        this.handleSearch();
      }
    },

    // Xử lý khi blur khỏi input
    handleBlur() {
      this.handleSearch();
    },

    // Clear search và xóa keyword khỏi URL
    clearSearch() {
      this.searchKeyword = '';
      this.removeKeywordFromUrl();
    }
  }));

});

// ===========================================
// UTILITY FUNCTIONS
// ===========================================
window.MauCvUtils = {
  // Utility functions cho trang mẫu CV
  scrollToTop: () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Format category slug
  formatCategorySlug: (text) => {
    return text.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Mau CV page loaded.');
});
