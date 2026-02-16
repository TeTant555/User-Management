const service = require('../services/user.service');
const { sendSuccess, sendError } = require('../utils/response.util')

async function getUsers(req, res) {
    try {
        const data = await service.getUsers();
        return sendSuccess(res, 'Users retrieved successfully', data);
    } catch (error) {
        return sendError(res, error.message || 'Failed to retrieve users', 500);
    }
}

async function getUser(req, res) {
    try {
        const data = await service.getUser(req.params.id);
        if (!data) {
            return sendError(res, 'User not found', 404);
        }
        return sendSuccess(res, 'User retrieved successfully', data);
    } catch (err) {
        return sendError(res, err.message || 'Failed to retrieve user', 500);
    }
}

async function createUser(req, res) {
    try {
        const data = await service.createUser(req.body);
        const { PassWord, ...safeUser }  = data;
        return sendSuccess(res, 'User created successfully', safeUser, 201);
    } catch (err) {
        return sendError(res, err.message || 'Failed to create user', 400);
    }
}

async function updateUser(req, res) {
    try {
        const data = await service.updateUser(req.params.id, req.body);
        if (!data) {
            return sendError(res, 'User not found', 404);
        }
        return sendSuccess(res, 'User updated successfully', data);
    } catch (err) {
        return sendError(res, err.message || 'Failed to update user', 400);
    }
}

async function deleteUser(req, res) {
    try {
        const deleted = await service.deleteUser(req.params.id);
        if (!deleted) {
            return sendError(res, 'User not found', 404);
        }
        return sendSuccess(res, 'User deleted successfully', { id: req.params.id });
    } catch (err) {
        return sendError(res, err.message || 'Failed to delete user', 500);
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};