DROP DATABASE IF EXISTS employee_management_db;

CREATE DATABASE employee_management_db;

USE employee_management_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL
);

SELECT employee.first_name,
      employee.last_name,
      employee.manager_id,
      role.title,
      role.salary,
      department.department_name
FROM employee
JOIN role 
ON role_id
JOIN department
on role.department_id=department_id