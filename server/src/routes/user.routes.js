const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.get('/users', controller.getUsers);
router.get('/userById/:id', controller.getUser);
router.post('/createUser', controller.createUser);
router.put('/updateUser/:id', controller.updateUser);
router.delete('/deleteUser/:id', controller.deleteUser);

module.exports = router;