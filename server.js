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


db.query('SELECT * FROM department', function (err, results) {
  console.log(results);
})

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

/*inquirer
  .prompt([
    {
      
    },
    {
      
    },
    {
      
    },
  ])
  .then
*/


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

//Add a role

//Add an employee

//Update an employees role

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }); 