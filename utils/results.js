
const db = require('../config/connection');

const addEmployee = async (data) => {
    console.log(`addEmployee name is ${data.first_name} ${data.last_name} and their role id is ${data.role} and their manager id is ${data.manager}`);
    const employee = {
        "first_name": data.first_name,
        "last_name": data.last_name,
        "deptrole_id": data.role,
        "manager_id": data.manager
    };

    const query = {
        text: `INSERT INTO employees (first_name, last_name, deptrole_id, manager_id) VALUES (?, ?, ?, ?)`,
        values: [employee.first_name, employee.last_name, employee.deptrole_id, employee.manager_id]
    };

    try {
        await db.query(query);
        console.log(`${employee.first_name} ${employee.last_name} has been added successfully`);
    } catch (error) {
        console.error('Unable to add employee to database: ', error);
    }
};

// Switch statement to choose from all results
const sendResults = (choice, data) => {
    let result;
    switch (choice) {
        // CREATE 
        case 1: result = addEmployee(data);
            break;
        case 2: result = addRole(data);
            break;
        case 3: result = addDept(data);
            break;
        case 4: result = addDeptRole(data);
            break;

        // READ
        case 5: result = viewEmployees(data);
            break;
        case 6: result = viewDeptEmployees(data);
            break;
        case 7: result = getManagers(data);
            break;
        case 8: result = viewTeam(data);
            break;
        case 9: result = viewRoles(data);
            break;
        case 10: result = getDeptRoles(data);
            break;
        case 11: result = utilizedDeptBudget(data);
            break;

        //UPDATE
        case 12: result = updateEmployee(data);
            break;
        case 13: result = updateManager(data);
            break;

        // DELETE
        case 14: result = deleteEmployee(data);
            break;
        case 15: result = deleteRole(data);
            break;
        case 16: result = deleteDept(data);
            break;
    }
    return result;
}

module.exports = sendResults;