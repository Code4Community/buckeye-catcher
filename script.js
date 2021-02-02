// Code Mirror setup

var textArea = document.getElementById("editor");

var editor = CodeMirror.fromTextArea(textArea, {
    lineNumbers: true
});
editor.setSize("100%", "100%");

// Code parsing
var input;

document.getElementById("run").addEventListener("click", (e) => {
<<<<<<< HEAD
    input = document.getElementById("code").value.split(/\s+/);
    var valid = tokenize(input);
    if(valid){
        parse(input)
    }
    
    //parse(input);
=======
    input = editor.getValue().split(/\s+/);
    parse(input);
>>>>>>> main
});

var lang = [
    {symbol:"skip",  action: () => {
        console.log("Skip")
    }},
    {symbol:"moveLeft",  action: () => {
        console.log("Moving left")
    }},
    {symbol:"moveRight",  action: () => {
        console.log("Moving right")
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
        if (x && x.terminal) {
            x.action();
        }
        else if (array[i] === "if") {
            i += parseIf(array, i);
        }
        else if (!isNaN(array[i])) {
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

function run()  {
    var array = input.split(/\s+/);
    console.log(array);
    for ( var a of array ) {
        var command = findSymbol(a);
        command.action();
    }
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
    while (!done) {
        switch (array[index]) {
            case "if":
            case "times":
                level++;
                break;
            case "end":
                level--;
                if (level === -1) {
                    done = true;
                }
                break;
            default:
                break;
        }
        index++;
    }
    return index - 1;
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




