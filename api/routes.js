const controllers = require('./controllers.js');
const express = require('express');

const router = express.Router();

router.get('/', controllers.hello);

// write your routes
router.get('/users', controllers.readAll);
router.post('/users', controllers.signUp);
router.post('/comments', controllers.leaveComments);

module.exports = router;
