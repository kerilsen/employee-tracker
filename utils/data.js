const db = require('../config/connection');

const lastNames = () => {
    return `SELECT id, last_name AS name FROM employees`;
}

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

const lastNames = db.query(`SELECT last_name FROM employees`);

const getChoices = async (value) => {
    let choice;
    switch (value) {
        case 'deptRoles': choice = deptRoles();
            break;
        case 'managers': choice = managers();
            break;
        case 'lastNames': choice = lastNames();
            break;

    }
    const [rows] = await db.query(choice);
    const choices = rows.map(row => ({ name: row.name, value: row.id }))
    return choices;
}

module.exports = { getChoices, lastNames };