let logoutButton = document.getElementById("logoutButton");
let profileName = document.getElementById("profileName");

//Redirect => media player
let playButton =(video_url)=>{
    if(video_url){
        
        window.location.href= `/media-player/${btoa(video_url)}`
    }else {
        console.log("No hay video")
    }
}

//Logout (this function delete token)
logoutButton.onclick = ()=>{
    document.cookie = "token= ;"
    window.location.href = "/login"
}
(()=>{
    let splitToken = document.cookie.split(".");
    let token = splitToken[1]
    let payloadToken = JSON.parse(atob(token)) 
    profileName.innerHTML = payloadToken.name
})()