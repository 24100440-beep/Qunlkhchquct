# API Specification - Hệ thống quản lý xuất nhập cảnh

## Tổng quan

Tài liệu này mô tả các API endpoints mà Java backend cần implement để kết nối với React frontend.

**Base URL**: `http://localhost:8080/api`

**Content-Type**: `application/json`

**CORS**: Cần enable CORS để cho phép frontend (chạy trên port khác) kết nối được.

---

## Data Models

### Traveler Object

```json
{
  "id": "string (UUID hoặc auto-increment)",
  "passportNumber": "string (required, unique)",
  "fullName": "string (required)",
  "dateOfBirth": "string (ISO 8601 date: yyyy-MM-dd, required)",
  "nationality": "string (required)",
  "entryDate": "string (ISO 8601 date: yyyy-MM-dd, required)",
  "entryPort": "string (required)",
  "entryLocation": "string (required)",
  "entryReason": "string (required)",
  "maxStayDays": "number (integer, required, min: 1)",
  "maxStayDate": "string (ISO 8601 date: yyyy-MM-dd, calculated: entryDate + maxStayDays)",
  "exitDate": "string | null (ISO 8601 date: yyyy-MM-dd, optional)",
  "exitLocation": "string | null (optional)"
}
```

### Response Format

#### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Thành công"
}
```

#### Error Response
```json
{
  "success": false,
  "error": "Chi tiết lỗi",
  "message": "Thông báo lỗi"
}
```

---

## API Endpoints

### 1. Lấy danh sách tất cả du khách

**GET** `/travelers`

**Query Parameters:**
- `name` (optional): Tìm kiếm theo tên hoặc số hộ chiếu
- `entryDate` (optional): Lọc theo ngày nhập cảnh (yyyy-MM-dd)
- `status` (optional): `active` | `exited` | `overstay` | `critical`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "passportNumber": "US123456789",
      "fullName": "John Smith",
      "dateOfBirth": "1985-03-15",
      "nationality": "United States",
      "entryDate": "2026-04-01",
      "entryPort": "Noi Bai Airport",
      "entryLocation": "Hanoi",
      "entryReason": "Tourism",
      "maxStayDays": 30,
      "maxStayDate": "2026-05-01",
      "exitDate": null,
      "exitLocation": null
    }
  ],
  "total": 1
}
```

---

### 2. Lấy thông tin một du khách

**GET** `/travelers/{id}`

**Path Parameters:**
- `id`: ID của du khách

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "passportNumber": "US123456789",
    ...
  }
}
```

**Error (404):**
```json
{
  "success": false,
  "error": "Không tìm thấy du khách",
  "message": "Traveler not found"
}
```

---

### 3. Thêm du khách mới

**POST** `/travelers`

**Request Body:**
```json
{
  "passportNumber": "US123456789",
  "fullName": "John Smith",
  "dateOfBirth": "1985-03-15",
  "nationality": "United States",
  "entryDate": "2026-04-01",
  "entryPort": "Noi Bai Airport",
  "entryLocation": "Hanoi",
  "entryReason": "Tourism",
  "maxStayDays": 30,
  "exitDate": null,
  "exitLocation": null
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "passportNumber": "US123456789",
    "maxStayDate": "2026-05-01",
    ...
  },
  "message": "Thêm du khách thành công"
}
```

**Validation Rules:**
- `passportNumber`: Không được trùng
- `dateOfBirth`: Phải là ngày hợp lệ trong quá khứ
- `entryDate`: Phải là ngày hợp lệ
- `maxStayDays`: >= 1
- `maxStayDate`: Tự động tính = entryDate + maxStayDays

**Error (400):**
```json
{
  "success": false,
  "error": "Số hộ chiếu đã tồn tại",
  "message": "Passport number already exists"
}
```

---

### 4. Cập nhật thông tin du khách

**PUT** `/travelers/{id}`

**Path Parameters:**
- `id`: ID của du khách

**Request Body:** (giống POST)
```json
{
  "passportNumber": "US123456789",
  "fullName": "John Smith Updated",
  ...
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "123",
    ...
  },
  "message": "Cập nhật thành công"
}
```

---

### 5. Xóa du khách

**DELETE** `/travelers/{id}`

**Path Parameters:**
- `id`: ID của du khách

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Xóa du khách thành công"
}
```

**Error (404):**
```json
{
  "success": false,
  "error": "Không tìm thấy du khách",
  "message": "Traveler not found"
}
```

---

### 6. Lấy thống kê

**GET** `/travelers/statistics`

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 100,
    "active": 45,
    "exited": 55,
    "overstay": 10,
    "critical": 3
  }
}
```

**Giải thích:**
- `total`: Tổng số du khách
- `active`: Đang lưu trú (chưa xuất cảnh)
- `exited`: Đã xuất cảnh
- `overstay`: Đang lưu trú quá hạn (today > maxStayDate && exitDate == null)
- `critical`: Lưu trú quá hạn > 7 ngày (today - maxStayDate > 7)

---

## Database Schema (Đề xuất)

### Table: travelers

```sql
CREATE TABLE travelers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    passport_number VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    entry_date DATE NOT NULL,
    entry_port VARCHAR(255) NOT NULL,
    entry_location VARCHAR(255) NOT NULL,
    entry_reason VARCHAR(100) NOT NULL,
    max_stay_days INT NOT NULL CHECK (max_stay_days >= 1),
    max_stay_date DATE NOT NULL,
    exit_date DATE NULL,
    exit_location VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_passport (passport_number),
    INDEX idx_entry_date (entry_date),
    INDEX idx_max_stay_date (max_stay_date)
);
```

---

## Cấu hình Java Backend (Gợi ý)

### Công nghệ đề xuất:
- **Framework**: Spring Boot 3.x
- **Database**: MySQL 8.x hoặc PostgreSQL
- **ORM**: Spring Data JPA / Hibernate
- **API Documentation**: Swagger / OpenAPI 3.0
- **Build Tool**: Maven hoặc Gradle

### Dependencies cần thiết (Maven):

```xml
<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- Spring Boot Starter Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- MySQL Driver -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
    </dependency>

    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>

    <!-- Lombok (Optional) -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

