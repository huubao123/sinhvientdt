$(document).ready(function() {
  var page =1;
  const limit = 5;
  let id = document.getElementById("hiddenid").value;
  function display_success(flash){
    var ele = document.getElementsByClassName('alert-success')[0];
    ele.style.display = 'block';
    ele.childNodes[4].textContent = flash
    setTimeout(function(){
        ele.style.display = 'none';
    }, 5000);
  }

  function display_danger(flash){
    var ele = document.getElementsByClassName('alert-danger')[0];
    ele.style.display = 'block';
    ele.childNodes[4].textContent = flash
    setTimeout(function(){
        ele.style.display = 'none';
    }, 5000);
  }
 async function Loaduser() {      
   await fetch('/user/'+id) 
    .then(response => {
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then(data => {
        console.log('data', data);
        // console.log(data[0].user_id) 
      //console.log(data[0].comment.length);
         var name = document.getElementById("username")
         name.innerHTML = data[0].name
         name.href ="/post/user/" + data[0]._id 
         var pic = document.getElementById("profile_img_src") 
         pic.src =data[0].picture
        document.title  = data[0].name



      });
    })
  }
   Loaduser();
  function insertpost(username, message, id,linkyoutube,linkvideo,img,postid){
    var temp = document.querySelector("#post");
    var clone = temp.content.cloneNode(true);
    var imageid =clone.querySelector('.imageContainer')


      if (linkyoutube.length >0){
        var youtube = clone.querySelector("#videoyoutube");    
        youtube.src = linkyoutube
        clone.querySelector("#videolocal").style.display = 'none'
      }else{
        var youtube = clone.querySelector("#videoyoutube");
        youtube.style.display = 'none';
      }
      if(linkvideo != undefined ){
        var videolocal = clone.querySelector(".videolocal");
        videolocal.src = linkvideo
        var youtube = clone.querySelector("#videoyoutube");
        youtube.style.display = 'none';
     }else{
      clone.querySelector("#videolocal").style.display = 'none'
     }
     if (img.length > 0){
      for (var j = 0; j < img.length;j++){                   
    imageid.appendChild(imgs = document.createElement("img"),
    imgs.src = img[j],
    imgs.setAttribute('class','img-responsive '+ postid),
    
    imgs.setAttribute('onclick','doSomething();'),// for FF
    imgs.onclick = function() {doSomething();} // for IE

       )              
    }                        
  }else{
  }
    var name = clone.querySelector(".display-name");
    name.innerHTML= username
    name.href = "user/" +id
    var content = clone.querySelector(".fb-user-status");
    content.innerHTML = message
    document.getElementById('status').prepend(clone); 
  }
  document.getElementById("postBtn").onclick = function(e) {
    e.preventDefault();
      const formData = new FormData();
      const fileInput = document.querySelector('.upload__inputfile')
      const video = document.querySelector('.file_multi_video')
      if (document.getElementById('linkyoutube').value != ""){
        formData.append('linkyoutube', document.getElementById('linkyoutube').value)
      }else{
        formData.append('linkyoutube', "")
      }
      if(video.files[0]){
        formData.append('video',video.files[0]);
        document.getElementById('content_post').style.display = "block";
      }
      if(document.getElementById('linkyoutube').value != "" && video.files[0]){
        alert ("You can't upload both video and link")
        document.getElementById('linkyoutube').value = ""
        document.getElementById('customvideo').value = "";

        return;
      }
      if( fileInput.files.length != 0){
          for (var i = 0; i < fileInput.files.length; i++){
                  formData.append('file', fileInput.files[i]);
                
      }
     }
      formData.append('content', document.getElementById('content').value);
      formData.append('user_id', document.getElementById('hiddenid').value);
      fetch('/post/createpost', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          body: formData // body data type must match "Content-Type" header
        })
      .then(response => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) { 
          if (data.success == 'true') {
            
            let username = document.getElementById('username').innerHTML;
            let message = document.getElementById('content').value;
            let user_id= document.getElementById('hiddenid').value
            insertpost(username, message, user_id,data.linkyoutube,data.linkvideo,data.img,data.postid)
            
            document.getElementById('content').value = ''
            let flash = "Post success"
            display_success(flash)
            if(data.role == "phongban"){
             socket.emit('post post', { name: username});

            }
          } else {
            let flash = "Post fail"
            display_danger(flash)
            // add your code here
          }
        });
      })
  };






        
  function LoadData() {      
    fetch('/post/getpost/'+id+'/page/'+page+'/limit/'+limit) 
    .then(response => {
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then(data => {
        // console.log(data[0].user_id)
      //console.log(data[0].comment.length);
         
      for ( let i = 0; i<data.length;i++){
      var temp = document.getElementsByTagName("template")[0];
      var clone = temp.content.cloneNode(true);
      var name = clone.querySelector(".display-name");
      var btn = clone.querySelector(".btn-primary");
      
      var del = clone.querySelector(".btn-primarydelete");
      var cmt = clone.querySelector("#postBtn3");
      var img = clone.querySelector('#fb-user-thumb')
      img.src = document.getElementById('profile_img_src').src
      var userid = clone.querySelector(".panel-body");
      userid.classList.add(data[i]._id)
      name.innerHTML = document.getElementById('username').innerHTML;
      name.href = "/post/user/" + id  
      btn.value = data[i]._id
      del.value = data[i]._id
      if(data[i].linkvideo){
        var videolocal = clone.querySelector(".videolocal");
        videolocal.src = data[i].linkvideo
        var youtube = clone.querySelector("#videoyoutube");
        youtube.style.display = 'none';
       var span =  clone.querySelector('#content_post');
       span.style.display = 'block';
     }else{
      clone.querySelector("#videolocal").style.display = 'none'
     }
      if(data[i].linkyoutube){
        var youtube = clone.querySelector("#videoyoutube");    
        youtube.src = data[i].linkyoutube
        clone.querySelector("#videolocal").style.display = 'none'
        var span =  clone.querySelector('#content_post');
       span.style.display = 'block';
      }else{
        var youtube = clone.querySelector("#videoyoutube");
        youtube.style.display = 'none';
      }
        
      var image = clone.querySelector('.fb-user-image');         
      image.src = document.getElementById("profile_img_src").src
      var imageid =clone.querySelector('.imageContainer')
      



      imageid.classList.add(data[i]._id)
        if (data[i].img.length > 0){
            for (var j = 0; j < data[i].img.length;j++){                   
          imageid.appendChild(img = document.createElement("img"),
          img.src = data[i].img[j],
          img.setAttribute('class','img-responsive'),
          img.setAttribute('onclick','doSomething();'),// for FF
          img.onclick = function() {doSomething();} // for IE
             )              
          }                        
        }else{
        }
      
      
        var drop = clone.querySelector('.dropdown')
       // console.log(hiddenid,data[i].user_id)
        if(id != data[i].user_id) {
          
          drop.style.display ='none';
        }
      var content = clone.querySelector(".fb-user-status");
      content.innerHTML = data[i].content;
      content.classList.add(data[i]._id)
      var cmt_id = clone.querySelector(".fb-comments")
          cmt_id.classList.add(data[i]._id)
          cmt_id.setAttribute("id", data[i]._id)
      var cmt_more  = clone.querySelector(".fb-status-container.fb-border.fb-gray-bg")
          cmt_more.classList.add(data[i]._id)
      var discmt = clone.querySelector(".comment")  
        discmt.classList.add(data[i]._id)
        discmt.value= data[i]._id
      var dislike = clone.querySelector(".like")  
      dislike.classList.add(data[i]._id)
      dislike.value= data[i]._id
      var disshare = clone.querySelector(".share")  
      disshare.classList.add(data[i]._id)
      disshare.value= data[i]._id
      if(data[i].comment.length){
        for (let j = 0; j < data[i].comment.length; j++){
            fetch('/user/'+ data[i].comment[j].user_id)  
          .then(response => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }response.json().then(usercmt => {
              var comment = data[i].comment[j].content
              var username = usercmt.name
              var user_id  = usercmt._id
              var cmt_id =data[i].comment[j]._id
              insertcmt(username,comment,user_id,data[i]._id,cmt_id)
                
            })

            })

          }
      }
      cmt.value = data[i]._id
      var content = clone.querySelector("#contentcmt")
       content.classList.add(data[i]._id)
      document.getElementById('status').appendChild(clone); 

      }
        
      });
    })
  }
       
    LoadData()
    window.onscroll = () => {
      let  isbottom = document.documentElement.offsetHeight;
      let istop = parseInt(document.documentElement.scrollTop + window.innerHeight)+1
      if(isbottom === istop)
      {
        page = page+1;
        LoadData()
      } 
    }
    function insertcmt(username, message, user_id,_id,cmt_id){
      var template = document.querySelector('#cmt');
      var clone = template.content.cloneNode(true);
      
      var name = clone.querySelector(".usercmt");
      name.innerHTML= username
      name.href = "user/" +user_id
      var content = clone.querySelector(".cmtcontent"); 
      content.innerHTML = message
      var drop_cmt = clone.querySelector('.dropdown-cmt')
      var li = clone.querySelector("li")
      li.classList.add(cmt_id)
      li.setAttribute("cmt_id", cmt_id)
      var ok = clone.querySelector("#edit_cmt_ok")
      ok.setAttribute("id_cmt", cmt_id)
      ok.setAttribute("id_post",_id)
      var cancle =   clone.querySelector("#edit_cmt_cancle")
      cancle.setAttribute("id_cmt", cmt_id)
      cancle.setAttribute("id_post",_id)
      if(id != user_id) {
        drop_cmt.style.display ='none';
      }else{
        drop_cmt.style.display ='block';
        cmt_edit = clone.querySelector(".btn-primary-cmt")
        cmt_edit.setAttribute("id_post", _id)
        cmt_edit.setAttribute("id_cmt", cmt_id)
        cmt_del = clone.querySelector(".btn-primarydelete-cmt")
        cmt_del.setAttribute("id_post", _id)
        cmt_del.setAttribute("id_cmt", cmt_id)
        cmt_text = clone.querySelector(".cmtcontent")
        cmt_text.classList.add(cmt_id)
        cmt_input = clone.querySelector(".cmtcontent_input")
        cmt_input.classList.add(cmt_id)
        cmt_detail = clone.querySelector(".cmt-details")
        cmt_detail.classList.add(cmt_id)
  
      }
  
      document.getElementById(_id).prepend(clone); 
      
    }

    $('body').on('click', '.btn-primary', function() {
      let id = $(this).attr('value');
        fetch('/post/'+id)
        .then(response => {
          if (response.status !== 200) {  
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
          }
          response.json().then(data => {
         //   const name = getuser(id).name
                fetch('/user/'+data[0].user_id)
          .then(response => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }
            // Examine the text in the response
            response.json().then(function(datas) { 
              document.getElementById('myModal').style.display = 'block';
              var name = document.querySelector("#txtTitle");
              name.innerHTML = datas[0].name
              var content = document.querySelector("#txtBody");
              content.innerHTML = data[0].content
              if(data[0].linkyoutube){
              var linkyoutube = document.querySelector("#linkyoutube-modal");
              linkyoutube.value = data[0].linkyoutube
              }else{  
                var linkyoutube = document.querySelector("#linkyoutube-modal");
                linkyoutube.style.display = 'none';
              }
              if(data[0].linkvideo){
                var linkvideo = document.querySelector("#video_modal");
                linkvideo.src = data[0].linkvideo
              }else{
                var linkvideo = document.querySelector("#video_modal");
                linkvideo.style.display = 'none';
              }
              if(data[0].img){
                for (var i=0; i<data[0].img.length; i++){
                  var imageid = document.querySelector(".imageContainers");
                  var imgs = document.createElement("img");
                  imgs.src = data[0].img[i]
                  imgs.setAttribute('class','img-modal_edit'),
                  imgs.setAttribute('onclick','doSomething();'),// for FF
                  imgs.onclick = function() {doSomething();} // for IE
                  imageid.appendChild(imgs)
                }
                
              }else{
                var imageid = document.querySelector(".imageContainer");
                imageid.style.display = 'none';
              }



              document.getElementById('postBtn2').value = id
            });
          })

          //console.log(data[0].comment.length);
          
        
          });
        })
    })

        document.getElementById("postBtn2").onclick = function(e) {
          e.preventDefault();
          let id = $(this).attr('value');
          console.log(id);
          let data = {
            content: document.getElementById('txtBody').value, 
          }
          fetch('/post/updatepost/'+ id, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
          .then(response => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }
            // Examine the text in the response
            response.json().then(function(data) { 
              if (data.success == 'true') {
                document.getElementsByClassName('fb-user-status '+ id).innerHTML = document.getElementById('txtBody').value
                alert('Cập nhật thành công')
                
                //socket.emit('post message', {username: username, message: message});
              } else {
                alert('Cập nhật thất bại')
                // add your code here
              }
            });
          })
        };
        $('body').on('click', '#postBtn3', function() {
          let id = $(this).attr('value');
          let data = {
            value: document.getElementsByClassName('form-control '+id)[0].value,
            id: document.getElementById('hiddenid').value,
          }
          fetch('/post/cmt/'+ id, { 
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'  
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          })
        .then(response => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
          }
          // Examine the text in the response
          response.json().then(function(data) { 

            if (data.success == 'true') {
              var cmt =  document.getElementsByClassName('form-control '+id)[0].value 
              var username = document.getElementById('username').text
              var user_id = document.getElementById('hiddenid').value
              insertcmt(username, cmt, user_id,id)
              let flash = "Comment success"
              display_success(flash);
              console.log(data.comment)
              document.getElementsByClassName('btn-primary-cmt')[0].setAttribute("id_cmt", data.comment._id)
              document.getElementsByClassName('cmtcontent_input').classList = data.comment._id
              //socket.emit('post message', {username: username, message: message});
            } else {
              let  flash = "Create Comment failed";
              display_danger(flash);
              // add your code here
            }
          });
        })             
        })  

            $('body').on('click', '.btn-primarydelete', function() {
              let id = $(this).attr('value');
              if(confirm('Are you sure you want to delete')){
              fetch('/post/deletepost/'+id,{
                method: 'DELETE'
              })
              .then(response => {
                if (response.status !== 200) {  
                  console.log('Looks like there was a problem. Status Code: ' + response.status);
                  return;
                }
                response.json().then(data => {
                  if (data.success == 'true') {
                     let message = '.panel-body.' +id
                    $(message).remove();
                     alert('Xóa thành công')

                    //socket.emit('post message', {username: username, message: message});
                  } else {
                    alert('Xóa thất bại')
                    // add your code here
                  }
                });
              })
                }

            })
            $('body').on('click', '.btn-primary-cmt', function() {
              let id_post = $(this).attr('id_post');
              
              let id_cmt = $(this).attr('id_cmt');
              document.getElementsByClassName("cmtcontent_input "+id_cmt)[0].style.display = 'block';
              document.getElementsByClassName("cmtcontent_input "+id_cmt)[0].value  =  $('span.'+id_cmt)[0].innerText
              document.getElementsByClassName("cmtcontent_input "+id_cmt)[0].setAttribute("id_cmt", id_cmt)
              document.getElementsByClassName("cmtcontent_input "+id_cmt)[0].setAttribute("id_post", id_post)
  
              document.getElementById("edit_cmt_ok").style.display = 'inline'; 
              document.getElementById("edit_cmt_cancle").style.display = 'inline';
              document.getElementsByClassName("time-and-like")[0].style.display = 'none';
              document.getElementsByClassName("cmt-details "+id_cmt)[0].style.height += 110+"px"
              $('span.'+id_cmt)[0].style.display = 'none'
                })
            $('body').on('click', '.comment', function() {
                let id = $(this).attr('value')
               document.getElementsByClassName("fb-status-container fb-border fb-gray-bg "+id)[0].style.display = 'block'
            })
           
            $('body').on('keyup', '.cmtcontent_input', function(e) {
              let id_post = $(this).attr('id_post');
              let id_cmt = $(this).attr('id_cmt');
              this.style.height='24px'; 
             this.style.height = this.scrollHeight + 12 + 'px';
             document.getElementsByClassName("li "+id_cmt)[0].style.height = 1100 + 'px';
              document.getElementsByClassName("li "+id_cmt)[0].style.height = this.scrollHeight +  100 + 'px';
              if (e.keyCode == 13) {
                document.getElementById("edit_cmt_ok").click();
                }
              else if (e.keyCode == 27) {
                document.getElementById("edit_cmt_cancle").click();
                }
              })  
            $('body').on('click', '#edit_cmt_cancle', function() {  
              let id_post = $(this).attr('id_post');
              let id_cmt = $(this).attr('id_cmt');
              document.getElementsByClassName("cmtcontent_input "+id_cmt)[0].style.display = 'none';
                document.getElementById("edit_cmt_ok").style.display = 'none'; 
                document.getElementById("edit_cmt_cancle").style.display = 'none';
                document.getElementsByClassName("time-and-like")[0].style.display = 'block';
                $('span.'+id_cmt)[0].style.display = 'block'
            })
            $('body').on('click', '.btn-primarydelete-cmt', function() {  
              let id_post = $(this).attr('id_post');
              let id_cmt = $(this).attr('id_cmt');
              document.getElementsByClassName("cmtcontent_input "+id_cmt)[0].style.display = 'none';
                document.getElementById("edit_cmt_ok").style.display = 'none'; 
                document.getElementById("edit_cmt_cancle").style.display = 'none';
                document.getElementsByClassName("time-and-like")[0].style.display = 'block';
                $('span.'+id_cmt)[0].style.display = 'block'              
                try {
                  fetch('/post/'+id_post+'/deletecmt/'+id_cmt , { 
                    method: 'delete', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                      'Content-Type': 'application/json'  
                    },
                    // body data type must match "Content-Type" header
                  })
                  .then(response => {
                    if (response.status !== 200) {
                      console.log('Looks like there was a problem. Status Code: ' + response.status);
                      return;
                    }
                    // Examine the text in the response
                    response.json().then(async  function(data) { 
              
                      if (data.success == 'true') {
                        await $( "li."+id_cmt ).remove();
                        let flash = "Delete comment success"
                        display_success(flash);
                        
                        //socket.emit('post message', {username: username, message: message});
                      } else {
                        let flash = "Delete Comment failed";
                        display_danger(flash);
                        // add your code here
                      }
                  })              
                });
              }
                catch(err) {
                  console.log(err)
                }
            })
            $('body').on('click', '#edit_cmt_ok', function() {  
              let id_post = $(this).attr('id_post');
              let id_cmt = $(this).attr('id_cmt');
                let data = {
                  content:  document.getElementsByClassName("cmtcontent_input "+id_cmt)[0].value
                }
                try {
                  fetch('/post/'+ id_post+'/editcmt/'+ id_cmt , { 
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                      'Content-Type': 'application/json'  
                    },
                    body: JSON.stringify(data) // body data type must match "Content-Type" header
                  })
                  .then(response => {
                    if (response.status !== 200) {
                      console.log('Looks like there was a problem. Status Code: ' + response.status);
                      return;
                    }
                    // Examine the text in the response
                    response.json().then(function(data) { 
              
                      if (data.success == 'true') {
                        let flash = "Edit comment success"
                        display_success(flash)
                        document.getElementsByClassName("cmtcontent_input "+id_cmt)[0].style.display = 'none';
                        document.getElementById("edit_cmt_ok").style.display = 'none'; 
                        document.getElementById("edit_cmt_cancle").style.display = 'none';
                        document.getElementsByClassName("time-and-like")[0].style.display = 'block';
                        $('span.'+id_cmt)[0].style.display = 'block'
  
                        $('span.'+id_cmt)[0].innerText = document.getElementsByClassName("cmtcontent_input "+id_cmt)[0].value
  
                        //socket.emit('post message', {username: username, message: message});
                      } else {
                        let flash = "Edit Comment failed";
                        display_danger(flash);
                        // add your code here
                      }
                  })              
                });
              }
                catch(err) {
                  console.log(err)
                }
            })
            function doSomething() {
              var modalImg = document.getElementById("img01");
            var modal = document.getElementById("myModals");
              modal.style.display = "block";
              modalImg.src = this.img.currentSrc; 
            }



})
function closeModalimage(){
  var modal = document.getElementById("myModals");
  modal.style.display = "none";
}





