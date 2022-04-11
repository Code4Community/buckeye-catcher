import Phaser from 'phaser';
import {Interpreter, showAlert} from './language';

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

const gameState = {
    score: 0
};

var endGame = false;
var timedEvents = [];
var game = new Phaser.Game(config);

var inGameState = {
    create: function(data) {
        console.log('Starting game');
        
        gameState.score = 0;
        gameState.scoreText.setText(`Score: ${gameState.score}`)
        
        document.getElementById('run').innerText = 'Stop!';
        
        var level = document.getElementById('dropdownMenuButton').value;
        var error = false;
        
        switch (level) {
            case '1':
                data.gameObject.startFalling1();
                break;
            case '2':
                data.gameObject.startFalling2();
                break;
            case '3':
                data.gameObject.startFalling3();
                break;
            case '4':
                data.gameObject.startFalling4();
                break;
            case '5':
                data.gameObject.startFalling5();
                break;
            case '6':
                data.gameObject.startFalling6();
                break;
            default:
                showAlert('You have to select a level!')
                error = true;
                break;
        }

        if (!error) {
            // Run interpreter, passing "game" to it
            var interpreter = new Interpreter(data.gameObject);

            // Take a step once a second
            var i = 0;
            var done = false;
            var interval = setInterval(function() {
                timedEvents.push(data.gameObject.phaser.time.addEvent({delay: 0, callback: ()=>{data.gameObject.dropBuckeye(550)}, callbackScope: data.gameObject.phaser, loop: false}));
                if (!done) {
                    interpreter.step();
                }
                if (interpreter.error) {
                    clearInterval(interval);
                    for (var event of timedEvents) {
                        event.destroy();
                    }
                    timedEvents = [];
                    data.gameObject.resetGame();
                    console.log('Ending game');
                    game.scene.start('ready');
                }
                i += 1;
                if (i > 29 || endGame) {       // Game ends after 30 seconds
                    clearInterval(interval);
                    for (var event of timedEvents) {
                        event.destroy();
                    }
                    timedEvents = [];
                    data.gameObject.resetGame();
                    console.log('Ending game');
                    game.scene.start('ready');
                }
            }, 1000)
        }
        else {
            for (var event of timedEvents) {
                event.destroy();
            }
            timedEvents = [];
            data.gameObject.resetGame();
            console.log('Ending game');
            game.scene.start('ready');
        }
    }
}

class Game {
    constructor(phaser, player) {
        this.phaser = phaser;
        this.player = player;
        this.fallingItemsBad = phaser.physics.add.group();
        this.fallingItemsGood = phaser.physics.add.group();
        this.phaser.physics.add.overlap(player, this.fallingItemsBad, this.collectMichigans, null, this.phaser);
        this.phaser.physics.add.overlap(player, this.fallingItemsGood, this.collectBuckeyes, null, this.phaser);
    }

    dropBuckeye(column){
        console.log('dropBuckeye');
        this.fallingItemsGood.create(column,-10, 'buckeye').setScale(0.26).setMaxVelocity(150);
    }

    dropMichigan(column){
        this.fallingItemsBad.create(column,-10, 'michigan').setScale(0.10).setMaxVelocity(150);
    }

    startFalling1(){
        // timedEvents.push(this.phaser.time.addEvent({delay: 1000, callback: ()=>{this.dropBuckeye(400)}, callbackScope: this.phaser, loop: true}));
        // timedEvents.push(this.phaser.time.addEvent({delay: 1000, callback: ()=>{this.dropMichigan(700)}, callbackScope: this.phaser, loop: true}));
    }

    startFalling2(){
        var i = 1;
        while (i < 15) {
            if (i%2 != 0){
                timedEvents.push(this.phaser.time.addEvent({delay: 2000*i, callback: ()=>{this.dropBuckeye(550)}, callbackScope: this.phaser, loop: false}));
            } else {
                timedEvents.push(this.phaser.time.addEvent({delay: 2000*i, callback: ()=>{this.dropMichigan(550)}, callbackScope: this.phaser, loop: false}));
            }
            i++;
        }
    }

    startFalling3(){
        var i = 1;
        while (i < 15) {
            if (i%2 != 0){
                timedEvents.push(this.phaser.time.addEvent({delay: 2000*i, callback: ()=>{this.dropBuckeye(400)}, callbackScope: this.phaser, loop: false}));
                timedEvents.push(this.phaser.time.addEvent({delay: 2000*i, callback: ()=>{this.dropMichigan(700)}, callbackScope: this.phaser, loop: false}));    
            } else {
                timedEvents.push(this.phaser.time.addEvent({delay: 2000*i, callback: ()=>{this.dropBuckeye(700)}, callbackScope: this.phaser, loop: false}));
                timedEvents.push(this.phaser.time.addEvent({delay: 2000*i, callback: ()=>{this.dropMichigan(400)}, callbackScope: this.phaser, loop: false}));
            }
            i++;
        }
    }

    startFalling4(){
        var i = 1;
        while (i < 15) {
            if (i%3 != 0){
                timedEvents.push(this.phaser.time.addEvent({delay: 2000*i, callback: ()=>{this.dropBuckeye(250)}, callbackScope: this.phaser, loop: false}));
            } else {
                timedEvents.push(this.phaser.time.addEvent({delay: 2000*i, callback: ()=>{this.dropMichigan(250)}, callbackScope: this.phaser, loop: false}));
            }
            i++;
        }
    }
    
    startFalling5(){
        var i = 1;
        while (i < 15) {
            if (i%3 == 1){
                timedEvents.push(this.phaser.time.addEvent({delay: 2000*i, callback: ()=>{this.dropBuckeye(250)}, callbackScope: this.phaser, loop: false}));
            } else {
                timedEvents.push(this.phaser.time.addEvent({delay: 2000*i, callback: ()=>{this.dropMichigan(250)}, callbackScope: this.phaser, loop: false}));
            }
            i++;
        }
 
    }

    startFalling6(){
        var i = 1;
        var randVal = Math.round(Math.random()); 
        
        while (i < 15) {
            if (randVal%2 != 0){
                timedEvents.push(this.phaser.time.addEvent({delay: 2000*i, callback: ()=>{this.dropBuckeye(550)}, callbackScope: this.phaser, loop: false}));
            } else {
                timedEvents.push(this.phaser.time.addEvent({delay: 2000*i, callback: ()=>{this.dropMichigan(550)}, callbackScope: this.phaser, loop: false}));
            }
            randVal = Math.round(Math.random());
            i++;
        }
    }
 

    startFalling7(){
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
    }

    isEnded(){
        return (this.fallingItemsBad.length == 0) && (this.fallingItemsGood.length == 0);
    }

}

var temp;

var readyState = {
    create: function(data) {
        endGame = false;

        // Set up variables and stuff
        // data.player.x = 550;
        temp = data;

        document.getElementById('run').innerText = 'Start!';
        console.log('Ready')
    },

    startGame: function() {
        document.getElementById('run').innerText = 'Start!';
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

        gameState.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: 'bold 45px', fill: '#ffffff'})

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

game.scene.add('start', startState);
game.scene.add('ready', readyState);
game.scene.add('ingame', inGameState);

game.scene.start('start')

document.getElementById('run').addEventListener('click', (x) => {
    console.log(x.srcElement.innerText)
    if (x.srcElement.innerText == 'Start!') {
        readyState.startGame();
    }
    else {
        endGame = true;
    }
})
