var mysql = require('mysql');

// connect to the db
dbConnectionInfo = {
  host: "remotemysql.com",
  port: "3306",
  user: "H5vkxkG8qn",
  password: "rkJ3cr2xNs",
  connectionLimit: 5, //mysql connection pool length
  database: "H5vkxkG8qn"
};




//create mysql connection pool
var dbconnection = mysql.createPool(
  dbConnectionInfo
);

// Attempt to catch disconnects 
dbconnection.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});


module.exports = dbconnection;