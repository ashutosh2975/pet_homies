const express = require('express');
const router = express.Router();
const { chatController } = require('../Controller/ChatController');

router.post('/chat', chatController);

module.exports = router;