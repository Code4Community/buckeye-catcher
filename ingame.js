var inGameState = {
    create: function(data) {
        console.log('Starting game')
        
        data.gameObject.startFalling();

        // Run interpreter, passing "game" to it
        var interpreter = new Interpreter(data.gameObject);

        var i = 0;
        var interval = setInterval(function() {
            done = interpreter.step();
            if (done || interpreter.error) {
                clearInterval(interval);

                data.gameObject.resetGame();
    
                console.log('Ending game');
        
                game.scene.start('ready');
            }
        }, 1000)
    }
}
