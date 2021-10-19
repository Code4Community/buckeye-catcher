var readyState = {
    create: function() {
        // Set up variables and stuff
        
        console.log('Ready')

    },

    startGame: function() {
        game.scene.start('ingame')
    }
}

document.getElementById('run').addEventListener('click', () => {
    readyState.startGame()
})
