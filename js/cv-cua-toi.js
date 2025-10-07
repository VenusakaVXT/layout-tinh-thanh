// CV Cua Toi Alpine.js Components
// Chứa tất cả components cho trang CV của tôi
document.addEventListener('alpine:init', () => {

  // ===========================================
  // CV SETTINGS COMPONENT
  // ===========================================
  Alpine.data('cvSettingsComponent', () => ({
    init() {
      // Khởi tạo switch buttons
      this.initSwitchButtons();
    },

    // Switch buttons functions
    initSwitchButtons() {
      const privacyMasterSwitch = document.getElementById('privacy-master');
      const jobSearchSwitch = document.getElementById('job-search');
      const jobSuggestionsSwitch = document.getElementById('job-suggestions');

      // Master switch (Quyền riêng tư)
      if (privacyMasterSwitch) {
        privacyMasterSwitch.addEventListener('click', () => {
          this.toggleMasterSwitch(privacyMasterSwitch, jobSearchSwitch, jobSuggestionsSwitch);
        });
      }

      // Individual switches
      if (jobSearchSwitch) {
        jobSearchSwitch.addEventListener('click', () => {
          this.toggleSwitch(jobSearchSwitch);
        });
      }

      if (jobSuggestionsSwitch) {
        jobSuggestionsSwitch.addEventListener('click', () => {
          this.toggleSwitch(jobSuggestionsSwitch);
        });
      }
    },

    // Toggle master switch function
    toggleMasterSwitch(masterSwitch, jobSearchSwitch, jobSuggestionsSwitch) {
      const isActive = masterSwitch.classList.contains('bg-blue-500');
      const masterHandle = masterSwitch.querySelector('span');

      if (isActive) {
        // Turn off master switch
        masterSwitch.classList.remove('bg-blue-500');
        masterSwitch.classList.add('bg-gray-500');
        masterHandle.classList.remove('translate-x-5');
        masterHandle.classList.add('translate-x-0');

        // Turn off all child switches
        this.setSwitchState(jobSearchSwitch, false);
        this.setSwitchState(jobSuggestionsSwitch, false);
      } else {
        // Turn on master switch
        masterSwitch.classList.remove('bg-gray-500');
        masterSwitch.classList.add('bg-blue-500');
        masterHandle.classList.remove('translate-x-0');
        masterHandle.classList.add('translate-x-5');

        // Turn on all child switches
        this.setSwitchState(jobSearchSwitch, true);
        this.setSwitchState(jobSuggestionsSwitch, true);
      }
    },

    // Set switch state helper function
    setSwitchState(switchElement, isActive) {
      if (!switchElement) return;

      const handle = switchElement.querySelector('span');

      if (isActive) {
        switchElement.classList.remove('bg-gray-500');
        switchElement.classList.add('bg-blue-500');
        handle.classList.remove('translate-x-0');
        handle.classList.add('translate-x-5');
      } else {
        switchElement.classList.remove('bg-blue-500');
        switchElement.classList.add('bg-gray-500');
        handle.classList.remove('translate-x-5');
        handle.classList.add('translate-x-0');
      }
    },

    // Toggle switch function
    toggleSwitch(switchElement) {
      const isActive = switchElement.classList.contains('bg-blue-500');
      const handle = switchElement.querySelector('span');
      const switchId = switchElement.id;

      if (isActive) {
        // Turn off
        switchElement.classList.remove('bg-blue-500');
        switchElement.classList.add('bg-gray-500');
        handle.classList.remove('translate-x-5');
        handle.classList.add('translate-x-0');
      } else {
        // Turn on
        switchElement.classList.remove('bg-gray-500');
        switchElement.classList.add('bg-blue-500');
        handle.classList.remove('translate-x-0');
        handle.classList.add('translate-x-5');
      }
    }
  }));

  // ===========================================
  // CV TAB COMPONENT
  // ===========================================
  Alpine.data('cvTabComponent', () => ({
    activeTab: 'cv-cua-toi', // Tab mặc định

    init() {
      // Khởi tạo trạng thái ban đầu
      this.updateTabVisibility();
    },

    // Chuyển đổi tab
    switchTab(tabName) {
      this.activeTab = tabName;
      this.updateTabVisibility();
    },

    // Cập nhật hiển thị tab
    updateTabVisibility() {
      const cvCuaToi = document.getElementById('cv-cua-toi');
      const cvDaLuu = document.getElementById('cv-da-luu');

      if (this.activeTab === 'cv-cua-toi') {
        // Hiển thị CV của tôi, ẩn CV đã lưu
        if (cvCuaToi) cvCuaToi.classList.remove('hidden');
        if (cvDaLuu) cvDaLuu.classList.add('hidden');
      } else if (this.activeTab === 'cv-da-luu') {
        // Hiển thị CV đã lưu, ẩn CV của tôi
        if (cvCuaToi) cvCuaToi.classList.add('hidden');
        if (cvDaLuu) cvDaLuu.classList.remove('hidden');
      }
    }
  }));

  // ===========================================
  // CV MAIN COMPONENT
  // ===========================================
  Alpine.data('cvMainComponent', () => ({
    user: null,
    isLoading: true,

    init() {
      // Yêu cầu user data từ header
      window.dispatchEvent(new CustomEvent('get-user-data'));

      // Lắng nghe user data từ header
      window.addEventListener('user-data-ready', (event) => {
        this.user = event.detail.user;
        this.isLoading = false;
      });
    }
  }));
});

// ===========================================
// CV UTILITIES
// ===========================================
window.CvUtils = {
  // Utility functions cho CV
  formatDate: (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('vi-VN', options);
  },

  // Format experience duration
  formatExperience: (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years > 0) {
      return `${years} năm ${months > 0 ? months + ' tháng' : ''}`;
    } else {
      return `${months} tháng`;
    }
  },

  // Validate email
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone
  validatePhone: (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    return phoneRegex.test(cleanPhone);
  }
};

// Initialize global utilities when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize any CV-specific functionality
});
