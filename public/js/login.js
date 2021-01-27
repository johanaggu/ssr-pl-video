let email = document.getElementById("form-login_email")
let password = document.getElementById("form-login_password")
let button = document.getElementById("form-login_button")

button.onclick= ()=> {
    if (!email.value || !password.value) {
        alert("Tu email o contraseña son incorrectos")
    } 
    if (email.value && password.value) {
        
        axios("http://localhost:4000/auth/sign-in",{
            method:"post",
            auth:{
                username: email.value,
                password: password.value
            }
        })
        .then(data => {
            delete data.config.auth
            console.log(data.config.auth);
            window.location.href = "/initial-view";
        })
        .catch(err => {
            alert("Tu email o contraseña son incorrectos")
        })
    } 
} 
   
