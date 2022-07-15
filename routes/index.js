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
var jwt = require('jsonwebtoken');
var phongbanapi = require('../controllers/api/phongban')
var info = require('../controllers/info')
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })
var token = require('../middlewares/jwt')
const { createSecretKey } = require('crypto');
const credentials = require('../credential')
/* GET home page. */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) 
      return next();
  res.redirect('/login');
}
function toJSON() {
  return { message: this.message, status: this.status };
}

const generateJwtToken = (user) => {
  const token = jwt.sign({user}, credentials.JWT_SECRET, {
    expiresIn: '1d',
   });
  return token;
};
router.get('/',isLoggedIn, async function(req, res, next) {
  console.log(req.headers.cookie)
  // res.header("token",req.headers.cookie.split('; ')[2].slice(4))
  res.render('main', {layout: 'layout',title: 'Social',username:req.user.name, picture: req.user.picture,id:req.user._id,role:req.user.role});
});
router.get('/login', login.login);

router.post('/login', passport.authenticate('local', { 
    failureRedirect: '/login'}),
    (req, res) => {    
      // const token = generateJwtToken(req.user);  
      // res.setHeader("Content-Type", "application/json"); 
      // res.setHeader('field', token)
      res.redirect('/');
  
    });
router.get('/logout',isLoggedIn, loginapi.logout);
router.get('/phongban',isLoggedIn,phongban.getthongbao)
router.get('/getphongban',isLoggedIn,phongbanapi.getphongban)
router.get('/phongban/:id',isLoggedIn,phongban.getthongbaoid)
router.get('/info/:id',csrfProtection,isLoggedIn,info.getinfo)

module.exports = router;
