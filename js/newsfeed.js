// Newsfeed Alpine.js Components
// Chứa tất cả components cho trang newsfeed: Stories Drag, Post Interactions, v.v.
document.addEventListener('alpine:init', () => {

  // ===========================================
  // STORIES DRAG COMPONENT
  // ===========================================
  Alpine.data('storiesDragComponent', () => ({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    container: null,
    scrollAmount: 200, // Số pixel scroll mỗi lần click

    init() {
      console.log('Stories Drag component initialized.');
      this.container = this.$el.querySelector('.stories-container');
      if (this.container) {
        this.setupDragListeners();
        this.setupScrollListener();
      }
    },

    setupDragListeners() {
      // Mouse events
      this.container.addEventListener('mousedown', (e) => this.startDrag(e));
      this.container.addEventListener('mousemove', (e) => this.drag(e));
      this.container.addEventListener('mouseup', () => this.endDrag());
      this.container.addEventListener('mouseleave', () => this.endDrag());

      // Touch events for mobile
      this.container.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
      this.container.addEventListener('touchmove', (e) => this.drag(e.touches[0]));
      this.container.addEventListener('touchend', () => this.endDrag());

      // Prevent default drag behavior on images
      this.container.addEventListener('dragstart', (e) => e.preventDefault());
    },

    setupScrollListener() {
      // Listen for scroll events to update button states
      this.container.addEventListener('scroll', () => {
        // Force Alpine.js to re-evaluate reactive properties
        this.$nextTick(() => {
          // Trigger reactivity by updating a dummy property
          this.scrollLeft = this.container.scrollLeft;
        });
      });

      // Force initial check after container is ready
      setTimeout(() => {
        this.updateButtonStates();
      }, 100);
    },

    updateButtonStates() {
      // Force update button states
      this.$nextTick(() => {
        this.scrollLeft = this.container.scrollLeft;
      });
    },

    startDrag(e) {
      this.isDragging = true;
      this.container.classList.add('cursor-grabbing');
      this.container.classList.remove('cursor-grab');

      this.startX = e.pageX - this.container.offsetLeft;
      this.scrollLeft = this.container.scrollLeft;
    },

    drag(e) {
      if (!this.isDragging) return;

      e.preventDefault();
      const x = e.pageX - this.container.offsetLeft;
      const walk = (x - this.startX) * 2; // Multiply for faster scrolling
      this.container.scrollLeft = this.scrollLeft - walk;
    },

    endDrag() {
      this.isDragging = false;
      this.container.classList.remove('cursor-grabbing');
      this.container.classList.add('cursor-grab');
    },

    // Navigation methods
    scrollNext() {
      this.container.scrollBy({
        left: this.scrollAmount,
        behavior: 'smooth'
      });
    },

    scrollPrev() {
      this.container.scrollBy({
        left: -this.scrollAmount,
        behavior: 'smooth'
      });
    },

    canScrollNext() {
      if (!this.container) return false;
      const maxScroll = this.container.scrollWidth - this.container.clientWidth;
      const canNext = this.container.scrollLeft < maxScroll - 5;
      console.log('canScrollNext:', canNext, 'scrollLeft:', this.container.scrollLeft, 'maxScroll:', maxScroll);
      return canNext;
    },

    canScrollPrev() {
      if (!this.container) return false;
      // Luôn hiện nút Prev nếu có nội dung để scroll (trừ khi ở vị trí đầu)
      const hasContent = this.container.scrollWidth > this.container.clientWidth;
      const canPrev = hasContent; // Luôn hiện nếu có nội dung
      console.log('canScrollPrev:', canPrev, 'scrollLeft:', this.container.scrollLeft, 'hasContent:', hasContent);
      return canPrev;
    }
  }));

  // ===========================================
  // POST INTERACTION COMPONENT
  // ===========================================
  Alpine.data('postInteractionComponent', () => ({
    liked: false,
    saved: false,
    showComments: false,

    init() {
      console.log('Post Interaction component initialized.');
    },

    toggleLike() {
      this.liked = !this.liked;
      // Add animation or API call here
    },

    toggleSave() {
      this.saved = !this.saved;
      // Add animation or API call here
    },

    toggleComments() {
      this.showComments = !this.showComments;
    },

    getLikeButtonClass() {
      return this.liked
        ? 'text-red-600 hover:text-red-700'
        : 'text-gray-600 hover:text-red-600';
    },

    getSaveButtonClass() {
      return this.saved
        ? 'text-blue-600 hover:text-blue-700'
        : 'text-gray-600 hover:text-blue-600';
    }
  }));

  // ===========================================
  // NEWSFEED MAIN COMPONENT
  // ===========================================
  Alpine.data('newsfeedComponent', () => ({
    user: null,
    isLoading: true,
    posts: [],
    currentPage: 1,
    hasMorePosts: true,

    init() {
      console.log('Newsfeed component initialized.');

      // Yêu cầu user data từ header
      window.dispatchEvent(new CustomEvent('get-user-data'));

      // Lắng nghe user data từ header
      window.addEventListener('user-data-ready', (event) => {
        this.user = event.detail.user;
        this.isLoading = false;
        console.log('Newsfeed received user data:', this.user);
      });

      // Load initial posts
      this.loadPosts();
    },

    loadPosts() {
      // Simulate API call
      setTimeout(() => {
        // Mock data - replace with actual API call
        const mockPosts = [
          {
            id: 1,
            author: 'Nguyễn Văn An',
            avatar: './public/images/placeholder.svg?height=40&width=40',
            time: '2 giờ trước',
            location: 'Thủ Dầu Một, Bình Dương',
            content: 'Vừa tham gia hội chợ việc làm tại Bình Dương hôm nay. Rất nhiều cơ hội tốt cho các bạn trẻ! 🎉',
            images: [
              './public/images/placeholder.svg?height=300&width=400',
              './public/images/placeholder.svg?height=300&width=400',
              './public/images/placeholder.svg?height=300&width=400',
              './public/images/placeholder.svg?height=300&width=400'
            ],
            likes: 24,
            comments: 8,
            shares: 3,
            liked: false,
            saved: false
          }
        ];

        this.posts = [...this.posts, ...mockPosts];
        this.currentPage++;
      }, 1000);
    },

    loadMorePosts() {
      if (this.hasMorePosts && !this.isLoading) {
        this.isLoading = true;
        this.loadPosts();
        this.isLoading = false;
      }
    },

    formatTimeAgo(timeString) {
      // Simple time formatting - can be enhanced
      return timeString;
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
  // STORY COMPONENT
  // ===========================================
  Alpine.data('storyComponent', () => ({
    viewed: false,

    init() {
      console.log('Story component initialized.');
    },

    viewStory() {
      this.viewed = true;
      // Add story viewing logic here
      console.log('Story viewed');
    },

    getStoryClass() {
      return this.viewed
        ? 'opacity-60'
        : 'opacity-100';
    }
  }));

  // ===========================================
  // STORY MODAL COMPONENT
  // ===========================================
  Alpine.data('storyModalComponent', () => ({
    isOpen: false,
    currentStory: null,
    currentIndex: 0,
    stories: [],
    progressInterval: null,
    progressWidth: 0,

    init() {
      console.log('Story Modal component initialized.');
      this.loadStories();
      console.log('Stories loaded:', this.stories);
    },

    loadStories() {
      // Load stories from static HTML
      const storyElements = document.querySelectorAll('.story-item[data-story]');
      console.log('Found story elements:', storyElements.length);
      this.stories = Array.from(storyElements).map((element, index) => {
        const storyData = JSON.parse(element.getAttribute('data-story'));
        return {
          ...storyData,
          element: element,
          index: index
        };
      });
      console.log('Stories processed:', this.stories);
    },

    openStory(storyElement) {
      console.log('openStory called with:', storyElement);
      console.log('Current modal state before opening:', this.isOpen);

      const storyData = JSON.parse(storyElement.getAttribute('data-story'));
      console.log('Parsed story data:', storyData);

      this.currentStory = storyData;
      this.currentIndex = this.stories.findIndex(s => s.id === storyData.id);
      console.log('Current index:', this.currentIndex);

      this.isOpen = true;
      console.log('Modal opened, isOpen:', this.isOpen);

      // Mark story as viewed
      this.markStoryAsViewed(storyData.id);

      this.startProgress();
    },

    closeStory() {
      // Mark current story as viewed when closing
      if (this.currentStory) {
        this.markStoryAsViewed(this.currentStory.id);
      }

      this.isOpen = false;
      this.stopProgress();
      this.progressWidth = 0;
    },

    nextStory() {
      // Mark current story as viewed before moving to next
      if (this.currentStory) {
        this.markStoryAsViewed(this.currentStory.id);
      }

      if (this.currentIndex < this.stories.length - 1) {
        this.currentIndex++;
        this.currentStory = this.stories[this.currentIndex];
        this.resetProgress();
        this.startProgress();
      } else {
        // Quay lại từ đầu thay vì đóng modal
        this.currentIndex = 0;
        this.currentStory = this.stories[this.currentIndex];
        this.resetProgress();
        this.startProgress();
      }
    },

    prevStory() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.currentStory = this.stories[this.currentIndex];
        this.resetProgress();
        this.startProgress();
      } else {
        // Quay lại story cuối cùng thay vì không làm gì
        this.currentIndex = this.stories.length - 1;
        this.currentStory = this.stories[this.currentIndex];
        this.resetProgress();
        this.startProgress();
      }
    },

    startProgress() {
      if (!this.currentStory) return;

      const duration = this.currentStory.duration * 1000; // Convert to milliseconds
      const interval = 16; // Update every 16ms (60fps) for smoother animation
      const increment = (interval / duration) * 100;

      this.progressInterval = setInterval(() => {
        this.progressWidth += increment;
        if (this.progressWidth >= 100) {
          this.progressWidth = 100;
          this.nextStory();
        }
      }, interval);
    },

    stopProgress() {
      if (this.progressInterval) {
        clearInterval(this.progressInterval);
        this.progressInterval = null;
      }
    },

    resetProgress() {
      this.stopProgress();
      this.progressWidth = 0;
    },

    getProgressStyle() {
      return `width: ${this.progressWidth}%`;
    },

    // Lấy 5 progress bars hiển thị (slider style)
    getVisibleProgressBars() {
      const maxBars = 5;
      const totalStories = this.stories.length;

      if (totalStories <= maxBars) {
        // Nếu ít hơn hoặc bằng 5 stories, hiển thị tất cả
        return Array.from({ length: totalStories }, (_, i) => ({
          storyIndex: i,
          displayIndex: i
        }));
      } else {
        // Nếu nhiều hơn 5 stories, tính toán vị trí slider
        const startIndex = Math.floor(this.currentIndex / maxBars) * maxBars;
        return Array.from({ length: maxBars }, (_, i) => {
          const storyIndex = (startIndex + i) % totalStories;
          return {
            storyIndex: storyIndex,
            displayIndex: i
          };
        });
      }
    },

    // Lấy style cho từng progress bar
    getBarProgressStyle(displayIndex) {
      const visibleBars = this.getVisibleProgressBars();
      const bar = visibleBars[displayIndex];
      const storyIndex = bar.storyIndex;

      if (storyIndex === this.currentIndex) {
        // Story hiện tại - hiển thị progress
        return this.getProgressStyle();
      } else if (storyIndex < this.currentIndex) {
        // Story đã xem - hiển thị 100%
        return 'width: 100%';
      } else {
        // Story chưa xem - hiển thị 0%
        return 'width: 0%';
      }
    },

    markStoryAsViewed(storyId) {
      // Find the story element and mark it as viewed
      const storyElement = document.querySelector(`[data-story*='"id":${storyId}']`);
      if (storyElement) {
        storyElement.classList.add('viewed');
        console.log(`Marked story ${storyId} as viewed`);
      }
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
      const titleElement = post.querySelector("h3.font-semibold")
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

// ===========================================
// GLOBAL STORY FUNCTIONS
// ===========================================
window.openStoryModal = function (storyElement) {
  console.log('openStoryModal called with:', storyElement);
  console.log('Story element data-story:', storyElement.getAttribute('data-story'));

  // Dispatch event to open story modal
  const event = new CustomEvent('open-story-modal', {
    detail: { storyElement: storyElement }
  });
  console.log('Dispatching event:', event);
  window.dispatchEvent(event);
};

// ===========================================
// NEWSFEED UTILITIES
// ===========================================
window.NewsfeedUtils = {
  // Utility functions cho newsfeed
  scrollToTop: () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Format time utility
  formatTimeAgo: (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Vừa xong';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} ngày trước`;

    return date.toLocaleDateString('vi-VN');
  },

  // Image lazy loading
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

  // Smooth scroll to element
  scrollToElement: (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

// Initialize global utilities when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize lazy loading
  window.NewsfeedUtils.lazyLoadImages();

  // Add data attributes to story items
  addStoryDataAttributes();

  // Reload stories in modal after data attributes are added
  setTimeout(() => {
    const modalComponent = document.querySelector('[x-data*="storyModalComponent"]');
    if (modalComponent && modalComponent._x_dataStack) {
      const component = modalComponent._x_dataStack[0];
      if (component && component.loadStories) {
        component.loadStories();
      }
    }
  }, 100);
});

// Add data attributes to story items
function addStoryDataAttributes() {
  const storyItems = document.querySelectorAll('.story-item');
  console.log('Found story items:', storyItems.length);

  const storyData = [
    { id: 1, author: "Nguyễn Văn An", avatar: "./public/images/placeholder.svg?height=60&width=60", time: "2h", type: "image", content: "./public/images/placeholder.svg?height=120&width=80", duration: 8 },
    { id: 2, author: "Trần Thị Bình", avatar: "./public/images/placeholder.svg?height=60&width=60", time: "4h", type: "video", content: "./public/images/placeholder.svg?height=120&width=80", duration: 15 },
    { id: 3, author: "Công ty ABC", avatar: "./public/images/placeholder.svg?height=60&width=60", time: "6h", type: "image", content: "./public/images/placeholder.svg?height=120&width=80", duration: 8 },
    { id: 4, author: "Lê Minh Đức", avatar: "./public/images/placeholder.svg?height=60&width=60", time: "8h", type: "image", content: "./public/images/placeholder.svg?height=120&width=80", duration: 8 },
    { id: 5, author: "Báo BD", avatar: "./public/images/placeholder.svg?height=60&width=60", time: "12h", type: "video", content: "./public/images/placeholder.svg?height=120&width=80", duration: 15 },
    { id: 6, author: "Nguyễn Văn An", avatar: "./public/images/placeholder.svg?height=60&width=60", time: "2h", type: "image", content: "./public/images/placeholder.svg?height=120&width=80", duration: 8 },
    { id: 7, author: "Trần Thị Bình", avatar: "./public/images/placeholder.svg?height=60&width=60", time: "4h", type: "video", content: "./public/images/placeholder.svg?height=120&width=80", duration: 15 },
    { id: 8, author: "Công ty ABC", avatar: "./public/images/placeholder.svg?height=60&width=60", time: "6h", type: "image", content: "./public/images/placeholder.svg?height=120&width=80", duration: 8 },
    { id: 9, author: "Lê Minh Đức", avatar: "./public/images/placeholder.svg?height=60&width=60", time: "8h", type: "image", content: "./public/images/placeholder.svg?height=120&width=80", duration: 8 },
    { id: 10, author: "Báo BD", avatar: "./public/images/placeholder.svg?height=60&width=60", time: "12h", type: "video", content: "./public/images/placeholder.svg?height=120&width=80", duration: 15 }
  ];

  storyItems.forEach((item, index) => {
    if (index < storyData.length) {
      const data = storyData[index];
      item.setAttribute('data-story', JSON.stringify(data));
      console.log(`Added data to story ${index}:`, data);

      // Add click handler
      const clickableDiv = item.querySelector('div');
      if (clickableDiv) {
        clickableDiv.setAttribute('onclick', 'openStoryModal(this.parentElement)');
        console.log(`Added click handler to story ${index}`);
      }
    }
  });
}