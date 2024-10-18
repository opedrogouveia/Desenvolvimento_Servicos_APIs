CREATE DATABASE store;

USE store;

CREATE TABLE product (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,  
    price DOUBLE
);

INSERT INTO product (name, price) VALUES
("Coca-Cola", 8.99),
("Pepsi", 7.95),
("Trakinas", 3.95);