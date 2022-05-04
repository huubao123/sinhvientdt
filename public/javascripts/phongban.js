window.onload = function(){
    function LoadData() {
      fetch('/getphongban') 
      .then(response => {
        if (response.status !== 200) {  
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.json().then(data => {
        for ( let i = 0; i<data.length;i++){
          
          
          fetch('/user/'+data[i].id)
          .then(response => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }
            response.json().then(datas => {
              var temp = document.querySelector('#phongban');
          var clone = temp.content.cloneNode(true);
              var hrefphongban = clone.querySelector("#hover-primary");
              var name= clone.querySelector("#namephongban"); 
              console.log(hrefphongban)
              console.log(name)
              hrefphongban.href = "post/user/"+ data[i].id

              name.innerHTML = data[i].name

              var imghref = clone.querySelector("#imghref")
              imghref.href = "post/user/"+ data[i].id

              var img = clone.querySelector("#avartar");
              img.src = datas.picture
                        document.getElementById('list').appendChild(clone); 

            })
          })
  
        }
        });
      })
    }
          LoadData()
       
   
  
  };
  
  