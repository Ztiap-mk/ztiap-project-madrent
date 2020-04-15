import { loader } from './assetLoader.js'
import { sounds } from './soundManager.js'
import * as Misc from './functions.js'

export class Object {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    handleEvent(ev) {
        if (this.isClicked(ev))
            this.onclick();
    }

    onclick() {};

    isClicked(ev) {
        const mX = ev.offsetX;
        const mY = ev.offsetY;

        if (mX >= this.x && mX <= this.x + this.width && mY >= this.y && mY <= this.y + this.height) {
            return true;
        }
        return false;
    }
}

export class BackgroundWithOpacity extends Object {
    constructor(x, y, width, height, color, opacity) {
        super(x, y, width, height);
        this.color = color;
        this.opacity = opacity;
    }
    render(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}

export class Sprite extends Object {
    constructor(x, y, width, height, image, partial = "no") {
        super(x, y, width, height);
        this.image = image;
        this.partial = partial;
    }
    render(ctx) {
        if (this.partial == "no")
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        else if (this.partial == "yes") {
            var imageAspectRatio = this.image.width / this.image.height;
            var canvasAspectRatio = this.width / this.height; //we need some other way here
            var renderableWidth;

            //clip image
            renderableWidth = this.image.width * (this.height / this.image.height);

            ctx.drawImage(this.image, this.x, this.y, renderableWidth, this.height);
        }
        //TODO clipping and too big images are a huge drawback
    }
}

export class Text extends Object {
    constructor(x, y, text, color = "#000000", font = "15px Balthazar") {
        super(x, y);
        this.text = text;
        this.color = color;
        this.font = font;
    }
    render(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }
}

export class Player extends Object {
    constructor(x, y, width, height, image) {
            super(x, y, width, height, image);
            this.image = image;
            this.money = 0;
            this.stage = 0;
            this.speed = 3;
        }
        //static x = this.x;

    render(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(distance) {
        this.x += distance * this.speed;
    }

    getX() {
        return this.x;
    }

    getWidth() {
        return this.width;
    }
}

export class Cart extends Player {
    constructor(x, y, width, height, image) {
        super(x, y, width, height, image);
    }
    render(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(distance) {
        this.x += distance * this.speed;
    }

    getX() {
        return this.x;
    }
}

export class Gold extends Sprite {
    onclick() {
        this.image = loader.getImage("diamond");
        this.width = 46;
        this.height = 37;
        return "GOLD";
    }
}

export class Button extends Object {
    constructor(x, y, width, height, primaryColor, secondaryColor, text, functionToRun, textColor = "#FFFFFF") {
        super(x, y, width, height);
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.text = text;
        this.functionToRun = functionToRun;
        this.shadowBlur = 3;
        this.textColor = textColor;
    }

    render(ctx) {
        //TODO remake this with quadraticCurveTo() and fill()
        ctx.save();
        ctx.shadowBlur = this.shadowBlur;
        ctx.shadowColor = this.secondaryColor;
        ctx.fillStyle = this.secondaryColor;

        //shadow
        ctx.fillRect(this.x - this.shadowBlur, this.y - this.shadowBlur, this.width + this.shadowBlur * 2, this.height + this.shadowBlur * 2);

        //main bg
        ctx.fillStyle = this.primaryColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        //text on the button
        ctx.font = "bold 30px Balthazar";
        ctx.fillStyle = this.textColor;
        ctx.shadowBlur = 0;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);

        ctx.restore();
    }

    onclick() {
        return this.functionToRun;
    }
}

export class SettingsButton extends Sprite {
    constructor(x, y, width, height, image, partial, manager) {
        super(x, y, width, height, image, partial, manager);
        this.manager = manager;
    }

    onclick() {
        this.manager.changeState('settingsState');
    }
}

export class QuestionButton extends Sprite {
    constructor(x, y, width, height, image, partial, manager, canvas) {
        super(x, y, width, height, image, partial, manager, canvas);
        this.manager = manager;
        this.canvas = canvas;
    }

    onclick() {
        this.manager.currentState.objects.push(new InstructionsButton(this.canvas.width - 80, 75, 60, 58, loader.getImage("questionButton"), "no", this.manager));
        //TODO add more buttons
    }
}

export class InGameSettingsButton extends Sprite {
    constructor(x, y, width, height, image, partial, manager) {
        super(x, y, width, height, image, partial, manager);
        this.manager = manager;
    }
    onclick() {
        //TODO back to menu, enter settings etc...
    }
}

export class InstructionsButton extends Sprite {
    constructor(x, y, width, height, image, partial, manager) {
        super(x, y, width, height, image, partial, manager);
        this.manager = manager;
    }
    onclick() {
        //TODO show instructions
        if (document.getElementsByClassName("instructions")[0].style.display == "none") {
            document.getElementsByClassName("instructions")[0].style.display = "block";
        } else {
            console.log("instructions");
            document.getElementsByClassName("instructions")[0].style.display = "none";
        }
    }
}

export class BackButton extends Sprite {
    constructor(x, y, width, height, image, partial, manager, toState) {
        super(x, y, width, height, image, partial, manager);
        this.manager = manager;
        this.newState = toState;
    }

    onclick() {
        this.manager.changeState(this.newState);
    }
}

export class SoundButton extends Sprite {
    constructor(x, y, width, height, image, partial, manager, toState) {
        super(x, y, width, height, image, partial, manager);
        this.manager = manager;
        this.toState = toState;
    }

    onclick() {
        /*if (Misc.getCookie("sound") == "yes") {
            Misc.setCookie("sound", "no", 7);
            this.manager.soundManager.stopTrack();
        } else {
            Misc.setCookie("sound", "yes", 7);
            this.manager.soundManager.playTrack();
        }*/
        if (this.toState == "on")
            sounds.playTrack();
        else
            sounds.stopTrack();
    }
}