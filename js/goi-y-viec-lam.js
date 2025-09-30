document.addEventListener('alpine:init', () => {
    // Main Alpine.js component for job suggestion settings
    Alpine.data('jobSuggestionSettings', () => ({
        // Gender selection
        selectedGender: null,

        // Privacy switches
        allowEmployerContact: false,
        activelyLookingForJob: false,
        receiveJobSuggestions: true,

        // Professional positions (max 5)
        professionalPositions: [],
        professionalPositionInput: '',
        professionalPositionSuggestions: [
            'Frontend Developer',
            'Backend Developer',
            'Fullstack Developer',
            'QA/QC',
            'Product Manager'
        ],

        // Custom positions (max 5)
        customPositions: [],
        customPositionInput: '',

        // Skills (max 5)
        skills: [],
        skillInput: '',

        // Locations
        locations: [],
        locationInput: '',
        locationSuggestions: [
            'Hồ Chí Minh',
            'Hà Nội',
            'Đà Nẵng',
            'Bình Dương',
            'Cần Thơ'
        ],

        // Experience dropdown
        experienceDropdownOpen: false,
        selectedExperience: null,
        experienceOptions: [
            'Chưa có kinh nghiệm',
            '1 năm',
            '2 năm',
            '3 năm',
            '4 năm',
            '5+ năm'
        ],

        // Unit dropdown
        unitDropdownOpen: false,
        selectedUnit: 'VND',
        unitOptions: ['VND', 'USD'],

        // Salary input
        salaryInput: 0,

        // Short introduction
        shortIntroduction: '',

        // Methods for gender selection
        selectGender(gender) {
            this.selectedGender = gender;
        },

        isGenderSelected(gender) {
            return this.selectedGender === gender;
        },

        // Methods for privacy switches
        toggleEmployerContact() {
            this.allowEmployerContact = !this.allowEmployerContact;
        },

        toggleActivelyLooking() {
            this.activelyLookingForJob = !this.activelyLookingForJob;
        },

        toggleJobSuggestions() {
            this.receiveJobSuggestions = !this.receiveJobSuggestions;
        },

        getSwitchClasses(isChecked) {
            return isChecked
                ? 'bg-blue-500'
                : 'bg-gray-300';
        },

        getSwitchHandleClasses(isChecked) {
            return isChecked
                ? 'translate-x-5'
                : 'translate-x-0';
        },

        // Methods for professional positions
        addProfessionalPosition(position) {
            if (this.professionalPositions.length < 5 && !this.professionalPositions.includes(position)) {
                this.professionalPositions.push(position);
            }
        },

        removeProfessionalPosition(position) {
            this.professionalPositions = this.professionalPositions.filter(p => p !== position);
        },

        handleProfessionalPositionKeydown(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const value = this.professionalPositionInput.trim();
                if (value && this.professionalPositions.length < 5) {
                    this.addProfessionalPosition(value);
                    this.professionalPositionInput = '';
                }
            }
        },

        // Methods for custom positions
        addCustomPosition(position) {
            if (this.customPositions.length < 5 && !this.customPositions.includes(position)) {
                this.customPositions.push(position);
            }
        },

        removeCustomPosition(position) {
            this.customPositions = this.customPositions.filter(p => p !== position);
        },

        handleCustomPositionKeydown(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const value = this.customPositionInput.trim();
                if (value && this.customPositions.length < 5) {
                    this.addCustomPosition(value);
                    this.customPositionInput = '';
                }
            }
        },

        // Methods for skills
        addSkill(skill) {
            if (this.skills.length < 5 && !this.skills.includes(skill)) {
                this.skills.push(skill);
            }
        },

        removeSkill(skill) {
            this.skills = this.skills.filter(s => s !== skill);
        },

        handleSkillKeydown(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const value = this.skillInput.trim();
                if (value && this.skills.length < 5) {
                    this.addSkill(value);
                    this.skillInput = '';
                }
            }
        },

        // Methods for locations
        addLocation(location) {
            if (!this.locations.includes(location)) {
                this.locations.push(location);
            }
        },

        removeLocation(location) {
            this.locations = this.locations.filter(l => l !== location);
        },

        handleLocationKeydown(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const value = this.locationInput.trim();
                if (value && !this.locations.includes(value)) {
                    this.addLocation(value);
                    this.locationInput = '';
                }
            }
        },

        // Methods for experience dropdown
        toggleExperienceDropdown() {
            this.experienceDropdownOpen = !this.experienceDropdownOpen;
        },

        selectExperience(experience) {
            this.selectedExperience = experience;
            this.experienceDropdownOpen = false;
        },

        closeExperienceDropdown() {
            this.experienceDropdownOpen = false;
        },

        getExperienceDisplayText() {
            return this.selectedExperience || 'Chọn số năm';
        },

        // Methods for unit dropdown
        toggleUnitDropdown() {
            this.unitDropdownOpen = !this.unitDropdownOpen;
        },

        selectUnit(unit) {
            this.selectedUnit = unit;
            this.unitDropdownOpen = false;
        },

        closeUnitDropdown() {
            this.unitDropdownOpen = false;
        },

        isUnitSelected(unit) {
            return this.selectedUnit === unit;
        },

        // Form validation methods
        isFormValid() {
            return this.selectedGender !== null &&
                this.selectedExperience !== null &&
                this.professionalPositions.length > 0;
        },

        getUpdateButtonClasses() {
            const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 min-w-[120px]";

            if (this.isFormValid()) {
                return `${baseClasses} bg-primary text-primary-foreground hover:bg-primary/90`;
            } else {
                return `${baseClasses} bg-gray-300 text-gray-500 cursor-not-allowed`;
            }
        },

        handleUpdate() {
            if (this.isFormValid()) {
                alert('Thêm Gợi ý việc làm thành công');
                // Here you can add additional logic like sending data to server
                console.log('Form data:', {
                    gender: this.selectedGender,
                    professionalPositions: this.professionalPositions,
                    customPositions: this.customPositions,
                    skills: this.skills,
                    experience: this.selectedExperience,
                    salary: this.salaryInput,
                    unit: this.selectedUnit,
                    locations: this.locations,
                    introduction: this.shortIntroduction,
                    allowEmployerContact: this.allowEmployerContact,
                    activelyLookingForJob: this.activelyLookingForJob,
                    receiveJobSuggestions: this.receiveJobSuggestions
                });
            }
        },

        handleSaveDraft() {
            // Save draft logic
            console.log('Saving draft...');
            alert('Đã lưu nháp thành công');
        },

        // Utility methods
        isMaxReached(items, max = 5) {
            return items.length >= max;
        },

        getBadgeClasses() {
            return 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors';
        },

        getBadgeRemoveClasses() {
            return 'ml-1 text-gray-500 hover:text-gray-700 cursor-pointer';
        },

        getSuggestionButtonClasses() {
            return 'px-3 py-1 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer';
        },

        getDropdownClasses() {
            return this.experienceDropdownOpen ? 'block' : 'hidden';
        },

        getUnitDropdownClasses() {
            return this.unitDropdownOpen ? 'block' : 'hidden';
        }
    }));
});
