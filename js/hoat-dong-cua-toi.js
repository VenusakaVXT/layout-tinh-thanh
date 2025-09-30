// Alpine.js logic for tab switching functionality
document.addEventListener('alpine:init', () => {
  Alpine.data('tabManager', () => ({
    activeTab: 'jobs', // Default active tab

    // Method to switch tabs
    switchTab(tabName) {
      this.activeTab = tabName;
    },

    // Method to check if a tab is active
    isActive(tabName) {
      return this.activeTab === tabName;
    },

    // Method to get tab classes based on active state
    getTabClasses(tabName) {
      const baseClasses = "justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex items-center gap-2";
      const activeClasses = "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm";

      if (this.isActive(tabName)) {
        return `${baseClasses} ${activeClasses} bg-background text-foreground shadow-sm`;
      }
      return `${baseClasses} ${activeClasses}`;
    },

    // Method to get panel classes based on active state
    getPanelClasses(tabName) {
      const baseClasses = "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6";

      if (this.isActive(tabName)) {
        return baseClasses;
      }
      return `${baseClasses} hidden`;
    }
  }));

  // Alpine.js logic for status dropdown functionality
  Alpine.data('statusDropdown', () => ({
    isOpen: false,
    selectedStatus: 'Tất cả trạng thái',

    // Toggle dropdown visibility
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },

    // Close dropdown
    closeDropdown() {
      this.isOpen = false;
    },

    // Select a status option
    selectStatus(statusLabel, statusValue) {
      this.selectedStatus = statusLabel;
      this.isOpen = false;
      // You can add additional logic here to filter data based on selected status
      console.log('Selected status:', statusValue);
    },

    // Check if an option is selected
    isSelected(statusLabel) {
      return this.selectedStatus === statusLabel;
    },

    // Get dropdown button classes
    getButtonClasses() {
      const baseClasses = "flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-48";
      return baseClasses;
    },

    // Get dropdown menu classes
    getDropdownClasses() {
      const baseClasses = "absolute top-full left-0 z-50 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-md";
      return this.isOpen ? baseClasses : `${baseClasses} hidden`;
    },

    // Get option classes
    getOptionClasses(statusLabel) {
      const baseClasses = "relative flex cursor-pointer select-none items-center px-3 py-2 text-sm text-gray-900 outline-none transition-colors hover:bg-gray-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50";
      const selectedClasses = this.isSelected(statusLabel) ? "bg-gray-100" : "";
      return `${baseClasses} ${selectedClasses}`;
    }
  }));

  // Alpine.js logic for review toggle functionality
  Alpine.data('reviewToggle', () => ({
    showReview: false,

    // Toggle review visibility
    toggleReview() {
      this.showReview = !this.showReview;
    },

    // Get button text based on review state
    getButtonText() {
      return this.showReview ? 'Ẩn đánh giá' : 'Xem đánh giá';
    },

    // Get button classes based on review state
    getButtonClasses() {
      const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3";
      const primaryClasses = "bg-primary text-primary-foreground hover:bg-primary/90 btn-primary";
      return `${baseClasses} ${primaryClasses}`;
    },

    // Get chevron icon classes
    getChevronClasses() {
      const baseClasses = "lucide h-4 w-4 mr-2";
      return baseClasses;
    },

    // Get chevron icon name
    getChevronIcon() {
      return this.showReview ? 'lucide-chevron-up' : 'lucide-chevron-down';
    },

    // Get review section classes
    getReviewClasses() {
      return "mt-2 animate-in slide-in-from-top-2 duration-300";
    }
  }));
});