const { getChoices } = require('./data');
const inquirer = require('inquirer');

const addEmployee = async () => {
    const value = await inquirer.prompt([
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
            choices: await getChoices('deptRoles')
        },
        {
            type: 'list',
            name: 'manager',
            message: `Who is the employee's manager?`,
            choices: await getChoices('managers')
        }
    ]);
    return value;
}

// Switch statement to choose from all prompts
const grabPrompt = async(choice) => {
    let prompt;
    switch (choice) {
        // CREATE 
        case 1: prompt = await addEmployee();
            break;
        case 2: prompt = await addRole();
            break;
        case 3: prompt = await addDept();
            break;
        case 4: prompt = await addDeptRole();
            break;

        // READ
        case 5: prompt = await viewEmployees();
            break;
        case 6: prompt = await viewDeptEmployees();
            break;
        case 7: prompt = await getManagers();
            break;
        case 8: prompt = await viewTeam();
            break;
        case 9: prompt = await viewRoles();
            break;
        case 10: prompt = await getDeptRoles();
            break;
        case 11: prompt = await utilizedDeptBudget();
            break;

        //UPDATE
        case 12: prompt = await updateEmployee();
            break;
        case 13: prompt = await updateManager();
            break;

        // DELETE
        case 14: prompt = await deleteEmployee();
            break;
        case 15: prompt = await deleteRole();
            break;
        case 16: prompt = await deleteDept();
            break;
    }
    return prompt;
}

module.exports = { grabPrompt };