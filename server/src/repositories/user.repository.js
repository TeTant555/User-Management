const { sql, pool, poolConnect } = require('../config/db');

async function findAll() {
    await poolConnect;
    const result = await pool.request().query('SELECT * FROM Users');
    return result.recordset;
}

async function findById(id) {
    await poolConnect;
    const result = await pool
        .request()
        .input("UserId", sql.UniqueIdentifier, id)
        .query('SELECT * FROM Users WHERE UserId = @UserId');
    return result.recordset[0];
}

async function create(user) {
    await poolConnect;

    const result = await pool
        .request()
        .input("UserName", sql.NVarChar, user.UserName)
        .input("PassWord", sql.NVarChar, user.PassWord)
        .input("Email", sql.NVarChar, user.Email)
        .input("FirstName", sql.NVarChar, user.FirstName)
        .input("LastName", sql.NVarChar, user.LastName)
        .query(`
        INSERT INTO Users (UserName, PassWord, Email, FirstName, LastName)
        OUTPUT inserted.*
        VALUES (@UserName, @PassWord, @Email, @FirstName, @LastName)
        `);

    return result.recordset[0];
}

async function update(id, user) {
    await poolConnect;

    await pool
        .request()
        .input("UserId", sql.UniqueIdentifier, id)
        .input("FirstName", sql.NVarChar, user.FirstName)
        .input("LastName", sql.NVarChar, user.LastName)
        .input("IsActive", sql.Bit, user.IsActive)
        .query(`
            UPDATE Users
            SET FirstName = @FirstName, 
            LastName = @LastName, 
            IsActive = @IsActive
            WHERE UserId = @UserId
            `);

    return findById(id);
}

async function remove(id) {
    await poolConnect;
    await pool
        .request()
        .input("UserId", sql.UniqueIdentifier, id)
        .query('DELETE FROM Users WHERE UserId = @UserId');
}

module.exports = { findAll, findById, create, update, remove };