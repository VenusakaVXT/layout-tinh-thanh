document.addEventListener('alpine:init', () => {
  Alpine.data('postTabs', () => ({
    activeTab: 'status', // Mặc định tab "Trạng thái" active

    init() {
      // Đảm bảo tab mặc định được hiển thị
      this.showTab('status');
      // Khởi tạo emotion dropdown
      this.initEmotionDropdown();
      // Khởi tạo location dropdown
      this.initLocationDropdown();
      // Khởi tạo privacy dropdown
      this.initPrivacyDropdown();
      // Khởi tạo switch buttons
      this.initSwitchButtons();
      // Khởi tạo category dropdown
      this.initCategoryDropdown();
      // Khởi tạo priority dropdown
      this.initPriorityDropdown();
      // Khởi tạo tag functionality
      this.initTagFunctionality();
      // Khởi tạo publish date validation
      this.initPublishDateValidation();
      // Khởi tạo salary checkbox functionality
      this.initSalaryCheckboxes();
      // Khởi tạo work location dropdown
      this.initWorkLocationDropdown();
      // Khởi tạo skills functionality
      this.initSkillsFunctionality();
      // Khởi tạo deadline validation
      this.initDeadlineValidation();
      // Khởi tạo contact validation
      this.initContactValidation();
      // Khởi tạo property type dropdown
      this.initPropertyTypeDropdown();
      // Khởi tạo property form dropdown
      this.initPropertyFormDropdown();
      // Khởi tạo price unit dropdown
      this.initPriceUnitDropdown();
      // Khởi tạo legal status dropdown
      this.initLegalStatusDropdown();
      // Khởi tạo house direction dropdown
      this.initHouseDirectionDropdown();
      // Khởi tạo service category dropdown
      this.initServiceCategoryDropdown();
      // Khởi tạo experience level dropdown
      this.initExperienceLevelDropdown();
      // Khởi tạo working time dropdown
      this.initWorkingTimeDropdown();
      // Khởi tạo guarantee type dropdown
      this.initGuaranteeTypeDropdown();
    },

    // Chuyển đổi tab
    switchTab(tabName, event) {
      // Bỏ class active khỏi tất cả tab
      const allTabs = document.querySelectorAll('.tab');
      allTabs.forEach(tab => {
        tab.classList.remove('active');
        tab.classList.add('inactive');
      });

      // Thêm class active vào tab được click
      const clickedTab = event.target.closest('.tab');
      if (clickedTab) {
        clickedTab.classList.remove('inactive');
        clickedTab.classList.add('active');
      }

      this.activeTab = tabName;
      this.showTab(tabName);
    },

    // Hiển thị tab được chọn và ẩn các tab khác
    showTab(tabName) {
      // Ẩn tất cả các form
      const allForms = ['status-post', 'news-post', 'job-post', 'real-estate-post', 'service-post'];
      allForms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
          form.classList.add('hidden');
        }
      });

      // Hiển thị form được chọn
      const activeForm = document.getElementById(`${tabName}-post`);
      if (activeForm) {
        activeForm.classList.remove('hidden');
      }
    },

    // Emotion dropdown functions
    initEmotionDropdown() {
      const dropdownBtn = document.getElementById('emotion-dropdown-btn');
      const dropdownMenu = document.getElementById('emotion-dropdown-menu');
      const displayText = document.getElementById('emotion-display-text');
      const chevron = document.getElementById('emotion-chevron');
      const emotionOptions = document.querySelectorAll('.emotion-option');

      if (!dropdownBtn || !dropdownMenu || !displayText || !chevron) return;

      // Toggle dropdown
      dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = dropdownMenu.classList.contains('hidden');

        if (isHidden) {
          dropdownMenu.classList.remove('hidden');
          chevron.classList.add('rotate-180');
        } else {
          dropdownMenu.classList.add('hidden');
          chevron.classList.remove('rotate-180');
        }
      });

      // Select emotion option
      emotionOptions.forEach(option => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();
          const value = option.getAttribute('data-value');
          const text = option.querySelector('span').textContent;
          const bgColor = option.getAttribute('data-bg-color');
          const textColor = option.getAttribute('data-text-color');

          // Create badge with selected emotion
          const badgeContainer = document.getElementById('emotion-badge-container');
          badgeContainer.innerHTML = `
             <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}">
               ${text}
             </div>
           `;

          // Close dropdown
          dropdownMenu.classList.add('hidden');
          chevron.classList.remove('rotate-180');
        });
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
          dropdownMenu.classList.add('hidden');
          chevron.classList.remove('rotate-180');
        }
      });
    },

    // Location dropdown functions
    initLocationDropdown() {
      const locationInput = document.getElementById('location');
      const locationDropdown = document.getElementById('location-dropdown-menu');
      const locationOptions = document.querySelectorAll('.location-option');
      const noLocationFound = document.getElementById('no-location-found');

      if (!locationInput || !locationDropdown) return;

      // Show dropdown on focus
      locationInput.addEventListener('focus', () => {
        locationDropdown.classList.remove('hidden');
        this.filterLocationOptions('');
      });

      // Filter options on input
      locationInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        this.filterLocationOptions(searchTerm);
      });

      // Select location option
      locationOptions.forEach(option => {
        const button = option.querySelector('button');
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const location = button.getAttribute('data-location');
          locationInput.value = location;
          locationDropdown.classList.add('hidden');
        });
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!locationInput.contains(e.target) && !locationDropdown.contains(e.target)) {
          locationDropdown.classList.add('hidden');
        }
      });
    },

    // Filter location options based on search term
    filterLocationOptions(searchTerm) {
      const locationOptions = document.querySelectorAll('.location-option');
      const noLocationFound = document.getElementById('no-location-found');
      let hasVisibleOptions = false;

      locationOptions.forEach(option => {
        const button = option.querySelector('button');
        const locationText = button.getAttribute('data-location').toLowerCase();

        if (locationText.includes(searchTerm)) {
          option.style.display = 'block';
          hasVisibleOptions = true;
        } else {
          option.style.display = 'none';
        }
      });

      // Show/hide "no location found" message
      if (searchTerm && !hasVisibleOptions) {
        noLocationFound.classList.remove('hidden');
      } else {
        noLocationFound.classList.add('hidden');
      }
    },

    // Privacy dropdown functions
    initPrivacyDropdown() {
      const privacyBtn = document.getElementById('privacy-dropdown-btn');
      const privacyDropdown = document.getElementById('privacy-dropdown-menu');
      const privacyText = document.getElementById('privacy-text');
      const privacyDisplay = document.getElementById('privacy-display');
      const privacyChevron = document.getElementById('privacy-chevron');
      const privacyOptions = document.querySelectorAll('.privacy-option');

      if (!privacyBtn || !privacyDropdown || !privacyText) return;

      // Toggle dropdown
      privacyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = privacyDropdown.classList.contains('hidden');

        if (isHidden) {
          privacyDropdown.classList.remove('hidden');
          privacyChevron.classList.add('rotate-180');
        } else {
          privacyDropdown.classList.add('hidden');
          privacyChevron.classList.remove('rotate-180');
        }
      });

      // Select privacy option
      privacyOptions.forEach(option => {
        const button = option.querySelector('button');
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const value = button.getAttribute('data-value');
          const text = button.querySelector('span').textContent;
          const iconType = button.getAttribute('data-icon');

          // Update display
          privacyText.textContent = text;

          // Update icon
          const iconSvg = privacyDisplay.querySelector('svg');
          if (iconType === 'globe') {
            iconSvg.innerHTML = '<circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path>';
          } else if (iconType === 'users') {
            iconSvg.innerHTML = '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>';
          } else if (iconType === 'lock') {
            iconSvg.innerHTML = '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>';
          }

          // Update checkmarks - hide all first
          privacyOptions.forEach(opt => {
            const checkIcon = opt.querySelector('.lucide-check');
            if (checkIcon) {
              checkIcon.classList.add('hidden');
            }
          });

          // Show checkmark for selected option
          const checkIcon = button.querySelector('.lucide-check');
          if (checkIcon) {
            checkIcon.classList.remove('hidden');
          }

          // Close dropdown
          privacyDropdown.classList.add('hidden');
          privacyChevron.classList.remove('rotate-180');
        });
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!privacyBtn.contains(e.target) && !privacyDropdown.contains(e.target)) {
          privacyDropdown.classList.add('hidden');
          privacyChevron.classList.remove('rotate-180');
        }
      });
    },

    // Switch buttons functions
    initSwitchButtons() {
      const tagFriendsSwitch = document.getElementById('tag-friends');
      const breakingSwitch = document.getElementById('breaking');
      const commentsSwitch = document.getElementById('comments');
      const urgentSwitch = document.getElementById('urgent');
      const remoteSwitch = document.getElementById('remote');

      if (tagFriendsSwitch) {
        tagFriendsSwitch.addEventListener('click', () => {
          this.toggleSwitch(tagFriendsSwitch);
        });
      }

      if (breakingSwitch) {
        breakingSwitch.addEventListener('click', () => {
          this.toggleSwitch(breakingSwitch);
        });
      }

      if (commentsSwitch) {
        commentsSwitch.addEventListener('click', () => {
          this.toggleSwitch(commentsSwitch);
        });
      }

      if (urgentSwitch) {
        urgentSwitch.addEventListener('click', () => {
          this.toggleSwitch(urgentSwitch);
        });
      }

      if (remoteSwitch) {
        remoteSwitch.addEventListener('click', () => {
          this.toggleSwitch(remoteSwitch);
        });
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
    },

    // Category dropdown functions
    initCategoryDropdown() {
      const categoryBtn = document.getElementById('category-dropdown-btn');
      const categoryDropdown = document.getElementById('category-dropdown-menu');
      const categoryText = document.getElementById('category-display-text');
      const categoryChevron = document.getElementById('category-chevron');
      const categoryOptions = document.querySelectorAll('.category-option');

      if (!categoryBtn || !categoryDropdown || !categoryText) return;

      // Toggle dropdown
      categoryBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = categoryDropdown.classList.contains('hidden');

        if (isHidden) {
          categoryDropdown.classList.remove('hidden');
          categoryChevron.classList.add('rotate-180');
        } else {
          categoryDropdown.classList.add('hidden');
          categoryChevron.classList.remove('rotate-180');
        }
      });

      // Select category option
      categoryOptions.forEach(option => {
        const button = option.querySelector('button');
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const value = button.getAttribute('data-value');
          const text = button.textContent.trim();

          // Update display text
          categoryText.textContent = text;

          // Close dropdown
          categoryDropdown.classList.add('hidden');
          categoryChevron.classList.remove('rotate-180');
        });
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!categoryBtn.contains(e.target) && !categoryDropdown.contains(e.target)) {
          categoryDropdown.classList.add('hidden');
          categoryChevron.classList.remove('rotate-180');
        }
      });
    },

    // Priority dropdown functions
    initPriorityDropdown() {
      const priorityBtn = document.getElementById('priority-dropdown-btn');
      const priorityDropdown = document.getElementById('priority-dropdown-menu');
      const priorityDisplay = document.getElementById('priority-display');
      const priorityChevron = document.getElementById('priority-chevron');
      const priorityOptions = document.querySelectorAll('.priority-option');

      if (!priorityBtn || !priorityDropdown || !priorityDisplay) return;

      // Toggle dropdown
      priorityBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = priorityDropdown.classList.contains('hidden');

        if (isHidden) {
          priorityDropdown.classList.remove('hidden');
          priorityChevron.classList.add('rotate-180');
        } else {
          priorityDropdown.classList.add('hidden');
          priorityChevron.classList.remove('rotate-180');
        }
      });

      // Select priority option
      priorityOptions.forEach(option => {
        const button = option.querySelector('button');
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const value = button.getAttribute('data-value');
          const bgColor = button.getAttribute('data-bg-color');
          const textColor = button.getAttribute('data-text-color');
          const text = button.querySelector('div:last-child').textContent.trim();

          // Update display
          priorityDisplay.innerHTML = `
            <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 ${bgColor} ${textColor}">
              ${text}
            </div>
          `;

          // Update checkmarks - hide all first
          priorityOptions.forEach(opt => {
            const checkIcon = opt.querySelector('.lucide-check');
            if (checkIcon) {
              checkIcon.classList.add('hidden');
            }
          });

          // Show checkmark for selected option
          const checkIcon = button.querySelector('.lucide-check');
          if (checkIcon) {
            checkIcon.classList.remove('hidden');
          }

          // Close dropdown
          priorityDropdown.classList.add('hidden');
          priorityChevron.classList.remove('rotate-180');
        });
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!priorityBtn.contains(e.target) && !priorityDropdown.contains(e.target)) {
          priorityDropdown.classList.add('hidden');
          priorityChevron.classList.remove('rotate-180');
        }
      });
    },

    // Tag functionality
    initTagFunctionality() {
      const tagInput = document.getElementById('tag-input');
      const addTagBtn = document.getElementById('add-tag-btn');
      const tagsContainer = document.getElementById('tags-container');

      if (!tagInput || !addTagBtn || !tagsContainer) return;

      // Add tag function
      const addTag = () => {
        const tagText = tagInput.value.trim();
        if (tagText === '') return;

        // Check if tag already exists
        const existingTags = Array.from(tagsContainer.querySelectorAll('.tag-item')).map(tag =>
          tag.querySelector('.tag-text').textContent.trim()
        );

        if (existingTags.includes(tagText)) {
          return;
        }

        // Create tag element
        const tagElement = document.createElement('div');
        tagElement.className = 'tag-item inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium';
        tagElement.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag">
            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.586 8.586a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828L12.586 2.586Z"></path>
            <path d="M7 7h.01"></path>
          </svg>
          <span class="tag-text">${tagText}</span>
          <button type="button" class="tag-remove-btn ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors" data-tag="${tagText}">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
              <path d="M18 6 6 18"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>
        `;

        // Add to container
        tagsContainer.appendChild(tagElement);

        // Clear input
        tagInput.value = '';

        // Add remove functionality
        const removeBtn = tagElement.querySelector('.tag-remove-btn');
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          tagElement.remove();
        });
      };

      // Add tag on button click
      addTagBtn.addEventListener('click', addTag);

      // Add tag on Enter key press
      tagInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          addTag();
        }
      });
    },

    // Publish date validation
    initPublishDateValidation() {
      const publishDateInput = document.getElementById('publishDate');
      const publishDateMessage = document.getElementById('publish-date-message');

      if (!publishDateInput || !publishDateMessage) return;

      const validatePublishDate = () => {
        const selectedDate = publishDateInput.value;

        if (!selectedDate) {
          // Empty input - show default message
          publishDateMessage.textContent = 'Để trống để đăng ngay lập tức';
          publishDateMessage.className = 'text-sm text-gray-500';
          return;
        }

        const selectedDateTime = new Date(selectedDate);
        const currentDateTime = new Date();

        if (selectedDateTime <= currentDateTime) {
          // Past time - show error message
          publishDateMessage.textContent = 'Thời gian đăng phải lớn hơn thời gian hiện tại';
          publishDateMessage.className = 'text-sm text-red-500';
        } else {
          // Future time - show success message
          const timeDiff = selectedDateTime - currentDateTime;
          const hours = Math.floor(timeDiff / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

          let timeText = '';
          if (hours > 0) {
            timeText = `${hours} giờ ${minutes} phút`;
          } else {
            timeText = `${minutes} phút`;
          }

          publishDateMessage.textContent = `Sẽ đăng sau ${timeText}`;
          publishDateMessage.className = 'text-sm text-green-500';
        }
      };

      // Validate on input change
      publishDateInput.addEventListener('input', validatePublishDate);

      // Validate on focus out
      publishDateInput.addEventListener('blur', validatePublishDate);
    },



    // Salary checkboxes functionality
    initSalaryCheckboxes() {
      const negotiableCheckbox = document.getElementById('negotiable');
      const rangeCheckbox = document.getElementById('range');
      const salaryForm = document.querySelector('.hidden.grid.grid-cols-1.md\\:grid-cols-3.gap-4');

      if (!negotiableCheckbox || !rangeCheckbox || !salaryForm) return;

      // Toggle checkbox function
      const toggleCheckbox = (checkbox, isChecked) => {
        const span = checkbox.querySelector('span');
        const checkIcon = span.querySelector('.lucide-check');

        if (isChecked) {
          checkbox.setAttribute('aria-checked', 'true');
          checkbox.setAttribute('data-state', 'checked');
          checkbox.classList.add('data-[state=checked]:bg-primary', 'data-[state=checked]:text-primary-foreground');
          checkIcon.classList.remove('hidden');
        } else {
          checkbox.setAttribute('aria-checked', 'false');
          checkbox.setAttribute('data-state', 'unchecked');
          checkbox.classList.remove('data-[state=checked]:bg-primary', 'data-[state=checked]:text-primary-foreground');
          checkIcon.classList.add('hidden');
        }
      };

      // Handle negotiable checkbox click
      negotiableCheckbox.addEventListener('click', () => {
        // Check negotiable, uncheck range
        toggleCheckbox(negotiableCheckbox, true);
        toggleCheckbox(rangeCheckbox, false);

        // Hide salary form
        salaryForm.classList.add('hidden');
      });

      // Handle range checkbox click
      rangeCheckbox.addEventListener('click', () => {
        // Check range, uncheck negotiable
        toggleCheckbox(rangeCheckbox, true);
        toggleCheckbox(negotiableCheckbox, false);

        // Show salary form
        salaryForm.classList.remove('hidden');
      });

      // Handle label clicks
      const negotiableLabel = document.querySelector('label[for="negotiable"]');
      const rangeLabel = document.querySelector('label[for="range"]');

      if (negotiableLabel) {
        negotiableLabel.addEventListener('click', () => {
          negotiableCheckbox.click();
        });
      }

      if (rangeLabel) {
        rangeLabel.addEventListener('click', () => {
          rangeCheckbox.click();
        });
      }
    },


    // Work location dropdown functions
    initWorkLocationDropdown() {
      const workLocationInput = document.getElementById('work-location');
      const workLocationDropdown = document.getElementById('work-location-dropdown-menu');
      const workLocationOptions = document.querySelectorAll('.work-location-option');
      const noWorkLocationFound = document.getElementById('no-work-location-found');

      if (!workLocationInput || !workLocationDropdown) return;

      // Show dropdown on focus
      workLocationInput.addEventListener('focus', () => {
        workLocationDropdown.classList.remove('hidden');
        this.filterWorkLocationOptions('');
      });

      // Filter options on input
      workLocationInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        this.filterWorkLocationOptions(searchTerm);
      });

      // Select work location option
      workLocationOptions.forEach(option => {
        const button = option.querySelector('button');
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const location = button.getAttribute('data-location');
          workLocationInput.value = location;
          workLocationDropdown.classList.add('hidden');
        });
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!workLocationInput.contains(e.target) && !workLocationDropdown.contains(e.target)) {
          workLocationDropdown.classList.add('hidden');
        }
      });
    },

    // Filter work location options based on search term
    filterWorkLocationOptions(searchTerm) {
      const workLocationOptions = document.querySelectorAll('.work-location-option');
      const noWorkLocationFound = document.getElementById('no-work-location-found');
      let hasVisibleOptions = false;

      workLocationOptions.forEach(option => {
        const button = option.querySelector('button');
        const locationText = button.getAttribute('data-location').toLowerCase();

        if (locationText.includes(searchTerm)) {
          option.style.display = 'block';
          hasVisibleOptions = true;
        } else {
          option.style.display = 'none';
        }
      });

      // Show/hide "no location found" message
      if (searchTerm && !hasVisibleOptions) {
        noWorkLocationFound.classList.remove('hidden');
      } else {
        noWorkLocationFound.classList.add('hidden');
      }
    },

    // Skills functionality
    initSkillsFunctionality() {
      const skillInput = document.getElementById('skill-input');
      const addSkillBtn = document.getElementById('add-skill-btn');
      const skillsContainer = document.getElementById('skills-container');

      if (!skillInput || !addSkillBtn || !skillsContainer) return;

      // Add skill function
      const addSkill = () => {
        const skillText = skillInput.value.trim();
        if (skillText === '') return;

        // Check if skill already exists
        const existingSkills = Array.from(skillsContainer.querySelectorAll('.skill-item')).map(skill =>
          skill.querySelector('.skill-text').textContent.trim()
        );

        if (existingSkills.includes(skillText)) {
          console.log('Skill already exists:', skillText);
          return;
        }

        // Create skill element
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium';
        skillElement.innerHTML = `
          <span class="skill-text">${skillText}</span>
          <button type="button" class="skill-remove-btn ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors" data-skill="${skillText}">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
              <path d="M18 6 6 18"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>
        `;

        // Add to container
        skillsContainer.appendChild(skillElement);

        // Clear input
        skillInput.value = '';

        // Add remove functionality
        const removeBtn = skillElement.querySelector('.skill-remove-btn');
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          skillElement.remove();
          console.log('Skill removed:', skillText);
        });

        console.log('Skill added:', skillText);
      };

      // Add skill on button click
      addSkillBtn.addEventListener('click', addSkill);

      // Add skill on Enter key press
      skillInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          addSkill();
        }
      });
    },

    // Deadline validation
    initDeadlineValidation() {
      const deadlineInput = document.getElementById('deadline');
      const deadlineMessage = document.getElementById('deadline-message');

      if (!deadlineInput || !deadlineMessage) return;

      const validateDeadline = () => {
        const selectedDate = deadlineInput.value;

        if (!selectedDate) {
          // Empty input - show default message
          deadlineMessage.textContent = 'Chọn ngày hạn nộp hồ sơ';
          deadlineMessage.className = 'text-sm text-gray-500';
          return;
        }

        const selectedDateTime = new Date(selectedDate);
        const currentDate = new Date();
        // Set current date to start of day for comparison
        currentDate.setHours(0, 0, 0, 0);

        if (selectedDateTime < currentDate) {
          // Past date - show error message
          deadlineMessage.textContent = 'Hạn nộp hồ sơ phải lớn hơn hoặc bằng ngày hiện tại';
          deadlineMessage.className = 'text-sm text-red-500';
        } else {
          // Future date or today - show success message
          const timeDiff = selectedDateTime - currentDate;
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

          if (days === 0) {
            deadlineMessage.textContent = 'Hạn nộp hồ sơ là hôm nay';
            deadlineMessage.className = 'text-sm text-green-500';
          } else if (days === 1) {
            deadlineMessage.textContent = 'Hạn nộp hồ sơ là ngày mai';
            deadlineMessage.className = 'text-sm text-green-500';
          } else {
            deadlineMessage.textContent = `Còn ${days} ngày để nộp hồ sơ`;
            deadlineMessage.className = 'text-sm text-green-500';
          }
        }
      };

      // Validate on input change
      deadlineInput.addEventListener('input', validateDeadline);

      // Validate on focus out
      deadlineInput.addEventListener('blur', validateDeadline);
    },

    // Contact validation (Email and Phone)
    initContactValidation() {
      const emailInput = document.getElementById('contactEmail');
      const phoneInput = document.getElementById('contactPhone');
      const emailMessage = document.getElementById('email-message');
      const phoneMessage = document.getElementById('phone-message');

      if (!emailInput || !phoneInput || !emailMessage || !phoneMessage) return;

      // Email validation
      const validateEmail = () => {
        const email = emailInput.value.trim();

        if (!email) {
          // Empty email - show required message
          emailMessage.textContent = 'Email là bắt buộc';
          emailMessage.className = 'text-sm text-red-500';
          return;
        }

        // Email regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          // Invalid email format
          emailMessage.textContent = 'Địa chỉ email không hợp lệ';
          emailMessage.className = 'text-sm text-red-500';
        } else {
          // Valid email
          emailMessage.textContent = 'Địa chỉ email hợp lệ';
          emailMessage.className = 'text-sm text-green-500';
        }
      };

      // Phone validation
      const validatePhone = () => {
        const phone = phoneInput.value.trim();

        if (!phone) {
          // Empty phone - show optional message
          phoneMessage.textContent = 'Nhập số điện thoại hợp lệ (tùy chọn)';
          phoneMessage.className = 'text-sm text-gray-500';
          return;
        }

        // Remove all non-digit characters
        const cleanPhone = phone.replace(/\D/g, '');

        // Vietnamese phone number patterns
        const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;

        if (!phoneRegex.test(cleanPhone)) {
          // Invalid phone format
          phoneMessage.textContent = 'Số điện thoại không hợp lệ (VD: 0123456789)';
          phoneMessage.className = 'text-sm text-red-500';
        } else {
          // Valid phone
          phoneMessage.textContent = 'Số điện thoại hợp lệ';
          phoneMessage.className = 'text-sm text-green-500';
        }
      };

      // Email event listeners
      emailInput.addEventListener('input', validateEmail);
      emailInput.addEventListener('blur', validateEmail);

      // Phone event listeners
      phoneInput.addEventListener('input', validatePhone);
      phoneInput.addEventListener('blur', validatePhone);

      // Auto-format phone number on input
      phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        // Limit to 10 digits
        if (value.length > 10) {
          value = value.substring(0, 10);
        }

        // Format: 0123 456 789
        if (value.length >= 4) {
          value = value.substring(0, 4) + ' ' + value.substring(4);
        }
        if (value.length >= 8) {
          value = value.substring(0, 8) + ' ' + value.substring(8);
        }

        e.target.value = value;
        validatePhone();
      });
    },

    // Property type dropdown functions
    initPropertyTypeDropdown() {
      const propertyTypeSelect = document.getElementById('property-type-select');

      if (!propertyTypeSelect) return;

      // Handle selection change
      propertyTypeSelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const selectedText = e.target.options[e.target.selectedIndex].text;

        // You can add any additional logic here if needed
        // For example, showing a confirmation message or updating other fields
      });

      // Add focus and blur styling
      propertyTypeSelect.addEventListener('focus', () => {
        propertyTypeSelect.classList.add('ring-2', 'ring-blue-500');
      });

      propertyTypeSelect.addEventListener('blur', () => {
        propertyTypeSelect.classList.remove('ring-2', 'ring-blue-500');
      });
    },

    // Property form dropdown functions
    initPropertyFormDropdown() {
      const propertyFormSelect = document.getElementById('property-form-select');

      if (!propertyFormSelect) return;

      // Handle selection change
      propertyFormSelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const selectedText = e.target.options[e.target.selectedIndex].text;

        // You can add any additional logic here if needed
        // For example, showing a confirmation message or updating other fields
      });

      // Add focus and blur styling
      propertyFormSelect.addEventListener('focus', () => {
        propertyFormSelect.classList.add('ring-2', 'ring-blue-500');
      });

      propertyFormSelect.addEventListener('blur', () => {
        propertyFormSelect.classList.remove('ring-2', 'ring-blue-500');
      });
    },

    // Price unit dropdown functions
    initPriceUnitDropdown() {
      const priceUnitSelect = document.getElementById('price-unit-select');

      if (!priceUnitSelect) return;

      // Handle selection change
      priceUnitSelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const selectedText = e.target.options[e.target.selectedIndex].text;

        // You can add any additional logic here if needed
        // For example, showing a confirmation message or updating other fields
      });

      // Add focus and blur styling
      priceUnitSelect.addEventListener('focus', () => {
        priceUnitSelect.classList.add('ring-2', 'ring-blue-500');
      });

      priceUnitSelect.addEventListener('blur', () => {
        priceUnitSelect.classList.remove('ring-2', 'ring-blue-500');
      });
    },

    // Legal status dropdown functions
    initLegalStatusDropdown() {
      const legalStatusSelect = document.getElementById('legal-status-select');

      if (!legalStatusSelect) return;

      // Handle selection change
      legalStatusSelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const selectedText = e.target.options[e.target.selectedIndex].text;

        // You can add any additional logic here if needed
        // For example, showing a confirmation message or updating other fields
      });

      // Add focus and blur styling
      legalStatusSelect.addEventListener('focus', () => {
        legalStatusSelect.classList.add('ring-2', 'ring-blue-500');
      });

      legalStatusSelect.addEventListener('blur', () => {
        legalStatusSelect.classList.remove('ring-2', 'ring-blue-500');
      });
    },

    // House direction dropdown functions
    initHouseDirectionDropdown() {
      const houseDirectionSelect = document.getElementById('house-direction-select');

      if (!houseDirectionSelect) return;

      // Handle selection change
      houseDirectionSelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const selectedText = e.target.options[e.target.selectedIndex].text;

        // You can add any additional logic here if needed
        // For example, showing a confirmation message or updating other fields
      });

      // Add focus and blur styling
      houseDirectionSelect.addEventListener('focus', () => {
        houseDirectionSelect.classList.add('ring-2', 'ring-blue-500');
      });

      houseDirectionSelect.addEventListener('blur', () => {
        houseDirectionSelect.classList.remove('ring-2', 'ring-blue-500');
      });
    },

    // Service category dropdown functions
    initServiceCategoryDropdown() {
      const serviceCategorySelect = document.getElementById('service-category-select');

      if (!serviceCategorySelect) return;

      // Handle selection change
      serviceCategorySelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const selectedText = e.target.options[e.target.selectedIndex].text;

        // You can add any additional logic here if needed
        // For example, showing a confirmation message or updating other fields
      });

      // Add focus and blur styling
      serviceCategorySelect.addEventListener('focus', () => {
        serviceCategorySelect.classList.add('ring-2', 'ring-blue-500');
      });

      serviceCategorySelect.addEventListener('blur', () => {
        serviceCategorySelect.classList.remove('ring-2', 'ring-blue-500');
      });
    },

    // Experience level dropdown functions
    initExperienceLevelDropdown() {
      const experienceLevelSelect = document.getElementById('experience-level-select');

      if (!experienceLevelSelect) return;

      // Handle selection change
      experienceLevelSelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const selectedText = e.target.options[e.target.selectedIndex].text;

        // You can add any additional logic here if needed
        // For example, showing a confirmation message or updating other fields
      });

      // Add focus and blur styling
      experienceLevelSelect.addEventListener('focus', () => {
        experienceLevelSelect.classList.add('ring-2', 'ring-blue-500');
      });

      experienceLevelSelect.addEventListener('blur', () => {
        experienceLevelSelect.classList.remove('ring-2', 'ring-blue-500');
      });
    },

    // Working time dropdown functions
    initWorkingTimeDropdown() {
      const workingTimeSelect = document.getElementById('working-time-select');

      if (!workingTimeSelect) return;

      // Handle selection change
      workingTimeSelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const selectedText = e.target.options[e.target.selectedIndex].text;

        // You can add any additional logic here if needed
        // For example, showing a confirmation message or updating other fields
      });

      // Add focus and blur styling
      workingTimeSelect.addEventListener('focus', () => {
        workingTimeSelect.classList.add('ring-2', 'ring-blue-500');
      });

      workingTimeSelect.addEventListener('blur', () => {
        workingTimeSelect.classList.remove('ring-2', 'ring-blue-500');
      });
    },

    // Guarantee type dropdown functions
    initGuaranteeTypeDropdown() {
      const guaranteeTypeSelect = document.getElementById('guarantee-type-select');

      if (!guaranteeTypeSelect) return;

      // Handle selection change
      guaranteeTypeSelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const selectedText = e.target.options[e.target.selectedIndex].text;

        // You can add any additional logic here if needed
        // For example, showing a confirmation message or updating other fields
      });

      // Add focus and blur styling
      guaranteeTypeSelect.addEventListener('focus', () => {
        guaranteeTypeSelect.classList.add('ring-2', 'ring-blue-500');
      });

      guaranteeTypeSelect.addEventListener('blur', () => {
        guaranteeTypeSelect.classList.remove('ring-2', 'ring-blue-500');
      });
    }

  }));
});