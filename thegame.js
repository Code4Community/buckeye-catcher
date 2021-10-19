var config = {
    type: Phaser.AUTO,
    width: 800,
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

game.scene.add('start', startState);
game.scene.add('ready', readyState);
game.scene.add('ingame', inGameState);

game.scene.start('start')
