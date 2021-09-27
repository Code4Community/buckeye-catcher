/*
* This file is defining the classes needed for game.js.
*/

//Player object with an image, speed, and location
class Player {
    constructor(imageSrc, imageWidth, imageHeight, speed, startPoint, score = 0) {
        this.image = new Image(imageWidth, imageHeight);
        this.image.src = imageSrc;
        this.speed = speed;
        this.currentPoint = startPoint;
    }
  
    //we need to decide if the player will move instantaniously or a little at a time (and how far will they move)
    moveRight() {
        if (this.currentPoint.x + player.speed <= X_MAX - this.image.width) {
            this.currentPoint.addX(player.speed);
        }
    }
  
    moveLeft() {
        if (this.currentPoint.x - player.speed >= X_MIN) {
            this.currentPoint.subtractX(player.speed);
        }
    }

    //maybe make parameterized methods where you can say how many columns to move
}

// 2D point within bounds of screen
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
  
    subtractX(subtractFromX) {
        this.x -= subtractFromX;
    }
  
    subtractY(subtractFromY) {
        this.y -= subtractFromY;
    }
  
    addX(addToX) {
        this.x += addToX;
    }
  
    addY(addToY) {
        this.y += addToY;
    }
}

//object has a picture (buckeye or ichigan logo), location, speed, value, and how many points it gives/takes
// the variable "value" indicates whether something is "good" or "bad" aka do you want to catch it or will it hurt you
class FallingItem {
    // fallingItem is stationary if optional speed parameters are omitted
    constructor(imageSrc, imageWidth, imageHeight, currentPoint, speed, value, pointValue) {
        this.image = new Image(imageWidth, imageHeight);
        this.image.src = imageSrc;
        this.currentPoint = currentPoint;
        this.speed = speed;
        this.value = value;
        this.pointValue = pointValue;
    }
  }