var loadFile = function(event) {
	var image = document.getElementById('image');
	image.src = URL.createObjectURL(event.target.files[0]);
};
$(document).on("change", ".file_multi_video", function(evt) {
  var $source = $('#video_here');
  $source[0].src = URL.createObjectURL(this.files[0]);
  $source.parent()[0].load();
  document.getElementsByClassName('delete_video_post')[0].style.display = 'inline-block';

});
$(document).on("change", ".file_multi_video_edit", function(evt) {
  document.getElementById('video_modal').src = URL.createObjectURL(this.files[0]);
  var $source = $('#video_modal_edit');
  $source[0].src = URL.createObjectURL(this.files[0]);
  $source.parent()[0].load();
  document.getElementsByClassName('delete_video_edit')[0].style.display = 'inline-block';

});
jQuery(document).ready(function () {
  ImgUpload();
  ImgUpload_edit(); 
  
});

function ImgUpload() {
  var imgWrap = "";
  var imgArray = [];

  $('.upload__inputfile').each(function () {
    $(this).on('change', function (e) {
      imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
      var maxLength = $(this).attr('data-max_length');

      var files = e.target.files;
      var filesArr = Array.prototype.slice.call(files);
      var iterator = 0;
      filesArr.forEach(function (f, index) {

        if (!f.type.match('image.*')) {
          return;
        }

        if (imgArray.length > maxLength) {
          alert('You can only upload ' + maxLength + 1 + ' images');
        } else {
          var len = 0;
          for (var i = 0; i < imgArray.length; i++) {
            if (imgArray[i] !== undefined) {
              len++;
            }
          }
          if (len > maxLength) {
            return false;
          } else {
            imgArray.push(f);

            var reader = new FileReader();
            reader.onload = function (e) {
              var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
              imgWrap.append(html);
              iterator++;
            }
            reader.readAsDataURL(f);
          }
        }
      });
    });
  });

  $('body').on('click', ".upload__img-close", function (e) {
    var file = $(this).parent().data("file");
    for (var i = 0; i < imgArray.length; i++) {
      if (imgArray[i].name === file) {
        imgArray.splice(i, 1);
        break;
      }
    }
    $(this).parent().parent().remove();
  });
}

