window.onload = function(){
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

    document.getElementById("forgot").onclick  = function(e){
        e.preventDefault();
    document.getElementById("repassword").style.display = "block";
    document.getElementById("loginback").style.display = "block";
    document.getElementById("forgot").style.display = "none";
   }
 document.getElementById("longinback").onclick = function(e){
        e.preventDefault(); 
        document.getElementById("repassword").style.display = "none";
        document.getElementById("forgot").style.display = "block";
    }

    document.getElementById("reset-password").onclick = function(e) {
    e.preventDefault();
    let data = {    
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        repassword: document.getElementById('repassword').value
    }
    fetch('/doimk', {
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
        alert("Password Match: Welcome!")

        } else 
        {
        alert("Wrong Password and Email")
            // add your code here
        }
        });
    })
    };
    
    document.getElementById("login").onclick = function(e) {
        e.preventDefault();
        let data = {    
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }
        fetch('/login', {
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
            if (data.success == 'true') {
            alert("Password Match: Welcome!")
    
            } else 
            {
            alert("Wrong Password and Email")
                // add your code here
            }
            });
        })
        };



}

// var check = function() {   
//     var email = document.getElementById('email').value
//     var password = document.getElementById('password').value
//     var repassword = document.getElementById('repassword').value
//         if(!email){
//             document.getElementById('message').style.color = 'red';
//           document.getElementById('message').innerHTML = 'Email not null';
//         }
//         else if (!password) {
//             document.getElementById('message').style.color = 'red';
//           document.getElementById('message').innerHTML = 'Password not null';
//         }
//        else {
//         document.getElementById('message').disabled  = true;
//         document.getElementById('message').disabled  = true;
//       }
       
   

//       if (document.getElementById('password').value ==
//       document.getElementById('repassword').value) {
//       document.getElementById('message').style.color = 'green';
//       document.getElementById('message').innerHTML = 'matching';
//     } else {
//       document.getElementById('message').style.color = 'red';
//       document.getElementById('message').innerHTML = 'not matching';
//     }
      
//       }