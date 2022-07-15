    
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
        credentials: 'same-origin',
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
    }      
    $('#password').keypress(function(e) {
        if (e.keyCode == $.ui.keyCode.ENTER) {
            e.preventDefault();            
        }
    });
    var user = document.getElementById('email').value = "danglehuubaophc@gmail.com"
    var pass = document.getElementById('password').value ="asd"
   document.getElementById("login").onclick = function(e) {
        e.preventDefault();
        let data = {    
            email: user, //document.getElementById('email').value,
            password: pass   //document.getElementById('password').value
        }
        fetch('/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'CSRF-Token': token
            },  
            credentials: 'same-origin',
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
                console.log(data)
            } else 
            {
                // add your code here
            }
            });
        })
        };
    