function ImgUpload_edit() {
  var imgWrap = "";
  var imgArray = [];

  $('.upload__inputfile_edit').each(function () {
    $(this).on('change', function (e) {
      imgWrap = $(this).closest('.upload__box_edit').find('.upload__img-wrap_edit');
      var maxLength = $(this).attr('data-max_length');

      var files = e.target.files;
      var filesArr = Array.prototype.slice.call(files);
      var iterator = 0;
      filesArr.forEach(function (f, index) {

        if (!f.type.match('image.*')) {
          return;
        }

        if (imgArray.length > maxLength) {
          alert('You can only upload ' + maxLength + 1 + ' images');
        } else {
          var len = 0;
          for (var i = 0; i < imgArray.length; i++) {
            if (imgArray[i] !== undefined) {
              len++;
            }
          }
          if (len > maxLength) {
            return false;
          } else {
            imgArray.push(f);

            var reader = new FileReader();
            reader.onload = function (e) {
              var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
              imgWrap.append(html);
              iterator++;
            }
            reader.readAsDataURL(f);
          }
        }
      });

    });
  });

  $('body').on('click', ".upload__img-close_edit", function (e) {
    var file = $(this).parent().data("file");
    for (var i = 0; i < imgArray.length; i++) {
      if (imgArray[i].name === file) {
        imgArray.splice(i, 1);
        break;
      }
    }
    $(this).parent().parent().remove();
  });
}

