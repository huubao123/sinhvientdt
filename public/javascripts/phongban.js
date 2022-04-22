window.onload = function(){
    function LoadData() {
      fetch('/getphongban') 
      .then(response => {
        if (response.status !== 200) {  
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.json().then(data => {
          console.log(data)
        //console.log(data[0].comment.length);
        for ( let i = 0; i<data.length;i++){
          var temp = document.getElementsByTagName("template")[0];
          var clone = temp.content.cloneNode(true);
          var name = clone.querySelector("a");
         
  
          name.innerHTML = data[i].name
          name.href = "post/user/"+ data[i].id

          document.getElementById('phongban').appendChild(clone); 
  
        }
        });
      })
    }
          LoadData()
       
   
  
  };
  
  