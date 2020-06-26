const mysql = require("mysql");
const oracledb = require('oracledb');
const pg = require('pg');

let conn = {
   mysql: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'test',
      type: 'mysql'
   },
   oracle: {
    user: 'fds',
    password: 'fds#$2020',
    connectString: '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 10.91.110.62)(PORT = 1521))(CONNECT_DATA =(SID= fds)))',
    type: 'oracle'
    },
   pg: {
      user: 'sa',
      password: 'sa',
      connectString: 'postgres://postgres:sa@localhost:5432/db',
      type: 'PostgresQl'
    }
   };

 module.exports = conn;

