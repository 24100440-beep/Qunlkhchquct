# Hệ thống Quản lý Xuất Nhập Cảnh

Ứng dụng web Full-Stack quản lý thông tin du khách quốc tế tại các cửa khẩu Việt Nam.

## 📋 Tính năng

✅ Quản lý thông tin du khách (Thêm, Sửa, Xóa)
✅ Tìm kiếm theo tên, số hộ chiếu, ngày nhập cảnh
✅ Thống kê du khách đang lưu trú, đã xuất cảnh
✅ Cảnh báo tự động du khách quá hạn lưu trú
✅ Cảnh báo đỏ cho du khách quá hạn >7 ngày
✅ Dashboard với charts và biểu đồ
✅ Navigation đa trang với sidebar
✅ Giao diện đẹp mắt, responsive

## 🛠️ Công nghệ sử dụng

**Frontend:**
- React 18 + TypeScript
- React Router (multi-page)
- Vite
- Tailwind CSS 4
- Recharts (biểu đồ)
- date-fns (xử lý ngày tháng)
- lucide-react (icons)

**Backend:**
- Java 17
- Spring Boot 3.2
- Spring Data JPA
- MySQL 8.0
- REST API
- Maven

## 📁 Cấu trúc dự án

```
immigration-management/
├── src/app/                         # Frontend React
│   ├── App.tsx                      # RouterProvider
│   ├── routes.tsx                   # Route definitions
│   ├── context/
│   │   └── TravelerContext.tsx      # Global state
│   ├── layouts/
│   │   └── RootLayout.tsx           # Main layout + Sidebar
│   ├── pages/
│   │   ├── DashboardPage.tsx        # Trang tổng quan
│   │   ├── TravelersPage.tsx        # Quản lý du khách
│   │   ├── StatisticsPage.tsx       # Thống kê & charts
│   │   └── AlertsPage.tsx           # Cảnh báo
│   ├── components/
│   │   ├── TravelerForm.tsx
│   │   ├── TravelerTable.tsx
│   │   ├── SearchBar.tsx
│   │   └── StatisticsCards.tsx
│   ├── services/
│   │   └── api.ts                   # API client
│   ├── types/
│   │   └── traveler.ts
│   └── data/
│       └── mockData.ts
│
├── backend/                         # Backend Java Spring Boot
│   ├── src/main/java/com/immigration/
│   │   ├── ImmigrationApplication.java
│   │   ├── config/
│   │   │   └── CorsConfig.java
│   │   ├── controller/
│   │   │   └── TravelerController.java
│   │   ├── dto/
│   │   ├── entity/
│   │   │   └── Traveler.java
│   │   ├── exception/
│   │   ├── repository/
│   │   │   └── TravelerRepository.java
│   │   └── service/
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── database/
│   │   ├── schema.sql
│   │   └── sample_data.sql
│   ├── pom.xml
│   └── README_BACKEND.md
│
├── HUONG_DAN_KET_NOI_FULL_STACK.md  # ⭐ Đọc file này trước!
├── API_SPECIFICATION.md
└── README.md
```

## 🚀 Hướng dẫn cài đặt

### ⭐ QUAN TRỌNG: Đọc file này trước!
👉 [HUONG_DAN_KET_NOI_FULL_STACK.md](./HUONG_DAN_KET_NOI_FULL_STACK.md)

File này chứa hướng dẫn chi tiết từng bước để:
1. Setup Backend Java + MySQL
2. Chạy backend
3. Kết nối Frontend với Backend
4. Test toàn bộ hệ thống

### Quick Start - Frontend Only (Mock Data):

```bash
# Frontend đã sẵn sàng, chỉ cần chạy:
npm run dev
```

Frontend sẽ chạy với mock data tại: http://localhost:5173

### Quick Start - Full Stack (Frontend + Backend):

**1. Setup Backend:**
```bash
# Cài MySQL và tạo database
mysql -u root -p
CREATE DATABASE immigration_db;
exit

# Chạy backend
cd backend
mvn spring-boot:run
```

**2. Chạy Frontend:**
```bash
npm run dev
```

Xem chi tiết trong [HUONG_DAN_KET_NOI_FULL_STACK.md](./HUONG_DAN_KET_NOI_FULL_STACK.md)

## 📚 Tài liệu

