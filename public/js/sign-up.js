let nameInput = document.getElementById("nameInput")
let emailInput = document.getElementById("emailInput")
let passwordInput = document.getElementById("passwordInput")
let formButton = document.getElementById("formButton")

formButton.onclick = ()=>{
    if (nameInput.value && emailInput.value && passwordInput.value){
        axios({
            url: "/auth/sign-up",
            method: "post",
            data:{
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            }
        }).then( data => {
            delete data.config.data
            if(data.status === 201) window.location.href = "/login"

        }).catch( err => {
            console.log(err);
        })
        
    }
}