var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection ({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    
    database: "employee_listDB"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Add role",
            "Remove role",
            "View department total salary",
            "Are you finished?"
        ]
    })
    .then(function (answer) {
        switch(answer.action) {
            case "View All Employees":
                viewAll();
                break;
            case "View All Employees By Department":
                viewAllEmployeesByDepartment();
                break;
            case "View All Employees By Manager":
                viewAllEmployeesByManager();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "Update Employee Manager":
                updateManager();
                break;
            case "Add role":
                addRole();
                break;
            case "Remove role":
                removeRole();
                break;
            case "View department total salary":
                departmentSalary();
                break;
            case "Are you finished?":
                connection.end();
                break;
        }
    })
};


viewAll();
///////////////////////////////////////
// View All Employees

// PRINT employee list (console.table)
// runSearch()


viewAllEmployeesByDepartment();
///////////////////////////////////////
// View Employees by Department
// department (LIST)
// PRINT employee list from list (console.table)
// runSearch()

viewAllEmployeesByManager();
///////////////////////////////////////
// View Employees by Manager
// manager (LIST)
// PRINT employee list from selection (console.table)
// runSearch()

addEmployee();
///////////////////////////////////////
// Add Employee
// first name (prompt)
// last name (prompt)
// role (LIST)
// employees manager (LIST)
// runSearch()

removeEmployee();
///////////////////////////////////////
// Remove Employee
// Search by department? (LIST)
// Full List of Employees? (LIST)
// search by role? (LIST)
// employees manager?(LIST)
// runSearch()

updateRole();
///////////////////////////////////////
// Update Role
// print list of employees? (LIST)
// by current role? (list)
// what is the new role (list)
// runSearch()

updateManager();
///////////////////////////////////////
// Update Manager
// employee list? (list)
// manager list? (list)
// change to new manager?
// runSearch()

addRole();
///////////////////////////////////////
// Add Role
// what is role  (prompt)
// what is salary (prompt)
// department id (list)
// runSearch()

removeRole();
///////////////////////////////////////
// Remove Role
// which role (list)
// runSearch()

departmentSalary();
///////////////////////////////////////
// view department total salary
// chooose department (list)
// sumOF salary?
// console.table results
// runSearch()
