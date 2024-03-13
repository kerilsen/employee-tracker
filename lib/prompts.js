const { getChoices } = require('./data');
let value = {};

const addEmployee = async () => {
    value = await inquirer.prompt(
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
            choices: getChoices(9)
        },
        {
            type: 'list',
            name: 'manager',
            message: `Who is the employee's manager?`,
            choices: getChoices(7)
        }
    )
    return value;
}

// Switch statement to choose from all queries - send parameters or just leave ?
const grabPrompt = (choice) => {
    let prompt;
    switch (choice) {
        // CREATE 
        case 1: prompt = addEmployee();
            break;
        case 2: prompt = addRole();
            break;
        case 3: prompt = addDept();
            break;
        case 4: prompt = addDeptRole();
            break;

        // READ
        case 5: prompt = viewEmployees();
            break;
        case 6: prompt = viewDeptEmployees();
            break;
        case 7: prompt = getManagers();
            break;
        case 8: prompt = viewTeam();
            break;
        case 9: prompt = viewRoles();
            break;
        case 10: prompt = getDeptRoles();
            break;
        case 11: prompt = utilizedDeptBudget();
            break;

        //UPDATE
        case 12: prompt = updateEmployee();
            break;
        case 13: prompt = updateManager();
            break;

        // DELETE
        case 14: prompt = deleteEmployee();
            break;
        case 15: prompt = deleteRole();
            break;
        case 16: prompt = deleteDept();
            break;
    }
    return value;
}

module.exports = { grabPrompt };