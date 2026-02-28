const User = require('../models/user.model');

async function findAll() {
    return await User.findAll();
}

async function findById(id) {
    return await User.findByPk(id);
}

async function findByEmail(email) {
    return await User.unscoped().findOne({ where: { Email: email } });
}

async function create(user) {
    return await User.create(user);
}

async function update(id, user) {
    const existingUser = await User.findByPk(id);
    if (!existingUser) return null;
    await existingUser.update(user);
    return existingUser;
}

async function remove(id) {
    const existingUser = await User.findByPk(id);
    if (!existingUser) return null;
    await existingUser.destroy();
    return existingUser;
}

module.exports = { findAll, findById, create, update, remove, findByEmail };