### Hướng dẫn Setup & Kết nối:
- 📖 [HUONG_DAN_KET_NOI_FULL_STACK.md](./HUONG_DAN_KET_NOI_FULL_STACK.md) - **Đọc file này trước!**
- 📖 [backend/README_BACKEND.md](./backend/README_BACKEND.md) - Chi tiết backend
- 📖 [API_SPECIFICATION.md](./API_SPECIFICATION.md) - API reference

### API Endpoints (Backend):
✅ **HOÀN THÀNH** - Không cần code thêm!

- `GET /api/travelers` - Lấy danh sách (có search)
- `GET /api/travelers/:id` - Lấy 1 du khách
- `POST /api/travelers` - Thêm du khách mới
- `PUT /api/travelers/:id` - Cập nhật thông tin
- `DELETE /api/travelers/:id` - Xóa du khách
- `GET /api/travelers/statistics` - Lấy thống kê

### Frontend Pages:
- 🏠 **Dashboard** - Tổng quan, thống kê, du khách mới
- 👥 **Travelers** - CRUD quản lý du khách
- 📊 **Statistics** - Charts & biểu đồ phân tích
- 🚨 **Alerts** - Cảnh báo quá hạn lưu trú

## ✅ Checklist Setup

### Frontend (React):
- [x] Tất cả components đã tạo
- [x] Multi-page routing (4 trang)
- [x] Mock data có sẵn
- [x] API service sẵn sàng
- [ ] Uncomment API code khi backend chạy

### Backend (Java):
- [x] Full source code đã tạo
- [x] Database schema SQL
- [x] Sample data
- [ ] Cài MySQL
- [ ] Config password trong application.properties
- [ ] Chạy backend: `mvn spring-boot:run`
- [ ] Test API: http://localhost:8080/api/travelers

### Kết nối:
- [ ] Backend chạy thành công
- [ ] Frontend uncomment API code
- [ ] TravelerContext dùng API thay mock
- [ ] Test thêm/sửa/xóa
- [ ] Data lưu vào MySQL

## 🎯 Trạng thái hiện tại

### ✅ Frontend - HOÀN THÀNH 100%
- Tất cả 4 trang đã xong
- UI đẹp với gradient, animations
- Sidebar navigation
- Charts & statistics
- Mock data đang chạy

### ✅ Backend - CODE HOÀN THÀNH 100%
- Source code đã đầy đủ trong folder `backend/`
- Chỉ cần: Cài MySQL → Config password → Chạy
- Không cần code thêm gì!

### 🔄 Chưa làm:
- Cài đặt MySQL
- Chạy backend
- Kết nối frontend-backend (uncomment code)

👉 Làm theo: [HUONG_DAN_KET_NOI_FULL_STACK.md](./HUONG_DAN_KET_NOI_FULL_STACK.md)

## 📊 Thông tin du khách

**Thông tin cần nhập:**
- Số hộ chiếu (bắt buộc, unique)
- Họ và tên (bắt buộc)
- Ngày tháng năm sinh (bắt buộc)
- Quốc tịch (bắt buộc)
- Thời gian nhập khẩu (bắt buộc)
- Cửa khẩu vào (bắt buộc)
- Địa điểm cửa khẩu (bắt buộc)
- Lý do nhập khẩu (bắt buộc)
- Số ngày lưu trú tối đa (bắt buộc, ≥1)
- Thời gian xuất khẩu (tùy chọn)
- Địa điểm xuất khẩu (tùy chọn)

**Tự động tính:**
- Thời hạn lưu trú tối đa = Ngày nhập + Số ngày lưu trú

## 📈 Thống kê

- **Tổng số du khách**: Tất cả du khách trong hệ thống
- **Đã xuất cảnh**: Du khách đã có thông tin xuất cảnh
- **Đang lưu trú**: Du khách chưa xuất cảnh
- **Quá hạn lưu trú**: Ngày hiện tại > Thời hạn lưu trú & chưa xuất cảnh
- **Cảnh báo đỏ**: Quá hạn > 7 ngày

## 🎨 Screenshots

*(Xem ứng dụng đang chạy trong Figma Make preview)*

## 👨‍💻 Phát triển bởi

Dự án được phát triển để phục vụ quản lý xuất nhập cảnh tại các cửa khẩu.

## 📄 License

Educational Project - Free to use

---

**Lưu ý:** Ứng dụng frontend đã hoàn chỉnh với mock data. Cần implement Java backend theo tài liệu API để có hệ thống hoàn chỉnh.
