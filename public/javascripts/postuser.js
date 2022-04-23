$(document).ready(function() {
  var page =1;
  const limit = 5;
  let id = document.getElementById("hiddenid").value;

  function Loaduser() {      
    fetch('/user/'+id) 
    .then(response => {
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then(data => {
        // console.log(data[0].user_id) 
      //console.log(data[0].comment.length);
         var name = document.getElementById("username")
         name.innerHTML = data.name
         name.href ="/post/user/" + data._id 
         var pic = document.getElementById("profile_img_src") 
         pic.src =data.picture
        document.title  = data.name



      });
    })
  }
  Loaduser()
  function insertpost(username, message,id){
    var temp = document.getElementsByTagName("template")[0];
    var clone = temp.content.cloneNode(true);
    
    var name = clone.querySelector(".display-name");
    name.innerHTML= username
    name.href = "post/user/" +id
    var content = clone.querySelector(".fb-user-status");
    content.innerHTML = message
    document.getElementById('status').prepend(clone); 

  }
  document.getElementById("postBtn").onclick = function(e) {
    e.preventDefault();
    let data = {
      content: document.getElementById('content').value, 
      id: document.getElementById('hiddenid').value
    }
    fetch('/post/createpost', {
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
          let username = document.getElementById('username').innerHTML;
          let message = document.getElementById('content').value;
          let id= document.getElementById('hiddenid').value

          insertpost(username, message, id) 
          
          document.getElementById('content').value = ''
          // socket.emit('post message', {username: username, message: message});
        } else {
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
      cmt.value = data[i]._id
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
})
var loadFile = function(event) {
	var image = document.getElementById('image');
	image.src = URL.createObjectURL(event.target.files[0]);
};
$(document).on("change", ".file_multi_video", function(evt) {
  var $source = $('#video_here');
  $source[0].src = URL.createObjectURL(this.files[0]);
  $source.parent()[0].load();
});
$(document).on("change", ".file_multi_video_edit", function(evt) {
  document.getElementById('video_modal').src = URL.createObjectURL(this.files[0]);
  console.log(URL.createObjectURL(this.files[0]))
  var $source = $('#video_modal_edit');
  console.log($source)
  $source[0].src = URL.createObjectURL(this.files[0]);
  $source.parent()[0].load();
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