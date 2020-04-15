import { Text, Sprite, Player, Cart, Button, SettingsButton, BackgroundWithOpacity, BackButton, SoundButton, QuestionButton } from './objects.js'
import { loader } from './assetLoader.js'
import { sounds } from './soundManager.js'

class Base {
    constructor(manager, canvas) {
        this.manager = manager;
        var objects = [];
        this.canvas = canvas;
    }
    render(ctx) {
        this.objects.forEach(element => {
            element.render(ctx);
        });
    }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }
}

export class MenuState extends Base {
    constructor(manager, canvas) {
        super(manager, canvas);
        const startGameButton = new Button(this.canvas.width / 2 - 350, 300, 200, 100, "#7F3300", "#FF6A00", "Start Game", "newGame"); //TODO ~start game function passing
        const shopButton = new Button(this.canvas.width / 2 - 350, 450, 200, 100, "#7F3300", "#FF6A00", "SHOP", "enterShop");
        const settingsButton = new SettingsButton(this.canvas.width / 2 - 210, 600, 61, 58, loader.getImage("settingsBtn"), "no", manager);

        this.objects = [
            new Sprite(0, 0, this.canvas.width, this.canvas.height, loader.getImage("background")),
            new Sprite(this.canvas.width / 2, 50, 587, 659, loader.getImage("menuCharacter")),
            new Text(this.canvas.width / 2 - 115, 100, "Epic Miner Game", "#000000", "bold 35px Balthazar"),
            startGameButton,
            shopButton,
            settingsButton
        ];
        sounds.setTrack('mainTheme');
    }
}

export class GameState extends Base {
    constructor(manager, canvas) {
        super(manager, canvas);
        this.objects = [
            new Sprite(0, 200, this.canvas.width, this.canvas.height, loader.getImage("mapBg")),
            new Text(this.canvas.width / 2 - 115, 50, "EPIC MINER GAME", "#000000", "bold 35px Balthazar"),

            new Player(20, 40, 90, 150, loader.getImage("player")),
            new Cart(20, 150, 90, 50, loader.getImage("cart")),

            new Text(50, 50, "TARGET: ", "#000000", "bold 30px Balthazar"),
            new Button(170, 20, 100, 50, "#333333", "#FFD800", "850 $", "misc", "#4CFF00"), //TODO ~start game function passing

            new Button(this.canvas.width - 220, 20, 130, 50, "#7F3300", "#FF6A00", "1 : 00", "misc"),
            new QuestionButton(this.canvas.width - 80, 15, 61, 58, loader.getImage("settingsBtn"), "no", manager, this.canvas),
        ];
    }
}

export class SettingsState extends Base {
    constructor(manager, canvas) {
        super(manager, canvas);
        this.objects = [
            new Sprite(0, 0, this.canvas.width, this.canvas.height, loader.getImage("background")),
            new Text(this.canvas.width / 2 - 75, 50, "SETTINGS", "#FFD800", "bold 35px Balthazar"),
            new BackgroundWithOpacity(this.canvas.width / 2 - 300, this.canvas.height / 2 - 200, 600, 400, '#000000', 0.4),
            new Text(this.canvas.width / 2 - 250, 250, "Controls", "black", "bold 30px Balthazar"),

            new Text(this.canvas.width / 2 - 250, 320, "LEFT / RIGHT", "black", "bold 25px Balthazar"),
            new Sprite(this.canvas.width / 2 + 150, 280, 137, 59, loader.getImage("buttonPair")),

            new Text(this.canvas.width / 2 - 250, 390, "SHOOT ANCHOR", "black", "bold 25px Balthazar"),
            new Sprite(this.canvas.width / 2 + 150, 350, 137, 59, loader.getImage("spaceButton")),

            new Text(this.canvas.width / 2 - 250, 460, "USE ITEM", "black", "bold 25px Balthazar"),
            new Sprite(this.canvas.width / 2 + 150, 420, 137, 59, loader.getImage("enterButton")),

            new BackButton(this.canvas.width - 160, 60, 60, 58, loader.getImage("backButton"), "no", manager, 'menuState'),
            new SoundButton(this.canvas.width / 2 - 270, 520, 60, 58, loader.getImage("sound1Button"), "no", manager, "on"),
            new SoundButton(this.canvas.width / 2 - 200, 520, 60, 58, loader.getImage("noSound1Button"), "no", manager, "off"),
        ];
    }
}