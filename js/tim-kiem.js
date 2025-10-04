// Hàm yêu cầu lấy tọa độ của người dùng
function requestUserLocation() {
  if (navigator.geolocation) {
    // Hiển thị thông báo yêu cầu quyền truy cập vị trí
    if (window.fastNotice) {
      window.fastNotice.show('Đang yêu cầu quyền truy cập vị trí để cung cấp dịch vụ tốt hơn...', 'info');
    }

    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Thành công lấy được tọa độ
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('Tọa độ người dùng:', latitude, longitude);

        // Lưu tọa độ vào localStorage để sử dụng sau này
        localStorage.setItem('userLatitude', latitude);
        localStorage.setItem('userLongitude', longitude);

        if (window.fastNotice) {
          window.fastNotice.show('Đã lấy được vị trí của bạn!', 'success');
        }

        // Có thể gọi hàm xử lý tọa độ ở đây
        handleUserLocation(latitude, longitude);
      },
      function (error) {
        // Xử lý lỗi
        let errorMessage = 'Không thể lấy vị trí của bạn. ';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Bạn đã từ chối yêu cầu truy cập vị trí.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Thông tin vị trí không khả dụng.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Yêu cầu lấy vị trí hết thời gian chờ.';
            break;
          default:
            errorMessage += 'Đã xảy ra lỗi không xác định.';
            break;
        }

        console.error('Lỗi lấy vị trí:', errorMessage);

        if (window.fastNotice) {
          window.fastNotice.show(errorMessage, 'error');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 phút
      }
    );
  } else {
    console.log('Trình duyệt không hỗ trợ Geolocation API');
    if (window.fastNotice) {
      window.fastNotice.show('Trình duyệt của bạn không hỗ trợ định vị GPS', 'warning');
    }
  }
}

// Hàm xử lý tọa độ người dùng (có thể tùy chỉnh theo nhu cầu)
function handleUserLocation(latitude, longitude) {
  // Ví dụ: Có thể gọi API để lấy thông tin địa điểm gần nhất
  // hoặc cập nhật giao diện dựa trên vị trí
  console.log('Xử lý vị trí người dùng:', latitude, longitude);

  // Có thể thêm logic xử lý khác ở đây
  // Ví dụ: Tìm kiếm các địa điểm gần nhất, cập nhật bản đồ, etc.
}

// Hàm chuyển đổi tab
function switchTab(tabName) {
  console.log('=== switchTab called with:', tabName);

  // Ẩn tất cả các div results
  const allResults = [
    'job-results',
    'real-estate-results',
    'service-results',
    'company-results',
    'news-results',
    'location-results'
  ];

  allResults.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = 'none';
      element.style.visibility = 'hidden';
      element.classList.add('hidden');
      console.log('Hidden:', id);
    } else {
      console.log('Element not found:', id);
    }
  });

  // Hiển thị div tương ứng với tab được chọn
  if (tabName === 'all') {
    // Tab "Tất cả" - hiển thị tất cả
    allResults.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.style.display = 'block';
        element.style.visibility = 'visible';
        element.classList.remove('hidden');
        console.log('Shown:', id);
      }
    });
  } else {
    // Các tab khác - chỉ hiển thị div tương ứng
    const targetId = tabName + '-results';
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.style.display = 'block';
      targetElement.style.visibility = 'visible';
      targetElement.classList.remove('hidden');
      console.log('Shown target:', targetId);
    } else {
      console.log('Target element not found:', targetId);
    }
  }

  // Cập nhật trạng thái active của các tab
  updateTabStates(tabName);

  // Debug: Log để kiểm tra
  console.log('Switching to tab:', tabName);
  console.log('Target element:', document.getElementById(tabName + '-results'));
}

