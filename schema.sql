DROP DATABASE IF EXISTS employee_listDB;
CREATE DATABASE employee_listDB;

USE employee_listDB;

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10,4),
    -- department_id INT referencing department role belongs to
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    -- role_id INT reference to role employee has
    -- manager_id INT refer3ence to another employee that manages the employee being created. if no manager = null
)