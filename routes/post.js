var express = require('express');
var router = express.Router();
var post = require('../controllers/post');
var postapi = require('../controllers/api/post')
var Post = require('../models/post');
/* GET users listing. */
async function isuser(req, res, next) {
    let post = await Post.findOne(req.params.id);
  if (req.user._id == post.user._id) { 
      return next();
  }
  res.render('/404');
}
router.get('/getpost/page/:page/limit/:limit',postapi.getpost)
router.get('/getpost/:id/page/:page/limit/:limit',postapi.getpostsid)

router.get('/user/:id',isuser,post.getpostuser)
router.get('/:id',postapi.getpostid)
router.post('/updatepost/:id',isuser,postapi.updatepost)
router.delete('/deletepost/:id',isuser,postapi.deletepost)
router.post('/createpost',postapi.createpost)   
router.post('/deletevideo/:id',isuser,postapi.deletevideo)
router.post('/cmt/:id',postapi.createcmt)
router.get('/:id/cmt/:id_cmt',postapi.getcmt)   
router.post('/:id/editcmt/:id_cmt',postapi.editcmt)
router.delete('/:id/deletecmt/:id_cmt',postapi.deletecmt)
module.exports = router;
