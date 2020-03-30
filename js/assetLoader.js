export class ResourceLoader {
    constructor() {
        this.assets = new Map();
        this.images = [
            { name: 'background', src: '../assets/img/bg.png' },
            { name: 'mapBg', src: '../assets/img/mapBg.png' },
            { name: 'player', src: '../assets/img/character.png' },
            { name: 'cart', src: '../assets/img/cart.png' },
            { name: 'map', src: '../assets/img/map.png' },
            { name: 'gold', src: '../assets/img/gold.png' }
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