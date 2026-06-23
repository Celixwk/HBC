const express = require('express');
const router = express.Router();
const { login, verifySession, updateCredentials } = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/login', login);
router.get('/verify', verifyToken, verifySession);
router.put('/credentials', verifyToken, updateCredentials);

module.exports = router;
