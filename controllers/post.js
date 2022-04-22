class Posts {
         
      getpostuser(req, res)
   {
     console.log(req.params.id)
       res.render('main',{layout: 'postuser',id:req.params.id})
   }
}
module.exports = new Posts() 
