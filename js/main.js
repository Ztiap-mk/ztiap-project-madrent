var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = document.body.clientWidth;
canvas.height = window.innerHeight - 20;
var canvasW = canvas.width;
var canvasH = canvas.height;
console.log(canvasW + "x" + canvasH + " - " + document.body.clientHeight);
var req;

window.addEventListener("onclick", (e) => {
    checkClick(e);
})


var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";

var phase1 = true; //just the anchor animation - phase1 from left to right, phase 2 from right to left when false

image = new Image();
image.src = "assets/img/sprite.png";

var lastFrame = 0

var settings = {
    player: {
        moveSpeed: 4
    },
    anchor: {
        moveSpeed: 5,
        moveAngle: 10
    }
}

var positions = {
    character: {
        posX: canvasW / 2 - 60,
        posY: 120,
        x: 14,
        y: 481,
        width: 67,
        height: 122
    },
    map: {
        x: 0,
        y: 0
    },
    floor: {
        top: 250
    },
    anchor: {
        x: 407,
        y: 0,
        width: 34,
        height: 52,
        endX: 0,
        endY: canvasH - 30,
        angle: -160
    },
    background: {
        x: 1021,
        y: 0,
        width: 800,
        height: 407
    },
    gold: {
        x: 131,
        y: 386,
        width: 61,
        height: 60,
        posX: 0,
        poxY: 0,
        onclick: function() {
            this.x = diamond.x,
                this.y = diamond.y
        },
        draw: function(posX, posY) {
            ctx.drawImage(image, this.x, this.y, this.width, this.height, posX, posY, this.width, this.height);
        }
    },
    diamond: {
        x: 144,
        y: 517,
        width: 45,
        height: 36,
        onclick: function() {
            this.x = gold.x,
                this.y = gold.y
        },
        draw: function(posX, posY) {
            ctx.drawImage(image, this.x, this.y, this.width, this.height, posX, posY, this.width, this.height);
        }
    },
    cart: {
        x: 14,
        y: 391,
        width: 71,
        height: 53
    }
}

function init() {
    //initialise user variables, load resources than start the game
    req = window.requestAnimationFrame(gameLoop)
}

function gameLoop(timeStamp) {
    var progress = timeStamp - lastFrame

    update(progress);

    draw();

    lastFrame = timeStamp

    //TODO
    //stop the game on timeout, pighit, collision with wall, etc...
    req = window.requestAnimationFrame(gameLoop)
}

function move(e) {
    switch (e.keyCode) {
        case 37:
            positions.character.posX -= settings.player.moveSpeed;
            break;
        case 39:
            positions.character.posX += settings.player.moveSpeed;
            break;
        default:
            break;
    }
}


function update(time) {
    //detect player input
    document.onkeydown = move;
    if (positions.character.posX < 0 || positions.character.posX + positions.character.width > canvasW) {
        gameOver();
        return;
    }

    //animate anchor
    calculateAnchorAngle();
    calculateCollision();
    if (positions.anchor.endX < canvasW && phase1) {
        positions.anchor.endX += settings.anchor.moveSpeed;
        positions.anchor.angle -= settings.anchor.moveAngle;
        if (positions.anchor.endX >= canvasW) {
            phase1 = false;
        }
    }

    if (positions.anchor.endX > 0 && !phase1) {
        positions.anchor.endX -= settings.anchor.moveSpeed;
        positions.anchor.angle += settings.anchor.moveAngle;
        if (positions.anchor.endX <= 0) {
            phase1 = true;
        }
    }
}

