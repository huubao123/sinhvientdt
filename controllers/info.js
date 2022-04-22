class info {
    getinfo(req, res){
    res.render('info', {layout:'info',title:'Info',id:req.params.id,role:req.user.role,csrfToken: req.csrfToken()});
    }

}
module.exports = new info() 
