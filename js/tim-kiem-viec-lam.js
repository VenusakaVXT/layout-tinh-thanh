// Alpine.js component for job search functionality
document.addEventListener('alpine:init', () => {
  Alpine.data('jobSearch', () => ({
    keyword: '',
    itemsPerPage: 20,
    showItemsPerPageDropdown: false,
    sortBy: 'relevance',
    showSortDropdown: false,
    selectedLocations: [],
    selectedWorkTypes: [],
    selectedJobTypes: [],
    selectedExperiences: [],
    selectedSkills: [],

    // Pagination
    currentPage: 1,
    totalPages: 3,

    // Salary slider
    salaryMin: 0,
    isDragging: false,

    // Location mapping: display name -> slug (dễ hiểu và nhập tay)
    locationMap: {
      'TP. Thủ Dầu Một': 'thu-dau-mot',
      'TP. Thuận An': 'thuan-an',
      'TP. Dĩ An': 'di-an',
      'KCN VSIP I, Thuận An': 'kcn-vsip-1-thuan-an',
      'KCN VSIP II, Bình Dương': 'kcn-vsip-2-binh-duong',
      'KCN Mỹ Phước, Bến Cát': 'kcn-my-phuoc-ben-cat',
      'KCN Đồng An, Thuận An': 'kcn-dong-an-thuan-an',
      'KCN Sóng Thần, Dĩ An': 'kcn-song-than-di-an'
    },

    // Work type mapping: display name -> URL parameter
    workTypeMap: {
      'Onsite': 'onsite',
      'Remote': 'remote',
      'Hybrid': 'hybrid'
    },

    // Job type mapping: display name -> URL parameter
    jobTypeMap: {
      'Toàn thời gian': 'fulltime',
      'Bán thời gian': 'parttime',
      'Thực tập': 'internship',
      'Hợp đồng': 'contract'
    },

    // Experience mapping: display name -> URL parameter
    experienceMap: {
      'Không yêu cầu': 'khong-yeu-cau',
      '0-1 năm': '0-1-nam',
      '1-2 năm': '1-2-nam',
      '2-3 năm': '2-3-nam',
      '3-5 năm': '3-5-nam',
      '5+ năm': 'hon-5-nam'
    },

    // Skills mapping: display name -> URL parameter (tiếng Việt)
    skillsMap: {
      'React': 'react',
      'Node.js': 'nodejs',
      'JavaScript': 'javascript',
      'TypeScript': 'typescript',
      'Python': 'python',
      'Java': 'java',
      'Excel': 'excel',
      'SAP': 'sap',
      'Kế toán': 'ke-toan',
      'Facebook Ads': 'facebook-ads',
      'Google Ads': 'google-ads',
      'SEO': 'seo',
      'AutoCAD': 'autocad',
      'SolidWorks': 'solidworks',
      'Photoshop': 'photoshop',
      'Illustrator': 'illustrator'
    },

    init() {
      // Get keyword from URL params on page load
      const urlParams = new URLSearchParams(window.location.search);
      this.keyword = urlParams.get('keyword') || '';

      // Get sort parameter from URL and set initial sort state
      this.initializeSortFromURL(urlParams);

      // Get page-size parameter from URL and set initial page size
      this.initializePageSizeFromURL(urlParams);

      // Get locations parameter from URL and set initial locations
      this.initializeLocationsFromURL(urlParams);

      // Get work types parameter from URL and set initial work types
      this.initializeWorkTypesFromURL(urlParams);

      // Get job types parameter from URL and set initial job types
      this.initializeJobTypesFromURL(urlParams);

      // Get experiences parameter from URL and set initial experiences
      this.initializeExperiencesFromURL(urlParams);

      // Get skills parameter from URL and set initial skills
      this.initializeSkillsFromURL(urlParams);

      // Get pagination parameter from URL
      this.initializePaginationFromURL(urlParams);

      // Get salary parameter from URL
      this.initializeSalaryFromURL(urlParams);

      // Update page title if keyword exists
      this.updatePageTitle();
    },

    initializeSortFromURL(urlParams) {
      const sortParam = urlParams.get('sort');

      // Map URL parameters back to sort values
      const urlToSortMap = {
        'newest': 'newest',
        'salary-desc': 'salary-desc',
        'salary-asc': 'salary-asc',
        'featured': 'featured',
        'urgent': 'urgent'
      };

      if (sortParam && urlToSortMap[sortParam]) {
        this.sortBy = urlToSortMap[sortParam];
      } else {
        this.sortBy = 'relevance'; // Default to relevance if no sort param or invalid param
      }
    },

    initializePageSizeFromURL(urlParams) {
      const pageSizeParam = urlParams.get('page-size');

      if (pageSizeParam) {
        const pageSize = parseInt(pageSizeParam);
        // Only set if it's a valid page size option
        if ([10, 20, 50].includes(pageSize)) {
          this.itemsPerPage = pageSize;
        }
      }
    },

    initializeLocationsFromURL(urlParams) {
      const locationsParam = urlParams.get('locations');

      if (locationsParam) {
        const locationSlugs = locationsParam.split(',');
        this.selectedLocations = [];

        // Convert slugs back to display names
        for (const slug of locationSlugs) {
          const trimmedSlug = slug.trim();
          for (const [displayName, locationSlug] of Object.entries(this.locationMap)) {
            if (locationSlug === trimmedSlug) {
              this.selectedLocations.push(displayName);
              break;
            }
          }
        }
      }
    },

    toggleLocation(locationName) {
      if (this.selectedLocations.includes(locationName)) {
        this.selectedLocations = this.selectedLocations.filter(loc => loc !== locationName);
      } else {
        this.selectedLocations.push(locationName);
      }

      this.updateLocationsInURL();
    },

    updateLocationsInURL() {
      const url = new URL(window.location);

      if (this.selectedLocations.length > 0) {
        const locationSlugs = this.selectedLocations.map(location => this.locationMap[location]);
        url.searchParams.set('locations', locationSlugs.join(','));
      } else {
        url.searchParams.delete('locations');
      }

      window.history.pushState({}, '', url);
    },

    clearAllFilters() {
      this.selectedLocations = [];
      this.selectedWorkTypes = [];
      this.selectedJobTypes = [];
      this.selectedExperiences = [];
      this.selectedSkills = [];
      this.salaryMin = 0;
      this.updateLocationsInURL();
      this.updateWorkTypesInURL();
      this.updateJobTypesInURL();
      this.updateExperiencesInURL();
      this.updateSkillsInURL();
      this.updateSalaryInURL();
    },

    // Pagination functions
    initializePaginationFromURL(urlParams) {
      const pageParam = urlParams.get('page');
      if (pageParam) {
        const page = parseInt(pageParam);
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePageInURL();
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePageInURL();
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePageInURL();
      }
    },

    updatePageInURL() {
      const url = new URL(window.location);
      if (this.currentPage > 1) {
        url.searchParams.set('page', this.currentPage);
      } else {
        url.searchParams.delete('page');
      }
      window.history.pushState({}, '', url);
    },

    isPageActive(page) {
      return this.currentPage === page;
    },

    isPrevDisabled() {
      return this.currentPage <= 1;
    },

    isNextDisabled() {
      return this.currentPage >= this.totalPages;
    },

    // Salary slider functions
    initializeSalaryFromURL(urlParams) {
      const salaryParam = urlParams.get('salary-min');
      if (salaryParam) {
        const salary = parseInt(salaryParam);
        if (salary >= 0 && salary <= 50) {
          this.salaryMin = salary;
        }
      }
    },

    updateSalary(value) {
      this.salaryMin = Math.max(0, Math.min(50, value));
    },

    onSalaryDragStart() {
      this.isDragging = true;
    },

    onSalaryDragEnd() {
      this.isDragging = false;
      this.updateSalaryInURL();
    },

    onSalaryChange(event) {
      const value = parseInt(event.target.value);
      this.updateSalary(value);
    },

    onSalaryMouseMove(event) {
      if (!this.isDragging) return;

      const slider = event.currentTarget;
      const rect = slider.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
      const value = Math.round((percentage / 100) * 50);
      this.updateSalary(value);
    },

    onSalaryMouseUp() {
      if (this.isDragging) {
        this.isDragging = false;
        this.updateSalaryInURL();
      }
    },

    updateSalaryInURL() {
      const url = new URL(window.location);
      if (this.salaryMin > 0) {
        url.searchParams.set('salary-min', this.salaryMin);
      } else {
        url.searchParams.delete('salary-min');
      }
      window.history.pushState({}, '', url);
    },

    getSalaryPercentage() {
      return (this.salaryMin / 50) * 100;
    },

    getSalaryDisplayValue() {
      return this.salaryMin + ' triệu';
    },

    removeSalary() {
      this.salaryMin = 0;
      this.updateSalaryInURL();
    },

    removeLocation(locationName) {
      this.selectedLocations = this.selectedLocations.filter(loc => loc !== locationName);
      this.updateLocationsInURL();
    },

    isLocationSelected(locationName) {
      return this.selectedLocations.includes(locationName);
    },

    initializeWorkTypesFromURL(urlParams) {
      const workTypesParam = urlParams.get('work-at');

      if (workTypesParam) {
        const workTypeSlugs = workTypesParam.split(',');
        this.selectedWorkTypes = [];

        // Convert slugs back to display names
        for (const slug of workTypeSlugs) {
          const trimmedSlug = slug.trim();
          for (const [displayName, workTypeSlug] of Object.entries(this.workTypeMap)) {
            if (workTypeSlug === trimmedSlug) {
              this.selectedWorkTypes.push(displayName);
              break;
            }
          }
        }
      }
    },

    toggleWorkType(workTypeName) {
      if (this.selectedWorkTypes.includes(workTypeName)) {
        this.selectedWorkTypes = this.selectedWorkTypes.filter(type => type !== workTypeName);
      } else {
        this.selectedWorkTypes.push(workTypeName);
      }

      this.updateWorkTypesInURL();
    },

    updateWorkTypesInURL() {
      const url = new URL(window.location);

      if (this.selectedWorkTypes.length > 0) {
        const workTypeSlugs = this.selectedWorkTypes.map(workType => this.workTypeMap[workType]);
        url.searchParams.set('work-at', workTypeSlugs.join(','));
      } else {
        url.searchParams.delete('work-at');
      }

      window.history.pushState({}, '', url);
    },

    removeWorkType(workTypeName) {
      this.selectedWorkTypes = this.selectedWorkTypes.filter(type => type !== workTypeName);
      this.updateWorkTypesInURL();
    },

    isWorkTypeSelected(workTypeName) {
      return this.selectedWorkTypes.includes(workTypeName);
    },

    initializeJobTypesFromURL(urlParams) {
      const jobTypesParam = urlParams.get('type');

      if (jobTypesParam) {
        const jobTypeSlugs = jobTypesParam.split(',');
        this.selectedJobTypes = [];

        // Convert slugs back to display names
        for (const slug of jobTypeSlugs) {
          const trimmedSlug = slug.trim();
          for (const [displayName, jobTypeSlug] of Object.entries(this.jobTypeMap)) {
            if (jobTypeSlug === trimmedSlug) {
              this.selectedJobTypes.push(displayName);
              break;
            }
          }
        }
      }
    },

    toggleJobType(jobTypeName) {
      if (this.selectedJobTypes.includes(jobTypeName)) {
        this.selectedJobTypes = this.selectedJobTypes.filter(type => type !== jobTypeName);
      } else {
        this.selectedJobTypes.push(jobTypeName);
      }

      this.updateJobTypesInURL();
    },

    updateJobTypesInURL() {
      const url = new URL(window.location);

      if (this.selectedJobTypes.length > 0) {
        const jobTypeSlugs = this.selectedJobTypes.map(jobType => this.jobTypeMap[jobType]);
        url.searchParams.set('type', jobTypeSlugs.join(','));
      } else {
        url.searchParams.delete('type');
      }

      window.history.pushState({}, '', url);
    },

    removeJobType(jobTypeName) {
      this.selectedJobTypes = this.selectedJobTypes.filter(type => type !== jobTypeName);
      this.updateJobTypesInURL();
    },

    isJobTypeSelected(jobTypeName) {
      return this.selectedJobTypes.includes(jobTypeName);
    },

    initializeExperiencesFromURL(urlParams) {
      const experiencesParam = urlParams.get('experience');

      if (experiencesParam) {
        const experienceSlugs = experiencesParam.split(',');
        this.selectedExperiences = [];

        // Convert slugs back to display names
        for (const slug of experienceSlugs) {
          const trimmedSlug = slug.trim();
          for (const [displayName, experienceSlug] of Object.entries(this.experienceMap)) {
            if (experienceSlug === trimmedSlug) {
              this.selectedExperiences.push(displayName);
              break;
            }
          }
        }
      }
    },

    toggleExperience(experienceName) {
      if (this.selectedExperiences.includes(experienceName)) {
        this.selectedExperiences = this.selectedExperiences.filter(exp => exp !== experienceName);
      } else {
        this.selectedExperiences.push(experienceName);
      }

      this.updateExperiencesInURL();
    },

    updateExperiencesInURL() {
      const url = new URL(window.location);

      if (this.selectedExperiences.length > 0) {
        const experienceSlugs = this.selectedExperiences.map(experience => this.experienceMap[experience]);
        url.searchParams.set('experience', experienceSlugs.join(','));
      } else {
        url.searchParams.delete('experience');
      }

      window.history.pushState({}, '', url);
    },

    removeExperience(experienceName) {
      this.selectedExperiences = this.selectedExperiences.filter(exp => exp !== experienceName);
      this.updateExperiencesInURL();
    },

    isExperienceSelected(experienceName) {
      return this.selectedExperiences.includes(experienceName);
    },

    initializeSkillsFromURL(urlParams) {
      const skillsParam = urlParams.get('skills');

      if (skillsParam) {
        const skillSlugs = skillsParam.split(',');
        this.selectedSkills = [];

        // Convert slugs back to display names
        for (const slug of skillSlugs) {
          const trimmedSlug = slug.trim();
          for (const [displayName, skillSlug] of Object.entries(this.skillsMap)) {
            if (skillSlug === trimmedSlug) {
              this.selectedSkills.push(displayName);
              break;
            }
          }
        }
      }
    },

    toggleSkill(skillName) {
      if (this.selectedSkills.includes(skillName)) {
        this.selectedSkills = this.selectedSkills.filter(skill => skill !== skillName);
      } else {
        this.selectedSkills.push(skillName);
      }

      this.updateSkillsInURL();
    },

    updateSkillsInURL() {
      const url = new URL(window.location);

      if (this.selectedSkills.length > 0) {
        const skillSlugs = this.selectedSkills.map(skill => this.skillsMap[skill]);
        url.searchParams.set('skills', skillSlugs.join(','));
      } else {
        url.searchParams.delete('skills');
      }

      window.history.pushState({}, '', url);
    },

    removeSkill(skillName) {
      this.selectedSkills = this.selectedSkills.filter(skill => skill !== skillName);
      this.updateSkillsInURL();
    },

    isSkillSelected(skillName) {
      return this.selectedSkills.includes(skillName);
    },

    search() {
      // Get current URL without search params
      const url = new URL(window.location);

      // Clear existing search params
      url.search = '';

      // Add new search params
      if (this.keyword.trim()) {
        url.searchParams.set('keyword', this.keyword.trim());
      }

      // Update URL and page title
      window.history.pushState({}, '', url);
      this.updatePageTitle();
    },

    updatePageTitle() {
      const titleElement = document.querySelector('h1.text-lg');
      if (titleElement) {
        if (this.keyword.trim()) {
          titleElement.textContent = `Tìm kiếm việc làm: "${this.keyword.trim()}"`;
        } else {
          titleElement.textContent = 'Tìm kiếm việc làm';
        }
      }
    },

    handleKeyPress(event) {
      if (event.key === 'Enter') {
        this.search();
      }
    },

    clearKeyword() {
      // Clear the keyword input
      this.keyword = '';

      // Get current URL without search params
      const url = new URL(window.location);

      // Remove keyword parameter from URL
      url.searchParams.delete('keyword');

      // Update URL and page title
      window.history.pushState({}, '', url);
      this.updatePageTitle();
    },

    toggleItemsPerPageDropdown() {
      this.showItemsPerPageDropdown = !this.showItemsPerPageDropdown;
    },

    selectItemsPerPage(value) {
      this.itemsPerPage = value;
      this.showItemsPerPageDropdown = false;

      // Update URL with page-size parameter
      this.updatePageSizeInURL(value);
    },

    updatePageSizeInURL(pageSize) {
      const url = new URL(window.location);

      if (pageSize) {
        url.searchParams.set('page-size', pageSize.toString());
      } else {
        url.searchParams.delete('page-size');
      }

      // Update URL without page reload
      window.history.pushState({}, '', url);
    },

    toggleSortDropdown() {
      this.showSortDropdown = !this.showSortDropdown;
    },

    selectSortOption(value) {
      this.sortBy = value;
      this.showSortDropdown = false;

      // Update URL with sort parameter
      this.updateSortInURL(value);
    },

    updateSortInURL(sortValue) {
      const url = new URL(window.location);

      // Map sort values to URL parameters
      const sortParamMap = {
        'relevance': '',
        'newest': 'newest',
        'salary-desc': 'salary-desc',
        'salary-asc': 'salary-asc',
        'featured': 'featured',
        'urgent': 'urgent'
      };

      const sortParam = sortParamMap[sortValue];

      if (sortParam) {
        url.searchParams.set('sort', sortParam);
      } else {
        url.searchParams.delete('sort');
      }

      // Update URL without page reload
      window.history.pushState({}, '', url);
    },

    getSortLabel() {
      const sortOptions = {
        'relevance': 'Liên quan nhất',
        'newest': 'Mới nhất',
        'salary-desc': 'Lương cao → thấp',
        'salary-asc': 'Lương thấp → cao',
        'featured': 'Nổi bật',
        'urgent': 'Gấp'
      };
      return sortOptions[this.sortBy] || 'Liên quan nhất';
    }
  }));
});