DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO produts (product_name, department_name, price, stock_quantity)
VALUES ("Hefty Strong Trash Bag", "HouseHold", 11.99, 50), ("GearLight LED FlashLight", "Safety", 19.99, 20), ("TAG Heuer Men's Watch", "Fashion", 250.00, 10), ("Apple Iphone10 Case", "CP Accessories", 15.00, 45), ("HP Blak Ink Cartrige", "office", 20.00, 15), ("Biginner's Guide to Coding", "Books", 11.99, 4), ("Golf Shoes", "Athletics", 44.99, 6);
