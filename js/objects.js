export class Object {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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