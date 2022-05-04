window.onload = function(){
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

    document.getElementById("taophongban").onclick = function(e) {
        e.preventDefault();
        // var token = document.getElementById('csrf').value;
        

        var checkbox = document.getElementsByName('chuyenmuc');
         var result = [];
                 
                // Lặp qua từng checkbox để lấy giá trị
        for (var i = 0; i < checkbox.length; i++){
            if  ( checkbox[i].checked === true )    {

                result[i]= checkbox[i].value ;
            }
        }

        var resulted = result.filter(function (el) {
            return el != null;
          });
            let data = {
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value,
                        username: document.getElementById('name').value,
                        chuyenmuc: resulted
                    }

        fetch('/admin/taophongban', {
            credentials: 'same-origin',
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'CSRF-Token': token
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
        .then(res => {
            if (res.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
            }
            // Examine the text in the response
            res.json().then(function(data) { 
                console.log(data)
            if (data.success == 'true') {
                function do_totalsN(){
                    var ele = document.getElementsByClassName('alert-success')[0];
                    ele.style.display = 'block';
                    setTimeout(function(){
                        ele.style.display = 'none';
                    }, 5000);
                }
                do_totalsN();
    
            } else 
            {
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
        };
    
    
    
    
    }
    