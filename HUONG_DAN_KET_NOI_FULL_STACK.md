# Hướng dẫn kết nối Frontend React + Backend Java (PostgreSQL)

## 📋 Tổng quan

Bạn hiện có:
- ✅ **Frontend React** - Giao diện web hoàn chỉnh (đang dùng mock data)
- ✅ **Backend Java Spring Boot** - API REST hoàn chỉnh (cần setup)
- ✅ **Database PostgreSQL** - Schema và sample data (cần cài đặt)

## 🚀 Các bước thực hiện

### ⭐ BƯỚC 1: Setup Backend Java + PostgreSQL

#### 1.1. Cài đặt PostgreSQL

**Windows:**
```bash
# Download từ: https://www.postgresql.org/download/windows/
# Chạy installer
# Nhớ password cho user 'postgres'
# Mặc định port: 5432
```

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### 1.2. Tạo database

**Cách 1 - psql command:**
```bash
psql -U postgres

# Trong psql:
CREATE DATABASE immigration_db WITH ENCODING 'UTF8';
\q
```

**Cách 2 - Command trực tiếp:**
```bash
psql -U postgres -c "CREATE DATABASE immigration_db WITH ENCODING 'UTF8';"
```

#### 1.3. Tạo schema (bảng)

```bash
psql -U postgres -d immigration_db -f backend/database/schema.sql
```

#### 1.4. Cấu hình backend

Mở file: `backend/src/main/resources/application.properties`

Sửa dòng:
```properties
spring.datasource.password=postgres
```
Thành password PostgreSQL của bạn!

#### 1.5. Chạy backend

**Cách 1 - Command line:**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**Cách 2 - IntelliJ IDEA:**
- Open folder `backend`
- Right-click `ImmigrationApplication.java` → Run

**Cách 3 - VS Code:**
- Install "Extension Pack for Java"
- Open `ImmigrationApplication.java`
- Click "Run" hoặc F5

#### 1.6. Kiểm tra backend

Mở browser: http://localhost:8080/api/travelers

✅ Nếu thấy JSON `{"success":true,"data":[],...}` → Backend OK!
❌ Nếu lỗi → Xem phần Troubleshooting

---

### ⭐ BƯỚC 2: Import sample data (Optional)

```bash
psql -U postgres -d immigration_db -f backend/database/sample_data.sql
```

Refresh lại: http://localhost:8080/api/travelers
→ Sẽ thấy 10 du khách mẫu

---

### ⭐ BƯỚC 3: Kết nối Frontend với Backend

#### 3.1. Uncomment API code

Mở file: `src/app/services/api.ts`

**Uncomment tất cả code** (bỏ dấu `/*` và `*/`)

Đổi:
```typescript
export const API_READY = false;
```
Thành:
```typescript
export const API_READY = true;
```

#### 3.2. Cập nhật TravelerContext

Mở file: `src/app/context/TravelerContext.tsx`

Thêm import:
```typescript
import * as api from '../services/api';
import { useEffect } from 'react';
```

Sửa state initialization:
```typescript
// Thay:
const [travelers, setTravelers] = useState<Traveler[]>(mockTravelers);

// Thành:
const [travelers, setTravelers] = useState<Traveler[]>([]);
```

Thêm useEffect để load data:
```typescript
useEffect(() => {
  if (api.API_READY) {
    loadTravelers();
  }
}, []);

const loadTravelers = async () => {
  try {
    const data = await api.getAllTravelers();
    setTravelers(data);
  } catch (error) {
    console.error('Error loading travelers:', error);
  }
};
```

Cập nhật addTraveler:
```typescript
const addTraveler = async (data: TravelerFormData) => {
  try {
    if (api.API_READY) {
      await api.createTraveler(data);
      await loadTravelers();
    } else {
      // Mock mode (fallback)
      const maxStayDate = format(
        addDays(new Date(data.entryDate), data.maxStayDays),
        'yyyy-MM-dd'
      );
      const newTraveler: Traveler = {
        id: Date.now().toString(),
        ...data,
        maxStayDate,
      };
      setTravelers([...travelers, newTraveler]);
    }
  } catch (error) {
    console.error('Error adding traveler:', error);
    alert('Lỗi: ' + (error as Error).message);
  }
};
```

