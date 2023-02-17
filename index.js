const express = require('express')
const mysql =  require('mysql2')

const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

InsertIntoPeopleAName();

app.get('/', (req, res) => {
  let connection = mysql.createConnection(config);
  connection.query('SELECT * FROM people', (error, results) => {
    if (error) throw error;

    let names = "";

    results.forEach(c => {
      names += "<li>" + c.name + "</li>"
    });

    res.status(200).send("<h1>Full Cycle Rocks!</h1> <ul>" + names + "</ul>")
  });
  
  connection.end();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function InsertIntoPeopleAName() {
  let connection = mysql.createConnection(config);
  let sql = `INSERT INTO people(name) values('Natan Barros')`;

  connection.query(sql);
  connection.end();
}