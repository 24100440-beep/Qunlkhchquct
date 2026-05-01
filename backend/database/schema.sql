-- Create database
CREATE DATABASE IF NOT EXISTS immigration_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE immigration_db;

-- Create travelers table
CREATE TABLE IF NOT EXISTS travelers (
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
    INDEX idx_max_stay_date (max_stay_date),
    INDEX idx_exit_date (exit_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
