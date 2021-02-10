let logoutButton = document.getElementById("logoutButton");
let profileName = document.getElementById("profileName");
let userId = document.getElementById("userId").innerHTML;
// let profileName = document.getElementById("profileName");

//Redirect => media player
let playButton =(video_url)=>{
    if(video_url){
        window.location.href= `/media-player/${btoa(video_url)}`
    }else {
        console.log("No hay video")
    }
}
let addButton =async (movieId)=>{
    console.log(movieId, userId);
    let getMovie = await axios(`/movie/${movieId}`);
    let movie = getMovie.data.data;
    let createUserMovie = await axios(`/user-movies`,{
        method:"post",
        data:{
            "userId": userId,
            "movieId": movie
        }
    })

}

let removeButton = async () => {
    console.log("removeButton");
}
//Logout (this function delete token)
logoutButton.onclick = ()=>{
    document.cookie = "token= ;"
    window.location.href = "/login"
}
