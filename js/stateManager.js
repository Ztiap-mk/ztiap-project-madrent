/*//https://github.com/Ztiap-mk/ztiap-project-madrent*/

import { MenuState, GameState } from './states.js'
import { loader } from './assetLoader.js'

export class StateManager {
    constructor() {
        //this.loader = new ResourceLoader();
        var states = [];
        var currentState;
    }

    async init() {
        await loader.init().then(console.log("Assets loaded"));
        this.states = {
            menuState: new MenuState(),
            gameState: new GameState()
        }
        this.currentState = this.states.menuState;
    }
    render(ctx) {
        this.currentState.render(ctx);
    }
}