const { getChoices } = require('./data');
const inquirer = require('inquirer');
const inquirerPrompt = require('inquirer-autocomplete-prompt');
inquirer.registerPrompt('autocomplete', inquirerPrompt);

let value = {};

const addEmployee = async (data) => {
    const employee = {
        "first_name": data.first_name,
        "last_name": data.last_name,
        "deptrole_id":,
        "manager_id":
    }
    return results;
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

// Switch statement to send back results for queries with input 
const sendResults = (data, choice) => {
    let results;
    switch (choice) {
        // CREATE 
        case 1: results = addEmployee(data);
            break;
        case 2: results = addRole(data);
            break;
        case 3: results = addDept(data);
            break;
        case 4: results = addDeptRole(data);
            break;

        // READ
        case 6: results = viewDeptEmployees(data);
            break;
        case 8: results = viewTeam(data);
            break;
        case 11: results = getDeptRoles(data);
            break;
        case 12: results = utilizedDeptBudget(data);
            break;

        //UPDATE
        case 13: results = updateEmployee(data);
            break;
        case 14: results = updateManager(data);
            break;

        // DELETE
        case 15: results = deleteEmployee(data);
            break;
        case 16: results = deleteRole(data);
            break;
        case 17: results = deleteDept(data);
            break;
    }
    return results;
}

module.exports = { sendResults };