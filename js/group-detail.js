// Group Detail Alpine.js Components
// Chứa tất cả components cho trang group detail: Tab switching, v.v.

// Global state cho tab switching
window.TabSwitchingState = {
  activeTab: 'posts',
  listeners: [],

  setActiveTab(tabName) {
    this.activeTab = tabName;
    this.notifyListeners();
  },

  addListener(callback) {
    this.listeners.push(callback);
  },

  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  },

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.activeTab));
  }
};

document.addEventListener('alpine:init', () => {

  // ===========================================
  // TAB SWITCHING COMPONENT
  // ===========================================
  Alpine.data('tabSwitchingComponent', () => ({
    activeTab: 'posts', // Mặc định là tab "Bài viết"

    init() {
      // Đồng bộ với global state
      this.activeTab = window.TabSwitchingState.activeTab;

      // Thêm listener để nhận updates từ global state
      this.updateCallback = (newActiveTab) => {
        this.activeTab = newActiveTab;
        this.updateTabVisibility();
      };
      window.TabSwitchingState.addListener(this.updateCallback);

      // Khởi tạo trạng thái ban đầu
      this.updateTabVisibility();
    },

    switchTab(tabName) {
      this.activeTab = tabName;
      window.TabSwitchingState.setActiveTab(tabName);
      this.updateTabVisibility();
    },

    updateTabVisibility() {
      // Lấy tất cả các tab content divs
      const postsDiv = document.getElementById('posts');
      const listDiv = document.getElementById('list');
      const membersDiv = document.getElementById('members');
      const introduceDiv = document.getElementById('introduce');

      // Ẩn tất cả các div trước
      if (postsDiv) postsDiv.classList.add('hidden');
      if (listDiv) listDiv.classList.add('hidden');
      if (membersDiv) membersDiv.classList.add('hidden');
      if (introduceDiv) introduceDiv.classList.add('hidden');

      // Hiển thị tab được chọn
      switch (this.activeTab) {
        case 'posts':
          if (postsDiv) postsDiv.classList.remove('hidden');
          break;
        case 'list':
          if (listDiv) listDiv.classList.remove('hidden');
          break;
        case 'members':
          if (membersDiv) membersDiv.classList.remove('hidden');
          break;
        case 'about':
          if (introduceDiv) introduceDiv.classList.remove('hidden');
          break;
      }
    },

    // Kiểm tra tab có đang active không
    isTabActive(tabName) {
      return this.activeTab === tabName;
    },

    // Lấy class cho tab button
    getTabClass(tabName) {
      const baseClass = "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-xs py-1 sm:py-3 px-1";

      if (this.isTabActive(tabName)) {
        return baseClass + " bg-background text-foreground shadow-sm";
      } else {
        return baseClass + " text-muted-foreground hover:text-foreground";
      }
    },

    // Cleanup khi component bị destroy
    destroy() {
      if (this.updateCallback) {
        window.TabSwitchingState.removeListener(this.updateCallback);
      }
    }
  }));

  // ===========================================
  // GROUP DETAIL MAIN COMPONENT
  // ===========================================
  Alpine.data('groupDetailComponent', () => ({
    group: null,
    isLoading: true,

    init() {
      console.log('Group Detail component initialized.');

      // Khởi tạo Lucide icons
      this.$nextTick(() => {
        lucide.createIcons();
      });
    }
  }));

  // ===========================================
  // GALLERY COMPONENT FOR POST IMAGES
  // ===========================================
  Alpine.data('gallery', () => ({
    isOpen: false,
    images: [],
    currentIndex: 0,
    postTitle: '',

    // mở gallery riêng trong post
    openPostGallery(el, index) {
      const galleryRoot = el.closest(".post-gallery")
      const post = galleryRoot.closest(".rounded-lg.border")
      const titleElement = post.querySelector(".font-medium")
      this.postTitle = titleElement ? `Ảnh của ${titleElement.textContent.trim()}` : 'Ảnh'

      // Lấy tất cả ảnh từ gallery (bao gồm cả ảnh ẩn)
      this.images = [...galleryRoot.querySelectorAll("img")].map(img => ({
        src: img.getAttribute("src"),
        alt: img.getAttribute("alt")
      }))

      this.currentIndex = index
      this.isOpen = true
    },

    closeModal() {
      this.isOpen = false
    },

    next() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length
    },

    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length
    },

    setIndex(index) {
      this.currentIndex = index
    },
  }));
});
