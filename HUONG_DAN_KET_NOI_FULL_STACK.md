# Hướng dẫn kết nối Frontend React + Backend Java

## 📋 Tổng quan

Bạn hiện có:
- ✅ **Frontend React** - Giao diện web hoàn chỉnh (đang dùng mock data)
- ✅ **Backend Java Spring Boot** - API REST hoàn chỉnh (cần setup)
- ✅ **Database MySQL** - Schema và sample data (cần cài đặt)

## 🚀 Các bước thực hiện

### ⭐ BƯỚC 1: Setup Backend Java + MySQL

#### 1.1. Cài đặt MySQL
```bash
# Windows: Download từ https://dev.mysql.com/downloads/installer/
# macOS:
brew install mysql
brew services start mysql

# Linux:
sudo apt install mysql-server
sudo systemctl start mysql
```

#### 1.2. Tạo database
```bash
mysql -u root -p
# Nhập password, sau đó:
CREATE DATABASE immigration_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit
```

**HOẶC** chạy file SQL:
```bash
mysql -u root -p < backend/database/schema.sql
```

#### 1.3. Cấu hình backend

Mở file: `backend/src/main/resources/application.properties`

Sửa dòng:
```properties
spring.datasource.password=root
```
Thành password MySQL của bạn!

#### 1.4. Chạy backend

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

#### 1.5. Kiểm tra backend

Mở browser: http://localhost:8080/api/travelers

✅ Nếu thấy JSON → Backend OK!
❌ Nếu lỗi → Xem phần Troubleshooting

---

### ⭐ BƯỚC 2: Import sample data (Optional)

```bash
mysql -u root -p immigration_db < backend/database/sample_data.sql
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
      // Mock mode
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

Tương tự cho updateTraveler và deleteTraveler.

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
   - ✅ Check database: `SELECT * FROM travelers;`

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
  ...
}
```

**DELETE - Xóa:**
```
DELETE http://localhost:8080/api/travelers/1
```

---

## 🎯 Checklist hoàn thành

- [ ] MySQL đã cài đặt và chạy
- [ ] Database `immigration_db` đã tạo
- [ ] Backend Java chạy thành công tại port 8080
- [ ] API test OK: http://localhost:8080/api/travelers
- [ ] Sample data đã import (optional)
- [ ] File `api.ts` đã uncomment
- [ ] TravelerContext đã cập nhật để dùng API
- [ ] Frontend chạy tại port 5173
- [ ] Test thêm/sửa/xóa du khách thành công
- [ ] Dữ liệu lưu vào database và không mất khi refresh

---

## ❗ Troubleshooting

### Backend không chạy

**Lỗi: "Access denied for user 'root'"**
→ Sai password MySQL trong `application.properties`

**Lỗi: "Communications link failure"**
→ MySQL chưa chạy. Chạy: `mysql -u root -p`

**Lỗi: "Port 8080 already in use"**
→ Đổi port trong `application.properties`: `server.port=8081`
→ Nhớ đổi URL trong `api.ts` thành `http://localhost:8081/api`

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
    │   └── application.properties       ← Sửa MySQL password
    ├── database/
    │   ├── schema.sql
    │   └── sample_data.sql
    └── pom.xml
```

---

## 🎉 Kết quả cuối cùng

Sau khi hoàn thành, bạn sẽ có:

✅ **Backend API** chạy tại `http://localhost:8080`
- 6 REST endpoints hoàn chỉnh
- Kết nối MySQL
- Validation & Error handling
- CORS enabled

✅ **Frontend React** chạy tại `http://localhost:5173`
- 4 trang: Dashboard, Travelers, Statistics, Alerts
- Navigation sidebar
- Charts & statistics
- Kết nối real-time với backend

✅ **Database MySQL**
- Bảng travelers với đầy đủ indexes
- Sample data để demo

---

**Sẵn sàng demo cho thầy!** 🚀

Nếu có vấn đề, xem file `backend/README_BACKEND.md` để biết thêm chi tiết!
