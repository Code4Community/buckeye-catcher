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
// Starts the game
function startGame() {
    stopGame();

    var playerLogoUrl = "./images/basket.png";
    var buckeyeLogoUrl = "./images/buckeye-logo.png";
    var badItemUrl = "./images/ichigan_logo.png";

    player = new Player(playerLogoUrl, 80, 80, 2, new Point(300, 500));

    // will remove the array after creating fallingItems function, just there to prevent undefined error on line 35! 
    //we plan to move this stuff into a separate function at some point
    fallingItems = new Array(6);
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
      var randomCol = Math.floor(Math.random() * NUMBER_OF_COLUMNS);
      var column = (columnWidth / 2) + columnWidth * randomCol - 30;

      //when does it start falling
      var timing = Math.floor(Math.random() * 20);

      //use randomCol to find the inital x value
      //time???
      //these numbers are just randomly chosen right now
      var fallingItem = new FallingItem(logo, 80,80, new Point(column,70), 0.25, value, 5);
      
      fallingItems[i] = fallingItem;
    }

    //note from Margot: this restart button is leftover from World's Hardest Game, but maybe this is a good idea?

    // The HTML for the restart button that populates once we start the game
    //let restartInnerHtml = "<i class='material-icons float-left'>replay</i>Restart";

    // This write the html into the page
    //document.getElementById("playRestartButton").innerHTML = restartInnerHtml;

    // Starts the setInterval updater
    intervalId = setInterval(updateGameState, UPDATE_INTERVAL);
}


//checks to see if the location of the player overlaps with any of the falling items (to see if it's been caught)
function caughtItem() {
  for (var n = 0; n < fallingItems.length; n++) {
      var fallingItem = fallingItems[n];
      var fallingItemBottomLeftY = fallingItem.currentPoint.y;

      var playerUpperLeftPt = player.currentPoint.y;

      var playerCol = getColumn(playerUpperLeftPt);
      var itemCol = getColumn(fallingItemBottomLeftY);

      //compares column of player and the current falling item
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
  }
}

function getColumn(xValue) {

  var columnWidth = columnWidth;

  var columnIndex = Math.floor(xValue / columnWidth);

  return columnIndex;
}

//we're not sure where left and right are coming from b/c they aren't parameters
function moveAndDrawPlayer() {
  if (left) {
      player.moveLeft();
  }
  if (right) {
      player.moveRight();
  }
  drawImage(player.image, player.currentPoint);
}

//updates the locations of each existing falling item
function moveAndDrawFallingItems() {

  var toRemove = new Array();
  for (var i = 0; i < fallingItems.length; i++) {
      //calculate future position of the fallingItem
      fallingItems[i].currentPoint.addY(fallingItems[i].speed * UPDATE_INTERVAL);

      if(fallingItems[i].currentPoint.y < 550){
        //redraw the fallingItem
        drawImage(fallingItems[i].image, fallingItems[i].currentPoint);
      } else {
        toRemove.push(i);
      }
      
  }

  //if an item has reached the bottom
  for (var i = 0; i < toRemove.length; i++) {
    fallingItems.splice(toRemove[i]);
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