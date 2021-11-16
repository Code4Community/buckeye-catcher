var trees;
var score = 0;
var config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload () {
    this.load.image('trees', 'images/TreesResized.jpg');
    this.load.image('basket', 'images/basket.png');
    this.load.image('ground', 'images/ground.png');
    this.load.image('buckeye', 'images/buckeye-logo.png')
    this.load.image('michigan', 'images/ichigan_logo.png')
}

function create () {
    createTrees(this, 1280);
    this.physics.world.setBounds(0, 0, trees.displayWidth, trees.displayHeight, true, true, true, true);

    //make ground
    ground = this.physics.add.staticGroup();
    ground.create(450, 715, 'ground');

    player = this.physics.add.sprite(550, 640, 'basket').setScale(0.315);
    player.velocityX = 3;

    this.physics.add.collider(player, ground);
            
}

function createTrees(realThis, width) {
    // A simple background for our game
    trees = realThis.add.image(0, 0, 'trees').setOrigin(0, 0);
    trees.displayWidth = width;
    trees.displayHeight = game.config.height;
}

function update() {

}