const db = require('../config/connection');
const { goodbye } = require('../assets/goodbye');

// CREATE
// 1. Add a new employee
const addEmployee = () => {
    // Ask which department and role combination
    return `INSERT INTO employees (first_name, last_name, deptrole_id, manager_id) VALUES (?, ?, ?, ?);`;
}

// 2. Add a new role and salary
const addRole = () => {
    // Ask what department too
    return `INSERT INTO roles (title, salary) VALUES (?, ?);`;
}

// 3. Add a new department
const addDept = () => {
    return `INSERT INTO departments (department_name) VALUES (?);`
}

// 4. Add a new department-role - will only accept a unique combination of values
const addDeptRole = () => {
    return `INSERT IGNORE INTO departmentRoles (dept_id, role_id) VALUES (?, ?);`
}

//READ
// 5. View all employees
const viewEmployees = () => {
    return `SELECT e1.id AS Employee_ID, e1.last_name AS Last_name, e1.first_name AS First_name, r.title AS Title, r.salary AS Salary, d.department_name AS Department, concat(e2.first_name, ' ', e2.last_name) as Manager 
    FROM employees e1
    JOIN departmentRoles dr ON e1.deptrole_id = dr.id 
    JOIN departments d ON dr.dept_id = d.id 
    JOIN roles r ON dr.role_id = r.id 
    LEFT JOIN employees e2 ON e1.manager_id = e2.id
    ORDER BY e1.last_name;`;
}

// 6. View employees by department
const viewDeptEmployees = () => {
    return `SELECT d.department_name AS Department, concat(e.first_name, ' ', e.last_name) AS Employee FROM departments d JOIN departmentRoles dr ON d.id = dr.dept_id JOIN employees e ON e.deptrole_id = dr.id WHERE d.id = ?;`
}

// 7. Get a list of all managers
const getManagers = () => {
    return `SELECT DISTINCT e1.manager_id AS ManagerID, concat(e2.first_name, ' ', e2.last_name) AS Manager
    FROM employees e1
    JOIN employees e2 ON e1.manager_id = e2.id;`;
}

// 8. View employees by manager
const viewTeam = () => {
    // get list of managers to choose from then grab id
    return `SELECT concat(first_name, ' ', last_name) AS Team_members FROM employees WHERE manager_id = ?;`
}

// 9. View all roles
const viewRoles = () => {
    return `SELECT id AS ID, title AS Role, salary AS Salary FROM roles;`;
}

// 10. View all departments
const viewDepartments = () => {
    return `SELECT id AS ID, department_name AS Department FROM departments`;
}

// 11. View all departments with roles
const getDeptRoles = () => {
    // send a list of department with roles to choose from
    return `SELECT dr.id AS JobID, d.department_name AS Department, r.title AS Role
    FROM departmentRoles dr
    LEFT JOIN roles r ON dr.role_id = r.id
    JOIN departments d ON dr.dept_id = d.id`;
    // get the id from the selection to send to updateEmployees
}

// 12. View utilized department budget by department ID
const utilizedDeptBudget = () => {
    return `SELECT d.department_name AS Department, SUM(r.salary) AS Utilized_Budget FROM employees e
    JOIN departmentRoles dr ON e.deptrole_id = dr.id
    JOIN roles r ON r.id = dr.role_id
    JOIN departments d ON d.id = dr.dept_id
    WHERE dr.dept_id = ?`
}

// UNUSED READ QUERIES
// Find the manager(s) of a particular departmentRole
// const findBoss = () => {
//     return `SELECT DISTINCT e1.manager_id AS ManagerID, concat(e2.first_name, ' ', e2.last_name) AS Manager
//     FROM employees e1
//     JOIN employees e2 ON e1.manager_id = e2.id
//     WHERE e1.deptrole_id = ?`;
// }

// Query that shows distinct JobID, Department Name, Role and Manager
// SELECT DISTINCT dr.id AS JobID, d.department_name AS Department, r.title AS Role, e2.last_name AS Manager
// FROM departmentRoles dr
// LEFT JOIN roles r ON dr.role_id = r.id
// JOIN departments d ON dr.dept_id = d.id
// LEFT JOIN employees e1 ON e1.deptRole_id = dr.id
// LEFT JOIN employees e2 ON e2.id = e1.manager_id;

// UPDATE
// 13. Update employee record
const updateEmployee = () => {
    // get department/role id
    return `UPDATE employees SET deptrole_id = ? WHERE id = ?;`;
}

// Update employee managers
// 14. Update employee's manager
const updateManager = () => {
    // get list of managers to choose from
    return `UPDATE employees WHERE id = ? SET manager_id = ?;`
}

// DELETE

// 15. Delete employee record
const deleteEmployee = () => {
    return `DELETE FROM employees WHERE id = ?;`;
}

// 16. Delete role
const deleteRole = () => {
    return `DELETE FROM roles WHERE id = ?;`;
}

// 17. Delete department
const deleteDept = () => {
    return `DELETE FROM departments WHERE id = ?;`;
}

// 18. quit
const quit = () => {
    // not calling on the database here
    goodbye();
}

// Switch statement to choose from all queries - send parameters or just leave ?
const grabQuery = (choice) => {
    let query;
    switch (choice) {
        // CREATE 
        case 1: query = addEmployee();
            break;
        case 2: query = addRole();
            break;
        case 3: query = addDept();
            break;
        case 4: query = addDeptRole();
            break;

        // READ
        case 5: query = viewEmployees();
            break;
        case 6: query = viewDeptEmployees();
            break;
        case 7: query = getManagers();
            break;
        case 8: query = viewTeam();
            break;
        case 9: query = viewRoles();
            break;
        case 10: query = viewDepartments();
            break;
        case 11: query = getDeptRoles();
            break;
        case 12: query = utilizedDeptBudget();
            break;

        //UPDATE
        case 13: query = updateEmployee();
            break;
        case 14: query = updateManager();
            break;

        // DELETE
        case 15: query = deleteEmployee();
            break;
        case 16: query = deleteRole();
            break;
        case 17: query = deleteDept();
            break;

        // QUIT
        case 18: query = quit();
            break;
    }
    return query;
}

module.exports = grabQuery;