Cập nhật updateTraveler:
```typescript
const updateTraveler = async (id: string, data: TravelerFormData) => {
  try {
    if (api.API_READY) {
      await api.updateTraveler(id, data);
      await loadTravelers();
    } else {
      // Mock mode (fallback)
      const maxStayDate = format(
        addDays(new Date(data.entryDate), data.maxStayDays),
        'yyyy-MM-dd'
      );
      setTravelers(
        travelers.map((t) =>
          t.id === id ? { ...t, ...data, maxStayDate } : t
        )
      );
    }
  } catch (error) {
    console.error('Error updating traveler:', error);
    alert('Lỗi: ' + (error as Error).message);
  }
};
```

Cập nhật deleteTraveler:
```typescript
const deleteTraveler = async (id: string) => {
  try {
    if (api.API_READY) {
      await api.deleteTraveler(id);
      await loadTravelers();
    } else {
      // Mock mode (fallback)
      setTravelers(travelers.filter((t) => t.id !== id));
    }
  } catch (error) {
    console.error('Error deleting traveler:', error);
    alert('Lỗi: ' + (error as Error).message);
  }
};
```

---

### ⭐ BƯỚC 4: Test kết nối

#### 4.1. Chạy cả Frontend và Backend

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```
→ Chạy tại: http://localhost:8080

**Terminal 2 - Frontend:**
```bash
npm run dev
```
→ Chạy tại: http://localhost:5173

#### 4.2. Test chức năng

1. Mở http://localhost:5173
2. Click "Thêm du khách mới"
3. Nhập thông tin và Submit
4. Kiểm tra:
   - ✅ Du khách xuất hiện trong bảng
   - ✅ Refresh page → Dữ liệu vẫn còn (không mất)
   - ✅ Check database:
     ```bash
     psql -U postgres -d immigration_db
     SELECT * FROM travelers;
     ```

#### 4.3. Test API với Postman (Optional)

**GET - Lấy tất cả:**
```
GET http://localhost:8080/api/travelers
```

**POST - Thêm mới:**
```
POST http://localhost:8080/api/travelers
Content-Type: application/json

{
  "passportNumber": "TEST123",
  "fullName": "Test User",
  "dateOfBirth": "1990-01-01",
  "nationality": "Vietnam",
  "entryDate": "2026-05-01",
  "entryPort": "Noi Bai Airport",
  "entryLocation": "Hanoi",
  "entryReason": "Tourism",
  "maxStayDays": 30
}
```

**PUT - Cập nhật:**
```
PUT http://localhost:8080/api/travelers/1
Content-Type: application/json

{
  "passportNumber": "TEST123",
  "fullName": "Test User Updated",
  "dateOfBirth": "1990-01-01",
  "nationality": "Vietnam",
  "entryDate": "2026-05-01",
  "entryPort": "Noi Bai Airport",
  "entryLocation": "Hanoi",
  "entryReason": "Tourism",
  "maxStayDays": 30
}
```

**DELETE - Xóa:**
```
DELETE http://localhost:8080/api/travelers/1
```

---

## 🎯 Checklist hoàn thành

- [ ] PostgreSQL đã cài đặt và chạy
- [ ] Database `immigration_db` đã tạo
- [ ] Schema (bảng travelers) đã tạo
- [ ] Backend Java chạy thành công tại port 8080
- [ ] API test OK: http://localhost:8080/api/travelers
- [ ] Sample data đã import (optional)
- [ ] File `api.ts` đã uncomment
- [ ] `API_READY = true` trong api.ts
- [ ] TravelerContext đã cập nhật để dùng API
- [ ] Frontend chạy tại port 5173
- [ ] Test thêm/sửa/xóa du khách thành công
- [ ] Dữ liệu lưu vào database và không mất khi refresh

---

## ❗ Troubleshooting

### Backend không chạy

**Lỗi: "password authentication failed"**
→ Sai password PostgreSQL trong `application.properties`
→ Reset: `psql -U postgres` → `ALTER USER postgres PASSWORD 'new_password';`

**Lỗi: "Connection refused"**
→ PostgreSQL chưa chạy
→ Start:
```bash
# macOS
brew services start postgresql@15

