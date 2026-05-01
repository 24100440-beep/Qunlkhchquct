-- Sample data for testing
USE immigration_db;

-- Clear existing data
TRUNCATE TABLE travelers;

-- Insert sample travelers
INSERT INTO travelers (passport_number, full_name, date_of_birth, nationality, entry_date, entry_port, entry_location, entry_reason, max_stay_days, max_stay_date, exit_date, exit_location) VALUES
('US123456789', 'John Smith', '1985-03-15', 'United States', '2026-04-01', 'Noi Bai Airport', 'Hanoi', 'Tourism', 30, DATE_ADD('2026-04-01', INTERVAL 30 DAY), NULL, NULL),
('UK987654321', 'Emma Wilson', '1990-07-22', 'United Kingdom', '2026-04-10', 'Tan Son Nhat Airport', 'Ho Chi Minh City', 'Business', 15, DATE_ADD('2026-04-10', INTERVAL 15 DAY), '2026-04-23', 'Tan Son Nhat Airport'),
('JP456789123', 'Tanaka Yuki', '1988-11-05', 'Japan', '2026-03-20', 'Da Nang Airport', 'Da Nang', 'Tourism', 30, DATE_ADD('2026-03-20', INTERVAL 30 DAY), NULL, NULL),
('FR789456123', 'Marie Dubois', '1992-05-18', 'France', '2026-03-01', 'Noi Bai Airport', 'Hanoi', 'Work', 30, DATE_ADD('2026-03-01', INTERVAL 30 DAY), NULL, NULL),
('AU321654987', 'David Brown', '1987-09-30', 'Australia', '2026-04-15', 'Cam Ranh Airport', 'Nha Trang', 'Tourism', 20, DATE_ADD('2026-04-15', INTERVAL 20 DAY), NULL, NULL),
('DE555888999', 'Hans Mueller', '1980-12-10', 'Germany', '2026-03-10', 'Noi Bai Airport', 'Hanoi', 'Tourism', 30, DATE_ADD('2026-03-10', INTERVAL 30 DAY), NULL, NULL),
('KR777333111', 'Kim Min-ji', '1995-06-25', 'South Korea', '2026-04-20', 'Tan Son Nhat Airport', 'Ho Chi Minh City', 'Tourism', 15, DATE_ADD('2026-04-20', INTERVAL 15 DAY), NULL, NULL),
('CN888222444', 'Li Wei', '1983-09-08', 'China', '2026-04-05', 'Lao Cai Border Gate', 'Lao Cai', 'Business', 7, DATE_ADD('2026-04-05', INTERVAL 7 DAY), '2026-04-11', 'Lao Cai Border Gate'),
('SG999111333', 'Tan Wei Ming', '1991-02-14', 'Singapore', '2026-04-18', 'Phu Quoc Airport', 'Phu Quoc', 'Tourism', 21, DATE_ADD('2026-04-18', INTERVAL 21 DAY), NULL, NULL),
('TH444666888', 'Somchai Patel', '1986-08-30', 'Thailand', '2026-04-12', 'Mong Cai Border Gate', 'Quang Ninh', 'Tourism', 14, DATE_ADD('2026-04-12', INTERVAL 14 DAY), NULL, NULL);

SELECT 'Sample data inserted successfully!' AS message;
SELECT COUNT(*) AS total_travelers FROM travelers;
