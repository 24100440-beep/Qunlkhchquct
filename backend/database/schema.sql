-- Create database (Run this separately in psql)
-- CREATE DATABASE immigration_db WITH ENCODING 'UTF8';

-- Connect to the database before running the rest
-- \c immigration_db

-- Drop table if exists (for clean reinstall)
DROP TABLE IF EXISTS travelers;

-- Create travelers table
CREATE TABLE travelers (
    id BIGSERIAL PRIMARY KEY,
    passport_number VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    entry_date DATE NOT NULL,
    entry_port VARCHAR(255) NOT NULL,
    entry_location VARCHAR(255) NOT NULL,
    entry_reason VARCHAR(100) NOT NULL,
    max_stay_days INTEGER NOT NULL CHECK (max_stay_days >= 1),
    max_stay_date DATE NOT NULL,
    exit_date DATE NULL,
    exit_location VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_passport ON travelers(passport_number);
CREATE INDEX idx_entry_date ON travelers(entry_date);
CREATE INDEX idx_max_stay_date ON travelers(max_stay_date);
CREATE INDEX idx_exit_date ON travelers(exit_date);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_travelers_updated_at
    BEFORE UPDATE ON travelers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
