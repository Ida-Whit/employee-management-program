INSERT INTO department (department_name)
VALUES ("Human Resources"),
        ("Sales"),
        ("Finance"),
        ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Financial Advisor", 100000, 3),
        ("Sales Person", 80000, 2),
        ("Head of Finance", 120000, 3),
        ("General Manager", 75000, 4),
        ("Human Resource Specialist", 60000, 1),
        ("Branch Manager", 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kimberly", "Munson", 2, 2),
        ("Osborne", "Lucas", 3, 1),
        ("Timothy", "Truman", 1, 5),
        ("Buck", "Hamilton", 3, 3),
        ("Danita", "Snelling", 4, 6),
        ("Madoline", "Toller", 4, 4);