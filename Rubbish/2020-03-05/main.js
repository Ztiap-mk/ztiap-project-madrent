var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = document.body.clientWidth;
canvas.height = window.innerHeight - 20;
var canvasW = canvas.width;
var canvasH = canvas.height;
console.log(canvasW + "x" + canvasH + " - " + document.body.clientHeight);


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
        moveSpeed: 3,
        moveAngle: 0.5
    }
}

var positions = {
    character: {
        posX: canvasW / 2 - 60,
        posY: 120,
        x: 0,
        y: 0,
        width: 327,
        height: 350
    },
    map: {
        x: 0,
        y: 0
    },
    floor: {
        top: 250
    },
    anchor: {
        x: 340,
        y: 0,
        width: 42,
        height: 66,
        endX: 0,
        endY: canvasH - 30,
        angle: -160
    }
}

function init() {
    //initialise user variables, load resources than start the game
    window.requestAnimationFrame(gameLoop)
}

function gameLoop(timeStamp) {
    var progress = timeStamp - lastFrame

    // if(progress % 2 == 0){
    update(progress);
    // }

    draw();

    lastFrame = timeStamp
    window.requestAnimationFrame(gameLoop)
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

    //animate anchor
    calculateAnchorAngle();
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
    ctx.fillText("X:" + positions.character.posX + ", Y: " + positions.character.posY /* + " anchorX: " + positions.anchor.endX + ", anchorY: " + positions.anchor.endY*/ , 10, 50);


    //platform 
    ctx.beginPath();
    ctx.moveTo(0, positions.floor.top);
    ctx.lineTo(canvasW, positions.floor.top);
    ctx.stroke();

    //character
    ctx.drawImage(image, positions.character.x, positions.character.y, positions.character.width, positions.character.height, positions.character.posX, positions.character.posY, 130, 130);

    //anchor path
    ctx.beginPath();
    ctx.moveTo(positions.character.posX + positions.character.width / 6, positions.character.posY + positions.character.height / 3);
    ctx.lineTo(positions.anchor.endX, positions.anchor.endY);
    ctx.stroke();

    //anchor
    ctx.save();
    ctx.translate(positions.character.posX + positions.character.width / 6 - 27 + 25, positions.character.posY + positions.character.height / 3)
    ctx.rotate(positions.anchor.angle * Math.PI / 180);
    ctx.drawImage(image, positions.anchor.x, positions.anchor.y, positions.anchor.width, positions.anchor.height, -25, 0, 50, 50);
    ctx.restore();

    //console.log(positions.anchor.angle);
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