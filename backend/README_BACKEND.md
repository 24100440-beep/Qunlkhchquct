# Immigration Management System - Backend (Java Spring Boot)

## 🚀 Yêu cầu hệ thống

- **Java**: JDK 17 hoặc cao hơn
- **Maven**: 3.6+ (hoặc dùng Maven wrapper đã có sẵn)
- **MySQL**: 8.0+ hoặc MariaDB 10.5+
- **IDE**: IntelliJ IDEA, Eclipse, hoặc VS Code với Java Extension Pack

## 📁 Cấu trúc project

```
backend/
├── src/main/java/com/immigration/
│   ├── ImmigrationApplication.java          # Main class
│   ├── config/
│   │   └── CorsConfig.java                  # CORS configuration
│   ├── controller/
│   │   └── TravelerController.java          # REST API endpoints
│   ├── dto/
│   │   ├── TravelerDTO.java                 # Data Transfer Object
│   │   ├── ApiResponse.java                 # Wrapper response
│   │   └── StatisticsDTO.java               # Statistics data
│   ├── entity/
│   │   └── Traveler.java                    # JPA Entity
│   ├── exception/
│   │   ├── ResourceNotFoundException.java
│   │   ├── DuplicateResourceException.java
│   │   └── GlobalExceptionHandler.java      # Global error handler
│   ├── repository/
│   │   └── TravelerRepository.java          # JPA Repository
│   └── service/
│       ├── TravelerService.java             # Service interface
│       └── impl/
│           └── TravelerServiceImpl.java     # Service implementation
├── src/main/resources/
│   └── application.properties               # Configuration
├── database/
│   ├── schema.sql                           # Database schema
│   └── sample_data.sql                      # Sample data
└── pom.xml                                  # Maven dependencies
```

## 🔧 Hướng dẫn cài đặt

### Bước 1: Cài đặt MySQL

#### Windows:
1. Download MySQL từ: https://dev.mysql.com/downloads/installer/
2. Cài đặt và thiết lập password cho user `root`

#### macOS:
```bash
brew install mysql
brew services start mysql
```

#### Linux (Ubuntu):
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

### Bước 2: Tạo database

Mở MySQL command line hoặc MySQL Workbench và chạy:

```sql
CREATE DATABASE immigration_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**HOẶC** chạy file SQL:
```bash
mysql -u root -p < backend/database/schema.sql
```

### Bước 3: Cấu hình database connection

Mở file `backend/src/main/resources/application.properties` và chỉnh sửa:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/immigration_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD_HERE
```

**Thay `YOUR_MYSQL_PASSWORD_HERE` bằng password MySQL của bạn!**

### Bước 4: Chạy ứng dụng

#### Cách 1: Dùng Maven (command line)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

#### Cách 2: Dùng Maven Wrapper (không cần cài Maven)

**Windows:**
```bash
cd backend
.\mvnw.cmd clean install
.\mvnw.cmd spring-boot:run
```

**macOS/Linux:**
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

#### Cách 3: Dùng IntelliJ IDEA

1. Mở IntelliJ IDEA
2. File → Open → Chọn thư mục `backend`
3. Đợi Maven import dependencies
4. Right-click `ImmigrationApplication.java` → Run

#### Cách 4: Dùng VS Code

1. Cài extension: "Extension Pack for Java"
2. Mở thư mục `backend`
3. Mở file `ImmigrationApplication.java`
4. Click "Run" hoặc F5

### Bước 5: Kiểm tra API

Sau khi chạy thành công, bạn sẽ thấy:

```
==============================================
Immigration Management System Started!
API URL: http://localhost:8080/api
==============================================
```

**Test API bằng Postman hoặc Browser:**

```
GET http://localhost:8080/api/travelers
```

Nếu thấy response JSON → Backend đã chạy thành công! ✅

## 📊 Import dữ liệu mẫu (Optional)

Để có dữ liệu demo ngay:

```bash
mysql -u root -p immigration_db < backend/database/sample_data.sql
```

Sau đó refresh API, bạn sẽ thấy 10 du khách mẫu.

## 🔌 API Endpoints

