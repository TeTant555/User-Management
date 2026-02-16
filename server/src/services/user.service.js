const repo = require('../repositories/user.repository');

async function getUsers() {
    return await repo.findAll();
}

async function getUser(id) {
    const user = await repo.findById(id);
    if (!user) throw new Error('User not found');
    return user;
}

async function createUser(data) {
    if (!data.UserName || !data.PassWord || !data.Email) {
        throw new Error('Missing required fields');
    }
    return await repo.create(data);
}

async function updateUser(id, data) {
    return await repo.update(id, data);
}

async function deleteUser(id) {
    await repo.remove(id);
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}