const Pool = require('pg').Pool
const db = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  database: 'tfttracker',
  port: 5432,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});


module.exports = db;