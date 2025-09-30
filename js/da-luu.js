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
            const baseClasses = "justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm flex items-center gap-2";

            if (this.isActive(tabName)) {
                return `${baseClasses} bg-background text-foreground shadow-sm`;
            }
            return `${baseClasses}`;
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
});
