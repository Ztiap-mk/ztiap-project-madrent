import { StateManager } from './stateManager.js'

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
        //event listeners
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    update() {
        //handle movement and interactions
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
}

const game = new Game('gameArea');
game.start();