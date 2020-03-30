import { Text, Sprite } from './objects.js'
import { loader } from './assetLoader.js'

class Base {
    constructor() {
        var objects = [];
    }
    render(ctx) {
        this.objects.forEach(element => {
            element.render(ctx);
        });
    }
}

export class MenuState extends Base {
    constructor() {
        super();
        this.objects = [
            new Text(100, 100, "Epic Miner Game"),
            new Text(50, 50, "Second String", "#FF00AA"),
            new Sprite(0, 0, 100, 100, loader.getImage("background"))
        ];
    }
}

export class GameState extends Base {
    constructor() {
        super();
        this.objects = [
            new Text(0, 0, "Epic Miner GameG"),
            new Text(50, 50, "Second StringG", "#FF00AA")
        ];
    }
}