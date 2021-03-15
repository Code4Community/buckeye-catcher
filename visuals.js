// Constants
var NUMBER_OF_COLUMNS = 6;
var CANVAS_WIDTH_PERCENTAGE = 0.66;
var NAV_ID = "navbar"
var CANVAS_ID = "game"
var EDITOR_ID = "editor"

// Global Variable
var canvas = document.getElementById(CANVAS_ID);
var ctx = canvas.getContext("2d")
var right = false;
var left = false;
var intervalId = null
var player;
var fallingItems;
startGame()

// DOM Elements
var navbar = document.getElementById(NAV_ID)
var textArea = document.getElementById(EDITOR_ID);

// CodeMirror Setup
CodeMirror.defineSimpleMode("mode", {
    start: [
        { regex: /(?:if|elif|else|times)\b/, token: "control", indent: true},
        { regex: /(?:end)\b/, token: "control", dedent: true},
        { regex: /(?:moveleft|moveright|skip)\b/, token: "statement"},
        { regex: /(?:rustle|boom|wind)\b/, token: "condition" },
        { regex: /(?:[1-9][0-9]*)\b/, token: "digits" },
    ],
    meta: {
        electricInput: true
    }
});

var editor = CodeMirror.fromTextArea(textArea, {
    lineNumbers: true,
    mode: "mode"
});

// Page Setup
buildPage()
function buildPage() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    console.log(windowHeight)

    // Set canvas size
    var navbarHeight = navbar.clientHeight
    canvas.width = Math.floor(windowWidth * CANVAS_WIDTH_PERCENTAGE)
    canvas.height = Math.floor(windowHeight - navbarHeight)

    // Set CodeMirror size
    editor.setSize(Math.floor(windowWidth - canvas.width), canvas.height);

    // Create columns
    var columnWidth = canvas.width / NUMBER_OF_COLUMNS
    for (var i = 0; i < canvas.width; i += columnWidth) {
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height);
        ctx.stroke()
    }
}

// Stops the game.
function stopGame() {
  if (intervalId != null) {
      clearInterval(intervalId);
  }
  intervalId = null;
}

// somehow get the input from the written code to tell the player what to do
// Starts the game and sets up levels
function startGame() {
    stopGame();

    var playerLogoUrl = "./assets/basket.png";
    var fallingItemLogoUrl = "./assets/buckeye-logo.png";

    player = new Player(playerLogoUrl, 80, 80, 2, new Point(10, 10));

    //note from Margot: this restart button is leftover from World's Hardest Game, but maybe this is a good idea?

    //need to create the falling items

    // The HTML for the restart button that populates once we start the game
    let restartInnerHtml = "<i class='material-icons float-left'>replay</i>Restart";

    // This write the html into the page
    document.getElementById("playRestartButton").innerHTML = restartInnerHtml;

    // Starts the setInterval updater
    intervalId = setInterval(updateGameState, updateInterval);
}


function caughtItem() {
  for (var n = 0; n < fallingItems.length; n++) {
      var fallingItem = fallingItems[n];
      var fallingItemLeft = fallingItem.currentPoint.x;
      var fallingItemRight = fallingItem.currentPoint.x + fallingItem.image.width;
      var fallingItemTop = fallingItem.currentPoint.y;
      var fallingItemBottom = fallingItem.currentPoint.y + fallingItem.image.height;

      var points = [new Point(player.currentPoint.x, player.currentPoint.y),
      new Point(player.currentPoint.x + player.image.width, player.currentPoint.y),
      new Point(player.currentPoint.x, player.currentPoint.y + player.image.height),
      new Point(player.currentPoint.x + player.image.width, player.currentPoint.y + player.image.height)]

      for (var i = 0; i < 4; i++) {
          var point = points[i];
          if (fallingItemLeft < point.x && point.x < fallingItemRight && fallingItemTop < point.y && point.y < fallingItemBottom) {
              stopGame();
              clearCanvas();
              //give or take points to/from the player
              if(fallingItem.value === "good"){
                player.score += fallingItem.pointValue;
              } else {
                player.score -= fallingItem.pointValue;
              }
          }
      }
  }
}

function moveAndDrawPlayer() {
  if (left) {
      player.moveLeft();
  }
  if (right) {
      player.moveRight();
  }
  drawImage(player.image, player.currentPoint);
}

function moveAndDrawFallingItems() {
  for (var i = 0; i < fallingItems.length; i++) {
      //calculate future position of the fallingItem
      fallingItems[i].currentPoint.addX(fallingItems[i].speedX * updateInterval);
      fallingItems[i].currentPoint.addY(fallingItems[i].speedY * updateInterval);

      if (fallingItems[i].currentPoint.x < fallingItems[i].startPoint.x || fallingItems[i].currentPoint.x > fallingItems[i].endPoint.x || fallingItems[i].currentPoint.y < fallingItems[i].startPoint.y || fallingItems[i].currentPoint.y > fallingItems[i].endPoint.y) {
          fallingItems[i].speedX *= -1;
          fallingItems[i].speedY *= -1;
      }

      //draw the fallingItem
      drawImage(fallingItems[i].image, fallingItems[i].currentPoint);
  }
}

function updateGameState() {
  clearCanvas();
  moveAndDrawPlayer();
  moveAndDrawFallingItems();
  caughtItem();
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// Draws an image object on the canvas at the given point
function drawImage(image, point) {
  context.drawImage(image, point.x, point.y, image.width, image.height);
}