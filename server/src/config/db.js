const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'UserManagement',
    process.env.DB_USER || 'sa',
    process.env.DB_PASSWORD || 'Tetant@12345',
    {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 9090),
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: false,
            trustServerCertificate: true
        }
    },
    logging: false
});

module.exports = { sequelize };