# 🔄 Đã chuyển từ MySQL sang PostgreSQL

## ✅ Các thay đổi đã thực hiện

### 1. Backend Configuration

#### `pom.xml`
```xml
<!-- Trước (MySQL) -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
</dependency>

<!-- Sau (PostgreSQL) -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

#### `application.properties`
```properties
# Trước (MySQL)
spring.datasource.url=jdbc:mysql://localhost:3306/immigration_db
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Sau (PostgreSQL)
spring.datasource.url=jdbc:postgresql://localhost:5432/immigration_db
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
```

### 2. Database Schema

#### `database/schema.sql`

| Feature | MySQL | PostgreSQL |
|---------|-------|------------|
| **Auto Increment** | `AUTO_INCREMENT` | `BIGSERIAL` |
| **Integer Type** | `INT` | `INTEGER` |
| **Create DB** | `CREATE DATABASE IF NOT EXISTS` | `CREATE DATABASE ... WITH ENCODING 'UTF8'` |
| **Use DB** | `USE immigration_db;` | `\c immigration_db` (psql) |
| **Engine** | `ENGINE=InnoDB` | Không cần |
| **Charset** | `CHARACTER SET utf8mb4` | `ENCODING 'UTF8'` |
| **Index** | `INDEX idx_name (column)` | `CREATE INDEX idx_name ON table(column)` |
| **Auto Update Timestamp** | `ON UPDATE CURRENT_TIMESTAMP` | `TRIGGER + FUNCTION` |

**PostgreSQL Schema:**
```sql
CREATE TABLE travelers (
    id BIGSERIAL PRIMARY KEY,  -- Thay vì AUTO_INCREMENT
    passport_number VARCHAR(50) NOT NULL UNIQUE,
    -- ... các cột khác
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger để auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_travelers_updated_at
    BEFORE UPDATE ON travelers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 3. Sample Data

#### `database/sample_data.sql`

```sql
-- Trước (MySQL)
USE immigration_db;
TRUNCATE TABLE travelers;
DATE_ADD('2026-04-01', INTERVAL 30 DAY)

-- Sau (PostgreSQL)
\c immigration_db
TRUNCATE TABLE travelers RESTART IDENTITY CASCADE;
'2026-04-01'::date + INTERVAL '30 days'
```

### 4. Tài liệu

Đã cập nhật tất cả file:
- ✅ `backend/README_BACKEND.md`
- ✅ `HUONG_DAN_KET_NOI_FULL_STACK.md`
- ✅ `BAT_DAU_O_DAY.md`
- ✅ `API_SPECIFICATION.md`
- ✅ `README.md`

---

## 🚀 Cài đặt PostgreSQL

### Windows
```bash
# Download: https://www.postgresql.org/download/windows/
# Chạy installer, thiết lập password
# Port mặc định: 5432
```

### macOS
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Linux (Ubuntu)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

---

## 📊 Tạo Database

```bash
# Kết nối PostgreSQL
psql -U postgres

# Tạo database
CREATE DATABASE immigration_db WITH ENCODING 'UTF8';

# Thoát
\q
```

Hoặc:
```bash
psql -U postgres -c "CREATE DATABASE immigration_db WITH ENCODING 'UTF8';"
```

---

## 🗂️ Chạy Schema

```bash
psql -U postgres -d immigration_db -f backend/database/schema.sql
```

---

## 📝 Import Sample Data (Optional)

```bash
psql -U postgres -d immigration_db -f backend/database/sample_data.sql
```

---

## 🔍 PostgreSQL Commands

```bash
# Kết nối database
psql -U postgres -d immigration_db

# Trong psql:
\l                  # List databases
\c immigration_db   # Connect to database
\dt                 # List tables
\d travelers        # Describe table

# Query
SELECT * FROM travelers;
SELECT COUNT(*) FROM travelers;

# Exit
\q
```

---

## ⚠️ Lưu ý quan trọng

### 1. Password
Đổi password trong `application.properties`:
```properties
spring.datasource.password=YOUR_POSTGRES_PASSWORD
```

### 2. Port
- MySQL: 3306
- PostgreSQL: 5432

### 3. Default User
- MySQL: `root`
- PostgreSQL: `postgres`

### 4. Case Sensitivity
PostgreSQL case-sensitive với identifiers (table/column names)

### 5. Data Types
- `INT` → `INTEGER`
- `BIGINT AUTO_INCREMENT` → `BIGSERIAL`
- `DATETIME` → `TIMESTAMP`

---

## 🎯 Checklist Setup

- [ ] Cài PostgreSQL
- [ ] Start PostgreSQL service
- [ ] Tạo database `immigration_db`
- [ ] Chạy `schema.sql`
- [ ] Đổi password trong `application.properties`
- [ ] Chạy backend: `mvn spring-boot:run`
- [ ] Test API: http://localhost:8080/api/travelers
- [ ] Import sample data (optional)

---

## 🆘 Troubleshooting

### Lỗi: "password authentication failed"
```bash
# Reset password
sudo -u postgres psql
ALTER USER postgres PASSWORD 'new_password';
\q
```

### PostgreSQL không chạy
```bash
# macOS
brew services start postgresql@15

# Linux
sudo systemctl start postgresql
sudo systemctl status postgresql

# Windows
# Services → postgresql → Start
```

### Database không tồn tại
```bash
psql -U postgres -c "CREATE DATABASE immigration_db;"
```

### Bảng không tồn tại
```bash
psql -U postgres -d immigration_db -f backend/database/schema.sql
```

---

## ✅ Hoàn tất!

Backend đã chuyển hoàn toàn sang PostgreSQL. Tất cả code và documentation đã được cập nhật.

**Bước tiếp theo:**
1. Cài PostgreSQL
2. Chạy setup theo file: `BAT_DAU_O_DAY.md`
3. Hoặc đọc: `HUONG_DAN_KET_NOI_FULL_STACK.md`
