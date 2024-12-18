const sql = require('mssql');
require('dotenv').config(); 

// Database configuration from environment variables
const config = {
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  server: process.env.DB_SERVER, 
  port: parseInt(process.env.DB_PORT, 10) || 1433, 
  database: process.env.DB_NAME, 
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    enableArithAbort: true, 
  },
};

// Create connection pool promise
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server successfully.');
    return pool;
  })
  .catch(err => {
    console.error('Database Connection Failed:', err.message);
    process.exit(1); 
  });

module.exports = { sql, poolPromise };
