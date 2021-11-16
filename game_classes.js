class Game {
    constructor(phaser, player) {
        this.score = 0;
        this.phaser = phaser;
        this.player = player;
        this.fallingItemsBad = phaser.physics.add.group();
        this.fallingItemsGood = phaser.physics.add.group();
    }
  
    moveBasket(direction){
        if(direction == "right"){
            this.player.x += 150;
        } else {
            this.player.x -= 150;
        }
    }
    
    collectBuckeyes(fallingItem) {
        fallingItem.disableBody(true, true);
        this.score += 10;
    
        return false;
    }
    
    collectMichigans(fallingItem) {
        fallingItem.disableBody(true, true);
        if(score > 0) {
            this.score -= 10;
        }
    
        return false;
    }

    resetGame(){
        this.score = 0;
        this.player.x = 550;
    }

    isEnded(){
        return (this.fallingItemsBad.length == 0) && (this.fallingItemsGood.length == 0);
    }

}