function draw() {
    //CLEAR game area
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //debug info
    ctx.fillStyle = "#000000";
    ctx.fillText("X:" + positions.character.posX + ", Y: " + positions.character.posY /* + " anchorX: " + positions.anchor.endX + ", anchorY: " + positions.anchor.endY*/ , 10, 50);

    //title
    ctx.fillStyle = "#FFB200";
    ctx.fillText("EPIC Miner Game", canvasW / 2 - 130, 40);

    //platform 
    ctx.beginPath();
    ctx.moveTo(0, positions.floor.top);
    ctx.lineTo(canvasW, positions.floor.top);
    ctx.stroke();

    //miner map
    ctx.drawImage(image, positions.background.x, positions.background.y, positions.background.width, positions.background.height, 0, positions.floor.top, canvasW, canvasH - positions.floor.top);

    //character
    ctx.drawImage(image, positions.character.x, positions.character.y, positions.character.width, positions.character.height, positions.character.posX, positions.character.posY, positions.character.width, positions.character.height);
    //and the cart in front of him
    ctx.drawImage(image, positions.cart.x, positions.cart.y, positions.cart.width, positions.cart.height, positions.character.posX, positions.character.posY + positions.character.height - positions.cart.height + 10, positions.cart.width, positions.cart.height);

    //anchor path
    ctx.beginPath();
    ctx.moveTo(positions.character.posX + positions.cart.width / 2 - 1, positions.character.posY + positions.character.height - 22);
    ctx.lineTo(positions.anchor.endX, positions.anchor.endY);
    ctx.stroke();

    //anchor
    ctx.save();
    ctx.translate(positions.character.posX + positions.cart.width / 2 - 1, positions.character.posY + positions.character.height - 22)
    ctx.rotate(positions.anchor.angle * Math.PI / 180); //TODO fix jumping st the edges
    //ctx.drawImage(image, positions.anchor.x, positions.anchor.y, positions.anchor.width, positions.anchor.height, positions.character.posX + positions.cart.width / 2 - 1 - positions.anchor.width / 2, positions.character.posY + positions.character.height - 22, positions.anchor.width, positions.anchor.height - 5);
    ctx.drawImage(image, positions.anchor.x, positions.anchor.y, positions.anchor.width, positions.anchor.height, -(positions.anchor.width / 2), 0, positions.anchor.width, positions.anchor.height - 5);
    ctx.restore();

    var level = 1;
    spawnObjects(level);
}


function calculateAnchorAngle() {
    let a, b, c;
    a = positions.character.posX - positions.anchor.endX;
    b = positions.anchor.endY - positions.character.posY;
    c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    if (positions.anchor.endX < positions.character.posX)
        positions.anchor.angle = Math.acos((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c)) * 180 / Math.PI;
    else if (positions.anchor.endX > positions.character.posX)
        positions.anchor.angle = -(Math.acos((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c)) * 180 / Math.PI);
    else
        positions.anchor.angle = 0;
    console.log(positions.anchor.angle);
}

function calculateCollision() {
    //let a,b;
    //a = Math.sqrt(Math.pow(positions.anchor.endY - positions.character.posY, 2) + Math.pow(positions.character.posX - positions.anchor.endX, 2));
    //lineCircleCollide([positions.character.posX, positions.character.posY],[positions.anchor.endX,positions.anchor.endY],[500,500],50)
}

//TODO
//load level data
var resources = {
    gold: [
        [600, 800],
        [70, 625]
    ],
    diamond: [
        [825, 536]
    ]
}

var res = [];

function spawnObjects(level) {

    // var resources = {
    //     gold: [
    //         [600, 800],
    //         [70, 625]
    //     ],
    //     diamond: [
    //         [825, 536]
    //     ]
    // }

    if (level == 1) {
        for (var i = 0; i < resources.gold.length; i++) {
            //ctx.drawImage(image, positions.gold.x, positions.gold.y, positions.gold.width, positions.gold.height, resources.gold[i][0], resources.gold[i][1], positions.gold.width, positions.gold.height);
            positions.gold.draw(resources.gold[i][0], resources.gold[i][1]);
            //res.push(new Resource(resources.gold[i][0], resources.gold[i][1]));
        }
        for (var i = 0; i < resources.diamond.length; i++) {
            //ctx.drawImage(image, positions.diamond.x, positions.diamond.y, positions.diamond.width, positions.diamond.height, resources.diamond[i][0], resources.diamond[i][1], positions.diamond.width, positions.diamond.height);
            positions.diamond.draw(resources.diamond[i][0], resources.diamond[i][1]);
            //res.push(positions.diamond);
        }
    }
}

/*function Resource(posX, posY) {
    this.posX = posX;
    this.posY = posY;
}*/

async function checkClick(event) {
    var x = event.pageX - canvas.offsetLeft
    var y = event.pageY - canvas.offsetTop
    for (i in resources) {
        var resource = resources[i];
        if (x > square.x && x < square.x + square.width &&
            y > square.y && y < square.y + square.height) {
            resources.onclick()
        }
    }
}

function gameOver() {
    window.cancelAnimationFrame(req);
    document.getElementsByTagName("button")[0].style.display = "block";
    console.log("END");
}

function openTutorial() {
    document.getElementById("tutorial").style.display = "block";
}

function closeTutorial() {
    document.getElementById("tutorial").style.display = "none";
}