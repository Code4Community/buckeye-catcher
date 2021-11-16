class Game {
    constructor(phaser, player) {
        this.score = 0;
        this.phaser = phaser;
        this.player = player;
        this.fallingItemsBad = phaser.physics.add.group();
        this.fallingItemsGood = phaser.physics.add.group();
        this.phaser.physics.add.overlap(player, fallingItemsBad, collectMichigans, null, this.phaser);
        this.phaser.physics.add.overlap(player, fallingItemsGood, collectBuckeyes, null, this.phaser);
    }
  
    startFalling(){
        const fallingItemsVals = ['buckeye', 'michigan'];
        const colLocations = [100, 250, 400, 550, 700, 850, 1000]
        
        // creates 50 falling objects and makes them fall from different heights (to simulate different times)
        for (let i = 0; i < 50; i++) {
            let randIndex = Math.round(Math.random());
            let y = Phaser.Math.Between(0, -11000);
            let x = colLocations[Phaser.Math.Between(0, 6)];
            
            // make falling items and set the scale based on whether its a buckeye or a michigan 
            if (randIndex == 1) {
                this.fallingItemsBad.create(x,y,fallingItemsVals[randIndex]).setScale(0.10).setMaxVelocity(150);
            } else {
                this.fallingItemsGood.create(x,y,fallingItemsVals[randIndex]).setScale(0.26).setMaxVelocity(150);
            }
    
        }
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