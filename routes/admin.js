var express = require('express');
var router = express.Router();
var passport = require('passport');
var admin = require('../controllers/admin')
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })
const bodyParser = require("body-parser");


router.use(bodyParser.urlencoded({extended:true}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) 
        return next();
    res.redirect('/login');
  }
  

router.get('/',csrfProtection,isLoggedIn,admin.getadmin)
router.post('/taophongban',csrfProtection,admin.taophongban)
module.exports = router;
