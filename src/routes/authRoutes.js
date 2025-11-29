const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.get('/login', auth.login);
router.post('/login', auth.loginProcess);

router.get('/register', auth.register);
router.post('/register', auth.registerProcess);

router.get('/logout', auth.logout);

module.exports = router;
