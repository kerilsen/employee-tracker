// CREATE
// READ 
// return `SELECT * FROM departments;`;
// return `SELECT id, first_name, last_name, title, salary
// FROM employees
// LEFT JOIN roles
// ON employees.role_id = roles.id;`;
// UPDATE 
// DELETE

// View all departments
// Formatted table showing department names and department ids
`SELECT id AS ID, department_name AS Department from departments;`
// View all roles
// job title, role id, the department that role belongs to, and the salary for that role

// View all employees
// a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
`SELECT * FROM employees `
`SELECT id, first_name, last_name, title, salary
// FROM employees
// LEFT JOIN roles
// ON employees.role_id = roles.id;`;

// Add a department
// enter the name of the department and that department is added to the database
`INSERT INTO department (department_name) VALUES (?)`

// Add a role
// enter the name, salary, and department for the role and that role is added to the database
`INSERT INTO roles (title, salary) VALUES (?)`

// Add an employee
// enter the employee’s first name, last name, role, and manager, and that employee is added to the database
`INSERT INTO employees (first_name, last_name, role_id) VALUES (?)`

// Update employee role
// select an employee to update and their new role and this information is updated in the database 
`UPDATE employees WHERE id = ? SET role_id = ?` // value of the user input