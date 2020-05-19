import { game, states } from '../main.js'
import { misc } from '../helpers/misc.js'
import { Text } from '../objects.js'

export class DayManager {
    constructor() {
        this.startDay = 1;
    }
    loadDay(day) {
        if (day == null)
            day = this.startDay;

        if (day > game.difficultyManager.getMaxDays())
            day = game.difficultyManager.getMaxDays();

        this.resetDayData();
        game.difficultyManager.setupDay(day);
        if (day != 1)
            this.playAnimation(day);
    }
    resetDayData() {
        let copy = [];
        //copy every element which is not an ore
        copy = game.stateManager.states.gameState.objects.slice(0, 14);
        //reset the array
        game.stateManager.states.gameState.objects = [];
        //and fill it back with the buttons, texts, etc...
        game.stateManager.states.gameState.objects = copy;

        if (states.currentDay > 1) {
            misc.resetTimer();
            game.player.setMoney(0);
            game.playerMoney.setText(game.player.getMoney() + "$");
        }
    }
    playAnimation(day) {
        game.stateManager.states.gameState.objects.push(new Text(game.canvas.width / 2 - 130, game.canvas.height / 2 - 200, "You reached level: " + day, "#FFFFFF", "bold 45px Balthazar"));
        window.setTimeout(() => {
            //TODO add animation and then dissapear
            /*for(var i = 10000; i > 0; i--){
                if(i%1000 == 0)
                    game.stateManager.states.game.objects[game.stateManager.states.game.objects.length-1].setFont();
            }*/
            game.stateManager.states.gameState.objects.pop();
        }, 1500);
    }
}