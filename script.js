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

    // create a falling items group and array with "keys" for either buckeye or michigan logo
    fallingItemsBad = this.physics.add.group();
    fallingItemsGood = this.physics.add.group();

    this.physics.add.overlap(player, fallingItemsBad, collectMichigans, null, this);
    this.physics.add.overlap(player, fallingItemsGood, collectBuckeyes, null, this);

    const fallingItemsVals = ['buckeye', 'michigan'];
    const colLocations = [100, 250, 400, 550, 700, 850, 1000]
    // go through 50 times and get a value for x and y coordinates (start some at far off x and y values to create timing)
    for (let i = 0; i < 50; i++) {
        let randIndex = Math.round(Math.random());
        let y = Phaser.Math.Between(0, -11000);
        let x = colLocations[Phaser.Math.Between(0, 6)];
        
        // make falling items and set the scale based on whether its a buckeye or a michigan 
        if (randIndex == 1) {
            fallingItemsBad.create(x,y,fallingItemsVals[randIndex]).setScale(0.10).setMaxVelocity(150);
        } else {
            fallingItemsGood.create(x,y,fallingItemsVals[randIndex]).setScale(0.26).setMaxVelocity(150);
        }

    }
            
}
 
function moveBasket(direction){
    if(direction == "right"){
        player.x += 150;
    } else {
        player.x -= 150;
    }
}

function collectBuckeyes(player, fallingItem) {
    fallingItem.disableBody(true, true);
    score += 1;

    return false;
}

function collectMichigans(player, fallingItem) {
    fallingItem.disableBody(true, true);
    if(score > 0) {score -= 1;}

    return false;
}

function createTrees(realThis, width) {
    // A simple background for our game
    trees = realThis.add.image(0, 0, 'trees').setOrigin(0, 0);
    trees.displayWidth = width;
    trees.displayHeight = game.config.height;
}

function update() {

}