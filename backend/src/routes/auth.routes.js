const express = require('express');
const router = express.Router();
const { login, verifySession, updateMyPassword } = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/login', login);
router.get('/verify', verifyToken, verifySession);
router.put('/password', verifyToken, updateMyPassword);

module.exports = router;