function addUpload(){
  document.getElementById('fileupload').style.display = 'block';
  
}
function addUploadimageedit(){
  document.getElementById('fileuploadedit').style.display = 'block';
} 
function addUploadvideoedit(){
    document.getElementById('videoupload_edit').style.display = 'inline-block';
    if(document.getElementById('video_modal')){
      document.getElementById('delete_video_edit').style.display = 'inline-block';
    }

  document.getElementById('upload_edit').style.display = 'inline-block';
  document.getElementById('close_video_edit').style.display = 'inline-block';
  if(document.getElementById('video_modal').style.display = 'none'){
    document.getElementById('video_modal').style.display = 'inline-block';
  }
  if(document.getElementById("linkyoutube-modal").style.display = 'none'){  
    document.getElementById("linkyoutube-modal").style.display = 'block';
  }

}
function addUpload2(){
  document.getElementById('videoupload').style.display = 'block'; 

}
function closeModal(){
  document.getElementById('myModal').style.display = 'none';
  $('.modal-backdrop').remove();

  $('.img-modal_edit').remove();

} 
  
function closeimageModalpost(){
    document.getElementById('fileupload').style.display = 'none';  
}
function closevideoModalpost(){
    document.getElementById('videoupload').style.display = 'none';
}
function closeimageModalpost_edit(){
    document.getElementById('fileuploadedit').style.display = 'none';  
}
function closevideoModalpost_edit(){  
    document.getElementById('videomodal').style.display = 'none';
}
function closevideoModalpost_edit(){
  document.getElementById('videoupload_edit').style.display = 'none';
  // document.getElementById('videomodal').style.display = 'none';
  // document.getElementById('linkyoutube-modal').style.display = 'none';
}
function deletevideopost(){
  document.getElementById('customvideo').value= ''
  document.getElementById('video_here').src = '';
}

function deletevideoModalpost_edit(){
  if(document.getElementById('video_modal').src.includes('/videos/')){
    console.log(document.getElementById('video_modal').src)
    
   id_post = document.getElementById('delete_video_edit').value
   const valueToRemove = "https://sinhvientdt.herokuapp.com";
   src = document.getElementById('video_modal').src
   let data = {
     linkvideo : src.replace(valueToRemove,"")
   } 
    fetch('/post/deletevideo/'+id_post, {      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function(data) { 

        if (data.success == 'true') {
          document.getElementById('video_upload_edit').value= ''
          document.getElementById('video_modal').src = '';
          //socket.emit('post message', {username: username, message: message});
        } else {
          function do_totalsN(){
            var ele = document.getElementsByClassName('alert-danger')[0];
            ele.style.display = 'block';
            setTimeout(function(){
                ele.style.display = 'none';
            }, 5000);
        }
        do_totalsN();
          // add your code here
        }
      });
    })
        

  }else{
      document.getElementById('video_upload_edit').value= ''
  document.getElementById('video_modal').src = '';
  }   
}
