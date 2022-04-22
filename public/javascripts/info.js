window.onload = function(){
  var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

    let id = document.getElementById("hiddenid").value;
    function LoadData() {
        fetch('/user/'+id) 
        .then(response => {
          if (response.status !== 200) {  
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
          }
          response.json().then(data => {
            document.getElementById('first_name').value = data.name
            if (data.phone_number){
                document.getElementById('phone_number').value = data.phone_number
            }else{
                document.getElementById('phone_number').value = ""
            }
            if (data.facebook){
                document.getElementById('facebook').value = data.linkfacebook
            }else{
                document.getElementById('facebook').value = ""
            }
            if (data.lop){
                document.getElementById('lop').value = data.lop
            } 
            if (data.khoa){
                document.getElementById('khoa').value = data.khoa
            }

            if (data.picture){
              if (data.picture.includes('/images/')){
                document.getElementById('image').src ="../" + data.picture
              } else{
                document.getElementById('image').src = data.picture
              }
              

            }else{
              document.getElementById('image').src = ""
            }
            
          });
        })
      }
      LoadData()

      
      document.getElementById("update").addEventListener("click" , function(e){
        e.preventDefault();
        const fileInput = document.querySelector('#customFile') ;
        const name = document.getElementById('first_name').value
        const phone_number = document.getElementById('phone_number').value
        const facebook = document.getElementById('facebook').value
        if (document.getElementById('oldpassword') == null)
         oldpass = ""
        else
        {
          oldpass = document.getElementById('oldpassword').value
        }
        if (document.getElementById('newpassword') == null)
        newpassword = ""
        else
        {
          newpassword = document.getElementById('newpassword').value
        }
        if (document.getElementById('renewpassword') == null)
        newpassword = ""
        else
        {
          renewpassword = document.getElementById('renewpassword').value
        }
      //  const  newpass = document.getElementById('newpassword').value
      //  const renewpassword= document.getElementById('renewpassword').value
       
        
       
       const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        formData.append('name',name)
        formData.append('phone_number',phone_number)
        formData.append('facebook',facebook)
        if(document.getElementById('lop') != null){
          formData.append('lop',document.getElementById('lop').value)
       }else{
          formData.append('lop',"")
       }
       if (document.getElementById('khoa') != null){
        formData.append('khoa',document.getElementById('khoa').value)
       }else{
        formData.append('khoa',"")
       }
        if(oldpass != '' && newpassword != '' && renewpassword != ''){
          let datas = {
           oldpass : oldpass,
          newpass : newpassword
        }
        fetch('/user/checkpass/'+id, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'CSRF-Token': token
            },
          body: JSON.stringify(datas)
        })
        .then(response => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
          }
          // Examine the text in the response
          response.json().then(async function(data) { 
            if (data.success == 'true') {
             await updateuser(formData)
              window.scrollTo(0, 0);
              document.getElementById('thongbao').style.display = 'block';
              document.getElementById('thongbao').style.color = 'green';

              document.getElementById('thongbao').value = 'Cập nhật thành công'
              // socket.emit('post message', {username: username, message: message});
            } else if (data.password == 'wrong') {
                       window.scrollTo(0, 0);
                       document.getElementById('thongbao').style.display = 'block';
                       document.getElementById('thongbao').style.color = 'red';

                       document.getElementById('thongbao').value = 'Mật khẩu sai vui lòng nhập lại'

            }
          });
        })
        } else {
         updateuser(formData)
        }
         
        function updateuser(formData){
          fetch('/user/update/'+id, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: { 
              // 'Content-Type': 'application/json', 
              'CSRF-Token': token
            },
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
              window.scrollTo(0, 0);
              document.getElementById('thongbao').style.display = 'block';
              document.getElementById('thongbao').style.color = 'green';

              document.getElementById('thongbao').value = 'Cập nhật thành công'
              // socket.emit('post message', {username: username, message: message});
            } else {
              // add your code here
            }
          });
        })
        }
        
        
    

        

       
       
        
      });  
}
var loadFile = function(event) {
	var image = document.getElementById('image');
	image.src = URL.createObjectURL(event.target.files[0]);
};
var check = function() {   

    const oldpass = document.getElementById('oldpassword').value
        const newpass = document.getElementById('newpassword').value
        const repassword = document.getElementById('renewpassword').value
        if(!oldpass || !newpass || !repassword){
            document.getElementById('message').style.color = 'red';
          document.getElementById('message').innerHTML = 'Password not null';
        }
        else if (newpass != repassword) {
            document.getElementById('message').style.color = 'red';
          document.getElementById('message').innerHTML = 'RePassword not matching';
        }
      
       
   

      else {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = ' matching';
    }
      
      }