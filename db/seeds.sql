INSERT INTO department (department_name)
VALUES ("Human Resources"),
        ("Administration"),
        ("Finance"),
        ("Management"),
        ("Customer Service"),
        ("Operations");

INSERT INTO role (title, salary, department_id)
VALUES ("HR Management", 80000, 4),
        ("HR Coordinator", 65000, 1),
        ("Benefits Admin.", 60000, 1),
        ("Office Manager", 70000 , 4),
        ("Data Entry Clerk", 55000, 2),
        ("Administrative Assistant", 55000, 2),
        ("Financial Advisor", 100000, 3),
        ("Sales Person", 80000, 3),
        ("Head of Finance", 120000, 3),
        ("General Manager", 120000, 4),
        ("Branch Manager", 100000, 4),
        ("Customer Service Rep.", 50000, 5),
        ("Project Manager", 80000, 5),
        ("Field Technician", 55000, 6),
        ("Foreman", 90000, 6),
        ("Operations Manager", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kimberly", "Munson", 10, null),
        ("Osborne", "Lucas", 4, 11),
        ("Timothy", "Truman", 13, 11),
        ("Buck", "Hamilton", 8, 11),
        ("Danita", "Snelling", 13, 11),
        ("Madoline", "Toller", 15, 16),
        ("Storm", "Shaw", 8, 11),
        ("Brady ", "Regana", 16, 11),
        ("Jeannie", "Chandler", 11, 10),
        ("Allen", "Ed", 14, 16),
        ("Mandy", "Jessie", 9, null),
        ("Lauren", "Victor", 14, 16),
        ("Marge", "Skyler", 14, 16),
        ("Hilda", "Ronan", 12, 11);