class AutoPause {
    // private threshold:number
    constructor() {
        this.threshold = 0.25;
        this.handlerIntersection=this.handlerIntersection.bind(this);
        this.handlerVisibilityChanges= this.handlerVisibilityChanges.bind(this)
    }
    run(player) {
        this.player = player
        const observer = new IntersectionObserver(this.handlerIntersection, {
            threshold: this.threshold //threshold => Es el umbral
        })
        observer.observe(player.media)
        document.addEventListener("visibilitychange", this.handlerVisibilityChanges)
    }
    handlerIntersection(entries) {
        const entry = entries[0]
        const isVisible = entry.intersectionRatio >this.threshold
        if (isVisible) {
            this.player.play()
        } else {
            this.player.pause()
        }
    }
    handlerVisibilityChanges(){
        const isVisible = document.visibilityState==="visible"
        if (isVisible){
            this.player.play()
        } else{
            this.player.pause()
        }
    }
}



export default AutoPause