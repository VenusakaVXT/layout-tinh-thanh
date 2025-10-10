// Alpine.js logic for tab switching functionality in saved items page
document.addEventListener('alpine:init', () => {
    Alpine.data('savedItemsTabs', () => ({
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
            if (this.isActive(tabName)) {
                return "bg-background text-foreground shadow-sm";
            }
            return "";
        },

        // Method to get panel classes based on active state
        getPanelClasses(tabName) {
            if (this.isActive(tabName)) {
                return "";
            }
            return "hidden";
        }
    }));
});