var inGameState = {
    create: function(data) {
        console.log('Starting game')

        data.gameObject.startFalling();

        // Run interpreter, passing "game" to it
        var interpreter = new Interpreter(data.gameObject);
        data.gameObject.resetGame();

        console.log('Ending game')

        game.scene.start('ready')
    }
}
