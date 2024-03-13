// require('dotenv').config();
// const db = require('./db/connection');
// const mysql = require('mysql2');
const { userInterface } = require('./assets/ui');

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

// Display logo
console.log(`\x1b[36m`, logo);
userInterface();

// Connect to database
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL database:', err);
//         return;
//     }
//     console.log('Connected to Employee Tracker database: ', process.env.DB_NAME);
//     console.log('Welcome to Central Public Library System');
    
//     // Use inquirer to mount questions and answers
//     userInterface();
    
// });