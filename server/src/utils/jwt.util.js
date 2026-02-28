const jwt = require('jsonwebtoken')
const SECRET_KEY = 'my_secret_key';

const generateToken = (user) => {
    const payload = {
        id: user.UserId,
        email: user.Email,
    };

    return jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
};

module.exports = { generateToken }