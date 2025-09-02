-- Create database
CREATE DATABASE IF NOT EXISTS invoice_db;
USE invoice_db;

CREATE USER IF NOT EXISTS 'dev_user'@'%' IDENTIFIED BY 'dev_password';
GRANT ALL PRIVILEGES ON invoice_db.* TO 'dev_user'@'%';
FLUSH PRIVILEGES;
-- Table: invoices
CREATE TABLE invoices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_number VARCHAR(255) NOT NULL UNIQUE,
  from_name VARCHAR(255) NOT NULL,
  from_address VARCHAR(500) NOT NULL,
  to_name VARCHAR(255) NOT NULL,
  to_address VARCHAR(500) NOT NULL,
  invoice_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: invoice_items
CREATE TABLE invoice_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  qty INT NOT NULL,
  rate DECIMAL(12,2) NOT NULL,
  total DECIMAL(12,2) NOT NULL,
  invoice_id INT NOT NULL,
  CONSTRAINT fk_invoice
    FOREIGN KEY (invoice_id)
    REFERENCES invoices(id)
    ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO invoices (invoice_number, from_name, from_address, to_name, to_address, invoice_date)
VALUES 
('INV-2023-001', 'Acme Corporation', '123 Business St, City, Country', 'John Doe', '456 Client Ave, City, Country', '2023-12-01 10:00:00');

INSERT INTO invoice_items (item_name, qty, rate, total, invoice_id)
VALUES 
('Web Development Services', 10, 100.50, 1005.00, 1),
('UI/UX Design', 5, 200.00, 1000.00, 1);
