import Phaser from 'phaser';
import {Interpreter} from './language';
import {Game} from './game';

/*******************************************************************
 * 
 * Global variables
 * 
*******************************************************************/

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
        this.load.image('trees', '../static/TreesResized.jpg');
        this.load.image('basket', '../static/basket.png');
        this.load.image('ground', '../static/ground.png');
        this.load.image('buckeye', '../static/buckeye-logo.png')
        this.load.image('michigan', '../static/ichigan_logo.png')
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
        console.log('Ready');
    },

    // Transition to in-game state
    // Called when start button is pressed
    startGame: function() {
        game.scene.start('ingame', dataCopy)
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
