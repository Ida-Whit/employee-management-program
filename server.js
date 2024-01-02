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
  ]) .then((response) => {
    switch(response.answer) {
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
function viewDepartment(){
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    init();
  });
}
//View all roles
function viewRoles(){  
  db.query('SELECT role.id AS role_id, role.title, role.salary, department.id AS department_id, department.department_name FROM role INNER JOIN department ON role.department_id=department.id', function (err, results) {
    if(err) throw err;
    console.table(results);
  });
    init();
  };
//View all employees
//employee first and last name, job title, department, salary, manager
function viewEmployees(){
  db.query('SELECT * FROM employee', function (err, results) {
    if(err) throw err;
    console.table(results);
    init();
  });
}
//Add a department
function addDepartment(){
  inquirer.prompt([
    {
      type: "input",
      message: "Please enter new department name.",
      name: "department"
    },
  ]) .then((response) => {
    db.query('INSERT INTO department (department_name) VALUES (?)', (response.department));
    const sql = 'SELECT * FROM department';
    db.query(sql, function(err, res) {
      if(err) throw err;
      console.log(response.department + ' added successfully.');
      console.table(res);
      init();
    })
});
};
//Add a role
function addRole(){
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
  ]) .then((response) => {
    db.query('SELECT id FROM department WHERE department_name = ?', [response.department], (err, result) => {
      if(err) throw err;
      let dept = result[0].id;   
      db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [response.title, response.salary, dept], (err) =>{
        if(err) throw err;
        const sql = 'SELECT * FROM role';
        db.query(sql, function(err, res) {
        if(err) throw err;
        console.log('New role added successfully.');
        console.table(res);
        init();
        });
      });
    });
});
 }
//Add an employee
//first and last name, role, manager and employee gets added
function addEmployee(){
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
    {
      type: "input",
      message: "Please enter employees role within the company.",
      name: "role"
    },
    {
      type: "input",
      message: "Please enter the manager id for this employee if one exists.",
      name: "manager"
    },
  ]) .then((response) => {
    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?, ?)', [response.first, response.last, response.role, response.manager]);
    const sql = 'SELECT * FROM employee';
    db.query(sql, function(err, res) {
      if(err) throw err;
      console.log('New employee added successfully.');
      console.table(res);
      init();
    })
});
}
//Update an employees role
//prompted to select an employee and update their role and the database is updated.
function changeRole(){

}

init();

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

//Let user know the program is live.
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });