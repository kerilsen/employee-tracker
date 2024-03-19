const db = require('../config/connection');

const goodbye = () => {
    db.end((err) => {
        if (err) throw err;
        console.log('Disconnected from database.');
      });
      console.log('Goodbye!');
};

module.exports = goodbye;