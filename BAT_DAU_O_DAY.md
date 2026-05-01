# 🚀 BẮT ĐẦU TẠI ĐÂY!

## 📌 Bạn có gì?

### ✅ FRONTEND (React) - HOÀN THÀNH 100%
- 4 trang đẹp: Dashboard, Travelers, Statistics, Alerts
- Sidebar navigation
- Charts & biểu đồ
- Đang chạy với mock data (dữ liệu giả)

### ✅ BACKEND (Java Spring Boot) - CODE HOÀN THÀNH 100%
- Toàn bộ source code trong folder `backend/`
- REST API đầy đủ (6 endpoints)
- Database schema SQL
- Sample data SQL
- **Chỉ cần cài đặt và chạy!**

---

## 🎯 Bạn muốn làm gì?

### 🟢 Option 1: Chỉ xem Frontend (Nhanh - 1 phút)

```bash
npm run dev
```

Mở: http://localhost:5173

✅ Tất cả chức năng hoạt động với mock data
✅ Có thể demo ngay cho thầy
❌ Dữ liệu mất khi refresh (không lưu database)

---

### 🔵 Option 2: Setup Full Stack (Frontend + Backend) - 15-30 phút

**Đọc file này:** [HUONG_DAN_KET_NOI_FULL_STACK.md](./HUONG_DAN_KET_NOI_FULL_STACK.md)

**Tóm tắt các bước:**

#### Bước 1: Cài MySQL
```bash
# Download từ: https://dev.mysql.com/downloads/
# Hoặc:
brew install mysql  # macOS
# Thiết lập password cho user root
```

#### Bước 2: Tạo database
```bash
mysql -u root -p
CREATE DATABASE immigration_db;
exit
```

#### Bước 3: Config backend
Mở: `backend/src/main/resources/application.properties`

Sửa dòng:
```
spring.datasource.password=root
```
→ Thay `root` bằng password MySQL của bạn

#### Bước 4: Chạy backend
```bash
cd backend
mvn spring-boot:run
```

Kiểm tra: http://localhost:8080/api/travelers
→ Nếu thấy JSON → OK!

#### Bước 5: Import sample data (optional)
```bash
mysql -u root -p immigration_db < backend/database/sample_data.sql
```

#### Bước 6: Kết nối frontend
1. Mở: `src/app/services/api.ts`
2. Uncomment tất cả code (bỏ `/*` và `*/`)
3. Đổi `API_READY = false` thành `API_READY = true`
4. Cập nhật `TravelerContext.tsx` theo hướng dẫn

#### Bước 7: Chạy frontend
```bash
npm run dev
```

#### Bước 8: Test
- Thêm du khách mới
- Refresh page → Dữ liệu vẫn còn!
- Check MySQL: `SELECT * FROM travelers;`

✅ HOÀN TẤT!

---

## 📚 Các file hướng dẫn

| File | Nội dung |
|------|----------|
| **[HUONG_DAN_KET_NOI_FULL_STACK.md](./HUONG_DAN_KET_NOI_FULL_STACK.md)** | ⭐ Chi tiết từng bước setup Full Stack |
| [backend/README_BACKEND.md](./backend/README_BACKEND.md) | Chi tiết về backend Java |
| [API_SPECIFICATION.md](./API_SPECIFICATION.md) | API reference |
| [README.md](./README.md) | Tổng quan project |

---

## 🆘 Gặp vấn đề?

### Backend không chạy
- ❌ Sai password MySQL → Sửa trong `application.properties`
- ❌ MySQL chưa chạy → Start MySQL service
- ❌ Port 8080 bị chiếm → Đổi port trong config

### Frontend không kết nối
- ❌ Chưa uncomment code trong `api.ts`
- ❌ `API_READY` vẫn = false
- ❌ Backend chưa chạy

### CORS errors
- ❌ Restart backend sau khi sửa CORS config

Xem thêm trong: [HUONG_DAN_KET_NOI_FULL_STACK.md](./HUONG_DAN_KET_NOI_FULL_STACK.md)

---

## 📂 Cấu trúc project

```
📁 immigration-management/
├── 📁 src/app/              # Frontend React
│   ├── App.tsx
│   ├── routes.tsx
│   ├── pages/               # 4 trang chính
│   ├── components/          # UI components
│   ├── services/
│   │   └── api.ts           # ← Uncomment code này
│   └── context/
│       └── TravelerContext.tsx  # ← Cập nhật để dùng API
│
├── 📁 backend/              # Backend Java
│   ├── src/main/java/
│   │   └── com/immigration/
│   ├── src/main/resources/
│   │   └── application.properties  # ← Sửa password MySQL
│   ├── database/
│   │   ├── schema.sql
│   │   └── sample_data.sql
│   └── pom.xml
│
├── 📄 BAT_DAU_O_DAY.md     # ← File này
├── 📄 HUONG_DAN_KET_NOI_FULL_STACK.md  # ← Đọc tiếp
└── 📄 README.md
```

---

## 🎯 Lộ trình đề xuất

### Nếu bạn có 30 phút:
1. ✅ Chạy frontend với mock data (1 phút)
2. ✅ Setup MySQL + Backend (15 phút)
3. ✅ Kết nối frontend-backend (10 phút)
4. ✅ Test & demo (5 phút)

### Nếu bạn chỉ có 5 phút:
1. ✅ Chạy frontend: `npm run dev`
2. ✅ Demo với mock data
3. ✅ Nói với thầy: "Backend đã code xong, chưa deploy"

---

## 🎉 Kết quả

Sau khi hoàn thành, bạn có:

✅ Frontend đẹp mắt (4 trang)
✅ Backend Java hoàn chỉnh
✅ Database MySQL
✅ Kết nối real-time
✅ Sẵn sàng demo!

---

**Chúc bạn thành công!** 🚀

Nếu cần giúp, đọc file: [HUONG_DAN_KET_NOI_FULL_STACK.md](./HUONG_DAN_KET_NOI_FULL_STACK.md)
