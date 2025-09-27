# 📚 Hướng Dẫn Sử Dụng Components - Fetinhthanh

## 🎯 Tổng Quan

File `js/components.js` chứa các component tái sử dụng được xây dựng với Alpine.js và data fake từ dự án Next.js. Tất cả components đều được thiết kế để dễ dàng tích hợp và tùy chỉnh.

## 📦 Cấu Trúc Components

### **1. Card Component** (`cardComponent`)
Component cơ bản cho tất cả loại card (tin tức, việc làm, bất động sản, v.v.)

**Sử dụng:**
```html
<div x-data="cardComponent()" class="card">
    <div class="card-content">
        <!-- Nội dung card -->
        <span x-text="formatDate('2024-12-21T08:00:00Z')"></span>
        <span x-text="formatPrice(2500000000)"></span>
    </div>
</div>
```

**Methods:**
- `formatDate(dateString)` - Format ngày tháng
- `formatNumber(num)` - Format số với dấu phẩy
- `formatPrice(price)` - Format giá tiền
- `getWorkTypeText(workAt)` - Lấy text loại công việc
- `getWorkTypeColor(workAt)` - Lấy màu loại công việc

### **2. Pagination Component** (`paginationComponent`)
Component phân trang với navigation và page numbers

**Sử dụng:**
```html
<div x-data="paginationComponent()" x-init="setTotalItems(100)">
    <button @click="prevPage()">Trước</button>
    <template x-for="page in getPageNumbers()" :key="page">
        <button @click="goToPage(page)" x-text="page"></button>
    </template>
    <button @click="nextPage()">Sau</button>
</div>
```

**Methods:**
- `setTotalItems(total)` - Set tổng số items
- `goToPage(page)` - Chuyển đến trang
- `nextPage()` - Trang tiếp theo
- `prevPage()` - Trang trước
- `getPageNumbers()` - Lấy danh sách số trang

**Events:**
- `page-changed` - Khi thay đổi trang

### **3. Filter Component** (`filterComponent`)
Component bộ lọc với search, category, sort

**Sử dụng:**
```html
<div x-data="filterComponent()">
    <input x-model="filters.search" placeholder="Tìm kiếm...">
    <select x-model="filters.category">
        <option value="all">Tất cả</option>
        <option value="Kinh Tế">Kinh Tế</option>
    </select>
    <button @click="applyFilters()">Áp dụng</button>
</div>
```

**Methods:**
- `toggleFilter()` - Bật/tắt bộ lọc
- `applyFilters()` - Áp dụng bộ lọc
- `clearFilters()` - Xóa bộ lọc
- `filterData(data, type)` - Lọc dữ liệu

**Events:**
- `filters-applied` - Khi áp dụng bộ lọc

### **4. Slider Component** (`sliderComponent`)
Component slider với auto-play và navigation

**Sử dụng:**
```html
<div x-data="sliderComponent()">
    <div class="slider-container">
        <div class="slide">Slide 1</div>
        <div class="slide">Slide 2</div>
        <div class="slide">Slide 3</div>
    </div>
    <button @click="prevSlide()">Trước</button>
    <button @click="nextSlide()">Sau</button>
</div>
```

**Methods:**
- `nextSlide()` - Slide tiếp theo
- `prevSlide()` - Slide trước
- `goToSlide(index)` - Chuyển đến slide
- `toggleAutoPlay()` - Bật/tắt auto-play

### **5. Search Component** (`searchComponent`)
Component tìm kiếm với debounce và multiple types

**Sử dụng:**
```html
<div x-data="searchComponent()">
    <input x-model="searchQuery" @input.debounce.500ms="performSearch()">
    <button @click="selectSearchType('news')">Tin tức</button>
    <button @click="selectSearchType('jobs')">Việc làm</button>
</div>
```

**Methods:**
- `performSearch()` - Thực hiện tìm kiếm
- `clearSearch()` - Xóa tìm kiếm
- `selectSearchType(type)` - Chọn loại tìm kiếm

### **6. Loading Component** (`loadingComponent`)
Component loading với spinner và text

**Sử dụng:**
```html
<div x-data="loadingComponent()">
    <button @click="show('Đang tải...')">Hiển thị Loading</button>
    <div x-show="isLoading">
        <div class="spinner"></div>
        <p x-text="loadingText"></p>
    </div>
</div>
```

**Methods:**
- `show(text)` - Hiển thị loading
- `hide()` - Ẩn loading

### **7. Modal Component** (`modalComponent`)
Component modal với backdrop và close

**Sử dụng:**
```html
<div x-data="modalComponent()">
    <button @click="open('Tiêu đề', 'Nội dung')">Mở Modal</button>
    <div x-show="isOpen" class="modal">
        <h3 x-text="title"></h3>
        <p x-text="content"></p>
        <button @click="close()">Đóng</button>
    </div>
</div>
```

**Methods:**
- `open(title, content)` - Mở modal
- `close()` - Đóng modal
- `toggle()` - Bật/tắt modal

