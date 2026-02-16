const service = require('../services/user.service');

async function getUsers(req, res) {
    const data = await service.getUsers();
    res.json(data);
}

async function getUser(req, res) {
    try {
        const data = await service.getUser(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

async function createUser(req, res) {
    try {
        const data = await service.createUser(req.body);
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function updateUser(req, res) {
    const data = await service.updateUser(req.params.id, req.body);
    res.json(data);
}

async function deleteUser(req, res) {
    await service.deleteUser(req.params.id);
    res.json({ message: 'User deleted successfully' });
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};