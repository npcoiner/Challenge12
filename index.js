require('dotenv').config(); 
const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      port: 3306,
      user:  process.env.DB_USER,
      // TODO: Add MySQL password here
      password: process.env.DB_PASSWORD,
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);
db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
});

async function promptUser(){
    await inquirer.prompt([
        {
        type: 'list',
        message: "Choose:",
        name: "query",
        choices:[
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role"
        ]}
    ]).then((data) => {
        switch (data.query){
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateEmployee();
                break;
        }
    });
}



promptUser();

function viewDepartments(){
    db.query('SELECT * FROM departments', function (err, results){
        console.log(results);
        promptUser();

    });
}
function viewRoles(){
    db.query('SELECT * FROM roles', function (err, results){
        console.log(results);
        promptUser();

    });
}
function viewEmployees(){
    db.query('SELECT * FROM employees', function (err, results){
        console.log(results);
        promptUser();

    });
}
function addDepartment(){
    inquirer.prompt({
        //Ask user for department name to add
        type: "input",
        name: "name",
        message: "What is the department's name?"
    }).then((data) => {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        db.query(sql,[data.name], (err, result) =>{
            if(!err){
                console.log("Added successfully");
            }
            else{
                throw err;
            }
        });
    });
}
function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the role's name?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the role's salary?"
        },
        {
            type: "input",
            name: "department",
            message: "What is the role's department?"
        }
    ]).then((data) => {
        const sql = `INSERT INTO roles SET ?`;
        db.query(sql,data, (err, result) =>{
            if(!err){
                console.log("Added successfully");
            }
            else{
                throw err;
            }
        });
    });
}

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "role",
            message: "What is the role"
        },
        {
            type: "input",
            name: "manager",
            message: "Who is the employee's manager?"
        }
    ]).then((data) => {
        const sql = `INSERT INTO employees SET ?`;
        db.query(sql,data, (err, result) =>{
            if(!err){
                console.log("Added successfully");
            }
            else{
                throw err;
            }
        });
    });

}
function updateEmployee(){
    sql = `SELECt * FROM employees`;
    db.query(sql,(err,result) => {
        const employeeChoices = result.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
        }));
      
        inquirer.prompt({
            type: "list",
            name: "employee",
            message: "Choose an employee:",
            choices: employeeChoices
        }).then((answers) => {

        });
    });
}


