// Constants
RUN_BUTTON_ID = "run"

// DOM Elements
var runButton = document.getElementById(RUN_BUTTON_ID)

// Action Listeners
runButton.addEventListener("click", event => {
    startGame()
});