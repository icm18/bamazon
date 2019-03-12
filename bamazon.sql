CREATE DATABASE bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(255),
department_name VARCHAR(255),
price FLOAT(10,2),
stock_quantity INT
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('table', 'furniture', 100.10, 10),
       ('laptop', 'electronics', 2000.20, 5),
       ('chair', 'furniture', 500.99, 20),
       ('tv', 'entertainment', 500.34, 10),
       ('vhs', 'relics', 10, 3),
       ('map', 'travel', 5, 50),
       ('turntable', 'entertainment', 300, 10),
       ('bed', 'bedding', 1200, 6),
       ('pillow', 'bedding', 15, 30),
       ('cd', 'relics', 8, 1000);
       
       
SELECT item_id, product_name, department_name, price, stock_quantity FROM products

UPDATE products SET stock_quantity = 0 WHERE item_id = 1
  