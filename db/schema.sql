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

CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id int not null references employees
-- FOREIGN KEY (role_id)
-- REFERENCES DepartmentRoles(id)
);

CREATE TABLE DepartmentRoles (
    -- id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    DepartmentID INT,
    RoleID INT,
    FOREIGN KEY (DepartmentID) REFERENCES departments(id),
    FOREIGN KEY (RoleID) REFERENCES roles(id)
);