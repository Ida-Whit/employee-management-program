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
    if(response.answer === 'View all departments.') {
      viewDepartment();
    } else if (response.answer === 'View all roles.') {
      viewRoles();
    } else if (response.answer === 'View all employees.') {
      viewEmployees();
    } else if (response.answer === 'Add a department.') {
      addDepartment();
    } else if (response.answer === 'Add a role.') {
      addRole();
    } else if (response.answer === 'Add an employee.') {
      addEmployee();
    } else if (response.answer === 'Update an employee role.') {
      changeRole();
    } else {
      db.end();
        console.log("Thanks for using Employee Management System.")
    }
  })



//View all departments
function viewDepartment(){
  db.query('SELECT * FROM department'), function (err, results) {
    console.log(results);
  };
  //Start inquirer function again
}
//View all roles
function viewRoles(){
  db.query('SELECT * FROM role'), function (err, results) {
    console.log(results);
  };
  //Start inquirer function again
}
//View all employees
function viewEmployees(){
  db.query('SELECT * FROM employee'), function (err, results) {
    console.log(results);
  };
  //Start inquirer function again
}
//Add a department
function addDepartment(){

  //Start inquirer function again
}
//Add a role
function addRole(){

  //Start inquirer function again
}
//Add an employee
function addEmployee(){

  //Start inquirer function again
}
//Update an employees role
function changeRole(){

  //Start inquirer function again
}

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }); 