import { Text, Sprite } from './objects.js'
import { loader } from './assetLoader.js'

class Base {
    constructor(canvas) {
        var objects = [];
        this.canvas = canvas;
    }
    render(ctx) {
        this.objects.forEach(element => {
            element.render(ctx);
        });
    }
}

export class MenuState extends Base {
    constructor(canvas) {
        super(canvas);
        this.objects = [
            new Sprite(0, 0, this.canvas.width, this.canvas.height, loader.getImage("background")),
            new Text(this.canvas.width / 2 - 115, 100, "Epic Miner Game", "#000000", "bold 35px Balthazar"),
        ];
    }
}

export class GameState extends Base {
    constructor(canvas) {
        super(canvas);
        this.objects = [
            new Sprite(0, 0, this.canvas.width, this.canvas.height, loader.getImage("background"), "yes"),
            new Text(50, 50, "Second StringG", "#FF00AA")
        ];
    }
}