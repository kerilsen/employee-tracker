const inquirer = require('inquirer');
const db = require('./config/connection');
const mainMenu = require('./assets/menu');
const grabQuery = require('./apps/queries');
const grabPrompt = require('./apps/prompts');
const updateDB = require('./apps/operations');
const goodbye = require('./assets/goodbye');

async function userInterface() {
    // display main menu of options
    const getInput = await inquirer.prompt(mainMenu);
    // grab menu choice as a number
    const choice = await getInput.menu;
    // simple queries that do not require further prompts
    const simpleQuery = [5, 7, 9, 10, 11];

    if (simpleQuery.includes(choice)) {
        try {
            const query = await grabQuery(choice);
            const [rows] = await db.query(query);
            console.table(rows);
        } catch (error) {
            console.error(`There was a problem performing this simple query`);
        }
    } else {
        // send for nested inquirer prompts
        try {
            const input = await grabPrompt(choice);
            // update or call on the database with user input
            await updateDB(choice, input);
        }
        catch (error) {
            console.error(`There was a problem performing this nested query: ${error}`)
        }
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
};

module.exports = userInterface;