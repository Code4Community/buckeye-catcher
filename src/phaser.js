import Phaser from 'phaser';

var config = {
    parent: 'game',
    type: Phaser.AUTO,
    width: 1100,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

var game = new Phaser.Game(config);

var inGameState = {
    create: function(data) {
        console.log('Starting game')
        
        data.gameObject.startFalling();

        // Run interpreter, passing "game" to it
        var interpreter = new Interpreter(data.gameObject);

        var i = 0;
        var interval = setInterval(function() {
            done = interpreter.step();
            if (done || interpreter.error) {
                clearInterval(interval);

                data.gameObject.resetGame();
    
                console.log('Ending game');
        
                game.scene.start('ready');
            }
        }, 1000)
    }
}

class Game {
    constructor(phaser, player) {
        this.score = 0;
        this.phaser = phaser;
        this.player = player;
        this.fallingItemsBad = phaser.physics.add.group();
        this.fallingItemsGood = phaser.physics.add.group();
        this.phaser.physics.add.overlap(player, this.fallingItemsBad, this.collectMichigans, null, this.phaser);
        this.phaser.physics.add.overlap(player, this.fallingItemsGood, this.collectBuckeyes, null, this.phaser);
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
    
    moveLeft() {
        this.moveBasket('left');
    }

    moveRight() {
        this.moveBasket('right');
    }
    
    collectBuckeyes(fallingItem) {
        fallingItem.disableBody(true, true); //broken
        this.score += 10;
    
        return false;
    }
    
    collectMichigans(fallingItem) {
        fallingItem.disableBody(true, true); //broken
        if(score > 0) {
            this.score -= 10;
        }
    
        return false;
    }

    resetGame(){
        this.score = 0;
        this.player.x = 550;
        this.fallingItemsBad.clear(true, true);
        this.fallingItemsGood.clear(true, true);
    }

    isEnded(){
        return (this.fallingItemsBad.length == 0) && (this.fallingItemsGood.length == 0);
    }

}

var temp;

var readyState = {
    create: function(data) {
        // Set up variables and stuff
        // data.player.x = 550;
        temp = data;

        console.log('Ready')
    },

    startGame: function() {
        game.scene.start('ingame', temp)
    }
}

var startState = {
    preload: function() {
        this.load.image('trees', '../static/TreesResized.jpg');
        this.load.image('basket', '../static/basket.png');
        this.load.image('ground', '../static/ground.png');
        this.load.image('buckeye', '../static/buckeye-logo.png')
        this.load.image('michigan', '../static/ichigan_logo.png')
    },

    create: function() {
        createTrees(this, 1280)
        this.physics.world.setBounds(0, 0, trees.displayWidth, trees.displayHeight, true, true, true, true);
        
        //make ground
        var ground = this.physics.add.staticGroup();
        ground.create(450, 715, 'ground');

        // Add basket
        var player = this.physics.add.sprite(550, 640, 'basket').setScale(0.315);
        player.velocityX = 3;
        this.physics.add.collider(player, ground);

        var gameObject = new Game(this, player);

        game.scene.start('ready', {gameObject: gameObject, ground: ground})
    }
}

var trees;

function createTrees(realThis, width) {
    // A simple background for our game
    trees = realThis.add.image(0, 0, 'trees').setOrigin(0, 0);
    trees.displayWidth = width;
    trees.displayHeight = game.config.height;
}

var score = 0;

game.scene.add('start', startState);
game.scene.add('ready', readyState);
game.scene.add('ingame', inGameState);

game.scene.start('start')

document.getElementById('run').addEventListener('click', () => {
    readyState.startGame()
})



