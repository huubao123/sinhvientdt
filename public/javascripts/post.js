
$(document).ready(function() {
  
  var socket = io();
  socket.on('post phongban', function(data) {
  alert(data.name+' có tin mới')    
  });

  var page =1;
  const limit = 5;

  
  var hiddenid = document.getElementById('hiddenid').value;
  function LoadData() {
    fetch('/post/getpost/page/'+page+'/limit/'+limit) 
    .then(response => {
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then(data => {
        // console.log(data[0].comment[0].user_id)
      //console.log(data[0].comment.length);
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
          console.log(data[i])
          console.log(data[i].linkvideo)
          if(data[i].linkvideo){
            var videolocal = clone.querySelector(".videolocal");
            videolocal.src = data[i].linkvideo
            var youtube = clone.querySelector("#videoyoutube");
            youtube.style.display = 'none';
         }else{
          clone.querySelector("#videolocal").style.display = 'none'
         }
          if(data[i].linkyoutube){
            var youtube = clone.querySelector("#videoyoutube");    
            youtube.src = data[i].linkyoutube
            clone.querySelector("#videolocal").style.display = 'none'
          }else{
            var youtube = clone.querySelector("#videoyoutube");
            youtube.style.display = 'none';
          }
            
          var image = clone.querySelector('.fb-user-image');         
          image.src = datas.picture
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
        
        // if(data[i].comment.length){
        //   for (let j = 0; j < data[i].comment.length; j++){
        //       fetch('/user/'+ data[i].comment[j].user_id)  
        //     .then(response => {
        //       if (response.status !== 200) {
        //         console.log('Looks like there was a problem. Status Code: ' + response.status);
        //         return;
        //       }response.json().then(usercmt => {
        //         var comment = data[i].comment[j].content
        //         var username = usercmt.name
        //         var id  = usercmt._id
        //         // var name = clone.querySelector(".usercmt");
        //         // name.innerHTML= username
        //         // name.href = "user/" +id
        //         // var content = clone.querySelector(".cmtcontent");
        //         // content.innerHTML = comment
        //         insertcmt(username,comment,id,data[i]._id)
        //       })

        //       })
        //      j++

        //     }
        // }
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


  function insertpost(username, message, id,linkyoutube,linkvideo,img){
    var temp = document.querySelector("#post");
    var clone = temp.content.cloneNode(true);
    var imageid =clone.querySelector('.imageContainer')

//     var object = {};
// formData.forEach((value, key) => {
//     // Reflect.has in favor of: object.hasOwnProperty(key)
//     if(!Reflect.has(object, key)){
//         object[key] = value;
//         return;
//     }
//     if(!Array.isArray(object[key])){
//         object[key] = [object[key]];    
//     }
//     object[key].push(value);
// });
//       console.log(object);
      if (linkyoutube.length >0){
        var youtube = clone.querySelector("#videoyoutube");    
        youtube.src = linkyoutube
        clone.querySelector("#videolocal").style.display = 'none'
      }else{
        var youtube = clone.querySelector("#videoyoutube");
        youtube.style.display = 'none';
      }
      console.log(linkvideo)
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
    imgs.setAttribute('class','img-responsive'),
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
  function insertcmt(username, message, id,_id){
    var template = document.querySelector('#cmt');
    var clone = template.content.cloneNode(true);
    
    var name = clone.querySelector(".usercmt");
    name.innerHTML= username
    name.href = "user/" +id
    var content = clone.querySelector(".cmtcontent"); 
    content.innerHTML = message
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
            let id= document.getElementById('hiddenid').value
            insertpost(username, message, id,data.linkyoutube,data.linkvideo,data.img)
            
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

              var name = document.querySelector("#txtTitle");
              name.innerHTML = datas.name
              var content = document.querySelector("#txtBody");
              content.innerHTML = data[0].content
              document.getElementById('postBtn2').value = id
            });
          })

          //console.log(data[0].comment.length);
          
        
          });
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
        
          // var socket = io();
          // socket.on('post message', function(data) {
          //   alert(data.username+"đã đăng một bài viết mới")
          //   insertpost(data.username,data.message,data.picture)  
          // });
          $('body').on('click', '#postBtn3', function() {
            let id = $(this).attr('value');
            let data = {
              value: $(id).text() ,
              id: document.getElementById('hiddenid').value,
            }
            console.log(data)
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
                var cmt =  document.getElementById(id).value  
                var username = document.getElementById('username').value
                var user_id = document.getElementById('hiddenid').value
                insertcmt(username, cmt, user_id,id)
                alert('Cập nhật thành công')
                //socket.emit('post message', {username: username, message: message});
              } else {
                alert('Cập nhật thất bại')
                // add your code here
              }
            });
          })
              

          })  
        function doSomething() {
          var modalImg = document.getElementById("img01");
        var modal = document.getElementById("myModals");
        console.log(modal)
          modal.style.display = "block";
          modalImg.src = this.img.currentSrc; 
        }
        

});
function closeModal(){
  var modal = document.getElementById("myModals");
  modal.style.display = "none";
}



// When the user clicks on <span> (x), close the modal


var loadFile = function(event) {
	var image = document.getElementById('image');
	image.src = URL.createObjectURL(event.target.files[0]);
};
$(document).on("change", ".file_multi_video", function(evt) {
  var $source = $('#video_here');
  $source[0].src = URL.createObjectURL(this.files[0]);
  $source.parent()[0].load();
});
jQuery(document).ready(function () {
  ImgUpload();
  
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

function addUpload(){
  document.getElementById('fileupload').style.display = 'block';
}
function addUpload2(){
  document.getElementById('videoupload').style.display = 'block'; 
}
