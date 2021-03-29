/*
* This file is for game logic and for interfacing with the canvas
*/

// Global Variable
var right = false;
var left = false;
var intervalId = null
var player;
var fallingItems;
var UPDATE_INTERVAL = 10;

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

    var playerLogoUrl = "./images/basket.png";
    var fallingItemLogoUrl = "./images/buckeye-logo.png";

    player = new Player(playerLogoUrl, 80, 80, 2, new Point(10, 10));


    // will remove after creating fallingItems function, just there to prevent undefined error on line 35! 
    fallingItems = new Array(2);

    for (var i = 0; i < fallingItems.length; i++) {
      var fallingItem = new FallingItem(fallingItemLogoUrl,80,80, new Point(30,30),new Point(60,70), new Point(50,50),2,2,"good",5);
      fallingItems[i] = fallingItem;
    }

    //note from Margot: this restart button is leftover from World's Hardest Game, but maybe this is a good idea?

    //need to create the falling items

    // The HTML for the restart button that populates once we start the game
    //let restartInnerHtml = "<i class='material-icons float-left'>replay</i>Restart";

    // This write the html into the page
    //document.getElementById("playRestartButton").innerHTML = restartInnerHtml;

    // Starts the setInterval updater
    intervalId = setInterval(updateGameState, UPDATE_INTERVAL);
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
      fallingItems[i].currentPoint.addX(fallingItems[i].speedX * UPDATE_INTERVAL);
      fallingItems[i].currentPoint.addY(fallingItems[i].speedY * UPDATE_INTERVAL);


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
ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draws an image object on the canvas at the given point
function drawImage(image, point) {
  ctx.drawImage(image, point.x, point.y, image.width, image.height);
}