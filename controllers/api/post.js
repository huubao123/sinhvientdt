var Post = require('../../models/post')
const fs = require('fs');

var multiparty = require('multiparty');
const path = require('path');
const { join } = require('path');
class Posts {
    async getpost(req, res){
        let page = parseInt(req.params.page)
        let limit = parseInt(req.params.limit)
        let skip = (page-1)*limit
        let posts =await Post.find().sort([['creat_at',  -1]]).skip(skip).limit(limit)
        res.json(posts)
      }
      async getpostsid(req, res){
        let id= req.params.id
        let page = parseInt(req.params.page)
        let limit = parseInt(req.params.limit)
        let skip = (page-1)*limit   
         await Post.find({user_id: id}, function(err, post) {
         if (err) {
             console.log(err)
         }else{
            res.json(post)
         }
        }).sort([['updated_at', -1]]).skip(skip).limit(limit).clone().catch(function(err){ console.log(err)})
      }


     async getpostid(req, res){
     let post =  await Post.find({_id: req.params.id})
       res.json(post)
     }
     async updatepost(req, res){
       await Post.findByIdAndUpdate({_id: req.params.id},
        {
          content: req.body.content
        })
        res.json({success: 'true'})
     } 
     async deletepost(req, res){
      await Post.findByIdAndDelete({_id: req.params.id})
      res.json({success: 'true'})
     }
      async createpost(req, res){
        const form = new multiparty.Form()
       await form.parse(req,async function(err, fields, files) {
          if (err) {  console.log(err) }
          let post = new Post({
            content: fields.content[0],
            linkyoutube: fields.linkyoutube[0],
            user_id:fields.user_id[0],
            creat_at: new Date(),
            updated_at: new Date(),
          })
          await post.save()
          console.log(post._id)
          const paths = []
          if(Object.keys(files).length != 0){
            if (files.file != undefined){
              files.file.forEach(async function(file){
              const url = './public/images'
              if(!fs.existsSync(url)) {
                fs.mkdirSync(url)
              } 
              
              const dir = url + '/' + post._id
              var path = '/images' + '/'+post._id+'/' + file.originalFilename
              const pathreal = dir +'/'+ file.originalFilename
              if(!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
              }
              fs.renameSync(file.path, pathreal)
              paths.push(path)
             
            })   
            }
            if(files.video != undefined){
              files.video.forEach(async function(file){
              const url = './public/videos'
              if(!fs.existsSync(url)) {
                fs.mkdirSync(url)
              } 
              
              const dir = url + '/' + post._id
              var path = '/videos' + '/'+post._id+'/' + file.originalFilename
              const pathreal = dir +'/'+ file.originalFilename
              if(!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
              }
              fs.renameSync(file.path, pathreal)
             await Post.updateOne(
              {'_id': post._id },
                {
                  linkvideo: path
                }
                
            
             )
            })   
            }
            if(files.file != undefined){
                await Post.updateOne(
                {'_id': post._id },
                { $push:
                  {
                    img: {
                      $each: paths
                    }
                  }                  
                 },
                {upsert: true},
              )
            }
            
            
        } 
        let post1 = await Post.find({_id: post._id})
        console.log(post1[0].linkvideo)
        if (post1[0].linkvideo){          
        var  linkvideo = post1[0].linkvideo
        }
        if (post1[0].linkyoutube.length >0){
        var  linkyoutube = post1[0].linkyoutube
        }else{
         var linkyoutube = ''
        }
        var img= []
        console.log(post1[0].img)
        if (post1[0].img){
          img = post1[0].img 
        }else{
          img = ''
        }
              res.json({success: 'true', postid: post._id, linkyoutube: linkyoutube ,  img: img, linkvideo: linkvideo})

      })

      }
}

module.exports = new Posts() 
