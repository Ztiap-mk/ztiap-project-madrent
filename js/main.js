import { StateManager } from './stateManager.js'
import { Gold } from './objects.js';
import { loader } from './assetLoader.js'

class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        //this.canvas.width = document.body.clientWidth;
        //this.canvas.height = document.body.clientHeight;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.stateManager = new StateManager(this.canvas);

        const ctx = this.canvas.getContext('2d');
        this.ctx = ctx;
    }

    async start() {
        await this.stateManager.init();
        this.initialise();
        this.gameLoop();
    }

    initialise() {
        //variables
        this.player = this.stateManager.states.gameState.objects[2];
        this.cart = this.stateManager.states.gameState.objects[3];

        //functions to run before game
        //TODO change this value to map specific
        this.spawnObjects(3);

        //event listeners
        window.addEventListener('keydown', (ev) => {
            this.move(ev);
        }, true)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    update() {
        //handle movement and interactions
        //checkCollision();
        //updateTime();
        this.checkForGameOver();
    }

    render() {
        this.clear();
        this.stateManager.render(this.ctx);
    }

    gameLoop() {
        requestAnimationFrame(() => {
            this.update();
            this.render();
            this.gameLoop();
        })
    }

    move(ev) {
        switch (ev.keyCode) {
            case 37:
                //move left
                this.player.move(-1)
                this.cart.move(-1)
                break;
            case 39:
                //move right
                this.player.move(+1)
                this.cart.move(+1)
                break;
            default:
                break;
        }
    }

    checkForGameOver() {
        if (this.player.getX() < 0 || this.player.getX() > (this.canvas.width - this.player.getWidth())) {
            console.log("GAMEOVER")
        }
    }

    spawnObjects(count) {
        for (var i = 0; i < count; i++) {
            this.stateManager.states.gameState.objects.push(new Gold(Math.random() * (this.canvas.width - 100) + 100, Math.random() * (this.canvas.height - 250) + 200, 70, 70, loader.getImage("gold")));
        }
    }
}

const game = new Game('gameArea');
game.start();