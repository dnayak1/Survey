var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'liverpool',
  database : 'patient_survey'
});

exports.connection=connection;
