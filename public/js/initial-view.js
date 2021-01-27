let playButton =(video_url)=>{
    if(video_url){
        
        window.location.href= `/media-player/${btoa(video_url)}`
    }else {
        console.log("No hay video")
    }
}