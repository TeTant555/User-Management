const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

// Authentication and User Management Routes
router.get('/users', controller.getUsers);
router.get('/userById/:id', controller.getUser);
router.post('/login', controller.login);
router.post('/googleLogin', controller.googleLogin);
router.post('/register', controller.createUser);
router.put('/updateUser/:id', controller.updateUser);
router.delete('/deleteUser/:id', controller.deleteUser);

module.exports = router;