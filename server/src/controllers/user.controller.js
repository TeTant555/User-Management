const service = require('../services/user.service');
const { sendSuccess, sendError } = require('../utils/response.util')
const { CreateUserRequest, UpdateUserRequest, LoginRequest, GoogleLoginRequest } = require('../dtos/userDtos/user.request.dto');
const { UserResponse, AuthResponse, DeleteResponse } = require('../dtos/userDtos/user.response.dto');

async function getUsers(req, res) {
    try {
        const users = await service.getUsers();
        const data = users.map(user => new UserResponse(user));  
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
        return sendSuccess(res, 'User retrieved successfully', new UserResponse(data));
    } catch (err) {
        return sendError(res, err.message || 'Failed to retrieve user', 500);
    }
}

async function login(req, res) {
    try {
        const request = new LoginRequest(req.body);
        const errors = request.validate();
        if (errors.length > 0) {
            return sendError(res, errors.join(', '), 400);
        }
        const { user, token } = await service.login(request.Email, request.PassWord);

        return sendSuccess(res, 'Login successful', new AuthResponse(user, token), 200);
    } catch (err) {
        return sendError(res, err.message || 'Login failed', 401);
    }
}

async function googleLogin(req, res) {
    try {
        const request = new GoogleLoginRequest(req.body);
        const errors = request.validate();
        if (errors.length > 0) {
            return sendError(res, errors.join(', '), 400);
        }

        const { user, token } = await service.googleLogin(request.idToken);
        return sendSuccess(res, 'Google login successful', new AuthResponse(user, token), 200);
    } catch (err) {
        console.error('Google Auth error:', err);
        return sendError(res, err.message || 'Google login failed', 401);
    }
}

async function createUser(req, res) {
    try {
        const request = new CreateUserRequest(req.body);
        const errors = request.validate();
        if (errors.length > 0) {
            return sendError(res, errors.join(', '), 400);
        }

        const user = await service.createUser(request);
        return sendSuccess(res, 'User created successfully', new UserResponse(user), 201);
    } catch (err) {
        return sendError(res, err.message || 'Failed to create user', 400);
    }
}

async function updateUser(req, res) {
    try {
        const request = new UpdateUserRequest(req.body);
        const errors = request.validate();
        if (errors.length > 0) {
            return sendError(res, errors.join(', '), 400);
        }

        const user = await service.updateUser(req.params.id, request);
        if (!user) {
            return sendError(res, 'User not found', 404);
        }
        return sendSuccess(res, 'User updated successfully', new UserResponse(user));
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
        return sendSuccess(res, 'User deleted successfully', new DeleteResponse(req.params.id));
    } catch (err) {
        return sendError(res, err.message || 'Failed to delete user', 500);
    }
}

module.exports = {
    getUsers,
    getUser,
    login,
    createUser,
    updateUser,
    deleteUser,
    googleLogin,
};