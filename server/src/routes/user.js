const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/user');

router.get(`/`, usersCtrl.getUsers);
router.get('/:id', usersCtrl.getUser);
router.post('/', usersCtrl.createUser);
router.put('/:id', usersCtrl.editUser);
router.delete('/:id', usersCtrl.deleteUser);

module.exports = router;