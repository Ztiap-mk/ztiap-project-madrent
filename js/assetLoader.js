export class ResourceLoader {
    constructor() {
        this.assets = new Map();
        this.images = [
            { name: 'background', src: '../assets/img/bg.png' },
            { name: 'player', src: '../assets/img/character.png' },
            { name: 'map', src: '../assets/img/map.png' }
        ]
    }

    async init() {
        await this.loadImages();
        //await this.loadSounds();
    }

    async loadImages() {
        await Promise.all(
            this.images.map(image => this.loadImage(image))
        )
    }

    async loadImage(asset) {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = asset.src;
            img.onload = () => {
                this.assets.set(asset.name, img);
                resolve(img);
            }
        })
    }

    getImage(imageName) {
        return this.assets.get(imageName);
    }
}
export const loader = new ResourceLoader();