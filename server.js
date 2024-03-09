require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const { userInterface } = require('./assets/ui.js');
// const chalk = require('chalk');

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
let db;
// Connect to database
const connectToDB = async () => {
    try {
        db = await mysql.createConnection(
            {
                host: 'localhost',
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                multipleStatements: true,
            });
        console.log('Connected to Employee Tracker database: ', process.env.DB_NAME);
        console.log('Welcome to Central Public Library System')
       return db;
    } catch (error) {
        console.error('Unable to connect to database: ', process.env.DB_NAME);
    }
};

console.log(`db is ${db}`);
// Connect to MySQL database
connectToDB();
console.log(`db is ${db} after connectToDB`);

// Use inquirer to mount questions and answers
userInterface();

const menu = async () => {
    try {
        const choice = {
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
        }
        return choice;
    } catch (error) {
        console.error('Error with user menu:', error);
    }
}
// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
async function main() {
    console.log(`\x1b[36m`, logo);
    const db = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'Janine1982*',
            database: 'tracker_db'
        });
    if (db.state !== 'connected') {
        throw new Error('Connection is not open after connection');
    }
    try {
        // Check if the connection is open
        if (db.state !== 'connected') {
            throw new Error('Connection is not open after try');
        }
        let choice = await inquirer.prompt(menu);
        const query = handle(choice);
        // Check if the connection is open
        if (db.state !== 'connected') {
            throw new Error('Connection is not open after handle operation');
        }
        const [rows, fields] = await db.execute(query);
        console.table(rows);

        console.log('hello');
      
    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        console.log('goodbye');
        await db.end();
    }

    // const getRequest = await inquirer.prompt(genMenu(nextStep));
    // console.log(getRequest);
}
// main();

module.exports = { db };