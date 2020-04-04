var mysql = require('mysql');

/**数据库连接 */
var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '540882',
  database: 'property_management',
  multipleStatements: true
});

connection.connect()

module.exports = connection;

//exports是引用 module.exports的值