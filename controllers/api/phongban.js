var Phongban = require('../../models/phongban')
var Post = require('../../models/post')
var User = require('../../models/Users')
class phongbanapi {
    async getphongban(req, res) {
    
        var phongban = await Phongban.find() 
        res.json(phongban)
       }
}
module.exports = new phongbanapi() 
