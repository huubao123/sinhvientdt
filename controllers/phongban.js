class phongban{
    getthongbao(req, res) {
        res.render('thongbaophongban',{layout:'phongban',title:'Danh sách phòng ban'})
    }
    getthongbaoid(req, res) {
        res.render('main',{layout:'postuser',id:req.params.id})
    }
}
module.exports = new phongban() 
