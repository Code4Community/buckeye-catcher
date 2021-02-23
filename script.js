// Code Mirror setup

var textArea = document.getElementById("editor");

var editor = CodeMirror.fromTextArea(textArea, {
    lineNumbers: true
});
editor.setSize("100%", "100%");

// Test game
class Game {
    constructor() {
        this.x = 0;
    }

    moveLeft() {
        this.x -= 1;
        console.log('At position ' + this.x);
    }

    moveRight() {
        this.x += 1;
        console.log('At position ' + this.x);
    }
}

game = new Game();  

// Code parsing
var input;
var level = 1; 

document.getElementById("run").addEventListener("click", (e) => {
    input = editor.getValue().split(/\s+/);

    if (input.length === 0) {
        console.log('Error: Code cannot be empty');
        return;
    }

    if(tokenize(input)) {
        parse(input)
    }
    else {
        // console.log('Tokenize error')
    }
});

var lang = [
    {symbol:"skip",  action: () => {
        console.log("Skip")
    }},
    {symbol:"moveLeft",  action: () => {
        console.log("Moving left")
        game.moveLeft();
    }},
    {symbol:"moveRight",  action: () => {
        console.log("Moving right")
        game.moveRight();
    }},
    {symbol:"moveTo1",  action: () => {
        console.log("Person speeds up")
    }},
    {symbol:"moveTo2",  action: () => {
        console.log("Buckeye falls")
    }},
]

// Evaluates a condition
function evaluate(condition) {
    if (condition === 'false') {
        return false;
    }
    else {
        return true;
    }
}

function tokenize(array){
    var keywords = ['times', 'end', 'if', 'elif', 'else', 'true', 'false'];
    for (var i = 0; i < array.length; i++) {
        if(!isNaN(array[i]) || keywords.includes(array[i]) || findSymbol(array[i])){
            continue;
        }
        else{
            //error
            console.log(!isNaN(array[i]))
            console.log("Error at " + array[i]);
            return false;
        }
    }
    console.log("Success");
    return true;
}

function parse(array) {
    
}

function parseCommand(array) {
    var statements = ['moveLeft', 'moveRight', 'skip']

    if (array[0] == 'if') {
        parseIf(array);
    }
    else if (!isNaN(array[0])) {
        parseTimes(array);
    }
    else if (statements.includes(array[0])) {
        // aaa
    }
    else {
        // error
    }
}