# Linux
sudo systemctl start postgresql

# Windows - Services → postgresql
```

**Lỗi: "database 'immigration_db' does not exist"**
→ Chưa tạo database
→ Chạy: `psql -U postgres -c "CREATE DATABASE immigration_db;"`

**Lỗi: "Port 8080 already in use"**
→ Đổi port trong `application.properties`: `server.port=8081`
→ Nhớ đổi URL trong `api.ts` thành `http://localhost:8081/api`

**Lỗi: "relation 'travelers' does not exist"**
→ Chưa chạy schema.sql
→ Chạy: `psql -U postgres -d immigration_db -f backend/database/schema.sql`

### Frontend không kết nối được Backend

**Lỗi CORS:**
→ Kiểm tra `CorsConfig.java` có đúng origins không
→ Restart backend

**Lỗi "Failed to fetch":**
→ Backend chưa chạy hoặc chạy sai port
→ Kiểm tra URL trong `api.ts`

**Dữ liệu không hiển thị:**
→ Kiểm tra console log xem có lỗi không
→ Kiểm tra `API_READY = true` trong api.ts
→ Kiểm tra useEffect đã gọi loadTravelers() chưa

**Lỗi: "Cannot find module 'api'"**
→ Import sai path
→ Phải: `import * as api from '../services/api';`

---

## 📁 Cấu trúc project hoàn chỉnh

```
immigration-management/
├── frontend/                    (React app)
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.tsx
│   │   │   ├── routes.tsx
│   │   │   ├── context/
│   │   │   │   └── TravelerContext.tsx  ← Cập nhật để dùng API
│   │   │   ├── services/
│   │   │   │   └── api.ts               ← Uncomment code này
│   │   │   ├── pages/
│   │   │   └── components/
│   │   └── ...
│   └── package.json
│
└── backend/                     (Java Spring Boot)
    ├── src/main/java/com/immigration/
    │   ├── ImmigrationApplication.java
    │   ├── config/
    │   ├── controller/
    │   ├── dto/
    │   ├── entity/
    │   ├── exception/
    │   ├── repository/
    │   └── service/
    ├── src/main/resources/
    │   └── application.properties       ← Sửa PostgreSQL password
    ├── database/
    │   ├── schema.sql                   ← Chạy file này
    │   └── sample_data.sql              ← Optional
    └── pom.xml
```

---

## 📝 PostgreSQL Cheat Sheet

```bash
# Kết nối database
psql -U postgres -d immigration_db

# List databases
\l

# Switch database
\c immigration_db

# List tables
\dt

# Describe table
\d travelers

# Query
SELECT * FROM travelers;

# Count
SELECT COUNT(*) FROM travelers;

# Exit
\q
```

---

## 🎉 Kết quả cuối cùng

Sau khi hoàn thành, bạn sẽ có:

✅ **Backend API** chạy tại `http://localhost:8080`
- 6 REST endpoints hoàn chỉnh
- Kết nối PostgreSQL
- Validation & Error handling
- CORS enabled

✅ **Frontend React** chạy tại `http://localhost:5173`
- 4 trang: Dashboard, Travelers, Statistics, Alerts
- Navigation sidebar
- Charts & statistics
- Kết nối real-time với backend

✅ **Database PostgreSQL**
- Bảng travelers với đầy đủ indexes
- Auto-increment ID (BIGSERIAL)
- Triggers cho updated_at
- Sample data để demo

---

**Sẵn sàng demo cho thầy!** 🚀

Nếu có vấn đề, xem file `backend/README_BACKEND.md` để biết thêm chi tiết!
