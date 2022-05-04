class Login {
    login(req, res){
    res.render('login', {layout:'login',title:'Login'});
         
         
    }

}
module.exports = new Login() 
