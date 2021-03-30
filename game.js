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
    var buckeyeLogoUrl = "./images/buckeye-logo.png";
    var badItemUrl = "./images/buckeye-logo2.png";

    player = new Player(playerLogoUrl, 80, 80, 2, new Point(10, 10));

    // will remove after creating fallingItems function, just there to prevent undefined error on line 35! 
    fallingItems = new Array(5);
    var xVal = 60;
    for (var i = 0; i < fallingItems.length; i++) {

    //0-0.49 is bad, 0.5 -1 is good
    var randomValue = Math.round(Math.random());
    var good = (randomValue == 1);

    var logo;
    var value;
    if(good){
      logo = buckeyeLogoUrl;
      value = "good";
    } else {
      logo = badItemUrl;
      value = "bad";
    }

    //randomize what column
    var randomCol = Math.floor(Math.random() * 5);
    var column = 25 + 50 * randomCol;

    //when does it start falling
    var timing = Math.floor(Math.random() * 20);

    //we will need to un-hard code the column widths
    //use randomCol to find the inital x value
    //time???
      var fallingItem = new FallingItem(logo, 80,80, new Point(xVal,70), 0.25, value, 5);
      xVal += 70;
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
      var fallingItemBottomLeftY = fallingItem.currentPoint.y;

      var playerUpperLeftPt = player.currentPoint.y;

      var playerCol = getColumn(playerUpperLeftPt);
      var itemCol = getColumn(fallingItemBottomLeftY);

      if(playerCol == itemCol){
        if (fallingItemBottomLeftY < playerUpperLeftPt) {
          //give or take points to/from the player
          if(fallingItem.value === "good"){
            player.score += fallingItem.pointValue;
          } else {
            player.score -= fallingItem.pointValue;
          }
          //remove the item
      }
      }

/* 
      for (var i = 0; i < 4; i++) {
          var point = points[i];
          if (fallingItemLeft < point.x && point.x < fallingItemRight && fallingItemTop < point.y && point.y < fallingItemBottom) {
              //give or take points to/from the player
              if(fallingItem.value === "good"){
                player.score += fallingItem.pointValue;
              } else {
                player.score -= fallingItem.pointValue;
              }
              //remove the item
          }
      } */
  }
}

function getColumn(xValue) {

  var columnWidth = columnWidth;

  var columnIndex = Math.ceil(xValue / columnWidth);

  return columnIndex;
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
      //fallingItems[i].currentPoint.addX(fallingItems[i].speedX * UPDATE_INTERVAL);
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