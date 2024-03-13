const db = require('../db/connection');
const grabQuery = require('./query');

const getChoices = async (value) => {
    const [rows] = await db.execute(grabQuery(value));
    const choices = rows.map(row => ({ name: row.name, value: row.id }))
    return choices;
}

module.exports = { getChoices };