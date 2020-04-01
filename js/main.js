import { StateManager } from './stateManager.js'
import { Gold, Button } from './objects.js';
import { loader } from './assetLoader.js'

class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.stateManager = new StateManager(this.canvas);

        const ctx = this.canvas.getContext('2d');
        this.ctx = ctx;
        this.gameOver = 0;
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

        window.addEventListener('click', (ev) => {
            console.log(this.stateManager.currentState.objects);
            setTimeout(this.checkClick(ev), 200);
            console.log(this.stateManager.currentState.objects);
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
        this.animationFrame = requestAnimationFrame(() => {
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
            if (this.gameOver == 0) {
                this.stateManager.currentState.objects.push(new Button(this.canvas.width / 2 - 100, 300, 200, 100, "#7F3300", "#FF6A00", "Play again", "playAgain"));
                this.gameOver = 1;
            }
            window.cancelAnimationFrame(this.animationFrame);
        }
    }

    async checkClick(event) {
        var x = event.pageX - this.canvas.offsetLeft;
        var y = event.pageY - this.canvas.offsetTop;
        for (var i in this.stateManager.currentState.objects) {

            var button = this.stateManager.currentState.objects[i];

            if (x > button.x && x < button.x + button.width && y > button.y && y < button.y + button.height) {
                switch (button.onclick()) {
                    case "newGame":
                        this.stateManager.currentState = this.stateManager.states.gameState;
                        break;
                    case "playAgain":
                        this.stateManager.currentState.objects.pop();
                        this.cart.x = 150;
                        this.player.x = 150;
                        this.gameOver = 0;
                        break;
                    case "GOLD":
                        //handle gold click
                        console.log("GOLD")
                        break;
                }
            }
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