### **8. Tabs Component** (`tabsComponent`)
Component tabs với active state

**Sử dụng:**
```html
<div x-data="tabsComponent()">
    <button @click="setActiveTab(0)" :class="{ 'active': activeTab === 0 }">Tab 1</button>
    <button @click="setActiveTab(1)" :class="{ 'active': activeTab === 1 }">Tab 2</button>
    <div x-show="activeTab === 0">Nội dung Tab 1</div>
    <div x-show="activeTab === 1">Nội dung Tab 2</div>
</div>
```

**Methods:**
- `setActiveTab(index)` - Chuyển tab
- `isActiveTab(index)` - Kiểm tra tab active

### **9. Accordion Component** (`accordionComponent`)
Component accordion với expand/collapse

**Sử dụng:**
```html
<div x-data="accordionComponent()">
    <button @click="toggleItem(0)">Câu hỏi 1</button>
    <div x-show="isOpen(0)">Câu trả lời 1</div>
    <button @click="toggleItem(1)">Câu hỏi 2</button>
    <div x-show="isOpen(1)">Câu trả lời 2</div>
</div>
```

**Methods:**
- `toggleItem(index)` - Bật/tắt item
- `isOpen(index)` - Kiểm tra item mở
- `openAll()` - Mở tất cả
- `closeAll()` - Đóng tất cả

## 📊 Data Access

### **Global Data Objects:**
```javascript
// Truy cập data từ bất kỳ đâu
FetinhthanhData.newsData      // Tin tức
FetinhthanhData.jobsData      // Việc làm
FetinhthanhData.realEstateData // Bất động sản
FetinhthanhData.companiesData // Doanh nghiệp
FetinhthanhData.servicesData  // Dịch vụ
```

### **Utility Functions:**
```javascript
// Format functions
FetinhthanhUtils.formatDate('2024-12-21T08:00:00Z')
FetinhthanhUtils.formatNumber(1234567)
FetinhthanhUtils.formatPrice(2500000000)
FetinhthanhUtils.getWorkTypeText(1)
FetinhthanhUtils.getWorkTypeColor(1)

// Helper functions
FetinhthanhUtils.debounce(func, wait)
FetinhthanhUtils.throttle(func, limit)
```

## 🎨 Styling

### **CSS Classes:**
- `.card` - Card container
- `.card-content` - Card content
- `.btn` - Button base
- `.btn-primary` - Primary button
- `.btn-outline` - Outline button
- `.input` - Input field

### **Tailwind Classes:**
Tất cả components sử dụng Tailwind CSS classes có sẵn trong project.

## 🔧 Customization

### **Extending Components:**
```javascript
// Extend existing component
Alpine.data('customCardComponent', () => ({
    ...Alpine.data('cardComponent')(),
    
    // Add custom methods
    customMethod() {
        // Custom logic
    }
}));
```

### **Custom Data:**
```javascript
// Add custom data
FetinhthanhData.customData = [
    // Your custom data
];
```

## 🧪 Testing

### **Test File:**
Mở `test-components.html` để test tất cả components.

### **Test Features:**
- ✅ Card Component với 3 loại (news, jobs, real-estate)
- ✅ Pagination với navigation
- ✅ Filter với search và sort
- ✅ Slider với auto-play
- ✅ Search với debounce
- ✅ Loading với spinner
- ✅ Modal với backdrop
- ✅ Tabs với active state
- ✅ Accordion với expand/collapse
- ✅ Data access và utility functions

## 📝 Best Practices

### **1. Component Naming:**
- Sử dụng `camelCase` cho component names
- Thêm suffix `Component` cho clarity

### **2. Data Binding:**
- Sử dụng `x-model` cho two-way binding
- Sử dụng `x-text` cho one-way binding

### **3. Events:**
- Sử dụng `@click` cho click events
- Sử dụng `@input` cho input events
- Sử dụng `@input.debounce.500ms` cho search

### **4. Transitions:**
- Sử dụng `x-transition` cho smooth animations
- Sử dụng `x-show` với `x-transition`

### **5. Performance:**
- Sử dụng `x-init` cho initialization
- Sử dụng `x-data` cho component state
- Sử dụng `x-ref` cho DOM references

## 🚀 Next Steps

1. **Giai đoạn 2**: Implement Tin Tức Nổi Bật section
2. **Giai đoạn 3**: Implement Việc Làm Nổi Bật section
3. **Giai đoạn 4**: Implement Bất Động Sản Nổi Bật section
4. **Giai đoạn 5**: Implement các section còn lại
5. **Giai đoạn 6**: Tối ưu hóa và testing

## 📞 Support

Nếu có vấn đề gì, hãy kiểm tra:
1. Console errors trong browser
2. Alpine.js đã load chưa
3. Components đã được khởi tạo chưa
4. Data đã được load chưa

---

**Tạo bởi**: Fetinhthanh Team  
**Cập nhật**: 2024-12-21  
**Version**: 1.0.0
