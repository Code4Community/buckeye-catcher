var trees;
var score = 0;

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

game.scene.add('start', startState);
game.scene.add('ready', readyState);
game.scene.add('ingame', inGameState);

game.scene.start('start')
