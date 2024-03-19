const db = require('../config/connection');
const grabQuery = require('./query');

const addEmployee = async (data) => {
    const employee = {
        "first_name": data.first_name,
        "last_name": data.last_name,
        "deptrole_id": data.role,
        "manager_id": data.manager
    }
    const query = {
        text: grabQuery(1),
        values: [employee.first_name, employee.last_name, employee.deptrole_id, employee.manager_id],
        message: `${employee.first_name} ${employee.last_name} has been added successfully`
    };
    await process(query);
    return;
};

const addRole = async (data) => {
    const role = {
        "title": data.title,
        "salary": data.salary,
        "dept_id": data.department
    }
    const roleQuery =
    {
        text: grabQuery(2),
        values: [role.title, role.salary],
        message: `${role.title} has been added successfully`
    };
    await process(roleQuery);
    return;
};

const addDept = async (data) => {
    const query = {
        text: grabQuery(3),
        values: [data.department_name],
        message: `${data.department_name} has been added successfully`
    };
    await process(query);
    return;
};

const addDeptRole = async (data) => {
    const role_id = await getLastID();
    const query = {
        text: grabQuery(4),
        values: [data.department, role_id],
        message: `Department roles table has been updated to include ${data.title}`
    }
}

const viewDeptEmployees = async (data) => {
    const query = {
        text: grabQuery(6),
        values: [data.department],
        message: ''
    };
    await process(query);
    return;
};

const viewTeam = async (data) => {
    const query = {
        text: grabQuery(8),
        values: [data.manager],
        message: ``
    };
    await process(query);
    return;
}

const updateEmployee = async (data) => {
    const query = {
        text: grabQuery(13),
        // am I getting the id here?
        values: [data.role, data.employee],
        message: `${data.employee.name} has been updated to a new role as ${data.role.name}`
    };
    await process(query);
    return;
}

const deleteEmployee = async (data) => {
    const query = {
        text: grabQuery(15),
        // am I getting the id here?
        values: [data.role.id, data.employee.id],
        message: `${data.employee.name} has been updated to a new role as ${data.role.name}`
    };
    await process(query);
    return;
}

const deleteRole = async (data) => {
    const query = {
        text: grabQuery(16),
        values: [data.role.id],
        message: `${data.role.name} has been deleted`
    };
    await process(query);
    return;
}

const deleteDept = async (data) => {
    if (data.delete) {
        const query = {
            text: grabQuery(17),
            values: [data.department],
            message: `${data.department} has been deleted`
        };
        await process(query);
        return;
    }
    else console.log('Department not deleted');
    return;
}

const getLastID = async () => {
    const id = await db.query(`SELECT LAST_INSERT_ID();`);
    return id;
}

// Helper function to process MySQL parametized results
const process = async (object) => {
    // do I need different processes depending on operation?
    try {
        const [rows] = await db.query(object.text, object.values);
        console.table(rows);
    } catch (error) {
        console.error('Error performing database operation: ', error);
    }
    console.info(object.message);
    return;
};

// Switch statement to choose from all MySQL operations
const updateDB = async (choice, data) => {
    switch (choice) {
        // CREATE 
        case 1: await addEmployee(data);
            break;
        case 2: await addRole(data);
            await addDeptRole(data);
            break;
        case 3: await addDept(data);
            break;

        // READ
        case 6: await viewDeptEmployees(data);
            break;
        case 8: await viewTeam(data);
            break;

        //UPDATE
        case 12: await updateEmployee(data);
            break;
        case 13: await updateManager(data);
            break;

        // DELETE
        case 14: await deleteEmployee(data);
            break;
        case 15: await deleteRole(data);
            break;
        case 16: await deleteDept(data);
            break;
    }
    return;
}

module.exports = updateDB;