// Hàm cập nhật trạng thái active của các tab
function updateTabStates(activeTab) {
  // Lấy tất cả các tab buttons
  const tabButtons = document.querySelectorAll('[role="tab"]');

  tabButtons.forEach(button => {
    // Xóa class active
    button.classList.remove('data-[state=active]:bg-background', 'data-[state=active]:text-foreground', 'data-[state=active]:shadow-sm');
    button.setAttribute('aria-selected', 'false');
    button.setAttribute('data-state', 'inactive');
    button.setAttribute('tabindex', '-1');
  });

  // Tìm và kích hoạt tab được chọn
  let targetButton;
  switch (activeTab) {
    case 'all':
      targetButton = document.querySelector('[aria-controls*="content-all"]');
      break;
    case 'jobs':
      targetButton = document.querySelector('[aria-controls*="content-jobs"]');
      break;
    case 'estates':
      targetButton = document.querySelector('[aria-controls*="content-estates"]');
      break;
    case 'services':
      targetButton = document.querySelector('[aria-controls*="content-services"]');
      break;
    case 'companies':
      targetButton = document.querySelector('[aria-controls*="content-companies"]');
      break;
    case 'news':
      targetButton = document.querySelector('[aria-controls*="content-news"]');
      break;
    case 'locations':
      targetButton = document.querySelector('[aria-controls*="content-locations"]');
      break;
  }

  if (targetButton) {
    targetButton.classList.add('data-[state=active]:bg-background', 'data-[state=active]:text-foreground', 'data-[state=active]:shadow-sm');
    targetButton.setAttribute('aria-selected', 'true');
    targetButton.setAttribute('data-state', 'active');
    targetButton.setAttribute('tabindex', '0');
  }
}

// Hàm khởi tạo event listeners cho các tab
function initializeTabSwitching() {
  // Lấy tất cả các tab buttons
  const tabButtons = document.querySelectorAll('[role="tab"]');

  console.log('Found tab buttons:', tabButtons.length);

  tabButtons.forEach((button, index) => {
    const controls = button.getAttribute('aria-controls');
    console.log(`Tab ${index}:`, controls);

    button.addEventListener('click', function () {
      // Xác định tab nào được click dựa trên aria-controls
      const controls = this.getAttribute('aria-controls');
      let tabName = '';

      console.log('Tab clicked, aria-controls:', controls);

      if (controls.includes('content-all')) {
        tabName = 'all';
      } else if (controls.includes('content-jobs')) {
        tabName = 'jobs';
      } else if (controls.includes('content-estates')) {
        tabName = 'estates';
      } else if (controls.includes('content-services')) {
        tabName = 'services';
      } else if (controls.includes('content-companies')) {
        tabName = 'companies';
      } else if (controls.includes('content-news')) {
        tabName = 'news';
      } else if (controls.includes('content-locations')) {
        tabName = 'locations';
      }

      console.log('Detected tab name:', tabName);

      // Chuyển đổi tab
      if (tabName) {
        switchTab(tabName);
      }
    });
  });
}

// Khởi tạo khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded, initializing tab switching...');

  // Yêu cầu vị trí ngay khi trang được tải
  // Delay một chút để đảm bảo các thư viện khác đã load xong
  setTimeout(requestUserLocation, 1000);

  // Khởi tạo chức năng chuyển đổi tab
  initializeTabSwitching();

  // Mặc định hiển thị tab "Tất cả" - delay để đảm bảo DOM đã sẵn sàng
  setTimeout(() => {
    switchTab('all');
  }, 500);

  // Test: Kiểm tra xem các div có tồn tại không
  console.log('Checking divs:');
  const jobResults = document.getElementById('job-results');
  const realEstateResults = document.getElementById('real-estate-results');
  const serviceResults = document.getElementById('service-results');
  const companyResults = document.getElementById('company-results');
  const newsResults = document.getElementById('news-results');
  const locationResults = document.getElementById('location-results');

  console.log('job-results:', jobResults);
  console.log('real-estate-results:', realEstateResults);
  console.log('service-results:', serviceResults);
  console.log('company-results:', companyResults);
  console.log('news-results:', newsResults);
  console.log('location-results:', locationResults);
});
