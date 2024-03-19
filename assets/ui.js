const inquirer = require('inquirer');
const db = require('../config/connection');
const grabQuery = require('../apps/query');
const grabPrompt = require('../apps/prompts');
const mainMenu = require('../assets/menu');
const updateDB = require('../apps/updateDB');
const goodbye = require('./goodbye');

async function userInterface() {
    try {
        // display main menu of options
        const getInput = await inquirer.prompt(mainMenu);
        // grab menu choice as a number
        const choice = await getInput.menu;
        // simple queries that do not require further prompts
        const simpleQuery = [5, 7, 9, 10, 11];
        try {
            if (simpleQuery.includes(choice)) {
                const query = grabQuery(choice);
                const [rows] = await db.query(query);
                console.table(rows);
            } else {
                // send for nested inquirer prompts
                const input = await grabPrompt(choice);
                // update or call on the database with user input
                await updateDB(choice, input);
            }
            // loop back with a recursive function
            const next = await grabPrompt(19);
            if (next) {
                setTimeout(() => {
                    userInterface();
                }, 1000);
            }
            else {
                goodbye();
            }
        } catch (error) {
            console.error(`There was a problem processing your menu request: ${error}`);
        }
    } catch (error) {
        console.error(`Problem loading main menu: ${error}`);
    }
};

module.exports = userInterface;