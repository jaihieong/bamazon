DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    brand_name VARCHAR(50) NULL,
    dept_name VARCHAR(25) NULL,
    price DECIMAL(10,2) NULL,
    stock_qt INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, brand_name,  dept_name, price, stock_qt)
VALUES 
("iphone", "apple", "smartphones", 1000, 50),
("pixel", "google", "smartphones", 900, 35),
("ipad", "apple", "tablets", 500, 30),
("galaxy 10", "samsung", "smartphones", 1000, 50),
("airpod", "apple", "electronics", 200, 100),
("extra bass", "sony", "electronics", 100, 60),
("apple watch", "apple", "electronics", 350, 100),
("samsung smart watch", "samsung", "electronics", 300, 30),
("Microsoft Surface", "Microsoft", "Laptops", 1200, 25),
("Dell Inspiron", "Dell", "Laptops", 700, 30);
