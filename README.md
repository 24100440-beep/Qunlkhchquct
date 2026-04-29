# Hệ thống Quản lý Xuất Nhập Cảnh

Ứng dụng web quản lý thông tin du khách quốc tế tại các cửa khẩu Việt Nam.

## 📋 Tính năng

✅ Quản lý thông tin du khách (Thêm, Sửa, Xóa)
✅ Tìm kiếm theo tên, số hộ chiếu, ngày nhập cảnh
✅ Thống kê du khách đang lưu trú, đã xuất cảnh
✅ Cảnh báo tự động du khách quá hạn lưu trú
✅ Cảnh báo đỏ cho du khách quá hạn >7 ngày
✅ Giao diện thân thiện, responsive

## 🛠️ Công nghệ sử dụng

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS 4
- date-fns (xử lý ngày tháng)
- lucide-react (icons)

**Backend (cần implement):**
- Java Spring Boot
- MySQL/PostgreSQL
- REST API

## 📁 Cấu trúc dự án

```
immigration-management/
├── src/
│   ├── App.tsx                      # Component chính
│   ├── main.tsx                     # Entry point
│   ├── index.css                    # Tailwind imports
│   ├── types/
│   │   └── traveler.ts              # Type definitions
│   ├── data/
│   │   └── mockData.ts              # Mock data cho demo
│   └── components/
│       ├── TravelerForm.tsx         # Form thêm/sửa du khách
│       ├── TravelerTable.tsx        # Bảng danh sách
│       ├── SearchBar.tsx            # Tìm kiếm
│       └── StatisticsCards.tsx      # Dashboard thống kê
├── API_SPECIFICATION.md             # Tài liệu API cho Java Backend
├── HUONG_DAN_CAI_DAT.md            # Hướng dẫn cài đặt
└── README.md                        # File này
```

## 🚀 Hướng dẫn cài đặt

Xem chi tiết trong file [HUONG_DAN_CAI_DAT.md](./HUONG_DAN_CAI_DAT.md)

### Quick Start:

```bash
# 1. Tạo project
npm create vite@latest immigration-management -- --template react-ts
cd immigration-management

# 2. Cài dependencies
npm install
npm install date-fns lucide-react
npm install -D @tailwindcss/vite tailwindcss

# 3. Copy tất cả files từ Figma Make vào project

# 4. Chạy ứng dụng
npm run dev
```

## 📚 Tài liệu API Backend

Xem chi tiết trong file [API_SPECIFICATION.md](./API_SPECIFICATION.md)

API endpoints cần implement:
- `GET /api/travelers` - Lấy danh sách du khách
- `POST /api/travelers` - Thêm du khách mới
- `PUT /api/travelers/:id` - Cập nhật thông tin
- `DELETE /api/travelers/:id` - Xóa du khách
- `GET /api/travelers/statistics` - Lấy thống kê

## 📝 Danh sách files cần copy

### 1. Core files:
- [ ] `src/App.tsx`
- [ ] `src/types/traveler.ts`
- [ ] `src/data/mockData.ts`

### 2. Components:
- [ ] `src/components/TravelerForm.tsx`
- [ ] `src/components/TravelerTable.tsx`
- [ ] `src/components/SearchBar.tsx`
- [ ] `src/components/StatisticsCards.tsx`

### 3. Documentation:
- [ ] `API_SPECIFICATION.md`
- [ ] `HUONG_DAN_CAI_DAT.md`
- [ ] `README.md`

## 🔗 Kết nối với Java Backend

Sau khi Java backend đã sẵn sàng:

1. Tạo file `src/services/api.ts`
2. Thay thế mock data bằng API calls
3. Update `API_BASE_URL` trong api.ts

Xem chi tiết trong phần "Kết nối Frontend với Backend" của file `API_SPECIFICATION.md`

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
