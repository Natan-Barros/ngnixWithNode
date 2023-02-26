const express = require('express')
const mysql = require('mysql2/promise')

const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const pool = mysql.createPool(config);

app.get('/', async (req, res) => {
  const connection = await pool.getConnection();
  await CreateTableIfNotExists(connection);

  const [rows] = await connection.execute('SELECT * FROM people');
  const names = rows.map(row => `<li>${row.name}</li>`).join('');

  res.status(200).send(`<h1>Full Cycle Rocks!</h1> <ul>${names}</ul>`);
  connection.end();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function InsertIntoPeopleAName(connection) {
  const name = `Natan Barros`;
  await connection.query('INSERT INTO people (name) VALUES (?)', [name]);
 
}

async function CreateTableIfNotExists(connection) {
  const [rows, fields] = await connection.query(`
    CREATE TABLE IF NOT EXISTS people (
      id INT(11) NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `);

  await InsertIntoPeopleAName(connection);
  connection.release();
}
