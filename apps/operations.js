const db = require('../config/connection');
const grabQuery = require('./queries');

// 1. Add an employee
const addEmployee = async (data) => {
    const employee = {
        "first_name": data.first_name,
        "last_name": data.last_name,
        "deptrole_id": data.role,
        "manager_id": data.manager
    }
    const query = {
        text: await grabQuery(1),
        values: [employee.first_name, employee.last_name, employee.deptrole_id, employee.manager_id],
        message: `${employee.first_name} ${employee.last_name} has been added successfully`
    };
    await process(query);
    return;
};

// 2. Add a role
const addRole = async (data) => {
    const role = {
        "title": data.title,
        "salary": data.salary
    }
    const query =
    {
        text: await grabQuery(2),
        values: [role.title, role.salary],
        message: `${role.title} has been added successfully`
    };
    await process(query);
    await addDeptRole(data);
    return;
};

// 3. Add a department
const addDept = async (data) => {
    const query = {
        text: await grabQuery(3),
        values: [data.department_name],
        message: `${data.department_name} has been added successfully`
    };
    await process(query);
};

// 4. Add a new department and role pairing
const addDeptRole = async (data) => {
    const insert = await db.query(`SELECT LAST_INSERT_ID();`);
    const role_id = insert[0][0]['LAST_INSERT_ID()'];
    const dept_id = data.department;
    console.log(dept_id, role_id);
    const query = {
        text: await grabQuery(4),
        values: [dept_id, role_id],
        message: `Department roles table has been updated to include this role`
    };
    await process(query);
}

// 6. View employees by department ID
const viewDeptEmployees = async (data) => {
    const query = {
        text: await grabQuery(6),
        values: [data.department],
        message: ''
    };
    await format(query);
};

// 8. View employees by manager ID
const viewTeam = async (data) => {
    const query = {
        text: await grabQuery(8),
        values: [data.manager],
        message: ``
    };
    await format(query);
}

// 12. View utilized department budget by department ID
const utilizedDeptBudget = async (data) => {
    const query = {
        text: await grabQuery(12),
        values: [data.department],
        message: ``
    };
    await format(query);
}

// 13. Update employee record to reflect new role
const updateEmployee = async (data) => {
    const query = {
        text: await grabQuery(13),
        values: [data.role, data.employee],
        message: `Employee role has been updated`
    };
    await process(query);
}

// 14. Update manager of the employee
const updateManager = async (data) => {
    const query = {
        text: await grabQuery(14),
        values: [data.manager, data.employee],
        message: `${data.employee.name} now has a new manager (${data.manager.name})`
    };
    await process(query);
}

// 15. Delete employee from the database
const deleteEmployee = async (data) => {
    if (data.delete) {
        const query = {
            text: await grabQuery(15),
            values: [data.employee],
            message: `Employee #${data.employee} has been deleted from the database`
        };
        await process(query);
    }
    else console.log('Employee not deleted');
}

// 16. Delete role
const deleteRole = async (data) => {
    if (data.delete) {
        const query = {
            text: await grabQuery(16),
            values: [data.role],
            message: `This role has been deleted`
        };
        await process(query);
    }
    else console.log('Role not deleted');
}

// 17. Delete department
const deleteDept = async (data) => {
    if (data.delete) {
        const query = {
            text: await grabQuery(17),
            values: [data.department],
            message: `This department has been deleted`
        };
        await process(query);
    }
    else console.log('Department not deleted');
}

// HELPER FUNCTIONS
// Process database operation AND format results to rows/table
const format = async (object) => {
    try {
        const [rows] = await db.query(object.text, object.values);
        console.table(rows);
    } catch (error) {
        console.error('Unable to return your search results');
    }
    return;
}

// Process MySQL database operation with user input and return confirmation message
const process = async (object) => {
    try {
        await db.query(object.text, object.values);
        console.log(object.message);
    } catch (error) {
        console.error('Error performing database operation: ', error);
    }
}

// Switch statement to choose from all MySQL operations
const updateDB = async (choice, data) => {
    switch (choice) {
        // CREATE 
        case 1: await addEmployee(data);
            break;
        case 2: await addRole(data);
            break;
        case 3: await addDept(data);
            break;

        // READ
        case 6: await viewDeptEmployees(data);
            break;
        case 8: await viewTeam(data);
            break;
        case 12: await utilizedDeptBudget(data);
            break;

        //UPDATE
        case 13: await updateEmployee(data);
            break;
        case 14: await updateManager(data);
            break;

        // DELETE
        case 15: await deleteEmployee(data);
            break;
        case 16: await deleteRole(data);
            break;
        case 17: await deleteDept(data);
            break;
    }
    return;
}

module.exports = updateDB;