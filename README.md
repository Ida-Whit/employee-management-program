## Employee Management Program

## Description
This is a program meant to assist business owners with keeping track of their employees. This program can store employees first and last names, their salary, department they belong to, and their managers. It has the ability for the user to view all departments at the company, view all the roles at the company, and view all the employees at the company. This program can also allow the user to add a new department, add a new role, or add a new employee as well as update an existing employee. After each inquiry, the user is presented with a table containing all the new or changed information.

## Badges
N/Q

## Visuals


## Installation
In order to use this program, the user must run 'npm i' on their terminal to install all the needed dependencies. Once this is complete, the user will need to add the database and tables to their computer using SQL and the db files. Once this is complete, the user can access the terminal through the server.js file and begin the program by inputting 'node server.js'.

## Usage
This program is meant to be used by business owners to help them with keeping track of their employees. Once started, the program prompts the user to choose an option (view all departments, view all roles, view all employees, add a department, add a role, add an employee, or update an employee role). Once the user chooses an option, the program will then run a function unique to that option; either displaying a table right away or prompting the user to enter needed information. For example, when the user chooses to view all roles, the program runs a JOIN query to then provide the user with a table listing job title, role id, the department that role belongs to, and the salary for that role. When the user chooses to add an employee, they are prompted to enter the new employees first and last name which the program then INSERTS into the employee table. Then they are asked to select a role from a drop down list of the companies current roles which the program then takes and UPDATES the employee table. A JOIN query is then run to present the user with a table containing all current employee's first and last names, their role in the company, and their manager if they have one.

## Contributing
N/A

## Authors and acknowledgment
This program was written by myself, Ida Whitcomb, with some help from Bootcamp TA Greg Johnston.

## License
N/A

## Project status
Project is complete