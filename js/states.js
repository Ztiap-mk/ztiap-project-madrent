import { Text, Sprite, Player, Cart } from './objects.js'
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
            new Sprite(0, 200, this.canvas.width, this.canvas.height, loader.getImage("mapBg")),
            new Text(this.canvas.width / 2 - 115, 50, "EPIC MINER GAME", "#000000", "bold 35px Balthazar"),
            new Player(20, 40, 90, 150, loader.getImage("player")),
            new Cart(20, 150, 90, 50, loader.getImage("cart")),
        ];
    }
}