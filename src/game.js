class Game {
    constructor(phaser, player) {
        this.phaser = phaser;
        this.player = player;
        this.fallingItemsBad = phaser.physics.add.group();
        this.fallingItemsGood = phaser.physics.add.group();
        this.phaser.physics.add.overlap(player, this.fallingItemsBad, this.collectMichigans, null, this.phaser);
        this.phaser.physics.add.overlap(player, this.fallingItemsGood, this.collectBuckeyes, null, this.phaser);
        this.level = 1;
        this.currentStep = 0;
        this.events = [];
    }

    setLevel(level) {
        this.level = level;
        this.currentStep = 0;
    }

    step() {
        if (this.level == 1) {
            this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropBuckeye(400)}, callbackScope: this.phaser, loop: false}));
            this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropMichigan(700)}, callbackScope: this.phaser, loop: false}));
        } else if (this.level == 2) {

            if (this.currentStep % 4 == 0) {
                this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropBuckeye(550)}, callbackScope: this.phaser, loop: false}));
            } else if (this.currentStep % 4 == 2) {
                this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropMichigan(550)}, callbackScope: this.phaser, loop: false}));
            }

        } else if (this.level == 3){

            if(this.currentStep % 4 == 0){
                this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropBuckeye(400)}, callbackScope: this.phaser, loop: false}));
                this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropMichigan(700)}, callbackScope: this.phaser, loop: false})); 
            } else if (this.currentStep % 4 == 2) {
                this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropBuckeye(700)}, callbackScope: this.phaser, loop: false}));
                this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropMichigan(400)}, callbackScope: this.phaser, loop: false})); 
            }

        }
        else if (this.level == 4) {
            
            if (this.currentStep % 3 != 2){
                this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropBuckeye(250)}, callbackScope: this.phaser, loop: false}));
            } else if (this.currentStep % 3 == 2) {
                this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropMichigan(250)}, callbackScope: this.phaser, loop: false})); 
            }

        } else if (this.level == 5) {

            if (this.currentStep % 3 == 2){
                this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropBuckeye(250)}, callbackScope: this.phaser, loop: false}));
            } else if (this.currentStep % 3 != 2) {
                this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropMichigan(250)}, callbackScope: this.phaser, loop: false})); 
            }

        } else if (this.level == 6) {

            var randVal = Math.round(Math.random());
            if (randVal % 2 != 0){
                this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropBuckeye(550)}, callbackScope: this.phaser, loop: false}));
            } else {
                this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropMichigan(550)}, callbackScope: this.phaser, loop: false}));
            }

        } else if (this.level == 7) {
            const colLocations = [100, 250, 400, 550, 700, 850, 1000];
    
            let goodOrBad = Math.round(Math.random());
            let x = Phaser.Math.Between(0, 6);
    
            if (goodOrBad == 1){
                this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropBuckeye(colLocations[x])}, callbackScope: this.phaser, loop: false}));
            } else {
                this.events.push(this.phaser.time.addEvent({delay: 0, callback: ()=>{this.dropMichigan(colLocations[x])}, callbackScope: this.phaser, loop: false}));
            }            
        }

        this.currentStep += 1;
    }

    dropBuckeye(column){
        console.log('dropBuckeye');
        this.fallingItemsGood.create(column, -10, 'buckeye').setScale(0.26).setMaxVelocity(150);
    }

    dropMichigan(column){
        this.fallingItemsBad.create(column, -10, 'michigan').setScale(0.10).setMaxVelocity(150);
    }

    moveBasket(direction){
        if (direction == 'right' && this.player.x < 900){
            this.player.x += 150;
        } else if (direction == 'left' && this.player.x > 100) {
            this.player.x -= 150;
        }
    }

    moveLeft() {
        this.moveBasket('left');
    }

    moveRight() {
        this.moveBasket('right');
    }

    collectBuckeyes(player, fallingItem) {
        fallingItem.disableBody(true, true);

        gameState.score += 10;
        gameState.scoreText.setText(`Score: ${gameState.score}`)

        return false;
    }

    collectMichigans(player, fallingItem) {
        fallingItem.disableBody(true, true);
        if(gameState.score > 0) {
           gameState.score -= 5;
        }

        gameState.scoreText.setText(`Score: ${gameState.score}`)

        return false;
    }

    resetGame(){
        this.player.x = 550;
        this.fallingItemsBad.clear(true, true);
        this.fallingItemsGood.clear(true, true);
        for (var event of this.events) {
            event.destroy();
        }
        this.events = [];
    }
}

export {Game};
