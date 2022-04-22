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