### 1. Lấy tất cả du khách
```
GET http://localhost:8080/api/travelers
```

### 2. Tìm kiếm du khách
```
GET http://localhost:8080/api/travelers?name=John
GET http://localhost:8080/api/travelers?entryDate=2026-04-01
```

### 3. Lấy thông tin 1 du khách
```
GET http://localhost:8080/api/travelers/1
```

### 4. Thêm du khách mới
```
POST http://localhost:8080/api/travelers
Content-Type: application/json

{
  "passportNumber": "VN123456789",
  "fullName": "Nguyen Van A",
  "dateOfBirth": "1990-01-01",
  "nationality": "Vietnam",
  "entryDate": "2026-05-01",
  "entryPort": "Noi Bai Airport",
  "entryLocation": "Hanoi",
  "entryReason": "Tourism",
  "maxStayDays": 30
}
```

### 5. Cập nhật du khách
```
PUT http://localhost:8080/api/travelers/1
Content-Type: application/json

{
  "passportNumber": "VN123456789",
  "fullName": "Nguyen Van A Updated",
  ...
}
```

### 6. Xóa du khách
```
DELETE http://localhost:8080/api/travelers/1
```

### 7. Lấy thống kê
```
GET http://localhost:8080/api/travelers/statistics
```

## 🌐 Kết nối với Frontend React

Sau khi backend chạy thành công tại `http://localhost:8080`, tạo file API service cho frontend:

### File: `src/app/services/api.ts`

```typescript
const API_BASE_URL = 'http://localhost:8080/api';

export async function getAllTravelers() {
  const response = await fetch(`${API_BASE_URL}/travelers`);
  const result = await response.json();
  return result.data;
}

export async function createTraveler(data: any) {
  const response = await fetch(`${API_BASE_URL}/travelers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.error);
  return result.data;
}

export async function updateTraveler(id: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/travelers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.error);
  return result.data;
}

export async function deleteTraveler(id: string) {
  const response = await fetch(`${API_BASE_URL}/travelers/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.error);
}

export async function getStatistics() {
  const response = await fetch(`${API_BASE_URL}/travelers/statistics`);
  const result = await response.json();
  return result.data;
}
```

### Cập nhật TravelerContext.tsx

Thay mock data bằng API calls:

```typescript
// Thay vì useState(mockTravelers), load từ API
useEffect(() => {
  loadTravelers();
}, []);

const loadTravelers = async () => {
  try {
    const data = await getAllTravelers();
    setTravelers(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const addTraveler = async (data: TravelerFormData) => {
  try {
    await createTraveler(data);
    await loadTravelers(); // Reload list
  } catch (error) {
    alert('Lỗi: ' + error.message);
  }
};
```

## ❗ Troubleshooting

### Lỗi: "Access denied for user 'root'@'localhost'"
- Kiểm tra password MySQL trong `application.properties`
- Reset password MySQL nếu cần

### Lỗi: "Communications link failure"
- Kiểm tra MySQL đã chạy chưa: `mysql -u root -p`
- Kiểm tra port 3306 có bị block không

### Lỗi: "Table 'travelers' doesn't exist"
- Chạy lại file `schema.sql`
- Hoặc thay `spring.jpa.hibernate.ddl-auto=update` thành `create` (1 lần)

### Lỗi: Port 8080 already in use
- Đổi port trong `application.properties`: `server.port=8081`
- Hoặc kill process đang dùng port 8080

### CORS errors từ frontend
- Kiểm tra `CorsConfig.java` đã có origins đúng chưa
- Restart backend sau khi sửa config

## 📝 Notes

- Backend tự động tạo bảng khi chạy lần đầu (ddl-auto=update)
- `maxStayDate` được tính tự động: entryDate + maxStayDays
- Validation tự động check passport number unique
- Tất cả dates dùng format: `yyyy-MM-dd`

## 🎉 Hoàn tất!

Bây giờ bạn có:
✅ Backend Java Spring Boot chạy tại: `http://localhost:8080`
✅ Frontend React chạy tại: `http://localhost:5173`
✅ Database MySQL với sample data

**Ready to demo cho thầy!** 🚀
