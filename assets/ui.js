const inquirer = require('inquirer');
const { grabQuery } = require('../utils/query');
const dbPromise = require('../db/connection');
const { grabPrompt } = require('../utils/prompts')

const mainMenu = async () => {
    const getInput = await inquirer.prompt(
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: [
                { name: 'Add employee', value: 1 },
                { name: 'Add role', value: 2 },
                { name: 'Add department', value: 3 },
                { name: 'Add department with role', value: 4 },
                { name: 'View all employees', value: 5 },
                { name: 'View employees by department', value: 6 },
                { name: 'View all managers', value: 7 },
                { name: 'View employees by manager', value: 8 },
                { name: 'View all roles', value: 9 },
                { name: 'View all departments', value: 10 },
                { name: 'View departments with roles', value: 11 },
                { name: 'View utilized department budget', value: 12 },
                { name: 'Update employee record', value: 13 },
                { name: 'Update employee manager', value: 14 },
                { name: 'Delete employee', value: 15 },
                { name: 'Delete role', value: 16 },
                { name: 'Delete department', value: 17 },
                { name: 'Quit', value: 18 }
            ],
        });
    return getInput.menu;
}

const userInterface = async () => {
    try {
        const db = await dbPromise();
        const choice = await mainMenu();
        // These are the menu options that do not require any follow-up questions from the user
        // Just need to grab the results and send back
        const noParams = [5, 7, 9, 10, 11];
        try {
            if (noParams.includes(choice)) {
                const query = grabQuery(choice);
                const [rows] = await db.query(query);
                console.table(rows);
            } else {
                // send for nested inquirer prompts
                const answers = grabPrompt(choice);
                sendResults(answers, choice);
            }
            // calling on function recursively to start over again
            // need to add a break? or just the quit option on the main menu?
            userInterface();
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
};

userInterface();

// module.exports = { userInterface };