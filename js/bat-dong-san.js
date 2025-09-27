// Real Estate Data
const realEstateData = [
  {
    id: 1,
    title: "Căn hộ cao cấp Midtown Sakura Park",
    location: "Phú Hữu, TP. Thủ Dầu Một",
    address: "Đường Yersin, Phường Phú Hữu, TP. Thủ Dầu Một",
    price: "2.8 tỷ VNĐ",
    pricePerM2: "37.3 triệu/m²",
    area: "75m²",
    bedrooms: 2,
    bathrooms: 2,
    floors: 1,
    direction: "Đông Nam",
    type: "Căn hộ",
    status: "Sắp bàn giao",
    image: "/public/images/hero-bg.webp",
    images: ["/public/images/hero-bg.webp", "/public/images/hero-bg.webp"],
    featured: true,
    hot: true,
    verified: true,
    publishedAt: "2024-12-21T10:00:00Z",
    developer: "Công ty CP Đầu tư Sakura",
    description: "Căn hộ cao cấp với thiết kế hiện đại, đầy đủ tiện ích nội khu như hồ bơi, gym, công viên.",
    amenities: ["Hồ bơi", "Gym", "Công viên", "Siêu thị", "Trường học"],
    legalStatus: "Sổ hồng riêng",
    handoverDate: "Q2/2025",
    views: 1250,
    contactPhone: "0901234567",
    contactName: "Anh Minh",
  },
  {
    id: 2,
    title: "Nhà phố thương mại Golden Center City",
    location: "Bến Cát, Bình Dương",
    address: "Đường Mỹ Phước Tân Vạn, Thị trấn Mỹ Phước, Bến Cát",
    price: "4.5 tỷ VNĐ",
    pricePerM2: "37.5 triệu/m²",
    area: "120m²",
    bedrooms: 3,
    bathrooms: 4,
    floors: 3,
    direction: "Tây Nam",
    type: "Nhà phố",
    status: "Đang bán",
    image: "/public/images/hero-bg.webp",
    images: ["/public/images/hero-bg.webp", "/public/images/hero-bg.webp"],
    featured: true,
    hot: false,
    verified: true,
    publishedAt: "2024-12-21T09:30:00Z",
    developer: "Tập đoàn Becamex IDC",
    description: "Nhà phố thương mại mặt tiền đường lớn, thuận tiện kinh doanh, gần khu công nghiệp.",
    amenities: ["Mặt tiền rộng", "Gần KCN", "Trường học", "Bệnh viện", "Chợ"],
    legalStatus: "Sổ đỏ chính chủ",
    handoverDate: "Ngay",
    views: 890,
    contactPhone: "0902345678",
    contactName: "Chị Lan",
  },
  {
    id: 3,
    title: "Biệt thự đơn lập Lavilla Green City",
    location: "Tân Uyên, Bình Dương",
    address: "Khu đô thị Lavilla, Phường Uyên Hưng, Tân Uyên",
    price: "8.2 tỷ VNĐ",
    pricePerM2: "41 triệu/m²",
    area: "200m²",
    bedrooms: 4,
    bathrooms: 5,
    floors: 2,
    direction: "Đông",
    type: "Biệt thự",
    status: "Sắp mở bán",
    image: "/public/images/hero-bg.webp",
    images: ["/public/images/hero-bg.webp", "/public/images/hero-bg.webp"],
    featured: true,
    hot: true,
    verified: true,
    publishedAt: "2024-12-21T09:00:00Z",
    developer: "Công ty CP Lavilla",
    description: "Biệt thự đơn lập trong khu đô thị sinh thái, không gian xanh, an ninh 24/7.",
    amenities: ["Sân vườn riêng", "Hồ bơi", "Garage 2 xe", "An ninh 24/7", "Công viên"],
    legalStatus: "Sổ hồng riêng",
    handoverDate: "Q3/2025",
    views: 650,
    contactPhone: "0903456789",
    contactName: "Anh Tuấn",
  },
  {
    id: 4,
    title: "Đất nền dự án Eco City Premia",
    location: "Bàu Bàng, Bình Dương",
    address: "Xã Trừ Văn Thố, Huyện Bàu Bàng",
    price: "1.8 tỷ VNĐ",
    pricePerM2: "18 triệu/m²",
    area: "100m²",
    bedrooms: 0,
    bathrooms: 0,
    floors: 0,
    direction: "Nam",
    type: "Đất nền",
    status: "Đang bán",
    image: "/public/images/hero-bg.webp",
    images: ["/public/images/hero-bg.webp", "/public/images/hero-bg.webp"],
    featured: true,
    hot: false,
    verified: true,
    publishedAt: "2024-12-20T18:00:00Z",
    developer: "Công ty CP Eco City",
    description: "Đất nền trong khu đô thị mới, hạ tầng hoàn thiện, pháp lý rõ ràng.",
    amenities: ["Điện 3 pha", "Nước máy", "Đường nhựa", "Cống thoát nước", "Cây xanh"],
    legalStatus: "Sổ đỏ từng nền",
    handoverDate: "Ngay",
    views: 1100,
    contactPhone: "0904567890",
    contactName: "Chị Hoa",
  },
  {
    id: 5,
    title: "Shophouse mặt tiền đường lớn",
    location: "Dĩ An, Bình Dương",
    address: "Đường Nguyễn Tri Phương, Phường Dĩ An, TP. Dĩ An",
    price: "6.5 tỷ VNĐ",
    pricePerM2: "43.3 triệu/m²",
    area: "150m²",
    bedrooms: 3,
    bathrooms: 3,
    floors: 4,
    direction: "Bắc",
    type: "Shophouse",
    status: "Đang bán",
    image: "/public/images/hero-bg.webp",
    images: ["/public/images/hero-bg.webp", "/public/images/hero-bg.webp"],
    featured: true,
    hot: true,
    verified: true,
    publishedAt: "2024-12-20T17:30:00Z",
    developer: "Tự xây",
    description: "Shophouse mặt tiền đường lớn, vị trí đắc địa, thuận tiện kinh doanh mọi ngành nghề.",
    amenities: ["Mặt tiền 6m", "4 tầng", "Thang máy", "Hầm để xe", "Gần chợ"],
    legalStatus: "Sổ hồng riêng",
    handoverDate: "Ngay",
    views: 980,
    contactPhone: "0905678901",
    contactName: "Anh Đức",
  },
  {
    id: 6,
    title: "Căn hộ studio The Manor Central Park",
    location: "Phú Hòa, TP. Thủ Dầu Một",
    address: "Đường Phú Lợi, Phường Phú Hòa, TP. Thủ Dầu Một",
    price: "1.2 tỷ VNĐ",
    pricePerM2: "34.3 triệu/m²",
    area: "35m²",
    bedrooms: 1,
    bathrooms: 1,
    floors: 1,
    direction: "Tây",
    type: "Căn hộ",
    status: "Đang bán",
    image: "/public/images/hero-bg.webp",
    images: ["/public/images/hero-bg.webp", "/public/images/hero-bg.webp"],
    featured: true,
    hot: false,
    verified: true,
    publishedAt: "2024-12-20T16:00:00Z",
    developer: "Bitexco Group",
    description: "Căn hộ studio hiện đại, đầy đủ nội thất, phù hợp cho người trẻ và đầu tư cho thuê.",
    amenities: ["Nội thất cao cấp", "View công viên", "Gym", "Hồ bơi", "Siêu thị"],
    legalStatus: "Sổ hồng riêng",
    handoverDate: "Ngay",
    views: 750,
    contactPhone: "0906789012",
    contactName: "Chị Mai",
  },
  {
    id: 7,
    title: "Nhà mặt tiền Quốc lộ 13",
    location: "Thuận An, Bình Dương",
    address: "Quốc lộ 13, Phường Thuận Giao, TP. Thuận An",
    price: "12.5 tỷ VNĐ",
    pricePerM2: "62.5 triệu/m²",
    area: "200m²",
    bedrooms: 5,
    bathrooms: 6,
    floors: 3,
    direction: "Đông Nam",
    type: "Nhà mặt tiền",
    status: "Đang bán",
    image: "/public/images/hero-bg.webp",
    images: ["/public/images/hero-bg.webp"],
    featured: false,
    hot: true,
    verified: true,
    publishedAt: "2024-12-20T15:00:00Z",
    developer: "Chủ đầu tư cá nhân",
    description: "Nhà mặt tiền Quốc lộ 13, vị trí vàng, thuận tiện kinh doanh, giao thông thuận lợi.",
    amenities: ["Mặt tiền 8m", "3 tầng", "Gara ô tô", "Kinh doanh tự do"],
    legalStatus: "Sổ đỏ chính chủ",
    handoverDate: "Ngay",
    views: 1350,
    contactPhone: "0907890123",
    contactName: "Anh Hùng",
  },
  {
    id: 8,
    title: "Căn hộ Vinhomes Grand Park",
    location: "TP. Thủ Đức, TP.HCM (gần Bình Dương)",
    address: "Đường Nguyễn Xiển, Phường Long Thạnh Mỹ, TP. Thủ Đức",
    price: "3.2 tỷ VNĐ",
    pricePerM2: "45.7 triệu/m²",
    area: "70m²",
    bedrooms: 2,
    bathrooms: 2,
    floors: 1,
    direction: "Nam",
    type: "Căn hộ",
    status: "Sắp bàn giao",
    image: "/public/images/hero-bg.webp",
    images: ["/public/images/hero-bg.webp"],
    featured: false,
    hot: false,
    verified: true,
    publishedAt: "2024-12-20T14:00:00Z",
    developer: "Vingroup",
    description: "Căn hộ trong đại đô thị Vinhomes Grand Park, tiện ích đầy đủ, gần Bình Dương.",
    amenities: ["Công viên 36ha", "Trường học", "Bệnh viện", "TTTM", "Hồ bơi"],
    legalStatus: "Hợp đồng mua bán",
    handoverDate: "Q1/2025",
    views: 890,
    contactPhone: "0908901234",
    contactName: "Chị Linh",
  },
  {
    id: 9,
    title: "Căn hộ cao cấp Midtown Sakura Park",
    location: "Phú Hữu, TP. Thủ Dầu Một",
    address: "Đường Yersin, Phường Phú Hữu, TP. Thủ Dầu Một",
    price: "2.8 tỷ VNĐ",
    pricePerM2: "37.3 triệu/m²",
    area: "75m²",
    bedrooms: 2,
    bathrooms: 2,
    floors: 1,
    direction: "Đông Nam",
    type: "Căn hộ",
    status: "Sắp bàn giao",
    image: "/public/images/hero-bg.webp",
    images: ["/public/images/hero-bg.webp", "/public/images/hero-bg.webp"],
    featured: true,
    hot: true,
    verified: true,
    publishedAt: "2024-12-21T10:00:00Z",
    developer: "Công ty CP Đầu tư Sakura",
    description: "Căn hộ cao cấp với thiết kế hiện đại, đầy đủ tiện ích nội khu như hồ bơi, gym, công viên.",
    amenities: ["Hồ bơi", "Gym", "Công viên", "Siêu thị", "Trường học"],
    legalStatus: "Sổ hồng riêng",
    handoverDate: "Q2/2025",
    views: 1250,
    contactPhone: "0901234567",
    contactName: "Anh Minh",
  },
  {
    id: 10,
    title: "Nhà phố thương mại Golden Center City",
    location: "Bến Cát, Bình Dương",
    address: "Đường Mỹ Phước Tân Vạn, Thị trấn Mỹ Phước, Bến Cát",
    price: "4.5 tỷ VNĐ",
    pricePerM2: "37.5 triệu/m²",
    area: "120m²",
    bedrooms: 3,
    bathrooms: 4,
    floors: 3,
    direction: "Tây Nam",
    type: "Nhà phố",
    status: "Đang bán",
    image: "/public/images/hero-bg.webp",
    images: ["/public/images/hero-bg.webp", "/public/images/hero-bg.webp"],
    featured: true,
    hot: false,
    verified: true,
    publishedAt: "2024-12-21T09:30:00Z",
    developer: "Tập đoàn Becamex IDC",
    description: "Nhà phố thương mại mặt tiền đường lớn, thuận tiện kinh doanh, gần khu công nghiệp.",
    amenities: ["Mặt tiền rộng", "Gần KCN", "Trường học", "Bệnh viện", "Chợ"],
    legalStatus: "Sổ đỏ chính chủ",
    handoverDate: "Ngay",
    views: 890,
    contactPhone: "0902345678",
    contactName: "Chị Lan",
  },
  {
    id: 11,
    title: "Biệt thự đơn lập Lavilla Green City",
    location: "Tân Uyên, Bình Dương",
    address: "Khu đô thị Lavilla, Phường Uyên Hưng, Tân Uyên",
    price: "8.2 tỷ VNĐ",
    pricePerM2: "41 triệu/m²",
    area: "200m²",
    bedrooms: 4,
    bathrooms: 5,
    floors: 2,
    direction: "Đông",
    type: "Biệt thự",
    status: "Sắp mở bán",
    image: "/public/images/hero-bg.webp",
    images: ["/public/images/hero-bg.webp", "/public/images/hero-bg.webp"],
    featured: true,
    hot: true,
    verified: true,
    publishedAt: "2024-12-21T09:00:00Z",
    developer: "Công ty CP Lavilla",
    description: "Biệt thự đơn lập trong khu đô thị sinh thái, không gian xanh, an ninh 24/7.",
    amenities: ["Sân vườn riêng", "Hồ bơi", "Garage 2 xe", "An ninh 24/7", "Công viên"],
    legalStatus: "Sổ hồng riêng",
    handoverDate: "Q3/2025",
    views: 650,
    contactPhone: "0903456789",
    contactName: "Anh Tuấn",
  },
  {
    id: 12,
    title: "Đất nền dự án Eco City Premia",
    location: "Bàu Bàng, Bình Dương",
    address: "Xã Trừ Văn Thố, Huyện Bàu Bàng",
    price: "1.8 tỷ VNĐ",
    pricePerM2: "18 triệu/m²",
    area: "100m²",
    bedrooms: 0,
    bathrooms: 0,
    floors: 0,
    direction: "Nam",
    type: "Đất nền",
    status: "Đang bán",
    image: "/public/images/hero-bg.webp",
    images: ["/public/images/hero-bg.webp", "/public/images/hero-bg.webp"],
    featured: true,
    hot: false,
    verified: true,
    publishedAt: "2024-12-20T18:00:00Z",
    developer: "Công ty CP Eco City",
    description: "Đất nền trong khu đô thị mới, hạ tầng hoàn thiện, pháp lý rõ ràng.",
    amenities: ["Điện 3 pha", "Nước máy", "Đường nhựa", "Cống thoát nước", "Cây xanh"],
    legalStatus: "Sổ đỏ từng nền",
    handoverDate: "Ngay",
    views: 1100,
    contactPhone: "0904567890",
    contactName: "Chị Hoa",
  }
];

