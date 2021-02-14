// Code parsing
var input;

document.getElementById("run").addEventListener("click", (e) => {
    input = editor.getValue().split(/\s+/);
    parse(input);
});

var lang = [
    {symbol:"skip", terminal: true, action: () => {
        console.log("Skip")
    }},
    {symbol:"moveLeft", terminal: true, action: () => {
        console.log("Moving left")
    }},
    {symbol:"moveRight", terminal: true, action: () => {
        console.log("Moving right")
    }},
    {symbol:"moveTo1", terminal: true, action: () => {
        console.log("Person speeds up")
    }},
    {symbol:"moveTo2", terminal: true, action: () => {
        console.log("Buckeye falls")
    }},
    {symbol:"if", terminal: false, action: () => {
        console.log("Things fall down faster")
    }},
    {symbol:"smallerBasket", terminal: true, action: () => {
        console.log("Basket gets shorter")
    }}
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
        else {
            /* Error */
        }
    }
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
