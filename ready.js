var temp;

var readyState = {
    create: function(data) {
        // Set up variables and stuff
        // data.player.x = 550;
        temp = data;

        console.log('Ready')
    },

    startGame: function() {
        game.scene.start('ingame', temp)
    }
}

document.getElementById('run').addEventListener('click', () => {
    readyState.startGame()
})
