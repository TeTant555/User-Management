const repo = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt.util');

async function getUsers() {
    return await repo.findAll();
}

async function getUser(id) {
    const user = await repo.findById(id);
    if (!user) throw new Error('User not found');
    return user;
}

async function login(email, password) {
    const user = await repo.findByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.PassWord);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    
    const now = new Date();
    await repo.update(user.id, { LastLogin: now });
    user.LastLogin = now;
    
    const token = generateToken(user);
    const userJson = user.toJSON();
    delete userJson.PassWord;
    return { user: userJson, token };
}

async function createUser(data) {
    if (!data.UserName || !data.PassWord || !data.Email || !data.FirstName || !data.LastName) {
        throw new Error('Missing required fields');
    }
    const userToCreate = {
        ...data,
        PassWord: await bcrypt.hash(data.PassWord, 10)
    };
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
    return await repo.remove(id);
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login
}