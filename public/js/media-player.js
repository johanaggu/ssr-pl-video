import MediaPlyer from './MediaPlayer.js'
import AutoPlay from './plugins/AutoPlay.js'
import AutoPause from './plugins/AutoPause.js'
import Comentarios from "./comentarios.js"

const video = document.getElementById("video")
const button = document.getElementById("playButton")
const unmuteButton = document.getElementById("unMuted")
const fullScreen =document.getElementById("fullscreen")

const player = new MediaPlyer({
    el: video,
    plugins: [new AutoPlay(), new AutoPause()]
})

button.onclick = () =>player.togglePlay()
unmuteButton.onclick = () => player.toggleMute()
fullScreen.onclick=()=> player.fullScreen()




// ---------------   Service Workers   -------------------     
// if ("serviceWorker" in navigator) {

//     navigator.serviceWorker.register("/sw.js")
//         .catch(err => {
//             console.error(err);
//         })
// };