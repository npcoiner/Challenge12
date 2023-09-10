const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user:  process.env.DB_USER,
      // TODO: Add MySQL password here
      password: process.env.DB_PASSWORD,
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);


inquirer.promt({
    type: 'list',
    message: "Choose:",
    name: "query",
    choices:[
        "View all departments",
        "View all roles",
        "View allemployees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role"
    ],
    validate: (input) => {
        return input ? true : (console.log(this.message), false)
    }
});

