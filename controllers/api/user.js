var User = require('../../models/Users')
var multiparty = require('multiparty')
const fs = require('fs');
const bcrypt = require('bcrypt');
  
class Users {
    async getuser(req, res){
        let user = await User.findOne({_id: req.params.id})
          res.json(user)
      }
    async update(req, res){
      var id = req.params.id

       const data = []

        const form = new multiparty.Form()

        form.parse(req,async function(err, fields, files) {
          data.push( {name: fields.name[0]})
          data.push( {phone_number: fields.phone_number[0]})
          data.push({linkfacebook: fields.facebook[0]})
          if(fields.lop[0] == ""){
            data.push({lop: null})
          }else{
            data.push({lop: fields.lop[0]})
          }
          if ( fields.khoa[0]== ""){
            data.push({khoa: null})
          }else{
            data.push({khoa: fields.khoa[0]})
          }
          // data.push({lop: fields.lop[0]})
          // data.push({khoa: fields.khoa[0]})
          if(Object.keys(files).length != 0){
          files.file.forEach(file =>{
            const url = './public/images'
            if(!fs.existsSync(url)) {
              fs.mkdirSync(url)
            }
            
            const dir = url + '/' + id
            const path = '/images' + '/'+id+'/' + file.originalFilename
            const pathreal = dir +'/'+ file.originalFilename
            if(!fs.existsSync(dir)) {
              fs.mkdirSync(dir)
            }
            fs.renameSync(file.path, pathreal)
            data.push({picture: path})
          })       
          
            }
         for (var i = 0; i < data.length; i++) {
            await User.findByIdAndUpdate(id,
        data[i])
        }
   
         
          res.json({success: 'true'})
        })

        // await User.findByIdAndUpdate(id,
        //       {
        //         name: files.name,
        //         linkfacebook:files.facebook,
        //         phone_number: files.phone_number
        //       })
        
    }
    async checkpass (req, res){
        let user = await User.findById(req.params.id)
       console.log( req.body.oldpass)
        console.log( user.password)
        const checkPassword = await bcrypt.compare(req.body.oldpass, user.password);
        if (checkPassword) {
          User.findByIdAndUpdate(req.params.id,{
            password: req.body.newpass
          })
          res.json({success: 'true'})
        }
        else{
          res.json({success: 'false',password: "wrong"})
        }
    }
}
module.exports = new Users() 