// Job Data
const jobData = [
  {
    id: 1,
    title: "Kỹ sư Phần mềm Senior",
    company: "Công ty TNHH Samsung Electronics Việt Nam",
    companySlug: "công-ty-tnhh-samsung-electronics-việt-nam",
    salary: "25-35 tr",
    location: "KCN VSIP I, Thuận An",
    locationSlug: "kcn-vsip-i,-thuận-an",
    experience: "3-5 năm",
    type: "Toàn thời gian",
    skills: ["React", "Node.js"],
    additionalSkills: 2,
    date: "21-12",
    views: 245,
    urgent: false,
    companyLogo: "./public/images/placeholder.svg?height=60&width=60"
  },
  {
    id: 2,
    title: "Nhân viên Kế toán Tổng hợp",
    company: "Tập đoàn Becamex IDC",
    companySlug: "tập-đoàn-becamex-idc",
    salary: "12-18 tr",
    location: "TP. Thủ Dầu Một",
    locationSlug: "tp.-thủ-dầu-một",
    experience: "2-3 năm",
    type: "Toàn thời gian",
    skills: ["Excel", "SAP"],
    additionalSkills: 1,
    date: "21-12",
    views: 189,
    urgent: true,
    companyLogo: "./public/images/placeholder.svg?height=60&width=60"
  },
  {
    id: 3,
    title: "Chuyên viên Marketing Digital",
    company: "Công ty CP Đầu tư Địa ốc Đại Quang Minh",
    companySlug: "công-ty-cp-đầu-tư-địa-ốc-đại-quang-minh",
    salary: "15-20 tr",
    location: "TP. Dĩ An",
    locationSlug: "tp.-dĩ-an",
    experience: "1-3 năm",
    type: "Toàn thời gian",
    skills: ["Facebook Ads", "Google Ads"],
    additionalSkills: 2,
    date: "21-12",
    views: 156,
    urgent: false,
    companyLogo: "./public/images/placeholder.svg?height=60&width=60"
  },
  {
    id: 4,
    title: "Công nhân Sản xuất",
    company: "Công ty TNHH Pouchen Việt Nam",
    companySlug: "công-ty-tnhh-pouchen-việt-nam",
    salary: "8-12 tr",
    location: "KCN Đồng An, Thuận An",
    locationSlug: "kcn-đồng-an,-thuận-an",
    experience: "Không yêu cầu",
    type: "Toàn thời gian",
    skills: ["Thao tác máy", "Làm việc nhóm"],
    additionalSkills: 0,
    date: "20-12",
    views: 312,
    urgent: true,
    companyLogo: "./public/images/placeholder.svg?height=60&width=60"
  },
  {
    id: 5,
    title: "Giáo viên Tiếng Anh",
    company: "Trường Quốc tế Việt Úc",
    companySlug: "trường-quốc-tế-việt-úc",
    salary: "18-25 tr",
    location: "TP. Thủ Dầu Một",
    locationSlug: "tp.-thủ-dầu-một",
    experience: "2+ năm",
    type: "Toàn thời gian",
    skills: ["IELTS", "TOEFL"],
    additionalSkills: 1,
    date: "20-12",
    views: 98,
    urgent: false,
    companyLogo: "./public/images/placeholder.svg?height=60&width=60"
  },
  {
    id: 6,
    title: "Nhân viên Kinh doanh B2B",
    company: "Công ty CP Thép Hòa Phát",
    companySlug: "công-ty-cp-thép-hòa-phát",
    salary: "15-30 tr",
    location: "KCN Mỹ Phước, Bến Cát",
    locationSlug: "kcn-mỹ-phước,-bến-cát",
    experience: "1-2 năm",
    type: "Toàn thời gian",
    skills: ["Bán hàng B2B", "Đàm phán"],
    additionalSkills: 1,
    date: "20-12",
    views: 167,
    urgent: true,
    companyLogo: "./public/images/placeholder.svg?height=60&width=60"
  },
  {
    id: 7,
    title: "Lập trình viên Mobile (React Native)",
    company: "Công ty TNHH Phần mềm FPT",
    companySlug: "công-ty-tnhh-phần-mềm-fpt",
    salary: "20-28 tr",
    location: "TP. Thủ Dầu Một",
    locationSlug: "tp.-thủ-dầu-một",
    experience: "2-4 năm",
    type: "Toàn thời gian",
    skills: ["React Native", "JavaScript"],
    additionalSkills: 2,
    date: "20-12",
    views: 134,
    urgent: false,
    companyLogo: "./public/images/placeholder.svg?height=60&width=60"
  },
  {
    id: 8,
    title: "Nhân viên Nhân sự",
    company: "Tập đoàn Vingroup",
    companySlug: "tập-đoàn-vingroup",
    salary: "12-16 tr",
    location: "TP. Thuận An",
    locationSlug: "tp.-thuận-an",
    experience: "1-2 năm",
    type: "Toàn thời gian",
    skills: ["Tuyển dụng", "Đào tạo"],
    additionalSkills: 1,
    date: "20-12",
    views: 203,
    urgent: false,
    companyLogo: "./public/images/placeholder.svg?height=60&width=60"
  },
  {
    id: 9,
    title: "Kỹ sư Cơ khí",
    company: "Công ty TNHH Denso Việt Nam",
    companySlug: "công-ty-tnhh-denso-việt-nam",
    salary: "18-25 tr",
    location: "KCN VSIP II, Bình Dương",
    locationSlug: "kcn-vsip-ii,-bình-dương",
    experience: "2-5 năm",
    type: "Toàn thời gian",
    skills: ["AutoCAD", "SolidWorks"],
    additionalSkills: 1,
    date: "19-12",
    views: 178,
    urgent: true,
    companyLogo: "./public/images/placeholder.svg?height=60&width=60"
  },
  {
    id: 10,
    title: "Chuyên viên Pháp chế",
    company: "Công ty CP Đầu tư Bất động sản Novaland",
    companySlug: "công-ty-cp-đầu-tư-bất-động-sản-novaland",
    salary: "16-22 tr",
    location: "TP. Thủ Dầu Một",
    locationSlug: "tp.-thủ-dầu-một",
    experience: "2-3 năm",
    type: "Toàn thời gian",
    skills: ["Luật Dân sự", "Luật Đất đai"],
    additionalSkills: 1,
    date: "19-12",
    views: 89,
    urgent: false,
    companyLogo: "./public/images/placeholder.svg?height=60&width=60"
  },
  {
    id: 11,
    title: "Nhân viên Thiết kế Đồ họa",
    company: "Công ty TNHH Quảng cáo Ogilvy",
    companySlug: "công-ty-tnhh-quảng-cáo-ogilvy",
    salary: "10-15 tr",
    location: "TP. Dĩ An",
    locationSlug: "tp.-dĩ-an",
    experience: "0-2 năm",
    type: "Toàn thời gian",
    skills: ["Photoshop", "Illustrator"],
    additionalSkills: 2,
    date: "19-12",
    views: 145,
    urgent: false,
    companyLogo: "./public/images/placeholder.svg?height=60&width=60"
  },
  {
    id: 12,
    title: "Quản lý Cửa hàng",
    company: "Hệ thống Siêu thị Co.opmart",
    companySlug: "hệ-thống-siêu-thị-co.opmart",
    salary: "14-20 tr",
    location: "TP. Thuận An",
    locationSlug: "tp.-thuận-an",
    experience: "3-5 năm",
    type: "Toàn thời gian",
    skills: ["Quản lý bán lẻ", "Lãnh đạo"],
    additionalSkills: 1,
    date: "19-12",
    views: 267,
    urgent: true,
    companyLogo: "./public/images/placeholder.svg?height=60&width=60"
  }
];

