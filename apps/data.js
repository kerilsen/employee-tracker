// This is a library of 'choices' to populate the inquirer prompts
// There is a switch operator 'grabData' that grabs them by function name
const db = require('../config/connection');

// 'deptRoles' Returns a list of departments and roles
const deptRoles = () => {
    return `SELECT dr.id AS id, concat(d.department_name, ' - ', r.title) AS name
    FROM departmentRoles dr
    LEFT JOIN roles r ON dr.role_id = r.id
    JOIN departments d ON dr.dept_id = d.id`
}

// 'managers' Returns a list of all managers
const managers = () => {
    return `SELECT DISTINCT e1.manager_id AS id, concat(e2.first_name, ' ', e2.last_name) AS name
    FROM employees e1
    JOIN employees e2 ON e1.manager_id = e2.id;`
}

// 'departments' Returns a list of all departments
const departments = () => {
    return `SELECT id, department_name AS name FROM departments;`
}

// 'employees' Returns a list of all employees
const employees = () => {
    return `SELECT id, concat(first_name, ' ', last_name) AS name FROM employees;`
}

// 'roles' Returns a list of all employee roles
const roles = () => {
    return `SELECT id, title AS name FROM roles;`
}

const grabData = async (value) => {
    let choice;
    switch (value) {
        case 'deptRoles': choice = deptRoles();
            break;
        case 'managers': choice = managers();
            break;
        case 'departments': choice = departments();
            break;
        case 'employees': choice = employees();
            break;
        case 'roles': choice = roles();
            break;
    }
    const [rows] = await db.query(choice);
    const choices = rows.map(row => ({ name: row.name, value: row.id }))
    return choices;
}

module.exports = grabData;