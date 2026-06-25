const express = require('express');
const router = express.Router();
const { login, verifySession } = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/login', login);
router.get('/verify', verifyToken, verifySession);

module.exports = router;
