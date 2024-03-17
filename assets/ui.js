const inquirer = require('inquirer');
const grabQuery = require('../lib/query');
const db = require('../config/connection');
const { grabPrompt } = require('../lib/prompts');
const { mainMenu } = require('../assets/menu');
const sendResults = require('../lib/results');

async function userInterface() {
    try {
        // connect to database
        // const db = await dbPromise();
        // send main menu options to user
        const getInput = await inquirer.prompt(mainMenu);
        // grab menu choice as a number
        const choice = await getInput.menu;
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
            const answers = await grabPrompt(choice);
            await sendResults(choice, answers);
            }
            // loop back with a recursive function(when the user presses a key?) - need to add an exit
            userInterface();

        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = { userInterface };