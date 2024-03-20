# Employee Tracker

  ## Description

  ![License: MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)

  [GitHub repository](https://github.com/kerilsen/employee-tracker)

  [Walkthrough video](https://drive.google.com/file/d/1SsMNHVFMcNLFdjz9G0PXIZBZWqgQlhIB/view)

  This is a command-line application that manages a fictional company's employee database using Node.js, Inquirer and MySQL. I learned a lot about using Inquirer asynchronously and creating and using a MySQL database without using a browser or an object relational mapping tool such aas Sequelize. It was a lot of fun creating a basic text-based program. 
  
  My challenges included creating a many-to-many relationship between my departments and roles because some of the roles were in different departments. I tried hard to not change my imaginary data to suit the structure of the MySQL database and to implement structural changes instead. I spent a lot of time trying to figure out how to reuse queries for both data collection and displaying results (i.e. a query that gives the user a formatted table of all employees versus a query that returns a simple list of employees for the user to choose from when updating roles) before maintaining two separate 'libraries' for this purpose: 'queries' and 'data'. And I spent a lot of time trying to organize my template literals, MySQL operations, inquirer prompts and simple data as separate entities. In the end, I'm not sure if it's the best architecture, but it did make creating new operations fairly simple and the code fairly readable.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)

  ## Installation

  1. Navigate to the root directory of the project folder 
  2. Type `npm i` to install all required dependencies 
  3. Create an .env folder with your MYSQL username and password
  4. Type `mysql -u root -p` and hit enter and then type your password (assuming your username is root) 
  5. Type `run source db/schema.sql;` and then `source db/seeds.sql;` and then `exit;` 
  6. Type `npm start` to launch

  ## Usage

  When you enter the application, you are shown a menu of commands to choose from. Scroll up and down to make your selection and then hit enter to continue. Certain commands (such as most of the 'view') commands are simple commands that do not require further input from the user. Others (such as the create commands) require further input and data entry from the user. A walkthrough video is provided to show how it operates.

    [Walkthrough video](https://drive.google.com/file/d/1SsMNHVFMcNLFdjz9G0PXIZBZWqgQlhIB/view)

  ## Contributing

  * [inquirer with async/await](https://gist.github.com/midnightcodr/bd8f9cd4414f5571774c141d1e0865d8)
  * Stack Overflow for a glitch where inquirer was overwriting my console.logs (wrapped the userInterface prompt in a setTimeout function)
  * MySQL documentation
  * Inquirer documentation
  * Debugging and learning assistance from Xpert Learning

  ## License

  [License: MIT License](https://opensource.org/licenses/MIT)

  ## Tests

  N/A

  ## Questions

  If you have any questions about this project, please contact me at keri.l.sen@gmail.com.

  My GitHub profile is at: [https://github.com/kerilsen](https://github.com/kerilsen)
