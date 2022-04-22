class Login {
         logout(req, res){
          
                req.logout();
                res.redirect('/login');             
              
         }
    
}
module.exports = new Login() 
