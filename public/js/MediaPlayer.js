class MediaPlyer {
    constructor(config) {
        this.media = config.el
        this.plugins = config.plugins || []
        this._initialPlugins()
    }
    play() {
        this.media.play()
        document.getElementById("playButton_span").innerText="pause_circle_filled"
        // document.getElementById("mutedButton_span").innerText="pause_circle_filled"

    }
    pause() {
        this.media.pause()
        document.getElementById("playButton_span").innerText="play_circle_filled"
    }
    togglePlay() {
        (this.media.paused)
            ? this.play()
            : this.pause()
    
        }
    _initialPlugins() {
        const player = {
            play: () => this.play(),
            pause: () => this.pause(),
            media: this.media,
            get muted() {
                return this.media.muted
            },
            set muted(value) {
                this.media.muted = value
            }
        }

        this.plugins.forEach(plugin => {
            plugin.run(player)
        })
    }
    mute() {
        this.media.muted = true
        document.getElementById("mutedButton_span").innerText="volume_off"

    }
    unMute() {
        this.media.muted = false
        document.getElementById("mutedButton_span").innerText="volume_up"
    }
    toggleMute() {
        (this.media.muted)
            ? this.unMute()
            : this.mute()
    
    }
    fullScreen (){
        this.media.requestFullscreen()
    }
}

export default MediaPlyer