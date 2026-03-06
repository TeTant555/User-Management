const repo = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt.util');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');

// Temporarily using the Google OAuth Playground Client ID for testing
const GOOGLE_CLIENT_ID = '407408718192.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID)

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

async function googleLogin(idToken) {
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    let user = await repo.findByEmail(email);

    if (!user) {
        const randomPassword = crypto.randomBytes(16).toString('hex');
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        const newUserSchema = {
            UserName: email.split('@')[0],
            PassWord: hashedPassword,
            Email: email,
            FirstName: payload.given_name || 'Google',
            LastName: payload.family_name || 'User',
        };

        user = await repo.create(newUserSchema);
    }

    const currentTime = new Date();
    const sqlFormattedTime = currentTime.toISOString().slice(0, 19).replace('T', ' ');

    const userId = user.userId || user.id;
    await repo.update(userId, { LastLogin: sqlFormattedTime });
    user.LastLogin = sqlFormattedTime;

    const token = generateToken(user);
    const userJson = user.toJSON() ? user.toJSON() : user;
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
    login,
    googleLogin
}