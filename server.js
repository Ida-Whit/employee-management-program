//Import inquirer, SQL, and express
const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

//Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_management_db'
  },
  console.log(`Connected to the employee_management_db database.`)
);

//Inquirer function to allow user to interact with management system.
function init() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'answer',
        choices:
          ['View all departments.',
            'View all roles.',
            'View all employees.',
            'Add a department.',
            'Add a role.',
            'Add an employee.',
            'Update an employee role.',
            'Exit.']
      }
    ]).then((response) => {
      switch (response.answer) {
        case 'View all departments.':
          viewDepartment();
          break;
        case 'View all roles.':
          viewRoles();
          break;
        case 'View all employees.':
          viewEmployees();
          break;
        case 'Add a department.':
          addDepartment();
          break;
        case 'Add a role.':
          addRole();
          break;
        case 'Add an employee.':
          addEmployee();
          break;
        case 'Update an employee role.':
          changeRole();
          break;
        case 'Exit.':
          db.end();
          console.log('Connection closed. Thank you for using the employe management system.');
          break;
      };
    });
};

//List out all functions needed to carry out management system options.

//View all departments
function viewDepartment() {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    init();
  });
}
//View all roles
function viewRoles() {
  db.query(`SELECT
  role.id
  AS role_id,
  role.title,
  role.salary,
  department.department_name
  FROM role
  JOIN department
  ON role.department_id=department.id`, function (err, results) {
    if (err) throw err;
    console.table(results);
  });
  init();
};
//View all employees
function viewEmployees() {

  db.query(`SELECT
  e.id,
  e.first_name,
  e.last_name,
  e.manager_id,
  r.title,
  r.salary,
  d.department_name,
  m.first_name AS manager_first_name,
  m.last_name AS manager_last_name
  FROM employee e
  LEFT JOIN employee m ON e.manager_id = m.id
  LEFT JOIN role r ON e.role_id=r.id
  LEFT JOIN department d on r.department_id=d.id`, (err, res) => {
    if (err) throw err;
    console.table(res)
    init();
  });
}
//Add a department
function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "Please enter new department name.",
      name: "department"
    },
  ]).then((response) => {
    db.query('INSERT INTO department (department_name) VALUES (?)', (response.department));
    const sql = 'SELECT * FROM department';
    db.query(sql, function (err, res) {
      if (err) throw err;
      console.log(response.department + ' added successfully.');
      console.table(res);
      init();
    })
  });
};
//Add a role
function addRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "Please enter role title.",
      name: "title"
    },
    {
      type: "input",
      message: "Please enter role salary.",
      name: "salary"
    },
    {
      type: "input",
      message: "Please enter department name this new role falls under.",
      name: "department"
    },
  ]).then((response) => {
    db.query('SELECT id FROM department WHERE department_name = ?', [response.department], (err, result) => {
      if (err) throw err;
      let dept = result[0].id;
      db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [response.title, response.salary, dept], (err) => {
        if (err) throw err;
        const sql = 'SELECT * FROM role';
        db.query(sql, function (err, res) {
          if (err) throw err;
          console.log('New role added successfully.');
          console.table(res);
          init();
        });
      });
    });
  });
}
//Add an employee
function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "Please enter employees first name.",
      name: "first"
    },
    {
      type: "input",
      message: "Please enter employees last name.",
      name: "last"
    },
  ]).then((employeeResponse) => {
    db.query(`INSERT INTO employee (first_name, last_name) VALUES (?, ?)`, [employeeResponse.first, employeeResponse.last], (err, result) => {
      if (err) throw err;

      db.query('SELECT id, title FROM role', (err, roles) => {
        if (err) throw err;
        inquirer.prompt([
          {
            type: "list",
            message: "Please select the role for this new employee.",
            name: "roleId",
            choices: roles.map((role) => ({ name: role.title, value: role.id }))
          }
        ]).then((roleResponse) => {
          db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleResponse.roleId, result.insertId], (err) => {
            if (err) throw err;
            db.query(`SELECT e.id AS employee_id,
              e.first_name AS employee_first_name,
              e.last_name AS employee_last_name,
              r.title AS employee_role,
              m.first_name AS manager_first_name,
              m.last_name AS manager_last_name
              FROM employee e
              JOIN role r ON e.role_id = r.id
              LEFT JOIN employee m ON e.manager_id = m.id
              WHERE e.id = ?`, [result.insertId], (err, res) => {
              if (err) throw err;
              console.table(res);
              console.log("New employee successfully added.")
              init();
            });
          });
        });
      });
    });
  });

};


//Update an employees role
function changeRole() {
  db.query('SELECT first_name, last_name FROM employee', (err, employees) => {
    if (err) throw err; (
      db.query('SELECT title FROM role', (err, roles) => {
        if (err) throw err;
        inquirer.prompt([
          {
            type: "list",
            message: "Please select the employee whose role you would like to switch.",
            name: "employee",
            choices: employees.map((employee) => employee.first_name + " " + employee.last_name)
          },
          {
            type: "list",
            message: "Please select the new role you would like to assign to this employee.",
            name: "role_title",
            choices: roles.map((role) => role.title)
          },
        ]).then((answers) => {
          db.query('UPDATE employee SET role_id = (SELECT id FROM role WHERE title = ?) WHERE first_name = ? AND last_name = ?', [answers.role_title, answers.employee.split(" ")[0], answers.employee.split(" ")[1]], (err, response) => {
            if (err) throw err
            console.log(answers.employee + "'s role was successfully updated!");
            init();
          })
        })
      }));
  });
};

//Start inquiry
init();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

//Let user know the program is live.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});