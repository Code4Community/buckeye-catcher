import Phaser from 'phaser';
import {Interpreter} from './language';
// import {Game} from './game';

/*******************************************************************
 * 
 * Global variables
 * 
*******************************************************************/

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

var config = {
    parent: 'game',
    type: Phaser.AUTO,
    width: 1100,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

var game = new Phaser.Game(config);
var endGame = false;        // Set to true if game was ended by stop button
var dataCopy;               // Used to keep game object reference in memory
const gameState = {         // Score
    score: 0
};

/*******************************************************************
 * 
 * Phaser game state definitions
 * 
*******************************************************************/

var startState = {
    preload: function() {
        this.load.image('trees', './static/TreesResized.jpg');
        this.load.image('basket', './static/basket.png');
        this.load.image('ground', './static/ground.png');
        this.load.image('buckeye', './static/buckeye-logo.png')
        this.load.image('michigan', './static/ichigan_logo.png')
    },

    create: function() {
        // A simple background for our game
        var trees;
        trees = this.add.image(0, 0, 'trees').setOrigin(0, 0);
        trees.displayWidth = 1280;
        trees.displayHeight = game.config.height;
        this.physics.world.setBounds(0, 0, trees.displayWidth, trees.displayHeight, true, true, true, true);

        // Make ground
        var ground = this.physics.add.staticGroup();
        ground.create(450, 615, 'ground');

        // Add basket
        var player = this.physics.add.sprite(550, 540, 'basket').setScale(0.315);
        player.velocityX = 3;
        this.physics.add.collider(player, ground);

        // Add scoreboard
        gameState.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: 'bold 45px', fill: '#ffffff'})

        // Create game object and transition to ready state
        var gameObject = new Game(this, player);
        game.scene.start('ready', {gameObject: gameObject, ground: ground})
    }
}

var readyState = {
    create: function(data) {
        // Save data into a global variable
        dataCopy = data;
        endGame = false;

        // Change button text to start
        document.getElementById('run').innerText = 'Start!';
        document.getElementById('instructions').innerText = 'Instructions';
        console.log('Ready');
    },

    // Transition to in-game state
    // Called when start button is pressed
    startGame: function() {
        game.scene.start('ingame', dataCopy)
    },

    showInstructions: function() {
        document.getElementById('instructions').innerText = 'Hide Instructions';
        document.getElementById('instructions').popover(options);
        document.getElementById('instructions').popover('show');
        // show popup
    },

    hideInstructions: function() {
        document.getElementById('instructions').innerText = 'Instructions';
        // remove popup
    }
}

var inGameState = {
    create: function(data) {
        console.log('Starting game');

        // Change start button to stop button
        document.getElementById('run').innerText = 'Stop!';

        // Reset score
        gameState.score = 0;
        gameState.scoreText.setText(`Score: ${gameState.score}`)

        // Get level from dropdown and set level
        var level = document.getElementById('dropdownMenuButton').value;
        data.gameObject.setLevel(level);

        // Run interpreter, passing the game object to it
        var interpreter = new Interpreter(data.gameObject);

        // Take a step once a second
        var i = 0;
        var interval = setInterval(function() {
            // Take a step
            data.gameObject.step();
            interpreter.step();

            // End the game if there was an interpreter error
            // This shouldn't happen
            if (interpreter.error) {
                clearInterval(interval);
                data.gameObject.resetGame();
                console.log('Ending game');
                game.scene.start('ready');
            }

            // End the game if we've reached 30 iterations or stop button was pressed
            i += 1;
            if (i > 29 || endGame) {
                clearInterval(interval);
                data.gameObject.resetGame();
                console.log('Ending game');
                game.scene.start('ready');
            }
        }, 1000)
    }
}

// Add scenes and start game
game.scene.add('start', startState);
game.scene.add('ready', readyState);
game.scene.add('ingame', inGameState);
game.scene.start('start');

// Add event listener to button
// Two possibilities depending on whether the button is a start button or a stop button
document.getElementById('run').addEventListener('click', (x) => {
    if (x.srcElement.innerText == 'Start!') {
        readyState.startGame();
    }
    else {
        endGame = true;
    }
})

document.getElementById('instructions').addEventListener('click', (x) => {
    if (x.srcElement.innerText == 'Instructions') {
        readyState.showInstructions();
    }
    else {
        readyState.hideInstructions();
    }
})

