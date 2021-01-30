

-- Departments increment by 1 if new ones created
INSERT INTO department (id, name)
VALUES (1, "Sales"), (2, "Engineering"), (3, "Finance"), (4, "Legal");

-- Manager Roles (ID from 1-10)
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1), (2, "Lead Engineer", 150000, 2), (3, "Account Manager", 150000, 3), (4, "Legal Team Lead", 190000, 4);

-- Non-Management Roles (ID From 11-20)
INSERT INTO role (id, title, salary, department_id)
VALUES (11, "Salesperson", 80000, 1), (12, "Software Engineer", 120000, 2), (13, "Accountant", 70000, 3), (14, "Lawyer", 120000, 4);

-- Individual Managers
INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (1, "James", "Corden", 1), (2, "Jimmy", "Fallon", 2), (3, "Stephen", "Colbert", 3), (4, "Jimmy", "Kimmel", 4);

-- Individual Employees
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (11, "Jason", "Sudeikis", 11, 1), (12, "Jennie", "Kim", 12, 2), (13, "Roseanne", "Park", 13, 3), (14, "Mark", "Wahlberg", 14, 4);