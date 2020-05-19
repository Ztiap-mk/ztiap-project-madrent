import { loader } from './assetLoader.js'

export class SoundManager {
    constructor() {
        this.tracksPlaying = [];
        this.currentTrack;
    }
    setTrack(name) {
        this.currentTrack = loader.getSound(name);
        this.addTrack(name);
        this.playTrack(name);
    }
    addTrack(name) {
        //TODO detect if audio ends and destroy it
        /*var aud = { "name": name, "track": this.currentTrack };
        aud.onended = function() {
            console.log("ended: " + aud.name);
        }*/
        this.tracksPlaying.push({ "name": name, "track": this.currentTrack });
    }

    stopTrack(name) {
        this.tracksPlaying.forEach(track => {
            if (track.name === name)
                this.currentTrack = track.track;
        });
        this.currentTrack.pause();
    }

    playTrack(name) {
        this.tracksPlaying.forEach(track => {
            if (track.name === name)
                this.currentTrack = track.track;
        });
        this.currentTrack.play();
    }

    playAllTrack() {
        this.tracksPlaying.forEach((track) => {
            this.currentTrack = track.track;
            this.currentTrack.play();
        })
    }

    stopAllTrack() {
        this.tracksPlaying.forEach((track) => {
            this.currentTrack = track.track;
            this.currentTrack.pause();
        })
    }
}

export const sounds = new SoundManager();