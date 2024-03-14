const { getChoices } = require('./data');
const inquirer = require('inquirer');

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
            name: 'deptRole',
            message: `What is the employee's role and department?`,
            choices: getChoices(11)
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

const addRole = async () => {
    value = await inquirer.prompt(
        {
            type: 'input',
            name: 'role',
            message: 'What role would you like to add?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department will this role be in?',
            choices: getChoices(10)
        }
    )
    return value;
}

const addDept = async () => {
    let departments = getChoices(10);
    value = await inquirer.prompt(
        {
            type: 'input',
            name: 'department',
            message: 'What department would you like to add?'
        }
    )
    if (departments.includes(value.trim())) {
        console.log('This department already exists');
        return;
    } else return value.trim();
}

const addDeptRole = async () => {
    value = await inquirer.prompt(
        {
            type: 'list',
            name: 'department',
            message: 'Which department do you want to add the role to?',
            choices: getChoices(10)
        },
        {
            type: 'list',
            name: 'role',
            message: 'What role would you like to add?',
            choices: getChoices(9)
        }
    )
    return value;
}

const viewDeptEmployees = async () => {
    value = await inquirer.prompt(
        {
            type: 'list',
            name: 'department',
            message: 'Employee list from which department?',
            choices: getChoices(10)
        }
    )
    return value;
};

const viewTeam = async () => {
    value = await inquirer.prompt(
        {
            type: 'list',
            name: 'managers',
            message: 'Employee list for which manager?',
            choices: getChoices(7)
        }
    )
}
const validateEmployeeID = (input) => {
    const number = input;
    if (number < 1 || number > 100) {
        return 'Employee ID must be between 1 and 100.';
    }
    return true;
};

const updateEmployee = async () => {
    value = await inquirer.prompt(
        {
            type: 'number',
            name: 'employee_id',
            message: 'Enter the id number of the employee you would like to update (between 1-100)',
            validate: validateEmployeeID
        },
        {
            type: 'list',
            name: 'deptRole',
            message: 'What department and role would you like to update for the employee?',
            choices: getChoices(11)
        }
    )
    return value;
}

const updateManager = async () => {
    value = await inquirer.prompt(
        {
            type: 'number',
            name: 'employee_id',
            message: 'Enter the id number of the employee you would like to update (between 1-100)',
            validate: validateEmployeeID
        },
        {
            type: 'list',
            name: 'manager',
            message: 'What manager would you like to choose for the employee?',
            choices: getChoices(7)
        }
    )
    return value;
}

const deleteEmployee = async () => {
    value = await inquirer.prompt(
        {
            type: 'number',
            name: 'employee',
            message: 'Please enter the ID number for the employee record you would like to delete',
            validate: validateEmployeeID,
        },
        {
            type: 'confirm',
            name: 'deleteYes',
            message: 'Are you sure you want to delete this employee?'
        }
    )
}

const deleteRole = async () => {
    value = await inquirer.prompt(
        {
            type: 'list',
            name: 'roles',
            message: 'Which role would you like to delete?',
            choices: getChoices(9)
        },
        {
            type: 'confirm',
            name: 'deleteYes',
            message: 'Are you sure you want to delete this role?'
        }
    )
}

const deleteDept = async () => {
    value = await inquirer.prompt(
        {
            type: 'list',
            name: 'department',
            message: 'Which department would you like to delete?',
            choices: getChoices(10),
        },
        {
            type: 'confirm',
            name: 'deleteYes',
            message: 'Are you sure you want to delete this department?'
        }
    )
}

const quit = async () => {
    value = await inquirer.prompt(
        {
            type: 'confirm',
            name: 'quit',
            message: 'Are you sure you want to quit?'
        }
    )
}

// Switch statement to choose from all prompts
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
        case 6: prompt = viewDeptEmployees();
            break;
        case 8: prompt = viewTeam();
            break;
        case 12: prompt = utilizedDeptBudget();
            break;

        //UPDATE
        case 13: prompt = updateEmployee();
            break;
        case 14: prompt = updateManager();
            break;

        // DELETE
        case 15: prompt = deleteEmployee();
            break;
        case 16: prompt = deleteRole();
            break;
        case 17: prompt = deleteDept();
            break;

        // QUIT
        case 18: prompt = quit();
    }
    return value;
}

module.exports = { grabPrompt };