/*
* This file using for connection string
*/
let conn = {
   mysql: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'test',
      type: 'mysql'
   },
   oracle: {
      user: 'fds',
      password: 'fds#$2020',
      connectString: '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 10.91.110.62)(PORT = 1521))(CONNECT_DATA =(SID= fds)))',
      type: 'oracle'
   },
   pg: {
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'sa',
      port: 5432,
   }
};

module.exports = conn;
