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
    console.log(results);
    init();
  });
}
//View all roles
//job title, role id, department for that role and salary for that role
function viewRoles(){
  db.query('SELECT * FROM role', function (err, results) {
    console.log(results);
    init();
  });
}
//View all employees
//employee first and last name, job title, department, salary, manager
function viewEmployees(){
  db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
    init();
  });
}
//Add a department
//prompted to enter name of department and it gets added
function addDepartment(){
  inquirer.prompt([
    {
      type: "input",
      message: "Please enter new department name.",
      name: "department"
    },
  ]) .then((response) => {
    db.query('INSERT INTO department (department_name) VALUE(?)', function (err, results) {
      console.log(results);
    });
    db.query('SELECT * FROM department', function (err, results) {
      console.log(results);
      init();
    });
  });
}
//Add a role
//prompted to enter name, salary, department for the role and role gets added
function addRole(){

  init();
}
//Add an employee
//first and last name, role, manager and employee gets added
function addEmployee(){

  init();
}
//Update an employees role
//prompted to select an employee and update their role and the database is updated.
function changeRole(){

  init();
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