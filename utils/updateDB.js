
const db = require('../config/connection');

const addEmployee = async (data) => {
    const employee = {
        "first_name": data.first_name,
        "last_name": data.last_name,
        "deptrole_id": data.role,
        "manager_id": data.manager
    };
    const query = {
        text: `INSERT INTO employees (first_name, last_name, deptrole_id, manager_id) VALUES (?, ?, ?, ?)`,
        values: [employee.first_name, employee.last_name, employee.deptrole_id, employee.manager_id],
        message: `${employee.first_name} ${employee.last_name} has been added successfully`
    };
    return query;
};

const addRole = async (data) => {

    // const role = {
    //     "title": data.title,
    //     "salary": data.salary,
    //     "dept_id": data.dept_id
    // };

    let query = [
        {
            text: `INSERT INTO roles (title, salary) VALUES (?, ?);`,
            values: [data.title, data.salary, data.dept_id],
            message: `${data.title} has been added successfully`
        },
        {
            text: `SET @role_id = LAST_INSERT_ID();
        INSERT INTO departmentRoles (dept_id, role_id) VALUES (?, @role_id);`,
            values: [data.dept_id],
            message: `Department roles table has been updated to include ${data.title};`
        }];
    process(query[0]);
    process(query[1]);

    return query;
};

// Helper function to process MySQL parametized results
const process = async (object) => {
    await db.query(object.text, object.values, (error, results)) => {
        if (error) {
            console.error('Error performing database operation: ')
        }
    }
        console.log(object.message);
    } catch (error) {
        console.error('Unable to update database: ', error);
    }
    return results;
}

// Switch statement to choose from all results
const updateDB = async (choice, data) => {
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
    return;
}

module.exports = updateDB;