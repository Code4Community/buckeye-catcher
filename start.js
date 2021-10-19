var startState = {
    preload: function() {
            this.load.image('sky', 'images/sky.png');
            this.load.image('basket', 'images/basket.png');
            this.load.image('ground', 'images/platform.png');
    },

    create: function() {
            this.add.image(400, 300, 'sky');
            this.add.image(400, 575, 'ground');
            player = this.physics.add.sprite(200, 200, 'basket');

            game.scene.start('ready')
    }
}