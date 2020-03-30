import { StateManager } from './stateManager.js'

class Game {
    constructor(canvasId) {
        this.stateManager = new StateManager();
        this.canvas = document.getElementById(canvasId);
        console.log(canvasId);
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
        // requestAnimationFrame(gameLoop);
        //this.gameLoop();
        requestAnimationFrame(() => {
            console.log("frame");
            this.update();
            this.render();
            this.gameLoop();
        })
    }
}

const game = new Game('gameArea');
game.start();
//pass context and canvas id to other params