### application.properties:

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/immigration_management
spring.datasource.username=root
spring.datasource.password=yourpassword

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
```

---

## Cấu trúc project Java (Đề xuất)

```
src/main/java/com/example/immigration/
├── ImmigrationApplication.java
├── config/
│   └── CorsConfig.java
├── controller/
│   └── TravelerController.java
├── dto/
│   ├── TravelerDTO.java
│   └── StatisticsDTO.java
├── entity/
│   └── Traveler.java
├── repository/
│   └── TravelerRepository.java
├── service/
│   ├── TravelerService.java
│   └── TravelerServiceImpl.java
└── exception/
    ├── ResourceNotFoundException.java
    └── GlobalExceptionHandler.java
```

---

## Ví dụ code Java (Controller)

```java
@RestController
@RequestMapping("/api/travelers")
@CrossOrigin(origins = "*")
public class TravelerController {

    @Autowired
    private TravelerService travelerService;

    @GetMapping
    public ResponseEntity<?> getAllTravelers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String entryDate,
            @RequestParam(required = false) String status) {
        
        List<Traveler> travelers = travelerService.findAll(name, entryDate, status);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", travelers);
        response.put("total", travelers.size());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> createTraveler(@Valid @RequestBody TravelerDTO dto) {
        Traveler traveler = travelerService.create(dto);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", traveler);
        response.put("message", "Thêm du khách thành công");
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTraveler(
            @PathVariable Long id, 
            @Valid @RequestBody TravelerDTO dto) {
        
        Traveler traveler = travelerService.update(id, dto);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", traveler);
        response.put("message", "Cập nhật thành công");
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTraveler(@PathVariable Long id) {
        travelerService.delete(id);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Xóa du khách thành công");
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/statistics")
    public ResponseEntity<?> getStatistics() {
        Map<String, Integer> stats = travelerService.getStatistics();
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", stats);
        
        return ResponseEntity.ok(response);
    }
}
```

---

## Kết nối Frontend với Backend

Sau khi Java backend đã sẵn sàng, cần thay đổi các file sau trong React frontend:

### 1. Tạo file API service

**File: `src/app/services/api.ts`**

```typescript
const API_BASE_URL = 'http://localhost:8080/api';

export async function getAllTravelers(name?: string, entryDate?: string) {
  const params = new URLSearchParams();
  if (name) params.append('name', name);
  if (entryDate) params.append('entryDate', entryDate);
  
  const response = await fetch(`${API_BASE_URL}/travelers?${params}`);
  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error);
  }
  
  return result.data;
}

export async function createTraveler(data: TravelerFormData) {
  const response = await fetch(`${API_BASE_URL}/travelers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error);
  }
  
  return result.data;
}

export async function updateTraveler(id: string, data: TravelerFormData) {
  const response = await fetch(`${API_BASE_URL}/travelers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error);
  }
  
  return result.data;
}

export async function deleteTraveler(id: string) {
  const response = await fetch(`${API_BASE_URL}/travelers/${id}`, {
    method: 'DELETE',
  });
  
  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error);
  }
  
  return true;
}
```

### 2. Cập nhật App.tsx

Thay thế mock data bằng API calls:

```typescript
// Thay đổi từ:
const [travelers, setTravelers] = useState<Traveler[]>(mockTravelers);

// Thành:
const [travelers, setTravelers] = useState<Traveler[]>([]);

useEffect(() => {
  loadTravelers();
}, []);

const loadTravelers = async () => {
  try {
    const data = await getAllTravelers();
    setTravelers(data);
  } catch (error) {
    console.error('Error loading travelers:', error);
  }
};

const handleAddTraveler = async (data: TravelerFormData) => {
  try {
    await createTraveler(data);
    await loadTravelers();
    setShowForm(false);
  } catch (error) {
    alert('Lỗi: ' + error.message);
  }
};
```

---

## Testing

### Test với Postman:

1. **GET All Travelers**
   - URL: `http://localhost:8080/api/travelers`
   - Method: GET

2. **POST Create Traveler**
   - URL: `http://localhost:8080/api/travelers`
   - Method: POST
   - Body (JSON):
   ```json
   {
     "passportNumber": "TEST123456",
     "fullName": "Test User",
     "dateOfBirth": "1990-01-01",
     "nationality": "Vietnam",
     "entryDate": "2026-04-23",
     "entryPort": "Noi Bai Airport",
     "entryLocation": "Hanoi",
     "entryReason": "Tourism",
     "maxStayDays": 30
   }
   ```

3. **PUT Update Traveler**
   - URL: `http://localhost:8080/api/travelers/1`
   - Method: PUT
   - Body: (giống POST)

4. **DELETE Traveler**
   - URL: `http://localhost:8080/api/travelers/1`
   - Method: DELETE

---

## Notes

- Tất cả dates sử dụng format ISO 8601: `yyyy-MM-dd`
- `maxStayDate` được tính tự động ở backend: `entryDate + maxStayDays`
- Cần validate `passportNumber` unique
- Enable CORS để frontend có thể gọi API
- Sử dụng HTTP status codes chuẩn (200, 201, 400, 404, 500)
- Implement pagination nếu dữ liệu lớn

---

**Chúc bạn thành công trong việc implement Java backend!**