// News Data
const newsData = [
  {
    id: 1,
    title: "Khánh thành cầu vượt Mỹ Phước - Tân Vạn, giảm ùn tắc giao thông",
    slug: "khanh-thanh-cau-vuot-my-phuoc-tan-van-giam-un-tac-giao-thong",
    category: "Giao thông",
    categorySlug: "giao-thông",
    excerpt: "Cầu vượt Mỹ Phước - Tân Vạn được khánh thành, giúp giảm thiểu tình trạng ùn tắc giao thông tại khu vực này.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-21T10:00:00Z",
    author: "Admin",
    views: 1250
  },
  {
    id: 2,
    title: "Bình Dương đầu tư 500 tỷ đồng phát triển du lịch sinh thái",
    slug: "binh-duong-dau-tu-500-ty-dong-phat-trien-du-lich-sinh-thai",
    category: "Du lịch",
    categorySlug: "du-lịch",
    excerpt: "Tỉnh Bình Dương sẽ đầu tư 500 tỷ đồng để phát triển các khu du lịch sinh thái, tạo điểm nhấn cho ngành du lịch địa phương.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-20T15:30:00Z",
    author: "Reporter",
    views: 890
  },
  {
    id: 3,
    title: "Festival ẩm thực Bình Dương 2024 thu hút hàng nghìn du khách",
    slug: "festival-am-thuc-binh-duong-2024-thu-hut-hang-nghin-du-khach",
    category: "Ẩm thực",
    categorySlug: "ẩm-thực",
    excerpt: "Festival ẩm thực Bình Dương 2024 đã thu hút hàng nghìn du khách với các món ăn đặc sản địa phương.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-20T12:00:00Z",
    author: "Food Blogger",
    views: 650
  },
  {
    id: 4,
    title: "Khu công nghiệp VSIP II mở rộng, tạo thêm 10.000 việc làm",
    slug: "khu-cong-nghiep-vsip-ii-mo-rong-tao-them-10000-viec-lam",
    category: "Kinh tế",
    categorySlug: "kinh-tế",
    excerpt: "Khu công nghiệp VSIP II được mở rộng với diện tích 200ha, dự kiến tạo thêm 10.000 việc làm cho người dân địa phương.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-19T18:00:00Z",
    author: "Business Reporter",
    views: 1100
  },
  {
    id: 5,
    title: "Trường Đại học Bình Dương khai giảng năm học mới",
    slug: "truong-dai-hoc-binh-duong-khai-giang-nam-hoc-moi",
    category: "Giáo dục",
    categorySlug: "giáo-dục",
    excerpt: "Trường Đại học Bình Dương tổ chức lễ khai giảng năm học 2024-2025 với sự tham gia của hơn 5.000 sinh viên.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-19T14:00:00Z",
    author: "Education Reporter",
    views: 750
  },
  {
    id: 6,
    title: "Bình Dương xây dựng bệnh viện đa khoa hiện đại",
    slug: "binh-duong-xay-dung-benh-vien-da-khoa-hien-dai",
    category: "Y tế",
    categorySlug: "y-tế",
    excerpt: "Tỉnh Bình Dương đầu tư xây dựng bệnh viện đa khoa hiện đại với 500 giường bệnh, phục vụ nhu cầu khám chữa bệnh của người dân.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-18T16:30:00Z",
    author: "Health Reporter",
    views: 980
  },
  {
    id: 7,
    title: "Lễ hội văn hóa các dân tộc Bình Dương 2024",
    slug: "le-hoi-van-hoa-cac-dan-toc-binh-duong-2024",
    category: "Văn hóa",
    categorySlug: "văn-hóa",
    excerpt: "Lễ hội văn hóa các dân tộc Bình Dương 2024 tôn vinh bản sắc văn hóa đa dạng của các dân tộc trong tỉnh.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-18T11:00:00Z",
    author: "Culture Reporter",
    views: 420
  },
  {
    id: 8,
    title: "Bình Dương phát triển nông nghiệp công nghệ cao",
    slug: "binh-duong-phat-trien-nong-nghiep-cong-nghe-cao",
    category: "Nông nghiệp",
    categorySlug: "nông-nghiệp",
    excerpt: "Tỉnh Bình Dương đẩy mạnh phát triển nông nghiệp công nghệ cao với các mô hình trồng trọt hiện đại.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-17T13:45:00Z",
    author: "Agriculture Reporter",
    views: 680
  },
  {
    id: 9,
    title: "Thành phố Thủ Dầu Một mở rộng hệ thống giao thông công cộng",
    slug: "thanh-pho-thu-dau-mot-mo-rong-he-thong-giao-thong-cong-cong",
    category: "Giao thông",
    categorySlug: "giao-thông",
    excerpt: "Thành phố Thủ Dầu Một đầu tư mở rộng hệ thống xe buýt công cộng để phục vụ nhu cầu di chuyển của người dân.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-17T09:15:00Z",
    author: "Transport Reporter",
    views: 550
  },
  {
    id: 10,
    title: "Bình Dương tổ chức giải chạy marathon quốc tế",
    slug: "binh-duong-to-chuc-giai-chay-marathon-quoc-te",
    category: "Thể thao",
    categorySlug: "thể-thao",
    excerpt: "Tỉnh Bình Dương tổ chức giải chạy marathon quốc tế với sự tham gia của hơn 2.000 vận động viên.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-16T17:20:00Z",
    author: "Sports Reporter",
    views: 720
  },
  {
    id: 11,
    title: "Khu đô thị mới Bình Dương thu hút đầu tư nước ngoài",
    slug: "khu-do-thi-moi-binh-duong-thu-hut-dau-tu-nuoc-ngoai",
    category: "Bất động sản",
    categorySlug: "bất-động-sản",
    excerpt: "Các khu đô thị mới tại Bình Dương thu hút mạnh đầu tư từ các nhà đầu tư nước ngoài.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-16T14:30:00Z",
    author: "Real Estate Reporter",
    views: 890
  },
  {
    id: 12,
    title: "Bình Dương phát triển du lịch làng nghề truyền thống",
    slug: "binh-duong-phat-trien-du-lich-lang-nghe-truyen-thong",
    category: "Du lịch",
    categorySlug: "du-lịch",
    excerpt: "Tỉnh Bình Dương đẩy mạnh phát triển du lịch làng nghề truyền thống để bảo tồn và phát huy giá trị văn hóa.",
    image: "./public/images/placeholder.svg?height=200&width=300",
    publishedAt: "2024-12-15T16:00:00Z",
    author: "Tourism Reporter",
    views: 630
  }
];

