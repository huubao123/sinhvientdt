var express = require('express');
var router = express.Router();
var post = require('../controllers/post');
var postapi = require('../controllers/api/post')
/* GET users listing. */

router.get('/getpost/page/:page/limit/:limit',postapi.getpost)
router.get('/getpost/:id/page/:page/limit/:limit',postapi.getpostsid)

router.get('/user/:id',post.getpostuser)
router.get('/:id',postapi.getpostid)
router.post('/updatepost/:id',postapi.updatepost)
router.delete('/deletepost/:id',postapi.deletepost)
router.post('/createpost',postapi.createpost)
module.exports = router;
