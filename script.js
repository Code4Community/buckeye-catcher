var input;

document.getElementById("run").addEventListener("click", (e) => {
    input = document.getElementById("code").value.split(/\s+/);
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

function parse(array) {
    for (let i = 0; i < array.length; i++) {
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
    let level = 0;
    let done = false;
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

function parseTimes(array, start) {
    // Get end of the times loop
    let endIndex = findMatchingEnd(array, start + 2);

    // Run it x times
    let times = parseInt(array[start]);
    let body = array.slice(start + 2, endIndex);
    for (let i = 0; i < times; i++) {
        parse(body);
    }

    // Return how many indices to skip over
    return endIndex - start;
}

function findIfSections(array, index) {
    let level = 0;
    let done = false;
    let array = [];

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
            case "else":
                if(level == 0){
                    array.push(index);
                }
                break;
            case "elif":
                if(level == 0){
                    array.push(index);
                }
                break;
            default:
                break;
        }
        index++;
    }
    return array;
}