$(document).ready(function() {  
  var socket = io();
  socket.on('post phongban', function(data) {
  alert(data.name+' có tin mới')    
  });

  var page =1;
  const limit = 5;
   function display_success(){
    var ele = document.getElementsByClassName('alert-success')[0];
    ele.style.display = 'block';
    setTimeout(function(){
        ele.style.display = 'none';
    }, 5000);
  }

  function display_danger(){
    var ele = document.getElementsByClassName('alert-danger')[0];
    ele.style.display = 'block';
    setTimeout(function(){
        ele.style.display = 'none';
    }, 5000);
  }
  var hiddenid = document.getElementById('hiddenid').value;
  function LoadData() {
    fetch('/post/getpost/page/'+page+'/limit/'+limit) 
    .then(response => {
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then(data => {
         for ( let i = 0; i<data.length;i++){
        fetch('/user/'+data[i].user_id)
        .then(response => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
          }
          response.json().then(datas => { 
          var temp = document.querySelector("#post");
          var clone = temp.content.cloneNode(true);
          var name = clone.querySelector(".display-name");
          name.href = "/post/user/" + data[i].user_id
          name.innerHTML = datas.name;

          var btn = clone.querySelector(".btn-primary");
          var userid = clone.querySelector(".panel-body");
          userid.classList.add(data[i]._id)

          var del = clone.querySelector(".btn-primarydelete");
          var cmt = clone.querySelector("#postBtn3");
          if(data[i].linkvideo){
            var videolocal = clone.querySelector(".videolocal");
            videolocal.src = data[i].linkvideo
            var videolocala = clone.querySelector("#videolocal");
            videolocala.src = data[i].linkvideo
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
          image.src = datas.picture
          var imageid =clone.querySelector('.imageContainer')
          


            if (data[i].img.length > 0){
                for (var j = 0; j < data[i].img.length;j++){                   
              imageid.appendChild(img = document.createElement("img"),
              img.src = data[i].img[j],
              img.setAttribute('class','img-responsive '+data[i]._id),
              img.setAttribute('onclick','doSomething();'),// for FF
              img.onclick = function() {doSomething();} // for IE
                 )              
              }                        
            }else{
            }
          
          
            var drop = clone.querySelector('.dropdown-post')
           // console.log(hiddenid,data[i].user_id)
            if(hiddenid != data[i].user_id) {
              drop.style.display ='none';
            }
            
        var content = clone.querySelector(".fb-user-status");
        content.classList.add(data[i]._id)
        content.innerHTML = data[i].content;
        btn.value = data[i]._id
        del.value = data[i]._id
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
                // var name = clone.querySelector(".usercmt");
                // name.innerHTML= username
                // name.href = "user/" +id
                // var content = clone.querySelector(".cmtcontent");
                // content.innerHTML = comment
                insertcmt(username,comment,user_id,data[i]._id,cmt_id)
                
              })

              })

            }
        }
        cmt.value = data[i]._id
        var content = clone.querySelector("#contentcmt")
         content.classList.add(data[i]._id)

        document.getElementById('status').appendChild(clone); 

        
          })
        })
        

        }
      });
    })
  }
        LoadData()
        window.onscroll = () => {
          let  isbottom = document.documentElement.offsetHeight;
          let istop = parseInt(document.documentElement.scrollTop + window.innerHeight) +1
          if(isbottom === istop)
          {
            page = page+1;
            LoadData()
          }
        }


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
  function insertcmt(username, message, user_id,_id,cmt_id){
    var template = document.querySelector('#cmt');
    var clone = template.content.cloneNode(true);
    
    var name = clone.querySelector(".usercmt");
    name.innerHTML= username
    name.href = "user/" +user_id
    var content = clone.querySelector(".cmtcontent"); 
    content.innerHTML = message
    var drop_cmt = clone.querySelector('.dropdown-cmt')
    if(hiddenid != user_id) {
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
            if(data.role == "phongban"){
             socket.emit('post post', { name: username});

            }
          } else {
            // add your code here
          }
        });
      })
    };
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
              name.innerHTML = datas.name
              var content = document.querySelector("#txtBody");
              content.innerHTML = data[0].content
              if(data[0].linkyoutube){
                document.getElementById('linkyoutube-modal').style.display = 'block';
              var linkyoutube = document.querySelector("#linkyoutube-modal");
              linkyoutube.value = data[0].linkyoutube
              }else{  
                document.getElementById('videoupload_edit').style.display = 'block';
                var linkyoutube = document.querySelector("#linkyoutube-modal");
                linkyoutube.style.display = 'none';
              }
              if(data[0].linkvideo){
                document.getElementById('videoupload_edit').style.display = 'block';
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
              document.getElementById('delete_video_edit').value = id
            });
          })
          //console.log(data[0].comment.length);         
          });
        }) 
        })
          document.getElementById("postBtn2").onclick = function(e) {
          e.preventDefault();
          let   id = $(this).attr('value');
          const formData = new FormData();
          const fileInput = document.querySelector('.upload__inputfile_edit')
          const video = document.querySelector('.file_multi_video_edit')
         
          if(document.getElementById('linkyoutube-modal').value ){
            if(document.querySelector("#video_modal").src || document.querySelector("#video_modal_edit").length > 0){
            alert("You can't upload both video and link")
            document.getElementById('video_upload_edit').value = ""
            document.getElementById('video_modal').src = ""
            return;
            }
            
          }
          if (document.getElementById('linkyoutube-modal').value){
            formData.append('linkyoutube', document.getElementById('linkyoutube-modal').value)
          }else{
            formData.append('linkyoutube', "")
          }
          if(video.files[0]){
            formData.append('video',video.files[0]);
          }
          
          if( fileInput.files.length != 0){
              for (var i = 0; i < fileInput.files.length; i++){
                      formData.append('file', fileInput.files[i]);
                    
          }
        }
          formData.append('content', document.getElementById('txtBody').value);
         
          fetch('/post/updatepost/'+ id, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              // headers: {
              //   'Content-Type': 'application/json'
              // },
              body: formData// body data type must match "Content-Type" header
            })
          .then(response => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }
            // Examine the text in the response
            response.json().then(async function(data) { 

              if (data.success == 'true') {
                document.getElementsByClassName('fb-user-status '+ id)[0].innerHTML = document.getElementById('txtBody').value
                await fetch('/post/'+id)
                .then(response => {
                  if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                  }
                  response.json().then(async post  => {
                  post_edit = document.getElementsByClassName(' panel-body '+id)[0] 
                  console.log(post_edit.childNodes)
                  for (var i = 0; i < post_edit.childNodes.length; i++) {
                    if (post_edit.childNodes[i].id == 'videoyoutube'){
                      if(post[0].linkyoutube.length > 1){
                        if(post_edit.childNodes[i].style.display == 'none'){
                          post_edit.childNodes[i].style.display = 'block' 
                        post_edit.childNodes[i].src = post[0].linkyoutube
                        }else{
                          post_edit.childNodes[i].src = post[0].linkyoutube
                          
                        }
                    }
                  }
                    if (post_edit.childNodes[i].id == 'videolocal' ){
                      if(post_edit.childNodes[i].style.display == 'none'){
                      
                        post_edit.childNodes[i].style.display = 'block'
                        post_edit.childNodes[i].src = post[0].linkvideo
                      }
                      else{
                        post_edit.childNodes[i].src = post[0].linkvideo

                      }
                    }
                  
                    if (post_edit.childNodes[i].className == 'imageContainer'){
                      await $( ".img-responsive."+id ).remove();

                      for (var j = 0; j < post[0].img.length; j++) {
                        var imgs = document.createElement("img");
                        imgs.src = post[0].img[j]
                        imgs.setAttribute('class','img-responsive '+id),
                        imgs.setAttribute('onclick','doSomething();'),// for FF
                        imgs.onclick = function() {doSomething();} // for IE
                        post_edit.childNodes[i].appendChild(imgs)
                      }
                    }
                  }
                  
                  

                  })             

                })
                
              display_success();
                //socket.emit('post message', {username: username, message: message});
              } else {
                
              display_danger(); 
                // add your code here
              }
            });
          })
        };
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
        
          // var socket = io();
          // socket.on('post message', function(data) {
          //   alert(data.username+"đã đăng một bài viết mới")
          //   insertpost(data.username,data.message,data.picture)  
          // });
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
                display_success();
                //socket.emit('post message', {username: username, message: message});
              } else {
                display_danger();
                // add your code here
              }
            });
          })             
          })  
          $('body').on('click', '.btn-primary-cmt', function() {
            let id_post = $(this).attr('id_post');
            let id_cmt = $(this).attr('id_cmt');
            document.getElementsByClassName("cmtcontent_input "+id_cmt)[0].style.display = 'block';
            document.getElementsByClassName("cmtcontent_input "+id_cmt)[0].value  =  $('span.'+id_cmt)[0].innerText
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
         
          if(document.getElementById('cmtcontent_input').style.display == 'block'){
            var  text = document.getElementById("cmtcontent_input")
            console.log(text)
            if(text){
              text.addEventListener("keyup", function(event) {
              event.preventDefault();
              this.style.height='24px'; 
              this.style.height = this.scrollHeight + 12 + 'px';
              if (e.keyCode == 13) {
                document.getElementById("edit_cmt_ok").click();
              }
            })
            }
          }
            

        function doSomething() {
          var modalImg = document.getElementById("img01");
        var modal = document.getElementById("myModals");
          modal.style.display = "block";
          modalImg.src = this.img.currentSrc; 
        }
      
        
        

});


// When the user clicks on <span> (x), close the modal
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


    var  text = document.getElementById("cmtcontent_input")
      
    

document.addEventListener('DOMContentLoaded', function () {
  text.addEventListener("keyup", function(event) {
      event.preventDefault();
      this.style.height='24px'; 
      this.style.height = this.scrollHeight + 12 + 'px';
      if (e.keyCode == 13) {
        document.getElementById("edit_cmt_ok").click();
      }
    })
});