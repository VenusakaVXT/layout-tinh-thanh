// Alpine.js component for tab switching functionality
document.addEventListener('alpine:init', () => {
  Alpine.data('tabSwitcher', () => ({
    activeTab: 'posts', // Default active tab

    // Method to switch tabs
    switchTab(tabName) {
      this.activeTab = tabName;
    },

    // Method to check if a tab is active
    isActive(tabName) {
      return this.activeTab === tabName;
    },

    // Method to get the data-state for tabs
    getTabState(tabName) {
      return this.isActive(tabName) ? 'active' : 'inactive';
    },

    // Method to get the data-state for content panels
    getContentState(tabName) {
      return this.isActive(tabName) ? 'active' : 'inactive';
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
            class="lucide lucide-user-check w-4 h-4 mr-2">
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
            class="lucide lucide-user-plus w-4 h-4 mr-2">
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
      const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2";

      if (this.isFollowing) {
        return `${baseClasses} bg-primary text-primary-foreground hover:bg-primary/90`;
      } else {
        return `${baseClasses} bg-white text-gray-700 border border-gray-300 hover:bg-gray-50`;
      }
    }
  }));

  // Alpine.js component for like button toggle functionality
  Alpine.data('likeButton', (initialCount = 0, initialLiked = false) => ({
    isLiked: initialLiked,
    count: initialCount,

    // Method to toggle like state
    toggleLike() {
      this.isLiked = !this.isLiked;
      this.count = this.isLiked ? this.count + 1 : this.count - 1;
    },

    // Method to get button classes based on state
    getButtonClasses() {
      const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent h-9 rounded-md px-3";

      if (this.isLiked) {
        return `${baseClasses} text-red-600 hover:text-red-700 border-red-200`;
      } else {
        return `${baseClasses} text-gray-600 hover:text-red-600`;
      }
    },

    // Method to get SVG classes based on state
    getSvgClasses() {
      const baseClasses = "lucide lucide-heart w-4 h-4 mr-2";
      return this.isLiked ? `${baseClasses} fill-current` : baseClasses;
    }
  }));

  // Alpine.js component for friend request toggle functionality
  Alpine.data('friendButton', () => ({
    isFriend: false, // Default state: not friend

    // Method to toggle friend state
    toggleFriend() {
      this.isFriend = !this.isFriend;
    },

    // Method to get button text based on state
    getButtonText() {
      return this.isFriend ? 'Đã kết bạn' : 'Kết bạn';
    },

    // Method to get button classes based on state
    getButtonClasses() {
      const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-xs";

      if (this.isFriend) {
        return `${baseClasses} bg-primary text-primary-foreground hover:bg-primary/90 border-primary`;
      } else {
        return baseClasses;
      }
    }
  }));

  Alpine.data('gallery', () => ({
    isOpen: false,
    images: [],
    currentIndex: 0,
    postTitle: '',

    // mở album chung
    openModal(el, index) {
      this.images = [...this.$refs.albumGrid.querySelectorAll("img")].map(img => ({
        src: img.getAttribute("src"),
        alt: img.getAttribute("alt")
      }))
      this.currentIndex = index
      this.isOpen = true
    },

    // mở gallery riêng trong post
    openPostGallery(el, index) {
      const galleryRoot = el.closest(".post-gallery")
      const post = galleryRoot.closest(".rounded-lg.border")

      // Tìm tiêu đề trong post (có thể là tên người đăng hoặc tiêu đề bài viết)
      const titleElement = post.querySelector("h3.font-semibold")
      this.postTitle = titleElement ? `Ảnh của ${titleElement.textContent.trim()}` : 'Ảnh'

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
  }))
});