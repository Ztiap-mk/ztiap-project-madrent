import { MenuState, GameState } from './states.js'
import { loader } from './assetLoader.js'

export class StateManager {
    constructor(canvas) {
        this.canvas = canvas;
        var states = [];
        var currentState;
    }

    async init() {
        await loader.init().then(console.log("Assets loaded"));
        this.states = {
            menuState: new MenuState(this.canvas),
            gameState: new GameState(this.canvas)
        }
        this.currentState = this.states.menuState;
        //FOR TESTING RIGHT TO GAMESTATE
        //this.currentState = this.states.gameState;
    }
    render(ctx) {
        this.currentState.render(ctx);
    }
}