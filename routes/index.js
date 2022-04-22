var express = require('express');
var router = express.Router();
var passport = require('passport');
const bodyParser = require("body-parser");
var post = require('../controllers/post');
router.use(bodyParser.urlencoded({extended:true}));
var login = require('../controllers/login')
var loginapi = require('../controllers/api/login')

require('../controllers/api/local')(passport)
var phongban = require('../controllers/phongban')
var phongbanapi = require('../controllers/api/phongban')
var info = require('../controllers/info')
var admin = require('../controllers/admin')
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })
/* GET home page. */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) 
      return next();
  res.redirect('/login');
}
router.get('/',isLoggedIn, function(req, res, next) {
  res.render('main', {layout: 'layout',title: 'Social',username:req.user.name, picture: req.user.picture,id:req.user._id,role:req.user.role});
});
router.get('/login',csrfProtection, login.login);

router.post('/login',csrfProtection, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  passReqToCallback : true,
}));
router.get('/logout',isLoggedIn, loginapi.logout);
router.get('/phongban',isLoggedIn,phongban.getthongbao)
router.get('/getphongban',isLoggedIn,phongbanapi.getphongban)
router.get('/phongban/:id',isLoggedIn,phongban.getthongbaoid)
router.get('/info/:id',csrfProtection,isLoggedIn,info.getinfo)

module.exports = router;
