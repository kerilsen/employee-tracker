const db = require('../config/connection');

const deptRoles = () => {
    return `SELECT dr.id AS id, concat(d.department_name, ' - ', r.title) AS name
    FROM departmentRoles dr
    LEFT JOIN roles r ON dr.role_id = r.id
    JOIN departments d ON dr.dept_id = d.id`
}

const managers = () => {
    return `SELECT DISTINCT e1.manager_id AS id, concat(e2.first_name, ' ', e2.last_name) AS name
    FROM employees e1
    JOIN employees e2 ON e1.manager_id = e2.id;`
}

const departments = () => {
    return `SELECT id, department_name AS name FROM departments;`
}

const employees = () => {
    return `SELECT id, concat(first_name, ' ', last_name) AS name FROM employees;`
}

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