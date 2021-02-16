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
    for (var i = 0; i < array.length; i++) {
        var x = findSymbol(array[i]);
        if (x) {
            x.action();
        }
        else if (array[i] === "if") {
            // Error if "if" is last word
            if (i === array.length - 1) {
                console.log('Error: "if" cannot be the last word')
                break;
            }
            i += parseIf(array, i);
        }
        else if (!isNaN(array[i])) {
            // Error if number is not followed by "times"
            if (i === array.length - 1 || array[i+1] !== 'times') {
                console.log('Error: Number should be followed by "times"')
                break;
            }
            i += parseTimes(array, i);
        }
    }
}

function parseIf(array, start) {
    var condition = array[start + 1];

    // Get parts of the if statement
    // Make this the indices of the special words of if statement like elif" "else" "end"
    var index = findIfSections(array, start + 2);
    index.unshift(start);

    var sections = [];
    for (var i = 0; i < index.length - 1; i++) {
        var object = {
            condition: '',
            start: 0,
            end: index[i + 1] - 1
        };

        if (array[index[i]] == 'else') {
            object.start = index[i] + 1;
        }
        else {
            object.condition = array[index[i] + 1];
            object.start = index[i] + 2;
        }
        sections.push(object);
    }

    for (var section of sections) {
        if (evaluate(section.condition)) {
            parse(array.slice(section.start, section.end + 1));
            break;
        }
    }

    // Return how many indices to skip over
    return index[index.length - 1] - start;
}

function parseTimes(array, start) {
    // Get end of the times loop
    var endIndex = findMatchingEnd(array, start + 2);

    // Run it x times
    var times = parseInt(array[start]);
    var body = array.slice(start + 2, endIndex); // Slice creates a new copy so safe
    for (var i = 0; i < times; i++) {
        parse(body);
    }

    // Return how many indices to skip over
    return endIndex - start;
}

function findSymbol(sym) {
    for (var symbol of lang) {
        if (symbol.symbol === sym) {
            return symbol;
        }
    }
    return false;
}

// Returns the ending index of the matching "end", starting at index
// Do not include the starting tag (the "times" or the "if" that we are finding the
// matching "end" of)
function findMatchingEnd(array, index) {
    var level = 0;
    var done = false;
    while (index<array.length) {
        switch (array[index]) {
            case "if":
            case "times":
                level++;
                break;
            case "end":
                level--;
                if (level === 0) {
                    console.log("Found end!!")
                    return index - 1;
                }
                break;
            default:
                break;
        }
        index++;
    }
}

function findIfSections(array, index) {
    var level = 0;
    var done = false;
    var output = [];

    while (!done) {
        switch (array[index]) {
            case "if":
            case "times":
                level++;
                break;
            case "end":
                level--;
                if (level === -1) {
                    output.push(index);
                    done = true;
                }
                break;
            case "else":
                if(level === 0){
                    output.push(index);
                }
                break;
            case "elif":
                if(level === 0){
                    output.push(index);
                }
                break;
            default:
                break;
        }
        index++;
        if (index > array.length) {
            //Error
            break;
        }
    }
    return output;
}
