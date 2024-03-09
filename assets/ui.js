require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const { createNew, readResults, updateRow, deleteRow } = require('../lib/query');
const connection = require('./server')

// Display logo once
// Display main menu and 
// get choice from the user and 
// then construct query
// then execute query
// then grab results
// then format results
// then display results
// then display main menu again (back to the beginning?)

// finally end connection on 'quit'
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

const genQuery = async (choice) => {
    let SQLquery = {};
    try {
        switch (choice) {
            // employee ids, first names, last names, job titles, departments
            case `viewallemployees`: query = {
                table: `employees e1`,
                column: `e1.id AS Employee_ID, e1.first_name AS First_name, e1.last_name AS Last_name, r.title AS Title, r.salary AS Salary, d.department_name AS Department, concat(e2.first_name, ' ', e2.last_name) as Manager`,
                condition: `JOIN departmentRoles dr ON e1.deptrole_id = dr.id JOIN departments d ON dr.dept_id = d.id JOIN roles r ON dr.role_id = r.id LEFT JOIN employees e2 ON e1.manager_id = e2.id;`
            };
                SQLquery = readResults(query);
                break;
            // await inquirer prompt for first name and last name (link to a function to construct this?)
            case 'Add employee':
                const getValue = await inquirer.prompt(
                    {
                        type: 'input',
                        name: 'first_name',
                        message: `What is the employee's first name?`
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: `What is the employee's last name?`
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: `What is the employee's role?`,
                        choices: [
                            'IT Specialist',
                            'Administrator',
                            'Custodian',
                            'Manager',
                            'Librarian',
                            'Library Assistant',
                            'Page'
                        ]
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: `Who is the employee's manager?`,
                        choices: [

                        ]
                    }
                )
                query = {
                    table: `employees`,
                    condition: (`INSERT INTO employees;`, (error, results) => { if (error) throw error; console.table(results) })
                };

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
                return SQLquery;
        } catch (error) {
            console.error('Error executing query:', error);
        }
    }


const userInterface = async () => {
        // Display logo
        console.log(`\x1b[36m`, logo);
        const getChoice = await inquirer.prompt(
            {
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
                ],
                filter() {
                    let array = val.split(" ").join("");
                    console.log(array.toLowerCase());
                    return array.toLowerCase();
                }
            });
        const userQuery = await genQuery(getChoice.value);
        try {

        } catch (error) {
            console.error('Unable to load UI', error);
        }
    };








    module.exports = { userInterface };