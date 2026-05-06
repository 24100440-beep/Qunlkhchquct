# Hệ thống Quản lý Xuất Nhập Cảnh
Ứng dụng web  quản lý thông tin du khách quốc tế tại các cửa khẩu Việt Nam.
## 📋 Tính năng
 Quản lý thông tin du khách (Thêm, Sửa, Xóa)
 Tìm kiếm theo tên, số hộ chiếu, ngày nhập cảnh
 Thống kê du khách đang lưu trú, đã xuất cảnh
 Cảnh báo tự động du khách quá hạn lưu trú
 Cảnh báo đỏ cho du khách quá hạn >7 ngày
 Dashboard với charts và biểu đồ
 Navigation đa trang với sidebar
 Giao diện đẹp mắt, responsive
##  Công nghệ sử dụng
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
- PostgreSQL 12+
- REST API
- Maven
## Cấu trúc dự án
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
├── API_SPECIFICATION.md
└── README.md

## 🚀 Hướng dẫn cài đặt
# 🚀 HƯỚNG DẪN CHẠY DỰ ÁN
## Sau khi repo project về
## Trong code đang để cách chạy 1
## Cách 1 — Chạy nhanh bằng H2(Cách dễ nhất ạ )
## Bước 1: Chạy Backend
Mở terminal:
```bash
cd backend
mvn spring-boot:run
```
Backend chạy tại:
```bash 
http://localhost:8080/api
```

```bash
sau đó mở
http://localhost:8080/h2-console
```
Thông tin đăng nhập H2:
```bash
JDBC URL: jdbc:h2:file:./data/immigration_db
User Name: sa
Password: để trống
```

## Bước 2: Chạy Frontend
Mở terminal mới:
```bash
npm install
npm run dev
```
Frontend chạy tại:
```bash
http://localhost:5173
```
---
## Bước 3: Sử dụng hệ thống
Mở trình duyệt:
```bash
http://localhost:5173
```
---

# Cách 2 — Chạy bằng PostgreSQL

## Bước 1: Cài PostgreSQL
https://www.postgresql.org/download/windows/
---
Download the installer
PostgreSQL Version:15.17
## Bước 2: Tạo database
Chỉ chọn 
## PostgreSQL
## pgadmin4
## Spring Boot
## không cần Stack Builder
Bước tạo mật khẩu lên để là 0 vì trong code là 0
Mở PostgreSQL:
## Click chuột phải Servers
→ Register
→ Server...
Name: Test Server có thể đặt My DB Test, Demo DB
## Điền thông tin 
Host name/address: localhost
Port: 5432
Maintenance database: postgres
Username: postgres
Password: 0
## Cấu Hình 
Servers
 ├── My DB
 ├── PostgreSQL 15
 └── Test Server
 ## Chuột phải vào:

Test Server → Databases

→ Create
→ Database...

Điền: 

Database name:Database name: immigration_db
Owner: postgres

→ Save
## chọn immigration_db → Query Tool → Open file sample_data.sql → Execute → kiểm tra Tables.

 ##  Cập nhập File src/main/resources/application.properties

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/immigration_db
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD(0)
spring.jpa.hibernate.ddl-auto=update
```

---

## Bước 4: Chạy Backend

```bash
cd backend
mvn spring-boot:run
```

Backend chạy tại:

```bash
http://localhost:8080/api
```

---

## Bước 5: Chạy Frontend

Mở terminal mới:

```bash
npm install
npm run dev
```

Frontend chạy tại:

```bash
http://localhost:5173
```
### API Endpoints (Backend):
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

### Backend (Java + PostgreSQL):
- [ ] Database schema SQL (PostgreSQL)
- [ ] Sample data
- [ ] Cài PostgreSQL
- [ ] Tạo database
- [ ] Chạy schema.sql
- [ ] Config password trong application.properties
- [ ] Chạy backend: `mvn spring-boot:run`
- [ ] Test API: http://localhost:8080/api/travelers
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
