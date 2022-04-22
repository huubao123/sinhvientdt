var express = require('express');
var router = express.Router();
var user = require('../controllers/api/user');
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })
/* GET users listing. */
router.get('/:id', user.getuser)
router.post('/update/:id',csrfProtection, user.update)
router.post('/checkpass/:id', user.checkpass)
module.exports = router;
