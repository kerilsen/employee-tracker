
const viewEmployees = () => {
    return `SELECT e1.id AS Employee_ID, e1.first_name AS First_name, e1.last_name AS Last_name, r.title AS Title, r.salary AS Salary, d.department_name AS Department, concat(e2.first_name, ' ', e2.last_name) as Manager 
    FROM employees e1
    JOIN departmentRoles dr ON e1.deptrole_id = dr.id 
    JOIN departments d ON dr.dept_id = d.id 
    JOIN roles r ON dr.role_id = r.id 
    LEFT JOIN employees e2 ON e1.manager_id = e2.id`;
}

const addEmployee = (array) => {
    return `INSERT INTO employees (first_name, last_name, deptrole_id, manager_id) VALUES (${array})`
}

const updateEmployee = (array) => {
    // search function?? what if you only want to update one field? still cycle through all of the options? or send a list of items to change
    // then use the result to construct the query
    return `UPDATE employees SET first_name = ${first_name}, last_name = ${last_name}, deptRole_id = ?, manager_id = ? WHERE id = ?`;
}

const viewRoles = () => {
    return `SELECT id AS ID, role_name AS Role FROM roles`;
}

const getDeptRoles = () => {
    // send a list of department with roles to choose from
    return `SELECT dr.id AS JobID, d.department_name AS Department, r.title AS Role
    FROM departmentRoles dr
    LEFT JOIN roles r ON dr.role_id = r.id
    JOIN departments d ON dr.dept_id = d.id`;
    // get the id from the selection to send to updateEmployees
}

// Query that shows distinct JobID, Department Name, Role and Manager
// SELECT DISTINCT dr.id AS JobID, d.department_name AS Department, r.title AS Role, e2.last_name AS Manager
// FROM departmentRoles dr
// LEFT JOIN roles r ON dr.role_id = r.id
// JOIN departments d ON dr.dept_id = d.id
// LEFT JOIN employees e1 ON e1.deptRole_id = dr.id
// LEFT JOIN employees e2 ON e2.id = e1.manager_id;

// Find the manager(s) of a particular departmentRole
const findBoss = () => {
    return `SELECT DISTINCT e1.manager_id AS ManagerID, concat(e2.first_name, ' ', e2.last_name) AS Manager
    FROM employees e1
    JOIN employees e2 ON e1.manager_id = e2.id
    WHERE e1.deptrole_id = ?`;
}

// Get a list of all managers
const getManagers = () => {
    return `SELECT DISTINCT e1.manager_id AS ManagerID, concat(e2.first_name, ' ', e2.last_name) AS Manager
    FROM employees e1
    JOIN employees e2 ON e1.manager_id = e2.id`;
}

// Update employee managers
const updateManager = () => {
    // get list of managers to choose from
    return `UPDATE employees WHERE id = ? SET manager_id = ?`
}

// View employees by manager
const viewTeam = () => {
    // get list of managers to choose from then grab id
    return `SELECT concat(first_name, ' ', last_name) AS Team_members FROM employees WHERE manager_id = ?`
}

// View employees by department
// NEED TO CHECK ON WORKBENCH
const viewDeptEmployees = () => {
return `SELECT d.department_name AS Department, concat(e.first_name, ' ', e.last_name) AS Employee FROM departments d JOIN departmentRoles dr e ON d.id = dr.department_id JOIN employees e ON e.deptrole_id = dr.id`
}

// Add a new role and salary
const addRole = () => {
    return `INSERT INTO roles (title, salary) VALUES (?, ?)`;
}

// Add a new department
const addDept = () => {
    return `INSERT INTO departments (department_name) VALUES (?)`
}

// Add a new department-role - will only accept a unique combination of values
const addDeptRole = () => {
    return `INSERT IGNORE INTO departmentRoles (dept_id, role_id) VALUES (?, ?)`
}

const deleteDept = () => {
    return `DELETE FROM departments WHERE id = ?`;
}

const deleteRole = () => {
    return `DELETE FROM roles WHERE id = ?`;
}

const deleteEmployee = () => {
    return `DELETE FROM employees WHERE id = ?`;
}

const createNew = (object) => {
    return `INSERT INTO ${object.table} VALUES (${object.value})`
}

const readResults = (object) => {
    return `SELECT ${object.column} FROM ${object.table} ${object.condition}`
}

const updateRow = (object) => {
    return `UPDATE ${object.table} WHERE ${object.condition} SET ${object.column} = ${object.values}`
}

const deleteRow = (object) => {
    return `DELETE FROM ${object.table} WHERE ${object.condition}`;
}

const utilizedDeptBudget = () => {
    return `SELECT d.department_name AS Department, SUM(r.salary) AS Utilized_Budget FROM employees e
    JOIN departmentRoles dr ON e.deptrole_id = dr.id
    JOIN roles r ON r.id = dr.role_id
    JOIN departments d ON d.id = dr.dept_id
    WHERE dr.dept_id = ?`
}

// SELECT e1.id AS Employee_ID, e1.first_name AS First_name, e1.last_name AS Last_name, r.title AS Title, r.salary AS Salary, d.department_name AS Department, concat(e2.first_name, ' ', e2.last_name) as Manager 
//     FROM employees e1
//     JOIN departmentRoles dr ON e1.deptrole_id = dr.id 
//     JOIN departments d ON dr.dept_id = d.id 
//     JOIN roles r ON dr.role_id = r.id 
//     LEFT JOIN employees e2 ON e1.manager_id = e2.id`

const grabQuery = (choice, params) => {
    let query;
    switch (choice) {
        case 1: query = viewEmployees();
            break;
        case 2: query = addEmployee(params);
            break;
        case 3: query = updateEmployee(params);
            break;
        case 4: query = viewRoles();
            break;
        case 5: query = getDeptRoles();
        break;
        case 6: query = getManagers();
        break;
        case 7: query = updateManager(params);
        break;
        case 8: query = viewTeam(params);
        break;
        case 9: query = 

    }
    // switch statement to choose query
}

module.exports = { grabQuery };