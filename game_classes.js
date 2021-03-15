class Player {
    constructor(imageSrc, imageWidth, imageHeight, speed, startPoint, score = 0) {
        this.image = new Image(imageWidth, imageHeight);
        this.image.src = imageSrc;
        this.speed = speed;
        this.currentPoint = startPoint;
    }
  
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

// the variable "value" indicates whether something is "good" or "bad" aka do you want to catch it or will it hurt you
class FallingItems {
    // fallingItem is stationary if optional speed parameters are omitted
    constructor(imageSrc, imageWidth, imageHeight, startPoint, endPoint, currentPoint, speedX, speedY, value, pointValue) {
        this.image = new Image(imageWidth, imageHeight);
        this.image.src = imageSrc;
        this.startPoint = startPoint;
        this.currentPoint = currentPoint;
        this.endPoint = new Point(endPoint.x - (this.image.width), endPoint.y - (this.image.height));
        this.speedX = speedX;
        this.speedY = speedY;
        this.value = value;
        this.pointValue = pointValue;
    }
  }