class Login {
    login(req, res){
    res.render('login', {layout:'login',title:'Login',csrfToken: req.csrfToken()});
         
         
    }

}
module.exports = new Login() 
