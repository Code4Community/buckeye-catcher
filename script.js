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

class Point {
    Point(x, y) {
        // verify the x, y match
        this.x = x;
        this.y = y;
    }
}

insertImage(filePath, point, width, height) {
    var img = new Image();
    img.src = filePath;
    img.width = width;
    img.height = height;
    img.onload = function () {
        ctx.drawImage(img, 10, 10);
    }
}

var point = new Point(10, 100);
insertImage("../images/buckeye.png", point, siz)

