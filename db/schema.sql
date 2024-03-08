DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE departments (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL
);

CREATE TABLE departmentRoles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_id INT,
    role_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
deptrole_id INT,
manager_id int not null references employees,
FOREIGN KEY (deptrole_id)
REFERENCES departmentRoles(id)
);