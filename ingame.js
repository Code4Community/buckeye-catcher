var inGameState = {
    create: function() {
        console.log('Starting game')

        // Run interpreter, passing "game" to it
        var interpreter = new Interpreter(null)

        console.log('Ending game')

        game.scene.start('ready')
    }
}
