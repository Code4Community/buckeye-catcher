// Code Mirror setup

var textArea = document.getElementById("editor");

var editor = CodeMirror.fromTextArea(textArea, {
    lineNumbers: true
});
editor.setSize("100%", "100%");

var statements = ['moveLeft', 'moveRight', 'skip']
var conditions = ['rustle','boom','wind']

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
{/* <prog> -> <sequence>
<sequence> -> <command> | <sequence><command>
<command> -> <if> | <statement> | <loop>
<if> -> if <cond> <sequence> end|if <cond> <sequence> else <sequence> end | if<cond><sequence><elif> else <seqeuence> end
<elif> -> elif<cond><sequence><elif>|elif<cond><sequence>
<cond> -> rustle | boom | wind
<loop> -> <int> times <sequence> end
<statement> -> moveleft | moveright | skip....... */}

function parse(array) {
    parseSequence(array)
}

function parseSequence(array) {
    parseCommand(array);

}

function parseCommand(array) {
    var command = array[0];

    if (command == 'if') {
        parseIf(array);
    }
    else if (!isNaN(command)) {
        parseTimes(array);
    }
    else if (statements.includes(command)) {
        parseStatement(array);
    }
    else {
        console.log("error: not a valid command")
    }
}

function parseIf(array){
    var ifToken = array.shift()
    var cond = array.shift();
    if(!conditions.includes(cond)){
        console.log("error: not a valid condition")
    }
    parseCondition();
    parseSequence();
}
