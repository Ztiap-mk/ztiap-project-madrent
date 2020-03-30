export class Object {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

export class Sprite extends Object {
    constructor(x, y, width, height, image) {
        super(x, y, width, height);
        this.image = image;
    }
    render(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class Text extends Object {
    constructor(x, y, text, color = "#000000") {
        super(x, y);
        this.text = text;
        this.color = color;
    }
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }
}