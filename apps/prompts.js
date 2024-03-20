// This is a library of inquirer prompts to get information from the user
// There is a switch operator 'grabPrompt' that grabs them by number value
const grabData = require('./data');
const inquirer = require('inquirer');

// 1. Add an employee
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
            choices: await grabData('deptRoles')
        },
        {
            type: 'list',
            name: 'manager',
            message: `Who is the employee's manager?`,
            choices: await grabData('managers')
        }
    ]);
    return value;
}

// 2. Add a role
const addRole = async () => {
    const value = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the new job title for the role you wish to add?'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary for the new role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department will this role be in?',
            choices: await grabData('departments')
        }
    ]);
    return value;
}

// 3. Add a department
const addDept = async () => {
    const value = await inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'What department would you like to add?'
        }
    ]);
    return value;
}

// 6. View employees by department ID
const viewDeptEmployees = async () => {
    const value = await inquirer.prompt(
        {
            type: 'list',
            name: 'department',
            message: 'Employee list for which department?',
            choices: await grabData('departments')
        }
    );
    return value;
}

// 8. View employees by manager ID
const viewTeam = async () => {
    const value = await inquirer.prompt(
        {
            type: 'list',
            name: 'manager',
            message: 'Employee list for which manager?',
            choices: await grabData('managers')
        }
    );
    return value;
}

// 12. View utilized department budget by department ID
const utilizedDeptBudget = async () => {
    const value = await inquirer.prompt([
        {
            type: 'list',
            name: 'department',
            message: 'For which department would you like to see the utilized budget?',
            choices: await grabData('departments')
        }
    ])
    return value;
}

// 13. Update employee role
const updateEmployee = async () => {
    const value = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: await grabData('employees')
        },
        {
            type: 'list',
            name: 'role',
            message: `What is the employee's new role?`,
            choices: await grabData('deptRoles')
        }]);
    return value;
}

// 14. Update manager of the employee
const updateManager = async () => {
    const value = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: await grabData('employees')
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Which manager does this employee now have?',
            choices: await grabData('managers')
        }
    ]);
    return value;
}

// 15. Delete employee from the database
const deleteEmployee = async () => {
    const value = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to delete?',
            choices: await grabData('employees')
        },
        {
            type: 'confirm',
            name: 'delete',
            message: 'Are you sure you want to delete this employee?'
        }
    ]);
    return value;
}

// 16. Delete role
const deleteRole = async () => {
    const value = await inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Which role would you like to delete?',
            choices: await grabData('roles')
        },
        {
            type: 'confirm',
            name: 'delete',
            message: 'Are you sure you want to delete this role?'
        }
    ]);
    return value;
}

// 17. Delete department
const deleteDept = async () => {
    const value = await inquirer.prompt([
        {
            type: 'list',
            name: 'department',
            message: 'Which department would you like to delete?',
            choices: await grabData('departments')
        },
        {
            type: 'confirm',
            name: 'delete',
            message: 'Are you sure you want to delete this department?'
        }
    ]);
    return value;
}

const next = async () => {
    const value = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'continue',
            message: 'Press enter to continue'
        }
    ]);
    return value.continue;
}

// Switch statement to choose from all prompts
const grabPrompt = async (choice) => {
    let prompt;
    switch (choice) {
        // CREATE 
        case 1: prompt = await addEmployee();
            break;
        case 2: prompt = await addRole();
            break;
        case 3: prompt = await addDept();
            break;

        // READ
        case 6: prompt = await viewDeptEmployees();
            break;
        case 8: prompt = await viewTeam();
            break;
        case 12: prompt = await utilizedDeptBudget();
            break;

        //UPDATE
        case 13: prompt = await updateEmployee();
            break;
        case 14: prompt = await updateManager();
            break;

        // DELETE
        case 15: prompt = await deleteEmployee();
            break;
        case 16: prompt = await deleteRole();
            break;
        case 17: prompt = await deleteDept();
            break;
        case 19: prompt = await next();
            break;
    }
    return prompt;
}

module.exports = grabPrompt;