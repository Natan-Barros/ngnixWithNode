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

(async () => {
  const connection = await mysql.createConnection(config);

  await CreateTableIfNotExists(connection);
  await InsertIntoPeopleAName(connection);

  connection.end();
})();

app.get('/', async (req, res) => {
  const connection = await mysql.createConnection(config);
  const [rows] = await connection.execute('SELECT * FROM people');

  const names = rows.map(row => `<li>${row.name}</li>`).join('');
  res.status(200).send(`<h1>Full Cycle Rocks!</h1> <ul>${names}</ul>`);

  connection.end();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function InsertIntoPeopleAName(connection) {
  const sql = `INSERT INTO people(name) values('Natan Barros')`;
  await connection.execute(sql);
}

async function CreateTableIfNotExists(connection) {
  const createTableSql = 'CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL);';
  await connection.execute(createTableSql);
}
