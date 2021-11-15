var inGameState = {
    create: function(data) {
        console.log('Starting game')

        data.player.x += 150
        

        // Run interpreter, passing "game" to it
        // var interpreter = new Interpreter(null)

        console.log('Ending game')

        game.scene.start('ready')
    }
}
