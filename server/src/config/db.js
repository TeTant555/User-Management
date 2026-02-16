const sql = require('mssql');

const config = {
    user: "sa",
    password: "Tetant@12345",
    server: "THET-TETANT-AUN",
    port: 9090,
    database: "UserManagement",
    options: {
        trustServerCertificate: true
    },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

module.exports = {sql, pool, poolConnect};