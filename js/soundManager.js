import { loader } from './assetLoader.js'

export class SoundManager {
    constructor() {
        this.currentTrack;
    }
    setTrack(name) {
        this.currentTrack = loader.getSound(name);
        //this.playTrack();
    }

    stopTrack() {
        this.currentTrack.pause();
    }

    playTrack() {
        this.currentTrack.play();
    }
}

export const sounds = new SoundManager();