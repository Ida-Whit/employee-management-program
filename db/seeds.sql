INSERT INTO department (id, department_name)
VALUES (1, "Human Resources"),
        (2, "Sales"),
        (3, "Finance"),
        (4, "Management");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Financial Advisor", 100000, 3),
        (2, "Sales Person", 80000, 2),
        (3, "Head of Finance", 120000, 3),
        (4, "General Manager", 75000, 4),
        (5, "Human Resource Specialist", 60000, 1),
        (6, "Branch Manager", 60000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Kimberly", "Munson", 2, 2),
        (2, "Osborne", "Lucas", 3, 1),
        (3, "Timothy", "Truman", 1, 5),
        (4, "Buck", "Hamilton", 3, 3),
        (5, "Danita", "Snelling", 4, 6),
        (6, "Madoline", "Toller", 4, 4);