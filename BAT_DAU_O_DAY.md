# 🚀 BẮT ĐẦU TẠI ĐÂY!

## 📌 Bạn có gì?

### ✅ FRONTEND (React) - HOÀN THÀNH 100%
- 4 trang đẹp: Dashboard, Travelers, Statistics, Alerts
- Sidebar navigation
- Charts & biểu đồ
- Đang chạy với mock data (dữ liệu giả)

### ✅ BACKEND (Java Spring Boot + PostgreSQL) - CODE HOÀN THÀNH 100%
- Toàn bộ source code trong folder `backend/`
- REST API đầy đủ (6 endpoints)
- Database schema SQL
- Sample data SQL
- **Chỉ cần cài đặt PostgreSQL và chạy!**

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

### 🔵 Option 2: Setup Full Stack (Frontend + Backend + PostgreSQL) - 20-30 phút

**Đọc file này:** [HUONG_DAN_KET_NOI_FULL_STACK.md](./HUONG_DAN_KET_NOI_FULL_STACK.md)

**Tóm tắt các bước:**

#### Bước 1: Cài PostgreSQL

**Windows:**
```bash
# Download: https://www.postgresql.org/download/windows/
# Chạy installer, nhớ password cho user 'postgres'
# Mặc định port: 5432
```

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux:**
```bash
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Bước 2: Tạo database

```bash
psql -U postgres
CREATE DATABASE immigration_db WITH ENCODING 'UTF8';
\q
```

Hoặc:
```bash
psql -U postgres -c "CREATE DATABASE immigration_db WITH ENCODING 'UTF8';"
```

#### Bước 3: Tạo schema (bảng)

```bash
psql -U postgres -d immigration_db -f backend/database/schema.sql
```

#### Bước 4: Config backend

Mở: `backend/src/main/resources/application.properties`

Sửa dòng:
```
spring.datasource.password=postgres
```
→ Thay `postgres` bằng password PostgreSQL của bạn

#### Bước 5: Chạy backend

```bash
cd backend
mvn spring-boot:run
```

Hoặc dùng IDE (IntelliJ/VS Code)

Kiểm tra: http://localhost:8080/api/travelers
→ Nếu thấy JSON → OK!

#### Bước 6: Import sample data (optional)

```bash
psql -U postgres -d immigration_db -f backend/database/sample_data.sql
```

#### Bước 7: Kết nối frontend

1. Mở: `src/app/services/api.ts`
2. Uncomment tất cả code (bỏ `/*` và `*/`)
3. Đổi `API_READY = false` thành `API_READY = true`
4. Cập nhật `TravelerContext.tsx` theo hướng dẫn trong file HUONG_DAN_KET_NOI_FULL_STACK.md

#### Bước 8: Chạy frontend

```bash
npm run dev
```

#### Bước 9: Test

- Thêm du khách mới
- Refresh page → Dữ liệu vẫn còn!
- Check PostgreSQL:
  ```bash
  psql -U postgres -d immigration_db
  SELECT * FROM travelers;
  \q
  ```

✅ HOÀN TẤT!

---

## 📚 Các file hướng dẫn

| File | Nội dung |
|------|----------|
| **[HUONG_DAN_KET_NOI_FULL_STACK.md](./HUONG_DAN_KET_NOI_FULL_STACK.md)** | ⭐ Chi tiết từng bước setup Full Stack |
| [backend/README_BACKEND.md](./backend/README_BACKEND.md) | Chi tiết về backend Java + PostgreSQL |
| [API_SPECIFICATION.md](./API_SPECIFICATION.md) | API reference (đã update PostgreSQL) |
| [README.md](./README.md) | Tổng quan project |

---

## 🆘 Gặp vấn đề?

### PostgreSQL

**Chưa cài PostgreSQL:**
- Windows: https://www.postgresql.org/download/windows/
- macOS: `brew install postgresql@15`
- Linux: `sudo apt install postgresql`

**Quên password:**
```bash
sudo -u postgres psql
ALTER USER postgres PASSWORD 'new_password';
```

**PostgreSQL không chạy:**
```bash
# macOS
brew services start postgresql@15

# Linux
sudo systemctl start postgresql
```

### Backend không chạy

- ❌ Sai password PostgreSQL → Sửa trong `application.properties`
- ❌ Database chưa tạo → Chạy `CREATE DATABASE immigration_db;`
- ❌ Bảng chưa tạo → Chạy `schema.sql`
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
├── 📁 backend/              # Backend Java + PostgreSQL
│   ├── src/main/java/
│   │   └── com/immigration/
│   ├── src/main/resources/
│   │   └── application.properties  # ← Sửa password
│   ├── database/
│   │   ├── schema.sql       # ← PostgreSQL schema
│   │   └── sample_data.sql  # ← Sample data
│   └── pom.xml              # ← PostgreSQL dependency
│
├── 📄 BAT_DAU_O_DAY.md     # ← File này
├── 📄 HUONG_DAN_KET_NOI_FULL_STACK.md  # ← Đọc tiếp
└── 📄 README.md
```

---

## 🎯 Lộ trình đề xuất

### Nếu bạn có 30 phút:
1. ✅ Chạy frontend với mock data (1 phút)
2. ✅ Cài PostgreSQL (5 phút)
3. ✅ Setup database + Backend (10 phút)
4. ✅ Kết nối frontend-backend (10 phút)
5. ✅ Test & demo (5 phút)

### Nếu bạn chỉ có 5 phút:
1. ✅ Chạy frontend: `npm run dev`
2. ✅ Demo với mock data
3. ✅ Nói với thầy: "Backend đã code xong, đang dùng PostgreSQL"

---

## 🎉 Kết quả

Sau khi hoàn thành, bạn có:

✅ Frontend đẹp mắt (4 trang)
✅ Backend Java hoàn chỉnh
✅ Database PostgreSQL
✅ Kết nối real-time
✅ Sẵn sàng demo!

---

## 💡 PostgreSQL vs MySQL

Đã đổi sang PostgreSQL vì:
- ✅ Open source hoàn toàn
- ✅ Performance tốt hơn với large data
- ✅ Hỗ trợ JSON, Array types
- ✅ ACID compliance nghiêm ngặt
- ✅ Phổ biến trong enterprise

---

**Chúc bạn thành công!** 🚀

Nếu cần giúp, đọc file: [HUONG_DAN_KET_NOI_FULL_STACK.md](./HUONG_DAN_KET_NOI_FULL_STACK.md)
