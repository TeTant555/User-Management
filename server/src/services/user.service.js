const repo = require('../repositories/user.repository');
const bcrypt = require('bcrypt');

async function getUsers() {
    return await repo.findAll();
}

async function getUser(id) {
    const user = await repo.findById(id);
    if (!user) throw new Error('User not found');
    return user;
}

async function createUser(data) {
    if (!data.UserName || !data.PassWord || !data.Email || !data.FirstName || !data.LastName) {
        throw new Error('Missing required fields');
    }
    const hashedPassword = await bcrypt.hash(data.PassWord, 10);
    const userToCreate = {...data, PassWord: hashedPassword };
    return await repo.create(userToCreate);
}

async function updateUser(id, data) {
    const updateData = { ...data };
    if (updateData.PassWord) {
        updateData.PassWord = await bcrypt.hash(updateData.PassWord, 10);
    }
    return await repo.update(id, updateData);
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