var canvas;
var ctx;

window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    setUpGame();
    console.log("test")
}

function setUpGame() {
    var img = new Image();
    img.src = "./images/buckeye.png"
    img.onload = function () {
        ctx.drawImage(img, 10, 10);
    }
}

class Player () {
    Player(x, y, speed) {
        this.x = x;
        this.y =
    }

    movePlayer() {
        
    }
}

