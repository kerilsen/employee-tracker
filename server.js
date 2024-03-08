require('dotenv').config();

const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
// const logo = require('./assets/logo');
const logo = `
 ______                 _                       
|  ____|               | |                      
| |__   _ __ ___  _ __ | | ___  _   _  ___  ___ 
|  __| | '_ \\ _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\
| |____| | | | | | |_) | | (_) | |_| |  __/  __/
|______|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|
|__   __|        | || |          __/ |          
   | |_ __ __ _  |_|| | _____ _ |___/           
   | | '__/ _\\ |/ __| |/ / _ \\ '__|             
   | | | | (_| | (__|   <  __/ |                
   |_|_|  \\__,_|\\___|_|\\_\\___|_|                
`;

// Connect to database
async function connectToDB() {
    try {
        const db = await mysql.createConnection(
            {
                host: 'localhost',
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });
        console.log('Connected to Employee Tracker database: ', process.env.DB_NAME);
        return db;
    } catch (error) {
        console.error('Unable to connect to database: ', process.env.DB_NAME);
    }
};

function handle(choice) {
    switch (choice) {
        case `menu: 'View all employees'`: connection.query(`SELECT e1.first_name, e1.last_name, r.title, r.salary, d.department_name, concat(e2.first_name, ' ', e2.last_name) as Manager
        FROM employees e1
        JOIN departmentRoles dr ON e1.deptrole_id = dr.id
        JOIN departments d ON dr.dept_id = d.id
        JOIN roles r ON dr.role_id = r.id
        LEFT JOIN employees e2 ON e1.manager_id = e2.id;`, (error, results) => { if (error) throw error; console.table(results) });
            break;
        // await inquirer prompt for first name and last name (link to a function to construct this?)
        case 'Add employee': connection.query(`INSERT INTO employees;`, (error, results) => { if (error) throw error; console.table(results) });
            break;
        // return employee table with option to edit
        case 'Update employee role': connection.query(`UPDATE employees SET role_id = ? WHERE id = ?`, (error, results) => { if (error) throw error; console.table(results) });
            break;
        //         UPDATE table_name
        // SET column1 = value1, column2 = value2, ...
        // WHERE condition;
        case 'View all roles': connection.query(`SELECT title, salary FROM roles;`, (error, results) => { if (error) throw error; console.table(results) });
            break;
        case 'Add role': connection.query(`INSERT INTO roles`, (error, results) => { if (error) throw error; console.table(results) });
            break;
        case 'View all departments': connection.query(`SELECT * FROM departments`, (error, results) => { if (error) throw error; console.table(results) })
            console.log(results);
            break;
        case 'Add department': connection.query(`INSERT INTO departments`, (error, results) => { if (error) throw error; console.table(results) });
            break;
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
        console.log('hello');
        handle(nextStep);
        // const results = await connection.query(`SELECT * FROM employees;`)
        const results = await connection.query(`SELECT e1.first_name, e1.last_name, r.title, r.salary, d.department_name, concat(e2.first_name, ' ', e2.last_name) as Manager
        FROM employees e1
        JOIN departmentRoles dr ON e1.deptrole_id = dr.id
        JOIN departments d ON dr.dept_id = d.id
        JOIN roles r ON dr.role_id = r.id
        LEFT JOIN employees e2 ON e1.manager_id = e2.id;`);
        // const formattedResults = await results.map(result => {
        //     return {
        //       column1: result.column1,
        //       column2: result.column2,
        //       column3: result.column3,
        //       column4: result.column4,
        //       column5: result.column5,
        //       column6: result.column6,
        //     };
        //   });
        console.table(results);
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