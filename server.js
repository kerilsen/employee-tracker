require('dotenv').config();
console.log(process.env);
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const logo = require('./assets/logo');

// Connect to database
async function connectToDB() {
    const db = await mysql.createConnection(
        {
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    return db;
};

// db.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected to Employee Tracker");
// });

async function process(choice) {
    switch (choice) {
        case 'View all employees': return `SELECT first_name, last_name, title, salary
    FROM employees LEFT JOIN roles ON employees.role_id = roles.id;`;
        // await inquirer prompt for first name and last name (link to a function to construct this?)
        case 'Add employee': return `INSERT INTO employees;`;
        // return employee table with option to edit
        case 'Update employee role': return ``;
        case 'View all roles': return `SELECT title, salary FROM roles;`;
        case 'Add role': return `INSERT INTO roles`;
        case 'View all departments': return `db.query('SELECT * FROM departments', function (err, results) {
            console.log(results);
        });`;
        case 'Add department': return `INSERT INTO departments;`;
    }
}

const menu = {
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: [
        'View all employees',
        'Add employees',
        'Update employee role',
        'View all roles',
        'Add role',
        'View all departments',
        'Add department'
    ]
}
// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
async function main() {
    console.log(logo);
    const connection = await connectToDB();
    const nextStep = await inquirer.prompt(menu);
    try {
        process(nextStep);
    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        await connection.end();
    }

    // const getRequest = await inquirer.prompt(genMenu(nextStep));
    // console.log(getRequest);
}
main();
// function init() {
//     inquirer.prompt(mainMenu).then((answers) => {

//     })
// }