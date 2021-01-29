var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
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
        .then((answer) => {
            switch (answer.action) {
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
                case "Add department":
                    addDepartment();
                    break;
                case "Remove department":
                    removeDepartment();
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
                case "I'm Done":
                    connection.end();
                    break;
            }
        })
};


// View All Employees
function viewAll() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    })
};


// View Employees by Department
function viewAllEmployeesByDepartment() {
    inquirer
        .prompt({
            type: "list",
            name: "department",
            message: "Which departments employees would you like to see?",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal"
            ]
        })
        .then((answer) => {
            var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name,  employee.manager_id FROM ((employee INNER JOIN role On employee.role_id = role.id) INNER JOIN department ON department.id = role.department_id) WHERE department.name = ?";
            connection.query(query, [answer.department],
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    runSearch();
                })
        })
};


// View Employees by Manager
function viewAllEmployeesByManager() {
    inquirer
        .prompt({
            type: "list",
            name: "manager",
            message: "Which manager's employees would you like to see?",
            choices: [
                "Sales Lead",
                "Lead Engineer",
                "Account Manager",
                "Legal Team Lead"
            ]
        })
        .then((answer) => {
            var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, employee.manager_id FROM employee INNER JOIN role On employee.manager_id = role.id WHERE role.title = ?"
            connection.query(query, [answer.manager],
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    runSearch();
                })
        })
}


// Add Employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "prompt",
                name: "id",
                message: "Please input new employees ID (New ID's start at 20)",
            },
            {
                type: "prompt",
                name: "firstName",
                message: "What is the employees first name?",
            },
            {
                type: "prompt",
                name: "lastName",
                message: "What is the employees last name?",
            },
            {
                type: "list",
                name: "roleID",
                message: "What is the employees role id? (1-Sales Lead, 2-Lead Engineer, 3-Account Manager, 4-Legal Team Lead, 11- Salesperson, 12-Software Engineer, 13-Accountant, 14-Lawyer",
                choices: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "11",
                    "12",
                    "13",
                    "14"
                ]
            },
            {
                type: "prompt",
                name: "managerID",
                message: "What is the employees manager id? (1-4)cle"
            }])
        .then((answer) => {
            var query = "INSERT INTO employee SET ?";
            connection.query(query,
                {
                    id: parseInt(answer.id),
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleID,
                    manager_id: answer.managerID
                },
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    runSearch();
                })
        })
};


// Remove Employee
function removeEmployee() {
    connection.query("SELECT * from employee", function (err, res) {
        if (err) throw err;
        res.forEach((employee => {
            console.log(employee.first_name, employee.last_name);
        }))
    })
    inquirer
        .prompt([
            {
                type: "prompt",
                name: "first",
                message: "What is the first name of the employee you'd like to remove?",
            },
            {
                type: "prompt",
                name: "last",
                message: "What is the last name of the employee you'd like to remove?"
            }
        ])
        .then((answer => {
            var query = "DELETE FROM employee WHERE ?";
            connection.query(query,
                {
                    first_name: answer.first,
                    last_name: answer.last
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee successfully deleted!");
                    runSearch();
                }

            )
        }))
};


// updateRole();
///////////////////////////////////////
// Update Role
// print list of employees? (LIST)
// by current role? (list)
// what is the new role (list)
// runSearch()



// updateManager();
///////////////////////////////////////
// Update Manager
// employee list? (list)
// var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, employee.manager_id FROM employee INNER JOIN role On employee.role_id = role.id WHERE role.title = ?"
// manager list? (list)
// change to new manager?
// runSearch()


// Add Department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "id",
                message: "Please input a new Department ID (New ID's start at 10)",
            },
            {
                type: "input",
                name: "departmentName",
                message: "What department would you like to add?"
            },

        ]).then((answer) => {
            var query = "INSERT INTO department SET ?";
            connection.query(query,
                {
                    id: parseInt(answer.id),
                    name: answer.departmentName,
                },
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    runSearch();
                }
            )
        })
};


// Remove Department
function removeDepartment(){
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
    });
    inquirer
        .prompt([
            {
                type: "input",
                name: "departmentName",
                message: "Which department would you like to remove?"
            }

        ]).then((answer => {
            var query = "DELETE FROM department WHERE ?";
            connection.query(query,
                {
                    name: answer.departmentName,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Department successfully deleted!");
                    runSearch();
                }
            )
        }))
};


// Add Role
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "id",
                message: "Please input a new Role ID (New ID's start at 20)",
            },
            {
                type: "input",
                name: "roleName",
                message: "What role would you like to add?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for this position?"
            },
            {
                type: "input",
                name: "department",
                message: "Which department is this role for? Please enter Department ID (1- Sales, 2- Engineering, 3- Finance, 4-Legal"
            }
        ]).then((answer) => {
            var query = "INSERT INTO role SET ?";
            connection.query(query,
                {
                    id: parseInt(answer.id),
                    title: answer.roleName,
                    salary: answer.salary,
                    department_id: answer.department
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Role Successfully Created!");
                    runSearch();
                }
            )
        })
};

// Remove Role
function removeRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
    });
    inquirer
        .prompt([
            {
                type: "input",
                name: "roleName",
                message: "What role would you like to remove?"
            }

        ]).then((answer => {
            var query = "DELETE FROM role WHERE ?";
            connection.query(query,
                {
                    title: answer.roleName,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Role successfully deleted!");
                    runSearch();
                }
            )
        }))
};



// departmentSalary();
///////////////////////////////////////
// view department total salary
// chooose department (list)
// sumOF salary?
// console.table results
// runSearch()
