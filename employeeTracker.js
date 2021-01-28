var mysql = require("mysql");
var inquirer = require("inquirer");

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
            "View department total salary"
        ]
    })
}