const controllers = require('./controllers.js');
const express = require('express');

const router = express.Router();

router.get('/', controllers.hello);

// write your routes
router.post('/users', controllers.signUp)
 router.get('/users',controllers.readAll)

module.exports = router;
