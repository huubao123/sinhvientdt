var bcrypt = require('bcrypt')
const saltRounds = 10;

class Admin{
    getadmin(req,res){
        res.render('admin',{layout:'admin',title: 'Admin',csrfToken: req.csrfToken()});
    }
    taophongban(req,res){
            var User = require('../models/Users')
            const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
            new User({
                name: req.body.username,
                email: req.body.email,
                chuyenmuc: req.body.chuyenmuc,
                password: hashPassword,
                picture:"https://bootdey.com/img/Content/avatar/avatar2.png",
                created: new Date,
                updated: new Date,
                role:"phongban"
            }).save(async function(err, user)
            {
                if (err){
                    console.log(err);
                    res.json({success: 'false'});
                }else{
                     var  Phongban =  require('../models/phongban')
                        new Phongban({
                            name: user.name,
                            create_at: new Date,
                            id: user.id
                        }).save(async function(err, user){
                            if (err){
                                console.log(err);
                                res.json({success: 'false'});   
                            }else {
                                res.json({success: 'true'});
    
                            }
                        }
                )}
            })        
        
    }
}
module.exports = new Admin();