document.addEventListener('alpine:init', () => {
  // Initialize Lucide icons when Alpine is ready
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ===========================================
  // HERO SECTION COMPONENT
  // ===========================================
  Alpine.data('heroSectionComponent', () => ({
    searchQuery: '',
    isLoading: false,

    init() {
      console.log('Hero Section component initialized.');
    },

    handleSearch() {
      if (this.searchQuery.trim()) {
        this.isLoading = true;
        // Chuyển sang trang search với keyword
        const keyword = encodeURIComponent(this.searchQuery.trim());
        window.location.href = `/bat-dong-san/search?keyword=${keyword}`;
      }
    }
  }));

  // ===========================================
  // FILTER COMPONENT
  // ===========================================
  Alpine.data('filterComponent', () => ({
    filters: {
      propertyType: 'all',
      priceRange: 'all',
      area: 'all',
      location: 'all',
      bedrooms: 'all',
      bathrooms: 'all',
      status: 'all',
      featured: false,
      verified: false
    },
    isFilterOpen: false,
    openDropdown: null,
    propertyTypes: [
      { value: 'all', label: 'Tất cả' },
      { value: 'apartment', label: 'Căn hộ' },
      { value: 'land', label: 'Đất nền' },
      { value: 'house', label: 'Nhà phố' },
      { value: 'shophouse', label: 'Shophouse' },
      { value: 'villa', label: 'Biệt thự' },
      { value: 'office', label: 'Văn phòng' },
      { value: 'warehouse', label: 'Kho xưởng' },
      { value: 'other', label: 'Khác' }
    ],
    priceRanges: [
      { value: 'all', label: 'Tất cả mức giá' },
      { value: 'under-1b', label: 'Dưới 1 tỷ' },
      { value: '1b-2b', label: '1 - 2 tỷ' },
      { value: '2b-5b', label: '2 - 5 tỷ' },
      { value: '5b-10b', label: '5 - 10 tỷ' },
      { value: 'over-10b', label: 'Trên 10 tỷ' }
    ],
    areas: [
      { value: 'all', label: 'Tất cả diện tích' },
      { value: 'under-50', label: 'Dưới 50m²' },
      { value: '50-80', label: '50 - 80m²' },
      { value: '80-120', label: '80 - 120m²' },
      { value: '120-200', label: '120 - 200m²' },
      { value: 'over-200', label: 'Trên 200m²' }
    ],
    locations: [
      { value: 'all', label: 'Tất cả khu vực' },
      { value: 'thu-dau-mot', label: 'Thủ Dầu Một' },
      { value: 'di-an', label: 'Dĩ An' },
      { value: 'tan-uyen', label: 'Tân Uyên' },
      { value: 'ben-cat', label: 'Bến Cát' },
      { value: 'bau-bang', label: 'Bàu Bàng' },
      { value: 'dau-tieng', label: 'Dầu Tiếng' },
      { value: 'phu-giao', label: 'Phú Giáo' }
    ],
    bedroomOptions: [
      { value: 'all', label: 'Tất cả' },
      { value: '1', label: '1 phòng' },
      { value: '2', label: '2 phòng' },
      { value: '3', label: '3 phòng' },
      { value: '4', label: '4 phòng' },
      { value: '5+', label: '5+ phòng' }
    ],
    bathroomOptions: [
      { value: 'all', label: 'Tất cả' },
      { value: '1', label: '1 phòng' },
      { value: '2', label: '2 phòng' },
      { value: '3', label: '3 phòng' },
      { value: '4+', label: '4+ phòng' }
    ],
    statusOptions: [
      { value: 'all', label: 'Tất cả' },
      { value: 'for-sale', label: 'Đang bán' },
      { value: 'upcoming-handover', label: 'Sắp bàn giao' },
      { value: 'delivered', label: 'Đã bàn giao' },
      { value: 'sold', label: 'Đã bán' }
    ],

    init() {
      console.log('Filter component initialized.');

      // Listen for clear filters event
      window.addEventListener('clear-filters', (event) => {
        this.resetFilters();
      });
    },

    toggleFilter() {
      this.isFilterOpen = !this.isFilterOpen;
    },

    toggleDropdown(dropdownName) {
      this.openDropdown = this.openDropdown === dropdownName ? null : dropdownName;
    },

    closeDropdown() {
      this.openDropdown = null;
    },

    updateFilter(filterType, value) {
      this.filters[filterType] = value;
      this.closeDropdown();
      this.applyFilters();
    },

    applyFilters() {
      // Dispatch filter event to property list component
      window.dispatchEvent(new CustomEvent('filter-properties', {
        detail: { filters: this.filters }
      }));
    },

    resetFilters() {
      this.filters = {
        propertyType: 'all',
        priceRange: 'all',
        area: 'all',
        location: 'all',
        bedrooms: 'all',
        bathrooms: 'all',
        status: 'all',
        featured: false,
        verified: false
      };
      this.applyFilters();
    },

    getFilterLabel(type, value) {
      const options = {
        propertyType: this.propertyTypes,
        priceRange: this.priceRanges,
        area: this.areas,
        location: this.locations,
        bedrooms: this.bedroomOptions,
        bathrooms: this.bathroomOptions,
        status: this.statusOptions
      };

      const option = options[type]?.find(opt => opt.value === value);
      return option ? option.label : 'Tất cả';
    }
  }));

  // ===========================================
  // STATS SECTION COMPONENT
  // ===========================================
  Alpine.data('statsSectionComponent', () => ({
    stats: {
      properties: 120,
      projects: 50,
      partners: 10,
      experience: 20
    },
    animatedStats: {
      properties: 0,
      projects: 0,
      partners: 0,
      experience: 0
    },
    hasAnimated: false,

    init() {
      // Animate numbers when section comes into view
      this.setupIntersectionObserver();
    },

    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.animateNumbers();
            this.hasAnimated = true;
          }
        });
      }, { threshold: 0.5 });

      // Observe stats section
      const statsSection = this.$el.closest('.grid');
      if (statsSection) {
        observer.observe(statsSection);
      }
    },

    animateNumbers() {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const interval = duration / steps;

      Object.keys(this.stats).forEach(key => {
        let current = 0;
        const target = this.stats[key];
        const increment = target / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          this.animatedStats[key] = Math.floor(current);
        }, interval);
      });
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
  // PROPERTY LIST COMPONENT
  // ===========================================
  Alpine.data('propertyListComponent', () => ({
    properties: [],
    filteredProperties: [],
    isLoading: true,
    currentPage: 1,
    itemsPerPage: 8,
    totalPages: 1,
    searchQuery: '',
    viewMode: 'grid', // 'grid' or 'list'
    currentFilters: {
      propertyType: 'all',
      priceRange: 'all',
      area: 'all',
      location: 'all',
      bedrooms: 'all',
      bathrooms: 'all',
      status: 'all',
      featured: false,
      verified: false
    },
    sortBy: 'newest',
    isSortDropdownOpen: false,
    sortOptions: [
      { value: 'newest', label: 'Mới nhất' },
      { value: 'price-low', label: 'Giá thấp đến cao' },
      { value: 'price-high', label: 'Giá cao đến thấp' },
      { value: 'area-small', label: 'Diện tích nhỏ đến lớn' },
      { value: 'area-large', label: 'Diện tích lớn đến nhỏ' },
      { value: 'most-viewed', label: 'Xem nhiều nhất' }
    ],

    init() {
      console.log('Property List component initialized.');
      this.loadProperties();

      // Initialize Lucide icons
      this.$nextTick(() => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      });

      // Listen for search events
      window.addEventListener('search-properties', (event) => {
        this.searchQuery = event.detail.query;
        this.filterProperties();
      });

      // Listen for filter events
      window.addEventListener('filter-properties', (event) => {
        this.currentFilters = event.detail.filters;
        this.filterProperties();
      });

      // Listen for clear filters event
      window.addEventListener('clear-filters', (event) => {
        this.currentFilters = {};
        this.filterProperties();
      });
    },

    async loadProperties() {
      try {
        this.isLoading = true;
        // Simulate API call - replace with actual API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Use real estate data
        this.properties = realEstateData;
        this.filteredProperties = [...this.properties];
        this.calculatePagination();
        this.isLoading = false;

        console.log('Properties loaded:', this.properties.length);
        console.log('Filtered properties:', this.filteredProperties.length);

        // Re-initialize Lucide icons after data is loaded
        this.$nextTick(() => {
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        });
      } catch (error) {
        console.error('Error loading properties:', error);
        this.isLoading = false;
      }
    },

    filterProperties() {
      let filtered = [...this.properties];

      // Ensure currentFilters is properly initialized
      if (!this.currentFilters) {
        this.currentFilters = {
          propertyType: 'all',
          priceRange: 'all',
          area: 'all',
          location: 'all',
          bedrooms: 'all',
          bathrooms: 'all',
          status: 'all',
          featured: false,
          verified: false
        };
      }

      // Apply search filter
      if (this.searchQuery) {
        filtered = filtered.filter(property =>
          property.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          property.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Apply property type filter
      if (this.currentFilters.propertyType && this.currentFilters.propertyType !== 'all') {
        const typeMapping = {
          'apartment': 'Căn hộ',
          'house': 'Nhà phố',
          'villa': 'Biệt thự',
          'land': 'Đất nền',
          'shophouse': 'Shophouse',
          'office': 'Văn phòng',
          'warehouse': 'Kho xưởng',
          'other': 'Khác'
        };
        const targetType = typeMapping[this.currentFilters.propertyType];
        if (targetType) {
          filtered = filtered.filter(property => property.type === targetType);
        }
      }

      // Apply location filter
      if (this.currentFilters.location && this.currentFilters.location !== 'all') {
        const locationMapping = {
          'thu-dau-mot': 'Thủ Dầu Một',
          'di-an': 'Dĩ An',
          'tan-uyen': 'Tân Uyên',
          'ben-cat': 'Bến Cát',
          'bau-bang': 'Bàu Bàng',
          'dau-tieng': 'Dầu Tiếng',
          'phu-giao': 'Phú Giáo'
        };
        const targetLocation = locationMapping[this.currentFilters.location];
        if (targetLocation) {
          filtered = filtered.filter(property => property.location.includes(targetLocation));
        }
      }

      // Apply bedrooms filter
      if (this.currentFilters.bedrooms && this.currentFilters.bedrooms !== 'all') {
        if (this.currentFilters.bedrooms === '5+') {
          filtered = filtered.filter(property => property.bedrooms >= 5);
        } else {
          filtered = filtered.filter(property => property.bedrooms.toString() === this.currentFilters.bedrooms);
        }
      }

      // Apply bathrooms filter
      if (this.currentFilters.bathrooms && this.currentFilters.bathrooms !== 'all') {
        if (this.currentFilters.bathrooms === '4+') {
          filtered = filtered.filter(property => property.bathrooms >= 4);
        } else {
          filtered = filtered.filter(property => property.bathrooms.toString() === this.currentFilters.bathrooms);
        }
      }

      // Apply price range filter
      if (this.currentFilters.priceRange && this.currentFilters.priceRange !== 'all') {
        filtered = filtered.filter(property => {
          const priceStr = property.price.replace(/[^\d.]/g, '');
          const price = parseFloat(priceStr);

          switch (this.currentFilters.priceRange) {
            case 'under-1b':
              return price < 1;
            case '1b-2b':
              return price >= 1 && price < 2;
            case '2b-5b':
              return price >= 2 && price < 5;
            case '5b-10b':
              return price >= 5 && price < 10;
            case 'over-10b':
              return price >= 10;
            default:
              return true;
          }
        });
      }

      // Apply area filter
      if (this.currentFilters.area && this.currentFilters.area !== 'all') {
        filtered = filtered.filter(property => {
          const areaStr = property.area.replace(/[^\d.]/g, '');
          const area = parseFloat(areaStr);

          switch (this.currentFilters.area) {
            case 'under-50':
              return area < 50;
            case '50-80':
              return area >= 50 && area < 80;
            case '80-120':
              return area >= 80 && area < 120;
            case '120-200':
              return area >= 120 && area < 200;
            case 'over-200':
              return area >= 200;
            default:
              return true;
          }
        });
      }

      // Apply featured filter
      if (this.currentFilters.featured === true) {
        filtered = filtered.filter(property => property.featured);
      }

      // Apply status filter
      if (this.currentFilters.status && this.currentFilters.status !== 'all') {
        const statusMapping = {
          'for-sale': 'Đang bán',
          'upcoming-handover': 'Sắp bàn giao',
          'delivered': 'Đã bàn giao',
          'sold': 'Đã bán'
        };
        const targetStatus = statusMapping[this.currentFilters.status];
        if (targetStatus) {
          filtered = filtered.filter(property => property.status === targetStatus);
        }
      }

      // Apply verified filter
      if (this.currentFilters.verified === true) {
        filtered = filtered.filter(property => property.verified);
      }

      this.filteredProperties = filtered;
      this.applySorting();
      this.currentPage = 1;
      this.calculatePagination();

      console.log('Filter applied:', {
        totalProperties: this.properties.length,
        filteredProperties: this.filteredProperties.length,
        currentFilters: this.currentFilters
      });

      // Re-initialize Lucide icons after filtering
      this.$nextTick(() => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      });
    },

    toggleSortDropdown() {
      this.isSortDropdownOpen = !this.isSortDropdownOpen;
    },

    closeSortDropdown() {
      this.isSortDropdownOpen = false;
    },

    updateSort(sortValue) {
      this.sortBy = sortValue;
      this.closeSortDropdown();
      this.applySorting();
      this.currentPage = 1;
      this.calculatePagination();
    },

    applySorting() {
      const sorted = [...this.filteredProperties];

      switch (this.sortBy) {
        case 'price-low':
          sorted.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
            const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));
            return priceA - priceB;
          });
          break;
        case 'price-high':
          sorted.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
            const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));
            return priceB - priceA;
          });
          break;
        case 'area-small':
          sorted.sort((a, b) => {
            const areaA = parseFloat(a.area.replace(/[^\d.]/g, ''));
            const areaB = parseFloat(b.area.replace(/[^\d.]/g, ''));
            return areaA - areaB;
          });
          break;
        case 'area-large':
          sorted.sort((a, b) => {
            const areaA = parseFloat(a.area.replace(/[^\d.]/g, ''));
            const areaB = parseFloat(b.area.replace(/[^\d.]/g, ''));
            return areaB - areaA;
          });
          break;
        case 'newest':
          sorted.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
          break;
        case 'most-viewed':
          sorted.sort((a, b) => b.views - a.views);
          break;
      }

      this.filteredProperties = sorted;
    },

    getCurrentSortLabel() {
      const option = this.sortOptions.find(opt => opt.value === this.sortBy);
      return option ? option.label : 'Mới nhất';
    },

    clearFilters() {
      // Dispatch event to reset filters in filter component (hero section)
      window.dispatchEvent(new CustomEvent('clear-filters', {
        detail: {}
      }));

      // Reset current filters to default values and reapply filtering
      this.currentFilters = {
        propertyType: 'all',
        priceRange: 'all',
        area: 'all',
        location: 'all',
        bedrooms: 'all',
        bathrooms: 'all',
        status: 'all',
        featured: false,
        verified: false
      };
      this.currentPage = 1;
      this.filterProperties();
    },

    // View mode methods
    setViewMode(mode) {
      this.viewMode = mode;
      // Reset to first page when changing view mode
      this.currentPage = 1;
      this.calculatePagination();
    },

    isGridView() {
      return this.viewMode === 'grid';
    },

    isListView() {
      return this.viewMode === 'list';
    },

    calculatePagination() {
      this.totalPages = Math.ceil(this.filteredProperties.length / this.itemsPerPage);
    },

    getCurrentPageProperties() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredProperties.slice(startIndex, endIndex);
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    formatPrice(price) {
      return price;
    },

    getPropertyTypeLabel(type) {
      const types = {
        'apartment': 'Căn hộ',
        'house': 'Nhà riêng',
        'villa': 'Biệt thự',
        'land': 'Đất nền',
        'commercial': 'Thương mại'
      };
      return types[type] || type;
    }
  }));

  // ===========================================
  // PROPERTY CARD COMPONENT
  // ===========================================
  Alpine.data('propertyCardComponent', () => ({
    init() {
      // Initialize Lucide icons for this card
      this.$nextTick(() => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      });
    },

    handlePropertyClick(propertyId) {
      // Navigate to property detail page
      window.location.href = `/bat-dong-san/chi-tiet/${propertyId}`;
    },

    handleFavoriteClick(propertyId, event) {
      event.stopPropagation();
      // Toggle favorite status
      console.log('Toggle favorite for property:', propertyId);
    },

    handleShareClick(propertyId, event) {
      event.stopPropagation();
      // Open share modal or copy link
      console.log('Share property:', propertyId);
    }
  }));

  // ===========================================
  // FEATURED PROPERTIES COMPONENT
  // ===========================================
  Alpine.data('featuredPropertiesComponent', () => ({
    featuredProperties: [],
    currentSlide: 0,
    totalSlides: 0,
    itemsPerSlide: 5,

    init() {
      this.loadFeaturedProperties();
      this.calculateTotalSlides();
      this.setupResponsive();

      // Initialize Lucide icons
      this.$nextTick(() => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      });
    },

    loadFeaturedProperties() {
      // Filter properties that are featured
      this.featuredProperties = realEstateData.filter(property => property.featured);
      console.log('Featured properties loaded:', this.featuredProperties.length);
    },

    calculateTotalSlides() {
      if (this.featuredProperties.length > 0) {
        this.totalSlides = Math.ceil(this.featuredProperties.length / this.itemsPerSlide);
      }
      console.log('Featured properties slides:', this.totalSlides);
    },

    setupResponsive() {
      const updateItemsPerSlide = () => {
        if (window.innerWidth < 640) {
          this.itemsPerSlide = 1;
        } else if (window.innerWidth < 768) {
          this.itemsPerSlide = 2;
        } else if (window.innerWidth < 1024) {
          this.itemsPerSlide = 3;
        } else if (window.innerWidth < 1280) {
          this.itemsPerSlide = 4;
        } else {
          this.itemsPerSlide = 5;
        }
        this.calculateTotalSlides();
        this.updateCarousel();
      };

      window.addEventListener('resize', updateItemsPerSlide);
      updateItemsPerSlide();
    },

    getCurrentSlideProperties() {
      const startIndex = this.currentSlide * this.itemsPerSlide;
      const endIndex = startIndex + this.itemsPerSlide;
      return this.featuredProperties.slice(startIndex, endIndex);
    },

    nextSlide() {
      if (this.totalSlides > 0) {
        if (this.currentSlide < this.totalSlides - 1) {
          this.currentSlide++;
        } else {
          this.currentSlide = 0; // Loop back to first
        }
        this.updateCarousel();
      }
    },

    prevSlide() {
      if (this.totalSlides > 0) {
        if (this.currentSlide > 0) {
          this.currentSlide--;
        } else {
          this.currentSlide = this.totalSlides - 1; // Loop to last
        }
        this.updateCarousel();
      }
    },

    goToSlide(slideIndex) {
      if (slideIndex >= 0 && slideIndex < this.totalSlides) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
      }
    },

    updateCarousel() {
      const container = this.$el.querySelector('.carousel-container');
      if (container && this.totalSlides > 0) {
        // Each slide is 100% width, so we move by 100% per slide
        const translateX = -this.currentSlide * 100;
        container.style.transform = `translateX(${translateX}%)`;
        console.log('Featured properties carousel updated:', {
          currentSlide: this.currentSlide,
          totalSlides: this.totalSlides,
          translateX: translateX
        });
      }
    },

    getStatusBadgeClass(status) {
      const statusClasses = {
        'Đang bán': 'bg-blue-100 text-blue-700 hover:bg-blue-200',
        'Sắp bàn giao': 'bg-green-100 text-green-700 hover:bg-green-200',
        'Đã bàn giao': 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        'Sắp mở bán': 'bg-orange-100 text-orange-700 hover:bg-orange-200',
        'Đã bán': 'bg-red-100 text-red-700 hover:bg-red-200'
      };
      return statusClasses[status] || 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    },

    getHotBadgeClass() {
      return 'bg-red-500 text-white';
    }
  }));

  // ===========================================
  // SUGGESTED JOBS COMPONENT
  // ===========================================
  Alpine.data('suggestedJobsComponent', () => ({
    jobs: [],
    currentSlide: 0,
    totalSlides: 0,
    itemsPerSlide: 6,

    init() {
      this.loadJobs();
      this.calculateTotalSlides();
      this.setupResponsive();

      // Initialize Lucide icons
      this.$nextTick(() => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      });
    },

    loadJobs() {
      // Use job data
      this.jobs = jobData;
      console.log('Jobs loaded:', this.jobs.length);
    },

    calculateTotalSlides() {
      if (this.jobs.length > 0) {
        this.totalSlides = Math.ceil(this.jobs.length / this.itemsPerSlide);
      }
      console.log('Jobs slides:', this.totalSlides);
    },

    setupResponsive() {
      const updateItemsPerSlide = () => {
        if (window.innerWidth < 640) {
          this.itemsPerSlide = 1;
        } else if (window.innerWidth < 768) {
          this.itemsPerSlide = 2;
        } else if (window.innerWidth < 1024) {
          this.itemsPerSlide = 3;
        } else {
          this.itemsPerSlide = 6;
        }
        this.calculateTotalSlides();
        this.updateCarousel();
      };

      window.addEventListener('resize', updateItemsPerSlide);
      updateItemsPerSlide();
    },

    getCurrentSlideJobs() {
      const startIndex = this.currentSlide * this.itemsPerSlide;
      const endIndex = startIndex + this.itemsPerSlide;
      return this.jobs.slice(startIndex, endIndex);
    },

    nextSlide() {
      if (this.totalSlides > 0) {
        if (this.currentSlide < this.totalSlides - 1) {
          this.currentSlide++;
        } else {
          this.currentSlide = 0; // Loop back to first
        }
        this.updateCarousel();
      }
    },

    prevSlide() {
      if (this.totalSlides > 0) {
        if (this.currentSlide > 0) {
          this.currentSlide--;
        } else {
          this.currentSlide = this.totalSlides - 1; // Loop to last
        }
        this.updateCarousel();
      }
    },

    goToSlide(slideIndex) {
      if (slideIndex >= 0 && slideIndex < this.totalSlides) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
      }
    },

    updateCarousel() {
      const container = this.$el.querySelector('.carousel-container');
      if (container && this.totalSlides > 0) {
        // Each slide is 100% width, so we move by 100% per slide
        const translateX = -this.currentSlide * 100;
        container.style.transform = `translateX(${translateX}%)`;
        console.log('Jobs carousel updated:', {
          currentSlide: this.currentSlide,
          totalSlides: this.totalSlides,
          translateX: translateX
        });
      }
    }
  }));

  // ===========================================
  // NEWS COMPONENT
  // ===========================================
  Alpine.data('newsComponent', () => ({
    news: [],
    currentSlide: 0,
    totalSlides: 0,
    itemsPerSlide: 4,

    init() {
      this.loadNews();
      this.calculateTotalSlides();
      this.setupResponsive();

      // Initialize Lucide icons
      this.$nextTick(() => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      });
    },

    loadNews() {
      // Use news data
      this.news = newsData;
      console.log('News loaded:', this.news.length);
    },

    calculateTotalSlides() {
      if (this.news.length > 0) {
        this.totalSlides = Math.ceil(this.news.length / this.itemsPerSlide);
      }
      console.log('News slides:', this.totalSlides);
    },

    setupResponsive() {
      const updateItemsPerSlide = () => {
        if (window.innerWidth < 640) {
          this.itemsPerSlide = 1;
        } else if (window.innerWidth < 768) {
          this.itemsPerSlide = 2;
        } else if (window.innerWidth < 1024) {
          this.itemsPerSlide = 3;
        } else {
          this.itemsPerSlide = 4;
        }
        this.calculateTotalSlides();
        this.updateCarousel();
      };

      window.addEventListener('resize', updateItemsPerSlide);
      updateItemsPerSlide();
    },

    getCurrentSlideNews() {
      const startIndex = this.currentSlide * this.itemsPerSlide;
      const endIndex = startIndex + this.itemsPerSlide;
      return this.news.slice(startIndex, endIndex);
    },

    nextSlide() {
      if (this.totalSlides > 0) {
        if (this.currentSlide < this.totalSlides - 1) {
          this.currentSlide++;
        } else {
          this.currentSlide = 0; // Loop back to first
        }
        this.updateCarousel();
      }
    },

    prevSlide() {
      if (this.totalSlides > 0) {
        if (this.currentSlide > 0) {
          this.currentSlide--;
        } else {
          this.currentSlide = this.totalSlides - 1; // Loop to last
        }
        this.updateCarousel();
      }
    },

    goToSlide(slideIndex) {
      if (slideIndex >= 0 && slideIndex < this.totalSlides) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
      }
    },

    updateCarousel() {
      const container = this.$el.querySelector('.carousel-container');
      if (container && this.totalSlides > 0) {
        // Each slide is 100% width, so we move by 100% per slide
        const translateX = -this.currentSlide * 100;
        container.style.transform = `translateX(${translateX}%)`;
        console.log('News carousel updated:', {
          currentSlide: this.currentSlide,
          totalSlides: this.totalSlides,
          translateX: translateX
        });
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },

    getCategoryColor(category) {
      const colors = {
        'Giao thông': 'bg-blue-100 text-blue-700 hover:bg-blue-200',
        'Du lịch': 'bg-green-100 text-green-700 hover:bg-green-200',
        'Ẩm thực': 'bg-orange-100 text-orange-700 hover:bg-orange-200',
        'Kinh tế': 'bg-purple-100 text-purple-700 hover:bg-purple-200',
        'Giáo dục': 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
        'Y tế': 'bg-red-100 text-red-700 hover:bg-red-200',
        'Văn hóa': 'bg-pink-100 text-pink-700 hover:bg-pink-200',
        'Nông nghiệp': 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
        'Thể thao': 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200',
        'Bất động sản': 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      };
      return colors[category] || 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  }));

  // ===========================================
  // CAROUSEL COMPONENT
  // ===========================================
  Alpine.data('carouselComponent', () => ({
    currentSlide: 0,
    totalSlides: 0,
    itemsPerView: 4,
    isAutoPlay: false,
    autoPlayInterval: null,

    init() {
      this.calculateTotalSlides();
      this.setupResponsive();

      // Auto play for featured properties
      if (this.$el.closest('[data-carousel="featured-properties"]')) {
        this.startAutoPlay();
      }

      // Initialize Lucide icons
      this.$nextTick(() => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      });
    },

    calculateTotalSlides() {
      const container = this.$el.querySelector('.carousel-container');
      if (container) {
        // Count the number of slide wrappers (div.w-full.flex-shrink-0)
        const slides = container.querySelectorAll('.w-full.flex-shrink-0');
        this.totalSlides = slides.length;
        console.log('Carousel slides found:', this.totalSlides);
      } else {
        // Fallback calculation based on data
        const carouselType = this.$el.getAttribute('data-carousel');
        if (carouselType === 'featured-properties') {
          this.totalSlides = 3; // 3 slides for featured properties
        } else if (carouselType === 'suggested-jobs') {
          this.totalSlides = 2; // 2 slides for jobs
        } else if (carouselType === 'news') {
          this.totalSlides = 3; // 3 slides for news
        }
        console.log('Fallback carousel slides:', this.totalSlides, 'for type:', carouselType);
      }
    },

    setupResponsive() {
      const updateItemsPerView = () => {
        if (window.innerWidth < 640) {
          this.itemsPerView = 1;
        } else if (window.innerWidth < 768) {
          this.itemsPerView = 2;
        } else if (window.innerWidth < 1024) {
          this.itemsPerView = 3;
        } else {
          this.itemsPerView = 4;
        }
        this.calculateTotalSlides();
        this.updateCarousel(); // Update carousel position when responsive changes
      };

      window.addEventListener('resize', updateItemsPerView);
      updateItemsPerView();
    },

    nextSlide() {
      if (this.totalSlides > 0) {
        if (this.currentSlide < this.totalSlides - 1) {
          this.currentSlide++;
        } else {
          this.currentSlide = 0; // Loop back to first
        }
        this.updateCarousel();
      }
    },

    prevSlide() {
      if (this.totalSlides > 0) {
        if (this.currentSlide > 0) {
          this.currentSlide--;
        } else {
          this.currentSlide = this.totalSlides - 1; // Loop to last
        }
        this.updateCarousel();
      }
    },

    goToSlide(slideIndex) {
      if (slideIndex >= 0 && slideIndex < this.totalSlides) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
      }
    },

    updateCarousel() {
      const container = this.$el.querySelector('.carousel-container');
      if (container && this.totalSlides > 0) {
        // Each slide is 100% width, so we move by 100% per slide
        const translateX = -this.currentSlide * 100;
        container.style.transform = `translateX(${translateX}%)`;
        console.log('Carousel updated:', {
          currentSlide: this.currentSlide,
          totalSlides: this.totalSlides,
          translateX: translateX
        });
      }
    },

    startAutoPlay() {
      this.isAutoPlay = true;
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000); // Change slide every 5 seconds

      // Pause on hover
      const carousel = this.$el;
      carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
      carousel.addEventListener('mouseleave', () => {
        if (this.$el.closest('[data-carousel="featured-properties"]')) {
          this.startAutoPlay();
        }
      });
    },

    stopAutoPlay() {
      this.isAutoPlay = false;
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    },

    toggleAutoPlay() {
      if (this.isAutoPlay) {
        this.stopAutoPlay();
      } else {
        this.startAutoPlay();
      }
    }
  }));

  // ===========================================
  // BDS MAIN COMPONENT
  // ===========================================
  Alpine.data('bdsComponent', () => ({
    user: null,
    isLoading: true,

    init() {
      console.log('BDS component initialized.');

      // Yêu cầu user data từ header
      window.dispatchEvent(new CustomEvent('get-user-data'));

      // Lắng nghe user data từ header
      window.addEventListener('user-data-ready', (event) => {
        this.user = event.detail.user;
        this.isLoading = false;
        console.log('BDS received user data:', this.user);
      });
    }
  }));
});

// ===========================================
// GLOBAL BDS UTILITIES
// ===========================================
window.BDSUtils = {
  // Utility functions cho bất động sản
  formatPrice: (price) => {
    if (typeof price === 'number') {
      if (price >= 1000000000) {
        return (price / 1000000000).toFixed(1) + ' tỷ';
      } else if (price >= 1000000) {
        return (price / 1000000).toFixed(0) + ' triệu';
      }
      return price.toLocaleString('vi-VN') + ' VNĐ';
    }
    return price;
  },

  formatArea: (area) => {
    return area + 'm²';
  },

  // Lazy load images
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

  // Smooth animations
  animateOnScroll: () => {
    const elements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  },

  // Property type icons
  getPropertyTypeIcon: (type) => {
    const icons = {
      'apartment': 'building',
      'house': 'home',
      'villa': 'crown',
      'land': 'map-pin',
      'commercial': 'store'
    };
    return icons[type] || 'home';
  }
};

// Initialize global utilities when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize lazy loading
  window.BDSUtils.lazyLoadImages();

  // Initialize scroll animations
  window.BDSUtils.animateOnScroll();

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
