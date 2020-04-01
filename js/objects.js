import { loader } from './assetLoader.js'

export class Object {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    onclick() {};
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
    constructor(x, y, width, height, primaryColor, secondaryColor, text, functionToRun) {
        super(x, y, width, height);
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.text = text;
        this.functionToRun = functionToRun;
        this.shadowBlur = 3;
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
        ctx.fillStyle = "#FFFFFF";
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